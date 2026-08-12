/* =========================================
   RAGINI BIRTHDAY WEBSITE
   FINAL SCRIPT
========================================= */


/* =========================================
   SCREEN ELEMENTS
========================================= */

const screens = document.querySelectorAll(".screen");

const intro = document.getElementById("intro");
const countdown = document.getElementById("countdown");
const birthday = document.getElementById("birthday");
const message = document.getElementById("message");
const memories = document.getElementById("memories");
const finalMessage = document.getElementById("finalMessage");
const proposal = document.getElementById("proposal");
const result = document.getElementById("result");


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

const answerText = document.getElementById("answerText");

const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const resultIcon = document.getElementById("resultIcon");

const restartBtn = document.getElementById("restartBtn");

const confetti = document.getElementById("confetti");


/* =========================================
   MUSIC
========================================= */

const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

let musicPlaying = false;


/* =========================================
   GOOGLE FORM CONNECTION
========================================= */

const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSf6v-i2wTzYnQ3QmPXEtG1FkzkwppxPmgz3oV8uTLKeAISKlw/formResponse";

const GOOGLE_ENTRY =
    "entry.98190819";


/*
   Sends the selected answer
   to your Google Form.
*/

function submitAnswer(answer) {

    const formData = new FormData();

    formData.append(
        GOOGLE_ENTRY,
        answer
    );

    fetch(GOOGLE_FORM_URL, {

        method: "POST",

        mode: "no-cors",

        body: formData

    }).catch(() => {

        console.log(
            "Google Form submission attempted."
        );

    });

}


/* =========================================
   SCREEN SWITCHING
========================================= */

function showScreen(targetScreen) {

    screens.forEach(screen => {

        screen.classList.remove("active");

    });

    if (targetScreen) {

        targetScreen.classList.add("active");

    }

}


/* =========================================
   STAR BACKGROUND
========================================= */

const starsContainer =
    document.getElementById("stars");


if (starsContainer) {

    for (let i = 0; i < 90; i++) {

        const star =
            document.createElement("div");

        star.classList.add("star");

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.setProperty(
            "--duration",
            2 + Math.random() * 4 + "s"
        );

        star.style.animationDelay =
            Math.random() * 4 + "s";

        starsContainer.appendChild(star);

    }

}


/* =========================================
   INTRO
========================================= */

if (startBtn) {

    startBtn.addEventListener(
        "click",
        () => {

            showScreen(countdown);

            createConfetti(50);

            tryMusic();

        }
    );

}


/* =========================================
   MUSIC CONTROL
========================================= */

function tryMusic() {

    if (!bgMusic) return;

    bgMusic.volume = 0.20;

    bgMusic.play()
        .then(() => {

            musicPlaying = true;

            if (musicBtn) {

                musicBtn.textContent = "♫";

            }

        })
        .catch(() => {

            musicPlaying = false;

        });

}


if (musicBtn && bgMusic) {

    musicBtn.addEventListener(
        "click",
        () => {

            if (musicPlaying) {

                bgMusic.pause();

                musicPlaying = false;

                musicBtn.textContent = "♪";

            } else {

                bgMusic.volume = 0.20;

                bgMusic.play()
                    .then(() => {

                        musicPlaying = true;

                        musicBtn.textContent =
                            "♫";

                    })
                    .catch(() => {});

            }

        }
    );

}


/* =========================================
   COUNTDOWN
========================================= */

function getBirthdayDate() {

    const now = new Date();

    let year =
        now.getFullYear();

    let target =
        new Date(
            year,
            7,
            24,
            0,
            0,
            0
        );

    if (now > target) {

        target =
            new Date(
                year + 1,
                7,
                24,
                0,
                0,
                0
            );

    }

    return target;

}


function updateCountdown() {

    const target =
        getBirthdayDate();

    const now =
        new Date();

    let difference =
        target.getTime() -
        now.getTime();


    if (difference < 0) {

        difference = 0;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    if (daysElement)
        daysElement.textContent =
            String(days).padStart(2, "0");


    if (hoursElement)
        hoursElement.textContent =
            String(hours).padStart(2, "0");


    if (minutesElement)
        minutesElement.textContent =
            String(minutes).padStart(2, "0");


    if (secondsElement)
        secondsElement.textContent =
            String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================================
   COUNTDOWN → BIRTHDAY
========================================= */

if (countdownBtn) {

    countdownBtn.addEventListener(
        "click",
        () => {

            showScreen(birthday);

            createConfetti(90);

        }
    );

}


/* =========================================
   BIRTHDAY → MESSAGE
========================================= */

if (birthdayBtn) {

    birthdayBtn.addEventListener(
        "click",
        () => {

            showScreen(message);

            startTyping();

        }
    );

}


/* =========================================
   TYPING MESSAGE
========================================= */

const personalMessage =
    "Ragini, tumhare birthday par main kuch simple sa kehna chahta tha. Tum mere liye genuinely special ho, aur isi wajah se maine socha ki sirf ek normal birthday message bhejne ke bajay tumhare liye kuch alag banaya jaye. I hope this little surprise makes you smile. ❤️";


let typingStarted = false;


function startTyping() {

    if (typingStarted) return;

    typingStarted = true;

    const typingText =
        document.getElementById(
            "typingText"
        );


    if (!typingText) return;


    let index = 0;

    typingText.textContent = "";


    const interval =
        setInterval(() => {

            typingText.textContent +=
                personalMessage[index];

            index++;


            if (
                index >=
                personalMessage.length
            ) {

                clearInterval(interval);


                if (messageBtn) {

                    messageBtn.classList.remove(
                        "hidden"
                    );

                }

            }

        }, 30);

}


/* =========================================
   MESSAGE → MEMORIES
========================================= */

if (messageBtn) {

    messageBtn.addEventListener(
        "click",
        () => {

            showScreen(memories);

        }
    );

}


/* =========================================
   MEMORIES → FINAL MESSAGE
========================================= */

if (memoriesBtn) {

    memoriesBtn.addEventListener(
        "click",
        () => {

            showScreen(finalMessage);

        }
    );

}


/* =========================================
   FINAL MESSAGE → PROPOSAL
========================================= */

if (questionBtn) {

    questionBtn.addEventListener(
        "click",
        () => {

            showScreen(proposal);

        }
    );

}


/* =========================================
   YES ❤️
========================================= */

if (yesBtn) {

    yesBtn.addEventListener(
        "click",
        () => {

            /*
              Google Sheet:
              YES 💝
            */

            submitAnswer("YES 💝");


            createConfetti(150);


            setTimeout(() => {

                if (resultIcon) {

                    resultIcon.textContent =
                        "❤️";

                }


                if (resultTitle) {

                    resultTitle.innerHTML =
                        "A new chapter can start <span>here.</span>";

                }


                if (resultMessage) {

                    resultMessage.textContent =
                        "Thank you for giving it a chance. And once again, Happy Birthday, Ragini! ✨";

                }


                showScreen(result);

            }, 800);

        }
    );

}


/* =========================================
   MAYBE 🙂
========================================= */

if (maybeBtn) {

    maybeBtn.addEventListener(
        "click",
        () => {

            /*
              Google Sheet:
              Maybe 🙂
            */

            submitAnswer("Maybe 🙂");


            setTimeout(() => {

                if (resultIcon) {

                    resultIcon.textContent =
                        "✨";

                }


                if (resultTitle) {

                    resultTitle.innerHTML =
                        "Take your time. <span>No pressure.</span>";

                }


                if (resultMessage) {

                    resultMessage.textContent =
                        "Whatever you decide, I hope your birthday is genuinely wonderful. ❤️";

                }


                showScreen(result);

            }, 500);

        }
    );

}


/* =========================================
   NO → SECOND CONFIRMATION
========================================= */

if (noBtn) {

    noBtn.addEventListener(
        "click",
        () => {

            showNoConfirmation();

        }
    );

}


function showNoConfirmation() {

    if (!answerText) return;


    answerText.innerHTML = `

        <strong>
            Are you sure? ❤️
        </strong>

        <br><br>

        Please, ek baar soch lena.
        I just wanted to ask you honestly.

        <br><br>

        <button
            id="thinkBtn"
            class="choice-btn maybe-btn"
        >
            I'll think about it 🙂
        </button>

        <button
            id="sureNoBtn"
            class="choice-btn no-btn"
        >
            No, I'm sure
        </button>

    `;


    const thinkBtn =
        document.getElementById(
            "thinkBtn"
        );


    const sureNoBtn =
        document.getElementById(
            "sureNoBtn"
        );


    /* -------------------------------
       I'LL THINK ABOUT IT
    -------------------------------- */

    if (thinkBtn) {

        thinkBtn.addEventListener(
            "click",
            () => {

                submitAnswer(
                    "Maybe 🙂"
                );


                if (resultIcon) {

                    resultIcon.textContent =
                        "✨";

                }


                if (resultTitle) {

                    resultTitle.innerHTML =
                        "Take your time. <span>No pressure.</span>";

                }


                if (resultMessage) {

                    resultMessage.textContent =
                        "Thank you for thinking about it. Happy Birthday, Ragini! ❤️";

                }


                showScreen(result);

            }
        );

    }


    /* -------------------------------
       NO, I'M SURE
    -------------------------------- */

    if (sureNoBtn) {

        sureNoBtn.addEventListener(
            "click",
            () => {

                submitAnswer("No");


                if (resultIcon) {

                    resultIcon.textContent =
                        "🌸";

                }


                if (resultTitle) {

                    resultTitle.innerHTML =
                        "Thank you for being <span>honest.</span>";

                }


                if (resultMessage) {

                    resultMessage.textContent =
                        "I respect your answer. I hope you have an amazing birthday and a wonderful year ahead. ❤️";

                }


                showScreen(result);

            }
        );

    }

}


/* =========================================
   RESTART
========================================= */

if (restartBtn) {

    restartBtn.addEventListener(
        "click",
        () => {

            typingStarted = false;


            if (messageBtn) {

                messageBtn.classList.add(
                    "hidden"
                );

            }


            if (answerText) {

                answerText.textContent = "";

            }


            showScreen(intro);

        }
    );

}


/* =========================================
   CONFETTI
========================================= */

function createConfetti(amount) {

    if (!confetti) return;


    confetti.innerHTML = "";


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );


        piece.classList.add(
            "confetti-piece"
        );


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.width =
            5 + Math.random() * 7 + "px";


        piece.style.height =
            8 + Math.random() * 12 + "px";


        piece.style.opacity =
            0.6 +
            Math.random() * 0.4;


        piece.style.background =
            getConfettiColor();


        piece.style.setProperty(
            "--fall-time",
            2 +
            Math.random() * 2.5 +
            "s"
        );


        piece.style.animationDelay =
            Math.random() * 0.8 +
            "s";


        confetti.appendChild(piece);

    }

}


function getConfettiColor() {

    const colors = [

        "#ff6fae",
        "#987cff",
        "#ffffff",
        "#ffd166",
        "#70e1f5"

    ];


    return colors[
        Math.floor(
            Math.random() *
            colors.length
        )
    ];

}


/* =========================================
   BUTTON PRESS EFFECT
========================================= */

document
    .querySelectorAll("button")
    .forEach(button => {

        button.addEventListener(
            "pointerdown",
            () => {

                button.style.transform =
                    "scale(0.96)";

            }
        );


        button.addEventListener(
            "pointerup",
            () => {

                button.style.transform =
                    "";

            }
        );


        button.addEventListener(
            "pointerleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });


/* =========================================
   END
========================================= */