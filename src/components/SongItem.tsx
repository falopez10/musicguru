import { Favorite as FavoriteIcon, LibraryMusic as MusicIcon, OpenInNew } from '@mui/icons-material';
import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { FC, Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useFavorite } from '../hooks/useFavorite';

interface Props {
    id: number,
    composition: string,
    composer: string
}

export const SongItem: FC<Props> = ({ id, composition, composer }) => {
    const navigate = useNavigate();
    const { email, favoriteSongIdsByUser, setFavoriteSongIdsByUser } = useContext(AppContext);

    const [isFavorite, toggleFavoriteSong] = useFavorite(id, email, favoriteSongIdsByUser, setFavoriteSongIdsByUser);


    function openNewPageDetail() {
        window.open(`/detail/${id}`, '_blank');
    }
    function openDetail() {
        navigate(`/detail/${id}`)
    }


    return (
        <ListItem disablePadding
            className="slideUpItem"
            secondaryAction={
                <Fragment>
                    <IconButton color={isFavorite ? "primary" : "default"}>
                        <OpenInNew onClick={openNewPageDetail} />
                    </IconButton>
                    <IconButton
                        edge="end" aria-label="favorite"
                        onClick={toggleFavoriteSong} color={isFavorite ? "primary" : "default"}
                    >
                        <FavoriteIcon />
                    </IconButton>
                </Fragment >
            }>

            <ListItemButton onClick={openDetail}>
                <ListItemIcon >
                    <MusicIcon color={isFavorite ? "primary" : "action"} />
                </ListItemIcon>
                <ListItemText primary={composition} secondary={composer} />
            </ListItemButton>
        </ListItem >
    )
}
