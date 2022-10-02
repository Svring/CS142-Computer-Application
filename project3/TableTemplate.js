'use strict'

class TableTemplate {
    static fillIn(id, dictionary, columnName) {
        //First step: Get the table and the first row of it
        const table = document.getElementById(id);
        const row = table.querySelectorAll('tr')[0];

        //light up the table
        table.style.visibility = 'visible';

        //process the first row with template
        const cellOfRow = row.querySelectorAll('td');
        
        for (let i = 0; i < cellOfRow.length; i++) {
            let innerText = cellOfRow[i].innerHTML;
            const template = new Cs142TemplateProcessor(innerText);
            cellOfRow[i].innerHTML = template.fillIn(dictionary);
        }

        //process exact columns of table, using columnName

        //when columnName is undefined, process the entire table
        if (typeof columnName === 'undefined') {
            const contentOfTable = table.querySelectorAll('td');
            for (let i = 0; i < contentOfTable.length; i++) {
                let innerText = contentOfTable[i].innerHTML;
                const template = new Cs142TemplateProcessor(innerText);
                contentOfTable[i].innerHTML = template.fillIn(dictionary);
            }
        }

        //when columnName is set, process the corresponding column
        let flag = -1;
        //locate the target column
        for (let i = 0; i < cellOfRow.length; i++) {
            const innerText = cellOfRow[i].innerHTML;
            if (innerText === columnName) {
                flag = i;
                break;
            }
        }

        //columnName is not set, program return
        if (flag === -1) {
            return;
        }

        //process every flagth item of each row
        const rows = table.querySelectorAll('tr');
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const cells = row.querySelectorAll('td');
            const cell = cells[flag];
            let text = new Cs142TemplateProcessor(cell.innerHTML);
            cell.innerHTML = text.fillIn(dictionary);
        }
    }
}