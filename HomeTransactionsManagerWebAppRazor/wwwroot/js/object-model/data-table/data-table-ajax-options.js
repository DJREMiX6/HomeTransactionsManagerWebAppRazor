export class DataTableAjaxOptions {
    constructor(url, params, httpRequestType) {
        this._url = url;
        this._params = params;
        this._httpRequestMethod = httpRequestType;
    }
    //GETTER SETTER
    getUrl() {
        return this._url;
    }
    getParams() {
        return this._params;
    }
    getHttpRequestMethod() {
        return this._httpRequestMethod;
    }
    setUrl(url) {
        if (url.trim() != "") {
            this._url = url;
        }
    }
    setParams(params) {
        this._params = params;
    }
    setHttpRequestMethod(httpRequestType) {
        if (httpRequestType) {
            this._httpRequestMethod = httpRequestType;
        }
    }
    deepCopy() {
        return DataTableAjaxOptions.deepCopy(this);
    }
    static deepCopy(dataTableAjaxOptions) {
        let copiedParams = [];
        dataTableAjaxOptions.getParams().forEach(param => {
            copiedParams.push(param.deepCopy());
        });
        return new DataTableAjaxOptions(dataTableAjaxOptions.getUrl(), copiedParams, dataTableAjaxOptions.getHttpRequestMethod());
    }
}
