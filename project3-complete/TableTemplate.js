'use strick'

class TableTemplate {
    static fillIn(id, dict, columnName) {
        let table = document.getElementById(id);
        let rows = table.rows;
        let header = rows.item(0);
        let proc = new Cs142TemplateProcessor(header.innerHTML);
        let newHeader = proc.fillIn(dict);
        header.innerHTML = newHeader;

        let cols = [];
        if (columnName === undefined) {
            cols = Array.from(Array(header.cells.length).keys())
        } else {
            for (let i = 0; i < header.cells.length; ++ i) {
                if (header.cells[i].innerHTML === columnName) {
                    cols = [i];
                }
            }
        }

        for (let i = 1; i < table.rows.length; ++ i) {
            let row = table.rows[i];
            for (let j = 0; j < cols.length; ++ j) {
                let cell = row.cells[cols[j]];
                let proc = new Cs142TemplateProcessor(cell.innerHTML);
                cell.innerHTML = proc.fillIn(dict);
            }
        }

        if (table.style.visibility === 'hidden') {
            table.style.visibility = 'visible';
        }
    }
}