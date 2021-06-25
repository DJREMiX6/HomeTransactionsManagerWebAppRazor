import { DataTableAjaxOptions } from "./data-table-ajax-options.js";
import { DataTableColumn } from "./data-table-column.js";

export class DataTableOptions {
    //VARS
    private _container: HTMLTableElement;
    private _ajaxOptions: DataTableAjaxOptions;
    private _maxPageRows: number;
    private _pageNumber: number;
    private _columns: DataTableColumn[]; 
    private _pageCount: number;
    private _rowCount: number;
    
    public constructor(container: HTMLTableElement, ajaxOptions: DataTableAjaxOptions, maxPageRows: number, pageNumber: number, columns: DataTableColumn[]) {
        this._container = container;
        this._ajaxOptions = ajaxOptions;
        this._maxPageRows = maxPageRows;
        this._pageNumber = pageNumber;
        this._columns = columns;
        this._pageCount = 0;
        this._rowCount = 0;
    }

    public getContainer(): HTMLTableElement {
        return this._container;
    }

    public getAjaxOptions(): DataTableAjaxOptions {
        return this._ajaxOptions;
    }

    public getMaxPageRows(): number {
        return this._maxPageRows;
    }

    public getPageNumber(): number {
        return this._pageNumber;
    }

    public getColumns(): DataTableColumn[] {
        return this._columns;
    }

    public getPageCount(): number {
        return this._pageCount;
    }

    public getRowCount(): number {
        return this._rowCount;
    }

    public setContainer(container: HTMLTableElement) {
        this._container = container;
    }

    public setAjaxOptions(ajaxOptions: DataTableAjaxOptions) {
        this._ajaxOptions = ajaxOptions;
    }

    public setMaxPageRows(maxPageRows: number) {
        if(maxPageRows >= 1) {
            this._maxPageRows = maxPageRows;
        }
    }

    public setPageNumber(pageNumber: number) {
        if(pageNumber > 0) {
            this._pageNumber = pageNumber;
        }
    }

    public setColumns(columns: DataTableColumn[]) {
        this._columns = columns;
    }

    private setPageCount(pageCount: number) {
        this._pageCount = pageCount;
    }

    public setRowCount(rowCount: number) {
        if(rowCount >= 0) {
            this._rowCount = rowCount;
            this.setPageCount(rowCount / this._maxPageRows);
        }
    }

    public deepCopy(): DataTableOptions {
        return DataTableOptions.deepCopy(this);
    }

    public static deepCopy(dataTableOptions: DataTableOptions): DataTableOptions {
        return new DataTableOptions(dataTableOptions.getContainer(), 
        dataTableOptions.getAjaxOptions().deepCopy(), 
        dataTableOptions.getMaxPageRows(), 
        dataTableOptions.getPageNumber(), 
        dataTableOptions.getColumns());
    }
}
