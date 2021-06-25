export class DataTableColumn {
    constructor(columnName, columnWidth, hiddenTitle, renderer) {
        this._columnName = columnName;
        this._columnWidth = columnWidth;
        this._hiddenTitle = hiddenTitle;
        this._renderer = renderer;
    }
    getColumnName() {
        return this._columnName;
    }
    getColumnWidth() {
        return this._columnWidth;
    }
    getHiddenTitle() {
        return this._hiddenTitle;
    }
    getRenderer() {
        return this._renderer;
    }
    setColumnName(columnName) {
        this._columnName = columnName;
    }
    setColumnWidth(columnWidth) {
        this._columnWidth = columnWidth;
    }
    setHiddenTitle(hiddenTitle) {
        this._hiddenTitle = hiddenTitle;
    }
    setRenderer(renderer) {
        this._renderer = renderer;
    }
}
