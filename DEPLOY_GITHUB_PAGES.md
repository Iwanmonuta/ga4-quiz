# GitHub Pages Deployment - GA4 Quiz

## Stap 1: Git Repository Aanmaken

Open een terminal in `c:\claudecode\quiz` en voer uit:

```bash
git init
git add .
git commit -m "Initial commit: GA4 Quiz"
```

## Stap 2: Koppel aan GitHub Repository

### Als je al een repository hebt:
```bash
git remote add origin https://github.com/JOUW-USERNAME/JOUW-REPO.git
git branch -M main
git push -u origin main
```

### Als je een nieuwe repository moet maken:
1. Ga naar https://github.com/new
2. Geef je repository een naam (bijv. `ga4-quiz`)
3. Maak de repository aan (zonder README)
4. Volg de instructies die GitHub toont voor "push an existing repository"

## Stap 3: GitHub Pages Activeren

1. Ga naar je repository op GitHub
2. Klik op **Settings** (rechtsboven)
3. Scroll naar **Pages** (links in het menu)
4. Bij **Source**: selecteer `main` branch
5. Bij **Folder**: selecteer `/ (root)`
6. Klik **Save**

## Stap 4: Wacht op Deployment

- GitHub bouwt je site (duurt 1-2 minuten)
- Je krijgt een URL: `https://JOUW-USERNAME.github.io/JOUW-REPO/`

## Stap 5: Gebruik de Quiz

### URLs die je kunt delen:

**Trainer Dashboard:**
```
https://JOUW-USERNAME.github.io/JOUW-REPO/trainer-dashboard.html
```

**PRE-TEST voor deelnemers:**
```
https://JOUW-USERNAME.github.io/JOUW-REPO/quiz-session.html?session=pre
```

**POST-TEST voor deelnemers:**
```
https://JOUW-USERNAME.github.io/JOUW-REPO/quiz-session.html?session=post
```

## Updates Publiceren

Wanneer je bestanden aanpast:

```bash
git add .
git commit -m "Beschrijving van wijzigingen"
git push
```

GitHub Pages update automatisch binnen 1-2 minuten!

## Voordelen van deze aanpak:

✅ Werkt overal (kantoor, thuis, onderweg)
✅ Geen firewall/netwerk problemen
✅ Geen server nodig op je laptop
✅ Gratis HTTPS
✅ Altijd beschikbaar
✅ Makkelijk te delen met korte URL
✅ Versiecontrole via Git

## Optionele verbetering: Custom domein

Als je een eigen domein hebt (bijv. `quiz.jouwnaam.nl`):
1. GitHub Pages → Settings → Custom domain
2. Voeg CNAME record toe bij je DNS provider
