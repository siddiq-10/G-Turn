/* =========================================================
   SUPABASE CONFIGURATION
========================================================= */

/*
    IMPORTANT:

    Replace these two values with the values
    from your Supabase project.
*/

const SUPABASE_URL =
    "YOUR_SUPABASE_PROJECT_URL";

const SUPABASE_KEY =
    "YOUR_SUPABASE_PUBLISHABLE_KEY";


const { createClient } = window.supabase;

const supabaseClient =
    createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );



/* =========================================================
   ELEMENTS
========================================================= */

const loginTab =
    document.getElementById("loginTab");

const signupTab =
    document.getElementById("signupTab");

const loginForm =
    document.getElementById("loginForm");

const signupForm =
    document.getElementById("signupForm");

const formTitle =
    document.getElementById("formTitle");

const formSubtitle =
    document.getElementById("formSubtitle");

const authFooter =
    document.getElementById("authFooter");

const authTabs =
    document.querySelector(".auth-tabs");

const notification =
    document.getElementById("notification");

const notificationText =
    document.getElementById("notificationText");



/* =========================================================
   LOGIN / SIGNUP SWITCHING
========================================================= */

function showLogin() {

    loginTab.classList.add("active");

    signupTab.classList.remove("active");

    loginForm.classList.add("active-form");

    signupForm.classList.remove("active-form");

    authTabs.classList.remove("signup-active");


    formTitle.textContent =
        "Welcome Back";


    formSubtitle.textContent =
        "Login to continue your sports journey.";


    authFooter.innerHTML = `
        New to PlaySphere?

        <button
            type="button"
            id="footerSwitch">

            Create an account

        </button>
    `;


    document
        .getElementById("footerSwitch")
        .addEventListener(
            "click",
            showSignup
        );
}



function showSignup() {

    signupTab.classList.add("active");

    loginTab.classList.remove("active");

    signupForm.classList.add("active-form");

    loginForm.classList.remove("active-form");

    authTabs.classList.add("signup-active");


    formTitle.textContent =
        "Join the Team";


    formSubtitle.textContent =
        "Create your account and enter the arena.";


    authFooter.innerHTML = `
        Already part of the community?

        <button
            type="button"
            id="footerSwitch">

            Login here

        </button>
    `;


    document
        .getElementById("footerSwitch")
        .addEventListener(
            "click",
            showLogin
        );
}


loginTab.addEventListener(
    "click",
    showLogin
);


signupTab.addEventListener(
    "click",
    showSignup
);



/* =========================================================
   PASSWORD VISIBILITY
========================================================= */

document
    .querySelectorAll(".password-toggle")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    document.getElementById(
                        button.dataset.target
                    );


                if (
                    target.type === "password"
                ) {

                    target.type = "text";

                    button.textContent = "🙈";

                } else {

                    target.type = "password";

                    button.textContent = "👁";

                }

            }
        );

    });



/* =========================================================
   SIGN UP
========================================================= */

signupForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const firstName =
            document
                .getElementById("firstName")
                .value
                .trim();


        const lastName =
            document
                .getElementById("lastName")
                .value
                .trim();


        const email =
            document
                .getElementById("signupEmail")
                .value
                .trim();


        const sport =
            document
                .getElementById("sport")
                .value;


        const password =
            document
                .getElementById("signupPassword")
                .value;



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



        if (
            !isValidEmail(email)
        ) {

            showNotification(
                "Please enter a valid email."
            );

            return;
        }



        if (
            password.length < 6
        ) {

            showNotification(
                "Password must contain at least 6 characters."
            );

            return;
        }



        /*
            Disable button while request
            is being processed.
        */

        const button =
            signupForm.querySelector(
                ".submit-btn"
            );


        button.disabled = true;

        button.innerHTML =
            "<span>CREATING ACCOUNT...</span>";



        try {

            /*
                Create Supabase account
            */

            const {
                data,
                error
            } =
                await supabaseClient.auth.signUp({

                    email: email,

                    password: password,

                    options: {

                        data: {

                            first_name:
                                firstName,

                            last_name:
                                lastName,

                            favourite_sport:
                                sport

                        }

                    }

                });



            if (error) {

                throw error;

            }



            /*
                If email confirmation is enabled,
                Supabase will normally return a user
                without an active session.
            */

            if (
                data.user &&
                !data.session
            ) {

                showNotification(
                    "Account created! Check your email to verify your account."
                );

            } else {

                /*
                    If email confirmation is disabled,
                    user can be logged in immediately.
                */

                showNotification(
                    "Account created successfully!"
                );


                setTimeout(
                    () => {

                        window.location.href =
                            "dashboard.html";

                    },
                    1500
                );

            }


            signupForm.reset();


        } catch (error) {

            console.error(error);


            showNotification(
                getFriendlyError(
                    error.message
                )
            );


        } finally {

            button.disabled = false;

            button.innerHTML = `
                <span>
                    JOIN THE COMMUNITY
                </span>

                <span class="arrow">
                    →
                </span>
            `;

        }

    }
);



/* =========================================================
   LOGIN
========================================================= */

loginForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const email =
            document
                .getElementById("loginEmail")
                .value
                .trim();


        const password =
            document
                .getElementById("loginPassword")
                .value;



        if (!email || !password) {

            showNotification(
                "Please enter your email and password."
            );

            return;
        }



        if (
            !isValidEmail(email)
        ) {

            showNotification(
                "Please enter a valid email."
            );

            return;
        }



        const button =
            loginForm.querySelector(
                ".submit-btn"
            );


        button.disabled = true;

        button.innerHTML =
            "<span>ENTERING...</span>";



        try {

            /*
                Supabase login
            */

            const {
                data,
                error
            } =
                await supabaseClient.auth
                    .signInWithPassword({

                        email: email,

                        password: password

                    });



            if (error) {

                throw error;

            }



            showNotification(
                "Login successful! Welcome back."
            );



            /*
                Send user to dashboard
            */

            setTimeout(
                () => {

                    window.location.href =
                        "dashboard.html";

                },
                1000
            );


        } catch (error) {

            console.error(error);


            showNotification(
                getFriendlyError(
                    error.message
                )
            );


        } finally {

            button.disabled = false;

            button.innerHTML = `
                <span>
                    ENTER THE ARENA
                </span>

                <span class="arrow">
                    →
                </span>
            `;

        }

    }
);



/* =========================================================
   PASSWORD RESET
========================================================= */

document
    .querySelector(".forgot")
    .addEventListener(
        "click",
        async function(event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim();


            if (!email) {

                showNotification(
                    "Enter your email first."
                );

                return;
            }


            if (
                !isValidEmail(email)
            ) {

                showNotification(
                    "Enter a valid email address."
                );

                return;
            }



            try {

                const {
                    error
                } =
                    await supabaseClient.auth
                        .resetPasswordForEmail(
                            email,
                            {
                                redirectTo:
                                    window.location.origin +
                                    "/reset-password.html"
                            }
                        );


                if (error) {

                    throw error;

                }


                showNotification(
                    "If an account exists, a password reset email has been sent."
                );


            } catch (error) {

                console.error(error);


                showNotification(
                    "Unable to send reset email."
                );

            }

        }
    );



/* =========================================================
   SOCIAL LOGIN
========================================================= */

document
    .querySelectorAll(".social-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            async function() {

                const provider =
                    this.innerText
                        .toLowerCase()
                        .includes("google")
                        ? "google"
                        : "facebook";


                try {

                    const {
                        error
                    } =
                        await supabaseClient.auth
                            .signInWithOAuth({

                                provider: provider,

                                options: {

                                    redirectTo:
                                        window.location.origin +
                                        "/dashboard.html"

                                }

                            });


                    if (error) {

                        throw error;

                    }

                } catch (error) {

                    console.error(error);


                    showNotification(
                        "Social login is not configured yet."
                    );

                }

            }
        );

    });



/* =========================================================
   AUTH STATE
========================================================= */

supabaseClient.auth
    .onAuthStateChange(
        (event, session) => {

            console.log(
                "Auth event:",
                event
            );


            if (session) {

                console.log(
                    "Logged in user:",
                    session.user.email
                );

            }

        }
    );



/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}



/* =========================================================
   FRIENDLY ERROR MESSAGES
========================================================= */

function getFriendlyError(message) {

    const lower =
        message.toLowerCase();


    if (
        lower.includes("invalid login")
    ) {

        return "Incorrect email or password.";

    }


    if (
        lower.includes("already registered")
    ) {

        return "This email is already registered.";

    }


    if (
        lower.includes("password")
    ) {

        return message;

    }


    if (
        lower.includes("email")
    ) {

        return message;

    }


    return message ||
        "Something went wrong. Please try again.";

}



/* =========================================================
   NOTIFICATION
========================================================= */

let notificationTimer;


function showNotification(message) {

    notificationText.textContent =
        message;


    notification.classList.add(
        "show"
    );


    clearTimeout(
        notificationTimer
    );


    notificationTimer =
        setTimeout(
            () => {

                notification.classList.remove(
                    "show"
                );

            },
            4500
        );

}



/* =========================================================
   INITIALIZE
========================================================= */

showLogin();