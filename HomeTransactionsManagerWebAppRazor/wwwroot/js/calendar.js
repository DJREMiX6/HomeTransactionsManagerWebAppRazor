"use strict"
import { TRANSACTIONS_API_FULL_URL } from "./utils/urls.js";
const MONTHS = ["Jen", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var calendarBody;
var nextMonthButton;
var prevMonthButton;
var monthNameText;

var date = new Date();
date.setMonth($_GET['month']);
date.setFullYear($_GET['year']);
var monthNumber = date.getMonth();
var dayNumber = date.getDate();
var weekDayNumber = date.getDay();
var yearNumber = date.getFullYear();
var monthName = MONTHS[monthNumber];

var monthData;
var daysWithTransactions = {};

document.addEventListener("DOMContentLoaded", (event) => {

    calendarBody = document.getElementById("calendar-body");
    nextMonthButton = document.getElementById("month-next");
    prevMonthButton = document.getElementById("month-prev");
    monthNameText = document.getElementById("month-name");

    nextMonthButton.addEventListener("click", () => { changeMonth(1); });
    prevMonthButton.addEventListener("click", () => { changeMonth(-1); });

    loadMonthData(generateCalendar);
});

function generateCalendar() {
    calendarBody.innerHTML = "";
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    monthNameText.innerText = MONTHS[date.getMonth()] + " " + date.getFullYear();
    date.setDate(1);
    if (date.getDay() != 0) {
        date.setDate(date.getDate() - date.getDay());
    }
    for (let r = 0; r < 6; r++) {
        let tr = document.createElement("tr");
        tr.style.height = "100px";
        tr.classList.add("align-middle");
        calendarBody.appendChild(tr);
        for (let c = 0; c < 7; c++) {
            let td = document.createElement("td");
            td.setAttribute("date", date.getDate());
            td.setAttribute("month", date.getMonth() + 1);
            td.setAttribute("year", date.getFullYear());
            if (date.getMonth() == currentMonth) {
                if (daysWithTransactions[date.getDate()] != undefined) {
                    td.classList.add("calendar-hascontent");
                } else {
                    td.classList.add("calendar-enabled");
                }
            } else {
                td.classList.add("calendar-disabled");
            }
            td.addEventListener("click", () => dayClick(td));
            let label = document.createElement("label");
            label.setAttribute("date", date.getDate());
            label.setAttribute("month", date.getMonth() + 1);
            label.setAttribute("year", date.getFullYear());
            label.classList.add("w-100");
            label.classList.add("text-center");
            if (date.getMonth() == currentMonth) {
                if (daysWithTransactions[date.getDate()] != undefined) {
                    label.classList.add("calendar-hascontent");
                } else {
                    label.classList.add("calendar-enabled");
                }
            } else {
                label.classList.add("calendar-disabled");
            }
            label.classList.add("calendar-text");
            label.innerText = date.getDate();
            td.appendChild(label);
            tr.appendChild(td);
            date.setDate(date.getDate() + 1);
        }
    }
    date.setDate(1);
    date.setMonth(currentMonth);
    date.setFullYear(currentYear);
}

async function getMoneySpent(month, year, callback) {
    /*let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        } else {
            return null;
        }
    };
    xmlhttp.open("GET", `/api/transactions?month=${month}&year=${year}`, true);
    xmlhttp.send();*/
    let url = TRANSACTIONS_API_FULL_URL + "?month=" + month + "&year=" + year;
    console.log(url);
    $.get(url, "json").done((data, status) => {
        if(status == "success") {
            callback(data);
        }
    })
}

async function loadMonthData(callback) {
    getMoneySpent(date.getMonth() + 1, date.getFullYear(), (response) => {
        if (response != null) {
            monthData = response;
            monthData["data"].forEach(k => {
                daysWithTransactions[k["Day"]] = true;
            });
            callback();
        } else {
            monthData = null;
            console.log("Data is null");
        }
    });
}

function dayClick(sender) {
    let date = sender.getAttribute("date");
    let month = sender.getAttribute("month");
    let year = sender.getAttribute("year");
    let content = document.createElement("div");
    content.classList.add("container");
    content.classList.add("p-3");
    //Group and sum the outcomes of each people during the day
    let groupedData = {};
    monthData["data"].forEach(k => {
        if (k["Amount"] < 0 && k["Day"] == date) {
            if (groupedData[k["Person"]] == undefined) {
                groupedData[k["Person"]] = k["Amount"];
            } else {           
                groupedData[k["Person"]] += k["Amount"];
            }
        }
    });
    //Create the content HTML for the calendar popup
    Object.entries(groupedData).forEach(([k, v]) => {
            let row = document.createElement("div");
            row.classList.add("row");

            let col1 = document.createElement("div");
            col1.classList.add("col-4");
            let col1Content = document.createElement("label");
            col1Content.classList.add("text-primary");
            col1Content.innerText = k;
            col1.appendChild(col1Content);
            row.appendChild(col1);

            let col2 = document.createElement("div");
            col2.classList.add("col-4");
            let col2Content = document.createElement("label");
            col2Content.innerText = v;
            col2.appendChild(col2Content);
            row.appendChild(col2);

            content.appendChild(row);
    });
    //Show the Calendar popup
    bootbox.dialog({
        title: date + " " + MONTHS[month - 1] + " " + year,
        message: content,
        size: "medium",
        onEscape: true,
        backdrop: true,
        centerVertical: true,
        scrollable: true
    });
}

function changeMonth(succession) {
    if (succession == 1) {
        date.setMonth(date.getMonth() + 1);
    } else {
        date.setMonth(date.getMonth() - 1);
    }
    location.replace("https://localhost:5001/TransactionsGraphicalVisualization?month=" + date.getMonth() + "&year=" + date.getFullYear());
}
