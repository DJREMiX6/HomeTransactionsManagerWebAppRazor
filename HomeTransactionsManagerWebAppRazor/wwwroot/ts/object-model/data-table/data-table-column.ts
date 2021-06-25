export class DataTableColumn {
    //VARS
    private _columnName: string;
    private _columnWidth: string;
    private _hiddenTitle: boolean;
    private _renderer: (data: any) => JQuery<HTMLElement>;

    public constructor(columnName: string, columnWidth: string, hiddenTitle: boolean, renderer: (data: any) => JQuery<HTMLElement>) {
        this._columnName = columnName;
        this._columnWidth = columnWidth;
        this._hiddenTitle = hiddenTitle;
        this._renderer = renderer;
    }

    public getColumnName(): string {
        return this._columnName;
    }

    public getColumnWidth(): string {
        return this._columnWidth;
    }

    public getHiddenTitle(): boolean {
        return this._hiddenTitle;
    }

    public getRenderer(): (data: any) => JQuery<HTMLElement> {
        return this._renderer;
    }

    public setColumnName(columnName: string) {
        this._columnName = columnName;
    }

    public setColumnWidth(columnWidth: string) {
        this._columnWidth = columnWidth;
    }

    public setHiddenTitle(hiddenTitle: boolean) {
        this._hiddenTitle = hiddenTitle;
    }

    public setRenderer(renderer: (data: any) => JQuery<HTMLElement>) {
        this._renderer = renderer;
    }
}