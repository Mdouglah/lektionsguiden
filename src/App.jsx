import { useState, useRef, useEffect } from "react";

// ─── LGR22 ─────────────────────────────────────────────────────────────────── v2
const LGR22 = {
"Svenska":{ kort:"Eleven ska läsa, analysera och kommunicera i tal och skrift med anpassning till syfte och mottagare.", citat:"Lgr22, Svenska: 'Undervisningen ska stimulera elevernas intresse för att läsa och skriva samt ge dem möjlighet att möta och arbeta med olika typer av texter och digitala verktyg.'" },
"Matematik":{ kort:"Eleven ska formulera och lösa problem, använda matematiska metoder och föra matematiska resonemang.", citat:"Lgr22, Matematik: 'Undervisningen ska bidra till att eleverna utvecklar förmåga att argumentera logiskt och föra matematiska resonemang.'" },
"Engelska":{ kort:"Eleven ska kommunicera på engelska i tal och skrift och förstå olika typer av texter.", citat:"Lgr22, Engelska: 'Undervisningen ska ge eleverna möjlighet att kommunicera på engelska i autentiska sammanhang och i möten med andras kulturer.'" },
"Spanska":{ kort:"Eleven ska kommunicera på spanska och reflektera över kulturer i spansktalande länder.", citat:"Lgr22, Moderna språk – Spanska: 'Undervisningen ska ge eleverna möjlighet att kommunicera på målspråket och reflektera över likheter och skillnader mellan olika kulturer.'" },
"Franska":{ kort:"Eleven ska kommunicera på franska och reflektera över kulturer i fransktalande länder.", citat:"Lgr22, Moderna språk – Franska: 'Undervisningen ska ge eleverna möjlighet att kommunicera på målspråket och reflektera över likheter och skillnader mellan olika kulturer.'" },
"Tyska":{ kort:"Eleven ska kommunicera på tyska och reflektera över kulturer i tysktalande länder.", citat:"Lgr22, Moderna språk – Tyska: 'Undervisningen ska ge eleverna möjlighet att kommunicera på målspråket och reflektera över likheter och skillnader mellan olika kulturer.'" },
"Biologi":{ kort:"Eleven ska använda biologikunskaper för att ta ställning i frågor om hälsa och ekologisk hållbarhet.", citat:"Lgr22, Biologi: 'Undervisningen ska ge eleverna förutsättningar att söka svar på frågor om naturen och levande varelsers livsvillkor och anpassningar.'" },
"Fysik":{ kort:"Eleven ska använda fysikkunskaper för att granska information om energi, teknik och miljö.", citat:"Lgr22, Fysik: 'Undervisningen ska ge eleverna möjligheter att använda och utveckla kunskaper och redskap för att formulera egna och granska andras argument.'" },
"Kemi":{ kort:"Eleven ska använda kemikunskaper för att ta ställning i frågor om kemikaliers påverkan på hälsa och miljö.", citat:"Lgr22, Kemi: 'Undervisningen ska ge eleverna förutsättningar att använda kemins begrepp och förklaringsmodeller för att beskriva och förklara kemiska processer.'" },
"Geografi":{ kort:"Eleven ska analysera hur naturens processer och människors verksamheter formar livsmiljöer.", citat:"Lgr22, Geografi: 'Undervisningen ska ge eleverna kunskap om geografiska förhållanden och ge dem verktyg för att förstå omvärlden.'" },
"Historia":{ kort:"Eleven ska använda historiska begrepp för att förstå hur det förflutna påverkar nutiden.", citat:"Lgr22, Historia: 'Undervisningen ska ge eleverna förutsättningar att tillägna sig en historisk referensram och förmåga att förstå och förklara historiska skeenden.'" },
"Religionskunskap":{ kort:"Eleven ska analysera religioner, livsåskådningar och etiska frågor utifrån olika perspektiv.", citat:"Lgr22, Religionskunskap: 'Undervisningen ska ge eleverna förutsättningar att kunna analysera och ta ställning i etiska och existentiella frågor.'" },
"Samhällskunskap":{ kort:"Eleven ska analysera samhällsstrukturer och reflektera kring demokrati och hållbar utveckling.", citat:"Lgr22, Samhällskunskap: 'Undervisningen ska ge eleverna verktyg att kritiskt granska information och förstå hur demokratiska processer fungerar.'" },
"Bild":{ kort:"Eleven ska kommunicera med bilder, skapa med olika tekniker och analysera bilduttryck.", citat:"Lgr22, Bild: 'Undervisningen ska ge eleverna förutsättningar att utveckla sitt bildspråk och förmåga att kommunicera och uttrycka sig med hjälp av bilder.'" },
"Musik":{ kort:"Eleven ska spela, sjunga, skapa musik och förstå musikens sammanhang i samhälle och kultur.", citat:"Lgr22, Musik: 'Undervisningen ska ge eleverna möjlighet att uppleva, reflektera och kommunicera med musik som estetiskt uttryckssätt.'" },
"Idrott och hälsa":{ kort:"Eleven ska röra sig allsidigt och reflektera kring hälsa, livsstil och välmående.", citat:"Lgr22, Idrott och hälsa: 'Undervisningen ska ge eleverna förutsättningar att röra sig allsidigt i olika sammanhang och få en förståelse för hur livsstilsval påverkar hälsan.'" },
"Slöjd":{ kort:"Eleven ska formge och framställa föremål och utveckla förmåga att planera och utvärdera skapande processer.", citat:"Lgr22, Slöjd: 'Undervisningen ska ge eleverna möjlighet att arbeta med olika material och tekniker och ge dem förutsättningar att utveckla sin kreativitet och sitt hantverk.'" },
"Teknik":{ kort:"Eleven ska identifiera tekniska lösningar och konstruera med hänsyn till hållbarhet.", citat:"Lgr22, Teknik: 'Undervisningen ska ge eleverna förutsättningar att utveckla sin förmåga att identifiera tekniska lösningar och deras funktion i vardagen.'" },
"Hemkunskap":{ kort:"Eleven ska planera och tillaga mat, hantera resurser och reflektera kring hälsa och hållbar livsstil.", citat:"Lgr22, Hem- och konsumentkunskap: 'Undervisningen ska ge eleverna förutsättningar att göra välgrundade val som konsumenter och hushålla med resurser på ett hållbart sätt.'" }
};

// ─── ÄMNESDATA ───────────────────────────────────────────────────────────────
const DATA = {
1:{"Svenska":{"Bokstäver och ljud":["Vokaler: a, e, i, o, u","Konsonanter och deras ljud","Korta och långa vokaler","Bokstavsordningen","Versaler och gemener"],"Läsning":["Ordbilder","Läsa enkla meningar","Läsförståelse med bilder","Rim och ramsor","Läsa högt i par"],"Skrivning":["Skriva sitt förnamn","Skriva enkla ord","Skriva en enkel mening","Stor bokstav i meningsbörjan","Punkt i slutet"]},"Matematik":{"Tal och räkning":["Räkna 1–5","Räkna 1–10","Skriva siffror 0–10","Räkna framåt","Räkna bakåt","Addition till 10","Subtraktion till 5"],"Geometri":["Känna igen cirkeln","Känna igen kvadraten","Känna igen triangeln","Sortera former","Jämföra storlekar"]},"Bild":{"Skapande":["Rita med penna","Blanda färger","Måla med penslar","Klippa och klistra","Forma med lera"]},"Musik":{"Musicerande":["Sjunga enkla sånger","Rytm – klappa i takt","Enkla instrument"]},"Idrott och hälsa":{"Rörelse":["Grundrörelser","Balans och koordination","Enkla lekar"],"Hälsa":["Hygien","Varför vi rör på oss"]},"Slöjd":{"Textilslöjd":["Trä ett nål","Enkelt broderi"],"Träslöjd":["Känna igen material","Enkla konstruktioner"]},"Teknik":{"Teknik i vardagen":["Vad är teknik?","Enkla maskiner","Konstruera med klossar"]}},
2:{"Svenska":{"Läsning":["Läsa ord med dubbelteckning","Läsa berättande text","Hitta information i faktatexter","Förstå händelseförlopp","Läsa högt med flyt"],"Skrivning":["Skriva en berättelse","Skriva beskrivande text","Punkt och frågetecken","Sammanhängande meningar"],"Grammatik":["Substantiv","Verb","Adjektiv","Stor bokstav vid namn","Singular och plural"]},"Matematik":{"Tal och räkning":["Talen 11–20","Talen 20–100","Tiokamrater","Addition till 20","Addition med uppställning","Subtraktion till 20","Jämföra tal"],"Mätning":["Mäta längd","Väga föremål","Klockan – hel och halv","Dagar, veckor, månader"]},"Engelska":{"Kommunikation":["Hälsningsfraser","Färger och siffror","Djur och natur","Veckodagar","Beskriv dig själv"]},"Bild":{"Skapande":["Teckna former","Måla med olika tekniker"]},"Musik":{"Musicerande":["Sjunga i grupp","Spela xylofon","Klappa rytmmönster"]},"Idrott och hälsa":{"Rörelse":["Bollspel","Simundervisning","Stafetter"],"Hälsa":["Kost och rörelse"]},"Slöjd":{"Textilslöjd":["Grundläggande sömnad"],"Träslöjd":["Slipa och forma trä"]},"Teknik":{"Teknik i vardagen":["Enkla mekanismer","Konstruera broar"]}},
3:{"Svenska":{"Läsning":["Lässtrategier – förutspå","Lässtrategier – ställa frågor","Lässtrategier – summera","Läsa faktatexter","Jämföra faktatext och skönlitteratur","Texters budskap"],"Skrivning":["Berättelse med handling","Instruktioner","Faktatexter","Styckeindelning","Bindeord"],"Grammatik":["Ordklasser","Subjekt och predikat","Komma i uppräkning","Plural"]},"Matematik":{"Tal och räkning":["Tal upp till 1000","Multiplikationstabellen 1–5","Multiplikationstabellen 6–10","Division","Samband mult. och div."],"Geometri":["Area","Omkrets","Koordinatsystem"],"Statistik":["Läsa tabeller","Stapeldiagram","Tolka data"]},"Engelska":{"Kommunikation":["Hälsa och presentera sig","Berätta om familj","Beskriva sin dag","Enkla berättelser"]},"Bild":{"Skapande":["Perspektiv och djup","Porträtt","Skulptur"]},"Musik":{"Musicerande":["Spela ackord","Sjunga tvåstämmigt","Komponera"]},"Idrott och hälsa":{"Rörelse":["Friidrott","Simning","Bollspel"],"Friluftsliv":["Orientering","Allemansrätten"]},"Slöjd":{"Textilslöjd":["Sy ett eget plagg","Broderi"],"Träslöjd":["Såga och hyvel","Limma"]},"Teknik":{"Konstruktion":["Hållfasta konstruktioner","Enkla maskiner"],"Hållbar teknik":["Återbruk"]},"Hemkunskap":{"Mat och måltider":["Enkel matlagning","Köksredskap och hygien","Näringslära"],"Hushållskunskap":["Sortera sopor","Rengöring"]}},
4:{"Svenska":{"Läsning":["Analysera karaktärer","Karaktärers motiv","Inferenser","Jämföra texter","Källkritik"],"Skrivning":["Argumenterande text","Novellskrivning","Beskrivande text","Formell vs informell stil"],"Grammatik":["Ordklasser – fördjupning","Bisatser","Kommatecken","Direkt och indirekt tal"]},"Matematik":{"Tal och räkning":["Decimaltal – tiondel","Decimaltal – hundradel","Bråk","Skriftlig multiplikation","Skriftlig division"],"Algebra":["Vad är en ekvation?","Lösa enkla ekvationer","Mönster i talföljder"]},"Engelska":{"Grammatik":["Verb i presens","Verb i preteritum","Frågeord","Negation"],"Kommunikation":["Berätta om sin dag","Beskriva familj","Skriva mejl"]},"Biologi":{"Kropp och hälsa":["Hjärtat","Lungorna","Matsmältning","Skelett och muskler"],"Natur":["Djur och livsmiljöer","Växter","Fotosyntesen"]},"Fysik":{"Kraft och rörelse":["Vad är kraft?","Tyngdkraft","Friktion"],"Energi":["Energiformer","Elektrisk krets","Magnetism"]},"Kemi":{"Ämnen":["Fast, flytande, gasform","Blandningar","Lösningar"]},"Geografi":{"Kartan":["Väderstreck och skala","Sverige – landskap","Norden"],"Klimat":["Väder i Sverige","Hav och sjöar"]},"Historia":{"Forntid":["Stenåldern","Bronsåldern","Järnåldern","Vikingatiden","Nordisk mytologi"]},"Religionskunskap":{"Religioner":["Kristendom","Islam","Judendom","Högtider","Etik och moral"]},"Samhällskunskap":{"Demokrati":["Vad är demokrati?","Regler och lagar","Hållbar utveckling"]},"Bild":{"Skapande":["Komposition","Färglära"]},"Musik":{"Musicerande":["Melodiinstrument","Sjunga i ensemble"]},"Idrott och hälsa":{"Rörelse":["Simning","Friidrott","Bollspel"]},"Slöjd":{"Textilslöjd":["Sy med maskin"],"Träslöjd":["Planera ett träarbete"]},"Teknik":{"Konstruktion":["Designprocessen","Hållfasta konstruktioner"],"Digitalteknik":["Programmering","Algoritmer"]},"Hemkunskap":{"Mat":["Laga enkel mat","Näringslära","Hygien"],"Hushåll":["Hushållsekonomi","Miljöval"]}},
5:{"Svenska":{"Läsning":["Källkritik","Nyhetsartiklar","Skönlitteraturanalys – tema","Skönlitteraturanalys – miljö","Retoriska grepp","Poesi"],"Skrivning":["Argumenterande text","Reportage","Insändare","Källhänvisning"],"Grammatik":["Satsdelar","Adjektivets komparation","Adverb","Meningsbyggnad"]},"Matematik":{"Tal och räkning":["Bråk – addition","Bråk – multiplikation","Decimaltal","Procent","Negativa tal","Prioriteringsregler"],"Geometri":["Vinklar","Area av triangel","Area av parallellogram"],"Statistik":["Medelvärde","Median","Typvärde","Sannolikhet"]},"Engelska":{"Grammatik":["Alla tempus","Konditionalis","Modala hjälpverb"],"Kommunikation":["Presentera ett ämne","Diskutera","Skriva berättelse"]},"Biologi":{"Cellen":["Cellen – delar","Djurcell vs växcell","Kroppens organ","Pubertet"],"Ekologi":["Ekosystem","Näringskedjor","Fotosyntesen – fördjupning","Biologisk mångfald"]},"Fysik":{"Kraft":["Rörelse och hastighet","Effekt och energi"],"Elektricitet":["Elektriska kretsar","Ohms lag","Magnetfält"]},"Kemi":{"Ämnen":["Kemiska egenskaper","Syror och baser","Neutralisation"]},"Geografi":{"Världen":["Kontinenter","Klimatzoner","Befolkningstäthet"],"Hållbarhet":["Jordens resurser","Klimatförändringar"]},"Historia":{"Medeltid":["Feodalsamhället","Korsfararna","Pesten","Renässansen","Reformationen"],"Kolonialism":["Kolonisationen","Slavhandeln"]},"Religionskunskap":{"Religioner":["Hinduism","Buddhism","Kristendom – fördjupning","Islam – fördjupning","Judendom – fördjupning"],"Etik":["Etiska modeller","Mänskliga rättigheter"]},"Samhällskunskap":{"Demokrati":["Demokrati – former","Barnkonventionen","Sveriges riksdag"],"Ekonomi":["Privatekonomi","Konsumtion"]},"Bild":{"Skapande":["Perspektivteckning","Grafik"]},"Musik":{"Musicerande":["Ackordinstrument","Flerstämmigt"]},"Idrott och hälsa":{"Rörelse":["Simning","Lagidrotter","Konditionsträning"],"Friluftsliv":["Orientering","Första hjälpen"]},"Slöjd":{"Textilslöjd":["Sy med mönster"],"Träslöjd":["Svarv"]},"Teknik":{"Konstruktion":["Konstruera broar","Robotkonstruktion"],"Digitalteknik":["Programmering – loopar","Micro:bit"]},"Hemkunskap":{"Mat":["Laga varierade rätter","Matkultur","Allergier"],"Hushåll":["Planera och handla","Hushållsbudget"]}},
6:{"Svenska":{"Läsning":["Kritisk läsning av media","Reklamspråk","Litteraturhistoria","Berättarperspektiv","Språkliga val","Tema och budskap"],"Skrivning":["Utredande text","Debattartikel","Krönika","Berättartekniker","Formell kommunikation"],"Grammatik":["Nominalfras","Aktiv och passiv sats","Satsadverbial","Stilistik"]},"Matematik":{"Tal och räkning":["Procent och förändringsfaktor","Procentuell förändring","Rationella tal","Proportionalitet","Skala"],"Algebra":["Förenkla uttryck","Lösa ekvationer","Koordinatsystem","Linjära funktioner"],"Geometri":["Pythagoras sats","Volymer","Enhetsomvandlingar"]},"Engelska":{"Grammatik":["Konditionalis","Passiv form","Modala hjälpverb","Relativa bisatser"],"Kommunikation":["Muntlig presentation","Formella texter","Diskutera åsikter"]},"Spanska":{"Kommunikation":["Presentera sig","Vardagliga fraser","Beskriva familj","Beställa mat","Handla","Fråga om vägen"],"Grammatik":["Substantiv – genus","Artiklar","Presens av ser och estar","Presens av regelbundna verb","Adjektiv","Frågeord"]},"Franska":{"Kommunikation":["Hälsningar","Berätta om sig själv","Siffror och tid","Beskriva familj","Beställa på café"],"Grammatik":["Artiklar","Presens av être","Presens av avoir","Presens av -er verb","Negation","Frågebildning"]},"Tyska":{"Kommunikation":["Hälsa och presentera sig","Berätta om familjen","Beskriva hem","Tala om mat","Fritidsintressen"],"Grammatik":["Substantiv och genus","Pronomen","Presens av sein","Presens av verben","Nominativ och ackusativ"]},"Biologi":{"Genetik":["DNA och arv","Dominant och recessiv","Ärftlighet och miljö","Evolution","Artbegreppet"],"Ekologi":["Ekosystem","Energiflöde","Kretslopp","Människans påverkan"]},"Fysik":{"Ljus och ljud":["Ljud – vågor","Ljus – reflektion","Refraktion","Optik"],"Energi":["Energiformer","Effekt och energi","Förnybara energikällor"]},"Kemi":{"Grundämnen":["Periodiska systemet","Atomen","Metaller och ickemetaller"],"Syror och baser":["Syror – pH","Baser – pH","Neutralisation","Indikatorer"]},"Geografi":{"Naturgeografi":["Tektoniska plattor","Vulkaner","Klimatzoner"],"Kulturgeografi":["Befolkningstillväxt","Migration","Urbanisering"]},"Historia":{"Revolutioner":["Franska revolutionen","Napoleontiden","Industrialiseringen","Imperialismen"]},"Religionskunskap":{"Religion och samhälle":["Religion och politik","Sekularisering","Etik – utilitarism"]},"Samhällskunskap":{"Politik":["Sveriges statsskick","Kommuner och regioner","EU"]},"Bild":{"Skapande":["Komposition","Foto och film"]},"Musik":{"Musicerande":["Ensemble","Arrangera","Musikproduktion"]},"Idrott och hälsa":{"Rörelse":["Bollsport","Simning – livräddning","Konditionsträning"],"Hälsa":["Kost och sömn","Stress","Drogprevention"]},"Slöjd":{"Textilslöjd":["Sy ett komplext projekt"],"Träslöjd":["Avancerade sammanfogningar"]},"Teknik":{"Konstruktion":["Tekniska system","Hållbar produktutveckling"],"Digitalteknik":["Programmering – funktioner","Informationssäkerhet"]},"Hemkunskap":{"Mat":["Laga varierade rätter","Bakning","Hållbar matkonsumtion"],"Konsumentekonomi":["Budget","Reklam och konsumtion"]}},
7:{"Svenska":{"Läsning":["Modernistisk lyrik","Epik – romanen","Retorisk analys","Språk och makt"],"Skrivning":["Vetenskaplig rapport","Krönika","Litterär essä","Argumenterande tal"]},"Matematik":{"Tal och räkning":["Negativa tal","Rationella tal","Potenser","Kvadratrötter","Prioriteringsregler"],"Algebra":["Linjära funktioner","Ekvation för en linje","Ekvationssystem","Andragradsekvationer","Förenkla uttryck"],"Geometri":["Pythagoras sats","Area och omkrets","Volymer","Koordinatsystem","Skala och proportion"],"Statistik":["Histogram","Lådagram","Normalfördelning","Korrelation","Medelvärde och median"],"Sannolikhet":["Kombinatorik","Sannolikhet – grundläggande","Relativ frekvens"]},"Engelska":{"Litteratur":["Engelskspråkig skönlitteratur","Analysera karaktärer","Analysera stil","Jämföra texter"],"Kommunikation":["Debatt","Akademiskt skrivande","Presentationsteknik"]},"Spanska":{"Kommunikation":["Beskriva rutiner","Fritid och intressen","Handla och pruta","Berätta om upplevelse","Skriva personligt brev"],"Grammatik":["Preteritum – regelrätt","Preteritum – oregelbundet","Reflexiva verb","Objektspronomen","Prepositioner"]},"Franska":{"Kommunikation":["Berätta om rutiner","Handla och äta ute","Beskriva en resa","Skriva vykort","Diskutera film och musik"],"Grammatik":["Passé composé med avoir","Passé composé med être","Oregelbundna particip","Negation – fördjupning","Jämförelse"]},"Tyska":{"Kommunikation":["Berätta om skola","Diskutera mat","Planera aktiviteter","Beskriva en resa","Skriva mejl"],"Grammatik":["Dativ","Modala hjälpverb","Perfekt","Ordföljd i bisatser","Imperativ"]},"Biologi":{"Genetik":["Celldelning","DNA och genuttryck","Mutationer","Genteknik"],"Kropp":["Nervsystemet","Hormonsystemet","Immunförsvaret"],"Ekologi":["Ekosystemtjänster","Biologisk mångfald","Klimat och ekosystem"]},"Fysik":{"Mekanik":["Newtons lagar","Rörelsemängd","Arbete och energi","Effekt"],"Elektricitet":["Seriekoppling","Parallellkoppling","Ohms lag","Induktion"]},"Kemi":{"Organisk kemi":["Kolkedjor","Funktionella grupper","Förbränning","Polymerer"],"Kvantitativ kemi":["Molbegreppet","Molmassa","Balansera likvationer","Koncentration"]},"Geografi":{"Naturgeografi":["Klimatsystem","Jordbruk och mark","Naturresurser"],"Kulturgeografi":["Globalisering","Turism","Fattigdom och ojämlikhet"]},"Historia":{"Modern historia":["Industrialismen","Arbetarrörelsen","Första världskriget","Mellankrigstiden"]},"Religionskunskap":{"Etik":["Etiska teorier","Religionsfrihet","Bioetik","Religion och genus"]},"Samhällskunskap":{"Politik":["Sveriges statsskick","EU – demokrati","Internationella org.","Media och demokrati"],"Ekonomi":["Makroekonomi","Arbetsmarknad","Välfärdsstaten"]},"Bild":{"Skapande":["Konstnärlig gestaltning","Film och rörlig bild"]},"Musik":{"Musicerande":["Ensemblespel","Musikproduktion – DAW","Komponera"]},"Idrott och hälsa":{"Rörelse":["Bollsport – taktik","Orientering","Styrketräning"],"Hälsa":["Kost och prestation","Psykisk hälsa"]},"Slöjd":{"Textilslöjd":["Konstruera och sy avancerat"],"Träslöjd":["Avancerad konstruktion"]},"Teknik":{"Tekniska lösningar":["Mekanismer och maskiner","Hållfasta konstruktioner","Materiallära","Produktutvecklingsprocessen"],"Arbetssätt för teknisk utveckling":["Skisser och ritningar","Modeller och prototyper","Designprocessen","Problemlösning"],"Teknik och samhälle":["Teknikens historiska utveckling","Hållbar teknik","Teknikens påverkan på miljön"],"Digitalteknik":["Programmering – funktioner och loopar","Objektorienterad programmering","AI – introduktion","Informationssäkerhet"]},"Hemkunskap":{"Mat":["Näringslära – fördjupning","Matkultur","Hållbar mat"],"Konsumentekonomi":["Sparande","Konsumenträtt"]}},
8:{"Svenska":{"Läsning":["Postkolonial analys","Feministisk analys","Diskursanalys","Ideologi i text","Mediekritik"],"Skrivning":["Akademisk essä","Litterär analys","Vetenskaplig rapport","Akademiskt språk"]},"Matematik":{"Algebra":["Andragradsekvationer – formel","Andragradsekvationer – faktorisering","Andragradsfunktioner","Exponentialfunktioner","Logaritmer"],"Geometri":["Trigonometri","Vektorer","Bevisföring"]},"Engelska":{"Grammatik":["Alla tempus","Perfekt och pluperfekt","Konditionalis typ 3","Komplexa bisatser"],"Kommunikation":["Argumenterande tal","Engelska i vetenskap","Interkulturell kommunikation"]},"Spanska":{"Kommunikation":["Diskutera samhällsfrågor","Argumentera","Beskriva känslor","Analysera spansk text","Skriva argumenterande text"],"Grammatik":["Imperfecto","Preteritum vs imperfecto","Subjunktiv – intro","Indirekt tal","Passiv konstruktion"]},"Franska":{"Kommunikation":["Diskutera samhällsfrågor","Argumentera","Beskriva dåtid","Skriva formellt brev","Analysera text"],"Grammatik":["Imparfait","Imparfait vs passé composé","Futur simple","Konditionalis","Subjonctif – intro"]},"Tyska":{"Kommunikation":["Diskutera händelser","Argumentera","Beskriva dåtid","Sammanfatta text","Skriva formellt brev"],"Grammatik":["Genitiv","Konjunktioner","Pluskvamperfekt","Konjunktiv II – intro","Passiv"]},"Biologi":{"Genetik":["Proteinsyntesen","Epigenetik","CRISPR","Stamceller – etik"],"Kropp":["Immunförsvar","Folksjukdomar","Läkemedel","Medicinsk etik"],"Ekologi":["Ekosystemtjänster","Artutrotning","Klimatanpassning"]},"Fysik":{"Termodynamik":["Temperatur och värme","Specifik värmekapacitet","Termodynamikens lagar","Värmeöverföring"],"Modern fysik":["Relativitetsteorin","E=mc²","Fotoelektriska effekten","Kvantmekanik"]},"Kemi":{"Elektrokemi":["Galvaniska celler","Elektrolys","Korrosion"],"Biokemi":["Proteiner","Enzymer","Kolhydrater","Metabolism"]},"Geografi":{"Globala utmaningar":["Klimatkonsekvenser","Vatten och konflikt","Energiomställning","Hållbar stad"],"Geopolitik":["Konflikter","Handelsflöden","Kolonialismens arv"]},"Historia":{"1900-tal":["Andra världskriget","Förintelsen","Kalla kriget","Avkolonisering","Vietnamkriget"]},"Religionskunskap":{"Etik":["Medicinsk etik","Krigets etik","Miljöetik","Existentiella frågor"]},"Samhällskunskap":{"Ekonomi":["Ekonomiska system","Skattefrågor","Global ojämlikhet","Finanskris"],"Rättssamhälle":["Rättssystemet","Brott och påföljder","Internationell rätt"]},"Bild":{"Skapande":["Avancerat projekt","Installationskonst"]},"Musik":{"Musicerande":["Avancerat ensemble","Egna låtar"]},"Idrott och hälsa":{"Rörelse":["Träningslära","Lagsport – ledarskap"],"Hälsa":["Träning och hälsa","Mental träning"]},"Slöjd":{"Textilslöjd":["Självständigt projekt"],"Träslöjd":["Avancerat träprojekt"]},"Teknik":{"Tekniska lösningar":["Styr- och reglerteknik","Energiteknik","Kommunikationsteknik","Produktionsteknik"],"Arbetssätt för teknisk utveckling":["Tekniska ritningar och CAD","Systematisk problemlösning","Test och utvärdering","Dokumentation"],"Teknik och samhälle":["Teknikens etiska frågor","Globala tekniska system","Hållbar produktutveckling","Teknik och genus"],"Digitalteknik":["Algoritmer och datastrukturer","Cybersäkerhet","Nätverk och internet","Programmering – avancerat"]},"Hemkunskap":{"Mat":["Specialkost","Avancerade tekniker"],"Konsumentekonomi":["Lån och krediter","Försäkringar"]}},
9:{"Svenska":{"Läsning":["Litteratur och samhälle","Argumentationsanalys","Retoriska strategier","Jämförande analys","Inför nationellt prov"],"Skrivning":["Nationella provets uppgifter","Argumenterande text","Utredande text","Vetenskaplig rapport"]},"Matematik":{"Algebra och analys":["Polynomekvationer","Rationella ekvationer","Komplexa tal","Derivata – definition","Derivata – tillämpningar","Integraler"],"Statistik":["Kombinatorik","Sannolikhetsfördelningar","Statistisk inferens"]},"Engelska":{"Fördjupning":["Litterär analys","Akademisk engelska","Kritisk medieanalys","Engelska i vetenskap"],"Kommunikation":["Förhandling","Engelska i yrkeslivet","Avancerad presentation"]},"Spanska":{"Kommunikation":["Debatt och retorik","Analysera litteratur","Yrkesliv","Presentera ståndpunkt","Analytisk text"],"Grammatik":["Subjunktiv i bisatser","Konditionalis","Passiv med se","Stilistik"]},"Franska":{"Kommunikation":["Debatt","Analysera litteratur","Samhälls- och kulturfrågor","Analytisk text","Presentera ämne"],"Grammatik":["Subjonctif – fördjupning","Subjonctif passé","Konditionalis","Passiv – alla tempus"]},"Tyska":{"Kommunikation":["Debatt","Analysera litteratur","Samhällsfrågor","Yrkeskommunikation","Analytisk text"],"Grammatik":["Konjunktiv II","Konditionala satser","Passiv i alla tempus","Avancerad satsbyggnad"]},"Biologi":{"Evolution":["Evolutionens mekanismer","Systematik","Samevolution","Artbildning"],"Ekologi":["Klimatmodeller","Ekosystemens resiliens","Restaurering","Naturförvaltning"]},"Fysik":{"Kärnfysik":["Atomkärnan","Radioaktivitet","Halveringstid","Fission och fusion","Kärnkraft"],"Astrofysik":["Stjärnors liv","HR-diagrammet","Supernovor","Big Bang","Mörk materia"]},"Kemi":{"Industriell kemi":["Haber-processen","Kontaktprocessen","Polymerer","Industriell katalys"],"Miljökemi":["Växthuseffekten","Kolcykeln","Försurning","Ozon","Miljögifter"]},"Geografi":{"Hållbarhet":["Agenda 2030","Energiomställning","Cirkulär ekonomi","Klimaträttvisa"],"Geopolitik":["Framtidens städer","Vattenresurser","Migration","Teknik och hållbarhet"]},"Historia":{"Samtidshistoria":["Kalla krigets slut","Globaliseringen","Folkrörelser","11 september","Nutida konflikter"]},"Religionskunskap":{"Etik":["AI och etik","Klimatkrisen","Genus och religion","Yttrandefrihet","Döden och det bortom"]},"Samhällskunskap":{"Demokrati":["Demokratins utmaningar","Digitalisering","Yttrandefrihet","Aktivism"],"Globalt":["Klimatpolitik","Migration","Global fattigdom","Säkerhetspolitik"]},"Bild":{"Skapande":["Examensarbete","Utställning"]},"Musik":{"Musicerande":["Ensemble inför publik","Självständig produktion"]},"Idrott och hälsa":{"Rörelse":["Träningsplanering","Idrott och identitet"],"Friluftsliv":["Avancerad orientering","Ledarskap"]},"Slöjd":{"Avancerat":["Examensarbete","Avancerad produkt"]},"Teknik":{"Tekniska lösningar":["Avancerade tekniska system","Förnybar energiteknik","Bioteknik","Nanoteknik – introduktion"],"Arbetssätt för teknisk utveckling":["Innovation och entreprenörskap","Projektmetodik","Teknikutvecklingsprocessen","Patent och upphovsrätt"],"Teknik och samhälle":["Teknikens framtid","Hållbar innovation","Teknik och globala utmaningar","Etik i teknikutveckling"],"Digitalteknik":["Avancerad programmering","Big data och AI","Digital säkerhet","Teknikens roll i samhällsutvecklingen"]},"Hemkunskap":{"Mat":["Växtbaserad kost","Matproduktion och miljö"],"Ekonomi":["Ekonomisk planering","Boende och hushåll"]}}
};

// ─── KONSTANTER ───────────────────────────────────────────────────────────────
const STEG_FARG = ["#1b5e20","#2e7d32","#388e3c","#43a047"];
const STEG_IKONER = ["🌱","🌿","🌳","🏆"];
const STEG_RUBRIKER = {2:["Gemensam grund","Fördjupning och tillämpning"],3:["Gemensam introduktion","Fördjupning","Utmaning och analys"],4:["Gemensam introduktion","Koppling och variation","Tillämpning","Fördjupning och analys"]};
const STEG_TIDER = {2:["15 min","20 min"],3:["10 min","15 min","10 min"],4:["10 min","10 min","10 min","5 min"]};
const STEG_BESKRIVNING = {2:["Hela klassen börjar tillsammans. Tydlig grund för alla.","Komplexiteten ökar. Elever stannar vid grunduppgifter om de behöver."],3:["Hela klassen samlas. Konkret och tydlig start.","Variera och tillämpa i nya sammanhang.","De redo utmanas med öppna frågor och analys."],4:["Konkret start för hela klassen.","Koppla till tidigare kunskaper.","Tillämpa i mer komplexa sammanhang.","Öppna problem för de som är redo."]};

const FORBEREDELSE = [
["Skriv momentet på tavlan – fråga: 'Vad tror ni detta handlar om?'","Aktivera förkunskaper – pararbete i 1 minut","Presentera lektionsmålet tydligt"],
["Starta med en bild eller ett konkret exempel","Låt elever skriva ned vad de redan vet – dela i grupp","Formulera gemensamt en fråga ni ska besvara"],
["Börja med ett problemscenario","Pararbete: vad tror ni är svaret?","Samla hypoteser på tavlan – återkom i slutet"]
];
const AVSLUTNING = [
["Summera viktigaste punkterna tillsammans","Exit ticket: en sak de lärt sig + en fråga de har","Förhandsgranska nästa lektion"],
["Gemensam reflektion: 'Vad var svårast? Mest intressant?'","2–3 elever delar sin exit ticket högt","Koppla tillbaka till hypoteserna"],
["Pararbete: berätta vad ni tar med er","Läraren sammanfattar och lyfter det viktigaste","Kort förblick: 'Nästa lektion…'"]
];
const TIPS = [
["Börja alltid med konkreta exempel","Använd pararbete för att hålla alla aktiva","Cirkulera och ge individuell återkoppling"],
["Visa ditt eget resonemang högt","Låt elever förklara för varandra – peer teaching","Bygg in reflektionsstopp var 10:e minut"],
["Planera naturliga pauspunkter","Avancerade elever som resurspersoner","Samla frågor löpande – värdefull formativ info"]
];

// ─── BYGG LEKTION ─────────────────────────────────────────────────────────────
function buildLesson(grade, subject, area, chapter, numLevels, v=0) {
  if (![2,3,4].includes(numLevels)) numLevels = 3;
  if (!chapter || chapter.trim()==="") chapter = subject + " – centralt moment";
  if (!area || area.trim()==="") area = subject;
  const totalTid = STEG_TIDER[numLevels].reduce((s,t)=>s+parseInt(t),0)+10;
  const lgr22obj = LGR22[subject]||{kort:`Eleven ska utveckla kunskaper inom ${subject} enligt Lgr22.`, citat:`Lgr22, ${subject}: 'Undervisningen ska ge eleverna förutsättningar att utveckla kunskaper och förmågor inom ämnet.'`};
  const steg = STEG_RUBRIKER[numLevels].map((rubrik,i)=>{
    const ratio = i/(numLevels-1);
    const moment = ratio<0.34
      ? [`Förklara "${chapter}" med enkla ord och ett tydligt vardagsexempel`,`Visa steg-för-steg med visuellt stöd`,`Kontrollera förståelse: 'Räck upp handen om du förstår'`]
      : ratio<0.67
      ? [`Koppla "${chapter}" till vad eleverna redan kan`,`Presentera 2–3 varierade exempel med stigande svårighetsgrad`,`Låt elever lösa ett exempel självständigt`]
      : [`Utmana med ett öppet problem kopplat till "${chapter}"`,`Diskutera gränsfall: 'När fungerar detta inte?'`,`Uppmuntra elever att formulera egna frågor`];
    const fraga = ratio<0.34 ? `"Kan du förklara ${chapter.split(" ")[0]} med egna ord?"` : ratio<0.67 ? `"Hur förklarar du '${chapter.split(" ")[0]}' för någon som aldrig hört om det?"` : `"Var finns gränserna – när fungerar '${chapter.split(" ")[0]}' inte?"`;
    const signal = ratio<0.34 ? "Gå vidare när majoriteten visar grundförståelse." : ratio<0.67 ? "Elever som behöver stanna övar grunduppgifter." : "Alla välkomnas att lyssna och bidra på sin nivå.";
    return {rubrik:`Del ${i+1} – ${rubrik}`,ikon:STEG_IKONER[i],farg:STEG_FARG[i],tid:STEG_TIDER[numLevels][i],beskrivning:STEG_BESKRIVNING[numLevels][i],moment,fraga,signal};
  });
  return {meta:{grade,subject,area,chapter,numLevels},lgr22kort:lgr22obj.kort,lgr22citat:lgr22obj.citat,totalTid,forberedelse:FORBEREDELSE[v%3],steg,avslutning:AVSLUTNING[v%3],tips:TIPS[v%3]};
}

// ─── BYGG PROV ────────────────────────────────────────────────────────────────
function buildProv(grade, subject, chapter, numLevels) {
  const nivaLabels = {2:["Grundläggande","Avancerad"],3:["Grundläggande","Medel","Avancerad"],4:["Grundläggande","Medel","Avancerad","Högnivå"]};
  const labels = nivaLabels[numLevels]||nivaLabels[3];
  const nivor = labels.map((namn,i)=>{
    const ratio = i/(numLevels-1);
    const fragor = ratio<0.34
      ? [`Förklara vad "${chapter}" betyder med egna ord.`,`Ge ett exempel på ${chapter} från vardagen.`,`Sant eller falskt? (tre påståenden om ${chapter})`]
      : ratio<0.67
      ? [`Beskriv hur ${chapter} fungerar och ge ett eget exempel.`,`Jämför två olika fall av ${chapter} – vad är likt och vad är olikt?`,`Lös en uppgift som kräver förståelse av ${chapter}.`]
      : [`Analysera ett komplext problem som rör ${chapter}.`,`Koppla ${chapter} till ett verkligt sammanhang utanför skolan.`,`Motivera och argumentera: Varför är ${chapter} viktigt att förstå?`];
    return {namn,fragor};
  });
  return {type:"prov",meta:{grade,subject,chapter,numLevels},lgr22:LGR22[subject]?.kort||``,nivor};
}

// ─── TOLKA FRITEXT ────────────────────────────────────────────────────────────
const AMNEN_LIST = ["Svenska","Matematik","Engelska","Spanska","Franska","Tyska","Biologi","Fysik","Kemi","Geografi","Historia","Religionskunskap","Samhällskunskap","Bild","Musik","Idrott och hälsa","Slöjd","Teknik","Hemkunskap"];

function parseInput(text) {
  const t = text.toLowerCase();
  const isProv = /\bprov\b|\btest\b|\bquiz\b|\bfrågor\b|\bnp\b|nationellt prov|repetition|inför np|förberedelse/.test(t);
  
  // Klassdetektering
  let grade = 6;
  const gm = t.match(/åk\s*(\d)|klass\s*(\d)|(\d)\s*:?an/);
  if (gm) grade = parseInt(gm[1]||gm[2]||gm[3]);
  
  // Nivådetektering
  let numLevels = 3;
  const lm = t.match(/(\d)\s*nivå|nivå\s*(\d)/);
  if (lm) numLevels = Math.min(4,Math.max(2,parseInt(lm[1]||lm[2])));
  if (t.includes("blandad")||t.includes("mix")) numLevels = 3;
  if (![2,3,4].includes(numLevels)) numLevels = 3;
  
  // Ämnesdetektering – moderna språk måste komma före engelska
  let subject = "Matematik";
  if (t.includes("matte")) subject="Matematik";
  else if (t.includes("matematik")) subject="Matematik";
  else if (t.includes("franska")) subject="Franska";
  else if (t.includes("spanska")) subject="Spanska";
  else if (t.includes("tyska")) subject="Tyska";
  else if (t.includes("engelska")) subject="Engelska";
  else if (t.includes("svenska")) subject="Svenska";
  else if (t.includes("biologi")) subject="Biologi";
  else if (t.includes("bio")) subject="Biologi";
  else if (t.includes("fysik")) subject="Fysik";
  else if (t.includes("kemi")) subject="Kemi";
  else if (t.includes("geografi")) subject="Geografi";
  else if (t.includes("geo")) subject="Geografi";
  else if (t.includes("historia")) subject="Historia";
  else if (t.includes("religion")||t.includes(" re ")) subject="Religionskunskap";
  else if (t.includes("samhäll")) subject="Samhällskunskap";
  else if (t.includes("bild")) subject="Bild";
  else if (t.includes("musik")) subject="Musik";
  else if (t.includes("idrott")) subject="Idrott och hälsa";
  else if (t.includes("slöjd")) subject="Slöjd";
  else if (t.includes("teknik")) subject="Teknik";
  else if (t.includes("hemkunskap")||t.includes("hem- och")) subject="Hemkunskap";

  // Hämta tillgängliga områden för valt ämne och klass
  const gradeData = DATA[grade] || DATA[6];
  const subjectData = gradeData[subject] || {};
  const areas = Object.keys(subjectData);
  const defaultArea = areas[0] || subject;

  // Kapiteldetektering – kolla om något nyckelord matchar ett känt kapitel
  const keywords = [
    "nationellt prov","np matte","np svenska","np engelska","inför np","repetition inför",
    // Moderna språk
    "preteritum","imperfecto","passé composé","imparfait","futur simple","subjunktiv",
    "konjunktiv","perfekt","dativ","genitiv","konditionalis","grammatik","kommunikation",
    // Matematik
    "procent","bråk","decimaltal","algebra","ekvation","geometri","statistik",
    "sannolikhet","multiplikation","division","addition","subtraktion","pythagoras",
    "trigonometri","logaritm","derivata","potenser","rationella tal",
    // Svenska/Engelska
    "källkritik","argumenterande text","läsförståelse","substantiv","verb","adjektiv",
    // NO
    "fotosyntesen","cellen","ekosystem","immunförsvaret","genetik","evolution",
    "newtons lagar","elektricitet","termodynamik","radioaktivitet",
    // SO
    "franska revolutionen","vikingatiden","medeltiden","kalla kriget","industrialismen",
    "demokrati","mänskliga rättigheter","klimatpolitik"
  ];
  
  let chapter = subject + " – centralt moment";
  for (const kw of keywords) {
    if (t.includes(kw)) { chapter=kw.charAt(0).toUpperCase()+kw.slice(1); break; }
  }

  // Hitta bäst matchande area
  let bestArea = defaultArea;
  for (const area of areas) {
    if (t.includes(area.toLowerCase())) { bestArea = area; break; }
  }

  const v = Math.floor(Math.random()*3);
  if (isProv) return buildProv(grade, subject, chapter, numLevels);
  return buildLesson(grade, subject, bestArea, chapter, numLevels, v);
}

// ─── EXPORT TEXT ──────────────────────────────────────────────────────────────
function exportLesson(l) {
  let t=`LEKTIONSGUIDEN – Lgr22\n${"=".repeat(38)}\nKlass: ${l.meta.grade} | Ämne: ${l.meta.subject} | ${l.meta.chapter}\n\n📌 LGRKOPPLING\n${l.lgr22}\n\n📋 FÖRBEREDELSE\n${l.forberedelse.map((p,i)=>`${i+1}. ${p}`).join("\n")}\n\n📈 GENOMGÅNG\n`;
  l.steg.forEach(s=>{t+=`\n${s.rubrik} (${s.tid})\n${"-".repeat(24)}\n`;s.moment.forEach((m,i)=>t+=`${i+1}. ${m}\n`);t+=`❓ ${s.fraga}\n⏭ ${s.signal}\n`;});
  t+=`\n🔄 AVSLUTNING\n${l.avslutning.map((p,i)=>`${i+1}. ${p}`).join("\n")}\n\n💡 TIPS\n${l.tips.map((p,i)=>`${i+1}. ${p}`).join("\n")}\n`;
  return t;
}
function exportProv(p) {
  let t=`PROV – LektionsGuiden · Lgr22\n${"=".repeat(38)}\nÄmne: ${p.meta.subject} | Moment: ${p.meta.chapter} | Klass: ${p.meta.grade}\n\n`;
  p.nivor.forEach((n,i)=>{t+=`NIVÅ ${i+1}: ${n.namn.toUpperCase()}\n${"-".repeat(28)}\n`;n.fragor.forEach((f,j)=>t+=`${j+1}. ${f}\n`);t+="\n";});
  return t;
}

// ─── KORT-KOMPONENTER ────────────────────────────────────────────────────────
function LessonCard({l,onCopy,onPrint,copied}) {
  const [as,setAs]=useState(null);
  return (
    <div>
      <div style={{background:"linear-gradient(135deg,#1b5e20,#2e7d32)",borderRadius:14,padding:"1.2rem",color:"white",marginBottom:".7rem",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-15,right:-15,width:70,height:70,borderRadius:"50%",background:"rgba(255,255,255,0.07)"}}/>
        <div style={{display:"flex",flexWrap:"wrap",gap:".3rem",marginBottom:".5rem"}}>
          <span style={{background:"rgba(255,255,255,0.18)",borderRadius:50,padding:".2rem .65rem",fontSize:".73rem"}}>Klass {l.meta.grade}</span>
          <span style={{background:"rgba(255,255,255,0.18)",borderRadius:50,padding:".2rem .65rem",fontSize:".73rem"}}>{l.meta.subject}</span>
          <span style={{background:"rgba(255,255,255,0.22)",borderRadius:50,padding:".2rem .65rem",fontSize:".73rem",fontWeight:700}}>⏱ {l.totalTid} min</span>
        </div>
        <h2 style={{margin:"0 0 .35rem",fontSize:"1.15rem",fontFamily:"Georgia,serif"}}>{l.meta.chapter}</h2>
        <p style={{margin:0,fontSize:".78rem",opacity:.85,lineHeight:1.5}}>{l.lgr22kort}</p>
      </div>
      <div style={{background:"#e3f2fd",borderRadius:12,padding:"1rem 1.1rem",marginBottom:".7rem",borderLeft:"4px solid #1565c0"}}>
        <p style={{margin:"0 0 .25rem",color:"#1565c0",fontWeight:700,fontSize:".78rem"}}>📌 Koppling till Lgr22</p>
        <p style={{margin:0,color:"#0d2a4a",fontSize:".82rem",lineHeight:1.6,fontStyle:"italic"}}>{l.lgr22citat}</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:".45rem",marginBottom:".65rem"}}>
        {[["Nivåer",l.meta.numLevels],["Steg",l.steg.length],["Minuter",l.totalTid]].map(([lb,v])=>(
          <div key={lb} style={{background:"white",borderRadius:10,padding:".6rem",textAlign:"center",boxShadow:"0 2px 8px rgba(46,125,50,.07)"}}>
            <div style={{fontSize:"1.3rem",fontWeight:700,color:"#2e7d32"}}>{v}</div>
            <div style={{fontSize:".68rem",color:"#4a7c59"}}>{lb}</div>
          </div>
        ))}
      </div>
      <div style={{background:"white",borderRadius:10,padding:".9rem",marginBottom:".55rem",boxShadow:"0 2px 8px rgba(46,125,50,.07)"}}>
        <h4 style={{margin:"0 0 .4rem",color:"#1a3a2a",fontSize:".85rem"}}>📋 Förberedelse <span style={{fontWeight:400,color:"#4a7c59",fontSize:".72rem"}}>(5 min)</span></h4>
        <ul style={{margin:0,paddingLeft:"1.1rem"}}>{l.forberedelse.map((p,i)=><li key={i} style={{fontSize:".8rem",marginBottom:".2rem",color:"#1a2e1a"}}>{p}</li>)}</ul>
      </div>
      <div style={{background:"white",borderRadius:10,padding:".9rem",marginBottom:".55rem",boxShadow:"0 2px 8px rgba(46,125,50,.07)"}}>
        <h4 style={{margin:"0 0 .6rem",color:"#1a3a2a",fontSize:".85rem"}}>📈 Genomgång</h4>
        <div style={{display:"flex",gap:".35rem",flexWrap:"wrap",marginBottom:".6rem"}}>
          {l.steg.map((s,i)=>(
            <button key={i} onClick={()=>setAs(as===i?null:i)} style={{border:"none",borderRadius:50,padding:".3rem .75rem",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:".73rem",fontWeight:700,background:as===i?s.farg:"#f1f8e9",color:as===i?"white":s.farg}}>
              {s.ikon} {s.rubrik.split("–")[1]?.trim()||s.rubrik}
            </button>
          ))}
        </div>
        {l.steg.map((s,i)=>(
          <div key={i} style={{display:as===i||as===null?"block":"none",borderLeft:`4px solid ${s.farg}`,paddingLeft:".8rem",marginBottom:as===null?".9rem":0}}>
            <div style={{display:"flex",alignItems:"center",gap:".4rem",marginBottom:".25rem"}}>
              <strong style={{color:s.farg,fontSize:".82rem"}}>{s.rubrik}</strong>
              <span style={{marginLeft:"auto",background:"#f1f8e9",borderRadius:50,padding:".1rem .45rem",fontSize:".68rem",color:"#2e7d32",fontWeight:700}}>{s.tid}</span>
            </div>
            <p style={{margin:"0 0 .35rem",color:"#1a2e1a",fontSize:".78rem",fontStyle:"italic"}}>{s.beskrivning}</p>
            <ul style={{margin:"0 0 .45rem",paddingLeft:"1.1rem"}}>{s.moment.map((m,j)=><li key={j} style={{fontSize:".78rem",marginBottom:".18rem",color:"#1a2e1a"}}>{m}</li>)}</ul>
            <div style={{background:"#f1f8e9",borderRadius:7,padding:".35rem .65rem",marginBottom:".28rem"}}>
              <span style={{fontSize:".68rem",color:"#2e7d32",fontWeight:700}}>❓ </span>
              <span style={{fontSize:".76rem",color:"#1a2e1a",fontStyle:"italic"}}>{s.fraga}</span>
            </div>
            <div style={{background:"#fff8e1",borderRadius:7,padding:".35rem .65rem"}}>
              <span style={{fontSize:".68rem",color:"#f57f17",fontWeight:700}}>⏭ </span>
              <span style={{fontSize:".76rem",color:"#1a2e1a"}}>{s.signal}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{background:"white",borderRadius:10,padding:".9rem",marginBottom:".55rem",boxShadow:"0 2px 8px rgba(46,125,50,.07)"}}>
        <h4 style={{margin:"0 0 .4rem",color:"#1a3a2a",fontSize:".85rem"}}>🔄 Avslutning <span style={{fontWeight:400,color:"#4a7c59",fontSize:".72rem"}}>(5 min)</span></h4>
        <ul style={{margin:0,paddingLeft:"1.1rem"}}>{l.avslutning.map((p,i)=><li key={i} style={{fontSize:".8rem",marginBottom:".18rem",color:"#1a2e1a"}}>{p}</li>)}</ul>
      </div>
      <div style={{background:"#e8f5e9",borderRadius:10,padding:".9rem",marginBottom:".7rem",border:"1px solid #c8e6c9"}}>
        <h4 style={{margin:"0 0 .4rem",color:"#1a3a2a",fontSize:".85rem"}}>💡 Tips till läraren</h4>
        <ul style={{margin:0,paddingLeft:"1.1rem"}}>{l.tips.map((t,i)=><li key={i} style={{fontSize:".8rem",marginBottom:".18rem",color:"#1a2e1a"}}>{t}</li>)}</ul>
      </div>
      <div style={{display:"flex",gap:".45rem",flexWrap:"wrap"}}>
        <button onClick={onCopy} style={{background:"linear-gradient(135deg,#1565c0,#0d47a1)",color:"white",border:"none",borderRadius:50,padding:".55rem 1.1rem",fontSize:".78rem",fontFamily:"Georgia,serif",fontWeight:700,cursor:"pointer"}}>{copied?"✅ Kopierat!":"📋 Kopiera"}</button>
        <button onClick={onPrint} style={{background:"linear-gradient(135deg,#6a1b9a,#4a148c)",color:"white",border:"none",borderRadius:50,padding:".55rem 1.1rem",fontSize:".78rem",fontFamily:"Georgia,serif",fontWeight:700,cursor:"pointer"}}>🖨️ Skriv ut</button>
      </div>
    </div>
  );
}

function ProvCard({p,onCopy,copied}) {
  const NIVA_FARG = ["#1b5e20","#2e7d32","#388e3c","#43a047"];
  return (
    <div>
      <div style={{background:"linear-gradient(135deg,#0d47a1,#1565c0)",borderRadius:14,padding:"1.2rem",color:"white",marginBottom:".7rem"}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:".3rem",marginBottom:".5rem"}}>
          <span style={{background:"rgba(255,255,255,0.18)",borderRadius:50,padding:".2rem .65rem",fontSize:".73rem"}}>📝 Prov</span>
          <span style={{background:"rgba(255,255,255,0.18)",borderRadius:50,padding:".2rem .65rem",fontSize:".73rem"}}>Klass {p.meta.grade}</span>
          <span style={{background:"rgba(255,255,255,0.18)",borderRadius:50,padding:".2rem .65rem",fontSize:".73rem"}}>{p.meta.subject}</span>
        </div>
        <h2 style={{margin:"0 0 .3rem",fontSize:"1.15rem",fontFamily:"Georgia,serif"}}>{p.meta.chapter}</h2>
        <p style={{margin:0,fontSize:".78rem",opacity:.85}}>{p.lgr22}</p>
      </div>
      {p.nivor.map((niva,i)=>(
        <div key={i} style={{background:"white",borderRadius:10,padding:".9rem",marginBottom:".55rem",boxShadow:"0 2px 8px rgba(0,0,0,.06)",borderLeft:`4px solid ${NIVA_FARG[i]}`}}>
          <h4 style={{margin:"0 0 .5rem",color:NIVA_FARG[i],fontSize:".88rem"}}>Nivå {i+1}: {niva.namn}</h4>
          <ol style={{margin:0,paddingLeft:"1.2rem"}}>
            {niva.fragor.map((f,j)=><li key={j} style={{fontSize:".82rem",marginBottom:".35rem",color:"#1a2e1a",lineHeight:1.55}}>{f}</li>)}
          </ol>
        </div>
      ))}
      <div style={{display:"flex",gap:".45rem",flexWrap:"wrap",marginTop:".3rem"}}>
        <button onClick={onCopy} style={{background:"linear-gradient(135deg,#1565c0,#0d47a1)",color:"white",border:"none",borderRadius:50,padding:".55rem 1.1rem",fontSize:".78rem",fontFamily:"Georgia,serif",fontWeight:700,cursor:"pointer"}}>{copied?"✅ Kopierat!":"📋 Kopiera prov"}</button>
        <button onClick={()=>window.print()} style={{background:"linear-gradient(135deg,#6a1b9a,#4a148c)",color:"white",border:"none",borderRadius:50,padding:".55rem 1.1rem",fontSize:".78rem",fontFamily:"Georgia,serif",fontWeight:700,cursor:"pointer"}}>🖨️ Skriv ut</button>
      </div>
    </div>
  );
}

// ─── GUIDAT LÄGE ─────────────────────────────────────────────────────────────
function GuidatLage({onBack}) {
  const [grade,setGrade]=useState(null);
  const [subject,setSubject]=useState(null);
  const [area,setArea]=useState(null);
  const [chapter,setChapter]=useState(null);
  const [custom,setCustom]=useState("");
  const [numLevels,setNumLevels]=useState(null);
  const [lesson,setLesson]=useState(null);
  const [variant,setVariant]=useState(0);
  const [copied,setCopied]=useState(false);

  const grades=Object.keys(DATA).map(Number);
  const subjects=grade?Object.keys(DATA[grade]||{}):[];
  const areas=grade&&subject?Object.keys(DATA[grade]?.[subject]||{}):[];
  const chapters=grade&&subject&&area?DATA[grade]?.[subject]?.[area]||[]:[];
  const activeChapter=custom.trim()||chapter;

  function generate(v=0){setLesson(buildLesson(grade,subject,area,activeChapter,numLevels,v));setVariant(v);window.scrollTo(0,0);}
  function reset(){setGrade(null);setSubject(null);setArea(null);setChapter(null);setCustom("");setNumLevels(null);setLesson(null);window.scrollTo(0,0);}

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#e8f5e9,#f1f8e9,#e0f2f1)",fontFamily:"Georgia,serif",padding:"1rem"}}>
      <style>{`.cbtn{transition:all .18s;border:2px solid #a5d6a7;background:white;border-radius:10px;padding:.55rem .8rem;cursor:pointer;font-family:Georgia,serif;font-size:.83rem;color:#1a3a2a;text-align:left;width:100%}.cbtn:hover{border-color:#2e7d32;background:#f1f8e9}.cbtn.on{border-color:#2e7d32;background:#e8f5e9;font-weight:700}.gbtn{background:linear-gradient(135deg,#2e7d32,#1b5e20);color:white;border:none;border-radius:50px;padding:.75rem 1.8rem;font-size:.9rem;font-family:Georgia,serif;font-weight:700;cursor:pointer}.gbtn.sec{background:linear-gradient(135deg,#78909c,#546e7a)}ul{padding-left:1.2rem;margin:.3rem 0}li{margin-bottom:.3rem;line-height:1.55;color:#1a2e1a}`}</style>
      <div style={{maxWidth:660,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:".7rem",marginBottom:"1.2rem"}}>
          <button onClick={onBack} style={{background:"#2e7d32",color:"white",border:"none",borderRadius:8,padding:".4rem .85rem",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:".8rem"}}>← Hem</button>
          <span style={{fontSize:"1.5rem"}}>🌿</span>
          <div><div style={{color:"#1b5e20",fontWeight:700,fontSize:".95rem"}}>LektionsGuiden</div><div style={{color:"#4a7c59",fontSize:".72rem"}}>Guidat läge · Lgr22</div></div>
        </div>
        {!lesson ? (
          <div style={{background:"white",borderRadius:18,padding:"1.5rem",boxShadow:"0 4px 20px rgba(46,125,50,.08)"}}>
            <h2 style={{color:"#1a3a2a",marginTop:0,fontSize:"1.1rem"}}>Välj klass</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:".45rem",marginBottom:"1rem"}}>
              {grades.map(g=><button key={g} className={`cbtn${grade===g?" on":""}`} onClick={()=>{setGrade(g);setSubject(null);setArea(null);setChapter(null);setCustom("");}}>Klass {g}</button>)}
            </div>
            {grade&&<><h2 style={{color:"#1a3a2a",fontSize:"1rem",marginTop:"1rem"}}>Välj ämne</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:".45rem",marginBottom:"1rem"}}>
              {subjects.map(s=><button key={s} className={`cbtn${subject===s?" on":""}`} onClick={()=>{setSubject(s);setArea(null);setChapter(null);setCustom("");}}>{s}</button>)}
            </div></>}
            {subject&&<><h2 style={{color:"#1a3a2a",fontSize:"1rem",marginTop:"1rem"}}>Välj område</h2>
            <div style={{display:"grid",gap:".4rem",marginBottom:"1rem"}}>
              {areas.map(a=><button key={a} className={`cbtn${area===a?" on":""}`} onClick={()=>{setArea(a);setChapter(null);setCustom("");}}>{a}</button>)}
            </div></>}
            {area&&<><h2 style={{color:"#1a3a2a",fontSize:"1rem",marginTop:"1rem"}}>Välj kapitel / lektion</h2>
            <div style={{display:"grid",gap:".35rem",maxHeight:240,overflowY:"auto",paddingRight:4,marginBottom:"1rem"}}>
              {chapters.map(c=><button key={c} className={`cbtn${chapter===c&&!custom?" on":""}`} onClick={()=>{setChapter(c);setCustom("");}}>📖 {c}</button>)}
            </div>
            <div style={{borderTop:"2px dashed #c8e6c9",paddingTop:".9rem"}}>
              <p style={{color:"#2e7d32",fontWeight:700,fontSize:".85rem",margin:"0 0 .4rem"}}>✏️ Skriv eget kapitel, sidnummer eller innehåll</p>
              <textarea value={custom} onChange={e=>{setCustom(e.target.value);if(e.target.value)setChapter(null);}} placeholder="T.ex. 'Källkritik – övningar s. 47' eller 'Kap. 6 – Procentberäkning'" rows={3} style={{width:"100%",border:"2px solid #a5d6a7",borderRadius:10,padding:".65rem .9rem",fontFamily:"Georgia,serif",fontSize:".88rem",color:"#1a3a2a",outline:"none",resize:"vertical",boxSizing:"border-box"}}/>
              {custom.trim()&&<p style={{color:"#4a7c59",fontSize:".75rem",margin:".35rem 0 0",fontStyle:"italic"}}>✅ Genomgången anpassas till: "{custom.trim()}"</p>}
            </div></>}
            {activeChapter&&<><h2 style={{color:"#1a3a2a",fontSize:"1rem",marginTop:"1.2rem"}}>Antal kunskapsnivåer</h2>
            <div style={{display:"flex",flexDirection:"column",gap:".55rem",marginBottom:"1.2rem"}}>
              {[{n:2,d:"Två steg – grund och fördjupning"},{n:3,d:"Tre steg – introduktion, fördjupning, analys"},{n:4,d:"Fyra steg – gradvis från grund till avancerad"}].map(({n,d})=>(
                <button key={n} onClick={()=>setNumLevels(n)} style={{border:`2px solid ${numLevels===n?"#2e7d32":"#a5d6a7"}`,background:numLevels===n?"#e8f5e9":"white",borderRadius:10,padding:".7rem 1rem",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:".88rem",color:"#1a3a2a",textAlign:"left"}}>
                  <strong>{n} nivåer</strong><span style={{fontSize:".78rem",opacity:.75,marginLeft:".4rem"}}>{d}</span>
                </button>
              ))}
            </div>
            <div style={{display:"flex",justifyContent:"flex-end"}}>
              <button className="gbtn" disabled={!numLevels} onClick={()=>generate(0)} style={{opacity:numLevels?1:.4}}>✨ Skapa genomgång</button>
            </div></>}
          </div>
        ) : (
          <div>
            <LessonCard l={lesson} copied={copied} onCopy={()=>{navigator.clipboard.writeText(exportLesson(lesson)).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2500);});}} onPrint={()=>window.print()}/>
            <div style={{display:"flex",gap:".5rem",justifyContent:"center",flexWrap:"wrap",marginTop:"1rem",paddingBottom:"2rem"}}>
              <button className="gbtn sec" onClick={reset}>🔄 Ny genomgång</button>
              <button className="gbtn" onClick={()=>generate(variant+1)}>✨ Variera</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CHATTLÄGE ────────────────────────────────────────────────────────────────
const EXEMPEL = [
  "Genomgång matte åk 6 om procent, 3 nivåer",
  "Genomgång svenska åk 8, 3 nivåer",
  "Genomgång matte åk 9, algebra, 3 nivåer",
  "Genomgång biologi åk 7, genetik, 2 nivåer",
  "Genomgång historia åk 5, vikingatiden, 2 nivåer"
];

function ChattLage({onBack}) {
  const [messages,setMessages]=useState([]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const [copied,setCopied]=useState(false);
  const chatEndRef=useRef(null);
  const chatTopRef=useRef(null);
  const scrollContainerRef=useRef(null);


  function sendMessage(text) {
    if (!text.trim()||loading) return;
    setMessages(prev=>[...prev,{role:"user",content:text}]);
    setInput(""); setLoading(true);
    setTimeout(()=>{
      try {
        const result=parseInput(text);
        if(!result || !result.meta) throw new Error("Ogiltigt resultat");
        const type=result.type==="prov"?"__prov__":"__lesson__";
        setMessages(prev=>[...prev,{role:"assistant",content:type,data:result}]);setTimeout(()=>{if(scrollContainerRef.current)scrollContainerRef.current.scrollTop=0;},50);
      } catch(e) {
        setMessages(prev=>[...prev,{role:"assistant",content:"Försök t.ex: Genomgång matte åk 6, Prov svenska åk 9"}]);
      }
      setLoading(false);
    },800);
  }

  return (
    <div style={{height:"100vh",background:"linear-gradient(135deg,#e8f5e9,#f1f8e9)",fontFamily:"Georgia,serif",display:"flex",flexDirection:"column"}}>
      <style>{`@keyframes pulse{0%,100%{opacity:.35}50%{opacity:1}}.dot{animation:pulse 1.2s ease infinite}@keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.fi{animation:fi .35s ease}ul{padding-left:1.2rem;margin:.3rem 0}li{margin-bottom:.28rem;line-height:1.55;color:#1a2e1a}textarea:focus{border-color:#2e7d32!important;outline:none}`}</style>
      <div style={{background:"#1b5e20",padding:".8rem 1rem",display:"flex",alignItems:"center",gap:".65rem",boxShadow:"0 2px 8px rgba(0,0,0,.15)",flexShrink:0}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:7,padding:".28rem .6rem",color:"white",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:".78rem"}}>← Hem</button>
        <span style={{fontSize:"1.15rem"}}>🌿</span>
        <div><div style={{color:"white",fontWeight:700,fontSize:".88rem"}}>LektionsGuiden</div><div style={{color:"#a5d6a7",fontSize:".65rem"}}>Chattläge · Lgr22 · Genomgångar & Prov</div></div>
      </div>
      <div ref={scrollContainerRef} style={{flex:1,overflowY:"auto",padding:".9rem",maxWidth:680,width:"100%",margin:"0 auto",boxSizing:"border-box"}}>
        <div ref={chatTopRef}/>
    {messages.length===0&&(
          <div className="fi" style={{textAlign:"center",padding:"1.2rem .5rem"}}>
            <div style={{fontSize:"2rem",marginBottom:".7rem"}}>👋</div>
            <h2 style={{color:"#1b5e20",margin:"0 0 .35rem",fontSize:"1.1rem"}}>Hej! Vad behöver du?</h2>
            <p style={{color:"#4a7c59",fontSize:".83rem",marginBottom:"1rem"}}>Beskriv fritt – genomgång eller prov skapas direkt.</p>
            <div style={{display:"grid",gap:".4rem"}}>
              {EXEMPEL.map((ex,i)=><button key={i} onClick={()=>sendMessage(ex)} style={{background:"white",border:"2px solid #c8e6c9",borderRadius:11,padding:".6rem .85rem",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:".8rem",color:"#1a3a2a",textAlign:"left"}}>💬 {ex}</button>)}
            </div>
          </div>
        )}
        {messages.map((msg,i)=>(
          <div key={i} className="fi" style={{marginBottom:".85rem",display:"flex",flexDirection:"column",alignItems:msg.role==="user"?"flex-end":"flex-start"}}>
            {msg.role==="user"
              ? <div style={{background:"#2e7d32",color:"white",borderRadius:"16px 16px 4px 16px",padding:".6rem .95rem",maxWidth:"80%",fontSize:".86rem",lineHeight:1.5}}>{msg.content}</div>
              : msg.content==="__lesson__"||msg.content==="__prov__"
              ? <div style={{width:"100%"}}>
                  <div style={{color:"#2e7d32",fontSize:".75rem",marginBottom:".28rem",fontWeight:700}}>🌿 LektionsGuiden</div>
                  <div style={{background:"white",borderRadius:"4px 16px 16px 16px",padding:".9rem",boxShadow:"0 2px 12px rgba(46,125,50,.1)"}}>
                    <p style={{margin:"0 0 .5rem",color:"#1a3a2a",fontSize:".83rem",fontWeight:700}}>{msg.content==="__prov__"?"📝 Här är ditt prov!":"✅ Här är din genomgång!"}</p>
                    {msg.data && msg.content==="__prov__"
                      ? <ProvCard p={msg.data} copied={copied} onCopy={()=>{navigator.clipboard.writeText(exportProv(msg.data)).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2500);});}}/>
                      : msg.data ? <LessonCard l={msg.data} copied={copied} onCopy={()=>{navigator.clipboard.writeText(exportLesson(msg.data)).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2500);});}} onPrint={()=>window.print()}/> : <p style={{color:"#c0392b",fontSize:".82rem"}}>Kunde inte skapa innehåll. Försök igen med ett annat ämne.</p>}
                  </div>
                </div>
              : <div style={{width:"100%"}}>
                  <div style={{color:"#2e7d32",fontSize:".75rem",marginBottom:".28rem",fontWeight:700}}>🌿 LektionsGuiden</div>
                  <div style={{background:"white",borderRadius:"4px 16px 16px 16px",padding:".6rem .95rem",maxWidth:"85%",fontSize:".83rem",color:"#1a2e1a",lineHeight:1.6,boxShadow:"0 2px 8px rgba(46,125,50,.08)"}}>{msg.content}</div>
                </div>}
          </div>
        ))}
        {loading&&<div style={{display:"flex",alignItems:"center",gap:".45rem",marginBottom:".85rem"}}>
          <div style={{color:"#2e7d32",fontSize:".75rem",fontWeight:700}}>🌿 LektionsGuiden</div>
          <div style={{background:"white",borderRadius:"4px 16px 16px 16px",padding:".6rem .9rem",boxShadow:"0 2px 8px rgba(46,125,50,.08)"}}>
            <div style={{display:"flex",gap:".28rem",alignItems:"center"}}>
              {[0,.2,.4].map((d,i)=><div key={i} className="dot" style={{width:6,height:6,borderRadius:"50%",background:"#2e7d32",animationDelay:`${d}s`}}/>)}
              <span style={{fontSize:".76rem",color:"#4a7c59",marginLeft:".28rem"}}>Skapar…</span>
            </div>
          </div>
        </div>}
        <div ref={chatEndRef}/>
      </div>
      <div style={{background:"white",borderTop:"1px solid #e8f5e9",padding:".7rem .9rem",boxShadow:"0 -2px 12px rgba(46,125,50,.06)",flexShrink:0}}>
        <div style={{maxWidth:680,margin:"0 auto",display:"flex",gap:".45rem",alignItems:"flex-end"}}>
          <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage(input);}}} placeholder="T.ex. 'Prov matte åk 6 procent' eller 'Genomgång franska åk 8'..." rows={2}
            style={{flex:1,border:"2px solid #a5d6a7",borderRadius:12,padding:".6rem .85rem",fontFamily:"Georgia,serif",fontSize:".86rem",color:"#1a3a2a",resize:"none",lineHeight:1.5,boxSizing:"border-box"}}/>
          <button onClick={()=>sendMessage(input)} disabled={!input.trim()||loading}
            style={{background:!input.trim()||loading?"#c8e6c9":"linear-gradient(135deg,#2e7d32,#1b5e20)",color:"white",border:"none",borderRadius:10,padding:".68rem .95rem",cursor:!input.trim()||loading?"default":"pointer",fontSize:"1.05rem"}}>➤</button>
        </div>
        <p style={{textAlign:"center",color:"#a5d6a7",fontSize:".65rem",margin:".35rem 0 0"}}>Enter för att skicka · Shift+Enter för ny rad</p>
      </div>
    </div>
  );
}

// ─── PEDAGOGAI ────────────────────────────────────────────────────────────────
const PEDAGOGAI_SYSTEM = `Du är PedagogAI – en erfaren och varm pedagogisk assistent för svenska lärare i grundskolan (åk 1–9).

Du är specialiserad på:
- Pedagogik och didaktik enligt Lgr22
- Lektionsplanering och differentiering
- Klassrumssituationer och hantering av gruppdynamik
- Bedömning, betyg och formativ bedömning
- Ämnesspecifika frågor och kursplaner
- Kollegialt lärande och kompetensutveckling
- Elevers välmående och motivation
- Samarbete med vårdnadshavare

Du svarar alltid på svenska, är konkret och praktisk, och ger svar som en erfaren kollega skulle ge. Du är varm, uppmuntrande och professionell. Om läraren verkar stressad eller frustrerad, möt dem med förståelse först.

Håll svaren lagom långa – helst under 200 ord om inte frågan kräver mer. Använd gärna korta punktlistor när det passar.`;

const PEDAGOGAI_EXAMPLES = [
  "Hur kan jag differentiera en mattelektion om bråk för åk 5?",
  "Tips på hur jag hanterar en elev som stör lektionen?",
  "Hur skriver jag ett bra omdöme i svenska?",
  "Vad säger Lgr22 om formativ bedömning?",
  "Hur motiverar jag omotiverade elever i åk 8?",
];

function PedagogAI({onBack}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text) {
    if (!text.trim() || loading) return;
    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: PEDAGOGAI_SYSTEM,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "Något gick fel. Försök igen.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Kunde inte ansluta. Kontrollera internetanslutningen och försök igen." }]);
    }
    setLoading(false);
  }

  function clearChat() {
    setMessages([]);
  }

  return (
    <div style={{height:"100vh",background:"linear-gradient(135deg,#e8eaf6,#f3e5f5,#e8f5e9)",fontFamily:"Georgia,serif",display:"flex",flexDirection:"column"}}>
      <style>{`
        @keyframes pulse{0%,100%{opacity:.35}50%{opacity:1}}
        .pdot{animation:pulse 1.2s ease infinite}
        @keyframes pfi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .pfi{animation:pfi .35s ease}
        .pai-msg{white-space:pre-wrap;line-height:1.7}
        textarea:focus{outline:none}
      `}</style>

      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#4527a0,#6a1b9a)",padding:".8rem 1rem",display:"flex",alignItems:"center",gap:".65rem",boxShadow:"0 2px 12px rgba(69,39,160,.3)",flexShrink:0}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:7,padding:".28rem .6rem",color:"white",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:".78rem"}}>← Hem</button>
        <div style={{fontSize:"1.2rem"}}>🧠</div>
        <div style={{flex:1}}>
          <div style={{color:"white",fontWeight:700,fontSize:".95rem",letterSpacing:".3px"}}>PedagogAI</div>
          <div style={{color:"#ce93d8",fontSize:".65rem"}}>Din pedagogiska assistent · Lgr22 · Grundskolan åk 1–9</div>
        </div>
        {messages.length > 0 && (
          <button onClick={clearChat} style={{background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:7,padding:".28rem .7rem",color:"white",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:".72rem"}}>
            Rensa
          </button>
        )}
      </div>

      {/* Messages */}
      <div style={{flex:1,overflowY:"auto",padding:"1rem",maxWidth:700,width:"100%",margin:"0 auto",boxSizing:"border-box"}}>
        {messages.length === 0 && (
          <div className="pfi" style={{textAlign:"center",padding:"1.5rem .5rem"}}>
            <div style={{fontSize:"2.5rem",marginBottom:".6rem"}}>🧠</div>
            <h2 style={{color:"#4527a0",margin:"0 0 .3rem",fontSize:"1.15rem",fontWeight:700}}>Hej! Jag är PedagogAI</h2>
            <p style={{color:"#7b1fa2",fontSize:".85rem",marginBottom:"1.2rem",lineHeight:1.6}}>
              Fråga mig vad som helst om undervisning, pedagogik och Lgr22.<br/>Jag minns hela vår konversation.
            </p>
            <div style={{display:"grid",gap:".45rem",textAlign:"left"}}>
              {PEDAGOGAI_EXAMPLES.map((ex,i)=>(
                <button key={i} onClick={()=>sendMessage(ex)}
                  style={{background:"white",border:"2px solid #d1c4e9",borderRadius:12,padding:".65rem .9rem",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:".82rem",color:"#4527a0",textAlign:"left",transition:"all .15s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="#7b1fa2"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="#d1c4e9"}
                >
                  💬 {ex}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className="pfi" style={{marginBottom:"1rem",display:"flex",flexDirection:"column",alignItems:msg.role==="user"?"flex-end":"flex-start"}}>
            {msg.role === "user" ? (
              <div style={{background:"linear-gradient(135deg,#4527a0,#6a1b9a)",color:"white",borderRadius:"18px 18px 4px 18px",padding:".65rem 1rem",maxWidth:"80%",fontSize:".86rem",lineHeight:1.6}}>
                {msg.content}
              </div>
            ) : (
              <div style={{width:"100%"}}>
                <div style={{display:"flex",alignItems:"center",gap:".4rem",marginBottom:".3rem"}}>
                  <div style={{width:22,height:22,borderRadius:"50%",background:"linear-gradient(135deg,#4527a0,#6a1b9a)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".7rem"}}>🧠</div>
                  <span style={{color:"#6a1b9a",fontSize:".72rem",fontWeight:700}}>PedagogAI</span>
                </div>
                <div style={{background:"white",borderRadius:"4px 18px 18px 18px",padding:".8rem 1rem",maxWidth:"90%",fontSize:".85rem",color:"#1a1a2e",lineHeight:1.7,boxShadow:"0 2px 12px rgba(69,39,160,.08)"}}>
                  <div className="pai-msg">{msg.content}</div>
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{display:"flex",alignItems:"flex-start",gap:".4rem",marginBottom:"1rem"}}>
            <div style={{width:22,height:22,borderRadius:"50%",background:"linear-gradient(135deg,#4527a0,#6a1b9a)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".7rem",flexShrink:0,marginTop:2}}>🧠</div>
            <div style={{background:"white",borderRadius:"4px 18px 18px 18px",padding:".7rem .9rem",boxShadow:"0 2px 8px rgba(69,39,160,.08)"}}>
              <div style={{display:"flex",gap:".3rem",alignItems:"center"}}>
                {[0,.2,.4].map((d,i)=>(
                  <div key={i} className="pdot" style={{width:7,height:7,borderRadius:"50%",background:"#6a1b9a",animationDelay:`${d}s`}}/>
                ))}
                <span style={{fontSize:".74rem",color:"#9c4dcc",marginLeft:".3rem"}}>Tänker…</span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef}/>
      </div>

      {/* Input */}
      <div style={{background:"white",borderTop:"1px solid #e8d5f5",padding:".8rem 1rem",boxShadow:"0 -2px 16px rgba(69,39,160,.08)",flexShrink:0}}>
        <div style={{maxWidth:700,margin:"0 auto",display:"flex",gap:".5rem",alignItems:"flex-end"}}>
          <textarea
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage(input);}}}
            placeholder="Fråga om pedagogik, lektioner, Lgr22, bedömning…"
            rows={2}
            style={{flex:1,border:"2px solid #d1c4e9",borderRadius:14,padding:".65rem .9rem",fontFamily:"Georgia,serif",fontSize:".86rem",color:"#1a1a2e",resize:"none",lineHeight:1.5,boxSizing:"border-box",transition:"border-color .15s"}}
            onFocus={e=>e.target.style.borderColor="#6a1b9a"}
            onBlur={e=>e.target.style.borderColor="#d1c4e9"}
          />
          <button
            onClick={()=>sendMessage(input)}
            disabled={!input.trim()||loading}
            style={{background:!input.trim()||loading?"#e1bee7":"linear-gradient(135deg,#4527a0,#6a1b9a)",color:"white",border:"none",borderRadius:12,padding:".7rem 1rem",cursor:!input.trim()||loading?"default":"pointer",fontSize:"1.1rem",transition:"all .15s",flexShrink:0}}
          >➤</button>
        </div>
        <p style={{textAlign:"center",color:"#ce93d8",fontSize:".65rem",margin:".3rem 0 0"}}>Enter för att skicka · Shift+Enter för ny rad · Konversationen sparas under sessionen</p>
      </div>
    </div>
  );
}

// ─── STARTSIDA + HUVUD ────────────────────────────────────────────────────────
export default function LektionsGuiden() {
  const [mode,setMode]=useState(null);
  if (mode==="chat") return <ChattLage onBack={()=>{setMode(null);window.scrollTo(0,0);}}/>;
  if (mode==="guide") return <GuidatLage onBack={()=>{setMode(null);window.scrollTo(0,0);}}/>;
  if (mode==="pedagogai") return <PedagogAI onBack={()=>{setMode(null);window.scrollTo(0,0);}}/>;

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#e8f5e9,#f1f8e9,#e0f2f1)",fontFamily:"Georgia,serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"2rem 1rem"}}>
      <style>{`@keyframes fi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.fi{animation:fi .4s ease}`}</style>
      <div className="fi" style={{textAlign:"center",maxWidth:480,width:"100%"}}>
        <span style={{fontSize:"2.8rem"}}>🌿</span>
        <h1 style={{fontSize:"1.9rem",color:"#1b5e20",margin:".4rem 0 .2rem",fontWeight:700}}>LektionsGuiden</h1>
        <p style={{color:"#4a7c59",marginBottom:"2rem",fontSize:".88rem"}}>Differentierad undervisning · Lgr22 · Åk 1–9</p>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
          <button onClick={()=>{setMode("chat");window.scrollTo(0,0);if(window.gtag)window.gtag("event","open_flik",{flik:"Chattläge"});}} style={{background:"linear-gradient(135deg,#1b5e20,#2e7d32)",color:"white",border:"none",borderRadius:16,padding:"1.5rem .9rem",cursor:"pointer",fontFamily:"Georgia,serif",boxShadow:"0 4px 20px rgba(27,94,32,0.25)"}}>
            <div style={{fontSize:"1.7rem",marginBottom:".35rem"}}>💬</div>
            <div style={{fontSize:".95rem",fontWeight:700,marginBottom:".2rem"}}>Chattläge</div>
            <div style={{fontSize:".72rem",opacity:.88}}>Skriv fritt – genomgång eller prov skapas direkt</div>
          </button>
          <button onClick={()=>{setMode("guide");window.scrollTo(0,0);if(window.gtag)window.gtag("event","open_flik",{flik:"Guidat läge"});}} style={{background:"white",color:"#1b5e20",border:"2px solid #a5d6a7",borderRadius:16,padding:"1.5rem .9rem",cursor:"pointer",fontFamily:"Georgia,serif",boxShadow:"0 4px 20px rgba(27,94,32,0.08)"}}>
            <div style={{fontSize:"1.7rem",marginBottom:".35rem"}}>📋</div>
            <div style={{fontSize:".95rem",fontWeight:700,marginBottom:".2rem"}}>Guidat läge</div>
            <div style={{fontSize:".72rem",color:"#4a7c59"}}>Välj klass, ämne och moment steg för steg</div>
          </button>
        </div>

        {/* PedagogAI – full width */}
        <button onClick={()=>{setMode("pedagogai");window.scrollTo(0,0);if(window.gtag)window.gtag("event","open_flik",{flik:"PedagogAI"});}} style={{width:"100%",background:"linear-gradient(135deg,#4527a0,#6a1b9a)",color:"white",border:"none",borderRadius:16,padding:"1.2rem 1rem",cursor:"pointer",fontFamily:"Georgia,serif",boxShadow:"0 4px 20px rgba(69,39,160,0.25)",marginBottom:"1.2rem",display:"flex",alignItems:"center",gap:"1rem",textAlign:"left"}}>
          <div style={{fontSize:"2rem",flexShrink:0}}>🧠</div>
          <div>
            <div style={{fontSize:"1rem",fontWeight:700,marginBottom:".15rem"}}>PedagogAI – din pedagogiska assistent</div>
            <div style={{fontSize:".75rem",opacity:.88}}>Fråga om pedagogik, Lgr22, bedömning, klassrumssituationer och mer · AI-driven konversation</div>
          </div>
        </button>

        <div style={{background:"white",borderRadius:12,padding:".7rem 1rem",border:"1px solid #c8e6c9",marginBottom:"1.2rem"}}>
          <p style={{margin:0,color:"#2e7d32",fontSize:".78rem",fontWeight:700}}>💬 Prova i chattläget:</p>
          <p style={{margin:".2rem 0 0",color:"#4a7c59",fontSize:".75rem"}}>"Prov matte åk 6 procent" · "Genomgång franska åk 8 preteritum" · "Quiz biologi immunförsvaret"</p>
        </div>
        <p style={{color:"#a5d6a7",fontSize:".7rem"}}>av MD · lektionsguiden.vercel.app</p>
      </div>
    </div>
  );
}
