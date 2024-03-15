class VijenerEncrypt {
    constructor(text, key, lang) {
        this.text = text;
        this.key = key;
        this.lang = lang;
        this.alph = this.alphabet().split('');
        this.normalKey = this.normalKeyReturn();
        this.normalKeyIndex = this.normalKeyIndexReturn();
        this.saveIndex = []; 
        this.mixAlphabetReturn();

    }

    alphabet() {
        const rusLang = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
        const engLang = 'abcdefghijklmnopqrstuvwxyz';
        const alphabet = (this.lang == 'rus') ? rusLang : engLang;
        return alphabet;
    }

    normalKeyReturn() {
        let normKey = '';
        while (normKey.length < this.alph.length) {
            for (let i of this.key){
                if (normKey.length == this.alph.length) {
                    break;
                }
                normKey += i;
                
            }
        }
        return normKey;
    }

    normalKeyIndexReturn() {
        let index = [];
        for (let i of this.normalKey) {
            index.push(this.alph.indexOf(i))
        }
        return index;
    }

    randomIndex() {
        const value = Math.round(Math.random() * (this.alph.length - 1));
    return value;
    }

    mixAlphabetReturn() {
        let jndex, temp;
        const alphLength = this.alph.length;
        for (let index=0; index<alphLength; index++) {
            jndex = this.randomIndex();
            temp = this.alph[jndex];
            this.alph[jndex] = this.alph[index];
            this.alph[index] = temp;
        }
    }
}

window.VijenerEncrypt = VijenerEncrypt;