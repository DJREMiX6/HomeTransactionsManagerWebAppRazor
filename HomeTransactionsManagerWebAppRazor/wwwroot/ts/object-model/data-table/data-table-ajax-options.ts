import { HTTPRequestMethod } from "../../enums/http-call-type.js";
import { Parameter } from "../parameter/parameter.js";

export class DataTableAjaxOptions {
    private _url: string;
    private _params: Parameter[];
    private _httpRequestMethod: HTTPRequestMethod;

    public constructor(url: string, params: Parameter[], httpRequestType: HTTPRequestMethod) {
        this._url = url;
        this._params = params;
        this._httpRequestMethod = httpRequestType;
    }

    //GETTER SETTER
    public getUrl(): string {
        return this._url;
    }

    public getParams(): Parameter[] {
        return this._params;
    }

    public getHttpRequestMethod(): HTTPRequestMethod {
        return this._httpRequestMethod;
    }

    public setUrl(url: string) {
        if(url.trim() != "") {
            this._url = url;
        }
    }

    public setParams(params: Parameter[]) {
        this._params = params;
    }

    public setHttpRequestMethod(httpRequestType: HTTPRequestMethod) {
        if(httpRequestType) {
            this._httpRequestMethod = httpRequestType;
        }
    }

    public deepCopy(): DataTableAjaxOptions {
        return DataTableAjaxOptions.deepCopy(this);
    }

    public static deepCopy(dataTableAjaxOptions: DataTableAjaxOptions): DataTableAjaxOptions {
        let copiedParams: Parameter[] = [];
        dataTableAjaxOptions.getParams().forEach(param => {
            copiedParams.push(param.deepCopy());
        });
        return new DataTableAjaxOptions(dataTableAjaxOptions.getUrl(), copiedParams, dataTableAjaxOptions.getHttpRequestMethod());
    }
}