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

////////////////////////////////////////////////////////////////////////////////
// get full time - chỉ 1 lần
    var d = new Date();
    var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December']
    var  currentMonth = d.getMonth(); // 0-11
    var currentYear = d.getFullYear(); // 2019

///// hàm xử lý tình huống tràn ô
function overDate(currentMonth,currentYear){
    var first_date = month_name[currentMonth] + " " + "1" + " " + currentYear;
    console.log(first_date);
    var tmp = new Date(first_date);
    var firstDay_no = tmp.getDay();
    if(firstDay_no == 0){
        firstDay_no = 7
    }
    var daysInMonth = new Date(currentYear, currentMonth + 1 ,0).getDate()
    var totalDay = firstDay_no+daysInMonth -1
    console.log(`index đầu ${firstDay_no-1} cộng thêm ${daysInMonth} là tổng ${totalDay} ô`)
    return (totalDay < 35)?35:42;
    }
overDate(currentMonth,currentYear)

// draw blank calendar - chỉ một lần


    let monthContainer = document.getElementById("month_container");
    for(let i = 0; i < 35; i++){
        let ranId = `${i}` + `${currentMonth}` + `${currentYear}`  
        monthContainer.insertAdjacentHTML("beforeend",
            `<li  class="cal_day" id =${ranId} index = ${i}>
                <div class="count_day"></div>
                <div style="opacity: 0" class="count_blue">0</div>
                <div style="opacity: 0" class="count_green">0</div>
                <div style="opacity: 0" class="count_yellow">0</div>
                <div style="opacity: 0" class="count_red">0</div>
            </li>` 
        )
    }


    var innerDate = document.getElementsByClassName("count_day");
/////////// lấy dữ liệu tháng và năm đang trỏ tới để sinh: ngày đầu tiên của tháng ấy rơi vào thứ mấy và số ngày của tháng ấy
returnDateMonth(currentMonth,currentYear);

function returnDateMonth(currentMonth,currentYear){
    var first_date = month_name[currentMonth] + " " + "1" + " " + currentYear;
    console.log(first_date);
    // November 1 2019
    var tmp = new Date(first_date);
    // có thẻ truyền vào new Date() một string theo dạng "Tháng Ngày năm" --trả ra cả thứ cũng có thể truyền vào dưới dạng (year,month,day) 
    var firstDay_no = tmp.getDay();
    console.log(` thứ của ngày đầu tiên :${firstDay_no}`);
    var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var daysInMonth = new Date(currentYear, currentMonth + 1 ,0).getDate() // ra ngày cuối cùng của tháng đang chọn
    get_calendar(firstDay_no, daysInMonth)
}





// HÀM INSERT NGÀY VÀO Ô

function get_calendar(firstDay_no, daysInMonth){
    console.log(`bắt đầu insert ngày, ngày 1 rơi vào thứ ${firstDay_no}+1`)
    var endCell = firstDay_no + daysInMonth;
    var k = 0;
    for( i = firstDay_no -1; i < endCell -1; i++){ //vì thứ 2 index 0 
        k++; // k là ngày chạy từ 0 tới cuối của tháng ấy
        innerDate[i].innerHTML = k; // i là chỉ sô index của ô trong bảng
        console.log(`index ${i} ngày ${k} tháng ${currentMonth} năm ${currentYear}`) 
    }
}



//////////// thêm sự kiện cho nút nhảy lịch////////
let nextBtn = document.getElementById("next");
let previousBtn = document.getElementById("previous");

previousBtn.addEventListener("click",function previous(){
    console.log(` in ${overDate(currentMonth,currentYear)} ô`)
    if (currentMonth == 0){
        currentMonth = 11;
        currentYear -=1;
    } else {
        currentMonth -= 1;
    }
    loadAll(currentMonth,currentYear);
})
;
nextBtn.addEventListener("click",function next(){
    console.log(` in ${overDate(currentMonth,currentYear)} ô`)
    
    if (currentMonth == 11){
        currentYear +=1;
        currentMonth = 0
    } else {
        currentMonth += 1;
    }
    loadAll(currentMonth,currentYear);

})
;
///////////////////////////////////////////////////


let monthAndYear = document.getElementById("month_and_year")
function loadAll(currentMonth,currentYear){
    /// nhảy vào ô bar trước
    monthAndYear.innerHTML = `${month_name[currentMonth]} ${currentYear}`
    monthContainer.innerHTML="";
    redrawCalendar1(currentMonth,currentYear);
    var innerDate1 = document.getElementsByClassName("count_day");
    returnDateMonth1(currentMonth,currentYear,innerDate1);
}


///// hàm vẽ lại bảng
function redrawCalendar1(currentMonth,currentYear){
    for(let i = 0; i < overDate(currentMonth,currentYear); i++){
        let ranId = `${i}` + `${currentMonth}` + `${currentYear}`  
        monthContainer.insertAdjacentHTML("beforeend",
            `<li  class="cal_day" id =${ranId} index = ${i}>
                <div class="count_day"></div>
                <div style="opacity: 0" class="count_blue">0</div>
                <div style="opacity: 0" class="count_green">0</div>
                <div style="opacity: 0" class="count_yellow">0</div>
                <div style="opacity: 0" class="count_red">0</div>
            </li>` 
        )
    }
}

function returnDateMonth1(currentMonth,currentYear,innerDate1){
    var first_date = month_name[currentMonth] + " " + "1" + " " + currentYear;
    console.log(first_date);
    // November 1 2019
    var tmp = new Date(first_date);
    // có thẻ truyền vào new Date() một string theo dạng "Tháng Ngày năm" --trả ra cả thứ cũng có thể truyền vào dưới dạng (year,month,day) 
    var firstDay_no = tmp.getDay();
    console.log(` thứ của ngày đầu tiên :${firstDay_no}`);
    var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var daysInMonth = new Date(currentYear, currentMonth + 1 ,0).getDate() // ra ngày cuối cùng của tháng đang chọn
    get_calendar1(firstDay_no, daysInMonth,innerDate1)
}
  
function get_calendar1(firstDay_no, daysInMonth,innerDate1){
    console.log(`bắt đầu insert ngày, ngày 1 rơi vào thứ ${firstDay_no}+1`)
    
    var endCell = firstDay_no + daysInMonth;
    var k = 0;
    if(firstDay_no == 0){
        firstDay_no = 7
        endCell += 7
    }
    for( i = firstDay_no - 1; i < endCell-1; i++){ //vì thứ 2(hiện số 1) index 0 
        k++; // k là ngày chạy từ 0 tới cuối của tháng ấy
        innerDate1[i].innerHTML = k; // i là chỉ sô index của ô trong bảng
        console.log(`index ${i} ngày ${k} tháng ${currentMonth} năm ${currentYear}`) 
    }
}


///////////////////////////////////////////////////////////////////////


  // trigger của panel
const add_btn = document.getElementById('addBtn');
var task_panel = document.getElementById('task_panel');
add_btn.addEventListener('click', function(){
    task_panel.style.display = "block";
    task_panel.transform = "scale(1.1)"
});

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
const work_name = document.getElementById('input_name');
const label_btn = document.getElementsByClassName('panel_btn');
const label_container = document.getElementsByClassName('name1')[0];
// const datesLabel = document.getElementsByClassName('panel_btn yellow');
// const routineLabel = document.getElementsByClassName('panel_btn green');
// const deadlineLabel = document.getElementsByClassName('panel_btn red');
for(let i = 0; i < label_btn.length; i++) {
    label_btn[i].addEventListener('click', function() {
        label_btn[i].focus();
    });
}
//unset button
const unset_btn = document.getElementById('unset_btn');
// set button
let task_panel_content_holder = document.getElementById("task_panel_content_holder")
let task_panel_content = document.getElementById("task_panel_content")
let enable = document.getElementById("enable");
let set_btn = document.getElementById("set_btn");
set_btn.addEventListener("click",()=>{
    console.log(enable.style.display);
    unset_btn.style.display = "none";
    set_btn.style.width = "100%";
    if(enable.style.display == "none"){
        enable.style.display = "flex";
        // task_panel_content_holder.style.height= "480px"; 
        // task_panel_content.style.height = "98%"

    } else {
        unset_btn.style.display = "flex";
        set_btn.style.width = "47%";
        enable.style.display = "none";
        // task_panel_content_holder.style.height= "410px";
        // task_panel_content.style.height = "410px"
         
    }
})

             /////// chọn minute hẹn giờ của remind at task
// let remind_array = [00,02,10,15,20,25,30,35,40,45,50,55,60];
// let select_string_remind = [];
// let insert_remind = document.getElementById("pick_time_remind");
// remind_array.map(item =>{
//     let a = `<option value = "${item}">${item}</option>`
//     select_string_remind.push(a);
// });
// insert_remind.innerHTML = `${select_string_remind}`;

// modal date detail
// console.log(document.getElementById('cal_day'));
// list_cal_day = document.getElementsByClassName('cal_day');
// for(let i = 0; i < list_cal_day.length; i++){
//     cal_day = list_cal_day[i]
//     cal_day.setAttribute("id", i);
//     console.log(cal_day);
// }


//
                            // document.getElementById('cal_day').addEventListener('click', function () {
                            //     console.log('ahihi');
                                
                            //     document.querySelector('.bg_detailtasks_tab').style.display = 'flex';
                            // });
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


