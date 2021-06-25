import { Transaction } from "./transaction.js";
import { Parameter } from "../parameter/parameter.js";

export class TransactionsManager {
    //VARS
    private _url: string;

    constructor(url: string) {
        this._url = url;
    }


    public async getTransactions(callback: (transactons: Transaction[]) => any, parameters?: Parameter[]) {
        let paramString = "";

        if(parameters) {
            paramString = "?";
            for (let p of parameters) {
                paramString += p.getName() + "=" + p.getValue() + "&";
            }
            paramString = paramString.substring(0, paramString.length);
        }

        let url = this._url + paramString;
        $.get(url, function (data) {
            let transactions: Transaction[] = new Array();
            data["data"].forEach((element: {"Id": number, "Date": string, "Amount": number, "Person": string}) => {
                transactions.push(Transaction.parseTransaction(element))
            });
            callback(transactions);
        });
    }
}