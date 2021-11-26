//Sign IN PAGE:
let usernameInput = document.getElementById("usernameInput"),
    emailInput = document.getElementById("emailInput"),
    passwordInput = document.getElementById("passwordInput"),
    usernamesigninInput = document.getElementById("usernamesigninInput"),
    passwordsigninInput = document.getElementById("passwordsigninInput"),
    inputs = document.getElementsByClassName("form-control"),
    emailInputAlert = document.getElementById("emailInputAlert"),
    usernameInputAlert = document.getElementById("usernameInputAlert"),
    passwordInputAlert = document.getElementById("passwordInputAlert"),
    signinBtn = document.getElementById("signinBtn"),
    sigUpBtn = document.getElementById("sigUpBtn"),
    goTosigninBtn = document.getElementById("goTosigninBtn"),
    signupBtn = document.getElementById("signupBtn"),
    logOutBtn = document.getElementById("logOutBtn"),
    modalForm = document.getElementById("modalForm"),
    container = document.getElementsByClassName("container"),
    msgAlert = document.getElementById("msgAlert"),
    signinName = "",
    responseMsg = 0,
    usersArray = [];


//Store ResponseMsg Counter into localStorage:
if (!localStorage.getItem("Counter")) {
    localStorage.setItem("Counter", responseMsg);
} else {
    responseMsg = localStorage.getItem("Counter");
}

//Store sign in Input name into localStorage:
if (!localStorage.getItem("signinName")) {
    localStorage.setItem("signinName", signinName);
} else {
    signinName = localStorage.getItem("signinName");
}


//Pages code:
for (let i = 0; i < container.length; i++) {

    ///// Sign In PAGE CODE /////
    if (container[i].classList.contains("signinPage")) {

        //Sign In Check Name & Password:
        function userExist() {
            let userCheck = 0;
            usersArray = JSON.parse(localStorage.getItem("UsersList"));
            for (let i = 0; i < usersArray.length; i++) {
                let storedUser = usersArray[i];
                if (usernamesigninInput.value == storedUser.email && passwordsigninInput.value == storedUser.password) {
                    signinName = usersArray[i].name;
                    localStorage.setItem("signinName", signinName);
                    userCheck = 1;
                    break;
                }
            }
            return userCheck;
        };

        //signin Function:
        function signin() {
            if (usernamesigninInput.value == "" || passwordsigninInput.value == "") {
                msgAlert.classList.remove("d-none");
                msgAlert.classList.add("d-block");
                msgAlert.innerHTML = "All info are required";
            } else if (!localStorage.getItem("UsersList")) {
                msgAlert.classList.remove("d-none");
                msgAlert.classList.add("d-block");
                msgAlert.innerHTML = "Not Registered!";
            } else {
                if (userExist()) {
                    responseMsg = 1;
                    localStorage.setItem("Counter", responseMsg);

                    signinBtn.setAttribute("href", "home-page.html");
                } else {
                    msgAlert.classList.remove("d-none");
                    msgAlert.classList.add("d-block");
                    msgAlert.innerHTML = "invalid username or password<br>Please try again!";
                }
            }

        };


        //signin Button Onclick:
        signinBtn.addEventListener("click", signin);

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        ///// SIGN UP PAGE CODE /////
    } else if (container[i].classList.contains("signUpPage")) {

        //Validate Sign up Email Address:
        function validateEmail() {
            var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,}$/;

            if (regex.test(emailInput.value) == true) {
                emailInput.classList.add("is-valid");
                emailInput.classList.remove("is-invalid");

                emailInputAlert.classList.add("d-none");
                emailInputAlert.classList.remove("d-block");

                signupBtn.disabled = false;

                return true;

            } else {
                emailInput.classList.add("is-invalid");
                emailInput.classList.remove("is-valid");

                emailInputAlert.classList.add("d-block");
                emailInputAlert.classList.remove("d-none");

                signupBtn.disabled = true;

                return false;
            };
        };

        emailInput.addEventListener("keyup", validateEmail);

        //Validate Sign up Username:
        function validateUsername() {
            var regex = /^[A-Z][a-z A-z 0-9]{2,}$/;

            if (regex.test(usernameInput.value) == true) {
                usernameInput.classList.add("is-valid");
                usernameInput.classList.remove("is-invalid");

                usernameInputAlert.classList.add("d-none");
                usernameInputAlert.classList.remove("d-block");

                signupBtn.disabled = false;

                return true;

            } else {
                usernameInput.classList.add("is-invalid");
                usernameInput.classList.remove("is-valid");

                usernameInputAlert.classList.add("d-block");
                usernameInputAlert.classList.remove("d-none");

                signupBtn.disabled = true;

                return false;
            };
        };

        usernameInput.addEventListener("keyup", validateUsername);

        //Validate Sign up Password:
        function validatePassword() {
            var regex = /^[A-Za-z0-9]{5,}$/;

            if (regex.test(passwordInput.value) == true) {
                passwordInput.classList.add("is-valid");
                passwordInput.classList.remove("is-invalid");

                passwordInputAlert.classList.add("d-none");
                passwordInputAlert.classList.remove("d-block");

                signupBtn.disabled = false;

                return true;

            } else {
                passwordInput.classList.add("is-invalid");
                passwordInput.classList.remove("is-valid");

                passwordInputAlert.classList.add("d-block");
                passwordInputAlert.classList.remove("d-none");

                signupBtn.disabled = true;

                return false;
            };
        };

        passwordInput.addEventListener("keyup", validatePassword);


        //Add New User to local storage:
        function addUser() {

            if (validateEmail() == true && validateUsername() == true && validatePassword() == true) {
                let newUser = {

                    email: emailInput.value,
                    name: usernameInput.value,
                    password: passwordInput.value
                }

                if (!localStorage.getItem("UsersList")) {
                    usersArray.push(newUser);
                    localStorage.setItem("UsersList", JSON.stringify(usersArray));
                    modalForm.innerHTML = `
                                    <div class="badge">Done</div>
                                    <p class="done-msg">Congratulations
                                    <br>Your account has been created successfully
                                    <br>
                                    You can log in to your account now
                                    </p>
                                    <div>
                                    <a id="goTosigninBtn" type="button" class="btn" href="signin.html">Go to signin page</a>
                                    </div>
                                    `;

                } else {
                    usersArray = JSON.parse(localStorage.getItem("UsersList"));

                    let checkEmailExist = user => user.email === emailInput.value;

                    if (usersArray.some(checkEmailExist)) {


                        msgAlert.classList.remove("d-none");
                        msgAlert.classList.add("d-block");
                        msgAlert.innerHTML = "This Email already exists, Please try again!";

                    } else {

                        usersArray.push(newUser);
                        localStorage.setItem("UsersList", JSON.stringify(usersArray));
                        modalForm.innerHTML = `
                                    <div class="badge">Done</div>
                                    <p class="done-msg">Congratulations
                                    <br>Your account has been created successfully
                                    <br>
                                    You can log in to your account now
                                    </p>
                                    <div>
                                    <a id="goTosigninBtn" type="button" class="btn" href="signin.html">Go to signin page</a>
                                    </div>
                                    `;

                    }
                };
            }
        };

        //Check If Sign Up form Inputs are Empty:
        function checksignup() {
            if (usernameInput.value == "" || emailInput.value == "" || passwordInput.value == "") {

                signupBtn.removeAttribute("href");
                msgAlert.classList.remove("d-none");
                msgAlert.classList.add("d-block");
                msgAlert.innerHTML = "All info are required";

            } else {
                addUser();
            }
        };

        //Sign Up Confirm Button Onclick:
        signupBtn.addEventListener("click", checksignup);

    }
}