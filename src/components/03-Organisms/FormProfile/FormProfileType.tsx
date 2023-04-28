import React from "react";

export type Props = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    email: string,
    username: string,
    preferedGenre: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}