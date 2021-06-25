export var HTTPRequestMethod;
(function (HTTPRequestMethod) {
    HTTPRequestMethod["GET"] = "GET";
    HTTPRequestMethod["POST"] = "POST";
    HTTPRequestMethod["PUT"] = "PUT";
    HTTPRequestMethod["PATCH"] = "PATCH";
    HTTPRequestMethod["DELETE"] = "DELETE";
    HTTPRequestMethod["COPY"] = "COPY";
    HTTPRequestMethod["HEAD"] = "HEAD";
    HTTPRequestMethod["OPTIONS"] = "OPTIONS";
    HTTPRequestMethod["LINK"] = "LINK";
    HTTPRequestMethod["UNLINK"] = "UNLINK";
    HTTPRequestMethod["PURGE"] = "PURGE";
    HTTPRequestMethod["LOCK"] = "LOCK";
    HTTPRequestMethod["UNLOCK"] = "UNLOCK";
    HTTPRequestMethod["PROPFIND"] = "PROPFIND";
    HTTPRequestMethod["VIEW"] = "VIEW";
})(HTTPRequestMethod || (HTTPRequestMethod = {}));
