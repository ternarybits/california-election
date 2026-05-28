// CA 2026 Candidate Matcher — client app.
// Loads dataset from the Worker, runs the two-phase quiz, computes scores
// locally, renders receipts, supports share links via URL hash, and emits
// anonymized analytics events.

const API = "";
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// Localization runtime (defined by i18n.js, loaded ahead of this module).
const I18N = window.I18N;
const t = (key, params) => I18N.t(key, params);

const IMPORTANCE_WEIGHTS = [0.5, 1.0, 2.0]; // low, medium, high
const IMPORTANCE_LABELS = ["low", "medium", "high"];

const FIELD_MAP = {
  career_path: "career_path_tags",
  demographic_background: "demographic_tags",
  geographic_background: "geographic_region",
  age_band: "age_band",
  endorsement_coalition: "endorsement_coalition_tags",
};

const state = {
  candidates: [],      // localized view (overlay merged onto candidatesRaw)
  candidatesRaw: [],   // English candidates from /api/candidates (source of truth)
  questionsRaw: [],    // English questions from /api/questions (source of truth)
  dimensionsRaw: [],   // English personal-fit dimensions
  issuesRaw: [],       // English issues from /api/dataset
  questions: [],       // localized view (overlay merged onto questionsRaw)
  dimensions: [],      // localized view
  positions: [],
  candidatesFull: [],
  issuesById: new Map(), // localized, keyed by issue id
  snapshot_date: "",
  dataset_version: "",
  phase: "intro",
  pIdx: 0,
  fIdx: 0,
  policyAnswers: [],   // { issue_id, stance, importance_idx }
  personalAnswers: [], // { dimension_id, type, value }
  sessionId: null,
  _lastStale: null,    // remembered stale-version for re-render on language switch
};

// ---------- Analytics ----------

function newSessionId() {
  // 16-byte random, base32-ish
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (b) => b.toString(36).padStart(2, "0")).join("").slice(0, 22);
}

function emitEvent(kind, extra = {}) {
  if (!state.sessionId) return;
  // Fire-and-forget; never block the UI on analytics.
  // NOTE: the path is /api/tally, not /api/event — "/api/event" is Plausible's
  // signature and is on uBlock/EasyPrivacy blocklists, so content blockers were
  // silently dropping every completion. Don't rename this back to /api/event.
  fetch(`${API}/api/tally`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    keepalive: true,
    body: JSON.stringify({ kind, session_id: state.sessionId, ...extra }),
  }).catch(() => {});
}

// ---------- Boot ----------

async function boot() {
  try {
    const [candidatesRes, questionsRes, dimensionsRes, datasetRes] = await Promise.all([
      fetch(`${API}/api/candidates`),
      fetch(`${API}/api/questions`),
      fetch(`${API}/api/personal-fit-dimensions`),
      fetch(`${API}/api/dataset`),
    ]);
    if (![candidatesRes, questionsRes, dimensionsRes, datasetRes].every((r) => r.ok)) {
      throw new Error("API error");
    }
    state.candidatesRaw = await candidatesRes.json();
    state.questionsRaw = await questionsRes.json();
    state.dimensionsRaw = await dimensionsRes.json();
    const dataset = await datasetRes.json();
    state.positions = dataset.positions || [];
    state.candidatesFull = dataset.candidates || [];
    state.snapshot_date = dataset.snapshot_date;
    state.dataset_version = dataset.version;
    state.issuesRaw = dataset.issues || [];
    // Build the localized view of the dataset for the current language.
    localizeDataset();

    $("#snapshot-date").textContent = state.snapshot_date;
    $("#footer-snapshot-date").textContent = state.snapshot_date;
    fillDynamicIntro();

    if (!state.questions.length) {
      $("#status").textContent = t("status.noQuestions");
      return;
    }
    $("#status").classList.add("hidden");

    // If URL has a share hash, decode and render results directly.
    const shared = decodeShareHash();
    if (shared) {
      // A shared link encodes answers against a specific dataset version. If the
      // dataset has since advanced (issues renumbered/added), the stances no
      // longer mean the same thing — warn rather than silently mis-score.
      const stale = shared.dataset_version && shared.dataset_version !== state.dataset_version;
      state.policyAnswers = shared.policyAnswers;
      state.personalAnswers = shared.personalAnswers;
      renderResults({ fromShare: true, staleVersion: stale ? shared.dataset_version : null });
      return;
    }

    $("#intro").classList.remove("hidden");
    $("#start-btn").onclick = startQuiz;
    $("#share-quiz").onclick = async () => {
      const url = quizShareUrl();
      try {
        await navigator.clipboard.writeText(url);
        $("#intro-share-status").textContent = t("intro.shareCopied");
      } catch {
        $("#intro-share-status").textContent = url;
      }
    };
  } catch (e) {
    $("#status").textContent = t("status.loadFailed", { msg: e.message });
  }
}

// Intro bits that mix translated copy with live data (counts) or are
// shown conditionally. Re-run on language change so they stay localized.
function fillDynamicIntro() {
  const count = state.questions.length + state.dimensions.length;
  const li = $("#how-count");
  if (li) li.textContent = t("intro.how.count", { count });
  const note = $("#intro-lang-note");
  if (note) {
    if (I18N.isDefaultLang()) {
      note.textContent = "";
      note.classList.add("hidden");
    } else {
      note.textContent = t("intro.langNote");
      note.classList.remove("hidden");
    }
  }
}

// Re-render whatever view is on screen after a language switch. Static markup
// is handled by I18N.apply(); the dataset view + these JS-built views are rebuilt.
function rerender() {
  localizeDataset();
  fillDynamicIntro();
  if (!$("#policy-quiz").classList.contains("hidden")) renderPolicyQuestion();
  if (!$("#personal-quiz").classList.contains("hidden")) renderPersonalQuestion();
  if (!$("#results").classList.contains("hidden")) {
    renderResults({ fromShare: true, staleVersion: state._lastStale });
  }
}

// ---------- Dataset localization ----------
// The English dataset (from the API) is the source of truth; window.DATASET_I18N
// supplies per-language overlays keyed by issue/dimension id. We merge the
// overlay onto the English originals to produce the rendered view, falling back
// to English for any field a translation is missing. Citations (source quotes
// and titles) carry no overlay and stay in English.

function localizeDataset() {
  const overlay = (window.DATASET_I18N && window.DATASET_I18N[I18N.lang]) || null;
  const qOv = (overlay && overlay.questions) || {};
  const dOv = (overlay && overlay.dimensions) || {};
  const cOv = (overlay && overlay.candidates) || {};
  state.candidates = (state.candidatesRaw || []).map((c) => localizeCandidate(c, cOv[c.id]));
  state.questions = (state.questionsRaw || []).map((q) => localizeIssueLike(q, qOv[q.id]));
  state.dimensions = (state.dimensionsRaw || []).map((d) => localizeDimension(d, dOv[d.id]));
  state.issuesById = new Map((state.issuesRaw || []).map((i) => [i.id, localizeIssueLike(i, qOv[i.id])]));
}

// Candidate names stay English (proper nouns, like citations); only the party
// label and the bio_short blurb carry an overlay.
function localizeCandidate(c, ov) {
  if (!ov) return c;
  const out = { ...c };
  if (ov.party) out.party = ov.party;
  if (ov.bio_short) out.bio_short = ov.bio_short;
  return out;
}

function localizeIssueLike(obj, ov) {
  if (!ov) return obj;
  const out = { ...obj };
  if (ov.name) out.name = ov.name;
  if (ov.short_description) out.short_description = ov.short_description;
  if (ov.stance_scale && Array.isArray(obj.stance_scale)) {
    out.stance_scale = obj.stance_scale.map((s) => ({ ...s, label: ov.stance_scale[String(s.value)] ?? s.label }));
  }
  if (obj.voter_guide && ov.voter_guide) {
    out.voter_guide = localizeVoterGuide(obj.voter_guide, ov.voter_guide);
  }
  return out;
}

function localizeVoterGuide(vg, ov) {
  const out = { ...vg };
  for (const f of ["explainer", "current_policy", "arguments_for_change", "arguments_against_change", "comparison", "note_on_options"]) {
    if (ov[f] != null) out[f] = ov[f];
  }
  if (Array.isArray(vg.key_facts) && Array.isArray(ov.key_facts)) {
    out.key_facts = vg.key_facts.map((f, i) => ov.key_facts[i] ?? f);
  }
  return out; // sources intentionally left in English (citations)
}

function localizeDimension(d, ov) {
  if (!ov) return d;
  const out = { ...d };
  if (ov.name) out.name = ov.name;
  if (ov.description) out.description = ov.description;
  if (d.type === "ordinal" && Array.isArray(d.scale) && ov.scale) {
    out.scale = d.scale.map((s) => ({ ...s, label: ov.scale[String(s.value)] ?? s.label }));
  }
  if (d.type === "multi_select" && Array.isArray(d.options) && ov.options) {
    out.options = d.options.map((o) => ({ ...o, label: ov.options[o.id] ?? o.label }));
  }
  return out;
}

function startQuiz() {
  state.sessionId = newSessionId();
  emitEvent("quiz_start");
  $("#intro").classList.add("hidden");
  startPolicyPhase();
}

// ---------- Policy phase ----------

function startPolicyPhase() {
  state.phase = "policy";
  $("#policy-quiz").classList.remove("hidden");
  renderPolicyQuestion();
}

function renderPolicyQuestion() {
  const q = state.questions[state.pIdx];
  scrollToTop();
  updateProgress();
  animateIn($("#policy-quiz"));
  $("#pq-title").textContent = q.name;
  $("#pq-desc").textContent = q.short_description;
  renderVoterGuide(q);
  renderAskAi(q);
  const optsEl = $("#pq-options");
  optsEl.innerHTML = "";
  let selected = null;
  // Pre-fill from any prior answer (so back-navigation shows what was chosen).
  const prior = state.policyAnswers[state.pIdx];
  q.stance_scale.forEach((opt) => {
    const id = `pq-opt-${q.id}-${opt.value}`;
    const wrap = document.createElement("label");
    wrap.className = "option";
    const checked = prior && prior.stance === opt.value ? "checked" : "";
    wrap.innerHTML = `<input type="radio" name="pq-stance" id="${id}" value="${opt.value}" ${checked} /> <span>${escapeHtml(opt.label)}</span>`;
    wrap.querySelector("input").addEventListener("change", (e) => {
      selected = Number(e.target.value);
      $("#pq-next").disabled = false;
    });
    if (checked) selected = opt.value;
    optsEl.appendChild(wrap);
  });
  $("#pq-importance").value = prior ? String(prior.importance_idx ?? 1) : "1";
  $("#pq-next").disabled = selected == null;
  $("#pq-back").disabled = state.pIdx === 0;
  $("#pq-progress").textContent = t("pq.progress", { n: state.pIdx + 1, total: state.questions.length });
  $("#pq-next").onclick = () => {
    if (selected == null) return;
    const importanceIdx = Number($("#pq-importance").value);
    state.policyAnswers[state.pIdx] = { issue_id: q.id, stance: selected, importance_idx: importanceIdx };
    emitEvent("policy_answer", { issue_id: q.id, stance: selected, importance: importanceIdx });
    advancePolicy();
  };
  $("#pq-skip").onclick = () => {
    state.policyAnswers[state.pIdx] = { issue_id: q.id, stance: null, importance_idx: 0 };
    advancePolicy();
  };
  $("#pq-back").onclick = () => {
    if (state.pIdx > 0) {
      state.pIdx -= 1;
      renderPolicyQuestion();
    }
  };
}

function advancePolicy() {
  state.pIdx += 1;
  if (state.pIdx >= state.questions.length) return startPersonalPhase();
  renderPolicyQuestion();
}

function renderVoterGuide(q) {
  const wrap = $("#pq-voter-guide");
  const body = wrap.querySelector(".voter-guide-body");
  const vg = q.voter_guide;
  if (!vg) {
    wrap.classList.add("hidden");
    body.innerHTML = "";
    return;
  }
  wrap.classList.remove("hidden");

  // Visible tier — the minimum to understand the issue and decide: what it is,
  // the status quo, and the case on each side.
  const visible = [];
  if (vg.explainer) {
    visible.push(`<div class="vg-section vg-explainer"><h4>${t("vg.basics")}</h4><p>${renderProse(vg.explainer)}</p></div>`);
  }
  if (vg.current_policy) {
    visible.push(`<div class="vg-section"><h4>${t("vg.current")}</h4><p>${renderProse(vg.current_policy)}</p></div>`);
  }
  const hasArgs = vg.arguments_for_change || vg.arguments_against_change;
  if (hasArgs) {
    visible.push(`
      <div class="vg-args">
        <div class="vg-arg vg-arg-for">
          <h4>${t("vg.argsFor")}</h4>
          <p>${renderProse(vg.arguments_for_change ?? "")}</p>
        </div>
        <div class="vg-arg vg-arg-against">
          <h4>${t("vg.argsAgainst")}</h4>
          <p>${renderProse(vg.arguments_against_change ?? "")}</p>
        </div>
      </div>`);
  }

  // Collapsed tier — reference detail for readers who want to go deeper.
  const more = [];
  if (Array.isArray(vg.key_facts) && vg.key_facts.length) {
    more.push(`<div class="vg-section"><h4>${t("vg.keyFacts")}</h4><ul>${vg.key_facts.map((f) => `<li>${renderProse(f)}</li>`).join("")}</ul></div>`);
  }
  if (vg.comparison) {
    more.push(`<div class="vg-section"><h4>${t("vg.comparison")}</h4><p>${renderProse(vg.comparison)}</p></div>`);
  }
  if (vg.note_on_options) {
    more.push(`<div class="vg-section vg-note"><h4>${t("vg.noteOnOptions")}</h4><p>${renderProse(vg.note_on_options)}</p></div>`);
  }
  if (Array.isArray(vg.sources) && vg.sources.length) {
    const items = vg.sources
      .map((s) => `<li><a href="${escapeAttr(s.url)}" target="_blank" rel="noopener">${escapeHtml(s.title)}</a></li>`)
      .join("");
    more.push(`<div class="vg-section vg-sources"><h4>${t("vg.sources")}</h4><ul>${items}</ul></div>`);
  }

  let html = visible.join("");
  if (more.length) {
    html += `<details class="vg-more"><summary>${t("vg.moreSummary")}</summary><div class="vg-more-body">${more.join("")}</div></details>`;
  }
  body.innerHTML = html;
}

// "Ask an AI about this topic" — its own box below the voter guide. Lets the
// user hand the topic off to their own ChatGPT/Claude (or copy a prompt) with
// the typed question + a link to the content-only /topic page.
function renderAskAi(q) {
  const wrap = $("#pq-ask-ai");
  const body = wrap.querySelector(".ask-ai-body");
  wrap.classList.remove("hidden");
  body.innerHTML = `
    <div class="vg-chat">
      <label class="vg-chat-label" for="vg-chat-q">${t("askai.label")}</label>
      <input type="text" id="vg-chat-q" class="vg-chat-input" maxlength="500" autocomplete="off"
        placeholder="${escapeAttr(t("askai.placeholder"))}" />
      <div class="vg-chat-actions">
        <button type="button" class="vg-chat-btn" data-target="chatgpt">${t("askai.chatgpt")}</button>
        <button type="button" class="vg-chat-btn" data-target="claude">${t("askai.claude")}</button>
        <button type="button" class="vg-chat-btn vg-chat-copy" data-target="copy">${t("askai.copy")}</button>
      </div>
      <p class="vg-chat-hint">${t("askai.hint")}</p>
    </div>`;
  wireTopicChat(body, q);
}

// Build the hand-off prompt for an external AI. The user's typed question (if
// any) leads; we point the model at the content-only /topic page so it can pull
// every candidate's sourced position rather than relying on us inlining it.
function buildTopicPrompt(q, question) {
  const topicUrl = `${location.origin}/topic/${encodeURIComponent(q.id)}`;
  const lead = question
    ? t("prompt.withQ", { name: q.name, question })
    : t("prompt.withoutQ", { name: q.name });
  const body = t("prompt.body", { url: topicUrl });
  // When the UI isn't in English, ask the AI to reply in the chosen language.
  const replyIn = t("prompt.replyIn");
  return replyIn ? `${lead}\n\n${body}\n\n${replyIn}` : `${lead}\n\n${body}`;
}

function wireTopicChat(body, q) {
  const input = body.querySelector(".vg-chat-input");
  body.querySelectorAll(".vg-chat-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const question = (input.value || "").trim();
      const prompt = buildTopicPrompt(q, question);
      // Capture the question (anonymous, fire-and-forget) before handing off.
      emitEvent("chat_opened", { issue_id: q.id, detail: question || null });
      const target = btn.dataset.target;
      if (target === "copy") {
        navigator.clipboard?.writeText(prompt).then(() => {
          const orig = btn.textContent;
          btn.textContent = t("askai.copied");
          setTimeout(() => { btn.textContent = orig; }, 1500);
        }).catch(() => {});
        return;
      }
      const base = target === "claude" ? "https://claude.ai/new?q=" : "https://chatgpt.com/?q=";
      window.open(base + encodeURIComponent(prompt), "_blank", "noopener");
    });
  });
}

// ---------- Personal-fit phase ----------

function startPersonalPhase() {
  state.phase = "personal";
  $("#policy-quiz").classList.add("hidden");
  $("#personal-quiz").classList.remove("hidden");
  if (!state.dimensions.length) return renderResults();
  renderPersonalQuestion();
}

function renderPersonalQuestion() {
  const d = state.dimensions[state.fIdx];
  scrollToTop();
  updateProgress();
  animateIn($("#personal-quiz"));
  $("#fq-title").textContent = d.name;
  $("#fq-desc").textContent = d.description;
  const optsEl = $("#fq-options");
  optsEl.innerHTML = "";

  // Pre-fill from any prior answer (for back-navigation).
  const prior = state.personalAnswers[state.fIdx];
  let answer = prior && prior.value != null ? prior.value : null;

  if (d.type === "ordinal") {
    d.scale.forEach((opt) => {
      const id = `fq-opt-${d.id}-${opt.value}`;
      const wrap = document.createElement("label");
      wrap.className = "option";
      const checked = typeof answer === "number" && answer === opt.value ? "checked" : "";
      wrap.innerHTML = `<input type="radio" name="fq-ord" id="${id}" value="${opt.value}" ${checked} /> <span>${escapeHtml(opt.label)}</span>`;
      wrap.querySelector("input").addEventListener("change", (e) => {
        answer = Number(e.target.value);
        $("#fq-next").disabled = false;
      });
      optsEl.appendChild(wrap);
    });
  } else if (d.type === "multi_select") {
    const checked = new Set(Array.isArray(answer) ? answer : []);
    d.options.forEach((opt) => {
      const id = `fq-opt-${d.id}-${opt.id}`;
      const wrap = document.createElement("label");
      wrap.className = "option";
      const isChecked = checked.has(opt.id) ? "checked" : "";
      wrap.innerHTML = `<input type="checkbox" id="${id}" value="${escapeAttr(opt.id)}" ${isChecked} /> <span>${escapeHtml(opt.label)}</span>`;
      wrap.querySelector("input").addEventListener("change", (e) => {
        if (e.target.checked) checked.add(e.target.value); else checked.delete(e.target.value);
        answer = Array.from(checked);
        $("#fq-next").disabled = checked.size === 0;
      });
      optsEl.appendChild(wrap);
    });
    if (checked.size > 0) answer = Array.from(checked);
  }

  const hasAnswer = (typeof answer === "number") || (Array.isArray(answer) && answer.length > 0);
  $("#fq-next").disabled = !hasAnswer;
  $("#fq-back").disabled = false; // always enabled in personal phase (back into policy)
  $("#fq-progress").textContent = t("fq.progress", { n: state.fIdx + 1, total: state.dimensions.length });
  $("#fq-next").onclick = () => {
    if (answer == null || (Array.isArray(answer) && answer.length === 0)) return;
    state.personalAnswers[state.fIdx] = { dimension_id: d.id, type: d.type, value: answer };
    emitEvent("personal_answer", { dimension_id: d.id });
    advancePersonal();
  };
  $("#fq-skip").onclick = () => {
    state.personalAnswers[state.fIdx] = { dimension_id: d.id, type: d.type, value: null };
    advancePersonal();
  };
  $("#fq-back").onclick = () => {
    if (state.fIdx > 0) {
      state.fIdx -= 1;
      renderPersonalQuestion();
    } else {
      // Back from first personal question → return to last policy question
      $("#personal-quiz").classList.add("hidden");
      state.phase = "policy";
      state.pIdx = state.questions.length - 1;
      $("#policy-quiz").classList.remove("hidden");
      renderPolicyQuestion();
    }
  };
}

function advancePersonal() {
  state.fIdx += 1;
  if (state.fIdx >= state.dimensions.length) return renderResults();
  renderPersonalQuestion();
}

// ---------- Scoring ----------

function scorePolicyDetailed(policyAnswers) {
  // Returns per-candidate { num, den, used, perIssue: [{ issue_id, agreement, weight, candidate_stance, user_stance, position }] }.
  const byCandidate = {};
  for (const c of state.candidates) byCandidate[c.id] = { num: 0, den: 0, used: 0, perIssue: [] };

  for (const ans of policyAnswers) {
    if (ans.stance == null) continue;
    const weight = IMPORTANCE_WEIGHTS[ans.importance_idx ?? 1];
    if (weight === 0) continue;
    const q = state.questions.find((x) => x.id === ans.issue_id);
    if (!q) continue;
    const range = Math.max(...q.stance_scale.map((s) => s.value)) - Math.min(...q.stance_scale.map((s) => s.value)) || 1;
    for (const c of state.candidates) {
      const pos = state.positions.find((p) => p.candidate_id === c.id && p.issue_id === ans.issue_id);
      if (!pos || pos.stance === "unknown" || typeof pos.stance !== "number") continue;
      const agreement = 1 - Math.abs(pos.stance - ans.stance) / range;
      const bucket = byCandidate[c.id];
      bucket.num += weight * agreement;
      bucket.den += weight;
      bucket.used += 1;
      bucket.perIssue.push({
        issue_id: ans.issue_id,
        agreement,
        weight,
        candidate_stance: pos.stance,
        user_stance: ans.stance,
        position: pos,
      });
    }
  }
  return byCandidate;
}

function scorePersonalFit(personalAnswers) {
  const byCandidate = {};
  for (const c of state.candidates) byCandidate[c.id] = { num: 0, den: 0, used: 0 };

  for (const ans of personalAnswers) {
    if (ans.value == null || (Array.isArray(ans.value) && ans.value.length === 0)) continue;
    const dim = state.dimensions.find((x) => x.id === ans.dimension_id);
    if (!dim) continue;

    for (const c of state.candidatesFull) {
      const attrs = c.personal_attributes || {};
      let agreement = null;

      if (dim.type === "ordinal") {
        const candidateValue = attrs[dim.id];
        if (typeof candidateValue !== "number") continue;
        const range = Math.max(...dim.scale.map((s) => s.value)) - Math.min(...dim.scale.map((s) => s.value)) || 1;
        agreement = 1 - Math.abs(candidateValue - ans.value) / range;
      } else if (dim.type === "multi_select") {
        const field = FIELD_MAP[dim.id] || dim.id;
        const raw = attrs[field];
        if (raw == null) continue;
        const candidateTags = Array.isArray(raw) ? raw : [raw];
        const userPicks = ans.value;
        const matches = candidateTags.filter((t) => userPicks.includes(t)).length;
        agreement = userPicks.length > 0 ? matches / userPicks.length : 0;
      }

      if (agreement != null) {
        byCandidate[c.id].num += agreement;
        byCandidate[c.id].den += 1;
        byCandidate[c.id].used += 1;
      }
    }
  }
  return byCandidate;
}

function buildRanking(policyAnswers, personalAnswers) {
  const policy = scorePolicyDetailed(policyAnswers);
  const personal = scorePersonalFit(personalAnswers);
  return state.candidates
    .map((c) => {
      const p = policy[c.id];
      const f = personal[c.id];
      const policy_pct = p.den > 0 ? Math.round((p.num / p.den) * 100) : null;
      const personal_pct = f.den > 0 ? Math.round((f.num / f.den) * 100) : null;
      // Top agreements & disagreements: weighted contribution = weight * agreement (for agreements)
      // and weight * (1 - agreement) (for disagreements). Top 3 of each, deduped.
      const agreements = [...p.perIssue]
        .sort((a, b) => (b.weight * b.agreement) - (a.weight * a.agreement))
        .slice(0, 3);
      const disagreements = [...p.perIssue]
        .sort((a, b) => (b.weight * (1 - b.agreement)) - (a.weight * (1 - a.agreement)))
        .slice(0, 3);
      return {
        ...c,
        policy_match_pct: policy_pct,
        policy_scored: p.used,
        personal_fit_pct: personal_pct,
        personal_scored: f.used,
        top_agreements: agreements,
        top_disagreements: disagreements,
      };
    })
    .sort((a, b) => (b.policy_match_pct ?? -1) - (a.policy_match_pct ?? -1));
}

// ---------- Results ----------

function renderResults({ fromShare = false, staleVersion = null } = {}) {
  scrollToTop();
  $("#policy-quiz").classList.add("hidden");
  $("#personal-quiz").classList.add("hidden");

  state._lastStale = staleVersion;
  const banner = $("#stale-banner");
  if (staleVersion) {
    banner.textContent = t("results.stale", { staleVersion, currentVersion: state.dataset_version });
    banner.classList.remove("hidden");
  } else {
    banner.classList.add("hidden");
  }

  const ranking = buildRanking(state.policyAnswers, state.personalAnswers);
  const rEl = $("#ranking");
  rEl.innerHTML = "";
  ranking.forEach((r, i) => {
    rEl.appendChild(renderRankingRow(r, i));
  });
  $("#results").classList.remove("hidden");
  // Celebratory reveal: the results card slides in and the #1 match pulses.
  animateIn($("#results"));
  rEl.firstElementChild?.classList.add("celebrate");

  // Why-not panel: compare top match against runner-up on the issues
  // where the runner-up did better than the top match.
  renderWhyNot(ranking);

  // What-if explorer
  renderWhatIf(ranking);

  // Headline the top match by name.
  const topMatch = ranking[0];
  $("#results-heading").textContent = topMatch ? t("results.heading", { name: topMatch.name }) : t("results.headingNone");

  // Method footnote mixes translated copy with the live dataset label.
  $("#results-method").innerHTML = t("results.method", { label: `dataset_${state.dataset_version}.json` });

  // Put the full-result link in the address bar so it can be copied straight
  // from there — no button click needed. (Encodes answers in the #r= hash.)
  history.replaceState(null, "", makeShareUrl());

  // Native, theme-aware recap of the top 3 matches. "Copy share link" copies
  // the share-card page URL (the same OG card that renders for social embeds).
  // The address bar already carries the full-result link for reproducing the rank.
  const top3 = ranking.filter((r) => r.policy_match_pct != null).slice(0, 3);
  const summaryEl = $("#top3-summary");
  summaryEl.innerHTML = "";
  top3.forEach((r, i) => {
    const li = document.createElement("li");
    li.className = `top3-row rank-${i + 1}`;
    li.innerHTML = `
      <span class="top3-rank">${i + 1}</span>
      <span class="top3-name"><strong>${escapeHtml(r.name)}</strong><span class="muted small">${escapeHtml(r.party ?? "")}</span></span>
      <span class="top3-pct">${r.policy_match_pct}%</span>
    `;
    summaryEl.appendChild(li);
  });

  const copyBtn = $("#copy-link");
  if (top3.length) {
    const cardUrl = top3CardUrl(top3);
    copyBtn.dataset.shareCard = cardUrl;
    copyBtn.classList.remove("hidden");
    copyBtn.onclick = async () => {
      try {
        await navigator.clipboard.writeText(cardUrl);
        $("#share-status").textContent = t("results.cardCopied");
      } catch {
        // Clipboard blocked — show the bare link so it can be copied by hand.
        $("#share-status").textContent = cardUrl;
      }
    };
  } else {
    copyBtn.classList.add("hidden");
  }
  $("#retake").onclick = () => {
    location.hash = "";
    location.reload();
  };

  if (!fromShare && ranking[0]?.policy_match_pct != null) {
    emitEvent("quiz_complete", {
      candidate_id: ranking[0].id,
      match_pct: ranking[0].policy_match_pct,
      lang: window.I18N?.lang,
    });
  }
}

function renderRankingRow(r, rank) {
  const li = document.createElement("li");
  li.dataset.candidateId = r.id;
  const policyPct = r.policy_match_pct == null ? "—" : `${r.policy_match_pct}%`;
  const personalPct = r.personal_fit_pct == null ? "—" : `${r.personal_fit_pct}%`;
  li.innerHTML = `
    <div class="result-row">
      <div class="result-name">
        <span class="rank-badge">#${rank + 1}</span>
        <strong>${escapeHtml(r.name)}</strong>
        <span class="muted">(${escapeHtml(r.party)})</span>
      </div>
      <div class="result-scores">
        <span class="score score-policy"><span class="score-label">${t("score.policy")}</span> <code>${policyPct}</code></span>
        <span class="score score-personal"><span class="score-label">${t("score.personalFit")}</span> <code>${personalPct}</code></span>
      </div>
    </div>
    <p class="muted small">${escapeHtml(r.bio_short ?? "")}</p>
    <p class="muted small">${t("rank.scored", { p: r.policy_scored, f: r.personal_scored })}</p>
    <details class="see-why"${rank === 0 ? " open" : ""}>
      <summary>${t("rank.seeWhy")}</summary>
      <div class="receipt-container"></div>
    </details>
  `;
  const container = li.querySelector(".receipt-container");
  container.appendChild(buildReceipt(r));
  return li;
}

function buildReceipt(candidate) {
  const tpl = $("#receipt-template").content.cloneNode(true);
  I18N.apply(tpl); // localize the cloned template's static [data-i18n] headings
  const agreementsList = tpl.querySelector('[data-list="agreements"]');
  const disagreementsList = tpl.querySelector('[data-list="disagreements"]');
  populateReceiptList(agreementsList, candidate.top_agreements, candidate, "agreement");
  populateReceiptList(disagreementsList, candidate.top_disagreements, candidate, "disagreement");
  return tpl;
}

function populateReceiptList(ul, items, candidate, kind) {
  if (!items?.length) {
    const li = document.createElement("li");
    li.className = "muted small";
    li.textContent = kind === "agreement" ? t("receipt.noAgree") : t("receipt.noDisagree");
    ul.appendChild(li);
    return;
  }
  for (const item of items) {
    const issue = state.issuesById.get(item.issue_id);
    if (!issue) continue;
    const pct = Math.round((kind === "agreement" ? item.agreement : 1 - item.agreement) * 100);
    const stanceLabel = issue.stance_scale.find((s) => s.value === item.candidate_stance)?.label ?? t("receipt.stanceFallback", { value: item.candidate_stance });
    const yourLabel = issue.stance_scale.find((s) => s.value === item.user_stance)?.label ?? t("receipt.stanceFallback", { value: item.user_stance });
    const li = document.createElement("li");
    li.className = "receipt-item";
    const pos = item.position;
    const quote = pos.source_quote ? `<blockquote>"${escapeHtml(pos.source_quote)}"</blockquote>` : "";
    const sourceLink = pos.source_url
      ? `<a class="receipt-source" href="${escapeAttr(pos.source_url)}" target="_blank" rel="noopener">${t("receipt.source")}</a>`
      : "";
    li.innerHTML = `
      <div class="receipt-issue">
        <strong>${escapeHtml(issue.name)}</strong>
        <span class="muted small">${kind === "agreement" ? t("receipt.agreePct", { pct }) : t("receipt.apartPct", { pct })}</span>
      </div>
      <div class="muted small">${t("receipt.youVs", { you: escapeHtml(yourLabel), name: escapeHtml(candidate.name), them: escapeHtml(stanceLabel) })}</div>
      ${quote}
      <div class="receipt-actions">
        ${sourceLink}
        <button class="flag-btn" data-candidate="${escapeAttr(candidate.id)}" data-issue="${escapeAttr(item.issue_id)}">${t("receipt.flag")}</button>
      </div>
    `;
    const flagBtn = li.querySelector(".flag-btn");
    flagBtn.addEventListener("click", () => onFlagClick(candidate, issue, flagBtn));
    ul.appendChild(li);
  }
}

async function onFlagClick(candidate, issue, btn) {
  const reason = prompt(t("receipt.flagPrompt", { name: candidate.name, issue: issue.name }));
  if (reason == null) return;
  btn.disabled = true;
  btn.textContent = t("receipt.sending");
  try {
    const res = await fetch(`${API}/api/flag`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ candidate_id: candidate.id, issue_id: issue.id, reason: reason.slice(0, 2000) }),
    });
    btn.textContent = res.ok ? t("receipt.flagged") : t("receipt.failed");
  } catch {
    btn.textContent = t("receipt.failed");
  }
}

function renderWhatIf(originalRanking) {
  const answeredIssues = state.policyAnswers.filter((a) => a.stance != null);
  if (!answeredIssues.length) {
    $("#what-if").classList.add("hidden");
    return;
  }
  const select = $("#wi-issue");
  select.innerHTML = "";
  for (const a of answeredIssues) {
    const issue = state.issuesById.get(a.issue_id);
    if (!issue) continue;
    const stanceLabel = issue.stance_scale.find((s) => s.value === a.stance)?.label ?? "?";
    const opt = document.createElement("option");
    opt.value = a.issue_id;
    opt.textContent = t("whatif.optionLabel", { issue: issue.name, label: stanceLabel });
    select.appendChild(opt);
  }

  const optionsEl = $("#wi-options");
  const resultEl = $("#wi-result");

  function renderAlternatives() {
    const issueId = select.value;
    const issue = state.issuesById.get(issueId);
    const userAnswer = state.policyAnswers.find((a) => a.issue_id === issueId);
    if (!issue || !userAnswer) return;
    optionsEl.innerHTML = "";
    for (const opt of issue.stance_scale) {
      if (opt.value === userAnswer.stance) continue;
      const btn = document.createElement("button");
      btn.className = "wi-option";
      btn.textContent = t("whatif.alt", { label: opt.label });
      btn.onclick = () => recompute(issueId, opt.value);
      optionsEl.appendChild(btn);
    }
    resultEl.innerHTML = "";
  }

  function recompute(issueId, newStance) {
    const swapped = state.policyAnswers.map((a) =>
      a.issue_id === issueId ? { ...a, stance: newStance } : a,
    );
    const newRanking = buildRanking(swapped, state.personalAnswers);

    const rows = newRanking.slice(0, 3).map((nr, i) => {
      const orig = originalRanking.findIndex((o) => o.id === nr.id);
      const delta = orig - i;
      const arrow = delta === 0 ? "—" : delta > 0 ? `↑${delta}` : `↓${-delta}`;
      const klass = delta === 0 ? "wi-flat" : delta > 0 ? "wi-up" : "wi-down";
      const rowText = t("whatif.row", {
        name: `<strong>${escapeHtml(nr.name)}</strong>`,
        pct: nr.policy_match_pct ?? "—",
        was: originalRanking[orig]?.policy_match_pct ?? "—",
      });
      return `<li><span class="${klass}">${arrow}</span> ${rowText}</li>`;
    }).join("");

    resultEl.innerHTML = `
      <p class="muted small">${t("whatif.newTop3")}</p>
      <ol class="wi-ranking">${rows}</ol>
    `;
  }

  select.onchange = renderAlternatives;
  renderAlternatives();
}

function renderWhyNot(ranking) {
  if (ranking.length < 2) return;
  const [top, runner] = ranking;
  if (top.policy_match_pct == null || runner.policy_match_pct == null) return;

  // Find issues where the runner beat the top match by the largest margin.
  const topByIssue = new Map(top.top_agreements.concat(top.top_disagreements).map((x) => [x.issue_id, x.agreement]));
  const runnerByIssue = new Map(runner.top_agreements.concat(runner.top_disagreements).map((x) => [x.issue_id, x.agreement]));

  const issueIds = new Set([...topByIssue.keys(), ...runnerByIssue.keys()]);
  const margins = [];
  for (const issueId of issueIds) {
    const t = topByIssue.get(issueId);
    const r = runnerByIssue.get(issueId);
    if (t == null || r == null) continue;
    margins.push({ issueId, delta: r - t });
  }
  margins.sort((a, b) => b.delta - a.delta);
  const flips = margins.filter((m) => m.delta > 0).slice(0, 2);
  if (!flips.length) return;

  const lines = flips
    .map((m) => `“${escapeHtml(state.issuesById.get(m.issueId)?.name ?? m.issueId)}”`)
    .join(t("whynot.and"));
  $("#why-not-body").innerHTML = t("whynot.body", {
    top: escapeHtml(top.name),
    topPct: top.policy_match_pct,
    runner: escapeHtml(runner.name),
    runnerPct: runner.policy_match_pct,
    lines,
  });
  $("#why-not").classList.remove("hidden");
}

// ---------- Share-link encoding ----------
// We pack {policyAnswers, personalAnswers} into a compact base64url string in the URL hash.
// Hash payload survives the server, works offline, no server state needed.

function makeShareUrl() {
  const payload = {
    v: 1,
    ds: state.dataset_version,
    p: state.policyAnswers.map((a) => [a.issue_id, a.stance, a.importance_idx]),
    f: state.personalAnswers.map((a) => [a.dimension_id, a.value]),
  };
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  const b64 = btoa(bin).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
  const url = new URL(location.href);
  url.hash = `r=${b64}`;
  return url.toString();
}

function decodeShareHash() {
  const hash = location.hash.slice(1);
  if (!hash.startsWith("r=")) return null;
  try {
    const raw = hash.slice(2).replace(/-/g, "+").replace(/_/g, "/");
    const pad = raw.length % 4 ? "=".repeat(4 - (raw.length % 4)) : "";
    const bin = atob(raw + pad);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const json = new TextDecoder().decode(bytes);
    const payload = JSON.parse(json);
    if (payload.v !== 1) return null;
    return {
      dataset_version: payload.ds ?? null,
      policyAnswers: payload.p.map(([issue_id, stance, importance_idx]) => ({ issue_id, stance, importance_idx })),
      personalAnswers: payload.f.map(([dimension_id, value]) => ({ dimension_id, type: Array.isArray(value) ? "multi_select" : "ordinal", value })),
    };
  } catch {
    return null;
  }
}

// ---------- Utilities ----------

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function escapeAttr(s) {
  return escapeHtml(s);
}

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

// Overall progress across both phases (policy questions + personal-fit dims).
// Fill reflects the current step so the bar grows with each "Question N of M".
function updateProgress() {
  const total = state.questions.length + state.dimensions.length;
  if (!total) return;
  const step = state.phase === "personal" ? state.questions.length + state.fIdx : state.pIdx;
  const pct = Math.round(((step + 1) / total) * 100);
  $$(".progress-fill").forEach((el) => { el.style.width = `${pct}%`; });
}

// Re-trigger the enter animation on each render by clearing the class, forcing
// a reflow, then re-adding it — the same card element is reused across questions,
// so without the reset it would only animate once. CSS gates the actual motion.
function animateIn(el) {
  if (!el) return;
  el.classList.remove("anim-in");
  void el.offsetWidth;
  el.classList.add("anim-in");
}

// The quiz's own shareable URL — base page, no result hash.
function quizShareUrl() {
  return `${location.origin}${location.pathname}`;
}

// Absolute URL to the top-3 share card page (worker renders an SVG + OG tags).
function top3CardUrl(top3) {
  const c = top3.map((r) => encodeURIComponent(r.id)).join(",");
  const p = top3.map((r) => r.policy_match_pct).join(",");
  return `${location.origin}/api/share-card.svg?c=${c}&p=${p}`;
}

// Render curated prose with inline markdown links: [label](https://…).
// Content is author-controlled (our dataset), but we still escape everything
// and only allow http(s) links so a bad URL can't inject markup.
function renderProse(s) {
  const escaped = escapeHtml(s);
  return escaped.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_m, label, url) => {
    return `<a href="${url}" target="_blank" rel="noopener">${label}</a>`;
  });
}

document.addEventListener("i18n:change", rerender);

boot();
