class RoutEncrypt {
    constructor(text) {
        this.text = text;
        this.tableParameter = Math.round(Math.sqrt(this.text.length));
        this.fText = this.formatText();
        this.table = this.createTable();
        this.encrypt = this.rout();
    }

    formatText() {
        let formatText = '';
        formatText += this.text;
        while (!(formatText.length % this.tableParameter == 0)) {
            formatText += '*';
        }
        return formatText
    }

    createTable() {
        let sliceList = [];
        let move = 0;
        for (let i=0; i<=this.tableParameter; i++) {  
            let elem = this.fText.slice(0 + move, this.tableParameter + move).split('');
            sliceList.push(elem);
            move += this.tableParameter;
        }
        if (sliceList[sliceList.length-1].length == 0) {
            let delElem = sliceList.pop();
        }
        return sliceList;
    }
    rout() {
        let encryptWord = '';
        for (let i=0; i<=this.table[0].length-1; i++) {
            for (let row of this.table) {
                encryptWord += row[i];
            }
        }
        return encryptWord;
    }
}

window.RoutEncrypt = RoutEncrypt;

