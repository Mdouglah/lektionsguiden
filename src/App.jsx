import { useState } from "react";

const DATA = {
  1: { "Svenska": { "Bokstäver och ljud": ["Vokaler och konsonanter","Korta och långa ljud","Bokstavsformer"], "Läsning": ["Ordbilder","Enkel avläsning","Läsförståelse med bilder"], "Skrivning": ["Skriva sitt namn","Enkla meningar","Stor bokstav och punkt"] }, "Matematik": { "Tal och räkning": ["Talen 1–10","Räkna framåt och bakåt","Addition och subtraktion till 10"], "Geometri": ["Former: cirkel, kvadrat, triangel","Sortera och jämföra"] } },
  2: { "Svenska": { "Läsning": ["Läsflyt och avkodning","Texttyper – berättande texter","Läsförståelsestrategier"], "Skrivning": ["Meningsbyggnad","Skiljetecken","Beskrivande texter"], "Grammatik": ["Substantiv och verb","Stor och liten bokstav"] }, "Matematik": { "Tal och räkning": ["Talen upp till 100","Tiokamrater","Addition och subtraktion med uppställning"], "Mätning": ["Längd och vikt","Tid – klockan"] } },
  3: { "Svenska": { "Läsning": ["Lässtrategier – före, under, efter","Faktatexter vs skönlitteratur","Texters budskap"], "Skrivning": ["Berättande text med handling","Instruktioner","Menings- och styckebyggnad"] }, "Matematik": { "Tal och räkning": ["Tal upp till 1000","Multiplikationstabellen","Division med enkla tal"], "Geometri": ["Area och omkrets","Koordinatsystem"], "Statistik": ["Tabeller och diagram","Enkel dataanalys"] }, "Engelska": { "Kommunikation": ["Hälsningsfraser","Färger och siffror","Enkla meningar på engelska"] } },
  4: { "Svenska": { "Läsning": ["Analysera karaktärer","Inferenser i text","Jämföra texter"], "Skrivning": ["Argumenterande text","Novellskrivning","Källkritik i enkla texter"] }, "Matematik": { "Tal och räkning": ["Decimaltal","Bråk – grundläggande","Skriftliga räknemetoder"], "Algebra": ["Enkla ekvationer","Mönster och talföljder"] }, "Engelska": { "Grammatik": ["Verb i presens och preteritum","Frågeord"], "Kommunikation": ["Beskriva vardagen","Enkla berättelser"] }, "SO": { "Historia": ["Forntiden i Sverige","Vikingatiden"], "Geografi": ["Kartan – Sverige","Väder och klimat"] } },
  5: { "Svenska": { "Läsning": ["Källkritik","Skönlitteraturanalys","Retoriska grepp"], "Skrivning": ["Argumenterande text – för och emot","Reportage","Formell och informell stil"] }, "Matematik": { "Tal och räkning": ["Bråk, decimaltal, procent","Negativa tal","Prioriteringsregler"], "Geometri": ["Vinklar","Area av triangel och parallellogram"], "Statistik": ["Medelvärde, median, typvärde","Sannolikhet"] }, "NO": { "Biologi": ["Cellen – livets grund","Kroppens organ","Ekosystem"], "Fysik": ["Kraft och rörelse","Elektricitet – grunder"], "Kemi": ["Ämnen och material","Blandningar och lösningar"] }, "SO": { "Historia": ["Medeltiden","Kolonisationen"], "Samhällskunskap": ["Demokrati och val","Mänskliga rättigheter"] } },
  6: { "Svenska": { "Läsning": ["Kritisk läsning av media","Litteraturhistoria – översikt","Analys av språkliga val"], "Skrivning": ["Utredande text","Debattartikel","Berättartekniker"] }, "Matematik": { "Tal och räkning": ["Procent och förändring","Rationella tal","Proportionalitet"], "Algebra": ["Ekvationer – lösning","Koordinatsystem och grafer"], "Geometri": ["Pythagoras sats – introduktion","Volymer"] }, "Engelska": { "Grammatik": ["Konditionalis","Passiv form","Modala hjälpverb"], "Kommunikation": ["Muntlig presentation","Skriva formella texter","Diskutera åsikter"] }, "Spanska": { "Kommunikation": ["Presentera sig och andra","Vardagliga fraser","Beställa och fråga om vägen"], "Grammatik": ["Substantiv och genus","Presens av vanliga verb","Adjektivkongruens"] }, "Franska": { "Kommunikation": ["Hälsningar och presentationer","Siffror, datum och tid","Beskriva familj och hem"], "Grammatik": ["Artiklar – bestämd/obestämd","Presens av être och avoir","Adjektivets placering"] }, "Tyska": { "Kommunikation": ["Hälsa och presentera sig","Beskriva platser och personer","Frågor och svar i vardagen"], "Grammatik": ["Nominativ och ackusativ","Presens av starka verb","Personliga pronomen"] }, "NO": { "Biologi": ["Genetik – arv och miljö","Evolution"], "Fysik": ["Ljud och ljus","Energi och effekt"], "Kemi": ["Periodiska systemet","Syror och baser"] }, "SO": { "Historia": ["Revolutionernas tid","Imperialismen"], "Geografi": ["Jordens resurser","Befolkning och migration"] } },
  7: { "Svenska": { "Läsning": ["Modernistisk litteratur","Retorisk analys"], "Skrivning": ["Vetenskaplig rapport","Krönika"] }, "Matematik": { "Algebra": ["Linjära funktioner","Andragradsekvationer – intro"], "Statistik": ["Normalfördelning","Regression – intro"] }, "Engelska": { "Litteratur": ["Engelskspråkig skönlitteratur","Textanalys på engelska"], "Kommunikation": ["Debatt på engelska","Akademiskt skrivande"] }, "Spanska": { "Kommunikation": ["Beskriva rutiner och fritid","Handla och äta ute","Berätta om upplevelser"], "Grammatik": ["Preteritum – regelrätta verb","Reflexiva verb","Direkt objektspronomen"] }, "Franska": { "Kommunikation": ["Berätta om sin dag","Handla och äta ute","Beskriva platser och resor"], "Grammatik": ["Passé composé med avoir","Negation – ne...pas","Frågeord och frågeställningar"] }, "Tyska": { "Kommunikation": ["Berätta om skola och fritid","Diskutera mat och shopping","Planera och föreslå aktiviteter"], "Grammatik": ["Dativ – introduktion","Modala hjälpverb","Perfekt med haben och sein"] }, "Fysik": { "Mekanik": ["Newtons lagar","Rörelsemängd"], "Elektricitet": ["Kretsar och komponenter","Magnetism"] }, "Kemi": { "Organisk kemi": ["Kolföreningar","Reaktionstyper"], "Kvantitativ kemi": ["Molbegreppet","Reaktionslikvationer"] }, "Historia": { "Modern historia": ["Industrialismen","Första världskriget"] }, "Samhällskunskap": { "Politik": ["Sveriges statsskick","EU och internationella org."] } },
  8: { "Svenska": { "Läsning": ["Postkolonial litteraturanalys","Diskursanalys"], "Skrivning": ["Akademisk essä","Litterär analys"] }, "Matematik": { "Algebra": ["Andragradsekvationer","Exponentialfunktioner"], "Geometri": ["Trigonometri","Vektorer – intro"] }, "Engelska": { "Grammatik": ["Tempus – fördjupning","Konjunktioner och satser"], "Kommunikation": ["Argumenterande tal","Engelska i media och kultur"] }, "Spanska": { "Kommunikation": ["Diskutera åsikter och nyheter","Beskriva känslor och relationer","Argumentera och övertala"], "Grammatik": ["Imperfecto vs preteritum","Subjunktiv – introduktion","Indirekt tal"] }, "Franska": { "Kommunikation": ["Diskutera samhällsfrågor","Beskriva dåtid och minnen","Skriva formella brev och mejl"], "Grammatik": ["Imparfait","Futur simple","Pronomen – COD och COI"] }, "Tyska": { "Kommunikation": ["Diskutera aktuella händelser","Argumentera för en ståndpunkt","Beskriva dåtida händelser"], "Grammatik": ["Genitiv","Konjunktioner och bisatser","Pluskvamperfekt"] }, "Fysik": { "Termodynamik": ["Värme och temperatur","Termodynamikens lagar"], "Modern fysik": ["Relativitetsteori – intro","Kvantmekanik – intro"] }, "Kemi": { "Elektrokemi": ["Galvaniska celler","Elektrolys"], "Biokemi": ["Proteiner och enzymer","Metabolism"] } },
  9: { "Svenska": { "Läsning": ["Litteratur och samhälle","Argumentationsanalys"], "Skrivning": ["Nationella prov – förberedelse","Vetenskapligt skrivande"] }, "Matematik": { "Algebra": ["Komplexa tal – intro","Polynomekvationer"], "Analys": ["Derivata – intro","Integraler – intro"] }, "Engelska": { "Fördjupning": ["Litterär analys på engelska","Akademisk engelska – uppsats"], "Kommunikation": ["Förhandling och argumentation","Engelska i yrkeslivet"] }, "Spanska": { "Kommunikation": ["Debatt och retorik på spanska","Litteratur och kultur i spansktalande länder","Yrkesliv och framtidsplaner"], "Grammatik": ["Subjunktiv i bisatser","Konditionalis","Passiv konstruktion"] }, "Franska": { "Kommunikation": ["Debatt och argumentation på franska","Litteratur och frankofon kultur","Formell och informell register"], "Grammatik": ["Konditionalis och hypotetiska satser","Subjonctif présent","Avancerad meningsbyggnad"] }, "Tyska": { "Kommunikation": ["Debatt och muntlig argumentation","Tyska litteratur- och kulturhistoria","Yrkeskommunikation på tyska"], "Grammatik": ["Konjunktiv II – hypotetiska satser","Passiv i olika tempus","Avancerad satsbyggnad"] }, "Fysik": { "Kärnfysik": ["Radioaktivitet","Fission och fusion"], "Astrofysik": ["Stjärnors liv","Kosmologi"] }, "Kemi": { "Industriell kemi": ["Haber-processen","Polymerer"], "Miljökemi": ["Klimatförändring – kemi","Föroreningar"] }, "Historia": { "Samtidshistoria": ["Kalla kriget","Globaliseringen"] }, "Samhällskunskap": { "Globala frågor": ["Klimatpolitik","Migration och flykt"] } }
};

const LEVEL_LABELS = { 2: ["Grundläggande","Avancerad"], 3: ["Grundläggande","Medel","Avancerad"], 4: ["Grundläggande","Medel","Avancerad","Högnivå"] };
const LEVEL_COLORS = ["#1b5e20","#2e7d32","#388e3c","#43a047"];
const LEVEL_ICONS = ["🌱","🌿","🌳","🏆"];

// Pre-built lesson templates
function buildLesson(grade, subject, area, chapter, numLevels, variant = 0) {
  const levels = LEVEL_LABELS[numLevels] || LEVEL_LABELS[3];
  return {
    meta: { grade, subject, area, chapter, numLevels },
    mal: `Alla elever ska förstå grunderna i "${chapter}" och kunna tillämpa kunskapen på sin nivå.`,
    forberedelse: [
      [
        `Skriv "${chapter}" på tavlan och fråga: "Vad tror ni detta handlar om?"`,
        `Aktivera förkunskaper – låt elever diskutera i par i 1 minut`,
        `Presentera lektionens mål tydligt för klassen`
      ],
      [
        `Starta med en kort film eller bild kopplad till "${chapter}"`,
        `Låt elever skriva ner vad de redan vet – dela i grupp`,
        `Formulera gemensamt en fråga ni ska besvara under lektionen`
      ],
      [
        `Börja med ett problemscenario: "Tänk er att..." kopplat till ${chapter}`,
        `Pararbete: diskutera vad ni tror svaret är innan genomgången`,
        `Samla hypoteser på tavlan – återkom till dem i slutet`
      ]
    ][variant % 3],
    niva: levels.map((namn, i) => ({
      namn,
      fokus: getFokus(grade, subject, chapter, i, numLevels, variant),
      moment: getMoment(grade, subject, chapter, i, numLevels, variant),
      fragor: getFragor(grade, subject, chapter, i, numLevels, variant)
    })),
    avslutning: [
      `Summera de viktigaste punkterna gemensamt`,
      `"Exit ticket": varje elev skriver en sak de lärt sig`,
      `Förhandsgranska nästa lektion kort`
    ],
    tips: [
      [
        `Börja alltid med konkreta exempel som hela klassen förstår`,
        `Använd pararbete – blanda gärna nivåer så elever lär av varandra`,
        `Ge fördjupningsfrågor muntligt till avancerade elever under genomgången`
      ],
      [
        `Använd "tänka högt"-tekniken – visa ditt eget resonemang steg för steg`,
        `Låt elever förklara för varandra (peer teaching) – det befäster kunskapen`,
        `Cirkulera i klassrummet och ge individuell återkoppling under övningstid`
      ],
      [
        `Använd miniseminarier: ge olika grupper olika delar att presentera`,
        `Bygg in reflektionsstopp var 10:e minut – "Vad förstår ni? Vad är oklart?"`,
        `Låt elever skapa egna exempel – det visar verklig förståelse`
      ]
    ][variant % 3]
  };
}

function getFokus(grade, subject, chapter, levelIdx, total, variant = 0) {
  const ratio = levelIdx / (total - 1);
  const v = variant % 3;
  if (ratio < 0.34) return [
    `Förstå grundbegreppet i "${chapter}" med stöd av konkreta exempel och bilder`,
    `Bygga en grundläggande förståelse för "${chapter}" genom praktiska övningar`,
    `Känna igen och benämna nyckelbegrepp i "${chapter}" med stöd av läraren`
  ][v];
  if (ratio < 0.67) return [
    `Tillämpa kunskaper om "${chapter}" i bekanta sammanhang`,
    `Förklara och använda "${chapter}" i olika typer av uppgifter`,
    `Koppla "${chapter}" till tidigare kunskaper och lösa varierade problem`
  ][v];
  return [
    `Analysera och generalisera "${chapter}" – koppla till andra ämnen och verkliga problem`,
    `Värdera och kritiskt granska "${chapter}" ur flera perspektiv`,
    `Skapa egna exempel och fördjupa förståelsen av "${chapter}" bortom kursboken`
  ][v];
}

function getMoment(grade, subject, chapter, levelIdx, total, variant = 0) {
  const ratio = levelIdx / (total - 1);
  const v = variant % 3;
  if (ratio < 0.34) return [
    [`Förklara begreppet med enkla ord och ett tydligt vardagsexempel`,`Visa steg-för-steg med visuellt stöd (tavla, bild eller konkret material)`,`Låt elever upprepa förklaringen med egna ord till en kompis`,`Kontrollera förståelse med en enkel tumme upp/ner-fråga`],
    [`Använd ett konkret föremål eller demonstration för att introducera begreppet`,`Rita eller rita upp begreppet tillsammans med klassen`,`Öva med enkla repetitionsuppgifter som alla kan lyckas med`,`Ge positiv bekräftelse och bygg självförtroende steg för steg`],
    [`Starta med ett problem eleverna känner igen från vardagen`,`Guided practice: lös uppgifter tillsammans, ett steg i taget`,`Använd färdiga mallar eller stödstrukturer för att minska kognitiv belastning`,`Avsluta med "visa mig att du förstår" – enkel mini-uppgift`]
  ][v];
  if (ratio < 0.67) return [
    [`Koppla begreppet till vad eleverna redan kan`,`Presentera 2–3 varierade exempel med stigande svårighetsgrad`,`Diskutera: "Varför fungerar det så här?" i helklass`,`Låt elever lösa ett exempel självständigt, sedan jämföra med en partner`],
    [`Visa samma begrepp på två olika sätt – låt klassen jämföra`,`Grupparbete: lösa ett problem och presentera lösningen`,`Låt elever hitta egna exempel från sin vardag`,`Gemensam rättning och diskussion av vanliga misstag`],
    [`Starta med en lättare variant, bygg gradvis till svårare`,`Pararbete med rollerna "expert" och "nybörjare" – byt efter halva tiden`,`Koppla till ett aktuellt ämne eller nyhet som klassen känner till`,`Låt elever göra en snabb presentation av sin lösning för klassen`]
  ][v];
  return [
    [`Presentera ett utmanande eller oväntat exempel – "Vad händer om...?"`,`Koppla till andra ämnen eller verkliga tillämpningar`,`Uppmuntra elever att formulera egna frågor kring ämnet`,`Diskutera möjliga felkällor, undantag eller gränsfall`],
    [`Ge ett öppet problem med flera möjliga lösningar`,`Låt elever designa sin egen uppgift baserad på kapitlets innehåll`,`Diskutera: "Hur hade en expert löst detta?" – tänk som en forskare`,`Koppla till ett globalt eller samhälleligt problem`],
    [`Utmana med ett dilemma eller paradox kopplad till ämnet`,`Debatt: presentera två motstridiga ståndpunkter – vem har rätt?`,`Skapa en mini-undervisning: eleven lär läraren`,`Reflektera: "Vad visste du inte förut? Vad vill du lära dig mer om?"`]
  ][v];
}

function getFragor(grade, subject, chapter, levelIdx, total, variant = 0) {
  const ratio = levelIdx / (total - 1);
  const v = variant % 3;
  if (ratio < 0.34) return [
    [`Kan du förklara vad ${chapter.split(" ")[0]} betyder med egna ord?`,`Var ser du detta i vardagen?`,`Vad är det viktigaste du förstår nu?`],
    [`Kan du peka på ett exempel på det vi pratar om?`,`Vad är det svåraste med ${chapter.split(" ")[0]}?`,`Vad skulle du vilja veta mer om?`],
    [`Hur skulle du förklara detta för en yngre elev?`,`Vad påminner detta om som ni gjort tidigare?`,`Finns det något som känns oklart?`]
  ][v];
  if (ratio < 0.67) return [
    [`Hur skulle du förklara detta för någon som aldrig hört om det?`,`Vilket exempel tycker du är tydligast och varför?`,`Vad är skillnaden mellan de olika fallen vi sett?`],
    [`Om du fick välja ett eget exempel, vilket hade det varit?`,`Vad tror du är den vanligaste missuppfattningen om detta?`,`Hur vet du att ditt svar är rätt?`],
    [`Kan du hitta ett mönster i de exempel vi gått igenom?`,`Vad hade hänt om du gjort tvärtom?`,`Hur kan du använda detta utanför skolan?`]
  ][v];
  return [
    [`Kan du hitta ett eget exempel som är ännu svårare?`,`Vad tror du händer om vi ändrar på en av förutsättningarna?`,`Hur hänger detta ihop med det vi lärde oss förra veckan?`],
    [`Var finns gränserna för det vi lärt oss – när fungerar det inte?`,`Kan du koppla detta till ett samhällsproblem eller en verklig utmaning?`,`Om du skulle forska vidare – vad hade din fråga varit?`],
    [`Vad är det mest förvånande du lärt dig idag?`,`Hur skulle du designa en uppgift som testar detta?`,`Vad skulle en expert säga om din förklaring?`]
  ][v];
}

export default function LektionsGuiden() {
  const [step, setStep] = useState(1);
  const [grade, setGrade] = useState(null);
  const [subject, setSubject] = useState(null);
  const [area, setArea] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [numLevels, setNumLevels] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [variant, setVariant] = useState(0);

  const grades = Object.keys(DATA).map(Number);
  const subjects = grade ? Object.keys(DATA[grade] || {}) : [];
  const areas = grade && subject ? Object.keys(DATA[grade]?.[subject] || {}) : [];
  const chapters = grade && subject && area ? DATA[grade]?.[subject]?.[area] || [] : [];

  function generate() {
    setLesson(buildLesson(grade, subject, area, chapter, numLevels, 0));
    setVariant(0);
    setStep(5);
  }

  function reset() {
    setStep(1); setGrade(null); setSubject(null);
    setArea(null); setChapter(null); setNumLevels(null); setLesson(null);
  }

  const stepLabels = ["Klass","Ämne","Nivåer"];

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#e8f5e9 0%,#f1f8e9 40%,#e0f2f1 100%)",fontFamily:"'Georgia',serif",padding:"1.5rem 1rem"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap');
        .cbtn{transition:all .18s;border:2px solid #a5d6a7;background:white;border-radius:12px;padding:.75rem 1rem;cursor:pointer;font-family:Georgia,serif;font-size:.92rem;color:#1a3a2a;text-align:left;width:100%}
        .cbtn:hover{border-color:#2e7d32;background:#f1f8e9;transform:translateY(-1px);box-shadow:0 3px 12px rgba(46,125,50,.12)}
        .cbtn.on{border-color:#2e7d32;background:#e8f5e9;font-weight:700}
        .lvlbtn{transition:all .18s;border:2px solid #a5d6a7;background:white;border-radius:50px;padding:.65rem 1.4rem;cursor:pointer;font-family:Georgia,serif;font-size:.95rem;color:#1a3a2a}
        .lvlbtn:hover{border-color:#2e7d32;background:#f1f8e9}
        .lvlbtn.on{border-color:#2e7d32;background:#2e7d32;color:white;font-weight:700}
        .gbtn{background:linear-gradient(135deg,#2e7d32,#1b5e20);color:white;border:none;border-radius:50px;padding:.85rem 2.2rem;font-size:1rem;font-family:Georgia,serif;font-weight:700;cursor:pointer;transition:all .2s;box-shadow:0 4px 16px rgba(46,125,50,.3)}
        .gbtn:hover{transform:translateY(-2px);box-shadow:0 6px 22px rgba(46,125,50,.4)}
        .gbtn.sec{background:linear-gradient(135deg,#78909c,#546e7a)}
        @keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .fi{animation:fi .35s ease}
        ul{padding-left:1.3rem;margin:.3rem 0}
        li{margin-bottom:.35rem;line-height:1.6;color:#1a2e1a}
      `}</style>

      {/* Header */}
      <div style={{textAlign:"center",marginBottom:"2rem"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:".5rem",marginBottom:".3rem"}}>
          <span style={{fontSize:"1.8rem"}}>🌿</span>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"2rem",color:"#1b5e20",margin:0}}>LektionsGuiden</h1>
        </div>
        <p style={{color:"#4a7c59",fontSize:".9rem",margin:0}}>Differentierade genomgångar · Lgr22</p>
      </div>

      {/* Progress */}
      {step < 5 && (
        <div style={{display:"flex",justifyContent:"center",gap:".5rem",marginBottom:"1.5rem"}}>
          {stepLabels.map((label,i) => (
            <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"3px"}}>
              <div style={{width:30,height:30,borderRadius:"50%",background:i+1<=step?"#2e7d32":"#c8e6c9",color:i+1<=step?"white":"#4a7c59",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".8rem",fontWeight:700,transition:"all .3s"}}>
                {i+1 < step ? "✓" : i+1}
              </div>
              <span style={{fontSize:".68rem",color:i+1<=step?"#2e7d32":"#a5d6a7"}}>{label}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{maxWidth:640,margin:"0 auto"}}>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="fi" style={{background:"white",borderRadius:20,padding:"1.8rem",boxShadow:"0 4px 20px rgba(46,125,50,.08)"}}>
            <h2 style={{fontFamily:"'Playfair Display',serif",color:"#1a3a2a",marginTop:0,fontSize:"1.3rem"}}>Välj klass</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:".6rem"}}>
              {grades.map(g => (
                <button key={g} className={`cbtn${grade===g?" on":""}`} onClick={() => { setGrade(g); setSubject(null); setArea(null); setChapter(null); }}>
                  Klass {g}
                </button>
              ))}
            </div>
            {grade && (
              <>
                <h2 style={{fontFamily:"'Playfair Display',serif",color:"#1a3a2a",fontSize:"1.2rem",marginTop:"1.5rem"}}>Välj ämne</h2>
                <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:".6rem"}}>
                  {subjects.map(s => (
                    <button key={s} className={`cbtn${subject===s?" on":""}`} onClick={() => { setSubject(s); setArea(null); setChapter(null); }}>
                      {s}
                    </button>
                  ))}
                </div>
              </>
            )}
            {subject && (
              <>
                <h2 style={{fontFamily:"'Playfair Display',serif",color:"#1a3a2a",fontSize:"1.2rem",marginTop:"1.5rem"}}>Välj område</h2>
                <div style={{display:"grid",gridTemplateColumns:"1fr",gap:".5rem"}}>
                  {areas.map(a => (
                    <button key={a} className={`cbtn${area===a?" on":""}`} onClick={() => { setArea(a); setChapter(null); }}>
                      {a}
                    </button>
                  ))}
                </div>
              </>
            )}
            {area && (
              <>
                <h2 style={{fontFamily:"'Playfair Display',serif",color:"#1a3a2a",fontSize:"1.2rem",marginTop:"1.5rem"}}>Välj kapitel / lektion</h2>
                <div style={{display:"grid",gridTemplateColumns:"1fr",gap:".5rem"}}>
                  {chapters.map(c => (
                    <button key={c} className={`cbtn${chapter===c?" on":""}`} onClick={() => setChapter(c)}>
                      📖 {c}
                    </button>
                  ))}
                </div>
              </>
            )}
            {chapter && (
              <div style={{textAlign:"right",marginTop:"1.5rem"}}>
                <button className="gbtn" onClick={() => setStep(2)}>Nästa →</button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="fi" style={{background:"white",borderRadius:20,padding:"1.8rem",boxShadow:"0 4px 20px rgba(46,125,50,.08)"}}>
            <h2 style={{fontFamily:"'Playfair Display',serif",color:"#1a3a2a",marginTop:0,fontSize:"1.3rem"}}>Hur många kunskapsnivåer finns i klassen?</h2>
            <p style={{color:"#4a7c59",fontSize:".88rem",marginBottom:"1.5rem"}}>Basera detta på din kartläggning av klassen</p>
            <div style={{display:"flex",flexDirection:"column",gap:".8rem",marginBottom:"1.5rem"}}>
              {[2,3,4].map(n => (
                <button key={n} className={`lvlbtn${numLevels===n?" on":""}`} onClick={() => setNumLevels(n)}>
                  <strong>{n} nivåer</strong>
                  <span style={{fontSize:".8rem",marginLeft:".5rem",opacity:.8}}>{LEVEL_LABELS[n].join(" · ")}</span>
                </button>
              ))}
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <button className="gbtn sec" onClick={() => setStep(1)}>← Tillbaka</button>
              {numLevels && <button className="gbtn" onClick={generate}>✨ Skapa genomgång</button>}
            </div>
          </div>
        )}

        {/* STEP 5: Result */}
        {step === 5 && lesson && (
          <div className="fi">
            {/* Summary bar */}
            <div style={{background:"#2e7d32",borderRadius:14,padding:"1rem 1.4rem",marginBottom:"1rem",display:"flex",flexWrap:"wrap",gap:".4rem",alignItems:"center"}}>
              <span style={{color:"white",fontSize:".82rem",opacity:.85}}>Klass {lesson.meta.grade}</span>
              <span style={{color:"#a5d6a7"}}>·</span>
              <span style={{color:"white",fontSize:".82rem",opacity:.85}}>{lesson.meta.subject}</span>
              <span style={{color:"#a5d6a7"}}>·</span>
              <span style={{color:"white",fontSize:".9rem",fontWeight:700}}>{lesson.meta.chapter}</span>
              <span style={{color:"#a5d6a7"}}>·</span>
              <span style={{color:"#c8e6c9",fontSize:".82rem"}}>{lesson.meta.numLevels} nivåer</span>
            </div>

            {/* Mal */}
            <div style={{background:"white",borderRadius:16,padding:"1.4rem",boxShadow:"0 3px 16px rgba(46,125,50,.07)",marginBottom:"1rem"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:"#1a3a2a",marginTop:0,fontSize:"1.05rem",borderBottom:"2px solid #c8e6c9",paddingBottom:"6px"}}>🎯 Lektionsmål</h3>
              <p style={{margin:0,lineHeight:1.7,color:"#1a2e1a"}}>{lesson.mal}</p>
            </div>

            {/* Forberedelse */}
            <div style={{background:"white",borderRadius:16,padding:"1.4rem",boxShadow:"0 3px 16px rgba(46,125,50,.07)",marginBottom:"1rem"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:"#1a3a2a",marginTop:0,fontSize:"1.05rem",borderBottom:"2px solid #c8e6c9",paddingBottom:"6px"}}>📋 Förberedelse (5 min)</h3>
              <ul>{lesson.forberedelse.map((p,i) => <li key={i}>{p}</li>)}</ul>
            </div>

            {/* Nivåer */}
            {lesson.niva.map((niva, i) => (
              <div key={i} style={{background:"white",borderRadius:16,padding:"1.4rem",boxShadow:"0 3px 16px rgba(46,125,50,.07)",marginBottom:"1rem",borderLeft:`5px solid ${LEVEL_COLORS[i]}`}}>
                <h3 style={{fontFamily:"'Playfair Display',serif",color:LEVEL_COLORS[i],marginTop:0,fontSize:"1.05rem"}}>
                  {LEVEL_ICONS[i]} Nivå {i+1}: {niva.namn}
                </h3>
                <p style={{fontWeight:700,color:"#2e7d32",margin:"0 0 .5rem",fontSize:".9rem"}}>Fokus:</p>
                <p style={{margin:"0 0 .8rem",lineHeight:1.6,color:"#1a2e1a",fontSize:".9rem"}}>{niva.fokus}</p>
                <p style={{fontWeight:700,color:"#2e7d32",margin:"0 0 .3rem",fontSize:".9rem"}}>Nyckelmoment:</p>
                <ul>{niva.moment.map((m,j) => <li key={j} style={{fontSize:".9rem"}}>{m}</li>)}</ul>
                <p style={{fontWeight:700,color:"#2e7d32",margin:".8rem 0 .3rem",fontSize:".9rem"}}>Frågor att ställa:</p>
                <ul>{niva.fragor.map((f,j) => <li key={j} style={{fontSize:".9rem",fontStyle:"italic"}}>"{f}"</li>)}</ul>
              </div>
            ))}

            {/* Avslutning */}
            <div style={{background:"white",borderRadius:16,padding:"1.4rem",boxShadow:"0 3px 16px rgba(46,125,50,.07)",marginBottom:"1rem"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:"#1a3a2a",marginTop:0,fontSize:"1.05rem",borderBottom:"2px solid #c8e6c9",paddingBottom:"6px"}}>🔄 Gemensam avslutning (5 min)</h3>
              <ul>{lesson.avslutning.map((p,i) => <li key={i}>{p}</li>)}</ul>
            </div>

            {/* Tips */}
            <div style={{background:"#e8f5e9",borderRadius:16,padding:"1.4rem",marginBottom:"1.5rem",border:"1px solid #c8e6c9"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:"#1a3a2a",marginTop:0,fontSize:"1.05rem"}}>💡 Tips till läraren</h3>
              <ul>{lesson.tips.map((t,i) => <li key={i}>{t}</li>)}</ul>
            </div>

            <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap",paddingBottom:"2rem"}}>
              <button className="gbtn sec" onClick={reset}>🔄 Ny genomgång</button>
              <button className="gbtn" onClick={() => { const v = variant + 1; setVariant(v); setLesson(buildLesson(grade, subject, area, chapter, numLevels, v)); }}>✨ Variera genomgång</button>
            </div>
          </div>
        )}
      </div>

      <p style={{textAlign:"center",color:"#a5d6a7",fontSize:".75rem",marginTop:"2rem"}}>LektionsGuiden · Lgr22 · Differentierad undervisning</p>
    </div>
  );
}
