import { useState } from "react";

const DATA = {
  1: { "Svenska": {
    "Bokstäver och ljud": ["Vokaler: a, e, i, o, u","Konsonanter och deras ljud","Korta vokaler – lyssna och säga","Långa vokaler – lyssna och säga","Skillnad mellan bokstavsnamn och ljud","Öva bokstavsordningen","Skriv och känna igen versaler","Skriv och känna igen gemener"],
    "Läsning": ["Ordbilder – vanliga korta ord","Läsa enkla meningar med stöd","Läsförståelse med bilder","Rim och ramsor","Para ihop ord och bild","Läsa högt i par"],
    "Skrivning": ["Skriva sitt förnamn","Skriva enkla ord","Skriva en enkel mening","Stor bokstav i början av mening","Punkt i slutet av mening","Skriva med mellanrum mellan ord"]
  }, "Matematik": {
    "Tal och räkning": ["Räkna föremål 1–5","Räkna föremål 1–10","Skriva siffror 1–10","Räkna framåt från vilket tal som helst","Räkna bakåt från 10","Addition – lägga ihop till 5","Addition – lägga ihop till 10","Subtraktion – ta bort till 5"],
    "Geometri": ["Känna igen cirkeln","Känna igen kvadraten","Känna igen triangeln","Känna igen rektangeln","Sortera former","Jämföra storlekar: stor/liten, lång/kort"]
  }},
  2: { "Svenska": {
    "Läsning": ["Läsa ord med dubbelteckning","Läsa ord med vokalkombinationer","Läsa berättande text och svara på frågor","Hitta information i en fakttext","Förstå händelseförlopp i en berättelse","Läsa högt med flyt","Texttyper – berättelse vs fakta"],
    "Skrivning": ["Skriva en berättelse med början och slut","Skriva beskrivande text","Använda punkt och frågetecken","Skriva med sammanhängande meningar","Revisera och förbättra en text"],
    "Grammatik": ["Substantiv – vad är ett substantiv?","Verb – vad är ett verb?","Adjektiv – beskrivande ord","Stor bokstav vid namn och meningsbörjan","Skillnad singular och plural"]
  }, "Matematik": {
    "Tal och räkning": ["Talen 11–20","Talen 20–100","Tiokamrater – par som ger 10","Addition utan uppställning till 20","Addition med uppställning till 100","Subtraktion utan uppställning till 20","Subtraktion med uppställning till 100","Jämföra tal: större än, mindre än, lika med"],
    "Mätning": ["Mäta längd med linjal","Jämföra längder","Väga föremål – tyngre/lättare","Klockan – hel och halv timme","Dagar, veckor och månader"]
  }},
  3: { "Svenska": {
    "Läsning": ["Lässtrategier: förutspå","Lässtrategier: ställa frågor","Lässtrategier: summera","Läsa faktatexter och hitta nyckelord","Jämföra faktatext och skönlitteratur","Förstå texters syfte och budskap","Läsförståelse – dra slutsatser"],
    "Skrivning": ["Skriva berättelse med tydlig handling","Skriva instruktioner steg för steg","Skriva faktatexter","Styckeindelning","Använda bindeord: och, men, för, så","Revidera och ge respons på text"],
    "Grammatik": ["Ordklasser – substantiv, verb, adjektiv","Meningsbyggnad – subjekt och predikat","Skiljetecken – komma i uppräkning","Plural – olika ändelser"]
  }, "Matematik": {
    "Tal och räkning": ["Tal upp till 1000","Skriva och läsa tal i tusental","Multiplikation – vad innebär det?","Multiplikationstabellen 1–5","Multiplikationstabellen 6–10","Division – lika dela","Sambandet multiplikation och division","Huvudräkning – strategier"],
    "Geometri": ["Area – vad är det?","Räkna area i rutor","Omkrets – vad är det?","Räkna omkrets","Koordinatsystem – läsa av punkter","Rita figurer i koordinatsystem"],
    "Statistik": ["Läsa tabeller","Läsa stapeldiagram","Skapa enkelt diagram","Tolka data och dra slutsatser"]
  }, "Engelska": {
    "Kommunikation": ["Hälsningsfraser – hello, goodbye, how are you","Färger på engelska","Siffror 1–20 på engelska","Veckodagar och månader","Beskriv dig själv på engelska","Enkla frågor och svar","Djur och natur på engelska"]
  }},
  4: { "Svenska": {
    "Läsning": ["Analysera en karaktärs egenskaper","Förstå karaktärers motiv","Dra slutsatser om händelser","Inferenser – läsa mellan raderna","Jämföra två texter","Källkritik – vem har skrivit och varför?","Faktatexter – hitta huvudbudskap"],
    "Skrivning": ["Argumenterande text – struktur","Skriva inledning och avslutning","Novellskrivning – spänningskurva","Beskrivande text med detaljer","Formell vs informell stil","Ge och ta emot skriftlig respons"],
    "Grammatik": ["Ordklasser – fördjupning","Bisatser och huvudsatser","Kommatecken – bisatsinledare","Direkt och indirekt tal"]
  }, "Matematik": {
    "Tal och räkning": ["Decimaltal – tiondel","Decimaltal – hundradel","Bråk – täljare och nämnare","Bråk på tallinjen","Skriftlig addition med decimaltal","Skriftlig subtraktion med decimaltal","Skriftlig multiplikation","Skriftlig division med enkla tal"],
    "Algebra": ["Vad är en ekvation?","Lösa enkla ekvationer","Mönster i talföljder","Beskriva mönster med ord och symboler"]
  }, "Engelska": {
    "Grammatik": ["Verb i presens – he/she/it","Verb i preteritum – regelbundna","Verb i preteritum – oregelbundna","Frågeord: who, what, where, when, why","Ordföljd i frågor","Negation med don't/doesn't"],
    "Kommunikation": ["Berätta om sin dag","Beskriva sin familj","Prata om fritidsintressen","Skriva ett enkelt mejl","Förstå en enkel text på engelska"]
  }, "SO": {
    "Historia": ["Stenåldern i Sverige","Bronsåldern","Järnåldern","Vikingarnas liv och samhälle","Vikingarnas resor och handel","Nordisk mytologi"],
    "Geografi": ["Kartan – väderstreck","Kartan – Sverige, landskap och städer","Kartan – Norden","Naturtyper i Sverige","Väder och klimat i Sverige","Hav, sjöar och vattendrag"]
  }},
  5: { "Svenska": {
    "Läsning": ["Källkritik – fyra källkritiska kriterier","Analysera nyhetsartiklar","Skönlitteraturanalys – tema","Skönlitteraturanalys – miljö","Retoriska grepp – ethos, pathos, logos","Läsa och förstå poesi","Jämföra olika textperspektiv"],
    "Skrivning": ["Argumenterande text – för och emot","Reportage – struktur och språk","Insändare","Formell text – ansökan","Informell text – blogg","Källhänvisning och citat"],
    "Grammatik": ["Satsdelar – subjekt, predikat, objekt","Adjektivets komparation","Adverb – hur, när, var","Meningsbyggnad och variation"]
  }, "Matematik": {
    "Tal och räkning": ["Bråk – addition och subtraktion","Bråk – multiplikation","Decimaltal – de fyra räknesätten","Procent – vad är det?","Procent av ett värde","Negativa tal på tallinjen","Negativa tal – addition och subtraktion","Prioriteringsregler – PEMDAS"],
    "Geometri": ["Vinklar – mäta och rita","Vinkelsumma i triangel","Area av rektangel och kvadrat","Area av triangel","Area av parallellogram","Omkrets och area – blandade uppgifter"],
    "Statistik": ["Medelvärde","Median","Typvärde","Jämföra medelvärde, median, typvärde","Sannolikhet – grundbegrepp","Sannolikhet – enkla experiment"]
  }, "NO": {
    "Biologi": ["Cellen – delar och funktion","Djurcell vs växcell","Kroppens organ – hjärtat","Kroppens organ – lungorna","Kroppens organ – matsmältningen","Ekosystem – producenter och konsumenter","Näringskedjor och näringsnät","Fotosyntesen"],
    "Fysik": ["Kraft – vad är det?","Rörelse och hastighet","Friktion","Enkla maskiner","Elektricitet – krets och komponenter","Magnetism – grundbegrepp"],
    "Kemi": ["Ämnen och material – egenskaper","Fast, flytande och gasform","Blandningar och lösningar","Filtrering och destillation","Syror och baser i vardagen"]
  }, "SO": {
    "Historia": ["Medeltiden – feodalsamhället","Korsfararna","Pesten – digerdöden","Renässansen","Reformationen","Kolonisationen – orsaker och konsekvenser","Slavhandeln"],
    "Samhällskunskap": ["Demokrati – vad är det?","Sveriges riksdag","Hur en lag stiftas","Val och valdeltagande","Mänskliga rättigheter – FN","Barnkonventionen"]
  }},
  6: { "Svenska": {
    "Läsning": ["Kritisk läsning av nyhetsmedier","Analysera reklamspråk","Litteraturhistoria – antiken","Litteraturhistoria – medeltiden","Analys av berättarperspektiv","Analys av språkliga val och stil","Tema och budskap i skönlitteratur"],
    "Skrivning": ["Utredande text – struktur","Utredande text – källhantering","Debattartikel – argument och motargument","Krönika","Berättartekniker – inre monolog","Berättartekniker – dialog","Formell skriftlig kommunikation"],
    "Grammatik": ["Nominalfras och verbalfras","Aktiv och passiv sats","Satsadverbial","Stilistik – ordval och meningslängd"]
  }, "Matematik": {
    "Tal och räkning": ["Procent och förändringsfaktor","Procentuell förändring","Rationella tal – addition och subtraktion","Rationella tal – multiplikation och division","Proportionalitet – direkt","Proportionalitet – invers","Skala och kartor"],
    "Algebra": ["Förenkla algebraiska uttryck","Lösa ekvationer med en obekant","Ekvationer med parenteser","Koordinatsystem – plotta punkter","Rita linjära funktioner","Tolka grafer"],
    "Geometri": ["Pythagoras sats – introduktion","Beräkna hypotenusa","Volymer – rätblock","Volymer – cylinder","Enhetsomvandlingar"]
  }, "Engelska": {
    "Grammatik": ["Konditionalis – typ 1","Konditionalis – typ 2","Passiv form i presens","Passiv form i preteritum","Modala hjälpverb – can, could, may","Modala hjälpverb – must, should, might","Relativa bisatser – who, which, that"],
    "Kommunikation": ["Muntlig presentation – struktur","Skriva formella texter","Diskutera åsikter på engelska","Engelska i media – analysera en artikel","Engelska idiom och fraser"]
  }, "Spanska": {
    "Kommunikation": ["Presentera sig – namn, ålder, ursprung","Hälsningsfraser och artighetsfraser","Beskriva familjemedlemmar","Berätta om sin dag","Beställa mat och dryck","Fråga om vägen","Handla – priser och antal"],
    "Grammatik": ["Substantiv – genus (masculino/femenino)","Artiklar – el, la, los, las","Presens av ser och estar","Presens av tener och hacer","Presens av regelbundna -ar verb","Presens av regelbundna -er och -ir verb","Adjektiv – kongruens och placering","Frågeord – qué, cómo, cuándo, dónde"]
  }, "Franska": {
    "Kommunikation": ["Hälsningar och presentationer","Berätta om sig själv","Siffror, datum och tid","Beskriva familj och hem","Fråga om och beskriva vägen","Beställa på café eller restaurang","Handla – kläder och mat"],
    "Grammatik": ["Artiklar – un/une, le/la/les","Presens av être","Presens av avoir","Presens av -er verb","Adjektivets böjning och placering","Negation – ne…pas","Frågebildning – est-ce que och inversion"]
  }, "Tyska": {
    "Kommunikation": ["Hälsa och presentera sig","Berätta om familjen","Beskriva sitt hem och sin skola","Frågor och svar i vardagen","Tala om mat och måltider","Ge och förstå enkla instruktioner","Berätta om fritidsintressen"],
    "Grammatik": ["Substantiv och genus (der/die/das)","Personliga pronomen","Presens av sein och haben","Presens av regelbundna verb","Presens av starka verb","Nominativ och ackusativ","Negation – nicht och kein"]
  }, "NO": {
    "Biologi": ["Genetik – DNA och arv","Dominant och recessiv egenskap","Ärftlighet och miljö","Evolution – naturligt urval","Artbegreppet"],
    "Fysik": ["Ljud – vågor och frekvens","Ljus – reflektion och refraktion","Energiformer","Energiomvandlingar","Effekt och energi – beräkningar"],
    "Kemi": ["Periodiska systemet – uppbyggnad","Metaller och ickemetaller","Syror – pH och egenskaper","Baser – pH och egenskaper","Neutralisation"]
  }, "SO": {
    "Historia": ["Franska revolutionen – orsaker","Franska revolutionen – förlopp","Napoleontiden","Industrialiseringens framväxt","Imperialismen – motiv och konsekvenser"],
    "Geografi": ["Jordens resurser – vatten","Jordens resurser – energi","Jordens resurser – mineraler","Befolkningstillväxt och befolkningsfördelning","Migration – orsaker och mönster","Urbanisering"]
  }},
  7: { "Svenska": {
    "Läsning": ["Modernistisk lyrik – analys","Epik – romanen som genre","Dramatik – pjäsens uppbyggnad","Retorisk analys – appelformer","Analysera språk och makt","Postkolonial läsning av text"],
    "Skrivning": ["Vetenskaplig rapport – IMRaD","Krönika – personlig röst","Litterär essä","Argumenterande tal","Källkritik och källhänvisning – fördjupning"]
  }, "Matematik": {
    "Algebra": ["Linjära funktioner – k och m","Rita och tolka linjära funktioner","Bestämma ekvation för en linje","Linjära ekvationssystem – grafisk lösning","Linjära ekvationssystem – algebraisk lösning","Andragradsekvationer – introduktion"],
    "Statistik": ["Frekvenstabeller och histogram","Lådagram","Spridningsmått – variationsbredd","Normalfördelning – introduktion","Korrelation och regression – introduktion","Kritisk granskning av statistik"]
  }, "Engelska": {
    "Litteratur": ["Läsa engelskspråkig skönlitteratur","Analysera karaktärer och tema","Analysera språk och stil","Jämföra två texter","Engelskspråkig poesi – analys"],
    "Kommunikation": ["Debatt på engelska – struktur","Akademiskt skrivande – introduktion","Källhantering på engelska","Engelska i yrkeslivet","Presentationsteknik på engelska"]
  }, "Spanska": {
    "Kommunikation": ["Beskriva rutiner och vanor","Berätta om fritidsintressen","Handla och pruta","Berätta om en upplevelse","Diskutera kultur och traditioner","Skriva ett personligt brev","Förstå och sammanfatta en enkel spansk text"],
    "Grammatik": ["Preteritum – regelrätta -ar verb","Preteritum – regelrätta -er/-ir verb","Preteritum – oregelbundna verb (ser, ir, hacer)","Reflexiva verb – presentera sig och rutiner","Direkt objektspronomen","Jämförelse med más/menos que","Prepositioner – en, de, con, por, para"]
  }, "Franska": {
    "Kommunikation": ["Berätta om sin dag och sina rutiner","Handla och äta ute","Beskriva en resa","Skriva ett vykort eller ett mejl","Förstå och sammanfatta en enkel fransk text","Diskutera film och musik"],
    "Grammatik": ["Passé composé med avoir","Passé composé med être","Oregelbundna particip","Negation – ne…jamais, ne…rien","Frågeord och frågebildning – fördjupning","Possessiva pronomen","Jämförelse – plus, moins, aussi"]
  }, "Tyska": {
    "Kommunikation": ["Berätta om skola och schema","Diskutera mat och favoriträtter","Planera och föreslå aktiviteter","Beskriva en resa eller utflykt","Skriva ett mejl eller brev","Förstå enkel tysk text och sammanfatta"],
    "Grammatik": ["Dativ – introduktion","Dativ med prepositioner","Modala hjälpverb – können, müssen, wollen","Perfekt med haben","Perfekt med sein","Ordföljd i bisatser","Imperativ"]
  }, "Fysik": {
    "Mekanik": ["Newtons första lag","Newtons andra lag – F=ma","Newtons tredje lag","Rörelsemängd och impuls","Arbete och energi","Effekt"],
    "Elektricitet": ["Seriekoppling","Parallellkoppling","Ohms lag","Effekt i elektriska kretsar","Magnetfält kring ledare","Elektromagnetisk induktion – introduktion"]
  }, "Kemi": {
    "Organisk kemi": ["Kolkedjor – alkaner","Alkener och alkyner","Funktionella grupper","Förbränningsreaktioner","Polymerer – introduktion"],
    "Kvantitativ kemi": ["Molbegreppet","Molmassa","Reaktionslikvationer – balansering","Beräkningar med mol","Koncentration och lösningar"]
  }, "Historia": {
    "Modern historia": ["Industrialismens framväxt i England","Industrialismens spridning till Sverige","Arbetarrörelsen","Första världskriget – orsaker","Första världskriget – förlopp och konsekvenser","Mellankrigstiden och demokratins kris"]
  }, "Samhällskunskap": {
    "Politik": ["Sveriges statsskick – maktdelning","Riksdag, regering och statschef","Kommuner och regioner","EU – uppbyggnad och beslutsprocess","FN och internationella organisationer","Demokrati vs auktoritära system"]
  }},
  8: { "Svenska": {
    "Läsning": ["Postkolonial litteraturanalys","Feministisk litteraturanalys","Diskursanalys – vad är diskurs?","Analysera ideologi i text","Mediekritik – ägarskap och påverkan"],
    "Skrivning": ["Akademisk essä – argumentation","Litterär analys – fördjupning","Vetenskaplig rapport – fördjupning","Akademiskt språk och stil","Referera och citera korrekt"]
  }, "Matematik": {
    "Algebra": ["Andragradsekvationer – lösningsformel","Andragradsekvationer – faktorisering","Andragradsfunktioner – parabeln","Exponentialfunktioner – tillväxt","Exponentialfunktioner – avklingning","Logaritmer – introduktion"],
    "Geometri": ["Trigonometri – sinus, cosinus, tangens","Beräkna sidor och vinklar","Vektorer – addition och subtraktion","Vektorer – skalärprodukt","Bevisföring i geometri"]
  }, "Engelska": {
    "Grammatik": ["Tempus – alla former i översikt","Perfekt och pluperfekt","Konditionalis – typ 3","Konjunktioner och bisatser – fördjupning","Nominalfraser och inskjutna satser"],
    "Kommunikation": ["Argumenterande tal – fördjupning","Engelska i media – kritisk analys","Engelska i vetenskapliga texter","Interkulturell kommunikation"]
  }, "Spanska": {
    "Kommunikation": ["Diskutera åsikter om samhällsfrågor","Argumentera och övertala","Beskriva känslor och relationer","Förstå och analysera spansk tidningsartikel","Skriva en argumenterande text","Presentera ett ämne muntligt på spanska"],
    "Grammatik": ["Imperfecto – regelbundna verb","Imperfecto – oregelbundna verb","Preteritum vs imperfecto","Subjunktiv presens – introduktion","Subjunktiv efter önskeverb","Indirekt tal","Passiv konstruktion – ser + participio"]
  }, "Franska": {
    "Kommunikation": ["Diskutera samhällsfrågor på franska","Argumentera för en ståndpunkt","Beskriva dåtid och minnen","Skriva ett formellt brev","Förstå och analysera fransk tidningstext","Presentera ett ämne muntligt"],
    "Grammatik": ["Imparfait – bildning och användning","Imparfait vs passé composé","Futur simple","Konditionalis – konditionnel présent","Pronomen – COD och COI","Subjonctif – introduktion","Passiv konstruktion"]
  }, "Tyska": {
    "Kommunikation": ["Diskutera aktuella händelser","Argumentera för en ståndpunkt","Beskriva och jämföra dåtida händelser","Förstå och sammanfatta tysk tidningstext","Skriva ett formellt brev eller mejl","Presentera ett ämne på tyska"],
    "Grammatik": ["Genitiv – form och användning","Genitiv med prepositioner","Temporala konjunktioner – als, wenn, während","Kausala och koncessiva konjunktioner","Pluskvamperfekt","Konjunktiv II – introduktion","Passiv i presens och preteritum"]
  }, "Fysik": {
    "Termodynamik": ["Temperatur och värme – skillnad","Specifik värmekapacitet","Termodynamikens första lag","Termodynamikens andra lag – entropi","Värmeöverföring – ledning, konvektion, strålning"],
    "Modern fysik": ["Relativitetsteorin – tid och rum","E=mc²","Fotoelektriska effekten","Kvantmekanik – vågpartikeldualitet","Atommodeller – historik"]
  }, "Kemi": {
    "Elektrokemi": ["Galvaniska celler – uppbyggnad","Elektrodpotential","Elektrolys – princip","Elektrolys – beräkningar","Korrosion och korrosionsskydd"],
    "Biokemi": ["Aminosyror och proteiner","Enzymers funktion","Kolhydrater – struktur och funktion","Lipider","Metabolism – katabolism och anabolism"]
  }},
  9: { "Svenska": {
    "Läsning": ["Litteratur och samhällskritik","Argumentationsanalys – fördjupning","Analysera retoriska strategier","Jämförande litteraturanalys","Textanalys inför nationellt prov"],
    "Skrivning": ["Nationella provets skrivuppgifter","Argumenterande text – avancerad","Utredande text – avancerad","Vetenskaplig rapport – självständig","Revisions- och responsteknik"]
  }, "Matematik": {
    "Algebra": ["Polynomekvationer – faktorisering","Rationella uttryck – förenkling","Rationella ekvationer","Komplexa tal – introduktion","Komplexa tal – räkning"],
    "Analys": ["Gränsvärden – introduktion","Derivata – definition","Derivata – räkningsregler","Derivata – tillämpningar","Integraler – introduktion","Integraler – beräkning av area"]
  }, "Engelska": {
    "Fördjupning": ["Litterär analys på engelska – avancerad","Akademisk engelska – uppsatsstruktur","Kritisk analys av engelska medier","Engelska i vetenskapliga sammanhang","Jämföra engelskspråkiga kulturer"],
    "Kommunikation": ["Förhandling och argumentation på engelska","Engelska i yrkeslivet","Presentationsteknik – avancerad","Engelska i internationella sammanhang"]
  }, "Spanska": {
    "Kommunikation": ["Debatt och retorik på spanska","Analysera spanskspråkig litteratur","Förstå och diskutera spanska filmer","Yrkesliv och framtidsplaner på spanska","Presentera och försvara en ståndpunkt","Skriva en analytisk text på spanska"],
    "Grammatik": ["Subjunktiv i temporal bisats","Subjunktiv i relativ bisats","Konditionalis – si-satser","Passiv med se","Avancerade prepositionskonstruktioner","Stilistik och register på spanska"]
  }, "Franska": {
    "Kommunikation": ["Debatt och argumentation på franska","Analysera franskspråkig litteratur","Diskutera samhälls- och kulturfrågor","Formellt och informellt register","Skriva analytisk text på franska","Presentera och försvara ett ämne"],
    "Grammatik": ["Subjonctif présent – fördjupning","Subjonctif passé","Konditionalis – hypotetiska satser","Passiv – alla tempus","Particip – présent och passé","Avancerad meningsbyggnad och stilistik"]
  }, "Tyska": {
    "Kommunikation": ["Debatt och muntlig argumentation på tyska","Analysera tyskt litterärt verk","Diskutera samhällsfrågor på tyska","Yrkeskommunikation och formellt språk","Presentera och försvara ett ämne","Skriva analytisk text på tyska"],
    "Grammatik": ["Konjunktiv II – hypotetiska satser","Konjunktiv II i konditionala satser","Passiv i alla tempus","Infinitivkonstruktioner – zu + infinitiv","Avancerad satsbyggnad","Stilistik och register på tyska"]
  }, "Fysik": {
    "Kärnfysik": ["Atomkärnan – protoner och neutroner","Radioaktivitet – alfa, beta, gamma","Halveringstid","Fission – principen","Fusion – principen","Kärnkraft – för och emot"],
    "Astrofysik": ["Stjärnors uppkomst","Stjärnors liv – HR-diagrammet","Supernovor och svarta hål","Solsystemets uppbyggnad","Kosmologi – Big Bang","Mörk materia och mörk energi"]
  }, "Kemi": {
    "Industriell kemi": ["Haber-processen – ammoniak","Kontaktprocessen – svavelsyra","Polymerer – addition och kondensation","Plast och miljöpåverkan","Industriell katalys"],
    "Miljökemi": ["Växthuseffekten – kemi bakom","Koldioxid och kolcykeln","Försurning av hav och mark","Ozon och ozonnedbrytning","Miljögifter och bioackumulering"]
  }, "Historia": {
    "Samtidshistoria": ["Andra världskriget – orsaker","Förintelsen","Kalla kriget – blocken och kapplöpningen","Avkolonisering","Globaliseringen – ekonomi och kultur","Nutida konflikter och geopolitik"]
  }, "Samhällskunskap": {
    "Globala frågor": ["Klimatpolitik – Paris-avtalet","Hållbar utveckling – Agenda 2030","Migration och flyktingpolitik","Global fattigdom och ojämlikhet","Demokratins utmaningar idag","Digitalisering och samhälle"]
  }}
};

const STEG_IKONER = ["🌱","🌿","🌳","🏆"];
const STEG_FARG = ["#1b5e20","#2e7d32","#388e3c","#43a047"];

function buildLesson(grade, subject, area, chapter, numLevels, variant = 0) {
  const v = variant % 3;
  const forberedelse = [
    [`Skriv "${chapter}" på tavlan – fråga: "Vad tror ni detta handlar om?"`, `Aktivera förkunskaper – låt elever diskutera i par i 1 minut`, `Presentera lektionsmålet tydligt för hela klassen`],
    [`Starta med en kort film eller bild kopplad till "${chapter}"`, `Låt elever skriva ner vad de redan vet – dela sedan i grupp`, `Formulera gemensamt en fråga ni ska besvara under lektionen`],
    [`Börja med ett problemscenario kopplat till ${chapter}`, `Pararbete: diskutera vad ni tror svaret är innan genomgången`, `Samla hypoteser på tavlan – återkom till dem i slutet`]
  ][v];

  const grundMoment = [
    [`Förklara begreppet med enkla ord och ett tydligt vardagsexempel`, `Visa steg-för-steg med visuellt stöd – tavla, bild eller konkret material`, `Kontrollera att alla hänger med: "Räck upp handen om du förstår så här långt"`],
    [`Använd ett konkret föremål eller demonstration för att introducera begreppet`, `Rita eller skriv upp begreppet tillsammans med klassen`, `Ställ enkla kontrollfrågor: "Vad betyder det här? Vad ser ni?"`],
    [`Starta med ett problem eleverna känner igen från vardagen`, `Guided practice: lös ett enkelt exempel tillsammans steg för steg`, `Låt elever upprepa förklaringen med egna ord till en kompis`]
  ][v];
  const mellanMoment = [
    [`Koppla begreppet till vad eleverna redan kan från tidigare lektioner`, `Presentera 2–3 varierade exempel med stigande svårighetsgrad`, `Låt elever lösa ett exempel självständigt – jämför sedan med en partner`],
    [`Visa samma begrepp på två sätt – låt klassen jämföra och diskutera`, `Grupparbete: lös ett problem och presentera lösningen`, `Gemensam rättning och diskussion av vanliga misstag`],
    [`Starta med enklare variant, bygg gradvis till svårare`, `Pararbete: en förklarar, en lyssnar – byt roller`, `Koppla till ett aktuellt ämne eller nyhet klassen känner till`]
  ][v];
  const avanceratMoment = [
    [`Presentera ett utmanande exempel – "Vad händer om vi ändrar förutsättningarna?"`, `Koppla till andra ämnen eller verkliga tillämpningar`, `Uppmuntra elever att formulera egna frågor kring ämnet`],
    [`Ge ett öppet problem med flera möjliga lösningar`, `Diskutera gränsfall och undantag: "När fungerar detta inte?"`, `Låt elever designa en egen uppgift baserad på det de lärt sig`],
    [`Utmana med ett dilemma eller paradox kopplad till ämnet`, `Debatt: två motstridiga ståndpunkter – vem har rätt och varför?`, `Reflektera: "Vad visste du inte förut? Vad vill du lära dig mer om?"`]
  ][v];

  const stegKonfig = {
    2: [
      { rubrik:"Del 1 – Gemensam grund", ikon:STEG_IKONER[0], farg:STEG_FARG[0], beskrivning:"Hela klassen börjar tillsammans. Bygg en trygg och tydlig grund som alla kan följa.", moment:grundMoment, fraga:`"Kan du förklara vad ${chapter.split(" ")[0]} betyder med egna ord?"`, signal:"När de flesta kan ge ett eget exempel – gå vidare." },
      { rubrik:"Del 2 – Fördjupning och tillämpning", ikon:STEG_IKONER[2], farg:STEG_FARG[2], beskrivning:"Komplexiteten ökar. Elever som behöver mer tid stannar kvar vid grunduppgifterna, övriga utmanas vidare.", moment:[...mellanMoment.slice(0,2), avanceratMoment[0]], fraga:`"Vad händer om vi ändrar en förutsättning? Kan du hitta ett eget exempel?"`, signal:"Cirkulera och ge individuell återkoppling." }
    ],
    3: [
      { rubrik:"Del 1 – Gemensam introduktion", ikon:STEG_IKONER[0], farg:STEG_FARG[0], beskrivning:"Hela klassen samlas. Konkret och tydlig start.", moment:grundMoment, fraga:`"Vad är det viktigaste du förstår nu?"`, signal:"Gå vidare när majoriteten visar grundförståelse." },
      { rubrik:"Del 2 – Gemensam fördjupning", ikon:STEG_IKONER[1], farg:STEG_FARG[1], beskrivning:"Variera exempel och låt elever tillämpa kunskapen.", moment:mellanMoment, fraga:`"Hur skulle du förklara detta för någon som aldrig hört om det?"`, signal:"Elever som behöver stanna övar på grunduppgifter. Resten fortsätter." },
      { rubrik:"Del 3 – Utmaning och analys", ikon:STEG_IKONER[2], farg:STEG_FARG[2], beskrivning:"De som är redo utmanas med öppna frågor och analys.", moment:avanceratMoment, fraga:`"Var finns gränserna – när fungerar detta inte?"`, signal:"Alla elever välkomnas att lyssna och bidra på sin nivå." }
    ],
    4: [
      { rubrik:"Del 1 – Gemensam introduktion", ikon:STEG_IKONER[0], farg:STEG_FARG[0], beskrivning:"Konkret och tydlig start för hela klassen.", moment:grundMoment, fraga:`"Kan du förklara begreppet med egna ord?"`, signal:"Gå vidare när alla har en grundläggande förståelse." },
      { rubrik:"Del 2 – Koppling och variation", ikon:STEG_IKONER[1], farg:STEG_FARG[1], beskrivning:"Koppla till tidigare kunskaper, variera exemplen.", moment:mellanMoment.slice(0,2), fraga:`"Vilket exempel tycker du är tydligast och varför?"`, signal:"Elever på grundnivå fortsätter öva här." },
      { rubrik:"Del 3 – Tillämpning", ikon:STEG_IKONER[2], farg:STEG_FARG[2], beskrivning:"Tillämpa i mer komplexa sammanhang.", moment:[mellanMoment[2], avanceratMoment[0]], fraga:`"Hur kan du använda detta utanför skolan?"`, signal:"Låt elever som är klara börja formulera egna frågor." },
      { rubrik:"Del 4 – Fördjupning och analys", ikon:STEG_IKONER[3], farg:STEG_FARG[3], beskrivning:"Öppna problem och analytiska frågor för de som är redo.", moment:avanceratMoment.slice(1), fraga:`"Om du skulle forska vidare – vad hade din fråga varit?"`, signal:"Skapa utrymme för självständigt arbete och egna slutsatser." }
    ]
  };

  const avslutning = [
    [`Samla klassen – summera de viktigaste punkterna tillsammans`, `"Exit ticket": varje elev skriver en sak de lärt sig och en fråga de har`, `Förhandsgranska nästa lektion kort`],
    [`Gemensam reflektion: "Vad var svårast? Vad var mest intressant?"`, `Låt 2–3 elever dela sin exit ticket högt`, `Koppla tillbaka till hypoteserna från lektionens start`],
    [`Pararbete: berätta för varandra vad ni tar med er`, `Läraren sammanfattar och lyfter det viktigaste`, `Kort förblick: "Nästa lektion bygger vi vidare på detta…"`]
  ][v];

  const tips = [
    [`Börja alltid med konkreta exempel – abstraktionen kommer senare`, `Använd pararbete under genomgången för att hålla alla aktiva`, `Cirkulera och ge individuell återkoppling under övningstiden`],
    [`Visa ditt eget resonemang högt – sänker tröskeln för alla`, `Låt elever förklara för varandra – peer teaching befäster kunskapen`, `Bygg in reflektionsstopp var 10:e minut: "Vad förstår ni? Vad är oklart?"`],
    [`Planera naturliga pauspunkter där elever kan stanna kvar eller gå vidare`, `Avancerade elever kan fungera som resurspersoner diskret`, `Samla upp frågor löpande – de ger värdefull formativ information`]
  ][v];

  return { meta: { grade, subject, area, chapter, numLevels }, forberedelse, steg: stegKonfig[numLevels], avslutning, tips };
}

export default function LektionsGuiden() {
  const [step, setStep] = useState(1);
  const [grade, setGrade] = useState(null);
  const [subject, setSubject] = useState(null);
  const [area, setArea] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [customChapter, setCustomChapter] = useState("");
  const [numLevels, setNumLevels] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [variant, setVariant] = useState(0);

  const grades = Object.keys(DATA).map(Number);
  const subjects = grade ? Object.keys(DATA[grade] || {}) : [];
  const areas = grade && subject ? Object.keys(DATA[grade]?.[subject] || {}) : [];
  const chapters = grade && subject && area ? DATA[grade]?.[subject]?.[area] || [] : [];

  const activeChapter = customChapter.trim() || chapter;

  function generate(v = 0) {
    setLesson(buildLesson(grade, subject, area, activeChapter, numLevels, v));
    setVariant(v);
    setStep(5);
  }

  function reset() {
    setStep(1); setGrade(null); setSubject(null); setArea(null);
    setChapter(null); setCustomChapter(""); setNumLevels(null); setLesson(null);
  }

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#e8f5e9 0%,#f1f8e9 40%,#e0f2f1 100%)",fontFamily:"Georgia,serif",padding:"1.5rem 1rem"}}>
      <style>{`
        .cbtn{transition:all .18s;border:2px solid #a5d6a7;background:white;border-radius:12px;padding:.65rem .9rem;cursor:pointer;font-family:Georgia,serif;font-size:.88rem;color:#1a3a2a;text-align:left;width:100%}
        .cbtn:hover{border-color:#2e7d32;background:#f1f8e9;transform:translateY(-1px);box-shadow:0 3px 12px rgba(46,125,50,.12)}
        .cbtn.on{border-color:#2e7d32;background:#e8f5e9;font-weight:700}
        .lvlbtn{transition:all .18s;border:2px solid #a5d6a7;background:white;border-radius:12px;padding:.8rem 1.2rem;cursor:pointer;font-family:Georgia,serif;font-size:.92rem;color:#1a3a2a;text-align:left;width:100%}
        .lvlbtn:hover{border-color:#2e7d32;background:#f1f8e9}
        .lvlbtn.on{border-color:#2e7d32;background:#e8f5e9;font-weight:700}
        .gbtn{background:linear-gradient(135deg,#2e7d32,#1b5e20);color:white;border:none;border-radius:50px;padding:.85rem 2.2rem;font-size:1rem;font-family:Georgia,serif;font-weight:700;cursor:pointer;transition:all .2s;box-shadow:0 4px 16px rgba(46,125,50,.3)}
        .gbtn:hover{transform:translateY(-2px);box-shadow:0 6px 22px rgba(46,125,50,.4)}
        .gbtn:disabled{opacity:.4;cursor:not-allowed;transform:none}
        .gbtn.sec{background:linear-gradient(135deg,#78909c,#546e7a)}
        .ftxt{width:100%;border:2px solid #a5d6a7;border-radius:12px;padding:.75rem 1rem;font-family:Georgia,serif;font-size:.92rem;color:#1a3a2a;outline:none;box-sizing:border-box;resize:vertical;transition:border-color .18s}
        .ftxt:focus{border-color:#2e7d32}
        @keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .fi{animation:fi .35s ease}
        ul{padding-left:1.3rem;margin:.3rem 0}
        li{margin-bottom:.35rem;line-height:1.6;color:#1a2e1a}
      `}</style>

      <div style={{textAlign:"center",marginBottom:"2rem"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:".5rem",marginBottom:".3rem"}}>
          <span style={{fontSize:"1.8rem"}}>🌿</span>
          <h1 style={{fontSize:"2rem",color:"#1b5e20",margin:0,fontWeight:700}}>LektionsGuiden</h1>
        </div>
        <p style={{color:"#4a7c59",fontSize:".9rem",margin:0}}>Differentierade genomgångar · Lgr22</p>
      </div>

      <div style={{maxWidth:660,margin:"0 auto"}}>

        {step === 1 && (
          <div className="fi" style={{background:"white",borderRadius:20,padding:"1.8rem",boxShadow:"0 4px 20px rgba(46,125,50,.08)"}}>
            <h2 style={{color:"#1a3a2a",marginTop:0,fontSize:"1.2rem"}}>Välj klass</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:".6rem",marginBottom:"1rem"}}>
              {grades.map(g => <button key={g} className={`cbtn${grade===g?" on":""}`} onClick={() => { setGrade(g); setSubject(null); setArea(null); setChapter(null); setCustomChapter(""); }}>Klass {g}</button>)}
            </div>

            {grade && (<>
              <h2 style={{color:"#1a3a2a",fontSize:"1.1rem",marginTop:"1.2rem"}}>Välj ämne</h2>
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:".6rem",marginBottom:"1rem"}}>
                {subjects.map(s => <button key={s} className={`cbtn${subject===s?" on":""}`} onClick={() => { setSubject(s); setArea(null); setChapter(null); setCustomChapter(""); }}>{s}</button>)}
              </div>
            </>)}

            {subject && (<>
              <h2 style={{color:"#1a3a2a",fontSize:"1.1rem",marginTop:"1.2rem"}}>Välj område</h2>
              <div style={{display:"grid",gap:".5rem",marginBottom:"1rem"}}>
                {areas.map(a => <button key={a} className={`cbtn${area===a?" on":""}`} onClick={() => { setArea(a); setChapter(null); setCustomChapter(""); }}>{a}</button>)}
              </div>
            </>)}

            {area && (<>
              <h2 style={{color:"#1a3a2a",fontSize:"1.1rem",marginTop:"1.2rem"}}>Välj kapitel / lektion</h2>
              <div style={{display:"grid",gap:".4rem",marginBottom:"1rem",maxHeight:260,overflowY:"auto",paddingRight:4}}>
                {chapters.map(c => (
                  <button key={c} className={`cbtn${chapter===c&&!customChapter?" on":""}`} onClick={() => { setChapter(c); setCustomChapter(""); }}>
                    📖 {c}
                  </button>
                ))}
              </div>

              <div style={{borderTop:"2px dashed #c8e6c9",paddingTop:"1rem",marginTop:".5rem"}}>
                <p style={{color:"#2e7d32",fontWeight:700,fontSize:".9rem",margin:"0 0 .5rem"}}>✏️ Eller skriv eget kapitel / lektionsinnehåll</p>
                <textarea
                  className="ftxt"
                  rows={3}
                  placeholder={`T.ex. "Adjektivets komparation – övningar från s. 47" eller "Repetition inför prov på multiplikationstabellen"`}
                  value={customChapter}
                  onChange={e => { setCustomChapter(e.target.value); if(e.target.value) setChapter(null); }}
                />
                {customChapter.trim() && (
                  <p style={{color:"#4a7c59",fontSize:".8rem",margin:".4rem 0 0",fontStyle:"italic"}}>✅ Genomgången anpassas till: "{customChapter.trim()}"</p>
                )}
              </div>
            </>)}

            {activeChapter && (
              <div style={{textAlign:"right",marginTop:"1.5rem"}}>
                <button className="gbtn" onClick={() => setStep(2)}>Nästa →</button>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="fi" style={{background:"white",borderRadius:20,padding:"1.8rem",boxShadow:"0 4px 20px rgba(46,125,50,.08)"}}>
            <h2 style={{color:"#1a3a2a",marginTop:0,fontSize:"1.2rem"}}>Hur många kunskapsnivåer finns i klassen?</h2>
            <p style={{color:"#4a7c59",fontSize:".88rem",marginBottom:"1.2rem"}}>Genomgången blir ett sammanhängande flöde från enkel till avancerad.</p>
            <div style={{display:"flex",flexDirection:"column",gap:".7rem",marginBottom:"1.5rem"}}>
              {[{n:2,desc:"Två steg – grund och fördjupning"},{n:3,desc:"Tre steg – introduktion, fördjupning, analys"},{n:4,desc:"Fyra steg – gradvis från grund till avancerad"}].map(({n,desc}) => (
                <button key={n} className={`lvlbtn${numLevels===n?" on":""}`} onClick={() => setNumLevels(n)}>
                  <strong>{n} nivåer</strong> <span style={{fontSize:".82rem",opacity:.75,marginLeft:".4rem"}}>{desc}</span>
                </button>
              ))}
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <button className="gbtn sec" onClick={() => setStep(1)}>← Tillbaka</button>
              <button className="gbtn" disabled={!numLevels} onClick={() => generate(0)}>✨ Skapa genomgång</button>
            </div>
          </div>
        )}

        {step === 5 && lesson && (
          <div className="fi">
            <div style={{background:"#2e7d32",borderRadius:14,padding:"1rem 1.4rem",marginBottom:"1rem",display:"flex",flexWrap:"wrap",gap:".4rem",alignItems:"center"}}>
              <span style={{color:"white",fontSize:".82rem",opacity:.85}}>Klass {lesson.meta.grade}</span>
              <span style={{color:"#a5d6a7"}}>·</span>
              <span style={{color:"white",fontSize:".82rem",opacity:.85}}>{lesson.meta.subject}</span>
              <span style={{color:"#a5d6a7"}}>·</span>
              <span style={{color:"white",fontSize:".95rem",fontWeight:700}}>{lesson.meta.chapter}</span>
              <span style={{color:"#a5d6a7"}}>·</span>
              <span style={{color:"#c8e6c9",fontSize:".82rem"}}>{lesson.meta.numLevels} nivåer</span>
            </div>

            <div style={{background:"white",borderRadius:16,padding:"1.4rem",boxShadow:"0 3px 16px rgba(46,125,50,.07)",marginBottom:"1rem"}}>
              <h3 style={{color:"#1a3a2a",marginTop:0,fontSize:"1.05rem",borderBottom:"2px solid #c8e6c9",paddingBottom:"6px"}}>📋 Förberedelse – aktivera förkunskaper (5 min)</h3>
              <ul>{lesson.forberedelse.map((p,i) => <li key={i}>{p}</li>)}</ul>
            </div>

            <div style={{background:"white",borderRadius:16,padding:"1.4rem",boxShadow:"0 3px 16px rgba(46,125,50,.07)",marginBottom:"1rem"}}>
              <h3 style={{color:"#1a3a2a",marginTop:0,fontSize:"1.05rem",borderBottom:"2px solid #c8e6c9",paddingBottom:"6px"}}>📈 Genomgång – sammanhängande flöde</h3>
              <p style={{color:"#4a7c59",fontSize:".85rem",marginBottom:"1.2rem"}}>Hela klassen följer samma genomgång. Komplexiteten ökar gradvis – elever arbetar vidare på den nivå som passar dem.</p>
              {lesson.steg.map((steg, i) => (
                <div key={i} style={{borderLeft:`4px solid ${steg.farg}`,paddingLeft:"1rem",marginBottom:"1.4rem"}}>
                  <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:".4rem"}}>
                    <span style={{fontSize:"1.2rem"}}>{steg.ikon}</span>
                    <strong style={{color:steg.farg,fontSize:".98rem"}}>{steg.rubrik}</strong>
                  </div>
                  <p style={{margin:"0 0 .6rem",color:"#1a2e1a",fontSize:".87rem",fontStyle:"italic"}}>{steg.beskrivning}</p>
                  <ul style={{marginBottom:".6rem"}}>{steg.moment.map((m,j) => <li key={j} style={{fontSize:".88rem"}}>{m}</li>)}</ul>
                  <div style={{background:"#f1f8e9",borderRadius:8,padding:".5rem .8rem",marginBottom:".4rem"}}>
                    <span style={{fontSize:".78rem",color:"#2e7d32",fontWeight:700}}>❓ Fråga att ställa: </span>
                    <span style={{fontSize:".84rem",color:"#1a2e1a",fontStyle:"italic"}}>{steg.fraga}</span>
                  </div>
                  <div style={{background:"#fff8e1",borderRadius:8,padding:".5rem .8rem"}}>
                    <span style={{fontSize:".78rem",color:"#f57f17",fontWeight:700}}>⏭ Signal att gå vidare: </span>
                    <span style={{fontSize:".84rem",color:"#1a2e1a"}}>{steg.signal}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:"white",borderRadius:16,padding:"1.4rem",boxShadow:"0 3px 16px rgba(46,125,50,.07)",marginBottom:"1rem"}}>
              <h3 style={{color:"#1a3a2a",marginTop:0,fontSize:"1.05rem",borderBottom:"2px solid #c8e6c9",paddingBottom:"6px"}}>🔄 Gemensam avslutning (5 min)</h3>
              <ul>{lesson.avslutning.map((p,i) => <li key={i}>{p}</li>)}</ul>
            </div>

            <div style={{background:"#e8f5e9",borderRadius:16,padding:"1.4rem",marginBottom:"1.5rem",border:"1px solid #c8e6c9"}}>
              <h3 style={{color:"#1a3a2a",marginTop:0,fontSize:"1.05rem"}}>💡 Tips till läraren</h3>
              <ul>{lesson.tips.map((t,i) => <li key={i}>{t}</li>)}</ul>
            </div>

            <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap",paddingBottom:"2rem"}}>
              <button className="gbtn sec" onClick={reset}>🔄 Ny genomgång</button>
              <button className="gbtn" onClick={() => generate(variant + 1)}>✨ Variera genomgång</button>
            </div>
          </div>
        )}
      </div>
      <p style={{textAlign:"center",color:"#a5d6a7",fontSize:".75rem",marginTop:"2rem"}}>LektionsGuiden · Lgr22 · Differentierad undervisning</p>
    </div>
  );
}
