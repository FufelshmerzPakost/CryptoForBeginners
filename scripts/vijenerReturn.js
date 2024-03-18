
function vijenerTableReturn() {
    document.getElementById('hide-answer').hidden = false;
    
    const text = document.getElementById("input-text").value;
    const key = document.getElementById("input-key").value;
    const lang = 'eng'; 
    const crypt = new window.VijenerEncrypt(text, key, lang);
    const firstForm = document.getElementById('first-table');
    const secondForm = document.getElementById('math');
    let back = document.createElement('div');
    let table = document.createElement('table');
   
    back.id = 'table-back';
    
    
    let rowIndex = table.insertRow();
    let rowAlph = table.insertRow();
    let rowKeyIndex = table.insertRow();
    let rowKey = table.insertRow();
    
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
    back.appendChild(table); 
    firstForm.appendChild(back);

    let word = '';
    for (let i=0; i<crypt.text.length; i++) {
        const indexKey = crypt.normalKeyIndex[i];
        const indexText = crypt.alph.indexOf(crypt.text[i]);
        const form = toEncryptForm(indexText, indexKey, crypt.alph);
        let textElem = document.createElement('p');
        textElem.innerText = `${form[1]} --> ${crypt.alph[form[0]]}`;
        word += crypt.alph[form[0]];
        secondForm.appendChild(textElem);
    }
    let el5 = document.createElement('p');
    el5.innerText = '5. Получаем ответ.'
    secondForm.appendChild(el5);

    let returnWord = document.createElement('p');
    returnWord.innerText = `Результат ---> ${word}`;
    secondForm.appendChild(returnWord); 

    let el6 = document.createElement('p');
    el6.innerText = '6. Для расшифровки нам понадобиться наша комбинация и ключ. Подразумевается что получатель знает перемешанный алфавит. Действия аналогичные, за исключением того, что вместо операции "+" мы используем "-".';
    secondForm.appendChild(el6);

    let decryptWord = '';
    for (let i=0; i<crypt.text.length; i++) {
        const indexKey = crypt.normalKeyIndex[i];
        const indexText = crypt.alph.indexOf(word[i]);
        const form = toDecryptForm(indexText, indexKey, crypt.alph);
        let textElem = document.createElement('p');
        textElem.innerText = `${form[1]} --> ${crypt.alph[form[0]]}`;
        decryptWord += crypt.alph[form[0]];
        secondForm.appendChild(textElem);
    }

    let el7 = document.createElement('p');
    el7.innerText = `Результат ---> ${decryptWord}`
    secondForm.appendChild(el7);

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
    let modValue;
    if ((elem1-elem2)%(divider) < 0) {
        modValue = (elem1-elem2)%(divider) + divider;
    } else {
        modValue = (elem1-elem2)%(divider);
    } 
    const modForm = `(${elem1} - ${elem2}) mod ${divider} = ${modValue}`;
    return [modValue, modForm];
}

