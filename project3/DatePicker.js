'use strict'

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
        dateTime.colSpan = 5;
        head.appendChild(dateTime);

        const rightArrowKey = document.createElement('td');
        const rightArrow = document.createTextNode('>');
        rightArrowKey.appendChild(rightArrow);
        rightArrowKey.style.textAlign = 'center';
        rightArrowKey.setAttribute('id', 'rightArrow');
        head.appendChild(rightArrowKey);

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
            row.appendChild(cell);

            cell.style.textAlign = 'center';
        }

        return row;
    }

    createDay(date) {

    }
}