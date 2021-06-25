export class Parameter {
    private _name: string;
    private _value: string|number|boolean;

    constructor (name:string, value:string|number|boolean) {
        this._name = name;
        this._value = value;
    }

    public getName(): string {
        return this._name;
    }

    public getValue(): string|number|boolean {
        return this._value;
    }

    public setName(name: string) {
        this._name = name;
    }

    public setValue(value: string|number|boolean) {
        this._value = value;
    }

    public deepCopy() {
        return Parameter.deepCopy(this);
    }

    public static deepCopy(param: Parameter) {
        return new Parameter(param.getName(), param.getValue());
    }
};