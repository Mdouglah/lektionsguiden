import { useState } from "react";

const DATA = {
  1: {
    "Svenska": {
      "Bokstäver och ljud": ["Vokaler: a, e, i, o, u","Konsonanter och deras ljud","Korta och långa vokaler","Bokstavsordningen – alfabetet","Versaler och gemener","Skriv och forma bokstäver"],
      "Läsning": ["Ordbilder – vanliga korta ord","Läsa enkla meningar med stöd","Läsförståelse med bilder","Rim och ramsor","Para ihop ord och bild","Läsa högt i par"],
      "Skrivning": ["Skriva sitt förnamn","Skriva enkla ord","Skriva en enkel mening","Stor bokstav i meningsbörjan","Punkt i slutet av mening","Mellanrum mellan ord"]
    },
    "Matematik": {
      "Tal och räkning": ["Räkna föremål 1–5","Räkna föremål 1–10","Skriva siffror 0–10","Räkna framåt från valfritt tal","Räkna bakåt från 10","Addition till 5","Addition till 10","Subtraktion till 5"],
      "Geometri": ["Känna igen cirkeln","Känna igen kvadraten","Känna igen triangeln","Sortera former","Jämföra storlekar"]
    },
    "Bild": {
      "Skapande": ["Rita med penna och kritor","Blanda färger – primärfärger","Måla med penslar","Klippa och klistra","Forma med lera"],
      "Bildanalys": ["Beskriva vad man ser i en bild","Berätta om egna bilder"]
    },
    "Musik": {
      "Musicerande": ["Sjunga enkla sånger","Rytm – klappa i takt","Enkla slagverksinstrument","Lyssna och röra sig till musik"],
      "Musikkunskap": ["Snabb och långsam musik","Hög och låg ton","Känna igen instrument"]
    },
    "Idrott och hälsa": {
      "Rörelse": ["Grundrörelser – springa, hoppa, kasta","Balans och koordination","Enkla lekar och rörelsesånger","Dans och rytmiska rörelser"],
      "Hälsa": ["Hygien och kroppskännedom","Varför vi rör på oss"]
    },
    "Slöjd": {
      "Textilslöjd": ["Trä ett nål","Enkelt broderi – rakt stygn","Sy för hand – enkel söm"],
      "Träslöjd": ["Känna igen material","Enkla konstruktioner med naturmaterial"]
    },
    "Teknik": {
      "Teknik i vardagen": ["Vad är teknik?","Enkla maskiner – hjul och hävstång","Konstruera med klossar","Material och egenskaper"]
    }
  },
  2: {
    "Svenska": {
      "Läsning": ["Läsa ord med dubbelteckning","Läsa ord med vokalkombinationer","Läsa berättande text","Hitta information i faktatexter","Förstå händelseförlopp","Läsa högt med flyt","Texttyper – berättelse och fakta"],
      "Skrivning": ["Skriva en berättelse","Skriva beskrivande text","Använda punkt och frågetecken","Sammanhängande meningar","Revidera och förbättra text"],
      "Grammatik": ["Substantiv","Verb","Adjektiv","Stor bokstav vid namn","Singular och plural"]
    },
    "Matematik": {
      "Tal och räkning": ["Talen 11–20","Talen 20–100","Tiokamrater","Addition utan uppställning till 20","Addition med uppställning till 100","Subtraktion till 20","Subtraktion med uppställning","Jämföra tal"],
      "Mätning": ["Mäta längd med linjal","Väga föremål","Klockan – hel och halv","Dagar, veckor, månader"]
    },
    "Engelska": {
      "Kommunikation": ["Hälsningsfraser","Färger och siffror","Djur och natur","Veckodagar och månader","Beskriv dig själv","Enkla frågor och svar"]
    },
    "Bild": {
      "Skapande": ["Teckna former och mönster","Måla med olika tekniker","Skapa med återvunnet material"],
      "Bildanalys": ["Beskriva färger och former i konst","Berätta om konstnärers bilder"]
    },
    "Musik": {
      "Musicerande": ["Sjunga i grupp","Spela enkla melodier – xylofon","Klappa rytmmönster"],
      "Musikkunskap": ["Musikens beståndsdelar","Musikstilar – klassiskt och nutida"]
    },
    "Idrott och hälsa": {
      "Rörelse": ["Bollspel – kasta och fånga","Simundervisning – vattenvana","Hinderbanor och stafetter"],
      "Hälsa": ["Kost och rörelse","Säkerhet vid lek"]
    },
    "Slöjd": {
      "Textilslöjd": ["Grundläggande sömnad","Enkla vävtekniker","Sy ett enkelt projekt"],
      "Träslöjd": ["Slipa och forma trä","Enkla träkonstruktioner","Verktyg och säkerhet"]
    },
    "Teknik": {
      "Teknik i vardagen": ["Enkla mekanismer","Konstruera broar och torn","Hållbar teknik och återbruk"]
    }
  },
  3: {
    "Svenska": {
      "Läsning": ["Lässtrategier – förutspå","Lässtrategier – ställa frågor","Lässtrategier – summera","Läsa faktatexter","Jämföra faktatext och skönlitteratur","Texters budskap","Dra slutsatser"],
      "Skrivning": ["Berättelse med tydlig handling","Instruktioner steg för steg","Faktatexter","Styckeindelning","Bindeord","Ge och ta respons"],
      "Grammatik": ["Ordklasser – substantiv, verb, adjektiv","Subjekt och predikat","Komma i uppräkning","Plural – olika ändelser"]
    },
    "Matematik": {
      "Tal och räkning": ["Tal upp till 1000","Skriva och läsa tusental","Multiplikation – vad innebär det?","Multiplikationstabellen 1–5","Multiplikationstabellen 6–10","Division – lika dela","Samband mult. och div."],
      "Geometri": ["Area – räkna i rutor","Omkrets – beräkna","Koordinatsystem – läsa av","Rita figurer i koordinatsystem"],
      "Statistik": ["Läsa tabeller","Läsa stapeldiagram","Skapa enkelt diagram","Tolka data"]
    },
    "Engelska": {
      "Kommunikation": ["Hälsa och presentera sig","Berätta om familj och hem","Beskriva sin dag","Siffror och tid","Enkla berättelser","Fråga och svara om vardagen"]
    },
    "Bild": {
      "Skapande": ["Perspektiv och djup","Porträtt och figurteckning","Skulptur med lera"],
      "Bildanalys": ["Analysera reklambilder","Bildberättande – serier","Konst från olika kulturer"]
    },
    "Musik": {
      "Musicerande": ["Spela enkla ackord","Sjunga tvåstämmigt","Komponera en enkel melodi"],
      "Musikkunskap": ["Notlära – grunderna","Musikhistoria – kortfattat","Musik från olika kulturer"]
    },
    "Idrott och hälsa": {
      "Rörelse": ["Grundläggande friidrott","Simning – crawl och ryggsim","Bollspel med regler"],
      "Friluftsliv": ["Orientering – karta och kompass","Allemansrätten","Säkerhet i naturen"]
    },
    "Slöjd": {
      "Textilslöjd": ["Sy ett eget plagg","Broderi och dekorativa sömmar","Designprocess – idé till produkt"],
      "Träslöjd": ["Såga, hyvel och borra","Limma och sammanfoga","Ytbehandling – slipa och måla"]
    },
    "Teknik": {
      "Konstruktion": ["Hållfasta konstruktioner","Enkla maskiner – kugghjul","Elektronik – lampor och batterier"],
      "Hållbar teknik": ["Återbruk och kretslopp","Teknikens miljöpåverkan"]
    },
    "Hemkunskap": {
      "Mat och måltider": ["Enkel matlagning","Köksredskap och hygien","Näringslära – grunden"],
      "Hushållskunskap": ["Sortera sopor och återvinna","Rengöring och ordning"]
    }
  },
  4: {
    "Svenska": {
      "Läsning": ["Analysera karaktärer","Karaktärers motiv","Inferenser – läsa mellan raderna","Jämföra texter","Källkritik – grunderna","Faktatexter – hitta huvudbudskap"],
      "Skrivning": ["Argumenterande text – struktur","Novellskrivning","Beskrivande text","Formell vs informell stil"],
      "Grammatik": ["Ordklasser – fördjupning","Bisatser och huvudsatser","Kommatecken","Direkt och indirekt tal"]
    },
    "Matematik": {
      "Tal och räkning": ["Decimaltal – tiondel","Decimaltal – hundradel","Bråk – täljare och nämnare","Bråk på tallinjen","Skriftlig addition och subtraktion","Skriftlig multiplikation","Skriftlig division"],
      "Algebra": ["Vad är en ekvation?","Lösa enkla ekvationer","Mönster i talföljder"]
    },
    "Engelska": {
      "Grammatik": ["Verb i presens","Verb i preteritum – regelbundna","Verb i preteritum – oregelbundna","Frågeord","Negation"],
      "Kommunikation": ["Berätta om sin dag","Beskriva sin familj","Prata om fritid","Skriva ett enkelt mejl"]
    },
    "Biologi": {
      "Kropp och hälsa": ["Kroppens organ – hjärtat","Kroppens organ – lungorna","Kroppens organ – matsmältning","Skelett och muskler","Kost och hälsa"],
      "Natur och ekologi": ["Djur och livsmiljöer","Växter – delar och funktion","Fotosyntesen","Insekter och pollination"]
    },
    "Fysik": {
      "Kraft och rörelse": ["Vad är kraft?","Tyngdkraft","Friktion","Rörelse och hastighet"],
      "Energi och elektricitet": ["Energiformer","Enkel elektrisk krets","Ledare och isolatorer","Magnetism"]
    },
    "Kemi": {
      "Ämnen och material": ["Fast, flytande och gasform","Ämnesegenskaper","Blandningar","Lösningar","Filtrering"]
    },
    "Geografi": {
      "Kartan och Sverige": ["Kartan – väderstreck och skala","Sverige – landskap och städer","Norden – länder och huvudstäder"],
      "Natur och klimat": ["Väder och klimat i Sverige","Hav, sjöar och vattendrag"]
    },
    "Historia": {
      "Forntid och medeltid": ["Stenåldern i Sverige","Bronsåldern","Järnåldern","Vikingatiden – samhälle och liv","Vikingarnas resor och handel","Nordisk mytologi"]
    },
    "Religionskunskap": {
      "Världsreligioner": ["Kristendom – grunder","Islam – grunder","Judendom – grunder","Högtider och traditioner","Etik och moral"]
    },
    "Samhällskunskap": {
      "Samhälle och demokrati": ["Vad är demokrati?","Regler och lagar","Familj och samhälle","Hållbar utveckling"]
    },
    "Bild": {
      "Skapande": ["Komposition och bilduppbyggnad","Färglära","Digitalt skapande"],
      "Bildanalys": ["Analysera konstverk","Reklambilder och budskap"]
    },
    "Musik": {
      "Musicerande": ["Spela melodiinstrument","Sjunga i ensemble","Grundläggande notläsning"],
      "Musikkunskap": ["Musikens historia","Populärmusik och konstmusik"]
    },
    "Idrott och hälsa": {
      "Rörelse": ["Simning – tekniker","Friidrott","Bollspel och lagspel"],
      "Friluftsliv": ["Orientering","Allemansrätten"]
    },
    "Slöjd": {
      "Textilslöjd": ["Sy med maskin – grunderna","Mönster och skärning","Designa och tillverka"],
      "Träslöjd": ["Planera och tillverka ett träarbete","Mäta och rita","Ytbehandling"]
    },
    "Teknik": {
      "Konstruktion och design": ["Designprocessen","Hållfasta konstruktioner","Enkla maskiner"],
      "Digitalteknik": ["Programmering – grunderna","Algoritmer och flödesscheman"]
    },
    "Hemkunskap": {
      "Mat och hälsa": ["Laga enkel mat","Näringslära","Hygien i köket","Matmärkning"],
      "Hushåll": ["Hushållsekonomi – enkelt","Miljömedvetna val"]
    }
  },
  5: {
    "Svenska": {
      "Läsning": ["Källkritik – fyra kriterier","Analysera nyhetsartiklar","Skönlitteraturanalys – tema","Skönlitteraturanalys – miljö","Retoriska grepp","Läsa och förstå poesi"],
      "Skrivning": ["Argumenterande text – för och emot","Reportage","Insändare","Formell text","Källhänvisning och citat"],
      "Grammatik": ["Satsdelar","Adjektivets komparation","Adverb","Meningsbyggnad och variation"]
    },
    "Matematik": {
      "Tal och räkning": ["Bråk – addition och subtraktion","Bråk – multiplikation","Decimaltal – fyra räknesätt","Procent","Negativa tal","Prioriteringsregler"],
      "Geometri": ["Vinklar","Vinkelsumma i triangel","Area av rektangel och triangel","Area av parallellogram"],
      "Statistik": ["Medelvärde","Median","Typvärde","Sannolikhet"]
    },
    "Engelska": {
      "Grammatik": ["Alla tempus – översikt","Konditionalis typ 1","Modala hjälpverb","Relativa bisatser"],
      "Kommunikation": ["Presentera ett ämne","Diskutera och argumentera","Skriva en berättelse","Förstå engelska medier"]
    },
    "Biologi": {
      "Cellen och kroppen": ["Cellen – delar och funktion","Djurcell vs växcell","Kroppens organ – översikt","Pubertet och reproduktion"],
      "Ekologi": ["Ekosystem – producenter och konsumenter","Näringskedjor","Fotosyntesen – fördjupning","Biologisk mångfald"]
    },
    "Fysik": {
      "Kraft och energi": ["Kraft och rörelse","Effekt och energi","Enkla maskiner"],
      "Elektricitet och magnetism": ["Elektriska kretsar","Ohms lag – intro","Magnetfält","Elektromagnetism"]
    },
    "Kemi": {
      "Ämnen och reaktioner": ["Kemiska och fysikaliska egenskaper","Syror och baser","Neutralisation","Kemiska reaktioner"]
    },
    "Geografi": {
      "Världen": ["Kontinenter och världshav","Klimatzoner","Befolkningstäthet","Europa – länder och kulturer"],
      "Hållbar utveckling": ["Jordens resurser","Klimatförändringar","Hållbar konsumtion"]
    },
    "Historia": {
      "Medeltid och tidig modern tid": ["Medeltiden – feodalsamhället","Korsfararna","Pesten","Renässansen","Reformationen"],
      "Kolonialism": ["Kolonisationen – orsaker","Slavhandeln","Konsekvenser för urfolk"]
    },
    "Religionskunskap": {
      "Världsreligioner": ["Hinduism","Buddhism","Kristendom – fördjupning","Islam – fördjupning","Judendom – fördjupning"],
      "Etik och livsfrågor": ["Etiska modeller","Mänskliga rättigheter","Livsfrågor – mening och identitet"]
    },
    "Samhällskunskap": {
      "Demokrati och rättigheter": ["Demokrati – former","Barnkonventionen","Sveriges riksdag","Mänskliga rättigheter – FN"],
      "Ekonomi": ["Privatekonomi – enkelt","Konsumtion och hållbarhet"]
    },
    "Bild": { "Skapande": ["Perspektivteckning","Grafik – tryck","Animering – grunderna"], "Bildanalys": ["Analysera konsthistoriska verk","Bildkommunikation i media"] },
    "Musik": { "Musicerande": ["Spela ackordinstrument","Sjunga flerstämmigt","Enkel komposition"], "Musikkunskap": ["Musikhistoria – barock och klassicism","Världsmusik"] },
    "Idrott och hälsa": { "Rörelse och idrott": ["Simning – fördjupning","Lagidrotter","Konditionsträning"], "Friluftsliv": ["Orientering med karta","Friluftsliv i alla årstider","Första hjälpen"] },
    "Slöjd": { "Textilslöjd": ["Sy ett projekt med mönster","Sticka och virka","Textiltryck"], "Träslöjd": ["Svarv – grunderna","Avancerad sammanfogning","Tillverka ett designat föremål"] },
    "Teknik": { "Konstruktion": ["Konstruera och testa broar","Pneumatik och hydraulik","Robotkonstruktion"], "Digitalteknik": ["Programmering – loopar och villkor","Micro:bit","Internet och nätverk"] },
    "Hemkunskap": { "Mat och hälsa": ["Laga varierade rätter","Matkultur från världen","Allergier och specialkost","Hållbar matkonsumtion"], "Hushåll och ekonomi": ["Planera och handla mat","Hushållsbudget","Tvätt och klädvård"] }
  },
  6: {
    "Svenska": {
      "Läsning": ["Kritisk läsning av media","Analys av reklamspråk","Litteraturhistoria – antiken","Analys av berättarperspektiv","Analys av språkliga val","Tema och budskap i skönlitteratur"],
      "Skrivning": ["Utredande text","Debattartikel","Krönika","Berättartekniker","Formell skriftlig kommunikation"],
      "Grammatik": ["Nominalfras och verbalfras","Aktiv och passiv sats","Satsadverbial","Stilistik"]
    },
    "Matematik": {
      "Tal och räkning": ["Procent och förändringsfaktor","Procentuell förändring","Rationella tal – alla räknesätt","Proportionalitet","Skala och kartor"],
      "Algebra": ["Förenkla algebraiska uttryck","Lösa ekvationer med parentes","Koordinatsystem","Rita linjära funktioner"],
      "Geometri": ["Pythagoras sats","Volymer – rätblock och cylinder","Enhetsomvandlingar"]
    },
    "Engelska": {
      "Grammatik": ["Konditionalis typ 1 och 2","Passiv form","Modala hjälpverb – fördjupning","Relativa bisatser"],
      "Kommunikation": ["Muntlig presentation","Skriva formella texter","Diskutera åsikter","Engelska i media"]
    },
    "Spanska": {
      "Kommunikation": ["Presentera sig och andra","Vardagliga fraser","Beskriva familj och hem","Beställa mat","Handla och fråga om priser","Fråga om vägen"],
      "Grammatik": ["Substantiv – genus","Artiklar","Presens av ser, estar, tener","Presens av regelbundna verb","Adjektiv – kongruens","Frågeord"]
    },
    "Franska": {
      "Kommunikation": ["Hälsningar och presentationer","Berätta om sig själv","Siffror, datum och tid","Beskriva familj och hem","Beställa på café"],
      "Grammatik": ["Artiklar – bestämd och obestämd","Presens av être och avoir","Presens av -er verb","Adjektivets böjning","Negation","Frågebildning"]
    },
    "Tyska": {
      "Kommunikation": ["Hälsa och presentera sig","Berätta om familjen","Beskriva hem och skola","Tala om mat","Berätta om fritidsintressen"],
      "Grammatik": ["Substantiv och genus","Personliga pronomen","Presens av sein och haben","Presens av regelbundna verb","Nominativ och ackusativ","Negation"]
    },
    "Biologi": {
      "Genetik och evolution": ["DNA och arv","Dominant och recessiv egenskap","Ärftlighet och miljö","Evolution – naturligt urval","Artbegreppet"],
      "Ekologi": ["Ekosystem och biotoper","Energiflöde","Kretslopp – kol och kväve","Människans påverkan"]
    },
    "Fysik": {
      "Ljus och ljud": ["Ljud – vågor och frekvens","Ljus – reflektion och refraktion","Optik – ögat och glasögon"],
      "Energi": ["Energiformer och omvandlingar","Effekt och energi – beräkningar","Förnybara och fossila energikällor"]
    },
    "Kemi": {
      "Grundämnen och atomer": ["Periodiska systemet","Atomen – proton, neutron, elektron","Metaller och ickemetaller","Jonbindning"],
      "Syror och baser": ["Syror – pH och egenskaper","Baser – pH och egenskaper","Neutralisation","Indikatorer"]
    },
    "Geografi": {
      "Naturgeografi": ["Jordens inre – tektoniska plattor","Vulkaner och jordbävningar","Klimatzoner och biomer"],
      "Kulturgeografi": ["Befolkningstillväxt","Migration","Urbanisering","Globala klyftor"]
    },
    "Historia": {
      "Stormaktstid och revolutioner": ["Franska revolutionen","Napoleontiden","Industrialiseringens framväxt","Imperialismen","Sveriges stormaktstid"]
    },
    "Religionskunskap": {
      "Religion och samhälle": ["Religion och politik","Sekularisering","Nya religiösa rörelser","Etik – utilitarism och pliktetik"]
    },
    "Samhällskunskap": {
      "Politik och ekonomi": ["Sveriges statsskick","Kommuner och regioner","EU – uppbyggnad","Arbetsmarknaden"]
    },
    "Bild": { "Skapande": ["Komposition och bildspråk","Foto och film","Digitalt bildberättande"], "Bildanalys": ["Konsthistoria – renässansen","Samtidskonst","Bilder i politiska sammanhang"] },
    "Musik": { "Musicerande": ["Spela och sjunga i ensemble","Arrangera musik","Musikproduktion – intro"], "Musikkunskap": ["Musikhistoria – romantiken","Jazz och blues","Musik i film och media"] },
    "Idrott och hälsa": { "Rörelse och idrott": ["Bollsport – regler och taktik","Simning – livräddning","Konditionsträning"], "Hälsa och livsstil": ["Kost, sömn och återhämtning","Stress och psykisk hälsa","Drogprevention"] },
    "Slöjd": { "Textilslöjd": ["Sy ett komplext projekt","Formgivning och estetik","Hållbar textil"], "Träslöjd": ["Avancerade sammanfogningar","Konstruktion med teknisk ritning","Ytbehandling"] },
    "Teknik": { "Konstruktion och system": ["Tekniska system","Hållbar produktutveckling","CAD – introduktion"], "Digitalteknik": ["Programmering – funktioner","Nätverk och internet","Informationssäkerhet"] },
    "Hemkunskap": { "Mat och hälsa": ["Laga varierade rätter","Bakning – kemi i matlagning","Hållbar matkonsumtion"], "Konsumentekonomi": ["Ekonomi och budget","Reklam och konsumtion","Miljömärkningar"] }
  },
  7: {
    "Svenska": {
      "Läsning": ["Modernistisk lyrik","Epik – romanen som genre","Retorisk analys","Analysera språk och makt","Postkolonial läsning"],
      "Skrivning": ["Vetenskaplig rapport","Krönika","Litterär essä","Argumenterande tal","Källkritik – fördjupning"]
    },
    "Matematik": {
      "Algebra": ["Linjära funktioner – k och m","Rita och tolka linjära funktioner","Bestämma ekvation för en linje","Linjära ekvationssystem","Andragradsekvationer – intro"],
      "Statistik": ["Frekvenstabeller och histogram","Lådagram","Spridningsmått","Normalfördelning – intro","Korrelation – intro"]
    },
    "Engelska": {
      "Litteratur och analys": ["Läsa engelskspråkig skönlitteratur","Analysera karaktärer och tema","Analysera språk och stil","Jämföra texter"],
      "Kommunikation": ["Debatt på engelska","Akademiskt skrivande","Källhantering på engelska","Presentationsteknik"]
    },
    "Spanska": {
      "Kommunikation": ["Beskriva rutiner och vanor","Berätta om fritid","Handla och pruta","Berätta om en upplevelse","Diskutera kultur och traditioner","Skriva ett personligt brev"],
      "Grammatik": ["Preteritum – regelrätta verb","Preteritum – oregelbundna verb","Reflexiva verb","Direkt objektspronomen","Jämförelse","Prepositioner"]
    },
    "Franska": {
      "Kommunikation": ["Berätta om rutiner","Handla och äta ute","Beskriva en resa","Skriva ett vykort eller mejl","Diskutera film och musik"],
      "Grammatik": ["Passé composé med avoir","Passé composé med être","Oregelbundna particip","Negation – fördjupning","Possessiva pronomen","Jämförelse"]
    },
    "Tyska": {
      "Kommunikation": ["Berätta om skola och schema","Diskutera mat","Planera aktiviteter","Beskriva en resa","Skriva ett mejl"],
      "Grammatik": ["Dativ – introduktion","Modala hjälpverb","Perfekt med haben och sein","Ordföljd i bisatser","Imperativ"]
    },
    "Biologi": {
      "Cell och genetik": ["Celldelning – mitos och meios","Genetik – DNA och genuttryck","Mutationer","Genteknik – introduktion"],
      "Kropp och hälsa": ["Nervsystemet","Hormonsystemet","Immunförsvaret","Infektionssjukdomar"],
      "Ekologi": ["Ekosystemtjänster","Biologisk mångfald","Klimatförändringar och ekosystem"]
    },
    "Fysik": {
      "Mekanik": ["Newtons lagar – alla tre","Rörelsemängd och impuls","Arbete och energi","Effekt","Rörelsebeskrivning – diagram"],
      "Elektricitet": ["Seriekoppling – beräkningar","Parallellkoppling – beräkningar","Ohms lag","Elektromagnetisk induktion"]
    },
    "Kemi": {
      "Organisk kemi": ["Kolkedjor – alkaner, alkener","Funktionella grupper","Förbränningsreaktioner","Polymerer"],
      "Kvantitativ kemi": ["Molbegreppet","Molmassa och beräkningar","Balansera reaktionslikvationer","Koncentration"]
    },
    "Geografi": {
      "Naturgeografi": ["Klimatsystem och havsströmmar","Jordbruk och markanvändning","Naturresurser","Hållbar resursförvaltning"],
      "Kulturgeografi": ["Globalisering och handel","Turism och miljöpåverkan","Geopolitik – intro","Fattigdom och ojämlikhet"]
    },
    "Historia": {
      "Modern historia": ["Industrialismens framväxt","Arbetarrörelsen","Nationalismens uppkomst","Första världskriget","Mellankrigstiden"]
    },
    "Religionskunskap": {
      "Religion och etik": ["Etiska teorier","Religionsfrihet","Bioetik","Religionernas syn på miljö","Religion och genus"]
    },
    "Samhällskunskap": {
      "Politik": ["Sveriges statsskick – fördjupning","EU – demokrati och kritik","Internationella organisationer","Medievärlden och demokrati"],
      "Ekonomi": ["Makroekonomi","Arbetsmarknad och fack","Välfärdsstaten","Global ekonomi"]
    },
    "Bild": { "Skapande": ["Konstnärlig gestaltning","Film och rörlig bild","3D-modellering"], "Bildanalys": ["Konsthistoria – modernismen","Bilder och makt","Reklam och konsumtionskultur"] },
    "Musik": { "Musicerande": ["Ensemblespel – genrer","Musikproduktion – DAW","Komponera och arrangera"], "Musikkunskap": ["Musikhistoria – 1900-tal","Rock, pop och elektronisk musik","Musikens kulturella roll"] },
    "Idrott och hälsa": { "Rörelse och idrott": ["Bollsport – avancerad taktik","Friluftsliv och orientering","Gym och styrketräning"], "Hälsa": ["Kost och prestation","Psykisk hälsa","Drogprevention"] },
    "Slöjd": { "Textilslöjd": ["Konstruera och sy avancerat plagg","Textil design","Hantverkstraditioner"], "Träslöjd": ["Avancerad konstruktion","Formgivning och funktion","Entreprenörskap i slöjd"] },
    "Teknik": { "Konstruktion och innovation": ["Produktutveckling och prototyper","Hållbar teknik","Tekniska kommunikationssystem"], "Digitalteknik": ["Programmering – objektorienterat","Datorsystem","AI – introduktion"] },
    "Hemkunskap": { "Mat, hälsa och miljö": ["Näringslära – fördjupning","Laga mat från olika kulturer","Hållbar mat och matsvinn","Livsmedelssäkerhet"], "Konsumentekonomi": ["Privatekonomi och sparande","Konsumenträtt","Hållbar livsstil"] }
  },
  8: {
    "Svenska": {
      "Läsning": ["Postkolonial litteraturanalys","Feministisk litteraturanalys","Diskursanalys","Analysera ideologi i text","Mediekritik"],
      "Skrivning": ["Akademisk essä","Litterär analys – fördjupning","Vetenskaplig rapport – fördjupning","Akademiskt språk","Referera och citera korrekt"]
    },
    "Matematik": {
      "Algebra": ["Andragradsekvationer – lösningsformel","Andragradsekvationer – faktorisering","Andragradsfunktioner – parabeln","Exponentialfunktioner","Logaritmer – intro"],
      "Geometri": ["Trigonometri – sinus, cosinus, tangens","Beräkna sidor och vinklar","Vektorer","Bevisföring i geometri"]
    },
    "Engelska": {
      "Grammatik": ["Tempus – alla former","Perfekt och pluperfekt","Konditionalis typ 3","Komplexa bisatser"],
      "Kommunikation": ["Argumenterande tal","Engelska i vetenskap","Interkulturell kommunikation","Engelska i media – kritisk analys"]
    },
    "Spanska": {
      "Kommunikation": ["Diskutera samhällsfrågor","Argumentera och övertala","Beskriva känslor och relationer","Förstå och analysera spansk text","Skriva en argumenterande text"],
      "Grammatik": ["Imperfecto","Preteritum vs imperfecto","Subjunktiv presens – intro","Subjunktiv efter önskeverb","Indirekt tal","Passiv konstruktion"]
    },
    "Franska": {
      "Kommunikation": ["Diskutera samhällsfrågor","Argumentera för en ståndpunkt","Beskriva dåtid","Skriva ett formellt brev","Förstå och analysera fransk text"],
      "Grammatik": ["Imparfait","Imparfait vs passé composé","Futur simple","Konditionalis","Pronomen – COD och COI","Subjonctif – intro"]
    },
    "Tyska": {
      "Kommunikation": ["Diskutera aktuella händelser","Argumentera","Beskriva dåtida händelser","Förstå och sammanfatta tysk text","Skriva ett formellt brev"],
      "Grammatik": ["Genitiv","Temporala och kausala konjunktioner","Pluskvamperfekt","Konjunktiv II – intro","Passiv i presens och preteritum"]
    },
    "Biologi": {
      "Genetik och bioteknik": ["Genuttryck och proteinsyntesen","Epigenetik","CRISPR och genteknik","Stamceller – etik"],
      "Kropp och medicin": ["Immunförsvar – fördjupning","Folksjukdomar","Läkemedel och vaccin","Medicinsk etik"],
      "Ekologi och miljö": ["Ekosystemtjänster","Artutrotning","Klimatanpassning"]
    },
    "Fysik": {
      "Termodynamik": ["Temperatur och värme","Specifik värmekapacitet","Termodynamikens lagar","Värmeöverföring"],
      "Modern fysik": ["Relativitetsteorin","E=mc²","Fotoelektriska effekten","Kvantmekanik – intro","Atommodeller"]
    },
    "Kemi": {
      "Elektrokemi": ["Galvaniska celler","Elektrodpotential","Elektrolys","Korrosion och korrosionsskydd"],
      "Biokemi": ["Aminosyror och proteiner","Enzymers funktion","Kolhydrater och lipider","Metabolism"]
    },
    "Geografi": {
      "Globala utmaningar": ["Klimatförändringarnas konsekvenser","Vatten – tillgång och konflikt","Energiomställning","Hållbar stadsutveckling"],
      "Geopolitik": ["Konflikter och fred","Globala handelsflöden","Kolonialismens arv"]
    },
    "Historia": {
      "1900-talets historia": ["Andra världskriget – orsaker","Förintelsen","Kalla kriget","Avkolonisering","Vietnamkriget"]
    },
    "Religionskunskap": {
      "Etik och existens": ["Medicinsk etik","Krigets etik","Miljöetik – fördjupning","Existentiella frågor","Sekulär vs religiös etik"]
    },
    "Samhällskunskap": {
      "Ekonomi och välfärd": ["Ekonomiska system","Skattefrågor och välfärd","Global ekonomisk ojämlikhet","Finanskris"],
      "Rättssamhälle": ["Rättssystemet","Brott och påföljder","Internationell rätt","Medias roll i demokratin"]
    },
    "Bild": { "Skapande": ["Avancerat eget projekt","Installationskonst","Konst och samhällskritik"], "Bildanalys": ["Konsthistoria – expressionism","Samtidskonst och konceptkonst","Visuell kommunikation digitalt"] },
    "Musik": { "Musicerande": ["Avancerat ensemblespel","Musikproduktion – mixing","Skriva egna låtar"], "Musikkunskap": ["Musikhistoria – samtida","Musik och identitet","Musikbranschen"] },
    "Idrott och hälsa": { "Rörelse och prestation": ["Träningslära – periodisering","Simning – avancerat","Lagsport – ledarskap"], "Hälsa": ["Träning och hälsa – vetenskaplig grund","Mental träning","Kostplanering"] },
    "Slöjd": { "Textilslöjd": ["Hög grad av självständighet","Formge en kollektion","Hantverksteknik – fördjupning"], "Träslöjd": ["Avancerat träprojekt","Ytbehandling – fördjupning","Entreprenörskap"] },
    "Teknik": { "Innovation och hållbarhet": ["Hållbar produktutveckling","Teknikhistoria och framtid","Etik i teknikutveckling"], "Digitalteknik": ["Programmering – algoritmer","Cybersäkerhet","Maskininlärning – intro"] },
    "Hemkunskap": { "Mat och hälsa": ["Specialkost och allergier","Avancerade matlagningstekniker","Fermentering och konservering"], "Konsumentekonomi": ["Lån och krediter","Försäkringar","Hållbar konsumtion"] }
  },
  9: {
    "Svenska": {
      "Läsning": ["Litteratur och samhällskritik","Argumentationsanalys","Analysera retoriska strategier","Jämförande litteraturanalys","Textanalys inför nationellt prov"],
      "Skrivning": ["Nationella provets skrivuppgifter","Argumenterande text – avancerad","Utredande text – avancerad","Vetenskaplig rapport – självständig"]
    },
    "Matematik": {
      "Algebra och analys": ["Polynomekvationer","Rationella uttryck och ekvationer","Komplexa tal – intro","Derivata – definition och regler","Derivata – tillämpningar","Integraler – intro"],
      "Statistik och sannolikhet": ["Kombinatorik","Sannolikhetsfördelningar","Statistisk inferens – intro","Kritisk granskning av statistik"]
    },
    "Engelska": {
      "Fördjupning": ["Litterär analys – avancerad","Akademisk engelska","Kritisk analys av engelska medier","Engelska i vetenskapliga sammanhang"],
      "Kommunikation": ["Förhandling och argumentation","Engelska i yrkeslivet","Presentationsteknik – avancerad"]
    },
    "Spanska": {
      "Kommunikation": ["Debatt och retorik","Analysera spanskspråkig litteratur","Yrkesliv och framtidsplaner","Presentera och försvara en ståndpunkt","Skriva en analytisk text"],
      "Grammatik": ["Subjunktiv i bisatser","Konditionalis – si-satser","Passiv med se","Avancerade prepositionskonstruktioner","Stilistik och register"]
    },
    "Franska": {
      "Kommunikation": ["Debatt och argumentation","Analysera franskspråkig litteratur","Diskutera samhälls- och kulturfrågor","Skriva analytisk text","Presentera och försvara ett ämne"],
      "Grammatik": ["Subjonctif présent – fördjupning","Subjonctif passé","Konditionalis – hypotetiska satser","Passiv – alla tempus","Avancerad meningsbyggnad"]
    },
    "Tyska": {
      "Kommunikation": ["Debatt och argumentation","Analysera tyskt litterärt verk","Diskutera samhällsfrågor","Yrkeskommunikation","Skriva analytisk text"],
      "Grammatik": ["Konjunktiv II – hypotetiska satser","Konjunktiv II i konditionala satser","Passiv i alla tempus","Infinitivkonstruktioner","Avancerad satsbyggnad"]
    },
    "Biologi": {
      "Evolution och systematik": ["Evolutionens mekanismer","Systematik och fylogenetik","Samevolution","Artbildning"],
      "Ekologi och klimat": ["Klimatmodeller","Ekosystemens resiliens","Restaurering av ekosystem","Hållbar naturförvaltning"]
    },
    "Fysik": {
      "Kärnfysik": ["Atomkärnan","Radioaktivitet – alfa, beta, gamma","Halveringstid","Fission och fusion","Kärnkraft – för och emot"],
      "Astrofysik": ["Stjärnors uppkomst och liv","HR-diagrammet","Supernovor och svarta hål","Kosmologi – Big Bang","Mörk materia"]
    },
    "Kemi": {
      "Industriell kemi": ["Haber-processen","Kontaktprocessen","Polymerer","Industriell katalys","Grön kemi"],
      "Miljökemi": ["Växthuseffekten – kemin","Koldioxid och kolcykeln","Försurning","Ozon och ozonnedbrytning","Miljögifter"]
    },
    "Geografi": {
      "Hållbar utveckling": ["Agenda 2030","Energiomställning","Cirkulär ekonomi","Klimaträttvisa"],
      "Geopolitik och framtid": ["Framtidens städer","Vattenresurser och konflikter","Gränser och migration","Teknik och hållbarhet"]
    },
    "Historia": {
      "Samtidshistoria": ["Kalla krigets slut","Globaliseringens historia","Folkrörelser och revolutioner","Terrorismen och 11 september","Nutida konflikter"]
    },
    "Religionskunskap": {
      "Etik och samhälle": ["AI och etik","Klimatkrisen – religiösa perspektiv","Genus och religion","Yttrandefrihet och religion","Döden och det bortom"]
    },
    "Samhällskunskap": {
      "Demokrati och framtid": ["Demokratins utmaningar","Digitalisering och demokrati","Yttrandefrihet och censur","Aktivism och medborgarrörelse"],
      "Globala frågor": ["Klimatpolitik – Paris-avtalet","Migration och flyktingpolitik","Global fattigdom","Säkerhetspolitik"]
    },
    "Bild": { "Skapande": ["Examensarbete – eget projekt","Utställning och presentation","Konstens roll i samhällsdebatten"], "Bildanalys": ["Konsthistoria – postmodernism","Konst och identitetspolitik","Visuell kultur och globalisering"] },
    "Musik": { "Musicerande": ["Avancerat ensemblespel inför publik","Självständig musikproduktion","Musikprojekt – från idé till framförande"], "Musikkunskap": ["Musikens historia – helhetsbild","Musik och globalisering","Musikbranschen – framtid"] },
    "Idrott och hälsa": { "Rörelse och hälsa": ["Individuell träningsplanering","Idrott och identitet","Elitidrott och hälsorisker"], "Friluftsliv": ["Avancerad orientering","Friluftsliv och hållbarhet","Ledarskap i friluftsliv"] },
    "Slöjd": { "Avancerat skapande": ["Examensarbete i slöjd","Formge en avancerad produkt","Slöjd och kulturarv"], "Entreprenörskap": ["Marknadsföra ett slöjdprojekt","Prissätta och sälja","Hantverkets framtid"] },
    "Teknik": { "Innovation och samhälle": ["Teknikens roll i framtiden","Hållbar innovation","Etik i teknikutveckling – AI"], "Digitalteknik": ["Avancerad programmering","Big data och integritet","Framtidens digitala samhälle"] },
    "Hemkunskap": { "Mat och hållbarhet": ["Växtbaserad kost","Matproduktion och miljöpåverkan","Laga mat med säsong"], "Ekonomi och konsumtion": ["Ekonomisk planering inför vuxenlivet","Boende och hushållsekonomi","Hållbara livsstilsval"] }
  }
};

// Lgr22 kopplingar per ämne
const LGR22 = {
  "Svenska": "Lgr22 – Svenska: Eleven ska utveckla förmåga att läsa och analysera skönlitteratur och andra texter, samt formulera sig i tal och skrift med anpassning till syfte, mottagare och situation.",
  "Matematik": "Lgr22 – Matematik: Eleven ska utveckla förmåga att formulera och lösa problem, använda matematiska metoder och föra matematiska resonemang.",
  "Engelska": "Lgr22 – Engelska: Eleven ska kommunicera på engelska i tal och skrift, förstå och tolka innehållet i talad engelska och olika slags texter, samt anpassa språket till olika syften och mottagare.",
  "Spanska": "Lgr22 – Moderna språk (Spanska): Eleven ska kommunicera på målspråket, förstå talat och skrivet språk, samt reflektera över levnadsvillkor och kulturer i länder där språket talas.",
  "Franska": "Lgr22 – Moderna språk (Franska): Eleven ska kommunicera på målspråket, förstå talat och skrivet språk, samt reflektera över levnadsvillkor och kulturer i länder där språket talas.",
  "Tyska": "Lgr22 – Moderna språk (Tyska): Eleven ska kommunicera på målspråket, förstå talat och skrivet språk, samt reflektera över levnadsvillkor och kulturer i länder där språket talas.",
  "Biologi": "Lgr22 – Biologi: Eleven ska använda kunskaper i biologi för att granska information, kommunicera och ta ställning i frågor som rör hälsa, naturbruk och ekologisk hållbarhet.",
  "Fysik": "Lgr22 – Fysik: Eleven ska använda kunskaper i fysik för att granska information, kommunicera och ta ställning i frågor om energi, teknik, miljö och samhälle.",
  "Kemi": "Lgr22 – Kemi: Eleven ska använda kunskaper i kemi för att granska information och ta ställning i frågor om kemikalier, materials och processers påverkan på hälsa och miljö.",
  "Geografi": "Lgr22 – Geografi: Eleven ska analysera hur naturens egna processer och människors verksamheter formar och förändrar livsmiljöer i olika delar av världen.",
  "Historia": "Lgr22 – Historia: Eleven ska använda historiska begrepp och metoder för att förstå hur det förflutna påverkar nutiden och reflektera över historiska skeenden.",
  "Religionskunskap": "Lgr22 – Religionskunskap: Eleven ska analysera kristendomen, andra religioner och livsåskådningar samt etiska frågor utifrån olika perspektiv.",
  "Samhällskunskap": "Lgr22 – Samhällskunskap: Eleven ska analysera samhällsstrukturer och politiska system, och reflektera kring demokrati, rättigheter och hållbar utveckling.",
  "Bild": "Lgr22 – Bild: Eleven ska kommunicera med bilder för att uttrycka budskap, skapa bilder med olika tekniker, och analysera bilduttryck i olika sammanhang.",
  "Musik": "Lgr22 – Musik: Eleven ska spela och sjunga i olika musikaliska former, skapa musik och förstå musikens sammanhang och funktion i samhälle och kultur.",
  "Idrott och hälsa": "Lgr22 – Idrott och hälsa: Eleven ska röra sig allsidigt i olika miljöer, genomföra och anpassa aktiviteter, samt reflektera kring hälsa, livsstil och välmående.",
  "Slöjd": "Lgr22 – Slöjd: Eleven ska formge och framställa föremål i olika material, utveckla förmåga att planera, genomföra och utvärdera skapande processer.",
  "Teknik": "Lgr22 – Teknik: Eleven ska identifiera och analysera tekniska lösningar, utveckla idéer och skapa konstruktioner med hänsyn till hållbarhet och samhällets behov.",
  "Hemkunskap": "Lgr22 – Hem- och konsumentkunskap: Eleven ska planera och tillaga mat, hantera resurser, och reflektera kring konsumtion, hälsa och hållbar livsstil."
};

const STEG_IKONER = ["🌱","🌿","🌳","🏆"];
const STEG_FARG = ["#1b5e20","#2e7d32","#388e3c","#43a047"];

function buildLesson(grade, subject, area, chapter, numLevels, variant=0) {
  const v = variant % 3;
  const forberedelse = [
    [`Skriv "${chapter}" på tavlan – fråga: "Vad tror ni detta handlar om?"`,`Aktivera förkunskaper – låt elever diskutera i par i 1 minut`,`Presentera lektionsmålet tydligt för hela klassen`],
    [`Starta med en kort film eller bild kopplad till "${chapter}"`,`Låt elever skriva ner vad de redan vet – dela i grupp`,`Formulera gemensamt en fråga ni ska besvara under lektionen`],
    [`Börja med ett problemscenario kopplat till ${chapter}`,`Pararbete: diskutera vad ni tror svaret är innan genomgången`,`Samla hypoteser på tavlan – återkom till dem i slutet`]
  ][v];

  const grundMoment = [
    [`Förklara begreppet med enkla ord och ett tydligt vardagsexempel`,`Visa steg-för-steg med visuellt stöd – tavla, bild eller konkret material`,`Kontrollera förståelse: "Räck upp handen om du förstår så här långt"`],
    [`Använd ett konkret föremål eller demonstration`,`Rita eller skriv upp begreppet tillsammans med klassen`,`Ställ enkla kontrollfrågor: "Vad betyder det här? Vad ser ni?"`],
    [`Starta med ett problem eleverna känner igen från vardagen`,`Guided practice: lös ett enkelt exempel tillsammans steg för steg`,`Låt elever upprepa förklaringen med egna ord till en kompis`]
  ][v];
  const mellanMoment = [
    [`Koppla begreppet till tidigare kunskaper`,`Presentera 2–3 varierade exempel med stigande svårighetsgrad`,`Låt elever lösa ett exempel självständigt – jämför med en partner`],
    [`Visa samma begrepp på två sätt – låt klassen jämföra`,`Grupparbete: lös ett problem och presentera lösningen`,`Gemensam rättning och diskussion av vanliga misstag`],
    [`Starta enklare, bygg gradvis till svårare`,`Pararbete: en förklarar, en lyssnar – byt roller`,`Koppla till ett aktuellt ämne klassen känner till`]
  ][v];
  const avanceratMoment = [
    [`Presentera ett utmanande exempel – "Vad händer om vi ändrar förutsättningarna?"`,`Koppla till andra ämnen eller verkliga tillämpningar`,`Uppmuntra elever att formulera egna frågor`],
    [`Ge ett öppet problem med flera möjliga lösningar`,`Diskutera gränsfall: "När fungerar detta inte?"`,`Låt elever designa en egen uppgift`],
    [`Utmana med ett dilemma eller paradox`,`Debatt: två motstridiga ståndpunkter – vem har rätt?`,`Reflektera: "Vad visste du inte förut? Vad vill du lära dig mer om?"`]
  ][v];

  const stegKonfig = {
    2:[
      {rubrik:"Del 1 – Gemensam grund",ikon:STEG_IKONER[0],farg:STEG_FARG[0],beskrivning:"Hela klassen börjar tillsammans. Tydlig och trygg grund.",moment:grundMoment,fraga:`"Kan du förklara vad ${chapter.split(" ")[0]} betyder med egna ord?"`,signal:"När de flesta kan ge ett eget exempel – gå vidare."},
      {rubrik:"Del 2 – Fördjupning och tillämpning",ikon:STEG_IKONER[2],farg:STEG_FARG[2],beskrivning:"Komplexiteten ökar. Elever som behöver mer tid stannar vid grunduppgifterna.",moment:[...mellanMoment.slice(0,2),avanceratMoment[0]],fraga:`"Vad händer om vi ändrar en förutsättning?"`,signal:"Cirkulera och ge individuell återkoppling."}
    ],
    3:[
      {rubrik:"Del 1 – Gemensam introduktion",ikon:STEG_IKONER[0],farg:STEG_FARG[0],beskrivning:"Hela klassen samlas. Konkret och tydlig start.",moment:grundMoment,fraga:`"Vad är det viktigaste du förstår nu?"`,signal:"Gå vidare när majoriteten visar grundförståelse."},
      {rubrik:"Del 2 – Gemensam fördjupning",ikon:STEG_IKONER[1],farg:STEG_FARG[1],beskrivning:"Variera exempel och tillämpa i nya sammanhang.",moment:mellanMoment,fraga:`"Hur skulle du förklara detta för någon som aldrig hört om det?"`,signal:"Elever som behöver stanna övar grunduppgifter. Resten fortsätter."},
      {rubrik:"Del 3 – Utmaning och analys",ikon:STEG_IKONER[2],farg:STEG_FARG[2],beskrivning:"De som är redo utmanas med öppna frågor och analys.",moment:avanceratMoment,fraga:`"Var finns gränserna – när fungerar detta inte?"`,signal:"Alla elever välkomnas att lyssna och bidra på sin nivå."}
    ],
    4:[
      {rubrik:"Del 1 – Gemensam introduktion",ikon:STEG_IKONER[0],farg:STEG_FARG[0],beskrivning:"Konkret och tydlig start för hela klassen.",moment:grundMoment,fraga:`"Kan du förklara begreppet med egna ord?"`,signal:"Gå vidare när alla har grundläggande förståelse."},
      {rubrik:"Del 2 – Koppling och variation",ikon:STEG_IKONER[1],farg:STEG_FARG[1],beskrivning:"Koppla till tidigare kunskaper och variera exemplen.",moment:mellanMoment.slice(0,2),fraga:`"Vilket exempel tycker du är tydligast?"`,signal:"Elever på grundnivå fortsätter öva här."},
      {rubrik:"Del 3 – Tillämpning",ikon:STEG_IKONER[2],farg:STEG_FARG[2],beskrivning:"Tillämpa i mer komplexa sammanhang.",moment:[mellanMoment[2],avanceratMoment[0]],fraga:`"Hur kan du använda detta utanför skolan?"`,signal:"Låt elever som är klara formulera egna frågor."},
      {rubrik:"Del 4 – Fördjupning och analys",ikon:STEG_IKONER[3],farg:STEG_FARG[3],beskrivning:"Öppna problem och analytiska frågor för de som är redo.",moment:avanceratMoment.slice(1),fraga:`"Om du skulle forska vidare – vad hade din fråga varit?"`,signal:"Skapa utrymme för självständigt arbete och egna slutsatser."}
    ]
  };

  const avslutning = [
    [`Samla klassen – summera de viktigaste punkterna tillsammans`,`"Exit ticket": varje elev skriver en sak de lärt sig och en fråga`,`Förhandsgranska nästa lektion`],
    [`Gemensam reflektion: "Vad var svårast? Vad var mest intressant?"`,`Låt 2–3 elever dela sin exit ticket högt`,`Koppla tillbaka till hypoteserna från lektionens start`],
    [`Pararbete: berätta för varandra vad ni tar med er`,`Läraren sammanfattar och lyfter det viktigaste`,`Kort förblick: "Nästa lektion bygger vi vidare på detta…"`]
  ][v];

  const tips = [
    [`Börja alltid med konkreta exempel – abstraktionen kommer senare`,`Använd pararbete under genomgången för att hålla alla aktiva`,`Cirkulera och ge individuell återkoppling under övningstiden`],
    [`Visa ditt eget resonemang högt – sänker tröskeln för alla`,`Låt elever förklara för varandra – peer teaching befäster kunskapen`,`Bygg in reflektionsstopp var 10:e minut`],
    [`Planera naturliga pauspunkter där elever kan stanna eller gå vidare`,`Avancerade elever kan fungera som resurspersoner diskret`,`Samla upp frågor löpande – ger värdefull formativ information`]
  ][v];

  const lgr22 = LGR22[subject] || `Lgr22 – ${subject}: Eleven ska utveckla kunskaper och förmågor inom ämnet i enlighet med kursplanens syfte och centrala innehåll.`;

  return { meta:{ grade, subject, area, chapter, numLevels }, forberedelse, steg:stegKonfig[numLevels], avslutning, tips, lgr22 };
}

function exportText(lesson) {
  if (!lesson) return "";
  const { meta, forberedelse, steg, avslutning, tips, lgr22 } = lesson;
  let t = `LEKTIONSGUIDEN – Lgr22\n${"=".repeat(40)}\n`;
  t += `Klass: ${meta.grade}  |  Ämne: ${meta.subject}  |  Område: ${meta.area}\n`;
  t += `Moment: ${meta.chapter}  |  Nivåer: ${meta.numLevels}\n\n`;
  t += `📌 LGRKOPPLING\n${lgr22}\n\n`;
  t += `📋 FÖRBEREDELSE (5 min)\n${forberedelse.map((p,i)=>`${i+1}. ${p}`).join("\n")}\n\n`;
  t += `📈 GENOMGÅNG – SAMMANHÄNGANDE FLÖDE\n`;
  steg.forEach(s => {
    t += `\n${s.rubrik}\n${"-".repeat(30)}\n`;
    t += `${s.beskrivning}\n`;
    s.moment.forEach((m,i) => t += `${i+1}. ${m}\n`);
    t += `❓ Fråga: ${s.fraga}\n`;
    t += `⏭ Signal: ${s.signal}\n`;
  });
  t += `\n🔄 AVSLUTNING (5 min)\n${avslutning.map((p,i)=>`${i+1}. ${p}`).join("\n")}\n\n`;
  t += `💡 TIPS TILL LÄRAREN\n${tips.map((p,i)=>`${i+1}. ${p}`).join("\n")}\n`;
  return t;
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
  const [copied, setCopied] = useState(false);

  const grades = Object.keys(DATA).map(Number);
  const subjects = grade ? Object.keys(DATA[grade]||{}) : [];
  const areas = grade&&subject ? Object.keys(DATA[grade]?.[subject]||{}) : [];
  const chapters = grade&&subject&&area ? DATA[grade]?.[subject]?.[area]||[] : [];
  const activeChapter = customChapter.trim()||chapter;

  function generate(v=0) {
    setLesson(buildLesson(grade,subject,area,activeChapter,numLevels,v));
    setVariant(v); setStep(5);
  }
  function reset() {
    setStep(1);setGrade(null);setSubject(null);setArea(null);
    setChapter(null);setCustomChapter("");setNumLevels(null);setLesson(null);setCopied(false);
  }
  function handleCopy() {
    const txt = exportText(lesson);
    navigator.clipboard.writeText(txt).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2500);});
  }
  function handlePrint() { window.print(); }

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#e8f5e9 0%,#f1f8e9 40%,#e0f2f1 100%)",fontFamily:"Georgia,serif",padding:"1.5rem 1rem"}}>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { position: absolute; left: 0; top: 0; width: 100%; font-family: Georgia, serif; padding: 2rem; }
          .no-print { display: none !important; }
        }
        .cbtn{transition:all .18s;border:2px solid #a5d6a7;background:white;border-radius:12px;padding:.6rem .85rem;cursor:pointer;font-family:Georgia,serif;font-size:.86rem;color:#1a3a2a;text-align:left;width:100%}
        .cbtn:hover{border-color:#2e7d32;background:#f1f8e9;transform:translateY(-1px);box-shadow:0 3px 12px rgba(46,125,50,.12)}
        .cbtn.on{border-color:#2e7d32;background:#e8f5e9;font-weight:700}
        .lvlbtn{transition:all .18s;border:2px solid #a5d6a7;background:white;border-radius:12px;padding:.8rem 1.2rem;cursor:pointer;font-family:Georgia,serif;font-size:.92rem;color:#1a3a2a;text-align:left;width:100%}
        .lvlbtn:hover{border-color:#2e7d32;background:#f1f8e9}
        .lvlbtn.on{border-color:#2e7d32;background:#e8f5e9;font-weight:700}
        .gbtn{background:linear-gradient(135deg,#2e7d32,#1b5e20);color:white;border:none;border-radius:50px;padding:.85rem 2.2rem;font-size:1rem;font-family:Georgia,serif;font-weight:700;cursor:pointer;transition:all .2s;box-shadow:0 4px 16px rgba(46,125,50,.3)}
        .gbtn:hover{transform:translateY(-2px);box-shadow:0 6px 22px rgba(46,125,50,.4)}
        .gbtn:disabled{opacity:.4;cursor:not-allowed;transform:none}
        .gbtn.sec{background:linear-gradient(135deg,#78909c,#546e7a)}
        .gbtn.exp{background:linear-gradient(135deg,#1565c0,#0d47a1)}
        .gbtn.prt{background:linear-gradient(135deg,#6a1b9a,#4a148c)}
        .ftxt{width:100%;border:2px solid #a5d6a7;border-radius:12px;padding:.75rem 1rem;font-family:Georgia,serif;font-size:.9rem;color:#1a3a2a;outline:none;box-sizing:border-box;resize:vertical;transition:border-color .18s}
        .ftxt:focus{border-color:#2e7d32}
        @keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .fi{animation:fi .35s ease}
        ul{padding-left:1.3rem;margin:.3rem 0}
        li{margin-bottom:.35rem;line-height:1.6;color:#1a2e1a}
      `}</style>

      <div className="no-print" style={{textAlign:"center",marginBottom:"2rem"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:".5rem",marginBottom:".3rem"}}>
          <span style={{fontSize:"1.8rem"}}>🌿</span>
          <h1 style={{fontSize:"2rem",color:"#1b5e20",margin:0,fontWeight:700}}>LektionsGuiden</h1>
        </div>
        <p style={{color:"#4a7c59",fontSize:".9rem",margin:0}}>Alla ämnen · Lgr22 · Åk 1–9</p>
      </div>

      <div style={{maxWidth:660,margin:"0 auto"}}>

        {step===1 && (
          <div className="fi no-print" style={{background:"white",borderRadius:20,padding:"1.8rem",boxShadow:"0 4px 20px rgba(46,125,50,.08)"}}>
            <h2 style={{color:"#1a3a2a",marginTop:0,fontSize:"1.2rem"}}>Välj klass</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:".5rem",marginBottom:"1rem"}}>
              {grades.map(g=><button key={g} className={`cbtn${grade===g?" on":""}`} onClick={()=>{setGrade(g);setSubject(null);setArea(null);setChapter(null);setCustomChapter("");}}>Klass {g}</button>)}
            </div>
            {grade&&(<>
              <h2 style={{color:"#1a3a2a",fontSize:"1.05rem",marginTop:"1.2rem"}}>Välj ämne</h2>
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:".5rem",marginBottom:"1rem"}}>
                {subjects.map(s=><button key={s} className={`cbtn${subject===s?" on":""}`} onClick={()=>{setSubject(s);setArea(null);setChapter(null);setCustomChapter("");}}>{s}</button>)}
              </div>
            </>)}
            {subject&&(<>
              <h2 style={{color:"#1a3a2a",fontSize:"1.05rem",marginTop:"1.2rem"}}>Välj område</h2>
              <div style={{display:"grid",gap:".4rem",marginBottom:"1rem"}}>
                {areas.map(a=><button key={a} className={`cbtn${area===a?" on":""}`} onClick={()=>{setArea(a);setChapter(null);setCustomChapter("");}}>{a}</button>)}
              </div>
            </>)}
            {area&&(<>
              <h2 style={{color:"#1a3a2a",fontSize:"1.05rem",marginTop:"1.2rem"}}>Välj kapitel / lektion</h2>
              <div style={{display:"grid",gap:".35rem",maxHeight:280,overflowY:"auto",paddingRight:4,marginBottom:"1rem"}}>
                {chapters.map(c=><button key={c} className={`cbtn${chapter===c&&!customChapter?" on":""}`} onClick={()=>{setChapter(c);setCustomChapter("");}}>📖 {c}</button>)}
              </div>
              <div style={{borderTop:"2px dashed #c8e6c9",paddingTop:"1rem"}}>
                <p style={{color:"#2e7d32",fontWeight:700,fontSize:".88rem",margin:"0 0 .5rem"}}>✏️ Eller skriv eget kapitel / lektionsinnehåll</p>
                <textarea className="ftxt" rows={3} placeholder={`T.ex. "Adjektivets komparation – s. 47" eller "Repetition multiplikationstabellen"`} value={customChapter} onChange={e=>{setCustomChapter(e.target.value);if(e.target.value)setChapter(null);}}/>
                {customChapter.trim()&&<p style={{color:"#4a7c59",fontSize:".78rem",margin:".4rem 0 0",fontStyle:"italic"}}>✅ Anpassas till: "{customChapter.trim()}"</p>}
              </div>
            </>)}
            {activeChapter&&<div style={{textAlign:"right",marginTop:"1.5rem"}}><button className="gbtn" onClick={()=>setStep(2)}>Nästa →</button></div>}
          </div>
        )}

        {step===2&&(
          <div className="fi no-print" style={{background:"white",borderRadius:20,padding:"1.8rem",boxShadow:"0 4px 20px rgba(46,125,50,.08)"}}>
            <h2 style={{color:"#1a3a2a",marginTop:0,fontSize:"1.2rem"}}>Hur många kunskapsnivåer finns i klassen?</h2>
            <p style={{color:"#4a7c59",fontSize:".88rem",marginBottom:"1.2rem"}}>Genomgången blir ett sammanhängande flöde från enkel till avancerad.</p>
            <div style={{display:"flex",flexDirection:"column",gap:".7rem",marginBottom:"1.5rem"}}>
              {[{n:2,desc:"Två steg – grund och fördjupning"},{n:3,desc:"Tre steg – introduktion, fördjupning, analys"},{n:4,desc:"Fyra steg – gradvis från grund till avancerad"}].map(({n,desc})=>(
                <button key={n} className={`lvlbtn${numLevels===n?" on":""}`} onClick={()=>setNumLevels(n)}>
                  <strong>{n} nivåer</strong><span style={{fontSize:".82rem",opacity:.75,marginLeft:".5rem"}}>{desc}</span>
                </button>
              ))}
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <button className="gbtn sec" onClick={()=>setStep(1)}>← Tillbaka</button>
              <button className="gbtn" disabled={!numLevels} onClick={()=>generate(0)}>✨ Skapa genomgång</button>
            </div>
          </div>
        )}

        {step===5&&lesson&&(
          <div className="fi">
            {/* Print area */}
            <div id="print-area">
              {/* Header */}
              <div style={{background:"#2e7d32",borderRadius:14,padding:"1rem 1.4rem",marginBottom:"1rem",display:"flex",flexWrap:"wrap",gap:".4rem",alignItems:"center"}}>
                <span style={{color:"white",fontSize:".82rem",opacity:.85}}>Klass {lesson.meta.grade}</span>
                <span style={{color:"#a5d6a7"}}>·</span>
                <span style={{color:"white",fontSize:".82rem",opacity:.85}}>{lesson.meta.subject}</span>
                <span style={{color:"#a5d6a7"}}>·</span>
                <span style={{color:"white",fontSize:".95rem",fontWeight:700}}>{lesson.meta.chapter}</span>
                <span style={{color:"#a5d6a7"}}>·</span>
                <span style={{color:"#c8e6c9",fontSize:".82rem"}}>{lesson.meta.numLevels} nivåer</span>
              </div>

              {/* Lgr22-koppling */}
              <div style={{background:"#e3f2fd",borderRadius:16,padding:"1.2rem 1.4rem",boxShadow:"0 3px 16px rgba(21,101,192,.07)",marginBottom:"1rem",borderLeft:"5px solid #1565c0"}}>
                <h3 style={{color:"#1565c0",marginTop:0,fontSize:"1rem"}}>📌 Koppling till Lgr22</h3>
                <p style={{margin:0,lineHeight:1.7,color:"#0d2a4a",fontSize:".88rem"}}>{lesson.lgr22}</p>
              </div>

              {/* Förberedelse */}
              <div style={{background:"white",borderRadius:16,padding:"1.4rem",boxShadow:"0 3px 16px rgba(46,125,50,.07)",marginBottom:"1rem"}}>
                <h3 style={{color:"#1a3a2a",marginTop:0,fontSize:"1.05rem",borderBottom:"2px solid #c8e6c9",paddingBottom:"6px"}}>📋 Förberedelse – aktivera förkunskaper (5 min)</h3>
                <ul>{lesson.forberedelse.map((p,i)=><li key={i}>{p}</li>)}</ul>
              </div>

              {/* Genomgång */}
              <div style={{background:"white",borderRadius:16,padding:"1.4rem",boxShadow:"0 3px 16px rgba(46,125,50,.07)",marginBottom:"1rem"}}>
                <h3 style={{color:"#1a3a2a",marginTop:0,fontSize:"1.05rem",borderBottom:"2px solid #c8e6c9",paddingBottom:"6px"}}>📈 Genomgång – sammanhängande flöde</h3>
                <p style={{color:"#4a7c59",fontSize:".85rem",marginBottom:"1.2rem"}}>Hela klassen följer samma genomgång. Komplexiteten ökar gradvis.</p>
                {lesson.steg.map((steg,i)=>(
                  <div key={i} style={{borderLeft:`4px solid ${steg.farg}`,paddingLeft:"1rem",marginBottom:"1.4rem"}}>
                    <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:".4rem"}}>
                      <span style={{fontSize:"1.2rem"}}>{steg.ikon}</span>
                      <strong style={{color:steg.farg,fontSize:".98rem"}}>{steg.rubrik}</strong>
                    </div>
                    <p style={{margin:"0 0 .6rem",color:"#1a2e1a",fontSize:".87rem",fontStyle:"italic"}}>{steg.beskrivning}</p>
                    <ul style={{marginBottom:".6rem"}}>{steg.moment.map((m,j)=><li key={j} style={{fontSize:".88rem"}}>{m}</li>)}</ul>
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

              {/* Avslutning */}
              <div style={{background:"white",borderRadius:16,padding:"1.4rem",boxShadow:"0 3px 16px rgba(46,125,50,.07)",marginBottom:"1rem"}}>
                <h3 style={{color:"#1a3a2a",marginTop:0,fontSize:"1.05rem",borderBottom:"2px solid #c8e6c9",paddingBottom:"6px"}}>🔄 Gemensam avslutning (5 min)</h3>
                <ul>{lesson.avslutning.map((p,i)=><li key={i}>{p}</li>)}</ul>
              </div>

              {/* Tips */}
              <div style={{background:"#e8f5e9",borderRadius:16,padding:"1.4rem",marginBottom:"1rem",border:"1px solid #c8e6c9"}}>
                <h3 style={{color:"#1a3a2a",marginTop:0,fontSize:"1.05rem"}}>💡 Tips till läraren</h3>
                <ul>{lesson.tips.map((t,i)=><li key={i}>{t}</li>)}</ul>
              </div>
            </div>

            {/* Knappar */}
            <div className="no-print" style={{display:"flex",gap:".7rem",justifyContent:"center",flexWrap:"wrap",padding:"1rem 0 2rem"}}>
              <button className="gbtn sec" onClick={reset}>🔄 Ny genomgång</button>
              <button className="gbtn" onClick={()=>generate(variant+1)}>✨ Variera</button>
              <button className="gbtn exp" onClick={handleCopy}>{copied?"✅ Kopierat!":"📋 Kopiera text"}</button>
              <button className="gbtn prt" onClick={handlePrint}>🖨️ Skriv ut / PDF</button>
            </div>
          </div>
        )}
      </div>
      <p className="no-print" style={{textAlign:"center",color:"#a5d6a7",fontSize:".75rem",marginTop:"2rem"}}>LektionsGuiden · Lgr22 · Alla ämnen åk 1–9</p>
    </div>
  );
}
