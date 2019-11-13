firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        const unsetContainer = document.getElementById('unset_list');
        const userId = user.uid;
        let works = firebase.database().ref(userId + '/works');
        works.on('value', function(snapshot) {
            console.log(snapshot.val());
            const worksList = snapshot.val();
            for(let i = 0; i < worksList.length; i++) {
                console.log(worksList[i]);
                if(worksList[i].date == null|| worksList[i].date == undefined) {
                    if(worksList[i].label == 0) {
                        unsetContainer.insertAdjacentHTML('beforeend', `<li class="blue">${worksList[i].name}</li>`);
                    } else if(worksList[i].label == 1) {
                        unsetContainer.insertAdjacentHTML('beforeend', `<li class="yellow">${worksList[i].name}</li>`);
                    } else if(worksList[i].label == 2) {
                        unsetContainer.insertAdjacentHTML('beforeend', `<li class="green">${worksList[i].name}</li>`);
                    } else {
                        unsetContainer.insertAdjacentHTML('beforeend', `<li class="red">${worksList[i].name}</li>`);
                    }
                };
                
            }   
        });

    } else {
        console.log('fail!');
    }
  });
  // trigger của panel
var task_panel = document.getElementById("task_panel");
function open_task_panel(){
    task_panel.style.display = "block";
    task_panel.transform = "scale(1.1)"
}

// nút close của task panel
var close_panel = document.getElementsByClassName("close_panel")[0];
close_panel.onclick = function() {
    task_panel.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == this.task_panel) {
      task_panel.style.display = "none";
    }
}
// set button
let enable = document.getElementById("enable");
let set_btn = document.getElementById("set_btn");
set_btn.addEventListener("click",()=>{
    if(enable.style.display == "none"){
        enable.style.display = "flex"; 

    } else {
        enable.style.display = "none";
    }
})
// modal date detail
// console.log(document.getElementById('cal_day'));
// list_cal_day = document.getElementsByClassName('cal_day');
// for(let i = 0; i < list_cal_day.length; i++){
//     cal_day = list_cal_day[i]
//     cal_day.setAttribute("id", i);
//     console.log(cal_day);
// }


//
document.getElementById('cal_day').addEventListener('click', function () {
    console.log('ahihi');
    
    document.querySelector('.bg_detailtasks_tab').style.display = 'flex';
});
// document.getElementById('cal_day2').addEventListener('click', function () {
//     document.querySelector('.bg_detailtasks_tab').style.display = 'flex';
// });


document.getElementById('close').addEventListener('click', function () {
    console.log("csdjjsdfsdcsdc");
    
    document.querySelector('.bg_detailtasks_tab').style.display = 'none';
});
//feedback
document.getElementById("feedback").addEventListener('click', () => {          
    document.querySelector('.modal-feedback').style.display = 'flex';
});
document.querySelector('.mf-content .close').addEventListener('click', () => {
    document.querySelector('.modal-feedback').style.display = 'none';
})


//setting

document.getElementById("setting").addEventListener('click', () => {          
    document.querySelector('.modal-setting').style.display = 'flex';
});
document.querySelector('.ms-content .close').addEventListener('click', () => {
    document.querySelector('.modal-setting').style.display = 'none';
})

//about us
document.getElementById("aboutus").addEventListener('click', () => {          
    document.querySelector('.modal-aboutus').style.display = 'flex';
});
document.querySelector('.ma-content .close').addEventListener('click', () => {
    document.querySelector('.modal-aboutus').style.display = 'none';
})
// creating calendar
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
// let selectYear = document.getElementById("year");
// let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
console.log(today);
console.log(currentMonth);
console.log(currentYear);
