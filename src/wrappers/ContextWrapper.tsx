import { Alert, Snackbar } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { SnackbarMsg } from '../models';
import { EMAIL, FAVORITE_SONG_IDS_BY_USER, getLocalStorageItem, setLocalStorageItem } from '../services/LocalStorageService';

const defaultSnackBarMsg: SnackbarMsg = {
    message: "Unexpected error", variant: "error", open: false
};

export const ContextWrapper: FC = ({ children }) => {
    const [snackbarMsg, setSnackbarMsg] = useState(defaultSnackBarMsg);
    const [email, setEmail] = useState<string | null>(getLocalStorageItem(EMAIL) as string | null);
    const [favoriteSongIdsByUser, setFavoriteSongIdsByUser] = useState<Record<string, Record<number, number>>>(
        getLocalStorageItem(FAVORITE_SONG_IDS_BY_USER) as Record<string, Record<number, number>> ?? {}
    );

    const handleSnackbarClose = () => setSnackbarMsg((prev) => ({ ...prev, open: false }));

    /**
     * Persist in localStorage
     */
    useEffect(() => {
        if (email) setLocalStorageItem(EMAIL, email);
        if (favoriteSongIdsByUser) setLocalStorageItem(FAVORITE_SONG_IDS_BY_USER, favoriteSongIdsByUser);
    }, [email, favoriteSongIdsByUser])

    return (
        <AppContext.Provider
            value={{
                snackbarMsg, setSnackbarMsg,
                email, setEmail,
                favoriteSongIdsByUser, setFavoriteSongIdsByUser,
            }}
        >
            {children}
            <Snackbar open={snackbarMsg.open} autoHideDuration={4000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarMsg.variant} sx={{ width: '100%' }}>
                    {snackbarMsg.message}
                </Alert>
            </Snackbar>
        </AppContext.Provider >
    )
}
