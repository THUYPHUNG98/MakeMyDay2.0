firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        const firstName = document.getElementById('first_name');
        const lastName = document.getElementById('last_name');
        const userName = document.getElementById('user_name');
        const oldPasswd = document.getElementById('old_passwd');
        const newPasswd = document.getElementById('new_passwd');
        const confirmPasswd = document.getElementById('confirm_passwd');
        const changepwd_button = document.getElementById('changepwd_button');
        const update_btn = document.getElementById('update_button');
        const userDisplay = document.getElementById('user');
        console.log(user.email);
        let ref = firebase.database().ref(user.uid);
        ref.on('value', function(snapshot) {
            let user = snapshot.val();
            console.log(user);
            firstName.value = user.firstname;
            lastName.value = user.lastname;
            userName.value = user.username;
            userDisplay.textContent = user.username;
        }); 
        update_btn.addEventListener('click', function() {
            if(firstName.value =="" || lastName.value == ""|| userName.value == "") {
                alert('Please fill full information!');
            } else {
                var update = {};
                update['/firstname'] = firstName.value;
                update['/lastname'] = lastName.value;
                update['/username'] = userName.value;
                ref.update(update);
                alert('Update succeed!');
            }
        });
        var credential;
        changepwd_button.addEventListener('click', function() {
            credential = firebase.auth.EmailAuthProvider.credential(
            user.email, 
            oldPasswd.value,
        );
        console.log(credential);
        
        if(newPasswd.value != ""||confirmPasswd.value !="" ||newPasswd.value == confirmPasswd.value || newPasswd.value.length < 6) {
            user.reauthenticateWithCredential(credential).then(function() {
                user.updatePassword(newPasswd.value).then(function() {
                    firebase.auth().signOut().then(function() {
                        window.location.assign('login.html');
                        alert('Changing password succeed! Re-sign in to enjoy');
                      })
                  }).catch(function(error) {
                    console.log(error);
                    
                  });
              }).catch(function(error) {
                console.log(error);
                alert(error.message);
              });
        } else {
            alert('Enter your new password again! Password must be more than 6 chareacters');
        }
        });
    } else {
        window.location.assign('login.html');
    }
});