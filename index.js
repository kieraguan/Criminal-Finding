function toSignInForm(btn) {
    document.getElementById('citizenSignIn').style.display = 'block';
    document.getElementById('citizenSignUp').style.display = 'none';
    document.getElementById('signUpBtn').style.backgroundColor = "#ffffff";
    document.getElementById('signUpBtn').style.color = '#be5ede';
    btn.style.backgroundColor = "";
    btn.style.color = '#ffffff';
}

function toSignUpForm(btn) {
    document.getElementById('citizenSignIn').style.display = 'none';
    document.getElementById('citizenSignUp').style.display = 'block';
    document.getElementById('signInBtn').style.backgroundColor = '#ffffff';
    document.getElementById('signInBtn').style.color = '#3224b0';
    btn.style.backgroundColor = "";
    btn.style.color = '#ffffff';
}

function showCitizenForm() {
    var form = document.getElementById('citizenForm');
    document.getElementById('officialForm').style.display = 'none';
    if (form.style.display === 'none') {
        form.style.display = 'block';
        toSignInForm(document.getElementById('signInBtn'));
    } else
        form.style.display = 'none';
}

function showOfficialForm() {
    var form = document.getElementById('officialForm');
    document.getElementById('citizenForm').style.display = 'none';
    if (form.style.display === 'none') {
        form.style.display = 'block';
    } else
        form.style.display = 'none';
}