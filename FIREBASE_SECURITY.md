# Firebase Security Guide voor GitHub Pages

## ⚠️ Belangrijke informatie

Je Firebase API key staat nu **publiekelijk zichtbaar** in [multiplayer.html](multiplayer.html:554). Dit is **NORMAAL** voor client-side Firebase apps, maar je moet wel je database beveiligen!

## Waarom Firebase API keys publiek mogen zijn

Firebase API keys zijn **NIET** hetzelfde als traditionele API secrets:
- Ze identificeren alleen je Firebase project
- Ze geven geen toegang tot je data
- **De echte beveiliging zit in Firebase Security Rules**

Bron: [Firebase Documentation](https://firebase.google.com/docs/projects/api-keys)

## ✅ Wat je WEL moet doen: Firebase Security Rules

### Huidige situatie (GEVAARLIJK als open):
Als je Firebase Realtime Database nu open staat, kan iedereen lezen/schrijven!

### Stap 1: Check je huidige rules

1. Ga naar [Firebase Console](https://console.firebase.google.com/)
2. Open je project: `ga4-training-quiz`
3. Ga naar **Realtime Database** → **Rules**

### Stap 2: Beveiligde rules instellen

Vervang je huidige rules door een van deze opties:

#### Optie A: Alleen lezen toegestaan (voor demo/training)
```json
{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}
```
✅ Iedereen kan quiz data lezen
✅ Alleen geauthenticeerde gebruikers kunnen schrijven
❌ Nog steeds kwetsbaar voor misbruik

#### Optie B: Anonieme authenticatie (AANBEVOLEN)
```json
{
  "rules": {
    "sessions": {
      "$sessionId": {
        ".read": true,
        ".write": "auth != null"
      }
    },
    "quizSessions": {
      "$sessionId": {
        ".read": true,
        ".write": "auth != null && !data.exists()"
      }
    }
  }
}
```

#### Optie C: Volledig beveiligd met rate limiting
```json
{
  "rules": {
    "sessions": {
      "$sessionId": {
        ".read": true,
        ".write": "auth != null &&
                  (!data.exists() || data.child('trainerId').val() == auth.uid)"
      }
    },
    "participants": {
      "$sessionId": {
        "$participantId": {
          ".read": true,
          ".write": "auth != null &&
                    ($participantId == auth.uid ||
                     root.child('sessions').child($sessionId).child('trainerId').val() == auth.uid)"
        }
      }
    }
  }
}
```

### Stap 3: Firebase Authenticatie inschakelen

1. In Firebase Console → **Authentication**
2. Klik **Get Started**
3. Schakel **Anonymous** in (makkelijkste voor jouw use case)

### Stap 4: Update je code voor authenticatie

Voeg dit toe aan [multiplayer.html](multiplayer.html) na Firebase initialisatie:

```javascript
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const auth = getAuth(app);

// Automatisch inloggen als anonieme gebruiker
signInAnonymously(auth)
  .then(() => {
    console.log('Authenticated anonymously');
  })
  .catch((error) => {
    console.error('Auth error:', error);
  });
```

## 🔒 Extra beveiligingsmaatregelen

### 1. Beperk toegestane domeinen

In Firebase Console → **Authentication** → **Settings** → **Authorized domains**:
- Voeg toe: `jouw-username.github.io`
- Verwijder andere domeinen die je niet gebruikt

### 2. App Check (optioneel, maar sterk aanbevolen)

Firebase App Check beschermt tegen misbruik:
1. Firebase Console → **App Check**
2. Registreer je web app
3. Gebruik reCAPTCHA v3

### 3. Quota's en monitoring

1. Firebase Console → **Usage and billing**
2. Stel alerts in bij 80% gebruik
3. Monitor verdachte activiteit

## 🚫 Wat je NIET moet doen

❌ **NIET**: API key verbergen met environment variables in client-side code
   - Dit werkt niet - de key is altijd zichtbaar in de browser

❌ **NIET**: Firebase Admin SDK credentials in client-side code
   - Deze zijn WEL geheim en horen op een server

❌ **NIET**: Vertrouwen op "obscurity"
   - Denk niet dat je veilig bent omdat niemand je link kent

## ✅ Checklist voor deployment

- [ ] Firebase Security Rules ingesteld
- [ ] Anonymous Authentication ingeschakeld
- [ ] Authentication code toegevoegd aan app
- [ ] Authorized domains geconfigureerd
- [ ] Quota alerts ingesteld
- [ ] Test met Debug Console of rules werken

## 📚 Meer informatie

- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firebase App Check](https://firebase.google.com/docs/app-check)

## Alternatief: Geen Firebase gebruiken

Als deze beveiliging te complex is, overweeg:

1. **Gebruik alleen localStorage** (geen multiplayer)
   - [quiz-session.html](quiz-session.html) gebruikt al localStorage
   - Geen backend nodig
   - Geen beveiligingsrisico's

2. **Gebruik een andere backend**
   - Supabase (heeft betere gratis tier + Row Level Security)
   - Azure Cosmos DB (als je al Azure gebruikt)
   - Eigen Node.js server

Voor een **eenvoudige training quiz** is localStorage vaak voldoende!
