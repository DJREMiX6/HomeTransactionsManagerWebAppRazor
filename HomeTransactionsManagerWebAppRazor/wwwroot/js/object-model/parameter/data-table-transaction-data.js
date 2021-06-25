import { Transaction } from "../transaction/transaction.js";
export class DataTableTransactionData {
    getContent(index, dataName) {
        if (this._transactions[index][dataName] instanceof Date) {
            let day = this._transactions[index]["Date"].getDate();
            let month = this._transactions[index]["Date"].getMonth();
            let year = this._transactions[index]["Date"].getFullYear();
            let hour = this._transactions[index]["Date"].getHours();
            let minute = this._transactions[index]["Date"].getMinutes();
            let second = this._transactions[index]["Date"].getSeconds();
            return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
        }
        return this._transactions[index][dataName].toString();
    }
    setJsonData(jsonData) {
        if (jsonData != null || jsonData != undefined || jsonData.Data != null || jsonData.Data != undefined || jsonData.Data.length != 0) {
            this._transactions = new Array();
            jsonData.Data.forEach(obj => {
                this._transactions.push(Transaction.parseTransaction(obj));
            });
        }
    }
    getCount() {
        return this._transactions.length;
    }
}
