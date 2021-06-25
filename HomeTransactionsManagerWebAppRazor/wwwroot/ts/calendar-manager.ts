import { Calendar } from "./object-model/calendar/calendar.js";
import { TransactionsManager } from "./object-model/transaction/transactions-manager.js";
import swal from "./object-model/sweetalert/sweetalert.js";
import { CalendarDateChangedListener, CalendarDayChangedListener } from "./object-model/calendar/calendar-event-listeners.js";

$(() => {
    let calendar = new CalendarManager();
    calendar.createCalendar();
});

class CalendarManager implements CalendarDateChangedListener, CalendarDayChangedListener {
    private _calendar: Calendar;
    private _transactionManager: TransactionsManager;
    
    public constructor() {
        this._calendar = new Calendar($("#Calendar"), new Date(Date.now()), [this], [this]);
    }

    public createCalendar() {
        this._calendar.createCalendar();
    }

    public calendarDateChanged(newDate: Date) {

    }

    public calendarDayChanged(date: Date, element: JQuery<HTMLDivElement>, isCurrentMonth: boolean) {
        if(isCurrentMonth) {
            element.on("click", () => {
                swal({
                    icon: "info",
                    title: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
                    text: "Are you sure you want to delete this transaction?", //Cambiare il testo con elemento html contenente i dati delle transazioni
                    closeOnClickOutside: true,
                    closeOnEsc: true,
                    buttons: {
                        confirm: {
                            text: "Close",
                            value: true,
                            visible: true,
                            closeModal: true
                        }
                    }
                });
            });

        }
    }
}
