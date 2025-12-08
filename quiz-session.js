// Demo quiz - uses localStorage instead of Firebase
// Same questions as regular quiz
const quizQuestions = [
    {
        question: "Wat is het belangrijkste verschil tussen Universal Analytics (UA) en Google Analytics 4 (GA4)?",
        options: [
            "GA4 gebruikt sessions als basis, UA gebruikt events",
            "GA4 is event-based, UA is session-based",
            "GA4 kan alleen mobiele apps meten",
            "Er is geen verschil, alleen een nieuwe naam"
        ],
        correct: 1,
        explanation: "GA4 is volledig event-based, terwijl Universal Analytics session-based was. Dit is een fundamenteel verschil in hoe data wordt verzameld en gerapporteerd."
    },
    {
        question: "Wat is een 'Event' in GA4?",
        options: [
            "Alleen button clicks",
            "Alleen pageviews",
            "Elke interactie die je wilt meten",
            "Alleen aankopen"
        ],
        correct: 2,
        explanation: "In GA4 is een event elke interactie die je wilt meten: pageviews, clicks, scrolls, video plays, purchases, etc. Alles is een event!"
    },
    {
        question: "Hoeveel parameters kun je maximaal toevoegen aan een custom event in GA4?",
        options: [
            "5 parameters",
            "10 parameters",
            "25 parameters",
            "Onbeperkt aantal parameters"
        ],
        correct: 2,
        explanation: "Je kunt maximaal 25 parameters toevoegen aan een custom event in GA4. Let wel op: sommige parameters tellen niet mee voor dit limiet."
    },
    {
        question: "Wat is het verschil tussen een 'User Property' en een 'Event Parameter' in GA4?",
        options: [
            "Er is geen verschil",
            "User Properties zijn gekoppeld aan gebruikers, Event Parameters aan specifieke events",
            "User Properties zijn alleen voor mobiele apps",
            "Event Parameters zijn alleen voor e-commerce"
        ],
        correct: 1,
        explanation: "User Properties beschrijven kenmerken van de gebruiker (bijv. lidmaatschapstype, voorkeurstaal) en blijven over meerdere sessies. Event Parameters beschrijven specifieke events."
    },
    {
        question: "Welke van deze events wordt NIET automatisch door GA4 verzameld?",
        options: [
            "page_view",
            "scroll",
            "add_to_cart",
            "session_start"
        ],
        correct: 2,
        explanation: "add_to_cart is een e-commerce event die je zelf moet implementeren. page_view, scroll, en session_start worden automatisch verzameld door GA4."
    },
    {
        question: "Wat is de 'Debug View' in GA4?",
        options: [
            "Een tool om fouten in je website te vinden",
            "Een real-time weergave van events om je tracking te testen",
            "Een manier om oude data te bekijken",
            "Een tool om gebruikers te blokkeren"
        ],
        correct: 1,
        explanation: "Debug View toont real-time events van je test device, zodat je kunt controleren of je tracking correct werkt voordat je het live zet."
    },
    {
        question: "Wat is een 'Conversion' in GA4?",
        options: [
            "Alleen aankopen",
            "Alleen formulier inzendingen",
            "Elk event dat je markeert als belangrijk voor je bedrijf",
            "Alleen email sign-ups"
        ],
        correct: 2,
        explanation: "Een conversion in GA4 is elk event dat je als belangrijk markeert voor je bedrijfsdoelen. Dit kunnen aankopen zijn, maar ook video views, downloads, sign-ups, etc."
    },
    {
        question: "Hoe lang bewaart GA4 standaard de event data voor een gratis property?",
        options: [
            "14 maanden",
            "26 maanden",
            "2 maanden",
            "Onbeperkt"
        ],
        correct: 2,
        explanation: "GA4 bewaart standaard event data voor 2 maanden (gratis versie). Je kunt dit wijzigen naar 14 maanden in de instellingen, maar niet langer zonder GA360."
    },
    {
        question: "Wat is het belangrijkste voordeel van GA4's machine learning capabilities?",
        options: [
            "Automatische rapportage",
            "Predictieve metrics zoals purchase probability",
            "Betere interface",
            "Snellere data verwerking"
        ],
        correct: 1,
        explanation: "GA4 gebruikt machine learning voor predictieve metrics zoals 'purchase probability' en 'churn probability', wat je helpt om toekomstig gebruikersgedrag te voorspellen."
    },
    {
        question: "Welke dimensie wordt gebruikt om cross-platform tracking mogelijk te maken in GA4?",
        options: [
            "Session ID",
            "User ID",
            "Device ID",
            "Cookie ID"
        ],
        correct: 1,
        explanation: "User ID is de dimensie die cross-platform tracking mogelijk maakt in GA4, waardoor je gebruikers kunt volgen over verschillende devices en platforms heen."
    },
    {
        question: "Wat is het verschil tussen 'Reports' en 'Explore' in GA4 met betrekking tot data sampling?",
        options: [
            "Reports gebruikt altijd sampling, Explore nooit",
            "Reports gebruikt geen sampling (tot 10M events), Explore kan sampling gebruiken bij grote datasets",
            "Beide gebruiken altijd sampling",
            "Er is geen verschil in sampling"
        ],
        correct: 1,
        explanation: "Standard Reports in GA4 gebruiken geen sampling tot 10 miljoen events per dag. Explore rapporten kunnen wel sampling gebruiken bij grote datasets of complexe queries. BigQuery export geeft altijd unsampled data."
    },
    {
        question: "Wat is 'cardinaliteit' in GA4 en waarom is het belangrijk?",
        options: [
            "Het aantal unique waarden in een dimensie; te hoge cardinaliteit kan leiden tot 'other' groupering",
            "De snelheid waarmee data wordt verwerkt",
            "Het aantal events per sessie",
            "De kwaliteit van je data"
        ],
        correct: 0,
        explanation: "Cardinaliteit is het aantal unieke waarden voor een dimensie. GA4 heeft cardinaliteit limieten: te veel unieke waarden worden gegroepeerd als 'other'. Dit is vooral relevant voor custom dimensions en parameters."
    },
    {
        question: "Wat is het verschil tussen een 'Key Event' (voorheen Conversie) en een regulier 'Event' in GA4?",
        options: [
            "Key Events worden anders gemeten dan reguliere events",
            "Een Key Event is een regulier event dat je markeert als belangrijk; het wordt in meer rapporten getoond",
            "Key Events kosten extra geld",
            "Key Events zijn alleen beschikbaar in GA360"
        ],
        correct: 1,
        explanation: "Een Key Event (voorheen 'Conversion' genoemd) is gewoon een event dat je markeert als belangrijk voor je business. Het verschil is dat Key Events prominenter worden getoond in rapporten en kunnen worden gebruikt voor optimalisatie in Google Ads."
    },
    {
        question: "Wat is Data-Driven Attribution (DDA) in GA4?",
        options: [
            "Een attributiemodel dat het volledige customer journey analyseert met machine learning",
            "Een manier om data handmatig toe te wijzen",
            "Een rapport over data kwaliteit",
            "Een functie alleen beschikbaar voor e-commerce"
        ],
        correct: 0,
        explanation: "Data-Driven Attribution gebruikt machine learning om de credit voor conversies te verdelen over alle touchpoints in de customer journey, gebaseerd op hun werkelijke impact. Dit is het standaard attributiemodel in GA4."
    },
    {
        question: "Wat is een 'conversie pixel' en hoe verschilt dit van GA4 event tracking?",
        options: [
            "Een conversie pixel is hetzelfde als een GA4 event",
            "Een conversie pixel is een image tag voor tracking, GA4 gebruikt JavaScript events en is event-based",
            "Conversie pixels zijn alleen voor Facebook",
            "GA4 gebruikt geen pixels maar alleen cookies"
        ],
        correct: 1,
        explanation: "Een conversie pixel (zoals Facebook Pixel, LinkedIn Insight Tag) is een kleine afbeelding die wordt geladen bij een conversie. GA4 gebruikt een modernere, event-based aanpak met JavaScript die veel rijkere data verzamelt en flexibeler is dan traditionele pixels."
    },
    {
        question: "Wanneer gebruikt GA4 'sampling' bij het tonen van data?",
        options: [
            "Altijd, bij elke report",
            "Nooit, GA4 gebruikt geen sampling",
            "Bij Explore rapporten met grote datasets; Standard Reports samplen niet tot 10M events/dag",
            "Alleen bij gratis accounts"
        ],
        correct: 2,
        explanation: "GA4 Standard Reports gebruiken geen sampling tot 10 miljoen events per dag. Explore rapporten kunnen wel sampling toepassen bij grote datasets of complexe queries. GA360 gebruikers krijgen hogere sampling thresholds."
    },
    {
        question: "Wat is 'Behavioral Modeling' in GA4 en waarom wordt het gebruikt?",
        options: [
            "Een manier om gebruikersgedrag te voorspellen",
            "Machine learning die de gaps vult van gebruikers die tracking weigeren, gebaseerd op vergelijkbare gebruikers",
            "Een functie om A/B tests te analyseren",
            "Een methode om bot traffic te filteren"
        ],
        correct: 1,
        explanation: "Behavioral Modeling gebruikt machine learning om het gedrag van gebruikers die cookies weigeren te schatten, gebaseerd op vergelijkbare gebruikers die wel tracking accepteren. Dit helpt om nauwkeurigere data te krijgen ondanks consent mode en privacy restricties."
    },
    {
        question: "Welke SQL functie moet je gebruiken om event parameters uit GA4 BigQuery data te halen?",
        options: [
            "JOIN",
            "UNNEST",
            "EXTRACT",
            "PARSE"
        ],
        correct: 1,
        explanation: "UNNEST is de functie die je nodig hebt om event_params (en andere repeated/nested fields) in GA4 BigQuery export te 'uitpakken'. Bijvoorbeeld: SELECT (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_location') AS page."
    },
    {
        question: "Hoe lang duurt het voordat GA4 data 'definitief' is en niet meer verandert?",
        options: [
            "Real-time (binnen seconden)",
            "4 uur",
            "24-48 uur",
            "7 dagen"
        ],
        correct: 2,
        explanation: "GA4 data processing duurt 24-48 uur voor standard properties. Gedurende deze tijd kan de data in rapporten nog veranderen. Voor betrouwbare 'finale' cijfers is het verstandig om 24-48 uur te wachten na afloop van een dag. GA360 heeft snellere processing (vaak binnen 4 uur)."
    },
    {
        question: "Wat is het belangrijkste verschil tussen 'Events' en 'Key Events' in GA4?",
        options: [
            "Key Events worden anders gemeten en kosten extra",
            "Een Key Event is een Event dat je markeert als belangrijk; het krijgt speciale behandeling in rapporten en Google Ads",
            "Key Events zijn automatisch, Events moet je zelf aanmaken",
            "Er is geen verschil, het is alleen een andere naam"
        ],
        correct: 1,
        explanation: "Een Key Event (voorheen 'Conversion' genoemd) is een regulier Event dat je markeert als belangrijk voor je business. Key Events krijgen speciale metrics (User Key Event Rate, Session Key Event Rate), verschijnen prominenter in rapporten, en kunnen worden gebruikt voor Google Ads optimalisatie. Je kunt maximaal 30 Key Events per property hebben."
    }
];

// Get session type from URL
const urlParams = new URLSearchParams(window.location.search);
const sessionType = urlParams.get('session') || 'pre';

// Shuffle function (Fisher-Yates algorithm)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Prepare questions based on session type
let processedQuestions = quizQuestions.map(q => ({...q})); // Deep copy

if (sessionType === 'post') {
    // POST-TEST: Shuffle questions
    processedQuestions = shuffleArray(processedQuestions);

    // Shuffle answers for each question and track correct answer
    processedQuestions = processedQuestions.map(question => {
        const correctAnswer = question.options[question.correct];
        const shuffledOptions = shuffleArray(question.options);
        const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);

        return {
            ...question,
            options: shuffledOptions,
            correct: newCorrectIndex
        };
    });
}

// Game State
let currentQuestion = 0;
let score = 0;
let playerName = '';
let playerId = '';
const sessionId = `quiz_${sessionType}_${new Date().toISOString().split('T')[0]}`;

// DOM Elements
const nameInputScreen = document.querySelector('.name-input-screen');
const quizScreen = document.querySelector('.quiz-screen');
const resultScreen = document.querySelector('.result-screen');

// LocalStorage helpers
function getPlayers() {
    const data = localStorage.getItem('quiz_players_' + sessionId);
    return data ? JSON.parse(data) : {};
}

function savePlayers(players) {
    localStorage.setItem('quiz_players_' + sessionId, JSON.stringify(players));
    // Trigger storage event for other tabs
    window.dispatchEvent(new Event('storage'));
}

function updatePlayer(updates) {
    const players = getPlayers();
    if (players[playerId]) {
        players[playerId] = { ...players[playerId], ...updates, lastUpdated: Date.now() };
        savePlayers(players);
    }
}

// Start Quiz
function startQuiz() {
    playerName = document.getElementById('playerName').value.trim();
    if (playerName.length < 2) {
        alert('Vul een naam in van minimaal 2 karakters');
        return;
    }

    // Generate unique player ID
    playerId = 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    // Register player in localStorage
    const players = getPlayers();
    players[playerId] = {
        name: playerName,
        score: 0,
        currentQuestion: 0,
        totalQuestions: processedQuestions.length,
        status: 'playing',
        startedAt: Date.now()
    };
    savePlayers(players);

    // Switch screens
    nameInputScreen.classList.remove('active');
    quizScreen.classList.add('active');

    // Show first question
    showQuestion();
}

// Show Question
function showQuestion() {
    const question = processedQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / processedQuestions.length) * 100;

    // Update progress bar
    document.getElementById('progressBar').style.width = progress + '%';

    // Update question info
    document.getElementById('questionNumber').textContent = `Vraag ${currentQuestion + 1} van ${processedQuestions.length}`;
    document.getElementById('questionText').textContent = question.question;

    // Create options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionDiv);
    });

    // Reset feedback
    const feedback = document.getElementById('feedback');
    feedback.classList.remove('show', 'correct', 'incorrect');

    // Update navigation
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('finishBtn').style.display = 'none';
}

// Select Answer
function selectAnswer(selectedIndex) {
    const question = processedQuestions[currentQuestion];
    const options = document.querySelectorAll('.option');

    // Disable all options
    options.forEach(opt => opt.classList.add('disabled'));

    // Mark selected
    options[selectedIndex].classList.add('selected');

    // Check if correct
    const isCorrect = selectedIndex === question.correct;

    if (isCorrect) {
        options[selectedIndex].classList.add('correct');
        score++;
        showFeedback(true, question.explanation);
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[question.correct].classList.add('correct');
        showFeedback(false, question.explanation);
    }

    // Update localStorage
    updatePlayer({
        score: score,
        currentQuestion: currentQuestion + 1
    });

    // Show next/finish button
    if (currentQuestion < processedQuestions.length - 1) {
        document.getElementById('nextBtn').style.display = 'block';
    } else {
        document.getElementById('finishBtn').style.display = 'block';
    }
}

// Show Feedback
function showFeedback(isCorrect, explanation) {
    const feedback = document.getElementById('feedback');
    feedback.classList.add('show');

    if (isCorrect) {
        feedback.classList.add('correct');
        feedback.innerHTML = `<strong>✅ Correct!</strong><br>${explanation}`;
    } else {
        feedback.classList.add('incorrect');
        feedback.innerHTML = `<strong>❌ Helaas, dat is niet correct.</strong><br>${explanation}`;
    }
}

// Next Question
function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

// Finish Quiz
function finishQuiz() {
    // Mark as finished
    updatePlayer({
        score: score,
        status: 'finished',
        finishedAt: Date.now()
    });

    // Switch to result screen
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    // Show results
    showResults();
}

// Show Results
function showResults() {
    const percentage = Math.round((score / processedQuestions.length) * 100);

    document.getElementById('finalScore').textContent = score + '/' + processedQuestions.length;
    document.getElementById('finalPercentage').textContent = percentage + '%';

    // Get rank from leaderboard
    const players = getPlayers();
    const finishedPlayers = Object.values(players)
        .filter(p => p.status === 'finished')
        .sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return (a.finishedAt || Date.now()) - (b.finishedAt || Date.now());
        });

    const rank = finishedPlayers.findIndex(p => p.name === playerName) + 1;
    document.getElementById('finalRank').textContent = rank > 0 ? '#' + rank : '-';

    // Check if winner
    if (rank === 1 && finishedPlayers.length > 1) {
        showWinnerAnnouncement();
    }
}

// Show Winner Announcement
function showWinnerAnnouncement() {
    const winnerSection = document.getElementById('winnerSection');
    winnerSection.innerHTML = `
        <div class="winner-announcement">
            <div class="trophy">🏆</div>
            <h2>Gefeliciteerd!</h2>
            <p style="font-size: 1.3em; margin-top: 10px;">Je bent de winnaar van deze quiz!</p>
        </div>
    `;
}

// Update Leaderboard
function updateLeaderboard() {
    const players = getPlayers();
    const leaderboardDiv = document.getElementById('leaderboard');

    if (Object.keys(players).length === 0) {
        leaderboardDiv.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #999;">
                <p>Wachten op spelers...</p>
                <p style="font-size: 0.9em; margin-top: 10px;">Open een nieuwe tab om meer spelers toe te voegen!</p>
            </div>
        `;
        return;
    }

    // Convert to array and sort
    const playersArray = Object.entries(players).map(([id, data]) => ({
        id,
        ...data
    }));

    // Sort: finished players by score (highest first), then playing players by progress
    playersArray.sort((a, b) => {
        // Both finished: sort by score, then by finish time
        if (a.status === 'finished' && b.status === 'finished') {
            if (b.score !== a.score) return b.score - a.score;
            return a.finishedAt - b.finishedAt;
        }
        // One finished, one playing: finished comes first
        if (a.status === 'finished') return -1;
        if (b.status === 'finished') return 1;
        // Both playing: sort by progress (most questions answered first)
        return b.currentQuestion - a.currentQuestion;
    });

    // Build leaderboard HTML
    let html = '';
    playersArray.forEach((player, index) => {
        const rank = index + 1;
        const isCurrentUser = player.id === playerId;
        const rankClass = `rank-${rank <= 3 ? rank : ''}`;
        const currentUserClass = isCurrentUser ? 'current-user' : '';

        const statusBadge = player.status === 'finished'
            ? '<span class="status-badge status-finished">✓ Klaar</span>'
            : '<span class="status-badge status-playing">▶ Bezig</span>';

        // Only show score if player is finished
        const scoreDisplay = player.status === 'finished'
            ? `<div class="player-score">${player.score}</div>`
            : `<div class="player-score" style="color: #999; font-size: 1em;">-</div>`;

        html += `
            <div class="leaderboard-item ${rankClass} ${currentUserClass}">
                <div class="rank-badge">${rank}</div>
                <div class="player-info">
                    <div class="player-name">
                        ${player.name}
                        ${isCurrentUser ? '(Jij)' : ''}
                        ${statusBadge}
                    </div>
                    <div class="player-progress">
                        ${player.currentQuestion}/${player.totalQuestions} vragen
                    </div>
                </div>
                ${scoreDisplay}
            </div>
        `;
    });

    leaderboardDiv.innerHTML = html;
}

// Listen for localStorage changes (from other tabs)
window.addEventListener('storage', function() {
    updateLeaderboard();
});

// Also poll for updates (fallback for same-window updates)
setInterval(updateLeaderboard, 1000);

// Make functions globally available
window.startQuiz = startQuiz;
window.selectAnswer = selectAnswer;
window.nextQuestion = nextQuestion;
window.finishQuiz = finishQuiz;

// Initialize UI based on session type
function initializeSessionUI() {
    const banner = document.getElementById('sessionBanner');
    const label = document.getElementById('sessionLabel');
    const welcomeTitle = document.getElementById('welcomeTitle');
    const welcomeSubtitle = document.getElementById('welcomeSubtitle');
    const instruction = document.getElementById('sessionInstruction');

    if (sessionType === 'post') {
        banner.classList.remove('session-pre');
        banner.classList.add('session-post');
        banner.textContent = 'POST-TEST (Na de training)';
        label.textContent = 'Post-Test';
        welcomeTitle.textContent = 'Post-Test: Laat zien wat je hebt geleerd!';
        welcomeSubtitle.textContent = 'Gebruik dezelfde naam als in de pre-test.';
        instruction.textContent = 'Dit is de post-test ná de training';
    } else {
        banner.classList.add('session-pre');
        banner.textContent = 'PRE-TEST (Voor de training)';
        label.textContent = 'Pre-Test';
        welcomeTitle.textContent = 'Pre-Test: Test je huidige kennis!';
        welcomeSubtitle.textContent = 'Maak je geen zorgen, dit is om je startpunt te meten.';
        instruction.textContent = 'Dit is de pre-test vóór de training';
    }
}

// Enable start button when name is entered
document.getElementById('playerName').addEventListener('input', function() {
    const startBtn = document.getElementById('startBtn');
    if (this.value.trim().length >= 2) {
        startBtn.disabled = false;
    } else {
        startBtn.disabled = true;
    }
});

// Allow Enter key to start quiz
document.getElementById('playerName').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && this.value.trim().length >= 2) {
        startQuiz();
    }
});

// Initialize
initializeSessionUI();
updateLeaderboard();

