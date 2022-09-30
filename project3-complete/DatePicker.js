'use strick';

class DatePicker {
    constructor(id, callback) {
        this.id = id;
        this.callback = callback;
    }

    render(date) {
        // create calender and add it to id div.
        var parent = document.getElementById(this.id);
        parent.appendChild(this._createCalender(date));
    }

    _createCalender(date) {
        // 1. create a table add it to the document.
        var table = document.createElement("table");
        // table.style.border = "dotted black";
        
        // 2. create table's header. 
        var header = this._createCalenderHeader(table, date);
 
        // 3. add days of week on the second row
        var daysOfWeek = ["Sun", "Mon","Tues","Wed","Thur","Fri","Sat"];
        var rowWeek = header.insertRow(1);
        for (var i = 0; i < 7; ++ i) {
            var cell = rowWeek.insertCell(i);
            cell.innerHTML = daysOfWeek[i];
        }
        
        // 4. set normal days.
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var curDate = new Date(firstDay.getTime());
        curDate.setDate(-firstDay.getDay() + 1);
        //console.log(curDate.getDate());
        var rowIndex = 2;
        while (true) {
            var row = table.insertRow(rowIndex);
            rowIndex = rowIndex + 1;
            
            for (var i = 0; i < 7; ++ i) {
                var cell = row.insertCell(i);
                cell.innerHTML = curDate.getDate();

                if (curDate.getMonth() === date.getMonth()) {
                    cell.setAttribute("id", "CurMonth");
                        let ob = {
                            month: curDate.getMonth() + 1,
                            day: cell.innerHTML,
                            year: curDate.getFullYear()
                        };
                    cell.addEventListener("click", () => {
                        this.callback(this.id, ob);
                    });
                } else {
                    cell.setAttribute("id", "OtherMonth");
                }

                curDate.setDate(curDate.getDate() + 1);
            }

            // exit the loop
            if (curDate.getMonth() != date.getMonth()) {
                break;
            }
        }
        return table;
    }

    /*  create header: "<  January   >" */
    _createCalenderHeader(table, date) {
        var header = table.createTHead();
        var headerRow = header.insertRow(0);

        var leftArrowCell = headerRow.insertCell(0);
        leftArrowCell.innerHTML = "<";
        leftArrowCell.setAttribute("id", "LeftArrow");
        
        var monthCell = headerRow.insertCell(1);
        var months = ["January", "February","March", "April","May", "June", "July", "August", "September",
        "October","November","December"];
        monthCell.innerHTML = months[date.getMonth()] + "   " + date.getFullYear();
        monthCell.colSpan = "5";

        var rightArrowCell = headerRow.insertCell(2);
        rightArrowCell.innerHTML = ">";
        rightArrowCell.setAttribute("id", "RightArrow");

        // event handler.
        leftArrowCell.addEventListener("click", () => {
            table.remove();
            date.setMonth(date.getMonth() - 1);
            console.log(date);
            this.render(date);
        });

        rightArrowCell.addEventListener("click", () => {
            table.remove();
            date.setMonth(date.getMonth() + 1);
            console.log(date);
            this.render(date);
        });

        return header;
    }
};

