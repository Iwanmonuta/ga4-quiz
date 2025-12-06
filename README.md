# GA4 Training Programma

Een interactieve training over Google Analytics 4 met PowerPoint presentatie en online quiz - nu met multiplayer support!

## 📁 Bestanden

### Presentatie
- `GA4_Training_Presentatie.pptx` - PowerPoint presentatie met training materiaal

### Quiz (Solo)
- `index.html` - Interactieve online quiz (standalone)
- `quiz.js` - Quiz logica en GA4 vragen

### Quiz (Multiplayer) 🆕
- `multiplayer.html` - Realtime multiplayer quiz met leaderboard
- `multiplayer-quiz.js` - Multiplayer logica met Firebase
- `FIREBASE_SETUP.md` - **Volledige setup guide voor Firebase**

### Documentatie
- `README.md` - Deze instructies

## 🚀 Hoe te gebruiken

### PowerPoint Presentatie
1. Open `GA4_Training_Presentatie.pptx` in PowerPoint
2. Gebruik deze tijdens je training sessie
3. Doorloop alle slides met je publiek

### Online Quiz (Solo)
1. Open `index.html` in een moderne browser (Chrome, Firefox, Edge, Safari)
2. Je kunt het bestand direct openen of via een lokale server draaien
3. De quiz is volledig interactief met directe feedback

**Optie 1: Direct openen**
- Dubbelklik op `index.html`
- Of sleep het bestand naar je browser

**Optie 2: Via lokale server** (aanbevolen voor productie)
```bash
# Als je Python hebt geïnstalleerd:
python -m http.server 8000

# Of met Node.js:
npx http-server -p 8000

# Open dan: http://localhost:8000
```

### Multiplayer Quiz 🆕 (Aanbevolen!)

**🎯 Perfect voor live trainingen met meerdere deelnemers!**

1. **Eerste keer: Setup Firebase** (10-15 minuten)
   - Volg de stappen in `FIREBASE_SETUP.md`
   - Je maakt een gratis Firebase account aan
   - Kopieer je Firebase config naar `multiplayer.html`

2. **Open multiplayer.html**
   - Dubbelklik op het bestand of via een server
   - Deel het bestand met alle deelnemers

3. **Deelnemers voeren hun naam in**
   - Iedereen vult hun naam in
   - Start de quiz!

4. **Live leaderboard**
   - Real-time ranglijst tijdens de quiz
   - Zie wie er voor staat
   - Automatische winnaar aankondiging

**Voordelen multiplayer:**
- ✅ Live ranglijst tijdens de quiz
- ✅ Gezamenlijke competitie
- ✅ Winnaar wordt automatisch aangekondigd
- ✅ Perfect voor trainingen met groepen
- ✅ Geen extra software nodig (alleen browser)

**Vereisten:**
- Internet verbinding (voor Firebase)
- Gratis Firebase account (volg FIREBASE_SETUP.md)
- Moderne browser

## 📊 Quiz Features

- ✅ 15 GA4 training vragen (uitgebreid!)
- ✅ Directe feedback na elk antwoord
- ✅ Uitleg bij elk antwoord
- ✅ Score tracking
- ✅ Voortgang indicator
- ✅ Moderne, responsive interface
- ✅ Werkt op desktop en mobiel

## ✏️ Vragen Aanpassen

Om de quiz vragen aan te passen, open `quiz.js` en wijzig de `quizQuestions` array:

```javascript
const quizQuestions = [
    {
        question: "Jouw vraag hier?",
        options: [
            "Optie 1",
            "Optie 2",
            "Optie 3",
            "Optie 4"
        ],
        correct: 1, // Index van het juiste antwoord (0-3)
        explanation: "Uitleg waarom dit het juiste antwoord is"
    },
    // Voeg meer vragen toe...
];
```

## 🎨 Styling Aanpassen

Om kleuren en styling aan te passen, bewerk de `<style>` sectie in `index.html`:

```css
/* Hoofdkleuren */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Pas aan naar jouw huisstijl */
background: linear-gradient(135deg, #jouwkleur1 0%, #jouwkleur2 100%);
```

## 📱 Deployment

### Voor intern gebruik:
- Deel de bestanden via OneDrive/SharePoint
- Medewerkers kunnen `index.html` lokaal openen

### Voor online hosting:
Upload alle bestanden naar een webserver:
- GitHub Pages (gratis)
- Netlify (gratis)
- Vercel (gratis)
- Eigen webserver

**Voorbeeld GitHub Pages:**
1. Maak een GitHub repository
2. Upload `index.html` en `quiz.js`
3. Activeer GitHub Pages in repository settings
4. Deel de URL met deelnemers

## 🔧 Technische Details

- Geen dependencies of build process nodig
- Pure HTML, CSS en JavaScript
- Werkt offline na eerste load
- Geen externe libraries
- Mobile-first responsive design
- Browser support: Chrome, Firefox, Safari, Edge (moderne versies)

## 📈 Training Flow

**Aanbevolen volgorde:**
1. Start met PowerPoint presentatie (45-60 min)
2. Neem een korte pauze (10 min)
3. Laat deelnemers de online quiz maken (15-20 min)
4. Bespreek de resultaten en beantwoord vragen (15 min)

**Totale training duur:** ~90 minuten

## 🎯 Leer Doelen Quiz

De quiz test kennis over:
- Verschil tussen UA en GA4
- Event-based tracking model
- Events en parameters (max 25 per event)
- User properties vs event parameters
- Automatische vs custom events
- Debug view
- Conversions (nu: Key Events)
- Data retentie (2-14 maanden)
- Machine learning features (predictive metrics)
- Cross-platform tracking (User ID)
- **🆕 Reports vs Explore (sampling)**
- **🆕 Cardinaliteit en limieten**
- **🆕 Key Events vs reguliere Events**
- **🆕 Data-Driven Attribution (DDA)**
- **🆕 Conversie pixels vs GA4 tracking**

## 💡 Tips

1. **Test de quiz vooraf** - Loop de quiz door om vertrouwd te raken met de vragen
2. **Pas vragen aan** - Maak ze specifiek voor jouw organisatie indien nodig
3. **Voeg meer vragen toe** - De code ondersteunt onbeperkt aantal vragen
4. **Gebruik debug view** - Open browser console (F12) voor eventuele debugging
5. **Combineer met praktijk** - Laat deelnemers daarna in een echte GA4 property oefenen

## 🆘 Troubleshooting

**Quiz laadt niet:**
- Check of alle bestanden in dezelfde map staan
- Controleer of `quiz.js` correct gekoppeld is
- Open browser console (F12) voor error messages

**Styling ziet er vreemd uit:**
- Gebruik een moderne browser
- Clear browser cache (Ctrl+F5)

**Vragen niet zichtbaar:**
- Controleer `quiz.js` op syntax errors
- Zorg dat `quizQuestions` array correct is geformatteerd

## 📝 Licentie

Voor intern gebruik binnen jouw organisatie.

## ✨ Toekomstige Verbeteringen

Mogelijke uitbreidingen:
- [ ] Timer per vraag
- [ ] Certificaat generatie na voltooien
- [ ] Resultaten opslaan in database
- [ ] Multiplayer quiz mode
- [ ] Verschillende moeilijkheidsgraden
- [ ] Vraag categorieën
- [ ] Slide-based presentatie in browser (in plaats van PowerPoint)

---

**Veel succes met je GA4 training! 🚀**
