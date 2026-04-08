import { useState, useRef, useEffect } from "react";

const LGR22 = {
  "Svenska":"Eleven ska läsa, analysera och kommunicera i tal och skrift med anpassning till syfte och mottagare.",
  "Matematik":"Eleven ska formulera och lösa problem, använda matematiska metoder och föra matematiska resonemang.",
  "Engelska":"Eleven ska kommunicera på engelska i tal och skrift och förstå olika typer av texter.",
  "Spanska":"Eleven ska kommunicera på spanska och reflektera över kulturer i spansktalande länder.",
  "Franska":"Eleven ska kommunicera på franska och reflektera över kulturer i fransktalande länder.",
  "Tyska":"Eleven ska kommunicera på tyska och reflektera över kulturer i tysktalande länder.",
  "Biologi":"Eleven ska använda biologikunskaper för att ta ställning i frågor om hälsa och ekologisk hållbarhet.",
  "Fysik":"Eleven ska använda fysikkunskaper för att granska information om energi, teknik och miljö.",
  "Kemi":"Eleven ska använda kemikunskaper för att ta ställning i frågor om kemikaliers påverkan på hälsa och miljö.",
  "Geografi":"Eleven ska analysera hur naturens processer och människors verksamheter formar livsmiljöer.",
  "Historia":"Eleven ska använda historiska begrepp för att förstå hur det förflutna påverkar nutiden.",
  "Religionskunskap":"Eleven ska analysera religioner, livsåskådningar och etiska frågor utifrån olika perspektiv.",
  "Samhällskunskap":"Eleven ska analysera samhällsstrukturer och reflektera kring demokrati och hållbar utveckling.",
  "Bild":"Eleven ska kommunicera med bilder, skapa med olika tekniker och analysera bilduttryck.",
  "Musik":"Eleven ska spela, sjunga, skapa musik och förstå musikens sammanhang i samhälle och kultur.",
  "Idrott och hälsa":"Eleven ska röra sig allsidigt och reflektera kring hälsa, livsstil och välmående.",
  "Slöjd":"Eleven ska formge och framställa föremål och utveckla förmåga att planera och utvärdera.",
  "Teknik":"Eleven ska identifiera tekniska lösningar och konstruera med hänsyn till hållbarhet.",
  "Hemkunskap":"Eleven ska planera och tillaga mat, hantera resurser och reflektera kring hälsa och hållbar livsstil."
};

const STEG_FARG = ["#1b5e20","#2e7d32","#388e3c","#43a047"];
const STEG_IKONER = ["🌱","🌿","🌳","🏆"];

// ── TOLKARE ──────────────────────────────────────────────────────────────────
function detectMode(text) {
  const t = text.toLowerCase();
  if (t.match(/\bprov\b|\btest\b|\bquiz\b|\bexamen\b/)) return "prov";
  if (t.match(/övning|övningsuppgift|träna|träningsuppgift/)) return "ovning";
  return "genomgang";
}

function parseBase(text) {
  const t = text.toLowerCase();
  let grade = 6;
  const gm = t.match(/åk\s*(\d)|klass\s*(\d)|(\d)\s*:?an/);
  if (gm) grade = parseInt(gm[1]||gm[2]||gm[3]);
  let numLevels = 3;
  const lm = t.match(/(\d)\s*nivå/);
  if (lm) numLevels = Math.min(4,Math.max(2,parseInt(lm[1])));
  if (t.includes("blandad")||t.includes("mix")) numLevels = 3;
  let subject = "Matematik";
  if (t.includes("matte")||t.includes("matematik")) subject="Matematik";
  else if (t.includes("svenska")) subject="Svenska";
  else if (t.includes("engelska")) subject="Engelska";
  else if (t.includes("spanska")) subject="Spanska";
  else if (t.includes("franska")) subject="Franska";
  else if (t.includes("tyska")) subject="Tyska";
  else if (t.includes("bio")) subject="Biologi";
  else if (t.includes("fysik")) subject="Fysik";
  else if (t.includes("kemi")) subject="Kemi";
  else if (t.includes("geo")) subject="Geografi";
  else if (t.includes("historia")) subject="Historia";
  else if (t.includes("religion")||t.includes(" re ")) subject="Religionskunskap";
  else if (t.includes("samhäll")) subject="Samhällskunskap";
  else if (t.includes("idrott")) subject="Idrott och hälsa";
  else if (t.includes("musik")) subject="Musik";
  else if (t.includes("bild")) subject="Bild";
  else if (t.includes("slöjd")) subject="Slöjd";
  else if (t.includes("teknik")) subject="Teknik";
  else if (t.includes("hemkunskap")) subject="Hemkunskap";

  const kws = ["procent","bråk","decimaltal","algebra","ekvation","geometri","statistik","sannolikhet","multiplikation","division","addition","subtraktion","tallinjen","koordinatsystem","volym","area","omkrets","pythagoras","trigonometri","derivata","integraler","preteritum","imperfecto","passé composé","perfekt","subjunktiv","konjunktiv","källkritik","argumenterande text","läsförståelse","grammatik","substantiv","verb","adjektiv","fotosyntesen","cellen","ekosystem","immunförsvaret","genetik","evolution","newtons lagar","elektricitet","termodynamik","radioaktivitet","vikingatiden","medeltiden","kalla kriget","industrialismen","franska revolutionen","demokrati","mänskliga rättigheter","klimatpolitik","periodiska systemet","syror och baser","molbegreppet"];
  let chapter = "";
  for (const kw of kws) { if (t.includes(kw)) { chapter = kw.charAt(0).toUpperCase()+kw.slice(1); break; } }
  if (!chapter) {
    let c = text.replace(/prov|test|quiz|genomgång|repetition|övning|lektion/gi,"").replace(/åk\s*\d|klass\s*\d|\d\s*nivåer?|blandad klass/gi,"").replace(new RegExp(Object.keys(LGR22).join("|"),"gi"),"").replace(/matte|bio/gi,"").replace(/[,\-–om\s]+/g," ").trim();
    chapter = c.length>2 ? c.charAt(0).toUpperCase()+c.slice(1) : `${subject} – centralt moment`;
  }
  return { grade, subject, chapter, numLevels, lgr22: LGR22[subject]||`Eleven ska utveckla kunskaper inom ${subject} enligt Lgr22.` };
}

// ── BYGG GENOMGÅNG ───────────────────────────────────────────────────────────
const FORB = [["Skriv momentet på tavlan – fråga: 'Vad vet ni om detta?'","Aktivera förkunskaper – pararbete 1 minut","Presentera lektionsmålet tydligt"],["Starta med en bild eller konkret exempel","Elever skriver ned förkunskaper – dela i grupp","Formulera gemensamt en fråga ni ska besvara"],["Börja med ett problemscenario","Pararbete: vad tror ni är svaret?","Samla hypoteser på tavlan"]];
const AVSL = [["Summera viktigaste punkterna tillsammans","Exit ticket: en sak de lärt sig + en fråga","Förhandsgranska nästa lektion"],["Reflektion: 'Vad var svårast? Vad var intressant?'","2–3 elever delar sin exit ticket","Koppla tillbaka till hypoteserna"],["Pararbete: berätta vad ni tar med er","Läraren sammanfattar det viktigaste","Kort förblick: 'Nästa lektion…'"]];
const TIPS_G = [["Börja med konkreta exempel – abstraktionen kommer senare","Använd pararbete för att hålla alla aktiva","Cirkulera och ge individuell återkoppling"],["Visa ditt resonemang högt – sänker tröskeln","Låt elever förklara för varandra","Reflektionsstopp var 10:e minut"],["Planera pauspunkter – stanna eller gå vidare","Avancerade elever som resurspersoner","Samla frågor löpande – formativ info"]];
const SR = {2:["Gemensam grund","Fördjupning"],3:["Introduktion","Fördjupning","Analys"],4:["Introduktion","Koppling","Tillämpning","Fördjupning"]};
const ST = {2:["15 min","20 min"],3:["10 min","15 min","10 min"],4:["10 min","10 min","10 min","5 min"]};
const SB = {2:["Hela klassen börjar tillsammans.","Komplexiteten ökar gradvis."],3:["Konkret start för hela klassen.","Variera och tillämpa.","Öppna frågor för de redo."],4:["Konkret start.","Koppla till tidigare kunskaper.","Mer komplexa sammanhang.","Öppna problem för de redo."]};

function getMoment(subj,ch,idx,nl) {
  const r=idx/(nl-1);
  if(r<0.34) return [`Förklara "${ch}" med enkla ord och ett vardagsexempel`,`Visa steg-för-steg med visuellt stöd i ${subj}`,`Kontrollera förståelse: 'Räck upp handen om du förstår'`];
  if(r<0.67) return [`Koppla "${ch}" till vad eleverna redan kan`,`Presentera 2–3 varierade exempel med stigande svårighet`,`Självständig uppgift – jämför sedan med en partner`];
  return [`Utmana med ett öppet problem kopplat till "${ch}"`,`Diskutera gränsfall: 'När fungerar detta inte?'`,`Eleverna formulerar egna frågor och hypoteser`];
}

function buildGenomgang(base) {
  const v=Math.floor(Math.random()*3);
  const {grade,subject,chapter,numLevels,lgr22}=base;
  const totalTid=ST[numLevels].reduce((s,t)=>s+parseInt(t),0)+10;
  const steg=SR[numLevels].map((r,i)=>({
    rubrik:`Del ${i+1} – ${r}`,ikon:STEG_IKONER[i],farg:STEG_FARG[i],tid:ST[numLevels][i],
    beskrivning:SB[numLevels][i],moment:getMoment(subject,chapter,i,numLevels),
    fraga:i/(numLevels-1)<0.34?`"Kan du förklara ${chapter.split(" ")[0]} med egna ord?"`:i/(numLevels-1)<0.67?`"Hur förklarar du '${chapter.split(" ")[0]}' för någon som aldrig hört om det?"` :`"Var finns gränserna – när fungerar '${chapter.split(" ")[0]}' inte?"`,
    signal:i/(numLevels-1)<0.34?"Gå vidare när majoriteten visar grundförståelse.":i/(numLevels-1)<0.67?"Elever som behöver stanna övar grunduppgifter.":"Alla välkomnas att bidra på sin nivå."
  }));
  return {type:"genomgang",meta:{grade,subject,chapter,numLevels},lgr22,totalTid,forberedelse:FORB[v],steg,avslutning:AVSL[v],tips:TIPS_G[v]};
}

// ── BYGG PROV ─────────────────────────────────────────────────────────────────
function getFragor(subj, ch, niva) {
  const fragorDB = {
    "Procent": {
      1:[{q:"Vad betyder procent?",t:"Definitionsfråga"},{q:"Hur skriver man 50% som decimaltal?",t:"Omvandling"},{q:"Hur mycket är 10% av 200?",t:"Beräkning"}],
      2:[{q:"Beräkna 35% av 480 kr.",t:"Beräkning"},{q:"En vara kostar 400 kr. Priset höjs med 20%. Vad kostar varan nu?",t:"Förändring"},{q:"Vad är 15% av 260?",t:"Beräkning"}],
      3:[{q:"En vara är rabatterad med 25%. Den nya priset är 450 kr. Vad var ursprungspriset?",t:"Bakvändt problem"},{q:"Befolkningen ökade från 8 000 till 9 200 personer. Med hur många procent ökade den?",t:"Förändring"},{q:"Förklara skillnaden mellan procentenheter och procent med ett eget exempel.",t:"Analys"}]
    },
    "Preteritum": {
      1:[{q:"Skriv 'hablar' i preteritum för 'yo'.",t:"Böjning"},{q:"Skriv 'comer' i preteritum för 'él'.",t:"Böjning"},{q:"Vad används preteritum till?",t:"Teori"}],
      2:[{q:"Skriv en mening om vad du gjorde igår med preteritum.",t:"Produktion"},{q:"Böj 'ser' och 'ir' i preteritum för alla personer.",t:"Böjning"},{q:"Rätta felet: 'Ayer yo comí una pizza y después fuí al cine'",t:"Korrigering"}],
      3:[{q:"Skriv fem meningar om en dag du minns väl. Använd minst tre oregelbundna verb i preteritum.",t:"Fri produktion"},{q:"Förklara med egna ord skillnaden mellan preteritum och imperfecto.",t:"Analys"},{q:"Översätt: 'Vi kom till skolan tidigt och läraren berättade en rolig historia.'",t:"Översättning"}]
    }
  };
  const key = Object.keys(fragorDB).find(k => ch.toLowerCase().includes(k.toLowerCase()));
  if (key && fragorDB[key][niva]) return fragorDB[key][niva];
  // Generiska frågor
  if (niva===1) return [{q:`Förklara begreppet "${ch}" med egna ord.`,t:"Definitionsfråga"},{q:`Ge ett enkelt exempel på "${ch}".`,t:"Exempel"},{q:`Vad är det viktigaste du vet om "${ch}"?`,t:"Sammanfattning"}];
  if (niva===2) return [{q:`Tillämpa kunskapen om "${ch}" på ett konkret problem.`,t:"Tillämpning"},{q:`Förklara sambandet mellan "${ch}" och ett annat begrepp du känner till.`,t:"Koppling"},{q:`Lös uppgiften och förklara ditt resonemang kring "${ch}".`,t:"Resonemang"}];
  return [{q:`Analysera och diskutera "${ch}" utifrån flera perspektiv.`,t:"Analys"},{q:`Skapa ett eget exempel på "${ch}" och förklara varför det fungerar.`,t:"Skapande"},{q:`Vilka gränsfall eller undantag finns för "${ch}"? Förklara.`,t:"Fördjupning"}];
}

function buildProv(base) {
  const {grade,subject,chapter,numLevels,lgr22}=base;
  const nivanamn={2:["Grundnivå","Avancerad"],3:["Grundnivå","Medelnivå","Avancerad"],4:["Grundnivå","Medelnivå","Avancerad","Högnivå"]};
  const nivor=Array.from({length:numLevels},(_,i)=>({
    namn:nivanamn[numLevels][i],
    farg:STEG_FARG[i],
    ikon:STEG_IKONER[i],
    fragor:getFragor(subject,chapter,Math.min(i+1,3))
  }));
  return {type:"prov",meta:{grade,subject,chapter,numLevels},lgr22,nivor};
}

// ── BYGG ÖVNING ──────────────────────────────────────────────────────────────
function buildOvning(base) {
  const {grade,subject,chapter,numLevels,lgr22}=base;
  const nivanamn={2:["Grundövningar","Fördjupningsövningar"],3:["Grundövningar","Mellanövningar","Utmaningsövningar"],4:["Grundövningar","Mellanövningar","Fördjupningsövningar","Utmaningsövningar"]};
  const nivor=Array.from({length:numLevels},(_,i)=>({
    namn:nivanamn[numLevels][i],
    farg:STEG_FARG[i],
    ikon:STEG_IKONER[i],
    fragor:getFragor(subject,chapter,Math.min(i+1,3)).map(f=>({...f,t:"Övning"}))
  }));
  return {type:"ovning",meta:{grade,subject,chapter,numLevels},lgr22,nivor};
}

// ── EXEMPEL ──────────────────────────────────────────────────────────────────
const EXEMPEL=[
  "Genomgång i matte åk 6 om procent, 3 nivåer",
  "Prov på matte åk 6 om procent, 3 nivåer",
  "Franska åk 8, preteritum, 2 nivåer",
  "Prov franska åk 8, preteritum",
  "Övningsuppgifter biologi åk 7, immunförsvaret",
  "Repetition historia åk 5, vikingatiden"
];

// ── EXPORTTEXT ────────────────────────────────────────────────────────────────
function exportText(result) {
  if (!result) return "";
  const {meta}=result;
  let t=`LEKTIONSGUIDEN – Lgr22\n${"=".repeat(38)}\n`;
  t+=`Klass: ${meta.grade} | Ämne: ${meta.subject} | ${meta.chapter}\n\n`;
  t+=`📌 LGRKOPPLING\n${result.lgr22}\n\n`;
  if (result.type==="genomgang") {
    t+=`📋 FÖRBEREDELSE\n${result.forberedelse.map((p,i)=>`${i+1}. ${p}`).join("\n")}\n\n`;
    t+=`📈 GENOMGÅNG\n`;
    result.steg.forEach(s=>{t+=`\n${s.rubrik} (${s.tid})\n${"-".repeat(24)}\n`;s.moment.forEach((m,i)=>t+=`${i+1}. ${m}\n`);t+=`❓ ${s.fraga}\n⏭ ${s.signal}\n`;});
    t+=`\n🔄 AVSLUTNING\n${result.avslutning.map((p,i)=>`${i+1}. ${p}`).join("\n")}\n\n`;
    t+=`💡 TIPS\n${result.tips.map((p,i)=>`${i+1}. ${p}`).join("\n")}\n`;
  } else {
    const label=result.type==="prov"?"PROV":"ÖVNINGSUPPGIFTER";
    t+=`📝 ${label}\n\nNamn: ________________  Datum: ________  Klass: ____\n\n`;
    result.nivor.forEach((n,ni)=>{
      t+=`\n── ${n.namn} ──\n`;
      n.fragor.forEach((f,i)=>{t+=`\n${ni*n.fragor.length+i+1}. [${f.t}]\n${f.q}\n\nSvar: ________________________________________\n`;});
    });
  }
  return t;
}

// ── LEKTIONSKORT ──────────────────────────────────────────────────────────────
function GenomgangCard({l,copied,onCopy,onPrint}) {
  const [as,setAs]=useState(null);
  return (
    <div>
      <div style={{background:"linear-gradient(135deg,#1b5e20,#2e7d32)",borderRadius:16,padding:"1.3rem",color:"white",marginBottom:".7rem",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-20,right:-20,width:80,height:80,borderRadius:"50%",background:"rgba(255,255,255,0.07)"}}/>
        <div style={{display:"flex",flexWrap:"wrap",gap:".3rem",marginBottom:".5rem"}}>
          <span style={{background:"rgba(255,255,255,0.18)",borderRadius:50,padding:".18rem .65rem",fontSize:".73rem"}}>Klass {l.meta.grade}</span>
          <span style={{background:"rgba(255,255,255,0.18)",borderRadius:50,padding:".18rem .65rem",fontSize:".73rem"}}>{l.meta.subject}</span>
          <span style={{background:"rgba(255,255,255,0.22)",borderRadius:50,padding:".18rem .65rem",fontSize:".73rem",fontWeight:700}}>⏱ {l.totalTid} min</span>
        </div>
        <h2 style={{margin:"0 0 .35rem",fontSize:"1.2rem",fontFamily:"Georgia,serif"}}>{l.meta.chapter}</h2>
        <p style={{margin:0,fontSize:".78rem",opacity:.85,lineHeight:1.5}}>{l.lgr22}</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:".45rem",marginBottom:".7rem"}}>
        {[["Nivåer",l.meta.numLevels],["Steg",l.steg.length],["Min",l.totalTid]].map(([lb,v])=>(
          <div key={lb} style={{background:"white",borderRadius:10,padding:".6rem",textAlign:"center",boxShadow:"0 2px 8px rgba(46,125,50,.07)"}}>
            <div style={{fontSize:"1.3rem",fontWeight:700,color:"#2e7d32"}}>{v}</div>
            <div style={{fontSize:".68rem",color:"#4a7c59"}}>{lb}</div>
          </div>
        ))}
      </div>
      <div style={{background:"white",borderRadius:12,padding:"1rem",marginBottom:".6rem",boxShadow:"0 2px 8px rgba(46,125,50,.07)"}}>
        <h4 style={{margin:"0 0 .45rem",color:"#1a3a2a",fontSize:".86rem"}}>📋 Förberedelse <span style={{fontWeight:400,color:"#4a7c59",fontSize:".73rem"}}>(5 min)</span></h4>
        <ul style={{margin:0,paddingLeft:"1.1rem"}}>{l.forberedelse.map((p,i)=><li key={i} style={{fontSize:".8rem",marginBottom:".2rem"}}>{p}</li>)}</ul>
      </div>
      <div style={{background:"white",borderRadius:12,padding:"1rem",marginBottom:".6rem",boxShadow:"0 2px 8px rgba(46,125,50,.07)"}}>
        <h4 style={{margin:"0 0 .6rem",color:"#1a3a2a",fontSize:".86rem"}}>📈 Genomgång</h4>
        <div style={{display:"flex",gap:".35rem",flexWrap:"wrap",marginBottom:".6rem"}}>
          {l.steg.map((s,i)=><button key={i} onClick={()=>setAs(as===i?null:i)} style={{border:"none",borderRadius:50,padding:".32rem .8rem",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:".74rem",fontWeight:700,background:as===i?s.farg:"#f1f8e9",color:as===i?"white":s.farg}}>{s.ikon} {s.rubrik.split("–")[1]?.trim()}</button>)}
        </div>
        {l.steg.map((s,i)=>(
          <div key={i} style={{display:as===i||as===null?"block":"none",borderLeft:`4px solid ${s.farg}`,paddingLeft:".8rem",marginBottom:as===null?"1rem":0}}>
            <div style={{display:"flex",alignItems:"center",gap:".35rem",marginBottom:".25rem"}}>
              <strong style={{color:s.farg,fontSize:".83rem"}}>{s.rubrik}</strong>
              <span style={{marginLeft:"auto",background:"#f1f8e9",borderRadius:50,padding:".08rem .45rem",fontSize:".68rem",color:"#2e7d32",fontWeight:700}}>{s.tid}</span>
            </div>
            <p style={{margin:"0 0 .35rem",color:"#1a2e1a",fontSize:".78rem",fontStyle:"italic"}}>{s.beskrivning}</p>
            <ul style={{margin:"0 0 .45rem",paddingLeft:"1.1rem"}}>{s.moment.map((m,j)=><li key={j} style={{fontSize:".78rem",marginBottom:".18rem"}}>{m}</li>)}</ul>
            <div style={{background:"#f1f8e9",borderRadius:7,padding:".35rem .65rem",marginBottom:".28rem"}}><span style={{fontSize:".68rem",color:"#2e7d32",fontWeight:700}}>❓ </span><span style={{fontSize:".76rem",fontStyle:"italic"}}>{s.fraga}</span></div>
            <div style={{background:"#fff8e1",borderRadius:7,padding:".35rem .65rem"}}><span style={{fontSize:".68rem",color:"#f57f17",fontWeight:700}}>⏭ </span><span style={{fontSize:".76rem"}}>{s.signal}</span></div>
          </div>
        ))}
      </div>
      <div style={{background:"white",borderRadius:12,padding:"1rem",marginBottom:".6rem",boxShadow:"0 2px 8px rgba(46,125,50,.07)"}}>
        <h4 style={{margin:"0 0 .45rem",color:"#1a3a2a",fontSize:".86rem"}}>🔄 Avslutning <span style={{fontWeight:400,color:"#4a7c59",fontSize:".73rem"}}>(5 min)</span></h4>
        <ul style={{margin:0,paddingLeft:"1.1rem"}}>{l.avslutning.map((p,i)=><li key={i} style={{fontSize:".8rem",marginBottom:".2rem"}}>{p}</li>)}</ul>
      </div>
      <div style={{background:"#e8f5e9",borderRadius:12,padding:"1rem",marginBottom:".8rem",border:"1px solid #c8e6c9"}}>
        <h4 style={{margin:"0 0 .45rem",color:"#1a3a2a",fontSize:".86rem"}}>💡 Tips</h4>
        <ul style={{margin:0,paddingLeft:"1.1rem"}}>{l.tips.map((t,i)=><li key={i} style={{fontSize:".8rem",marginBottom:".2rem"}}>{t}</li>)}</ul>
      </div>
      <Knappar copied={copied} onCopy={onCopy} onPrint={onPrint}/>
    </div>
  );
}

function ProvCard({l,copied,onCopy,onPrint}) {
  const label=l.type==="prov"?"Prov":"Övningsuppgifter";
  const icon=l.type==="prov"?"📝":"✏️";
  return (
    <div>
      <div style={{background:"linear-gradient(135deg,#1565c0,#0d47a1)",borderRadius:16,padding:"1.3rem",color:"white",marginBottom:".7rem",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-20,right:-20,width:80,height:80,borderRadius:"50%",background:"rgba(255,255,255,0.07)"}}/>
        <div style={{display:"flex",flexWrap:"wrap",gap:".3rem",marginBottom:".5rem"}}>
          <span style={{background:"rgba(255,255,255,0.18)",borderRadius:50,padding:".18rem .65rem",fontSize:".73rem"}}>Klass {l.meta.grade}</span>
          <span style={{background:"rgba(255,255,255,0.18)",borderRadius:50,padding:".18rem .65rem",fontSize:".73rem"}}>{l.meta.subject}</span>
          <span style={{background:"rgba(255,255,255,0.22)",borderRadius:50,padding:".18rem .65rem",fontSize:".73rem",fontWeight:700}}>{icon} {label}</span>
        </div>
        <h2 style={{margin:"0 0 .35rem",fontSize:"1.2rem",fontFamily:"Georgia,serif"}}>{l.meta.chapter}</h2>
        <p style={{margin:0,fontSize:".78rem",opacity:.85,lineHeight:1.5}}>{l.lgr22}</p>
      </div>

      <div style={{background:"white",borderRadius:12,padding:"1rem",marginBottom:".6rem",boxShadow:"0 2px 8px rgba(21,101,192,.07)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:".7rem",paddingBottom:".6rem",borderBottom:"1px solid #e3f2fd"}}>
          <span style={{fontSize:".82rem",color:"#1a3a2a",fontWeight:700}}>Namn: ___________________</span>
          <span style={{fontSize:".82rem",color:"#1a3a2a",fontWeight:700}}>Datum: __________</span>
        </div>
        {l.nivor.map((niva,ni)=>(
          <div key={ni} style={{marginBottom:"1.2rem"}}>
            <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:".6rem",background:niva.farg,borderRadius:8,padding:".4rem .8rem"}}>
              <span style={{fontSize:"1rem"}}>{niva.ikon}</span>
              <span style={{color:"white",fontWeight:700,fontSize:".85rem"}}>{niva.namn}</span>
              <span style={{color:"rgba(255,255,255,0.75)",fontSize:".72rem",marginLeft:"auto"}}>{niva.fragor.length} frågor</span>
            </div>
            {niva.fragor.map((f,fi)=>(
              <div key={fi} style={{marginBottom:".8rem",paddingLeft:".5rem",borderLeft:`3px solid ${niva.farg}`}}>
                <div style={{display:"flex",gap:".4rem",alignItems:"flex-start",marginBottom:".3rem"}}>
                  <span style={{background:niva.farg,color:"white",borderRadius:50,padding:".1rem .45rem",fontSize:".68rem",fontWeight:700,flexShrink:0}}>{ni*niva.fragor.length+fi+1}</span>
                  <div>
                    <span style={{fontSize:".7rem",color:niva.farg,fontWeight:700,display:"block",marginBottom:".15rem"}}>[{f.t}]</span>
                    <span style={{fontSize:".82rem",color:"#1a2e1a",lineHeight:1.5}}>{f.q}</span>
                  </div>
                </div>
                <div style={{background:"#f8f9fa",borderRadius:6,padding:".5rem .8rem",marginLeft:"1.4rem",marginTop:".2rem"}}>
                  <span style={{fontSize:".72rem",color:"#999"}}>Svar: ________________________________________________</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Knappar copied={copied} onCopy={onCopy} onPrint={onPrint}/>
    </div>
  );
}

function Knappar({copied,onCopy,onPrint}) {
  return (
    <div style={{display:"flex",gap:".5rem",flexWrap:"wrap",marginBottom:".5rem"}}>
      <button onClick={onCopy} style={{background:"linear-gradient(135deg,#1565c0,#0d47a1)",color:"white",border:"none",borderRadius:50,padding:".55rem 1.1rem",fontSize:".8rem",fontFamily:"Georgia,serif",fontWeight:700,cursor:"pointer"}}>
        {copied?"✅ Kopierat!":"📋 Kopiera"}
      </button>
      <button onClick={onPrint} style={{background:"linear-gradient(135deg,#6a1b9a,#4a148c)",color:"white",border:"none",borderRadius:50,padding:".55rem 1.1rem",fontSize:".8rem",fontFamily:"Georgia,serif",fontWeight:700,cursor:"pointer"}}>
        🖨️ Skriv ut
      </button>
    </div>
  );
}

// ── HUVUD ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [mode,setMode]=useState(null);
  const [messages,setMessages]=useState([]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const [copied,setCopied]=useState(false);
  const chatEndRef=useRef(null);
  useEffect(()=>{chatEndRef.current?.scrollIntoView({behavior:"smooth"});},[messages,loading]);

  function handleCopy(result){navigator.clipboard.writeText(exportText(result)).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2500);});}

  function sendMessage(text){
    if(!text.trim()||loading) return;
    setMessages(prev=>[...prev,{role:"user",content:text}]);
    setInput(""); setLoading(true);
    setTimeout(()=>{
      try {
        const base=parseBase(text);
        const modeType=detectMode(text);
        let result;
        if(modeType==="prov") result=buildProv(base);
        else if(modeType==="ovning") result=buildOvning(base);
        else result=buildGenomgang(base);
        setMessages(prev=>[...prev,{role:"assistant",content:"__result__",result}]);
      } catch(e){
        setMessages(prev=>[...prev,{role:"assistant",content:"Jag förstod inte riktigt. Försök t.ex: 'Prov matte åk 6 om procent' eller 'Genomgång franska åk 8'"}]);
      }
      setLoading(false);
    },800);
  }

  // STARTSIDA
  if(!mode) return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#e8f5e9,#f1f8e9,#e0f2f1)",fontFamily:"Georgia,serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"2rem 1rem"}}>
      <style>{`@keyframes fi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.fi{animation:fi .4s ease}`}</style>
      <div className="fi" style={{textAlign:"center",maxWidth:480,width:"100%"}}>
        <span style={{fontSize:"2.8rem"}}>🌿</span>
        <h1 style={{fontSize:"1.9rem",color:"#1b5e20",margin:".4rem 0 .2rem",fontWeight:700}}>LektionsGuiden</h1>
        <p style={{color:"#4a7c59",marginBottom:"1.8rem",fontSize:".88rem"}}>Genomgångar · Prov · Övningar · Lgr22 · Åk 1–9</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".9rem",marginBottom:"1.2rem"}}>
          <button onClick={()=>setMode("chat")} style={{background:"linear-gradient(135deg,#1b5e20,#2e7d32)",color:"white",border:"none",borderRadius:16,padding:"1.5rem .9rem",cursor:"pointer",fontFamily:"Georgia,serif",boxShadow:"0 4px 20px rgba(27,94,32,0.25)"}}>
            <div style={{fontSize:"1.7rem",marginBottom:".35rem"}}>💬</div>
            <div style={{fontSize:".95rem",fontWeight:700,marginBottom:".2rem"}}>Chattläge</div>
            <div style={{fontSize:".72rem",opacity:.88}}>Beskriv fritt – allt skapas direkt</div>
          </button>
          <button onClick={()=>setMode("guide")} style={{background:"white",color:"#1b5e20",border:"2px solid #a5d6a7",borderRadius:16,padding:"1.5rem .9rem",cursor:"pointer",fontFamily:"Georgia,serif",boxShadow:"0 4px 20px rgba(27,94,32,0.08)"}}>
            <div style={{fontSize:"1.7rem",marginBottom:".35rem"}}>📋</div>
            <div style={{fontSize:".95rem",fontWeight:700,marginBottom:".2rem"}}>Guidat läge</div>
            <div style={{fontSize:".72rem",color:"#4a7c59"}}>Välj steg för steg</div>
          </button>
        </div>
        <div style={{background:"white",borderRadius:12,padding:".8rem",marginBottom:"1rem",border:"1px solid #c8e6c9"}}>
          <p style={{margin:"0 0 .4rem",fontSize:".75rem",color:"#2e7d32",fontWeight:700}}>💬 Chattläget kan skapa:</p>
          <div style={{display:"flex",gap:".4rem",flexWrap:"wrap",justifyContent:"center"}}>
            {["📈 Genomgång","📝 Prov","✏️ Övningsuppgifter"].map(t=><span key={t} style={{background:"#e8f5e9",borderRadius:50,padding:".2rem .65rem",fontSize:".72rem",color:"#1b5e20"}}>{t}</span>)}
          </div>
        </div>
        <p style={{color:"#a5d6a7",fontSize:".7rem"}}>av MD · lektionsguiden.vercel.app</p>
      </div>
    </div>
  );

  // CHATTLÄGE
  if(mode==="chat") return (
    <div style={{height:"100vh",background:"linear-gradient(135deg,#e8f5e9,#f1f8e9)",fontFamily:"Georgia,serif",display:"flex",flexDirection:"column"}}>
      <style>{`
        @keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.fi{animation:fi .35s ease}
        @keyframes pulse{0%,100%{opacity:.35}50%{opacity:1}}.dot{animation:pulse 1.2s ease infinite}
        ul{padding-left:1.1rem;margin:.25rem 0}li{margin-bottom:.25rem;line-height:1.5;color:#1a2e1a}
        textarea:focus{border-color:#2e7d32!important;outline:none}
      `}</style>
      <div style={{background:"#1b5e20",padding:".8rem 1rem",display:"flex",alignItems:"center",gap:".65rem",boxShadow:"0 2px 8px rgba(0,0,0,0.15)",flexShrink:0}}>
        <button onClick={()=>{setMode(null);setMessages([]);}} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:8,padding:".28rem .6rem",color:"white",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:".78rem"}}>← Hem</button>
        <span style={{fontSize:"1.15rem"}}>🌿</span>
        <div>
          <div style={{color:"white",fontWeight:700,fontSize:".88rem"}}>LektionsGuiden</div>
          <div style={{color:"#a5d6a7",fontSize:".65rem"}}>Genomgång · Prov · Övningar · Lgr22</div>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"1rem",maxWidth:680,width:"100%",margin:"0 auto",boxSizing:"border-box"}}>
        {messages.length===0&&(
          <div className="fi" style={{textAlign:"center",padding:"1.2rem .5rem"}}>
            <div style={{fontSize:"2rem",marginBottom:".7rem"}}>👋</div>
            <h2 style={{color:"#1b5e20",margin:"0 0 .35rem",fontSize:"1.15rem"}}>Hej! Vad behöver du idag?</h2>
            <p style={{color:"#4a7c59",fontSize:".82rem",marginBottom:"1rem"}}>Beskriv fritt – jag skapar genomgångar, prov och övningar direkt.</p>
            <div style={{display:"flex",gap:".4rem",justifyContent:"center",flexWrap:"wrap",marginBottom:"1rem"}}>
              {["📈 Genomgång","📝 Prov","✏️ Övningar"].map(t=><span key={t} style={{background:"#e8f5e9",borderRadius:50,padding:".25rem .7rem",fontSize:".75rem",color:"#1b5e20",fontWeight:700}}>{t}</span>)}
            </div>
            <div style={{display:"grid",gap:".4rem"}}>
              {EXEMPEL.map((ex,i)=>(
                <button key={i} onClick={()=>sendMessage(ex)} style={{background:"white",border:"2px solid #c8e6c9",borderRadius:12,padding:".6rem .85rem",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:".8rem",color:"#1a3a2a",textAlign:"left"}}>
                  💬 {ex}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg,i)=>(
          <div key={i} className="fi" style={{marginBottom:".85rem",display:"flex",flexDirection:"column",alignItems:msg.role==="user"?"flex-end":"flex-start"}}>
            {msg.role==="user"?(
              <div style={{background:"#2e7d32",color:"white",borderRadius:"18px 18px 4px 18px",padding:".6rem .95rem",maxWidth:"80%",fontSize:".86rem",lineHeight:1.5}}>{msg.content}</div>
            ):msg.content==="__result__"?(
              <div style={{width:"100%"}}>
                <div style={{color:"#2e7d32",fontSize:".75rem",marginBottom:".28rem",fontWeight:700}}>🌿 LektionsGuiden</div>
                <div style={{background:"white",borderRadius:"4px 18px 18px 18px",padding:"1rem",boxShadow:"0 2px 12px rgba(46,125,50,.1)"}}>
                  <p style={{margin:"0 0 .55rem",color:"#1a3a2a",fontSize:".83rem",fontWeight:700}}>
                    {msg.result.type==="prov"?"✅ Här är ditt prov!":msg.result.type==="ovning"?"✅ Här är övningsuppgifterna!":"✅ Här är din genomgång!"}
                  </p>
                  {msg.result.type==="genomgang"
                    ?<GenomgangCard l={msg.result} copied={copied} onCopy={()=>handleCopy(msg.result)} onPrint={()=>window.print()}/>
                    :<ProvCard l={msg.result} copied={copied} onCopy={()=>handleCopy(msg.result)} onPrint={()=>window.print()}/>
                  }
                </div>
              </div>
            ):(
              <div style={{width:"100%"}}>
                <div style={{color:"#2e7d32",fontSize:".75rem",marginBottom:".28rem",fontWeight:700}}>🌿 LektionsGuiden</div>
                <div style={{background:"white",borderRadius:"4px 18px 18px 18px",padding:".6rem .95rem",maxWidth:"85%",fontSize:".83rem",color:"#1a2e1a",lineHeight:1.6,boxShadow:"0 2px 8px rgba(46,125,50,.08)"}}>{msg.content}</div>
              </div>
            )}
          </div>
        ))}

        {loading&&(
          <div style={{display:"flex",alignItems:"center",gap:".45rem",marginBottom:".85rem"}}>
            <div style={{color:"#2e7d32",fontSize:".75rem",fontWeight:700}}>🌿 LektionsGuiden</div>
            <div style={{background:"white",borderRadius:"4px 18px 18px 18px",padding:".6rem .95rem",boxShadow:"0 2px 8px rgba(46,125,50,.08)"}}>
              <div style={{display:"flex",gap:".28rem",alignItems:"center"}}>
                {[0,.2,.4].map((d,i)=><div key={i} className="dot" style={{width:6,height:6,borderRadius:"50%",background:"#2e7d32",animationDelay:`${d}s`}}/>)}
                <span style={{fontSize:".75rem",color:"#4a7c59",marginLeft:".3rem"}}>Skapar…</span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef}/>
      </div>

      <div style={{background:"white",borderTop:"1px solid #e8f5e9",padding:".7rem .9rem",boxShadow:"0 -2px 12px rgba(46,125,50,.06)",flexShrink:0}}>
        <div style={{maxWidth:680,margin:"0 auto",display:"flex",gap:".45rem",alignItems:"flex-end"}}>
          <textarea value={input} onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage(input);}}}
            placeholder="T.ex. 'Prov matte åk 6 om procent' eller 'Genomgång franska åk 8'..."
            rows={2} style={{flex:1,border:"2px solid #a5d6a7",borderRadius:13,padding:".6rem .85rem",fontFamily:"Georgia,serif",fontSize:".86rem",color:"#1a3a2a",resize:"none",lineHeight:1.5,boxSizing:"border-box"}}/>
          <button onClick={()=>sendMessage(input)} disabled={!input.trim()||loading}
            style={{background:!input.trim()||loading?"#c8e6c9":"linear-gradient(135deg,#2e7d32,#1b5e20)",color:"white",border:"none",borderRadius:11,padding:".68rem .95rem",cursor:!input.trim()||loading?"default":"pointer",fontSize:"1.05rem"}}>➤</button>
        </div>
        <p style={{textAlign:"center",color:"#a5d6a7",fontSize:".65rem",margin:".35rem 0 0"}}>Enter för att skicka · Shift+Enter för ny rad</p>
      </div>
    </div>
  );

  // GUIDAT LÄGE
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#e8f5e9,#f1f8e9)",fontFamily:"Georgia,serif",padding:"1.5rem 1rem"}}>
      <div style={{maxWidth:600,margin:"0 auto"}}>
        <button onClick={()=>setMode(null)} style={{background:"#2e7d32",color:"white",border:"none",borderRadius:8,padding:".45rem .9rem",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:".8rem",marginBottom:"1rem"}}>← Hem</button>
        <div style={{background:"white",borderRadius:20,padding:"2rem",boxShadow:"0 4px 20px rgba(46,125,50,.08)",textAlign:"center"}}>
          <span style={{fontSize:"1.8rem"}}>📋</span>
          <h2 style={{color:"#1b5e20",margin:".4rem 0 .5rem"}}>Guidat läge</h2>
          <p style={{color:"#4a7c59",fontSize:".88rem",marginBottom:"1.2rem"}}>Det fullständiga guidade läget finns i föregående version på Vercel.</p>
          <button onClick={()=>setMode("chat")} style={{background:"linear-gradient(135deg,#1b5e20,#2e7d32)",color:"white",border:"none",borderRadius:50,padding:".8rem 1.8rem",fontFamily:"Georgia,serif",fontWeight:700,cursor:"pointer",fontSize:".92rem"}}>
            💬 Prova chattläget istället
          </button>
        </div>
      </div>
    </div>
  );
}
