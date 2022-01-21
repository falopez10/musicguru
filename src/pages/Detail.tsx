import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { Box, CircularProgress, Divider, Grid, IconButton, Paper, Typography } from '@mui/material';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useFavorite } from '../hooks/useFavorite';
import { Song } from '../models';
import { fetchSong } from '../services/SongService';

export const Detail = () => {
    const { setSnackbarMsg, email, favoriteSongIdsByUser, setFavoriteSongIdsByUser } = useContext(AppContext);
    const navigate = useNavigate();
    let { id } = useParams();

    const [song, setSong] = useState<Song | null>(null)
    const [isFavorite, toggleFavoriteSong] = useFavorite(id ? parseInt(id) : -1, email, favoriteSongIdsByUser, setFavoriteSongIdsByUser);

    async function retrieveSong() {
        try {
            if (!id) {
                setSnackbarMsg({
                    message: "Song id required",
                    variant: "error",
                    open: true,
                });
                navigate("/home");
            }
            else {
                const _song = await fetchSong(parseInt(id));
                setSong(_song);
            }

        } catch (error) {
            setSnackbarMsg({
                message: "Song id not valid",
                variant: "error",
                open: true,
            });
        }
    }

    useEffect(() => {
        retrieveSong();
    }, [id])

    return (
        <Box sx={{ height: "100%", margin: 2, display: "flex", alignItems: song ? "space-between" : "center", flexDirection: "column" }}>
            {
                song ?
                    <Fragment>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="h4" sx={{ marginTop: 0 }}>{song.composition}</Typography>
                            <IconButton
                                edge="end" aria-label="favorite"
                                onClick={toggleFavoriteSong} color={isFavorite ? "primary" : "default"}
                            >
                                <FavoriteIcon />
                            </IconButton>
                        </Box>
                        <Divider sx={{ marginY: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Paper sx={styles.paper} elevation={14}>
                                    <b>Composer: </b> {song.composer}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper sx={styles.paper} elevation={14}>
                                    This {song.seconds} seconds composition was part of the <i>"{song.movement}"</i> movement,
                                    written for a ensemble of <b>{song.ensemble}</b>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} >
                                <Paper sx={styles.paper} elevation={14}>
                                    <h3>Source</h3>
                                    <ul>
                                        <li>
                                            Transcriber: {song.transcriber}
                                        </li>
                                        <li>
                                            Catalog: {song.catalog_name}
                                        </li>
                                        <li>
                                            Source: {song.source}
                                        </li>
                                    </ul>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Fragment> :
                    <CircularProgress />
            }
        </Box>
    )
}

const styles = {
    paper: {
        padding: 1,
        // height: "100%",
        fontSize: 20,
    }
}
