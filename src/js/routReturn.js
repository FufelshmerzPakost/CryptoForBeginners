function routEncryptReturn() {
    document.getElementsByClassName('hide')[0].hidden = false;
    let text = document.getElementById('input-text').value;
    let routEncrpyt = new window.RoutEncrypt(text);
    let answer = document.getElementById('answer');
    let table = document.createElement('table');
    let elem = document.getElementById('table');
    let tableBack = document.createElement('div');
    
    tableBack.id = 'table-back';

    for (let row of routEncrpyt.table) {
        let tr = table.insertRow();
        for (let i of row) {
            let td = tr.insertCell();
            td.id = 'table-elem';
            td.innerHTML = i;
        }
    }

    tableBack.appendChild(table);
    elem.appendChild(tableBack);
    let p = document.createElement('p');
    p.textContent = `Итоговый шифр ---> ${routEncrpyt.encrypt}`;
    p.id = 'text';
    answer.appendChild(p);


    let lockButton = document.getElementById('input-button');
    lockButton.disabled = true;
    lockButton.id = 'input-button-lock';
}