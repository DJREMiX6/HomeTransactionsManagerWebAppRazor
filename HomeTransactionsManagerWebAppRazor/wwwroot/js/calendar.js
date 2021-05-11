const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["Jenuary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTHSDAYSCOUNT = {"Jenuary": 31, "February": 28, "March": 31, "April": 30, "May": 31, "June": 30, "July": 31, "August": 31, "September": 30, "October": 31, "November": 30, "December": 31};

document.addEventListener("load", () => {
    var calendarBody = document.getElementById("calendar-body");
    var nextMonthButton = document.getElementById("month-next");
    var prevMonthButton = document.getElementById("month-prev");
    var monthNameText = document.getElementById("month-name");

    var date = new Date();
    let monthNumber = date.getMonth();
    let dayNumber = date.getDate();
    let weekDayNumber = date.getDay();
    let yearNumber = date.getFullYear();
    let monthName = MONTHS[monthNumber];
    let dayName = DAYS[weekDayNumber];

    console.log("DATE: " + date);
    console.log("MONTH NUMBER: " + monthNumber);
    console.log("DAY NUMBER: " + dayNumber);
    console.log("WEEK DAY NUMBER: " + weekDayNumber);
    console.log("YEAR NUMBER: " + yearNumber);
    console.log("MONTH NAME: " + monthName);
    console.log("DAY NAME: " + dayName);

    generateMonth();
});

function generateMonth() {
    console.log("-------------------------Day count: ");
    let dayCount = MONTHSDAYSCOUNT[monthName];
    if ((((yearNumber % 4 == 0) && (yearNumber % 100 == 0)) || (yearNumber % 400 == 0)) && (monthNumber == 1)) {
        console.log("Bisestile");
        dayCount++;
    }
    for (let i = 1; i <= dayCount; i++) {
        //console.log("Giorno: " + i);
        var tr = document.createElement("tr");
        calendarBody.appendChild(tr);
        date.setDate(i);
        if (date.getDay() == 0) {
            calendarBody.appendChild(tr);
        }
        console.log("Giorno1: " + date.getDate() + " " + DAYS[date.getDay()]);
        if (i == 1) {
            switch (date.getDay()) {
                case 0:
                    tr.appendChild(document.createElement("td").appendChild(document.createElement("label").innerHTML = i));
                    break;
                case 1:
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td").appendChild(document.createElement("label").innerHTML = i));
                    break;
                case 2:
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td").appendChild(document.createElement("label").innerHTML = i));
                    break;
                case 3:
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td").appendChild(document.createElement("label").innerHTML = i));
                    break;
                case 4:
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td").appendChild(document.createElement("label").innerHTML = i));
                    break;
                case 5:
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td").appendChild(document.createElement("label").innerHTML = i));
                    break;
                case 6:
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td"));
                    tr.appendChild(document.createElement("td").appendChild(document.createElement("label").innerHTML = i));
                    break;
            }
        } else if (date.getDate() == dayCount) {

        } else {

        }
    }
}

function generateStructure() {
    calendarBody.appendChild(document.createElement(""))
}

function changeMonth(succession) {
    if (succession == 1) {

    } else if (succession == -1) {

    }
}
