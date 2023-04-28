import React from "react";

export type Props = {
    id: string,
    name: string,
    htmlFor: string,
    label: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    value: string,
    placeholder?: string | undefined,
    classNames?: string,
    options: {
        label: string | undefined,
        value: string | undefined
    }[],
    props?: any,
    required?: boolean
}