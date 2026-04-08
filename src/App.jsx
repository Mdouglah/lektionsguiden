import { useState, useRef, useEffect } from "react";

const LGR22 = {
  "Svenska": "Eleven ska läsa, analysera och kommunicera i tal och skrift med anpassning till syfte och mottagare.",
  "Matematik": "Eleven ska formulera och lösa problem, använda matematiska metoder och föra resonemang.",
  "Engelska": "Eleven ska kommunicera på engelska i tal och skrift och förstå olika typer av texter.",
  "Spanska": "Eleven ska kommunicera på spanska och reflektera över kulturer i spansktalande länder.",
  "Franska": "Eleven ska kommunicera på franska och reflektera över kulturer i fransktalande länder.",
  "Tyska": "Eleven ska kommunicera på tyska och reflektera över kulturer i tysktalande länder.",
  "Biologi": "Eleven ska använda biologikunskaper för att ta ställning i frågor om hälsa och ekologisk hållbarhet.",
  "Fysik": "Eleven ska använda fysikkunskaper för att granska information om energi, teknik och miljö.",
  "Kemi": "Eleven ska använda kemikunskaper för att ta ställning i frågor om kemikaliers påverkan på hälsa och miljö.",
  "Geografi": "Eleven ska analysera hur naturens processer och människors verksamheter formar livsmiljöer.",
  "Historia": "Eleven ska använda historiska begrepp och metoder för att förstå hur det förflutna påverkar nutiden.",
  "Religionskunskap": "Eleven ska analysera religioner, livsåskådningar och etiska frågor utifrån olika perspektiv.",
  "Samhällskunskap": "Eleven ska analysera samhällsstrukturer och reflektera kring demokrati och hållbar utveckling.",
  "Bild": "Eleven ska kommunicera med bilder, skapa med olika tekniker och analysera bilduttryck.",
  "Musik": "Eleven ska spela, sjunga, skapa musik och förstå musikens sammanhang i samhälle och kultur.",
  "Idrott och hälsa": "Eleven ska röra sig allsidigt och reflektera kring hälsa, livsstil och välmående.",
  "Slöjd": "Eleven ska formge och framställa föremål och utveckla förmåga att planera och utvärdera skapande processer.",
  "Teknik": "Eleven ska identifiera tekniska lösningar och konstruera med hänsyn till hållbarhet.",
  "Hemkunskap": "Eleven ska planera och tillaga mat, hantera resurser och reflektera kring hälsa och hållbar livsstil."
};

const STEG_FARG = ["#1b5e20","#2e7d32","#388e3c","#43a047"];
const STEG_IKONER = ["🌱","🌿","🌳","🏆"];

const SYSTEM_PROMPT = `Du är LektionsGuiden – ett pedagogiskt verktyg för svenska lärare (åk 1–9) baserat på Lgr22.

När läraren skriver en förfrågan ska du ALLTID svara med ett JSON-objekt (och inget annat, inga förklaringar utanför JSON):

{
  "meta": {
    "grade": <nummer 1-9>,
    "subject": "<ämne på svenska>",
    "area": "<område inom ämnet>",
    "chapter": "<specifikt moment>",
    "numLevels": <2, 3 eller 4>
  },
  "lgr22": "<kort Lgr22-koppling för ämnet>",
  "totalTid": <total tid i minuter>,
  "forberedelse": ["<steg 1>", "<steg 2>", "<steg 3>"],
  "steg": [
    {
      "rubrik": "<Del X – Namn>",
      "ikon": "<emoji>",
      "farg": "<hex-färg>",
      "tid": "<X min>",
      "beskrivning": "<kort beskrivning>",
      "moment": ["<moment 1>", "<moment 2>", "<moment 3>"],
      "fraga": "<metakognitiv fråga att ställa till eleverna>",
      "signal": "<signal att gå vidare>"
    }
  ],
  "avslutning": ["<steg 1>", "<steg 2>", "<steg 3>"],
  "tips": ["<tip 1>", "<tip 2>", "<tip 3>"]
}

Regler:
- Använd alltid svenska
- Anpassa till Lgr22 och svensk skolkontext
- numLevels: om läraren inte anger nivåer, välj 3 som standard
- Stegen ska följa didaktisk progression: grund → fördjupning → analys
- Färger på stegen: ["#1b5e20","#2e7d32","#388e3c","#43a047"]
- Ikoner på stegen: ["🌱","🌿","🌳","🏆"]
- Svara BARA med JSON, inga andra ord`;

const EXEMPEL = [
  "Genomgång i matte åk 6 om procent, 3 nivåer",
  "Franska åk 8, preteritum, 2 nivåer",
  "Repetition inför nationellt prov svenska åk 9",
  "Biologi åk 7 – immunförsvaret för en blandad klass",
  "Historia åk 5, medeltiden, enkel genomgång"
];

export default function LektionsGuiden() {
  const [mode, setMode] = useState(null); // "chat" | "guide"
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState(null);
  const [activeSteg, setActiveSteg] = useState(null);
  const [copied, setCopied] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  async function sendMessage(text) {
    if (!text.trim() || loading) return;
    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setLesson(null);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });
      const data = await res.json();
      const raw = data.content?.[0]?.text || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      parsed.steg = parsed.steg.map((s, i) => ({
        ...s,
        farg: STEG_FARG[i] || STEG_FARG[0],
        ikon: STEG_IKONER[i] || STEG_IKONER[0]
      }));
      setLesson(parsed);
      setActiveSteg(null);
      setMessages(prev => [...prev, { role: "assistant", content: "__lesson__", lesson: parsed }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Något gick fel. Försök igen med en tydligare beskrivning, t.ex. 'Matte åk 6 om bråk, 3 nivåer'." }]);
    }
    setLoading(false);
  }

  function exportText(l) {
    if (!l) return "";
    let t = `LEKTIONSGUIDEN – Lgr22\n${"=".repeat(38)}\n`;
    t += `Klass: ${l.meta.grade} | Ämne: ${l.meta.subject} | ${l.meta.chapter}\n\n`;
    t += `📌 LGRKOPPLING\n${l.lgr22}\n\n`;
    t += `📋 FÖRBEREDELSE\n${l.forberedelse.map((p,i)=>`${i+1}. ${p}`).join("\n")}\n\n`;
    t += `📈 GENOMGÅNG\n`;
    l.steg.forEach(s => {
      t += `\n${s.rubrik} (${s.tid})\n${"-".repeat(26)}\n`;
      s.moment.forEach((m,i) => t += `${i+1}. ${m}\n`);
      t += `❓ ${s.fraga}\n⏭ ${s.signal}\n`;
    });
    t += `\n🔄 AVSLUTNING\n${l.avslutning.map((p,i)=>`${i+1}. ${p}`).join("\n")}\n\n`;
    t += `💡 TIPS\n${l.tips.map((p,i)=>`${i+1}. ${p}`).join("\n")}\n`;
    return t;
  }

  function LessonCard({ l }) {
    const [as, setAs] = useState(null);
    return (
      <div style={{marginTop:"1rem"}}>
        {/* Hero */}
        <div style={{background:"linear-gradient(135deg,#1b5e20,#2e7d32)",borderRadius:16,padding:"1.4rem",color:"white",marginBottom:".8rem",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-20,right:-20,width:90,height:90,borderRadius:"50%",background:"rgba(255,255,255,0.07)"}}/>
          <div style={{display:"flex",flexWrap:"wrap",gap:".3rem",marginBottom:".6rem"}}>
            <span style={{background:"rgba(255,255,255,0.15)",borderRadius:50,padding:".2rem .7rem",fontSize:".75rem"}}>Klass {l.meta.grade}</span>
            <span style={{background:"rgba(255,255,255,0.15)",borderRadius:50,padding:".2rem .7rem",fontSize:".75rem"}}>{l.meta.subject}</span>
            <span style={{background:"rgba(255,255,255,0.2)",borderRadius:50,padding:".2rem .7rem",fontSize:".75rem",fontWeight:700}}>⏱ {l.totalTid} min</span>
          </div>
          <h2 style={{margin:"0 0 .4rem",fontSize:"1.3rem",fontFamily:"Georgia,serif"}}>{l.meta.chapter}</h2>
          <p style={{margin:0,fontSize:".82rem",opacity:.85,lineHeight:1.5}}>{l.lgr22}</p>
        </div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:".5rem",marginBottom:".8rem"}}>
          {[["Nivåer",l.meta.numLevels],["Steg",l.steg.length],["Minuter",l.totalTid]].map(([lbl,val])=>(
            <div key={lbl} style={{background:"white",borderRadius:12,padding:".7rem",textAlign:"center",boxShadow:"0 2px 8px rgba(46,125,50,.08)"}}>
              <div style={{fontSize:"1.4rem",fontWeight:700,color:"#2e7d32"}}>{val}</div>
              <div style={{fontSize:".7rem",color:"#4a7c59"}}>{lbl}</div>
            </div>
          ))}
        </div>

        {/* Förberedelse */}
        <div style={{background:"white",borderRadius:12,padding:"1.1rem",marginBottom:".7rem",boxShadow:"0 2px 8px rgba(46,125,50,.07)"}}>
          <h4 style={{margin:"0 0 .5rem",color:"#1a3a2a",fontSize:".9rem"}}>📋 Förberedelse <span style={{fontWeight:400,color:"#4a7c59",fontSize:".78rem"}}>(5 min)</span></h4>
          <ul style={{margin:0,paddingLeft:"1.2rem"}}>{l.forberedelse.map((p,i)=><li key={i} style={{fontSize:".83rem",marginBottom:".25rem",color:"#1a2e1a"}}>{p}</li>)}</ul>
        </div>

        {/* Steg */}
        <div style={{background:"white",borderRadius:12,padding:"1.1rem",marginBottom:".7rem",boxShadow:"0 2px 8px rgba(46,125,50,.07)"}}>
          <h4 style={{margin:"0 0 .8rem",color:"#1a3a2a",fontSize:".9rem"}}>📈 Genomgång</h4>
          <div style={{display:"flex",gap:".4rem",flexWrap:"wrap",marginBottom:".8rem"}}>
            {l.steg.map((s,i)=>(
              <button key={i} onClick={()=>setAs(as===i?null:i)}
                style={{border:"none",borderRadius:50,padding:".4rem .9rem",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:".78rem",fontWeight:700,transition:"all .2s",background:as===i?s.farg:"#f1f8e9",color:as===i?"white":s.farg}}>
                {s.ikon} {s.rubrik.split("–")[1]?.trim()||s.rubrik}
              </button>
            ))}
          </div>
          {l.steg.map((steg,i)=>(
            <div key={i} style={{display:as===i||as===null?"block":"none",borderLeft:`4px solid ${steg.farg}`,paddingLeft:".9rem",marginBottom:as===null?"1rem":0}}>
              <div style={{display:"flex",alignItems:"center",gap:".4rem",marginBottom:".3rem"}}>
                <strong style={{color:steg.farg,fontSize:".88rem"}}>{steg.rubrik}</strong>
                <span style={{marginLeft:"auto",background:"#f1f8e9",borderRadius:50,padding:".1rem .5rem",fontSize:".72rem",color:"#2e7d32",fontWeight:700}}>{steg.tid}</span>
              </div>
              <p style={{margin:"0 0 .4rem",color:"#1a2e1a",fontSize:".82rem",fontStyle:"italic"}}>{steg.beskrivning}</p>
              <ul style={{margin:"0 0 .5rem",paddingLeft:"1.2rem"}}>{steg.moment.map((m,j)=><li key={j} style={{fontSize:".82rem",marginBottom:".2rem",color:"#1a2e1a"}}>{m}</li>)}</ul>
              <div style={{background:"#f1f8e9",borderRadius:8,padding:".4rem .7rem",marginBottom:".3rem"}}>
                <span style={{fontSize:".72rem",color:"#2e7d32",fontWeight:700}}>❓ </span>
                <span style={{fontSize:".8rem",color:"#1a2e1a",fontStyle:"italic"}}>{steg.fraga}</span>
              </div>
              <div style={{background:"#fff8e1",borderRadius:8,padding:".4rem .7rem"}}>
                <span style={{fontSize:".72rem",color:"#f57f17",fontWeight:700}}>⏭ </span>
                <span style={{fontSize:".8rem",color:"#1a2e1a"}}>{steg.signal}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Avslutning */}
        <div style={{background:"white",borderRadius:12,padding:"1.1rem",marginBottom:".7rem",boxShadow:"0 2px 8px rgba(46,125,50,.07)"}}>
          <h4 style={{margin:"0 0 .5rem",color:"#1a3a2a",fontSize:".9rem"}}>🔄 Avslutning <span style={{fontWeight:400,color:"#4a7c59",fontSize:".78rem"}}>(5 min)</span></h4>
          <ul style={{margin:0,paddingLeft:"1.2rem"}}>{l.avslutning.map((p,i)=><li key={i} style={{fontSize:".83rem",marginBottom:".25rem",color:"#1a2e1a"}}>{p}</li>)}</ul>
        </div>

        {/* Tips */}
        <div style={{background:"#e8f5e9",borderRadius:12,padding:"1.1rem",marginBottom:".7rem",border:"1px solid #c8e6c9"}}>
          <h4 style={{margin:"0 0 .5rem",color:"#1a3a2a",fontSize:".9rem"}}>💡 Tips till läraren</h4>
          <ul style={{margin:0,paddingLeft:"1.2rem"}}>{l.tips.map((t,i)=><li key={i} style={{fontSize:".83rem",marginBottom:".25rem",color:"#1a2e1a"}}>{t}</li>)}</ul>
        </div>

        {/* Export */}
        <div style={{display:"flex",gap:".5rem",flexWrap:"wrap"}}>
          <button onClick={()=>{navigator.clipboard.writeText(exportText(l)).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});}}
            style={{background:"linear-gradient(135deg,#1565c0,#0d47a1)",color:"white",border:"none",borderRadius:50,padding:".6rem 1.2rem",fontSize:".82rem",fontFamily:"Georgia,serif",fontWeight:700,cursor:"pointer"}}>
            {copied?"✅ Kopierat!":"📋 Kopiera"}
          </button>
          <button onClick={()=>window.print()}
            style={{background:"linear-gradient(135deg,#6a1b9a,#4a148c)",color:"white",border:"none",borderRadius:50,padding:".6rem 1.2rem",fontSize:".82rem",fontFamily:"Georgia,serif",fontWeight:700,cursor:"pointer"}}>
            🖨️ Skriv ut
          </button>
        </div>
      </div>
    );
  }

  // STARTSIDA
  if (!mode) return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#e8f5e9,#f1f8e9,#e0f2f1)",fontFamily:"Georgia,serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"2rem 1rem"}}>
      <style>{`@keyframes fi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.fi{animation:fi .4s ease}`}</style>
      <div className="fi" style={{textAlign:"center",maxWidth:500}}>
        <span style={{fontSize:"3rem"}}>🌿</span>
        <h1 style={{fontSize:"2.2rem",color:"#1b5e20",margin:".5rem 0 .3rem",fontWeight:700}}>LektionsGuiden</h1>
        <p style={{color:"#4a7c59",marginBottom:"2.5rem",fontSize:".95rem"}}>Differentierad undervisning · Lgr22 · Åk 1–9</p>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1.5rem"}}>
          <button onClick={()=>setMode("chat")} style={{background:"linear-gradient(135deg,#1b5e20,#2e7d32)",color:"white",border:"none",borderRadius:16,padding:"1.8rem 1rem",cursor:"pointer",fontFamily:"Georgia,serif",transition:"all .2s",boxShadow:"0 4px 20px rgba(27,94,32,0.25)"}}>
            <div style={{fontSize:"2rem",marginBottom:".5rem"}}>💬</div>
            <div style={{fontSize:"1.1rem",fontWeight:700,marginBottom:".3rem"}}>Chattläge</div>
            <div style={{fontSize:".8rem",opacity:.85}}>Beskriv vad du behöver – AI:n skapar genomgången direkt</div>
          </button>
          <button onClick={()=>setMode("guide")} style={{background:"white",color:"#1b5e20",border:"2px solid #a5d6a7",borderRadius:16,padding:"1.8rem 1rem",cursor:"pointer",fontFamily:"Georgia,serif",transition:"all .2s",boxShadow:"0 4px 20px rgba(27,94,32,0.08)"}}>
            <div style={{fontSize:"2rem",marginBottom:".5rem"}}>📋</div>
            <div style={{fontSize:"1.1rem",fontWeight:700,marginBottom:".3rem"}}>Guidat läge</div>
            <div style={{fontSize:".8rem",color:"#4a7c59"}}>Välj klass, ämne och moment steg för steg</div>
          </button>
        </div>
        <p style={{color:"#a5d6a7",fontSize:".75rem"}}>av MD · lektionsguiden.vercel.app</p>
      </div>
    </div>
  );

  // CHATTLÄGE
  if (mode === "chat") return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#e8f5e9,#f1f8e9,#e0f2f1)",fontFamily:"Georgia,serif",display:"flex",flexDirection:"column"}}>
      <style>{`
        @keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .fi{animation:fi .35s ease}
        @keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
        .dot{animation:pulse 1.2s ease infinite}
        ul{padding-left:1.2rem;margin:.3rem 0}
        li{margin-bottom:.3rem;line-height:1.55;color:#1a2e1a}
      `}</style>

      {/* Topbar */}
      <div style={{background:"#1b5e20",padding:".9rem 1.2rem",display:"flex",alignItems:"center",gap:".8rem",boxShadow:"0 2px 8px rgba(0,0,0,0.15)"}}>
        <button onClick={()=>{setMode(null);setMessages([]);setLesson(null);}} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:8,padding:".35rem .7rem",color:"white",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:".82rem"}}>← Hem</button>
        <span style={{fontSize:"1.3rem"}}>🌿</span>
        <div>
          <div style={{color:"white",fontWeight:700,fontSize:".95rem"}}>LektionsGuiden</div>
          <div style={{color:"#a5d6a7",fontSize:".72rem"}}>Chattläge · Lgr22</div>
        </div>
      </div>

      {/* Chattfönster */}
      <div style={{flex:1,overflowY:"auto",padding:"1rem",maxWidth:680,width:"100%",margin:"0 auto",boxSizing:"border-box"}}>

        {/* Välkomstmeddelande */}
        {messages.length===0 && (
          <div className="fi" style={{textAlign:"center",padding:"2rem 1rem"}}>
            <div style={{fontSize:"2.5rem",marginBottom:"1rem"}}>👋</div>
            <h2 style={{color:"#1b5e20",margin:"0 0 .5rem",fontSize:"1.3rem"}}>Hej! Vad ska du undervisa om?</h2>
            <p style={{color:"#4a7c59",fontSize:".9rem",marginBottom:"1.5rem"}}>Beskriv fritt vad du behöver så skapar jag en differentierad genomgång direkt.</p>
            <div style={{display:"grid",gap:".5rem"}}>
              {EXEMPEL.map((ex,i)=>(
                <button key={i} onClick={()=>sendMessage(ex)}
                  style={{background:"white",border:"2px solid #c8e6c9",borderRadius:12,padding:".7rem 1rem",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:".85rem",color:"#1a3a2a",textAlign:"left",transition:"all .18s"}}>
                  💬 {ex}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Meddelanden */}
        {messages.map((msg,i)=>(
          <div key={i} className="fi" style={{marginBottom:"1rem",display:"flex",flexDirection:"column",alignItems:msg.role==="user"?"flex-end":"flex-start"}}>
            {msg.role==="user" ? (
              <div style={{background:"#2e7d32",color:"white",borderRadius:"18px 18px 4px 18px",padding:".7rem 1.1rem",maxWidth:"80%",fontSize:".9rem",lineHeight:1.5}}>
                {msg.content}
              </div>
            ) : msg.content==="__lesson__" ? (
              <div style={{width:"100%"}}>
                <div style={{color:"#2e7d32",fontSize:".82rem",marginBottom:".3rem",fontWeight:700}}>🌿 LektionsGuiden</div>
                <div style={{background:"white",borderRadius:"4px 18px 18px 18px",padding:"1rem",boxShadow:"0 2px 12px rgba(46,125,50,.1)"}}>
                  <p style={{margin:"0 0 .5rem",color:"#1a3a2a",fontSize:".88rem"}}>✅ Här är din genomgång!</p>
                  <LessonCard l={msg.lesson}/>
                </div>
              </div>
            ) : (
              <div style={{width:"100%"}}>
                <div style={{color:"#2e7d32",fontSize:".82rem",marginBottom:".3rem",fontWeight:700}}>🌿 LektionsGuiden</div>
                <div style={{background:"white",borderRadius:"4px 18px 18px 18px",padding:".7rem 1.1rem",maxWidth:"85%",fontSize:".88rem",color:"#1a2e1a",lineHeight:1.6,boxShadow:"0 2px 8px rgba(46,125,50,.08)"}}>
                  {msg.content}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Laddar */}
        {loading && (
          <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:"1rem"}}>
            <div style={{color:"#2e7d32",fontSize:".82rem",fontWeight:700}}>🌿 LektionsGuiden</div>
            <div style={{background:"white",borderRadius:"4px 18px 18px 18px",padding:".7rem 1rem",boxShadow:"0 2px 8px rgba(46,125,50,.08)"}}>
              <div style={{display:"flex",gap:".3rem",alignItems:"center"}}>
                {[0,0.2,0.4].map((d,i)=><div key={i} className="dot" style={{width:8,height:8,borderRadius:"50%",background:"#2e7d32",animationDelay:`${d}s`}}/>)}
                <span style={{fontSize:".8rem",color:"#4a7c59",marginLeft:".3rem"}}>Skapar genomgång…</span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef}/>
      </div>

      {/* Inputfält */}
      <div style={{background:"white",borderTop:"1px solid #e8f5e9",padding:".8rem 1rem",boxShadow:"0 -2px 12px rgba(46,125,50,.06)"}}>
        <div style={{maxWidth:680,margin:"0 auto",display:"flex",gap:".6rem",alignItems:"flex-end"}}>
          <textarea
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage(input);}}}
            placeholder="T.ex. 'Matte åk 6 om procent, 3 nivåer' eller 'Franska åk 8, preteritum'..."
            rows={2}
            style={{flex:1,border:"2px solid #a5d6a7",borderRadius:14,padding:".7rem 1rem",fontFamily:"Georgia,serif",fontSize:".9rem",color:"#1a3a2a",outline:"none",resize:"none",lineHeight:1.5,transition:"border-color .18s"}}
          />
          <button onClick={()=>sendMessage(input)} disabled={!input.trim()||loading}
            style={{background:"linear-gradient(135deg,#2e7d32,#1b5e20)",color:"white",border:"none",borderRadius:12,padding:".75rem 1.1rem",cursor:"pointer",fontSize:"1.2rem",transition:"all .2s",opacity:!input.trim()||loading?0.4:1}}>
            ➤
          </button>
        </div>
        <p style={{textAlign:"center",color:"#a5d6a7",fontSize:".7rem",margin:".5rem 0 0"}}>Tryck Enter för att skicka · Shift+Enter för ny rad</p>
      </div>
    </div>
  );

  // GUIDAT LÄGE – placeholder (befintlig app)
  if (mode === "guide") return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#e8f5e9,#f1f8e9,#e0f2f1)",fontFamily:"Georgia,serif",padding:"1.5rem 1rem"}}>
      <div style={{maxWidth:660,margin:"0 auto"}}>
        <button onClick={()=>setMode(null)} style={{background:"#2e7d32",color:"white",border:"none",borderRadius:8,padding:".5rem 1rem",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:".85rem",marginBottom:"1rem"}}>← Hem</button>
        <div style={{background:"white",borderRadius:20,padding:"2rem",boxShadow:"0 4px 20px rgba(46,125,50,.08)",textAlign:"center"}}>
          <span style={{fontSize:"2rem"}}>📋</span>
          <h2 style={{color:"#1b5e20",fontFamily:"Georgia,serif"}}>Guidat läge</h2>
          <p style={{color:"#4a7c59"}}>Det guidade läget med alla ämnen och kapitel finns i den tidigare versionen av appen på Vercel.</p>
          <p style={{color:"#4a7c59",fontSize:".9rem"}}>Prova <strong>Chattläget</strong> – det är snabbare och smartare! 💬</p>
          <button onClick={()=>setMode("chat")} style={{background:"linear-gradient(135deg,#1b5e20,#2e7d32)",color:"white",border:"none",borderRadius:50,padding:".85rem 2rem",fontFamily:"Georgia,serif",fontWeight:700,cursor:"pointer",marginTop:"1rem",fontSize:"1rem"}}>
            💬 Öppna chattläge
          </button>
        </div>
      </div>
    </div>
  );
}
