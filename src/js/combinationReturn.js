function combinationReturn() {
    document.getElementById('table').hidden = false;
    const text = document.getElementById('input-text').value;
    const key = document.getElementById('input-key').value;
    const lang = 'rus'; 
    let routEncrpyt = new window.RoutEncrypt(text);
    let crypt = new window.VijenerEncrypt(routEncrpyt.encrypt, key, lang);
    let rout = document.getElementById('first-table');
    let vijener = document.getElementById('second-table');
    let table = document.createElement('table');
    let tableBack = document.createElement('div');
    let back = document.createElement('div');
    let table2 = document.createElement('table');
   
    back.id = 'table-back';
    table2.id = 'vijener-table';
    tableBack.id = 'table-back';

    for (let row of routEncrpyt.table) {
        let tr = table.insertRow();
        for (let i of row) {
            let td = tr.insertCell();
            td.id = 'table-elem';
            td.innerHTML = i;
        }
    }

    let rowIndex = table2.insertRow();
    let rowAlph = table2.insertRow();
    let rowKeyIndex = table2.insertRow();
    let rowKey = table2.insertRow();
    
    let textIndex = [];
    let keyIndex = [];

    for (let i=0; i<crypt.alph.length; i++) {
        let elemIndex = rowIndex.insertCell();
        let elemAlph = rowAlph.insertCell();
        let elemIndexKey = rowKeyIndex.insertCell();
        let elemKey = rowKey.insertCell();
        
        elemAlph.id = elemIndex.id = elemIndexKey.id = elemKey.id = 'table-elem';
        
        elemIndex.innerHTML = i;
        elemAlph.innerHTML = crypt.alph[i];
        elemIndexKey.innerHTML = crypt.alph.indexOf(crypt.normalKey[i]);
        elemKey.innerHTML = crypt.normalKey[i];
    }
    back.appendChild(table2); 
    vijener.appendChild(back);

    let word = '';
    for (let i=0; i<crypt.text.length; i++) {
        const indexKey = crypt.normalKeyIndex[i];
        const indexText = crypt.alph.indexOf(crypt.text[i]);
        const form = toEncryptForm(indexText, indexKey, crypt.alph);
        let textElem = document.createElement('p');
        textElem.innerText = `${form[1]} --> ${crypt.alph[form[0]]}`;
        word += crypt.alph[form[0]];
        vijener.appendChild(textElem);
    }
    let el5 = document.createElement('p');
    el5.innerText = 'Получаем наше зашифрованное сообщение. Для дешифрования проводим операции в обратном порядке:'
    vijener.appendChild(el5);
    
    let el6 = document.createElement('p');
    

    let returnWord = document.createElement('p');
    returnWord.innerText = `Результат ---> ${word}`;
    vijener.appendChild(returnWord); 

    let decryptWord = '';
    for (let i=0; i<crypt.text.length; i++) {
        const indexKey = crypt.normalKeyIndex[i];
        const indexText = crypt.alph.indexOf(word[i]);
        const form = toDecryptForm(indexText, indexKey, crypt.alph);
        let textElem = document.createElement('p');
        textElem.innerText = `${form[1]} --> ${crypt.alph[form[0]]}`;
        decryptWord += crypt.alph[form[0]];
        vijener.appendChild(textElem);
    }

    let el7 = document.createElement('p');
    el7.innerText = `Результат ---> ${decryptWord}`
    vijener.appendChild(el7);

    let el8 = document.createElement('p');
    el8.innerText = `Проход по таблице вернет результат ---> ${routEncrpyt.fText}`
    vijener.appendChild(el8);

    
    tableBack.appendChild(table);
    rout.appendChild(tableBack);
    let p = document.createElement('p');
    p.textContent = `Итоговый шифр ---> ${routEncrpyt.encrypt}`;
    p.id = 'text';
    answer.appendChild(p);


    let lockButton = document.getElementById('input-button');
    lockButton.disabled = true;
    lockButton.id = 'input-button-lock';
}

function toEncryptForm(elem1, elem2, alph) {
    const divider = alph.length-1;
    const modValue = (elem1+elem2)%(divider);
    const modForm = `(${elem1} + ${elem2}) mod ${divider} = ${modValue}`;
    return [modValue, modForm];
}

function toDecryptForm(elem1, elem2, alph) {
    const divider = alph.length-1;
    const val = elem1 - elem2;
    const result = val % divider;
    let modValue;
    console.log(result)
    if (result <= 0) {
        modValue = result + divider;
    } else {
        modValue = result;
    }

    const modForm = `(${elem1} - ${elem2}) mod ${divider} = ${modValue}`;
    return [modValue, modForm];
}