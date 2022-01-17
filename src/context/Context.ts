import { createContext, Context } from "react";
import { SnackbarMsg } from "../models";

interface Props {
    snackbarMsg: SnackbarMsg;
    setSnackbarMsg: (input: React.SetStateAction<SnackbarMsg>) => any;
    email: String | null;
}

export const DisplayContext: Context<Props> =
    createContext<Props>({
        snackbarMsg: { message: "Error en plataforma", variant: "error", open: false },
        setSnackbarMsg: () => { },
        email: null,
    });