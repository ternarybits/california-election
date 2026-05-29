// i18n.js — lightweight localization for the candidate matcher.
//
// Loaded as a classic <script> in <head> (after theme.js) so window.I18N exists
// before app.js (a module) runs. It:
//   - picks a language from the ?locale= URL param, else localStorage, else the
//     browser locale, else English (a ?locale= link wins and is persisted, so a
//     shared https://…/?locale=zh-CN link opens in that language)
//   - fills any element carrying data-i18n / data-i18n-aria / data-i18n-placeholder
//   - exposes I18N.t(key, params) for the strings app.js builds at runtime
//   - persists the choice and dispatches "i18n:change" so app.js can re-render
//
// Scope: this translates the app's own UI. Dataset-sourced text (question
// wording, candidate positions, verbatim source quotes) stays in English — it
// is the cited, verified-facts layer and is not machine-translated.

var I18N_SUPPORTED = ["en", "es", "zh", "vi", "tl", "ko"];
// Each language's name in its own script, for the selector.
var I18N_AUTONYMS = { en: "English", es: "Español", zh: "中文", vi: "Tiếng Việt", tl: "Tagalog", ko: "한국어" };
// Human language name to ask an external AI to reply in (used in hand-off prompt).
var I18N_REPLY_LANG = { en: "English", es: "Spanish", zh: "Chinese", vi: "Vietnamese", tl: "Tagalog", ko: "Korean" };
// Full BCP-47 locale (language + region) we emit in the ?locale= URL param and
// share links, so the value is a real locale rather than a bare language. Every
// reader is US-based (this is a California election), so the region is US — the
// audience, not the language's country of origin — EXCEPT Chinese, which stays
// zh-CN to preserve the Simplified-script signal (zh-US would be ambiguous, since
// US Chinese readers split between Simplified and Traditional; our content is
// Simplified). The region is otherwise just a label: normalize() discards it on
// read (every tag maps back to one of the six base languages) and also tolerates
// a bare code or any other region. (If we ever add Traditional Chinese, split on
// script: zh-Hans/zh-CN for Simplified vs zh-Hant/zh-TW for Traditional.)
var I18N_LOCALES = { en: "en-US", es: "es-US", zh: "zh-CN", vi: "vi-US", tl: "tl-US", ko: "ko-US" };
function localeTag(l) { return I18N_LOCALES[l] || l; }

// English is the source of truth. Other languages are merged in below; any
// missing key falls back to the English string, so partial translations are safe.
var TRANSLATIONS = {
  en: {
    // ---- document meta ----
    "meta.title": "CA 2026 Governor Primary — Candidate Matcher",
    "meta.description": "Find which candidate in California's June 2, 2026 gubernatorial primary best aligns with your values. Differentiation-first questions, cited sources, open dataset.",

    // ---- header ----
    "header.langAria": "Choose language",
    "header.h1": "California 2026 Governor — Candidate Matcher",
    "header.subtitle": "For the June 2, 2026 gubernatorial primary. Pick where you stand, then match against where the candidates actually stand.",

    // ---- status ----
    "status.loading": "Loading dataset…",
    "status.noQuestions": "No questions configured. Run scripts/score_questions.mjs and redeploy.",
    "status.loadFailed": "Failed to load: {msg}",

    // ---- intro / about ----
    "intro.about.h2": "What is this?",
    "intro.about.lead": "A non-partisan way to find which candidate in California's June 2026 governor primary you actually line up with — and exactly why. A few things set it apart from the usual candidate quiz:",
    "intro.about.differ": "<strong>Only questions where the candidates actually differ.</strong> No \"do you support good schools?\" filler — every question is one the field is genuinely split on, chosen by spread.",
    "intro.about.keepAsking": "<strong>You can keep asking.</strong> From any question, hand the topic to ChatGPT or Claude — pre-loaded with that topic's sourced guide — and go as deep as you want. It also works in agentic browsers like <a href=\"https://www.diabrowser.com/\" target=\"_blank\" rel=\"noopener\">Dia</a>, or copy the prompt into any AI agent you like.",
    "intro.about.dataset": "<strong>An AI-researched, fully-cited dataset.</strong> Every candidate position was researched and assembled by AI from primary sources — not hand-curated by a research team — and each one links to a dated quote you can open and check yourself.",

    "intro.how.h2": "How this works",
    "intro.how.count": "{count} questions in all — skip any you'd rather not answer.",
    "intro.how.importance": "Per-question importance slider; defaults to medium so you can just answer.",
    "intro.how.scores": "Two separate scores per candidate: <strong>policy match</strong> and <strong>personal fit</strong>.",
    "intro.how.sources": "Every position links to a primary-source quote. Flag anything that's wrong.",
    "intro.how.privacy": "We log anonymized response counts to build a public stats page. No tracking cookies, no IPs stored.",
    "intro.langNote": "Note: candidate names and the cited source material (verbatim quotes and source titles) are shown in English, so every position stays checkable against its original primary source.",

    "intro.start": "start the quiz",
    "intro.share": "share this quiz",
    "intro.snapshot": "Snapshot date:",
    "intro.shareCopied": "Quiz link copied to clipboard ✓",

    // ---- FAQ ----
    "faq.h3": "Questions &amp; methodology",
    "faq.q1.s": "How were the questions chosen?",
    "faq.q1.a": "Every question is one where the candidates <em>actually</em> differ. We start from the full matrix of candidate positions and rank each issue by a <strong>differentiation score</strong> — how widely the field spreads, scaled by how well-researched the issue is. The questions you see are the highest-spread issues. Topics where nearly everyone agrees become footnotes, not questions. (The full ranking, including the lower-spread issues, is in the open dataset.)",
    "faq.q2.s": "How were the candidate positions researched?",
    "faq.q2.a": "The dataset was researched and assembled by AI, working from primary sources — there was no human research team hand-curating it. The guardrail that keeps it honest: every position links to a primary source — a campaign website, interview, debate transcript, op-ed, or voting record — with a verbatim quote, a link, and a date, and any issue a candidate hasn't publicly addressed is marked <em>\"unknown\"</em> rather than guessed (10 of 200 positions are honest unknowns). So you never have to take the AI's word for it — open the source on any position and check it yourself. Expand \"Background &amp; arguments\" on any question to see the sourcing.",
    "faq.q3.s": "What if I think a position is wrong?",
    "faq.q3.a": "On your results page, expand <strong>\"see why you matched\"</strong> under any candidate — each cited position has a <strong>⚑ flag this</strong> button. You can also open an issue or pull request on <a href=\"https://github.com/ternarybits/california-election\" target=\"_blank\" rel=\"noopener\">GitHub</a>. Both routes feed the same correction queue, and the entire dataset is public so anyone can audit it.",
    "faq.q4.s": "How is my match calculated?",
    "faq.q4.a": "Simple, auditable math — no black-box AI ranking. For each question we compare your stance to each candidate's on the same scale, weight it by how important you said the issue is, and average. You get <strong>two separate scores</strong> — policy match and personal fit — that are never blended into a single number. Candidates with an \"unknown\" position on a question are simply not scored on it.",
    "faq.q5.s": "Is this partisan?",
    "faq.q5.a": "No — it's a non-partisan, open-source project, not an endorsement engine. Every stance scale is written so neither end is \"the right answer,\" and each question shows steelmanned arguments for both sides. The goal is to help you find <em>alignment</em>, not to tell you who to vote for. Code and data live on <a href=\"https://github.com/ternarybits/california-election\" target=\"_blank\" rel=\"noopener\">GitHub</a>.",
    "faq.q6.s": "Can I dig deeper on a topic?",
    "faq.q6.a": "Yes — this is the part I'm most excited about. On every question, under \"Go deeper,\" type a question and hand the topic to <strong>ChatGPT</strong> or <strong>Claude</strong> in one click — it opens pre-loaded with that topic's sourced guide so the AI can reason from the same primary sources. It also works in agentic browsers like <a href=\"https://www.diabrowser.com/\" target=\"_blank\" rel=\"noopener\">Dia</a> that can read the page directly, and there's a <strong>Copy prompt</strong> button so you can paste it into any AI agent you prefer. Power users can also connect the project's <strong>MCP server</strong> to Claude or Cursor — see the GitHub repo.",
    "faq.q7.s": "Is my data tracked?",
    "faq.q7.a": "We log anonymized aggregate counts (which answers get chosen, which candidate matched) to build a public stats page. No cookies, no IP addresses, no per-person profiles. Your individual answers stay in your browser, and your shareable result link encodes your answers in the URL — not on our server.",
    "faq.q8.s": "How current is this, and can I use it in my own AI assistant?",
    "faq.q8.a": "Every page shows a snapshot date; positions can shift during a campaign, so we version the dataset and re-check as the June 2026 primary approaches. There's also an <strong>MCP server</strong> that plugs the dataset into Claude or Cursor, so you can talk through the issues conversationally — see the GitHub repo for setup.",
    "faq.q9.s": "Who built this — and why?",
    "faq.q9.a": "Built by <a href=\"https://www.linkedin.com/in/tedmao/\" target=\"_blank\" rel=\"noopener\">Ted Mao</a>. The first version came together at an AI hack-day at <a href=\"https://thegp.com\" target=\"_blank\" rel=\"noopener\">The General Partnership</a>, the venture firm I'm affiliated with, then I cleaned it up to share. It's also a small showcase of how far AI can carry a project end-to-end — researching the dataset, building the app, and powering the in-product follow-up questions. I'm the founder of <a href=\"https://www.gumnut.ai\" target=\"_blank\" rel=\"noopener\">Gumnut</a>; this is a personal side project, not affiliated with any campaign.",

    // ---- policy quiz ----
    "pq.phase": "Policy questions",
    "pq.guideHeading": "Background &amp; arguments",
    "pq.askHeading": "Go deeper",
    "pq.importance": "How much does this question matter to you?",
    "imp.low": "low",
    "imp.medium": "medium",
    "imp.high": "high",
    "nav.back": "← back",
    "nav.skip": "skip",
    "nav.next": "next →",
    "pq.progress": "Question {n} of {total}",

    // ---- personal-fit quiz ----
    "fq.phase": "Personal fit",
    "fq.skip": "no preference",
    "fq.progress": "Personal-fit {n} of {total}",

    // ---- voter guide section headings (app-rendered) ----
    "vg.basics": "The basics",
    "vg.current": "Current California policy",
    "vg.argsFor": "Arguments for change",
    "vg.argsAgainst": "Arguments against change",
    "vg.keyFacts": "Key facts",
    "vg.comparison": "How CA compares",
    "vg.noteOnOptions": "Note on the options",
    "vg.sources": "Sources",
    "vg.moreSummary": "More background — key facts, how CA compares, sources",

    // ---- ask-AI box ----
    "askai.label": "Have a question about this topic? Ask an AI assistant.",
    "askai.placeholder": "e.g. How would this affect renters in my city?",
    "askai.chatgpt": "Ask ChatGPT →",
    "askai.claude": "Ask Claude →",
    "askai.copy": "Copy prompt",
    "askai.copied": "Copied ✓",
    "askai.hint": "Opens your own AI in a new tab with this topic's sourced guide. Don't include personal info.",
    "prompt.withQ": "I'm researching the 2026 California governor's race. My question about \"{name}\": {question}",
    "prompt.withoutQ": "I'm researching the 2026 California governor's race. Help me understand \"{name}\" — the main arguments on each side and where the leading candidates differ.",
    "prompt.body": "Here's a neutral starting-point guide with each candidate's position and primary sources: {url}\n\nStart there, but feel free to research more widely. Cite your sources, and tell me if anything is uncertain or may have changed since.",
    // Appended to the prompt when the UI is not in English, so the AI replies in-language.
    "prompt.replyIn": "",

    // ---- results ----
    "results.heading": "Your match: {name}",
    "results.headingNone": "Your match",
    "results.stale": "Heads up: this shared link was created against dataset {staleVersion}, but the current dataset is {currentVersion}. Some positions may have changed since, so this match may be off — retake the quiz for an up-to-date result.",
    "results.copyLink": "copy share link",
    "results.retake": "retake",
    "results.seeStats": "see how everyone's answering",
    "results.cardCopied": "Share-card link copied to clipboard ✓",
    "results.rankingHeading": "How you match every candidate",
    "results.method": "Scored against <code>{label}</code>. Two scores per candidate: <strong>policy match</strong> (where you agreed on the issues you cared about) and <strong>personal fit</strong> (background, career, coalition, etc.). Shown separately on purpose — never blended.",

    // ---- ranking rows / receipts ----
    "score.policy": "policy",
    "score.personalFit": "personal fit",
    "rank.scored": "{p} policy q's scored · {f} personal-fit dims scored",
    "rank.seeWhy": "see why you matched — and flag anything wrong",
    "receipt.agreedOn": "You agreed on",
    "receipt.disagreedOn": "You disagreed on",
    "receipt.noAgree": "No scored agreements.",
    "receipt.noDisagree": "No scored disagreements.",
    "receipt.agreePct": "{pct}% agree",
    "receipt.apartPct": "{pct}% apart",
    "receipt.youVs": "You: {you} · {name}: {them}",
    "receipt.stanceFallback": "stance {value}",
    "receipt.source": "source",
    "receipt.flag": "⚑ flag this",
    "receipt.flagPrompt": "Flag {name}'s position on \"{issue}\" — what's wrong?",
    "receipt.sending": "sending…",
    "receipt.flagged": "flagged ✓",
    "receipt.failed": "failed",

    // ---- why-not ----
    "whynot.h3": "Why not your runner-up?",
    "whynot.body": "Your top match was <strong>{top}</strong> at {topPct}%. <strong>{runner}</strong> ({runnerPct}%) edged them on {lines}.",
    "whynot.and": " and ",

    // ---- what-if ----
    "whatif.summary": "what if I'd answered something differently?",
    "whatif.pick": "Pick a policy question:",
    "whatif.optionLabel": "{issue} — you said: {label}",
    "whatif.alt": "→ what if you'd said: {label}",
    "whatif.newTop3": "New top 3 (changes vs. your original ranking):",
    "whatif.row": "{name} — {pct}% policy (was {was}%)",

    // ---- footer ----
    "footer.opensource": "Open source:",
    "footer.dataset": "Dataset:",
    "footer.stats": "Live stats",
    "footer.snapshot": "Snapshot date:",
  },
};

TRANSLATIONS.es = {
  "meta.title": "Primaria a Gobernador de CA 2026 — Comparador de Candidatos",
  "meta.description": "Descubre qué candidato de la primaria a gobernador de California del 2 de junio de 2026 coincide mejor con tus valores. Preguntas centradas en lo que los diferencia, fuentes citadas, conjunto de datos abierto.",
  "header.langAria": "Elegir idioma",
  "header.h1": "California 2026 Gobernador — Comparador de Candidatos",
  "header.subtitle": "Para la primaria a gobernador del 2 de junio de 2026. Indica tu postura y compárala con la postura real de los candidatos.",
  "status.loading": "Cargando el conjunto de datos…",
  "status.noQuestions": "No hay preguntas configuradas. Ejecuta scripts/score_questions.mjs y vuelve a desplegar.",
  "status.loadFailed": "No se pudo cargar: {msg}",
  "intro.about.h2": "¿Qué es esto?",
  "intro.about.lead": "Una manera no partidista de descubrir con qué candidato de la primaria a gobernador de California de junio de 2026 coincides realmente, y exactamente por qué. Algunas cosas lo distinguen del típico test de candidatos:",
  "intro.about.differ": "<strong>Solo preguntas donde los candidatos realmente se diferencian.</strong> Nada de relleno tipo \"¿apoyas las buenas escuelas?\": cada pregunta es una en la que el grupo está genuinamente dividido, elegida por el grado de dispersión.",
  "intro.about.keepAsking": "<strong>Puedes seguir preguntando.</strong> Desde cualquier pregunta, traspasa el tema a ChatGPT o Claude —ya cargado con la guía con fuentes de ese tema— y profundiza tanto como quieras. También funciona en navegadores con agentes como <a href=\"https://www.diabrowser.com/\" target=\"_blank\" rel=\"noopener\">Dia</a>, o copia la instrucción en el agente de IA que prefieras.",
  "intro.about.dataset": "<strong>Un conjunto de datos investigado por IA y totalmente citado.</strong> Cada postura de los candidatos fue investigada y reunida por IA a partir de fuentes primarias —no la curó a mano un equipo de investigación— y cada una enlaza a una cita fechada que puedes abrir y verificar por ti mismo.",
  "intro.how.h2": "Cómo funciona",
  "intro.how.count": "{count} preguntas en total: omite cualquiera que prefieras no responder.",
  "intro.how.importance": "Control deslizante de importancia por pregunta; está en medio de forma predeterminada para que solo respondas.",
  "intro.how.scores": "Dos puntuaciones separadas por candidato: <strong>coincidencia de políticas</strong> y <strong>afinidad personal</strong>.",
  "intro.how.sources": "Cada postura enlaza a una cita de fuente primaria. Señala cualquier cosa que esté mal.",
  "intro.how.privacy": "Registramos recuentos anónimos de respuestas para crear una página pública de estadísticas. Sin cookies de rastreo ni direcciones IP almacenadas.",
  "intro.langNote": "Nota: las preguntas del cuestionario, las posturas de los candidatos y las citas de las fuentes se muestran en inglés; están citadas de fuentes primarias y no están traducidas automáticamente.",
  "intro.start": "comenzar el cuestionario",
  "intro.share": "compartir este cuestionario",
  "intro.snapshot": "Fecha de la instantánea:",
  "intro.shareCopied": "Enlace del cuestionario copiado al portapapeles ✓",
  "faq.h3": "Preguntas &amp; metodología",
  "faq.q1.s": "¿Cómo se eligieron las preguntas?",
  "faq.q1.a": "Cada pregunta es una en la que los candidatos <em>realmente</em> se diferencian. Partimos de la matriz completa de posturas de los candidatos y clasificamos cada tema mediante una <strong>puntuación de diferenciación</strong>: cuánto se dispersa el grupo, ajustada según lo bien investigado que esté el tema. Las preguntas que ves son los temas con mayor dispersión. Los asuntos en los que casi todos coinciden quedan como notas al pie, no como preguntas. (La clasificación completa, incluidos los temas con menor dispersión, está en el conjunto de datos abierto.)",
  "faq.q2.s": "¿Cómo se investigaron las posturas de los candidatos?",
  "faq.q2.a": "El conjunto de datos fue investigado y reunido por IA, trabajando a partir de fuentes primarias; no hubo un equipo humano de investigación curándolo a mano. La salvaguarda que lo mantiene honesto: cada postura enlaza a una fuente primaria —el sitio web de una campaña, una entrevista, la transcripción de un debate, un artículo de opinión o un registro de votación— con una cita textual, un enlace y una fecha, y cualquier tema que un candidato no haya abordado públicamente se marca como <em>\"unknown\"</em> en lugar de adivinarlo (10 de 200 posturas son honestos \"unknown\"). Así nunca tienes que creerle a la IA bajo palabra: abre la fuente de cualquier postura y compruébala tú mismo. Despliega \"Background &amp; arguments\" en cualquier pregunta para ver las fuentes.",
  "faq.q3.s": "¿Qué pasa si creo que una postura está mal?",
  "faq.q3.a": "En tu página de resultados, despliega <strong>\"ver por qué coincidiste\"</strong> bajo cualquier candidato: cada postura citada tiene un botón <strong>⚑ señalar esto</strong>. También puedes abrir una incidencia o una solicitud de cambios en <a href=\"https://github.com/ternarybits/california-election\" target=\"_blank\" rel=\"noopener\">GitHub</a>. Ambas vías alimentan la misma cola de correcciones, y todo el conjunto de datos es público para que cualquiera pueda auditarlo.",
  "faq.q4.s": "¿Cómo se calcula mi coincidencia?",
  "faq.q4.a": "Matemáticas simples y auditables, sin clasificación de IA tipo caja negra. Para cada pregunta comparamos tu postura con la de cada candidato en la misma escala, la ponderamos según la importancia que indicaste para el tema, y promediamos. Obtienes <strong>dos puntuaciones separadas</strong> —coincidencia de políticas y afinidad personal— que nunca se combinan en un solo número. Los candidatos con una postura \"unknown\" en una pregunta simplemente no se puntúan en ella.",
  "faq.q5.s": "¿Esto es partidista?",
  "faq.q5.a": "No: es un proyecto no partidista y de código abierto, no una máquina de respaldos. Cada escala de postura está redactada de modo que ningún extremo sea \"la respuesta correcta\", y cada pregunta muestra argumentos sólidos para ambos lados. El objetivo es ayudarte a encontrar <em>afinidad</em>, no decirte por quién votar. El código y los datos están en <a href=\"https://github.com/ternarybits/california-election\" target=\"_blank\" rel=\"noopener\">GitHub</a>.",
  "faq.q6.s": "¿Puedo profundizar en un tema?",
  "faq.q6.a": "Sí, y es la parte que más me entusiasma. En cada pregunta, bajo \"Profundizar\", escribe una pregunta y traspasa el tema a <strong>ChatGPT</strong> o <strong>Claude</strong> con un clic: se abre ya cargado con la guía con fuentes de ese tema para que la IA pueda razonar a partir de las mismas fuentes primarias. También funciona en navegadores con agentes como <a href=\"https://www.diabrowser.com/\" target=\"_blank\" rel=\"noopener\">Dia</a> que pueden leer la página directamente, y hay un botón <strong>Copiar instrucción</strong> para que la pegues en el agente de IA que prefieras. Los usuarios avanzados también pueden conectar el <strong>servidor MCP</strong> del proyecto a Claude o Cursor: consulta el repositorio de GitHub.",
  "faq.q7.s": "¿Se rastrean mis datos?",
  "faq.q7.a": "Registramos recuentos agregados anónimos (qué respuestas se eligen, qué candidato coincidió) para crear una página pública de estadísticas. Sin cookies, sin direcciones IP, sin perfiles individuales. Tus respuestas individuales permanecen en tu navegador, y tu enlace de resultados para compartir codifica tus respuestas en la URL, no en nuestro servidor.",
  "faq.q8.s": "¿Qué tan actualizado está esto, y puedo usarlo en mi propio asistente de IA?",
  "faq.q8.a": "Cada página muestra una fecha de instantánea; las posturas pueden cambiar durante una campaña, así que versionamos el conjunto de datos y lo revisamos a medida que se acerca la primaria de junio de 2026. También hay un <strong>servidor MCP</strong> que conecta el conjunto de datos con Claude o Cursor, para que puedas conversar sobre los temas: consulta el repositorio de GitHub para la configuración.",
  "faq.q9.s": "¿Quién creó esto, y por qué?",
  "faq.q9.a": "Creado por <a href=\"https://www.linkedin.com/in/tedmao/\" target=\"_blank\" rel=\"noopener\">Ted Mao</a>. La primera versión surgió en un día de hackeo de IA en <a href=\"https://thegp.com\" target=\"_blank\" rel=\"noopener\">The General Partnership</a>, la firma de capital de riesgo con la que estoy afiliado, y luego la pulí para compartirla. También es una pequeña muestra de hasta dónde puede llevar la IA un proyecto de principio a fin: investigando el conjunto de datos, construyendo la aplicación e impulsando las preguntas de seguimiento dentro del producto. Soy el fundador de <a href=\"https://www.gumnut.ai\" target=\"_blank\" rel=\"noopener\">Gumnut</a>; este es un proyecto personal, sin afiliación con ninguna campaña.",
  "pq.phase": "Preguntas de políticas",
  "pq.guideHeading": "Contexto y argumentos",
  "pq.askHeading": "Profundizar",
  "pq.importance": "¿Qué tan importante es esta pregunta para ti?",
  "imp.low": "baja",
  "imp.medium": "media",
  "imp.high": "alta",
  "nav.back": "← atrás",
  "nav.skip": "omitir",
  "nav.next": "siguiente →",
  "pq.progress": "Pregunta {n} de {total}",
  "fq.phase": "Afinidad personal",
  "fq.skip": "sin preferencia",
  "fq.progress": "Afinidad personal {n} de {total}",
  "vg.basics": "Lo básico",
  "vg.current": "Política actual de California",
  "vg.argsFor": "Argumentos a favor del cambio",
  "vg.argsAgainst": "Argumentos en contra del cambio",
  "vg.keyFacts": "Datos clave",
  "vg.comparison": "Cómo se compara California",
  "vg.noteOnOptions": "Nota sobre las opciones",
  "vg.sources": "Fuentes",
  "vg.moreSummary": "Más contexto: datos clave, cómo se compara California, fuentes",
  "askai.label": "¿Tienes una pregunta sobre este tema? Pregúntale a un asistente de IA.",
  "askai.placeholder": "p. ej. ¿Cómo afectaría esto a los inquilinos de mi ciudad?",
  "askai.chatgpt": "Preguntar a ChatGPT →",
  "askai.claude": "Preguntar a Claude →",
  "askai.copy": "Copiar instrucción",
  "askai.copied": "Copiado ✓",
  "askai.hint": "Abre tu propia IA en una pestaña nueva con la guía con fuentes de este tema. No incluyas información personal.",
  "prompt.withQ": "Estoy investigando la carrera a gobernador de California de 2026. Mi pregunta sobre \"{name}\": {question}",
  "prompt.withoutQ": "Estoy investigando la carrera a gobernador de California de 2026. Ayúdame a entender \"{name}\": los principales argumentos de cada lado y en qué se diferencian los candidatos punteros.",
  "prompt.body": "Aquí tienes una guía neutral como punto de partida con la postura de cada candidato y las fuentes primarias: {url}\n\nEmpieza ahí, pero siéntete libre de investigar más ampliamente. Cita tus fuentes y avísame si algo es incierto o pudo haber cambiado desde entonces.",
  "prompt.replyIn": "Por favor, responde en español.",
  "results.heading": "Tu coincidencia: {name}",
  "results.headingNone": "Tu coincidencia",
  "results.stale": "Atención: este enlace compartido se creó con el conjunto de datos {staleVersion}, pero el conjunto de datos actual es {currentVersion}. Algunas posturas pueden haber cambiado desde entonces, por lo que esta coincidencia puede estar desactualizada; vuelve a hacer el cuestionario para obtener un resultado actualizado.",
  "results.copyLink": "copiar enlace para compartir",
  "results.retake": "repetir",
  "results.seeStats": "ver cómo responde todo el mundo",
  "results.cardCopied": "Enlace de la tarjeta para compartir copiado al portapapeles ✓",
  "results.rankingHeading": "Cómo coincides con cada candidato",
  "results.method": "Puntuado contra <code>{label}</code>. Dos puntuaciones por candidato: <strong>coincidencia de políticas</strong> (en qué coincidiste en los temas que te importaban) y <strong>afinidad personal</strong> (trayectoria, carrera, coalición, etc.). Se muestran por separado a propósito: nunca se combinan.",
  "score.policy": "políticas",
  "score.personalFit": "afinidad personal",
  "rank.scored": "{p} preguntas de políticas puntuadas · {f} dimensiones de afinidad personal puntuadas",
  "rank.seeWhy": "ver por qué coincidiste, y señalar cualquier cosa que esté mal",
  "receipt.agreedOn": "Coincidiste en",
  "receipt.disagreedOn": "Discrepaste en",
  "receipt.noAgree": "No hay coincidencias puntuadas.",
  "receipt.noDisagree": "No hay discrepancias puntuadas.",
  "receipt.agreePct": "{pct}% de acuerdo",
  "receipt.apartPct": "{pct}% de distancia",
  "receipt.youVs": "Tú: {you} · {name}: {them}",
  "receipt.stanceFallback": "postura {value}",
  "receipt.source": "fuente",
  "receipt.flag": "⚑ señalar esto",
  "receipt.flagPrompt": "Señalar la postura de {name} sobre \"{issue}\": ¿qué está mal?",
  "receipt.sending": "enviando…",
  "receipt.flagged": "señalado ✓",
  "receipt.failed": "falló",
  "whynot.h3": "¿Por qué no tu segunda opción?",
  "whynot.body": "Tu mejor coincidencia fue <strong>{top}</strong> con {topPct}%. <strong>{runner}</strong> ({runnerPct}%) lo superó en {lines}.",
  "whynot.and": " y ",
  "whatif.summary": "¿qué pasaría si hubiera respondido algo de otra manera?",
  "whatif.pick": "Elige una pregunta de políticas:",
  "whatif.optionLabel": "{issue} — dijiste: {label}",
  "whatif.alt": "→ qué pasaría si hubieras dicho: {label}",
  "whatif.newTop3": "Nuevo top 3 (cambios respecto a tu clasificación original):",
  "whatif.row": "{name} — {pct}% políticas (era {was}%)",
  "footer.opensource": "Código abierto:",
  "footer.dataset": "Conjunto de datos:",
  "footer.stats": "Estadísticas en vivo",
  "footer.snapshot": "Fecha de la instantánea:"
};

TRANSLATIONS.zh = {
  "meta.title": "2026 年加州州长初选 — 候选人匹配工具",
  "meta.description": "找出在加州 2026 年 6 月 2 日州长初选中，哪位候选人最契合你的价值观。以差异为先的提问、注明出处的来源、公开数据集。",
  "header.langAria": "选择语言",
  "header.h1": "加州 2026 年州长 — 候选人匹配工具",
  "header.subtitle": "面向 2026 年 6 月 2 日的州长初选。先选出你的立场，再与各候选人的真实立场进行匹配。",
  "status.loading": "正在加载数据集…",
  "status.noQuestions": "尚未配置问题。请运行 scripts/score_questions.mjs 后重新部署。",
  "status.loadFailed": "加载失败：{msg}",
  "intro.about.h2": "这是什么？",
  "intro.about.lead": "一种非党派的方式，帮你找出在加州 2026 年 6 月州长初选中你真正契合的候选人——以及确切的原因。有几点让它有别于一般的候选人测验：",
  "intro.about.differ": "<strong>只问候选人立场真正不同的问题。</strong>没有“你支持好学校吗？”这类填充题——每道题都是各候选人确实存在分歧的议题，按分歧程度挑选。",
  "intro.about.keepAsking": "<strong>你可以继续追问。</strong>从任何一道题，把该话题交给 ChatGPT 或 Claude——它们会预先加载该话题注明出处的指南——你想深入到什么程度都可以。它也能在像 <a href=\"https://www.diabrowser.com/\" target=\"_blank\" rel=\"noopener\">Dia</a> 这样的智能浏览器中使用，或者把提示词复制到你喜欢的任何 AI 助手里。",
  "intro.about.dataset": "<strong>一个由 AI 研究、完整注明出处的数据集。</strong>每位候选人的立场都由 AI 从原始来源研究并整理而成——而非由研究团队人工筛选——并且每条都链接到一段标注日期的引文，你可以自行打开核对。",
  "intro.how.h2": "运作方式",
  "intro.how.count": "总共 {count} 道题——任何你不想回答的都可以跳过。",
  "intro.how.importance": "每题都有重要程度滑块；默认为中等，让你可以直接作答。",
  "intro.how.scores": "每位候选人有两项独立评分：<strong>政策匹配度</strong>和<strong>个人契合度</strong>。",
  "intro.how.sources": "每项立场都链接到一段原始来源引文。发现有误请标记出来。",
  "intro.how.privacy": "我们会记录匿名的回答计数，用于生成公开的统计页面。不使用追踪 cookie，不存储 IP 地址。",
  "intro.langNote": "注意：测验问题、候选人立场和来源引文均以英文显示——它们引自原始来源，并非机器翻译。",
  "intro.start": "开始测验",
  "intro.share": "分享此测验",
  "intro.snapshot": "快照日期：",
  "intro.shareCopied": "测验链接已复制到剪贴板 ✓",
  "faq.h3": "常见问题 &amp; 方法说明",
  "faq.q1.s": "这些问题是如何挑选的？",
  "faq.q1.a": "每道题都是候选人立场<em>确实</em>不同的议题。我们从候选人立场的完整矩阵出发，按<strong>差异分数</strong>对每个议题排序——即各候选人立场分布的离散程度，再依据该议题被研究的充分程度进行加权。你看到的问题就是分歧最大的议题。几乎所有人都一致认同的话题则成为脚注，而非问题。（包括分歧较小议题在内的完整排序，都收录在公开数据集中。）",
  "faq.q2.s": "候选人立场是如何研究出来的？",
  "faq.q2.a": "该数据集由 AI 从原始来源研究并整理而成——没有人工研究团队进行筛选。让它保持诚实的保障是：每项立场都链接到一个原始来源——竞选官网、采访、辩论实录、评论文章或投票记录——附有逐字引文、链接和日期；任何候选人未公开表态的议题都标记为<em>“未知”</em>，而非凭空猜测（200 项立场中有 10 项是诚实的未知）。所以你永远不必只听信 AI 的说法——打开任何立场的来源，自己核对即可。在任何问题上展开“背景 &amp; 论点”即可查看出处。",
  "faq.q3.s": "如果我认为某项立场有误怎么办？",
  "faq.q3.a": "在你的结果页面，展开任一候选人下方的<strong>“看看你为何匹配”</strong>——每条注明出处的立场都带有<strong>⚑ 标记此项</strong>按钮。你也可以在 <a href=\"https://github.com/ternarybits/california-election\" target=\"_blank\" rel=\"noopener\">GitHub</a> 上提交 issue 或 pull request。两种途径都汇入同一个更正队列，而且整个数据集都是公开的，任何人都可以审核。",
  "faq.q4.s": "我的匹配度是如何计算的？",
  "faq.q4.a": "简单、可审核的算法——没有黑箱式的 AI 排名。对每道题，我们在同一量表上比较你的立场与各候选人的立场，再按你认为该议题的重要程度加权，然后求平均。你会得到<strong>两项独立评分</strong>——政策匹配度和个人契合度——它们绝不会合并成单一数字。在某题上立场为“未知”的候选人，该题就不参与其评分。",
  "faq.q5.s": "这个工具有党派立场吗？",
  "faq.q5.a": "没有——这是一个非党派的开源项目，不是背书引擎。每个立场量表的设计都让两端都不是“正确答案”，每道题都呈现了双方经过严谨论证的论点。目标是帮你找到<em>契合</em>，而不是告诉你该投给谁。代码和数据都托管在 <a href=\"https://github.com/ternarybits/california-election\" target=\"_blank\" rel=\"noopener\">GitHub</a> 上。",
  "faq.q6.s": "我能就某个话题深入了解吗？",
  "faq.q6.a": "可以——这是我最为期待的部分。在每道题下方的“深入了解”处，输入一个问题，一键把该话题交给 <strong>ChatGPT</strong> 或 <strong>Claude</strong>——它会预先加载该话题注明出处的指南，让 AI 能基于相同的原始来源进行推理。它也能在像 <a href=\"https://www.diabrowser.com/\" target=\"_blank\" rel=\"noopener\">Dia</a> 这样能直接读取页面的智能浏览器中使用，还有一个<strong>复制提示词</strong>按钮，方便你粘贴到任何你偏好的 AI 助手中。进阶用户还可以把本项目的 <strong>MCP server</strong> 连接到 Claude 或 Cursor——详见 GitHub 仓库。",
  "faq.q7.s": "我的数据会被追踪吗？",
  "faq.q7.a": "我们会记录匿名的汇总计数（哪些答案被选中、匹配到哪位候选人），用于生成公开的统计页面。不使用 cookie，不记录 IP 地址，不建立个人档案。你的个人答案保留在你的浏览器中，你可分享的结果链接把答案编码在 URL 里——而非存储在我们的服务器上。",
  "faq.q8.s": "这些信息有多新？我能在自己的 AI 助手里使用它吗？",
  "faq.q8.a": "每个页面都标注快照日期；立场在竞选期间可能发生变化，因此我们对数据集进行版本管理，并随着 2026 年 6 月初选临近重新核查。我们还提供一个 <strong>MCP server</strong>，把数据集接入 Claude 或 Cursor，让你可以就这些议题进行对话式探讨——设置方法详见 GitHub 仓库。",
  "faq.q9.s": "这是谁做的——又为什么要做？",
  "faq.q9.a": "由 <a href=\"https://www.linkedin.com/in/tedmao/\" target=\"_blank\" rel=\"noopener\">Ted Mao</a> 打造。第一个版本是在我所属的风投机构 <a href=\"https://thegp.com\" target=\"_blank\" rel=\"noopener\">The General Partnership</a> 的一次 AI hack-day 上做出来的，之后我把它整理好分享出来。它也是一个小小的展示，说明 AI 能在多大程度上端到端地推进一个项目——研究数据集、搭建应用，以及驱动产品内的追问功能。我是 <a href=\"https://www.gumnut.ai\" target=\"_blank\" rel=\"noopener\">Gumnut</a> 的创始人；这是个人的业余项目，不隶属于任何竞选团队。",
  "pq.phase": "政策问题",
  "pq.guideHeading": "背景 &amp; 论点",
  "pq.askHeading": "深入了解",
  "pq.importance": "这道题对你有多重要？",
  "imp.low": "低",
  "imp.medium": "中",
  "imp.high": "高",
  "nav.back": "← 返回",
  "nav.skip": "跳过",
  "nav.next": "下一题 →",
  "pq.progress": "第 {n} 题，共 {total} 题",
  "fq.phase": "个人契合度",
  "fq.skip": "无偏好",
  "fq.progress": "个人契合度第 {n} 项，共 {total} 项",
  "vg.basics": "基本情况",
  "vg.current": "加州当前政策",
  "vg.argsFor": "支持改变的论点",
  "vg.argsAgainst": "反对改变的论点",
  "vg.keyFacts": "关键事实",
  "vg.comparison": "加州相比之下如何",
  "vg.noteOnOptions": "关于选项的说明",
  "vg.sources": "来源",
  "vg.moreSummary": "更多背景——关键事实、加州的对比情况、来源",
  "askai.label": "对这个话题有疑问？问问 AI 助手。",
  "askai.placeholder": "例如：这会如何影响我所在城市的租客？",
  "askai.chatgpt": "问 ChatGPT →",
  "askai.claude": "问 Claude →",
  "askai.copy": "复制提示词",
  "askai.copied": "已复制 ✓",
  "askai.hint": "会在新标签页打开你自己的 AI，并附上该话题注明出处的指南。请勿包含个人信息。",
  "prompt.withQ": "我正在研究 2026 年加州州长竞选。我关于“{name}”的问题：{question}",
  "prompt.withoutQ": "我正在研究 2026 年加州州长竞选。请帮我理解“{name}”——双方的主要论点，以及主要候选人在哪些方面存在分歧。",
  "prompt.body": "这是一份中立的入门指南，列出了每位候选人的立场及原始来源：{url}\n\n请以此为起点，但也欢迎你更广泛地研究。请注明你的来源，并告诉我哪些内容尚不确定或自那以来可能已有变化。",
  "prompt.replyIn": "请用中文回答。",
  "results.heading": "你的匹配：{name}",
  "results.headingNone": "你的匹配",
  "results.stale": "提示：这个分享链接是基于数据集 {staleVersion} 生成的，而当前数据集为 {currentVersion}。部分立场自那以来可能已有变化，因此此匹配结果可能有偏差——请重新测验以获得最新结果。",
  "results.copyLink": "复制分享链接",
  "results.retake": "重新测验",
  "results.seeStats": "看看大家是怎么回答的",
  "results.cardCopied": "分享卡片链接已复制到剪贴板 ✓",
  "results.rankingHeading": "你与每位候选人的匹配情况",
  "results.method": "依据 <code>{label}</code> 评分。每位候选人有两项评分：<strong>政策匹配度</strong>（在你看重的议题上你们的一致程度）和<strong>个人契合度</strong>（背景、履历、联盟等）。特意分开展示——绝不混合。",
  "score.policy": "政策",
  "score.personalFit": "个人契合度",
  "rank.scored": "已评分 {p} 道政策题 · 已评分 {f} 项个人契合维度",
  "rank.seeWhy": "看看你为何匹配——并标记任何有误之处",
  "receipt.agreedOn": "你们一致的议题",
  "receipt.disagreedOn": "你们分歧的议题",
  "receipt.noAgree": "没有已评分的一致项。",
  "receipt.noDisagree": "没有已评分的分歧项。",
  "receipt.agreePct": "{pct}% 一致",
  "receipt.apartPct": "{pct}% 分歧",
  "receipt.youVs": "你：{you} · {name}：{them}",
  "receipt.stanceFallback": "立场 {value}",
  "receipt.source": "来源",
  "receipt.flag": "⚑ 标记此项",
  "receipt.flagPrompt": "标记 {name} 在“{issue}”上的立场——哪里有误？",
  "receipt.sending": "正在发送…",
  "receipt.flagged": "已标记 ✓",
  "receipt.failed": "失败",
  "whynot.h3": "为什么不是你的第二名？",
  "whynot.body": "你的最高匹配是 <strong>{top}</strong>，匹配度 {topPct}%。<strong>{runner}</strong>（{runnerPct}%）在 {lines} 上略胜一筹。",
  "whynot.and": "和",
  "whatif.summary": "如果我换个答案会怎样？",
  "whatif.pick": "选择一道政策题：",
  "whatif.optionLabel": "{issue} — 你选的是：{label}",
  "whatif.alt": "→ 如果你选的是：{label}",
  "whatif.newTop3": "新的前三名（相比你原有排名的变化）：",
  "whatif.row": "{name} — {pct}% 政策匹配（原为 {was}%）",
  "footer.opensource": "开源：",
  "footer.dataset": "数据集：",
  "footer.stats": "实时统计",
  "footer.snapshot": "快照日期："
};

TRANSLATIONS.vi = {
  "meta.title": "Bầu cử Sơ bộ Thống đốc California 2026 — Công cụ Tìm Ứng viên Phù hợp",
  "meta.description": "Tìm xem ứng viên nào trong cuộc bầu cử sơ bộ thống đốc California ngày 2 tháng 6, 2026 phù hợp nhất với giá trị của bạn. Câu hỏi tập trung vào sự khác biệt, nguồn được trích dẫn, dữ liệu mở.",
  "header.langAria": "Chọn ngôn ngữ",
  "header.h1": "Thống đốc California 2026 — Công cụ Tìm Ứng viên Phù hợp",
  "header.subtitle": "Dành cho cuộc bầu cử sơ bộ thống đốc ngày 2 tháng 6, 2026. Chọn quan điểm của bạn, rồi đối chiếu với lập trường thực sự của các ứng viên.",
  "status.loading": "Đang tải dữ liệu…",
  "status.noQuestions": "Chưa có câu hỏi nào được cấu hình. Hãy chạy scripts/score_questions.mjs và triển khai lại.",
  "status.loadFailed": "Tải thất bại: {msg}",
  "intro.about.h2": "Đây là gì?",
  "intro.about.lead": "Một cách không thiên vị để tìm xem bạn thực sự đồng quan điểm với ứng viên nào trong cuộc bầu cử sơ bộ thống đốc California tháng 6 năm 2026 — và chính xác là vì sao. Một vài điểm khiến công cụ này khác với các bài trắc nghiệm ứng viên thông thường:",
  "intro.about.differ": "<strong>Chỉ những câu hỏi mà các ứng viên thực sự khác nhau.</strong> Không có câu hỏi đệm kiểu \"bạn có ủng hộ trường học tốt không?\" — mỗi câu hỏi là một vấn đề mà các ứng viên thực sự chia rẽ, được chọn theo mức độ phân tán quan điểm.",
  "intro.about.keepAsking": "<strong>Bạn có thể tiếp tục hỏi.</strong> Từ bất kỳ câu hỏi nào, hãy chuyển chủ đề sang ChatGPT hoặc Claude — đã được nạp sẵn hướng dẫn có trích nguồn về chủ đề đó — và tìm hiểu sâu tùy ý. Nó cũng hoạt động trên các trình duyệt tác tử như <a href=\"https://www.diabrowser.com/\" target=\"_blank\" rel=\"noopener\">Dia</a>, hoặc bạn có thể sao chép câu lệnh vào bất kỳ tác tử AI nào bạn thích.",
  "intro.about.dataset": "<strong>Một bộ dữ liệu do AI nghiên cứu, trích dẫn đầy đủ.</strong> Mọi lập trường của ứng viên đều được AI nghiên cứu và tổng hợp từ các nguồn gốc — không phải do một nhóm nghiên cứu biên soạn thủ công — và mỗi lập trường đều liên kết tới một trích dẫn có ghi ngày tháng mà bạn có thể mở ra và tự kiểm chứng.",
  "intro.how.h2": "Cách hoạt động",
  "intro.how.count": "Tổng cộng {count} câu hỏi — bạn có thể bỏ qua bất kỳ câu nào không muốn trả lời.",
  "intro.how.importance": "Thanh trượt mức độ quan trọng cho từng câu hỏi; mặc định ở mức trung bình để bạn cứ thế trả lời.",
  "intro.how.scores": "Hai điểm số riêng biệt cho mỗi ứng viên: <strong>mức phù hợp về chính sách</strong> và <strong>mức phù hợp cá nhân</strong>.",
  "intro.how.sources": "Mỗi lập trường đều liên kết tới một trích dẫn từ nguồn gốc. Hãy báo lỗi bất cứ điều gì sai.",
  "intro.how.privacy": "Chúng tôi ghi lại số lượt trả lời ẩn danh để xây dựng trang thống kê công khai. Không có cookie theo dõi, không lưu địa chỉ IP.",
  "intro.langNote": "Lưu ý: các câu hỏi của bài trắc nghiệm, lập trường của ứng viên và các trích dẫn nguồn được hiển thị bằng tiếng Anh — chúng được trích từ các nguồn gốc và không được dịch tự động bằng máy.",
  "intro.start": "bắt đầu bài trắc nghiệm",
  "intro.share": "chia sẻ bài trắc nghiệm này",
  "intro.snapshot": "Ngày chụp dữ liệu:",
  "intro.shareCopied": "Đã sao chép liên kết bài trắc nghiệm vào bộ nhớ tạm ✓",
  "faq.h3": "Câu hỏi &amp; phương pháp",
  "faq.q1.s": "Các câu hỏi được chọn như thế nào?",
  "faq.q1.a": "Mỗi câu hỏi là một vấn đề mà các ứng viên <em>thực sự</em> khác nhau. Chúng tôi bắt đầu từ toàn bộ ma trận lập trường của các ứng viên và xếp hạng mỗi vấn đề theo một <strong>điểm khác biệt</strong> — mức độ phân tán quan điểm trong nhóm ứng viên, được điều chỉnh theo mức độ nghiên cứu kỹ lưỡng của vấn đề. Các câu hỏi bạn thấy là những vấn đề có độ phân tán cao nhất. Những chủ đề mà gần như mọi người đều đồng thuận sẽ trở thành chú thích, không phải câu hỏi. (Toàn bộ bảng xếp hạng, bao gồm cả những vấn đề ít phân tán hơn, nằm trong bộ dữ liệu mở.)",
  "faq.q2.s": "Lập trường của các ứng viên được nghiên cứu như thế nào?",
  "faq.q2.a": "Bộ dữ liệu được AI nghiên cứu và tổng hợp, làm việc từ các nguồn gốc — không có nhóm nghiên cứu con người nào biên soạn thủ công. Cơ chế bảo đảm tính trung thực: mỗi lập trường đều liên kết tới một nguồn gốc — trang web chiến dịch, phỏng vấn, biên bản tranh luận, bài bình luận, hoặc hồ sơ bỏ phiếu — kèm theo một trích dẫn nguyên văn, một liên kết và một ngày tháng, và bất kỳ vấn đề nào mà ứng viên chưa công khai bày tỏ quan điểm đều được đánh dấu <em>\"unknown\"</em> (chưa rõ) thay vì phỏng đoán (10 trên 200 lập trường là \"chưa rõ\" một cách trung thực). Vì vậy bạn không bao giờ phải tin lời AI — hãy mở nguồn ở bất kỳ lập trường nào và tự kiểm chứng. Mở rộng phần \"Background &amp; arguments\" ở bất kỳ câu hỏi nào để xem nguồn dẫn.",
  "faq.q3.s": "Nếu tôi cho rằng một lập trường là sai thì sao?",
  "faq.q3.a": "Trên trang kết quả của bạn, hãy mở rộng <strong>\"see why you matched\"</strong> (xem vì sao bạn phù hợp) dưới bất kỳ ứng viên nào — mỗi lập trường có trích dẫn đều có nút <strong>⚑ flag this</strong> (báo lỗi mục này). Bạn cũng có thể mở một issue hoặc pull request trên <a href=\"https://github.com/ternarybits/california-election\" target=\"_blank\" rel=\"noopener\">GitHub</a>. Cả hai cách đều dẫn tới cùng một hàng đợi đính chính, và toàn bộ bộ dữ liệu đều công khai nên bất kỳ ai cũng có thể kiểm tra.",
  "faq.q4.s": "Mức độ phù hợp của tôi được tính như thế nào?",
  "faq.q4.a": "Toán học đơn giản, có thể kiểm tra được — không có xếp hạng AI hộp đen. Với mỗi câu hỏi, chúng tôi so sánh quan điểm của bạn với quan điểm của từng ứng viên trên cùng một thang đo, nhân với mức độ quan trọng mà bạn đã chọn cho vấn đề đó, rồi tính trung bình. Bạn nhận được <strong>hai điểm số riêng biệt</strong> — mức phù hợp về chính sách và mức phù hợp cá nhân — và chúng không bao giờ được gộp thành một con số duy nhất. Những ứng viên có lập trường \"unknown\" (chưa rõ) ở một câu hỏi đơn giản là không được chấm điểm ở câu đó.",
  "faq.q5.s": "Điều này có thiên vị đảng phái không?",
  "faq.q5.a": "Không — đây là một dự án nguồn mở, không thiên vị đảng phái, không phải một bộ máy ủng hộ ứng viên. Mỗi thang đo quan điểm đều được viết sao cho không đầu nào là \"câu trả lời đúng\", và mỗi câu hỏi đều trình bày các lập luận thuyết phục nhất cho cả hai phía. Mục tiêu là giúp bạn tìm ra <em>sự đồng quan điểm</em>, không phải nói cho bạn biết nên bầu cho ai. Mã nguồn và dữ liệu nằm trên <a href=\"https://github.com/ternarybits/california-election\" target=\"_blank\" rel=\"noopener\">GitHub</a>.",
  "faq.q6.s": "Tôi có thể tìm hiểu sâu hơn về một chủ đề không?",
  "faq.q6.a": "Có — đây là phần tôi hào hứng nhất. Ở mỗi câu hỏi, trong phần \"Go deeper\" (tìm hiểu sâu hơn), hãy gõ một câu hỏi và chuyển chủ đề sang <strong>ChatGPT</strong> hoặc <strong>Claude</strong> chỉ với một cú nhấp — nó mở ra với hướng dẫn có trích nguồn về chủ đề đó được nạp sẵn để AI có thể suy luận từ cùng các nguồn gốc. Nó cũng hoạt động trên các trình duyệt tác tử như <a href=\"https://www.diabrowser.com/\" target=\"_blank\" rel=\"noopener\">Dia</a> có thể đọc trực tiếp trang này, và có nút <strong>Copy prompt</strong> (sao chép câu lệnh) để bạn dán vào bất kỳ tác tử AI nào bạn thích. Người dùng chuyên sâu cũng có thể kết nối <strong>MCP server</strong> của dự án với Claude hoặc Cursor — xem kho lưu trữ GitHub.",
  "faq.q7.s": "Dữ liệu của tôi có bị theo dõi không?",
  "faq.q7.a": "Chúng tôi ghi lại số liệu tổng hợp ẩn danh (câu trả lời nào được chọn, ứng viên nào phù hợp) để xây dựng một trang thống kê công khai. Không có cookie, không có địa chỉ IP, không có hồ sơ theo từng cá nhân. Câu trả lời riêng của bạn nằm trong trình duyệt của bạn, và liên kết kết quả chia sẻ được của bạn mã hóa câu trả lời của bạn trong URL — không phải trên máy chủ của chúng tôi.",
  "faq.q8.s": "Thông tin này cập nhật đến mức nào, và tôi có thể dùng nó trong trợ lý AI của riêng mình không?",
  "faq.q8.a": "Mỗi trang đều hiển thị ngày chụp dữ liệu; lập trường có thể thay đổi trong một chiến dịch, nên chúng tôi đánh phiên bản cho bộ dữ liệu và kiểm tra lại khi cuộc bầu cử sơ bộ tháng 6 năm 2026 đến gần. Cũng có một <strong>MCP server</strong> giúp cắm bộ dữ liệu vào Claude hoặc Cursor, để bạn có thể trao đổi về các vấn đề theo kiểu hội thoại — xem kho lưu trữ GitHub để cài đặt.",
  "faq.q9.s": "Ai đã xây dựng cái này — và vì sao?",
  "faq.q9.a": "Được xây dựng bởi <a href=\"https://www.linkedin.com/in/tedmao/\" target=\"_blank\" rel=\"noopener\">Ted Mao</a>. Phiên bản đầu tiên ra đời tại một ngày hack AI ở <a href=\"https://thegp.com\" target=\"_blank\" rel=\"noopener\">The General Partnership</a>, công ty đầu tư mạo hiểm mà tôi có liên kết, sau đó tôi chỉnh sửa lại để chia sẻ. Đây cũng là một ví dụ nhỏ cho thấy AI có thể đưa một dự án đi xa đến đâu từ đầu đến cuối — nghiên cứu bộ dữ liệu, xây dựng ứng dụng, và vận hành các câu hỏi tiếp theo ngay trong sản phẩm. Tôi là nhà sáng lập của <a href=\"https://www.gumnut.ai\" target=\"_blank\" rel=\"noopener\">Gumnut</a>; đây là một dự án cá nhân ngoài lề, không liên kết với bất kỳ chiến dịch nào.",
  "pq.phase": "Câu hỏi chính sách",
  "pq.guideHeading": "Bối cảnh và lập luận",
  "pq.askHeading": "Tìm hiểu sâu hơn",
  "pq.importance": "Câu hỏi này quan trọng với bạn đến mức nào?",
  "imp.low": "thấp",
  "imp.medium": "trung bình",
  "imp.high": "cao",
  "nav.back": "← quay lại",
  "nav.skip": "bỏ qua",
  "nav.next": "tiếp →",
  "pq.progress": "Câu hỏi {n} trên {total}",
  "fq.phase": "Mức phù hợp cá nhân",
  "fq.skip": "không có lựa chọn ưu tiên",
  "fq.progress": "Mức phù hợp cá nhân {n} trên {total}",
  "vg.basics": "Những điều cơ bản",
  "vg.current": "Chính sách hiện hành của California",
  "vg.argsFor": "Lập luận ủng hộ thay đổi",
  "vg.argsAgainst": "Lập luận phản đối thay đổi",
  "vg.keyFacts": "Sự kiện chính",
  "vg.comparison": "California so sánh ra sao",
  "vg.noteOnOptions": "Ghi chú về các lựa chọn",
  "vg.sources": "Nguồn",
  "vg.moreSummary": "Thêm bối cảnh — sự kiện chính, California so sánh ra sao, nguồn",
  "askai.label": "Có câu hỏi về chủ đề này? Hãy hỏi một trợ lý AI.",
  "askai.placeholder": "ví dụ: Điều này sẽ ảnh hưởng đến người thuê nhà ở thành phố của tôi như thế nào?",
  "askai.chatgpt": "Hỏi ChatGPT →",
  "askai.claude": "Hỏi Claude →",
  "askai.copy": "Sao chép câu lệnh",
  "askai.copied": "Đã sao chép ✓",
  "askai.hint": "Mở AI của riêng bạn trong một tab mới với hướng dẫn có trích nguồn về chủ đề này. Đừng đưa vào thông tin cá nhân.",
  "prompt.withQ": "Tôi đang tìm hiểu về cuộc đua thống đốc California 2026. Câu hỏi của tôi về \"{name}\": {question}",
  "prompt.withoutQ": "Tôi đang tìm hiểu về cuộc đua thống đốc California 2026. Hãy giúp tôi hiểu \"{name}\" — các lập luận chính của mỗi phía và các ứng viên dẫn đầu khác nhau ở đâu.",
  "prompt.body": "Đây là một hướng dẫn khởi đầu trung lập với lập trường của từng ứng viên và các nguồn gốc: {url}\n\nHãy bắt đầu từ đó, nhưng cứ thoải mái nghiên cứu rộng hơn. Hãy trích dẫn nguồn của bạn, và cho tôi biết nếu có điều gì chưa chắc chắn hoặc có thể đã thay đổi kể từ đó.",
  "prompt.replyIn": "Vui lòng trả lời bằng tiếng Việt.",
  "results.heading": "Ứng viên phù hợp với bạn: {name}",
  "results.headingNone": "Ứng viên phù hợp với bạn",
  "results.stale": "Lưu ý: liên kết chia sẻ này được tạo dựa trên bộ dữ liệu {staleVersion}, nhưng bộ dữ liệu hiện tại là {currentVersion}. Một số lập trường có thể đã thay đổi kể từ đó, nên kết quả phù hợp này có thể không còn chính xác — hãy làm lại bài trắc nghiệm để có kết quả cập nhật.",
  "results.copyLink": "sao chép liên kết chia sẻ",
  "results.retake": "làm lại",
  "results.seeStats": "xem mọi người đang trả lời thế nào",
  "results.cardCopied": "Đã sao chép liên kết thẻ chia sẻ vào bộ nhớ tạm ✓",
  "results.rankingHeading": "Mức phù hợp của bạn với từng ứng viên",
  "results.method": "Được chấm điểm dựa trên <code>{label}</code>. Hai điểm số cho mỗi ứng viên: <strong>mức phù hợp về chính sách</strong> (nơi bạn đồng quan điểm về những vấn đề bạn quan tâm) và <strong>mức phù hợp cá nhân</strong> (xuất thân, sự nghiệp, liên minh, v.v.). Được hiển thị riêng có chủ đích — không bao giờ gộp lại.",
  "score.policy": "chính sách",
  "score.personalFit": "mức phù hợp cá nhân",
  "rank.scored": "{p} câu hỏi chính sách được chấm · {f} chiều mức phù hợp cá nhân được chấm",
  "rank.seeWhy": "xem vì sao bạn phù hợp — và báo lỗi bất cứ điều gì sai",
  "receipt.agreedOn": "Bạn đồng quan điểm về",
  "receipt.disagreedOn": "Bạn bất đồng quan điểm về",
  "receipt.noAgree": "Không có điểm đồng thuận được chấm.",
  "receipt.noDisagree": "Không có điểm bất đồng được chấm.",
  "receipt.agreePct": "{pct}% đồng thuận",
  "receipt.apartPct": "cách nhau {pct}%",
  "receipt.youVs": "Bạn: {you} · {name}: {them}",
  "receipt.stanceFallback": "quan điểm {value}",
  "receipt.source": "nguồn",
  "receipt.flag": "⚑ báo lỗi mục này",
  "receipt.flagPrompt": "Báo lỗi lập trường của {name} về \"{issue}\" — có gì sai?",
  "receipt.sending": "đang gửi…",
  "receipt.flagged": "đã báo lỗi ✓",
  "receipt.failed": "thất bại",
  "whynot.h3": "Vì sao không phải ứng viên đứng nhì của bạn?",
  "whynot.body": "Ứng viên phù hợp nhất của bạn là <strong>{top}</strong> với {topPct}%. <strong>{runner}</strong> ({runnerPct}%) đã vượt qua họ về {lines}.",
  "whynot.and": " và ",
  "whatif.summary": "nếu tôi đã trả lời khác đi thì sao?",
  "whatif.pick": "Chọn một câu hỏi chính sách:",
  "whatif.optionLabel": "{issue} — bạn đã nói: {label}",
  "whatif.alt": "→ nếu bạn đã nói: {label}",
  "whatif.newTop3": "Top 3 mới (thay đổi so với bảng xếp hạng ban đầu của bạn):",
  "whatif.row": "{name} — {pct}% chính sách (trước là {was}%)",
  "footer.opensource": "Nguồn mở:",
  "footer.dataset": "Bộ dữ liệu:",
  "footer.stats": "Thống kê trực tiếp",
  "footer.snapshot": "Ngày chụp dữ liệu:"
};

TRANSLATIONS.tl = {
  "meta.title": "CA 2026 Primarya para sa Gobernador — Tagatugma ng Kandidato",
  "meta.description": "Alamin kung aling kandidato sa primarya para sa gobernador ng California sa Hunyo 2, 2026 ang pinakaaayon sa iyong mga pinahahalagahan. Mga tanong na nakatuon sa pagkakaiba, may sipi na pinagmulan, bukas na dataset.",
  "header.langAria": "Pumili ng wika",
  "header.h1": "California 2026 Gobernador — Tagatugma ng Kandidato",
  "header.subtitle": "Para sa primarya para sa gobernador sa Hunyo 2, 2026. Piliin kung saan ka tumatayo, pagkatapos itugma sa kung saan talaga tumatayo ang mga kandidato.",
  "status.loading": "Naglo-load ng dataset…",
  "status.noQuestions": "Walang naka-set up na mga tanong. Patakbuhin ang scripts/score_questions.mjs at i-redeploy.",
  "status.loadFailed": "Hindi na-load: {msg}",
  "intro.about.h2": "Ano ito?",
  "intro.about.lead": "Isang non-partisan na paraan para malaman kung aling kandidato sa primarya para sa gobernador ng California sa Hunyo 2026 ang talagang kaayon mo — at kung bakit nga. Ilang bagay ang nagpapaiba nito sa karaniwang quiz ng kandidato:",
  "intro.about.differ": "<strong>Mga tanong lamang kung saan talagang nagkakaiba ang mga kandidato.</strong> Walang \"sumusuporta ka ba sa magagandang paaralan?\" na pampuno — bawat tanong ay isang isyu na talagang pagkakahati-hati ng grupo, na napili batay sa lawak ng pagkakaiba.",
  "intro.about.keepAsking": "<strong>Maaari kang patuloy na magtanong.</strong> Mula sa anumang tanong, ibigay ang paksa sa ChatGPT o Claude — naka-load na nang maaga ang sinipi-pinagmulang gabay ng paksang iyon — at humukay nang kasinglalim ng gusto mo. Gumagana rin ito sa mga agentic browser gaya ng <a href=\"https://www.diabrowser.com/\" target=\"_blank\" rel=\"noopener\">Dia</a>, o kopyahin ang prompt sa anumang AI agent na gusto mo.",
  "intro.about.dataset": "<strong>Isang AI-researched, ganap na may-sipi na dataset.</strong> Bawat posisyon ng kandidato ay sinaliksik at binuo ng AI mula sa mga pangunahing pinagmulan — hindi inayos nang mano-mano ng isang research team — at bawat isa ay may link sa isang may-petsang sipi na maaari mong buksan at suriin mismo.",
  "intro.how.h2": "Paano ito gumagana",
  "intro.how.count": "{count} tanong sa kabuuan — laktawan ang ayaw mong sagutin.",
  "intro.how.importance": "Slider ng kahalagahan kada tanong; default sa katamtaman para makasagot ka na lang agad.",
  "intro.how.scores": "Dalawang magkahiwalay na score kada kandidato: <strong>tugma sa patakaran</strong> at <strong>personal na hatak</strong>.",
  "intro.how.sources": "Bawat posisyon ay may link sa isang sipi mula sa pangunahing pinagmulan. I-flag ang anumang mali.",
  "intro.how.privacy": "Nila-log namin ang anonymized na bilang ng tugon para makabuo ng pampublikong pahina ng estadistika. Walang tracking cookies, walang nakaimbak na IP.",
  "intro.langNote": "Tandaan: ang mga tanong sa quiz, ang mga posisyon ng kandidato, at ang mga sipi ng pinagmulan ay ipinapakita sa Ingles — sinipi ang mga ito mula sa mga pangunahing pinagmulan at hindi isinaling pang-makina.",
  "intro.start": "simulan ang quiz",
  "intro.share": "ibahagi ang quiz na ito",
  "intro.snapshot": "Petsa ng snapshot:",
  "intro.shareCopied": "Nakopya ang link ng quiz sa clipboard ✓",
  "faq.h3": "Mga tanong &amp; pamamaraan",
  "faq.q1.s": "Paano napili ang mga tanong?",
  "faq.q1.a": "Bawat tanong ay isa kung saan <em>talagang</em> nagkakaiba ang mga kandidato. Nagsisimula kami sa buong matris ng mga posisyon ng kandidato at niraranggo ang bawat isyu ayon sa isang <strong>differentiation score</strong> — kung gaano kalawak ang pagkakaiba-iba ng grupo, na isinukat ayon sa kung gaano kahusay nasaliksik ang isyu. Ang mga tanong na nakikita mo ay ang mga isyung may pinakamalawak na pagkakaiba. Ang mga paksa kung saan halos lahat ay sang-ayon ay nagiging talababa, hindi tanong. (Ang buong ranggo, kasama ang mga isyung mas maliit ang pagkakaiba, ay nasa bukas na dataset.)",
  "faq.q2.s": "Paano nasaliksik ang mga posisyon ng kandidato?",
  "faq.q2.a": "Ang dataset ay sinaliksik at binuo ng AI, mula sa mga pangunahing pinagmulan — walang research team ng tao na nag-ayos nito nang mano-mano. Ang panangga na nagpapanatili nitong tapat: bawat posisyon ay may link sa isang pangunahing pinagmulan — isang website ng kampanya, panayam, transcript ng debate, op-ed, o talaan ng pagboto — na may eksaktong sipi, isang link, at petsa, at ang anumang isyu na hindi pa hayagang tinugunan ng kandidato ay markahang <em>\"unknown\"</em> sa halip na hulaan (10 sa 200 posisyon ay tapat na unknown). Kaya hindi mo na kailangang basta paniwalaan ang AI — buksan ang pinagmulan ng anumang posisyon at suriin mismo. Palawakin ang \"Background &amp; arguments\" sa anumang tanong para makita ang pinagmulan.",
  "faq.q3.s": "Paano kung sa tingin ko ay mali ang isang posisyon?",
  "faq.q3.a": "Sa iyong pahina ng resulta, palawakin ang <strong>\"see why you matched\"</strong> sa ilalim ng anumang kandidato — bawat sinipi na posisyon ay may <strong>⚑ flag this</strong> na buton. Maaari ka ring magbukas ng issue o pull request sa <a href=\"https://github.com/ternarybits/california-election\" target=\"_blank\" rel=\"noopener\">GitHub</a>. Parehong ruta ay napupunta sa iisang pila ng pagwawasto, at ang buong dataset ay pampubliko kaya kahit sino ay makapag-aaudit nito.",
  "faq.q4.s": "Paano kinakalkula ang aking tugma?",
  "faq.q4.a": "Simple, maaaring i-audit na matematika — walang black-box na pagraranggo ng AI. Para sa bawat tanong, inihahambing namin ang iyong paninindigan sa paninindigan ng bawat kandidato sa parehong eskala, tinitimbang ito ayon sa kung gaano mo sinabing mahalaga ang isyu, at kinukuha ang average. Nakukuha mo ang <strong>dalawang magkahiwalay na score</strong> — tugma sa patakaran at personal na hatak — na hindi kailanman pinaghahalo sa iisang numero. Ang mga kandidatong may \"unknown\" na posisyon sa isang tanong ay basta hindi binibigyan ng score doon.",
  "faq.q5.s": "Partisan ba ito?",
  "faq.q5.a": "Hindi — ito ay isang non-partisan, open-source na proyekto, hindi isang makina ng pag-endorso. Bawat eskala ng paninindigan ay isinulat nang ang bawat dulo ay hindi \"ang tamang sagot,\" at bawat tanong ay nagpapakita ng matitibay na argumento para sa magkabilang panig. Ang layunin ay tulungan kang makahanap ng <em>pagkakaayon</em>, hindi sabihin sa iyo kung sino ang iboboto. Ang code at data ay nasa <a href=\"https://github.com/ternarybits/california-election\" target=\"_blank\" rel=\"noopener\">GitHub</a>.",
  "faq.q6.s": "Maaari ba akong humukay nang mas malalim sa isang paksa?",
  "faq.q6.a": "Oo — ito ang bahaging pinaka-nasasabik ako. Sa bawat tanong, sa ilalim ng \"Go deeper,\" mag-type ng tanong at ibigay ang paksa sa <strong>ChatGPT</strong> o <strong>Claude</strong> sa isang pindot — bubukas ito nang naka-load na ang sinipi-pinagmulang gabay ng paksang iyon para makapangatwiran ang AI mula sa parehong mga pangunahing pinagmulan. Gumagana rin ito sa mga agentic browser gaya ng <a href=\"https://www.diabrowser.com/\" target=\"_blank\" rel=\"noopener\">Dia</a> na maaaring basahin ang pahina nang direkta, at may <strong>Copy prompt</strong> na buton para mai-paste mo ito sa anumang AI agent na gusto mo. Maaari ring ikonekta ng mga power user ang <strong>MCP server</strong> ng proyekto sa Claude o Cursor — tingnan ang GitHub repo.",
  "faq.q7.s": "Sinusubaybayan ba ang aking data?",
  "faq.q7.a": "Nila-log namin ang anonymized na pinagsama-samang bilang (kung aling mga sagot ang napipili, kung aling kandidato ang tumugma) para makabuo ng pampublikong pahina ng estadistika. Walang cookies, walang IP address, walang profile kada tao. Ang iyong indibidwal na mga sagot ay nananatili sa iyong browser, at ang iyong nababahaging link ng resulta ay naka-encode ang iyong mga sagot sa URL — hindi sa aming server.",
  "faq.q8.s": "Gaano ito kabago, at maaari ko ba itong gamitin sa sarili kong AI assistant?",
  "faq.q8.a": "Bawat pahina ay nagpapakita ng petsa ng snapshot; ang mga posisyon ay maaaring magbago sa panahon ng kampanya, kaya nagbibigay kami ng bersyon sa dataset at muling sinusuri habang papalapit ang primarya ng Hunyo 2026. May <strong>MCP server</strong> din na nagpaplug ng dataset sa Claude o Cursor, para mapag-usapan mo ang mga isyu nang pakikipag-usap — tingnan ang GitHub repo para sa pag-setup.",
  "faq.q9.s": "Sino ang gumawa nito — at bakit?",
  "faq.q9.a": "Ginawa ni <a href=\"https://www.linkedin.com/in/tedmao/\" target=\"_blank\" rel=\"noopener\">Ted Mao</a>. Ang unang bersyon ay nabuo sa isang AI hack-day sa <a href=\"https://thegp.com\" target=\"_blank\" rel=\"noopener\">The General Partnership</a>, ang venture firm na kaugnay ko, pagkatapos ay inayos ko ito para maibahagi. Isa rin itong maliit na pagpapakita kung gaano kalayo madadala ng AI ang isang proyekto mula simula hanggang dulo — pagsasaliksik ng dataset, pagbuo ng app, at pagpapagana ng mga follow-up na tanong sa loob ng produkto. Ako ang founder ng <a href=\"https://www.gumnut.ai\" target=\"_blank\" rel=\"noopener\">Gumnut</a>; ito ay isang personal na side project, hindi kaugnay ng anumang kampanya.",
  "pq.phase": "Mga tanong sa patakaran",
  "pq.guideHeading": "Konteksto at mga argumento",
  "pq.askHeading": "Humukay nang mas malalim",
  "pq.importance": "Gaano kahalaga sa iyo ang tanong na ito?",
  "imp.low": "mababa",
  "imp.medium": "katamtaman",
  "imp.high": "mataas",
  "nav.back": "← bumalik",
  "nav.skip": "laktawan",
  "nav.next": "susunod →",
  "pq.progress": "Tanong {n} ng {total}",
  "fq.phase": "Personal na hatak",
  "fq.skip": "walang kagustuhan",
  "fq.progress": "Personal na hatak {n} ng {total}",
  "vg.basics": "Ang mga pangunahing kaalaman",
  "vg.current": "Kasalukuyang patakaran ng California",
  "vg.argsFor": "Mga argumento para sa pagbabago",
  "vg.argsAgainst": "Mga argumento laban sa pagbabago",
  "vg.keyFacts": "Mahahalagang datos",
  "vg.comparison": "Paano nakahahambing ang CA",
  "vg.noteOnOptions": "Tala sa mga opsyon",
  "vg.sources": "Mga pinagmulan",
  "vg.moreSummary": "Higit pang background — mahahalagang datos, paano nakahahambing ang CA, mga pinagmulan",
  "askai.label": "May tanong tungkol sa paksang ito? Magtanong sa isang AI assistant.",
  "askai.placeholder": "hal. Paano makaaapekto ito sa mga umuupa sa aking lungsod?",
  "askai.chatgpt": "Magtanong sa ChatGPT →",
  "askai.claude": "Magtanong sa Claude →",
  "askai.copy": "Kopyahin ang prompt",
  "askai.copied": "Nakopya ✓",
  "askai.hint": "Binubuksan ang sarili mong AI sa bagong tab gamit ang sinipi-pinagmulang gabay ng paksang ito. Huwag magsama ng personal na impormasyon.",
  "prompt.withQ": "Sinasaliksik ko ang karera para sa gobernador ng California 2026. Ang aking tanong tungkol sa \"{name}\": {question}",
  "prompt.withoutQ": "Sinasaliksik ko ang karera para sa gobernador ng California 2026. Tulungan mo akong maunawaan ang \"{name}\" — ang mga pangunahing argumento sa bawat panig at kung saan nagkakaiba ang mga nangungunang kandidato.",
  "prompt.body": "Narito ang isang neutral na panimulang gabay na may posisyon ng bawat kandidato at mga pangunahing pinagmulan: {url}\n\nMagsimula doon, ngunit malaya kang magsaliksik nang mas malawak. Sipiin ang iyong mga pinagmulan, at sabihin sa akin kung may anumang hindi tiyak o maaaring nagbago mula noon.",
  "prompt.replyIn": "Pakisagot sa wikang Tagalog.",
  "results.heading": "Ang iyong tugma: {name}",
  "results.headingNone": "Ang iyong tugma",
  "results.stale": "Paalala: ang nibahaging link na ito ay ginawa laban sa dataset {staleVersion}, ngunit ang kasalukuyang dataset ay {currentVersion}. Maaaring may nagbagong mga posisyon mula noon, kaya maaaring mali ang tugmang ito — ulitin ang quiz para sa napapanahong resulta.",
  "results.copyLink": "kopyahin ang link na maibabahagi",
  "results.retake": "ulitin",
  "results.seeStats": "tingnan kung paano sumasagot ang lahat",
  "results.cardCopied": "Nakopya ang link ng share-card sa clipboard ✓",
  "results.rankingHeading": "Paano ka tumutugma sa bawat kandidato",
  "results.method": "Na-score laban sa <code>{label}</code>. Dalawang score kada kandidato: <strong>tugma sa patakaran</strong> (kung saan ka sumang-ayon sa mga isyung pinahalagahan mo) at <strong>personal na hatak</strong> (background, karera, koalisyon, atbp.). Ipinapakita nang hiwalay nang sadya — hindi kailanman pinaghahalo.",
  "score.policy": "patakaran",
  "score.personalFit": "personal na hatak",
  "rank.scored": "{p} tanong sa patakaran ang na-score · {f} dimensyon ng personal na hatak ang na-score",
  "rank.seeWhy": "tingnan kung bakit ka tumugma — at i-flag ang anumang mali",
  "receipt.agreedOn": "Sumang-ayon ka sa",
  "receipt.disagreedOn": "Hindi ka sumang-ayon sa",
  "receipt.noAgree": "Walang na-score na pagkakasundo.",
  "receipt.noDisagree": "Walang na-score na hindi pagkakasundo.",
  "receipt.agreePct": "{pct}% sang-ayon",
  "receipt.apartPct": "{pct}% magkalayo",
  "receipt.youVs": "Ikaw: {you} · {name}: {them}",
  "receipt.stanceFallback": "paninindigan {value}",
  "receipt.source": "pinagmulan",
  "receipt.flag": "⚑ i-flag ito",
  "receipt.flagPrompt": "I-flag ang posisyon ni {name} sa \"{issue}\" — ano ang mali?",
  "receipt.sending": "ipinapadala…",
  "receipt.flagged": "na-flag ✓",
  "receipt.failed": "nabigo",
  "whynot.h3": "Bakit hindi ang iyong runner-up?",
  "whynot.body": "Ang iyong nangungunang tugma ay si <strong>{top}</strong> sa {topPct}%. Nalampasan sila ni <strong>{runner}</strong> ({runnerPct}%) sa {lines}.",
  "whynot.and": " at ",
  "whatif.summary": "paano kung iba ang naisagot ko?",
  "whatif.pick": "Pumili ng tanong sa patakaran:",
  "whatif.optionLabel": "{issue} — sinabi mo: {label}",
  "whatif.alt": "→ paano kung sinabi mo: {label}",
  "whatif.newTop3": "Bagong nangungunang 3 (mga pagbabago kumpara sa orihinal mong ranggo):",
  "whatif.row": "{name} — {pct}% patakaran (dati {was}%)",
  "footer.opensource": "Open source:",
  "footer.dataset": "Dataset:",
  "footer.stats": "Live na estadistika",
  "footer.snapshot": "Petsa ng snapshot:"
};

TRANSLATIONS.ko = {
  "meta.title": "캘리포니아 2026 주지사 예비선거 — 후보 매칭",
  "meta.description": "2026년 6월 2일 캘리포니아 주지사 예비선거에서 어느 후보가 당신의 가치관과 가장 잘 맞는지 찾아보세요. 차별점 중심 질문, 출처 인용, 공개 데이터셋.",
  "header.langAria": "언어 선택",
  "header.h1": "캘리포니아 2026 주지사 — 후보 매칭",
  "header.subtitle": "2026년 6월 2일 주지사 예비선거를 위한 도구입니다. 당신의 입장을 고른 뒤, 후보들이 실제로 어디에 서 있는지와 비교해 보세요.",
  "status.loading": "데이터셋 불러오는 중…",
  "status.noQuestions": "구성된 질문이 없습니다. scripts/score_questions.mjs를 실행한 뒤 다시 배포하세요.",
  "status.loadFailed": "불러오기 실패: {msg}",
  "intro.about.h2": "이게 뭔가요?",
  "intro.about.lead": "2026년 6월 캘리포니아 주지사 예비선거에서 당신이 실제로 누구와 잘 맞는지 — 그리고 정확히 왜 그런지 — 찾아주는 비당파적 도구입니다. 흔한 후보 퀴즈와 다른 몇 가지가 있습니다:",
  "intro.about.differ": "<strong>후보들이 실제로 갈리는 질문만 다룹니다.</strong> \"좋은 학교를 지지하나요?\" 같은 들러리 질문은 없습니다 — 모든 질문은 후보들의 입장이 실제로 갈리는 사안이며, 차이의 폭을 기준으로 선정됩니다.",
  "intro.about.keepAsking": "<strong>계속 물어볼 수 있습니다.</strong> 어떤 질문에서든 해당 주제를 ChatGPT나 Claude에 넘기면 — 그 주제의 출처가 달린 가이드가 미리 입력된 채로 — 원하는 만큼 깊이 파고들 수 있습니다. <a href=\"https://www.diabrowser.com/\" target=\"_blank\" rel=\"noopener\">Dia</a> 같은 에이전트형 브라우저에서도 작동하며, 프롬프트를 원하는 어떤 AI 에이전트에든 복사해 넣어도 됩니다.",
  "intro.about.dataset": "<strong>AI가 조사하고 출처가 모두 달린 데이터셋.</strong> 모든 후보 입장은 — 연구팀이 일일이 정리한 것이 아니라 — AI가 1차 출처를 바탕으로 조사하고 정리했으며, 각 항목은 직접 열어 확인할 수 있는 날짜가 명시된 인용문으로 연결됩니다.",
  "intro.how.h2": "작동 방식",
  "intro.how.count": "총 {count}개의 질문이 있습니다 — 답하고 싶지 않은 질문은 건너뛰어도 됩니다.",
  "intro.how.importance": "질문별 중요도 슬라이더가 있으며, 기본값은 '중간'이라 그냥 바로 답할 수 있습니다.",
  "intro.how.scores": "후보별로 두 가지 점수를 따로 보여줍니다: <strong>정책 일치도</strong>와 <strong>개인적 적합도</strong>.",
  "intro.how.sources": "모든 입장은 1차 출처 인용문으로 연결됩니다. 잘못된 점이 있으면 신고하세요.",
  "intro.how.privacy": "공개 통계 페이지를 만들기 위해 익명화된 응답 수를 기록합니다. 추적 쿠키도, 저장되는 IP도 없습니다.",
  "intro.langNote": "참고: 퀴즈 질문, 후보 입장, 출처 인용문은 영어로 표시됩니다 — 이는 1차 출처에서 인용한 것으로, 기계 번역이 아닙니다.",
  "intro.start": "퀴즈 시작",
  "intro.share": "이 퀴즈 공유",
  "intro.snapshot": "스냅샷 날짜:",
  "intro.shareCopied": "퀴즈 링크가 클립보드에 복사되었습니다 ✓",
  "faq.h3": "질문 &amp; 방법론",
  "faq.q1.s": "질문은 어떻게 선정되었나요?",
  "faq.q1.a": "모든 질문은 후보들이 <em>실제로</em> 갈리는 사안입니다. 후보 입장 전체 행렬에서 시작해, 각 사안을 <strong>차별화 점수</strong> — 후보들의 입장이 얼마나 넓게 퍼져 있는지를 그 사안이 얼마나 잘 조사되었는지로 보정한 값 — 로 순위를 매깁니다. 당신이 보는 질문들은 차이의 폭이 가장 큰 사안들입니다. 거의 모두가 동의하는 주제는 질문이 아니라 각주가 됩니다. (차이의 폭이 작은 사안을 포함한 전체 순위는 공개 데이터셋에 있습니다.)",
  "faq.q2.s": "후보 입장은 어떻게 조사되었나요?",
  "faq.q2.a": "이 데이터셋은 사람으로 구성된 연구팀이 일일이 정리한 것이 아니라, AI가 1차 출처를 바탕으로 조사하고 정리했습니다. 정직성을 지키는 안전장치는 이것입니다: 모든 입장은 1차 출처 — 선거 캠페인 웹사이트, 인터뷰, 토론 녹취록, 기고문, 또는 표결 기록 — 로 연결되며, 직접 인용문과 링크, 날짜가 함께 제공되고, 후보가 공개적으로 입장을 밝히지 않은 사안은 추측하지 않고 <em>\"unknown\"</em>으로 표시됩니다(200개 입장 중 10개가 정직한 unknown입니다). 그러니 AI의 말을 그대로 믿을 필요가 없습니다 — 어떤 입장에서든 출처를 열어 직접 확인하세요. 어떤 질문에서든 \"배경 &amp; 논거\"를 펼치면 출처를 볼 수 있습니다.",
  "faq.q3.s": "어떤 입장이 틀렸다고 생각되면 어떻게 하나요?",
  "faq.q3.a": "결과 페이지에서 후보 아래의 <strong>\"왜 매칭됐는지 보기\"</strong>를 펼치면 — 인용된 각 입장에 <strong>⚑ 신고</strong> 버튼이 있습니다. <a href=\"https://github.com/ternarybits/california-election\" target=\"_blank\" rel=\"noopener\">GitHub</a>에서 이슈나 풀 리퀘스트를 열어도 됩니다. 두 경로 모두 같은 수정 대기열로 모이며, 데이터셋 전체가 공개되어 있어 누구나 검증할 수 있습니다.",
  "faq.q4.s": "내 매칭은 어떻게 계산되나요?",
  "faq.q4.a": "단순하고 검증 가능한 계산입니다 — 블랙박스 AI 순위 매기기는 없습니다. 각 질문마다 당신의 입장과 각 후보의 입장을 같은 척도에서 비교하고, 당신이 그 사안을 얼마나 중요하다고 했는지로 가중치를 준 뒤 평균을 냅니다. <strong>두 가지 점수</strong> — 정책 일치도와 개인적 적합도 — 를 받으며, 이 둘은 결코 하나의 숫자로 합쳐지지 않습니다. 어떤 질문에 \"unknown\" 입장인 후보는 그 질문에서 그냥 채점되지 않습니다.",
  "faq.q5.s": "이건 당파적인가요?",
  "faq.q5.a": "아닙니다 — 이것은 비당파적 오픈소스 프로젝트이며, 특정 후보를 지지하는 도구가 아닙니다. 모든 입장 척도는 어느 쪽 끝도 \"정답\"이 아니도록 작성되었고, 각 질문은 양쪽 입장에 대한 가장 강력한 논거를 함께 보여줍니다. 목표는 당신이 <em>일치점</em>을 찾도록 돕는 것이지, 누구에게 투표하라고 말하는 것이 아닙니다. 코드와 데이터는 <a href=\"https://github.com/ternarybits/california-election\" target=\"_blank\" rel=\"noopener\">GitHub</a>에 있습니다.",
  "faq.q6.s": "어떤 주제를 더 깊이 파고들 수 있나요?",
  "faq.q6.a": "네 — 제가 가장 기대하는 부분입니다. 모든 질문에서 \"더 깊이 알아보기\" 아래에 질문을 입력하면 한 번의 클릭으로 해당 주제를 <strong>ChatGPT</strong>나 <strong>Claude</strong>에 넘길 수 있습니다 — 그 주제의 출처가 달린 가이드가 미리 입력된 채로 열려, AI가 동일한 1차 출처를 바탕으로 추론할 수 있습니다. 페이지를 직접 읽을 수 있는 <a href=\"https://www.diabrowser.com/\" target=\"_blank\" rel=\"noopener\">Dia</a> 같은 에이전트형 브라우저에서도 작동하며, <strong>프롬프트 복사</strong> 버튼이 있어 원하는 어떤 AI 에이전트에든 붙여넣을 수 있습니다. 고급 사용자는 이 프로젝트의 <strong>MCP server</strong>를 Claude나 Cursor에 연결할 수도 있습니다 — GitHub 저장소를 참고하세요.",
  "faq.q7.s": "내 데이터가 추적되나요?",
  "faq.q7.a": "공개 통계 페이지를 만들기 위해 익명화된 집계 수치(어떤 답변이 선택되는지, 어떤 후보가 매칭되는지)를 기록합니다. 쿠키도, IP 주소도, 개인별 프로필도 없습니다. 당신의 개별 답변은 브라우저에 남아 있고, 공유 가능한 결과 링크는 당신의 답변을 우리 서버가 아니라 URL에 인코딩합니다.",
  "faq.q8.s": "이건 얼마나 최신이며, 제 AI 어시스턴트에서 사용할 수 있나요?",
  "faq.q8.a": "모든 페이지에 스냅샷 날짜가 표시됩니다. 입장은 선거운동 중에 바뀔 수 있으므로, 데이터셋에 버전을 매기고 2026년 6월 예비선거가 가까워질수록 다시 점검합니다. 또한 데이터셋을 Claude나 Cursor에 연결하는 <strong>MCP server</strong>가 있어 사안들을 대화하듯 짚어볼 수 있습니다 — 설정 방법은 GitHub 저장소를 참고하세요.",
  "faq.q9.s": "누가, 왜 만들었나요?",
  "faq.q9.a": "<a href=\"https://www.linkedin.com/in/tedmao/\" target=\"_blank\" rel=\"noopener\">Ted Mao</a>가 만들었습니다. 첫 버전은 제가 소속된 벤처 회사 <a href=\"https://thegp.com\" target=\"_blank\" rel=\"noopener\">The General Partnership</a>의 AI 해커톤에서 만들어졌고, 이후 공유하기 위해 다듬었습니다. 이것은 또한 AI가 한 프로젝트를 처음부터 끝까지 — 데이터셋 조사, 앱 구축, 제품 내 후속 질문 구동까지 — 얼마나 멀리 끌고 갈 수 있는지를 보여주는 작은 사례이기도 합니다. 저는 <a href=\"https://www.gumnut.ai\" target=\"_blank\" rel=\"noopener\">Gumnut</a>의 창업자이며, 이것은 어떤 선거운동과도 무관한 개인 사이드 프로젝트입니다.",
  "pq.phase": "정책 질문",
  "pq.guideHeading": "배경 &amp; 논거",
  "pq.askHeading": "더 깊이 알아보기",
  "pq.importance": "이 질문이 당신에게 얼마나 중요한가요?",
  "imp.low": "낮음",
  "imp.medium": "중간",
  "imp.high": "높음",
  "nav.back": "← 이전",
  "nav.skip": "건너뛰기",
  "nav.next": "다음 →",
  "pq.progress": "질문 {n} / {total}",
  "fq.phase": "개인적 적합도",
  "fq.skip": "선호 없음",
  "fq.progress": "개인적 적합도 {n} / {total}",
  "vg.basics": "기본 사항",
  "vg.current": "현행 캘리포니아 정책",
  "vg.argsFor": "변화에 찬성하는 논거",
  "vg.argsAgainst": "변화에 반대하는 논거",
  "vg.keyFacts": "핵심 사실",
  "vg.comparison": "캘리포니아의 비교 위치",
  "vg.noteOnOptions": "선택지에 대한 참고",
  "vg.sources": "출처",
  "vg.moreSummary": "더 많은 배경 — 핵심 사실, 캘리포니아의 비교 위치, 출처",
  "askai.label": "이 주제에 대해 궁금한 점이 있나요? AI 어시스턴트에게 물어보세요.",
  "askai.placeholder": "예: 이것이 우리 도시의 세입자에게 어떤 영향을 줄까요?",
  "askai.chatgpt": "ChatGPT에 묻기 →",
  "askai.claude": "Claude에 묻기 →",
  "askai.copy": "프롬프트 복사",
  "askai.copied": "복사됨 ✓",
  "askai.hint": "이 주제의 출처가 달린 가이드와 함께 새 탭에서 당신의 AI를 엽니다. 개인 정보는 포함하지 마세요.",
  "prompt.withQ": "저는 2026년 캘리포니아 주지사 선거를 조사하고 있습니다. \"{name}\"에 대한 제 질문: {question}",
  "prompt.withoutQ": "저는 2026년 캘리포니아 주지사 선거를 조사하고 있습니다. \"{name}\"을(를) 이해하도록 도와주세요 — 양쪽의 주요 논거와 유력 후보들이 어디서 갈리는지를 알려주세요.",
  "prompt.body": "각 후보의 입장과 1차 출처가 담긴 중립적인 출발점 가이드입니다: {url}\n\n여기서 시작하되, 더 폭넓게 조사하셔도 됩니다. 출처를 인용하고, 불확실하거나 그 이후 바뀌었을 수 있는 점이 있으면 알려주세요.",
  "prompt.replyIn": "한국어로 답변해 주세요.",
  "results.heading": "당신의 매칭: {name}",
  "results.headingNone": "당신의 매칭",
  "results.stale": "참고: 이 공유 링크는 데이터셋 {staleVersion} 기준으로 만들어졌지만, 현재 데이터셋은 {currentVersion}입니다. 이후 일부 입장이 바뀌었을 수 있어 이 매칭이 맞지 않을 수 있습니다 — 최신 결과를 보려면 퀴즈를 다시 풀어보세요.",
  "results.copyLink": "공유 링크 복사",
  "results.retake": "다시 풀기",
  "results.seeStats": "모두가 어떻게 답하는지 보기",
  "results.cardCopied": "공유 카드 링크가 클립보드에 복사되었습니다 ✓",
  "results.rankingHeading": "모든 후보와의 매칭 정도",
  "results.method": "<code>{label}</code> 기준으로 채점했습니다. 후보별로 두 가지 점수가 있습니다: <strong>정책 일치도</strong>(당신이 중요하게 여긴 사안에서 의견이 일치한 정도)와 <strong>개인적 적합도</strong>(배경, 경력, 연합 등). 의도적으로 따로 표시하며 — 결코 합치지 않습니다.",
  "score.policy": "정책",
  "score.personalFit": "개인적 적합도",
  "rank.scored": "정책 질문 {p}개 채점 · 개인적 적합도 항목 {f}개 채점",
  "rank.seeWhy": "왜 매칭됐는지 보기 — 잘못된 점은 신고하세요",
  "receipt.agreedOn": "의견이 일치한 사안",
  "receipt.disagreedOn": "의견이 갈린 사안",
  "receipt.noAgree": "채점된 일치 항목이 없습니다.",
  "receipt.noDisagree": "채점된 불일치 항목이 없습니다.",
  "receipt.agreePct": "{pct}% 일치",
  "receipt.apartPct": "{pct}% 차이",
  "receipt.youVs": "당신: {you} · {name}: {them}",
  "receipt.stanceFallback": "입장 {value}",
  "receipt.source": "출처",
  "receipt.flag": "⚑ 신고",
  "receipt.flagPrompt": "\"{issue}\"에 대한 {name}의 입장을 신고합니다 — 무엇이 잘못되었나요?",
  "receipt.sending": "보내는 중…",
  "receipt.flagged": "신고됨 ✓",
  "receipt.failed": "실패",
  "whynot.h3": "왜 차순위 후보가 아닌가요?",
  "whynot.body": "당신의 최고 매칭은 {topPct}%로 <strong>{top}</strong>였습니다. <strong>{runner}</strong>({runnerPct}%)는 {lines}에서 그들을 앞섰습니다.",
  "whynot.and": " 및 ",
  "whatif.summary": "다르게 답했다면 어땠을까요?",
  "whatif.pick": "정책 질문을 고르세요:",
  "whatif.optionLabel": "{issue} — 당신의 답: {label}",
  "whatif.alt": "→ 이렇게 답했다면: {label}",
  "whatif.newTop3": "새로운 상위 3위 (기존 순위 대비 변화):",
  "whatif.row": "{name} — 정책 {pct}% (이전 {was}%)",
  "footer.opensource": "오픈소스:",
  "footer.dataset": "데이터셋:",
  "footer.stats": "실시간 통계",
  "footer.snapshot": "스냅샷 날짜:"
};

/* langNote overrides (translated) */
TRANSLATIONS.es["intro.langNote"] = "Nota: los nombres de los candidatos y el material de origen citado (citas textuales y títulos de las fuentes) se muestran en inglés, de modo que cada posición permanece verificable contra su fuente primaria original.";
TRANSLATIONS.zh["intro.langNote"] = "说明：候选人姓名以及所引用的原始资料（逐字引语和资料标题）均以英文显示，因此每一项立场都可以对照其原始一手资料进行核查。";
TRANSLATIONS.vi["intro.langNote"] = "Lưu ý: tên các ứng cử viên và tài liệu nguồn được trích dẫn (các trích dẫn nguyên văn và tiêu đề nguồn) được hiển thị bằng tiếng Anh, để mọi quan điểm đều có thể đối chiếu được với nguồn sơ cấp gốc của nó.";
TRANSLATIONS.tl["intro.langNote"] = "Paalala: ang mga pangalan ng kandidato at ang sinipping pinagmulang materyal (mga eksaktong sipi at pamagat ng pinagmulan) ay ipinapakita sa Ingles, upang ang bawat posisyon ay manatiling masusuri laban sa orihinal na pangunahing pinagmulan nito.";
TRANSLATIONS.ko["intro.langNote"] = "참고: 후보자 이름과 인용된 출처 자료(원문 인용과 출처 제목)는 영어로 표시되므로, 모든 입장은 원래의 1차 출처와 대조해 확인할 수 있습니다.";

(function () {
  function stored() { try { return localStorage.getItem("lang"); } catch (e) { return null; } }
  function store(l) { try { localStorage.setItem("lang", l); } catch (e) { /* private mode */ } }

  // Map a BCP-47 tag to one of our supported codes (zh-Hans/zh-TW → zh, fil → tl).
  // Accepts hyphen (en-US) and underscore (en_US) region separators, and a bare
  // language code (en); only the primary subtag selects the language for now.
  function normalize(tag) {
    if (!tag) return null;
    var lower = String(tag).toLowerCase();
    var primary = lower.split(/[-_]/)[0];
    if (primary === "zh") return "zh";
    if (primary === "fil" || primary === "tl") return "tl";
    if (I18N_SUPPORTED.indexOf(primary) !== -1) return primary;
    return null;
  }

  function detectFromBrowser() {
    var langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language];
    for (var i = 0; i < langs.length; i++) {
      var hit = normalize(langs[i]);
      if (hit) return hit;
    }
    return null;
  }

  // An explicit ?locale= (or ?lang=) param wins — it's how someone shares a link
  // in a specific language. normalize() maps tags like zh-CN → zh, fil → tl.
  function detectFromUrl() {
    try {
      var params = new URLSearchParams(window.location.search);
      return normalize(params.get("locale") || params.get("lang"));
    } catch (e) { return null; }
  }

  // True when the language reflects a deliberate choice — a ?locale= link, a
  // stored prior choice, or the in-app selector — rather than browser
  // auto-detection or the English fallback. Only deliberate choices get pinned
  // into the address bar and shareable links (see syncUrl / shareLocale), so a
  // default visitor's links stay locale-less and let each recipient auto-detect.
  var explicit = false;

  var lang = (function () {
    var fromUrl = detectFromUrl();
    if (fromUrl) { store(fromUrl); explicit = true; return fromUrl; } // shared link → pin + persist
    var s = stored();
    if (s && I18N_SUPPORTED.indexOf(s) !== -1) { explicit = true; return s; }
    return detectFromBrowser() || "en";
  })();

  document.documentElement.setAttribute("lang", lang);

  // Reflect the chosen language in the address bar as ?locale=<full locale>,
  // preserving the path and any #r= result hash so the URL itself is shareable.
  // replaceState (not push) keeps the back button from cycling through languages.
  // The same set/delete pair lives in app.js's withLocale() (for non-address-bar
  // share URLs) — keep both in sync if the param names ever change.
  function syncUrl(l) {
    try {
      var url = new URL(window.location.href);
      url.searchParams.set("locale", localeTag(l));
      url.searchParams.delete("lang"); // collapse the legacy alias onto ?locale=
      var next = url.toString();
      if (next !== window.location.href) window.history.replaceState(null, "", next);
    } catch (e) { /* no URL/History API (e.g. file://) — skip */ }
  }

  // On load, canonicalize the address bar for a deliberate choice that arrived
  // outside the selector: a stored choice (no param yet), a bare/region-variant
  // ?locale=, or the legacy ?lang= all become ?locale=<full locale>, so the URL
  // a returning or linked-in visitor copies is itself shareable in their
  // language. Auto-detected/default visitors stay locale-less (explicit=false).
  if (explicit) syncUrl(lang);

  function interpolate(s, params) {
    if (!params) return s;
    return s.replace(/\{(\w+)\}/g, function (_m, k) {
      return params[k] != null ? String(params[k]) : "";
    });
  }

  function t(key, params) {
    var dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    var s = dict[key];
    if (s == null) s = TRANSLATIONS.en[key];
    if (s == null) return key;
    return interpolate(s, params);
  }

  function applyAttr(root, dataAttr, domAttr) {
    var nodes = root.querySelectorAll("[" + dataAttr + "]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute(dataAttr);
      nodes[i].setAttribute(domAttr, t(key));
    }
  }

  function apply(root) {
    root = root || document;
    var nodes = root.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      nodes[i].innerHTML = t(key);
    }
    applyAttr(root, "data-i18n-aria", "aria-label");
    applyAttr(root, "data-i18n-placeholder", "placeholder");
    if (root === document) {
      document.title = t("meta.title");
      var md = document.querySelector('meta[name="description"]');
      if (md) md.setAttribute("content", t("meta.description"));
    }
  }

  function buildSelect() {
    var sel = document.getElementById("lang-select");
    if (!sel) return;
    sel.innerHTML = "";
    for (var i = 0; i < I18N_SUPPORTED.length; i++) {
      var code = I18N_SUPPORTED[i];
      var opt = document.createElement("option");
      opt.value = code;
      opt.textContent = I18N_AUTONYMS[code] || code;
      if (code === lang) opt.selected = true;
      sel.appendChild(opt);
    }
    sel.addEventListener("change", function () { setLang(sel.value); });
  }

  function setLang(l) {
    if (I18N_SUPPORTED.indexOf(l) === -1 || l === lang) return;
    lang = l;
    explicit = true;
    store(l);
    syncUrl(l);
    document.documentElement.setAttribute("lang", l);
    apply(document);
    var sel = document.getElementById("lang-select");
    if (sel && sel.value !== l) sel.value = l;
    document.dispatchEvent(new CustomEvent("i18n:change", { detail: { lang: l } }));
  }

  window.I18N = {
    get lang() { return lang; },
    supported: I18N_SUPPORTED,
    autonyms: I18N_AUTONYMS,
    replyLanguage: function () { return I18N_REPLY_LANG[lang] || "English"; },
    isDefaultLang: function () { return lang === "en"; },
    // The full locale (e.g. "es-US") to pin into shareable URLs, or null when
    // the language was auto-detected / left at the English default — then each
    // recipient's own browser locale decides. Consumed by app.js's withLocale().
    shareLocale: function () { return explicit ? localeTag(lang) : null; },
    t: t,
    apply: apply,
    setLang: setLang,
  };

  function init() { apply(document); buildSelect(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
