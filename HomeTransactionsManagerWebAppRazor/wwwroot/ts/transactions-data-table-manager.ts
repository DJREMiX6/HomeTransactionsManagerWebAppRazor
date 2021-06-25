import { DataTable } from "./object-model/data-table/data-table.js";
import { DataTableOptions } from "./object-model/data-table/data-table-options.js";
import { DataTableAjaxOptions } from "./object-model/data-table/data-table-ajax-options.js";
import { TRANSACTIONS_API_FULL_URL } from "./utils/urls.js";
import { HTTPRequestMethod } from "./enums/http-call-type.js";
import { DataTableColumn } from "./object-model/data-table/data-table-column.js";
import { Parameter } from "./object-model/parameter/parameter.js";
import { DataTableTransactionData } from "./object-model/data-table-transaction-data.js";
import swal from "./object-model/sweetalert/core.js";

let dataTable: DataTable;

//ONCE THE DOCUMENT IS LOADED...
$(() => {
    dataTable = new DataTable(
        //DataTableOptions INSTANCE
        new DataTableOptions(
            //CONTAINER (HTMLTableElement)
            document.getElementById("DataTable") as HTMLTableElement,
            //DataTableAjaxOptions INSTANCE
            new DataTableAjaxOptions(
                //RESOURCE URL
                TRANSACTIONS_API_FULL_URL, 
                //URL PARAMETERS
                [new Parameter("all", true)], 
                //HTTPRequestMethod (GET | POST)
                HTTPRequestMethod.GET),
            //MAX ROWS FOR EACH PAGE
            5,
            //START PAGE
            1,
            //COLUMNS (ColumnName, ColumnWidth, HideTitle, Renderer)
            [
                new DataTableColumn("Date", "25%", false, null), 
                new DataTableColumn("Person", "25%", false, null),
                new DataTableColumn("Amount", "10%", false, null),
                new DataTableColumn("Id", "25%", true, (data: any): JQuery<HTMLElement> =>  {
                    let returnElement = $("<div></div>");
                    returnElement.addClass("text-center");
                    returnElement.css({"margin": "0 auto", "padding": "0px"});

                    let updateButton = $("<a></a>");
                    updateButton.attr("href", "/update?id=" + data);
                    updateButton.addClass("btn btn-success text-white");
                    updateButton.css({"cursor": "pointer", "width": "40%", "margin": "0 auto", "margin-right": "5%"});
                    updateButton.text("Edit");
                    updateButton.appendTo(returnElement);

                    let deleteButton = $("<a></a>");
                    deleteButton.addClass("btn btn-danger text-white");
                    deleteButton.css({"cursor": "pointer", "width": "40%", "margin": "0 auto", "margin-right": "5%"});
                    deleteButton.text("Delete");
                    deleteButton.on("click", () =>  {
                        deleteTransaction(data);
                    })
                    deleteButton.appendTo(returnElement);

                    return returnElement;
                    /*return `<div class="text-center" style="margin: 0 auto; padding: 0px;">\
                    <a href="/Update?id=${data}" class="btn btn-success text-white" style="cursor: pointer; width: 40%; margin: 0 auto; margin-right: 5%;">Edit</a>\
                    <a class="btn btn-danger text-white" onclick="deleteTransaction(${data})" style="cursor: pointer; width: 40%; margin: 0 auto; margin-left: 5%;">Delete</a>\
                    </div>`;*/
                })
            ]),
            //DataTableDataAdapter INSTANCE
            new DataTableTransactionData());
    
    //INITIALIZE AND CREATE THE DataTable
    dataTable.createDataTable();
});

function deleteTransaction(id: number) {
    swal({
        icon: "warning",
        title: "Deleting transaction!",
        text: "Are you sure you want to delete this transaction?",
        closeOnClickOutside: true,
        closeOnEsc: true,
        dangerMode: true,
        buttons: {
            cancel: {
                text: "Abort",
                value: false,
                visible: true,
                closeModal: true
            },
            confirm: {
                text: "Confirm",
                value: true,
                visible: true,
                closeModal: true
            }
        }
    }).then((willDelete) => {
        if (willDelete) {
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let response = JSON.parse(this.responseText);
                    if (response["error"] == false) {
                        dataTable.createDataTable();
                    } else {
                        console.log("ERROR DURING DELETING TRANSACTION NUMBER " + id);
                    }
                } else {
                    return null;
                }
            };
            xmlhttp.open("DELETE", `/api/transactions?id=${id}`, true);
            xmlhttp.send();
        }
    });
}
