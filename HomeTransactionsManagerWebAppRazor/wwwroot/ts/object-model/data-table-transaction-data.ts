import { DataTableDataAdapter } from "./data-table/data-table-data-adapter.js";
import { Transaction } from "./transaction/transaction.js";

export class DataTableTransactionData implements DataTableDataAdapter {
    private _transactions: Transaction[];

    public getContent(index: number, dataName: string): string | number | boolean {
        if(this._transactions[index][dataName] instanceof Date) {
            let day: number = this._transactions[index]["Date"].getDate();
            let month: number = this._transactions[index]["Date"].getMonth();
            let year: number = this._transactions[index]["Date"].getFullYear();
            let hour: number = this._transactions[index]["Date"].getHours();
            let minute: number = this._transactions[index]["Date"].getMinutes();
            let second: number = this._transactions[index]["Date"].getSeconds();

            return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
        }
        return this._transactions[index][dataName].toString();
    }

    public setJsonData(jsonData: {Data: {Id: number, Amount: number,  Person: string, Date: string}[]}): void {
        if(jsonData != null || jsonData != undefined || jsonData.Data != null || jsonData.Data != undefined || jsonData.Data.length != 0) {
            this._transactions = new Array();
            jsonData.Data.forEach(obj => {
                this._transactions.push(Transaction.parseTransaction(obj));
            })
        }
    }

    public getCount(): number {
        return this._transactions.length;
    }
}
