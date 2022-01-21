import { createContext, Context } from "react";
import { SnackbarMsg } from "../models";

interface Props {
    snackbarMsg: SnackbarMsg;
    setSnackbarMsg: (input: React.SetStateAction<SnackbarMsg>) => any;
    email: string | null;
    setEmail: (input: React.SetStateAction<string | null>) => any;
    favoriteSongIdsByUser: Record<string, Record<number, number>>,
    setFavoriteSongIdsByUser: (input: React.SetStateAction<Record<string, Record<number, number>>>) => any;

}

export const AppContext: Context<Props> =
    createContext<Props>({
        snackbarMsg: { message: "Unexpected error", variant: "error", open: false },
        setSnackbarMsg: () => { },
        email: null,
        setEmail: () => { },
        favoriteSongIdsByUser: {},
        setFavoriteSongIdsByUser: () => { },
    });