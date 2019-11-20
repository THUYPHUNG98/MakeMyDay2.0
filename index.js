const email = document.getElementById('email_input');
const password =  document.getElementById('passwd_input');
const login_btn =  document.getElementById('login_button');
login_btn.addEventListener('click', function(e) {
    e.preventDefault();
    if(email.value == ''||password.value == '') {
        document.getElementById('warn_message').textContent = 'Please fill in form!!!';
    } else {
        firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(signin => {
            console.log(signin.user);
            console.log('signing in succeed');
            window.location.assign('main.html');
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if(errorCode == 'auth/user-not-found') {
                console.log('code');
                document.getElementById('warn_message').textContent = 'Email is wrong or user is invalid';
            } else if(errorCode == 'auth/wrong-password') {
                document.getElementById('warn_message').textContent = 'Password is wrong';
            } else {
                console.log('message');
                document.getElementById('warn_message').textContent = errorMessage;
            }
          });
    }    
});