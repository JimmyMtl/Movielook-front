import React from "react";

export type Props = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    email: string,
    password: string,
    rememberme: boolean | undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export type states = {
    username: string,
    email: string,
    password: string,
    rememberme: boolean | undefined
    confirmPassword: string
}