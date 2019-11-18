const firstName = document.getElementById('first_name');
const lastName = document.getElementById('last_name');
const email = document.getElementById('email_input');
const userName = document.getElementById('username_input');
const passwd = document.getElementById('passwd_input');
const confirmPasswd = document.getElementById('confirm_passwd');
const signup_btn = document.getElementById('signup_button');

const auth = firebase.auth();
const database = firebase.database();

signup_btn.addEventListener('click', function(e) {
    e.preventDefault();
    if(firstName.value == '' || lastName.value == ''|| email.value == ''|| userName.value == ''|| passwd.value == ''|| confirmPasswd.value == '') {
        document.getElementById('warn_message').textContent = 'Please fill all!!!';
    } else {
        auth.createUserWithEmailAndPassword(email.value, passwd.value).then(cred => {
            console.log(cred.user);
            database.ref(cred.user.uid).set({
                firstname: firstName.value,
                lastname: lastName.value,
                username: userName.value,
                email: email.value,
            });
            window.location.assign('login.html');
            alert('Signing up succeed! Log in to enjoy');
        }).catch(function(error) {
            let codeErr = error.code;
            let messageErr = error.message;
            if(messageErr) {
                document.getElementById('warn_message').textContent = messageErr;
            } else {
                document.getElementById('warn_message').textContent = codeErr;
            }
          });
    }
    
});