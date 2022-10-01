'use strict'

// For anyone who unfortunately open this file.
// Before you step into such a trash mountain and face your doom, 
// please make sure you're tough enough to handle this, 
// I'm such a sinner for bringing such kind of shit into human world.
// (Though it looks working nicely, do not trust it)

class DatePicker {
    constructor(id, func) {
        this.id = id;
        this.func = func;
    }

    render(date) {
        const parent = document.getElementById(this.id);
        const table = this.createTable(date);
        parent.appendChild(table);
    }

    createTable(date) {
        const tab = document.createElement('table');
        const tabody = document.createElement('tbody');

        tabody.appendChild(this.createHead(date));
        tabody.appendChild(this.createWeek());
        const days = this.createDay(date);
        for (let i = 0; i < days.length; i++) {
            tabody.appendChild(days[i]);
        }

        tab.appendChild(tabody);

        tab.setAttribute('border', 1);
        tab.setAttribute('width', '100%');
        tab.setAttribute('height', '100%');

        return tab;
    }

    createHead(date) {
        const head = document.createElement('tr');

        const leftArrowKey = document.createElement('td');
        const leftArrow = document.createTextNode('<');
        leftArrowKey.appendChild(leftArrow);
        leftArrowKey.style.textAlign = 'center';
        leftArrowKey.style.color = 'White';
        leftArrowKey.style.backgroundColor = 'Black';
        leftArrowKey.setAttribute('id', 'leftArrow');
        head.appendChild(leftArrowKey);

        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
        ]

        const dateTime = document.createElement('td');
        const dateTimeText = document.createTextNode(
            months[date.getMonth()] + ', ' + date.getFullYear()
        );
        dateTime.appendChild(dateTimeText);
        dateTime.style.textAlign = 'center';
        dateTime.style.backgroundColor = 'Pink';
        dateTime.style.color = 'White';
        dateTime.colSpan = 5;
        head.appendChild(dateTime);

        const rightArrowKey = document.createElement('td');
        const rightArrow = document.createTextNode('>');
        rightArrowKey.appendChild(rightArrow);
        rightArrowKey.style.textAlign = 'center';
        rightArrowKey.style.color = 'White';
        rightArrowKey.style.backgroundColor = 'Black';
        rightArrowKey.setAttribute('id', 'rightArrow');
        head.appendChild(rightArrowKey);

        leftArrowKey.addEventListener

        return head;
    }

    createWeek() {
        const row = document.createElement('tr');
        const week = [
            'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
        ];

        for (let i = 0; i < 7; i++) {
            const cell = document.createElement('td');
            const text = document.createTextNode(week[i]);

            cell.appendChild(text);
            cell.style.backgroundColor = 'Maroon'
            cell.style.color = 'White';
            row.appendChild(cell);

            cell.style.textAlign = 'center';
        }

        return row;
    }

    //Actually, next part is the root of all guilt

    createDay(date) {
        const tbody = [];
        const limit = this.getCountDays(date);
        let totalRow = this.judgeRow(date);

        let day = 1;
        date.setDate(1);
        const start = date.getDay();

        const lastMonth = this.getLastMonth(date);
        let lastMonthStart = lastMonth - start + 1;
        let nextStart = 1;

        for (let i = 0; i < totalRow; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                let cell = document.createElement('td');

                if (i == 0 && j < start) {
                    let text = document.createTextNode(lastMonthStart);
                    cell.appendChild(text);
                    cell.style.backgroundColor = 'Coral';
                    lastMonthStart++;
                } else if ((i == totalRow - 1) && day > limit) {
                    let text = document.createTextNode(nextStart);
                    cell.appendChild(text);
                    cell.style.backgroundColor = 'Coral';
                    nextStart++;
                } else {
                    let text = document.createTextNode(day.toString());
                    cell.appendChild(text);
                    cell.style.backgroundColor = 'cyan';
                    day++;
                }
                
                cell.style.textAlign = 'center';
                row.appendChild(cell);
            }

            tbody.push(row);
        }

        return tbody;
    }

    judgeRow(date) {
        date.setDate(1);
        let start = date.getDay();
        let sum = this.getCountDays(date);
        let totalCell = start + sum;
        let a = totalCell / 7;
        let totalRow = a;
        if (a > Math.round(a)) {
            totalRow++;
        }
        return Math.round(totalRow);
    }

    getCountDays(date) {
        var curMonth = date.getMonth();
        date.setMonth(curMonth + 1);
        date.setDate(0);
        return date.getDate();
    }

    getLastMonth(date) {
        date.setDate(0);
        return date.getDate();
    }
}