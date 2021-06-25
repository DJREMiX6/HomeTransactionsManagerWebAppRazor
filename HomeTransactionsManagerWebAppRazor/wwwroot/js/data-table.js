"use strict"
//Custom JQuery function to create a dataTable
$.fn.dataTable = function (options = {}) {
    /*
     * Access the element with "this"
     */

    //Check the element type
    if (!this.is("table")) {
        throw new Error(this.prop("nodeName") + " is not a table element.");
    }

    //Save options as global variable
    $.fn.DTOptions = options;
    $.fn.DTOptions["DTContainer"] = this;

    //Generate the complete url with parameters
    let ajaxURL = window.location.protocol + "//" + window.location.hostname + options["ajax"]["url"] + "?";
    for (let i = 0; i < options["ajax"]["params"].length; i++) {
        ajaxURL += options["ajax"]["params"][i]["name"] + "=" + options["ajax"]["params"][i]["value"] + "&";
    }
    ajaxURL = ajaxURL.substring(0, ajaxURL.length - 1);
    $.fn.DTOptions["ajax"]["completeUrl"] = ajaxURL;

    DTCall();
}

function DTCall() {
    //Retrive the data from the server
    switch ($.fn.DTOptions["ajax"]["type"]) {
        case "GET":
            $.get($.fn.DTOptions["ajax"]["completeUrl"], DTLoadData);
            break;
        case "POST":
            $.post($.fn.DTOptions["ajax"]["completeUrl"], DTLoadData);
            break;
        default:
            throw new Error(options["ajax"]["type"] + " is not an HTTP call type.");
            break;
    }
}

function DTLoadData (data, status, table) {
    if (status == "success") {
        $.fn.DTData = data;
        console.log(data);
        generateTable(dataTable);
    } else {
        throw new Error("HTTP call status: " + status);
    }
}

function generateTable() {
    let table = $.fn.DTOptions["DTContainer"];
    table.empty();

    let thead = $("<thead></thead>");
    let hrow = $("<tr></tr>");
    table.append(thead);
    thead.append(hrow);

    for (let i = 0; i < $.fn.DTOptions["columns"].length; i++) {
        let child = $("<th></th>");
        if ($.fn.DTOptions["columns"][i]["hiddenTitle"] == undefined ||
            $.fn.DTOptions["columns"][i]["hiddenTitle"] == null ||
            $.fn.DTOptions["columns"][i]["hiddenTitle"] == false) {
            child.text($.fn.DTOptions["columns"][i]["data"]);
        }
        child.css("width", $.fn.DTOptions["columns"][i]["width"]);
        hrow.append(child);
    }

    let tbody = $("<tbody></tbody>");
    thead.after(tbody);

    if ($.fn.DTOptions["pageNumber"] == undefined || $.fn.DTOptions["pageNumber"] == undefined) {
        $.fn.DTOptions["pageNumber"] = 1;
    }

    if ($.fn.DTData["data"] == undefined || $.fn.DTData["data"] == null) {
        return;
    }

    if ($.fn.DTOptions["maxPageRows"] == undefined || $.fn.DTOptions["maxPageRows"] == null) {
        $.fn.DTOptions["maxPageRows"] = $.fn.DTData["data"].length;
    }

    //startIndex = dataLength - (maxPageRows * pageNumber)
    let startIndex = $.fn.DTOptions["maxPageRows"] * ($.fn.DTOptions["pageNumber"] - 1);
    //if((maxPageRows * pageNumber) > dataLength) {endIndex = dataLength;} else {endIndex = maxPageRows * pageNumber;}
    let endIndex = ($.fn.DTOptions["maxPageRows"] * $.fn.DTOptions["pageNumber"]) > $.fn.DTData["data"].length ? $.fn.DTData["data"].length : ($.fn.DTOptions["maxPageRows"] * $.fn.DTOptions["pageNumber"]);

    console.log(startIndex);
    console.log(endIndex);

    for (let i = startIndex; i < endIndex; i++) {
        let row = $("<tr></tr>");
        tbody.append(row);
        for (let j = 0; j < $.fn.DTOptions["columns"].length; j++) {
            let col = $("<td></td>").text($.fn.DTData["data"][i][$.fn.DTOptions["columns"][j]["data"]]);
            if ($.fn.DTOptions["columns"][j]["render"] != undefined && $.fn.DTOptions["columns"][j]["render"] != null) {
                col.html($.fn.DTOptions["columns"][j]["render"]($.fn.DTData["data"][i][$.fn.DTOptions["columns"][j]["data"]]));
            }
            row.append(col);
        }
    }

    generateButtons();
}

function generateButtons() {
    let pages = parseInt($.fn.DTData["data"].length / $.fn.DTOptions["maxPageRows"]);
    let pagesReturn = parseInt($.fn.DTData["data"].length % $.fn.DTOptions["maxPageRows"]);
    if (pagesReturn != 0) {
        pages += 1;
    }
    if (pages <= 1) {
        return;
    }

    let pageNumber = $.fn.DTOptions["pageNumber"];
    if (pageNumber < 1 || pageNumber > pages) {
        $.fn.DTOptions["pageNumber"] = pages;
        generateTable();
        return;
    }

    //Get or Init the buttons container
    let buttonsContainer = $("#ButtonsContainer");
    if (buttonsContainer.length == 0) {
        buttonsContainer = $("<div id='ButtonsContainer' class='border'></div>");
        $(dataTable).after(buttonsContainer);
    }
    //Empty the buttons container
    buttonsContainer.empty();

    //Generate and inster the buttons inside the buttons container
    for (let i = 0; i < pages; i++) {
        let button = $("<button class='btn btn-lg'></button>");
        button.text(i + 1);
        if (pageNumber == i + 1) {
            button.prop("disabled", true);
        }
        button.click(() => {
            $.fn.DTOptions["pageNumber"] = i + 1;
            generateTable();
        });
        buttonsContainer.append(button);
    }
}
