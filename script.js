/* =========================================
   GOOGLE FORM SETTINGS
========================================= */

const GOOGLE_FORM_URL =
"https://docs.google.com/forms/d/e/1FAIpQLSf6v-i2wTzYnQ3QmPXEtG1FkzkwppxPmgz3oV8uTLKeAISKlw/formResponse";

const GOOGLE_ENTRY =
"entry.98190819";


/* =========================================
   SCREEN SYSTEM
========================================= */

const screens = document.querySelectorAll(".screen");

function showScreen(id) {

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(id);

    if (target) {
        target.classList.add("active");
    }
}


/* =========================================
   GOOGLE FORM SUBMISSION
========================================= */

function submitAnswer(answer) {

    const data = new FormData();

    data.append(GOOGLE_ENTRY, answer);

    fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: data
    })
    .then(() => {
        console.log("Answer submitted:", answer);
    })
    .catch(error => {
        console.log("Form error:", error);
    });
}


/* =========================================
   STAR BACKGROUND
========================================= */

const stars = document.getElementById("stars");

if (stars) {

    for (let i = 0; i < 90; i++) {

        const star = document.createElement("div");

        star.className = "star";

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";

        star.style.animationDelay =
            Math.random() * 4 + "s";

        stars.appendChild(star);
    }
}


/* =========================================
   BUTTONS
========================================= */

const startBtn = document.getElementById("startBtn");
const countdownBtn = document.getElementById("countdownBtn");
const birthdayBtn = document.getElementById("birthdayBtn");
const messageBtn = document.getElementById("messageBtn");
const memoriesBtn = document.getElementById("memoriesBtn");
const questionBtn = document.getElementById("questionBtn");

const yesBtn = document.getElementById("yesBtn");
const maybeBtn = document.getElementById("maybeBtn");
const noBtn = document.getElementById("noBtn");

const restartBtn = document.getElementById("restartBtn");


/* =========================================
   INTRO
========================================= */

startBtn.addEventListener("click", () => {

    showScreen("countdown");

    createConfetti(50);

    tryMusic();
});


/* =========================================
   COUNTDOWN
========================================= */

function updateCountdown() {

    const now = new Date();

    let year = now.getFullYear();

    let target = new Date(
        year,
        7,
        24,
        0,
        0,
        0
    );

    if (now >= target) {
        target = new Date(
            year + 1,
            7,
            24,
            0,
            0,
            0
        );
    }

    const difference =
        target.getTime() - now.getTime();

    const days =
        Math.floor(
            difference / 86400000
        );

    const hours =
        Math.floor(
            difference / 3600000
        ) % 24;

    const minutes =
        Math.floor(
            difference / 60000
        ) % 60;

    const seconds =
        Math.floor(
            difference / 1000
        ) % 60;

    document.getElementById("days").textContent =
        String(days).padStart(2,"0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2,"0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2,"0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2,"0");
}

updateCountdown();

setInterval(updateCountdown,1000);


/* =========================================
   NAVIGATION
========================================= */

countdownBtn.addEventListener("click", () => {
    showScreen("birthday");
    createConfetti(70);
});


birthdayBtn.addEventListener("click", () => {

    showScreen("message");

    startTyping();
});


messageBtn.addEventListener("click", () => {
    showScreen("memories");
});


memoriesBtn.addEventListener("click", () => {
    showScreen("finalMessage");
});


questionBtn.addEventListener("click", () => {
    showScreen("proposal");
});


/* =========================================
   TYPING
========================================= */

const personalMessage =
"Ragini, tumhare birthday par main kuch simple sa kehna chahta tha. Tum mere liye genuinely special ho, aur isi wajah se maine socha ki sirf ek normal birthday message bhejne ke bajay tumhare liye kuch alag banaya jaye. I hope this little surprise makes you smile. ❤️";

let typingStarted = false;

function startTyping() {

    if (typingStarted) return;

    typingStarted = true;

    const element =
        document.getElementById("typingText");

    let index = 0;

    const timer = setInterval(() => {

        element.textContent +=
            personalMessage[index];

        index++;

        if (index >= personalMessage.length) {

            clearInterval(timer);

            messageBtn.classList.remove("hidden");
        }

    },30);
}


/* =========================================
   YES
========================================= */

yesBtn.addEventListener("click", () => {

    submitAnswer("YES 💝");

    createConfetti(150);

    document.getElementById("resultIcon").textContent = "❤️";

    document.getElementById("resultTitle").innerHTML =
        "A new chapter can start <span>here.</span>";

    document.getElementById("resultMessage").textContent =
        "Thank you for giving it a chance. And once again, Happy Birthday, Ragini! ✨";

    setTimeout(() => {
        showScreen("result");
    },500);
});


/* =========================================
   MAYBE
========================================= */

maybeBtn.addEventListener("click", () => {

    submitAnswer("Maybe 🙂");

    document.getElementById("resultIcon").textContent = "✨";

    document.getElementById("resultTitle").innerHTML =
        "Take your time. <span>No pressure.</span>";

    document.getElementById("resultMessage").textContent =
        "Whatever you decide, I hope your birthday is genuinely wonderful. ❤️";

    setTimeout(() => {
        showScreen("result");
    },400);
});


/* =========================================
   NO
========================================= */

noBtn.addEventListener("click", () => {

    const answerText =
        document.getElementById("answerText");

    answerText.innerHTML = `
        Are you sure? ❤️
        <br><br>

        <button id="sureNoBtn" class="choice-btn no">
            No, I'm sure
        </button>
    `;

    document
        .getElementById("sureNoBtn")
        .addEventListener("click", () => {

            submitAnswer("No");

            document.getElementById("resultIcon").textContent = "🌸";

            document.getElementById("resultTitle").innerHTML =
                "Thank you for being <span>honest.</span>";

            document.getElementById("resultMessage").textContent =
                "I respect your answer. I hope you have an amazing birthday and a wonderful year ahead. ❤️";

            showScreen("result");
        });
});


/* =========================================
   RESTART
========================================= */

restartBtn.addEventListener("click", () => {

    typingStarted = false;

    document.getElementById("typingText").textContent = "";

    messageBtn.classList.add("hidden");

    document.getElementById("answerText").textContent = "";

    showScreen("intro");
});


/* =========================================
   CONFETTI
========================================= */

function createConfetti(amount) {

    const container =
        document.getElementById("confetti");

    container.innerHTML = "";

    const colors = [
        "#ff5fa2",
        "#8c7bff",
        "#ffffff",
        "#ffd166",
        "#70e1f5"
    ];

    for (let i = 0; i < amount; i++) {

        const piece =
            document.createElement("div");

        piece.className = "confetti";

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.background =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];

        piece.style.animationDuration =
            2 + Math.random() * 2 + "s";

        container.appendChild(piece);
    }
}


/* =========================================
   MUSIC
========================================= */

const musicBtn =
    document.getElementById("musicBtn");

const bgMusic =
    document.getElementById("bgMusic");

let musicPlaying = false;

function tryMusic() {

    if (!bgMusic) return;

    bgMusic.volume = .2;

    bgMusic.play()
        .then(() => {

            musicPlaying = true;

            musicBtn.textContent = "♫";

        })
        .catch(() => {});
}

musicBtn.addEventListener("click", () => {

    if (musicPlaying) {

        bgMusic.pause();

        musicPlaying = false;

        musicBtn.textContent = "♪";

    } else {

        bgMusic.volume = .2;

        bgMusic.play()
            .then(() => {

                musicPlaying = true;

                musicBtn.textContent = "♫";

            })
            .catch(() => {});
    }
});
