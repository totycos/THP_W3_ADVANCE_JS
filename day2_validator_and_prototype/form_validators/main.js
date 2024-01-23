/////////////////////////////////////////////////////////
//////////////////// FORM CONSTANTS /////////////////////
/////////////////////////////////////////////////////////

const myForm = document.getElementById("myForm");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const age = document.getElementById("age");
const email = document.getElementById("email");
const emailCheck = document.getElementById("emailCheck");
const password = document.getElementById("password");
const passwordCheck = document.getElementById("passwordCheck");
const cgu = document.getElementById("cgu");


/////////////////////////////////////////////////////////
///////////// VALIDATOR EVENT LISTENERS /////////////////
/////////////////////////////////////////////////////////

// Form submit listener
myForm.addEventListener("submit", checkForm);

// First name listener
fname.addEventListener('input', () => {
    const isValidFname = fname.value.length >= 3;
    if (isValidFname) {
        document.getElementById('fnameError').innerHTML = "";
    } else {
        document.getElementById('fnameError').innerHTML = "Veuillez fournir un prénom : minimum 3 caractères";
    }
})

// Last name listerner
lname.addEventListener('input', () => {
    const isValidLname = lname.value.length > 0;
    if (isValidLname) {
        document.getElementById('lnameError').innerHTML = "";
    } else {
        document.getElementById('lnameError').innerHTML = "Veuillez fournir un nom";
    }
})

// Age listerner
age.addEventListener('input', () => {
    if (age.value >= 18) {
        document.getElementById('ageError').innerHTML = "";
    } else if (age.value.length === 0) {
        document.getElementById('ageError').innerHTML = "Vous devez rentrer votre age";
    } else {
        document.getElementById('ageError').innerHTML = "Vous devez être majeur";
    }
})

// Email listener
email.addEventListener('input', () => {
    const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const isValidEmail = email.value.length >= 8 && email.value.length < 30 && emailRegExp.test(email.value);
    if (email.value.length === 0) {
        document.getElementById('emailError').innerHTML = "Veuillez fournir un email";
    }
    else if (isValidEmail) {
        document.getElementById('emailError').innerHTML = "";
    }
    else {
        document.getElementById('emailError').innerHTML = "Votre email n'est pas valide";
    }
})

// Email check listener
emailCheck.addEventListener('input', () => {
    if (emailCheck.value.length === 0) {
        document.getElementById('emailCheckError').innerHTML = "Veuillez fournir un email";
    }
    else if (emailCheck.value !== email.value) {
        document.getElementById('emailCheckError').innerHTML = "La confirmation doit correspondre à l'email rentré précédement";
    }
    else {
        document.getElementById('emailCheckError').innerHTML = "";
    }
})

// Password listener
password.addEventListener('input', () => {
    const isValidPassword = password.value.length >= 6;
    if (isValidPassword) {
        document.getElementById('passwordError').innerHTML = "";
    }
    else {
        document.getElementById('passwordError').innerHTML = "Veuillez choisir un mot de passe : minimum 6 caractères";
    }
})

// Password check listener
passwordCheck.addEventListener('input', () => {
    if (passwordCheck.value.length === 0) {
        document.getElementById('passwordCheckError').innerHTML = "Veuillez confirmer votre mot de passe";
    }
    else if (passwordCheck.value !== password.value) {
        document.getElementById('passwordCheckError').innerHTML = "La confirmation doit correspondre au mot de passe rentré précédement";
    }
    else {
        document.getElementById('passwordCheckError').innerHTML = "";
    }
})

// Checkbox listener
cgu.addEventListener('change', () => {
    if (cgu.checked) {
        document.getElementById('cguError').innerHTML = "";
    } else {
        document.getElementById('cguError').innerHTML = "Vous devez accepter les termes et conditions";
    }
});


/////////////////////////////////////////////////////////
//////////////////////// SUBMIT /////////////////////////
/////////////////////////////////////////////////////////

// Actions on Submit
function checkForm(event) {
    const isValidFname = fname.value.length > 0;
    const isValidLname = lname.value.length > 0;
    const isValidAge = age.value >= 18
    const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const isValidEmail = email.value.length >= 8 && email.value.length < 30 && emailRegExp.test(email.value);
    const isValidEmailCheck = emailCheck.value === email.value
    const isValidPassword = password.value.length >= 6
    const isValidPasswordCheck = passwordCheck.value === password.value
    const isValidCgu = cgu.checked

    event.preventDefault();

    if (isValidFname && isValidLname && isValidAge && isValidEmail && isValidEmailCheck && isValidPassword && isValidPasswordCheck && isValidCgu) {
        window.location.href = "success.html";
    }
    else {
        alert("Remplissez tous les champs correctement !")
    }
}



