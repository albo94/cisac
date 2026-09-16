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
├── sitemap.xml
├── robots.txt
├── .nojekyll           – necessario per GitHub Pages (evita il build Jekyll)
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
- **LinkedIn**: https://www.linkedin.com/company/24655449
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
- riga 2: nav + pill telefono/email + quadrato LinkedIn giallo

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

1. Creare il repo (es. `albo94/cisac`) e caricare il contenuto di `sito-cisac/` nella **root**.
2. Settings → Pages → Source: branch `main`, cartella `/ (root)`.
3. Per il dominio `www.cisac.it`: aggiungere un file `CNAME` con dentro `www.cisac.it`,
   poi sul DNS del dominio impostare
   - A record → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - CNAME `www` → `<utente>.github.io`
4. Attivare "Enforce HTTPS" dopo la propagazione DNS.

## Regole di sviluppo

- Solo vanilla HTML/CSS/JS, nessun framework (come per il sito Ambulanza).
- Il giallo `#ffd600` è il segno distintivo: usarlo per accenti, banda e tab attiva. **Niente rosso.**
- Il corpo del sito deve restare prevalentemente **bianco**.
- Header e footer sono duplicati in ogni pagina: se si modificano, aggiornarli in tutti e 4 i file.
- Anteprima locale: `python -m http.server 8123 --directory sito-cisac`

## Da completare / verificare con il cliente

- Email di Andrea Colotti e Michele Piccinini: sono state ipotizzate seguendo lo
  schema `nome.cognome.cisac@gmail.com`. **Da confermare.**
- Le 6 card "servizi" sono una riformulazione della frase unica del sito Wix: da validare.
- **Loghi delle 9 referenze aggiunte il 15/09/2026**: scaricati dai siti ufficiali delle
  aziende, non forniti dal cliente. Da far validare prima del dominio definitivo.
- **Form contatti**: va fatto l’invio di prova che attiva FormSubmit (vedi sopra), altrimenti
  le richieste dal sito non arrivano a nessuno.
- **Retipiù**: il logo ufficiale ha la parola "reti" in bianco (pensato per header scuri) e
  su fondo chiaro sparirebbe. È stato ricolorato nel grigio `#9c9b9b` già presente nel
  simbolo "+" del marchio. **Chiedere a Fausto il file ufficiale per fondi chiari.**
- Foto reali dei tecnici e foto di cantiere, se disponibili, al posto delle iniziali.
