"use strict";

// DARK MODE TOGGLE
const darkModeBtn = document.getElementById('dark-icon');

darkModeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        darkModeBtn.src = "images/lightmode.png";
        darkModeBtn.alt = "light mode toggle";
    } else {
        darkModeBtn.src = "images/darkmode.png";
        darkModeBtn.alt = "dark mode toggle";
    }
});

// SCROLL TO TOP BUTTON
const topBtn = document.getElementById('top-icon');

topBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// PRODUCT SWAPPER
const classicBtn = document.getElementById('classicBtn');
const zeroBtn = document.getElementById('zeroBtn');
const cherryBtn = document.getElementById('cherryBtn');

const classicProduct = document.getElementById('classicProduct');
const zeroProduct = document.getElementById('zeroProduct');
const cherryProduct = document.getElementById('cherryProduct');

function showProduct(productToShow) {
    classicProduct.classList.add('hide');
    zeroProduct.classList.add('hide');
    cherryProduct.classList.add('hide');
    productToShow.classList.remove('hide');
}

classicBtn.addEventListener('click', function() {
    showProduct(classicProduct);
});

zeroBtn.addEventListener('click', function() {
    showProduct(zeroProduct);
});

cherryBtn.addEventListener('click', function() {
    showProduct(cherryProduct);
});

// PLAY AND WIN GUESSING GAME
const gameForm = document.getElementById('gameForm');
const userGuess = document.getElementById('userGuess');
const gameResult = document.getElementById('gameResult');

gameForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const userNumber = parseInt(userGuess.value);

    if (isNaN(userNumber) || userNumber < 1 || userNumber > 10) {
        gameResult.textContent = "❌ Please enter a number between 1 and 10.";
    } else if (userNumber === randomNumber) {
        gameResult.textContent = `🎉 Congratulations! You guessed ${userNumber} and the winning number was ${randomNumber}. You win!`;
    } else {
        gameResult.textContent = `😔 Sorry, you guessed ${userNumber} but the winning number was ${randomNumber}. Try again!`;
    }

    userGuess.value = "";
});

// CONTACT FORM VALIDATION + MODAL POPUP
const contactForm = document.getElementById('contactCocaCola');
const fName = document.getElementById('fName');
const number = document.getElementById('number');
const email = document.getElementById('email');
const message = document.getElementById('message');
const prefPhone = document.getElementById('prefPhone');
const prefEmail = document.getElementById('prefEmail');

const fNameError = document.getElementById('fNameError');
const telError = document.getElementById('telError');
const emailError = document.getElementById('emailError');
const commentError = document.getElementById('commentError');

const telReq = document.getElementById('telReq');
const emailReq = document.getElementById('emailReq');

const thanksModal = document.getElementById('thanksModal');
const closeModal = document.getElementById('modalCloseBtn');
const modalName = document.getElementById('modalName');
const modalContact = document.getElementById('modalContact');
const modalEmail = document.getElementById('modalEmail');
const modalPhone = document.getElementById('modalPhone');
const modalComments = document.getElementById('modalComments');

// Function to move the required * mark dynamically
function updateRequiredMark() {
    if (prefPhone.checked) {
        telReq.textContent = "*";
        emailReq.textContent = "";
    } else if (prefEmail.checked) {
        telReq.textContent = "";
        emailReq.textContent = "*";
    }
}

// Update required * when user changes preference
prefPhone.addEventListener('change', updateRequiredMark);
prefEmail.addEventListener('change', updateRequiredMark);

// Update once when page loads
updateRequiredMark();

// Validate and show modal
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let valid = true;

    // Full Name Validation
    if (fName.value.trim() === "") {
        fNameError.classList.remove('hide');
        fName.style.border = "2px solid red";
        valid = false;
    } else {
        fNameError.classList.add('hide');
        fName.style.border = "1px solid #ccc";
    }

    // Preferred Method Validation
    if (prefPhone.checked) {
        const phoneValue = number.value.trim();
        if (phoneValue === "") {
            telError.textContent = "Phone number is required";
            telError.classList.remove('hide');
            number.style.border = "2px solid red";
            valid = false;
        } else if (!/^\d{10}$/.test(phoneValue)) {
            // Not exactly 10 digits
            telError.textContent = "Phone number must be exactly 10 digits";
            telError.classList.remove('hide');
            number.style.border = "2px solid red";
            valid = false;
        } else {
            telError.classList.add('hide');
            number.style.border = "1px solid #ccc";
        }
        emailError.classList.add('hide');
        email.style.border = "1px solid #ccc";
    } else if (prefEmail.checked) {
        if (email.value.trim() === "") {
            emailError.classList.remove('hide');
            email.style.border = "2px solid red";
            valid = false;
        } else {
            emailError.classList.add('hide');
            email.style.border = "1px solid #ccc";
        }
        telError.classList.add('hide');
        number.style.border = "1px solid #ccc";
    }

    // Message Validation
    if (message.value.trim() === "") {
        commentError.classList.remove('hide');
        message.style.border = "2px solid red";
        valid = false;
    } else {
        commentError.classList.add('hide');
        message.style.border = "1px solid #ccc";
    }

    // If valid, show modal
    if (valid) {
        modalName.textContent = fName.value.trim();
        modalContact.textContent = prefPhone.checked ? "Phone" : "Email";
        modalEmail.textContent = email.value.trim();
        modalPhone.textContent = number.value.trim();  
        modalComments.textContent = message.value.trim();

        thanksModal.style.display = "flex";
        thanksModal.classList.remove('hide');
        thanksModal.classList.add('show-modal');
    }
});


// Close modal
if (closeModal) {
    closeModal.addEventListener('click', function() {
        thanksModal.style.display = "none";
        thanksModal.classList.remove('show-modal');
        thanksModal.classList.add('hide');
    });
// Close modal when clicking outside of it
window.addEventListener('click', function(e) {
    if (e.target === thanksModal) {
        thanksModal.style.display = "none";
        thanksModal.classList.remove('show-modal');
        thanksModal.classList.add('hide');
    }
});
}
