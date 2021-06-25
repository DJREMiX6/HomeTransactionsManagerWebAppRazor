import { Transaction } from "./transaction/transaction.js";
export class CalendarTransactionData {
    getContent(date) {
        let returnString = "";
        let summedTransactions = new Array();
        for (let transaction of this._transactions) {
            let found = false;
            for (let searchingTransaction of summedTransactions) {
                if (searchingTransaction.Person == transaction.Person) {
                    searchingTransaction.Amount += transaction.Amount;
                    found = true;
                }
            }
            if (!found) {
                summedTransactions.push(Transaction.deepCopy(transaction));
            }
        }
        for (let transaction of summedTransactions) {
            returnString += transaction.Person + " : " + transaction.Amount;
        }
        returnString = returnString.substr(0, returnString.length - 1);
        return returnString;
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
