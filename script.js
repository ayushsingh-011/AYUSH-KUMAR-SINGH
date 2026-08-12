/* =========================================
   RAGINI BIRTHDAY WEBSITE
   FINAL SCRIPT
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const screens = document.querySelectorAll(".screen");

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

const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

const typingText = document.getElementById("typingText");

const answerText = document.getElementById("answerText");

const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");

const confetti = document.getElementById("confetti");


/* =========================================
   SCREEN NAVIGATION
========================================= */

function showScreen(id) {

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(id);

    if (target) {
        target.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   START
========================================= */

startBtn.addEventListener("click", () => {

    showScreen("countdown");

    startMusic();

});


/* =========================================
   COUNTDOWN
========================================= */

const targetDate = new Date(
    "August 24, 2026 00:00:00"
).getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const difference = targetDate - now;

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");
    const message = document.getElementById("countdownMessage");

    if (difference <= 0) {

        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";

        message.textContent =
            "Today is your special day ✨";

        return;
    }

    const d = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const h = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const m = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const s = Math.floor(
        (difference / 1000) % 60
    );

    days.textContent = String(d).padStart(2, "0");
    hours.textContent = String(h).padStart(2, "0");
    minutes.textContent = String(m).padStart(2, "0");
    seconds.textContent = String(s).padStart(2, "0");
}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================
   COUNTDOWN → BIRTHDAY
========================================= */

countdownBtn.addEventListener("click", () => {

    showScreen("birthday");

});


/* =========================================
   BIRTHDAY → MESSAGE
========================================= */

birthdayBtn.addEventListener("click", () => {

    showScreen("message");

    startTyping();

});


/* =========================================
   TYPING MESSAGE
========================================= */

const message =
`Ragini,

I just wanted to make something a little different for your birthday.

Sometimes the simplest moments become the ones we remember the most.

So this isn't just a birthday message...

It's a small reminder that you are genuinely special.

I hope your day is filled with happiness, laughter and lots of beautiful moments. ✨`;


let typingStarted = false;


function startTyping() {

    if (typingStarted) return;

    typingStarted = true;

    typingText.textContent = "";

    let index = 0;

    const speed = 32;


    function typeCharacter() {

        if (index < message.length) {

            typingText.textContent +=
                message.charAt(index);

            index++;

            setTimeout(
                typeCharacter,
                speed
            );

        } else {

            messageBtn.classList.remove("hidden");

        }

    }


    typeCharacter();
}


/* =========================================
   MESSAGE → MEMORIES
========================================= */

messageBtn.addEventListener("click", () => {

    showScreen("memories");

});


/* =========================================
   MEMORIES → FINAL MESSAGE
========================================= */

memoriesBtn.addEventListener("click", () => {

    showScreen("finalMessage");

});


/* =========================================
   FINAL → QUESTION
========================================= */

questionBtn.addEventListener("click", () => {

    showScreen("proposal");

});


/* =========================================
   PROPOSAL — YES
========================================= */

yesBtn.addEventListener("click", () => {

    answerText.textContent =
        "That honestly made me smile. ❤️";

    setTimeout(() => {

        showResult(
            "💖",
            "You just made this day",
            "even more special. ❤️"
        );

        createConfetti();

    }, 900);

});


/* =========================================
   PROPOSAL — MAYBE
========================================= */

maybeBtn.addEventListener("click", () => {

    answerText.textContent =
        "Take your time. There's absolutely no pressure. 🙂";

});


/* =========================================
   PROPOSAL — NO
========================================= */

noBtn.addEventListener("click", () => {

    answerText.textContent =
        "That's completely okay. I respect your answer. ❤️";

    setTimeout(() => {

        showResult(
            "✨",
            "Thank you for being honest.",
            "Whatever happens, I genuinely wish you happiness. Happy Birthday, Ragini. ❤️"
        );

    }, 1000);

});


/* =========================================
   RESULT
========================================= */

function showResult(
    icon,
    title,
    messageText
) {

    resultIcon.textContent = icon;

    resultTitle.innerHTML =
        title;

    resultMessage.textContent =
        messageText;

    showScreen("result");

}


/* =========================================
   RESTART
========================================= */

restartBtn.addEventListener("click", () => {

    typingStarted = false;

    typingText.textContent = "";

    messageBtn.classList.add("hidden");

    answerText.textContent = "";

    resultIcon.textContent = "✨";

    resultTitle.innerHTML =
        `Whatever your answer,
        <span>stay amazing.</span>`;

    resultMessage.textContent =
        "And once again, Happy Birthday, Ragini. ❤️";

    showScreen("intro");

});


/* =========================================
   MUSIC
========================================= */

let musicPlaying = false;


function startMusic() {

    if (!bgMusic) return;

    bgMusic.volume = 0.35;

    bgMusic.play()
        .then(() => {

            musicPlaying = true;

            musicBtn.textContent = "♫";

        })
        .catch(() => {

            musicPlaying = false;

        });

}


musicBtn.addEventListener("click", () => {

    if (!bgMusic) return;


    if (musicPlaying) {

        bgMusic.pause();

        musicPlaying = false;

        musicBtn.textContent = "🔇";

    } else {

        bgMusic.play()
            .then(() => {

                musicPlaying = true;

                musicBtn.textContent = "♫";

            })
            .catch(() => {

                musicPlaying = false;

            });

    }

});


/* =========================================
   STARS
========================================= */

const starsContainer =
    document.getElementById("stars");


function createStars() {

    if (!starsContainer) return;

    starsContainer.innerHTML = "";

    const numberOfStars =
        window.innerWidth < 700 ? 55 : 100;


    for (
        let i = 0;
        i < numberOfStars;
        i++
    ) {

        const star =
            document.createElement("div");

        star.className = "star";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.setProperty(
            "--duration",
            (2 + Math.random() * 4) + "s"
        );

        star.style.animationDelay =
            (-Math.random() * 4) + "s";

        starsContainer.appendChild(star);

    }

}


createStars();


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    if (!confetti) return;

    confetti.innerHTML = "";


    const pieces = 90;


    for (
        let i = 0;
        i < pieces;
        i++
    ) {

        const piece =
            document.createElement("div");

        piece.className =
            "confetti-piece";


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.width =
            (5 + Math.random() * 7) + "px";


        piece.style.height =
            (8 + Math.random() * 12) + "px";


        piece.style.background =
            getRandomColor();


        piece.style.setProperty(
            "--fall-time",
            (3 + Math.random() * 4) + "s"
        );


        piece.style.animationDelay =
            (Math.random() * 1.5) + "s";


        confetti.appendChild(piece);

    }


    setTimeout(() => {

        confetti.innerHTML = "";

    }, 8000);

}


/* =========================================
   CONFETTI COLORS
========================================= */

function getRandomColor() {

    const colors = [
        "#ff6fae",
        "#987cff",
        "#ffffff",
        "#ffd166",
        "#6ee7ff",
        "#ff9f68"
    ];

    return colors[
        Math.floor(
            Math.random() * colors.length
        )
    ];

}


/* =========================================
   BUTTON KEYBOARD ACCESS
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            showScreen("intro");

        }

    }
);


/* =========================================
   PREVENT ACCIDENTAL HORIZONTAL SCROLL
========================================= */

document.documentElement.style.overflowX =
    "hidden";


/* =========================================
   READY
========================================= */

console.log(
    "✨ Ragini Birthday Experience loaded successfully."
);
