// dataset_i18n.js — translation overlay for dataset display text.
//
// The English dataset (served by the Worker from the bundled JSON) stays the
// single source of truth. This file supplies translations for the *display*
// fields, keyed by issue/dimension id, which app.js merges onto the English
// dataset at render time (missing keys fall back to English). It deliberately
// does NOT translate citations: verbatim source quotes and source titles stay
// in English so every position remains checkable against its primary source.
//
// Shape:
//   DATASET_I18N.<lang> = {
//     questions: { "<issue_id>": {
//       name, short_description,
//       stance_scale: { "<value>": "label", ... },
//       voter_guide: { explainer, current_policy, arguments_for_change,
//                      arguments_against_change, comparison, note_on_options,
//                      key_facts: [ ... ] }
//     }, ... },
//     dimensions: { "<dim_id>": {
//       name, description,
//       scale:   { "<value>": "label", ... },   // ordinal dimensions
//       options: { "<option_id>": "label", ... } // multi_select dimensions
//     }, ... }
//   }
//
// Loaded as a classic <script> in <head> so window.DATASET_I18N exists before
// the app.js module runs. Translations are appended below this assignment.
var DATASET_I18N = {};
window.DATASET_I18N = DATASET_I18N;

DATASET_I18N.es = {
  "questions": {
    "tax_wealth": {
      "name": "Impuesto estatal a la riqueza",
      "short_description": "¿Debería California gravar el patrimonio neto de sus residentes más ricos — un impuesto sobre la riqueza en sí, distinto del impuesto sobre la renta?",
      "stance_scale": {
        "1": "Oponerse a un impuesto estatal a la riqueza",
        "2": "Inclinarse en contra — sin apoyo actual",
        "3": "Abierto a ello / sin decidir",
        "4": "Apoyar un impuesto a la riqueza",
        "5": "Apoyar firmemente un impuesto a la riqueza sobre los ultrarricos"
      },
      "voter_guide": {
        "current_policy": "California no tiene un impuesto a la riqueza — un impuesto sobre lo que alguien posee (su patrimonio neto) en lugar de los ingresos que percibe. Se han planteado dos versiones diferentes, y funcionan de maneras muy distintas. En 2023, el asambleísta Alex Lee propuso con [AB 259](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB259) (junto con la enmienda constitucional ACA 3) un impuesto anual — 1% sobre el patrimonio neto superior a $50 million y 1.5% por encima de $1 billion — pero quedó estancado en comisión y nunca se convirtió en ley. Por separado, una medida de pago único — la 'Billionaire Tax Act,' formalmente la One-Time Wealth Tax for State-Funded Health Care Programs Initiative, respaldada por SEIU-UHW — calificó para la boleta de noviembre de 2026: un único impuesto del 5% sobre el patrimonio neto de los multimillonarios de California, con ingresos destinados en su mayoría a la atención médica y el resto a la educación y la asistencia alimentaria.",
        "arguments_for_change": "Los partidarios dicen que un impuesto a la riqueza alcanza fortunas que los impuestos sobre la renta no captan — los multimillonarios pueden mantener bajos sus ingresos gravables mientras su patrimonio neto sigue creciendo — y que incluso un impuesto modesto sobre las mayores fortunas podría financiar escuelas, atención médica y cuidado infantil a partir de un grupo reducido de contribuyentes.",
        "arguments_against_change": "Los opositores dicen que un impuesto estatal a la riqueza enfrenta serios problemas legales y prácticos (¿cómo se valoran los activos de alguien?), que los residentes más móviles se irían o se reestructurarían para evitarlo, y que unos ingresos que dependen de un puñado de personas serían impredecibles.",
        "comparison": "California sería el primer estado de EE. UU. en aplicar un verdadero impuesto sobre la riqueza total. Varios otros estados con impuestos altos consideraron la idea y la descartaron, citando los desafíos legales, la dificultad de valorar los activos y el riesgo de que los residentes más ricos simplemente se muden.",
        "key_facts": [
          "Ningún estado de EE. UU. tiene actualmente un verdadero impuesto a la riqueza.",
          "Se trata de dos propuestas diferentes. [AB 259](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB259) (2023, Alex Lee) era un impuesto anual — 1% sobre el patrimonio neto superior a $50 million, 1.5% por encima de $1 billion — que quedó estancado en comisión y nunca se convirtió en ley.",
          "La medida en la boleta de noviembre de 2026 es un impuesto único del 5% sobre el patrimonio neto de los multimillonarios de California (superior a $1 billion), evaluado en una fecha determinada — no un impuesto recurrente. La mayor parte de los ingresos está destinada a la atención médica, con una parte para la educación y la asistencia alimentaria.",
          "Un impuesto único se debe una sola vez, sobre la riqueza a una fecha de corte; un impuesto anual se repite cada año que se mantiene la riqueza. El proyecto de ley de 2023 era anual; la medida en la boleta de 2026 es de pago único.",
          "Se han propuesto impuestos amplios a la riqueza, sin éxito, en Washington, Nueva York, Massachusetts e Illinois. La parte más difícil de cualquier impuesto a la riqueza es valorar cosas sin un precio de mercado claro — empresas privadas, arte, bienes raíces."
        ]
      }
    },
    "school_choice": {
      "name": "Opción escolar y charters",
      "short_description": "¿Debería California facilitar o dificultar la apertura de escuelas charter y dar a las familias más opciones escolares?",
      "stance_scale": {
        "1": "Abrir muchas más escuelas charter y ampliar la opción para las familias",
        "2": "Abrir más escuelas charter; proteger la opción para las familias",
        "3": "Mantener más o menos las reglas actuales sobre escuelas charter",
        "4": "Dificultar la apertura de nuevas escuelas charter",
        "5": "Frenar las nuevas escuelas charter; destinar el dinero a las escuelas públicas tradicionales"
      },
      "voter_guide": {
        "explainer": "Las escuelas públicas tradicionales las administran los distritos escolares locales y son gratuitas y abiertas a todos los estudiantes. Las escuelas charter también son escuelas públicas gratuitas financiadas con impuestos, pero se administran de forma independiente — por lo general por una organización sin fines de lucro bajo un contrato (un 'charter') — con más libertad sobre cómo enseñan y contratan, y menos supervisión del distrito. Las escuelas privadas cobran matrícula y no reciben financiamiento estatal. La 'opción escolar' a veces también significa vales (vouchers) — dinero público que las familias podrían destinar a la matrícula de una escuela privada — algo que California no ofrece actualmente.",
        "current_policy": "California tiene alrededor de 1,283 escuelas charter, más siete distritos compuestos enteramente por charters (datos estatales, mayo de 2024). Enseñan a aproximadamente el 11.7% de los estudiantes de escuelas públicas. Dos leyes de 2019 — [AB 1505](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1505) y [AB 1507](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1507), ambas firmadas ese octubre y en vigor desde el 1 de julio de 2020 — dificultaron la apertura y renovación de charters. Ahora los distritos pueden rechazar un nuevo charter señalando el impacto financiero o comunitario, los charters por lo general no pueden operar planteles fuera del distrito que los aprobó, y a un charter de bajo rendimiento se le puede negar la renovación. California no ofrece vales financiados por el estado para escuelas privadas ni cuentas de ahorro educativo. (Un vale da a las familias dinero público para gastar en matrícula de escuela privada; una cuenta de ahorro educativo, o ESA, es una cuenta financiada por el gobierno que los padres pueden gastar en matrícula, tutoría u otros gastos educativos aprobados.) La última medida de vales, [Prop 38](https://www.lao.ca.gov/ballot/2000/38_11_2000.html) en 2000, perdió 71% a 29%.",
        "arguments_for_change": "Quienes quieren más opción dicen que los charters dan a las familias — de manera desproporcionada familias de bajos ingresos y familias de color — una alternativa además de la escuela del vecindario que les fue asignada, y que algunas redes de charters obtienen resultados sólidos para esos estudiantes. Argumentan que [AB 1505](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1505) dio a los distritos un motivo basado en el dinero para bloquear a los competidores, y que los vales o las cuentas de ahorro educativo abrirían la opción a familias que no pueden costear la matrícula privada o una mudanza a una zona escolar mejor calificada.",
        "arguments_against_change": "Los opositores — incluyendo la California Teachers Association (CTA) y la California School Boards Association (CSBA) — dicen que los charters y los vales sustraen los dólares por estudiante (el financiamiento que sigue a cada alumno) de las escuelas del distrito, que aún enseñan a la mayoría de los niños y siguen teniendo gastos fijos que pagar. Argumentan que la calidad de los charters es desigual y la supervisión es más débil, señalan investigaciones (como los estudios CREDO de Stanford) que muestran que los resultados de los charters varían mucho según el operador y el estado, y observan que los votantes de California han rechazado repetidamente los vales por usar dinero público para pagar escuelas privadas y religiosas.",
        "comparison": "California es uno de los grandes estados más estrictos en materia de opción escolar: tiene un amplio sector de charters pero, a diferencia de Arizona, Florida o Indiana, no ofrece vales para escuelas privadas ni cuentas de ahorro educativo. Sus leyes de 2019 fueron en contra de la tendencia nacional, que ha apuntado a ampliar la opción de escuela privada.",
        "note_on_options": "La escala combina dos mecanismos distintos: la política de charters (una opción de escuela pública) y los vales/ESA de escuela privada (fondos públicos para matrícula privada). Un candidato puede favorecer la expansión de charters mientras se opone a los vales, o viceversa. Nuestra codificación por defecto trata el apoyo a los vales como la señal más fuerte a favor de la opción (valor 1) y una postura de limitar y redirigir como la señal restrictiva más fuerte (valor 5).",
        "key_facts": [
          "Cerca de 1,283 escuelas charter y 7 distritos compuestos enteramente por charters operaban en California (datos estatales, mayo de 2024); los charters enseñan a aproximadamente el 11.7% de los estudiantes de escuelas públicas (2022-23).",
          "[AB 1505](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1505) (2019) puso fin al antiguo derecho casi automático a apelar un charter rechazado, y permitió a los distritos citar el impacto financiero y la necesidad comunitaria al rechazar o negarse a renovar uno.",
          "[AB 1507](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1507) (2019) impidió que la mayoría de los nuevos charters operaran centros de aprendizaje o planteles satélite fuera del distrito que los aprobó (el 'autorizador del charter' — la agencia, por lo general un distrito escolar, que otorga y supervisa el charter).",
          "La matrícula en charters ha aumentado levemente mientras que la matrícula en distritos regulares ha caído, en parte porque la matrícula total a nivel estatal está disminuyendo.",
          "[Prop 38](https://www.lao.ca.gov/ballot/2000/38_11_2000.html) (2000), que habría dado a las familias un vale de unos $4,000 por niño, perdió 71% a 29%. Ningún vale a nivel estatal ha llegado a la boleta desde entonces."
        ]
      }
    },
    "housing_supply": {
      "name": "Oferta de vivienda y preempción de la zonificación",
      "short_description": "¿Con cuánta fuerza debería el estado presionar a las ciudades para que construyan más vivienda — incluso cuando los residentes locales se oponen?",
      "stance_scale": {
        "1": "Presionar con fuerza — anular las reglas locales de zonificación para forzar más construcción",
        "2": "Presionar bastante — fijar metas de construcción firmes, anular a las ciudades en cierta medida",
        "3": "Buscar un equilibrio — fomentar la construcción pero dejar la mayoría de las decisiones a las ciudades",
        "4": "Dejarlo mayormente a las ciudades — limitar la anulación estatal, recortar en cambio la burocracia local",
        "5": "Centrarse en vivienda subsidiada y protecciones para inquilinos en lugar de forzar construcción a precio de mercado"
      },
      "voter_guide": {
        "current_policy": "Durante la última década, California le ha quitado a las ciudades gran parte del poder sobre las aprobaciones de vivienda y se lo ha dado al estado. [SB 35](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB35) (2017) creó una vía rápida para proyectos de apartamentos que califiquen en ciudades que no cumplen sus metas estatales de vivienda: la aprobación pasa a ser \"ministerial,\" lo que significa que los funcionarios locales deben decir que sí si se cumplen las reglas, sin discreción para decir que no. [SB 423](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB423) (2023) extendió esa vía rápida hasta 2036 y la amplió a partes de la costa. [SB 9](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB9) (2021) hizo posible construir dúplex y dividir lotes en la mayoría de las propiedades unifamiliares \"por derecho\" — lo que significa que la aprobación es automática si se cumplen las reglas. El estado también asigna a cada región una meta de vivienda, llamada Regional Housing Needs Assessment (RHNA). Cuando el plan de vivienda local de una ciudad no se ajusta a la ley, una norma estatal llamada Housing Accountability Act limita su poder para rechazar vivienda — y [AB 1893](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB1893) (2024) le dio verdadera fuerza al \"Builder's Remedy,\" que permite a los desarrolladores eludir la zonificación local en ciudades que no cumplen sus metas de vivienda.",
        "arguments_for_change": "Los partidarios de un mayor control estatal dicen que el gobierno local causó una escasez de vivienda que ha durado décadas. La Legislative Analyst's Office (LAO) atribuye los alquileres y precios de vivienda líderes del país directamente a que se construye demasiado poco cerca de los centros de empleo costeros. Los partidarios argumentan que las ciudades ceden a la presión de los propietarios para bloquear nueva vivienda, así que solo mandatos estatales firmes — aprobación automática \"por derecho,\" metas exigibles y el Builder's Remedy — pueden cerrar la brecha. Señalan a [SB 9](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB9) como prueba de que las herramientas voluntarias fracasan cuando las ciudades aún tienen margen para demorarse.",
        "arguments_against_change": "Los opositores dicen que las decisiones de uso del suelo corresponden a los funcionarios locales, que conocen sus propios vecindarios — las calles, el riesgo de incendio, el tráfico, el carácter del lugar. Argumentan que los mandatos estatales uniformes anulan planes que los votantes locales aprobaron, y que los proyectos \"por derecho\" de vía rápida pueden saltarse la revisión ambiental y la participación pública. También dicen que las verdaderas causas de la escasez son los altos costos de construcción, las tasas de interés y la escasez de mano de obra — no la zonificación — por lo que anular a las ciudades agrega conflicto sin producir de manera confiable viviendas asequibles.",
        "comparison": "California ha ido más lejos que casi cualquier estado en anular la zonificación local. Algunos otros también se han movido en esta dirección — Oregón puso fin a la zonificación exclusivamente unifamiliar a nivel estatal en 2019, y Montana y Washington aprobaron leyes amplias en 2023 que permiten más vivienda en lotes existentes. Pero muchos estados aún dejan las decisiones de uso del suelo casi por completo a las ciudades y pueblos.",
        "note_on_options": "Este es un único eje que mide con cuánta fuerza debería el estado presionar para ampliar la oferta de vivienda a precio de mercado — desde la preempción agresiva de la zonificación local (opción 1) hasta priorizar los subsidios y las protecciones para inquilinos por sobre la oferta forzada por el estado (opción 5). Los candidatos pueden llegar al extremo bajo por distintas razones: algunos defienden el control local y los vecindarios unifamiliares (opción 4), mientras que otros favorecen la vivienda pública/subsidiada sobre la construcción a precio de mercado (opción 5). Una postura aquí indica cuánto usaría el candidato el poder estatal para anular la zonificación local en aras de la oferta.",
        "key_facts": [
          "El ciclo actual de RHNA (2023–2031) pide alrededor de 2.5 millones de nuevas viviendas a nivel estatal — aproximadamente 1 millón de ellas asequibles para familias de menores ingresos.",
          "[SB 9](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB9) (2021) se usó mucho menos de lo esperado. En su primer año, Los Ángeles recibió 211 solicitudes de unidades, San Francisco 25, San Diego 7, y San José apenas 1 — aunque un análisis de 2021 del Terner Center había estimado que unas 700,000 unidades podrían volverse recién viables.",
          "Las ciudades que no cumplen con la ley estatal de planes de vivienda pueden ser multadas con $10,000 a $600,000 al mes.",
          "La vía rápida de [SB 35](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB35) / [SB 423](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB423) solo se activa cuando una ciudad no cumple sus metas de vivienda o no tiene un plan de vivienda aprobado por el estado. SB 423 también añadió requisitos de salarios y de trabajadores calificados que aumentan según el tamaño del proyecto.",
          "La Surplus Land Act exige que las agencias locales den prioridad a la vivienda asequible cuando venden terrenos públicos que ya no necesitan."
        ]
      }
    },
    "sanctuary": {
      "name": "Santuario y aplicación de las leyes de inmigración",
      "short_description": "¿Cuánto debería cooperar California con la aplicación federal de las leyes de inmigración (ICE)?",
      "stance_scale": {
        "1": "Cooperar plenamente con ICE — derogar la ley de santuario del estado",
        "2": "Mantener la ley de santuario pero permitir más excepciones",
        "3": "Mantener la actual ley de santuario tal como está",
        "4": "Reforzar las protecciones (p. ej., financiar la defensa legal de los inmigrantes)",
        "5": "Ir mucho más lejos — añadir nuevas protecciones estatales, como identificaciones estatales para todos"
      },
      "voter_guide": {
        "explainer": "Una \"ley de santuario\" limita cuánto pueden ayudar la policía estatal y local a los agentes federales de inmigración. La principal de California es [SB 54](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB54), la California Values Act, aprobada en 2017.",
        "current_policy": "La base de California es la California Values Act, [SB 54](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB54) (2017), en vigor desde el 1 de enero de 2018. Establece que las agencias estatales y locales no pueden usar su personal ni su dinero para aplicar las leyes federales de inmigración civil. Eso significa que, por lo general, no pueden retener a alguien en la cárcel solo porque ICE lo pide (lo que se llama una \"detainer\" o solicitud de retención), no pueden arrestar a personas con órdenes civiles de inmigración, y no pueden firmar acuerdos \"287(g)\" — pactos que permiten a los oficiales locales actuar como agentes de inmigración. Hay excepciones: las cárceles pueden avisar a ICE cuando alguien va a ser liberado, o entregárselo, si esa persona fue condenada por ciertos delitos graves o violentos enumerados en la ley estatal. Una ley aparte, la TRUTH Act ([AB 2792](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201520160AB2792), 2016), establece que a las personas bajo custodia se les debe informar sobre cualquier entrevista de ICE, y que deben consentirla, y que los gobiernos locales deben celebrar una reunión pública si dan acceso a ICE. Las prisiones estatales (CDCR) solo están parcialmente cubiertas por SB 54 y siguen sus propias reglas de notificación.",
        "arguments_for_change": "Quienes quieren protecciones de santuario más fuertes argumentan que mantener a la policía local fuera de la aplicación de las leyes de inmigración genera confianza, de modo que las víctimas y los testigos inmigrantes de delitos se sientan seguros al denunciarlos. Señalan que las detainers de ICE por lo general no las firma un juez, lo que plantea inquietudes constitucionales y puede exponer a los condados a demandas. Y apuntan que las excepciones por delitos graves ya existentes permiten la cooperación en los casos más graves — así que medidas adicionales (como limitar el intercambio de datos, o mantener a ICE fuera de los tribunales, escuelas y hospitales) solo afectarían a la aplicación civil.",
        "arguments_against_change": "Quienes quieren una mayor cooperación con ICE argumentan que liberar a personas que ICE ha señalado — incluyendo a algunas con antecedentes penales que no encajan en las excepciones — puede devolver a las comunidades a personas que las autoridades federales consideran deportables. Dicen que las entregas planeadas desde la cárcel son más seguras para los oficiales y el público que los arrestos de ICE en la calle, y que la aplicación de las leyes de inmigración es una tarea federal en la que el estado no debería interponerse. En su opinión, rechazar las solicitudes de ICE perjudica la seguridad pública y la colaboración entre el gobierno federal y el estatal.",
        "comparison": "California está entre los estados que más limitan la cooperación local con los agentes de inmigración, junto con Illinois (la TRUST Act) y varios otros. En contraste, estados como Texas (con su ley SB 4) y Florida exigen que las agencias locales cooperen con ICE y prohíben las políticas de santuario. El programa federal 287(g) tenía acuerdos con aproximadamente 1,600 agencias en todo el país para 2026 — casi ninguna en California.",
        "note_on_options": "Dado que SB 54 es una ley y fue confirmada en los tribunales, el rango realista para un gobernador va desde una aplicación/orientación que maximice las exclusiones por delitos graves (extremo inferior) hasta firmar proyectos de ley que restrinjan el intercambio de datos o el acceso de ICE a las instalaciones (extremo superior). La derogación total (muy por debajo de la postura 1) o la abolición completa de toda cooperación (por encima de la postura 5) requerirían una acción legislativa que un gobernador no puede tomar por sí solo.",
        "key_facts": [
          "[SB 54](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB54) entró en vigor el 1 de enero de 2018. La primera administración Trump demandó para bloquearla y perdió: el caso fue desestimado, la corte de apelaciones del Noveno Circuito estuvo de acuerdo, y la Corte Suprema de EE. UU. se negó a escucharlo — así que la ley sigue vigente.",
          "Los acuerdos 287(g) (que delegan en los oficiales locales la aplicación de las leyes de inmigración) están prohibidos para las agencias de California bajo SB 54. En 2025, un intento del sheriff del condado de Shasta fue suspendido porque entraba en conflicto con la ley estatal.",
          "Las excepciones de SB 54 permiten que las agencias notifiquen o entreguen a alguien a ICE si esa persona fue condenada por delitos graves o violentos específicos — no para personas cuyo único problema es su estatus migratorio.",
          "La TRUTH Act (2016) exige que se informe a las personas que pueden rechazar una entrevista de ICE en la cárcel, y requiere una reunión comunitaria pública cuando las agencias locales dan acceso a ICE.",
          "Las reglas de santuario las fija en su mayoría la ley estatal, así que las principales herramientas de un gobernador son la orientación sobre la aplicación, el enfoque del fiscal general respecto a las demandas, las reglas penitenciarias, y firmar o vetar nuevos proyectos de ley — no derogar la ley directamente."
        ]
      }
    },
    "homelessness": {
      "name": "Respuesta a la falta de vivienda",
      "short_description": "¿Cómo debería abordar California la falta de vivienda — apoyarse más en la aplicación de la ley, o en la vivienda y los servicios?",
      "stance_scale": {
        "1": "Despejar los campamentos y ampliar el tratamiento ordenado por la corte como herramientas principales",
        "2": "Liderar con la aplicación de la ley, pero ofrecer servicios al mismo tiempo",
        "3": "Equilibrar ambos — despejar campamentos solo cuando haya refugio o servicios disponibles",
        "4": "Liderar primero con la vivienda; usar la aplicación de la ley con moderación",
        "5": "Invertir fuertemente en vivienda y servicios; usar la aplicación de la ley solo como último recurso"
      },
      "voter_guide": {
        "explainer": "\"Housing First\" (Vivienda Primero) significa dar a alguien un lugar permanente para vivir de inmediato, sin exigirle primero que deje las adicciones o acepte tratamiento — la idea es que es más fácil enfrentar la adicción o la enfermedad mental una vez que se tiene un techo. Una \"conservatorship\" (tutela) es una orden judicial que pone a otra persona o agencia a cargo de las decisiones de alguien que un juez determina incapaz de cuidarse a sí mismo. \"CARE Court\" es una vía judicial civil más reciente que puede ordenar un plan de tratamiento para personas con enfermedad mental grave sin tratar. El \"point-in-time count\" (conteo PIT) es un recuento de una noche cada enero de cuántas personas están sin vivienda.",
        "current_policy": "La regla oficial de California es \"Housing First\": los programas financiados por el estado deben ofrecer a las personas vivienda permanente de inmediato, sin exigir primero que dejen las adicciones o acepten tratamiento. Esto está escrito en la ley estatal (Welfare & Institutions Code §8255). Además de eso, el estado ha añadido recientemente opciones de aplicación de la ley y de tratamiento. La CARE Act ([SB 1338](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1338), aprobada en 2022) creó tribunales civiles que pueden ordenar un plan de tratamiento para personas con trastornos del tipo esquizofrenia sin tratar, y todos los condados lo estaban aplicando para diciembre de 2024. La [Proposition 1](https://calmatters.org/california-voter-guide-2024/prop-1-mental-health/) (marzo de 2024) aprobó un bono de $6.4 billion para vivienda y tratamiento de salud mental y reasignó algunos fondos de salud mental existentes. Tras el fallo [Grants Pass v. Johnson](https://calmatters.org/housing/2024/06/california-homeless-camps-grants-pass-ruling/) de la Corte Suprema de EE. UU. (junio de 2024), el gobernador Newsom indicó a las agencias estatales y a las ciudades que despejaran los campamentos y compartió una ordenanza modelo contra los campamentos que podían adoptar.",
        "arguments_for_change": "Quienes favorecen un enfoque centrado en los servicios, de Housing First (el extremo alto de la escala), dicen que un hogar estable es lo que hace posible abordar la adicción y la enfermedad mental — no una recompensa que se gana después. Señalan estudios que muestran que Housing First mantiene a las personas con vivienda. Argumentan que despejar campamentos solo desplaza a las personas sin reducir la población, y las carga con antecedentes penales que hacen aún más difícil encontrar vivienda. Y advierten que ampliar el tratamiento forzado o la tutela corre el riesgo de coaccionar a personas a quienes nunca se les ofreció primero suficiente ayuda voluntaria.",
        "arguments_against_change": "Quienes favorecen más aplicación de la ley, mandatos de tratamiento y tutela (el extremo bajo) dicen que California ha gastado más de $20 billion en la falta de vivienda en los últimos años, mientras que la proporción que vive a la intemperie se mantuvo cerca de la más alta del país. Argumentan que la vivienda por sí sola no funciona para las muchas personas en la calle con enfermedad mental grave o adicción sin tratar, que los campamentos visibles crean problemas reales de salud y seguridad, y que el fallo Grants Pass ahora permite al estado combinar una oferta de refugio y tratamiento con consecuencias si alguien la rechaza.",
        "comparison": "La población sin vivienda de California creció alrededor de un 3% en 2024 — mucho menos que el aumento de aproximadamente 18% en la falta de vivienda a nivel nacional. Pero el estado aún tiene la mayor cantidad de personas sin vivienda de cualquier estado, la mayor proporción del total del país, y la mayor parte durmiendo a la intemperie. La mayoría de los demás estados grandes logra llevar a refugios a una proporción mucho mayor de sus residentes sin vivienda.",
        "note_on_options": "Esta escala va desde aplicación de la ley y tratamiento obligatorio (1) hasta Housing First puro sin aplicación de la ley (5). Muchos candidatos favorecen combinaciones — p. ej., más camas de tratamiento más vivienda voluntaria — que caen en el medio; los extremos representan las cuestiones en disputa de si condicionar la vivienda al tratamiento y si usar la aplicación de la prohibición de acampar.",
        "key_facts": [
          "187,084 californianos fueron contados como personas sin vivienda en el conteo de una noche de enero de 2024, un aumento del 3.1% respecto a los 181,399 del año anterior (HUD).",
          "California tiene aproximadamente el 25% de la población sin vivienda del país y la mayor proporción viviendo a la intemperie — alrededor de dos tercios duermen en la calle en lugar de en refugios.",
          "[Grants Pass v. Johnson](https://calmatters.org/housing/2024/06/california-homeless-camps-grants-pass-ruling/) (Corte Suprema, 6-3, junio de 2024) dictaminó que prohibir acampar en lugares públicos no viola la Octava Enmienda. Eso eliminó la barrera legal previa para multar o arrestar a personas por acampar incluso cuando no hay refugio disponible.",
          "La [Proposition 1](https://calmatters.org/california-voter-guide-2024/prop-1-mental-health/) (marzo de 2024) aprobó un bono de $6.4 billion para vivienda y tratamiento de salud conductual, incluyendo unos $4.4 billion en subvenciones para construir aproximadamente 6,800 camas de tratamiento hospitalario, además de vivienda permanente de apoyo para veteranos sin vivienda y otras personas.",
          "Para principios de 2026, se habían presentado más de 3,800 peticiones de la CARE Act desde que el programa se implementó a nivel estatal en diciembre de 2024, y el estado añadió $291 million en marzo de 2026 para servicios y vivienda relacionados con CARE."
        ]
      }
    },
    "gun_policy": {
      "name": "Política sobre armas de fuego",
      "short_description": "¿Deberían flexibilizarse, mantenerse igual o endurecerse las leyes de armas de California?",
      "stance_scale": {
        "1": "Flexibilizarlas considerablemente (porte oculto más fácil, aplicación más laxa)",
        "2": "Flexibilizar algunas reglas específicas",
        "3": "Mantener las leyes de armas actuales tal como están",
        "4": "Defender las leyes actuales y cerrar vacíos legales",
        "5": "Añadir nuevas restricciones importantes (registro de armas, más prohibiciones)"
      },
      "voter_guide": {
        "current_policy": "California tiene algunas de las leyes de armas más estrictas del país. La Roberti-Roos Assault Weapons Control Act (1989) y leyes posteriores prohíben muchas \"armas de asalto\" semiautomáticas, y el estado limita los cargadores a 10 cartuchos. En 2022, el caso de la Corte Suprema de EE. UU. NYSRPA v. Bruen anuló las reglas que permitían a los funcionarios decidir quién tenía una \"razón suficiente\" para portar un arma oculta. En respuesta, [SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB2) (2023, en vigor el 1 de enero de 2024) cambió California a permisos de \"emisión obligatoria\" — lo que significa que cualquiera que califique obtiene uno — mientras añadía un requisito de 16 horas de capacitación y una larga lista de \"lugares sensibles\" donde las armas están prohibidas incluso con permiso. Una ley aparte, [AB 28](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB28) (2023, en vigor en 2024), añadió un impuesto estatal del 11% a la venta de armas y municiones para financiar programas de prevención de la violencia y de seguridad escolar.",
        "arguments_for_change": "Quienes quieren más restricciones señalan que los estados con leyes de armas más fuertes tienden a reportar tasas más bajas de muertes por armas. Argumentan que los límites a las armas de asalto y a los cargadores, la lista de lugares sensibles de SB 2 y el impuesto de AB 28 reducen la disponibilidad de armas en entornos de riesgo mientras pagan por la prevención. Dicen que cerrar los vacíos restantes — y defender las leyes actuales en los tribunales — salva vidas, y que la Segunda Enmienda aún permite una regulación razonable.",
        "arguments_against_change": "Quienes se oponen a más restricciones argumentan que California ya tiene las reglas más estrictas del país y aun así sigue teniendo delitos con armas, por lo que el beneficio de nuevos límites es pequeño. Dicen que los fallos judiciales posteriores a Bruen sugieren que varias de las leyes de California podrían ser inconstitucionales e invitan a costosas demandas. Argumentan que las amplias prohibiciones en lugares sensibles y un impuesto a las ventas cargan a los dueños de armas que cumplen la ley y hacen que los derechos de porte dependan de dónde uno se encuentre. Y dicen que la aplicación de la ley se dirige mejor al tráfico ilegal y a las personas que ya tienen prohibido poseer armas que a los compradores legales.",
        "comparison": "Las tarjetas de calificación independientes y de grupos de defensa clasifican constantemente las leyes de armas de California como las más estrictas, o casi las más estrictas, del país — junto con Massachusetts, Nueva York, Illinois y Connecticut. En contraste, los estados de \"porte constitucional\" como Texas, Arizona e Idaho no exigen permiso para portar un arma oculta y tienen muchos menos límites sobre los cargadores y los tipos de rifles.",
        "note_on_options": "Gran parte de la ley de armas de California está moldeada por los litigios en el Noveno Circuito y la Corte Suprema, así que el rango práctico de un gobernador va desde defender o reducir las reglas existentes a la luz de los fallos judiciales (extremo inferior) hasta firmar nuevas restricciones y defenderlas con energía (extremo superior). \"Revertir\" (postura 1) significaría principalmente negarse a defender o firmar derogaciones, ambas limitadas por la Legislatura.",
        "key_facts": [
          "California ha prohibido las \"armas de asalto\" desde la Roberti-Roos Act de 1989 y limita los cargadores a 10 cartuchos.",
          "[SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB2) (en vigor el 1 de enero de 2024) mantuvo los permisos de emisión obligatoria tras el fallo Bruen pero designó unas 26 categorías de \"lugares sensibles.\" En 2025 la corte de apelaciones del Noveno Circuito confirmó algunas de esas prohibiciones por ubicación y bloqueó otras mientras el caso continúa.",
          "Se proyecta que el impuesto del 11% de [AB 28](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB28) a armas y municiones (en vigor en 2024) recaude unos $160 million al año para programas de prevención de la violencia y de seguridad escolar. Enfrenta un desafío judicial sin resolver.",
          "El microestampado y otras reglas del lado del fabricante (como [SB 452](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB452), 2023) siguen vigentes, aunque algunas partes solo se activan si se determina que la tecnología es viable.",
          "Varias leyes de armas de California están en litigio activo en el Noveno Circuito bajo la prueba Bruen — que pregunta si una ley se ajusta a la \"historia y tradición\" de regulación de armas del país — por lo que qué reglas se pueden aplicar realmente cambia a medida que los tribunales fallan."
        ]
      }
    },
    "natgas_bridge": {
      "name": "El gas natural como combustible de transición",
      "short_description": "¿Qué papel debería desempeñar el gas natural mientras California pasa a una energía más limpia?",
      "stance_scale": {
        "1": "Ampliar el uso y la infraestructura de gas natural",
        "2": "Mantener el gas natural por ahora; reducirlo gradualmente",
        "3": "Sin cronograma firme — dejar que el costo y la fiabilidad de la red decidan",
        "4": "Eliminar el gas de la electricidad para mediados de la década de 2030",
        "5": "Eliminar el gas rápidamente en hogares, negocios y centrales eléctricas"
      },
      "voter_guide": {
        "current_policy": "California todavía obtiene alrededor del 40% de su electricidad generada dentro del estado a partir del gas natural, y el gas calienta la mayoría de sus aproximadamente 14 millones de hogares. Pero el estado está orientando los nuevos edificios hacia la energía eléctrica. En 2022, la California Air Resources Board (CARB — la agencia de calidad del aire del estado) fijó una meta: para 2030, cada nuevo calefactor y calentador de agua vendido para hogares debería ser de cero emisiones, con los edificios comerciales siguiendo para 2035. CARB todavía está redactando la norma concreta para lograrlo. La redujo en diciembre de 2025, y se espera una votación de la junta en 2026, pero nada es definitivo aún. Mientras tanto, decenas de ciudades prohibieron el gas en nuevas construcciones después de que Berkeley lo hiciera en 2019 — hasta que un fallo de una corte federal de apelaciones de 2023 (CRA v. Berkeley) dijo que la ley federal sobre electrodomésticos prevalece sobre esas prohibiciones locales. Así que el estado ha pasado a usar códigos de construcción y normas de emisiones en su lugar.",
        "arguments_for_change": "Los partidarios de abandonar el gas más rápido dicen que los edificios son una gran fuente de gases de efecto invernadero y de contaminación que forma smog, y que quemar gas en interiores genera inquietudes de salud. Argumentan que construir nuevas tuberías y conexiones de gas es arriesgado porque ese equipo podría quedar inservible a medida que la red se electrifica. Señalan que las bombas de calor ahora superan a los calefactores de gas en la mayoría de los climas de California. Y advierten que, a medida que menos clientes usan gas, el costo fijo de mantener la red de tuberías recae en quienes quedan — a menudo hogares de menores ingresos — así que un cambio planificado y ordenado es más barato que uno caótico.",
        "arguments_against_change": "Los partidarios de mantener el gas como puente dicen que el gas se puede encender al instante para respaldar la energía solar y eólica cuando no están disponibles, ayudando a evitar apagones en la demanda máxima. Argumentan que obligar a todos a electrificarse aumenta los costos iniciales para las familias y sobrecarga una red que ya es cara. Con las tarifas de electricidad de California las 2nd más altas del país, dicen que el dinero ahorrado al usar una bomba de calor es incierto. Y advierten que los mandatos repentinos superan las mejoras de los paneles eléctricos y la mano de obra capacitada que se necesitan para instalar millones de bombas de calor.",
        "comparison": "California es uno de los estados más agresivos en cambiar los edificios para que dejen el gas, junto con Nueva York (que prohibió el gas en la mayoría de los edificios nuevos a partir de 2026) y Washington. La mayoría de los estados ha ido en sentido contrario: más de 20 han aprobado leyes que impiden que las ciudades restrinjan las conexiones de gas natural.",
        "note_on_options": "Esta escala mide el ritmo del abandono del gas, no si descarbonizar del todo — casi todos los candidatos aceptan la meta de neutralidad de carbono a largo plazo del estado. El desacuerdo es sobre el cronograma y los mandatos (prohibiciones de electrodomésticos, prohibiciones de conexiones, retiro del sistema de gas) frente a los incentivos y la adopción voluntaria.",
        "key_facts": [
          "Alrededor del 40% de la electricidad de California proviene del gas natural, y el gas calienta la mayoría de los hogares y el agua del estado.",
          "El plan de CARB de 2022 apunta a que el 100% de los nuevos calefactores y calentadores de agua para hogares que se vendan sean de cero emisiones para 2030 — pero la norma para hacerlo cumplir no está terminada, y fue reducida en diciembre de 2025.",
          "Un fallo de una corte federal de apelaciones de 2023 (CRA v. Berkeley) dijo que las prohibiciones locales sobre conexiones de gas en edificios nuevos quedan anuladas por la ley federal sobre electrodomésticos.",
          "California ofrece reembolsos para bombas de calor (unidades eléctricas de calefacción y refrigeración) a través de TECH Clean California y programas de servicios públicos, con la meta de 6 millones instaladas para 2030.",
          "Aliso Canyon — el sitio de almacenamiento de gas de la fuga de metano de SoCalGas de 2015–16, la más grande en la historia de EE. UU. — sigue funcionando. Un cierre antes planeado para 2027 ahora no se espera hasta finales de la década de 2030 como muy pronto."
        ]
      }
    },
    "prop13_commercial": {
      "name": "Impuesto a la propiedad comercial (Prop 13 split-roll)",
      "short_description": "California limita los impuestos a la propiedad según el precio de compra de una propiedad (Prop 13). ¿Debería gravarse la propiedad comercial y de negocios, en cambio, según su valor de mercado actual?",
      "stance_scale": {
        "1": "Reforzar el límite impositivo para la propiedad comercial",
        "2": "Mantener el límite impositivo actual para la propiedad comercial",
        "3": "Cambiarlo solo para las propiedades comerciales más grandes",
        "4": "Gravar gradualmente la propiedad comercial según el valor de mercado",
        "5": "Gravar plenamente la propiedad comercial según el valor de mercado"
      },
      "voter_guide": {
        "explainer": "La Proposición 13, aprobada por los votantes en 1978, establece cómo California grava la propiedad. Su impuesto a la propiedad está limitado al 1% de lo que pagó por la propiedad, y el valor gravable solo puede subir alrededor de un 2% al año — sin importar cuánto suba el valor de mercado de la propiedad. La factura completa solo se vence cuando la propiedad se vende y se reevalúa al nuevo precio. Esto se aplica por igual a casas, tiendas, oficinas y fábricas. \"Split-roll\" significa gravar la propiedad de negocios de forma diferente a las casas; California no lo hace actualmente.",
        "current_policy": "Bajo la [Prop 13](https://lao.ca.gov/Publications/Report/3497) (1978), toda la propiedad de California — casas, tiendas, oficinas y fábricas — se grava al 1% de su precio de compra, y el valor gravable no puede subir más del 2% al año hasta que la propiedad se vende y se reevalúa. La propiedad de negocios no recibe un tratamiento separado (\"split-roll\"). La [Prop 15](https://lao.ca.gov/BallotAnalysis/Proposition?number=15&year=2020) (2020) habría cambiado eso para la mayoría de la propiedad comercial e industrial, gravándola según el valor de mercado actual mientras dejaba las casas bajo las reglas de la Prop 13. Fracasó, 52% a 48%.",
        "arguments_for_change": "Los partidarios de un split-roll comercial dicen que la regla del precio de compra de la [Prop 13](https://lao.ca.gov/Publications/Report/3497) permite que la propiedad de negocios mantenida durante mucho tiempo — torres de oficinas, centros comerciales, grandes sitios industriales — se grave sobre valores que están desactualizados por décadas. Eso traslada más de la carga impositiva a los propietarios más nuevos y a los dueños de viviendas. Señalan la estimación de la LAO de $6.5–$11.5 billion como dinero estable para escuelas y servicios locales, y argumentan que gravar la propiedad de negocios según el valor de mercado — mientras se sigue protegiendo a los dueños de viviendas y a las pequeñas empresas — corrige el desequilibrio sin tocar las protecciones de las viviendas.",
        "arguments_against_change": "Los opositores dicen que los impuestos más altos a la propiedad comercial se trasladan a los inquilinos — pequeñas empresas, restaurantes, arrendatarios — y en última instancia a los compradores, elevando los precios en toda la economía. Advierten que reevaluar la propiedad según el valor de mercado cada año es complicado e invita a demandas, que golpearía más fuerte a las empresas en las recesiones cuando los valores y los alquileres son inestables, y que debilitar la Prop 13 para cualquier tipo de propiedad abre la puerta a ir socavando más adelante las protecciones de las viviendas — deshaciendo la previsibilidad que los votantes votaron en 1978.",
        "comparison": "California es inusual al gravar la propiedad de negocios y la residencial de la misma manera — atando ambas al precio de compra. La mayoría de los estados reevalúa toda la propiedad hacia el valor de mercado actual cada cierto tiempo. Como resultado, un edificio comercial de California mantenido durante décadas puede gravarse muy por debajo de uno casi idéntico que se vendió recientemente.",
        "note_on_options": "La escala es un gradiente claro: la opción 1 refuerza las protecciones de la Prop 13 para la propiedad comercial, la opción 3 es una reforma específica que se aplica solo a tenencias muy grandes (el modelo de exclusión para pequeñas empresas de la Prop 15), y la opción 5 es un split-roll completo según el valor de mercado. Las protecciones residenciales de la Prop 13 no están en juego aquí — todas las opciones las dejan intactas.",
        "key_facts": [
          "La [Prop 13](https://lao.ca.gov/Publications/Report/3497) limita la tasa del impuesto a la propiedad al 1% del precio de compra y restringe el crecimiento anual del valor gravable al 2% — hasta que la propiedad cambia de manos y se reevalúa.",
          "La LAO estimó que la [Prop 15](https://lao.ca.gov/BallotAnalysis/Proposition?number=15&year=2020) habría recaudado de $6.5 billion a $11.5 billion al año para los gobiernos locales y las escuelas una vez plenamente implementada (alrededor de 2025).",
          "De ese dinero, aproximadamente el 60% habría ido a ciudades, condados y distritos especiales, y el 40% a escuelas y colegios comunitarios (LAO).",
          "La Prop 15 dejó las casas completamente fuera. También eximía a las pequeñas empresas con $3 million o menos en propiedad comercial en California, más hasta $500,000 de equipo de negocio.",
          "La Prop 15 perdió a nivel estatal, 51.9% a 48.1%, en noviembre de 2020."
        ]
      }
    },
    "healthcare_funding": {
      "name": "Mecanismo de financiamiento de la atención médica",
      "short_description": "¿Debería California avanzar hacia un sistema de salud de pagador único administrado por el estado (el estado cubre a todos en lugar del seguro privado) — y de ser así, cómo se pagaría?",
      "stance_scale": {
        "1": "Revertir las expansiones recientes de la cobertura de salud estatal (Medi-Cal)",
        "2": "Mantener el sistema actual; centrarse en reducir costos",
        "3": "Ampliar la cobertura gradualmente, sin un gran impuesto nuevo",
        "4": "Pagador único, financiado principalmente con impuestos a la riqueza y a las empresas",
        "5": "Pagador único, financiado con amplios impuestos nuevos (como un impuesto sobre la nómina)"
      },
      "voter_guide": {
        "explainer": "\"Pagador único\" significa que un solo plan del gobierno paga las facturas médicas de todos, en lugar de muchas compañías de seguros privadas. La \"ACA\" (Affordable Care Act, también llamada Obamacare) es la ley federal que creó los mercados subsidiados donde la gente puede comprar cobertura. \"Medi-Cal\" es la versión de California de Medicaid — el programa público de cobertura de salud para residentes de bajos ingresos.",
        "current_policy": "California usa una combinación de seguro privado más una fuerte ayuda gubernamental, en lugar de un único plan administrado por el estado. Covered California es el mercado de la Affordable Care Act (ACA) del estado, donde la gente compra cobertura, y el estado contribuye para reducir las primas. Medi-Cal — la versión de California de Medicaid, el programa público de cobertura para residentes de bajos ingresos — se amplió el 1 de enero de 2024 para cubrir a todos los adultos indocumentados elegibles, convirtiendo a California en el primer estado en ofrecer cobertura completa de Medicaid sin importar el estatus migratorio de la persona. Los esfuerzos por pasar a un único plan administrado por el gobierno han fracasado repetidamente: [AB 1400](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1400) (el proyecto de ley CalCare, 2022) fue retirado antes de una votación, y su continuación, [AB 2200](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2200) (2024), fue detenido en comisión.",
        "arguments_for_change": "Quienes quieren avanzar hacia un plan estatal de pagador único (el extremo alto) dicen que un solo plan público eliminaría los gastos generales de las compañías de seguros, las primas, los deducibles y las redes limitadas de proveedores. Señalan algunos análisis (como una estimación del UC Berkeley Labor Center) que proyectaron que todo el sistema podría gastar menos en general. Argumentan que cubrir a todos — sin importar el empleo o el estatus migratorio — es más sencillo de administrar, y que el enorme tamaño de California le daría poder de negociación para conseguir precios más bajos.",
        "arguments_against_change": "Quienes quieren mantener el mercado privado subsidiado actual (el extremo bajo) dicen que el costo del pagador único de aproximadamente $300–400 billion al año significaría fuertes impuestos nuevos, sin garantía de ahorro neto. Señalan que depende de aprobaciones federales y excepciones a ERISA que podrían no llegar nunca. Advierten que trastocar la cobertura del empleador y de Medicare que la mayoría ya tiene es arriesgado, tanto política como prácticamente — y que California ya alcanzó una cobertura casi universal ampliando los subsidios y Medi-Cal sin ese trastorno.",
        "comparison": "Ningún estado de EE. UU. opera un sistema de pagador único. Vermont aprobó uno en 2014, y luego lo abandonó porque no pudo determinar cómo pagarlo. California eligió un camino diferente — ampliar los subsidios y Medicaid — y llegó a una de las tasas de no asegurados más bajas del país manteniendo el mercado de seguros privados en pie.",
        "note_on_options": "Esta escala mide el mecanismo de financiamiento — desde preservar un mercado privado subsidiado (1) hasta un plan estatal de pagador único como CalCare (5) — no si ampliar la cobertura. Un candidato puede favorecer una amplia expansión de la cobertura (p. ej., la expansión de Medi-Cal de 2024) mientras se opone al financiamiento de pagador único; esas posiciones quedan en el medio de la escala.",
        "key_facts": [
          "Medi-Cal extendió la cobertura completa a todos los adultos elegibles sin importar el estatus migratorio el 1 de enero de 2024 — el primer estado en hacerlo.",
          "[AB 1400](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1400) (CalCare) murió el 31 de enero de 2022 cuando su autor lo retiró, sin alcanzar los 41 votos de la Asamblea que necesitaba. Su continuación de 2024, [AB 2200](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2200), quedó frenada en la comisión de Asignaciones.",
          "Los analistas estimaron que CalCare costaría aproximadamente $314–391 billion al año — más que todo el presupuesto del fondo general del estado — y requeriría nuevos impuestos sobre la nómina, a las empresas y a los altos ingresos.",
          "Un plan de pagador único necesitaría que el gobierno federal lo aprobara (a través de lo que se llaman exenciones de la Sección 1332 y de Medicaid/Medicare) para redirigir el dinero federal. Una ley federal llamada ERISA también limita cuánto puede regular un estado los planes de salud autofinanciados que usan muchos grandes empleadores.",
          "La tasa de no asegurados de California cayó a alrededor del 6–7% en los últimos años — entre las más bajas de la historia — gracias a los subsidios de la ACA y la expansión de Medi-Cal, no a un sistema de pagador único."
        ]
      }
    },
    "policing": {
      "name": "Policía y penas penales",
      "short_description": "¿Cómo debería equilibrar California más policía, la reforma policial y las alternativas a la policía?",
      "stance_scale": {
        "1": "Ampliar la policía y endurecer las penas penales",
        "2": "Ampliar la policía, con algunas reformas",
        "3": "Hacer ambas cosas — más oficiales y más rendición de cuentas y alternativas",
        "4": "Priorizar la reforma, la supervisión y las respuestas no policiales",
        "5": "Trasladar fondos significativos de la policía a servicios comunitarios"
      },
      "voter_guide": {
        "current_policy": "California ha aprobado una serie de leyes de rendición de cuentas policial mientras deja la mayoría de las decisiones de financiamiento y de enjuiciamiento a las agencias locales y a los fiscales de distrito electos. [AB 392](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB392) (2019) elevó el umbral de cuándo la policía puede usar fuerza letal — a cuando sea \"necesario\" para detener una amenaza inmediata, en lugar del estándar más antiguo y laxo de \"razonable.\" [SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB2) (2021), la Kenneth Ross Jr. Police Decertification Act, creó un proceso a nivel estatal para retirar (\"descertificar\") la licencia de los oficiales por mala conducta grave y reportar a quienes se van a una base de datos nacional. [AB 1506](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1506) (2020) exige que el Department of Justice del estado investigue los tiroteos policiales que matan a civiles desarmados. La población penitenciaria estatal ha caído drásticamente desde que el \"Realignment\" de 2011 ([AB 109](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201120120AB109)) trasladó a los delincuentes de menor nivel de las prisiones estatales a los condados.",
        "arguments_for_change": "Quienes favorecen reducir el encarcelamiento y usar alternativas argumentan que la población penitenciaria de California cayó mucho después del Realignment sin un aumento duradero del delito violento — lo que sugiere que muchas personas pueden ser supervisadas de forma segura en sus comunidades. Dicen que los programas de desvío, el tratamiento de salud mental y de adicciones, y la ayuda para la reinserción abordan las causas profundas de manera más económica que la prisión, y que las reglas firmes de rendición de cuentas (AB 392, SB 2) generan confianza comunitaria y reducen la costosa mala conducta.",
        "arguments_against_change": "Quienes favorecen más financiamiento y penas más estrictas argumentan que tener suficientes oficiales y consecuencias claras disuade el delito y tranquiliza a las víctimas. Señalan que algunos tipos de delitos aumentaron durante los años de reforma y dicen que se necesita una aplicación visible para la confianza pública. Advierten que los mandatos de rendición de cuentas y un menor encarcelamiento, si no van acompañados de suficientes recursos de policía y supervisión, pueden sobrecargar a los departamentos y dejar que los reincidentes circulen en ciclos. En su opinión, la seguridad pública no debería sacrificarse para reducir las cifras de la prisión.",
        "comparison": "El estándar de fuerza \"necesaria\" de California y el sistema de descertificación a nivel estatal son más fuertes que los de muchos estados, aunque estados como Colorado y Nueva Jersey adoptaron reformas similares después de 2020. La tasa de encarcelamiento de California se sitúa cerca o un poco por debajo del promedio nacional — y muy por debajo de estados con alto encarcelamiento como Mississippi, Luisiana y Texas.",
        "note_on_options": "Los presupuestos policiales y la mayoría de las decisiones sobre cargos son locales, así que las palancas de un gobernador son los estándares a nivel estatal, las operaciones del CDCR, la capacidad penitenciaria, las subvenciones y la firma de proyectos de ley. La postura 1 (más financiamiento, penas más estrictas) y la postura 5 (descarcelación, alternativas) describen una dirección y un énfasis que un gobernador puede impulsar, no un control unilateral sobre las fuerzas policiales locales o las cárceles de los condados.",
        "key_facts": [
          "[AB 392](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB392) (2019) fijó un estándar de \"necesario\" para la fuerza letal policial — una de las leyes de uso de la fuerza más estrictas del país.",
          "[SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB2) (2021) dio a la junta de estándares policiales del estado (POST) el poder de descertificar a oficiales por mala conducta grave. Los oficiales descertificados no pueden ser recontratados y figuran en el National Decertification Index.",
          "[AB 1506](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1506) (2020) exige que el Department of Justice del estado investigue los tiroteos policiales mortales contra civiles desarmados.",
          "La población penitenciaria de California cayó a unos 90,600 para diciembre de 2025 — aproximadamente 27% por debajo de diciembre de 2019 — tras el Realignment de 2011 ([AB 109](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201120120AB109)) y las reducciones de la era de la pandemia. El estado ha cerrado varias prisiones.",
          "La tasa de encarcelamiento de California era de unos 294 por cada 100,000 adultos en 2025, por debajo de un pico de más de 173,000 prisioneros en total en 2006. La dotación de personal y los presupuestos policiales se fijan a nivel local, así que el control directo de un gobernador es limitado."
        ]
      }
    },
    "oil_gas": {
      "name": "Producción de petróleo y gas en CA",
      "short_description": "¿Debería California perforar más petróleo y gas dentro del estado, mantener los niveles actuales o reducirlo gradualmente?",
      "stance_scale": {
        "1": "Perforar más — ampliar el petróleo y el gas dentro del estado",
        "2": "Mantener la producción actual; flexibilizar las regulaciones",
        "3": "Mantener las cosas más o menos como están",
        "4": "Reducirlo gradualmente — endurecer las reglas, dejar de emitir nuevos permisos de perforación",
        "5": "Eliminar rápidamente la perforación dentro del estado"
      },
      "voter_guide": {
        "current_policy": "California permite la perforación de petróleo y gas dentro del estado, pero ha endurecido las reglas y no está aprobando mucha perforación nueva. [SB 1137](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1137) (Gonzalez, 2022) prohíbe pozos nuevos o reacondicionados a menos de 3,200 pies de hogares, escuelas, hospitales y otros lugares donde la gente pasa mucho tiempo. La industria petrolera intentó revocar la ley con un referéndum en la boleta, pero lo retiró el 26 de junio de 2024 — así que la ley de zona de amortiguamiento entró en vigor en lugar de ir a votación como medida en la boleta de 2024. La producción de petróleo dentro del estado ha caído drásticamente: California bombeó unos 104 millones de barriles de crudo en 2024, una baja de aproximadamente 70% respecto a su pico. Y el Low Carbon Fuel Standard de CARB — una norma estatal que impulsa que los combustibles de transporte produzcan menos carbono, modificada en 2024 y en vigor en julio de 2025 — sigue endureciendo esas metas.",
        "arguments_for_change": "Los partidarios de eliminar el petróleo más rápido dicen que la perforación concentra la contaminación del aire y los daños a la salud en comunidades de bajos ingresos y latinas cerca de los pozos. Señalan que la producción dentro del estado ya está disminuyendo y suministra solo una minoría del crudo que California refina — así que reducirla de manera ordenada tendría un efecto limitado sobre la oferta. Argumentan que la perforación continua choca con la meta de neutralidad de carbono del estado, y que cada nuevo pozo se suma a la pila de pozos abandonados e inactivos que el estado eventualmente tendrá que pagar para limpiar.",
        "arguments_against_change": "Los partidarios de mantener la producción dicen que el petróleo dentro del estado sostiene decenas de miles de empleos y una gran parte de la base impositiva del condado de Kern. Argumentan que recortar el suministro local significa importar más crudo — a menudo producido bajo reglas ambientales más débiles en otros lugares — y deja a los conductores expuestos a picos de precios. Advierten que los cierres de refinerías ya amenazan el suministro y los precios de los combustibles, y que las restricciones repentinas elevan los precios de la gasolina en un estado que ya tiene de los precios más altos del país en el surtidor.",
        "comparison": "California es el único gran estado productor de petróleo de EE. UU. que combina una gran producción con un plan declarado de reducirla gradualmente. Texas, Nuevo México y Dakota del Norte están todos expandiéndose. La zona de amortiguamiento de 3,200 pies de California entre los pozos nuevos y los hogares está entre los mayores retiros de perforación exigidos del país.",
        "note_on_options": "La escala va desde ampliar la producción (1) hasta una eliminación rápida a nivel estatal (5). El \"statu quo\" se sitúa cerca del medio: California actualmente permite que la producción existente continúe y decline mientras restringe los pozos nuevos cerca de las comunidades. Un candidato que apoya los retiros de SB 1137 pero se opone a una fecha límite firme para la extracción se codifica alrededor de 3.",
        "key_facts": [
          "La zona de amortiguamiento de 3,200 pies de [SB 1137](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1137) entre los pozos nuevos y los hogares entró en vigor el 27 de junio de 2024 después de que la industria retirara su referéndum de derogación. NO se aprobó como una medida en la boleta de la 'Prop 4' — esa es una confusión común.",
          "California produjo unos 104 millones de barriles de crudo en 2024 — una baja de aproximadamente 70% respecto a su pico. El estado se ubica cerca del 7.º lugar entre los productores de petróleo de EE. UU.",
          "El condado de Kern representa aproximadamente el 65–70% de la producción de petróleo de California dentro del estado.",
          "California importa la mayor parte del crudo que usan sus refinerías — solo alrededor de una cuarta parte proviene de pozos dentro del estado. El resto llega por mar o desde Alaska.",
          "La actualización de 2024 de CARB al Low Carbon Fuel Standard (una norma que exige que los combustibles de transporte sean más limpios con el tiempo; en vigor el 1 de julio de 2025) endureció las metas. CARB estimó que añadiría unos 5–8 centavos por galón a corto plazo, aunque algunas estimaciones académicas fueron más altas."
        ]
      }
    },
    "abortion": {
      "name": "Aborto y derechos reproductivos",
      "short_description": "¿Debería California ampliar, mantener o restringir el acceso al aborto?",
      "stance_scale": {
        "1": "Añadir restricciones (como límites de tiempo o consentimiento de los padres)",
        "2": "Permitir algunas restricciones",
        "3": "Mantener las fuertes protecciones actuales de California",
        "4": "Reforzar el acceso — más financiamiento y más proveedores",
        "5": "Ir más lejos — financiar a pacientes de fuera del estado y ampliar quién puede brindar atención"
      },
      "voter_guide": {
        "current_policy": "El aborto es un derecho consagrado en la constitución de California. La [Proposition 1](https://lao.ca.gov/BallotAnalysis/Proposition?number=1&year=2022) (noviembre de 2022), aprobada por alrededor del 66% de los votantes, enmendó la constitución estatal para impedir que California niegue o interfiera con la libertad reproductiva, incluidos el aborto y los anticonceptivos. Después de que la decisión Dobbs de la Corte Suprema de EE. UU. de 2022 puso fin al derecho federal al aborto, la Legislatura aprobó un conjunto de leyes. [AB 1242](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1242) y [AB 2091](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2091) (2022) impiden que la policía, las empresas y los proveedores de California ayuden con investigaciones de aborto de fuera del estado o entreguen registros relacionados. [SB 345](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB345) (2023) protege a los proveedores con licencia de California — incluidos los que ofrecen telesalud y píldoras abortivas — de ser enjuiciados o extraditados por otros estados. Medi-Cal cubre el aborto con cargo total al estado, y el estado ha reservado más de $200 million para apoyar el acceso al aborto y a los proveedores.",
        "arguments_for_change": "Quienes quieren ampliar aún más las protecciones (el extremo alto) dicen que, a medida que más estados imponen prohibiciones, California debería actuar como refugio — financiando el viaje y la atención para pacientes de fuera del estado, ampliando las protecciones y la capacidad de los proveedores, y anticipándose a cualquier futuro límite federal. Argumentan que el costo y la logística, no solo si algo es legal, deciden si las personas realmente pueden recibir atención, por lo que el estado debería financiarla y protegerla con energía.",
        "arguments_against_change": "Quienes favorecen algunos límites, o simplemente no ampliar más (el extremo bajo), argumentan por motivos morales o religiosos que el aborto debería enfrentar algunas restricciones, como límites más avanzado el embarazo. Dicen que el dinero público no debería pagar el aborto ni la atención de pacientes de fuera del estado, y que las leyes escudo y el financiamiento de refugio arrastran a California a disputas con las leyes de otros estados y amplían lo que se les pide cubrir a los contribuyentes. Dentro de California, esta es una postura minoritaria dado el margen del 66% de la Prop 1.",
        "comparison": "California es uno de los estados más protectores del acceso al aborto tras Dobbs, combinando un derecho constitucional, la cobertura de Medi-Cal, el financiamiento público y leyes escudo para los proveedores. Eso contrasta marcadamente con los más de una docena de estados que prohíben o restringen severamente el aborto, y coloca a California en un pequeño grupo de estados que financian y protegen abiertamente la atención de pacientes que vienen de otros lugares.",
        "note_on_options": "Esta escala va desde apoyar algunas restricciones al acceso (1) hasta un amplio refugio interestatal financiado por el estado con extensas protecciones para los proveedores (5). Dada la garantía constitucional de California y el voto desproporcionado de 2022, la mayoría de los candidatos viables se agrupan hacia el extremo protector; las preguntas diferenciadoras tratan de cuánto financiar la atención interestatal y proteger a los proveedores, no de si el aborto es legal dentro del estado.",
        "key_facts": [
          "La [Proposition 1](https://lao.ca.gov/BallotAnalysis/Proposition?number=1&year=2022) (2022) se aprobó con alrededor del 66% de apoyo, consagrando un derecho explícito al aborto y a los anticonceptivos en la constitución estatal.",
          "Medi-Cal cubre el aborto con el estado pagando el costo total, y por lo general también se exige que los planes de seguro privado regulados por el estado lo cubran.",
          "California aprobó leyes escudo — [AB 1242](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1242), [AB 2091](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2091) (2022) y [SB 345](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB345) (2023) — que protegen a los proveedores y pacientes dentro del estado (incluidos los pacientes de fuera del estado que usan telesalud) de verse arrastrados a los enjuiciamientos de aborto de otros estados.",
          "El estado ha reservado más de $200 million en presupuestos recientes para financiar el acceso al aborto, ampliar la capacidad de los proveedores y ayudar a los pacientes con costos como el viaje.",
          "Después de Dobbs, California se estableció como un lugar al que los pacientes de estados con prohibiciones podían viajar para recibir atención, con financiamiento estatal para apoyarlos."
        ]
      }
    },
    "school_funding": {
      "name": "Financiamiento y gobernanza de las escuelas K-12",
      "short_description": "¿Debería California gastar más, menos o aproximadamente lo mismo en las escuelas públicas K-12?",
      "stance_scale": {
        "1": "Recortar significativamente el gasto en K-12",
        "2": "Recortar o mantener el gasto",
        "3": "Mantener el gasto aproximadamente igual",
        "4": "Aumentar el financiamiento de forma modesta (salarios docentes, instalaciones)",
        "5": "Aumentar mucho el financiamiento (salarios docentes, clases más pequeñas), recaudando nuevos ingresos si es necesario"
      },
      "voter_guide": {
        "explainer": "Aquí aparecen mucho algunos términos. La 'Prop 98' es una enmienda de 1988 a la constitución estatal que fija un mínimo anual que el estado debe gastar en las escuelas K-12 y los colegios comunitarios. 'LCFF,' la Local Control Funding Formula, es el sistema de 2013 para repartir ese dinero: cada distrito recibe una cantidad base por estudiante, más un extra para los estudiantes que son de bajos ingresos, que están aprendiendo inglés o que están en hogares de acogida. El 'gasto por estudiante' es el total del dinero escolar dividido por el número de estudiantes. 'NAEP' es una prueba nacional (apodada 'the Nation's Report Card') que permite comparar estados. Un 'parcel tax' es un impuesto local fijo sobre cada propiedad que algunos distritos usan para recaudar dinero escolar adicional.",
        "current_policy": "El financiamiento de K-12 se apoya en dos pilares. La [Prop 98](https://lao.ca.gov/Publications/Report/4929) (1988) es una regla constitucional que fija un mínimo anual que el estado debe gastar en las escuelas y los colegios comunitarios. La Local Control Funding Formula (LCFF, 2013) decide cómo se reparte ese dinero: cada distrito recibe una subvención base por estudiante, más una subvención suplementaria (un extra del 20% de la base) y, para los distritos con muchos estudiantes de alta necesidad, una subvención de concentración — todo dirigido a los estudiantes que son de bajos ingresos, que están aprendiendo inglés o que están en hogares de acogida. Para 2024-25, el mínimo de la Prop 98 fue de unos $115.3 billion en total (aproximadamente $101.1 billion para K-12). Los votantes también aprobaron la [Prop 2](https://lao.ca.gov/BallotAnalysis/Proposition?number=2&year=2024) en noviembre de 2024, un bono de $10 billion para construir y reparar edificios de escuelas y colegios comunitarios.",
        "arguments_for_change": "Quienes quieren más financiamiento y un mayor control local dicen que California aún gasta menos por estudiante que estados comparables de alto costo, y que las subvenciones suplementarias y de concentración de la LCFF deberían ser mayores para cerrar las brechas de oportunidad de los estudiantes de bajos ingresos, los que aprenden inglés y los jóvenes en hogares de acogida. Argumentan que se necesita una fuente de dinero estable y dedicada — un impuesto o un bono — para salarios docentes competitivos, edificios escolares y la expansión del kínder de transición, y que los educadores locales, no los mandatos de Sacramento, saben mejor cómo gastarlo.",
        "arguments_against_change": "Quienes enfatizan la rendición de cuentas y la reforma dicen que el gasto ha subido mucho desde la LCFF sin ganancias correspondientes en NAEP, así que la prioridad debería ser mostrar a dónde va realmente el dinero de las subvenciones de concentración y obtener resultados medibles — no nuevos impuestos. Señalan que la [Prop 98](https://lao.ca.gov/Publications/Report/4929) ya garantiza un piso creciente, que el presupuesto estatal oscila con la economía, y que las reglas de gasto laxas de la LCFF hacen difícil confirmar que el dinero adicional está llegando a los estudiantes de alta necesidad para los que está destinado.",
        "comparison": "Una vez que se ajusta por los altos costos de California, su gasto por estudiante se sitúa ahora en la franja medio-alta de los estados, aunque todavía por debajo de grandes gastadores como Nueva York. Sus puntajes en NAEP siguen quedando por debajo del promedio nacional, lo que mantiene vivo el debate sobre si el problema son muy pocos dólares, cómo se gastan los dólares, o una falta de rendición de cuentas.",
        "note_on_options": "La escala abarca tanto el nivel de financiamiento (recorte a nuevos ingresos importantes) como el eje de control estatal frente a local. Estos pueden divergir: un candidato podría favorecer un mayor control local sin un aumento de impuestos, o más financiamiento de equidad dirigido por el estado. Nuestra codificación por defecto trata el apoyo a un nuevo impuesto o bono dedicado como la señal de valor 5 más fuerte y una postura que prioriza la rendición de cuentas y reforma la LCFF como valor 1.",
        "key_facts": [
          "El gasto total por estudiante de todas las fuentes fue de unos $23,878 para 2024-25 (estimación estatal), y se proyecta que siga subiendo.",
          "En cifras comparables del Census, California gastó unos $19,894 por estudiante en 2022-23 — aproximadamente el 13.º lugar entre los estados, subiendo desde el 28.º el año anterior.",
          "La LCFF (2013) suma una subvención suplementaria (un extra del 20% de la base) y una subvención de concentración por encima de la subvención base de cada distrito para dirigir más dinero a los distritos de mayor necesidad.",
          "En la prueba nacional NAEP de 2024, California obtuvo un puntaje justo por debajo del promedio nacional — por ejemplo, lectura de 4.º grado 212 frente a 214 y lectura de 8.º grado 254 frente a 257 — aunque su brecha a largo plazo con el resto del país se ha reducido.",
          "La [Prop 2](https://lao.ca.gov/BallotAnalysis/Proposition?number=2&year=2024) (noviembre de 2024) autorizó $10 billion en bonos para edificios de K-12 y colegios comunitarios; muchos distritos también cobran parcel taxes locales (un impuesto fijo sobre cada propiedad), que necesitan la aprobación de dos tercios de los votantes."
        ]
      }
    }
  },
  "dimensions": {
    "years_in_office_band": {
      "name": "Años en un cargo electo",
      "description": "¿Prefiere una voz política nueva, o alguien con una larga trayectoria en cargos electos?",
      "scale": {
        "1": "Prefiero firmemente algo nuevo — menos de 5 años en un cargo electo",
        "2": "Me inclino por algo nuevo",
        "3": "Sin preferencia",
        "4": "Me inclino por la experiencia",
        "5": "Prefiero firmemente una amplia trayectoria — 15+ años en un cargo electo"
      }
    },
    "career_path": {
      "name": "Trayectoria profesional",
      "description": "¿Qué trayectorias profesionales le atraen en un gobernador? (Deje en blanco si no tiene preferencia.)",
      "options": {
        "state_pol": "Política estatal (Asamblea, Senado, cargo a nivel estatal)",
        "federal_pol": "Política federal (Congreso, Gabinete)",
        "local_pol": "Política local (alcalde, concejo, sheriff)",
        "business": "Negocios / sector privado",
        "law_enforcement": "Aplicación de la ley",
        "law": "Derecho en ejercicio o académico",
        "activism": "Activismo / organización comunitaria",
        "nonprofit": "Liderazgo en organizaciones sin fines de lucro",
        "academia": "Academia / docencia",
        "media": "Medios / periodismo",
        "health": "Atención médica / salud pública",
        "social_work": "Trabajo social / servicio público"
      }
    },
    "endorsement_coalition": {
      "name": "Coalición de respaldos",
      "description": "¿Qué señal de respaldo le importa más? (Deje en blanco si no tiene preferencia.)",
      "options": {
        "labor": "Sindicatos laborales",
        "environmental": "Organizaciones ambientales",
        "civil_rights": "Organizaciones de derechos civiles",
        "business": "Comunidad empresarial",
        "law_enforcement": "Asociaciones de aplicación de la ley",
        "womens_orgs": "Organizaciones de mujeres",
        "faith": "Comunidades religiosas",
        "latino_caucus": "Caucus latino / organizaciones latinas",
        "lgbtq_orgs": "Organizaciones LGBTQ+",
        "newspapers": "Principales periódicos de California (LA Times, SF Chronicle, Sac Bee)",
        "dem_party": "Partido Demócrata de California",
        "rep_party": "Partido Republicano de California",
        "trump": "Donald Trump / figuras republicanas nacionales"
      }
    },
    "geographic_background": {
      "name": "Origen geográfico",
      "description": "¿Prefiere un candidato de una región en particular de California? (Deje en blanco si no tiene preferencia.)",
      "options": {
        "bay_area": "Bay Area",
        "la_county": "Condado de Los Ángeles",
        "oc_ie": "Orange County / Inland Empire",
        "san_diego": "San Diego",
        "central_valley": "Central Valley",
        "north": "Extremo Norte / Sierra",
        "central_coast": "Central Coast"
      }
    },
    "electability": {
      "name": "Elegibilidad",
      "description": "¿Cuánto influye la viabilidad en una elección general — fuerza en las encuestas, recaudación de fondos, atractivo amplio?",
      "scale": {
        "1": "Decisiva — pondero la elegibilidad por encima de otros factores",
        "2": "Peso significativo",
        "3": "Peso moderado",
        "4": "Algo de peso",
        "5": "No influye — voto por afinidad sin importar la viabilidad"
      }
    },
    "age_band": {
      "name": "Edad / generación",
      "description": "¿Qué cohorte de edad prefiere? (Opcional.)",
      "options": {
        "millennial": "Millennial (nacido 1981–1996)",
        "gen_x": "Generación X (nacido 1965–1980)",
        "boomer": "Baby Boomer (nacido 1946–1964)",
        "silent": "Generación Silenciosa (nacido antes de 1946)"
      }
    },
    "demographic_background": {
      "name": "Origen demográfico",
      "description": "¿Qué orígenes de los candidatos le importan positivamente? (Opcional — deje en blanco si no tiene preferencia. Sus respuestas son anónimas.)",
      "options": {
        "black": "Negro / afroamericano",
        "latino": "Latino / hispano",
        "aapi": "Asiático-americano / isleño del Pacífico",
        "white": "Blanco",
        "native": "Nativo americano / indígena",
        "multiracial": "Multirracial",
        "woman": "Mujer",
        "man": "Hombre",
        "nonbinary": "No binario",
        "lgbtq": "LGBTQ+",
        "catholic": "Católico",
        "protestant": "Protestante / evangélico",
        "jewish": "Judío",
        "muslim": "Musulmán",
        "hindu": "Hindú",
        "sikh": "Sij",
        "secular": "Secular / ateo / sin religión",
        "immigrant": "Inmigrante o estadounidense de primera generación",
        "veteran": "Veterano / servicio militar"
      }
    }
  }
};

DATASET_I18N.zh = {
  "questions": {
    "tax_wealth": {
      "name": "州财富税",
      "short_description": "加州是否应当对其最富有居民的净资产征税——即对财富本身征税，独立于所得税之外？",
      "stance_scale": {
        "1": "反对开征州财富税",
        "2": "倾向于反对——目前不予支持",
        "3": "持开放态度／尚未决定",
        "4": "支持开征财富税",
        "5": "强烈支持对超级富豪开征财富税"
      },
      "voter_guide": {
        "current_policy": "加州没有财富税——即对一个人所拥有的财产（其净资产）而非其所赚取的收入征税。曾有两种不同版本被提出，二者运作方式截然不同。2023年，州众议员 Alex Lee 的 [AB 259](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB259)（连同宪法修正案 ACA 3）提出了一项年度税——对净资产超过 $50 million 的部分征收 1%，超过 $1 billion 的部分征收 1.5%——但该法案在委员会阶段搁浅，从未成为法律。另有一项一次性措施——“Billionaire Tax Act”，正式名称为 One-Time Wealth Tax for State-Funded Health Care Programs Initiative，由 SEIU-UHW 支持——已取得 2026 年 11 月选票资格：对加州亿万富翁的净资产一次性征收 5% 的税，所得收入大部分用于医疗保健，其余用于教育和食品援助。",
        "arguments_for_change": "支持者表示，财富税能够触及所得税无法触及的财富——亿万富翁可以在净资产持续增长的同时保持应税收入很低——并且即便只对最庞大的财富征收一笔不高的税，也能够从一小群纳税人那里为学校、医疗保健和儿童照护提供资金。",
        "arguments_against_change": "反对者表示，州财富税会遇到严重的法律和实际操作问题（你如何为某人的资产估值？），最具流动性的居民会迁离或重组资产以规避它，而依赖于少数人的税收收入将难以预测。",
        "comparison": "加州将成为美国第一个真正对总财富征税的州。其他几个高税收的州曾考虑过这一想法但最终放弃，理由包括法律挑战、为资产估值的困难，以及最富有居民可能干脆迁离的风险。",
        "key_facts": [
          "目前美国没有任何州征收真正的财富税。",
          "这是两项不同的提案。[AB 259](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB259)（2023 年，Alex Lee）是一项年度税——对净资产超过 $50 million 的部分征收 1%，超过 $1 billion 的部分征收 1.5%——在委员会阶段搁浅，从未成为法律。",
          "2026 年 11 月选票上的措施是对加州亿万富翁（净资产超过 $1 billion）的净资产一次性征收 5% 的税，按某一设定日期评估——并非经常性税收。其收入大部分专项用于医疗保健，一部分用于教育和食品援助。",
          "一次性税只需缴纳一次，针对某一快照日期的财富；年度税则在持有财富的每一年都重复征收。2023 年的法案是年度税；2026 年的选票措施是一次性税。",
          "广泛的财富税曾在 Washington、New York、Massachusetts 和 Illinois 被提出并失败。任何财富税最困难的部分是为没有明确市场价格的东西估值——私营公司、艺术品、房地产。"
        ]
      }
    },
    "school_choice": {
      "name": "择校与特许学校",
      "short_description": "加州应当让开办特许学校变得更容易还是更难，并给予家庭更多的择校选择吗？",
      "stance_scale": {
        "1": "开办更多特许学校并扩大家庭择校权",
        "2": "开办更多特许学校；保护家庭择校权",
        "3": "大体维持现行特许学校规则",
        "4": "让开办新特许学校变得更难",
        "5": "停止新建特许学校；把资金转给传统公立学校"
      },
      "voter_guide": {
        "explainer": "传统公立学校由当地学区管理，免费并向所有学生开放。特许学校同样是由税款资助的免费公立学校，但它们独立运营——通常由一家非营利组织根据一份合同（即“特许状”，charter）管理——在教学和招聘方面拥有更大自由，受学区监管较少。私立学校收取学费，且不接受州政府拨款。“择校”有时也指代用券（vouchers）——家庭可用于支付私立学校学费的公共资金——而加州目前并不提供这种代金券。",
        "current_policy": "加州约有 1,283 所特许学校，外加七个完全由特许学校组成的学区（州数据，2024 年 5 月）。它们大约教育着 11.7% 的公立学校学生。2019 年的两部法律——[AB 1505](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1505) 和 [AB 1507](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1507)，均于当年 10 月签署、2020 年 7 月 1 日生效——使开办和续办特许学校变得更难。如今学区可以指出财政冲击或社区影响来否决一所新特许学校，特许学校一般不能在批准它的学区之外运营校区，业绩低下的特许学校则可能被拒绝续办。加州不提供由州政府资助的私立学校代金券或教育储蓄账户。（代金券给予家庭公共资金用于支付私立学校学费；教育储蓄账户，即 ESA，是由政府资助、家长可用于学费、辅导或其他经批准的教育开支的账户。）上一项代金券措施，2000 年的 [Prop 38](https://www.lao.ca.gov/ballot/2000/38_11_2000.html)，以 71% 对 29% 落败。",
        "arguments_for_change": "希望增加择校权的人士表示，特许学校为家庭——其中低收入家庭和有色人种家庭占比偏高——提供了除指定社区学校之外的一种选择，并且某些特许学校网络为这些学生取得了良好成绩。他们认为 [AB 1505](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1505) 给了学区一个基于资金的理由去阻挡竞争者，而代金券或教育储蓄账户则会为那些负担不起私立学费、或负担不起搬入顶级学区的家庭打开择校之门。",
        "arguments_against_change": "反对者——包括 California Teachers Association（CTA）和 California School Boards Association（CSBA）——表示，特许学校和代金券会把生均经费（随每名学生流动的资金）从学区学校抽走，而这些学区学校仍在教育大多数孩子、仍要支付固定开支。他们认为特许学校质量参差不齐、监管较弱，并援引研究（如 Stanford 的 CREDO 研究）表明特许学校的成绩因运营方和州而异，还指出加州选民一再否决代金券，认为那是用公共资金支付私立和宗教学校的费用。",
        "comparison": "加州是在择校方面较为严格的大州之一：它拥有规模庞大的特许学校部门，但与 Arizona、Florida 或 Indiana 不同，不提供私立学校代金券或教育储蓄账户。其 2019 年的法律与全国趋势背道而驰，后者一直朝着扩大私立学校择校的方向发展。",
        "note_on_options": "此量表混合了两种不同的机制：特许学校政策（一种公立学校选择）和私立学校代金券／ESA（用于支付私立学费的公共资金）。一名候选人可以支持扩大特许学校的同时反对代金券，反之亦然。我们默认的编码将支持代金券视为最强的支持择校信号（数值 1），将设上限并转移资金的立场视为最强的限制性信号（数值 5）。",
        "key_facts": [
          "加州约有 1,283 所特许学校和 7 个全特许学区在运营（州数据，2024 年 5 月）；特许学校大约教育着 11.7% 的公立学校学生（2022-23 学年）。",
          "[AB 1505](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1505)（2019）终结了过去对被拒特许申请几乎自动享有的上诉权，并允许学区在拒绝或拒绝续办时援引财政冲击和社区需求。",
          "[AB 1507](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1507)（2019）阻止了大多数新特许学校在批准它的学区之外运营学习中心或卫星校区（即“特许授权方”——授予并监管特许状的机构，通常是学区）。",
          "特许学校入学人数有所上升，而普通学区入学人数下降，部分原因是全州总入学人数正在减少。",
          "[Prop 38](https://www.lao.ca.gov/ballot/2000/38_11_2000.html)（2000）原本会给予家庭每个孩子约 $4,000 的代金券，以 71% 对 29% 落败。此后再未有全州范围的代金券措施进入选票。"
        ]
      }
    },
    "housing_supply": {
      "name": "住房供应与分区优先权",
      "short_description": "州政府应当多大力度地推动城市建造更多住房——即便当地居民反对？",
      "stance_scale": {
        "1": "大力推动——推翻地方分区规则以强制建造更多住房",
        "2": "大幅推动——设定强有力的建造目标，在一定程度上推翻城市决定",
        "3": "取得平衡——鼓励建造但把大多数决定权留给城市",
        "4": "基本交由城市决定——限制州的推翻权，转而削减地方繁文缛节",
        "5": "侧重于补贴住房和租户保护，而非强制建造市场价住房"
      },
      "voter_guide": {
        "current_policy": "在过去十年里，加州把大量住房审批权从城市手中拿走交给了州政府。[SB 35](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB35)（2017）为未达到州住房目标的城市中符合条件的公寓项目设立了快速通道：审批变为“行政性的”（ministerial），意味着只要符合规则，地方官员必须批准，无权拒绝。[SB 423](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB423)（2023）将该快速通道延长至 2036 年，并将其扩展到部分沿海地区。[SB 9](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB9)（2021）使得在大多数独栋住宅地产上“依法”（by right）建造双拼房和拆分地块成为可能——意味着只要符合规则便自动获批。州政府还给每个区域设定一个住房目标，称为 Regional Housing Needs Assessment（RHNA）。当一座城市的本地住房计划与法律不符时，一项称为 Housing Accountability Act 的州规则会限制其拒绝住房的权力——而 [AB 1893](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB1893)（2024）为“Builder's Remedy”赋予了真正的约束力，该机制允许开发商在未达到住房目标的城市中绕过地方分区。",
        "arguments_for_change": "更强州控制的支持者表示，是地方政府造成了已持续数十年的住房短缺。Legislative Analyst's Office（LAO）将该州在全国领先的租金和房价直接追溯到在沿海就业中心附近建造太少。支持者认为城市屈服于业主压力而阻挡新住房，所以只有坚定的州强制措施——自动“依法”审批、可执行的目标以及 Builder's Remedy——才能弥合差距。他们以 [SB 9](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB9) 为证，认为当城市仍有拖延空间时，自愿性工具便会失效。",
        "arguments_against_change": "反对者表示，土地使用决定应当属于了解自己社区的地方官员——道路、火灾风险、交通、地方特色。他们认为全州一刀切的强制规定会推翻当地选民批准的计划，而被纳入快速通道的“依法”项目可以跳过环境审查和公众意见。他们还表示，短缺的真正原因是高昂的建造成本、利率和紧张的劳动力供应——而非分区——所以推翻城市决定只会增加冲突，却无法可靠地建出可负担住房。",
        "comparison": "加州在推翻地方分区方面比几乎所有州都走得更远。其他少数几个州也朝这个方向迈进——Oregon 于 2019 年在全州范围内终结了仅限独栋住宅的分区，Montana 和 Washington 在 2023 年通过了广泛的法律，允许在现有地块上建造更多住房。但许多州仍将土地使用决定几乎完全留给城镇。",
        "note_on_options": "这是一个单一轴线，衡量州政府应当多大力度地推动扩大市场价住房供应——从激进地优先于地方分区（选项 1）到优先考虑补贴和租户保护而非州强制供应（选项 5）。候选人可能出于不同原因落在低端：有些人捍卫地方控制权和独栋住宅社区（选项 4），而另一些人则偏好公共／补贴住房而非市场价建造（选项 5）。此处的立场表明候选人会在多大程度上动用州权力来推翻地方分区以增加供应。",
        "key_facts": [
          "当前的 RHNA 周期（2023–2031）要求全州新建约 250 万套住房——其中约 100 万套对低收入家庭可负担。",
          "[SB 9](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB9)（2021）的使用远低于预期。在第一年里，Los Angeles 收到 211 份单元申请，San Francisco 25 份，San Diego 7 份，San José 仅 1 份——尽管 2021 年 Terner Center 的一项分析曾估计约 70 万套单元可能变得新近可行。",
          "不遵守州住房计划法的城市每月可被处以 $10,000 至 $600,000 的罚款。",
          "[SB 35](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB35) / [SB 423](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB423) 的快速通道只有在城市未达到其住房目标或没有州批准的住房计划时才会启动。SB 423 还增加了随项目规模而增长的工资和技术工人要求。",
          "Surplus Land Act 要求地方机构在出售不再需要的公共土地时，把可负担住房放在首要优先位置。"
        ]
      }
    },
    "sanctuary": {
      "name": "庇护与移民执法",
      "short_description": "加州应当在多大程度上配合联邦移民执法（ICE）？",
      "stance_scale": {
        "1": "全面配合 ICE——废除该州的庇护法",
        "2": "保留庇护法但允许更多例外",
        "3": "原样保留现行庇护法",
        "4": "加强保护（例如为移民的法律辩护提供资金）",
        "5": "走得更远——增加新的州级保护措施，如为所有人提供州身份证"
      },
      "voter_guide": {
        "explainer": "“庇护法”限制州和地方警察在多大程度上协助联邦移民执法人员。加州的主要法律是 [SB 54](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB54)，即 California Values Act，于 2017 年通过。",
        "current_policy": "加州的基准是 California Values Act，[SB 54](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB54)（2017），自 2018 年 1 月 1 日起生效。它规定州和地方机构不得动用其人员或资金从事联邦民事移民执法。这意味着它们一般不能仅因 ICE 提出要求就把某人关押在监狱中（称为“扣押令”或拘留请求），不能根据民事移民逮捕令逮捕人员，也不能签署“287(g)”协议——即让地方警员充当移民执法人员的协议。其中也有例外：如果某人被判犯有州法律所列的某些严重或暴力重罪，监狱可以在其获释时通知 ICE，或将其移交。另有一部法律，即 TRUTH Act（[AB 2792](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201520160AB2792)，2016），规定被羁押者必须被告知任何 ICE 约谈并表示同意，且地方政府若给予 ICE 接触权限，必须召开公开会议。州监狱（CDCR）只部分受 SB 54 约束，并遵循其自己的通知规则。",
        "arguments_for_change": "希望加强庇护保护的人士认为，把地方警察排除在移民执法之外能建立信任，使移民犯罪受害者和证人在举报犯罪时感到安全。他们指出 ICE 扣押令通常未经法官签署，这引发了宪法上的担忧，并可能使各县面临诉讼。他们还指出，现有的重罪例外条款已经允许在最严重的案件中进行配合——所以进一步的措施（如限制数据共享，或将 ICE 排除在法院、学校和医院之外）只会影响民事执法。",
        "arguments_against_change": "希望更全面配合 ICE 的人士认为，释放被 ICE 标记的人——包括一些有不符合例外条款的过往犯罪记录者——可能把联邦当局认为应被驱逐的人送回社区。他们表示，与 ICE 在街头实施逮捕相比，从监狱有计划地移交对警员和公众更安全，并且移民执法是联邦的职责，州不应当从中阻挠。在他们看来，拒绝 ICE 的请求会损害公共安全和联邦与州的协作。",
        "comparison": "加州与 Illinois（TRUST Act）以及其他若干州一道，属于最大限度限制地方配合移民执法人员的州之一。相比之下，Texas（凭借其 SB 4 法律）和 Florida 等州要求地方机构配合 ICE，并禁止庇护政策。到 2026 年，联邦 287(g) 计划在全国与约 1,600 个机构签有协议——但在加州几乎没有。",
        "note_on_options": "由于 SB 54 是成文法且在法庭上得到维持，对一位州长而言现实的范围是从最大化重罪豁免的执法／指引（低端）到签署收紧数据共享或 ICE 设施接触权限的法案（高端）。全盘废除（远低于立场 1）或彻底取消一切配合（高于立场 5）都需要州长无法单独采取的立法行动。",
        "key_facts": [
          "[SB 54](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB54) 于 2018 年 1 月 1 日生效。第一届 Trump 政府曾起诉以阻止它但败诉：案件被驳回，Ninth Circuit 上诉法院表示认同，U.S. Supreme Court 拒绝受理——因此该法律仍然有效。",
          "287(g) 协议（授权地方警员从事移民执法）根据 SB 54 对加州各机构是被禁止的。2025 年，Shasta County 治安官的一项尝试因与州法律冲突而被暂停。",
          "SB 54 的例外条款允许各机构在某人被判犯有特定严重或暴力重罪时通知 ICE 或将其移交——而不针对仅有移民身份问题的人。",
          "TRUTH Act（2016）要求告知人们可以拒绝 ICE 的监狱约谈，并要求地方机构在给予 ICE 接触权限时召开公开社区会议。",
          "庇护规则大多由州法律设定，因此州长的主要手段是执法指引、总检察长对诉讼的处理方式、监狱规则，以及签署或否决新法案——而非直接废除该法律。"
        ]
      }
    },
    "homelessness": {
      "name": "无家可归问题应对",
      "short_description": "加州应当如何应对无家可归问题——更多依靠执法，还是依靠住房和服务？",
      "stance_scale": {
        "1": "清理露营点并扩大法院强制治疗，作为主要手段",
        "2": "以执法为主，但同时提供服务",
        "3": "在两者间取得平衡——只有在有收容所或服务时才清理营地",
        "4": "以住房优先为主；谨慎使用执法",
        "5": "大力投资住房和服务；仅在万不得已时使用执法"
      },
      "voter_guide": {
        "explainer": "“住房优先”（Housing First）指立即给某人一个永久的居所，而不先要求其戒断或接受治疗——其理念是一旦有了遮风挡雨之处，处理成瘾或精神疾病就会更容易。“监护”（conservatorship）是一项法院命令，把对某个被法官认定无法照顾自己的人的决策权交给另一人或机构。“CARE Court”是一种较新的民事法院程序，可为患有严重未经治疗精神疾病的人下令制定治疗方案。“时点统计”（PIT count）是每年 1 月在一个夜晚清点有多少人无家可归。",
        "current_policy": "加州的官方规则是“住房优先”：由州资助的项目理应立即向人们提供永久住房，而不先要求其戒断或接受治疗。这写入了州法律（Welfare & Institutions Code §8255）。在此基础上，州政府近来增加了执法和治疗选项。CARE Act（[SB 1338](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1338)，2022 年通过）设立了民事法院，可为患有未经治疗的精神分裂症类障碍的人下令制定治疗方案，到 2024 年 12 月每个县都已开始运行。[Proposition 1](https://calmatters.org/california-voter-guide-2024/prop-1-mental-health/)（2024 年 3 月）批准了一笔 $6.4 billion 的债券，用于精神健康住房和治疗，并转移了部分现有精神健康资金。在 U.S. Supreme Court 的 [Grants Pass v. Johnson](https://calmatters.org/housing/2024/06/california-homeless-camps-grants-pass-ruling/) 裁决（2024 年 6 月）之后，Governor Newsom 要求州各机构和城市清理露营点，并分享了一份可供采用的反露营条例范本。",
        "arguments_for_change": "倾向于以服务为主、住房优先方法（量表高端）的人士表示，稳定的居所才是使应对成瘾和精神疾病成为可能的前提——而不是事后才赢得的奖励。他们援引研究表明住房优先能让人们保持有房可住。他们认为清理营地只是把人们挪来挪去而不会缩小这一群体的规模，还给他们留下使找房更难的犯罪记录。他们还警告说，扩大强制治疗或监护有可能胁迫那些一开始从未获得足够自愿帮助的人。",
        "arguments_against_change": "倾向于更多执法、强制治疗和监护（量表低端）的人士表示，加州近年来在无家可归问题上花费了超过 $20 billion，而露宿街头者的比例仍接近全国最高。他们认为，对于街头许多患有未经治疗的严重精神疾病或成瘾的人来说，仅靠住房并不奏效，显眼的露营点带来了真实的健康和安全问题，而 Grants Pass 裁决如今允许州政府在提供收容和治疗的同时，对拒绝者施加后果。",
        "comparison": "加州的无家可归人口在 2024 年增长了约 3%——远小于全国约 18% 的增幅。但该州仍然拥有全美各州中最多的无家可归者、占全国总数最大的份额，以及露宿户外比例最高。其他大多数大州能把远高得多的无家可归居民比例安置进收容所。",
        "note_on_options": "这一量表从执法与强制治疗（1）到完全住房优先、不使用执法（5）。许多候选人偏好组合方式——例如扩大治疗床位加上自愿住房——它们落在中间；两端代表的是有争议的问题：是否应将住房以接受治疗为条件，以及是否使用露营禁令执法。",
        "key_facts": [
          "在 2024 年 1 月的一夜统计中，有 187,084 名加州人被记为无家可归，比前一年的 181,399 人增长 3.1%（HUD）。",
          "加州约占全国无家可归人口的 25%，且露宿户外的比例最高——约三分之二在街头而非收容所过夜。",
          "[Grants Pass v. Johnson](https://calmatters.org/housing/2024/06/california-homeless-camps-grants-pass-ruling/)（Supreme Court，6-3，2024 年 6 月）裁定禁止在公共场所露营并不违反 Eighth Amendment。这消除了此前即便没有收容所也对露营者开罚单或逮捕的法律障碍。",
          "[Proposition 1](https://calmatters.org/california-voter-guide-2024/prop-1-mental-health/)（2024 年 3 月）批准了一笔 $6.4 billion 的债券，用于行为健康住房和治疗，其中约 $4.4 billion 以拨款形式建造约 6,800 张住院治疗床位，外加为无家可归退伍军人及其他人提供永久性支持性住房。",
          "到 2026 年初，自该计划于 2024 年 12 月在全州推行以来，已提交了超过 3,800 份 CARE Act 申请，州政府在 2026 年 3 月又为 CARE 相关服务和住房增拨了 $291 million。"
        ]
      }
    },
    "gun_policy": {
      "name": "枪支政策",
      "short_description": "加州的枪支法应当放宽、维持不变，还是变得更严格？",
      "stance_scale": {
        "1": "大幅放宽（更易隐蔽携枪，执法更宽松）",
        "2": "放宽某些具体规则",
        "3": "原样维持现行枪支法",
        "4": "捍卫现行法律并堵住漏洞",
        "5": "增加重大新限制（枪支登记、更多禁令）"
      },
      "voter_guide": {
        "current_policy": "加州拥有全美最严格的一些枪支法。Roberti-Roos Assault Weapons Control Act（1989）及后续法律禁止许多半自动“攻击性武器”，该州还将弹匣容量上限设为 10 发。2022 年，U.S. Supreme Court 在 NYSRPA v. Bruen 一案中推翻了那些允许官员裁定谁有“足够正当理由”隐蔽携枪的规则。作为回应，[SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB2)（2023，2024 年 1 月 1 日生效）将加州转为“应发”（shall-issue）许可制——意味着任何符合资格的人都能获得许可——同时增加了 16 小时的培训要求，以及一长串即便持证也禁止携枪的“敏感场所”。另有一部法律，[AB 28](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB28)（2023，2024 年生效），对枪支和弹药销售加征 11% 的州税，用于资助暴力预防和校园安全项目。",
        "arguments_for_change": "希望增加限制的人士指出，枪支法更严格的州往往报告的枪支死亡率更低。他们认为攻击性武器和弹匣限制、SB 2 的敏感场所清单以及 AB 28 税款，在为预防工作提供资金的同时削减了高风险场所的枪支可得性。他们表示堵住剩余的漏洞——并在法庭上捍卫现行法律——能挽救生命，而 Second Amendment 仍然允许合理的监管。",
        "arguments_against_change": "反对增加限制的人士认为，加州已经拥有全国最严格的规则却仍有枪支犯罪，所以新限制带来的收益很小。他们表示 Bruen 之后的法院裁决暗示加州的若干法律可能违宪，并招致代价高昂的诉讼。他们认为宽泛的敏感场所禁令和销售税给守法的持枪者带来负担，并使携枪权利取决于你身处何地。他们还表示，执法更应针对非法贩运和已被禁止持枪的人，而非合法购买者。",
        "comparison": "独立机构和倡导团体的评分卡一贯将加州的枪支法排为全国最严格或近乎最严格——与 Massachusetts、New York、Illinois 和 Connecticut 并列。相比之下，Texas、Arizona 和 Idaho 等“宪法携枪”州无需许可即可隐蔽携枪，对弹匣和步枪类型的限制也少得多。",
        "note_on_options": "加州的枪支法很大程度上由 Ninth Circuit 和 Supreme Court 的诉讼塑造，所以一位州长的实际范围是从根据法院裁决捍卫或收窄现行规则（低端）到签署新限制并积极捍卫它们（高端）。“回退”（立场 1）主要意味着拒绝捍卫或签署废除法案，二者都受 Legislature 制约。",
        "key_facts": [
          "加州自 1989 年 Roberti-Roos Act 以来一直禁止“攻击性武器”，并将弹匣限制为 10 发。",
          "[SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB2)（2024 年 1 月 1 日生效）在 Bruen 裁决后保留了应发许可制，但列出了约 26 类“敏感场所”。2025 年，Ninth Circuit 上诉法院在案件继续审理期间维持了其中某些地点禁令，并阻止了另一些。",
          "[AB 28](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB28) 对枪支和弹药征收的 11% 税（2024 年生效）预计每年为暴力预防和校园安全项目筹集约 $160 million。它面临一项尚未裁决的法庭挑战。",
          "微刻印（microstamping）及其他厂商端规则（如 [SB 452](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB452)，2023）仍在法律之列，尽管其中某些部分只有在该技术被认定可行时才生效。",
          "加州的若干枪支法正在 Ninth Circuit 依据 Bruen 标准进行积极诉讼——该标准考问一部法律是否符合本国枪支监管的“历史与传统”——因此随着法院作出裁决，哪些规则能够实际执行也在不断变化。"
        ]
      }
    },
    "natgas_bridge": {
      "name": "天然气作为过渡燃料",
      "short_description": "在加州转向更清洁能源的过程中，天然气应当扮演什么角色？",
      "stance_scale": {
        "1": "扩大天然气使用和基础设施",
        "2": "暂时保留天然气；缓慢逐步减少",
        "3": "不设硬性时间表——让成本和电网可靠性来决定",
        "4": "到 2030 年代中期把天然气逐出电力领域",
        "5": "在住宅、企业和发电厂中迅速逐步淘汰天然气"
      },
      "voter_guide": {
        "current_policy": "加州约 40% 的州内电力仍来自天然气，天然气还为其约 1,400 万户家庭中的大多数供暖。但该州正引导新建筑转用电力。2022 年，California Air Resources Board（CARB——该州的空气质量机构）设定了一个目标：到 2030 年，所有售出用于住宅的新炉具和热水器都应实现零排放，商业建筑则在 2035 年跟进。CARB 仍在编写实现这一目标的实际规则。它在 2025 年 12 月将规则缩减，预计 2026 年董事会会进行表决，但目前尚无定论。与此同时，自 Berkeley 于 2019 年率先禁止后，数十座城市在新建工程中禁用天然气——直到 2023 年一项联邦上诉法院裁决（CRA v. Berkeley）认定联邦电器法优先于这些地方禁令。因此该州转而改用建筑规范和排放标准。",
        "arguments_for_change": "更快摆脱天然气的支持者表示，建筑是温室气体和形成雾霾污染物的一大来源，而在室内燃烧天然气会引发健康担忧。他们认为铺设新的天然气管道和接口存在风险，因为随着电网转向电力，这些设备可能变得一文不值。他们指出热泵如今在加州大多数气候条件下已胜过燃气炉。他们还警告说，随着用气客户减少，维护管网的固定成本会落在留下来的人——往往是低收入家庭——身上，所以有计划、有序的转换比混乱的转换更便宜。",
        "arguments_against_change": "把天然气作为过渡桥梁加以保留的支持者表示，当太阳能和风能不可用时，天然气可以即时开启以作后备，有助于在用电高峰时防止停电。他们认为强迫所有人改用电力会增加家庭的前期成本，并给本已昂贵的电网带来压力。由于加州的电价在全国排名第 2 高，他们表示使用热泵所节省的钱并不确定。他们还警告说，突然的强制规定会超出安装数百万台热泵所需的电气面板升级和受过培训的劳动力。",
        "comparison": "加州与 New York（自 2026 年起在大多数新建筑中禁用天然气）和 Washington 一道，是在让建筑摆脱天然气方面最为激进的州之一。大多数州走的是相反方向：有超过 20 个州通过了法律，禁止城市限制天然气接口。",
        "note_on_options": "这一量表衡量摆脱天然气的速度，而非是否要去碳——几乎所有候选人都接受该州长期的碳中和目标。分歧在于时间表和强制措施（电器禁令、接口禁令、燃气系统退役）相对于激励和自愿采用之间。",
        "key_facts": [
          "加州约 40% 的电力来自天然气，天然气还为该州大多数家庭供暖和供热水。",
          "CARB 的 2022 年计划力争到 2030 年售出的新家用炉具和热水器 100% 实现零排放——但执行这一目标的规则尚未完成，并在 2025 年 12 月被缩减。",
          "2023 年一项联邦上诉法院裁决（CRA v. Berkeley）认定，新建筑中关于天然气接口的地方禁令被联邦电器法所推翻。",
          "加州通过 TECH Clean California 和公用事业项目为热泵（电力制热制冷设备）提供回扣，目标是到 2030 年安装 600 万台。",
          "Aliso Canyon——2015–16 年 SoCalGas 甲烷泄漏事故（美国史上最大）的天然气储存场——仍在运营。曾计划的 2027 年关闭如今预计最早也要到 2030 年代后期才会实现。"
        ]
      }
    },
    "prop13_commercial": {
      "name": "商业地产税（Prop 13 拆分名册）",
      "short_description": "加州根据地产的购买价格为房地产税设上限（Prop 13）。商业和商用地产是否应当改为按今天的市场价值征税？",
      "stance_scale": {
        "1": "加强对商业地产的税收上限",
        "2": "维持现行对商业地产的税收上限",
        "3": "仅对最大型的商业地产加以改变",
        "4": "逐步按市场价值对商业地产征税",
        "5": "完全按市场价值对商业地产征税"
      },
      "voter_guide": {
        "explainer": "Proposition 13 由选民于 1978 年通过，规定了加州如何对房地产征税。你的房地产税被限制在你购买该地产所付价格的 1%，且应税价值每年最多只能上涨约 2%——无论该地产的市场价值攀升多少。完整的税单只有在地产出售并按新价格重新评估时才会到期。这一规定同样适用于住宅、商店、办公室和工厂。“拆分名册”（split-roll）指对商用地产与住宅采用不同的征税方式；加州目前并不这样做。",
        "current_policy": "根据 [Prop 13](https://lao.ca.gov/Publications/Report/3497)（1978），加州所有房地产——住宅、商店、办公室和工厂——都按其购买价格的 1% 征税，应税价值每年涨幅不得超过 2%，直到该地产出售并被重新评估。商用地产没有单独的（“拆分名册”）待遇。[Prop 15](https://lao.ca.gov/BallotAnalysis/Proposition?number=15&year=2020)（2020）原本会对大多数商业和工业地产改变这一点，按当前市场价值征税，而住宅仍保留在 Prop 13 的规则之下。它以 52% 对 48% 落败。",
        "arguments_for_change": "商业拆分名册的支持者表示，[Prop 13](https://lao.ca.gov/Publications/Report/3497) 的购买价格规则让长期持有的商用地产——写字楼、商场、大型工业场地——按已过时数十年的价值征税。这把更多的税负转移到较新的业主和房主身上。他们引用 LAO 关于 $6.5–$11.5 billion 的估算，认为这是为学校和地方服务提供的稳定资金，并主张按市场价值对商用地产征税——同时仍保护房主和小企业——能在不触动住宅保护的前提下纠正这一失衡。",
        "arguments_against_change": "反对者表示，对商用地产的更高税收会被转嫁给租户——小企业、餐馆、租房者——并最终转嫁给消费者，推高整个经济中的物价。他们警告说，每年按市场价值重新评估地产既复杂又招致诉讼，会在低迷期、价值和租金都不稳定时对企业打击最重，而且为任何一类地产削弱 Prop 13 都会为日后逐步侵蚀住宅保护打开大门——破坏选民在 1978 年所投票支持的那种可预测性。",
        "comparison": "加州在以相同方式对商用和住宅地产征税方面不同寻常——把二者都锁定在购买价格上。大多数州会每隔一段时间将所有地产重新评估到接近当前市场价值。结果是，一栋持有数十年的加州商业建筑，其税额可能远低于一栋近期售出、几乎一模一样的建筑。",
        "note_on_options": "这一量表是一个清晰的梯度：选项 1 加强对商业地产的 Prop 13 保护，选项 3 是仅适用于超大型持有的定向改革（取自 Prop 15 的小企业豁免模式），选项 5 是完全按市场价值的拆分名册。住宅 Prop 13 保护不在此处讨论之列——每个选项都使其保持不变。",
        "key_facts": [
          "[Prop 13](https://lao.ca.gov/Publications/Report/3497) 将房地产税率限制在购买价格的 1%，并将应税价值的年度增长限制在 2%——直到该地产易手并被重新评估。",
          "LAO 估计 [Prop 15](https://lao.ca.gov/BallotAnalysis/Proposition?number=15&year=2020) 在完全分阶段实施后（约 2025 年），每年将为地方政府和学校筹集 $6.5 billion 至 $11.5 billion。",
          "在这笔钱中，约 60% 会流向城市、县和特别区，40% 流向学校和社区学院（LAO）。",
          "Prop 15 完全将住宅排除在外。它还豁免了在加州拥有 $3 million 或更少商用地产的小企业，外加最多 $500,000 的营业设备。",
          "Prop 15 在 2020 年 11 月全州落败，51.9% 对 48.1%。"
        ]
      }
    },
    "healthcare_funding": {
      "name": "医疗保健筹资机制",
      "short_description": "加州是否应当转向由州运营的单一支付方医疗体系（由州为所有人承保，而非私人保险）——如果是，又将如何为其买单？",
      "stance_scale": {
        "1": "回退近期对州医疗保障（Medi-Cal）的扩展",
        "2": "维持现今的体系；侧重于降低成本",
        "3": "逐步扩大保障，不开征大的新税",
        "4": "单一支付方，主要由对财富和企业的税收来买单",
        "5": "单一支付方，由广泛的新税（如工资税）来买单"
      },
      "voter_guide": {
        "explainer": "“单一支付方”（single-payer）指由一个政府计划支付所有人的医疗账单，而非由众多私人保险公司支付。“ACA”（Affordable Care Act，也称 Obamacare）是创立了补贴市场、让人们可以在其中购买保障的联邦法律。“Medi-Cal”是加州版的 Medicaid——面向低收入居民的公共医疗保障项目。",
        "current_policy": "加州采用私人保险加上大量政府帮助的混合模式，而非单一的州运营计划。Covered California 是该州的 Affordable Care Act（ACA）市场，人们在此购买保障，州政府出资以降低保费。Medi-Cal——加州版的 Medicaid，面向低收入居民的公共保障项目——于 2024 年 1 月 1 日扩展，覆盖所有符合资格的无证成年人，使加州成为第一个无论移民身份都提供完整 Medicaid 保障的州。转向单一政府运营计划的努力一再失败：[AB 1400](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1400)（CalCare 法案，2022）在表决前被撤回，其后续法案 [AB 2200](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2200)（2024）在委员会被叫停。",
        "arguments_for_change": "希望转向州单一支付方计划（高端）的人士表示，一个公共计划能去掉保险公司的管理费用、保费、自付额和受限的医疗网络。他们引用一些分析（如 UC Berkeley Labor Center 的估算），认为整个体系的总支出可能更少。他们认为覆盖所有人——无论工作或移民身份——运营起来更简单，而加州庞大的体量将赋予它谈判更低价格的筹码。",
        "arguments_against_change": "希望保留现行补贴私人市场（低端）的人士表示，单一支付方每年约 $300–400 billion 的价格意味着大幅的新税，且不保证有净节省。他们指出它依赖于可能永远不会到来的联邦批准和 ERISA 例外。他们警告说，颠覆大多数人已经拥有的雇主和 Medicare 保障在政治上和实际上都有风险——而加州已经通过扩大补贴和 Medi-Cal 实现了接近全民的保障，没有经历那种动荡。",
        "comparison": "没有任何美国州运营单一支付方体系。Vermont 于 2014 年通过了一个，随后因无法弄清如何为其买单而放弃。加州选择了一条不同的道路——扩大补贴和 Medicaid——在保留私人保险市场的同时，达到了全国最低的无保险率之一。",
        "note_on_options": "这一量表衡量筹资机制——从保留补贴私人市场（1）到像 CalCare 那样的州运营单一支付方计划（5）——而非是否要扩大保障。一名候选人可以支持广泛扩大保障（例如 2024 年的 Medi-Cal 扩展）的同时反对单一支付方筹资；这类立场落在量表中间。",
        "key_facts": [
          "Medi-Cal 于 2024 年 1 月 1 日把完整保障扩展到所有符合资格的成年人，无论移民身份——是首个这样做的州。",
          "[AB 1400](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1400)（CalCare）于 2022 年 1 月 31 日夭折，当时其提案人将其撤回，未达到所需的 41 张众议院票。其 2024 年的后续法案 [AB 2200](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2200) 在 Appropriations 委员会被搁置。",
          "分析人士估计 CalCare 每年约花费 $314–391 billion——超过该州整个一般基金预算——并将需要新的工资税、企业税和高收入税。",
          "单一支付方计划将需要联邦政府批准（通过所谓的 Section 1332 以及 Medicaid/Medicare 豁免）以重新调配联邦资金。一部名为 ERISA 的联邦法律还限制了州在多大程度上能监管许多大型雇主使用的自筹资金健康计划。",
          "加州的无保险率近年来降至约 6–7%——为有记录以来最低之列——这得益于 ACA 补贴和 Medi-Cal 扩展，而非单一支付方体系。"
        ]
      }
    },
    "policing": {
      "name": "警务与刑事处罚",
      "short_description": "加州应当如何在增加警力、警务改革和非警务替代方案之间取得平衡？",
      "stance_scale": {
        "1": "扩充警力并加重刑事处罚",
        "2": "扩充警力，并进行一些改革",
        "3": "两者兼顾——更多警员，以及更多问责和替代方案",
        "4": "优先改革、监督和非警务应对",
        "5": "把可观的资金从警务转向社区服务"
      },
      "voter_guide": {
        "current_policy": "加州通过了一系列警务问责法律，同时把大多数资金和起诉决定留给地方机构和民选的地区检察官。[AB 392](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB392)（2019）提高了警察可以使用致命武力的门槛——改为在“必要”（necessary）以制止迫在眉睫的威胁时，而非此前更宽松的“合理”（reasonable）标准。[SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB2)（2021），即 Kenneth Ross Jr. Police Decertification Act，设立了一套全州程序，可因严重不当行为剥夺（“吊销认证”）警员的执照，并将离职者上报至一个全国数据库。[AB 1506](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1506)（2020）要求州 Department of Justice 调查导致手无寸铁平民死亡的警察枪击事件。自 2011 年的“Realignment”（[AB 109](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201120120AB109)）把较低级别的重罪犯从州监狱转移到各县以来，州监狱人口已大幅下降。",
        "arguments_for_change": "倾向于减少监禁并使用替代方案的人士认为，加州的监狱人口在 Realignment 之后大幅下降，而暴力犯罪并未持续上升——这表明许多人可以在其社区中得到安全监管。他们表示分流项目、精神健康和成瘾治疗以及再融入帮助，比监狱更便宜地处理了根本原因，而强有力的问责规则（AB 392、SB 2）能建立社区信任并减少代价高昂的不当行为。",
        "arguments_against_change": "倾向于更多拨款和更严处罚的人士认为，拥有足够的警员和明确的后果能威慑犯罪并安抚受害者。他们指出某些类型的犯罪在改革年份有所上升，并表示需要看得见的执法来增强公众信心。他们警告说，问责强制规定和较低的监禁率，若没有足够的警力和监管资源相匹配，可能使各部门不堪重负并让惯犯反复进出。在他们看来，不应为降低监狱人数而牺牲公共安全。",
        "comparison": "加州的“必要”用武标准和全州吊销认证体系比许多州更强，尽管 Colorado 和 New Jersey 等州在 2020 年后采取了类似改革。加州的监禁率接近或略低于全国平均水平——并远低于 Mississippi、Louisiana 和 Texas 等高监禁州。",
        "note_on_options": "警务预算和大多数起诉决定都是地方性的，所以一位州长的杠杆是全州标准、CDCR 运营、监狱容量、拨款和签署法案。立场 1（更多拨款、更严处罚）和立场 5（去监禁化、替代方案）描述的是州长可以推动的方向和侧重，而非对地方警力或县监狱的单方面控制。",
        "key_facts": [
          "[AB 392](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB392)（2019）为警察致命武力设定了“必要”标准——是全国较严格的用武法律之一。",
          "[SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB2)（2021）赋予该州警务标准委员会（POST）因严重不当行为吊销警员认证的权力。被吊销认证的警员不能被重新雇用，并被列入 National Decertification Index。",
          "[AB 1506](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1506)（2020）要求州 Department of Justice 调查警察对手无寸铁平民的致命枪击。",
          "在 2011 年 Realignment（[AB 109](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201120120AB109)）和疫情期间的削减之后，加州监狱人口到 2025 年 12 月降至约 90,600——比 2019 年 12 月低约 27%。该州已关闭多座监狱。",
          "加州 2025 年的监禁率约为每 100,000 名成年人 294 人，低于 2006 年逾 173,000 名总囚犯的峰值。警察编制和预算由地方设定，所以州长的直接控制有限。"
        ]
      }
    },
    "oil_gas": {
      "name": "加州州内石油和天然气生产",
      "short_description": "加州是否应当在州内开采更多石油和天然气、维持当前水平，还是逐步缩减？",
      "stance_scale": {
        "1": "多开采——扩大州内石油和天然气",
        "2": "维持当前产量；放松监管",
        "3": "大体维持现状",
        "4": "逐步缩减——收紧规则，停止发放新的钻探许可",
        "5": "迅速逐步淘汰州内钻探"
      },
      "voter_guide": {
        "current_policy": "加州允许在州内进行石油和天然气钻探，但它已收紧规则，并且没有批准多少新的钻探。[SB 1137](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1137)（Gonzalez，2022）禁止在住宅、学校、医院及其他人们长时间停留的场所 3,200 英尺范围内新建或改造油井。石油行业曾试图以一项选票公投推翻该法律，但于 2024 年 6 月 26 日撤回——因此该缓冲区法律得以生效，而非作为 2024 年的选票措施交由选民表决。州内石油产量已大幅下降：加州在 2024 年抽采了约 1.04 亿桶原油，比其峰值下降约 70%。而 CARB 的 Low Carbon Fuel Standard——一项推动交通燃料产生更少碳排放的州规则，于 2024 年修订、2025 年 7 月生效——还在持续收紧这些目标。",
        "arguments_for_change": "更快逐步淘汰石油的支持者表示，钻探把空气污染和健康危害集中在油井附近的低收入和拉美裔社区。他们指出州内产量已在萎缩，且只供应加州炼制原油中的少部分——所以有序地逐步缩减对供应的影响有限。他们认为继续钻探与该州的碳中和目标相冲突，而且每一口新井都会增加州政府最终将不得不出钱清理的废弃、闲置油井的堆积。",
        "arguments_against_change": "维持产量的支持者表示，州内石油支撑着数万个工作岗位以及 Kern County 税基的很大一部分。他们认为削减本地供应意味着进口更多原油——往往是在他处依据更宽松环境规则生产的——并使驾车者面临价格飙升的风险。他们警告说，炼油厂关闭已经威胁到燃料供应和价格，而在一个加油价格本已位居全国最高之列的州，突然的限制会推高汽油价格。",
        "comparison": "加州是唯一一个把高产量与明确的减产计划相结合的美国主要产油州。Texas、New Mexico 和 North Dakota 都在扩大生产。加州在新井与住宅之间 3,200 英尺的缓冲区，是全国所要求的最大钻探退让距离之一。",
        "note_on_options": "这一量表从扩大生产（1）到迅速的全州逐步淘汰（5）。“维持现状”位于中间附近：加州目前允许现有生产继续并自然衰减，同时限制社区附近的新井。一名支持 SB 1137 退让距离但反对硬性开采终止日期的候选人，编码在 3 附近。",
        "key_facts": [
          "[SB 1137](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1137) 在新井与住宅之间 3,200 英尺的缓冲区，于 2024 年 6 月 27 日在行业撤回其废除公投后生效。它并非作为“Prop 4”选票措施通过——这是一个常见的混淆。",
          "加州在 2024 年生产了约 1.04 亿桶原油——比其峰值下降约 70%。该州在美国产油州中排名约第 7。",
          "Kern County 约占加州州内石油产量的 65–70%。",
          "加州炼油厂使用的原油大部分依赖进口——只有约四分之一来自州内油井。其余通过海运或来自 Alaska。",
          "CARB 2024 年对 Low Carbon Fuel Standard（一项要求交通燃料随时间变得更清洁的规则；2025 年 7 月 1 日生效）的更新收紧了目标。CARB 估计这在近期内会使每加仑增加约 5–8 美分，尽管一些学术估算更高。"
        ]
      }
    },
    "abortion": {
      "name": "堕胎与生育权利",
      "short_description": "加州应当扩大、维持还是限制堕胎可及性？",
      "stance_scale": {
        "1": "增加限制（如时间限制或父母同意）",
        "2": "允许某些限制",
        "3": "维持加州现行的强力保护",
        "4": "加强可及性——更多资金和更多服务提供者",
        "5": "走得更远——为外州患者提供资金，并扩大可提供医疗服务者的范围"
      },
      "voter_guide": {
        "current_policy": "堕胎是写入加州宪法的一项权利。[Proposition 1](https://lao.ca.gov/BallotAnalysis/Proposition?number=1&year=2022)（2022 年 11 月），由约 66% 的选民批准，修订了州宪法，禁止加州否定或干涉生育自由，包括堕胎和避孕。在 U.S. Supreme Court 2022 年的 Dobbs 裁决终结了堕胎的联邦权利之后，Legislature 通过了一系列法律。[AB 1242](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1242) 和 [AB 2091](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2091)（2022）阻止加州警察、企业和服务提供者协助外州堕胎调查或交出相关记录。[SB 345](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB345)（2023）保护持加州执照的服务提供者——包括提供远程医疗和堕胎药物者——免遭其他州的起诉或引渡。Medi-Cal 以全额州费用承保堕胎，该州还拨出超过 $200 million 以支持堕胎可及性和服务提供者。",
        "arguments_for_change": "希望进一步扩大保护（高端）的人士表示，随着越来越多的州实施禁令，加州应当充当一个避风港——为外州患者的出行和医疗提供资金，扩大服务提供者的保护和能力，并抢在任何未来联邦限制之前行动。他们认为决定人们能否真正获得医疗的是成本和后勤，而不仅仅是某事是否合法，所以州政府应当积极地为其提供资金并加以保护。",
        "arguments_against_change": "倾向于某些限制、或仅仅是不再进一步扩大（低端）的人士，基于道德或宗教理由认为堕胎应当面临某些限制，如在妊娠后期的限制。他们表示公共资金不应支付堕胎或外州患者的医疗，而盾牌法和避风港资金把加州拖入与其他州法律的纷争，并扩大了纳税人被要求承担的范围。鉴于 Prop 1 的 66% 得票优势，在加州内部这是少数派观点。",
        "comparison": "加州是 Dobbs 之后对堕胎可及性最具保护性的州之一，把宪法权利、Medi-Cal 承保、公共资金和服务提供者盾牌法结合在一起。这与十多个禁止或严格限制堕胎的州形成鲜明对比，并使加州跻身于公开为来自他处的患者提供资金并保护其医疗的少数几个州之列。",
        "note_on_options": "这一量表从支持对可及性施加某些限制（1）到一个由州资助、跨州的扩展型避风港并对服务提供者提供广泛保护（5）。鉴于加州的宪法权利和 2022 年悬殊的投票结果，大多数有竞争力的候选人都聚集在保护性的一端；有区分度的问题在于在多大程度上为跨州医疗提供资金并保护服务提供者，而非堕胎在州内是否合法。",
        "key_facts": [
          "[Proposition 1](https://lao.ca.gov/BallotAnalysis/Proposition?number=1&year=2022)（2022）以约 66% 的支持通过，把堕胎和避孕的明确权利写入州宪法。",
          "Medi-Cal 承保堕胎且由州支付全部费用，受州监管的私人保险计划一般也被要求承保。",
          "加州通过了盾牌法——[AB 1242](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1242)、[AB 2091](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2091)（2022）和 [SB 345](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB345)（2023）——保护州内服务提供者和患者（包括使用远程医疗的外州患者）免被卷入其他州的堕胎起诉。",
          "该州在近期各项预算中拨出超过 $200 million，以资助堕胎可及性、扩大服务提供者能力，并帮助患者支付出行等费用。",
          "在 Dobbs 之后，加州把自己打造成一个来自禁令州的患者可以前往就医的地方，并以州资金为他们提供支持。"
        ]
      }
    },
    "school_funding": {
      "name": "K-12 学校经费与治理",
      "short_description": "加州在 K-12 公立学校上应当多花、少花，还是大致维持不变？",
      "stance_scale": {
        "1": "大幅削减 K-12 开支",
        "2": "削减或维持开支",
        "3": "大体维持开支不变",
        "4": "适度增加经费（教师薪酬、设施）",
        "5": "大幅增加经费（教师薪酬、更小班级），必要时筹集新收入"
      },
      "voter_guide": {
        "explainer": "这里有几个术语经常出现。“Prop 98”是 1988 年对州宪法的一项修正案，规定了州政府每年必须在 K-12 学校和社区学院上支出的最低额。“LCFF”，即 Local Control Funding Formula，是 2013 年发放这笔钱的制度：每个学区按学生人头获得一笔基础金额，外加为低收入、正在学习英语或处于寄养中的学生提供的额外资金。“生均支出”（Per-pupil spending）是学校总经费除以学生人数。“NAEP”是一项全国性考试（昵称“the Nation's Report Card”），让人可以对各州进行比较。“地块税”（parcel tax）是某些学区用来筹集额外学校经费、对每处地产征收的固定地方税。",
        "current_policy": "K-12 经费依靠两大支柱。[Prop 98](https://lao.ca.gov/Publications/Report/4929)（1988）是一项宪法规则，规定了州政府每年必须在学校和社区学院上支出的最低额。Local Control Funding Formula（LCFF，2013）决定这笔钱如何分配：每个学区按学生人头获得一笔基础拨款，外加一笔补充拨款（基础额的额外 20%），对于高需求学生众多的学区，还有一笔集中拨款——全部针对低收入、正在学习英语或处于寄养中的学生。2024-25 年度，Prop 98 最低额总计约为 $115.3 billion（其中约 $101.1 billion 用于 K-12）。选民还在 2024 年 11 月通过了 [Prop 2](https://lao.ca.gov/BallotAnalysis/Proposition?number=2&year=2024)，这是一笔 $10 billion 的债券，用于建造和修缮学校及社区学院的建筑。",
        "arguments_for_change": "希望增加经费和加强地方控制的人士表示，加州的生均支出仍低于条件相当的高成本州，且 LCFF 的补充和集中拨款应当更大，以缩小低收入学生、英语学习者和寄养青少年的机会差距。他们认为，要为有竞争力的教师薪酬、校舍以及扩大过渡性幼儿园提供资金，需要一个稳定、专项的资金来源——一项税或一笔债券——并且最懂得如何花钱的是当地教育工作者，而非 Sacramento 的强制规定。",
        "arguments_against_change": "强调问责和改革的人士表示，自 LCFF 以来开支大幅攀升，但 NAEP 上的进步并不相称，所以重点应当是展示集中拨款的钱究竟去了哪里并取得可衡量的成果——而非新税。他们指出 [Prop 98](https://lao.ca.gov/Publications/Report/4929) 已经保障了一个不断上升的下限，州预算随经济波动，而 LCFF 宽松的支出规则使人难以确认这笔额外的钱是否真正惠及了它本应惠及的高需求学生。",
        "comparison": "一旦针对加州的高成本进行调整，其生均支出如今位于各州的中上水平，尽管仍低于 New York 等支出大户。其 NAEP 分数仍低于全国平均水平，这使得关于问题究竟是钱太少、钱怎么花，还是缺乏问责的辩论一直持续。",
        "note_on_options": "这一量表跨越了经费水平（从削减到大量新收入）和州与地方控制的轴线。二者可能分道扬镳：一名候选人可能偏好在不加税的情况下加强地方控制，或偏好更多由州主导的公平性经费。我们默认的编码将支持一项专项新税或债券视为最强的数值 5 信号，将问责优先、改革 LCFF 的立场视为数值 1。",
        "key_facts": [
          "2024-25 年度来自所有来源的生均总支出约为 $23,878（州估算），预计将继续上升。",
          "按可对等比较的 Census 数据，加州在 2022-23 年度的生均支出约为 $19,894——在各州中约排第 13，较前一年的第 28 位有所上升。",
          "LCFF（2013）在每个学区的基础拨款之上叠加一笔补充拨款（基础额的额外 20%）和一笔集中拨款，以把更多的钱引向需求更高的学区。",
          "在 2024 年的 NAEP 全国考试中，加州的得分略低于全国平均水平——例如 4 年级阅读 212 对 214，8 年级阅读 254 对 257——尽管其与全国其余部分的长期差距已经缩小。",
          "[Prop 2](https://lao.ca.gov/BallotAnalysis/Proposition?number=2&year=2024)（2024 年 11 月）授权了 $10 billion 债券用于 K-12 和社区学院的建筑；许多学区还征收地方地块税（对每处地产征收的固定税），这需要三分之二选民批准。"
        ]
      }
    }
  },
  "dimensions": {
    "years_in_office_band": {
      "name": "担任民选公职的年限",
      "description": "你更青睐一位崭新的政治声音，还是一位有丰富民选公职任期的人？",
      "scale": {
        "1": "强烈偏好崭新——担任民选公职不足 5 年",
        "2": "倾向崭新",
        "3": "没有偏好",
        "4": "倾向有经验",
        "5": "强烈偏好资深——担任民选公职 15 年以上"
      }
    },
    "career_path": {
      "name": "职业背景",
      "description": "在一位州长身上，哪些职业背景对你有吸引力？（如无偏好请留空。）",
      "options": {
        "state_pol": "州政治（Assembly、Senate、全州性公职）",
        "federal_pol": "联邦政治（Congress、Cabinet）",
        "local_pol": "地方政治（市长、议会、治安官）",
        "business": "商业／私营部门",
        "law_enforcement": "执法",
        "law": "执业或学术法律",
        "activism": "行动主义／社区组织",
        "nonprofit": "非营利领导",
        "academia": "学术界／教学",
        "media": "媒体／新闻",
        "health": "医疗保健／公共卫生",
        "social_work": "社会工作／公共服务"
      }
    },
    "endorsement_coalition": {
      "name": "背书联盟",
      "description": "谁的背书信号对你最重要？（如无偏好请留空。）",
      "options": {
        "labor": "劳工工会",
        "environmental": "环保组织",
        "civil_rights": "民权组织",
        "business": "商界",
        "law_enforcement": "执法协会",
        "womens_orgs": "妇女组织",
        "faith": "信仰群体",
        "latino_caucus": "拉美裔核心小组／拉美裔组织",
        "lgbtq_orgs": "LGBTQ+ 组织",
        "newspapers": "加州主要报纸（LA Times、SF Chronicle、Sac Bee）",
        "dem_party": "California Democratic Party",
        "rep_party": "California Republican Party",
        "trump": "Donald Trump／全国性共和党人物"
      }
    },
    "geographic_background": {
      "name": "地域背景",
      "description": "你是否偏好来自加州某一特定地区的候选人？（如无偏好请留空。）",
      "options": {
        "bay_area": "Bay Area",
        "la_county": "Los Angeles County",
        "oc_ie": "Orange County／Inland Empire",
        "san_diego": "San Diego",
        "central_valley": "Central Valley",
        "north": "Far North／Sierra",
        "central_coast": "Central Coast"
      }
    },
    "electability": {
      "name": "胜选可能性",
      "description": "大选可行性——民调实力、筹款、广泛吸引力——在多大程度上被纳入考量？",
      "scale": {
        "1": "决定性——我把胜选可能性看得高于其他因素",
        "2": "权重很大",
        "3": "权重适中",
        "4": "有一些权重",
        "5": "不纳入考量——无论可行性如何，我都按理念契合度投票"
      }
    },
    "age_band": {
      "name": "年龄／世代",
      "description": "你偏好哪个年龄群体？（可选。）",
      "options": {
        "millennial": "千禧一代（生于 1981–1996）",
        "gen_x": "X 世代（生于 1965–1980）",
        "boomer": "婴儿潮一代（生于 1946–1964）",
        "silent": "沉默的一代（生于 1946 年之前）"
      }
    },
    "demographic_background": {
      "name": "人口背景",
      "description": "哪些候选人背景对你而言具有正面意义？（可选——如无偏好请留空。你的回答是匿名的。）",
      "options": {
        "black": "黑人／非裔美国人",
        "latino": "拉美裔／西班牙裔",
        "aapi": "亚裔美国人／太平洋岛民",
        "white": "白人",
        "native": "美洲原住民／原住民",
        "multiracial": "多种族",
        "woman": "女性",
        "man": "男性",
        "nonbinary": "非二元性别",
        "lgbtq": "LGBTQ+",
        "catholic": "天主教徒",
        "protestant": "新教徒／福音派",
        "jewish": "犹太教徒",
        "muslim": "穆斯林",
        "hindu": "印度教徒",
        "sikh": "锡克教徒",
        "secular": "世俗／无神论者／无宗教",
        "immigrant": "移民或第一代美国人",
        "veteran": "退伍军人／服过兵役"
      }
    }
  }
};

DATASET_I18N.vi = {
  "questions": {
    "tax_wealth": {
      "name": "Thuế tài sản cấp tiểu bang",
      "short_description": "California có nên đánh thuế trên giá trị tài sản ròng của những cư dân giàu có nhất hay không — một loại thuế đánh trên chính tài sản, tách biệt với thuế thu nhập?",
      "stance_scale": {
        "1": "Phản đối thuế tài sản cấp tiểu bang",
        "2": "Nghiêng về phản đối — hiện không ủng hộ",
        "3": "Cởi mở với ý tưởng / chưa quyết định",
        "4": "Ủng hộ thuế tài sản",
        "5": "Mạnh mẽ ủng hộ thuế tài sản đánh vào giới siêu giàu"
      },
      "voter_guide": {
        "current_policy": "California không có thuế tài sản — một loại thuế đánh trên những gì một người sở hữu (giá trị tài sản ròng của họ) thay vì trên thu nhập họ kiếm được. Đã có hai phiên bản khác nhau được đưa ra, và chúng vận hành rất khác nhau. Năm 2023, Dân biểu Alex Lee với [AB 259](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB259) (cùng tu chính hiến pháp ACA 3) đề xuất một loại thuế hằng năm — 1% trên tài sản ròng trên 50 triệu đô la và 1,5% trên 1 tỷ đô la — nhưng nó bị đình lại ở ủy ban và chưa bao giờ trở thành luật. Riêng biệt, một biện pháp đánh một lần — 'Billionaire Tax Act', tên chính thức là One-Time Wealth Tax for State-Funded Health Care Programs Initiative, được SEIU-UHW hậu thuẫn — đã đủ điều kiện đưa vào lá phiếu tháng 11 năm 2026: một khoản thuế 5% đánh một lần trên tài sản ròng của các tỷ phú California, với phần lớn nguồn thu dành cho chăm sóc sức khỏe và phần còn lại cho giáo dục và hỗ trợ lương thực.",
        "arguments_for_change": "Những người ủng hộ cho rằng thuế tài sản chạm tới những khối tài sản mà thuế thu nhập bỏ sót — các tỷ phú có thể giữ thu nhập chịu thuế ở mức thấp trong khi tài sản ròng của họ vẫn tiếp tục tăng — và rằng ngay cả một khoản thuế khiêm tốn đánh vào những khối tài sản lớn nhất cũng có thể tài trợ cho trường học, chăm sóc sức khỏe và chăm sóc trẻ em từ một nhóm hẹp người đóng thuế.",
        "arguments_against_change": "Những người phản đối cho rằng thuế tài sản cấp tiểu bang vấp phải những vấn đề pháp lý và thực tiễn nghiêm trọng (làm sao định giá tài sản của một người?), rằng những cư dân dễ di chuyển nhất sẽ rời đi hoặc tái cơ cấu để né tránh nó, và rằng nguồn thu dựa vào một nhóm nhỏ người sẽ khó dự đoán.",
        "comparison": "California sẽ là tiểu bang đầu tiên của Hoa Kỳ áp dụng một loại thuế thực sự đánh trên tổng tài sản. Một số tiểu bang khác có mức thuế cao đã cân nhắc ý tưởng này rồi bỏ qua, viện dẫn các thách thức pháp lý, khó khăn trong việc định giá tài sản, và nguy cơ những cư dân giàu nhất chỉ đơn giản là chuyển đi.",
        "key_facts": [
          "Hiện không tiểu bang nào của Hoa Kỳ có thuế tài sản thực sự.",
          "Đây là hai đề xuất khác nhau. [AB 259](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB259) (2023, Alex Lee) là một loại thuế hằng năm — 1% trên tài sản ròng trên 50 triệu đô la, 1,5% trên 1 tỷ đô la — đã bị đình lại ở ủy ban và chưa bao giờ trở thành luật.",
          "Biện pháp trên lá phiếu tháng 11 năm 2026 là một khoản thuế 5% đánh một lần trên tài sản ròng của các tỷ phú California (trên 1 tỷ đô la), được định giá tại một thời điểm ấn định — không phải thuế thường niên. Phần lớn nguồn thu được dành riêng cho chăm sóc sức khỏe, với một phần cho giáo dục và hỗ trợ lương thực.",
          "Thuế đánh một lần phải nộp một lần, dựa trên tài sản tại một thời điểm chụp ảnh; thuế hằng năm tái diễn mỗi năm khối tài sản được nắm giữ. Dự luật năm 2023 là thuế hằng năm; biện pháp trên lá phiếu năm 2026 là đánh một lần.",
          "Các loại thuế tài sản diện rộng đã được đề xuất và thất bại ở Washington, New York, Massachusetts và Illinois. Phần khó nhất của bất kỳ loại thuế tài sản nào là định giá những thứ không có giá thị trường rõ ràng — công ty tư nhân, tác phẩm nghệ thuật, bất động sản."
        ]
      }
    },
    "school_choice": {
      "name": "Quyền chọn trường và trường charter",
      "short_description": "California có nên làm cho việc mở trường charter dễ dàng hơn hay khó khăn hơn và trao cho các gia đình nhiều lựa chọn trường học hơn?",
      "stance_scale": {
        "1": "Mở thêm nhiều trường charter và mở rộng quyền chọn trường cho gia đình",
        "2": "Mở thêm trường charter; bảo vệ quyền chọn trường cho gia đình",
        "3": "Giữ các quy định về trường charter hiện tại gần như nguyên trạng",
        "4": "Làm cho việc mở trường charter mới khó hơn",
        "5": "Dừng các trường charter mới; chuyển nguồn tiền cho các trường công truyền thống"
      },
      "voter_guide": {
        "explainer": "Các trường công truyền thống do các học khu địa phương điều hành, miễn phí và mở cửa cho mọi học sinh. Trường charter cũng là trường công miễn phí được tài trợ bằng tiền thuế, nhưng chúng được điều hành độc lập — thường là bởi một tổ chức phi lợi nhuận theo một hợp đồng (một 'charter') — với nhiều tự do hơn về cách giảng dạy và tuyển dụng, và ít sự giám sát của học khu hơn. Trường tư thu học phí và không nhận tài trợ của tiểu bang. 'Quyền chọn trường' đôi khi cũng có nghĩa là phiếu hỗ trợ học phí (voucher) — tiền công mà các gia đình có thể dùng cho học phí trường tư — điều mà California hiện không cung cấp.",
        "current_policy": "California có khoảng 1.283 trường charter, cộng với bảy học khu hoàn toàn gồm các trường charter (dữ liệu tiểu bang, tháng 5 năm 2024). Chúng dạy khoảng 11,7% học sinh trường công. Hai đạo luật năm 2019 — [AB 1505](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1505) và [AB 1507](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1507), cả hai đều được ký vào tháng 10 năm đó và có hiệu lực từ ngày 1 tháng 7 năm 2020 — đã làm cho việc mở và gia hạn trường charter khó hơn. Giờ đây các học khu có thể từ chối một trường charter mới bằng cách viện dẫn tổn thất tài chính hoặc tác động đến cộng đồng, các trường charter nhìn chung không thể vận hành cơ sở ngoài học khu đã phê duyệt chúng, và một trường charter có thành tích kém có thể bị từ chối gia hạn. California không cung cấp phiếu hỗ trợ học phí trường tư hay tài khoản tiết kiệm giáo dục do tiểu bang tài trợ. (Phiếu hỗ trợ học phí trao cho gia đình tiền công để chi cho học phí trường tư; tài khoản tiết kiệm giáo dục, gọi là ESA, là một tài khoản do chính phủ tài trợ mà phụ huynh có thể chi cho học phí, gia sư hoặc các chi phí giáo dục được phê duyệt khác.) Biện pháp phiếu hỗ trợ học phí gần nhất, [Prop 38](https://www.lao.ca.gov/ballot/2000/38_11_2000.html) năm 2000, đã thất bại với tỷ lệ 71% chống 29%.",
        "arguments_for_change": "Những người muốn có nhiều lựa chọn hơn cho rằng các trường charter trao cho các gia đình — phần lớn là gia đình thu nhập thấp và gia đình người da màu — một lựa chọn khác ngoài trường khu phố được chỉ định, và rằng một số mạng lưới trường charter đạt kết quả mạnh mẽ cho những học sinh đó. Họ lập luận rằng [AB 1505](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1505) đã trao cho các học khu một lý do dựa trên tiền bạc để ngăn cản các đối thủ cạnh tranh, và rằng phiếu hỗ trợ học phí hoặc tài khoản tiết kiệm giáo dục sẽ mở ra lựa chọn cho các gia đình không đủ khả năng trả học phí trường tư hoặc chuyển đến khu vực có trường điểm.",
        "arguments_against_change": "Những người phản đối — bao gồm California Teachers Association (CTA) và California School Boards Association (CSBA) — cho rằng các trường charter và phiếu hỗ trợ học phí rút tiền theo đầu học sinh (nguồn tài trợ đi theo mỗi học sinh) ra khỏi các trường học khu, vốn vẫn dạy phần lớn trẻ em và vẫn có các hóa đơn cố định phải trả. Họ lập luận rằng chất lượng trường charter không đồng đều và sự giám sát yếu hơn, dẫn chiếu các nghiên cứu (chẳng hạn các nghiên cứu CREDO của Stanford) cho thấy kết quả của trường charter thay đổi rất nhiều tùy theo đơn vị vận hành và tiểu bang, và lưu ý rằng cử tri California đã nhiều lần bác bỏ phiếu hỗ trợ học phí vì cho rằng đó là việc dùng tiền công để trả cho trường tư và trường tôn giáo.",
        "comparison": "California là một trong những tiểu bang lớn nghiêm ngặt hơn về quyền chọn trường: nó có một khu vực trường charter lớn nhưng, không như Arizona, Florida hay Indiana, không cung cấp phiếu hỗ trợ học phí trường tư hay tài khoản tiết kiệm giáo dục. Các đạo luật năm 2019 của nó đi ngược lại xu hướng toàn quốc, vốn nghiêng về việc mở rộng quyền chọn trường tư.",
        "note_on_options": "Thang đo này kết hợp hai cơ chế khác biệt: chính sách trường charter (một lựa chọn trường công) và phiếu hỗ trợ học phí/ESA trường tư (tiền công cho học phí trường tư). Một ứng cử viên có thể ủng hộ mở rộng trường charter trong khi phản đối phiếu hỗ trợ học phí, hoặc ngược lại. Cách mã hóa mặc định của chúng tôi coi sự ủng hộ phiếu hỗ trợ học phí là tín hiệu ủng hộ quyền chọn trường mạnh nhất (giá trị 1) và lập trường giới hạn-và-chuyển-hướng là tín hiệu hạn chế mạnh nhất (giá trị 5).",
        "key_facts": [
          "Khoảng 1.283 trường charter và 7 học khu toàn trường charter đang hoạt động ở California (dữ liệu tiểu bang, tháng 5 năm 2024); các trường charter dạy khoảng 11,7% học sinh trường công (2022-23).",
          "[AB 1505](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1505) (2019) đã chấm dứt quyền gần như tự động kháng cáo một trường charter bị từ chối trước đây, và cho phép các học khu viện dẫn tổn thất tài chính và nhu cầu cộng đồng khi từ chối hoặc không gia hạn một trường charter.",
          "[AB 1507](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1507) (2019) đã ngăn hầu hết các trường charter mới vận hành các trung tâm học tập hoặc cơ sở vệ tinh ngoài học khu đã phê duyệt chúng (cơ quan 'cấp phép charter' — cơ quan, thường là một học khu, cấp và giám sát charter).",
          "Số ghi danh ở trường charter đã nhích lên trong khi số ghi danh ở trường học khu thông thường đã giảm, một phần vì tổng số ghi danh trên toàn tiểu bang đang sụt giảm.",
          "[Prop 38](https://www.lao.ca.gov/ballot/2000/38_11_2000.html) (2000), vốn sẽ trao cho các gia đình một phiếu hỗ trợ học phí khoảng 4.000 đô la mỗi trẻ, đã thất bại với tỷ lệ 71% chống 29%. Không có biện pháp phiếu hỗ trợ học phí toàn tiểu bang nào được đưa vào lá phiếu kể từ đó."
        ]
      }
    },
    "housing_supply": {
      "name": "Nguồn cung nhà ở & quyền ưu tiên áp đặt quy hoạch",
      "short_description": "Tiểu bang nên thúc ép các thành phố xây thêm nhà ở mạnh đến mức nào — ngay cả khi cư dân địa phương phản đối?",
      "stance_scale": {
        "1": "Thúc ép mạnh — bác bỏ các quy định quy hoạch địa phương để buộc xây thêm",
        "2": "Thúc ép nhiều — đặt mục tiêu xây dựng cao, can thiệp phần nào vào các thành phố",
        "3": "Tìm sự cân bằng — khuyến khích xây dựng nhưng để phần lớn quyết định cho các thành phố",
        "4": "Chủ yếu để cho các thành phố quyết — giới hạn việc bác bỏ của tiểu bang, thay vào đó cắt giảm thủ tục rườm rà của địa phương",
        "5": "Tập trung vào nhà ở trợ giá và bảo vệ người thuê thay vì buộc xây nhà theo giá thị trường"
      },
      "voter_guide": {
        "current_policy": "Trong thập kỷ qua, California đã thu hồi nhiều quyền lực về phê duyệt nhà ở từ các thành phố và trao cho tiểu bang. [SB 35](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB35) (2017) tạo ra một quy trình nhanh cho các dự án căn hộ đủ điều kiện ở những thành phố không đạt mục tiêu nhà ở của tiểu bang: việc phê duyệt trở nên \"theo thủ tục bắt buộc\", nghĩa là quan chức địa phương phải chấp thuận nếu các quy định được đáp ứng, không có quyền tùy nghi từ chối. [SB 423](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB423) (2023) đã gia hạn quy trình nhanh đó đến năm 2036 và mở rộng nó tới các phần ven biển. [SB 9](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB9) (2021) cho phép xây nhà song lập và tách lô đất trên hầu hết các bất động sản nhà riêng \"theo quyền\" — nghĩa là việc phê duyệt là tự động nếu bạn đáp ứng các quy định. Tiểu bang cũng giao cho mỗi vùng một mục tiêu nhà ở, gọi là Regional Housing Needs Assessment (RHNA). Khi kế hoạch nhà ở địa phương của một thành phố không phù hợp với luật, một quy tắc tiểu bang gọi là Housing Accountability Act giới hạn quyền lực của nó trong việc từ chối nhà ở — và [AB 1893](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB1893) (2024) đã tạo sức răn đe thực sự cho \"Builder's Remedy\", vốn cho phép các nhà phát triển vượt qua quy hoạch địa phương ở những thành phố không đạt mục tiêu nhà ở.",
        "arguments_for_change": "Những người ủng hộ việc tiểu bang kiểm soát mạnh hơn cho rằng chính quyền địa phương đã gây ra một cuộc thiếu hụt nhà ở kéo dài hàng thập kỷ. Văn phòng Phân tích Lập pháp (LAO) truy nguyên giá thuê và giá nhà cao nhất nước của tiểu bang trực tiếp về việc xây quá ít gần các trung tâm việc làm ven biển. Những người ủng hộ lập luận rằng các thành phố nhượng bộ áp lực của chủ nhà để ngăn cản nhà ở mới, nên chỉ những mệnh lệnh cứng rắn của tiểu bang — phê duyệt \"theo quyền\" tự động, các mục tiêu có thể cưỡng chế, và Builder's Remedy — mới có thể thu hẹp khoảng cách. Họ chỉ ra [SB 9](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB9) như bằng chứng rằng các công cụ tự nguyện thất bại khi các thành phố vẫn còn dư địa để trì hoãn.",
        "arguments_against_change": "Những người phản đối cho rằng các quyết định sử dụng đất thuộc về quan chức địa phương, những người hiểu rõ khu phố của mình — đường sá, nguy cơ cháy, giao thông, đặc trưng của nơi chốn. Họ lập luận rằng các mệnh lệnh đồng nhất, áp dụng cho toàn tiểu bang sẽ bác bỏ các kế hoạch mà cử tri địa phương đã thông qua, và rằng các dự án \"theo quyền\" được làm nhanh có thể bỏ qua đánh giá môi trường và ý kiến công chúng. Họ cũng cho rằng nguyên nhân thực sự của tình trạng thiếu hụt là chi phí xây dựng cao, lãi suất và nguồn lao động khan hiếm — không phải quy hoạch — nên việc bác bỏ quyền của các thành phố làm tăng xung đột mà không tạo ra nhà ở giá phải chăng một cách đáng tin cậy.",
        "comparison": "California đã đi xa hơn gần như bất kỳ tiểu bang nào trong việc bác bỏ quy hoạch địa phương. Một vài tiểu bang khác cũng đã đi theo hướng này — Oregon đã chấm dứt quy hoạch chỉ-nhà-riêng trên toàn tiểu bang vào năm 2019, còn Montana và Washington đã thông qua các luật diện rộng vào năm 2023 cho phép xây thêm nhà ở trên các lô đất hiện có. Nhưng nhiều tiểu bang vẫn để các quyết định sử dụng đất gần như hoàn toàn cho các thành phố và thị trấn.",
        "note_on_options": "Đây là một trục đơn đo lường tiểu bang nên thúc ép mạnh đến mức nào để mở rộng nguồn cung nhà ở theo giá thị trường — từ việc tích cực phủ quyết quy hoạch địa phương (lựa chọn 1) xuống đến việc ưu tiên trợ giá và bảo vệ người thuê hơn nguồn cung do tiểu bang cưỡng buộc (lựa chọn 5). Các ứng cử viên có thể đạt đến đầu thấp vì những lý do khác nhau: một số bảo vệ quyền tự chủ địa phương và các khu nhà riêng (lựa chọn 4), trong khi những người khác ưu tiên nhà ở công/trợ giá hơn xây dựng theo giá thị trường (lựa chọn 5). Một lập trường ở đây cho thấy ứng cử viên sẽ dùng quyền lực tiểu bang đến mức nào để bác bỏ quy hoạch địa phương nhằm tăng nguồn cung.",
        "key_facts": [
          "Chu kỳ RHNA hiện tại (2023–2031) đòi hỏi khoảng 2,5 triệu căn nhà mới trên toàn tiểu bang — trong đó khoảng 1 triệu căn có giá phải chăng cho các gia đình thu nhập thấp.",
          "[SB 9](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB9) (2021) được sử dụng ít hơn nhiều so với dự kiến. Trong năm đầu tiên, Los Angeles nhận được 211 đơn xin xây căn hộ, San Francisco 25, San Diego 7, và San José chỉ 1 — dù một phân tích năm 2021 của Terner Center đã ước tính khoảng 700.000 căn có thể trở nên khả thi mới.",
          "Các thành phố không tuân thủ luật kế hoạch nhà ở của tiểu bang có thể bị phạt từ 10.000 đến 600.000 đô la một tháng.",
          "Quy trình nhanh [SB 35](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB35) / [SB 423](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB423) chỉ có hiệu lực ở nơi một thành phố không đạt mục tiêu nhà ở hoặc không có kế hoạch nhà ở được tiểu bang phê duyệt. SB 423 cũng bổ sung các yêu cầu về tiền lương và công nhân lành nghề tăng theo quy mô dự án.",
          "Surplus Land Act yêu cầu các cơ quan địa phương ưu tiên nhà ở giá phải chăng hàng đầu khi họ bán đi đất công không còn cần dùng."
        ]
      }
    },
    "sanctuary": {
      "name": "Bảo trợ và cưỡng chế nhập cư",
      "short_description": "California nên hợp tác đến mức nào với cơ quan cưỡng chế nhập cư liên bang (ICE)?",
      "stance_scale": {
        "1": "Hợp tác đầy đủ với ICE — bãi bỏ luật bảo trợ của tiểu bang",
        "2": "Giữ luật bảo trợ nhưng cho phép thêm ngoại lệ",
        "3": "Giữ nguyên luật bảo trợ hiện hành",
        "4": "Tăng cường bảo vệ (ví dụ, tài trợ bào chữa pháp lý cho người nhập cư)",
        "5": "Đi xa hơn nhiều — bổ sung các biện pháp bảo vệ mới của tiểu bang, như cấp căn cước tiểu bang cho mọi người"
      },
      "voter_guide": {
        "explainer": "Một \"luật bảo trợ\" giới hạn mức độ cảnh sát tiểu bang và địa phương có thể hỗ trợ các nhân viên nhập cư liên bang. Luật chính của California là [SB 54](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB54), California Values Act, được thông qua năm 2017.",
        "current_policy": "Nền tảng của California là California Values Act, [SB 54](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB54) (2017), có hiệu lực từ ngày 1 tháng 1 năm 2018. Luật quy định các cơ quan tiểu bang và địa phương không thể dùng nhân sự hay tiền của họ để thực hiện cưỡng chế nhập cư dân sự của liên bang. Điều đó nghĩa là họ nhìn chung không thể giam giữ ai đó trong tù chỉ vì ICE yêu cầu (gọi là \"detainer\" hay yêu cầu giữ lại), không thể bắt người dựa trên các lệnh nhập cư dân sự, và không thể ký các thỏa thuận \"287(g)\" — các thỏa thuận cho phép cảnh sát địa phương hành xử như nhân viên nhập cư. Có những ngoại lệ: nhà tù có thể báo cho ICE khi ai đó sắp được thả, hoặc giao họ cho ICE, nếu người đó đã bị kết án về một số trọng tội nghiêm trọng hoặc bạo lực được liệt kê trong luật tiểu bang. Một luật riêng, TRUTH Act ([AB 2792](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201520160AB2792), 2016), quy định người đang bị giam phải được thông báo về, và đồng ý với, bất kỳ cuộc phỏng vấn nào của ICE, và rằng chính quyền địa phương phải tổ chức một cuộc họp công khai nếu họ cho ICE quyền tiếp cận. Các nhà tù tiểu bang (CDCR) chỉ được SB 54 điều chỉnh một phần và tuân theo các quy tắc thông báo riêng của họ.",
        "arguments_for_change": "Những người muốn tăng cường bảo vệ bảo trợ lập luận rằng giữ cảnh sát địa phương ra ngoài việc cưỡng chế nhập cư sẽ xây dựng lòng tin, để các nạn nhân và nhân chứng tội phạm là người nhập cư cảm thấy an toàn khi trình báo tội phạm. Họ lưu ý rằng các detainer của ICE thường không được thẩm phán ký, điều này làm dấy lên những lo ngại về hiến pháp và có thể khiến các quận đối mặt với kiện tụng. Và họ chỉ ra rằng các ngoại lệ trọng tội hiện hành đã cho phép hợp tác trong những vụ nghiêm trọng nhất — nên các bước xa hơn (như giới hạn việc chia sẻ dữ liệu, hoặc giữ ICE ra ngoài tòa án, trường học và bệnh viện) sẽ chỉ ảnh hưởng đến việc cưỡng chế dân sự.",
        "arguments_against_change": "Những người muốn hợp tác đầy đủ hơn với ICE lập luận rằng việc thả những người ICE đã đánh dấu — bao gồm một số người có tiền án không thuộc các ngoại lệ — có thể đưa những người mà giới chức liên bang cho là có thể bị trục xuất trở lại cộng đồng. Họ cho rằng việc bàn giao có kế hoạch từ nhà tù an toàn hơn cho cảnh sát và công chúng so với việc ICE bắt người ngoài đường, và rằng cưỡng chế nhập cư là việc của liên bang mà tiểu bang không nên cản trở. Theo quan điểm của họ, từ chối các yêu cầu của ICE làm tổn hại an toàn công cộng và sự phối hợp liên bang-tiểu bang.",
        "comparison": "California nằm trong số các tiểu bang giới hạn nhiều nhất việc hợp tác của địa phương với các nhân viên nhập cư, cùng với Illinois (với TRUST Act) và một số tiểu bang khác. Ngược lại, các tiểu bang như Texas (với luật SB 4 của họ) và Florida yêu cầu các cơ quan địa phương hợp tác với ICE và cấm các chính sách bảo trợ. Chương trình 287(g) của liên bang đã có thỏa thuận với khoảng 1.600 cơ quan trên toàn quốc tính đến năm 2026 — gần như không có ở California.",
        "note_on_options": "Vì SB 54 là luật thành văn và đã được tòa án giữ nguyên, phạm vi thực tế cho một thống đốc trải từ việc cưỡng chế/hướng dẫn nhằm tối đa hóa các ngoại lệ trọng tội (đầu thấp) đến việc ký các dự luật thu hẹp việc chia sẻ dữ liệu hoặc quyền tiếp cận cơ sở của ICE (đầu cao). Bãi bỏ toàn bộ (thấp hơn nhiều so với lập trường 1) hoặc xóa bỏ hoàn toàn mọi hợp tác (cao hơn lập trường 5) sẽ đòi hỏi hành động lập pháp mà một thống đốc không thể tự mình làm.",
        "key_facts": [
          "[SB 54](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB54) có hiệu lực từ ngày 1 tháng 1 năm 2018. Chính quyền Trump đầu tiên đã kiện để chặn nó và thua: vụ kiện bị bác, tòa phúc thẩm khu vực Chín đồng tình, và Tối cao Pháp viện Hoa Kỳ từ chối thụ lý — nên luật vẫn còn hiệu lực.",
          "Các thỏa thuận 287(g) (vốn ủy quyền cho cảnh sát địa phương thực hiện cưỡng chế nhập cư) bị cấm đối với các cơ quan California theo SB 54. Năm 2025, một nỗ lực của cảnh sát trưởng Hạt Shasta đã bị tạm dừng vì nó xung đột với luật tiểu bang.",
          "Các ngoại lệ của SB 54 cho phép các cơ quan thông báo hoặc giao ai đó cho ICE nếu người đó đã bị kết án về các trọng tội nghiêm trọng hoặc bạo lực cụ thể — không áp dụng cho những người mà vấn đề duy nhất là tình trạng nhập cư của họ.",
          "TRUTH Act (2016) yêu cầu mọi người phải được thông báo rằng họ có thể từ chối một cuộc phỏng vấn của ICE trong tù, và yêu cầu một cuộc họp cộng đồng công khai khi các cơ quan địa phương cho ICE quyền tiếp cận.",
          "Các quy tắc bảo trợ phần lớn do luật tiểu bang ấn định, nên các công cụ chính của một thống đốc là hướng dẫn cưỡng chế, cách tiếp cận kiện tụng của tổng chưởng lý, các quy tắc nhà tù, và việc ký hoặc phủ quyết các dự luật mới — không phải bãi bỏ luật trực tiếp."
        ]
      }
    },
    "homelessness": {
      "name": "Ứng phó với tình trạng vô gia cư",
      "short_description": "California nên xử lý tình trạng vô gia cư như thế nào — dựa nhiều hơn vào cưỡng chế, hay vào nhà ở và dịch vụ?",
      "stance_scale": {
        "1": "Dọn dẹp các khu lều trại và mở rộng điều trị theo lệnh tòa làm công cụ chính",
        "2": "Dẫn dắt bằng cưỡng chế, nhưng cung cấp dịch vụ đồng thời",
        "3": "Cân bằng cả hai — chỉ dọn lều trại khi có nơi tạm trú hoặc dịch vụ",
        "4": "Dẫn dắt bằng ưu tiên nhà ở; dùng cưỡng chế hạn chế",
        "5": "Đầu tư mạnh vào nhà ở và dịch vụ; chỉ dùng cưỡng chế như biện pháp cuối cùng"
      },
      "voter_guide": {
        "explainer": "\"Housing First\" (Ưu tiên nhà ở) nghĩa là trao cho ai đó một nơi ở lâu dài ngay lập tức, mà không yêu cầu trước rằng họ phải cai nghiện hay chấp nhận điều trị — ý tưởng là việc đối phó với nghiện ngập hoặc bệnh tâm thần sẽ dễ hơn khi bạn đã có một mái nhà. \"Conservatorship\" (quyền giám hộ) là một lệnh tòa trao cho một người hoặc cơ quan khác quyền quyết định thay cho ai đó mà thẩm phán xác định không thể tự chăm sóc bản thân. \"CARE Court\" là một loại tòa dân sự mới hơn có thể ra lệnh một kế hoạch điều trị cho những người mắc bệnh tâm thần nghiêm trọng không được điều trị. \"Điểm kiểm đếm thời điểm\" (point-in-time count, PIT count) là một cuộc đếm trong một đêm mỗi tháng Giêng về số người vô gia cư.",
        "current_policy": "Quy tắc chính thức của California là \"Housing First\": các chương trình do tiểu bang tài trợ phải cung cấp cho mọi người nhà ở lâu dài ngay lập tức, mà không yêu cầu trước rằng họ phải cai nghiện hay chấp nhận điều trị. Điều này được ghi vào luật tiểu bang (Welfare & Institutions Code §8255). Bên cạnh đó, tiểu bang gần đây đã bổ sung các lựa chọn cưỡng chế và điều trị. CARE Act ([SB 1338](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1338), được thông qua năm 2022) thiết lập các tòa dân sự có thể ra lệnh một kế hoạch điều trị cho những người mắc các rối loạn dạng tâm thần phân liệt không được điều trị, và mọi quận đều đã vận hành nó vào tháng 12 năm 2024. [Proposition 1](https://calmatters.org/california-voter-guide-2024/prop-1-mental-health/) (tháng 3 năm 2024) đã phê duyệt một trái phiếu 6,4 tỷ đô la cho nhà ở và điều trị sức khỏe tâm thần và chuyển hướng một số quỹ sức khỏe tâm thần hiện có. Sau phán quyết [Grants Pass v. Johnson](https://calmatters.org/housing/2024/06/california-homeless-camps-grants-pass-ruling/) của Tối cao Pháp viện Hoa Kỳ (tháng 6 năm 2024), Thống đốc Newsom đã yêu cầu các cơ quan tiểu bang và các thành phố dọn dẹp các khu lều trại và chia sẻ một mẫu sắc lệnh chống cắm trại mà họ có thể áp dụng.",
        "arguments_for_change": "Những người ủng hộ cách tiếp cận dẫn dắt bằng dịch vụ, Housing First (đầu cao của thang đo) cho rằng một mái nhà ổn định là điều giúp người ta có thể giải quyết nghiện ngập và bệnh tâm thần — chứ không phải một phần thưởng phải kiếm được sau đó. Họ chỉ ra các nghiên cứu cho thấy Housing First giúp người ta giữ được nhà ở. Họ lập luận rằng việc dọn lều trại chỉ di chuyển người ta đi nơi khác mà không thu hẹp dân số, và để lại cho họ những tiền án khiến việc tìm nhà ở càng khó hơn. Và họ cảnh báo rằng việc mở rộng điều trị cưỡng bức hoặc quyền giám hộ có nguy cơ ép buộc những người chưa từng được cung cấp đủ sự giúp đỡ tự nguyện trước đó.",
        "arguments_against_change": "Những người ủng hộ cưỡng chế nhiều hơn, các mệnh lệnh điều trị và quyền giám hộ (đầu thấp) cho rằng California đã chi hơn 20 tỷ đô la cho tình trạng vô gia cư trong những năm gần đây trong khi tỷ lệ người sống ngoài trời vẫn gần cao nhất nước. Họ lập luận rằng riêng nhà ở không hiệu quả với nhiều người trên đường phố mắc bệnh tâm thần nghiêm trọng hoặc nghiện ngập không được điều trị, rằng các khu lều trại lộ thiên tạo ra những vấn đề thực sự về sức khỏe và an toàn, và rằng phán quyết Grants Pass giờ đây cho phép tiểu bang kết hợp việc đề nghị nơi tạm trú và điều trị với hậu quả nếu ai đó từ chối.",
        "comparison": "Dân số vô gia cư của California tăng khoảng 3% trong năm 2024 — nhỏ hơn nhiều so với mức tăng khoảng 18% của tình trạng vô gia cư trên toàn quốc. Nhưng tiểu bang vẫn có nhiều người vô gia cư nhất so với bất kỳ tiểu bang nào, tỷ trọng lớn nhất trong tổng số của cả nước, và phần lớn nhất ngủ ngoài trời. Hầu hết các tiểu bang lớn khác đưa được một tỷ trọng cư dân vô gia cư của họ vào nơi tạm trú lớn hơn nhiều.",
        "note_on_options": "Thang đo này trải từ cưỡng chế-và-điều-trị-bắt-buộc (1) đến Housing First thuần túy không cưỡng chế (5). Nhiều ứng cử viên ủng hộ các kết hợp — ví dụ, mở rộng giường điều trị cộng với nhà ở tự nguyện — nằm ở giữa; các điểm cuối đại diện cho những câu hỏi gây tranh cãi về việc có nên đặt điều kiện điều trị cho nhà ở và có nên dùng cưỡng chế cấm cắm trại.",
        "key_facts": [
          "187.084 người California được đếm là vô gia cư trong cuộc kiểm đếm một đêm tháng 1 năm 2024, tăng 3,1% so với 181.399 người năm trước (HUD).",
          "California có khoảng 25% dân số vô gia cư của cả nước và tỷ trọng cao nhất sống ngoài trời — khoảng hai phần ba ngủ trên đường phố thay vì trong nơi tạm trú.",
          "[Grants Pass v. Johnson](https://calmatters.org/housing/2024/06/california-homeless-camps-grants-pass-ruling/) (Tối cao Pháp viện, 6-3, tháng 6 năm 2024) phán quyết rằng việc cấm cắm trại nơi công cộng không vi phạm Tu chính án thứ Tám. Điều đó đã loại bỏ rào cản pháp lý trước đó đối với việc phạt hoặc bắt người vì cắm trại ngay cả khi không có nơi tạm trú.",
          "[Proposition 1](https://calmatters.org/california-voter-guide-2024/prop-1-mental-health/) (tháng 3 năm 2024) đã phê duyệt một trái phiếu 6,4 tỷ đô la cho nhà ở và điều trị sức khỏe hành vi, bao gồm khoảng 4,4 tỷ đô la trợ cấp để xây khoảng 6.800 giường điều trị nội trú, cộng với nhà ở hỗ trợ lâu dài cho các cựu chiến binh vô gia cư và những người khác.",
          "Đến đầu năm 2026, hơn 3.800 đơn yêu cầu theo CARE Act đã được nộp kể từ khi chương trình triển khai trên toàn tiểu bang vào tháng 12 năm 2024, và tiểu bang đã bổ sung 291 triệu đô la vào tháng 3 năm 2026 cho các dịch vụ và nhà ở liên quan đến CARE."
        ]
      }
    },
    "gun_policy": {
      "name": "Chính sách súng",
      "short_description": "Luật súng của California nên được nới lỏng, giữ nguyên, hay siết chặt hơn?",
      "stance_scale": {
        "1": "Nới lỏng đáng kể (mang súng giấu kín dễ hơn, cưỡng chế nhẹ hơn)",
        "2": "Nới lỏng một số quy định cụ thể",
        "3": "Giữ nguyên luật súng hiện hành",
        "4": "Bảo vệ các luật hiện hành và bịt các kẽ hở",
        "5": "Bổ sung các hạn chế mới lớn (đăng ký súng, cấm thêm)"
      },
      "voter_guide": {
        "current_policy": "California có một số luật súng nghiêm ngặt nhất nước. Roberti-Roos Assault Weapons Control Act (1989) và các luật sau đó cấm nhiều loại \"vũ khí tấn công\" bán tự động, và tiểu bang giới hạn băng đạn ở mức 10 viên. Năm 2022, vụ NYSRPA v. Bruen của Tối cao Pháp viện Hoa Kỳ đã bác bỏ các quy định cho phép quan chức quyết định ai có \"lý do đủ chính đáng\" để mang súng giấu kín. Để đáp lại, [SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB2) (2023, có hiệu lực từ ngày 1 tháng 1 năm 2024) đã chuyển California sang giấy phép \"phải cấp\" — nghĩa là bất kỳ ai đủ điều kiện đều được cấp — đồng thời bổ sung yêu cầu huấn luyện 16 giờ và một danh sách dài các \"nơi nhạy cảm\" nơi súng bị cấm ngay cả khi có giấy phép. Một luật riêng, [AB 28](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB28) (2023, có hiệu lực năm 2024), đã bổ sung một khoản thuế tiểu bang 11% trên việc bán súng và đạn để tài trợ cho các chương trình phòng chống bạo lực và an toàn trường học.",
        "arguments_for_change": "Những người muốn có thêm hạn chế chỉ ra rằng các tiểu bang có luật súng mạnh hơn thường ghi nhận tỷ lệ tử vong do súng thấp hơn. Họ lập luận rằng giới hạn về vũ khí tấn công và băng đạn, danh sách nơi nhạy cảm của SB 2, và khoản thuế AB 28 cắt giảm sự sẵn có của súng trong các bối cảnh rủi ro đồng thời chi trả cho việc phòng ngừa. Họ cho rằng bịt các kẽ hở còn lại — và bảo vệ các luật hiện hành tại tòa — cứu được sinh mạng, và rằng Tu chính án thứ Hai vẫn cho phép quy định hợp lý.",
        "arguments_against_change": "Những người phản đối thêm hạn chế lập luận rằng California đã có các quy định nghiêm ngặt nhất nước nhưng vẫn có tội phạm súng, nên lợi ích từ các giới hạn mới là nhỏ. Họ cho rằng các phán quyết của tòa sau Bruen gợi ý rằng một số luật của California có thể vi hiến và mời gọi các vụ kiện tốn kém. Họ lập luận rằng các lệnh cấm nơi nhạy cảm diện rộng và một khoản thuế bán hàng tạo gánh nặng cho những chủ súng tuân thủ luật và làm cho quyền mang súng phụ thuộc vào nơi bạn đang ở. Và họ cho rằng việc cưỡng chế nên nhắm tốt hơn vào buôn bán bất hợp pháp và những người vốn đã bị cấm sở hữu súng hơn là vào những người mua hợp pháp.",
        "comparison": "Các bảng xếp hạng độc lập và của các tổ chức vận động liên tục xếp luật súng của California là nghiêm ngặt nhất, hoặc gần như nghiêm ngặt nhất, cả nước — cùng với Massachusetts, New York, Illinois và Connecticut. Ngược lại, các tiểu bang \"mang súng theo hiến pháp\" như Texas, Arizona và Idaho không đòi hỏi giấy phép để mang súng giấu kín và có ít giới hạn hơn nhiều về băng đạn và loại súng trường.",
        "note_on_options": "Phần lớn luật súng của California được định hình bởi kiện tụng tại Khu vực Chín và Tối cao Pháp viện, nên phạm vi thực tế của một thống đốc trải từ việc bảo vệ hoặc thu hẹp các quy định hiện hành theo các phán quyết của tòa (đầu thấp) đến việc ký các hạn chế mới và bảo vệ chúng mạnh mẽ (đầu cao). 'Đảo ngược' (lập trường 1) chủ yếu sẽ có nghĩa là từ chối bảo vệ hoặc ký các văn bản bãi bỏ, cả hai đều bị Cơ quan Lập pháp ràng buộc.",
        "key_facts": [
          "California đã cấm \"vũ khí tấn công\" kể từ Roberti-Roos Act năm 1989 và giới hạn băng đạn ở mức 10 viên.",
          "[SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB2) (có hiệu lực từ ngày 1 tháng 1 năm 2024) giữ giấy phép \"phải cấp\" sau phán quyết Bruen nhưng nêu tên khoảng 26 loại \"nơi nhạy cảm\". Năm 2025 tòa phúc thẩm Khu vực Chín đã giữ nguyên một số lệnh cấm địa điểm đó và chặn những lệnh khác trong khi vụ kiện tiếp tục.",
          "Khoản thuế 11% của [AB 28](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB28) trên súng và đạn (có hiệu lực năm 2024) được dự kiến sẽ thu được khoảng 160 triệu đô la một năm cho các chương trình phòng chống bạo lực và an toàn trường học. Nó đang đối mặt với một thách thức pháp lý chưa được giải quyết.",
          "Việc đóng dấu vi mô và các quy định khác về phía nhà sản xuất (chẳng hạn [SB 452](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB452), 2023) vẫn còn trên sổ luật, dù một số phần chỉ có hiệu lực nếu công nghệ được xác định là khả thi.",
          "Một số luật súng của California đang trong quá trình kiện tụng tích cực tại Khu vực Chín theo phép thử Bruen — vốn hỏi liệu một luật có phù hợp với \"lịch sử và truyền thống\" quy định súng của đất nước hay không — nên những quy định nào thực sự có thể được cưỡng chế sẽ thay đổi khi tòa ra phán quyết."
        ]
      }
    },
    "natgas_bridge": {
      "name": "Khí tự nhiên làm nhiên liệu chuyển tiếp",
      "short_description": "Khí tự nhiên nên đóng vai trò gì khi California chuyển sang năng lượng sạch hơn?",
      "stance_scale": {
        "1": "Mở rộng việc sử dụng và hạ tầng khí tự nhiên",
        "2": "Giữ khí tự nhiên hiện thời; loại bỏ dần một cách chậm rãi",
        "3": "Không có lộ trình cứng — để chi phí và độ tin cậy của lưới điện quyết định",
        "4": "Loại bỏ khí khỏi sản xuất điện vào giữa thập niên 2030",
        "5": "Loại bỏ khí nhanh chóng khỏi nhà ở, doanh nghiệp và nhà máy điện"
      },
      "voter_guide": {
        "current_policy": "California vẫn lấy khoảng 40% điện sản xuất trong tiểu bang từ khí tự nhiên, và khí sưởi ấm cho phần lớn trong khoảng 14 triệu căn nhà của tiểu bang. Nhưng tiểu bang đang lái các tòa nhà mới hướng tới điện thay thế. Năm 2022, California Air Resources Board (CARB — cơ quan chất lượng không khí của tiểu bang) đặt ra một mục tiêu: đến năm 2030, mọi lò sưởi và máy nước nóng mới được bán cho nhà ở phải là loại không phát thải, với các tòa nhà thương mại theo sau vào năm 2035. CARB vẫn đang soạn thảo quy định thực tế để thực hiện điều đó. Cơ quan này đã thu hẹp quy định lại vào tháng 12 năm 2025, và một cuộc bỏ phiếu của hội đồng dự kiến vào năm 2026, nhưng chưa có gì là cuối cùng. Trong khi đó, hàng chục thành phố đã cấm khí trong công trình xây dựng mới sau khi Berkeley làm vậy vào năm 2019 — cho đến khi một phán quyết của tòa phúc thẩm liên bang năm 2023 (CRA v. Berkeley) cho rằng luật thiết bị liên bang vượt trên các lệnh cấm địa phương đó. Vì vậy tiểu bang đã chuyển sang sử dụng quy chuẩn xây dựng và tiêu chuẩn phát thải thay thế.",
        "arguments_for_change": "Những người ủng hộ việc rời bỏ khí nhanh hơn cho rằng các tòa nhà là một nguồn lớn của khí nhà kính và ô nhiễm gây khói mù, và rằng đốt khí trong nhà làm dấy lên những lo ngại về sức khỏe. Họ lập luận rằng việc lắp đặt đường ống và đầu nối khí mới là rủi ro vì thiết bị đó có thể trở nên vô giá trị khi lưới điện chuyển sang dùng điện. Họ chỉ ra rằng máy bơm nhiệt giờ đã vượt trội hơn lò sưởi khí trong hầu hết các khí hậu của California. Và họ cảnh báo rằng khi ít khách hàng dùng khí hơn, chi phí cố định của việc bảo trì mạng lưới đường ống sẽ đổ lên những người còn lại — thường là các hộ thu nhập thấp — nên một sự chuyển đổi có kế hoạch, trật tự sẽ rẻ hơn một sự chuyển đổi hỗn loạn.",
        "arguments_against_change": "Những người ủng hộ giữ khí làm nhiên liệu chuyển tiếp cho rằng khí có thể được bật lên tức thì để dự phòng cho điện mặt trời và gió khi chúng không khả dụng, giúp ngăn mất điện vào lúc cao điểm. Họ lập luận rằng việc buộc mọi người chuyển sang dùng điện làm tăng chi phí trả trước cho các gia đình và gây áp lực lên một lưới điện vốn đã đắt đỏ. Với giá điện của California cao thứ nhì cả nước, họ cho rằng khoản tiền tiết kiệm được nhờ chạy máy bơm nhiệt là không chắc chắn. Và họ cảnh báo rằng các mệnh lệnh đột ngột vượt quá khả năng nâng cấp bảng điện và lực lượng lao động được đào tạo cần thiết để lắp đặt hàng triệu máy bơm nhiệt.",
        "comparison": "California là một trong những tiểu bang quyết liệt nhất về việc chuyển các tòa nhà ra khỏi khí, cùng với New York (vốn cấm khí trong hầu hết các tòa nhà mới bắt đầu từ năm 2026) và Washington. Hầu hết các tiểu bang đã đi theo hướng ngược lại: hơn 20 tiểu bang đã thông qua luật cấm các thành phố hạn chế đầu nối khí tự nhiên.",
        "note_on_options": "Thang đo này đo tốc độ rời bỏ khí, không phải việc có nên khử các-bon hay không — gần như tất cả các ứng cử viên đều chấp nhận mục tiêu trung hòa các-bon dài hạn của tiểu bang. Bất đồng là về lộ trình và các mệnh lệnh (cấm thiết bị, cấm đầu nối, ngưng vận hành hệ thống khí) so với các ưu đãi và việc áp dụng tự nguyện.",
        "key_facts": [
          "Khoảng 40% điện của California đến từ khí tự nhiên, và khí sưởi ấm cho phần lớn nhà ở và nước của tiểu bang.",
          "Kế hoạch năm 2022 của CARB nhắm tới việc 100% lò sưởi và máy nước nóng nhà ở mới được bán ra là loại không phát thải vào năm 2030 — nhưng quy định để cưỡng chế nó chưa hoàn thành, và đã bị thu hẹp lại vào tháng 12 năm 2025.",
          "Một phán quyết của tòa phúc thẩm liên bang năm 2023 (CRA v. Berkeley) cho rằng các lệnh cấm địa phương về đầu nối khí trong các tòa nhà mới bị vượt trên bởi luật thiết bị liên bang.",
          "California cung cấp khoản hoàn tiền cho máy bơm nhiệt (thiết bị sưởi-và-làm-mát bằng điện) thông qua TECH Clean California và các chương trình của công ty điện lực, nhắm tới 6 triệu thiết bị được lắp đặt vào năm 2030.",
          "Aliso Canyon — địa điểm chứa khí của vụ rò rỉ khí mê-tan SoCalGas năm 2015–16, vụ lớn nhất trong lịch sử Hoa Kỳ — vẫn đang vận hành. Một kế hoạch đóng cửa trước đây vào năm 2027 giờ đây không được dự kiến cho đến sớm nhất là cuối thập niên 2030."
        ]
      }
    },
    "prop13_commercial": {
      "name": "Thuế tài sản thương mại (Prop 13 split-roll)",
      "short_description": "California giới hạn thuế tài sản dựa trên giá mua của bất động sản (Prop 13). Tài sản kinh doanh và thương mại có nên thay vào đó bị đánh thuế theo giá trị thị trường ngày nay không?",
      "stance_scale": {
        "1": "Củng cố mức trần thuế cho tài sản thương mại",
        "2": "Giữ mức trần thuế hiện hành cho tài sản thương mại",
        "3": "Chỉ thay đổi đối với các tài sản thương mại lớn nhất",
        "4": "Dần dần đánh thuế tài sản thương mại theo giá trị thị trường",
        "5": "Đánh thuế hoàn toàn tài sản thương mại theo giá trị thị trường"
      },
      "voter_guide": {
        "explainer": "Proposition 13, được cử tri thông qua năm 1978, ấn định cách California đánh thuế tài sản. Thuế tài sản của bạn bị giới hạn ở mức 1% của số tiền bạn đã trả cho bất động sản, và giá trị chịu thuế chỉ có thể tăng khoảng 2% một năm — bất kể giá trị thị trường của bất động sản tăng bao nhiêu. Hóa đơn đầy đủ chỉ phải nộp khi bất động sản được bán và được định giá lại theo giá mới. Điều này áp dụng cho nhà ở, cửa hàng, văn phòng và nhà máy như nhau. \"Split-roll\" nghĩa là đánh thuế tài sản kinh doanh khác với nhà ở; California hiện không làm điều này.",
        "current_policy": "Theo [Prop 13](https://lao.ca.gov/Publications/Report/3497) (1978), tất cả tài sản ở California — nhà ở, cửa hàng, văn phòng và nhà máy — bị đánh thuế ở mức 1% của giá mua, và giá trị chịu thuế không thể tăng quá 2% một năm cho đến khi bất động sản được bán và định giá lại. Tài sản kinh doanh không được đối xử riêng biệt (\"split-roll\"). [Prop 15](https://lao.ca.gov/BallotAnalysis/Proposition?number=15&year=2020) (2020) lẽ ra đã thay đổi điều đó đối với hầu hết tài sản thương mại và công nghiệp, đánh thuế theo giá trị thị trường hiện tại trong khi giữ nhà ở theo các quy định của Prop 13. Nó đã thất bại, 52% chống 48%.",
        "arguments_for_change": "Những người ủng hộ split-roll thương mại cho rằng quy tắc giá-mua của [Prop 13](https://lao.ca.gov/Publications/Report/3497) cho phép tài sản kinh doanh nắm giữ lâu dài — tòa nhà văn phòng, trung tâm thương mại, các khu công nghiệp lớn — bị đánh thuế trên những giá trị đã lỗi thời hàng thập kỷ. Điều đó chuyển nhiều gánh nặng thuế hơn sang các chủ mới và chủ nhà. Họ chỉ ra ước tính 6,5–11,5 tỷ đô la của LAO như nguồn tiền ổn định cho trường học và dịch vụ địa phương, và lập luận rằng đánh thuế tài sản kinh doanh theo giá trị thị trường — trong khi vẫn bảo vệ chủ nhà và doanh nghiệp nhỏ — sẽ sửa chữa sự mất cân bằng mà không động đến các biện pháp bảo vệ nhà ở.",
        "arguments_against_change": "Những người phản đối cho rằng thuế cao hơn trên tài sản thương mại sẽ được chuyển xuống cho người thuê — doanh nghiệp nhỏ, nhà hàng, người thuê nhà — và cuối cùng là người mua hàng, làm tăng giá trên toàn nền kinh tế. Họ cảnh báo rằng việc định giá lại bất động sản theo giá trị thị trường hằng năm là phức tạp và mời gọi kiện tụng, rằng nó sẽ tác động mạnh nhất đến doanh nghiệp trong các đợt suy thoái khi giá trị và giá thuê bấp bênh, và rằng việc làm suy yếu Prop 13 đối với bất kỳ loại tài sản nào sẽ mở đường cho việc gặm nhấm các biện pháp bảo vệ nhà ở về sau — phá vỡ sự ổn định mà cử tri đã bỏ phiếu ủng hộ năm 1978.",
        "comparison": "California là một ngoại lệ khi đánh thuế tài sản kinh doanh và tài sản nhà ở theo cùng một cách — khóa cả hai vào giá mua. Hầu hết các tiểu bang định giá lại toàn bộ tài sản hướng về giá trị thị trường hiện tại theo định kỳ. Kết quả là, một tòa nhà thương mại ở California nắm giữ hàng thập kỷ có thể bị đánh thuế thấp hơn nhiều so với một tòa nhà gần như giống hệt vừa được bán gần đây.",
        "note_on_options": "Thang đo là một dải tăng dần rõ ràng: lựa chọn 1 củng cố các biện pháp bảo vệ Prop 13 cho tài sản thương mại, lựa chọn 3 là một cải cách có mục tiêu chỉ áp dụng cho các tài sản rất lớn (mô hình miễn trừ cho doanh nghiệp nhỏ từ Prop 15), và lựa chọn 5 là split-roll theo giá trị thị trường đầy đủ. Các biện pháp bảo vệ Prop 13 đối với nhà ở không nằm trong vấn đề ở đây — mọi lựa chọn đều giữ chúng nguyên vẹn.",
        "key_facts": [
          "[Prop 13](https://lao.ca.gov/Publications/Report/3497) giới hạn thuế suất tài sản ở mức 1% của giá mua và giới hạn mức tăng hằng năm của giá trị chịu thuế ở 2% — cho đến khi bất động sản đổi chủ và được định giá lại.",
          "LAO ước tính [Prop 15](https://lao.ca.gov/BallotAnalysis/Proposition?number=15&year=2020) lẽ ra đã thu được từ 6,5 tỷ đến 11,5 tỷ đô la một năm cho chính quyền địa phương và trường học một khi được triển khai đầy đủ (khoảng năm 2025).",
          "Trong số tiền đó, khoảng 60% lẽ ra đã chuyển cho các thành phố, quận và khu vực đặc biệt, và 40% cho trường học và cao đẳng cộng đồng (LAO).",
          "Prop 15 hoàn toàn loại trừ nhà ở. Nó cũng miễn trừ cho các doanh nghiệp nhỏ có 3 triệu đô la trở xuống tài sản thương mại ở California, cộng với tối đa 500.000 đô la thiết bị kinh doanh.",
          "Prop 15 đã thất bại trên toàn tiểu bang, 51,9% chống 48,1%, vào tháng 11 năm 2020."
        ]
      }
    },
    "healthcare_funding": {
      "name": "Cơ chế tài trợ chăm sóc sức khỏe",
      "short_description": "California có nên tiến tới một hệ thống y tế đơn-người-chi-trả do tiểu bang điều hành (tiểu bang bao phủ mọi người thay vì bảo hiểm tư) — và nếu vậy, sẽ chi trả cho nó bằng cách nào?",
      "stance_scale": {
        "1": "Đảo ngược các mở rộng gần đây của bảo hiểm y tế tiểu bang (Medi-Cal)",
        "2": "Giữ hệ thống hiện thời; tập trung vào hạ chi phí",
        "3": "Mở rộng phạm vi bao phủ dần dần, không cần một loại thuế mới lớn",
        "4": "Đơn-người-chi-trả, chi trả chủ yếu bằng thuế đánh vào tài sản và các tập đoàn",
        "5": "Đơn-người-chi-trả, chi trả bằng các loại thuế mới diện rộng (chẳng hạn thuế trên tiền lương)"
      },
      "voter_guide": {
        "explainer": "\"Đơn-người-chi-trả\" (single-payer) nghĩa là một chương trình của chính phủ chi trả mọi hóa đơn y tế của mọi người, thay vì nhiều công ty bảo hiểm tư nhân. \"ACA\" (Affordable Care Act, còn gọi là Obamacare) là luật liên bang tạo ra các thị trường được trợ giá nơi người dân có thể mua bảo hiểm. \"Medi-Cal\" là phiên bản Medicaid của California — chương trình bảo hiểm y tế công cho cư dân thu nhập thấp.",
        "current_policy": "California sử dụng một sự kết hợp giữa bảo hiểm tư cộng với sự hỗ trợ lớn của chính phủ, thay vì một chương trình duy nhất do tiểu bang điều hành. Covered California là thị trường Affordable Care Act (ACA) của tiểu bang, nơi người dân mua bảo hiểm, và tiểu bang góp tiền để hạ phí bảo hiểm. Medi-Cal — phiên bản Medicaid của California, chương trình bảo hiểm công cho cư dân thu nhập thấp — đã được mở rộng vào ngày 1 tháng 1 năm 2024 để bao phủ tất cả người trưởng thành không có giấy tờ đủ điều kiện, khiến California trở thành tiểu bang đầu tiên cung cấp bảo hiểm Medicaid đầy đủ bất kể tình trạng nhập cư của một người. Các nỗ lực chuyển sang một chương trình duy nhất do chính phủ điều hành đã nhiều lần thất bại: [AB 1400](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1400) (dự luật CalCare, 2022) đã bị rút trước khi bỏ phiếu, và dự luật kế tiếp của nó, [AB 2200](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2200) (2024), đã bị chặn lại ở ủy ban.",
        "arguments_for_change": "Những người muốn tiến tới một chương trình đơn-người-chi-trả của tiểu bang (đầu cao) cho rằng một chương trình công duy nhất sẽ loại bỏ chi phí quản lý của công ty bảo hiểm, phí bảo hiểm, khoản tự trả và các mạng lưới nhà cung cấp hạn chế. Họ chỉ ra một số phân tích (chẳng hạn ước tính của UC Berkeley Labor Center) dự báo rằng toàn bộ hệ thống có thể chi tiêu ít hơn nói chung. Họ lập luận rằng bao phủ mọi người — bất kể công việc hay tình trạng nhập cư — thì dễ vận hành hơn, và rằng quy mô khổng lồ của California sẽ cho nó đòn bẩy để thương lượng giá thấp hơn.",
        "arguments_against_change": "Những người muốn giữ thị trường tư được trợ giá hiện tại (đầu thấp) cho rằng mức giá khoảng 300–400 tỷ đô la một năm của đơn-người-chi-trả sẽ đồng nghĩa với các loại thuế mới rất cao, mà không có bảo đảm tiết kiệm ròng. Họ lưu ý rằng nó phụ thuộc vào các phê duyệt của liên bang và các ngoại lệ ERISA vốn có thể không bao giờ đến. Họ cảnh báo rằng việc đảo lộn bảo hiểm của chủ lao động và Medicare mà phần lớn người dân đã có là rủi ro, cả về chính trị lẫn thực tiễn — và rằng California vốn đã đạt phạm vi bao phủ gần như toàn dân bằng cách mở rộng trợ giá và Medi-Cal mà không có sự đảo lộn đó.",
        "comparison": "Không tiểu bang nào của Hoa Kỳ vận hành một hệ thống đơn-người-chi-trả. Vermont đã thông qua một hệ thống vào năm 2014, rồi từ bỏ vì không thể tìm ra cách chi trả cho nó. California đã chọn một con đường khác — mở rộng trợ giá và Medicaid — và đạt được một trong những tỷ lệ không có bảo hiểm thấp nhất nước trong khi vẫn giữ nguyên thị trường bảo hiểm tư.",
        "note_on_options": "Thang đo này đo cơ chế tài trợ — từ việc giữ gìn một thị trường tư được trợ giá (1) đến một chương trình đơn-người-chi-trả do tiểu bang điều hành như CalCare (5) — không phải việc có nên mở rộng phạm vi bao phủ hay không. Một ứng cử viên có thể ủng hộ mở rộng bao phủ diện rộng (ví dụ, mở rộng Medi-Cal năm 2024) trong khi phản đối cơ chế tài trợ đơn-người-chi-trả; những lập trường như vậy nằm ở giữa thang đo.",
        "key_facts": [
          "Medi-Cal đã mở rộng bao phủ đầy đủ cho tất cả người trưởng thành đủ điều kiện bất kể tình trạng nhập cư vào ngày 1 tháng 1 năm 2024 — là tiểu bang đầu tiên làm vậy.",
          "[AB 1400](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1400) (CalCare) đã chết vào ngày 31 tháng 1 năm 2022 khi tác giả của nó rút lại, thiếu 41 phiếu cần thiết ở Hạ viện. Dự luật kế tiếp năm 2024 của nó, [AB 2200](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2200), đã bị giữ lại ở ủy ban Appropriations.",
          "Các nhà phân tích ước tính CalCare sẽ tốn khoảng 314–391 tỷ đô la một năm — nhiều hơn toàn bộ ngân sách quỹ chung của tiểu bang — và sẽ đòi hỏi các loại thuế mới đánh vào tiền lương, doanh nghiệp và thu nhập cao.",
          "Một chương trình đơn-người-chi-trả sẽ cần chính phủ liên bang chấp thuận (thông qua những thứ gọi là Section 1332 và các miễn trừ Medicaid/Medicare) để chuyển hướng tiền liên bang. Một luật liên bang gọi là ERISA cũng giới hạn mức độ một tiểu bang có thể quản lý các chương trình y tế tự tài trợ mà nhiều chủ lao động lớn sử dụng.",
          "Tỷ lệ không có bảo hiểm của California đã giảm xuống khoảng 6–7% trong những năm gần đây — nằm trong số thấp nhất từ trước đến nay — nhờ trợ giá ACA và việc mở rộng Medi-Cal, không phải một hệ thống đơn-người-chi-trả."
        ]
      }
    },
    "policing": {
      "name": "Hoạt động cảnh sát và hình phạt hình sự",
      "short_description": "California nên cân bằng giữa tăng cường cảnh sát, cải cách cảnh sát và các giải pháp thay thế không-cảnh-sát như thế nào?",
      "stance_scale": {
        "1": "Mở rộng cảnh sát và làm các hình phạt hình sự nghiêm khắc hơn",
        "2": "Mở rộng cảnh sát, kèm một số cải cách",
        "3": "Làm cả hai — nhiều cảnh sát hơn và nhiều trách nhiệm giải trình cùng các giải pháp thay thế hơn",
        "4": "Ưu tiên cải cách, giám sát và các phản ứng không-cảnh-sát",
        "5": "Chuyển một phần đáng kể nguồn tiền từ cảnh sát sang các dịch vụ cộng đồng"
      },
      "voter_guide": {
        "current_policy": "California đã thông qua một loạt luật về trách nhiệm giải trình của cảnh sát trong khi vẫn để phần lớn các quyết định về tài trợ và truy tố cho các cơ quan địa phương và các biện lý quận được bầu. [AB 392](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB392) (2019) đã nâng cao ngưỡng cho phép cảnh sát dùng vũ lực chết người — đến mức khi điều đó là \"cần thiết\" để ngăn một mối đe dọa tức thì, thay vì tiêu chuẩn \"hợp lý\" cũ, lỏng lẻo hơn. [SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB2) (2021), Kenneth Ross Jr. Police Decertification Act, đã thiết lập một quy trình toàn tiểu bang để tước (\"decertify\") giấy phép của cảnh sát vì hành vi sai trái nghiêm trọng và báo cáo những người rời ngành vào một cơ sở dữ liệu quốc gia. [AB 1506](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1506) (2020) yêu cầu Bộ Tư pháp tiểu bang điều tra các vụ cảnh sát nổ súng làm chết thường dân không vũ trang. Dân số nhà tù tiểu bang đã giảm mạnh kể từ khi \"Realignment\" năm 2011 ([AB 109](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201120120AB109)) chuyển những tội phạm mức thấp hơn từ nhà tù tiểu bang về các quận.",
        "arguments_for_change": "Những người ủng hộ giảm giam giữ và sử dụng các giải pháp thay thế lập luận rằng dân số nhà tù của California đã giảm nhiều sau Realignment mà không có sự gia tăng kéo dài về tội phạm bạo lực — gợi ý rằng nhiều người có thể được giám sát an toàn trong cộng đồng của họ. Họ cho rằng các chương trình chuyển hướng, điều trị sức khỏe tâm thần và nghiện ngập, và hỗ trợ tái hòa nhập giải quyết các nguyên nhân gốc rễ rẻ hơn nhà tù, và rằng các quy tắc về trách nhiệm giải trình mạnh mẽ (AB 392, SB 2) xây dựng lòng tin cộng đồng và cắt giảm các hành vi sai trái tốn kém.",
        "arguments_against_change": "Những người ủng hộ tài trợ nhiều hơn và hình phạt nghiêm khắc hơn lập luận rằng có đủ cảnh sát và những hậu quả rõ ràng sẽ răn đe tội phạm và trấn an các nạn nhân. Họ lưu ý rằng một số loại tội phạm đã tăng trong những năm cải cách và cho rằng cần có sự cưỡng chế hiện hữu để tạo niềm tin của công chúng. Họ cảnh báo rằng các mệnh lệnh về trách nhiệm giải trình và việc giảm giam giữ, nếu không đi kèm đủ nguồn lực cảnh sát và giám sát, có thể gây áp lực lên các sở và để những kẻ tái phạm quay vòng. Theo quan điểm của họ, không nên đánh đổi an toàn công cộng để giảm con số tù nhân.",
        "comparison": "Tiêu chuẩn dùng vũ lực \"cần thiết\" và hệ thống tước giấy phép toàn tiểu bang của California mạnh hơn so với ở nhiều tiểu bang, dù các tiểu bang như Colorado và New Jersey đã áp dụng các cải cách tương tự sau năm 2020. Tỷ lệ giam giữ của California ở gần hoặc thấp hơn một chút so với mức trung bình toàn quốc — và thấp hơn nhiều so với các tiểu bang giam giữ cao như Mississippi, Louisiana và Texas.",
        "note_on_options": "Ngân sách cảnh sát và phần lớn các quyết định truy tố là việc địa phương, nên các đòn bẩy của một thống đốc là các tiêu chuẩn toàn tiểu bang, hoạt động của CDCR, sức chứa nhà tù, các khoản trợ cấp và việc ký dự luật. Lập trường 1 (nhiều tài trợ hơn, hình phạt nghiêm khắc hơn) và lập trường 5 (giảm giam giữ, các giải pháp thay thế) mô tả hướng đi và trọng tâm mà một thống đốc có thể thúc đẩy, chứ không phải sự kiểm soát đơn phương đối với các lực lượng cảnh sát địa phương hoặc nhà tù quận.",
        "key_facts": [
          "[AB 392](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB392) (2019) đặt ra tiêu chuẩn \"cần thiết\" cho việc cảnh sát dùng vũ lực chết người — một trong những luật về dùng vũ lực nghiêm ngặt hơn trong cả nước.",
          "[SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB2) (2021) đã trao cho hội đồng tiêu chuẩn cảnh sát của tiểu bang (POST) quyền tước giấy phép của cảnh sát vì hành vi sai trái nghiêm trọng. Các cảnh sát bị tước giấy phép không thể được tuyển dụng lại và bị liệt vào National Decertification Index.",
          "[AB 1506](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1506) (2020) yêu cầu Bộ Tư pháp tiểu bang điều tra các vụ cảnh sát nổ súng gây chết thường dân không vũ trang.",
          "Dân số nhà tù của California đã giảm xuống còn khoảng 90.600 vào tháng 12 năm 2025 — thấp hơn khoảng 27% so với tháng 12 năm 2019 — sau Realignment năm 2011 ([AB 109](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201120120AB109)) và các đợt cắt giảm thời kỳ đại dịch. Tiểu bang đã đóng cửa nhiều nhà tù.",
          "Tỷ lệ giam giữ của California là khoảng 294 trên 100.000 người trưởng thành vào năm 2025, giảm từ đỉnh hơn 173.000 tổng số tù nhân vào năm 2006. Nhân sự và ngân sách cảnh sát được ấn định ở cấp địa phương, nên sự kiểm soát trực tiếp của một thống đốc là hạn chế."
        ]
      }
    },
    "oil_gas": {
      "name": "Sản xuất dầu khí ở California",
      "short_description": "California có nên khoan thêm dầu khí trong tiểu bang, giữ mức hiện tại, hay giảm dần?",
      "stance_scale": {
        "1": "Khoan thêm — mở rộng dầu khí trong tiểu bang",
        "2": "Giữ mức sản xuất hiện tại; nới lỏng quy định",
        "3": "Giữ mọi thứ gần như hiện tại",
        "4": "Giảm dần — siết chặt quy định, ngừng cấp giấy phép khoan mới",
        "5": "Loại bỏ nhanh chóng việc khoan trong tiểu bang"
      },
      "voter_guide": {
        "current_policy": "California cho phép khoan dầu khí trong tiểu bang, nhưng đã siết chặt các quy định và không phê duyệt nhiều việc khoan mới. [SB 1137](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1137) (Gonzalez, 2022) cấm các giếng mới hoặc được tái cải tạo trong phạm vi 3.200 feet quanh nhà ở, trường học, bệnh viện và những nơi khác mà người ta dành nhiều thời gian. Ngành dầu khí đã cố gắng lật ngược luật bằng một cuộc trưng cầu trên lá phiếu, nhưng đã rút lại vào ngày 26 tháng 6 năm 2024 — nên luật về vùng đệm có hiệu lực thay vì được đưa ra cử tri như một biện pháp trên lá phiếu năm 2024. Sản xuất dầu trong tiểu bang đã giảm mạnh: California bơm khoảng 104 triệu thùng dầu thô vào năm 2024, giảm khoảng 70% so với đỉnh. Và Low Carbon Fuel Standard của CARB — một quy định tiểu bang thúc các nhiên liệu giao thông phát thải ít các-bon hơn, được sửa đổi năm 2024 và có hiệu lực tháng 7 năm 2025 — tiếp tục siết chặt các mục tiêu đó.",
        "arguments_for_change": "Những người ủng hộ loại bỏ dầu nhanh hơn cho rằng việc khoan tập trung ô nhiễm không khí và tác hại sức khỏe vào các cộng đồng thu nhập thấp và người Latino gần các giếng. Họ lưu ý rằng sản xuất trong tiểu bang vốn đã đang thu hẹp và chỉ cung cấp một phần thiểu số dầu thô mà California lọc — nên việc giảm dần nó một cách trật tự sẽ có tác động hạn chế đến nguồn cung. Họ lập luận rằng việc tiếp tục khoan xung đột với mục tiêu trung hòa các-bon của tiểu bang, và rằng mỗi giếng mới lại làm tăng đống giếng bỏ hoang, không hoạt động mà tiểu bang rốt cuộc sẽ phải trả tiền để dọn dẹp.",
        "arguments_against_change": "Những người ủng hộ giữ sản xuất cho rằng dầu trong tiểu bang hỗ trợ hàng chục ngàn việc làm và một phần lớn cơ sở thuế của Hạt Kern. Họ lập luận rằng cắt giảm nguồn cung địa phương đồng nghĩa với việc nhập khẩu thêm dầu thô — thường được sản xuất theo các quy định môi trường yếu hơn ở nơi khác — và để người lái xe đối mặt với các đợt tăng giá đột biến. Họ cảnh báo rằng việc đóng cửa các nhà máy lọc dầu vốn đã đe dọa nguồn cung và giá nhiên liệu, và rằng các hạn chế đột ngột đẩy giá xăng lên ở một tiểu bang vốn đã có giá tại trạm bơm nằm trong số cao nhất nước.",
        "comparison": "California là tiểu bang sản xuất dầu lớn duy nhất của Hoa Kỳ kết hợp sản lượng lớn với một kế hoạch tuyên bố nhằm giảm dần sản xuất. Texas, New Mexico và North Dakota đều đang mở rộng. Vùng đệm 3.200 feet của California giữa các giếng mới và nhà ở nằm trong số các khoảng lùi khoan bắt buộc lớn nhất cả nước.",
        "note_on_options": "Thang đo trải từ mở rộng sản xuất (1) đến loại bỏ nhanh chóng trên toàn tiểu bang (5). 'Nguyên trạng' nằm gần giữa: California hiện cho phép sản xuất hiện có tiếp tục và suy giảm trong khi hạn chế các giếng mới gần các cộng đồng. Một ứng cử viên ủng hộ các khoảng lùi của SB 1137 nhưng phản đối một mốc thời gian chấm dứt cứng cho việc khai thác sẽ được mã hóa quanh mức 3.",
        "key_facts": [
          "Vùng đệm 3.200 feet của [SB 1137](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1137) giữa các giếng mới và nhà ở có hiệu lực ngày 27 tháng 6 năm 2024 sau khi ngành dầu khí rút lại cuộc trưng cầu bãi bỏ. Nó KHÔNG được thông qua như một biện pháp trên lá phiếu 'Prop 4' — đó là một sự nhầm lẫn phổ biến.",
          "California sản xuất khoảng 104 triệu thùng dầu thô vào năm 2024 — giảm khoảng 70% so với đỉnh. Tiểu bang xếp khoảng thứ 7 trong số các nhà sản xuất dầu của Hoa Kỳ.",
          "Hạt Kern chiếm khoảng 65–70% sản xuất dầu trong tiểu bang của California.",
          "California nhập khẩu phần lớn dầu thô mà các nhà máy lọc dầu của nó sử dụng — chỉ khoảng một phần tư đến từ các giếng trong tiểu bang. Phần còn lại đến bằng đường biển hoặc từ Alaska.",
          "Bản cập nhật năm 2024 của CARB đối với Low Carbon Fuel Standard (một quy định yêu cầu các nhiên liệu giao thông sạch hơn theo thời gian; có hiệu lực ngày 1 tháng 7 năm 2025) đã siết chặt các mục tiêu. CARB ước tính nó sẽ thêm khoảng 5–8 xu mỗi gallon trong ngắn hạn, dù một số ước tính học thuật cao hơn."
        ]
      }
    },
    "abortion": {
      "name": "Phá thai và quyền sinh sản",
      "short_description": "California có nên mở rộng, giữ nguyên, hay hạn chế quyền tiếp cận phá thai?",
      "stance_scale": {
        "1": "Bổ sung các hạn chế (chẳng hạn giới hạn thời gian hoặc sự đồng ý của cha mẹ)",
        "2": "Cho phép một số hạn chế",
        "3": "Giữ các biện pháp bảo vệ mạnh mẽ hiện hành của California",
        "4": "Tăng cường tiếp cận — nhiều tài trợ và nhiều nhà cung cấp dịch vụ hơn",
        "5": "Đi xa hơn — tài trợ cho bệnh nhân từ tiểu bang khác và mở rộng đối tượng được phép cung cấp dịch vụ"
      },
      "voter_guide": {
        "current_policy": "Phá thai là một quyền được ghi vào hiến pháp của California. [Proposition 1](https://lao.ca.gov/BallotAnalysis/Proposition?number=1&year=2022) (tháng 11 năm 2022), được khoảng 66% cử tri thông qua, đã tu chính hiến pháp tiểu bang để cấm California từ chối hoặc can thiệp vào tự do sinh sản, bao gồm phá thai và tránh thai. Sau khi phán quyết Dobbs năm 2022 của Tối cao Pháp viện Hoa Kỳ chấm dứt quyền phá thai ở cấp liên bang, Cơ quan Lập pháp đã thông qua một loạt luật. [AB 1242](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1242) và [AB 2091](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2091) (2022) ngăn cảnh sát, doanh nghiệp và nhà cung cấp dịch vụ của California hỗ trợ các cuộc điều tra phá thai từ tiểu bang khác hoặc giao nộp hồ sơ liên quan. [SB 345](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB345) (2023) bảo vệ các nhà cung cấp dịch vụ được California cấp phép — bao gồm những người cung cấp khám bệnh từ xa và thuốc phá thai — khỏi bị các tiểu bang khác truy tố hoặc dẫn độ. Medi-Cal chi trả cho phá thai bằng toàn bộ chi phí của tiểu bang, và tiểu bang đã dành ra hơn 200 triệu đô la để hỗ trợ tiếp cận phá thai và các nhà cung cấp dịch vụ.",
        "arguments_for_change": "Những người muốn mở rộng các biện pháp bảo vệ xa hơn (đầu cao) cho rằng khi nhiều tiểu bang áp đặt lệnh cấm, California nên hành xử như một nơi lánh nạn — tài trợ cho việc đi lại và chăm sóc cho bệnh nhân từ tiểu bang khác, mở rộng các biện pháp bảo vệ và năng lực của nhà cung cấp dịch vụ, và đi trước bất kỳ giới hạn liên bang nào trong tương lai. Họ lập luận rằng chi phí và hậu cần, chứ không chỉ việc một điều gì đó có hợp pháp hay không, quyết định liệu người ta có thực sự nhận được chăm sóc hay không, nên tiểu bang nên tài trợ và che chắn cho nó một cách mạnh mẽ.",
        "arguments_against_change": "Những người ủng hộ một số giới hạn, hoặc đơn giản là không mở rộng thêm (đầu thấp), lập luận trên cơ sở đạo đức hoặc tôn giáo rằng phá thai nên chịu một số hạn chế, chẳng hạn giới hạn ở giai đoạn muộn của thai kỳ. Họ cho rằng tiền công không nên chi trả cho phá thai hoặc cho việc chăm sóc bệnh nhân từ tiểu bang khác, và rằng các luật che chắn và tài trợ lánh nạn kéo California vào các cuộc tranh chấp với luật của các tiểu bang khác và mở rộng những gì người đóng thuế bị yêu cầu chi trả. Trong nội bộ California, đây là quan điểm thiểu số xét đến tỷ lệ 66% của Prop 1.",
        "comparison": "California là một trong những tiểu bang bảo vệ quyền tiếp cận phá thai mạnh nhất sau Dobbs, kết hợp một quyền hiến định, sự bao phủ của Medi-Cal, tài trợ công và các luật che chắn nhà cung cấp dịch vụ. Điều đó tương phản rõ rệt với hơn một chục tiểu bang cấm hoặc hạn chế gắt gao phá thai, và đặt California vào một nhóm nhỏ các tiểu bang công khai tài trợ và bảo vệ việc chăm sóc cho bệnh nhân đến từ nơi khác.",
        "note_on_options": "Thang đo này trải từ việc ủng hộ một số hạn chế đối với tiếp cận (1) đến một nơi lánh nạn liên-tiểu-bang do tiểu bang tài trợ một cách rộng rãi với các biện pháp bảo vệ nhà cung cấp dịch vụ rộng khắp (5). Xét đến quyền hiến định của California và cuộc bỏ phiếu chênh lệch lớn năm 2022, hầu hết các ứng cử viên khả thi đều tụ về phía bảo vệ; các câu hỏi tạo khác biệt là về việc tài trợ chăm sóc liên-tiểu-bang và che chắn nhà cung cấp dịch vụ đến mức nào, không phải việc phá thai có hợp pháp trong tiểu bang hay không.",
        "key_facts": [
          "[Proposition 1](https://lao.ca.gov/BallotAnalysis/Proposition?number=1&year=2022) (2022) được thông qua với khoảng 66% ủng hộ, ghi một quyền minh thị về phá thai và tránh thai vào hiến pháp tiểu bang.",
          "Medi-Cal chi trả cho phá thai với tiểu bang trả toàn bộ chi phí, và các chương trình bảo hiểm tư do tiểu bang quản lý nhìn chung cũng được yêu cầu phải chi trả cho nó.",
          "California đã thông qua các luật che chắn — [AB 1242](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1242), [AB 2091](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2091) (2022) và [SB 345](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB345) (2023) — bảo vệ các nhà cung cấp dịch vụ và bệnh nhân trong tiểu bang (bao gồm bệnh nhân từ tiểu bang khác dùng khám bệnh từ xa) khỏi bị lôi vào các vụ truy tố phá thai của các tiểu bang khác.",
          "Tiểu bang đã dành ra hơn 200 triệu đô la qua các ngân sách gần đây để tài trợ cho việc tiếp cận phá thai, mở rộng năng lực nhà cung cấp dịch vụ, và giúp bệnh nhân với các chi phí như đi lại.",
          "Sau Dobbs, California đã tự định vị mình như một nơi mà bệnh nhân từ các tiểu bang có lệnh cấm có thể tới để được chăm sóc, với tài trợ của tiểu bang để hỗ trợ họ."
        ]
      }
    },
    "school_funding": {
      "name": "Tài trợ và quản trị trường K-12",
      "short_description": "California có nên chi nhiều hơn, ít hơn, hay gần như bằng cho các trường công K-12?",
      "stance_scale": {
        "1": "Cắt giảm đáng kể chi tiêu K-12",
        "2": "Cắt bớt hoặc giữ nguyên chi tiêu",
        "3": "Giữ chi tiêu gần như bằng",
        "4": "Tăng tài trợ ở mức vừa phải (lương giáo viên, cơ sở vật chất)",
        "5": "Tăng tài trợ nhiều (lương giáo viên, lớp học nhỏ hơn), tăng nguồn thu mới nếu cần"
      },
      "voter_guide": {
        "explainer": "Có vài thuật ngữ thường xuất hiện ở đây. 'Prop 98' là một tu chính án năm 1988 đối với hiến pháp tiểu bang ấn định mức tối thiểu hằng năm mà tiểu bang phải chi cho các trường K-12 và cao đẳng cộng đồng. 'LCFF', tức Local Control Funding Formula, là hệ thống năm 2013 để phân bổ số tiền đó: mỗi học khu nhận một khoản cơ bản trên mỗi học sinh, cộng thêm phần phụ cho các học sinh thu nhập thấp, đang học tiếng Anh, hoặc trong diện nuôi dưỡng. 'Chi tiêu trên mỗi học sinh' là tổng tiền của trường chia cho số học sinh. 'NAEP' là một kỳ thi quốc gia (biệt danh 'Bảng điểm của Quốc gia') cho phép bạn so sánh các tiểu bang. 'Thuế lô đất' (parcel tax) là một loại thuế địa phương phẳng đánh trên mỗi bất động sản mà một số học khu dùng để gây thêm quỹ cho trường học.",
        "current_policy": "Tài trợ K-12 dựa trên hai trụ cột. [Prop 98](https://lao.ca.gov/Publications/Report/4929) (1988) là một quy tắc hiến định ấn định mức tối thiểu hằng năm mà tiểu bang phải chi cho trường học và cao đẳng cộng đồng. Local Control Funding Formula (LCFF, 2013) quyết định số tiền đó được chia ra sao: mỗi học khu nhận một khoản tài trợ cơ bản trên mỗi học sinh, cộng một khoản tài trợ bổ sung (thêm 20% của khoản cơ bản) và, đối với các học khu có nhiều học sinh nhu cầu cao, một khoản tài trợ tập trung — tất cả nhằm vào các học sinh thu nhập thấp, đang học tiếng Anh, hoặc trong diện nuôi dưỡng. Cho năm 2024-25, mức tối thiểu Prop 98 là khoảng 115,3 tỷ đô la tổng cộng (khoảng 101,1 tỷ đô la cho K-12). Cử tri cũng đã thông qua [Prop 2](https://lao.ca.gov/BallotAnalysis/Proposition?number=2&year=2024) vào tháng 11 năm 2024, một trái phiếu 10 tỷ đô la để xây và sửa các tòa nhà trường học và cao đẳng cộng đồng.",
        "arguments_for_change": "Những người muốn tài trợ nhiều hơn và quyền tự chủ địa phương mạnh hơn cho rằng California vẫn chi ít hơn trên mỗi học sinh so với các tiểu bang có chi phí cao tương đương, và rằng các khoản tài trợ bổ sung và tập trung của LCFF nên lớn hơn để thu hẹp khoảng cách cơ hội cho học sinh thu nhập thấp, người học tiếng Anh và thanh thiếu niên trong diện nuôi dưỡng. Họ lập luận rằng cần một nguồn tiền ổn định, dành riêng — một loại thuế hoặc một trái phiếu — cho lương giáo viên cạnh tranh, các tòa nhà trường học, và mở rộng mẫu giáo chuyển tiếp, và rằng các nhà giáo dục địa phương, chứ không phải các mệnh lệnh của Sacramento, biết rõ nhất cách chi tiêu nó.",
        "arguments_against_change": "Những người nhấn mạnh trách nhiệm giải trình và cải cách cho rằng chi tiêu đã tăng nhiều kể từ LCFF mà không có những bước tiến tương xứng trên NAEP, nên ưu tiên nên là cho thấy tiền tài trợ tập trung thực sự đi đâu và đạt được những kết quả đo lường được — không phải các loại thuế mới. Họ lưu ý rằng [Prop 98](https://lao.ca.gov/Publications/Report/4929) vốn đã bảo đảm một mức sàn đang tăng, rằng ngân sách tiểu bang dao động theo nền kinh tế, và rằng các quy tắc chi tiêu lỏng lẻo của LCFF khiến khó xác nhận rằng số tiền thêm đang đến được với các học sinh nhu cầu cao mà nó hướng đến.",
        "comparison": "Một khi điều chỉnh cho chi phí cao của California, chi tiêu trên mỗi học sinh của nó giờ nằm ở nửa trên của các tiểu bang, dù vẫn dưới những nơi chi tiêu lớn như New York. Điểm NAEP của nó vẫn dưới mức trung bình toàn quốc, điều này khiến cuộc tranh luận tiếp diễn về việc liệu vấn đề là quá ít tiền, cách tiền được chi tiêu, hay sự thiếu trách nhiệm giải trình.",
        "note_on_options": "Thang đo bao trùm cả mức tài trợ (cắt giảm đến nguồn thu mới lớn) và trục kiểm soát tiểu-bang-so-với-địa-phương. Hai thứ này có thể phân kỳ: một ứng cử viên có thể ủng hộ nhiều quyền tự chủ địa phương hơn mà không tăng thuế, hoặc nhiều tài trợ công bằng do tiểu bang điều phối hơn. Cách mã hóa mặc định của chúng tôi coi sự ủng hộ một loại thuế hoặc trái phiếu mới dành riêng là tín hiệu giá trị 5 mạnh nhất và một lập trường ưu tiên trách nhiệm giải trình, cải cách LCFF là giá trị 1.",
        "key_facts": [
          "Tổng chi tiêu trên mỗi học sinh từ mọi nguồn là khoảng 23.878 đô la cho năm 2024-25 (ước tính của tiểu bang), và được dự kiến sẽ tiếp tục tăng.",
          "Theo các số liệu Census so sánh tương đương, California chi khoảng 19.894 đô la trên mỗi học sinh trong năm 2022-23 — khoảng thứ 13 trong các tiểu bang, tăng từ thứ 28 năm trước.",
          "LCFF (2013) chồng một khoản tài trợ bổ sung (thêm 20% của khoản cơ bản) và một khoản tài trợ tập trung lên trên khoản tài trợ cơ bản của mỗi học khu để hướng thêm tiền cho các học khu nhu cầu cao hơn.",
          "Trong kỳ thi quốc gia NAEP năm 2024, California đạt điểm ngay dưới mức trung bình toàn quốc — ví dụ, đọc lớp 4 đạt 212 so với 214 và đọc lớp 8 đạt 254 so với 257 — dù khoảng cách dài hạn của nó với phần còn lại của đất nước đã thu hẹp.",
          "[Prop 2](https://lao.ca.gov/BallotAnalysis/Proposition?number=2&year=2024) (tháng 11 năm 2024) đã cho phép phát hành 10 tỷ đô la trái phiếu cho các tòa nhà K-12 và cao đẳng cộng đồng; nhiều học khu cũng thu thuế lô đất địa phương (một loại thuế phẳng trên mỗi bất động sản), vốn cần hai phần ba cử tri phê duyệt."
        ]
      }
    }
  },
  "dimensions": {
    "years_in_office_band": {
      "name": "Số năm giữ chức vụ dân cử",
      "description": "Bạn ưa thích một tiếng nói chính trị mới mẻ, hay một người có thâm niên giữ chức vụ dân cử lâu dài?",
      "scale": {
        "1": "Rất ưa thích người mới — dưới 5 năm giữ chức vụ dân cử",
        "2": "Nghiêng về người mới",
        "3": "Không có ưu tiên",
        "4": "Nghiêng về người dày dạn kinh nghiệm",
        "5": "Rất ưa thích người dày dạn — từ 15 năm trở lên giữ chức vụ dân cử"
      }
    },
    "career_path": {
      "name": "Nền tảng sự nghiệp",
      "description": "Những nền tảng sự nghiệp nào hấp dẫn bạn ở một thống đốc? (Để trống nếu không có ưu tiên.)",
      "options": {
        "state_pol": "Chính trị cấp tiểu bang (Hạ viện, Thượng viện, chức vụ toàn tiểu bang)",
        "federal_pol": "Chính trị liên bang (Quốc hội, Nội các)",
        "local_pol": "Chính trị địa phương (thị trưởng, hội đồng, cảnh sát trưởng)",
        "business": "Kinh doanh / khu vực tư nhân",
        "law_enforcement": "Thực thi pháp luật",
        "law": "Hành nghề hoặc nghiên cứu luật học thuật",
        "activism": "Hoạt động xã hội / tổ chức cộng đồng",
        "nonprofit": "Lãnh đạo tổ chức phi lợi nhuận",
        "academia": "Học thuật / giảng dạy",
        "media": "Truyền thông / báo chí",
        "health": "Chăm sóc sức khỏe / y tế công cộng",
        "social_work": "Công tác xã hội / phục vụ công"
      }
    },
    "endorsement_coalition": {
      "name": "Liên minh ủng hộ",
      "description": "Tín hiệu ủng hộ của ai quan trọng nhất với bạn? (Để trống nếu không có ưu tiên.)",
      "options": {
        "labor": "Các nghiệp đoàn lao động",
        "environmental": "Các tổ chức môi trường",
        "civil_rights": "Các tổ chức dân quyền",
        "business": "Cộng đồng doanh nghiệp",
        "law_enforcement": "Các hiệp hội thực thi pháp luật",
        "womens_orgs": "Các tổ chức phụ nữ",
        "faith": "Các cộng đồng tôn giáo",
        "latino_caucus": "Khối nghị sĩ Latino / các tổ chức Latino",
        "lgbtq_orgs": "Các tổ chức LGBTQ+",
        "newspapers": "Các tờ báo lớn của California (LA Times, SF Chronicle, Sac Bee)",
        "dem_party": "Đảng Dân chủ California",
        "rep_party": "Đảng Cộng hòa California",
        "trump": "Donald Trump / các nhân vật Cộng hòa cấp quốc gia"
      }
    },
    "geographic_background": {
      "name": "Nền tảng địa lý",
      "description": "Bạn có ưa thích một ứng cử viên từ một vùng cụ thể của California không? (Để trống nếu không có ưu tiên.)",
      "options": {
        "bay_area": "Bay Area",
        "la_county": "Hạt Los Angeles",
        "oc_ie": "Quận Orange / Inland Empire",
        "san_diego": "San Diego",
        "central_valley": "Central Valley",
        "north": "Vùng Cực Bắc / Sierra",
        "central_coast": "Central Coast"
      }
    },
    "electability": {
      "name": "Khả năng đắc cử",
      "description": "Khả năng giành chiến thắng ở vòng tổng tuyển cử — sức mạnh thăm dò, gây quỹ, sức hút rộng rãi — được tính đến bao nhiêu?",
      "scale": {
        "1": "Quyết định — tôi đặt khả năng đắc cử lên trên các yếu tố khác",
        "2": "Trọng số đáng kể",
        "3": "Trọng số vừa phải",
        "4": "Một chút trọng số",
        "5": "Không tính đến — tôi bỏ phiếu theo sự đồng điệu bất kể khả năng giành chiến thắng"
      }
    },
    "age_band": {
      "name": "Tuổi tác / thế hệ",
      "description": "Bạn ưa thích nhóm tuổi nào? (Tùy chọn.)",
      "options": {
        "millennial": "Thế hệ Millennial (sinh 1981–1996)",
        "gen_x": "Thế hệ X (sinh 1965–1980)",
        "boomer": "Thế hệ Baby Boomer (sinh 1946–1964)",
        "silent": "Thế hệ Im lặng (sinh trước 1946)"
      }
    },
    "demographic_background": {
      "name": "Nền tảng nhân khẩu học",
      "description": "Những nền tảng nào của ứng cử viên có ý nghĩa tích cực với bạn? (Tùy chọn — để trống nếu không có ưu tiên. Câu trả lời của bạn được ẩn danh.)",
      "options": {
        "black": "Người da đen / người Mỹ gốc Phi",
        "latino": "Người Latino / gốc Tây Ban Nha",
        "aapi": "Người Mỹ gốc Á / cư dân đảo Thái Bình Dương",
        "white": "Người da trắng",
        "native": "Người Mỹ bản địa / thổ dân",
        "multiracial": "Đa chủng tộc",
        "woman": "Phụ nữ",
        "man": "Nam giới",
        "nonbinary": "Phi nhị giới",
        "lgbtq": "LGBTQ+",
        "catholic": "Công giáo",
        "protestant": "Tin Lành / Phúc Âm",
        "jewish": "Do Thái giáo",
        "muslim": "Hồi giáo",
        "hindu": "Ấn Độ giáo",
        "sikh": "Đạo Sikh",
        "secular": "Thế tục / vô thần / không tôn giáo",
        "immigrant": "Người nhập cư hoặc người Mỹ thế hệ thứ nhất",
        "veteran": "Cựu chiến binh / phục vụ quân ngũ"
      }
    }
  }
};

DATASET_I18N.tl = {
  "questions": {
    "tax_wealth": {
      "name": "Buwis sa yaman ng estado",
      "short_description": "Dapat bang buwisan ng California ang net worth ng mga pinakamayayamang residente nito — isang buwis sa yaman mismo, hiwalay sa buwis sa kita?",
      "stance_scale": {
        "1": "Tutol sa buwis sa yaman ng estado",
        "2": "Bahagyang tutol dito — walang kasalukuyang suporta",
        "3": "Bukas dito / hindi pa nakapagdedesisyon",
        "4": "Sumusuporta sa buwis sa yaman",
        "5": "Mariing sumusuporta sa buwis sa yaman ng ultra-mayayaman"
      },
      "voter_guide": {
        "current_policy": "Walang buwis sa yaman ang California — isang buwis sa kung ano ang pag-aari ng isang tao (ang net worth nila) sa halip na ang kita na kinikita nila. Dalawang magkaibang bersyon ang naipanukala, at iba ang paraan ng paggana ng mga ito. Noong 2023, ang [AB 259](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB259) ni Asm. Alex Lee (kasama ang konstitusyonal na susog na ACA 3) ay nagpanukala ng taunang buwis — 1% sa net worth na higit sa $50 million at 1.5% sa higit sa $1 billion — ngunit ito ay nahinto sa komite at hindi naging batas. Hiwalay dito, isang isahang panukala — ang 'Billionaire Tax Act,' pormal na One-Time Wealth Tax for State-Funded Health Care Programs Initiative, na sinusuportahan ng SEIU-UHW — ang kuwalipikado para sa balota ng Nobyembre 2026: isang isahang 5% na buwis sa net worth ng mga bilyonaryo ng California, na ang kita ay mapupunta sa karamihan sa pangangalagang pangkalusugan at ang natitira sa edukasyon at tulong sa pagkain.",
        "arguments_for_change": "Sinasabi ng mga tagasuporta na umaabot ang buwis sa yaman sa mga kayamanang hindi naaabot ng mga buwis sa kita — kayang panatilihing mababa ng mga bilyonaryo ang kanilang nabubuwisang kita habang patuloy namang lumalaki ang kanilang net worth — at na kahit ang katamtamang buwis sa pinakamalalaking kayamanan ay maaaring pondohan ang mga paaralan, pangangalagang pangkalusugan, at pangangalaga sa bata mula sa maliit na grupo ng mga nagbabayad ng buwis.",
        "arguments_against_change": "Sinasabi ng mga tumututol na ang buwis sa yaman ng estado ay nahaharap sa malubhang legal at praktikal na problema (paano mo pahahalagahan ang mga ari-arian ng isang tao?), na ang pinaka-malilipat na residente ay aalis o magrerestruktura upang iwasan ito, at na ang kita na nakasalalay sa iilang tao ay magiging hindi mahuhulaan.",
        "comparison": "Ang California ang magiging unang estado ng U.S. na magpapatupad ng tunay na buwis sa kabuuang yaman. Ilang iba pang estado na may matataas na buwis ang tumingin sa ideya at hindi ito ipinagpatuloy, na binabanggit ang mga hamong legal, ang kahirapan ng pagpapahalaga sa mga ari-arian, at ang panganib na basta na lamang aalis ang pinakamayayamang residente.",
        "key_facts": [
          "Walang estado ng U.S. ang kasalukuyang may tunay na buwis sa yaman.",
          "Dalawa itong magkaibang panukala. Ang [AB 259](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB259) (2023, Alex Lee) ay isang taunang buwis — 1% sa net worth na higit sa $50 million, 1.5% sa higit sa $1 billion — na nahinto sa komite at hindi naging batas.",
          "Ang panukala sa balota ng Nobyembre 2026 ay isang isahang 5% na buwis sa net worth ng mga bilyonaryo ng California (higit sa $1 billion), na sinusuri sa isang nakatakdang petsa — hindi paulit-ulit na buwis. Karamihan sa kita ay nakalaan para sa pangangalagang pangkalusugan, na may bahagi para sa edukasyon at tulong sa pagkain.",
          "Ang isahang buwis ay babayaran nang isang beses, sa yaman ayon sa isang snapshot na petsa; ang taunang buwis ay paulit-ulit bawat taon na hawak ang yaman. Ang panukalang batas noong 2023 ay taunan; ang panukala sa balota ng 2026 ay isahan.",
          "Ang malawakang buwis sa yaman ay naipanukala at nabigo sa Washington, New York, Massachusetts, at Illinois. Ang pinakamahirap na bahagi ng anumang buwis sa yaman ay ang pagpapahalaga sa mga bagay na walang malinaw na presyo sa merkado — mga pribadong kumpanya, sining, real estate."
        ]
      }
    },
    "school_choice": {
      "name": "Pagpili ng paaralan at mga charter",
      "short_description": "Dapat bang gawing mas madali o mas mahirap ng California ang pagbukas ng mga charter school at bigyan ang mga pamilya ng mas maraming pagpipilian sa paaralan?",
      "stance_scale": {
        "1": "Magbukas ng mas marami pang charter school at palawakin ang pagpili ng pamilya",
        "2": "Magbukas ng mas maraming charter school; protektahan ang pagpili ng pamilya",
        "3": "Panatilihin ang kasalukuyang mga patakaran sa charter school nang halos pareho",
        "4": "Gawing mas mahirap na magbukas ng bagong charter school",
        "5": "Itigil ang mga bagong charter school; ibigay ang pera sa tradisyonal na pampublikong paaralan"
      },
      "voter_guide": {
        "explainer": "Ang tradisyonal na pampublikong paaralan ay pinamamahalaan ng mga lokal na school district at libre at bukas sa lahat ng mag-aaral. Ang mga charter school ay libre ring pampublikong paaralan na pinopondohan ng pera ng buwis, ngunit pinamamahalaan ang mga ito nang malaya — kadalasan ng isang nonprofit sa ilalim ng isang kontrata (isang 'charter') — na may higit na kalayaan sa kung paano sila nagtuturo at kumukuha ng empleyado, at mas kaunting pangangasiwa ng distrito. Ang mga pribadong paaralan ay naniningil ng matrikula at hindi tumatanggap ng pondo ng estado. Ang 'pagpili ng paaralan' ay minsan ding nangangahulugan ng mga voucher — pampublikong pera na maaaring ilaan ng mga pamilya sa matrikula sa pribadong paaralan — na hindi kasalukuyang inaalok ng California.",
        "current_policy": "May halos 1,283 charter school ang California, kasama ang pitong distrito na binubuo nang buo ng mga charter (datos ng estado, Mayo 2024). Tinuturuan nila ang humigit-kumulang 11.7% ng mga mag-aaral sa pampublikong paaralan. Dalawang batas noong 2019 — ang [AB 1505](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1505) at [AB 1507](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1507), kapwa nilagdaan noong Oktubre na iyon at nagkabisa noong Hulyo 1, 2020 — ang nagpahirap sa pagbukas at pag-renew ng mga charter. Maaari na ngayong tanggihan ng mga distrito ang isang bagong charter sa pamamagitan ng pagbanggit sa epekto sa pananalapi o sa epekto sa komunidad, sa pangkalahatan ay hindi maaaring magpatakbo ng mga campus ang mga charter sa labas ng distrito na nagpahintulot sa kanila, at maaaring tanggihan ang pag-renew ng isang mababang-pagganap na charter. Hindi nag-aalok ang California ng mga voucher para sa pribadong paaralan na pinopondohan ng estado o mga education savings account. (Ang voucher ay nagbibigay sa mga pamilya ng pampublikong pera na gagastusin sa matrikula sa pribadong paaralan; ang education savings account, o ESA, ay isang account na pinopondohan ng gobyerno na maaaring gastusin ng mga magulang sa matrikula, tutoring, o iba pang inaprubahang gastusin sa edukasyon.) Ang huling panukala sa voucher, ang [Prop 38](https://www.lao.ca.gov/ballot/2000/38_11_2000.html) noong 2000, ay natalo nang 71% laban sa 29%.",
        "arguments_for_change": "Sinasabi ng mga gustong magkaroon ng mas maraming pagpipilian na ang mga charter ay nagbibigay sa mga pamilya — nang hindi proporsyonal sa mga pamilyang may mababang kita at mga pamilya ng mga taong may kulay — ng pagpipilian bukod sa kanilang itinakdang paaralan sa kapitbahayan, at na ilang charter network ang nagkakamit ng matibay na resulta para sa mga mag-aaral na iyon. Iginiit nila na binigyan ng [AB 1505](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1505) ang mga distrito ng dahilang nakabatay sa pera upang hadlangan ang mga karibal, at na ang mga voucher o education savings account ay magbubukas ng pagpipilian sa mga pamilyang hindi kayang magbayad ng pribadong matrikula o lumipat sa isang mataas-ranggong zona ng paaralan.",
        "arguments_against_change": "Sinasabi ng mga tumututol — kabilang ang California Teachers Association (CTA) at ang California School Boards Association (CSBA) — na ang mga charter at voucher ay kumukuha ng pondo bawat mag-aaral (ang pondong sumusunod sa bawat mag-aaral) palayo sa mga paaralan ng distrito, na siyang tumuturo pa rin sa karamihan ng mga bata at mayroon pa ring nakatakdang mga babayaran. Iginiit nila na hindi pantay ang kalidad ng charter at mas mahina ang pangangasiwa, itinuturo nila ang pananaliksik (tulad ng mga pag-aaral ng CREDO ng Stanford) na nagpapakitang malaki ang pagkakaiba ng resulta ng charter ayon sa operator at estado, at binabanggit na paulit-ulit nang tinanggihan ng mga botante ng California ang mga voucher bilang paggamit ng pampublikong pera upang bayaran ang mga pribado at relihiyosong paaralan.",
        "comparison": "Ang California ay isa sa mas mahigpit na malalaking estado sa pagpili ng paaralan: malaki ang sektor ng charter nito ngunit, hindi tulad ng Arizona, Florida, o Indiana, walang inaalok na voucher para sa pribadong paaralan o education savings account. Ang mga batas nito noong 2019 ay salungat sa pambansang takbo, na patungo sa pagpapalawak ng pagpili ng pribadong paaralan.",
        "note_on_options": "Pinagsasama ng sukatan ang dalawang magkaibang mekanismo: patakaran sa charter (isang pagpipilian sa pampublikong paaralan) at mga voucher/ESA para sa pribadong paaralan (pampublikong pondo para sa pribadong matrikula). Maaaring paboran ng isang kandidato ang pagpapalawak ng charter habang tumututol sa mga voucher, o vice versa. Itinuturing ng aming default na pag-coding ang suporta sa mga voucher bilang ang pinakamatibay na senyas ng pabor-sa-pagpipilian (halaga 1) at ang isang cap-and-redirect na paninindigan bilang ang pinakamatibay na mahigpit na senyas (halaga 5).",
        "key_facts": [
          "Halos 1,283 charter school at 7 all-charter na distrito ang nagpapatakbo sa California (datos ng estado, Mayo 2024); tinuturuan ng mga charter ang humigit-kumulang 11.7% ng mga mag-aaral sa pampublikong paaralan (2022-23).",
          "Tinapos ng [AB 1505](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1505) (2019) ang lumang halos awtomatikong karapatang umapela sa isang tinanggihang charter, at pinahintulutan ang mga distrito na banggitin ang epekto sa pananalapi at pangangailangan ng komunidad kapag tumatanggi o tumatangging mag-renew ng isa.",
          "Pinigil ng [AB 1507](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1507) (2019) ang karamihan ng mga bagong charter sa pagpapatakbo ng mga learning center o satellite campus sa labas ng distrito na nagpahintulot sa kanila (ang 'charter authorizer' — ang ahensya, kadalasan ay isang school district, na nagbibigay at nangangasiwa sa charter).",
          "Tumaas nang bahagya ang enrollment sa charter habang bumaba ang regular na enrollment sa distrito, bahagyang dahil bumababa ang kabuuang enrollment sa buong estado.",
          "Ang [Prop 38](https://www.lao.ca.gov/ballot/2000/38_11_2000.html) (2000), na sana ay nagbigay sa mga pamilya ng voucher na halos $4,000 bawat bata, ay natalo nang 71% laban sa 29%. Walang voucher sa buong estado ang nakarating sa balota mula noon."
        ]
      }
    },
    "housing_supply": {
      "name": "Suplay ng pabahay at preemption ng zoning",
      "short_description": "Gaano kabigat dapat itulak ng estado ang mga lungsod na magtayo ng mas maraming pabahay — kahit na tumutol ang mga lokal na residente?",
      "stance_scale": {
        "1": "Itulak nang mariin — pawalang-bisa ang lokal na patakaran sa zoning upang pilitin ang mas maraming pagtatayo",
        "2": "Itulak nang malakas — magtakda ng matibay na target sa pagtatayo, pawalang-bisa ang mga lungsod nang bahagya",
        "3": "Magbalanse — hikayatin ang pagtatayo ngunit iwan ang karamihan ng desisyon sa mga lungsod",
        "4": "Karaniwang iwan ito sa mga lungsod — limitahan ang pagpawalang-bisa ng estado, sa halip ay bawasan ang lokal na burukrasya",
        "5": "Magpokus sa subsidized na pabahay at proteksyon sa umuupa sa halip na pilitin ang pagtatayo ng market-rate"
      },
      "voter_guide": {
        "current_policy": "Sa nakaraang dekada, kumuha ang California ng maraming kapangyarihan sa pag-apruba ng pabahay mula sa mga lungsod at ibinigay ito sa estado. Lumikha ang [SB 35](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB35) (2017) ng isang fast track para sa mga kuwalipikadong proyekto ng apartment sa mga lungsod na hindi naaabot ang kanilang mga target sa pabahay ng estado: ang pag-apruba ay nagiging \"ministerial,\" ibig sabihin ay dapat pumayag ang mga lokal na opisyal kung natutugunan ang mga patakaran, nang walang pagpapasya na tumanggi. Pinalawig ng [SB 423](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB423) (2023) ang fast track na iyon hanggang 2036 at inabot ito sa mga bahagi ng baybayin. Ginawang posible ng [SB 9](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB9) (2021) ang pagtatayo ng mga duplex at paghahati ng mga lote sa karamihan ng mga single-family na ari-arian \"by right\" — ibig sabihin ay awtomatiko ang pag-apruba kung natutugunan mo ang mga patakaran. Nagbibigay din ang estado sa bawat rehiyon ng target sa pabahay, na tinatawag na Regional Housing Needs Assessment (RHNA). Kapag ang lokal na plano sa pabahay ng isang lungsod ay hindi naaayon sa batas, isang patakaran ng estado na tinatawag na Housing Accountability Act ang naglilimita sa kapangyarihan nitong tanggihan ang pabahay — at nilagyan ng [AB 1893](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB1893) (2024) ng tunay na ngipin ang \"Builder's Remedy,\" na nagpapahintulot sa mga developer na laktawan ang lokal na zoning sa mga lungsod na hindi natutugunan ang kanilang mga layunin sa pabahay.",
        "arguments_for_change": "Sinasabi ng mga tagasuporta ng mas malakas na kontrol ng estado na ang lokal na gobyerno ang sanhi ng kakulangan sa pabahay na tumagal nang ilang dekada. Iniuugnay ng Legislative Analyst's Office (LAO) ang nangunguna-sa-bansa na renta at presyo ng bahay ng estado nang tuwiran sa kakaunting pagtatayo malapit sa mga sentro ng trabaho sa baybayin. Iginiit ng mga tagasuporta na sumusuko ang mga lungsod sa presyon ng mga may-ari ng bahay upang hadlangan ang bagong pabahay, kaya ang matibay na mandato lamang ng estado — awtomatikong \"by-right\" na pag-apruba, naipapatupad na mga target, at ang Builder's Remedy — ang makapagsasara sa puwang. Itinuturo nila ang [SB 9](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB9) bilang patunay na nabibigo ang mga boluntaryong kasangkapan kapag may puwang pa ang mga lungsod na mag-antala.",
        "arguments_against_change": "Sinasabi ng mga tumututol na ang mga desisyon sa paggamit ng lupa ay nasa mga lokal na opisyal, na nakakakilala sa sariling mga kapitbahayan — ang mga kalsada, ang panganib sa sunog, ang trapiko, ang katangian ng lugar. Iginiit nila na ang mga mandato sa buong estado, isang-sukat-para-sa-lahat, ay nagpapawalang-bisa sa mga planong inaprubahan ng mga lokal na botante, at na ang mga na-fast-track na \"by-right\" na proyekto ay maaaring laktawan ang pagsusuri sa kapaligiran at pampublikong input. Sinasabi rin nila na ang tunay na sanhi ng kakulangan ay ang matataas na gastos sa konstruksyon, mga interest rate, at masikip na suplay ng paggawa — hindi ang zoning — kaya ang pagpawalang-bisa sa mga lungsod ay nagdaragdag ng salungatan nang hindi maaasahang naglalabas ng abot-kayang mga tahanan.",
        "comparison": "Mas malayo na ang narating ng California kaysa halos sa anumang estado sa pagpawalang-bisa ng lokal na zoning. Ilang iba pa ang gumalaw din sa ganitong paraan — tinapos ng Oregon ang single-family-only na zoning sa buong estado noong 2019, at nagpasa ang Montana at Washington ng malawak na batas noong 2023 na nagpapahintulot ng mas maraming pabahay sa mga umiiral na lote. Ngunit maraming estado pa rin ang nag-iiwan ng mga desisyon sa paggamit ng lupa halos buong-buo sa mga lungsod at bayan.",
        "note_on_options": "Ito ay isang solong axis na sumusukat kung gaano kabigat dapat itulak ng estado upang palawakin ang suplay ng market-rate na pabahay — mula sa agresibong preemption ng lokal na zoning (opsyon 1) pababa sa pag-uuna ng mga subsidy at proteksyon sa umuupa kaysa sa suplay na pinilit ng estado (opsyon 5). Maaaring umabot ang mga kandidato sa mababang dulo para sa iba't ibang dahilan: ipinagtatanggol ng ilan ang lokal na kontrol at mga single-family na kapitbahayan (opsyon 4), habang pinapaboran ng iba ang pampubliko/subsidized na pabahay kaysa sa konstruksyong market-rate (opsyon 5). Ang posisyon dito ay nagpapahiwatig kung gaano kalaki ang kapangyarihan ng estado na gagamitin ng kandidato upang pawalang-bisa ang lokal na zoning para sa suplay.",
        "key_facts": [
          "Ang kasalukuyang siklo ng RHNA (2023–2031) ay nananawagan ng halos 2.5 milyong bagong tahanan sa buong estado — humigit-kumulang 1 milyon sa mga ito ay abot-kaya para sa mga pamilyang may mababang kita.",
          "Mas kaunti kaysa inaasahan ang ginamit sa [SB 9](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB9) (2021). Sa unang taon nito, nakakuha ang Los Angeles ng 211 aplikasyon ng unit, San Francisco 25, San Diego 7, at San José 1 lamang — kahit na tinatayang humigit-kumulang 700,000 unit ang maaaring maging bagong magagawa ayon sa isang pagsusuri ng Terner Center noong 2021.",
          "Ang mga lungsod na hindi sumusunod sa batas sa plano sa pabahay ng estado ay maaaring multahin ng $10,000 hanggang $600,000 bawat buwan.",
          "Ang fast track ng [SB 35](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB35) / [SB 423](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB423) ay tumatakbo lamang kung saan hindi naaabot ng isang lungsod ang mga target nito sa pabahay o walang inaprubahan ng estadong plano sa pabahay. Nagdagdag din ang SB 423 ng mga kinakailangan sa sahod at bihasang manggagawa na sumasabay sa laki ng proyekto.",
          "Ipinag-uutos ng Surplus Land Act sa mga lokal na ahensya na bigyan ang abot-kayang pabahay ng unang priyoridad kapag ibinebenta nila ang pampublikong lupa na hindi na nila kailangan."
        ]
      }
    },
    "sanctuary": {
      "name": "Sanctuary at pagpapatupad ng imigrasyon",
      "short_description": "Gaano dapat makipagtulungan ang California sa pederal na pagpapatupad ng imigrasyon (ICE)?",
      "stance_scale": {
        "1": "Makipagtulungan nang buo sa ICE — bawiin ang batas sanctuary ng estado",
        "2": "Panatilihin ang batas sanctuary ngunit magpahintulot ng mas maraming eksepsiyon",
        "3": "Panatilihin ang kasalukuyang batas sanctuary tulad ng kasalukuyan",
        "4": "Palakasin ang mga proteksyon (hal. pondohan ang legal na depensa para sa mga imigrante)",
        "5": "Lumayo pa nang higit — magdagdag ng mga bagong proteksyon ng estado, tulad ng state ID para sa lahat"
      },
      "voter_guide": {
        "explainer": "Ang isang \"batas sanctuary\" ay naglilimita kung gaano makakatulong ang pulis ng estado at lokal sa mga pederal na ahente ng imigrasyon. Ang pangunahing batas ng California ay ang [SB 54](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB54), ang California Values Act, na ipinasa noong 2017.",
        "current_policy": "Ang baseline ng California ay ang California Values Act, [SB 54](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB54) (2017), na may bisa mula Enero 1, 2018. Sinasabi nito na hindi maaaring gamitin ng mga ahensya ng estado at lokal ang kanilang mga tauhan o pera upang gawin ang pederal na sibil na pagpapatupad ng imigrasyon. Ibig sabihin, sa pangkalahatan ay hindi nila maaaring panatilihin ang isang tao sa kulungan dahil lamang humihiling ang ICE (tinatawag na \"detainer\" o hold request), hindi maaaring arestuhin ang mga tao sa mga sibil na imigrasyon warrant, at hindi maaaring lumagda ng mga \"287(g)\" na kasunduan — mga deal na nagpapahintulot sa mga lokal na opisyal na kumilos bilang mga ahente ng imigrasyon. May mga eksepsiyon: maaaring sabihin ng mga kulungan sa ICE kung kailan pakakawalan ang isang tao, o ibibigay sila, kung ang taong iyon ay nahatulan ng ilang malubha o marahas na felony na nakalista sa batas ng estado. Isang hiwalay na batas, ang TRUTH Act ([AB 2792](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201520160AB2792), 2016), ay nagsasabi na ang mga taong nakakulong ay dapat sabihan tungkol sa, at sumang-ayon sa, anumang panayam ng ICE, at na ang mga lokal na gobyerno ay dapat magdaos ng pampublikong pulong kung bibigyan nila ng access ang ICE. Ang mga kulungan ng estado (CDCR) ay bahagyang saklaw lamang ng SB 54 at sumusunod sa kanilang sariling mga patakaran sa abiso.",
        "arguments_for_change": "Iginiit ng mga gustong magkaroon ng mas malalakas na proteksyon ng sanctuary na ang paglayo ng lokal na pulis sa pagpapatupad ng imigrasyon ay bumubuo ng tiwala, upang ang mga imigranteng biktima at saksi ng krimen ay makaramdam ng kaligtasan sa pag-uulat ng mga krimen. Binabanggit nila na ang mga ICE detainer ay kadalasang hindi nilagdaan ng isang hukom, na nagdudulot ng mga konstitusyonal na alalahanin at maaaring maglagay sa mga county sa peligro ng mga kaso. At itinuturo nila na pinapayagan na ng umiiral na mga eksepsiyon sa felony ang pagtutulungan sa pinakamalubhang mga kaso — kaya ang karagdagang mga hakbang (tulad ng paglilimita sa pagbabahagi ng datos, o paglayo ng ICE sa mga korte, paaralan, at ospital) ay makakaapekto lamang sa sibil na pagpapatupad.",
        "arguments_against_change": "Iginiit ng mga gustong mas buong pakikipagtulungan sa ICE na ang pagpapalaya sa mga taong na-flag ng ICE — kabilang ang ilan na may nakaraang rekord ng krimen na hindi tumutugma sa mga eksepsiyon — ay maaaring magbalik sa mga komunidad ng mga taong pinaniniwalaan ng pederal na awtoridad na maaaring i-deport. Sinasabi nila na ang mga nakaplanong paghahatid mula sa kulungan ay mas ligtas para sa mga opisyal at sa publiko kaysa sa pag-aresto ng ICE sa lansangan, at na ang pagpapatupad ng imigrasyon ay isang pederal na trabaho na hindi dapat hadlangan ng estado. Sa kanilang pananaw, ang pagtanggi sa mga hiling ng ICE ay nakakasama sa kaligtasan ng publiko at sa pagtutulungan ng pederal-estado.",
        "comparison": "Ang California ay kabilang sa mga estado na pinakanaglilimita sa lokal na pakikipagtulungan sa mga ahente ng imigrasyon, kasama ang Illinois (ang TRUST Act) at ilang iba pa. Sa kabilang banda, ang mga estado tulad ng Texas (kasama ang batas nitong SB 4) at Florida ay nag-uutos sa mga lokal na ahensya na makipagtulungan sa ICE at nagbabawal ng mga patakaran sanctuary. Ang pederal na programang 287(g) ay may mga kasunduan sa humigit-kumulang 1,600 ahensya sa buong bansa pagsapit ng 2026 — halos wala sa California.",
        "note_on_options": "Dahil ang SB 54 ay isang batas at pinagtibay sa korte, ang makatotohanang saklaw para sa isang gobernador ay umaabot mula sa pagpapatupad/gabay na nagmamaksimisa ng mga felony carve-out (mababang dulo) hanggang sa paglagda ng mga panukalang batas na pinapaliit ang pagbabahagi ng datos o ang access sa pasilidad ng ICE (mas mataas na dulo). Ang lubusang pagbawi (mas mababa pa sa stance 1) o ang lubos na pag-aalis ng lahat ng pagtutulungan (higit sa stance 5) ay mangangailangan ng aksyong pambatasan na hindi kayang gawing mag-isa ng isang gobernador.",
        "key_facts": [
          "Nagkabisa ang [SB 54](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB54) noong Enero 1, 2018. Idinemanda ng unang administrasyong Trump upang hadlangan ito at natalo: ibinasura ang kaso, sumang-ayon ang Ninth Circuit na korte ng apela, at tumanggi ang U.S. Supreme Court na pakinggan ito — kaya nananatili pa rin ang batas.",
          "Ang mga 287(g) na kasunduan (na nagdedeputiza sa mga lokal na opisyal na gawin ang pagpapatupad ng imigrasyon) ay ipinagbabawal para sa mga ahensya ng California sa ilalim ng SB 54. Noong 2025, isang pagtatangka ng sheriff ng Shasta County ang naitigil dahil sumasalungat ito sa batas ng estado.",
          "Pinapayagan ng mga eksepsiyon ng SB 54 ang mga ahensya na ipaalam o ibigay ang isang tao sa ICE kung ang taong iyon ay nahatulan ng tiyak na malubha o marahas na felony — hindi para sa mga taong ang tanging isyu ay ang kanilang katayuan sa imigrasyon.",
          "Ang TRUTH Act (2016) ay nag-uutos na sabihan ang mga tao na maaari nilang tanggihan ang isang panayam ng ICE sa kulungan, at nag-uutos ng isang pampublikong pulong sa komunidad kapag binibigyan ng mga lokal na ahensya ang ICE ng access.",
          "Ang mga patakaran sanctuary ay karamihang itinakda ng batas ng estado, kaya ang pangunahing kasangkapan ng isang gobernador ay ang gabay sa pagpapatupad, ang paraan ng attorney general sa mga kaso, ang mga patakaran sa kulungan, at ang paglagda o pag-veto sa mga bagong panukalang batas — hindi ang tuwirang pagbawi sa batas."
        ]
      }
    },
    "homelessness": {
      "name": "Tugon sa kawalan ng tirahan",
      "short_description": "Paano dapat harapin ng California ang kawalan ng tirahan — mas umasa sa pagpapatupad, o sa pabahay at serbisyo?",
      "stance_scale": {
        "1": "Linisin ang mga encampment at palawakin ang court-ordered na paggamot bilang pangunahing kasangkapan",
        "2": "Manguna sa pagpapatupad, ngunit mag-alok ng serbisyo nang sabay",
        "3": "Balansehin ang dalawa — linisin lamang ang mga kampo kapag may available na silungan o serbisyo",
        "4": "Manguna sa housing first; gamitin ang pagpapatupad nang katipiran",
        "5": "Mamuhunan nang malaki sa pabahay at serbisyo; gamitin ang pagpapatupad bilang huling paraan lamang"
      },
      "voter_guide": {
        "explainer": "Ang \"Housing First\" ay nangangahulugang pagbibigay sa isang tao ng permanenteng lugar na matitirhan kaagad, nang hindi muna kinakailangan na magpakaayos o tumanggap ng paggamot — ang ideya ay mas madaling harapin ang adiksyon o sakit sa pag-iisip kapag may bubong ka na sa ulunan. Ang isang \"conservatorship\" ay isang utos ng korte na naglalagay sa ibang tao o ahensya na mamahala sa mga desisyon para sa isang taong natuklasan ng hukom na hindi kayang alagaan ang sarili. Ang \"CARE Court\" ay isang mas bagong sibil na track ng korte na maaaring mag-utos ng plano sa paggamot para sa mga taong may malubhang hindi nagagamot na sakit sa pag-iisip. Ang \"point-in-time count\" (PIT count) ay isang isang-gabing bilang tuwing Enero kung ilang tao ang walang tirahan.",
        "current_policy": "Ang opisyal na patakaran ng California ay \"Housing First\": ang mga programang pinopondohan ng estado ay dapat mag-alok sa mga tao ng permanenteng pabahay kaagad, nang hindi muna kinakailangan na magpakaayos o tumanggap ng paggamot. Nakasulat ito sa batas ng estado (Welfare & Institutions Code §8255). Bukod doon, kamakailan ay nagdagdag ang estado ng mga opsyon sa pagpapatupad at paggamot. Itinatag ng CARE Act ([SB 1338](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1338), ipinasa noong 2022) ang mga sibil na korte na maaaring mag-utos ng plano sa paggamot para sa mga taong may hindi nagagamot na sakit na tulad ng schizophrenia, at bawat county ay nagpapatakbo na nito pagsapit ng Disyembre 2024. Inaprubahan ng [Proposition 1](https://calmatters.org/california-voter-guide-2024/prop-1-mental-health/) (Marso 2024) ang isang $6.4 billion na bono para sa pabahay at paggamot sa kalusugang pangkaisipan at nilipat ang ilang umiiral na pondo sa kalusugang pangkaisipan. Matapos ang desisyong [Grants Pass v. Johnson](https://calmatters.org/housing/2024/06/california-homeless-camps-grants-pass-ruling/) ng U.S. Supreme Court (Hunyo 2024), inutusan ni Gobernador Newsom ang mga ahensya ng estado at mga lungsod na linisin ang mga encampment at nagbahagi ng modelong anti-camping na ordinansa na maaari nilang ampunin.",
        "arguments_for_change": "Sinasabi ng mga pumapabor sa serbisyong-nangunguna, Housing First na paraan (ang mataas na dulo ng sukatan) na ang isang matatag na tahanan ang nagbibigay-daan upang harapin ang adiksyon at sakit sa pag-iisip — hindi isang gantimpalang pagkakamtan mo pagkatapos. Itinuturo nila ang mga pag-aaral na nagpapakita na pinapanatili ng Housing First na may tirahan ang mga tao. Iginiit nila na ang paglinis ng mga kampo ay basta na lamang naglilipat ng mga tao nang hindi pinaliit ang populasyon, at nagpapasan sa kanila ng rekord ng krimen na nagpapahirap pang makahanap ng pabahay. At nagbababala sila na ang pagpapalawak ng sapilitang paggamot o conservatorship ay nanganganib na pwersahin ang mga taong hindi naman inalok ng sapat na boluntaryong tulong muna.",
        "arguments_against_change": "Sinasabi ng mga pumapabor sa mas maraming pagpapatupad, mandato sa paggamot, at conservatorship (ang mababang dulo) na gumastos na ang California ng higit sa $20 billion sa kawalan ng tirahan sa nakaraang mga taon habang ang bahagi ng mga nakatira sa labas ay nanatiling malapit sa pinakamataas sa bansa. Iginiit nila na ang pabahay lamang ay hindi gumagana para sa maraming tao sa lansangan na may hindi nagagamot na malubhang sakit sa pag-iisip o adiksyon, na ang mga nakikitang encampment ay lumilikha ng tunay na problema sa kalusugan at kaligtasan, at na pinapayagan na ngayon ng desisyong Grants Pass ang estado na isabay ang isang alok ng silungan at paggamot sa mga kahihinatnan kung tatanggi ang isang tao.",
        "comparison": "Lumaki nang halos 3% ang populasyon ng mga walang tirahan sa California noong 2024 — mas maliit kaysa sa halos 18% na pagtaas ng kawalan ng tirahan sa buong bansa. Ngunit ang estado pa rin ang may pinakamaraming taong walang tirahan sa lahat ng estado, ang pinakamalaking bahagi ng kabuuan ng bansa, at ang pinakamataas na bahaging natutulog sa labas. Karamihan ng iba pang malalaking estado ay nakakapagpapasok ng mas malaking bahagi ng kanilang mga residenteng walang tirahan sa mga silungan.",
        "note_on_options": "Ang sukatan na ito ay tumatakbo mula sa pagpapatupad-at-sapilitang-paggamot (1) hanggang sa purong Housing First nang walang pagpapatupad (5). Maraming kandidato ang pumapabor sa mga kombinasyon — hal. pinalawak na mga kama sa paggamot kasama ang boluntaryong pabahay — na nasa gitna; ang mga dulo ay kumakatawan sa mga pinagtatalunang tanong kung dapat bang ikondisyon ang pabahay sa paggamot at kung dapat bang gamitin ang pagpapatupad ng pagbabawal sa kamping.",
        "key_facts": [
          "187,084 na taga-California ang nabilang na walang tirahan sa isang-gabing bilang noong Enero 2024, tumaas ng 3.1% mula sa 181,399 noong nakaraang taon (HUD).",
          "May humigit-kumulang 25% ang California ng populasyon ng walang tirahan ng bansa at ang pinakamataas na bahaging nakatira sa labas — halos dalawang-katlo ang natutulog sa lansangan sa halip na sa mga silungan.",
          "Ang [Grants Pass v. Johnson](https://calmatters.org/housing/2024/06/california-homeless-camps-grants-pass-ruling/) (Supreme Court, 6-3, Hunyo 2024) ay nagpasiya na ang pagbabawal sa pampublikong kamping ay hindi lumalabag sa Eighth Amendment. Inalis niyon ang naunang legal na hadlang sa pagtitiket o pag-aresto sa mga tao sa kamping kahit na walang available na silungan.",
          "Inaprubahan ng [Proposition 1](https://calmatters.org/california-voter-guide-2024/prop-1-mental-health/) (Marso 2024) ang isang $6.4 billion na bono para sa pabahay at paggamot sa kalusugang pang-asal, kabilang ang humigit-kumulang $4.4 billion sa mga grant upang magtayo ng halos 6,800 inpatient na kama sa paggamot, kasama ang permanenteng suportibong pabahay para sa mga beteranong walang tirahan at iba pa.",
          "Pagsapit ng unang bahagi ng 2026, higit sa 3,800 petisyon ng CARE Act ang naisampa mula nang maging pambuong-estado ang programa noong Disyembre 2024, at nagdagdag ang estado ng $291 million noong Marso 2026 para sa mga serbisyo at pabahay na may kaugnayan sa CARE."
        ]
      }
    },
    "gun_policy": {
      "name": "Patakaran sa baril",
      "short_description": "Dapat bang luwagan, panatilihing pareho, o paigtingin ang mga batas sa baril ng California?",
      "stance_scale": {
        "1": "Luwagan ang mga ito nang malaki (mas madaling concealed carry, mas magaang pagpapatupad)",
        "2": "Luwagan ang ilang tiyak na patakaran",
        "3": "Panatilihin ang kasalukuyang mga batas sa baril tulad ng kasalukuyan",
        "4": "Ipagtanggol ang kasalukuyang mga batas at isara ang mga butas",
        "5": "Magdagdag ng malalaking bagong restriksyon (rehistro ng baril, mas maraming pagbabawal)"
      },
      "voter_guide": {
        "current_policy": "Mayroon ang California ng ilan sa pinakamahigpit na batas sa baril sa bansa. Ang Roberti-Roos Assault Weapons Control Act (1989) at mga sumunod na batas ay nagbabawal ng maraming semiautomatic na \"assault weapon,\" at nililimitahan ng estado ang mga magazine sa 10 round. Noong 2022, ang kasong NYSRPA v. Bruen ng U.S. Supreme Court ay nagpawalang-bisa sa mga patakaran na nagpapahintulot sa mga opisyal na magpasya kung sino ang may \"sapat na dahilan\" upang magdala ng nakatagong baril. Bilang tugon, inilipat ng [SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB2) (2023, nagkabisa Enero 1, 2024) ang California sa \"shall-issue\" na mga permit — ibig sabihin ay sinumang kuwalipikado ay makakakuha ng isa — habang nagdagdag ng 16-oras na kinakailangang pagsasanay at isang mahabang listahan ng mga \"sensitibong lugar\" kung saan ipinagbabawal ang mga baril kahit may permit. Isang hiwalay na batas, ang [AB 28](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB28) (2023, nagkabisa 2024), ay nagdagdag ng 11% na buwis ng estado sa pagbebenta ng baril at bala upang pondohan ang mga programa sa pag-iwas sa karahasan at kaligtasan sa paaralan.",
        "arguments_for_change": "Itinuturo ng mga gustong magkaroon ng mas maraming restriksyon na ang mga estado na may mas malalakas na batas sa baril ay may kaugaliang mag-ulat ng mas mababang antas ng pagkamatay dahil sa baril. Iginiit nila na ang mga limitasyon sa assault-weapon at magazine, ang listahan ng sensitibong-lugar ng SB 2, at ang buwis ng AB 28 ay nagbabawas sa availability ng baril sa mga mapanganib na lugar habang binabayaran ang pag-iwas. Sinasabi nila na ang pagsasara sa mga natitirang puwang — at pagtatanggol sa kasalukuyang mga batas sa korte — ay nakapagliligtas ng buhay, at na pinapayagan pa rin ng Second Amendment ang makatwirang regulasyon.",
        "arguments_against_change": "Iginiit ng mga tumututol sa mas maraming restriksyon na mayroon na ang California ng pinakamahigpit na patakaran sa bansa ngunit may krimen pa rin sa baril, kaya maliit ang pakinabang mula sa mga bagong limitasyon. Sinasabi nila na ipinapahiwatig ng mga desisyon ng korte matapos ang Bruen na ang ilan sa mga batas ng California ay maaaring labag sa konstitusyon at nag-aanyaya ng mamahaling mga kaso. Iginiit nila na ang malawak na pagbabawal sa sensitibong-lugar at isang buwis sa pagbebenta ay nagpapasan sa mga sumusunod-sa-batas na may-ari ng baril at ginagawang nakadepende ang mga karapatan sa pagdadala sa kung nasaan ka. At sinasabi nila na mas mainam na itutok ang pagpapatupad sa ilegal na pangangalakal at sa mga taong pinagbawalan nang magmay-ari ng baril kaysa sa mga legal na bumibili.",
        "comparison": "Ang mga independyente at advocacy na scorecard ay paulit-ulit na nagra-rangko sa mga batas sa baril ng California bilang ang pinakamahigpit, o halos pinakamahigpit, sa bansa — kasama ang Massachusetts, New York, Illinois, at Connecticut. Sa kabilang banda, ang mga \"constitutional carry\" na estado tulad ng Texas, Arizona, at Idaho ay hindi nangangailangan ng permit upang magdala ng nakatagong baril at may mas kaunting limitasyon sa mga magazine at uri ng riple.",
        "note_on_options": "Karamihan ng batas sa baril ng California ay hinuhubog ng paglilitis sa Ninth Circuit at Supreme Court, kaya ang praktikal na saklaw ng isang gobernador ay tumatakbo mula sa pagtatanggol o pagpapaliit ng umiiral na mga patakaran sa liwanag ng mga desisyon ng korte (mababang dulo) hanggang sa paglagda ng mga bagong restriksyon at agresibong pagtatanggol sa mga ito (mas mataas na dulo). Ang 'pagbabalik' (stance 1) ay pangunahing mangangahulugan ng pagtanggi na ipagtanggol o paglagda ng mga pagbawi, kapwa pinipigil ng Lehislatura.",
        "key_facts": [
          "Ipinagbabawal ng California ang \"assault weapon\" mula nang ang 1989 Roberti-Roos Act at nililimitahan ang mga magazine sa 10 round.",
          "Pinanatili ng [SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB2) (nagkabisa Enero 1, 2024) ang mga shall-issue na permit matapos ang desisyong Bruen ngunit nagngalan ng halos 26 kategorya ng \"sensitibong lugar.\" Noong 2025, pinagtibay ng Ninth Circuit na korte ng apela ang ilan sa mga pagbabawal sa lokasyon at hinarang ang iba habang nagpapatuloy ang kaso.",
          "Ang 11% na buwis ng [AB 28](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB28) sa baril at bala (nagkabisa 2024) ay inaasahang maglilikom ng halos $160 million bawat taon para sa mga programa sa pag-iwas sa karahasan at kaligtasan sa paaralan. Nahaharap ito sa isang hindi pa nalulutas na hamon sa korte.",
          "Ang microstamping at iba pang mga patakaran sa panig ng gumagawa (tulad ng [SB 452](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB452), 2023) ay nasa batas pa rin, bagaman ang ilang bahagi ay tatakbo lamang kung matutuklasan na magagamit ang teknolohiya.",
          "Ilang batas sa baril ng California ang nasa aktibong paglilitis sa Ninth Circuit sa ilalim ng pagsusuring Bruen — na nagtatanong kung tumutugma ang isang batas sa \"kasaysayan at tradisyon\" ng bansa sa regulasyon ng baril — kaya ang mga patakarang maaaring talagang ipatupad ay nagbabago habang nagdedesisyon ang mga korte."
        ]
      }
    },
    "natgas_bridge": {
      "name": "Natural gas bilang bridge fuel",
      "short_description": "Anong papel dapat gampanan ng natural gas habang lumilipat ang California sa mas malinis na enerhiya?",
      "stance_scale": {
        "1": "Palawakin ang paggamit at imprastruktura ng natural gas",
        "2": "Panatilihin ang natural gas sa ngayon; unti-unting ibaba ito",
        "3": "Walang matibay na timeline — hayaang magpasya ang gastos at pagiging maaasahan ng grid",
        "4": "Alisin ang gas sa kuryente pagsapit ng kalagitnaan ng 2030s",
        "5": "Alisin ang gas nang mabilis sa mga tahanan, negosyo, at power plant"
      },
      "voter_guide": {
        "current_policy": "Nakukuha pa rin ng California ang halos 40% ng kuryente nito sa loob ng estado mula sa natural gas, at pinaiinit ng gas ang karamihan ng halos 14 milyong tahanan nito. Ngunit pinapatnubayan ng estado ang mga bagong gusali patungo sa elektrikong kuryente sa halip. Noong 2022, nagtakda ang California Air Resources Board (CARB — ang ahensya ng kalidad ng hangin ng estado) ng layunin: pagsapit ng 2030, bawat bagong furnace at water heater na ibinebenta para sa mga tahanan ay dapat zero-emission, kasunod ang mga komersyal na gusali pagsapit ng 2035. Isinusulat pa rin ng CARB ang aktwal na patakaran upang mangyari iyon. Pinaliit nito ang patakaran noong Disyembre 2025, at inaasahan ang isang boto ng lupon sa 2026, ngunit wala pang pinal. Samantala, dose-dosenang mga lungsod ang nagbawal ng gas sa bagong konstruksyon matapos gawin iyon ng Berkeley noong 2019 — hanggang sa isang desisyon ng pederal na korte ng apela noong 2023 (CRA v. Berkeley) na nagsabing pinapawalang-bisa ng pederal na batas sa appliance ang mga lokal na pagbabawal na iyon. Kaya lumipat ang estado sa paggamit ng mga code sa gusali at mga pamantayan sa emisyon sa halip.",
        "arguments_for_change": "Sinasabi ng mga tagasuporta ng mas mabilis na paglipat mula sa gas na ang mga gusali ay malaking pinagmumulan ng mga greenhouse gas at polusyong bumubuo ng usok, at na ang pagsunog ng gas sa loob ng bahay ay nagdudulot ng mga alalahanin sa kalusugan. Iginiit nila na ang pagtatayo ng mga bagong tubo at koneksyon ng gas ay mapanganib dahil maaaring maging walang halaga ang kagamitang iyon habang nagiging elektriko ang grid. Itinuturo nila na nananaig na ngayon ang mga heat pump kaysa sa mga gas furnace sa karamihan ng klima ng California. At nagbababala sila na habang mas kaunti ang mga kustomer na gumagamit ng gas, ang nakatakdang gastos ng pagpapanatili ng network ng tubo ay napupunta sa mga taong naiwan — kadalasang mga sambahayang may mababang kita — kaya mas mura ang isang planado, maayos na paglipat kaysa sa magulo.",
        "arguments_against_change": "Sinasabi ng mga tagasuporta ng pagpapanatili ng gas bilang bridge na ang gas ay maaaring buksan kaagad upang i-backup ang solar at hangin kapag hindi available ang mga iyon, na tumutulong na maiwasan ang mga blackout sa peak demand. Iginiit nila na ang pagpilit sa lahat na maging elektriko ay nagtataas ng paunang gastos para sa mga pamilya at nagpapahirap sa isang grid na mahal na. Sa pagiging ika-2 pinakamataas na presyo ng kuryente ng California sa bansa, sinasabi nila na hindi tiyak ang perang natitipid sa pagpapatakbo ng heat pump. At nagbababala sila na ang biglaang mga mandato ay nauuna sa mga pag-upgrade ng electrical panel at sanay na manggagawa na kailangan upang mag-install ng milyun-milyong heat pump.",
        "comparison": "Ang California ay isa sa pinaka-agresibong estado sa paglipat ng mga gusali mula sa gas, kasama ang New York (na nagbawal ng gas sa karamihan ng mga bagong gusali simula 2026) at Washington. Karamihan ng mga estado ay napunta sa kabilang direksyon: higit sa 20 ang nagpasa ng mga batas na nagbabawal sa mga lungsod na limitahan ang mga koneksyon ng natural gas.",
        "note_on_options": "Sinusukat ng sukatang ito ang bilis ng paglipat mula sa gas, hindi kung dapat bang mag-decarbonize sa anumang paraan — halos lahat ng kandidato ay tumatanggap sa pangmatagalang layunin ng estado na carbon-neutrality. Ang hindi pagkakasundo ay tungkol sa timeline at mga mandato (pagbabawal sa appliance, pagbabawal sa koneksyon, pagreretiro ng sistema ng gas) laban sa mga insentibo at boluntaryong pag-ampon.",
        "key_facts": [
          "Halos 40% ng kuryente ng California ay nanggagaling sa natural gas, at pinaiinit ng gas ang karamihan ng mga tahanan at tubig ng estado.",
          "Ang plano ng CARB noong 2022 ay naglalayong gawing 100% zero-emission ang mga bagong furnace at water heater ng tahanan na ibinebenta pagsapit ng 2030 — ngunit hindi pa tapos ang patakarang magpapatupad nito, at pinaliit noong Disyembre 2025.",
          "Isang desisyon ng pederal na korte ng apela noong 2023 (CRA v. Berkeley) ay nagsabing ang mga lokal na pagbabawal sa koneksyon ng gas sa mga bagong gusali ay pinapawalang-bisa ng pederal na batas sa appliance.",
          "Nag-aalok ang California ng mga rebate para sa mga heat pump (mga elektrikong yunit ng pampainit-at-pampalamig) sa pamamagitan ng TECH Clean California at mga programa ng utility, na naglalayong 6 milyong naka-install pagsapit ng 2030.",
          "Ang Aliso Canyon — ang lugar ng imbakan ng gas ng 2015–16 na pagsabog ng methane ng SoCalGas, ang pinakamalaki sa kasaysayan ng U.S. — ay tumatakbo pa rin. Ang minsang nakaplanong pagsasara sa 2027 ay hindi na inaasahan hanggang sa pinakaaga ay sa huling bahagi ng 2030s."
        ]
      }
    },
    "prop13_commercial": {
      "name": "Buwis sa komersyal na ari-arian (Prop 13 split-roll)",
      "short_description": "Nililimitahan ng California ang buwis sa ari-arian batay sa presyo ng pagbili ng isang ari-arian (Prop 13). Dapat bang sa halip ay buwisan ang negosyo at komersyal na ari-arian sa halaga sa merkado ngayon?",
      "stance_scale": {
        "1": "Palakasin ang limitasyon sa buwis para sa komersyal na ari-arian",
        "2": "Panatilihin ang kasalukuyang limitasyon sa buwis para sa komersyal na ari-arian",
        "3": "Baguhin ito para lamang sa pinakamalalaking komersyal na ari-arian",
        "4": "Unti-unting buwisan ang komersyal na ari-arian sa halaga sa merkado",
        "5": "Buong buwisan ang komersyal na ari-arian sa halaga sa merkado"
      },
      "voter_guide": {
        "explainer": "Ang Proposition 13, na ipinasa ng mga botante noong 1978, ang nagtatakda kung paano binubuwisan ng California ang ari-arian. Ang iyong buwis sa ari-arian ay nililimitahan sa 1% ng iyong binayad para sa ari-arian, at ang nabubuwisang halaga ay maaari lamang tumaas ng halos 2% bawat taon — kahit gaano kalaki ang pag-akyat ng halaga sa merkado ng ari-arian. Ang buong singil ay nagiging dapat bayaran lamang kapag naibenta ang ari-arian at muling sinuri sa bagong presyo. Naaangkop ito sa mga tahanan, tindahan, opisina, at pabrika nang pantay-pantay. Ang \"split-roll\" ay nangangahulugang pagbubuwis sa ari-arian ng negosyo nang iba sa mga tahanan; hindi kasalukuyang ginagawa ito ng California.",
        "current_policy": "Sa ilalim ng [Prop 13](https://lao.ca.gov/Publications/Report/3497) (1978), ang lahat ng ari-arian ng California — mga tahanan, tindahan, opisina, at pabrika — ay binubuwisan sa 1% ng presyo ng pagbili nito, at ang nabubuwisang halaga ay maaaring tumaas nang hindi hihigit sa 2% bawat taon hanggang sa maibenta ang ari-arian at muling masuri. Ang ari-arian ng negosyo ay walang hiwalay (\"split-roll\") na pagtrato. Sana ay binago iyon ng [Prop 15](https://lao.ca.gov/BallotAnalysis/Proposition?number=15&year=2020) (2020) para sa karamihan ng komersyal at industriyal na ari-arian, na binubuwisan ito sa kasalukuyang halaga sa merkado habang iniiwan ang mga tahanan sa ilalim ng mga patakaran ng Prop 13. Nabigo ito, 52% laban sa 48%.",
        "arguments_for_change": "Sinasabi ng mga tagasuporta ng komersyal na split-roll na ang patakaran ng [Prop 13](https://lao.ca.gov/Publications/Report/3497) sa presyo ng pagbili ay nagpapahintulot sa matagal-nang-hawak na ari-arian ng negosyo — mga tore ng opisina, mall, malalaking industriyal na lugar — na buwisan sa mga halagang luma na nang dekada. Inililipat niyon ang mas malaking bahagi ng buwis sa mas bagong mga may-ari at may-ari ng bahay. Itinuturo nila ang $6.5–$11.5 billion na pagtatantya ng LAO bilang matatag na pera para sa mga paaralan at lokal na serbisyo, at iginiit na ang pagbubuwis sa ari-arian ng negosyo sa halaga sa merkado — habang pinoprotektahan pa rin ang mga may-ari ng bahay at maliliit na negosyo — ay nag-aayos sa kawalan ng balanse nang hindi ginagalaw ang mga proteksyon ng bahay.",
        "arguments_against_change": "Sinasabi ng mga tumututol na ang mas mataas na buwis sa komersyal na ari-arian ay ipinapasa sa mga umuupa — maliliit na negosyo, restawran, umuupa — at sa huli sa mga mamimili, na nagtataas ng presyo sa buong ekonomiya. Nagbababala sila na ang muling pagsusuri sa ari-arian sa halaga sa merkado bawat taon ay komplikado at nag-aanyaya ng mga kaso, na pinakatatamaan niyon ang mga negosyo sa mga panahon ng pagbaba kung kailan hindi matatag ang halaga at renta, at na ang pagpapahina ng Prop 13 para sa anumang uri ng ari-arian ay nagbubukas ng pinto upang unti-unting pahinain ang mga proteksyon ng bahay sa bandang huli — sinisira ang pagiging mahuhulaan na ipinagboto ng mga botante noong 1978.",
        "comparison": "Hindi pangkaraniwan ang California sa pagbubuwis sa ari-arian ng negosyo at residensyal sa parehong paraan — ikinakabit ang dalawa sa presyo ng pagbili. Karamihan ng mga estado ay muling sinusuri ang lahat ng ari-arian patungo sa kasalukuyang halaga sa merkado paminsan-minsan. Bilang resulta, ang isang komersyal na gusali sa California na hawak nang ilang dekada ay maaaring buwisan nang mas mababa kaysa sa isang halos magkapareho na naibenta kamakailan.",
        "note_on_options": "Ang sukatan ay isang malinis na gradient: ang opsyon 1 ay nagpapalakas sa mga proteksyon ng Prop 13 para sa komersyal na ari-arian, ang opsyon 3 ay isang naka-target na reporma na naaangkop lamang sa napakalalaking pag-aari (ang modelong small-business carve-out mula sa Prop 15), at ang opsyon 5 ay isang buong market-value na split-roll. Ang mga proteksyon ng residensyal na Prop 13 ay hindi isyu rito — bawat opsyon ay iniiwan ang mga ito nang buo.",
        "key_facts": [
          "Nililimitahan ng [Prop 13](https://lao.ca.gov/Publications/Report/3497) ang antas ng buwis sa ari-arian sa 1% ng presyo ng pagbili at nililimitahan ang taunang paglaki sa nabubuwisang halaga sa 2% — hanggang sa mapalit ang may-ari ng ari-arian at masuri muli.",
          "Tinaya ng LAO na sana ay naglikom ang [Prop 15](https://lao.ca.gov/BallotAnalysis/Proposition?number=15&year=2020) ng $6.5 billion hanggang $11.5 billion bawat taon para sa mga lokal na gobyerno at paaralan kapag buong naipatupad na (sa paligid ng 2025).",
          "Sa perang iyon, halos 60% sana ay napunta sa mga lungsod, county, at espesyal na distrito, at 40% sa mga paaralan at community college (LAO).",
          "Iniwan ng Prop 15 ang mga tahanan nang buong-buo. Pinalibre rin nito ang maliliit na negosyong may $3 million o mas mababa na komersyal na ari-arian sa California, kasama ang hanggang $500,000 ng kagamitan ng negosyo.",
          "Natalo ang Prop 15 sa buong estado, 51.9% laban sa 48.1%, noong Nobyembre 2020."
        ]
      }
    },
    "healthcare_funding": {
      "name": "Mekanismo ng pondo sa pangangalagang pangkalusugan",
      "short_description": "Dapat bang gumalaw ang California patungo sa isang state-run, single-payer na sistemang pangkalusugan (sinasaklaw ng estado ang lahat sa halip na pribadong insurance) — at kung gayon, paano ito babayaran?",
      "stance_scale": {
        "1": "Bawiin ang kamakailang pagpapalawak ng saklaw na pangkalusugan ng estado (Medi-Cal)",
        "2": "Panatilihin ang kasalukuyang sistema; magpokus sa pagbaba ng gastos",
        "3": "Palawakin ang saklaw nang unti-unti, nang walang malaking bagong buwis",
        "4": "Single-payer, pangunahing binabayaran ng mga buwis sa yaman at korporasyon",
        "5": "Single-payer, binabayaran ng malawak na bagong buwis (tulad ng buwis sa payroll)"
      },
      "voter_guide": {
        "explainer": "Ang \"Single-payer\" ay nangangahulugang isang planong pang-gobyerno ang nagbabayad ng medikal na singil ng lahat, sa halip na maraming pribadong kumpanya ng insurance. Ang \"ACA\" (Affordable Care Act, tinatawag ding Obamacare) ang pederal na batas na lumikha ng mga subsidized na marketplace kung saan maaaring bumili ng saklaw ang mga tao. Ang \"Medi-Cal\" ay ang bersyon ng California ng Medicaid — ang programa ng pampublikong saklaw na pangkalusugan para sa mga residenteng may mababang kita.",
        "current_policy": "Gumagamit ang California ng halo ng pribadong insurance kasama ang malaking tulong ng gobyerno, sa halip na isang state-run na plano. Ang Covered California ang Affordable Care Act (ACA) marketplace ng estado, kung saan bumibili ang mga tao ng saklaw, at nag-aambag ang estado upang ibaba ang premium. Ang Medi-Cal — ang bersyon ng California ng Medicaid, ang programa ng pampublikong saklaw para sa mga residenteng may mababang kita — ay pinalawak noong Enero 1, 2024 upang saklawin ang lahat ng kuwalipikadong undocumented na nasa hustong gulang, na ginagawang California ang unang estado na mag-alok ng buong saklaw ng Medicaid anuman ang katayuan sa imigrasyon ng isang tao. Paulit-ulit na nabigo ang mga pagsisikap na lumipat sa isang single government-run na plano: ang [AB 1400](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1400) (ang panukalang CalCare, 2022) ay binawi bago ang isang boto, at ang kasunod nito, ang [AB 2200](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2200) (2024), ay naitigil sa komite.",
        "arguments_for_change": "Sinasabi ng mga gustong lumipat patungo sa isang state single-payer na plano (ang mataas na dulo) na ang isang pampublikong plano ay aalisin ang overhead ng kumpanya ng insurance, mga premium, deductible, at limitadong network ng provider. Itinuturo nila ang ilang pagsusuri (tulad ng pagtatantya ng UC Berkeley Labor Center) na nagtaya na ang buong sistema ay maaaring gumastos nang mas kaunti sa kabuuan. Iginiit nila na ang pagsaklaw sa lahat — anuman ang trabaho o katayuan sa imigrasyon — ay mas simpleng patakbuhin, at na ang sukdulang laki ng California ay magbibigay dito ng kapangyarihan upang makipag-usap para sa mas mababang presyo.",
        "arguments_against_change": "Sinasabi ng mga gustong panatilihin ang kasalukuyang subsidized na pribadong merkado (ang mababang dulo) na ang halos $300–400 billion-bawat-taon na halaga ng single-payer ay mangangahulugan ng matatarik na bagong buwis, nang walang garantiya ng net savings. Binabanggit nila na nakadepende ito sa mga pederal na pag-apruba at mga eksepsiyon sa ERISA na maaaring hindi kailanman dumating. Nagbababala sila na ang pagbaligtad sa saklaw ng employer at Medicare na nasa karamihan ng tao na ay mapanganib, kapwa sa pulitika at sa praktikal — at na narating na ng California ang halos pandaigdigang saklaw sa pamamagitan ng pagpapalawak ng mga subsidy at Medi-Cal nang walang ganoong pagbaligtad.",
        "comparison": "Walang estado ng U.S. ang nagpapatakbo ng single-payer na sistema. Nagpasa ang Vermont ng isa noong 2014, pagkatapos ay binitawan ito dahil hindi nito malaman kung paano babayaran. Pumili ang California ng ibang landas — pagpapalawak ng mga subsidy at Medicaid — at narating ang isa sa pinakamababang antas ng walang insurance sa bansa habang pinananatili ang pribadong merkado ng insurance.",
        "note_on_options": "Sinusukat ng sukatang ito ang mekanismo ng pagpopondo — mula sa pagpapanatili ng isang subsidized na pribadong merkado (1) hanggang sa isang state-run na single-payer na plano tulad ng CalCare (5) — hindi kung dapat bang palawakin ang saklaw. Maaaring paboran ng isang kandidato ang malawak na pagpapalawak ng saklaw (hal. ang pagpapalawak ng Medi-Cal noong 2024) habang tumututol sa pagpopondo ng single-payer; ang ganitong mga posisyon ay napupunta sa gitna ng sukatan.",
        "key_facts": [
          "Pinalawak ng Medi-Cal ang buong saklaw sa lahat ng kuwalipikadong nasa hustong gulang anuman ang katayuan sa imigrasyon noong Enero 1, 2024 — ang unang estado na gumawa nito.",
          "Ang [AB 1400](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1400) (CalCare) ay namatay noong Enero 31, 2022 nang bawiin ito ng may-akda nito, kulang sa 41 boto sa Assembly na kailangan nito. Ang kasunod nito noong 2024, ang [AB 2200](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2200), ay naitigil sa Appropriations na komite.",
          "Tinaya ng mga analyst na ang CalCare ay magkakahalaga ng halos $314–391 billion bawat taon — higit sa buong general-fund na badyet ng estado — at mangangailangan ng mga bagong buwis sa payroll, negosyo, at mataas na kita.",
          "Ang isang single-payer na plano ay mangangailangan ng pederal na gobyerno na mag-apruba (sa pamamagitan ng mga tinatawag na Section 1332 at Medicaid/Medicare waiver) upang ilipat ang pederal na pera. Isang pederal na batas na tinatawag na ERISA ay naglilimita rin kung gaano maaaring i-regulate ng isang estado ang mga self-funded na planong pangkalusugan na ginagamit ng maraming malalaking employer.",
          "Bumaba ang antas ng walang insurance ng California sa halos 6–7% sa nakaraang mga taon — kabilang sa pinakamababa kailanman — salamat sa mga subsidy ng ACA at ang pagpapalawak ng Medi-Cal, hindi sa isang single-payer na sistema."
        ]
      }
    },
    "policing": {
      "name": "Pagpupulis at mga parusang kriminal",
      "short_description": "Paano dapat balansehin ng California ang mas maraming pulis, reporma sa pulisya, at mga alternatibong hindi pulis?",
      "stance_scale": {
        "1": "Palawakin ang pulisya at paigtingin ang mga parusang kriminal",
        "2": "Palawakin ang pulisya, na may ilang reporma",
        "3": "Gawin ang pareho — mas maraming opisyal at mas maraming pananagutan at alternatibo",
        "4": "Unahin ang reporma, pangangasiwa, at mga tugong hindi pulis",
        "5": "Ilipat ang malaking pondo mula sa pulisya patungo sa mga serbisyong pangkomunidad"
      },
      "voter_guide": {
        "current_policy": "Nagpasa ang California ng serye ng mga batas sa pananagutan ng pulisya habang iniiwan ang karamihan ng mga desisyon sa pagpopondo at pag-uusig sa mga lokal na ahensya at mga inihalal na district attorney. Itinaas ng [AB 392](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB392) (2019) ang pamantayan kung kailan maaaring gumamit ng nakamamatay na puwersa ang pulis — sa kung kailan ito \"kinakailangan\" upang pigilan ang isang agarang banta, sa halip ng lumang, mas maluwag na pamantayang \"makatwiran.\" Itinatag ng [SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB2) (2021), ang Kenneth Ross Jr. Police Decertification Act, ang isang proseso sa buong estado upang bawiin (\"decertify\") ang lisensya ng mga opisyal para sa malubhang maling pag-uugali at iulat ang mga umalis sa isang pambansang database. Nag-uutos ang [AB 1506](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1506) (2020) sa Department of Justice ng estado na imbestigahan ang mga pagbaril ng pulis na pumapatay sa mga sibilyang walang armas. Bumaba nang husto ang populasyon ng kulungan ng estado mula nang ang 2011 \"Realignment\" ([AB 109](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201120120AB109)) ay naglipat ng mas mababang-antas na mga felon mula sa mga kulungan ng estado patungo sa mga county.",
        "arguments_for_change": "Iginiit ng mga pumapabor sa pagbabawas ng pagkakulong at paggamit ng mga alternatibo na bumaba nang malaki ang populasyon ng kulungan ng California matapos ang Realignment nang walang matagal na pagtaas sa marahas na krimen — na nagpapahiwatig na maraming tao ang maaaring ligtas na masubaybayan sa kanilang mga komunidad. Sinasabi nila na ang mga programa sa diversion, paggamot sa kalusugang pangkaisipan at adiksyon, at tulong sa muling pagpasok ay humaharap sa mga ugat na sanhi nang mas mura kaysa sa kulungan, at na ang malalakas na patakaran sa pananagutan (AB 392, SB 2) ay bumubuo ng tiwala sa komunidad at nagbabawas ng mamahaling maling pag-uugali.",
        "arguments_against_change": "Iginiit ng mga pumapabor sa mas maraming pondo at mas mahigpit na parusa na ang pagkakaroon ng sapat na opisyal at malinaw na kahihinatnan ay pumipigil sa krimen at nagbibigay-tiwala sa mga biktima. Binabanggit nila na ang ilang uri ng krimen ay tumaas sa mga taon ng reporma at sinasabi na kailangan ang nakikitang pagpapatupad para sa tiwala ng publiko. Nagbababala sila na ang mga mandato sa pananagutan at mas mababang pagkakulong, kung hindi katumbas ng sapat na mapagkukunan ng pulis at pangangasiwa, ay maaaring magpahirap sa mga kagawaran at hayaang umikot ang mga paulit-ulit na nagkakasala. Sa kanilang pananaw, ang kaligtasan ng publiko ay hindi dapat ipagpalit upang mababaan ang bilang ng kulungan.",
        "comparison": "Ang pamantayang \"kinakailangan\" sa paggamit ng puwersa ng California at ang sistema ng decertification sa buong estado ay mas malalakas kaysa sa marami sa mga estado, bagaman ang mga estado tulad ng Colorado at New Jersey ay nag-ampon ng katulad na mga reporma matapos ang 2020. Ang antas ng pagkakulong ng California ay nasa malapit o bahagyang mas mababa sa pambansang average — at higit na mas mababa kaysa sa mga estado na may mataas na pagkakulong tulad ng Mississippi, Louisiana, at Texas.",
        "note_on_options": "Ang mga badyet sa pagpupulis at karamihan ng mga desisyon sa paghahabla ay lokal, kaya ang mga kasangkapan ng isang gobernador ay ang mga pamantayan sa buong estado, operasyon ng CDCR, kapasidad ng kulungan, mga grant, at paglagda ng panukalang batas. Ang stance 1 (mas maraming pondo, mas mahigpit na parusa) at stance 5 (decarceration, mga alternatibo) ay naglalarawan ng direksyon at diin na maitutulak ng isang gobernador, hindi ang isahang kontrol sa mga lokal na puwersa ng pulis o mga kulungan ng county.",
        "key_facts": [
          "Nagtakda ang [AB 392](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB392) (2019) ng pamantayang \"kinakailangan\" para sa nakamamatay na puwersa ng pulis — isa sa mas mahigpit na batas sa paggamit ng puwersa sa bansa.",
          "Binigyan ng [SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB2) (2021) ang lupon ng pamantayan ng pulis ng estado (POST) ng kapangyarihan na i-decertify ang mga opisyal para sa malubhang maling pag-uugali. Ang mga na-decertify na opisyal ay hindi maaaring muling kunin at nakalista sa National Decertification Index.",
          "Nag-uutos ang [AB 1506](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1506) (2020) sa Department of Justice ng estado na imbestigahan ang mga nakamamatay na pagbaril ng pulis sa mga sibilyang walang armas.",
          "Bumaba ang populasyon ng kulungan ng California sa halos 90,600 pagsapit ng Disyembre 2025 — humigit-kumulang 27% na mas mababa kaysa Disyembre 2019 — matapos ang 2011 Realignment ([AB 109](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201120120AB109)) at mga pagbabawas sa panahon ng pandemya. Nagsara ang estado ng maraming kulungan.",
          "Ang antas ng pagkakulong ng California ay halos 294 bawat 100,000 nasa hustong gulang noong 2025, mas mababa mula sa rurok na higit sa 173,000 kabuuang bilanggo noong 2006. Ang tauhan at badyet ng pulis ay itinakda nang lokal, kaya limitado ang tuwirang kontrol ng isang gobernador."
        ]
      }
    },
    "oil_gas": {
      "name": "Produksyon ng langis at gas sa CA",
      "short_description": "Dapat bang maghukay ang California ng mas maraming langis at gas sa loob ng estado, panatilihin ang kasalukuyang antas, o ibaba ito?",
      "stance_scale": {
        "1": "Maghukay ng mas marami — palawakin ang langis at gas sa loob ng estado",
        "2": "Panatilihin ang kasalukuyang produksyon; pagaanin ang mga regulasyon",
        "3": "Panatilihin ang mga bagay nang halos pareho",
        "4": "Ibaba ito — paigtingin ang mga patakaran, itigil ang pag-isyu ng bagong permit sa paghuhukay",
        "5": "Tuldukan ang paghuhukay sa loob ng estado nang mabilis"
      },
      "voter_guide": {
        "current_policy": "Pinapayagan ng California ang paghuhukay ng langis at gas sa loob ng estado, ngunit pinaigting nito ang mga patakaran at hindi nag-aapruba ng maraming bagong paghuhukay. Ipinagbabawal ng [SB 1137](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1137) (Gonzalez, 2022) ang mga bago o muling ginawang balon sa loob ng 3,200 talampakan mula sa mga tahanan, paaralan, ospital, at iba pang lugar kung saan nananatili nang matagal ang mga tao. Sinubukan ng industriya ng langis na ibasura ang batas sa pamamagitan ng isang referendum sa balota, ngunit binawi ito noong Hunyo 26, 2024 — kaya nagkabisa ang batas sa buffer-zone sa halip na pumunta sa mga botante bilang panukala sa balota ng 2024. Bumaba nang husto ang produksyon ng langis sa loob ng estado: nag-pump ang California ng halos 104 milyong bariles ng krudo noong 2024, bumaba nang humigit-kumulang 70% mula sa rurok nito. At ang Low Carbon Fuel Standard ng CARB — isang patakaran ng estado na nagtutulak sa mga gasolina sa transportasyon na maglabas ng mas kaunting carbon, sinusugan noong 2024 at nagkabisa Hulyo 2025 — ay patuloy na pinaiigting ang mga target na iyon.",
        "arguments_for_change": "Sinasabi ng mga tagasuporta ng mas mabilis na pagtatanggal ng langis na ang paghuhukay ay nagkokonsentra ng polusyon sa hangin at pinsala sa kalusugan sa mga komunidad na may mababang kita at Latino na malapit sa mga balon. Binabanggit nila na bumababa na ang produksyon sa loob ng estado at nagbibigay lamang ng kakaunting bahagi ng krudo na nilinis ng California — kaya ang maayos na pagbaba nito ay magkakaroon ng limitadong epekto sa suplay. Iginiit nila na ang patuloy na paghuhukay ay sumasalungat sa layunin ng estado na carbon-neutrality, at na bawat bagong balon ay nagdaragdag sa tumpok ng mga inabandona, idle na balon na sa bandang huli ay kailangang bayaran ng estado upang linisin.",
        "arguments_against_change": "Sinasabi ng mga tagasuporta ng pagpapanatili ng produksyon na ang langis sa loob ng estado ay sumusuporta sa sampu-sampung libong trabaho at isang malaking bahagi ng base ng buwis ng Kern County. Iginiit nila na ang pagbawas sa lokal na suplay ay nangangahulugang pag-aangkat ng mas maraming krudo — kadalasang ginawa sa ilalim ng mas mahihinang patakarang pangkapaligiran sa ibang lugar — at nag-iiwan sa mga drayber na bukas sa pagtaas ng presyo. Nagbababala sila na ang mga pagsasara ng refinery ay nagbabanta na sa suplay at presyo ng gasolina, at na ang biglaang mga restriksyon ay nagtataas ng presyo ng gas sa isang estado na may kabilang nang pinakamataas na presyo sa bansa sa bombahan.",
        "comparison": "Ang California ang tanging malaking estado ng U.S. na gumagawa ng langis na pinagsasama ang malaking produksyon sa isang nakasaad na planong ibaba ang produksyon. Ang Texas, New Mexico, at North Dakota ay pawang nagpapalawak. Ang 3,200-talampakang buffer ng California sa pagitan ng mga bagong balon at tahanan ay kabilang sa pinakamalaking kinakailangang setback sa paghuhukay sa bansa.",
        "note_on_options": "Ang sukatan ay tumatakbo mula sa pagpapalawak ng produksyon (1) hanggang sa mabilis na pambuong-estado na pagtatanggal (5). Ang 'status quo' ay nasa malapit sa gitna: kasalukuyang pinapayagan ng California ang umiiral na produksyon na magpatuloy at bumaba habang nililimitahan ang mga bagong balon malapit sa mga komunidad. Ang isang kandidatong sumusuporta sa mga setback ng SB 1137 ngunit tumututol sa isang matigas na petsa ng pagtatapos sa pagkuha ay nasa paligid ng 3.",
        "key_facts": [
          "Ang 3,200-talampakang buffer ng [SB 1137](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1137) sa pagitan ng mga bagong balon at tahanan ay nagkabisa Hunyo 27, 2024 matapos bawiin ng industriya ang referendum na pagbawi nito. Ito ay HINDI ipinasa bilang panukala sa balota na 'Prop 4' — iyon ay isang karaniwang pagkalito.",
          "Gumawa ang California ng halos 104 milyong bariles ng krudo noong 2024 — bumaba nang humigit-kumulang 70% mula sa rurok nito. Ang estado ay nasa halos ika-7 sa mga gumagawa ng langis ng U.S.",
          "Ang Kern County ay umaako ng humigit-kumulang 65–70% ng produksyon ng langis ng California sa loob ng estado.",
          "Inaangkat ng California ang karamihan ng krudo na ginagamit ng mga refinery nito — humigit-kumulang isang-kapat lamang ang nanggagaling sa mga balon sa loob ng estado. Ang natitira ay dumadating sa pamamagitan ng dagat o mula sa Alaska.",
          "Ang pag-update ng CARB noong 2024 sa Low Carbon Fuel Standard (isang patakaran na nag-uutos sa mga gasolina sa transportasyon na maging mas malinis sa paglipas ng panahon; nagkabisa Hulyo 1, 2025) ay pinaigting ang mga target. Tinaya ng CARB na magdaragdag ito ng halos 5–8 sentimo bawat galon sa malapit na panahon, bagaman mas mataas ang ilang akademikong pagtatantya."
        ]
      }
    },
    "abortion": {
      "name": "Aborsyon at mga karapatang reproduktibo",
      "short_description": "Dapat bang palawakin, panatilihin, o limitahan ng California ang access sa aborsyon?",
      "stance_scale": {
        "1": "Magdagdag ng mga restriksyon (tulad ng limitasyon sa oras o pahintulot ng magulang)",
        "2": "Magpahintulot ng ilang restriksyon",
        "3": "Panatilihin ang kasalukuyang malalakas na proteksyon ng California",
        "4": "Palakasin ang access — mas maraming pondo at mas maraming provider",
        "5": "Lumayo pa — pondohan ang mga pasyente mula sa labas ng estado at palawakin kung sino ang maaaring magbigay ng pangangalaga"
      },
      "voter_guide": {
        "current_policy": "Ang aborsyon ay isang karapatang nakasulat sa konstitusyon ng California. Ang [Proposition 1](https://lao.ca.gov/BallotAnalysis/Proposition?number=1&year=2022) (Nobyembre 2022), na inaprubahan ng halos 66% ng mga botante, ay sumusog sa konstitusyon ng estado upang pagbawalan ang California na tanggihan o hadlangan ang kalayaang reproduktibo, kabilang ang aborsyon at kontraseptibo. Matapos tapusin ng desisyong Dobbs ng U.S. Supreme Court noong 2022 ang pederal na karapatan sa aborsyon, nagpasa ang Lehislatura ng isang hanay ng mga batas. Pinipigilan ng [AB 1242](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1242) at [AB 2091](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2091) (2022) ang pulis, negosyo, at provider ng California na tumulong sa mga imbestigasyon ng aborsyon mula sa labas ng estado o ibigay ang mga kaugnay na rekord. Pinoprotektahan ng [SB 345](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB345) (2023) ang mga provider na lisensyado sa California — kabilang ang mga nag-aalok ng telehealth at abortion pill — mula sa pag-uusig o extradition ng ibang estado. Sinasaklaw ng Medi-Cal ang aborsyon sa buong gastos ng estado, at naglaan ang estado ng higit sa $200 million upang suportahan ang access sa aborsyon at mga provider.",
        "arguments_for_change": "Sinasabi ng mga gustong palawakin pa ang mga proteksyon (ang mataas na dulo) na habang mas maraming estado ang nagpapataw ng pagbabawal, dapat kumilos ang California bilang isang kanlungan — pinopondohan ang paglalakbay at pangangalaga para sa mga pasyente mula sa labas ng estado, pinalalawak ang mga proteksyon at kapasidad ng provider, at nauuna sa anumang hinaharap na pederal na limitasyon. Iginiit nila na ang gastos at logistik, hindi lamang kung legal ang isang bagay, ang nagpapasya kung talagang makakakuha ng pangangalaga ang mga tao, kaya dapat itong pondohan at protektahan ng estado nang agresibo.",
        "arguments_against_change": "Iginiit ng mga pumapabor sa ilang limitasyon, o sa hindi pagpapalawak pa (ang mababang dulo), sa moral o relihiyosong batayan na ang aborsyon ay dapat humarap sa ilang restriksyon, tulad ng mga limitasyon sa mas huling bahagi ng pagbubuntis. Sinasabi nila na ang pampublikong pera ay hindi dapat magbayad para sa aborsyon o para sa pangangalaga ng mga pasyente mula sa labas ng estado, at na ang mga shield law at pondong kanlungan ay humihila sa California sa mga away sa batas ng ibang estado at nag-uunat sa kung ano ang hinihiling na saklawin ng mga nagbabayad ng buwis. Sa loob ng California, ito ay isang pananaw ng minorya dahil sa 66% na margin ng Prop 1.",
        "comparison": "Ang California ay isa sa pinaka-mapagprotektang estado para sa access sa aborsyon matapos ang Dobbs, na pinagsasama ang isang konstitusyonal na karapatan, saklaw ng Medi-Cal, pampublikong pondo, at mga shield law para sa provider. Salungat na salungat iyon sa higit sa dose-dosenang estado na nagbabawal o mariing naglilimita sa aborsyon, at naglalagay sa California sa isang maliit na grupo ng mga estado na hayagang nagpopondo at nagpoprotekta sa pangangalaga para sa mga pasyenteng nanggagaling sa ibang lugar.",
        "note_on_options": "Ang sukatang ito ay tumatakbo mula sa pagsuporta sa ilang restriksyon sa access (1) hanggang sa isang malawak na pinopondohan-ng-estadong inter-estadong kanlungan na may malawak na proteksyon ng provider (5). Dahil sa konstitusyonal na karapatan ng California at sa di-pantay na boto noong 2022, karamihan ng mga maaasahang kandidato ay nagkukumpol patungo sa mapagprotektang dulo; ang mga nagpapaibang tanong ay tungkol sa kung gaano lalayo sa pagpopondo ng inter-estadong pangangalaga at pagprotekta sa mga provider, hindi kung legal ang aborsyon sa loob ng estado.",
        "key_facts": [
          "Ang [Proposition 1](https://lao.ca.gov/BallotAnalysis/Proposition?number=1&year=2022) (2022) ay ipinasa na may halos 66% na suporta, na isinusulat ang isang tahasang karapatan sa aborsyon at kontraseptibo sa konstitusyon ng estado.",
          "Sinasaklaw ng Medi-Cal ang aborsyon kung saan binabayaran ng estado ang buong gastos, at ang mga pribadong planong insurance na inaayos ng estado ay sa pangkalahatan ay kinakailangan ding saklawin ito.",
          "Nagpasa ang California ng mga shield law — [AB 1242](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1242), [AB 2091](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2091) (2022) at [SB 345](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB345) (2023) — na nagpoprotekta sa mga provider at pasyente sa loob ng estado (kabilang ang mga pasyente mula sa labas ng estado na gumagamit ng telehealth) mula sa pagkahila sa mga pag-uusig sa aborsyon ng ibang estado.",
          "Naglaan ang estado ng higit sa $200 million sa kabuuan ng mga kamakailang badyet upang pondohan ang access sa aborsyon, palawakin ang kapasidad ng provider, at tulungan ang mga pasyente sa mga gastos tulad ng paglalakbay.",
          "Matapos ang Dobbs, itinakda ng California ang sarili bilang isang lugar na mapupuntahan ng mga pasyente mula sa mga estado na may pagbabawal para sa pangangalaga, na may pondo ng estado upang suportahan sila."
        ]
      }
    },
    "school_funding": {
      "name": "Pondo at pamamahala sa paaralang K-12",
      "short_description": "Dapat bang gumastos ang California ng mas marami, mas kaunti, o halos pareho sa mga pampublikong paaralang K-12?",
      "stance_scale": {
        "1": "Bawasan nang malaki ang gastos sa K-12",
        "2": "Bawasan o panatilihin ang gastos",
        "3": "Panatilihin ang gastos nang halos pareho",
        "4": "Dagdagan ang pondo nang katamtaman (sahod ng guro, pasilidad)",
        "5": "Dagdagan nang malaki ang pondo (sahod ng guro, mas maliliit na klase), maglikom ng bagong kita kung kinakailangan"
      },
      "voter_guide": {
        "explainer": "Ilang termino ang madalas lumitaw dito. Ang 'Prop 98' ay isang 1988 na susog sa konstitusyon ng estado na nagtatakda ng taunang minimum na dapat gastusin ng estado sa mga paaralang K-12 at community college. Ang 'LCFF,' ang Local Control Funding Formula, ay ang 2013 na sistema para sa pamamahagi ng perang iyon: bawat distrito ay nakakakuha ng base na halaga bawat mag-aaral, kasama ang dagdag para sa mga mag-aaral na may mababang kita, natututo ng Ingles, o nasa foster care. Ang 'paggastos bawat mag-aaral' ay kabuuang pera ng paaralan na hinati sa bilang ng mga mag-aaral. Ang 'NAEP' ay isang pambansang pagsusulit (binansagang 'the Nation's Report Card') na nagpapahintulot sa iyo na ihambing ang mga estado. Ang 'parcel tax' ay isang flat na lokal na buwis sa bawat ari-arian na ginagamit ng ilang distrito upang maglikom ng dagdag na pera para sa paaralan.",
        "current_policy": "Ang pondo ng K-12 ay nakasalalay sa dalawang haligi. Ang [Prop 98](https://lao.ca.gov/Publications/Report/4929) (1988) ay isang konstitusyonal na patakaran na nagtatakda ng taunang minimum na dapat gastusin ng estado sa mga paaralan at community college. Ang Local Control Funding Formula (LCFF, 2013) ang nagpapasya kung paano hahatiin ang perang iyon: bawat distrito ay nakakakuha ng base grant bawat mag-aaral, kasama ang supplemental grant (dagdag na 20% ng base) at, para sa mga distritong may maraming high-need na mag-aaral, isang concentration grant — lahat ay nakatuon sa mga mag-aaral na may mababang kita, natututo ng Ingles, o nasa foster care. Para sa 2024-25, ang minimum ng Prop 98 ay halos $115.3 billion sa kabuuan (humigit-kumulang $101.1 billion para sa K-12). Nagpasa rin ang mga botante ng [Prop 2](https://lao.ca.gov/BallotAnalysis/Proposition?number=2&year=2024) noong Nobyembre 2024, isang $10 billion na bono upang magtayo at ayusin ang mga gusali ng paaralan at community college.",
        "arguments_for_change": "Sinasabi ng mga gustong magkaroon ng mas maraming pondo at mas malakas na lokal na kontrol na gumagastos pa rin ang California ng mas kaunti bawat mag-aaral kaysa sa mga maihahambing na estado na may mataas na gastos, at na ang mga supplemental at concentration grant ng LCFF ay dapat na mas malaki upang isara ang mga puwang sa oportunidad para sa mga mag-aaral na may mababang kita, natututo ng Ingles, at kabataang nasa foster care. Iginiit nila na ang isang matatag, nakalaang pinagmumulan ng pera — isang buwis o isang bono — ay kailangan para sa mapagkumpitensyang sahod ng guro, mga gusali ng paaralan, at pagpapalawak ng transitional kindergarten, at na ang mga lokal na tagapagturo, hindi ang mga mandato ng Sacramento, ang pinakanakakaalam kung paano ito gagastusin.",
        "arguments_against_change": "Sinasabi ng mga nagdidiin sa pananagutan at reporma na umakyat nang malaki ang paggastos mula nang LCFF nang walang katumbas na pagtaas sa NAEP, kaya ang priyoridad ay dapat ipakita kung saan talaga napupunta ang perang concentration-grant at makakuha ng masusukat na resulta — hindi mga bagong buwis. Binabanggit nila na ginagarantiya na ng [Prop 98](https://lao.ca.gov/Publications/Report/4929) ang isang tumataas na sahig, na ang badyet ng estado ay umaalon kasama ng ekonomiya, at na ang maluwag na mga patakaran sa paggastos ng LCFF ay nagpapahirap na kumpirmahin na umaabot ang dagdag na pera sa mga high-need na mag-aaral na para dito ito inilaan.",
        "comparison": "Kapag inangkop mo na sa matataas na gastos ng California, ang paggastos nito bawat mag-aaral ay nasa upper-middle na ngayon ng mga estado, bagaman mas mababa pa rin kaysa sa malalaking gumagastos tulad ng New York. Ang mga marka nito sa NAEP ay nasa ibaba pa rin ng pambansang average, na nagpapanatili sa debate kung ang problema ay masyadong kaunting pera, kung paano ginagastos ang pera, o kakulangan ng pananagutan.",
        "note_on_options": "Ang sukatan ay sumasaklaw sa parehong antas ng pondo (mula sa pagbawas hanggang sa malaking bagong kita) at ang axis ng estado-laban-sa-lokal na kontrol. Maaari itong magkalayo: maaaring paboran ng isang kandidato ang mas maraming lokal na kontrol nang walang pagtaas ng buwis, o mas maraming pondong patnubay-ng-estado para sa pagkakapantay-pantay. Itinuturing ng aming default na pag-coding ang suporta sa isang nakalaang bagong buwis o bono bilang ang pinakamatibay na senyas na halaga-5 at ang isang pananagutan-muna, reporma-LCFF na paninindigan bilang halaga 1.",
        "key_facts": [
          "Ang kabuuang paggastos bawat mag-aaral mula sa lahat ng pinagmulan ay halos $23,878 para sa 2024-25 (pagtatantya ng estado), at inaasahang patuloy na tataas.",
          "Sa apples-to-apples na mga datos ng Census, gumastos ang California ng halos $19,894 bawat mag-aaral noong 2022-23 — humigit-kumulang ika-13 sa mga estado, mula sa ika-28 noong nakaraang taon.",
          "Sinasalansan ng LCFF (2013) ang isang supplemental grant (dagdag na 20% ng base) at isang concentration grant sa ibabaw ng base grant ng bawat distrito upang ituon ang mas maraming pera sa mga distritong mas high-need.",
          "Sa 2024 NAEP na pambansang pagsusulit, ang California ay nag-iskor nang bahagyang mas mababa kaysa sa pambansang average — halimbawa, 4th-grade reading 212 laban sa 214 at 8th-grade reading 254 laban sa 257 — bagaman ang pangmatagalang puwang nito sa iba pang bahagi ng bansa ay lumiit.",
          "Ang [Prop 2](https://lao.ca.gov/BallotAnalysis/Proposition?number=2&year=2024) (Nobyembre 2024) ay nagpahintulot ng $10 billion sa mga bono para sa mga gusali ng K-12 at community college; maraming distrito din ang naniningil ng mga lokal na parcel tax (isang flat na buwis sa bawat ari-arian), na nangangailangan ng dalawang-katlong pag-apruba ng botante."
        ]
      }
    }
  },
  "dimensions": {
    "years_in_office_band": {
      "name": "Mga taon sa inihalal na katungkulan",
      "description": "Mas gusto mo ba ang isang sariwang politikal na tinig, o isang taong may malawak na panunungkulan sa inihalal na katungkulan?",
      "scale": {
        "1": "Mariing mas gusto ang sariwa — wala pang 5 taon sa inihalal na katungkulan",
        "2": "Bahagyang sariwa",
        "3": "Walang kagustuhan",
        "4": "Bahagyang may karanasan",
        "5": "Mariing mas gusto ang malawak — 15+ taon sa inihalal na katungkulan"
      }
    },
    "career_path": {
      "name": "Pinagmulang karera",
      "description": "Aling mga pinagmulang karera ang nakakaakit sa iyo sa isang gobernador? (Iwanang blangko kung walang kagustuhan.)",
      "options": {
        "state_pol": "Pulitika ng estado (Assembly, Senate, katungkulan sa buong estado)",
        "federal_pol": "Pederal na pulitika (Kongreso, Gabinete)",
        "local_pol": "Lokal na pulitika (alkalde, konseho, sheriff)",
        "business": "Negosyo / pribadong sektor",
        "law_enforcement": "Pagpapatupad ng batas",
        "law": "Nagsasanay o akademikong batas",
        "activism": "Aktibismo / pag-oorganisa ng komunidad",
        "nonprofit": "Pamumuno sa nonprofit",
        "academia": "Akademya / pagtuturo",
        "media": "Media / pamamahayag",
        "health": "Pangangalagang pangkalusugan / pampublikong kalusugan",
        "social_work": "Social work / serbisyo publiko"
      }
    },
    "endorsement_coalition": {
      "name": "Koalisyon ng tagapagtaguyod",
      "description": "Kaninong senyas ng pagtataguyod ang pinakamahalaga sa iyo? (Iwanang blangko kung walang kagustuhan.)",
      "options": {
        "labor": "Mga unyon ng manggagawa",
        "environmental": "Mga organisasyong pangkapaligiran",
        "civil_rights": "Mga organisasyon ng karapatang sibil",
        "business": "Komunidad ng negosyo",
        "law_enforcement": "Mga asosasyon ng pagpapatupad ng batas",
        "womens_orgs": "Mga organisasyon ng kababaihan",
        "faith": "Mga komunidad ng pananampalataya",
        "latino_caucus": "Latino caucus / mga organisasyong Latino",
        "lgbtq_orgs": "Mga organisasyong LGBTQ+",
        "newspapers": "Mga pangunahing pahayagan ng California (LA Times, SF Chronicle, Sac Bee)",
        "dem_party": "California Democratic Party",
        "rep_party": "California Republican Party",
        "trump": "Donald Trump / mga pambansang pigura ng Republican"
      }
    },
    "geographic_background": {
      "name": "Pinagmulang heograpiya",
      "description": "Mas gusto mo ba ang isang kandidato mula sa isang partikular na rehiyon ng California? (Iwanang blangko kung walang kagustuhan.)",
      "options": {
        "bay_area": "Bay Area",
        "la_county": "Los Angeles County",
        "oc_ie": "Orange County / Inland Empire",
        "san_diego": "San Diego",
        "central_valley": "Central Valley",
        "north": "Far North / Sierra",
        "central_coast": "Central Coast"
      }
    },
    "electability": {
      "name": "Posibilidad na mahalal",
      "description": "Gaano nakakaapekto ang posibilidad sa pangkalahatang halalan — lakas sa botohan, pangangalap ng pondo, malawak na apela?",
      "scale": {
        "1": "Mapagpasya — binibigyang-bigat ko ang posibilidad na mahalal nang higit sa ibang salik",
        "2": "Malaking bigat",
        "3": "Katamtamang bigat",
        "4": "May ilang bigat",
        "5": "Hindi nakakaapekto — bumoboto ako sa pagkakahanay anuman ang posibilidad"
      }
    },
    "age_band": {
      "name": "Edad / henerasyon",
      "description": "Aling cohort ng edad ang mas gusto mo? (Opsyonal.)",
      "options": {
        "millennial": "Millennial (isinilang 1981–1996)",
        "gen_x": "Gen X (isinilang 1965–1980)",
        "boomer": "Baby Boomer (isinilang 1946–1964)",
        "silent": "Silent Generation (isinilang bago ang 1946)"
      }
    },
    "demographic_background": {
      "name": "Pinagmulang demograpiko",
      "description": "Aling mga pinagmulan ng kandidato ang mahalaga sa iyo nang positibo? (Opsyonal — iwanang blangko kung walang kagustuhan. Anonimo ang iyong mga sagot.)",
      "options": {
        "black": "Black / African American",
        "latino": "Latino / Hispanic",
        "aapi": "Asian American / Pacific Islander",
        "white": "Puti",
        "native": "Native American / Katutubo",
        "multiracial": "Multirasyal",
        "woman": "Babae",
        "man": "Lalaki",
        "nonbinary": "Non-binary",
        "lgbtq": "LGBTQ+",
        "catholic": "Katoliko",
        "protestant": "Protestante / Evangelical",
        "jewish": "Hudyo",
        "muslim": "Muslim",
        "hindu": "Hindu",
        "sikh": "Sikh",
        "secular": "Sekular / ateista / walang relihiyon",
        "immigrant": "Imigrante o first-generation na Amerikano",
        "veteran": "Beterano / serbisyong militar"
      }
    }
  }
};

DATASET_I18N.ko = {
  "questions": {
    "tax_wealth": {
      "name": "주(州) 부유세",
      "short_description": "캘리포니아는 가장 부유한 주민의 순자산에 세금을 매겨야 할까요 — 소득세와는 별개로, 부 자체에 부과하는 세금을 말합니다?",
      "stance_scale": {
        "1": "주 부유세에 반대",
        "2": "반대 쪽에 가까움 — 현재 지지하지 않음",
        "3": "열려 있음 / 미정",
        "4": "부유세 지지",
        "5": "초부유층에 대한 부유세를 강하게 지지"
      },
      "voter_guide": {
        "current_policy": "캘리포니아에는 부유세 — 누군가가 버는 소득이 아니라 소유한 것(순자산)에 부과하는 세금 — 가 없습니다. 서로 다른 두 가지 형태가 제기되었으며, 둘은 매우 다르게 작동합니다. 2023년 Asm. Alex Lee의 [AB 259](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB259)(헌법 개정안 ACA 3 포함)는 연간 세금 — 순자산 $50 million 초과분에 1%, $1 billion 초과분에 1.5% — 을 제안했으나 위원회에서 좌초되어 법이 되지 못했습니다. 이와 별도로, 일회성 조치인 'Billionaire Tax Act'(공식 명칭은 One-Time Wealth Tax for State-Funded Health Care Programs Initiative, SEIU-UHW가 후원)가 2026년 11월 투표용지에 올랐습니다: 캘리포니아 억만장자의 순자산에 5%를 단 한 차례 부과하며, 세수의 대부분은 의료에, 나머지는 교육과 식량 지원에 쓰입니다.",
        "arguments_for_change": "지지자들은 부유세가 소득세가 놓치는 부에 닿는다고 말합니다 — 억만장자들은 순자산이 계속 늘어나는 동안에도 과세 대상 소득을 낮게 유지할 수 있기 때문입니다 — 그리고 가장 큰 부에 대한 적당한 세금만으로도 소수의 납세자로부터 학교, 의료, 보육 재원을 마련할 수 있다고 주장합니다.",
        "arguments_against_change": "반대자들은 주 부유세가 심각한 법적·실무적 문제(누군가의 자산 가치를 어떻게 평가할 것인가?)에 부딪힌다고 말하며, 이동성이 가장 큰 주민들이 이를 피하려고 떠나거나 자산 구조를 바꿀 것이고, 소수의 사람에게 의존하는 세수는 예측하기 어렵다고 봅니다.",
        "comparison": "캘리포니아는 총 자산에 대한 진정한 세금을 운영하는 첫 미국 주가 될 것입니다. 다른 여러 고세율 주들도 이 발상을 검토했으나, 법적 분쟁, 자산 가치 평가의 어려움, 가장 부유한 주민들이 그저 떠나버릴 위험을 이유로 채택하지 않았습니다.",
        "key_facts": [
          "현재 진정한 부유세를 시행하는 미국 주는 없습니다.",
          "이는 서로 다른 두 가지 제안입니다. [AB 259](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB259)(2023, Alex Lee)는 연간 세금 — 순자산 $50 million 초과분에 1%, $1 billion 초과분에 1.5% — 이었으나 위원회에서 좌초되어 법이 되지 못했습니다.",
          "2026년 11월 투표용지에 오른 조치는 캘리포니아 억만장자($1 billion 초과)의 순자산에 정해진 기준일 기준으로 5%를 일회성으로 부과하는 것이며 — 반복되는 세금이 아닙니다. 세수의 대부분은 의료에 배정되고 일부는 교육과 식량 지원에 쓰입니다.",
          "일회성 세금은 특정 기준일의 부에 대해 한 번 부과되며, 연간 세금은 부를 보유하는 매년 반복됩니다. 2023년 법안은 연간 방식이었고, 2026년 투표 조치는 일회성입니다.",
          "광범위한 부유세는 Washington, New York, Massachusetts, Illinois에서 제안되었으나 무산되었습니다. 모든 부유세에서 가장 어려운 부분은 명확한 시장 가격이 없는 것 — 비상장 기업, 미술품, 부동산 — 의 가치를 평가하는 일입니다."
        ]
      }
    },
    "school_choice": {
      "name": "학교 선택권과 차터스쿨",
      "short_description": "캘리포니아는 차터스쿨 설립을 더 쉽게 또는 더 어렵게 만들고, 가정에 더 많은 학교 선택권을 주어야 할까요?",
      "stance_scale": {
        "1": "훨씬 더 많은 차터스쿨을 열고 가정 선택권을 확대",
        "2": "차터스쿨을 더 열고; 가정 선택권을 보호",
        "3": "현재 차터스쿨 규정을 대체로 유지",
        "4": "새 차터스쿨 설립을 더 어렵게",
        "5": "새 차터스쿨을 중단하고; 그 재원을 일반 공립학교로"
      },
      "voter_guide": {
        "explainer": "일반 공립학교는 지역 교육구가 운영하며 모든 학생에게 무료로 개방됩니다. 차터스쿨 역시 세금으로 운영되는 무료 공립학교이지만, 독립적으로 운영됩니다 — 보통 계약('차터')에 따라 비영리 단체가 운영하며 — 교육과 채용 방식에 더 많은 자유를 가지고 교육구의 감독은 덜 받습니다. 사립학교는 등록금을 받으며 주 재정 지원을 받지 않습니다. '학교 선택권'은 때때로 바우처 — 가정이 사립학교 등록금에 쓸 수 있는 공적 자금 — 를 의미하기도 하는데, 캘리포니아는 현재 이를 제공하지 않습니다.",
        "current_policy": "캘리포니아에는 약 1,283개의 차터스쿨과, 전부 차터로 구성된 7개 교육구가 있습니다(주 데이터, 2024년 5월). 이들은 공립학교 학생의 약 11.7%를 가르칩니다. 2019년의 두 법 — [AB 1505](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1505)와 [AB 1507](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1507), 둘 다 그해 10월에 서명되어 2020년 7월 1일 발효 — 은 차터의 설립과 갱신을 더 어렵게 만들었습니다. 이제 교육구는 재정적 타격이나 지역사회 영향을 이유로 새 차터를 거부할 수 있고, 차터는 일반적으로 승인한 교육구 밖에서 캠퍼스를 운영할 수 없으며, 성과가 낮은 차터는 갱신이 거부될 수 있습니다. 캘리포니아는 주 재정으로 지원하는 사립학교 바우처나 교육저축계좌를 제공하지 않습니다. (바우처는 가정에게 사립학교 등록금에 쓸 공적 자금을 주는 것이고, 교육저축계좌(ESA)는 정부가 재원을 대는 계좌로 부모가 등록금, 과외, 또는 기타 승인된 교육비에 쓸 수 있습니다.) 마지막 바우처 조치였던 2000년 [Prop 38](https://www.lao.ca.gov/ballot/2000/38_11_2000.html)은 71% 대 29%로 부결되었습니다.",
        "arguments_for_change": "더 많은 선택권을 원하는 사람들은 차터스쿨이 가정 — 상대적으로 저소득 가정과 유색인종 가정이 많습니다 — 에게 배정된 동네 학교 외의 선택지를 주며, 일부 차터 네트워크가 그런 학생들에게 좋은 성과를 낸다고 말합니다. 그들은 [AB 1505](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1505)가 교육구에게 경쟁자를 막을 금전적 이유를 주었다고 주장하며, 바우처나 교육저축계좌가 사립 등록금이나 우수 학군으로의 이주를 감당할 수 없는 가정에게 선택권을 열어줄 것이라고 봅니다.",
        "arguments_against_change": "반대자들 — California Teachers Association(CTA)과 California School Boards Association(CSBA) 포함 — 은 차터와 바우처가 학생 1인당 재원(각 학생을 따라가는 자금)을 교육구 학교에서 빼앗아 간다고 말합니다. 교육구 학교는 여전히 대부분의 아이를 가르치며 고정 비용을 부담해야 합니다. 그들은 차터의 질이 고르지 않고 감독이 약하다고 주장하며, 차터 성과가 운영자와 주에 따라 크게 다르다는 연구(예: Stanford의 CREDO 연구)를 제시하고, 캘리포니아 유권자들이 공적 자금으로 사립·종교 학교를 지원하는 것이라며 바우처를 거듭 거부해 왔다는 점을 지적합니다.",
        "comparison": "캘리포니아는 학교 선택권에 관해 대형 주 중에서도 엄격한 편입니다: 큰 차터 부문을 가지고 있지만, Arizona, Florida, Indiana와 달리 사립학교 바우처나 교육저축계좌를 제공하지 않습니다. 2019년 법들은 사립학교 선택권 확대로 향해 온 전국적 추세에 역행했습니다.",
        "note_on_options": "이 척도는 두 개의 별개 메커니즘을 섞고 있습니다: 차터 정책(공립학교 선택지)과 사립학교 바우처/ESA(사립 등록금을 위한 공적 자금). 후보는 바우처에 반대하면서 차터 확대를 지지할 수도 있고, 그 반대일 수도 있습니다. 우리의 기본 코딩은 바우처 지지를 가장 강한 선택권 찬성 신호(값 1)로, 상한선을 두고 재원을 돌리는 입장을 가장 강한 제한 신호(값 5)로 봅니다.",
        "key_facts": [
          "캘리포니아에는 약 1,283개의 차터스쿨과 7개의 전(全) 차터 교육구가 운영되고 있었습니다(주 데이터, 2024년 5월); 차터는 공립학교 학생의 약 11.7%를 가르칩니다(2022-23).",
          "[AB 1505](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1505)(2019)는 거부된 차터에 대한 사실상 자동에 가깝던 종전의 항소권을 없앴고, 교육구가 차터를 거부하거나 갱신을 거부할 때 재정적 타격과 지역사회 수요를 근거로 들 수 있게 했습니다.",
          "[AB 1507](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1507)(2019)은 대부분의 새 차터가 승인한 교육구 밖에서 학습 센터나 분교를 운영하는 것을 막았습니다('차터 인가권자' — 보통 교육구로, 차터를 부여하고 감독하는 기관).",
          "차터 등록 인원은 증가한 반면 일반 교육구 등록 인원은 감소했는데, 이는 부분적으로 주 전체 총 등록 인원이 줄고 있기 때문입니다.",
          "아동 1인당 약 $4,000의 바우처를 가정에 주었을 [Prop 38](https://www.lao.ca.gov/ballot/2000/38_11_2000.html)(2000)은 71% 대 29%로 부결되었습니다. 그 이후 주 전체 바우처가 투표에 부쳐진 적은 없습니다."
        ]
      }
    },
    "housing_supply": {
      "name": "주택 공급 및 용도지역제 선점",
      "short_description": "지역 주민이 반대하더라도, 주는 도시들에게 주택을 더 짓도록 얼마나 강하게 밀어붙여야 할까요?",
      "stance_scale": {
        "1": "강하게 밀어붙임 — 지역 용도지역 규정을 무효화해 더 짓도록 강제",
        "2": "많이 밀어붙임 — 강한 건설 목표를 세우고, 도시를 어느 정도 무효화",
        "3": "균형을 맞춤 — 건설을 장려하되 대부분의 결정은 도시에 맡김",
        "4": "대체로 도시에 맡김 — 주의 무효화는 제한하고, 대신 지역의 행정 절차를 줄임",
        "5": "시장가 건설을 강제하기보다 보조 주택과 임차인 보호에 집중"
      },
      "voter_guide": {
        "current_policy": "지난 10년간 캘리포니아는 주택 승인에 관한 권한의 상당 부분을 도시에서 거두어 주에 부여했습니다. [SB 35](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB35)(2017)는 주 주택 목표를 달성하지 못한 도시에서 자격을 갖춘 아파트 사업에 대해 신속 처리를 만들었습니다: 승인이 \"행정적\" 절차가 되어, 규정만 충족하면 지역 공무원은 반드시 승인해야 하며 거부할 재량이 없습니다. [SB 423](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB423)(2023)은 그 신속 처리를 2036년까지 연장하고 해안 일부 지역까지 확대했습니다. [SB 9](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB9)(2021)는 대부분의 단독주택 부지에서 듀플렉스 건축과 필지 분할을 \"권리에 의해\" 가능하게 했습니다 — 규정을 충족하면 승인이 자동이라는 뜻입니다. 주는 또한 각 지역에 Regional Housing Needs Assessment(RHNA)라는 주택 목표를 부여합니다. 도시의 지역 주택 계획이 법에 어긋날 때, Housing Accountability Act라는 주 규정이 주택을 거부할 권한을 제한하며 — [AB 1893](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB1893)(2024)은 주택 목표를 달성하지 못한 도시에서 개발자가 지역 용도지역제를 우회할 수 있게 하는 \"Builder's Remedy\"에 실질적인 힘을 실었습니다.",
        "arguments_for_change": "더 강한 주 통제를 지지하는 이들은 지방정부가 수십 년 지속된 주택 부족을 초래했다고 말합니다. Legislative Analyst's Office(LAO)는 전국 최고 수준인 주의 임대료와 집값을 해안 일자리 중심지 인근에 너무 적게 지은 데서 직접 비롯한 것으로 봅니다. 지지자들은 도시들이 새 주택을 막으려는 주택 소유자의 압력에 굴복하므로, 확고한 주 의무 — 자동 \"권리에 의한\" 승인, 강제력 있는 목표, Builder's Remedy — 만이 격차를 좁힐 수 있다고 주장합니다. 그들은 도시들이 여전히 시간을 끌 여지가 있을 때 자발적 수단이 효과가 없다는 증거로 [SB 9](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB9)를 듭니다.",
        "arguments_against_change": "반대자들은 토지 이용 결정은 자기 동네 — 도로, 화재 위험, 교통, 지역의 특성 — 를 아는 지역 공무원에게 속한다고 말합니다. 그들은 주 전체에 일률적인 의무가 지역 유권자가 승인한 계획을 무효화하며, 신속 처리된 \"권리에 의한\" 사업이 환경 심사와 주민 의견을 건너뛸 수 있다고 주장합니다. 또한 부족의 진짜 원인은 용도지역제가 아니라 높은 건설 비용, 금리, 부족한 노동력이므로, 도시를 무효화하는 것은 갈등만 더하고 부담 가능한 주택을 안정적으로 만들어내지는 못한다고 말합니다.",
        "comparison": "캘리포니아는 거의 어느 주보다도 지역 용도지역제 무효화에서 더 멀리 나아갔습니다. 몇몇 다른 주도 이 방향으로 움직였습니다 — Oregon은 2019년 단독주택 전용 용도지역제를 주 전체에서 폐지했고, Montana와 Washington은 2023년 기존 부지에 더 많은 주택을 허용하는 광범위한 법을 통과시켰습니다. 그러나 많은 주는 여전히 토지 이용 결정을 거의 전적으로 도시와 마을에 맡깁니다.",
        "note_on_options": "이는 주가 시장가 주택 공급 확대를 위해 얼마나 강하게 밀어붙여야 하는지를 측정하는 단일 축입니다 — 지역 용도지역제를 공격적으로 선점하는 것(선택지 1)부터 주가 강제하는 공급보다 보조와 임차인 보호를 우선하는 것(선택지 5)까지. 후보들은 서로 다른 이유로 낮은 쪽에 도달할 수 있습니다: 어떤 이는 지역 통제와 단독주택 동네를 옹호하고(선택지 4), 다른 이는 시장가 건설보다 공공/보조 주택을 선호합니다(선택지 5). 여기서의 입장은 후보가 공급을 위해 지역 용도지역제를 무효화하는 데 주의 권한을 얼마나 쓸지를 보여줍니다.",
        "key_facts": [
          "현재 RHNA 주기(2023–2031)는 주 전체에 약 250만 채의 새 주택을 요구하며 — 그중 약 100만 채는 저소득 가정이 감당할 수 있는 주택입니다.",
          "[SB 9](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB9)(2021)는 예상보다 훨씬 적게 활용되었습니다. 시행 첫해에 Los Angeles는 211건, San Francisco는 25건, San Diego는 7건, San José는 단 1건의 세대 신청을 받았습니다 — 2021년 Terner Center 분석이 약 700,000 세대가 새로 실현 가능해질 수 있다고 추정했음에도 그렇습니다.",
          "주 주택 계획법을 준수하지 않는 도시는 월 $10,000에서 $600,000의 벌금을 물 수 있습니다.",
          "[SB 35](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB35) / [SB 423](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB423) 신속 처리는 도시가 주택 목표를 달성하지 못하거나 주 승인 주택 계획이 없는 곳에서만 적용됩니다. SB 423은 또한 사업 규모에 따라 커지는 임금 및 숙련 노동자 요건을 추가했습니다.",
          "Surplus Land Act는 지방 기관이 더 이상 필요 없는 공유지를 매각할 때 부담 가능 주택에 최우선권을 주도록 요구합니다."
        ]
      }
    },
    "sanctuary": {
      "name": "보호(Sanctuary) 정책과 이민 단속",
      "short_description": "캘리포니아는 연방 이민 단속(ICE)에 얼마나 협조해야 할까요?",
      "stance_scale": {
        "1": "ICE에 전적으로 협조 — 주의 보호법을 폐지",
        "2": "보호법은 유지하되 예외를 더 허용",
        "3": "현재 보호법을 그대로 유지",
        "4": "보호를 강화(예: 이민자 법률 변호 지원)",
        "5": "훨씬 더 나아감 — 모두에게 주 신분증을 주는 등 새 주 차원 보호 추가"
      },
      "voter_guide": {
        "explainer": "\"보호법(sanctuary law)\"은 주와 지방 경찰이 연방 이민 단속관을 얼마나 도울 수 있는지를 제한합니다. 캘리포니아의 핵심 법은 2017년 통과된 California Values Act, [SB 54](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB54)입니다.",
        "current_policy": "캘리포니아의 기본 틀은 California Values Act, [SB 54](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB54)(2017)로, 2018년 1월 1일부터 시행되고 있습니다. 이 법은 주와 지방 기관이 인력이나 자금을 연방 민사 이민 단속에 쓸 수 없다고 규정합니다. 즉 이들은 일반적으로 ICE가 요청한다는 이유만으로 누군가를 구금할 수 없고(\"detainer\" 또는 구금 요청이라고 함), 민사 이민 영장으로 사람을 체포할 수 없으며, 지역 경찰관이 이민 단속관처럼 활동하게 하는 \"287(g)\" 협정에 서명할 수 없습니다. 예외도 있습니다: 교도소는 주법에 열거된 특정 중대·폭력 중범죄로 유죄 판결을 받은 사람에 대해서는 석방 시점을 ICE에 알리거나 신병을 넘길 수 있습니다. 별도의 법인 TRUTH Act([AB 2792](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201520160AB2792), 2016)는 구금된 사람에게 모든 ICE 면담에 대해 고지하고 동의를 받아야 하며, 지방정부가 ICE에 접근을 허용할 경우 공청회를 열어야 한다고 규정합니다. 주 교도소(CDCR)는 SB 54의 적용을 일부만 받으며 자체 통지 규칙을 따릅니다.",
        "arguments_for_change": "더 강한 보호를 원하는 사람들은 지역 경찰을 이민 단속에서 배제하는 것이 신뢰를 쌓아, 이민자 범죄 피해자와 목격자가 안심하고 범죄를 신고할 것이라고 주장합니다. 그들은 ICE 구금 요청이 보통 판사의 서명을 받지 않아 헌법적 우려를 낳고 카운티가 소송에 노출될 수 있다고 지적합니다. 그리고 기존 중범죄 예외가 이미 가장 중대한 사안에서 협조를 허용하므로 — 데이터 공유 제한이나 법원·학교·병원에서 ICE 배제 같은 추가 조치는 민사 단속에만 영향을 줄 것이라고 봅니다.",
        "arguments_against_change": "ICE와의 더 완전한 협조를 원하는 사람들은 ICE가 지목한 사람 — 예외에 해당하지 않는 과거 전과가 있는 일부 포함 — 을 석방하면 연방 당국이 추방 대상으로 보는 이들을 지역사회로 되돌려보내게 된다고 주장합니다. 그들은 교도소에서 계획된 신병 인계가 ICE가 길거리에서 체포하는 것보다 경찰관과 대중에게 더 안전하며, 이민 단속은 주가 방해해서는 안 될 연방의 업무라고 말합니다. 그들이 보기에 ICE 요청을 거부하는 것은 공공 안전과 연방-주 협력을 해칩니다.",
        "comparison": "캘리포니아는 Illinois(TRUST Act)와 여러 다른 주와 함께 이민 단속관과의 지역 협조를 가장 많이 제한하는 주에 속합니다. 반면 Texas(SB 4 법)와 Florida 같은 주는 지방 기관이 ICE에 협조하도록 요구하고 보호 정책을 금지합니다. 연방 287(g) 프로그램은 2026년까지 전국 약 1,600개 기관과 협정을 맺었으나 — 캘리포니아에는 거의 없습니다.",
        "note_on_options": "SB 54는 법률이며 법원에서 유효성이 인정되었으므로, 주지사에게 현실적인 범위는 중범죄 예외를 최대한 활용하는 단속/지침(낮은 쪽)부터 데이터 공유나 ICE 시설 접근을 좁히는 법안에 서명하는 것(높은 쪽)까지입니다. 전면 폐지(입장 1보다 훨씬 아래)나 모든 협조의 완전한 폐지(입장 5 위)는 주지사 혼자 할 수 없는 입법 조치가 필요합니다.",
        "key_facts": [
          "[SB 54](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB54)는 2018년 1월 1일 발효되었습니다. 첫 번째 Trump 행정부가 이를 막으려 소송을 냈으나 패소했습니다: 사건은 기각되었고, Ninth Circuit 항소법원도 동의했으며, 미국 연방대법원은 심리를 거부했습니다 — 그래서 이 법은 여전히 유효합니다.",
          "(지역 경찰관에게 이민 단속 권한을 부여하는) 287(g) 협정은 SB 54에 따라 캘리포니아 기관에 금지됩니다. 2025년 Shasta County 보안관의 시도가 주법과 충돌하여 중단되었습니다.",
          "SB 54의 예외는 특정 중대·폭력 중범죄로 유죄 판결을 받은 사람에 한해 기관이 ICE에 통지하거나 신병을 넘길 수 있게 합니다 — 이민 신분만이 유일한 문제인 사람에 대해서는 아닙니다.",
          "TRUTH Act(2016)는 사람들이 ICE 교도소 면담을 거부할 수 있다는 점을 고지받아야 하고, 지방 기관이 ICE에 접근을 허용할 때 공개 지역사회 회의를 열도록 요구합니다.",
          "보호 규정은 대부분 주법으로 정해지므로, 주지사의 주요 수단은 단속 지침, 법무장관의 소송 대응 방식, 교도소 규칙, 새 법안의 서명 또는 거부이며 — 법을 직접 폐지하는 것이 아닙니다."
        ]
      }
    },
    "homelessness": {
      "name": "노숙 문제 대응",
      "short_description": "캘리포니아는 노숙 문제를 어떻게 다뤄야 할까요 — 단속에 더 기대야 할까요, 아니면 주택과 서비스에 기대야 할까요?",
      "stance_scale": {
        "1": "야영지 정리와 법원 명령 치료 확대를 주된 수단으로",
        "2": "단속을 앞세우되, 동시에 서비스를 제공",
        "3": "둘의 균형 — 쉼터나 서비스가 가능할 때만 야영지 정리",
        "4": "주택 우선(Housing First)을 앞세우고; 단속은 드물게 사용",
        "5": "주택과 서비스에 대규모 투자; 단속은 최후 수단으로만 사용"
      },
      "voter_guide": {
        "explainer": "\"주택 우선(Housing First)\"은 먼저 금주나 치료를 요구하지 않고 곧바로 영구 거처를 제공하는 것을 뜻합니다 — 머리 위에 지붕이 있으면 중독이나 정신질환에 대처하기가 더 쉽다는 발상입니다. \"후견(conservatorship)\"은 판사가 스스로를 돌볼 수 없다고 판단한 사람을 대신해 다른 사람이나 기관이 결정을 맡도록 하는 법원 명령입니다. \"CARE Court\"는 심각한 미치료 정신질환자에게 치료 계획을 명령할 수 있는 비교적 새로운 민사 법원 절차입니다. \"특정 시점 조사(point-in-time count, PIT count)\"는 매년 1월 하룻밤 동안 노숙인이 몇 명인지 세는 집계입니다.",
        "current_policy": "캘리포니아의 공식 원칙은 \"주택 우선(Housing First)\"입니다: 주 재정 프로그램은 먼저 금주나 치료를 요구하지 않고 곧바로 영구 주택을 제공하도록 되어 있습니다. 이는 주법(Welfare & Institutions Code §8255)에 규정되어 있습니다. 여기에 더해 주는 최근 단속과 치료 선택지를 추가했습니다. CARE Act([SB 1338](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1338), 2022 통과)는 미치료 조현병 계열 장애를 가진 사람에게 치료 계획을 명령할 수 있는 민사 법원을 마련했고, 2024년 12월까지 모든 카운티가 이를 운영하고 있었습니다. [Proposition 1](https://calmatters.org/california-voter-guide-2024/prop-1-mental-health/)(2024년 3월)은 정신건강 주택과 치료를 위한 $6.4 billion 규모의 채권을 승인하고 기존 정신건강 기금 일부를 전환했습니다. 미국 연방대법원의 [Grants Pass v. Johnson](https://calmatters.org/housing/2024/06/california-homeless-camps-grants-pass-ruling/) 판결(2024년 6월) 이후, Newsom 주지사는 주 기관과 도시들에 야영지를 정리하라고 지시하고 채택할 수 있는 야영 금지 조례 모델을 공유했습니다.",
        "arguments_for_change": "서비스 중심의 주택 우선 접근(척도의 높은 쪽)을 선호하는 사람들은 안정된 거처가 중독과 정신질환에 대처할 수 있게 하는 토대이지 — 나중에 얻어내는 보상이 아니라고 말합니다. 그들은 주택 우선이 사람들을 주거에 머물게 한다는 연구를 제시합니다. 그들은 야영지 정리는 인구를 줄이지 못한 채 사람들을 이리저리 옮길 뿐이며, 주거를 찾기를 더 어렵게 만드는 전과를 떠안긴다고 주장합니다. 그리고 강제 치료나 후견의 확대는 충분한 자발적 도움을 먼저 제공받지 못한 사람들을 강제할 위험이 있다고 경고합니다.",
        "arguments_against_change": "더 많은 단속, 치료 의무화, 후견(낮은 쪽)을 선호하는 사람들은 캘리포니아가 최근 몇 년간 노숙 문제에 $20 billion 넘게 썼음에도 길거리에서 지내는 비율이 여전히 전국 최고 수준에 가깝다고 말합니다. 그들은 미치료 심각한 정신질환이나 중독을 가진 길거리의 많은 사람에게는 주택만으로는 효과가 없으며, 눈에 보이는 야영지는 실제 보건·안전 문제를 일으키고, Grants Pass 판결이 이제 주가 쉼터와 치료 제공에 거부 시 따르는 처벌을 결합할 수 있게 했다고 주장합니다.",
        "comparison": "캘리포니아의 노숙 인구는 2024년에 약 3% 증가했는데 — 전국적으로 약 18% 늘어난 것보다 훨씬 작은 폭입니다. 그러나 주는 여전히 어느 주보다 많은 노숙인, 전국 총계의 가장 큰 비중, 그리고 길거리에서 자는 가장 높은 비율을 가지고 있습니다. 다른 대부분의 대형 주는 노숙 주민의 훨씬 더 큰 비율을 쉼터에 수용합니다.",
        "note_on_options": "이 척도는 단속·치료 의무화(1)부터 단속 없는 순수 주택 우선(5)까지 이어집니다. 많은 후보가 — 예를 들어 치료 병상 확대와 자발적 주택을 결합하는 등 — 중간에 해당하는 조합을 선호합니다; 양 끝점은 주택 제공을 치료에 조건 지을지, 야영 금지 단속을 사용할지를 두고 다투는 쟁점을 대표합니다.",
        "key_facts": [
          "2024년 1월 하룻밤 조사에서 187,084명의 캘리포니아 주민이 노숙인으로 집계되었으며, 이는 전년의 181,399명보다 3.1% 증가한 수치입니다(HUD).",
          "캘리포니아는 전국 노숙 인구의 약 25%를 차지하며 길거리에서 지내는 비율이 가장 높습니다 — 약 3분의 2가 쉼터가 아니라 길거리에서 잡니다.",
          "[Grants Pass v. Johnson](https://calmatters.org/housing/2024/06/california-homeless-camps-grants-pass-ruling/)(연방대법원, 6-3, 2024년 6월)은 공공 야영 금지가 수정헌법 제8조를 위반하지 않는다고 판결했습니다. 이로써 쉼터가 없을 때조차 야영을 이유로 딱지를 떼거나 체포하는 데 대한 종전의 법적 장벽이 사라졌습니다.",
          "[Proposition 1](https://calmatters.org/california-voter-guide-2024/prop-1-mental-health/)(2024년 3월)은 행동건강 주택과 치료를 위한 $6.4 billion 규모의 채권을 승인했으며, 여기에는 약 6,800개의 입원 치료 병상을 짓기 위한 약 $4.4 billion의 보조금과, 노숙 참전용사 등을 위한 영구 지원 주택이 포함됩니다.",
          "2026년 초까지 이 프로그램이 2024년 12월 주 전체로 확대된 이래 3,800건이 넘는 CARE Act 청원이 제기되었으며, 주는 2026년 3월 CARE 관련 서비스와 주택을 위해 $291 million을 추가했습니다."
        ]
      }
    },
    "gun_policy": {
      "name": "총기 정책",
      "short_description": "캘리포니아의 총기법은 완화되어야 할까요, 유지되어야 할까요, 아니면 더 엄격해져야 할까요?",
      "stance_scale": {
        "1": "크게 완화(휴대 허가를 쉽게, 단속을 가볍게)",
        "2": "일부 특정 규정을 완화",
        "3": "현재 총기법을 그대로 유지",
        "4": "현행법을 옹호하고 허점을 막음",
        "5": "주요한 새 규제 추가(총기 등록제, 추가 금지)"
      },
      "voter_guide": {
        "current_policy": "캘리포니아는 전국에서 가장 엄격한 총기법을 가지고 있습니다. Roberti-Roos Assault Weapons Control Act(1989)와 이후의 법들은 다수의 반자동 \"공격용 무기\"를 금지하며, 주는 탄창을 10발로 제한합니다. 2022년 미국 연방대법원의 NYSRPA v. Bruen 사건은 누가 권총을 숨겨 휴대할 \"충분한 사유\"가 있는지를 공무원이 결정하게 한 규정을 무효화했습니다. 이에 대응해 [SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB2)(2023, 2024년 1월 1일 발효)는 캘리포니아를 \"발급 의무(shall-issue)\" 허가제로 전환했고 — 자격을 갖춘 사람은 누구나 받는다는 뜻 — 16시간 교육 요건과, 허가가 있어도 총기가 금지되는 긴 \"민감 장소\" 목록을 추가했습니다. 별도의 법인 [AB 28](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB28)(2023, 2024년 발효)은 폭력 예방과 학교 안전 프로그램 재원을 위해 총기 및 탄약 판매에 11%의 주세를 추가했습니다.",
        "arguments_for_change": "더 많은 규제를 원하는 사람들은 강한 총기법을 가진 주가 총기 사망률이 더 낮게 보고되는 경향이 있다고 지적합니다. 그들은 공격용 무기·탄창 제한, SB 2의 민감 장소 목록, AB 28 세금이 위험한 환경에서 총기 가용성을 줄이는 동시에 예방 재원을 댄다고 주장합니다. 그들은 남은 허점을 막고 — 법정에서 현행법을 옹호하는 것이 — 생명을 구하며, 수정헌법 제2조는 여전히 합리적인 규제를 허용한다고 말합니다.",
        "arguments_against_change": "더 많은 규제에 반대하는 사람들은 캘리포니아가 이미 전국에서 가장 엄격한 규정을 가졌음에도 여전히 총기 범죄가 있으므로, 새 제한의 효과는 작다고 주장합니다. 그들은 Bruen 이후의 법원 판결이 캘리포니아의 여러 법이 위헌일 수 있음을 시사하며 값비싼 소송을 부른다고 말합니다. 그들은 광범위한 민감 장소 금지와 판매세가 법을 지키는 총기 소유자에게 부담을 주고 휴대 권리를 장소에 따라 좌우되게 한다고 주장합니다. 그리고 단속은 합법적 구매자보다 불법 밀거래와 이미 소유가 금지된 사람을 겨냥하는 편이 낫다고 말합니다.",
        "comparison": "독립 및 옹호 단체의 평가표는 캘리포니아의 총기법을 — Massachusetts, New York, Illinois, Connecticut과 함께 — 전국에서 가장 엄격하거나 거의 가장 엄격하다고 일관되게 매깁니다. 반면 Texas, Arizona, Idaho 같은 \"헌법적 휴대(constitutional carry)\" 주는 권총을 숨겨 휴대하는 데 허가가 필요 없고 탄창과 소총 종류에 대한 제한이 훨씬 적습니다.",
        "note_on_options": "캘리포니아 총기법의 상당 부분은 Ninth Circuit과 연방대법원 소송으로 형성되므로, 주지사의 현실적 범위는 법원 판결에 비추어 현행 규정을 옹호하거나 좁히는 것(낮은 쪽)부터 새 규제에 서명하고 이를 적극 옹호하는 것(높은 쪽)까지입니다. '되돌리기'(입장 1)는 주로 옹호를 거부하거나 폐지에 서명하는 것을 뜻하며, 둘 다 의회의 제약을 받습니다.",
        "key_facts": [
          "캘리포니아는 1989년 Roberti-Roos Act 이래 \"공격용 무기\"를 금지해 왔고 탄창을 10발로 제한합니다.",
          "[SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB2)(2024년 1월 1일 발효)는 Bruen 판결 이후 발급 의무 허가제를 유지하되 약 26개 범주의 \"민감 장소\"를 지정했습니다. 2025년 Ninth Circuit 항소법원은 그 장소 금지 중 일부를 인정하고 일부는 사건이 계속되는 동안 막았습니다.",
          "[AB 28](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB28)의 총기·탄약에 대한 11% 세금(2024년 발효)은 폭력 예방과 학교 안전 프로그램을 위해 연간 약 $160 million을 거둘 것으로 예상됩니다. 이는 미해결 법적 분쟁에 직면해 있습니다.",
          "마이크로스탬핑 등 제조사 측 규정(예: [SB 452](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB452), 2023)은 여전히 유효하나, 일부 조항은 해당 기술이 실현 가능하다고 인정될 때만 발효됩니다.",
          "캘리포니아의 여러 총기법이 Bruen 기준 — 법이 총기 규제의 국가적 \"역사와 전통\"에 부합하는지를 묻는 기준 — 에 따라 Ninth Circuit에서 활발히 다투어지고 있어, 실제로 어떤 규정이 집행될 수 있는지는 법원 판결에 따라 바뀝니다."
        ]
      }
    },
    "natgas_bridge": {
      "name": "교량 연료로서의 천연가스",
      "short_description": "캘리포니아가 더 깨끗한 에너지로 전환하는 가운데 천연가스는 어떤 역할을 해야 할까요?",
      "stance_scale": {
        "1": "천연가스 사용과 기반시설을 확대",
        "2": "당분간 천연가스를 유지; 천천히 단계적 축소",
        "3": "확정된 일정 없음 — 비용과 전력망 신뢰성에 맡김",
        "4": "2030년대 중반까지 발전에서 가스를 단계적 폐지",
        "5": "가정, 사업장, 발전소 전반에서 가스를 빠르게 단계적 폐지"
      },
      "voter_guide": {
        "current_policy": "캘리포니아는 여전히 주 내 전력의 약 40%를 천연가스에서 얻으며, 가스는 약 1,400만 가구 대부분의 난방을 담당합니다. 그러나 주는 새 건물을 가스 대신 전기로 유도하고 있습니다. 2022년 California Air Resources Board(CARB — 주의 대기질 기관)는 목표를 세웠습니다: 2030년까지 가정용으로 판매되는 모든 새 난방기와 온수기는 무배출이어야 하며, 상업용 건물은 2035년까지 뒤따릅니다. CARB는 이를 실현할 실제 규정을 여전히 작성 중입니다. 2025년 12월 규정을 축소했고, 이사회 표결은 2026년에 예상되나 아직 확정된 것은 없습니다. 한편 Berkeley가 2019년 새 건물의 가스를 금지한 이후 수십 개 도시가 이를 따랐으나 — 2023년 연방 항소법원 판결(CRA v. Berkeley)이 연방 가전법이 그러한 지역 금지를 무효화한다고 판단했습니다. 그래서 주는 대신 건축 법규와 배출 기준을 사용하는 쪽으로 전환했습니다.",
        "arguments_for_change": "가스에서 더 빨리 벗어나는 것을 지지하는 사람들은 건물이 온실가스와 스모그 유발 오염의 큰 원천이며, 실내에서 가스를 태우는 것이 건강 우려를 높인다고 말합니다. 그들은 전력망이 전기화되면서 새 가스 배관과 연결 설비가 쓸모없어질 수 있으므로 이를 새로 짓는 것은 위험하다고 주장합니다. 그들은 히트펌프가 이제 캘리포니아 대부분의 기후에서 가스 난방기를 능가한다고 지적합니다. 그리고 가스를 쓰는 고객이 줄수록 배관망 유지의 고정 비용이 남은 사람들 — 종종 저소득 가구 — 에게 전가되므로, 계획적이고 질서 있는 전환이 혼란스러운 전환보다 더 저렴하다고 경고합니다.",
        "arguments_against_change": "가스를 교량 연료로 유지하는 것을 지지하는 사람들은 태양광과 풍력이 가용하지 않을 때 가스를 즉시 켜서 이를 보강할 수 있어 최대 수요 시 정전을 막는 데 도움이 된다고 말합니다. 그들은 모두에게 전기화를 강제하면 가정의 초기 비용이 오르고 이미 비싼 전력망에 부담을 준다고 주장합니다. 캘리포니아 전기 요금이 전국에서 2번째로 높은 상황에서, 그들은 히트펌프 운영으로 절약되는 돈이 불확실하다고 말합니다. 그리고 갑작스러운 의무화는 수백만 대의 히트펌프 설치에 필요한 전기 패널 업그레이드와 숙련 인력을 앞질러 버린다고 경고합니다.",
        "comparison": "캘리포니아는 New York(2026년부터 대부분의 새 건물에서 가스를 금지), Washington과 함께 건물의 가스 전환에 가장 공격적인 주에 속합니다. 대부분의 주는 반대 방향으로 갔습니다: 20개가 넘는 주가 도시들이 천연가스 연결을 제한하지 못하도록 막는 법을 통과시켰습니다.",
        "note_on_options": "이 척도는 가스에서 벗어나는 속도를 측정하는 것이지, 탈탄소화 자체를 할지를 묻는 것이 아닙니다 — 거의 모든 후보가 주의 장기 탄소 중립 목표를 받아들입니다. 의견 차이는 일정과 의무화(가전 금지, 연결 금지, 가스 시스템 폐기) 대 유인책과 자발적 채택에 관한 것입니다.",
        "key_facts": [
          "캘리포니아 전력의 약 40%가 천연가스에서 나오며, 가스는 주 대부분 가구의 난방과 온수를 담당합니다.",
          "CARB의 2022년 계획은 2030년까지 판매되는 새 가정용 난방기와 온수기의 100%를 무배출로 만드는 것을 목표로 하나 — 이를 강제할 규정은 완성되지 않았으며, 2025년 12월 축소되었습니다.",
          "2023년 연방 항소법원 판결(CRA v. Berkeley)은 새 건물의 가스 연결에 대한 지역 금지가 연방 가전법에 의해 무효화된다고 판단했습니다.",
          "캘리포니아는 TECH Clean California와 유틸리티 프로그램을 통해 히트펌프(전기 냉난방 장치)에 대한 환급을 제공하며, 2030년까지 600만 대 설치를 목표로 합니다.",
          "Aliso Canyon — 미국 역사상 최대였던 2015–16년 SoCalGas 메탄 누출 사고의 가스 저장 시설 — 은 여전히 가동 중입니다. 한때 계획되었던 2027년 폐쇄는 이제 빨라야 2030년대 후반으로 예상됩니다."
        ]
      }
    },
    "prop13_commercial": {
      "name": "상업용 재산세(Prop 13 분리 과세)",
      "short_description": "캘리포니아는 재산세를 매입 가격을 기준으로 제한합니다(Prop 13). 대신 사업·상업용 부동산은 오늘의 시장 가치로 과세해야 할까요?",
      "stance_scale": {
        "1": "상업용 부동산의 세금 상한을 강화",
        "2": "상업용 부동산의 현행 세금 상한을 유지",
        "3": "가장 큰 상업용 부동산에 한해서만 변경",
        "4": "상업용 부동산을 점진적으로 시장 가치로 과세",
        "5": "상업용 부동산을 시장 가치로 전면 과세"
      },
      "voter_guide": {
        "explainer": "1978년 유권자가 통과시킨 Proposition 13은 캘리포니아가 재산에 과세하는 방식을 정합니다. 재산세는 매입가의 1%로 제한되며, 과세 대상 가치는 — 부동산의 시장 가치가 아무리 올라도 — 연간 약 2%까지만 오를 수 있습니다. 전체 세액은 부동산이 매각되어 새 가격으로 재평가될 때만 발생합니다. 이는 주택, 상점, 사무실, 공장에 모두 똑같이 적용됩니다. \"분리 과세(split-roll)\"는 사업용 부동산을 주택과 다르게 과세하는 것을 뜻하며, 캘리포니아는 현재 이를 하지 않습니다.",
        "current_policy": "[Prop 13](https://lao.ca.gov/Publications/Report/3497)(1978)에 따라 캘리포니아의 모든 부동산 — 주택, 상점, 사무실, 공장 — 은 매입 가격의 1%로 과세되며, 과세 대상 가치는 부동산이 매각되어 재평가될 때까지 연간 2%를 넘게 오를 수 없습니다. 사업용 부동산은 별도의(\"분리 과세\") 취급을 받지 않습니다. [Prop 15](https://lao.ca.gov/BallotAnalysis/Proposition?number=15&year=2020)(2020)는 대부분의 상업·산업용 부동산에 대해 이를 바꾸어 주택은 Prop 13 규칙 아래 두면서 현재 시장 가치로 과세하려 했습니다. 이는 52% 대 48%로 부결되었습니다.",
        "arguments_for_change": "상업용 분리 과세를 지지하는 사람들은 [Prop 13](https://lao.ca.gov/Publications/Report/3497)의 매입가 규칙이 오래 보유된 사업용 부동산 — 오피스 타워, 쇼핑몰, 대형 산업 부지 — 을 수십 년 지난 가치로 과세하게 한다고 말합니다. 이는 세 부담을 더 새로운 소유자와 주택 소유자에게 옮깁니다. 그들은 학교와 지방 서비스를 위한 꾸준한 재원으로 LAO의 $6.5–$11.5 billion 추정치를 들며, 주택 소유자와 소상공인을 여전히 보호하면서 사업용 부동산을 시장 가치로 과세하면 — 주택 보호를 건드리지 않고 이 불균형을 바로잡을 수 있다고 주장합니다.",
        "arguments_against_change": "반대자들은 상업용 부동산에 대한 높은 세금이 임차인 — 소상공인, 음식점, 임차인 — 에게, 그리고 궁극적으로 소비자에게 전가되어 경제 전반에서 가격을 올린다고 말합니다. 그들은 매년 부동산을 시장 가치로 재평가하는 것이 복잡하고 소송을 부르며, 가치와 임대료가 불안정한 경기 침체기에 사업체에 가장 큰 타격을 줄 것이고, 어떤 종류의 부동산이든 Prop 13을 약화시키면 나중에 주택 보호를 깎아내리는 문을 열어 — 1978년 유권자가 표로 정한 예측 가능성을 무너뜨린다고 경고합니다.",
        "comparison": "캘리포니아는 사업용과 주거용 부동산을 똑같이 과세하는 — 둘 다 매입 가격에 고정하는 — 점에서 특이합니다. 대부분의 주는 모든 부동산을 일정 주기로 현재 시장 가치에 맞춰 재평가합니다. 그 결과, 수십 년 보유한 캘리포니아 상업용 건물은 최근 매각된 거의 동일한 건물보다 훨씬 낮게 과세될 수 있습니다.",
        "note_on_options": "이 척도는 깔끔한 단계입니다: 선택지 1은 상업용 부동산에 대한 Prop 13 보호를 강화하고, 선택지 3은 매우 큰 보유분에만 적용되는 표적 개혁(Prop 15의 소상공인 예외 모델)이며, 선택지 5는 완전한 시장 가치 분리 과세입니다. 주거용 Prop 13 보호는 여기서 쟁점이 아닙니다 — 모든 선택지가 이를 그대로 둡니다.",
        "key_facts": [
          "[Prop 13](https://lao.ca.gov/Publications/Report/3497)은 재산세율을 매입 가격의 1%로 제한하고 과세 대상 가치의 연간 증가를 2%로 제한합니다 — 부동산의 소유권이 바뀌어 재평가될 때까지.",
          "LAO는 [Prop 15](https://lao.ca.gov/BallotAnalysis/Proposition?number=15&year=2020)가 완전히 단계적으로 시행되면(약 2025년경) 지방정부와 학교를 위해 연간 $6.5 billion에서 $11.5 billion을 거두었을 것으로 추정했습니다.",
          "그 돈 중 약 60%는 도시, 카운티, 특별구로, 40%는 학교와 커뮤니티 칼리지로 갔을 것입니다(LAO).",
          "Prop 15는 주택을 완전히 제외했습니다. 또한 캘리포니아 상업용 부동산이 $3 million 이하인 소상공인과, 사업 장비 최대 $500,000을 면제했습니다.",
          "Prop 15는 2020년 11월 주 전체에서 51.9% 대 48.1%로 부결되었습니다."
        ]
      }
    },
    "healthcare_funding": {
      "name": "의료 재원 조달 방식",
      "short_description": "캘리포니아는 주가 운영하는 단일 지불자 의료 체계(민간 보험 대신 주가 모두를 보장)로 나아가야 할까요 — 그렇다면 어떻게 재원을 마련할까요?",
      "stance_scale": {
        "1": "최근의 주 의료 보장 확대(Medi-Cal)를 되돌림",
        "2": "현재 체계 유지; 비용 절감에 집중",
        "3": "큰 새 세금 없이 점진적으로 보장 확대",
        "4": "단일 지불자, 주로 부와 기업에 대한 세금으로 재원 마련",
        "5": "단일 지불자, 폭넓은 새 세금(예: 급여세)으로 재원 마련"
      },
      "voter_guide": {
        "explainer": "\"단일 지불자(single-payer)\"는 여러 민간 보험사 대신 하나의 정부 플랜이 모두의 의료비를 지불하는 것을 뜻합니다. \"ACA\"(Affordable Care Act, Obamacare라고도 함)는 사람들이 보장을 구매할 수 있는 보조 시장을 만든 연방법입니다. \"Medi-Cal\"은 Medicaid의 캘리포니아판 — 저소득 주민을 위한 공적 의료 보장 프로그램 — 입니다.",
        "current_policy": "캘리포니아는 하나의 주 운영 플랜 대신 민간 보험과 대규모 정부 지원을 혼합해 사용합니다. Covered California는 주의 Affordable Care Act(ACA) 시장으로, 사람들이 보장을 구매하고 주가 보험료를 낮추는 데 보탭니다. Medi-Cal — Medicaid의 캘리포니아판, 저소득 주민을 위한 공적 보장 프로그램 — 은 2024년 1월 1일 자격을 갖춘 모든 미등록 성인을 보장하도록 확대되어, 캘리포니아는 이민 신분과 무관하게 완전한 Medicaid 보장을 제공하는 첫 주가 되었습니다. 하나의 정부 운영 플랜으로 전환하려는 노력은 거듭 무산되었습니다: [AB 1400](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1400)(CalCare 법안, 2022)은 표결 전에 철회되었고, 그 후속 법안인 [AB 2200](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2200)(2024)은 위원회에서 막혔습니다.",
        "arguments_for_change": "주 단일 지불자 플랜으로 나아가기를 원하는 사람들(높은 쪽)은 하나의 공적 플랜이 보험사 간접비, 보험료, 본인부담금, 제한된 의료 제공자 네트워크를 없앨 것이라고 말합니다. 그들은 전체 체계가 오히려 비용을 덜 쓸 수 있다고 전망한 일부 분석(예: UC Berkeley Labor Center 추정)을 제시합니다. 그들은 직업이나 이민 신분과 무관하게 모두를 보장하는 것이 운영하기 더 단순하며, 캘리포니아의 거대한 규모가 더 낮은 가격을 협상할 지렛대를 줄 것이라고 주장합니다.",
        "arguments_against_change": "현재의 보조 민간 시장을 유지하기를 원하는 사람들(낮은 쪽)은 단일 지불자의 연간 약 $300–400 billion에 달하는 비용이 가파른 새 세금을 의미하며, 순절감의 보장이 없다고 말합니다. 그들은 이것이 결코 오지 않을 수도 있는 연방 승인과 ERISA 예외에 달려 있다고 지적합니다. 그들은 대부분의 사람이 이미 가진 고용주 및 Medicare 보장을 뒤엎는 것이 정치적·실무적으로 위험하며 — 캘리포니아가 그런 격변 없이 이미 보조와 Medi-Cal 확대로 거의 보편적 보장에 이르렀다고 경고합니다.",
        "comparison": "단일 지불자 체계를 운영하는 미국 주는 없습니다. Vermont는 2014년 하나를 통과시켰으나, 재원을 마련할 방법을 찾지 못해 포기했습니다. 캘리포니아는 다른 길 — 보조와 Medicaid 확대 — 을 택해 민간 보험 시장을 유지하면서 전국에서 가장 낮은 무보험율 중 하나에 이르렀습니다.",
        "note_on_options": "이 척도는 재원 조달 방식을 측정합니다 — 보조 민간 시장 유지(1)부터 CalCare 같은 주 운영 단일 지불자 플랜(5)까지 — 보장 확대 여부가 아닙니다. 후보는 단일 지불자 재원 조달에 반대하면서 광범위한 보장 확대(예: 2024년 Medi-Cal 확대)를 지지할 수 있습니다; 그런 입장은 척도의 중간에 위치합니다.",
        "key_facts": [
          "Medi-Cal은 2024년 1월 1일 이민 신분과 무관하게 자격을 갖춘 모든 성인에게 완전한 보장을 확대했습니다 — 이를 한 첫 주입니다.",
          "[AB 1400](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1400)(CalCare)은 2022년 1월 31일 발의자가 철회하면서, 필요했던 41표의 하원 표에 못 미친 채 폐기되었습니다. 그 2024년 후속 법안인 [AB 2200](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2200)은 Appropriations 위원회에서 보류되었습니다.",
          "분석가들은 CalCare가 연간 약 $314–391 billion의 비용 — 주 전체 일반 재정 예산보다 많은 — 이 들고, 새로운 급여세, 사업세, 고소득세가 필요할 것으로 추정했습니다.",
          "단일 지불자 플랜은 연방 자금을 전용하려면 연방정부의 승인(이른바 Section 1332 및 Medicaid/Medicare 면제)이 필요합니다. ERISA라는 연방법은 또한 많은 대기업이 사용하는 자체 기금 의료 플랜을 주가 얼마나 규제할 수 있는지를 제한합니다.",
          "캘리포니아의 무보험율은 최근 몇 년간 약 6–7%로 — 역대 최저 수준 — 떨어졌는데, 이는 단일 지불자 체계가 아니라 ACA 보조와 Medi-Cal 확대 덕분입니다."
        ]
      }
    },
    "policing": {
      "name": "치안과 형사 처벌",
      "short_description": "캘리포니아는 경찰 증원, 경찰 개혁, 비경찰 대안 사이에서 어떻게 균형을 맞춰야 할까요?",
      "stance_scale": {
        "1": "경찰을 확대하고 형사 처벌을 강화",
        "2": "경찰을 확대하되, 일부 개혁 포함",
        "3": "둘 다 — 더 많은 경찰관과 더 많은 책무성·대안",
        "4": "개혁, 감독, 비경찰 대응을 우선",
        "5": "상당한 재원을 경찰에서 지역사회 서비스로 이전"
      },
      "voter_guide": {
        "current_policy": "캘리포니아는 일련의 경찰 책무성 법을 통과시키면서도 대부분의 재정과 기소 결정은 지방 기관과 선출된 지방검사에게 맡겼습니다. [AB 392](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB392)(2019)는 경찰이 치명적 무력을 사용할 수 있는 기준을 — 종전의 더 느슨한 \"합리적\" 기준 대신 — 즉각적 위협을 멈추는 데 \"필요한\" 경우로 높였습니다. [SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB2)(2021), Kenneth Ross Jr. Police Decertification Act는 중대한 비위에 대해 경찰관의 자격을 박탈(\"탈자격\")하고 퇴직자를 전국 데이터베이스에 보고하는 주 전체 절차를 마련했습니다. [AB 1506](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1506)(2020)은 주 법무부가 비무장 민간인을 사망케 한 경찰 총격을 수사하도록 요구합니다. 2011년 \"Realignment\"([AB 109](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201120120AB109))가 하위 중범죄자를 주 교도소에서 카운티로 이전한 이래 주 교도소 인구는 급격히 줄었습니다.",
        "arguments_for_change": "수감을 줄이고 대안을 사용하는 것을 선호하는 사람들은 캘리포니아 교도소 인구가 Realignment 이후 폭력 범죄의 지속적 증가 없이 크게 줄었다고 주장하며 — 많은 사람이 지역사회에서 안전하게 감독될 수 있음을 시사한다고 봅니다. 그들은 전환 프로그램, 정신건강·중독 치료, 재진입 지원이 교도소보다 더 저렴하게 근본 원인을 다루며, 강한 책무성 규정(AB 392, SB 2)이 지역사회 신뢰를 쌓고 값비싼 비위를 줄인다고 말합니다.",
        "arguments_against_change": "더 많은 재정과 엄격한 처벌을 선호하는 사람들은 충분한 경찰관과 명확한 처벌이 범죄를 억제하고 피해자를 안심시킨다고 주장합니다. 그들은 개혁 기간 동안 일부 유형의 범죄가 증가했다고 지적하며 대중의 신뢰를 위해 눈에 보이는 단속이 필요하다고 말합니다. 그들은 책무성 의무와 수감 감소가 충분한 경찰·감독 자원과 짝지어지지 않으면 부서에 부담을 주고 상습범이 순환하게 만들 수 있다고 경고합니다. 그들이 보기에 공공 안전을 교도소 인원 감축과 맞바꿔서는 안 됩니다.",
        "comparison": "캘리포니아의 \"필요한\" 무력 사용 기준과 주 전체 탈자격 제도는 많은 주의 그것보다 강하지만, Colorado와 New Jersey 같은 주도 2020년 이후 유사한 개혁을 채택했습니다. 캘리포니아의 수감률은 전국 평균과 비슷하거나 조금 낮은 수준에 있으며 — Mississippi, Louisiana, Texas 같은 고수감 주보다 훨씬 낮습니다.",
        "note_on_options": "치안 예산과 대부분의 기소 결정은 지역 사안이므로, 주지사의 지렛대는 주 전체 기준, CDCR 운영, 교도소 수용 능력, 보조금, 법안 서명입니다. 입장 1(더 많은 재정, 엄격한 처벌)과 입장 5(탈수감, 대안)는 주지사가 밀어붙일 수 있는 방향과 강조점을 묘사하는 것이지, 지방 경찰력이나 카운티 구치소에 대한 일방적 통제가 아닙니다.",
        "key_facts": [
          "[AB 392](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB392)(2019)는 경찰의 치명적 무력에 대해 \"필요한\" 기준을 설정했습니다 — 전국에서 더 엄격한 무력 사용법 중 하나입니다.",
          "[SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB2)(2021)는 주의 경찰 기준 위원회(POST)에 중대한 비위에 대해 경찰관을 탈자격할 권한을 주었습니다. 탈자격된 경찰관은 재고용될 수 없으며 National Decertification Index에 등재됩니다.",
          "[AB 1506](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1506)(2020)은 주 법무부가 비무장 민간인에 대한 치명적 경찰 총격을 수사하도록 요구합니다.",
          "캘리포니아 교도소 인구는 2011년 Realignment([AB 109](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201120120AB109))와 팬데믹 시기 감축 이후 2025년 12월까지 약 90,600명으로 — 2019년 12월보다 약 27% 낮게 — 떨어졌습니다. 주는 여러 교도소를 폐쇄했습니다.",
          "캘리포니아의 수감률은 2025년 성인 100,000명당 약 294명으로, 2006년 총 173,000명이 넘던 정점에서 줄었습니다. 경찰 인력과 예산은 지역에서 정해지므로 주지사의 직접 통제는 제한적입니다."
        ]
      }
    },
    "oil_gas": {
      "name": "캘리포니아 내 석유·가스 생산",
      "short_description": "캘리포니아는 주 내에서 석유·가스를 더 시추해야 할까요, 현재 수준을 유지해야 할까요, 아니면 단계적으로 줄여야 할까요?",
      "stance_scale": {
        "1": "더 시추 — 주 내 석유·가스를 확대",
        "2": "현재 생산을 유지; 규제를 완화",
        "3": "대체로 현 상태를 유지",
        "4": "단계적으로 축소 — 규정을 강화하고, 새 시추 허가 발급을 중단",
        "5": "주 내 시추를 빠르게 단계적으로 폐지"
      },
      "voter_guide": {
        "current_policy": "캘리포니아는 주 내 석유·가스 시추를 허용하지만, 규정을 강화했고 새 시추를 많이 승인하지 않고 있습니다. [SB 1137](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1137)(Gonzalez, 2022)은 주택, 학교, 병원, 그리고 사람들이 오래 머무는 다른 장소로부터 3,200피트 이내에 새 유정이나 개보수 유정을 금지합니다. 석유업계는 주민투표 부의로 이 법을 뒤집으려 했으나 2024년 6월 26일 이를 철회했습니다 — 그래서 완충지대 법은 2024년 투표 조치로 유권자에게 부쳐지는 대신 발효되었습니다. 주 내 석유 생산은 급격히 줄었습니다: 캘리포니아는 2024년 약 1억 400만 배럴의 원유를 뽑았는데, 이는 정점보다 약 70% 줄어든 수치입니다. 그리고 CARB의 Low Carbon Fuel Standard — 운송 연료가 탄소를 더 적게 배출하도록 밀어붙이는 주 규정으로, 2024년 개정되어 2025년 7월 발효 — 은 그 목표를 계속 강화하고 있습니다.",
        "arguments_for_change": "석유를 더 빨리 단계적으로 폐지하는 것을 지지하는 사람들은 시추가 유정 인근의 저소득 및 Latino 지역사회에 대기 오염과 건강 피해를 집중시킨다고 말합니다. 그들은 주 내 생산이 이미 줄고 있고 캘리포니아가 정제하는 원유의 일부만 공급하므로 — 질서 있게 줄이는 것이 공급에 미치는 영향이 제한적이라고 지적합니다. 그들은 계속되는 시추가 주의 탄소 중립 목표와 충돌하며, 모든 새 유정이 결국 주가 정화 비용을 대야 할 폐기·유휴 유정 더미를 더한다고 주장합니다.",
        "arguments_against_change": "생산 유지를 지지하는 사람들은 주 내 석유가 수만 개의 일자리와 Kern County 세수의 큰 몫을 떠받친다고 말합니다. 그들은 지역 공급을 줄이면 — 흔히 다른 곳에서 더 약한 환경 규정 아래 생산된 — 원유를 더 수입하게 되고 운전자를 가격 급등에 노출시킨다고 주장합니다. 그들은 정유소 폐쇄가 이미 연료 공급과 가격을 위협하고 있으며, 갑작스러운 제한이 이미 전국에서 가장 높은 축에 드는 주유소 가격을 더 올린다고 경고합니다.",
        "comparison": "캘리포니아는 대규모 생산과 함께 생산을 줄이겠다는 명시적 계획을 짝지은 유일한 주요 미국 산유 주입니다. Texas, New Mexico, North Dakota는 모두 확대하고 있습니다. 캘리포니아의 새 유정과 주택 사이 3,200피트 완충지대는 전국에서 가장 큰 시추 이격 거리 요건 중 하나입니다.",
        "note_on_options": "이 척도는 생산 확대(1)부터 주 전체 신속 단계적 폐지(5)까지 이어집니다. '현 상태'는 중간 부근에 위치합니다: 캘리포니아는 현재 기존 생산이 계속되며 감소하도록 허용하면서 지역사회 인근의 새 유정을 제한합니다. SB 1137 이격 거리는 지지하나 추출의 확정적 종료일에는 반대하는 후보는 3 부근에 위치합니다.",
        "key_facts": [
          "[SB 1137](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1137)의 새 유정과 주택 사이 3,200피트 완충지대는 업계가 폐지 주민투표 부의를 철회한 뒤 2024년 6월 27일 발효되었습니다. 이는 'Prop 4' 투표 조치로 통과된 것이 아닙니다 — 흔한 혼동입니다.",
          "캘리포니아는 2024년 약 1억 400만 배럴의 원유를 생산했습니다 — 정점보다 약 70% 줄어든 수치입니다. 주는 미국 산유 주 중 약 7위입니다.",
          "Kern County는 캘리포니아 주 내 석유 생산의 약 65–70%를 차지합니다.",
          "캘리포니아는 정유소가 사용하는 원유의 대부분을 수입합니다 — 주 내 유정에서 오는 것은 약 4분의 1에 불과합니다. 나머지는 해상이나 Alaska에서 옵니다.",
          "CARB의 2024년 Low Carbon Fuel Standard 개정(운송 연료가 시간이 지남에 따라 더 깨끗해지도록 요구하는 규정; 2025년 7월 1일 발효)은 목표를 강화했습니다. CARB는 단기적으로 갤런당 약 5–8센트를 더할 것으로 추정했으나, 일부 학계 추정치는 더 높았습니다."
        ]
      }
    },
    "abortion": {
      "name": "낙태와 재생산 권리",
      "short_description": "캘리포니아는 낙태 접근을 확대해야 할까요, 유지해야 할까요, 아니면 제한해야 할까요?",
      "stance_scale": {
        "1": "제한을 추가(예: 시기 제한 또는 부모 동의)",
        "2": "일부 제한을 허용",
        "3": "캘리포니아의 현행 강력한 보호를 유지",
        "4": "접근을 강화 — 더 많은 재원과 더 많은 의료 제공자",
        "5": "더 나아감 — 타주 환자를 지원하고 누가 진료를 제공할 수 있는지 확대"
      },
      "voter_guide": {
        "current_policy": "낙태는 캘리포니아 헌법에 명시된 권리입니다. 약 66%의 유권자가 승인한 [Proposition 1](https://lao.ca.gov/BallotAnalysis/Proposition?number=1&year=2022)(2022년 11월)은 주 헌법을 개정해 캘리포니아가 낙태와 피임을 포함한 재생산 자유를 거부하거나 방해하는 것을 금지했습니다. 미국 연방대법원의 2022년 Dobbs 판결이 연방 차원의 낙태권을 종식한 뒤, 의회는 일련의 법을 통과시켰습니다. [AB 1242](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1242)와 [AB 2091](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2091)(2022)은 캘리포니아 경찰, 사업체, 의료 제공자가 타주 낙태 수사를 돕거나 관련 기록을 넘기는 것을 막습니다. [SB 345](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB345)(2023)는 원격 진료와 낙태약을 제공하는 이들을 포함한 캘리포니아 면허 의료 제공자가 다른 주에 의해 기소되거나 인도되지 않도록 보호합니다. Medi-Cal은 낙태를 주 비용 전액으로 보장하며, 주는 낙태 접근과 의료 제공자를 지원하기 위해 $200 million 넘게 책정했습니다.",
        "arguments_for_change": "보호를 더 확대하기를 원하는 사람들(높은 쪽)은 더 많은 주가 금지를 부과하는 가운데 캘리포니아가 피난처 역할을 해야 한다고 말합니다 — 타주 환자의 이동과 진료 재원을 대고, 의료 제공자 보호와 수용 능력을 넓히며, 향후 연방 제한에 앞서 대비해야 한다는 것입니다. 그들은 합법 여부뿐 아니라 비용과 물류가 사람들이 실제로 진료를 받을 수 있는지를 결정하므로, 주가 이를 적극적으로 지원하고 보호해야 한다고 주장합니다.",
        "arguments_against_change": "일부 제한을 선호하거나 단지 더 확대하지 않기를 바라는 사람들(낮은 쪽)은 도덕적 또는 종교적 근거에서 낙태가 임신 후기 제한 같은 일부 제약을 받아야 한다고 주장합니다. 그들은 공적 자금이 낙태나 타주 환자의 진료비를 대서는 안 되며, 보호법(shield law)과 피난처 재원이 캘리포니아를 다른 주 법과의 다툼으로 끌어들이고 납세자가 부담해야 할 범위를 늘린다고 말합니다. 캘리포니아 내에서는 Prop 1의 66% 차이를 고려할 때 이는 소수 의견입니다.",
        "comparison": "캘리포니아는 Dobbs 이후 낙태 접근에 가장 보호적인 주 중 하나로, 헌법적 권리, Medi-Cal 보장, 공적 재원, 의료 제공자 보호법을 결합하고 있습니다. 이는 낙태를 금지하거나 크게 제한하는 십수 개 넘는 주와 뚜렷이 대비되며, 캘리포니아를 다른 곳에서 오는 환자의 진료를 공개적으로 지원하고 보호하는 소수의 주 그룹에 둡니다.",
        "note_on_options": "이 척도는 접근에 대한 일부 제한 지지(1)부터 광범위한 의료 제공자 보호를 갖춘 주 재정의 주간(州間) 피난처(5)까지 이어집니다. 캘리포니아의 헌법적 권리와 일방적인 2022년 투표를 고려하면, 대부분의 유력 후보는 보호적인 쪽에 몰려 있습니다; 차별화되는 질문은 낙태가 주 내에서 합법인지가 아니라 주간 진료를 얼마나 지원하고 의료 제공자를 보호할지에 관한 것입니다.",
        "key_facts": [
          "[Proposition 1](https://lao.ca.gov/BallotAnalysis/Proposition?number=1&year=2022)(2022)은 약 66%의 지지로 통과되어, 낙태와 피임에 대한 명시적 권리를 주 헌법에 써넣었습니다.",
          "Medi-Cal은 주가 전액을 부담하며 낙태를 보장하고, 주가 규제하는 민간 보험 플랜도 일반적으로 이를 보장하도록 요구됩니다.",
          "캘리포니아는 보호법 — [AB 1242](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1242), [AB 2091](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2091)(2022)과 [SB 345](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB345)(2023) — 을 통과시켜 주 내 의료 제공자와 환자(원격 진료를 이용하는 타주 환자 포함)가 다른 주의 낙태 기소에 끌려 들어가지 않도록 보호합니다.",
          "주는 낙태 접근에 재원을 대고, 의료 제공자 수용 능력을 넓히며, 이동 같은 비용으로 환자를 돕기 위해 최근 예산들에 걸쳐 $200 million 넘게 책정했습니다.",
          "Dobbs 이후, 캘리포니아는 금지가 있는 주의 환자들이 진료를 위해 찾아올 수 있는 곳으로 스스로를 자리매김했으며, 이들을 지원하기 위한 주 재원을 마련했습니다."
        ]
      }
    },
    "school_funding": {
      "name": "K-12 학교 재정과 거버넌스",
      "short_description": "캘리포니아는 K-12 공립학교에 더 많이, 더 적게, 아니면 대체로 같은 정도로 지출해야 할까요?",
      "stance_scale": {
        "1": "K-12 지출을 크게 삭감",
        "2": "지출을 줄이거나 동결",
        "3": "지출을 대체로 같게 유지",
        "4": "재원을 적당히 증가(교사 급여, 시설)",
        "5": "재원을 크게 증가(교사 급여, 학급 축소), 필요시 새 세수 마련"
      },
      "voter_guide": {
        "explainer": "여기서 자주 나오는 용어 몇 가지가 있습니다. 'Prop 98'은 주가 K-12 학교와 커뮤니티 칼리지에 지출해야 하는 연간 최저액을 정한 1988년 주 헌법 개정안입니다. 'LCFF'(Local Control Funding Formula)는 그 돈을 나눠 주는 2013년 제도입니다: 모든 교육구는 학생 1인당 기본액을 받고, 저소득·영어 학습·위탁 보호 학생에 대해 추가액을 받습니다. '학생 1인당 지출'은 총 학교 자금을 학생 수로 나눈 것입니다. 'NAEP'는 주들을 비교할 수 있게 하는 전국 시험('국가 성적표'라는 별명)입니다. '필지세(parcel tax)'는 일부 교육구가 추가 학교 자금을 마련하기 위해 사용하는, 각 부동산에 매기는 정액 지방세입니다.",
        "current_policy": "K-12 재정은 두 기둥에 의존합니다. [Prop 98](https://lao.ca.gov/Publications/Report/4929)(1988)은 주가 학교와 커뮤니티 칼리지에 지출해야 하는 연간 최저액을 정한 헌법 규칙입니다. Local Control Funding Formula(LCFF, 2013)는 그 돈이 어떻게 나뉘는지를 정합니다: 모든 교육구는 학생 1인당 기본 교부금을 받고, 추가 교부금(기본액의 추가 20%)을 받으며, 고수요 학생이 많은 교육구는 집중 교부금을 받습니다 — 모두 저소득·영어 학습·위탁 보호 학생을 겨냥합니다. 2024-25년의 경우 Prop 98 최저액은 총 약 $115.3 billion(K-12에 대해 약 $101.1 billion)이었습니다. 유권자들은 또한 2024년 11월 학교 및 커뮤니티 칼리지 건물을 짓고 고치기 위한 $10 billion 규모의 채권인 [Prop 2](https://lao.ca.gov/BallotAnalysis/Proposition?number=2&year=2024)를 통과시켰습니다.",
        "arguments_for_change": "더 많은 재원과 더 강한 지역 통제를 원하는 사람들은 캘리포니아가 여전히 비슷한 고비용 주들보다 학생 1인당 적게 지출하며, 저소득 학생, 영어 학습자, 위탁 청소년의 기회 격차를 좁히기 위해 LCFF의 추가·집중 교부금이 더 커야 한다고 말합니다. 그들은 경쟁력 있는 교사 급여, 학교 건물, 전환 유치원 확대를 위해 꾸준하고 지정된 재원 — 세금이나 채권 — 이 필요하며, Sacramento의 의무가 아니라 지역 교육자가 그것을 어떻게 쓸지를 가장 잘 안다고 주장합니다.",
        "arguments_against_change": "책무성과 개혁을 강조하는 사람들은 LCFF 이후 지출이 크게 늘었지만 NAEP에서 그에 상응하는 성과는 없었으므로, 우선순위는 새 세금이 아니라 집중 교부금이 실제로 어디로 가는지 보여주고 측정 가능한 성과를 내는 것이어야 한다고 말합니다. 그들은 [Prop 98](https://lao.ca.gov/Publications/Report/4929)이 이미 오르는 하한을 보장하고, 주 예산이 경기에 따라 출렁이며, LCFF의 느슨한 지출 규칙 때문에 추가 자금이 의도된 고수요 학생에게 닿는지 확인하기 어렵다고 지적합니다.",
        "comparison": "캘리포니아의 높은 비용을 감안하면, 학생 1인당 지출은 이제 주들 중 중상위에 위치하지만 여전히 New York 같은 큰손보다는 낮습니다. NAEP 점수는 여전히 전국 평균을 밑돌아, 문제가 돈이 너무 적은 것인지, 돈을 어떻게 쓰는지인지, 아니면 책무성 부족인지를 두고 논쟁이 이어지고 있습니다.",
        "note_on_options": "이 척도는 재정 수준(삭감부터 대규모 새 세수까지)과 주 대 지역 통제 축을 모두 아우릅니다. 이 둘은 갈릴 수 있습니다: 후보는 세금 인상 없이 더 많은 지역 통제를 선호할 수도, 더 많은 주 주도 형평성 재원을 선호할 수도 있습니다. 우리의 기본 코딩은 지정된 새 세금이나 채권 지지를 가장 강한 값 5 신호로, 책무성 우선·LCFF 개혁 입장을 값 1로 봅니다.",
        "key_facts": [
          "모든 재원에서 나온 학생 1인당 총 지출은 2024-25년 약 $23,878였으며(주 추정), 계속 오를 것으로 전망됩니다.",
          "동일 기준의 Census 수치로, 캘리포니아는 2022-23년 학생 1인당 약 $19,894를 지출했습니다 — 주들 중 약 13위로, 전년의 28위에서 올랐습니다.",
          "LCFF(2013)는 추가 교부금(기본액의 추가 20%)과 집중 교부금을 각 교육구의 기본 교부금 위에 쌓아 고수요 교육구로 더 많은 돈을 돌립니다.",
          "2024년 NAEP 전국 시험에서 캘리포니아는 전국 평균을 약간 밑돌았습니다 — 예를 들어 4학년 읽기 212 대 214, 8학년 읽기 254 대 257 — 다만 다른 지역과의 장기 격차는 좁혀졌습니다.",
          "[Prop 2](https://lao.ca.gov/BallotAnalysis/Proposition?number=2&year=2024)(2024년 11월)는 K-12와 커뮤니티 칼리지 건물을 위해 $10 billion 규모의 채권을 승인했습니다; 많은 교육구는 또한 지방 필지세(각 부동산에 매기는 정액세)를 부과하는데, 이는 3분의 2의 유권자 승인이 필요합니다."
        ]
      }
    }
  },
  "dimensions": {
    "years_in_office_band": {
      "name": "선출직 재임 연수",
      "description": "신선한 정치적 목소리를 선호하시나요, 아니면 폭넓은 선출직 재임 경력을 가진 사람을 선호하시나요?",
      "scale": {
        "1": "신선함을 강하게 선호 — 선출직 5년 미만",
        "2": "신선함 쪽에 가까움",
        "3": "선호 없음",
        "4": "경험 쪽에 가까움",
        "5": "폭넓은 경험을 강하게 선호 — 선출직 15년 이상"
      }
    },
    "career_path": {
      "name": "경력 배경",
      "description": "주지사로서 어떤 경력 배경에 끌리시나요? (선호가 없으면 비워 두세요.)",
      "options": {
        "state_pol": "주 정치(하원, 상원, 주 전체 직위)",
        "federal_pol": "연방 정치(연방의회, 내각)",
        "local_pol": "지방 정치(시장, 의회, 보안관)",
        "business": "기업 / 민간 부문",
        "law_enforcement": "법 집행",
        "law": "변호사 실무 또는 법학 학계",
        "activism": "활동가 / 지역사회 조직화",
        "nonprofit": "비영리 단체 리더십",
        "academia": "학계 / 교육",
        "media": "미디어 / 언론",
        "health": "의료 / 공중보건",
        "social_work": "사회복지 / 공공 서비스"
      }
    },
    "endorsement_coalition": {
      "name": "지지 연합",
      "description": "누구의 지지 신호가 당신에게 가장 중요한가요? (선호가 없으면 비워 두세요.)",
      "options": {
        "labor": "노동조합",
        "environmental": "환경 단체",
        "civil_rights": "시민권 단체",
        "business": "재계",
        "law_enforcement": "법 집행 협회",
        "womens_orgs": "여성 단체",
        "faith": "신앙 공동체",
        "latino_caucus": "Latino 코커스 / Latino 단체",
        "lgbtq_orgs": "LGBTQ+ 단체",
        "newspapers": "주요 캘리포니아 신문(LA Times, SF Chronicle, Sac Bee)",
        "dem_party": "California Democratic Party",
        "rep_party": "California Republican Party",
        "trump": "Donald Trump / 전국 공화당 인사"
      }
    },
    "geographic_background": {
      "name": "지역 배경",
      "description": "캘리포니아의 특정 지역 출신 후보를 선호하시나요? (선호가 없으면 비워 두세요.)",
      "options": {
        "bay_area": "Bay Area",
        "la_county": "Los Angeles County",
        "oc_ie": "Orange County / Inland Empire",
        "san_diego": "San Diego",
        "central_valley": "Central Valley",
        "north": "Far North / Sierra",
        "central_coast": "Central Coast"
      }
    },
    "electability": {
      "name": "당선 가능성",
      "description": "본선 경쟁력 — 여론조사 강세, 모금력, 폭넓은 호소력 — 이 얼마나 중요하게 작용하나요?",
      "scale": {
        "1": "결정적 — 다른 요소보다 당선 가능성에 더 비중을 둠",
        "2": "상당한 비중",
        "3": "중간 정도의 비중",
        "4": "약간의 비중",
        "5": "작용하지 않음 — 경쟁력과 무관하게 정책 부합으로 투표"
      }
    },
    "age_band": {
      "name": "연령 / 세대",
      "description": "어떤 연령대를 선호하시나요? (선택 사항.)",
      "options": {
        "millennial": "밀레니얼(1981–1996년 출생)",
        "gen_x": "X세대(1965–1980년 출생)",
        "boomer": "베이비붐 세대(1946–1964년 출생)",
        "silent": "침묵 세대(1946년 이전 출생)"
      }
    },
    "demographic_background": {
      "name": "인구통계학적 배경",
      "description": "어떤 후보 배경이 당신에게 긍정적으로 중요한가요? (선택 사항 — 선호가 없으면 비워 두세요. 답변은 익명입니다.)",
      "options": {
        "black": "흑인 / 아프리카계 미국인",
        "latino": "Latino / 히스패닉",
        "aapi": "아시아계 미국인 / 태평양 섬 주민",
        "white": "백인",
        "native": "아메리카 원주민 / 토착민",
        "multiracial": "다인종",
        "woman": "여성",
        "man": "남성",
        "nonbinary": "논바이너리",
        "lgbtq": "LGBTQ+",
        "catholic": "가톨릭",
        "protestant": "개신교 / 복음주의",
        "jewish": "유대교",
        "muslim": "무슬림",
        "hindu": "힌두교",
        "sikh": "시크교",
        "secular": "비종교 / 무신론 / 무교",
        "immigrant": "이민자 또는 이민 1세대 미국인",
        "veteran": "참전용사 / 군 복무"
      }
    }
  }
};


// ---------- Candidate overlays (party + bio_short) ----------
// Candidate *names* are intentionally NOT translated (proper nouns), matching
// the citations-stay-English rule; only party label + bio_short are localized.
DATASET_I18N.es.candidates = {
  "hilton": {
    "party": "Republicano",
    "bio_short": "Colaborador de Fox News; expresentador de The Next Revolution (2017–2023); exasesor sénior del primer ministro británico David Cameron. Respaldado por Donald Trump (2026-04-06)."
  },
  "steyer": {
    "party": "Demócrata",
    "bio_short": "Inversionista multimillonario, activista ambiental y candidato presidencial en 2020; fundador de Farallon Capital y NextGen America. Su campaña se financia en gran parte con fondos propios."
  },
  "bianco": {
    "party": "Republicano",
    "bio_short": "Sheriff del condado de Riverside desde 2018; con 26 años de servicio en el Departamento del Sheriff del condado de Riverside."
  },
  "becerra": {
    "party": "Demócrata",
    "bio_short": "Exsecretario de Salud y Servicios Humanos de EE. UU. (2021–2025); exfiscal general de California (2017–2021); exrepresentante de EE. UU. (1993–2017)."
  },
  "porter": {
    "party": "Demócrata",
    "bio_short": "Exrepresentante de EE. UU. por CA-47 (antes CA-45), 2019–2025; profesora de derecho en UC Irvine; reconocida a nivel nacional por sus explicaciones con pizarra en las audiencias de comités."
  },
  "mahan": {
    "party": "Demócrata",
    "bio_short": "Alcalde de San José desde 2022; exconcejal de la ciudad de San José; exejecutivo tecnológico; demócrata moderado enfocado en la respuesta a la falta de vivienda y el costo de vida."
  },
  "villaraigosa": {
    "party": "Demócrata",
    "bio_short": "Exalcalde de Los Angeles (2005–2013); expresidente de la Asamblea Estatal de California (1998–2000). Se postuló anteriormente para gobernador en 2018."
  },
  "thurmond": {
    "party": "Demócrata",
    "bio_short": "Superintendente de Instrucción Pública de California desde 2019; exmiembro de la Asamblea Estatal (Richmond / Contra Costa); extrabajador social."
  }
};
DATASET_I18N.zh.candidates = {
  "hilton": {
    "party": "共和党",
    "bio_short": "Fox News 撰稿人；曾任 The Next Revolution 节目主持人（2017–2023）；曾任英国首相 David Cameron 的高级顾问。获 Donald Trump 背书（2026-04-06）。"
  },
  "steyer": {
    "party": "民主党",
    "bio_short": "亿万富翁投资者、环保活动人士及 2020 年总统候选人；Farallon Capital 和 NextGen America 的创始人。竞选活动主要为自筹资金。"
  },
  "bianco": {
    "party": "共和党",
    "bio_short": "自 2018 年起任 Riverside County 警长；在 Riverside County Sheriff's Department 服务长达 26 年。"
  },
  "becerra": {
    "party": "民主党",
    "bio_short": "前美国卫生与公众服务部部长（2021–2025）；前加利福尼亚州总检察长（2017–2021）；前美国众议员（1993–2017）。"
  },
  "porter": {
    "party": "民主党",
    "bio_short": "前 CA-47 选区（此前为 CA-45）美国众议员，2019–2025 年在任；UC Irvine 法学教授；以在委员会听证会上用白板讲解而闻名全国。"
  },
  "mahan": {
    "party": "民主党",
    "bio_short": "自 2022 年起任 San José 市长；前 San José 市议会议员；前科技公司高管；专注于无家可归问题应对和生活成本的温和派民主党人。"
  },
  "villaraigosa": {
    "party": "民主党",
    "bio_short": "前 Los Angeles 市长（2005–2013）；前加利福尼亚州议会议长（1998–2000）。曾于 2018 年竞选州长。"
  },
  "thurmond": {
    "party": "民主党",
    "bio_short": "自 2019 年起任加利福尼亚州公共教育总监；前州议会议员（Richmond / Contra Costa）；前社会工作者。"
  }
};
DATASET_I18N.vi.candidates = {
  "hilton": {
    "party": "Đảng Cộng hòa",
    "bio_short": "Cộng tác viên của Fox News; cựu người dẫn chương trình The Next Revolution (2017–2023); cựu cố vấn cấp cao cho Thủ tướng Anh David Cameron. Được Donald Trump ủng hộ (2026-04-06)."
  },
  "steyer": {
    "party": "Đảng Dân chủ",
    "bio_short": "Nhà đầu tư tỷ phú, nhà hoạt động môi trường, và ứng cử viên tổng thống năm 2020; người sáng lập Farallon Capital và NextGen America. Chiến dịch tranh cử phần lớn do ông tự tài trợ."
  },
  "bianco": {
    "party": "Đảng Cộng hòa",
    "bio_short": "Cảnh sát trưởng của Riverside County từ năm 2018; 26 năm công tác tại Sở Cảnh sát Riverside County."
  },
  "becerra": {
    "party": "Đảng Dân chủ",
    "bio_short": "Cựu Bộ trưởng Y tế và Dịch vụ Nhân sinh Hoa Kỳ (2021–2025); cựu Bộ trưởng Tư pháp California (2017–2021); cựu Dân biểu Hoa Kỳ (1993–2017)."
  },
  "porter": {
    "party": "Đảng Dân chủ",
    "bio_short": "Cựu Dân biểu Hoa Kỳ đại diện cho CA-47 (trước đây là CA-45), 2019–2025; giáo sư luật tại UC Irvine; được biết đến trên toàn quốc qua các phần giải thích bằng bảng trắng tại các phiên điều trần của ủy ban."
  },
  "mahan": {
    "party": "Đảng Dân chủ",
    "bio_short": "Thị trưởng San José từ năm 2022; cựu thành viên Hội đồng Thành phố San José; cựu giám đốc điều hành công nghệ; đảng viên Dân chủ ôn hòa tập trung vào việc ứng phó với tình trạng vô gia cư và chi phí sinh hoạt."
  },
  "villaraigosa": {
    "party": "Đảng Dân chủ",
    "bio_short": "Cựu Thị trưởng Los Angeles (2005–2013); cựu Chủ tịch Hạ viện Tiểu bang California (1998–2000). Trước đây từng tranh cử thống đốc vào năm 2018."
  },
  "thurmond": {
    "party": "Đảng Dân chủ",
    "bio_short": "Tổng Giám đốc Giáo dục Công California từ năm 2019; cựu Dân biểu Hạ viện Tiểu bang (Richmond / Contra Costa); cựu nhân viên công tác xã hội."
  }
};
DATASET_I18N.tl.candidates = {
  "hilton": {
    "party": "Republikano",
    "bio_short": "Kontribyutor sa Fox News; dating host ng The Next Revolution (2017–2023); dating senior adviser kay UK PM David Cameron. Inendorso ni Donald Trump (2026-04-06)."
  },
  "steyer": {
    "party": "Demokratiko",
    "bio_short": "Bilyonaryong investor, aktibista para sa kapaligiran, at kandidato sa pagkapangulo noong 2020; tagapagtatag ng Farallon Capital at NextGen America. Ang kampanya ay halos sariling-pondo."
  },
  "bianco": {
    "party": "Republikano",
    "bio_short": "Sheriff ng Riverside County mula 2018; 26-taóng beterano ng Riverside County Sheriff's Department."
  },
  "becerra": {
    "party": "Demokratiko",
    "bio_short": "Dating U.S. Secretary of Health and Human Services (2021–2025); dating Attorney General of California (2017–2021); dating U.S. Representative (1993–2017)."
  },
  "porter": {
    "party": "Demokratiko",
    "bio_short": "Dating U.S. Representative para sa CA-47 (dating CA-45), 2019–2025; propesor ng batas sa UC Irvine; kilala sa buong bansa dahil sa mga paliwanag gamit ang whiteboard sa mga committee hearing."
  },
  "mahan": {
    "party": "Demokratiko",
    "bio_short": "Mayor ng San José mula 2022; dating miyembro ng San José City Council; dating tech executive; moderatong Demokrata na nakatuon sa pagtugon sa kawalan ng tahanan at sa halaga ng pamumuhay."
  },
  "villaraigosa": {
    "party": "Demokratiko",
    "bio_short": "Dating Mayor ng Los Angeles (2005–2013); dating Speaker ng California State Assembly (1998–2000). Dating tumakbo bilang gobernador noong 2018."
  },
  "thurmond": {
    "party": "Demokratiko",
    "bio_short": "California Superintendent of Public Instruction mula 2019; dating State Assemblymember (Richmond / Contra Costa); dating social worker."
  }
};
DATASET_I18N.ko.candidates = {
  "hilton": {
    "party": "공화당",
    "bio_short": "Fox News 객원 논평가; The Next Revolution 진행자 역임(2017–2023); 영국 총리 David Cameron의 선임 보좌관 역임. Donald Trump의 지지를 받음(2026-04-06)."
  },
  "steyer": {
    "party": "민주당",
    "bio_short": "억만장자 투자자, 환경 운동가이자 2020년 대선 후보; Farallon Capital 및 NextGen America 설립자. 선거 운동은 대부분 자가 자금으로 충당."
  },
  "bianco": {
    "party": "공화당",
    "bio_short": "2018년부터 Riverside County 보안관(Sheriff); Riverside County 보안관서 26년 경력의 베테랑."
  },
  "becerra": {
    "party": "민주당",
    "bio_short": "미국 보건복지부 장관 역임(2021–2025); 캘리포니아주 법무장관 역임(2017–2021); 미국 연방 하원의원 역임(1993–2017)."
  },
  "porter": {
    "party": "민주당",
    "bio_short": "CA-47(이전 CA-45) 미국 연방 하원의원 역임, 2019–2025; UC Irvine 법학 교수; 위원회 청문회에서의 화이트보드 설명으로 전국적으로 알려짐."
  },
  "mahan": {
    "party": "민주당",
    "bio_short": "2022년부터 San José 시장; San José 시의회 의원 역임; 테크 기업 임원 출신; 노숙 문제 대응과 생활비 문제에 집중하는 중도 성향 민주당원."
  },
  "villaraigosa": {
    "party": "민주당",
    "bio_short": "Los Angeles 시장 역임(2005–2013); 캘리포니아 주의회 의장 역임(1998–2000). 2018년 주지사 선거에 출마한 바 있음."
  },
  "thurmond": {
    "party": "민주당",
    "bio_short": "2019년부터 캘리포니아주 교육감(Superintendent of Public Instruction); 주의회 의원 역임(Richmond / Contra Costa); 사회복지사 출신."
  }
};

// >>> generated by scripts/gen_zh_hant.mjs — do not edit by hand >>>
DATASET_I18N["zh-Hant"] = {
  "questions": {
    "tax_wealth": {
      "name": "州財富稅",
      "short_description": "加州是否應當對其最富有居民的淨資產徵稅——即對財富本身徵稅，獨立於所得稅之外？",
      "stance_scale": {
        "1": "反對開徵州財富稅",
        "2": "傾向於反對——目前不予支持",
        "3": "持開放態度／尚未決定",
        "4": "支持開徵財富稅",
        "5": "強烈支持對超級富豪開徵財富稅"
      },
      "voter_guide": {
        "current_policy": "加州沒有財富稅——即對一個人所擁有的財產（其淨資產）而非其所賺取的收入徵稅。曾有兩種不同版本被提出，二者運作方式截然不同。2023年，州眾議員 Alex Lee 的 [AB 259](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB259)（連同憲法修正案 ACA 3）提出了一項年度稅——對淨資產超過 $50 million 的部分徵收 1%，超過 $1 billion 的部分徵收 1.5%——但該法案在委員會階段擱淺，從未成為法律。另有一項一次性措施——“Billionaire Tax Act”，正式名稱為 One-Time Wealth Tax for State-Funded Health Care Programs Initiative，由 SEIU-UHW 支持——已取得 2026 年 11 月選票資格：對加州億萬富翁的淨資產一次性徵收 5% 的稅，所得收入大部分用於醫療保健，其餘用於教育和食品援助。",
        "arguments_for_change": "支持者表示，財富稅能夠觸及所得稅無法觸及的財富——億萬富翁可以在淨資產持續增長的同時保持應稅收入很低——並且即便只對最龐大的財富徵收一筆不高的稅，也能夠從一小群納稅人那裡為學校、醫療保健和兒童照護提供資金。",
        "arguments_against_change": "反對者表示，州財富稅會遇到嚴重的法律和實際操作問題（你如何為某人的資產估值？），最具流動性的居民會遷離或重組資產以規避它，而依賴於少數人的稅收收入將難以預測。",
        "comparison": "加州將成為美國第一個真正對總財富徵稅的州。其他幾個高稅收的州曾考慮過這一想法但最終放棄，理由包括法律挑戰、為資產估值的困難，以及最富有居民可能乾脆遷離的風險。",
        "key_facts": [
          "目前美國沒有任何州徵收真正的財富稅。",
          "這是兩項不同的提案。[AB 259](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB259)（2023 年，Alex Lee）是一項年度稅——對淨資產超過 $50 million 的部分徵收 1%，超過 $1 billion 的部分徵收 1.5%——在委員會階段擱淺，從未成為法律。",
          "2026 年 11 月選票上的措施是對加州億萬富翁（淨資產超過 $1 billion）的淨資產一次性徵收 5% 的稅，按某一設定日期評估——並非經常性稅收。其收入大部分專項用於醫療保健，一部分用於教育和食品援助。",
          "一次性稅只需繳納一次，針對某一快照日期的財富；年度稅則在持有財富的每一年都重複徵收。2023 年的法案是年度稅；2026 年的選票措施是一次性稅。",
          "廣泛的財富稅曾在 Washington、New York、Massachusetts 和 Illinois 被提出並失敗。任何財富稅最困難的部分是為沒有明確市場價格的東西估值——私營公司、藝術品、房地產。"
        ]
      }
    },
    "school_choice": {
      "name": "擇校與特許學校",
      "short_description": "加州應當讓開辦特許學校變得更容易還是更難，並給予家庭更多的擇校選擇嗎？",
      "stance_scale": {
        "1": "開辦更多特許學校並擴大家庭擇校權",
        "2": "開辦更多特許學校；保護家庭擇校權",
        "3": "大體維持現行特許學校規則",
        "4": "讓開辦新特許學校變得更難",
        "5": "停止新建特許學校；把資金轉給傳統公立學校"
      },
      "voter_guide": {
        "explainer": "傳統公立學校由當地學區管理，免費並向所有學生開放。特許學校同樣是由稅款資助的免費公立學校，但它們獨立運營——通常由一家非營利組織根據一份合同（即“特許狀”，charter）管理——在教學和招聘方面擁有更大自由，受學區監管較少。私立學校收取學費，且不接受州政府撥款。“擇校”有時也指代用券（vouchers）——家庭可用於支付私立學校學費的公共資金——而加州目前並不提供這種代金券。",
        "current_policy": "加州約有 1,283 所特許學校，外加七個完全由特許學校組成的學區（州數據，2024 年 5 月）。它們大約教育著 11.7% 的公立學校學生。2019 年的兩部法律——[AB 1505](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1505) 和 [AB 1507](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1507)，均於當年 10 月簽署、2020 年 7 月 1 日生效——使開辦和續辦特許學校變得更難。如今學區可以指出財政衝擊或社區影響來否決一所新特許學校，特許學校一般不能在批准它的學區之外運營校區，業績低下的特許學校則可能被拒絕續辦。加州不提供由州政府資助的私立學校代金券或教育儲蓄賬戶。（代金券給予家庭公共資金用於支付私立學校學費；教育儲蓄賬戶，即 ESA，是由政府資助、家長可用於學費、輔導或其他經批准的教育開支的賬戶。）上一項代金券措施，2000 年的 [Prop 38](https://www.lao.ca.gov/ballot/2000/38_11_2000.html)，以 71% 對 29% 落敗。",
        "arguments_for_change": "希望增加擇校權的人士表示，特許學校為家庭——其中低收入家庭和有色人種家庭佔比偏高——提供了除指定社區學校之外的一種選擇，並且某些特許學校網絡為這些學生取得了良好成績。他們認為 [AB 1505](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1505) 給了學區一個基於資金的理由去阻擋競爭者，而代金券或教育儲蓄賬戶則會為那些負擔不起私立學費、或負擔不起搬入頂級學區的家庭打開擇校之門。",
        "arguments_against_change": "反對者——包括 California Teachers Association（CTA）和 California School Boards Association（CSBA）——表示，特許學校和代金券會把生均經費（隨每名學生流動的資金）從學區學校抽走，而這些學區學校仍在教育大多數孩子、仍要支付固定開支。他們認為特許學校質量參差不齊、監管較弱，並援引研究（如 Stanford 的 CREDO 研究）表明特許學校的成績因運營方和州而異，還指出加州選民一再否決代金券，認為那是用公共資金支付私立和宗教學校的費用。",
        "comparison": "加州是在擇校方面較為嚴格的大州之一：它擁有規模龐大的特許學校部門，但與 Arizona、Florida 或 Indiana 不同，不提供私立學校代金券或教育儲蓄賬戶。其 2019 年的法律與全國趨勢背道而馳，後者一直朝著擴大私立學校擇校的方向發展。",
        "note_on_options": "此量表混合了兩種不同的機制：特許學校政策（一種公立學校選擇）和私立學校代金券／ESA（用於支付私立學費的公共資金）。一名候選人可以支持擴大特許學校的同時反對代金券，反之亦然。我們默認的編碼將支持代金券視為最強的支持擇校信號（數值 1），將設上限並轉移資金的立場視為最強的限制性信號（數值 5）。",
        "key_facts": [
          "加州約有 1,283 所特許學校和 7 個全特許學區在運營（州數據，2024 年 5 月）；特許學校大約教育著 11.7% 的公立學校學生（2022-23 學年）。",
          "[AB 1505](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1505)（2019）終結了過去對被拒特許申請幾乎自動享有的上訴權，並允許學區在拒絕或拒絕續辦時援引財政衝擊和社區需求。",
          "[AB 1507](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1507)（2019）阻止了大多數新特許學校在批准它的學區之外運營學習中心或衛星校區（即“特許授權方”——授予並監管特許狀的機構，通常是學區）。",
          "特許學校入學人數有所上升，而普通學區入學人數下降，部分原因是全州總入學人數正在減少。",
          "[Prop 38](https://www.lao.ca.gov/ballot/2000/38_11_2000.html)（2000）原本會給予家庭每個孩子約 $4,000 的代金券，以 71% 對 29% 落敗。此後再未有全州範圍的代金券措施進入選票。"
        ]
      }
    },
    "housing_supply": {
      "name": "住房供應與分區優先權",
      "short_description": "州政府應當多大力度地推動城市建造更多住房——即便當地居民反對？",
      "stance_scale": {
        "1": "大力推動——推翻地方分區規則以強制建造更多住房",
        "2": "大幅推動——設定強有力的建造目標，在一定程度上推翻城市決定",
        "3": "取得平衡——鼓勵建造但把大多數決定權留給城市",
        "4": "基本交由城市決定——限制州的推翻權，轉而削減地方繁文縟節",
        "5": "側重於補貼住房和租戶保護，而非強制建造市場價住房"
      },
      "voter_guide": {
        "current_policy": "在過去十年裡，加州把大量住房審批權從城市手中拿走交給了州政府。[SB 35](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB35)（2017）為未達到州住房目標的城市中符合條件的公寓項目設立了快速通道：審批變為“行政性的”（ministerial），意味著只要符合規則，地方官員必須批准，無權拒絕。[SB 423](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB423)（2023）將該快速通道延長至 2036 年，並將其擴展到部分沿海地區。[SB 9](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB9)（2021）使得在大多數獨棟住宅地產上“依法”（by right）建造雙拼房和拆分地塊成為可能——意味著只要符合規則便自動獲批。州政府還給每個區域設定一個住房目標，稱為 Regional Housing Needs Assessment（RHNA）。當一座城市的本地住房計劃與法律不符時，一項稱為 Housing Accountability Act 的州規則會限制其拒絕住房的權力——而 [AB 1893](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB1893)（2024）為“Builder's Remedy”賦予了真正的約束力，該機制允許開發商在未達到住房目標的城市中繞過地方分區。",
        "arguments_for_change": "更強州控制的支持者表示，是地方政府造成了已持續數十年的住房短缺。Legislative Analyst's Office（LAO）將該州在全國領先的租金和房價直接追溯到在沿海就業中心附近建造太少。支持者認為城市屈服於業主壓力而阻擋新住房，所以只有堅定的州強制措施——自動“依法”審批、可執行的目標以及 Builder's Remedy——才能彌合差距。他們以 [SB 9](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB9) 為證，認為當城市仍有拖延空間時，自願性工具便會失效。",
        "arguments_against_change": "反對者表示，土地使用決定應當屬於瞭解自己社區的地方官員——道路、火災風險、交通、地方特色。他們認為全州一刀切的強制規定會推翻當地選民批准的計劃，而被納入快速通道的“依法”項目可以跳過環境審查和公眾意見。他們還表示，短缺的真正原因是高昂的建造成本、利率和緊張的勞動力供應——而非分區——所以推翻城市決定只會增加衝突，卻無法可靠地建出可負擔住房。",
        "comparison": "加州在推翻地方分區方面比幾乎所有州都走得更遠。其他少數幾個州也朝這個方向邁進——Oregon 於 2019 年在全州範圍內終結了僅限獨棟住宅的分區，Montana 和 Washington 在 2023 年通過了廣泛的法律，允許在現有地塊上建造更多住房。但許多州仍將土地使用決定幾乎完全留給城鎮。",
        "note_on_options": "這是一個單一軸線，衡量州政府應當多大力度地推動擴大市場價住房供應——從激進地優先於地方分區（選項 1）到優先考慮補貼和租戶保護而非州強制供應（選項 5）。候選人可能出於不同原因落在低端：有些人捍衛地方控制權和獨棟住宅社區（選項 4），而另一些人則偏好公共／補貼住房而非市場價建造（選項 5）。此處的立場表明候選人會在多大程度上動用州權力來推翻地方分區以增加供應。",
        "key_facts": [
          "當前的 RHNA 週期（2023–2031）要求全州新建約 250 萬套住房——其中約 100 萬套對低收入家庭可負擔。",
          "[SB 9](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB9)（2021）的使用遠低於預期。在第一年裡，Los Angeles 收到 211 份單元申請，San Francisco 25 份，San Diego 7 份，San José 僅 1 份——儘管 2021 年 Terner Center 的一項分析曾估計約 70 萬套單元可能變得新近可行。",
          "不遵守州住房計劃法的城市每月可被處以 $10,000 至 $600,000 的罰款。",
          "[SB 35](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB35) / [SB 423](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB423) 的快速通道只有在城市未達到其住房目標或沒有州批准的住房計劃時才會啟動。SB 423 還增加了隨項目規模而增長的工資和技術工人要求。",
          "Surplus Land Act 要求地方機構在出售不再需要的公共土地時，把可負擔住房放在首要優先位置。"
        ]
      }
    },
    "sanctuary": {
      "name": "庇護與移民執法",
      "short_description": "加州應當在多大程度上配合聯邦移民執法（ICE）？",
      "stance_scale": {
        "1": "全面配合 ICE——廢除該州的庇護法",
        "2": "保留庇護法但允許更多例外",
        "3": "原樣保留現行庇護法",
        "4": "加強保護（例如為移民的法律辯護提供資金）",
        "5": "走得更遠——增加新的州級保護措施，如為所有人提供州身份證"
      },
      "voter_guide": {
        "explainer": "“庇護法”限制州和地方警察在多大程度上協助聯邦移民執法人員。加州的主要法律是 [SB 54](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB54)，即 California Values Act，於 2017 年通過。",
        "current_policy": "加州的基準是 California Values Act，[SB 54](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB54)（2017），自 2018 年 1 月 1 日起生效。它規定州和地方機構不得動用其人員或資金從事聯邦民事移民執法。這意味著它們一般不能僅因 ICE 提出要求就把某人關押在監獄中（稱為“扣押令”或拘留請求），不能根據民事移民逮捕令逮捕人員，也不能簽署“287(g)”協議——即讓地方警員充當移民執法人員的協議。其中也有例外：如果某人被判犯有州法律所列的某些嚴重或暴力重罪，監獄可以在其獲釋時通知 ICE，或將其移交。另有一部法律，即 TRUTH Act（[AB 2792](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201520160AB2792)，2016），規定被羈押者必須被告知任何 ICE 約談並表示同意，且地方政府若給予 ICE 接觸權限，必須召開公開會議。州監獄（CDCR）只部分受 SB 54 約束，並遵循其自己的通知規則。",
        "arguments_for_change": "希望加強庇護保護的人士認為，把地方警察排除在移民執法之外能建立信任，使移民犯罪受害者和證人在舉報犯罪時感到安全。他們指出 ICE 扣押令通常未經法官簽署，這引發了憲法上的擔憂，並可能使各縣面臨訴訟。他們還指出，現有的重罪例外條款已經允許在最嚴重的案件中進行配合——所以進一步的措施（如限制數據共享，或將 ICE 排除在法院、學校和醫院之外）只會影響民事執法。",
        "arguments_against_change": "希望更全面配合 ICE 的人士認為，釋放被 ICE 標記的人——包括一些有不符合例外條款的過往犯罪記錄者——可能把聯邦當局認為應被驅逐的人送回社區。他們表示，與 ICE 在街頭實施逮捕相比，從監獄有計劃地移交對警員和公眾更安全，並且移民執法是聯邦的職責，州不應當從中阻撓。在他們看來，拒絕 ICE 的請求會損害公共安全和聯邦與州的協作。",
        "comparison": "加州與 Illinois（TRUST Act）以及其他若干州一道，屬於最大限度限制地方配合移民執法人員的州之一。相比之下，Texas（憑藉其 SB 4 法律）和 Florida 等州要求地方機構配合 ICE，並禁止庇護政策。到 2026 年，聯邦 287(g) 計劃在全國與約 1,600 個機構簽有協議——但在加州幾乎沒有。",
        "note_on_options": "由於 SB 54 是成文法且在法庭上得到維持，對一位州長而言現實的範圍是從最大化重罪豁免的執法／指引（低端）到簽署收緊數據共享或 ICE 設施接觸權限的法案（高端）。全盤廢除（遠低於立場 1）或徹底取消一切配合（高於立場 5）都需要州長無法單獨採取的立法行動。",
        "key_facts": [
          "[SB 54](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB54) 於 2018 年 1 月 1 日生效。第一屆 Trump 政府曾起訴以阻止它但敗訴：案件被駁回，Ninth Circuit 上訴法院表示認同，U.S. Supreme Court 拒絕受理——因此該法律仍然有效。",
          "287(g) 協議（授權地方警員從事移民執法）根據 SB 54 對加州各機構是被禁止的。2025 年，Shasta County 治安官的一項嘗試因與州法律衝突而被暫停。",
          "SB 54 的例外條款允許各機構在某人被判犯有特定嚴重或暴力重罪時通知 ICE 或將其移交——而不針對僅有移民身份問題的人。",
          "TRUTH Act（2016）要求告知人們可以拒絕 ICE 的監獄約談，並要求地方機構在給予 ICE 接觸權限時召開公開社區會議。",
          "庇護規則大多由州法律設定，因此州長的主要手段是執法指引、總檢察長對訴訟的處理方式、監獄規則，以及簽署或否決新法案——而非直接廢除該法律。"
        ]
      }
    },
    "homelessness": {
      "name": "無家可歸問題應對",
      "short_description": "加州應當如何應對無家可歸問題——更多依靠執法，還是依靠住房和服務？",
      "stance_scale": {
        "1": "清理露營點並擴大法院強制治療，作為主要手段",
        "2": "以執法為主，但同時提供服務",
        "3": "在兩者間取得平衡——只有在有收容所或服務時才清理營地",
        "4": "以住房優先為主；謹慎使用執法",
        "5": "大力投資住房和服務；僅在萬不得已時使用執法"
      },
      "voter_guide": {
        "explainer": "“住房優先”（Housing First）指立即給某人一個永久的居所，而不先要求其戒斷或接受治療——其理念是一旦有了遮風擋雨之處，處理成癮或精神疾病就會更容易。“監護”（conservatorship）是一項法院命令，把對某個被法官認定無法照顧自己的人的決策權交給另一人或機構。“CARE Court”是一種較新的民事法院程序，可為患有嚴重未經治療精神疾病的人下令制定治療方案。“時點統計”（PIT count）是每年 1 月在一個夜晚清點有多少人無家可歸。",
        "current_policy": "加州的官方規則是“住房優先”：由州資助的項目理應立即向人們提供永久住房，而不先要求其戒斷或接受治療。這寫入了州法律（Welfare & Institutions Code §8255）。在此基礎上，州政府近來增加了執法和治療選項。CARE Act（[SB 1338](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1338)，2022 年通過）設立了民事法院，可為患有未經治療的精神分裂症類障礙的人下令制定治療方案，到 2024 年 12 月每個縣都已開始運行。[Proposition 1](https://calmatters.org/california-voter-guide-2024/prop-1-mental-health/)（2024 年 3 月）批准了一筆 $6.4 billion 的債券，用於精神健康住房和治療，並轉移了部分現有精神健康資金。在 U.S. Supreme Court 的 [Grants Pass v. Johnson](https://calmatters.org/housing/2024/06/california-homeless-camps-grants-pass-ruling/) 裁決（2024 年 6 月）之後，Governor Newsom 要求州各機構和城市清理露營點，並分享了一份可供採用的反露營條例範本。",
        "arguments_for_change": "傾向於以服務為主、住房優先方法（量表高端）的人士表示，穩定的居所才是使應對成癮和精神疾病成為可能的前提——而不是事後才贏得的獎勵。他們援引研究表明住房優先能讓人們保持有房可住。他們認為清理營地只是把人們挪來挪去而不會縮小這一群體的規模，還給他們留下使找房更難的犯罪記錄。他們還警告說，擴大強制治療或監護有可能脅迫那些一開始從未獲得足夠自願幫助的人。",
        "arguments_against_change": "傾向於更多執法、強制治療和監護（量表低端）的人士表示，加州近年來在無家可歸問題上花費了超過 $20 billion，而露宿街頭者的比例仍接近全國最高。他們認為，對於街頭許多患有未經治療的嚴重精神疾病或成癮的人來說，僅靠住房並不奏效，顯眼的露營點帶來了真實的健康和安全問題，而 Grants Pass 裁決如今允許州政府在提供收容和治療的同時，對拒絕者施加後果。",
        "comparison": "加州的無家可歸人口在 2024 年增長了約 3%——遠小於全國約 18% 的增幅。但該州仍然擁有全美各州中最多的無家可歸者、佔全國總數最大的份額，以及露宿戶外比例最高。其他大多數大州能把遠高得多的無家可歸居民比例安置進收容所。",
        "note_on_options": "這一量表從執法與強制治療（1）到完全住房優先、不使用執法（5）。許多候選人偏好組合方式——例如擴大治療床位加上自願住房——它們落在中間；兩端代表的是有爭議的問題：是否應將住房以接受治療為條件，以及是否使用露營禁令執法。",
        "key_facts": [
          "在 2024 年 1 月的一夜統計中，有 187,084 名加州人被記為無家可歸，比前一年的 181,399 人增長 3.1%（HUD）。",
          "加州約佔全國無家可歸人口的 25%，且露宿戶外的比例最高——約三分之二在街頭而非收容所過夜。",
          "[Grants Pass v. Johnson](https://calmatters.org/housing/2024/06/california-homeless-camps-grants-pass-ruling/)（Supreme Court，6-3，2024 年 6 月）裁定禁止在公共場所露營並不違反 Eighth Amendment。這消除了此前即便沒有收容所也對露營者開罰單或逮捕的法律障礙。",
          "[Proposition 1](https://calmatters.org/california-voter-guide-2024/prop-1-mental-health/)（2024 年 3 月）批准了一筆 $6.4 billion 的債券，用於行為健康住房和治療，其中約 $4.4 billion 以撥款形式建造約 6,800 張住院治療床位，外加為無家可歸退伍軍人及其他人提供永久性支持性住房。",
          "到 2026 年初，自該計劃於 2024 年 12 月在全州推行以來，已提交了超過 3,800 份 CARE Act 申請，州政府在 2026 年 3 月又為 CARE 相關服務和住房增撥了 $291 million。"
        ]
      }
    },
    "gun_policy": {
      "name": "槍支政策",
      "short_description": "加州的槍支法應當放寬、維持不變，還是變得更嚴格？",
      "stance_scale": {
        "1": "大幅放寬（更易隱蔽攜槍，執法更寬鬆）",
        "2": "放寬某些具體規則",
        "3": "原樣維持現行槍支法",
        "4": "捍衛現行法律並堵住漏洞",
        "5": "增加重大新限制（槍支登記、更多禁令）"
      },
      "voter_guide": {
        "current_policy": "加州擁有全美最嚴格的一些槍支法。Roberti-Roos Assault Weapons Control Act（1989）及後續法律禁止許多半自動“攻擊性武器”，該州還將彈匣容量上限設為 10 發。2022 年，U.S. Supreme Court 在 NYSRPA v. Bruen 一案中推翻了那些允許官員裁定誰有“足夠正當理由”隱蔽攜槍的規則。作為回應，[SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB2)（2023，2024 年 1 月 1 日生效）將加州轉為“應發”（shall-issue）許可制——意味著任何符合資格的人都能獲得許可——同時增加了 16 小時的培訓要求，以及一長串即便持證也禁止攜槍的“敏感場所”。另有一部法律，[AB 28](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB28)（2023，2024 年生效），對槍支和彈藥銷售加徵 11% 的州稅，用於資助暴力預防和校園安全項目。",
        "arguments_for_change": "希望增加限制的人士指出，槍支法更嚴格的州往往報告的槍支死亡率更低。他們認為攻擊性武器和彈匣限制、SB 2 的敏感場所清單以及 AB 28 稅款，在為預防工作提供資金的同時削減了高風險場所的槍支可得性。他們表示堵住剩餘的漏洞——並在法庭上捍衛現行法律——能挽救生命，而 Second Amendment 仍然允許合理的監管。",
        "arguments_against_change": "反對增加限制的人士認為，加州已經擁有全國最嚴格的規則卻仍有槍支犯罪，所以新限制帶來的收益很小。他們表示 Bruen 之後的法院裁決暗示加州的若干法律可能違憲，並招致代價高昂的訴訟。他們認為寬泛的敏感場所禁令和銷售稅給守法的持槍者帶來負擔，並使攜槍權利取決於你身處何地。他們還表示，執法更應針對非法販運和已被禁止持槍的人，而非合法購買者。",
        "comparison": "獨立機構和倡導團體的評分卡一貫將加州的槍支法排為全國最嚴格或近乎最嚴格——與 Massachusetts、New York、Illinois 和 Connecticut 並列。相比之下，Texas、Arizona 和 Idaho 等“憲法攜槍”州無需許可即可隱蔽攜槍，對彈匣和步槍類型的限制也少得多。",
        "note_on_options": "加州的槍支法很大程度上由 Ninth Circuit 和 Supreme Court 的訴訟塑造，所以一位州長的實際範圍是從根據法院裁決捍衛或收窄現行規則（低端）到簽署新限制並積極捍衛它們（高端）。“回退”（立場 1）主要意味著拒絕捍衛或簽署廢除法案，二者都受 Legislature 制約。",
        "key_facts": [
          "加州自 1989 年 Roberti-Roos Act 以來一直禁止“攻擊性武器”，並將彈匣限制為 10 發。",
          "[SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB2)（2024 年 1 月 1 日生效）在 Bruen 裁決後保留了應發許可制，但列出了約 26 類“敏感場所”。2025 年，Ninth Circuit 上訴法院在案件繼續審理期間維持了其中某些地點禁令，並阻止了另一些。",
          "[AB 28](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB28) 對槍支和彈藥徵收的 11% 稅（2024 年生效）預計每年為暴力預防和校園安全項目籌集約 $160 million。它面臨一項尚未裁決的法庭挑戰。",
          "微刻印（microstamping）及其他廠商端規則（如 [SB 452](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB452)，2023）仍在法律之列，儘管其中某些部分只有在該技術被認定可行時才生效。",
          "加州的若干槍支法正在 Ninth Circuit 依據 Bruen 標準進行積極訴訟——該標準考問一部法律是否符合本國槍支監管的“歷史與傳統”——因此隨著法院作出裁決，哪些規則能夠實際執行也在不斷變化。"
        ]
      }
    },
    "natgas_bridge": {
      "name": "天然氣作為過渡燃料",
      "short_description": "在加州轉向更清潔能源的過程中，天然氣應當扮演什麼角色？",
      "stance_scale": {
        "1": "擴大天然氣使用和基礎設施",
        "2": "暫時保留天然氣；緩慢逐步減少",
        "3": "不設硬性時間表——讓成本和電網可靠性來決定",
        "4": "到 2030 年代中期把天然氣逐出電力領域",
        "5": "在住宅、企業和發電廠中迅速逐步淘汰天然氣"
      },
      "voter_guide": {
        "current_policy": "加州約 40% 的州內電力仍來自天然氣，天然氣還為其約 1,400 萬戶家庭中的大多數供暖。但該州正引導新建築轉用電力。2022 年，California Air Resources Board（CARB——該州的空氣質量機構）設定了一個目標：到 2030 年，所有售出用於住宅的新爐具和熱水器都應實現零排放，商業建築則在 2035 年跟進。CARB 仍在編寫實現這一目標的實際規則。它在 2025 年 12 月將規則縮減，預計 2026 年董事會會進行表決，但目前尚無定論。與此同時，自 Berkeley 於 2019 年率先禁止後，數十座城市在新建工程中禁用天然氣——直到 2023 年一項聯邦上訴法院裁決（CRA v. Berkeley）認定聯邦電器法優先於這些地方禁令。因此該州轉而改用建築規範和排放標準。",
        "arguments_for_change": "更快擺脫天然氣的支持者表示，建築是溫室氣體和形成霧霾汙染物的一大來源，而在室內燃燒天然氣會引發健康擔憂。他們認為鋪設新的天然氣管道和接口存在風險，因為隨著電網轉向電力，這些設備可能變得一文不值。他們指出熱泵如今在加州大多數氣候條件下已勝過燃氣爐。他們還警告說，隨著用氣客戶減少，維護管網的固定成本會落在留下來的人——往往是低收入家庭——身上，所以有計劃、有序的轉換比混亂的轉換更便宜。",
        "arguments_against_change": "把天然氣作為過渡橋樑加以保留的支持者表示，當太陽能和風能不可用時，天然氣可以即時開啟以作後備，有助於在用電高峰時防止停電。他們認為強迫所有人改用電力會增加家庭的前期成本，並給本已昂貴的電網帶來壓力。由於加州的電價在全國排名第 2 高，他們表示使用熱泵所節省的錢並不確定。他們還警告說，突然的強制規定會超出安裝數百萬臺熱泵所需的電氣面板升級和受過培訓的勞動力。",
        "comparison": "加州與 New York（自 2026 年起在大多數新建築中禁用天然氣）和 Washington 一道，是在讓建築擺脫天然氣方面最為激進的州之一。大多數州走的是相反方向：有超過 20 個州通過了法律，禁止城市限制天然氣接口。",
        "note_on_options": "這一量表衡量擺脫天然氣的速度，而非是否要去碳——幾乎所有候選人都接受該州長期的碳中和目標。分歧在於時間表和強制措施（電器禁令、接口禁令、燃氣系統退役）相對於激勵和自願採用之間。",
        "key_facts": [
          "加州約 40% 的電力來自天然氣，天然氣還為該州大多數家庭供暖和供熱水。",
          "CARB 的 2022 年計劃力爭到 2030 年售出的新家用爐具和熱水器 100% 實現零排放——但執行這一目標的規則尚未完成，並在 2025 年 12 月被縮減。",
          "2023 年一項聯邦上訴法院裁決（CRA v. Berkeley）認定，新建築中關於天然氣接口的地方禁令被聯邦電器法所推翻。",
          "加州通過 TECH Clean California 和公用事業項目為熱泵（電力制熱製冷設備）提供回扣，目標是到 2030 年安裝 600 萬臺。",
          "Aliso Canyon——2015–16 年 SoCalGas 甲烷洩漏事故（美國史上最大）的天然氣儲存場——仍在運營。曾計劃的 2027 年關閉如今預計最早也要到 2030 年代後期才會實現。"
        ]
      }
    },
    "prop13_commercial": {
      "name": "商業地產稅（Prop 13 拆分名冊）",
      "short_description": "加州根據地產的購買價格為房地產稅設上限（Prop 13）。商業和商用地產是否應當改為按今天的市場價值徵稅？",
      "stance_scale": {
        "1": "加強對商業地產的稅收上限",
        "2": "維持現行對商業地產的稅收上限",
        "3": "僅對最大型的商業地產加以改變",
        "4": "逐步按市場價值對商業地產徵稅",
        "5": "完全按市場價值對商業地產徵稅"
      },
      "voter_guide": {
        "explainer": "Proposition 13 由選民於 1978 年通過，規定了加州如何對房地產徵稅。你的房地產稅被限制在你購買該地產所付價格的 1%，且應稅價值每年最多隻能上漲約 2%——無論該地產的市場價值攀升多少。完整的稅單隻有在地產出售並按新價格重新評估時才會到期。這一規定同樣適用於住宅、商店、辦公室和工廠。“拆分名冊”（split-roll）指對商用地產與住宅採用不同的徵稅方式；加州目前並不這樣做。",
        "current_policy": "根據 [Prop 13](https://lao.ca.gov/Publications/Report/3497)（1978），加州所有房地產——住宅、商店、辦公室和工廠——都按其購買價格的 1% 徵稅，應稅價值每年漲幅不得超過 2%，直到該地產出售並被重新評估。商用地產沒有單獨的（“拆分名冊”）待遇。[Prop 15](https://lao.ca.gov/BallotAnalysis/Proposition?number=15&year=2020)（2020）原本會對大多數商業和工業地產改變這一點，按當前市場價值徵稅，而住宅仍保留在 Prop 13 的規則之下。它以 52% 對 48% 落敗。",
        "arguments_for_change": "商業拆分名冊的支持者表示，[Prop 13](https://lao.ca.gov/Publications/Report/3497) 的購買價格規則讓長期持有的商用地產——寫字樓、商場、大型工業場地——按已過時數十年的價值徵稅。這把更多的稅負轉移到較新的業主和房主身上。他們引用 LAO 關於 $6.5–$11.5 billion 的估算，認為這是為學校和地方服務提供的穩定資金，並主張按市場價值對商用地產徵稅——同時仍保護房主和小企業——能在不觸動住宅保護的前提下糾正這一失衡。",
        "arguments_against_change": "反對者表示，對商用地產的更高稅收會被轉嫁給租戶——小企業、餐館、租房者——並最終轉嫁給消費者，推高整個經濟中的物價。他們警告說，每年按市場價值重新評估地產既複雜又招致訴訟，會在低迷期、價值和租金都不穩定時對企業打擊最重，而且為任何一類地產削弱 Prop 13 都會為日後逐步侵蝕住宅保護打開大門——破壞選民在 1978 年所投票支持的那種可預測性。",
        "comparison": "加州在以相同方式對商用和住宅地產徵稅方面不同尋常——把二者都鎖定在購買價格上。大多數州會每隔一段時間將所有地產重新評估到接近當前市場價值。結果是，一棟持有數十年的加州商業建築，其稅額可能遠低於一棟近期售出、幾乎一模一樣的建築。",
        "note_on_options": "這一量表是一個清晰的梯度：選項 1 加強對商業地產的 Prop 13 保護，選項 3 是僅適用於超大型持有的定向改革（取自 Prop 15 的小企業豁免模式），選項 5 是完全按市場價值的拆分名冊。住宅 Prop 13 保護不在此處討論之列——每個選項都使其保持不變。",
        "key_facts": [
          "[Prop 13](https://lao.ca.gov/Publications/Report/3497) 將房地產稅率限制在購買價格的 1%，並將應稅價值的年度增長限制在 2%——直到該地產易手並被重新評估。",
          "LAO 估計 [Prop 15](https://lao.ca.gov/BallotAnalysis/Proposition?number=15&year=2020) 在完全分階段實施後（約 2025 年），每年將為地方政府和學校籌集 $6.5 billion 至 $11.5 billion。",
          "在這筆錢中，約 60% 會流向城市、縣和特別區，40% 流向學校和社區學院（LAO）。",
          "Prop 15 完全將住宅排除在外。它還豁免了在加州擁有 $3 million 或更少商用地產的小企業，外加最多 $500,000 的營業設備。",
          "Prop 15 在 2020 年 11 月全州落敗，51.9% 對 48.1%。"
        ]
      }
    },
    "healthcare_funding": {
      "name": "醫療保健籌資機制",
      "short_description": "加州是否應當轉向由州運營的單一支付方醫療體系（由州為所有人承保，而非私人保險）——如果是，又將如何為其買單？",
      "stance_scale": {
        "1": "回退近期對州醫療保障（Medi-Cal）的擴展",
        "2": "維持現今的體系；側重於降低成本",
        "3": "逐步擴大保障，不開徵大的新稅",
        "4": "單一支付方，主要由對財富和企業的稅收來買單",
        "5": "單一支付方，由廣泛的新稅（如工資稅）來買單"
      },
      "voter_guide": {
        "explainer": "“單一支付方”（single-payer）指由一個政府計劃支付所有人的醫療賬單，而非由眾多私人保險公司支付。“ACA”（Affordable Care Act，也稱 Obamacare）是創立了補貼市場、讓人們可以在其中購買保障的聯邦法律。“Medi-Cal”是加州版的 Medicaid——面向低收入居民的公共醫療保障項目。",
        "current_policy": "加州採用私人保險加上大量政府幫助的混合模式，而非單一的州運營計劃。Covered California 是該州的 Affordable Care Act（ACA）市場，人們在此購買保障，州政府出資以降低保費。Medi-Cal——加州版的 Medicaid，面向低收入居民的公共保障項目——於 2024 年 1 月 1 日擴展，覆蓋所有符合資格的無證成年人，使加州成為第一個無論移民身份都提供完整 Medicaid 保障的州。轉向單一政府運營計劃的努力一再失敗：[AB 1400](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1400)（CalCare 法案，2022）在表決前被撤回，其後續法案 [AB 2200](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2200)（2024）在委員會被叫停。",
        "arguments_for_change": "希望轉向州單一支付方計劃（高端）的人士表示，一個公共計劃能去掉保險公司的管理費用、保費、自付額和受限的醫療網絡。他們引用一些分析（如 UC Berkeley Labor Center 的估算），認為整個體系的總支出可能更少。他們認為覆蓋所有人——無論工作或移民身份——運營起來更簡單，而加州龐大的體量將賦予它談判更低價格的籌碼。",
        "arguments_against_change": "希望保留現行補貼私人市場（低端）的人士表示，單一支付方每年約 $300–400 billion 的價格意味著大幅的新稅，且不保證有淨節省。他們指出它依賴於可能永遠不會到來的聯邦批准和 ERISA 例外。他們警告說，顛覆大多數人已經擁有的僱主和 Medicare 保障在政治上和實際上都有風險——而加州已經通過擴大補貼和 Medi-Cal 實現了接近全民的保障，沒有經歷那種動盪。",
        "comparison": "沒有任何美國州運營單一支付方體系。Vermont 於 2014 年通過了一個，隨後因無法弄清如何為其買單而放棄。加州選擇了一條不同的道路——擴大補貼和 Medicaid——在保留私人保險市場的同時，達到了全國最低的無保險率之一。",
        "note_on_options": "這一量表衡量籌資機制——從保留補貼私人市場（1）到像 CalCare 那樣的州運營單一支付方計劃（5）——而非是否要擴大保障。一名候選人可以支持廣泛擴大保障（例如 2024 年的 Medi-Cal 擴展）的同時反對單一支付方籌資；這類立場落在量表中間。",
        "key_facts": [
          "Medi-Cal 於 2024 年 1 月 1 日把完整保障擴展到所有符合資格的成年人，無論移民身份——是首個這樣做的州。",
          "[AB 1400](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1400)（CalCare）於 2022 年 1 月 31 日夭折，當時其提案人將其撤回，未達到所需的 41 張眾議院票。其 2024 年的後續法案 [AB 2200](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2200) 在 Appropriations 委員會被擱置。",
          "分析人士估計 CalCare 每年約花費 $314–391 billion——超過該州整個一般基金預算——並將需要新的工資稅、企業稅和高收入稅。",
          "單一支付方計劃將需要聯邦政府批准（通過所謂的 Section 1332 以及 Medicaid/Medicare 豁免）以重新調配聯邦資金。一部名為 ERISA 的聯邦法律還限制了州在多大程度上能監管許多大型僱主使用的自籌資金健康計劃。",
          "加州的無保險率近年來降至約 6–7%——為有記錄以來最低之列——這得益於 ACA 補貼和 Medi-Cal 擴展，而非單一支付方體系。"
        ]
      }
    },
    "policing": {
      "name": "警務與刑事處罰",
      "short_description": "加州應當如何在增加警力、警務改革和非警務替代方案之間取得平衡？",
      "stance_scale": {
        "1": "擴充警力並加重刑事處罰",
        "2": "擴充警力，並進行一些改革",
        "3": "兩者兼顧——更多警員，以及更多問責和替代方案",
        "4": "優先改革、監督和非警務應對",
        "5": "把可觀的資金從警務轉向社區服務"
      },
      "voter_guide": {
        "current_policy": "加州通過了一系列警務問責法律，同時把大多數資金和起訴決定留給地方機構和民選的地區檢察官。[AB 392](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB392)（2019）提高了警察可以使用致命武力的門檻——改為在“必要”（necessary）以制止迫在眉睫的威脅時，而非此前更寬鬆的“合理”（reasonable）標準。[SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB2)（2021），即 Kenneth Ross Jr. Police Decertification Act，設立了一套全州程序，可因嚴重不當行為剝奪（“吊銷認證”）警員的執照，並將離職者上報至一個全國數據庫。[AB 1506](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1506)（2020）要求州 Department of Justice 調查導致手無寸鐵平民死亡的警察槍擊事件。自 2011 年的“Realignment”（[AB 109](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201120120AB109)）把較低級別的重罪犯從州監獄轉移到各縣以來，州監獄人口已大幅下降。",
        "arguments_for_change": "傾向於減少監禁並使用替代方案的人士認為，加州的監獄人口在 Realignment 之後大幅下降，而暴力犯罪並未持續上升——這表明許多人可以在其社區中得到安全監管。他們表示分流項目、精神健康和成癮治療以及再融入幫助，比監獄更便宜地處理了根本原因，而強有力的問責規則（AB 392、SB 2）能建立社區信任並減少代價高昂的不當行為。",
        "arguments_against_change": "傾向於更多撥款和更嚴處罰的人士認為，擁有足夠的警員和明確的後果能威懾犯罪並安撫受害者。他們指出某些類型的犯罪在改革年份有所上升，並表示需要看得見的執法來增強公眾信心。他們警告說，問責強制規定和較低的監禁率，若沒有足夠的警力和監管資源相匹配，可能使各部門不堪重負並讓慣犯反覆進出。在他們看來，不應為降低監獄人數而犧牲公共安全。",
        "comparison": "加州的“必要”用武標準和全州吊銷認證體系比許多州更強，儘管 Colorado 和 New Jersey 等州在 2020 年後採取了類似改革。加州的監禁率接近或略低於全國平均水平——並遠低於 Mississippi、Louisiana 和 Texas 等高監禁州。",
        "note_on_options": "警務預算和大多數起訴決定都是地方性的，所以一位州長的槓桿是全州標準、CDCR 運營、監獄容量、撥款和簽署法案。立場 1（更多撥款、更嚴處罰）和立場 5（去監禁化、替代方案）描述的是州長可以推動的方向和側重，而非對地方警力或縣監獄的單方面控制。",
        "key_facts": [
          "[AB 392](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB392)（2019）為警察致命武力設定了“必要”標準——是全國較嚴格的用武法律之一。",
          "[SB 2](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB2)（2021）賦予該州警務標準委員會（POST）因嚴重不當行為吊銷警員認證的權力。被吊銷認證的警員不能被重新僱用，並被列入 National Decertification Index。",
          "[AB 1506](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1506)（2020）要求州 Department of Justice 調查警察對手無寸鐵平民的致命槍擊。",
          "在 2011 年 Realignment（[AB 109](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201120120AB109)）和疫情期間的削減之後，加州監獄人口到 2025 年 12 月降至約 90,600——比 2019 年 12 月低約 27%。該州已關閉多座監獄。",
          "加州 2025 年的監禁率約為每 100,000 名成年人 294 人，低於 2006 年逾 173,000 名總囚犯的峰值。警察編制和預算由地方設定，所以州長的直接控制有限。"
        ]
      }
    },
    "oil_gas": {
      "name": "加州州內石油和天然氣生產",
      "short_description": "加州是否應當在州內開採更多石油和天然氣、維持當前水平，還是逐步縮減？",
      "stance_scale": {
        "1": "多開採——擴大州內石油和天然氣",
        "2": "維持當前產量；放鬆監管",
        "3": "大體維持現狀",
        "4": "逐步縮減——收緊規則，停止發放新的鑽探許可",
        "5": "迅速逐步淘汰州內鑽探"
      },
      "voter_guide": {
        "current_policy": "加州允許在州內進行石油和天然氣鑽探，但它已收緊規則，並且沒有批准多少新的鑽探。[SB 1137](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1137)（Gonzalez，2022）禁止在住宅、學校、醫院及其他人們長時間停留的場所 3,200 英尺範圍內新建或改造油井。石油行業曾試圖以一項選票公投推翻該法律，但於 2024 年 6 月 26 日撤回——因此該緩衝區法律得以生效，而非作為 2024 年的選票措施交由選民表決。州內石油產量已大幅下降：加州在 2024 年抽採了約 1.04 億桶原油，比其峰值下降約 70%。而 CARB 的 Low Carbon Fuel Standard——一項推動交通燃料產生更少碳排放的州規則，於 2024 年修訂、2025 年 7 月生效——還在持續收緊這些目標。",
        "arguments_for_change": "更快逐步淘汰石油的支持者表示，鑽探把空氣汙染和健康危害集中在油井附近的低收入和拉美裔社區。他們指出州內產量已在萎縮，且只供應加州煉製原油中的少部分——所以有序地逐步縮減對供應的影響有限。他們認為繼續鑽探與該州的碳中和目標相沖突，而且每一口新井都會增加州政府最終將不得不出錢清理的廢棄、閒置油井的堆積。",
        "arguments_against_change": "維持產量的支持者表示，州內石油支撐著數萬個工作崗位以及 Kern County 稅基的很大一部分。他們認為削減本地供應意味著進口更多原油——往往是在他處依據更寬鬆環境規則生產的——並使駕車者面臨價格飆升的風險。他們警告說，煉油廠關閉已經威脅到燃料供應和價格，而在一個加油價格本已位居全國最高之列的州，突然的限制會推高汽油價格。",
        "comparison": "加州是唯一一個把高產量與明確的減產計劃相結合的美國主要產油州。Texas、New Mexico 和 North Dakota 都在擴大生產。加州在新井與住宅之間 3,200 英尺的緩衝區，是全國所要求的最大鑽探退讓距離之一。",
        "note_on_options": "這一量表從擴大生產（1）到迅速的全州逐步淘汰（5）。“維持現狀”位於中間附近：加州目前允許現有生產繼續並自然衰減，同時限制社區附近的新井。一名支持 SB 1137 退讓距離但反對硬性開採終止日期的候選人，編碼在 3 附近。",
        "key_facts": [
          "[SB 1137](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB1137) 在新井與住宅之間 3,200 英尺的緩衝區，於 2024 年 6 月 27 日在行業撤回其廢除公投後生效。它並非作為“Prop 4”選票措施通過——這是一個常見的混淆。",
          "加州在 2024 年生產了約 1.04 億桶原油——比其峰值下降約 70%。該州在美國產油州中排名約第 7。",
          "Kern County 約佔加州州內石油產量的 65–70%。",
          "加州煉油廠使用的原油大部分依賴進口——只有約四分之一來自州內油井。其餘通過海運或來自 Alaska。",
          "CARB 2024 年對 Low Carbon Fuel Standard（一項要求交通燃料隨時間變得更清潔的規則；2025 年 7 月 1 日生效）的更新收緊了目標。CARB 估計這在近期內會使每加侖增加約 5–8 美分，儘管一些學術估算更高。"
        ]
      }
    },
    "abortion": {
      "name": "墮胎與生育權利",
      "short_description": "加州應當擴大、維持還是限制墮胎可及性？",
      "stance_scale": {
        "1": "增加限制（如時間限制或父母同意）",
        "2": "允許某些限制",
        "3": "維持加州現行的強力保護",
        "4": "加強可及性——更多資金和更多服務提供者",
        "5": "走得更遠——為外州患者提供資金，並擴大可提供醫療服務者的範圍"
      },
      "voter_guide": {
        "current_policy": "墮胎是寫入加州憲法的一項權利。[Proposition 1](https://lao.ca.gov/BallotAnalysis/Proposition?number=1&year=2022)（2022 年 11 月），由約 66% 的選民批准，修訂了州憲法，禁止加州否定或干涉生育自由，包括墮胎和避孕。在 U.S. Supreme Court 2022 年的 Dobbs 裁決終結了墮胎的聯邦權利之後，Legislature 通過了一系列法律。[AB 1242](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1242) 和 [AB 2091](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2091)（2022）阻止加州警察、企業和服務提供者協助外州墮胎調查或交出相關記錄。[SB 345](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB345)（2023）保護持加州執照的服務提供者——包括提供遠程醫療和墮胎藥物者——免遭其他州的起訴或引渡。Medi-Cal 以全額州費用承保墮胎，該州還撥出超過 $200 million 以支持墮胎可及性和服務提供者。",
        "arguments_for_change": "希望進一步擴大保護（高端）的人士表示，隨著越來越多的州實施禁令，加州應當充當一個避風港——為外州患者的出行和醫療提供資金，擴大服務提供者的保護和能力，並搶在任何未來聯邦限制之前行動。他們認為決定人們能否真正獲得醫療的是成本和後勤，而不僅僅是某事是否合法，所以州政府應當積極地為其提供資金並加以保護。",
        "arguments_against_change": "傾向於某些限制、或僅僅是不再進一步擴大（低端）的人士，基於道德或宗教理由認為墮胎應當面臨某些限制，如在妊娠後期的限制。他們表示公共資金不應支付墮胎或外州患者的醫療，而盾牌法和避風港資金把加州拖入與其他州法律的紛爭，並擴大了納稅人被要求承擔的範圍。鑑於 Prop 1 的 66% 得票優勢，在加州內部這是少數派觀點。",
        "comparison": "加州是 Dobbs 之後對墮胎可及性最具保護性的州之一，把憲法權利、Medi-Cal 承保、公共資金和服務提供者盾牌法結合在一起。這與十多個禁止或嚴格限制墮胎的州形成鮮明對比，並使加州躋身於公開為來自他處的患者提供資金並保護其醫療的少數幾個州之列。",
        "note_on_options": "這一量表從支持對可及性施加某些限制（1）到一個由州資助、跨州的擴展型避風港並對服務提供者提供廣泛保護（5）。鑑於加州的憲法權利和 2022 年懸殊的投票結果，大多數有競爭力的候選人都聚集在保護性的一端；有區分度的問題在於在多大程度上為跨州醫療提供資金並保護服務提供者，而非墮胎在州內是否合法。",
        "key_facts": [
          "[Proposition 1](https://lao.ca.gov/BallotAnalysis/Proposition?number=1&year=2022)（2022）以約 66% 的支持通過，把墮胎和避孕的明確權利寫入州憲法。",
          "Medi-Cal 承保墮胎且由州支付全部費用，受州監管的私人保險計劃一般也被要求承保。",
          "加州通過了盾牌法——[AB 1242](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB1242)、[AB 2091](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2091)（2022）和 [SB 345](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB345)（2023）——保護州內服務提供者和患者（包括使用遠程醫療的外州患者）免被捲入其他州的墮胎起訴。",
          "該州在近期各項預算中撥出超過 $200 million，以資助墮胎可及性、擴大服務提供者能力，並幫助患者支付出行等費用。",
          "在 Dobbs 之後，加州把自己打造成一個來自禁令州的患者可以前往就醫的地方，並以州資金為他們提供支持。"
        ]
      }
    },
    "school_funding": {
      "name": "K-12 學校經費與治理",
      "short_description": "加州在 K-12 公立學校上應當多花、少花，還是大致維持不變？",
      "stance_scale": {
        "1": "大幅削減 K-12 開支",
        "2": "削減或維持開支",
        "3": "大體維持開支不變",
        "4": "適度增加經費（教師薪酬、設施）",
        "5": "大幅增加經費（教師薪酬、更小班級），必要時籌集新收入"
      },
      "voter_guide": {
        "explainer": "這裡有幾個術語經常出現。“Prop 98”是 1988 年對州憲法的一項修正案，規定了州政府每年必須在 K-12 學校和社區學院上支出的最低額。“LCFF”，即 Local Control Funding Formula，是 2013 年發放這筆錢的制度：每個學區按學生人頭獲得一筆基礎金額，外加為低收入、正在學習英語或處於寄養中的學生提供的額外資金。“生均支出”（Per-pupil spending）是學校總經費除以學生人數。“NAEP”是一項全國性考試（暱稱“the Nation's Report Card”），讓人可以對各州進行比較。“地塊稅”（parcel tax）是某些學區用來籌集額外學校經費、對每處地產徵收的固定地方稅。",
        "current_policy": "K-12 經費依靠兩大支柱。[Prop 98](https://lao.ca.gov/Publications/Report/4929)（1988）是一項憲法規則，規定了州政府每年必須在學校和社區學院上支出的最低額。Local Control Funding Formula（LCFF，2013）決定這筆錢如何分配：每個學區按學生人頭獲得一筆基礎撥款，外加一筆補充撥款（基礎額的額外 20%），對於高需求學生眾多的學區，還有一筆集中撥款——全部針對低收入、正在學習英語或處於寄養中的學生。2024-25 年度，Prop 98 最低額總計約為 $115.3 billion（其中約 $101.1 billion 用於 K-12）。選民還在 2024 年 11 月通過了 [Prop 2](https://lao.ca.gov/BallotAnalysis/Proposition?number=2&year=2024)，這是一筆 $10 billion 的債券，用於建造和修繕學校及社區學院的建築。",
        "arguments_for_change": "希望增加經費和加強地方控制的人士表示，加州的生均支出仍低於條件相當的高成本州，且 LCFF 的補充和集中撥款應當更大，以縮小低收入學生、英語學習者和寄養青少年的機會差距。他們認為，要為有競爭力的教師薪酬、校舍以及擴大過渡性幼兒園提供資金，需要一個穩定、專項的資金來源——一項稅或一筆債券——並且最懂得如何花錢的是當地教育工作者，而非 Sacramento 的強制規定。",
        "arguments_against_change": "強調問責和改革的人士表示，自 LCFF 以來開支大幅攀升，但 NAEP 上的進步並不相稱，所以重點應當是展示集中撥款的錢究竟去了哪裡並取得可衡量的成果——而非新稅。他們指出 [Prop 98](https://lao.ca.gov/Publications/Report/4929) 已經保障了一個不斷上升的下限，州預算隨經濟波動，而 LCFF 寬鬆的支出規則使人難以確認這筆額外的錢是否真正惠及了它本應惠及的高需求學生。",
        "comparison": "一旦針對加州的高成本進行調整，其生均支出如今位於各州的中上水平，儘管仍低於 New York 等支出大戶。其 NAEP 分數仍低於全國平均水平，這使得關於問題究竟是錢太少、錢怎麼花，還是缺乏問責的辯論一直持續。",
        "note_on_options": "這一量表跨越了經費水平（從削減到大量新收入）和州與地方控制的軸線。二者可能分道揚鑣：一名候選人可能偏好在不加稅的情況下加強地方控制，或偏好更多由州主導的公平性經費。我們默認的編碼將支持一項專項新稅或債券視為最強的數值 5 信號，將問責優先、改革 LCFF 的立場視為數值 1。",
        "key_facts": [
          "2024-25 年度來自所有來源的生均總支出約為 $23,878（州估算），預計將繼續上升。",
          "按可對等比較的 Census 數據，加州在 2022-23 年度的生均支出約為 $19,894——在各州中約排第 13，較前一年的第 28 位有所上升。",
          "LCFF（2013）在每個學區的基礎撥款之上疊加一筆補充撥款（基礎額的額外 20%）和一筆集中撥款，以把更多的錢引向需求更高的學區。",
          "在 2024 年的 NAEP 全國考試中，加州的得分略低於全國平均水平——例如 4 年級閱讀 212 對 214，8 年級閱讀 254 對 257——儘管其與全國其餘部分的長期差距已經縮小。",
          "[Prop 2](https://lao.ca.gov/BallotAnalysis/Proposition?number=2&year=2024)（2024 年 11 月）授權了 $10 billion 債券用於 K-12 和社區學院的建築；許多學區還徵收地方地塊稅（對每處地產徵收的固定稅），這需要三分之二選民批准。"
        ]
      }
    }
  },
  "dimensions": {
    "years_in_office_band": {
      "name": "擔任民選公職的年限",
      "description": "你更青睞一位嶄新的政治聲音，還是一位有豐富民選公職任期的人？",
      "scale": {
        "1": "強烈偏好嶄新——擔任民選公職不足 5 年",
        "2": "傾向嶄新",
        "3": "沒有偏好",
        "4": "傾向有經驗",
        "5": "強烈偏好資深——擔任民選公職 15 年以上"
      }
    },
    "career_path": {
      "name": "職業背景",
      "description": "在一位州長身上，哪些職業背景對你有吸引力？（如無偏好請留空。）",
      "options": {
        "state_pol": "州政治（Assembly、Senate、全州性公職）",
        "federal_pol": "聯邦政治（Congress、Cabinet）",
        "local_pol": "地方政治（市長、議會、治安官）",
        "business": "商業／私營部門",
        "law_enforcement": "執法",
        "law": "執業或學術法律",
        "activism": "行動主義／社區組織",
        "nonprofit": "非營利領導",
        "academia": "學術界／教學",
        "media": "媒體／新聞",
        "health": "醫療保健／公共衛生",
        "social_work": "社會工作／公共服務"
      }
    },
    "endorsement_coalition": {
      "name": "背書聯盟",
      "description": "誰的背書信號對你最重要？（如無偏好請留空。）",
      "options": {
        "labor": "勞工工會",
        "environmental": "環保組織",
        "civil_rights": "民權組織",
        "business": "商界",
        "law_enforcement": "執法協會",
        "womens_orgs": "婦女組織",
        "faith": "信仰群體",
        "latino_caucus": "拉美裔核心小組／拉美裔組織",
        "lgbtq_orgs": "LGBTQ+ 組織",
        "newspapers": "加州主要報紙（LA Times、SF Chronicle、Sac Bee）",
        "dem_party": "California Democratic Party",
        "rep_party": "California Republican Party",
        "trump": "Donald Trump／全國性共和黨人物"
      }
    },
    "geographic_background": {
      "name": "地域背景",
      "description": "你是否偏好來自加州某一特定地區的候選人？（如無偏好請留空。）",
      "options": {
        "bay_area": "Bay Area",
        "la_county": "Los Angeles County",
        "oc_ie": "Orange County／Inland Empire",
        "san_diego": "San Diego",
        "central_valley": "Central Valley",
        "north": "Far North／Sierra",
        "central_coast": "Central Coast"
      }
    },
    "electability": {
      "name": "勝選可能性",
      "description": "大選可行性——民調實力、籌款、廣泛吸引力——在多大程度上被納入考量？",
      "scale": {
        "1": "決定性——我把勝選可能性看得高於其他因素",
        "2": "權重很大",
        "3": "權重適中",
        "4": "有一些權重",
        "5": "不納入考量——無論可行性如何，我都按理念契合度投票"
      }
    },
    "age_band": {
      "name": "年齡／世代",
      "description": "你偏好哪個年齡群體？（可選。）",
      "options": {
        "millennial": "千禧一代（生於 1981–1996）",
        "gen_x": "X 世代（生於 1965–1980）",
        "boomer": "嬰兒潮一代（生於 1946–1964）",
        "silent": "沉默的一代（生於 1946 年之前）"
      }
    },
    "demographic_background": {
      "name": "人口背景",
      "description": "哪些候選人背景對你而言具有正面意義？（可選——如無偏好請留空。你的回答是匿名的。）",
      "options": {
        "black": "黑人／非裔美國人",
        "latino": "拉美裔／西班牙裔",
        "aapi": "亞裔美國人／太平洋島民",
        "white": "白人",
        "native": "美洲原住民／原住民",
        "multiracial": "多種族",
        "woman": "女性",
        "man": "男性",
        "nonbinary": "非二元性別",
        "lgbtq": "LGBTQ+",
        "catholic": "天主教徒",
        "protestant": "新教徒／福音派",
        "jewish": "猶太教徒",
        "muslim": "穆斯林",
        "hindu": "印度教徒",
        "sikh": "錫克教徒",
        "secular": "世俗／無神論者／無宗教",
        "immigrant": "移民或第一代美國人",
        "veteran": "退伍軍人／服過兵役"
      }
    }
  }
};
DATASET_I18N["zh-Hant"].candidates = {
  "hilton": {
    "party": "共和黨",
    "bio_short": "Fox News 撰稿人；曾任 The Next Revolution 節目主持人（2017–2023）；曾任英國首相 David Cameron 的高級顧問。獲 Donald Trump 背書（2026-04-06）。"
  },
  "steyer": {
    "party": "民主黨",
    "bio_short": "億萬富翁投資者、環保活動人士及 2020 年總統候選人；Farallon Capital 和 NextGen America 的創始人。競選活動主要為自籌資金。"
  },
  "bianco": {
    "party": "共和黨",
    "bio_short": "自 2018 年起任 Riverside County 警長；在 Riverside County Sheriff's Department 服務長達 26 年。"
  },
  "becerra": {
    "party": "民主黨",
    "bio_short": "前美國衛生與公眾服務部部長（2021–2025）；前加利福尼亞州總檢察長（2017–2021）；前美國眾議員（1993–2017）。"
  },
  "porter": {
    "party": "民主黨",
    "bio_short": "前 CA-47 選區（此前為 CA-45）美國眾議員，2019–2025 年在任；UC Irvine 法學教授；以在委員會聽證會上用白板講解而聞名全國。"
  },
  "mahan": {
    "party": "民主黨",
    "bio_short": "自 2022 年起任 San José 市長；前 San José 市議會議員；前科技公司高管；專注於無家可歸問題應對和生活成本的溫和派民主黨人。"
  },
  "villaraigosa": {
    "party": "民主黨",
    "bio_short": "前 Los Angeles 市長（2005–2013）；前加利福尼亞州議會議長（1998–2000）。曾於 2018 年競選州長。"
  },
  "thurmond": {
    "party": "民主黨",
    "bio_short": "自 2019 年起任加利福尼亞州公共教育總監；前州議會議員（Richmond / Contra Costa）；前社會工作者。"
  }
};
// <<< end generated zh-Hant <<<
