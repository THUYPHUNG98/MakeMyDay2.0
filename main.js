// tương tác với database
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        const userId = user.uid;
        let works = firebase.database().ref(userId + '/works');
        ////////////////////////////////////////////////////////////////////////////////
// F1 get full time - chỉ 1 lần
let todayWorks;
var d = new Date();
let time, time1, setDate;
let hours = d.getHours();
let hours1 = d.getHours() + 1;
let minutes = d.getMinutes();
let date = d.getDate();
let month = d.getMonth() + 1;
if(hours.toString().length == 1) {
    hours = "0" + hours;
};
if(hours1.toString().length == 1) {
    hours1 = "0" + hours1;
}
if(minutes.toString().length == 1) {
    minutes = "0" + minutes;
};
time = hours + ":" + minutes;
time1 = hours1 + ":" + minutes;
if(month.toString().length == 1) {
    month = "0" + month;
};
if(date.toString().length == 1) {
    date = "0" + date;
};
setDate = d.getFullYear()  + "-" + (d.getMonth() + 1) + "-" +  d.getDate();
console.log(setDate);
console.log(time);
console.log(time1);

const month_name = ['January','February','March','April','May','June','July','August','September','October','November','December']
var  currentMonth = d.getMonth(); // 0-11
const monthPointer = currentMonth;
var currentYear = d.getFullYear(); // 2019
const yearPointer = currentYear;
    //console.log(`Thời gian hiện tại : tháng ${monthPointer+1} năm ${yearPointer}`)

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
    return (totalDay < 35)?35:42;
    }
overDate(currentMonth,currentYear)

// F2 draw blank calendar - chỉ một lần


    let monthContainer = document.getElementById("month_container");
    for(let i = 0; i < overDate(currentMonth,currentYear); i++){
        monthContainer.insertAdjacentHTML("beforeend",
            `<li  class="cal_day" index = ${i}>
                <div class="count_day"></div>
                <div style="opacity: 0" class="count_blue">0</div>
                <div style="opacity: 0" class="count_green">0</div>
                <div style="opacity: 0" class="count_yellow">0</div>
                <div style="opacity: 0" class="count_red">0</div>

            </li>` 
        )
    }


    var innerDate = document.getElementsByClassName("count_day");
    var liDate = document.getElementsByClassName("cal_day");
///////////  F3 lấy dữ liệu tháng và năm đang trỏ tới để sinh: ngày đầu tiên của tháng ấy rơi vào thứ mấy và số ngày của tháng ấy
returnDateMonth(currentMonth,currentYear);

function returnDateMonth(currentMonth,currentYear){
    var first_date = month_name[currentMonth] + " " + "1" + " " + currentYear;
    //console.log(first_date);
    // November 1 2019
    var tmp = new Date(first_date);
    // có thẻ truyền vào new Date() một string theo dạng "Tháng Ngày năm" --trả ra cả thứ cũng có thể truyền vào dưới dạng (year,month,day) 
    var firstDay_no = tmp.getDay();
    //console.log(` thứ của ngày đầu tiên :${firstDay_no}`);
    var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var daysInMonth = new Date(currentYear, currentMonth + 1 ,0).getDate() // ra ngày cuối cùng của tháng đang chọn
    get_calendar(firstDay_no, daysInMonth)
}




// F4 HÀM INSERT NGÀY VÀO Ô   

function get_calendar(firstDay_no, daysInMonth){
    //console.log(`bắt đầu insert ngày, ngày 1 rơi vào thứ ${firstDay_no}+1`)
    var endCell = firstDay_no + daysInMonth;
    var k = 0;
    if(firstDay_no == 0){
        firstDay_no = 7
        endCell += 7
    }
    for( i = firstDay_no -1; i < endCell -1; i++){ //vì thứ 2 index 0 
        k++; // k là ngày chạy từ 0 tới cuối của tháng ấy
        innerDate[i].innerHTML = k; // i là chỉ sô index của ô trong bảng
        liDate[i].setAttribute("id",`${currentYear}-${currentMonth+1}-${k}`)
        liDate[i].insertAdjacentHTML("beforeend",`<ul class="reset" style = "display : none" id = "1${currentYear}-${currentMonth+1}-${k}">
        </ul>`);
    }
}


// F4.4 nạp li vào today Counter

function loadTodayCounterTab(){

    var tmp2 = new Date();
    let tmp4 = tmp2.getDate();
    let id = `1${yearPointer}-${monthPointer+1}-${tmp4}`
    console.log(` today countertab có nhận ${id}`);
    let pushListUl = document.getElementById(`${id}`);
    console.log(pushListUl);
    let pushListLi = pushListUl.innerHTML; //lấy ra đống li của ô cal_day ấy
    //console.log(pushListLi)
    let x = countLi(pushListUl);
    insertDetailTabCounter(x); 
    let id2 = `${yearPointer}-${monthPointer+1}-${tmp4}`
    let todayCell = document.getElementById(`${id2}`); 
    console.log(todayCell);
    todayCell.style.borderColor = "#BCD9FF";
    todayCell.style.borderWidth = "4px 4px 4px 4px";
}

function insertDetailTabCounter(y){
    var countBoxTodo = document.getElementsByClassName("count_number")[0];
    var countBoxDates = document.getElementsByClassName("count_number")[1];
    var countBoxRoutine = document.getElementsByClassName("count_number")[2];
    var countBoxDeadline = document.getElementsByClassName("count_number")[3];
    
    var countListTodo = document.getElementsByClassName("count_list_li")[0];
    var countListDates = document.getElementsByClassName("count_list_li")[1];
    var countListRoutine = document.getElementsByClassName("count_list_li")[2];
    var countListDeadline = document.getElementsByClassName("count_list_li")[3];    

    countListTodo.innerHTML = "";
    countListDates.innerHTML = "";
    countListRoutine.innerHTML = "";
    countListDeadline.innerHTML = "";

    console.log(y.blueLi[0]);
    
    for( let i = y.blueLi.length - 1; i > -1 ; i--){
       countListTodo.innerHTML += `<li class ="tooltip">${y.blueLi[i].innerHTML}
                                        <span class= "tooltiptext"  style="background-color: #5696E1 ;">${y.blueLi[i].getAttribute("time")}</span>
                                    </li>`;
    }	  
    for( let i = y.yellowLi.length - 1; i > -1 ; i--){
        countListDates.innerHTML += `<li class ="tooltip">${y.yellowLi[i].innerHTML}
                                        <span class= "tooltiptext"  style="background-color: #FFCC00 ;">${y.yellowLi[i].getAttribute("time")}</span>
                                    </li>`;
    }	
    for( let i = y.greenLi.length - 1; i > -1 ; i--){
        countListRoutine.innerHTML += `<li class ="tooltip">${y.greenLi[i].innerHTML}
                                        <span class= "tooltiptext"  style="background-color: #72DB72 ;">${y.greenLi[i].getAttribute("time")}</span>
                                    </li>`;
    }	   
    for( let i = y.redLi.length - 1; i > -1 ; i--){
        countListDeadline.innerHTML += `<li class ="tooltip">${y.redLi[i].innerHTML}
                                        <span class= "tooltiptext"  style="background-color: #FF8383 ;">${y.redLi[i].getAttribute("time")}</span>
                                    </li>`;

    }
    
    countBoxTodo.innerHTML = y.blueCount;
    countBoxDates.innerHTML = y.yellowCount;
    countBoxRoutine.innerHTML = y.greenCount;
    countBoxDeadline.innerHTML = y.redCount;
    if(y.blueCount == 0 && y.yellowCount == 0 && y.greenCount == 0 && y.redCount == 0) {
        setTimeout(function(){
            alert('Today you have no work! Add work to make your day ^^');
        }, 1000);
    }
}


//////////// F5 thêm sự kiện cho nút nhảy lịch////////
let nextBtn = document.getElementById("next");
let previousBtn = document.getElementById("previous");
/////////////////////////////////////////////////// chuyển tháng ở đây/////////////////////////////////


let monthAndYear = document.getElementById("month_and_year")
function loadAll(currentMonth,currentYear){
    /// nhảy vào ô bar trước
    monthAndYear.innerHTML = `${month_name[currentMonth]} ${currentYear}`
    monthContainer.innerHTML="";
    //F2
    redrawCalendar1(currentMonth,currentYear);
    var innerDate1 = document.getElementsByClassName("count_day");
    var liDate1 = document.getElementsByClassName("cal_day");
    //F3 - F4
    returnDateMonth1(currentMonth,currentYear,liDate1,innerDate1);
    //F6
    setEventCell();

    //// thêm sự kiện đọc dữ liệu, chèn vào, xử lý số liệu nữa
}


///// hàm vẽ lại bảng
function redrawCalendar1(currentMonth,currentYear){
    for(let i = 0; i < overDate(currentMonth,currentYear); i++){
        monthContainer.insertAdjacentHTML("beforeend",
            `<li  class="cal_day" index = ${i}>
                <div class="count_day"></div>
                <div style="opacity: 0" class="count_blue">0</div>
                <div style="opacity: 0" class="count_green">0</div>
                <div style="opacity: 0" class="count_yellow">0</div>
                <div style="opacity: 0" class="count_red">0</div>
            </li>` 
        )
    }
}

//////////////hàm trả ra thứ và số ngày lại


function returnDateMonth1(currentMonth,currentYear,liDate1,innerDate1){
    var first_date = month_name[currentMonth] + " " + "1" + " " + currentYear;
    //console.log(first_date);
    // November 1 2019
    var tmp = new Date(first_date);
    // có thẻ truyền vào new Date() một string theo dạng "Tháng Ngày năm" --trả ra cả thứ cũng có thể truyền vào dưới dạng (year,month,day) 
    var firstDay_no = tmp.getDay();
    //console.log(` thứ của ngày đầu tiên :${firstDay_no}`);
    var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var daysInMonth = new Date(currentYear, currentMonth + 1 ,0).getDate() // ra ngày cuối cùng của tháng đang chọn
    get_calendar1(firstDay_no, daysInMonth,liDate1,innerDate1)
}
  
//////////////hàm insert lại

function get_calendar1(firstDay_no, daysInMonth,liDate1,innerDate1){
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
        liDate1[i].setAttribute("id",`${currentYear}-${currentMonth+1}-${k}`)
        liDate1[i].insertAdjacentHTML("beforeend",`<ul class="reset" style = "display : none" id = "1${currentYear}-${currentMonth+1}-${k}"> 

    </ul>`)


    }
}

//// thêm sự kiện trỏ vào ô trong bảng và chức năng của nó///////////////

let modalTodo = document.getElementById("modal_Todo");
let modalDates = document.getElementById("modal_Dates");
let modalRoutine = document.getElementById("modal_Routine");
let modalDeadline = document.getElementById("modal_Deadline");

let modalTodoCount = document.getElementById("modal_Todo_count");
let modalDatesCount = document.getElementById("modal_Dates_count");
let modalRoutineCount = document.getElementById("modal_Routine_count");
let modalDeadlineCount = document.getElementById("modal_Deadline_count");

//F7
function setEventCell(){
    let monthContainerList = monthContainer.getElementsByClassName('cal_day');
    let monthHasId = [];
    let takeId = [];
    for(let i = 0; i < monthContainerList.length; i ++){
        if(monthContainerList[i].hasAttribute('id')){
            monthHasId.push(monthContainerList[i]); //tạo ra 1 array chỉ chứa cal_day có id;
        }

    }

    for(let i = 0; i < monthHasId.length; i ++){ //monthHasId là đúng cái ô cal_day đang trỏ vào
        takeId[i] = monthHasId[i].getAttribute("id"); //takeId[i] là id của ô cal_day ấy
        let id = takeId[i];
        //console.log(id);
        monthHasId[i].addEventListener("click", ()=>{
            document.querySelector('.bg_detailtasks_tab').style.display = 'flex';
            let pushListUl = document.getElementById(`1${id}`);
            let pushListLi = pushListUl.innerHTML; //lấy ra đống li của ô cal_day ấy
            insertDetailTime(pushListLi,id)
            let x = countLi(pushListUl);
            insertDetailData(x);
            //get update set

            works.once('value', function(snapshot) {
                let worksList = snapshot.val();
                if(worksList != null) {
                    //console.log(...worksList);
                    
                    const updateSetList = document.getElementsByClassName('setList1');
                    console.log(...updateSetList);
                    for(let i = 0; i < updateSetList.length; i++) {
                        updateSetList[i].addEventListener('click', function(e) {
                            //console.log("ahihi");
                            console.log(e.target);
                            task_panel.style.display = "flex";
                            task_panel.transform = "scale(1.1)";
                            unset_btn.style.display = "none";
                            set_btn.style.width = "100%";
                            enable.style.display = "flex";
                            delete_enable.style.display = "flex";
                            work_name.value = e.target.textContent;
                            let currentActive = document.getElementsByClassName("active");

                            for(let i = 0; i < currentActive.length; i++) {
                                console.log(currentActive[i]);
                                currentActive[i].className = "panel_btn";
                            };
                            //console.log(...currentActive);
                            let index = e.target.getAttribute('idset');
                            
                            let label = worksList[index].label;
                            if(label == 1) {
                                label_btns[1].className += " active";

                            } else if(label == 2) {
                                label_btns[2].className += " active";
                            } else if(label == 3) {
                                label_btns[3].className += " active";
                            } else {
                                label_btns[0].className += " active";
                            };

                            let dateArr = worksList[index].date.split('-');
                            if(dateArr[1].length == 1) {
                                dateArr[1] = "0" + dateArr[1];
                            };
                            if(dateArr[2].length == 1) {
                                dateArr[2] = "0" + dateArr[2];
                            }
                            work_date.value = dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2];
                            start_time.value = worksList[index].startTime;
                            console.log(worksList[index].startTime);
                            
                            end_time.value = worksList[index].endTime;
                            if(worksList[index].remind == true) {
                                remind_btn.checked == true;
                            } else {
                                remind_btn.checked == false;
                            }
                            unset_btn.textContent = "Update";
                            letMake_btn.textContent = "Update";
                            delete_btn.setAttribute('index', index);
                            });
                        };

                };
            });

        });


}
}
setEventCell();

function insertDetailTime(pushListLi,id){
    let splitId = id.split("-")
    //console.log(splitId); 
    document.getElementsByClassName("date_click")[0].innerHTML = `${splitId[2]}-${splitId[1]}-${splitId[0]}`;

}

////////////////// đếm số màu thẻ li F6.2
function countLi(pushListUl){

       let blueLi = pushListUl.getElementsByClassName("blue setList");
       let yellowLi = pushListUl.getElementsByClassName("yellow setList");
       let greenLi = pushListUl.getElementsByClassName("green setList");
       let redLi = pushListUl.getElementsByClassName("red setList");
       let blueCount = blueLi.length;
       let yellowCount = yellowLi.length;
       let greenCount = greenLi.length;
       let redCount = redLi.length;
    x = {
        blueLi : blueLi,
        yellowLi : yellowLi,
        greenLi : greenLi,
        redLi : redLi,
        blueCount : blueCount,
        yellowCount : yellowCount,
        greenCount : greenCount,
        redCount : redCount,
    }
    //console.log(x);
    
    return x;
}


///
function insertDetailData(y){
    modalTodo.innerHTML= "";
    modalDates.innerHTML = "";
    modalRoutine.innerHTML ="";
    modalDeadline.innerHTML="";

    
    //console.log(y.blueLi[0]);
    for(let i = y.blueLi.length - 1; i > -1 ; i--){
        modalTodo.innerHTML += `<li class = "setList1" idset = "${y.blueLi[i].getAttribute("id")}">${y.blueLi[i].innerHTML}</li>`;
    }
    for(let i = y.yellowLi.length - 1; i > -1 ; i--){
        modalDates.innerHTML += `<li class = "setList1" idset = "${y.yellowLi[i].getAttribute("id")}">${y.yellowLi[i].innerHTML}</li>`;
    }
    for(let i = y.greenLi.length - 1; i > -1 ; i--){
        modalRoutine.innerHTML += `<li class = "setList1" idset = "${y.greenLi[i].getAttribute("id")}">${y.greenLi[i].innerHTML}</li>`;
    }
    for(let i = y.redLi.length - 1; i > -1 ; i--){
        modalDeadline.innerHTML += `<li class = "setList1" idset = "${y.redLi[i].getAttribute("id")}">${y.redLi[i].innerHTML}</li>`;
    }

    modalTodoCount.innerHTML = y.blueCount;
    modalDatesCount.innerHTML = y.yellowCount;
    modalRoutineCount.innerHTML = y.greenCount;
    modalDeadlineCount.innerHTML = y.redCount;
}





///////////////////////////////////////////////////////////////////////


//////////////////////// load từ li ẩn lên bảng calendar
function loadCalendarTag(){
    let monthContainerList = monthContainer.getElementsByClassName('cal_day')
    let monthHasId = [];
    let takeId = [];
    for(let i = 0; i < monthContainerList.length; i ++){
        if(monthContainerList[i].hasAttribute('id')){
            monthHasId.push(monthContainerList[i]); //tạo ra 1 array chỉ chứa cal_day có id;
        }

    }

    for(let i = 0; i < monthHasId.length; i ++){ //monthHasId là đúng cái ô cal_day đang trỏ vào
        takeId[i] = monthHasId[i].getAttribute("id"); //takeId[i] là id của ô cal_day ấy
        let id = takeId[i];
        //console.log(id);
        let pushListUl = document.getElementById(`1${id}`);
        let pushListLi = pushListUl.innerHTML; //lấy ra đống li của ô cal_day ấy
        //console.log(pushListLi);
        let x = countLi(pushListUl); // ra một object đã xử lý đếm
        //console.log(x)
        let y = monthHasId[i]
        //console.log(y)
        insertTag(x,y);

    }
}
//F8
loadCalendarTag();

{/* <div class="count_day"></div>
<div style="opacity: 0" class="count_blue">0</div>
<div style="opacity: 0" class="count_green">0</div>
<div style="opacity: 0" class="count_yellow">0</div>
<div style="opacity: 0" class="count_red">0</div> */}

///////////////////////// đếm và hiện màu cho tag
function insertTag(x,y){
    let countBlue = y.getElementsByClassName("count_blue")[0];
        switchColor(x.blueCount,countBlue); // là thẻ div chứ opacity
    let countYellow = y.getElementsByClassName("count_yellow")[0];
        switchColor(x.yellowCount,countYellow);
    let countGreen = y.getElementsByClassName("count_green")[0];
        switchColor(x.greenCount,countGreen);
    let countRed = y.getElementsByClassName("count_red")[0];
        switchColor(x.redCount,countRed);
    countBlue.innerHTML = x.blueCount;
    countYellow.innerHTML = x.yellowCount;
    countGreen.innerHTML = x.greenCount;
    countRed.innerHTML = x.redCount;
    


}
function switchColor(colorCount,countColor){
    if (colorCount == 0){
        countColor.style.opacity = "0";
    } else {
        countColor.style.opacity = "100"
    }
}


///////////////////////////////////////////////////
  // trigger của panel
const add_btn = document.getElementById('addBtn');
var task_panel = document.getElementById('task_panel');
const delete_enable = document.getElementById('delete_task');
add_btn.addEventListener('click', function(){
    task_panel.style.display = "flex";
    task_panel.transform = "scale(1.1)";
    delete_enable.style.display = "none";
    unset_btn.textContent = "Unset";
    letMake_btn.textContent = "Let's make";
    unset_btn.style.display = "flex";
    set_btn.style.width = "47%";
    work_name.value = "";
    // work_date.value = null;
    // start_time.value = null;
    // end_time.value = null;
    enable.style.display = "none";
    let currentActive = document.getElementsByClassName("active");
        for(let i = 0; i < currentActive.length; i++) {
            console.log(currentActive[i]);
            currentActive[i].className = "panel_btn";
        };
    label_btns[0].className += " active";
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
//////// declare input fields and buttons
const work_name = document.getElementById('input_name');
const work_date = document.getElementById('pick_time_date');
const start_time = document.getElementById('start_time');
const end_time = document.getElementById('end_time');
const remind_btn = document.getElementById('remind_checkbox');
const unset_btn = document.getElementById('unset_btn');
const letMake_btn = document.getElementById('make_task');
const delete_btn = document.getElementById('delete_btn');
const logOut_btn = document.getElementById('logout_btn');
const label_container = document.getElementsByClassName('active');
const header = document.getElementById('panel_cate');
var label_btns = header.getElementsByClassName('panel_btn');
const feedBack_btn = document.getElementById('submit_btn');
const feedback = document.getElementById('feed_back');
for(var i = 0; i < label_btns.length; i++) {
    label_btns[i].addEventListener('click', function() {
        var current = document.getElementsByClassName('active');
        console.log(current[0]);
        current[0].className = current[0].className.replace(' active','');
        this.className += ' active';
        console.log(this.className);
        
    });
};
        const unsetContainer = document.getElementById('unset_list');
        previousBtn.addEventListener("click",function previous(){
            //console.log("ahihi");
            var setsList = [];
            works.once('value', function(snapshot) {
                let worksList = snapshot.val();
                for(let i = 0; i < worksList.length; i++) {
                    if(worksList[i] != undefined) {
                        if(worksList[i].date != null || worksList[i].date != undefined ) {
                            setsList.push(worksList[i]);
                        };
                    };
                };
            });
            console.log(` in ${overDate(currentMonth,currentYear)} ô`);
            if (currentMonth == 0){
                currentMonth = 11;
                currentYear -=1;
            } else {
                currentMonth -= 1;
            }
            loadAll(currentMonth,currentYear);
            loadData(setsList);

        });
        nextBtn.addEventListener("click",function next(){
            console.log("ahuhu");
            var setsList = [];
            works.once('value', function(snapshot) {
                let worksList = snapshot.val();
                for(let i = 0; i < worksList.length; i++) {
                    if(worksList[i] != undefined) {
                        if(worksList[i].date != null || worksList[i].date != undefined ) {
                            setsList.push(worksList[i]);
                        };
                    };
                };
            });
            console.log(` in ${overDate(currentMonth,currentYear)} ô`);
            if (currentMonth == 11){
                currentYear +=1;
                currentMonth = 0
            } else {
                currentMonth += 1;
            }
            loadAll(currentMonth,currentYear);
            loadData(setsList);
        });
        works.on('value', function(snapshot) {
            let worksList = snapshot.val();
            var setsList = [];
            if(worksList != null && worksList != undefined) {
                unsetContainer.innerHTML = "";
                console.log(worksList.length);
                for(let i = 0; i < worksList.length; i++) {
                    if(worksList[i] != undefined) {
                        if(worksList[i].date == null || worksList[i].date == undefined ) {
                            if(worksList[i].label == 0) {
                                unsetContainer.insertAdjacentHTML('beforeend', `<li class="blue unsetList " id="${i}">${worksList[i].name}
                                                                              
                                                                                </li>`);
                            } else if(worksList[i].label == 1) {
                                unsetContainer.insertAdjacentHTML('beforeend', `<li class="yellow unsetList " id="${i}">${worksList[i].name}
                                                                               
                                                                                </li>`);
                            } else if(worksList[i].label == 2) {
                                unsetContainer.insertAdjacentHTML('beforeend', `<li class="green unsetList " id="${i}">${worksList[i].name}
                                                                              
                                                                                </li>`);
                            } else if(worksList[i].label == 3){
                                unsetContainer.insertAdjacentHTML('beforeend', `<li class="red unsetList " id="${i}">${worksList[i].name}
                                                                               
                                                                                </li>`);
                            } else {
                                console.log('no unset');
                                    
                            }
                        } else {
                            let setItem = {
                                id: i,
                                label: worksList[i].label,
                                name: worksList[i].name,
                                date: worksList[i].date, 
                                startTime: worksList[i].startTime,
                                endTime: worksList[i].endTime,
                                remind: worksList[i].remind,

                            }
                            setsList.push(setItem);
                        };
                    };
                    
                };
                loadData(setsList);
                //get update unset
                const updateUnsetList = document.getElementsByClassName('unsetList');
                let unsetTotal = document.getElementById('total');
                unsetTotal.textContent = updateUnsetList.length + ' total';
                console.log(updateUnsetList);
                for(let i = 0; i < updateUnsetList.length; i++) {
                    updateUnsetList[i].addEventListener('click', function(e) {
                    console.log(e.target);
                    task_panel.style.display = "flex";
                    task_panel.transform = "scale(1.1)";
                    unset_btn.style.display = "flex";
                    set_btn.style.width = "47%";
                    enable.style.display = "none";
                    delete_enable.style.display = "flex";
                    work_name.value = e.target.textContent;
                    let currentActive = document.getElementsByClassName("active");
                    for(let i = 0; i < currentActive.length; i++) {
                        console.log(currentActive[i]);
                        currentActive[i].className = "panel_btn";
                    };
                    //console.log(...currentActive);
                    let index = e.target.getAttribute('id');
                    let label = worksList[index].label;
                    if(label == 1) {
                        label_btns[1].className += " active";
                        
                    } else if(label == 2) {
                        label_btns[2].className += " active";
                    } else if(label == 3) {
                        label_btns[3].className += " active";
                    } else {
                        label_btns[0].className += " active";
                    };
                    unset_btn.textContent = "Update";
                    letMake_btn.textContent = "Update";
                    delete_btn.setAttribute('index', index);
                    });
                };
            } else {
                works.child(0).set({// thiet lap mang
                    label: 'first',
                    name: 'first',
                });
            };
        });
        function loadData(setsList){
            //console.log('ahihi');
            
            let reset = document.getElementsByClassName('reset');
            //console.log(...reset);
            
            for(let i = 0; i < reset.length; i++) {
                reset[i].innerHTML = "";
            }
            for(let i = 0; i < setsList.length; i++) {
                let id = setsList[i].date;
                let worksContainer = document.getElementById('1'+id);
                if(worksContainer != null) {
                    // worksContainer.innerHTML = "";
                if(setsList[i].label == 0) {
                    worksContainer.insertAdjacentHTML('beforeend', `<li class = "blue setList" id="${setsList[i].id}" time="${setsList[i].startTime +'  → '+ setsList[i].endTime}">${setsList[i].name}</li>`);
                } else if(setsList[i].label == 1) {
                    worksContainer.insertAdjacentHTML('beforeend', `<li class = "yellow setList" id="${setsList[i].id}" time="${setsList[i].startTime +'  → '+ setsList[i].endTime}">${setsList[i].name}</li>`);
                } else if(setsList[i].label == 2) {
                    worksContainer.insertAdjacentHTML('beforeend', `<li class = "green setList" id="${setsList[i].id}" time="${setsList[i].startTime +'  → '+ setsList[i].endTime}">${setsList[i].name}</li>`);
                } else {
                    worksContainer.insertAdjacentHTML('beforeend', `<li class = "red setList" id="${setsList[i].id}" time="${setsList[i].startTime +'  → '+ setsList[i].endTime}">${setsList[i].name}</li>`);
                }
                loadCalendarTag();
                }
            };
            loadTodayCounterTab();
        }
        function checkFieldUnset() {
            if(work_name.value == "") {
                alert('Enter your work name');
            } else {
                console.log(work_name.value);
            }
            let label = 0;
            if(label_container[0].textContent == 'Dates') {
                label = 1;
            } else if(label_container[0].textContent == 'Routine') {
                label = 2;
            } else if(label_container[0].textContent == 'Deadline') {
                label = 3;
            } else {
                label = 0;
            }
            console.log(label);
            return label;
        };
        function checkFieldSet() {
            let date;
            let message = "";
            if(work_date.value == null|| start_time.value == null|| end_time == null) {
                alert('Please fill full in');
            } else {
                let startArr = start_time.value.split(':');
                let hours = parseInt(startArr[0]);
                let minutes = parseInt(startArr[1]);
                let dateArr = work_date.value.split('-');
                let month = parseInt(dateArr[1]);
                let day = parseInt(dateArr[2]);
                let year = parseInt(dateArr[0]);
                if(year < d.getFullYear()) {
                    message = 'Just set work for today or future! Reset your task date';
                } else {
                    if(year == d.getFullYear()) {
                        if(month < (d.getMonth() + 1)){
                            message = 'Just set work for today or future!  Reset your task date';
                        } else {
                            if(month == (d.getMonth()+1)) {
                                if(day < d.getDate()) {
                                    message = 'Just set work for today or future!  Reset your task date';
                                } else {
                                    if(day == d.getDate()) {
                                        if(hours < d.getHours()) {
                                            message = "Just set work for now or then!  Reset your task time - start time";
                                        } else {
                                            if(hours == d.getHours()) {
                                                if(minutes < d.getMinutes()) {
                                                    message = "Just set work for now or then! Reset your task time - start time";
                                                } else {
                                                    if(start_time.value >= end_time.value) {
                                                        message = "Start time must be smaller than end time! Reset yout task time - end time";
                                                    } else {
                                                        date = dateArr[0] +'-'+ month +'-'+ day;
                                                    }
                                                }
                                            } else {
                                                if(start_time.value >= end_time.value) {
                                                    message = "Start time must be smaller than end time";
                                                } else {
                                                    date = dateArr[0] +'-'+ month +'-'+ day;
                                                }
                                            }
                                        }
                                    } else {
                                        date = dateArr[0] +'-'+ month +'-'+ day;
                                    }
                                }
                            } else {
                                date = dateArr[0] +'-'+ month +'-'+ day;
                            }
                        }
                    } else {
                        date = dateArr[0] +'-'+ month +'-'+ day;
                    }
                }
                
                if(remind_btn.checked == true) {
                    remind_btn.value = true;
                };
            };
            if(date == undefined) {
                alert(message);
            } else {
                return date;
            }
        };
        const ref = firebase.database().ref(userId);
        ref.on('value', function(snapshot) {// hien thi username
            const username = document.getElementById('login_name');
            username.textContent = snapshot.val().username;
        });
        //log out
        logOut_btn.addEventListener('click', function() {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                window.location.assign('index.html');
                alert('Logging out succeed!');
              }).catch(function(error) {
                // An error happened.
                console.log(error);
                
              });
        });
        unset_btn.addEventListener('click', function() {
            let label = checkFieldUnset();
            works.once('value', function(snapshot) {
                if(snapshot.val() == null) {
                    console.log('no data!!!');
                } else {
                    console.log('have data!!!');
                    if(unset_btn.textContent == "Unset") {// them Unset
                        works.child(snapshot.val().length).set({
                            label: label,
                            name: work_name.value,
                        });
                        work_name.value = "";
                        // alert('Adding unset work succeed!');
                    } else { // update unset
                        let upIndex = delete_btn.getAttribute('index');
                        works.child(upIndex).set({
                            label: label,
                            name: work_name.value,
                        });
                        delete_btn.setAttribute('index', '');

                        task_panel.style.display = "none";
                    };
                };
            });
        });

        letMake_btn.addEventListener('click', function() {
            let label = checkFieldUnset();
            let date = checkFieldSet();
            if(date != undefined) {
                works.once('value', function(snapshot) {
                    if(snapshot.val() == null) {
                        console.log('no data!!!');
                        
                    } else {
                        console.log('have data!!!');
                        
                        if(letMake_btn.textContent == "Let's make") {//them set
                            works.child(snapshot.val().length).set({
                                label: label,
                                name: work_name.value,
                                date: date, 
                                startTime: start_time.value,
                                endTime: end_time.value,
                                remind: remind_btn.value,
                            });
                            work_name.value = "";
                            work_date.value = setDate;
                            start_time.value = time;
                            end_time.value = time1;
                            // alert('Adding work succeed!');
                        } else {//update set
                            let upIndex = delete_btn.getAttribute('index');
                            works.child(upIndex).set({
                                label: label,
                                name: work_name.value,
                                date: date,
                                startTime: start_time.value,
                                endTime: end_time.value,
                                remind: remind_btn.value,
                            });
                            // alert('Updating work succeed!');
                            delete_btn.setAttribute('index', '');
                            task_panel.style.display = "none";
                            document.querySelector('.bg_detailtasks_tab').style.display = 'none';
                        };
                    };
                });
            };
        });
        delete_btn.addEventListener('click', function() {
            let delIndex = delete_btn.getAttribute('index');
            console.log(delIndex);
            var r = confirm('Are you sure to delete this work?');
            if(r == true) {
                works.child(delIndex).set(null);
                alert('Deleting succeed!');
                task_panel.style.display = "none";
                console.log('close oke');
                document.querySelector('.bg_detailtasks_tab').style.display = 'none';
            };
        });
        //feed back
        feedBack_btn.addEventListener('click', function() {
            ref.child('feedbacks').push(feedback.value);
            console.log("feedbacks");
            feedback.value = "";
            document.querySelector('.modal-feedback').style.display = 'none';
            alert('Your feedback has been sent, have a good day ❤');

            
        });
                // set button
    // let task_panel_content_holder = document.getElementById("task_panel_content_holder")
    // let task_panel_content = document.getElementById("task_panel_content")
    let enable = document.getElementById("enable");
    let set_btn = document.getElementById("set_btn");
    set_btn.addEventListener("click",()=>{
        console.log(enable.style.display);
        unset_btn.style.display = "none";
        set_btn.style.width = "100%";
        work_date.value = setDate;
        start_time.value = time;
        end_time.value = time1;
        if(enable.style.display == "none"){
            enable.style.display = "flex";

        } else {
            unset_btn.style.display = "flex";
            set_btn.style.width = "47%";
            enable.style.display = "none";
            
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







    document.getElementById('close').addEventListener('click', function () {
        console.log("closewhat");
        
        document.querySelector('.bg_detailtasks_tab').style.display = 'none';
    });
    //feedback
    document.getElementById("feedback").addEventListener('click', () => {          
        document.querySelector('.modal-feedback').style.display = 'flex';
    });
    document.querySelector('.mf-content .close').addEventListener('click', () => {
        document.querySelector('.modal-feedback').style.display = 'none';
    })


    // setting

    document.getElementById("setting").addEventListener('click', () => {          
        document.querySelector('.modal-setting').style.display = 'flex';
    });
    document.querySelector('.ms-content .close').addEventListener('click', () => {
        document.querySelector('.modal-setting').style.display = 'none';
    })

    // about us
    document.getElementById("aboutus").addEventListener('click', () => {          
        document.querySelector('.modal-aboutus').style.display = 'flex';
    });
    document.querySelector('.ma-content .close').addEventListener('click', () => {
        document.querySelector('.modal-aboutus').style.display = 'none';
    });

    //set time and date
    setInterval(() => {
        var dt = new Date();
        let newdate = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
        let today_full_1 = document.getElementById("today_full_1");
        today_full_1.textContent = newdate;
    
        var hclock = dt.getHours();
        var mclock = dt.getMinutes();
        var sclock = dt.getSeconds();
        var session = 'AM';
        if (hclock == 0) {
            hclock = 12;
        }
        if (hclock > 12) {
            hclock = hclock - 
            12;
            session = 'PM';
        }
        hclock = (hclock < 10) ? '0' + hclock : hclock;
        mclock = (mclock < 10) ? '0' + mclock : mclock;
        sclock = (sclock < 10) ? '0' + sclock : sclock;
        let time = hclock + ":" + mclock + ":" + sclock + " " + session;
        let today_full_2 = document.getElementById("today_full_2");
        today_full_2.textContent = time;
    
    
    }, 1000);
        
    var dt = new Date();
    let newdate =  dt.getDate()  + "-" + (dt.getMonth() + 1) + "-" +  dt.getFullYear();
    let today_full_1=  document.getElementById("today_full_1") ;
    today_full_1.textContent = newdate;
    tmp3 = `${month_name[monthPointer]}`+ " " + `${dt.getDate()}` +" " + `${yearPointer}`
    console.log(tmp3) 
    var tmp2 = new Date(tmp3);
    console.log(tmp2.getDay());
    dayArr = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    document.getElementById("today").innerHTML = dayArr[tmp2.getDay()];


    //setting
    let setting = document.getElementById("setting");
        setting.addEventListener('click', ()=> {
        window.location.href = 'setting.html';
    });

    //weather
    let weather = [
        {
            day: '19',
            month: '11',
            year: '2019',
            temperature: '22°C',
            status: 'Partly Cloudy',
            img: '../assets/partly_cloudy.png',
        },
        {
            day: '20',
            month: '11',
            year: '2019',
            temperature: '23°C',
            status: 'Partly Cloudy',
            img: '../assets/partly_cloudy.png',
        },
        {
            day: '21',
            month: '11',
            year: '2019',
            temperature: '25°C',
            status: 'Sunnny',
            img: '../assets/sunny.png',
        },
        {
            day: '22',
            month: '11',
            year: '2019',
            temperature: '26°C',
            status: 'Sunny',
            img: '../assets/sunny.png',
        },
        {
            day: '23',
            month: '11',
            year: '2019',
            temperature: '27°C',
            status: 'Partly Cloudy',
            img: '../assets/partly_cloudy.png',
        },
        {
            day: '24',
            month: '11',
            year: '2019',
            temperature: '27°C',
            status: 'Partly Cloudy',
            img: '../assets/partly_cloudy.png',
        },
        {
            day: '25',
            month: '11',
            year: '2019',
            temperature: '26°C',
            status: 'Rain',
            img: '../assets/rain.png',
        },
        {
            day: '26',
            month: '11',
            year: '2019',
            temperature: '30°C',
            status: 'Partly Cloudy',
            img: '../assets/partly_cloudy.png',
        },
        {
            day: '27',
            month: '11',
            year: '2019',
            temperature: '31°C',
            status: 'Partly Cloudy',
            img: '../assets/partly_cloudy.png',
        },
        {
            day: '28',
            month: '11',
            year: '2019',
            temperature: '25°C',
            status: 'Rain',
            img: '../assets/rain.png'
        },
    ]
    //console.log(weather);
    let today_temp = document.getElementById("today_temp").innerHTML;
    let tomor_temp = document.getElementById("tomorrow_temp").innerHTML;
    let nextday_temp = document.getElementById("nextday_temp").innerHTML;
    for(let i = 0; i < weather.length; i++){
        if(weather[i].day == dt.getDate()){//today
            today_temp = weather[i].temperature;
            document.getElementById("today_temp").innerHTML = today_temp;
            document.getElementById("today_icon").src= weather[i].img;
        }
        if(weather[i].day == dt.getDate()+1){//tomorrow
            tomor_temp = weather[i].temperature;
            document.getElementById("tomorrow_temp").innerHTML = tomor_temp;
            document.getElementById("tomor_icon").src= weather[i].img;
        }
        if(weather[i].day == dt.getDate()+2){//next day
            nextday_temp = weather[i].temperature;
            document.getElementById("nextday_temp").innerHTML = nextday_temp;
            document.getElementById("nextday_icon").src= weather[i].img;
        }
    }
    //remind
    function remind() {
        for (let i = 0; i < weather.length; i++) {
            if(weather[i].day == dt.getDate()) {
                if (weather[i].status == 'Partly Cloudy') {
                    document.getElementById("a_rectangle").innerHTML = "Today is a beautiful day. Enjoy your day!";
                } else if (weather[i].status == 'Sunny') {
                    document.getElementById("a_rectangle").innerHTML = "It's sunny today </br> Take care for your health </br> 👓☀️⛱️";
                } else if (weather[i].status == 'Rain') {
                    document.getElementById("a_rectangle").innerHTML = "It will rain today. Take an umbrella with you when you go out for a complete working day. </br> ☂️🌧️☔";
                }
            }
        }
        // Today is a beautiful day. Enjoy your day!
        // It will rain today. Take an umbrella with you when you go out for a complete working day. </br> ☂️🌧️☔
        // It's sunny today </br> Take care for your health <br> 👓☀️⛱️
    }
    remind();
    } else {
        window.location.assign('index.html');
    }

  });