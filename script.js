/* =========================================================
   WEBSITE CONFIG
========================================================= */

const WEBSITE_CONFIG = {
    passcode: "0610",
    passcodeLength: 4,

    birthdayDate: new Date(
        "2026-10-05T14:03:00+05:30"
    )
};


/* =========================================================
   PAGE 1 ELEMENTS
========================================================= */

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

const secretCard =
    document.querySelector(".secret-card");

const keypadButtons =
    document.querySelectorAll(".key[data-number]");

const deleteKey =
    document.getElementById("deleteKey");

const passcodeDots =
    document.getElementById("passcodeDots");

const dots =
    document.querySelectorAll(".dot");

const statusText =
    document.getElementById("status");

const butterflyLayer =
    document.getElementById("butterflyLayer");


/* =========================================================
   PAGE 2 ELEMENTS
========================================================= */

const countdownScreen =
    document.getElementById("countdownScreen");

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");

const ageReveal =
    document.getElementById("ageReveal");

const ageNumber =
    document.getElementById("ageNumber");

const sweetEighteen =
    document.getElementById("sweetEighteen");

const birthdayFinal =
    document.getElementById("birthdayFinal");

const fireworksCanvas =
    document.getElementById("fireworksCanvas");

const continueToCake =
    document.getElementById("continueToCake");

const page3 =
    document.getElementById("page3");


/* =========================================================
   VARIABLES
========================================================= */

let enteredCode = "";

let countdownTimer = null;

let pageTwoStarted = false;

let fireworks = [];

let fireworksParticles = [];

let fireworksAnimation = null;


/* =========================================================
   UPDATE PASSCODE DOTS
========================================================= */

function updateDots() {

    dots.forEach(function(dot, index) {

        if (index < enteredCode.length) {

            dot.classList.add("filled");

        } else {

            dot.classList.remove("filled");

        }

    });

}


/* =========================================================
   STATUS MESSAGE
========================================================= */

function setStatus(message, type = "") {

    statusText.textContent = message;

    statusText.classList.remove(
        "success",
        "error"
    );

    if (type !== "") {

        statusText.classList.add(type);

    }

}


/* =========================================================
   ADD NUMBER
========================================================= */

function addNumber(number) {

    if (
        enteredCode.length >=
        WEBSITE_CONFIG.passcodeLength
    ) {

        return;

    }

    enteredCode += String(number);

    updateDots();

    setStatus("");

    if (
        enteredCode.length ===
        WEBSITE_CONFIG.passcodeLength
    ) {

        setTimeout(function() {

            checkPasscode();

        }, 180);

    }

}


/* =========================================================
   DELETE NUMBER
========================================================= */

function deleteNumber() {

    if (enteredCode.length === 0) {

        return;

    }

    enteredCode =
        enteredCode.slice(
            0,
            -1
        );

    updateDots();

    setStatus("");

}


/* =========================================================
   CHECK PASSCODE
========================================================= */

function checkPasscode() {

    if (
        enteredCode ===
        WEBSITE_CONFIG.passcode
    ) {

        unlockWebsite();

    } else {

        wrongPasscode();

    }

}


/* =========================================================
   WRONG PASSCODE
========================================================= */

function wrongPasscode() {

    setStatus(
        "That's not the secret code...",
        "error"
    );

    passcodeDots.classList.remove("shake");

    void passcodeDots.offsetWidth;

    passcodeDots.classList.add("shake");

    setTimeout(function() {

        enteredCode = "";

        updateDots();

        setStatus("Try again...");

    }, 700);

}


/* =========================================================
   UNLOCK WEBSITE
========================================================= */

function unlockWebsite() {

    setStatus(
        "Unlocked ",
        "success"
    );

    secretCard.classList.add("unlocking");

    setTimeout(function() {

        page1.style.display = "none";

        page2.style.display = "flex";

        startPageTwo();

    }, 850);

}


/* =========================================================
   KEYPAD BUTTON EVENTS
========================================================= */

keypadButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            addNumber(
                button.dataset.number
            );

        }
    );

});


/* =========================================================
   DELETE BUTTON
========================================================= */

deleteKey.addEventListener(
    "click",
    function() {

        deleteNumber();

    }
);


/* =========================================================
   KEYBOARD SUPPORT
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key >= "0" &&
            event.key <= "9"
        ) {

            addNumber(event.key);

        }

        if (
            event.key === "Backspace" ||
            event.key === "Delete"
        ) {

            deleteNumber();

        }

        if (
            event.key === "Enter" &&
            enteredCode.length ===
            WEBSITE_CONFIG.passcodeLength
        ) {

            checkPasscode();

        }

    }
);


/* =========================================================
   RANDOM NUMBER HELPER
========================================================= */

function random(min, max) {

    return (
        Math.random() *
        (max - min)
    ) + min;

}


/* =========================================================
   CREATE BUTTERFLY
========================================================= */

function createButterfly() {

    if (!butterflyLayer) {

        return;

    }

    const butterfly =
        document.createElement("div");

    butterfly.className =
        "flying-butterfly";

    butterfly.innerHTML = `
        <span class="wing left-wing"></span>
        <span class="wing right-wing"></span>
        <span class="body"></span>
    `;


    const startX =
        random(
            -100,
            window.innerWidth + 100
        );

    const startY =
        random(
            -100,
            window.innerHeight + 100
        );


    const x1 =
        random(
            -100,
            window.innerWidth + 100
        );

    const y1 =
        random(
            -100,
            window.innerHeight + 100
        );


    const x2 =
        random(
            -100,
            window.innerWidth + 100
        );

    const y2 =
        random(
            -100,
            window.innerHeight + 100
        );


    const x3 =
        random(
            -100,
            window.innerWidth + 100
        );

    const y3 =
        random(
            -100,
            window.innerHeight + 100
        );


    const endX =
        random(
            -100,
            window.innerWidth + 100
        );

    const endY =
        random(
            -100,
            window.innerHeight + 100
        );


    const duration =
        random(7.0, 10.0);

    const scale =
        random(0.65, 1.15);


    const startRotation =
        random(-50, 50);

    const rotation1 =
        random(-100, 100);

    const rotation2 =
        random(-120, 120);

    const rotation3 =
        random(-100, 100);

    const endRotation =
        random(-150, 150);


    butterfly.style.setProperty(
        "--start-x",
        startX + "px"
    );

    butterfly.style.setProperty(
        "--start-y",
        startY + "px"
    );

    butterfly.style.setProperty(
        "--x1",
        x1 + "px"
    );

    butterfly.style.setProperty(
        "--y1",
        y1 + "px"
    );

    butterfly.style.setProperty(
        "--x2",
        x2 + "px"
    );

    butterfly.style.setProperty(
        "--y2",
        y2 + "px"
    );

    butterfly.style.setProperty(
        "--x3",
        x3 + "px"
    );

    butterfly.style.setProperty(
        "--y3",
        y3 + "px"
    );

    butterfly.style.setProperty(
        "--end-x",
        endX + "px"
    );

    butterfly.style.setProperty(
        "--end-y",
        endY + "px"
    );

    butterfly.style.setProperty(
        "--duration",
        duration + "s"
    );

    butterfly.style.setProperty(
        "--scale",
        scale
    );

    butterfly.style.setProperty(
        "--start-rotation",
        startRotation + "deg"
    );

    butterfly.style.setProperty(
        "--rotation1",
        rotation1 + "deg"
    );

    butterfly.style.setProperty(
        "--rotation2",
        rotation2 + "deg"
    );

    butterfly.style.setProperty(
        "--rotation3",
        rotation3 + "deg"
    );

    butterfly.style.setProperty(
        "--end-rotation",
        endRotation + "deg"
    );


    butterflyLayer.appendChild(
        butterfly
    );


    setTimeout(function() {

        butterfly.remove();

    }, (duration + 0.5) * 1000);

}


/* =========================================================
   BUTTERFLY LOOP
========================================================= */

function startButterflies() {

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        setTimeout(
            createButterfly,
            i * 500
        );

    }


    setInterval(
        createButterfly,
        900
    );

}


/* =========================================================
   START PAGE 2
========================================================= */

function startPageTwo() {

    if (pageTwoStarted) {

        return;

    }

    pageTwoStarted = true;


    setTimeout(function() {

        page2.classList.add(
            "curtains-open"
        );

    }, 500);


    startCountdown();

}


/* =========================================================
   START COUNTDOWN
========================================================= */

function startCountdown() {

    updateCountdown();

    countdownTimer =
        setInterval(
            updateCountdown,
            1000
        );

}


/* =========================================================
   UPDATE COUNTDOWN
========================================================= */

function updateCountdown() {

    const now = new Date();

    const difference =
        WEBSITE_CONFIG
            .birthdayDate
            .getTime()
        -
        now.getTime();


    if (difference <= 0) {

        if (countdownTimer !== null) {

            clearInterval(
                countdownTimer
            );

            countdownTimer = null;

        }

        setCountdownToZero();

        beginBirthdayReveal();

        return;

    }


    const totalSeconds =
        Math.floor(
            difference / 1000
        );


    const days =
        Math.floor(
            totalSeconds / 86400
        );


    const hours =
        Math.floor(
            (totalSeconds % 86400) /
            3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) /
            60
        );


    const seconds =
        totalSeconds % 60;


    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");

}


/* =========================================================
   SET COUNTDOWN ZERO
========================================================= */

function setCountdownToZero() {

    daysElement.textContent = "00";

    hoursElement.textContent = "00";

    minutesElement.textContent = "00";

    secondsElement.textContent = "00";

    startBirthdayMusic();

}


/* =========================================================
   BEGIN BIRTHDAY REVEAL
========================================================= */

function beginBirthdayReveal() {

    countdownScreen.classList.add(
        "fade-out"
    );


    setTimeout(function() {

        ageReveal.classList.add(
            "active"
        );


        setTimeout(function() {

            changeAgeTo18();

        }, 1700);

    }, 1100);

}


/* =========================================================
   CHANGE 17 TO 18
========================================================= */

function changeAgeTo18() {

    ageNumber.classList.add(
        "change"
    );


    setTimeout(function() {

        ageNumber.textContent =
            "18";

    }, 1050);


    setTimeout(function() {

        sweetEighteen.classList.add(
            "show"
        );

    }, 1700);


    setTimeout(function() {

        showBirthdayFinal();

    }, 3500);

}


/* =========================================================
   SHOW FINAL BIRTHDAY SCREEN
========================================================= */

function showBirthdayFinal() {

    ageReveal.style.opacity = "0";

    ageReveal.style.pointerEvents =
        "none";

    birthdayFinal.classList.add(
        "show"
    );

    startFireworks();

    playCrackerSound();

}


/* =========================================================
   FIREWORK CANVAS RESIZE
========================================================= */

function resizeFireworksCanvas() {

    if (!fireworksCanvas) {

        return;

    }

    const ratio =
        window.devicePixelRatio || 1;


    fireworksCanvas.width =
        window.innerWidth * ratio;

    fireworksCanvas.height =
        window.innerHeight * ratio;


    fireworksCanvas.style.width =
        window.innerWidth + "px";

    fireworksCanvas.style.height =
        window.innerHeight + "px";


    fireworksContext.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );

}


/* =========================================================
   FIREWORK CONTEXT
========================================================= */

const fireworksContext =
    fireworksCanvas
        ? fireworksCanvas.getContext("2d")
        : null;


/* =========================================================
   WINDOW RESIZE
========================================================= */

window.addEventListener(
    "resize",
    function() {

        resizeFireworksCanvas();

    }
);


/* =========================================================
   CREATE FIREWORK
========================================================= */

function createFirework() {

    fireworks.push({

        x:
            random(
                window.innerWidth * 0.08,
                window.innerWidth * 0.92
            ),

        y:
            window.innerHeight + 10,


        targetX:
            random(
                window.innerWidth * 0.12,
                window.innerWidth * 0.88
            ),


        targetY:
            random(
                window.innerHeight * 0.08,
                window.innerHeight * 0.48
            ),


        speed:
            random(7, 11),


        hue:
            random(0, 360)

    });

}


/* =========================================================
   EXPLODE FIREWORK
========================================================= */

function explodeFirework(firework) {

    const particleCount =
        Math.floor(
            random(45, 75)
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const angle =
            random(
                0,
                Math.PI * 2
            );


        const speed =
            random(
                1.5,
                6.5
            );


        fireworksParticles.push({

            x: firework.x,

            y: firework.y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            gravity: 0.055,

            friction: 0.985,

            life: 1,

            decay:
                random(
                    0.012,
                    0.022
                ),

            hue:
                firework.hue

        });

    }

}


/* =========================================================
   FIREWORK ANIMATION
========================================================= */

function animateFireworks() {

    if (!fireworksContext) {

        return;

    }


    const ctx =
        fireworksContext;


    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    if (
        Math.random() < 0.075
    ) {

        createFirework();

    }


    /* -----------------------------------------------------
       ROCKETS
    ----------------------------------------------------- */

    for (
        let i =
            fireworks.length - 1;
        i >= 0;
        i--
    ) {

        const firework =
            fireworks[i];


        const dx =
            firework.targetX -
            firework.x;

        const dy =
            firework.targetY -
            firework.y;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (distance < 14) {

            explodeFirework(
                firework
            );

            fireworks.splice(
                i,
                1
            );

            continue;

        }


        const angle =
            Math.atan2(
                dy,
                dx
            );


        firework.x +=
            Math.cos(angle) *
            firework.speed;

        firework.y +=
            Math.sin(angle) *
            firework.speed;


        ctx.beginPath();

        ctx.arc(
            firework.x,
            firework.y,
            2,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            "hsl(" +
            firework.hue +
            ", 100%, 75%)";


        ctx.shadowBlur = 15;

        ctx.shadowColor =
            "hsl(" +
            firework.hue +
            ", 100%, 65%)";


        ctx.fill();

    }


    /* -----------------------------------------------------
       EXPLOSION PARTICLES
    ----------------------------------------------------- */

    for (
        let i =
            fireworksParticles.length - 1;
        i >= 0;
        i--
    ) {

        const particle =
            fireworksParticles[i];


        particle.vx *=
            particle.friction;


        particle.vy =
            particle.vy *
            particle.friction
            +
            particle.gravity;


        particle.x +=
            particle.vx;

        particle.y +=
            particle.vy;


        particle.life -=
            particle.decay;


        if (
            particle.life <= 0
        ) {

            fireworksParticles.splice(
                i,
                1
            );

            continue;

        }


        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            random(1, 2.5),
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            "hsla(" +
            particle.hue +
            ", 100%, 75%, " +
            particle.life +
            ")";


        ctx.shadowBlur = 12;

        ctx.shadowColor =
            "hsla(" +
            particle.hue +
            ", 100%, 70%, " +
            particle.life +
            ")";


        ctx.fill();

    }


    ctx.shadowBlur = 0;


    fireworksAnimation =
        requestAnimationFrame(
            animateFireworks
        );

}


/* =========================================================
   START FIREWORKS
========================================================= */

function startFireworks() {

    resizeFireworksCanvas();

    fireworks = [];

    fireworksParticles = [];


    if (
        fireworksAnimation !== null
    ) {

        cancelAnimationFrame(
            fireworksAnimation
        );

    }


    animateFireworks();


    setTimeout(
        createFirework,
        200
    );

    setTimeout(
        createFirework,
        550
    );

    setTimeout(
        createFirework,
        900
    );

    setTimeout(
        createFirework,
        1400
    );

}


/* =========================================================
   CONTINUE BUTTON
========================================================= */

continueToCake.addEventListener(
    "click",
    function() {

        if (crackerAudio) {
            crackerAudio.pause();
            crackerAudio.currentTime = 0;
        }

        birthdayFinal.classList.remove(
            "show"
        );

        page3.style.display =
    "flex";

        startCakeJourney();

    }
);


/* =========================================================
   INITIALIZE WEBSITE
========================================================= */

startButterflies();

updateDots();

/* =========================================================
   BIRTHDAY MUSIC
========================================================= */

const birthdayAudio =
    document.getElementById("birthdayAudio");

    const crackerAudio =
    document.getElementById("crackerAudio");

   function startBirthdayMusic() {

    if (!birthdayAudio) {
        return;
    }

    birthdayAudio.volume = 0.5;

    birthdayAudio.play().catch(function(error) {

        console.log(
            "Birthday music could not start:",
            error
        );

    });
}

function playCrackerSound() {

    if (!crackerAudio) {
        return;
    }

    crackerAudio.currentTime = 0;

    crackerAudio.volume = 0.8;

    crackerAudio.play().catch(function(error) {

        console.log(
            "Cracker sound could not start:",
            error
        );

    });
}

/* =========================================================
   PAGE 3 — CAKE INTERACTION
========================================================= */

const pullStage =
    document.getElementById(
        "pullStage"
    );

const candleStage =
    document.getElementById(
        "candleStage"
    );

const cutStage =
    document.getElementById(
        "cutStage"
    );

const page3Final =
    document.getElementById(
        "page3Final"
    );

const pullString =
    document.getElementById(
        "pullString"
    );

const stringMachine =
    document.getElementById(
        "stringMachine"
    );

const blowButton =
    document.getElementById(
        "blowButton"
    );

    /* =========================================================
   BLOW CANDLES → CUT THE CAKE
========================================================= */

if (blowButton) {

    blowButton.addEventListener(
        "click",
        function() {

            if (
                !candleStage ||
                !candleStage.classList.contains("active")
            ) {
                return;
            }

            if (candlesBlown) {
                return;
            }

            candlesBlown = true;


            /* -----------------------------------------
               BLOW OUT ALL THREE FLAMES
            ----------------------------------------- */

            [flame1, flame2, flame3].forEach(
                function(flame) {

                    if (flame) {

                        flame.classList.add(
                            "blown"
                        );

                    }

                }
            );


            /* -----------------------------------------
               UPDATE MESSAGE
            ----------------------------------------- */

            if (candleMessage) {

                candleMessage.textContent =
                    "Wish made... ❤️";

            }


            /* -----------------------------------------
               DISABLE BUTTON
            ----------------------------------------- */

            blowButton.disabled = true;

            blowButton.textContent =
                "WISH MADE ❤️";


            /* -----------------------------------------
               MOVE TO CUT THE CAKE
            ----------------------------------------- */

            setTimeout(
                function() {

                    showCakeStage(
                        cutStage
                    );

                },
                1200
            );

        }
    );

}

const flame1 =
    document.getElementById(
        "flame1"
    );

const flame2 =
    document.getElementById(
        "flame2"
    );

const flame3 =
    document.getElementById(
        "flame3"
    );

const candleMessage =
    document.getElementById(
        "candleMessage"
    );

const cakeKnife =
    document.getElementById(
        "cakeKnife"
    );

const cutCake =
    document.getElementById(
        "cutCake"
    );

const cutMessage =
    document.getElementById(
        "cutMessage"
    );

    /* =========================================================
   KNIFE — HOLD & DRAG TO CUT CAKE
========================================================= */

if (cakeKnife && cutCake && cutStage) {

    let holdingKnife = false;
    let knifeStartX = 0;
    let knifeStartY = 0;
    let knifeMoved = false;


    cakeKnife.addEventListener(
        "pointerdown",
        function(event) {

            if (
                !cutStage.classList.contains("active") ||
                cakeCut
            ) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            holdingKnife = true;
            knifeMoved = false;

            knifeStartX = event.clientX;
            knifeStartY = event.clientY;

            cakeKnife.classList.add("holding");

            try {
                cakeKnife.setPointerCapture(
                    event.pointerId
                );
            } catch (error) {}

            if (cutMessage) {
                cutMessage.textContent =
                    "Now drag the knife across the cake...";
            }

        }
    );


    cakeKnife.addEventListener(
        "pointermove",
        function(event) {

            if (
                !holdingKnife ||
                cakeCut
            ) {
                return;
            }

            event.preventDefault();

            const dx =
                event.clientX - knifeStartX;

            const dy =
                event.clientY - knifeStartY;


            if (
                Math.abs(dx) > 5 ||
                Math.abs(dy) > 5
            ) {
                knifeMoved = true;
            }


            /* Move knife with pointer */

            const parentRect =
                cakeKnife.parentElement.getBoundingClientRect();

            const knifeRect =
                cakeKnife.getBoundingClientRect();


            let newLeft =
                event.clientX -
                parentRect.left -
                knifeRect.width / 2;


            let newTop =
                event.clientY -
                parentRect.top -
                knifeRect.height / 2;


            cakeKnife.style.left =
                newLeft + "px";

            cakeKnife.style.top =
                newTop + "px";


            /* -----------------------------------------
               CHECK WHETHER KNIFE IS OVER CAKE
            ----------------------------------------- */

            const cakeRect =
                cutCake.getBoundingClientRect();

            const knifeCenterX =
                event.clientX;

            const knifeCenterY =
                event.clientY;


            const insideCake =
                knifeCenterX >= cakeRect.left &&
                knifeCenterX <= cakeRect.right &&
                knifeCenterY >= cakeRect.top &&
                knifeCenterY <= cakeRect.bottom;


            if (
                insideCake &&
                knifeMoved
            ) {

                cutCake.classList.add(
                    "being-cut"
                );

            }

        }
    );


    cakeKnife.addEventListener(
        "pointerup",
        function(event) {

            if (!holdingKnife) {
                return;
            }

            event.preventDefault();

            holdingKnife = false;

            cakeKnife.classList.remove(
                "holding"
            );


            try {
                cakeKnife.releasePointerCapture(
                    event.pointerId
                );
            } catch (error) {}


            /* -----------------------------------------
               CHECK FINAL CUT
            ----------------------------------------- */

            const cakeRect =
                cutCake.getBoundingClientRect();

            const knifeRect =
                cakeKnife.getBoundingClientRect();


            const knifeCenterX =
                knifeRect.left +
                knifeRect.width / 2;

            const knifeCenterY =
                knifeRect.top +
                knifeRect.height / 2;


            const crossedCake =
                knifeCenterX >= cakeRect.left &&
                knifeCenterX <= cakeRect.right &&
                knifeCenterY >= cakeRect.top &&
                knifeCenterY <= cakeRect.bottom;


            if (
                crossedCake &&
                knifeMoved
            ) {

                completeCakeCut();

            } else {

                if (cutMessage) {

                    cutMessage.textContent =
                        "Hold the knife and drag it across the cake...";

                }

            }

        }
    );


    cakeKnife.addEventListener(
        "pointercancel",
        function() {

            holdingKnife = false;

            cakeKnife.classList.remove(
                "holding"
            );

        }
    );

}


/* =========================================================
   COMPLETE CAKE CUT
========================================================= */

function completeCakeCut() {

    if (cakeCut) {
        return;
    }

    cakeCut = true;


    cutCake.classList.remove(
        "being-cut"
    );

    cutCake.classList.add(
        "cake-cut-complete"
    );


    if (cutMessage) {

        cutMessage.textContent =
            "Cake cut! 🎂❤️";

    }


    if (cakeKnife) {

        cakeKnife.classList.add(
            "cut-complete"
        );

    }


    setTimeout(
        function() {

            showCakeStage(
                page3Final
            );

        },
        1400
    );

}


if (page3) {

    page3.style.display =
        "none";

}


let cakeJourneyStarted =
    false;

let candlesBlown =
    false;

let cakeCut =
    false;


/* =========================================================
   STAGE SWITCH
========================================================= */

function showCakeStage(stage) {

    [
        pullStage,
        candleStage,
        cutStage,
        page3Final
    ].forEach(
        function(item) {

            if (item) {

                item.classList.remove(
                    "active"
                );

            }

        }
    );


    if (stage) {

        stage.classList.add(
            "active"
        );

    }

}


/* =========================================================
   START CAKE JOURNEY
========================================================= */

function startCakeJourney() {

    if (cakeJourneyStarted) {
        return;
    }

    cakeJourneyStarted =
        true;

    showCakeStage(
        pullStage
    );

}
/* =========================================================
   PULL STRING — REAL PULL DOWN
========================================================= */

if (pullString && pullStage) {

    let pullingString = false;
    let pullStartY = 0;
    let pullDistance = 0;
    let pullCompleted = false;


    pullString.addEventListener(
        "pointerdown",
        function(event) {

            if (
                !pullStage.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            if (pullCompleted) {
                return;
            }


            event.preventDefault();
            event.stopPropagation();


            pullingString = true;

            pullStartY =
                event.clientY;

            pullDistance = 0;


            try {

                pullString.setPointerCapture(
                    event.pointerId
                );

            } catch (error) {

                // Pointer capture is optional.

            }


            pullString.style.transition =
                "none";

            pullString.style.cursor =
                "grabbing";

        }
    );


    pullString.addEventListener(
        "pointermove",
        function(event) {

            if (
                !pullingString ||
                pullCompleted
            ) {
                return;
            }


            event.preventDefault();


            pullDistance =
                Math.max(
                    0,
                    event.clientY -
                    pullStartY
                );


            const maxPull = 70;


            const visualPull =
                Math.min(
                    pullDistance,
                    maxPull
                );


            pullString.style.height =
                (148 + visualPull) +
                "px";


            pullString.style.transform =
                "translateX(-50%) translateY(" +
                visualPull +
                "px)";

        }
    );


    pullString.addEventListener(
        "pointerup",
        function(event) {

            if (!pullingString) {
                return;
            }


            event.preventDefault();


            pullingString = false;


            try {

                pullString.releasePointerCapture(
                    event.pointerId
                );

            } catch (error) {

                // Pointer capture may already
                // have been released.

            }


            pullString.style.cursor =
                "grab";


            pullString.style.transition =
                "height 0.25s ease, transform 0.2s ease";


            if (
                pullDistance >= 45
            ) {

                pullCompleted =
                    true;


                pullString.style.height =
                    "178px";


                pullString.style.transform =
                    "translateX(-50%) translateY(22px)";


                if (stringMachine) {

                    stringMachine.classList.add(
                        "pulled"
                    );

                }


                setTimeout(
                    function() {

                        showCakeStage(
                            candleStage
                        );

                    },
                    350
                );


            } else {

                pullString.style.height =
                    "148px";


                pullString.style.transform =
                    "translateX(-50%)";


            }

        }
    );


    pullString.addEventListener(
        "pointercancel",
        function() {

            if (!pullingString) {
                return;
            }


            pullingString = false;


            pullString.style.cursor =
                "grab";


            pullString.style.transition =
                "height 0.25s ease, transform 0.2s ease";


            pullString.style.height =
                "148px";


            pullString.style.transform =
                "translateX(-50%)";

        }
    );

}


/* =========================================================
   ALSO ALLOW CLICK ON STRING MACHINE
   ONLY AS FALLBACK
========================================================= */

if (stringMachine) {

    stringMachine.addEventListener(
        "click",
        function(event) {

            if (!pullStage) {
                return;
            }


            if (
                !pullStage.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            /*
             * Do not bypass the actual pull
             * when the user clicked directly
             * on the string.
             */

            if (
                event.target ===
                pullString
            ) {
                return;
            }


            /*
             * Keep the machine itself clickable
             * for accessibility/fallback.
             */

            if (
                !pullCompleted
            ) {

                pullCompleted =
                    true;


                if (stringMachine) {

                    stringMachine.classList.add(
                        "pulled"
                    );

                }


                setTimeout(
                    function() {

                        showCakeStage(
                            candleStage
                        );

                    },
                    350
                );

            }

        }
    );

}


/* =========================================================
   PAGE 3 FINAL → PAGE 4
========================================================= */

const wishesPage =
    document.getElementById(
        "page4Placeholder"
    );


if (continueToLetter) {

    continueToLetter.addEventListener(
        "click",
        function() {

            if (!wishesPage) {
                return;
            }

            page3.style.display =
                "none";

            wishesPage.classList.add(
                "show"
            );

        }
    );

}



/* =========================================================
   PAGE 4 — WISHES
========================================================= */

const wish1 =
    document.getElementById("wish1");

const wish2 =
    document.getElementById("wish2");

const wish3 =
    document.getElementById("wish3");

const continueWishButton =
    document.getElementById(
        "continueWishButton"
    );

const wishStatus =
    document.getElementById(
        "wishStatus"
    );


function checkWishes() {

    if (
        !wish1 ||
        !wish2 ||
        !wish3 ||
        !continueWishButton
    ) {
        return;
    }

    const first =
        wish1.value.trim();

    const second =
        wish2.value.trim();

    const third =
        wish3.value.trim();


    const complete =
        first.length > 0 &&
        second.length > 0 &&
        third.length > 0;


    continueWishButton.disabled =
        !complete;


    if (wishStatus) {

        if (complete) {

            wishStatus.textContent =
                "Three wishes are ready ❤️";

        } else {

            wishStatus.textContent =
                "Three little wishes, just for you...";

        }

    }

}


if (wish1) {
    wish1.addEventListener(
        "input",
        checkWishes
    );
}

if (wish2) {
    wish2.addEventListener(
        "input",
        checkWishes
    );
}

if (wish3) {
    wish3.addEventListener(
        "input",
        checkWishes
    );


}


/* =========================================================
   WISH CONTINUE
========================================================= */

if (continueWishButton) {

    continueWishButton.addEventListener(
        "click",
        function() {

            if (
                continueWishButton.disabled
            ) {
                return;
            }

            /*
             * The next page can be connected here.
             * The wishes remain inside the page
             * until the user explicitly continues.
             */

            wishesPage.classList.remove(
                "show"
            );

        }
    );

}
