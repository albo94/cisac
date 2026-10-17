# CISAC Protezione Catodica srl – Sito Web

Sito statico HTML/CSS/JS pensato per **GitHub Pages**, ricostruito partendo dal sito Wix
attuale `https://www.cisac.it`.

## Struttura file

```
/
├── index.html          – Home (hero, chi siamo, servizi, mission/vision, certificazioni, referenze)
├── squadra.html        – La nostra squadra (12 persone, certificazioni CICPND)
├── referenze.html      – Griglia 25 loghi clienti
├── contatti.html       – Recapiti, form di contatto, mappa Google
├── sitemap.xml         – con lastmod; include anche il PDF della politica
├── robots.txt          – consente esplicitamente i crawler dei motori generativi
├── llms.txt            – sintesi strutturata del sito per gli assistenti AI
├── .nojekyll           – necessario per GitHub Pages (evita il build Jekyll)
├── CNAME               – dominio `www.cisac.it`: **non toccare** (vedi "Pubblicazione")
├── 404.html            – pagina d’errore con grafica del sito (percorsi **assoluti**, vedi sotto)
├── team.html           – redirect dal vecchio URL Wix `/team` a `squadra.html`
├── css/style.css       – Unico foglio di stile
├── js/main.js          – Hamburger, contatori, reveal scroll, invio form, anno footer
├── images/
│   ├── logo-cisac.png  – Logo ufficiale (Centro Italiano Servizi AntiCorrosione + APCE/CEOCOR/RINA)
│   ├── favicon-16.png / favicon-32.png / favicon-192.png / favicon-512.png
│   ├── apple-touch-icon.png
│   ├── avatar.png      – Avatar generico scaricato dal sito Wix (attualmente non usato: si usano le iniziali)
│   └── referenze/      – 25 loghi clienti (a2a, snam-rete-gas, italgas, enel, hera, iren, …)
└── docs/
    └── politica-aziendale.pdf   – Politica Aziendale firmata (San Paolo d’Argon, 31/05/2024)
```

## Dati azienda

- **Ragione sociale**: CISAC Protezione Catodica srl
- **Sede**: via Volta 16/A – 24060 San Paolo d'Argon (BG)
- **Tel**: 035-583244  _(il fax è stato dismesso: rimosso dal sito il 15/09/2026)_
- **Email**: info@cisac.it · **PEC**: cisacsrl@ticertifica.it
- **P.IVA**: 02887600167
- **LinkedIn**: https://www.linkedin.com/company/24655449 — **non più linkato dal sito**
  (pulsanti e scheda "Social" rimossi il 16/10/2026 su richiesta del cliente); resta solo
  nel `sameAs` del JSON-LD, vedi sezione "Dati strutturati e GEO"
- **Privacy**: iubenda https://www.iubenda.com/privacy-policy/50228978
- **Tecnici operanti dal**: 1966
- **Certificazioni**: UNI EN ISO 9001, 14001, 45001 (RINA/CISQ), UNI EN ISO 15257 (CICPND/ACCREDIA)
- **Associazioni**: APCE, CEOCOR

## Palette (CSS custom properties) — campionata dal sito attuale

| Variabile     | Valore    | Uso                                            |
|---------------|-----------|------------------------------------------------|
| `--navy`      | `#122f88` | Fascia header, footer, titoli                  |
| `--navy-dark` | `#0c1f5e` | Hover bottoni navy                             |
| `--navy-soft` | `#eef1fa` | Sfondo avatar squadra                          |
| `--yellow`    | `#ffd600` | **Segno distintivo**: banda, tab attiva, pill, icone |
| `--yellow-dark`| `#e7c200`| Hover giallo                                    |
| `--text`      | `#605e5e` | Corpo testo (uguale all'originale)             |
| `--gray`      | `#f7f8fa` | Sezioni alternate                              |
| `--line`      | `#e6e8ee` | Bordi card                                     |

## Font

- **Raleway** (Google Fonts) – brand, nav, titoli, bottoni, label
- **Barlow** (Google Fonts, peso 300) – corpo testo, sostituto di DIN Next Light usato su Wix

## Componenti principali

### Header (fascia navy sticky)
Due righe, come l'originale:
- riga 1: brand `CISAC Protezione Catodica srl` + pill "Sede: …"
- riga 2: nav + pill telefono/email

Il quadrato giallo LinkedIn (`.social-sq`) è stato tolto il 16/10/2026 da header, menu
mobile e footer, insieme al suo CSS e al contenitore `.footer-social` rimasto vuoto.

La voce di menu attiva ha sfondo giallo e **freccetta triangolare** sotto
(`.main-nav a.current::after`). Sotto i 1150px il menu diventa hamburger + overlay navy.

### Banda gialla
`.footer-strip` – giallo `#ffd600`, testo navy maiuscolo con `letter-spacing: .3em`,
testo "Anticorrosione strutture interrate". Presente su tutte le pagine sopra il footer.

### Squadra
Card con avatar a **iniziali** (non foto: il sito Wix usa un placeholder generico).
`.member.lead` = avatar giallo, usato per il CEO.

### Favicon
Ricavata dal simbolo del logo (sagoma Italia + tubo diagonale), non dal logo intero:
a 16px il logo completo diventa illeggibile. La sagoma è stata **riempita** partendo
dal contorno del PNG (flood fill + chiusura morfologica), perché nell'originale
è solo un profilo sottile che sparisce in miniatura.
Colori: fondo navy, Italia bianca, tubo **giallo** — nel logo il tubo è rosso, ma
rosso su navy non ha contrasto sufficiente a 16px. Sorgenti in
`images/favicon-*.png`, `apple-touch-icon.png` e `favicon.ico` (16/32/48).
Titoli pagina: iniziano tutti con `CISAC – ` così il brand resta visibile nella
scheda del browser, che tronca dopo ~15 caratteri.

### Dati strutturati e GEO (ottimizzazione per i motori generativi)

Intervento del 16/10/2026. Nessun testo visibile è stato aggiunto: solo metadati,
semantica e file tecnici.

**JSON-LD** – ogni pagina ha un unico blocco `<script type="application/ld+json">`
con un `@graph`. I nodi condivisi hanno `@id` stabili e le pagine li referenziano
invece di duplicarli:

| `@id` | Nodo |
|---|---|
| `https://www.cisac.it/#organizzazione` | `Organization` + `ProfessionalService` |
| `https://www.cisac.it/#sito` | `WebSite` |
| `https://www.cisac.it/#sede` | `LocalBusiness` (solo in contatti.html) |

Per pagina: `WebPage` (home), `AboutPage` (squadra), `CollectionPage` (referenze),
`ContactPage` (contatti), più `BreadcrumbList` sulle tre pagine interne.
Il nodo organizzazione porta `knowsAbout`, `hasCertification` (le 4 norme ISO),
`memberOf` (APCE, CEOCOR), `contactPoint`, `areaServed`, `numberOfEmployees` e
`hasOfferCatalog` con i 6 servizi. `squadra.html` espone un `ItemList` di 12 `Person`
con `hasCredential` per ogni certificazione CICPND; `referenze.html` un `ItemList`
dei 25 clienti.

**Gli schemi sono generati dal contenuto visibile, non scritti a mano.** Lo script
sta in `_strumenti/geo_build.py` (fuori dal repo pubblicato): rilegge servizi, squadra
e referenze dalle pagine e riscrive i blocchi JSON-LD. Dopo aver modificato uno di quei
tre elenchi, rilanciarlo invece di correggere il JSON a mano:

```
python -I _strumenti/geo_build.py sito-cisac
python -I _strumenti/geo_check.py sito-cisac
```

`geo_check.py` verifica che il JSON sia valido, che i tag siano bilanciati e che il
sitemap sia ben formato.

**`sameAs` LinkedIn** – il nodo organizzazione dichiara ancora la pagina aziendale LinkedIn
in `sameAs`, anche dopo la rimozione dei pulsanti dal sito. È invisibile ai visitatori e
serve ai motori a collegare l’azienda al suo profilo. Se il cliente non vuole che compaia
nemmeno lì, va tolto da `_strumenti/geo_build.py` (riga `"sameAs"`) e poi rilanciato lo
script: correggere solo `index.html` non basta, la prossima rigenerazione lo rimetterebbe.

**`<main>`** – aggiunto su tutte e 4 le pagine, avvolge il contenuto fra la navigazione
mobile e la banda gialla. Serve a far capire ai crawler dove finisce il contenuto e
dove cominciano header e footer ripetuti. Il CSS non usa selettori figlio-diretto,
quindi il wrapper non tocca il layout.

**`robots.txt`** – oltre a `User-agent: *` elenca esplicitamente GPTBot, OAI-SearchBot,
ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, meta-externalagent,
Amazonbot e CCBot, tutti in `Allow`. È una scelta: consente anche l'uso dei contenuti
per l'addestramento dei modelli. Per escluderne uno basta cambiare `Allow` in `Disallow`
nel blocco corrispondente.

**`llms.txt`** – convenzione emergente (come robots.txt, ma per gli assistenti AI):
sintesi dell'azienda, servizi, certificazioni, elenco pagine e contatti in markdown.
Tutti i dati vengono dalle pagine esistenti, niente di inventato. **Va aggiornato a mano**
se cambiano servizi, certificazioni o recapiti.

**`dateModified` / `lastmod`** – fissati al 16/10/2026 nel JSON-LD e nel `sitemap.xml`.
Sono date dichiarate, non automatiche: vanno aggiornate a ogni modifica sostanziale dei
contenuti.

### Form contatti
Il form **invia direttamente** la richiesta, senza aprire il client di posta di chi scrive
(il vecchio `mailto:` è stato eliminato il 15/09/2026: apriva la finestra "Scegli un'app"
di Windows e su molti computer la richiesta si perdeva).

Essendo il sito statico non c'è un backend: l'invio passa da **FormSubmit**
(`https://formsubmit.co/ajax/info@cisac.it`), che recapita il messaggio a info@cisac.it.
L'endpoint è nella costante `ENDPOINT` in cima alla sezione 4 di `js/main.js`: per cambiare
servizio basta sostituire quella riga.

**Attivazione (da fare una sola volta):** al primo invio FormSubmit manda a info@cisac.it una
mail con un link di conferma. Finché nessuno clicca quel link i messaggi non vengono recapitati.
→ **Fare un invio di prova dal sito e poi aprire la mail su info@cisac.it.**

Il form contiene:
- `_honey` – campo trappola antispam, nascosto via CSS (`.hp-field`); se arriva compilato
  l'invio viene scartato lato client senza chiamate di rete;
- checkbox **consenso privacy** obbligatorio, con link all'informativa iubenda;
- `#form-status` – messaggio di esito (`pending` / `ok` / `error`) al posto di alert;
- `action`/`method` sul tag `<form>`: se JavaScript è disattivato il form fa un POST normale
  a FormSubmit invece di non fare nulla.

Alternativa già valutata se si preferisce un servizio con pannello di controllo:
**Web3Forms** (web3forms.com) – niente registrazione, dà una access key da mettere in un
campo hidden `access_key`; in quel caso cambiare `ENDPOINT` in
`https://api.web3forms.com/submit`.

> **Privacy**: il passaggio da mailto a un servizio esterno introduce un responsabile del
> trattamento. L'informativa iubenda va aggiornata indicando il fornitore del modulo.

**Attivazione completata**: la mail di conferma FormSubmit è stata cliccata, il modulo
recapita regolarmente a info@cisac.it (verificato il 16/10/2026).

### Politica aziendale (PDF)
Linkata dal menu di tutte le pagine (`docs/politica-aziendale.pdf`). Sostituendolo, mantenere
lo stesso nome file: i 14 link nelle pagine puntano tutti lì.

**Versione pubblicata: quella corretta da Fausto il 16/09/2026**
(`Politica rev.correzioni ortografiche.pdf`), che annulla e sostituisce sia il file Wix sia
quello consegnato il 15/09. Documento firmato dalla Direzione, San Paolo d’Argon 31/05/2024
(piè di pagina: Rev. 0 del 15/07/2021).

Fausto ha corretto **tutti e 10** i refusi segnalati, compresi i 4 che non si potevano
sistemare senza il file sorgente:

| Prima | Ora |
|---|---|
| POLITICA AZ**E**NDALE (titolo) | POLITICA AZ**IE**NDALE |
| LA NOST**A** VISION | LA NOST**RA** VISION |
| intervenire **in primo** sulle persone | intervenire **in primo luogo** sulle persone |
| della propria **ed altri** salute | della propria **ed altrui** salute |
| ad essere riconosciut**o** | ad essere riconosciut**a** |
| mirata all’**&nbsp;**implementazione | mirata all’implementazione |
| diminuendo **gl’**interventi | diminuendo **gli** interventi |
| L’ob**b**iettivo interno | L’obiettivo interno |
| **un’**ambiente lavorativo | **un** ambiente lavorativo |
| con minori s**pe**chi | con minori s**pre**chi |

Il file è anche tecnicamente migliore del precedente: **A4** invece di US Letter, font
incorporati e sottoinsiemizzati, testo completo e selezionabile, accenti corretti.
Il **logo è quello attuale** dell’azienda, lo stesso di `images/logo-cisac.png` (il PDF
vecchio portava una versione datata del marchio, con la scritta "CISAC" e l’Italia tricolore).

**Due difetti corretti prima di pubblicare** — lo strumento con cui Fausto ha modificato il
PDF aveva lasciato un glifo duplicato sovrapposto in due punti: nel testo si leggeva
`sodddisfazione` e `LA DIRREZIONE`. Le due parole sono state rimosse con una redazione
PyMuPDF (senza toccare immagini e tracciati, quindi firma e timbro sono intatti) e riscritte
con gli stessi font, corpo, colore e posizione. Confronto pixel a pixel con il file di Fausto:
**270 pixel di differenza in tutta la pagina**, tutti nelle due parole.

Se arriva una nuova revisione, ricontrollare sempre con:
```
python -c "import fitz; print(fitz.open('docs/politica-aziendale.pdf')[0].get_text())"
```
I glifi duplicati si vedono solo così: a schermo la parola sembra corretta.

## Pubblicazione su GitHub Pages

Repo `albo94/cisac`, Settings → Pages → Source: branch `main`, cartella `/ (root)`.
Ogni push su `main` va online in circa un minuto.

**Dominio `www.cisac.it` — attivo dal 17/10/2026.** Agganciato dal file `CNAME` nella root
del repo (una riga: `www.cisac.it`). **Non cancellarlo e non rinominarlo**: senza quel file
GitHub non sa quale repository servire per il dominio e `www.cisac.it` torna a dare 404
("There isn't a GitHub Pages site here"), che è esattamente quello che succedeva prima.

DNS gestito dal fornitore del dominio (contatti e accesso al pannello nel `CLAUDE.md` della
cartella di lavoro, **non** qui: questo file è pubblicato insieme al sito):

| Record | Valore | Note |
|---|---|---|
| `cisac.it` A | `185.199.108.153`, `.109`, `.110`, `.111` | IP di GitHub Pages |
| `www.cisac.it` CNAME | `albo94.github.io` | dal 17/10/2026; necessario per HTTPS (vedi sotto) |
| `cisac.it` MX | `ASPMX.L.GOOGLE.COM` + 4 alternativi | posta di info@cisac.it: **non toccare** |

HTTPS: GitHub emette da solo il certificato Let’s Encrypt dopo l’aggancio del dominio
(di solito entro un’ora). Quando c’è, va spuntato **Settings → Pages → Enforce HTTPS**,
altrimenti il sito resta raggiungibile anche in `http://` e il browser mostra "Non sicuro".

Verifiche del 17/10/2026, subito dopo l’aggancio:
- nessun record **CAA** sul dominio, quindi Let’s Encrypt può emettere il certificato. Se in
  futuro qualcuno aggiunge un CAA, deve includere `letsencrypt.org` o HTTPS smette di rinnovarsi;
- appena agganciato, GitHub presenta il proprio certificato `*.github.io` finché non arriva
  quello per `cisac.it`: è in quella finestra che Chrome mostra "Questo sito non supporta una
  connessione sicura". Non è un errore di configurazione;
- un 404 su `http://cisac.it` subito dopo l’aggancio può essere la cache di GitHub
  (`X-Cache: HIT`, intestazione `Age`): è il 404 di prima, che scade da solo in qualche minuto.

**Perché `www` deve stare su `albo94.github.io`** (cambiato il 17/10/2026; prima era su
`cisac.it`). Con il CNAME su `cisac.it` il sito risponde lo stesso, ma il controllo DNS
di GitHub considera `www.cisac.it` "not properly configured": per un sottodominio accetta solo
un CNAME verso `<utente>.github.io`. Quindi non emette il certificato e "Enforce HTTPS" resta
grigio. Dopo la modifica, se il controllo non riparte da solo: Settings → Pages → Remove sul
dominio, reinserire `www.cisac.it` e Save.
Nel pannello del gestore i valori si scrivono **senza punto finale**, come i record già
presenti. Il vecchio CNAME aveva TTL 86400: dopo la modifica i resolver pubblici (Google,
Cloudflare…) possono servire il valore vecchio fino a 24 ore. I server autoritativi
`ns.streamer.net` / `ns2.streamer.net` non hanno cache e mostrano subito il valore nuovo.

Riferimento: il sito dell’ambulanza (`albo94/ambulanzaselvinoaviatico`, stessa impostazione)
ha `www` in CNAME su `albo94.github.io` e HTTPS funzionante, senza record AAAA né TXT di
verifica GitHub. Quelli restano miglioramenti facoltativi, non chiesti:
- 4 record **AAAA** per IPv6: `2606:50c0:8000::153` … `2606:50c0:8003::153`;
- TXT `_github-pages-challenge-albo94` (impedisce a un altro account GitHub di agganciare il
  dominio): il valore si genera in Settings dell’account `albo94` → Pages → Add a domain.

**I due TXT `google-site-verification` già presenti sul dominio non vanno toccati**, e chi
aggiunge un TXT sull’host `@` deve *aggiungere*, non sostituire: lì c’è anche l’SPF della
posta (`v=spf1 include:_spf.google.com ~all`). Sono la verifica di una proprietà Search
Console già esistente: se spariscono, la proprietà decade e si perde lo storico.

### Vecchi indirizzi del sito Wix

Ricavati dall’archivio Wayback Machine il 17/10/2026. GitHub Pages non fa redirect lato
server, ma risolve da solo gli URL senza `.html`:

| URL Wix | Ora |
|---|---|
| `/` | home |
| `/contatti` | `contatti.html` (risolto da GitHub Pages) |
| `/referenze` | `referenze.html` (risolto da GitHub Pages) |
| `/team` | `team.html` → redirect immediato a `squadra.html` |
| `/gesa` | 404: era una pagina Wix vuota (solo menu e footer), niente da recuperare |

`team.html` usa `meta refresh` a 0 secondi + `canonical` + `location.replace`: Google lo
tratta come spostamento definitivo. Ha `noindex` e non va in `sitemap.xml`.

**`404.html`** – GitHub la serve per qualunque indirizzo inesistente, **a qualsiasi
profondità** (`/gesa`, `/team/`, `/a/b/c`): per questo tutti i suoi percorsi sono assoluti
(`/css/style.css`, `/index.html`…). Con percorsi relativi, su `/a/b/c` perderebbe CSS e
immagini. Ha `noindex`, nessun JSON-LD, nessuna voce di menu evidenziata.
`404.html` e `team.html` sono escluse da `_strumenti/geo_check.py` (insieme `SERVIZIO`).

## Regole di sviluppo

- Solo vanilla HTML/CSS/JS, nessun framework (come per il sito Ambulanza).
- Il giallo `#ffd600` è il segno distintivo: usarlo per accenti, banda e tab attiva. **Niente rosso.**
- Il corpo del sito deve restare prevalentemente **bianco**.
- Header e footer sono duplicati in ogni pagina: se si modificano, aggiornarli in tutti e 4 i file
  **e in `404.html`**, dove i percorsi vanno scritti assoluti (`/index.html`, non `index.html`).
- Questo file è **pubblico** (`www.cisac.it/CLAUDE.md`, repo pubblico): niente credenziali,
  accessi a pannelli o note riservate. Quelle vanno nel `CLAUDE.md` della cartella di lavoro.
- Anteprima locale: `python -m http.server 8123 --directory sito-cisac`

## Da completare / verificare con il cliente

- **Contenuti per i motori generativi**: l’audit GEO del 16/10/2026 ha rilevato pagine
  magre — contando solo il `<main>`: referenze 54 parole, contatti 93, squadra 240,
  home 853. Mancano inoltre una spiegazione di *che cos’è* la protezione catodica e una
  FAQ: sono le due leve più efficaci perché il sito venga citato come fonte dalle AI.
  Interventi rimandati su richiesta del cliente: richiedono testi tecnici da far validare
  a Massimo o Fausto.

- Email di Andrea Colotti e Michele Piccinini: sono state ipotizzate seguendo lo
  schema `nome.cognome.cisac@gmail.com`. **Da confermare.**
- Le 6 card "servizi" sono una riformulazione della frase unica del sito Wix: da validare.
- **Loghi delle 9 referenze aggiunte il 15/09/2026**: scaricati dai siti ufficiali delle
  aziende, non forniti dal cliente. Da far validare prima del dominio definitivo.
- **Retipiù**: il logo ufficiale ha la parola "reti" in bianco (pensato per header scuri) e
  su fondo chiaro sparirebbe. È stato ricolorato nel grigio `#9c9b9b` già presente nel
  simbolo "+" del marchio. **Chiedere a Fausto il file ufficiale per fondi chiari.**
- Foto reali dei tecnici e foto di cantiere, se disponibili, al posto delle iniziali.
