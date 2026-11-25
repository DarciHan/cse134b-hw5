const contactStation = document.querySelector("form");

const nameBox = document.querySelector("#name");
const emailBox = document.querySelector("#email");
const messageBox = document.querySelector("#comments");

const oopsBoard = document.querySelector("#form-errors");
const infoBoard = document.querySelector("#form-info");

const form_errors = [];



function checkField(box) {
    box.setCustomValidity("");

    if (box.validity.valueMissing) {
        box.setCustomValidity("Please fill out this field.");
    } else if (box.validity.typeMismatch) {
        box.setCustomValidity("Please enter a valid email address.");
    } else if (box.validity.tooShort) {
        box.setCustomValidity(
            "Please enter at least " + box.minLength + " characters."
        );
    }

    return box.validationMessage;
}

const allBoxes = [nameBox, emailBox, messageBox];

function showOops(box) {
    const oopsMessage = checkField(box);
    const messageSpot = document.querySelector("#" + box.id + "-error");

    messageSpot.textContent = oopsMessage;
    messageSpot.hidden = !oopsMessage;

    box.setAttribute("aria-invalid", oopsMessage ? "true" : "false");

    const allOops = allBoxes
        .filter(field => field.validationMessage !== "")
        .map(field => field.id + ": " + field.validationMessage);

    oopsBoard.textContent = allOops.join(" ");
    oopsBoard.hidden = allOops.length === 0;
}

allBoxes.forEach(function(box) {
    let wasEdited = false;

    box.addEventListener("input", function() {
        wasEdited = true;

        if (box.getAttribute("aria-invalid") === "true") {
            showOops(box);
        }
    });

    box.addEventListener("blur", function() {
        if (wasEdited) {
            showOops(box);
        }
    });
});

// Comments Limit and Warnings

const messageLimit = messageBox.maxLength;
const dangerZone = 100;

function countLetters() {
    const lettersLeft = messageLimit - messageBox.value.length;

    if (lettersLeft === 0) {
        infoBoard.textContent = "You have reached the character limit!";
    } else if (lettersLeft <= dangerZone) {
        infoBoard.textContent = "Almost full! " + lettersLeft + " characters left.";
    } else {
        infoBoard.textContent = lettersLeft + " characters remaining.";
    }

    infoBoard.classList.toggle("near-limit", lettersLeft <= dangerZone);
}

infoBoard.hidden = false;

messageBox.addEventListener("input", countLetters);

countLetters();


// Error History

function saveOopsHistory() {
    allBoxes.forEach(function(box) {
        if (!box.validity.valid) {
            checkField(box);

            form_errors.push({
                field: box.id,
                message: box.validationMessage
            });
        }
    });
}

contactStation.addEventListener("invalid", function(event) {
    if (event.target === contactStation.querySelector(":invalid")) {
        saveOopsHistory();
    }
}, true);

contactStation.addEventListener("submit", function() {
    const historyBox = document.querySelector("#form-history");
    historyBox.value = JSON.stringify(form_errors);
});
// let oopsRecorded = false;
// contactStation.addEventListener("invalid", function(event) {
//     if (!oopsRecorded) {
//         saveOopsHistory();
//         oopsRecorded = true;
//     }
// }, true);

// allBoxes.forEach(function(box) {
//     box.addEventListener("input", function() {
//         oopsRecorded = false;
//     });
// });

