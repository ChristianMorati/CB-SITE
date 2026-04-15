import { AttributeDefinition } from "../cms/products/create/_Inputs/Attribute";

export type BaseFieldProps = {
    label: string;
    value: any;
    onChange: (value: string) => void;
};

export type AttributeFieldProps = {
    attribute: AttributeDefinition;
    value: string;
    onChange: (value: string) => void;
};

