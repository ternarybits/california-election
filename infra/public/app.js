// CA 2026 Candidate Matcher — client app.
// Loads dataset from the Worker, runs the two-phase quiz, computes scores
// locally, renders receipts, supports share links via URL hash, and emits
// anonymized analytics events.

const API = "";
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

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
  candidates: [],
  questions: [],
  dimensions: [],
  positions: [],
  candidatesFull: [],
  issuesById: new Map(),
  snapshot_date: "",
  dataset_version: "",
  phase: "intro",
  pIdx: 0,
  fIdx: 0,
  policyAnswers: [],   // { issue_id, stance, importance_idx }
  personalAnswers: [], // { dimension_id, type, value }
  sessionId: null,
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
  fetch(`${API}/api/event`, {
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
    state.candidates = await candidatesRes.json();
    state.questions = await questionsRes.json();
    state.dimensions = await dimensionsRes.json();
    const dataset = await datasetRes.json();
    state.positions = dataset.positions || [];
    state.candidatesFull = dataset.candidates || [];
    state.snapshot_date = dataset.snapshot_date;
    state.dataset_version = dataset.version;
    state.issuesById = new Map(dataset.issues.map((i) => [i.id, i]));

    $("#snapshot-date").textContent = state.snapshot_date;
    $("#footer-snapshot-date").textContent = state.snapshot_date;
    $("#dataset-label").textContent = `dataset_${state.dataset_version}.json`;

    if (!state.questions.length) {
      $("#status").innerHTML = "<p>No questions configured. Run scripts/score_questions.mjs and redeploy.</p>";
      return;
    }
    $("#status").classList.add("hidden");

    // If URL has a share hash, decode and render results directly.
    const shared = decodeShareHash();
    if (shared) {
      state.policyAnswers = shared.policyAnswers;
      state.personalAnswers = shared.personalAnswers;
      renderResults({ fromShare: true });
      return;
    }

    $("#intro").classList.remove("hidden");
    $("#start-btn").onclick = startQuiz;
  } catch (e) {
    $("#status").innerHTML = `<p>Failed to load: ${e.message}</p>`;
  }
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
  $("#pq-title").textContent = q.name;
  $("#pq-desc").textContent = q.short_description;
  const optsEl = $("#pq-options");
  optsEl.innerHTML = "";
  let selected = null;
  q.stance_scale.forEach((opt) => {
    const id = `pq-opt-${q.id}-${opt.value}`;
    const wrap = document.createElement("label");
    wrap.className = "option";
    wrap.innerHTML = `<input type="radio" name="pq-stance" id="${id}" value="${opt.value}" /> <span>${opt.label}</span>`;
    wrap.querySelector("input").addEventListener("change", (e) => {
      selected = Number(e.target.value);
      $("#pq-next").disabled = false;
    });
    optsEl.appendChild(wrap);
  });
  $("#pq-importance").value = "1";
  $("#pq-next").disabled = true;
  $("#pq-progress").textContent = `Question ${state.pIdx + 1} of ${state.questions.length}`;
  $("#pq-next").onclick = () => {
    if (selected == null) return;
    const importanceIdx = Number($("#pq-importance").value);
    state.policyAnswers.push({ issue_id: q.id, stance: selected, importance_idx: importanceIdx });
    emitEvent("policy_answer", { issue_id: q.id, stance: selected, importance: importanceIdx });
    advancePolicy();
  };
  $("#pq-skip").onclick = () => {
    state.policyAnswers.push({ issue_id: q.id, stance: null, importance_idx: 0 });
    advancePolicy();
  };
}

function advancePolicy() {
  state.pIdx += 1;
  if (state.pIdx >= state.questions.length) return startPersonalPhase();
  renderPolicyQuestion();
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
  $("#fq-title").textContent = d.name;
  $("#fq-desc").textContent = d.description;
  const optsEl = $("#fq-options");
  optsEl.innerHTML = "";

  let answer = null;

  if (d.type === "ordinal") {
    d.scale.forEach((opt) => {
      const id = `fq-opt-${d.id}-${opt.value}`;
      const wrap = document.createElement("label");
      wrap.className = "option";
      wrap.innerHTML = `<input type="radio" name="fq-ord" id="${id}" value="${opt.value}" /> <span>${opt.label}</span>`;
      wrap.querySelector("input").addEventListener("change", (e) => {
        answer = Number(e.target.value);
        $("#fq-next").disabled = false;
      });
      optsEl.appendChild(wrap);
    });
  } else if (d.type === "multi_select") {
    const checked = new Set();
    d.options.forEach((opt) => {
      const id = `fq-opt-${d.id}-${opt.id}`;
      const wrap = document.createElement("label");
      wrap.className = "option";
      wrap.innerHTML = `<input type="checkbox" id="${id}" value="${opt.id}" /> <span>${opt.label}</span>`;
      wrap.querySelector("input").addEventListener("change", (e) => {
        if (e.target.checked) checked.add(e.target.value); else checked.delete(e.target.value);
        answer = Array.from(checked);
        $("#fq-next").disabled = checked.size === 0;
      });
      optsEl.appendChild(wrap);
    });
  }

  $("#fq-next").disabled = true;
  $("#fq-progress").textContent = `Personal-fit ${state.fIdx + 1} of ${state.dimensions.length}`;
  $("#fq-next").onclick = () => {
    if (answer == null) return;
    state.personalAnswers.push({ dimension_id: d.id, type: d.type, value: answer });
    emitEvent("personal_answer", { dimension_id: d.id });
    advancePersonal();
  };
  $("#fq-skip").onclick = () => {
    state.personalAnswers.push({ dimension_id: d.id, type: d.type, value: null });
    advancePersonal();
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

function renderResults({ fromShare = false } = {}) {
  $("#policy-quiz").classList.add("hidden");
  $("#personal-quiz").classList.add("hidden");

  const ranking = buildRanking(state.policyAnswers, state.personalAnswers);
  const rEl = $("#ranking");
  rEl.innerHTML = "";
  ranking.forEach((r, i) => {
    rEl.appendChild(renderRankingRow(r, i));
  });
  $("#results").classList.remove("hidden");

  // Why-not panel: compare top match against runner-up on the issues
  // where the runner-up did better than the top match.
  renderWhyNot(ranking);

  // What-if explorer
  renderWhatIf(ranking);

  // Share link wiring
  const shareUrl = makeShareUrl();
  const copyBtn = $("#copy-link");
  copyBtn.onclick = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      $("#share-status").textContent = `Copied: ${shareUrl}`;
    } catch {
      $("#share-status").textContent = shareUrl;
    }
  };
  // Share-card preview link (worker endpoint renders an SVG with the top result).
  if (ranking[0]?.policy_match_pct != null) {
    const top = ranking[0];
    $("#share-card-link").href = `/api/share-card.svg?c=${encodeURIComponent(top.id)}&p=${top.policy_match_pct}`;
  } else {
    $("#share-card-link").classList.add("hidden");
  }
  $("#retake").onclick = () => {
    location.hash = "";
    location.reload();
  };

  if (!fromShare && ranking[0]?.policy_match_pct != null) {
    emitEvent("quiz_complete", {
      candidate_id: ranking[0].id,
      match_pct: ranking[0].policy_match_pct,
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
        <span class="score score-policy"><span class="score-label">policy</span> <code>${policyPct}</code></span>
        <span class="score score-personal"><span class="score-label">personal fit</span> <code>${personalPct}</code></span>
      </div>
    </div>
    <p class="muted small">${escapeHtml(r.bio_short ?? "")}</p>
    <p class="muted small">${r.policy_scored} policy q's scored · ${r.personal_scored} personal-fit dims scored</p>
    <details class="see-why">
      <summary>see why</summary>
      <div class="receipt-container"></div>
    </details>
  `;
  const container = li.querySelector(".receipt-container");
  container.appendChild(buildReceipt(r));
  return li;
}

function buildReceipt(candidate) {
  const tpl = $("#receipt-template").content.cloneNode(true);
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
    li.textContent = kind === "agreement" ? "No scored agreements." : "No scored disagreements.";
    ul.appendChild(li);
    return;
  }
  for (const item of items) {
    const issue = state.issuesById.get(item.issue_id);
    if (!issue) continue;
    const pct = Math.round((kind === "agreement" ? item.agreement : 1 - item.agreement) * 100);
    const stanceLabel = issue.stance_scale.find((s) => s.value === item.candidate_stance)?.label ?? `stance ${item.candidate_stance}`;
    const yourLabel = issue.stance_scale.find((s) => s.value === item.user_stance)?.label ?? `stance ${item.user_stance}`;
    const li = document.createElement("li");
    li.className = "receipt-item";
    const pos = item.position;
    const quote = pos.source_quote ? `<blockquote>"${escapeHtml(pos.source_quote)}"</blockquote>` : "";
    const sourceLink = pos.source_url
      ? `<a class="receipt-source" href="${escapeAttr(pos.source_url)}" target="_blank" rel="noopener">source</a>`
      : "";
    li.innerHTML = `
      <div class="receipt-issue">
        <strong>${escapeHtml(issue.name)}</strong>
        <span class="muted small">${kind === "agreement" ? pct + "% agree" : pct + "% apart"}</span>
      </div>
      <div class="muted small">You: ${escapeHtml(yourLabel)} · ${escapeHtml(candidate.name)}: ${escapeHtml(stanceLabel)}</div>
      ${quote}
      <div class="receipt-actions">
        ${sourceLink}
        <button class="flag-btn" data-candidate="${escapeAttr(candidate.id)}" data-issue="${escapeAttr(item.issue_id)}">flag</button>
      </div>
    `;
    const flagBtn = li.querySelector(".flag-btn");
    flagBtn.addEventListener("click", () => onFlagClick(candidate, issue, flagBtn));
    ul.appendChild(li);
  }
}

async function onFlagClick(candidate, issue, btn) {
  const reason = prompt(`Flag ${candidate.name}'s position on "${issue.name}" — what's wrong?`);
  if (reason == null) return;
  btn.disabled = true;
  btn.textContent = "sending…";
  try {
    const res = await fetch(`${API}/api/flag`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ candidate_id: candidate.id, issue_id: issue.id, reason: reason.slice(0, 2000) }),
    });
    btn.textContent = res.ok ? "flagged ✓" : "failed";
  } catch {
    btn.textContent = "failed";
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
    opt.textContent = `${issue.name} — you said: ${stanceLabel}`;
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
      btn.textContent = `→ what if you'd said: ${opt.label}`;
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
      return `<li><span class="${klass}">${arrow}</span> <strong>${escapeHtml(nr.name)}</strong> — ${nr.policy_match_pct ?? "—"}% policy (was ${originalRanking[orig]?.policy_match_pct ?? "—"}%)</li>`;
    }).join("");

    resultEl.innerHTML = `
      <p class="muted small">New top 3 (changes vs. your original ranking):</p>
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
    .join(" and ");
  $("#why-not-body").innerHTML = `Your top match was <strong>${escapeHtml(top.name)}</strong> at ${top.policy_match_pct}%. <strong>${escapeHtml(runner.name)}</strong> (${runner.policy_match_pct}%) edged them on ${lines}.`;
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

boot();
