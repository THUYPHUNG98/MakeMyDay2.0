
    var d = new Date();
    var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December']
    var  month = d.getMonth(); // 0-11
    var year = d.getFullYear(); // 2019
    var first_date = month_name[month] + " " + "1" + " " + year;
    console.log(first_date);
    // November 1 2019
    
    var tmp = new Date(first_date);
    // có thẻ truyền vào new Date() một string theo dạng "Tháng Ngày năm" --trả ra cả thứ cũng có thể truyền vào dưới dạng (year,month,day) 
    var day_no = tmp.getDay();
    console.log(day_no);
    var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var days = new Date(year, month + 1 ,0) // ra ngày cuối cùng 
    console.log(days)
    // sẽ trả ra Sat Sep 30 2019...