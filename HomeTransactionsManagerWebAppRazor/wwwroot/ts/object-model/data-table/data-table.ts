import { DataTableOptions } from "./data-table-options.js";
import { TRANSACTIONS_API_FULL_URL } from "../../utils/urls.js";
import { HTTPRequestMethod } from "../../enums/http-call-type.js";
import { DataTableDataAdapter } from "./data-table-data-adapter.js";

export class DataTable {
    private _dataTableOptions: DataTableOptions;
    private _dataTableDataAdapter: DataTableDataAdapter;

    public constructor(dataTableOptions: DataTableOptions, dataTableDataAdapter: DataTableDataAdapter) {
        this._dataTableOptions = dataTableOptions.deepCopy();
        this._dataTableDataAdapter = dataTableDataAdapter;
    }

    //SET GET
    public getDataTableOptions(): DataTableOptions {
        return this._dataTableOptions;
    }

    public getDataTableData(): DataTableDataAdapter {
        return this._dataTableDataAdapter;
    }

    public getDataTableOptionsSafe(): DataTableOptions {
        return this._dataTableOptions.deepCopy();
    }

    public setDataTableOptions(dataTableOptions: DataTableOptions) {
        this._dataTableOptions
    }

    public setDataTableData(dataTableDataAdapter: DataTableDataAdapter) {
        this._dataTableDataAdapter = dataTableDataAdapter;
    }

    //METHODS
    public createDataTable() {    
        //Generate the complete url with parameters
        let paramString = "";
    
        if(this._dataTableOptions.getAjaxOptions().getParams()) {
            paramString = "?";
            for (let p of this._dataTableOptions.getAjaxOptions().getParams()) {
                paramString += p.getName() + "=" + p.getValue() + "&";
            }
            paramString = paramString.substring(0, paramString.length);
        }
    
        this._dataTableOptions.getAjaxOptions().setUrl(this._dataTableOptions.getAjaxOptions().getUrl() + paramString);
    
        this.httpCall();
    }

    private httpCall() {
        //Retrive the data from the server
        switch (this._dataTableOptions.getAjaxOptions().getHttpRequestMethod()) {
            case HTTPRequestMethod.GET:
                $.get(this._dataTableOptions.getAjaxOptions().getUrl(), "json").done((data, status) => this.loadData(data, status));
                break;
            case HTTPRequestMethod.POST:
                $.post(this._dataTableOptions.getAjaxOptions().getUrl(), "json").done((data, status) => this.loadData(data, status));
                break;
            default:
                throw new Error(this._dataTableOptions.getAjaxOptions().getHttpRequestMethod() + " is not an HTTP method type.");
                break;
        }
    }

    private loadData(data: Object, status: string) {
        if (status == "success") {
            this._dataTableDataAdapter.setJsonData(data);
            this.generateTable();
        } else {
            throw new Error("HTTP call status: " + status);
        }
    }

    private generateTable() {
        let table = $("#" + this._dataTableOptions.getContainer().id);
        table.empty();
    
        let thead = $("<thead></thead>");
        let hrow = $("<tr></tr>");
        table.append(thead);
        thead.append(hrow);
    
        for (let i = 0; i < this._dataTableOptions.getColumns().length; i++) {
            let child = $("<th></th>");
            if (this._dataTableOptions.getColumns()[i].getHiddenTitle() == undefined ||
                this._dataTableOptions.getColumns()[i].getHiddenTitle() == null ||
                this._dataTableOptions.getColumns()[i].getHiddenTitle() == false) {
                child.text(this._dataTableOptions.getColumns()[i].getColumnName());
            }
            child.css("width", this._dataTableOptions.getColumns()[i].getColumnWidth());
            hrow.append(child);
        }
    
        let tbody = $("<tbody></tbody>");
        thead.after(tbody);
    
        if (this._dataTableOptions.getPageNumber() == undefined || this._dataTableOptions.getPageNumber() == undefined) {
            this._dataTableOptions.setPageNumber(1);
        }
        
        /*
        if (this._dataTableDataAdapter.Data == undefined || this._dataTableDataAdapter.Data == null) {
            return;
        }
        */
    
        if (this._dataTableOptions.getMaxPageRows() == undefined || this._dataTableOptions.getMaxPageRows() == null) {
            this._dataTableOptions.setMaxPageRows(this._dataTableDataAdapter.getCount());
        }
    
        //startIndex = dataLength - (maxPageRows * pageNumber)
        let startIndex = this._dataTableOptions.getMaxPageRows() * (this._dataTableOptions.getPageNumber() - 1);
        //if((maxPageRows * pageNumber) > dataLength) {endIndex = dataLength;} else {endIndex = maxPageRows * pageNumber;}
        let endIndex = (this._dataTableOptions.getMaxPageRows() * this._dataTableOptions.getPageNumber()) > this._dataTableDataAdapter.getCount() ? this._dataTableDataAdapter.getCount() : (this._dataTableOptions.getMaxPageRows() * this._dataTableOptions.getPageNumber());
    
        for (let i = startIndex; i < endIndex; i++) {
            let row = $("<tr></tr>");
            tbody.append(row);
            for (let j = 0; j < this._dataTableOptions.getColumns().length; j++) {
                let col = $("<td></td>");
                if(!this._dataTableOptions.getColumns()[j].getHiddenTitle()) {
                    col.text(this._dataTableDataAdapter.getContent(i, this._dataTableOptions.getColumns()[j].getColumnName()));
                }
                /*let col = $("<td></td>").text(this._dataTableDataAdapter.Data[i][this._dataTableOptions.getColumns()[j].getColumnName()].toString());*/
                if (this._dataTableOptions.getColumns()[j].getRenderer() != undefined && this._dataTableOptions.getColumns()[j].getRenderer() != null) {
                    /*col.html(this._dataTableOptions.getColumns()[j].getRenderer()(this._dataTableDataAdapter.Data[i][this._dataTableOptions.getColumns()[j].getColumnName()]));*/
                    /*col.html(this._dataTableOptions.getColumns()[j].getRenderer()(this._dataTableDataAdapter.getContent(i, this._dataTableOptions.getColumns()[j].getColumnName())));*/
                    col.append(this._dataTableOptions.getColumns()[j].getRenderer()(this._dataTableDataAdapter.getContent(i, this._dataTableOptions.getColumns()[j].getColumnName())));
                }
                row.append(col);
            }
        }
    
        this.generateButtons();
    }

    private generateButtons() {
        let pages = Math.trunc(this._dataTableDataAdapter.getCount() / this._dataTableOptions.getMaxPageRows());
        let pagesReturn = Math.trunc(this._dataTableDataAdapter.getCount() % this._dataTableOptions.getMaxPageRows());
        let dataTable = $("#" + this._dataTableOptions.getContainer().id);
        if (pagesReturn != 0) {
            pages += 1;
        }
        if (pages <= 1) {
            return;
        }
    
        let pageNumber = this._dataTableOptions.getPageNumber();
        if (pageNumber < 1 || pageNumber > pages) {
            this._dataTableOptions.setPageNumber(pages);
            this.generateTable();
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
                this._dataTableOptions.setPageNumber(i + 1);
                this.generateTable();
            });
            buttonsContainer.append(button);
        }
    }
}
