﻿export class Transaction {
    //VARS
    public Id: number;
    public Date: Date;
    public Amount: number;
    public Person: string;
    [index: string]: string | number | Date;

    constructor(id: number, date: Date, amount: number, person: string) {
        this.Id = id;
        this.Date = date;
        this.Amount = amount;
        this.Person = person;
    }

    /*
    public getId(): number {
        return this._id;
    }

    public getDate(): Date {
        return this._date;
    }

    public getAmount(): number {
        return this._amount;
    } 

    public getPerson(): string {
        return this._person;
    }

    public setId(id: number): void {
        this._id = id;
    }

    public setDate(date: Date): void {
        this._date = date;
    }

    public setAmount(amount: number): void {
        this._amount = amount;
    }

    public setPerson(person: string): void {
        this._person = person;
    }
    */

    static parseTransaction(data: {"Id": number, "Date": string, "Amount": number, "Person": string}) : Transaction {
        return new Transaction(data.Id, new Date(data.Date), data.Amount, data.Person);
    }

    static deepCopy(transaction: Transaction): Transaction {
        return this.parseTransaction({Id : transaction.Id, Date : transaction.Date.toString(), Amount : transaction.Amount, Person : transaction.Person});
    }
}