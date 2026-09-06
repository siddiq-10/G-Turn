/* =========================================================
   ELEMENTS
========================================================= */

const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");

const authFooter = document.getElementById("authFooter");
const footerSwitch = document.getElementById("footerSwitch");

const authTabs = document.querySelector(".auth-tabs");

const notification = document.getElementById("notification");
const notificationText = document.getElementById("notificationText");


/* =========================================================
   SWITCH BETWEEN LOGIN & SIGNUP
========================================================= */

function showLogin() {

    loginTab.classList.add("active");
    signupTab.classList.remove("active");

    loginForm.classList.add("active-form");
    signupForm.classList.remove("active-form");

    authTabs.classList.remove("signup-active");

    formTitle.textContent = "Welcome Back";

    formSubtitle.textContent =
        "Login to continue your sports journey.";

    authFooter.innerHTML =
        `New to PlaySphere?
        <button type="button" id="footerSwitch">
            Create an account
        </button>`;

    document
        .getElementById("footerSwitch")
        .addEventListener("click", showSignup);
}


function showSignup() {

    signupTab.classList.add("active");
    loginTab.classList.remove("active");

    signupForm.classList.add("active-form");
    loginForm.classList.remove("active-form");

    authTabs.classList.add("signup-active");

    formTitle.textContent = "Join the Team";

    formSubtitle.textContent =
        "Create your account and enter the arena.";

    authFooter.innerHTML =
        `Already part of the community?
        <button type="button" id="footerSwitch">
            Login here
        </button>`;

    document
        .getElementById("footerSwitch")
        .addEventListener("click", showLogin);
}


/* Tab clicks */

loginTab.addEventListener("click", showLogin);

signupTab.addEventListener("click", showSignup);


/* =========================================================
   PASSWORD SHOW / HIDE
========================================================= */

const passwordButtons =
    document.querySelectorAll(".password-toggle");


passwordButtons.forEach(button => {

    button.addEventListener("click", () => {

        const targetId =
            button.getAttribute("data-target");

        const passwordInput =
            document.getElementById(targetId);


        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            button.textContent = "🙈";

        } else {

            passwordInput.type = "password";

            button.textContent = "👁";

        }

    });

});


/* =========================================================
   LOGIN FORM
========================================================= */

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    if (!email || !password) {

        showNotification(
            "Please fill in all fields."
        );

        return;
    }


    if (!isValidEmail(email)) {

        showNotification(
            "Please enter a valid email address."
        );

        return;
    }


    /*
        FRONTEND DEMO ONLY

        Replace this section with your backend
        authentication API later.
    */

    showNotification(
        "Login successful! Welcome back."
    );

});


/* =========================================================
   SIGNUP FORM
========================================================= */

signupForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const firstName =
        document.getElementById("firstName").value.trim();

    const lastName =
        document.getElementById("lastName").value.trim();

    const email =
        document.getElementById("signupEmail").value.trim();

    const sport =
        document.getElementById("sport").value;

    const password =
        document.getElementById("signupPassword").value;


    if (
        !firstName ||
        !lastName ||
        !email ||
        !sport ||
        !password
    ) {

        showNotification(
            "Please complete all fields."
        );

        return;
    }


    if (!isValidEmail(email)) {

        showNotification(
            "Please enter a valid email address."
        );

        return;
    }


    if (password.length < 6) {

        showNotification(
            "Password must contain at least 6 characters."
        );

        return;
    }


    showNotification(
        `Welcome to PlaySphere, ${firstName}!`
    );


    /*
        FRONTEND DEMO ONLY

        Later you can send the form data
        to your backend/database here.
    */

});


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);
}


/* =========================================================
   NOTIFICATION
========================================================= */

let notificationTimer;


function showNotification(message) {

    notificationText.textContent = message;

    notification.classList.add("show");


    clearTimeout(notificationTimer);


    notificationTimer =
        setTimeout(() => {

            notification.classList.remove("show");

        }, 3500);

}


/* =========================================================
   SOCIAL BUTTONS
========================================================= */

const socialButtons =
    document.querySelectorAll(".social-btn");


socialButtons.forEach(button => {

    button.addEventListener("click", () => {

        showNotification(
            "Social login will be connected to your backend."
        );

    });

});


/* =========================================================
   FORGOT PASSWORD
========================================================= */

document
    .querySelector(".forgot")
    .addEventListener("click", function(event) {

        event.preventDefault();

        showNotification(
            "Password reset feature coming soon."
        );

    });


/* =========================================================
   INITIAL STATE
========================================================= */

showLogin();