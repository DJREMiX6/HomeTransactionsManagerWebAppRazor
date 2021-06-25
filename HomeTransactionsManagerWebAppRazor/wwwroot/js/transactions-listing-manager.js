"use strict"
var dataTable;

$(document).ready(() => {
    dataTable = $('#DataTable');
    dataTable.dataTable({
        "ajax": {
            "url": ":5001/api/transactions",
            "params": [
                {
                    "name": "all",
                    "value": true
                }
            ],
            "type": "GET",
            "datatype": "JSON"
        },

        "maxPageRows": 5,

        "pageNumber": 1,
        "columns": [
            { "data": "Date", "width": "25%" },
            { "data": "Person", "width": "25%" },
            { "data": "Amount", "width": "10%" },
            {
                "data": "Id",
                "width": "25%",
                "hiddenTitle": true,
                "render": function (data) {
                    return `<div class="text-center" style="margin: 0 auto; padding: 0px;">\
                                <a href="/Update?id=${data}" class="btn btn-success text-white" style="cursor: pointer; width: 40%; margin: 0 auto; margin-right: 5%;">Edit</a>\
                                <a class="btn btn-danger text-white" onclick="deleteTransaction(${data})" style="cursor: pointer; width: 40%; margin: 0 auto; margin-left: 5%;">Delete</a>\
                            </div>`;
                }
            }
        ]
    });
});

function deleteTransaction(id) {
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
                        $(dataTable).dataTable();
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