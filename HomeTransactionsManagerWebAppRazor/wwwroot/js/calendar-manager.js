import { Calendar } from "./object-model/calendar/calendar.js";
import swal from "./object-model/sweetalert/sweetalert.js";
$(() => {
    let calendar = new CalendarManager();
    calendar.createCalendar();
});
class CalendarManager {
    constructor() {
        this._calendar = new Calendar($("#Calendar"), new Date(Date.now()), [this], [this]);
    }
    createCalendar() {
        this._calendar.createCalendar();
    }
    calendarDateChanged(newDate) {
    }
    calendarDayChanged(date, element, isCurrentMonth) {
        if (isCurrentMonth) {
            element.on("click", () => {
                swal({
                    icon: "info",
                    title: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
                    text: "Are you sure you want to delete this transaction?",
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
