export class Parameter {
    constructor(name, value) {
        this._name = name;
        this._value = value;
    }
    getName() {
        return this._name;
    }
    getValue() {
        return this._value;
    }
    setName(name) {
        this._name = name;
    }
    setValue(value) {
        this._value = value;
    }
    deepCopy() {
        return Parameter.deepCopy(this);
    }
    static deepCopy(param) {
        return new Parameter(param.getName(), param.getValue());
    }
}
;
