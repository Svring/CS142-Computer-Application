'use strict'

class DataPicker {
    constructor(id, func) {
        this.id = id;
        this.func = func;
    }

    render(date) {
        const parent = document.getElementById(id);
        parent.appendChild(this.creatTable(date));
    }

    creatTable(date) {

    }
}