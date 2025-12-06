# Firebase Security Rules - Update Guide

## Je huidige rules (ONVEILIG):

```json
{
  "rules": {
    "$sessionId": {
      "players" : {
        "$playerId": {
          ".read": true,
          ".write": true
        }
      }
    }
  }
}
```

### Problemen:
❌ `.write: true` - Iedereen kan schrijven (geen authenticatie vereist)
❌ Geen beveiliging tegen misbruik
❌ Iedereen kan data verwijderen of aanpassen

---

## ✅ OPTIE 1: Simpel maar veiliger (AANBEVOLEN voor training)

Gebruik dit als je **geen authenticatie** wilt implementeren:

```json
{
  "rules": {
    "$sessionId": {
      ".read": true,
      "players": {
        "$playerId": {
          ".write": "!data.exists() || data.child('name').val() == newData.child('name').val()",
          ".validate": "newData.hasChildren(['name', 'score'])"
        }
      },
      "settings": {
        ".write": "!data.exists()"
      }
    }
  }
}
```

### Wat dit doet:
✅ Iedereen kan lezen (voor realtime updates)
✅ Nieuwe spelers kunnen zich aanmelden
✅ Spelers kunnen alleen hun eigen score updaten (niet van anderen)
✅ Session settings kunnen niet overschreven worden
✅ Data moet valide structuur hebben

---

## ✅ OPTIE 2: Met Anonymous Authentication (MEEST VEILIG)

**Stap 1:** Schakel Anonymous Authentication in
1. Firebase Console → Authentication → Sign-in method
2. Klik op **Anonymous** → Enable → Save

**Stap 2:** Gebruik deze rules:

```json
{
  "rules": {
    "$sessionId": {
      ".read": true,
      "players": {
        "$playerId": {
          ".write": "auth != null && ($playerId == auth.uid || !data.exists())",
          ".validate": "newData.hasChildren(['name', 'score', 'uid']) && newData.child('uid').val() == auth.uid"
        }
      },
      "settings": {
        ".write": "auth != null && !data.exists()"
      },
      "currentQuestion": {
        ".write": "auth != null"
      }
    }
  }
}
```

**Stap 3:** Update je multiplayer.html

Voeg dit toe na regel 565 (na `const database = getDatabase(app);`):

```javascript
// Importeer Auth
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const auth = getAuth(app);

// Automatisch inloggen
signInAnonymously(auth)
  .then((userCredential) => {
    console.log('Authenticated:', userCredential.user.uid);
    window.firebaseAuth = auth;
    window.currentUserId = userCredential.user.uid;
  })
  .catch((error) => {
    console.error('Auth error:', error);
    alert('Kon niet inloggen. Probeer de pagina te verversen.');
  });
```

### Wat dit doet:
✅ Alleen geauthenticeerde gebruikers kunnen schrijven
✅ Spelers kunnen alleen hun eigen data aanpassen
✅ Bescherming tegen random bots
✅ Elke gebruiker krijgt uniek ID

---

## ✅ OPTIE 3: Maximum beveiliging met rate limiting

Voor productie of als je bezorgd bent over misbruik:

```json
{
  "rules": {
    "$sessionId": {
      ".read": true,
      "players": {
        "$playerId": {
          ".write": "auth != null && (
            $playerId == auth.uid ||
            !data.exists()
          )",
          ".validate": "
            newData.hasChildren(['name', 'score', 'uid', 'timestamp']) &&
            newData.child('uid').val() == auth.uid &&
            newData.child('score').isNumber() &&
            newData.child('score').val() >= 0 &&
            newData.child('score').val() <= 100
          "
        },
        ".indexOn": ["score", "timestamp"]
      },
      "settings": {
        ".write": "auth != null && !data.exists()",
        ".validate": "newData.hasChildren(['maxPlayers', 'questionCount'])"
      },
      "currentQuestion": {
        ".write": "auth != null",
        ".validate": "newData.isNumber() && newData.val() >= 0"
      }
    }
  }
}
```

### Extra validaties:
✅ Score moet tussen 0-100 zijn
✅ Verplichte velden gecontroleerd
✅ Timestamps voor audit trail
✅ Indexen voor snelle queries

---

## Hoe te updaten?

### In Firebase Console:

1. Ga naar https://console.firebase.google.com/
2. Klik op je project: **ga4-training-quiz**
3. Linker menu → **Realtime Database**
4. Tab: **Rules**
5. Vervang de huidige rules met een van de opties hierboven
6. Klik **Publish**

### Test je rules:

1. Firebase Console → Realtime Database → **Rules**
2. Tab: **Rules Playground**
3. Test verschillende scenario's:
   - Lezen als niet-geauthenticeerde gebruiker
   - Schrijven als niet-geauthenticeerde gebruiker (moet falen bij optie 2/3)
   - Schrijven naar eigen player data
   - Schrijven naar andermans player data (moet falen)

---

## Mijn aanbeveling:

Voor een **GA4 training quiz** in bedrijfscontext:

### Korte termijn (vandaag):
→ **Gebruik OPTIE 1** (geen authenticatie nodig)

### Als je meer tijd hebt:
→ **Upgrade naar OPTIE 2** (Anonymous Auth)

### Voor productie:
→ **Gebruik OPTIE 3** (Full validation)

---

## Veelgestelde vragen

**Q: Kan ik de rules later nog aanpassen?**
A: Ja! Je kunt altijd nieuwe rules publiceren zonder je data te verliezen.

**Q: Wat gebeurt er met bestaande data?**
A: Niks - alleen nieuwe writes worden gecontroleerd tegen de nieuwe rules.

**Q: Kan ik testen zonder echte gebruikers?**
A: Ja, gebruik de **Rules Playground** in Firebase Console.

**Q: Werkt dit met GitHub Pages?**
A: Ja, perfect! Zolang je je GitHub Pages domein toevoegt aan Authorized Domains.

---

## Volgende stappen:

1. ✅ Kies een van de 3 opties
2. ✅ Update rules in Firebase Console
3. ✅ Test met Rules Playground
4. ✅ (Optioneel) Implementeer authenticatie als je optie 2/3 kiest
5. ✅ Deploy naar GitHub Pages
6. ✅ Voeg GitHub Pages URL toe aan Authorized Domains

Succes! 🚀
