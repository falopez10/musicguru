import { Autocomplete, Box, Button, List, Pagination, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { SongItem } from '../components/SongItem';
import { Song } from '../models';
import { fetchSongs } from '../services/SongService';

const ITEMS_PER_PAGE = 20;

export const Home = () => {

    const [songs, setSongs] = useState<Song[]>([]);
    const [pages, setPages] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [songName, setSongName] = useState<string | null>("");

    async function retrieveSongs(_page: number) {
        const { songs: _songs, pages: _pages } = await fetchSongs(ITEMS_PER_PAGE, _page - 1, null);
        setSongs(_songs);
        setPages(_pages);
    }

    async function retrieveFilteredSongs() {
        const { songs: _songs, pages: _pages } = await fetchSongs(ITEMS_PER_PAGE, 0, songName);
        setPage(1);
        setSongs(_songs);
        setPages(_pages);
        setSongName("");
    }

    async function changePage(event: React.ChangeEvent<unknown>, newPage: number) {
        setPage(newPage);
        retrieveSongs(newPage);
    }

    // unique string array
    const songNames: string[] = useMemo(
        () => songs.map(({ composition }) => composition)
            .filter((v, i, a) => a.indexOf(v) === i),
        [songs]);

    useEffect(() => {
        retrieveSongs(1);
    }, []);

    return (
        <Box sx={{ height: "100%", display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
            <div>
                <h2>Navigate to any song and select your favorite ones!</h2>
                <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 1 }}>
                    <Autocomplete
                        disablePortal
                        freeSolo
                        options={songNames}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Song Name" />}
                        onInputChange={(event: any, newValue: string | null) => setSongName(newValue)}
                        onKeyPress={(ev) => ev.key === 'Enter' && retrieveFilteredSongs()}
                    />
                    <Button color="primary" variant="contained" onClick={retrieveFilteredSongs} >
                        Search
                    </Button>
                </Box>
            </div>
            <List sx={{ overflow: "auto" }}>
                {songs.map(({ id, composition, composer }) =>
                    <SongItem key={id} id={id} composition={composition} composer={composer} />
                )}
            </List>
            <Box className="slideUpItem">
                {
                    pages > 0 &&
                    <Pagination sx={{ margin: 1 }} count={pages} page={page} onChange={changePage} color="secondary" />
                }
            </Box>
        </Box >
    )
}
