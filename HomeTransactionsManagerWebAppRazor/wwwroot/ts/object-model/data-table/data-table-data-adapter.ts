export interface DataTableDataAdapter {
    getContent(index: number, dataName: string): string | number | boolean;
    getCount(): number
    setJsonData(jsonData: Object): void;
}
