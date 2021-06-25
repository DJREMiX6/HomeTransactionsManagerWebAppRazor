export class DataTableOptions {
    constructor(container, ajaxOptions, maxPageRows, pageNumber, columns) {
        this._container = container;
        this._ajaxOptions = ajaxOptions;
        this._maxPageRows = maxPageRows;
        this._pageNumber = pageNumber;
        this._columns = columns;
        this._pageCount = 0;
        this._rowCount = 0;
    }
    getContainer() {
        return this._container;
    }
    getAjaxOptions() {
        return this._ajaxOptions;
    }
    getMaxPageRows() {
        return this._maxPageRows;
    }
    getPageNumber() {
        return this._pageNumber;
    }
    getColumns() {
        return this._columns;
    }
    getPageCount() {
        return this._pageCount;
    }
    getRowCount() {
        return this._rowCount;
    }
    setContainer(container) {
        this._container = container;
    }
    setAjaxOptions(ajaxOptions) {
        this._ajaxOptions = ajaxOptions;
    }
    setMaxPageRows(maxPageRows) {
        if (maxPageRows >= 1) {
            this._maxPageRows = maxPageRows;
        }
    }
    setPageNumber(pageNumber) {
        if (pageNumber > 0) {
            this._pageNumber = pageNumber;
        }
    }
    setColumns(columns) {
        this._columns = columns;
    }
    setPageCount(pageCount) {
        this._pageCount = pageCount;
    }
    setRowCount(rowCount) {
        if (rowCount >= 0) {
            this._rowCount = rowCount;
            this.setPageCount(rowCount / this._maxPageRows);
        }
    }
    deepCopy() {
        return DataTableOptions.deepCopy(this);
    }
    static deepCopy(dataTableOptions) {
        return new DataTableOptions(dataTableOptions.getContainer(), dataTableOptions.getAjaxOptions().deepCopy(), dataTableOptions.getMaxPageRows(), dataTableOptions.getPageNumber(), dataTableOptions.getColumns());
    }
}
