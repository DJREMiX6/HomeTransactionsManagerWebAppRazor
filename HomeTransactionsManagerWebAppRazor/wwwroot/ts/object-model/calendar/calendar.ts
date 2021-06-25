import { CalendarDateChangedListener, CalendarDayChangedListener } from "./calendar-event-listeners.js";
import { MONTHS, WEEKDAYS } from "./constants.js";

export class Calendar {
    private _calendarContainer: JQuery<HTMLDivElement>;
    private _date: Date;
    private _calendarDaysCells: JQuery<HTMLDivElement>[][];
    private _nextMonthButton: JQuery<HTMLButtonElement>;
    private _previousMonthButton: JQuery<HTMLButtonElement>;
    private _monthLabel: JQuery<HTMLLabelElement>;
    private _yearLabel: JQuery<HTMLLabelElement>;
    private _calendarDayChangedListeners: CalendarDayChangedListener[];
    private _calendarDateChangedListeners: CalendarDateChangedListener[];


    public constructor(calendarContainer: JQuery<HTMLDivElement>, date?: Date, calendarDayChangedListeners?: CalendarDayChangedListener[], calendarDateChangedListeners?: CalendarDateChangedListener[]) {
        this._calendarContainer = calendarContainer;
        this._date = new Date();
        if(date != null && date != undefined) {
            this._date = date;
        }
        this._calendarDayChangedListeners = calendarDayChangedListeners;
        this._calendarDateChangedListeners = calendarDateChangedListeners;
        this._nextMonthButton = null;
        this._previousMonthButton = null;
        this._monthLabel = null;
        this._yearLabel = null;
    }

    public createCalendar() {
        this.eraseCalendar();
        this.generateCalendarTop();
        this.generateStructure();
        this.generateDays();
    }

    private eraseCalendar() {
        this._calendarContainer.html("");
        this._calendarDaysCells = new Array(6);
        for(let i: number = 0; i < this._calendarDaysCells.length; i++) {
            this._calendarDaysCells[i] = new Array(7);
        }
    }

    private generateCalendarTop() {
        //Generate Calendar Head
        let row = $("<div></div>").addClass("row border text-center border-dark");
        this._calendarContainer.append(row);
        this._nextMonthButton = $("<button></button>");
        this._nextMonthButton.addClass("col btn btn-light font-weight-bolder").text(">");
        this._previousMonthButton = $("<button></button>");
        this._previousMonthButton.addClass("col btn btn-light font-weight-bolder").text("<");
        this._monthLabel = $("<label></label>");
        this._monthLabel.addClass("col text-center vertical-align-text-center cursor-pointer font-weight-bold").text("");
        this._yearLabel = $("<label></label>");
        this._yearLabel.addClass("col text-center vertical-align-text-center cursor-pointer font-weight-bold").text("");
        row.append(this._previousMonthButton);
        row.append(this._monthLabel);
        row.append(this._yearLabel);
        row.append(this._nextMonthButton);

        //Assign functions to calendar's top elements
        this._nextMonthButton.on("click", (event: any) => {
                this.next();
        });
        this._previousMonthButton.on("click", (event: any) => {
            this.previous();
        });
    }

    private generateStructure() {
        this._calendarContainer.addClass("container m-0 p-0 calendar-container-medium"); 

        //Generate Calendar days Table 
        let row = $("<div></div>").addClass("row");
        this._calendarContainer.append(row);
        for(let weekDay of WEEKDAYS) {
            let col = $("<div></div>").text(weekDay).addClass("col-sm text-center font-weight-bold description-text border border-dark m-0");
            row.append(col);
        }
        for(let i: number = 0; i < this._calendarDaysCells.length; i++) {
            row = $("<div></div>").addClass("row");
            this._calendarContainer.append(row);
            for(let j: number = 0; j < this._calendarDaysCells[i].length; j++) {
                let col = $("<div></div>").addClass("col-sm text-center border border-dark m-0 square");
                this._calendarDaysCells[i][j] = col as JQuery<HTMLDivElement>;
                row.append(col);
            }
        }
    }

    private generateDays() {
        let currentMonth: number = this._date.getMonth();
        let currentYear: number = this._date.getFullYear();
        //Start with the first day of the calendar
        this._date.setDate(1);
        if (this._date.getDay() != 0) {
            this._date.setDate(this._date.getDate() - this._date.getDay());
        }

        for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 7; c++) {
                //Setting the text inside the cell as the number of the month's day
                let td = this._calendarDaysCells[r][c].text(this._date.getDate());
                //Resetting attributes for the cell
                td.removeAttr("date").removeAttr("month").removeAttr("year");
                //Setting the attributes for the date
                td.attr({date: this._date.getDate(), month: this._date.getMonth(), year : this._date.getFullYear()});
                //Resetting classes for the cell
                td.removeClass("calendar-enabled").removeClass("calendar-disabled");
                if (this._date.getMonth() == currentMonth) {
                    td.addClass("calendar-enabled");
                } else {
                    td.addClass("calendar-disabled");
                }
                //Call on day changed
                this.onDayChanged(this._date, td, this._date.getMonth() == currentMonth ? true : false);
                this._date.setDate(this._date.getDate() + 1);
            }
        }

        //Reset the date
        this._date.setDate(1);
        this._date.setMonth(currentMonth);
        this._date.setFullYear(currentYear);
        this._monthLabel.text(MONTHS[this._date.getMonth()]);
        this._yearLabel.text(this._date.getFullYear());
    }

    private onDateChanged(date: Date) {
        for(let listener of this._calendarDateChangedListeners) {
            listener.calendarDateChanged(new Date(date));
        }
    }

    private onDayChanged(date: Date, element: JQuery<HTMLDivElement>, isCurrentMonth: boolean) {
        for(let listener of this._calendarDayChangedListeners) {
            listener.calendarDayChanged(new Date(date), element, isCurrentMonth);
        }
    }

    public changeMonth(month: number) {
        this._date.setMonth(month);
        this.onDateChanged(this._date);
        this.generateDays();
    }

    public changeYear(year: number) {
        this._date.setFullYear(year);
        this.onDateChanged(this._date);
        this.generateDays();
    }

    public next() {
        let month = this._date.getMonth() + 1;
        this.changeMonth(month);
    }

    public previous() {
        let month = this._date.getMonth() - 1;
        this.changeMonth(month);
    }

    //GET SET
    public getDate(): Date {
        return new Date(this._date);
    }

    public setDate(date: Date) {
        this._date = new Date(date);
        this.generateDays();
    }

    public addCalendarDateChangedEventListener(listener: CalendarDateChangedListener) {
        if(this._calendarDateChangedListeners == undefined || this._calendarDateChangedListeners == null) {
            this._calendarDateChangedListeners = new Array();
        }
        this._calendarDateChangedListeners.push(listener);
    }

    public removeCalendarDateCHangedEventListener(listener: CalendarDateChangedListener) {
        if(this._calendarDateChangedListeners == undefined || this._calendarDateChangedListeners == null) {
            this._calendarDateChangedListeners = new Array();
        }
        for(let i = 0; i < this._calendarDateChangedListeners.length; i++) {
            if(this._calendarDateChangedListeners[i] == listener) {
                for(let j = i; j < this._calendarDateChangedListeners.length - 1; j++) {
                    this._calendarDateChangedListeners[j] = this._calendarDateChangedListeners[j + 1];
                }
            }
        }
    }

    public addCalendarDayChangedEventListener(listener: CalendarDayChangedListener) {
        if(this._calendarDayChangedListeners == undefined || this._calendarDayChangedListeners == null) {
            this._calendarDayChangedListeners = new Array();
        }
        this._calendarDayChangedListeners.push(listener);
    }

    public removeCalendarDayChangedEventListener(listener: CalendarDayChangedListener) {
        if(this._calendarDayChangedListeners == undefined || this._calendarDayChangedListeners == null) {
            this._calendarDayChangedListeners = new Array();
        }
        for(let i = 0; i < this._calendarDayChangedListeners.length; i++) {
            if(this._calendarDayChangedListeners[i] == listener) {
                for(let j = i; j < this._calendarDayChangedListeners.length - 1; j++) {
                    this._calendarDayChangedListeners[j] = this._calendarDayChangedListeners[j + 1];
                }
            }
        }
    }
}