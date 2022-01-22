import { Box, Grid, Divider, Typography } from '@mui/material'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FavoriteSongItem } from '../components/FavoriteSongItem';
import { AppContext } from '../context/AppContext';
import { Song } from '../models';
import { fetchFavoriteSongs } from '../services/SongService';

export const Favorites = () => {
    const { favoriteSongIdsByUser, email } = useContext(AppContext);
    const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);

    const retrieveSongs = useCallback(async () => {
        if (!email) return;
        const _songs = await fetchFavoriteSongs(favoriteSongIdsByUser[email]);
        setFavoriteSongs(_songs);
    }, [email, favoriteSongIdsByUser]);
    useEffect(() => {
        retrieveSongs();
    }, [email, favoriteSongIdsByUser, retrieveSongs]);
    return (
        <Box sx={{ height: "100%", margin: 2 }}>
            <Typography variant="h4" sx={{ marginTop: 0 }}>Your favorite songs</Typography>
            <Divider sx={{ marginY: 2 }} />
            <Grid container spacing={2}>
                {
                    favoriteSongs.map(({ id, composition, composer }) =>
                        <FavoriteSongItem key={id} id={id} composition={composition} composer={composer} />
                    )
                }
            </Grid>
        </Box>
    )
}
