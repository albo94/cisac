# CISAC Protezione Catodica srl – Sito Web

Sito statico HTML/CSS/JS pensato per **GitHub Pages**, ricostruito partendo dal sito Wix
attuale `https://www.cisac.it`.

## Struttura file

```
/
├── index.html          – Home (hero, chi siamo, servizi, mission/vision, certificazioni, referenze)
├── squadra.html        – La nostra squadra (12 persone, certificazioni CICPND)
├── referenze.html      – Griglia 26 loghi clienti
├── contatti.html       – Recapiti, form mailto, mappa Google
├── sitemap.xml
├── robots.txt
├── .nojekyll           – necessario per GitHub Pages (evita il build Jekyll)
├── css/style.css       – Unico foglio di stile
├── js/main.js          – Hamburger, contatori, reveal scroll, form mailto, anno footer
├── images/
│   ├── logo-cisac.png  – Logo ufficiale (Centro Italiano Servizi AntiCorrosione + APCE/CEOCOR/RINA)
│   ├── favicon-16.png / favicon-32.png / favicon-192.png / favicon-512.png
│   ├── apple-touch-icon.png
│   ├── avatar.png      – Avatar generico scaricato dal sito Wix (attualmente non usato: si usano le iniziali)
│   └── referenze/      – 26 loghi clienti (a2a, snam-rete-gas, italgas, enel, hera, iren, …)
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
Sito statico → il form compone un link `mailto:info@cisac.it` via JS (sezione 4 di `main.js`).
Nessun servizio esterno coinvolto.

### Politica aziendale (PDF)
Linkata dal menu di tutte le pagine (`docs/politica-aziendale.pdf`). Il file è quello
fornito da Fausto il 15/09/2026, che **annulla e sostituisce** la versione precedente
presa dal sito Wix. Documento firmato dalla Direzione, San Paolo d’Argon 31/05/2024
(piè di pagina: Rev. 0 del 15/07/2021). Sostituendolo, mantenere lo stesso nome file:
i 14 link nelle pagine puntano tutti lì.

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
- **Retipiù**: il logo ufficiale ha la parola "reti" in bianco (pensato per header scuri) e
  su fondo chiaro sparirebbe. È stato ricolorato nel grigio `#9c9b9b` già presente nel
  simbolo "+" del marchio. **Chiedere a Fausto il file ufficiale per fondi chiari.**
- Foto reali dei tecnici e foto di cantiere, se disponibili, al posto delle iniziali.
