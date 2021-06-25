export interface CalendarDayChangedListener {
    calendarDayChanged(date: Date, element: JQuery<HTMLDivElement>, isCurrentMonth: boolean): void;
}

export interface CalendarDateChangedListener {
    calendarDateChanged(newDate: Date): void;
}