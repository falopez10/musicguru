import { PlayArrow } from '@mui/icons-material'
import { Card, Box, CardContent, Typography, IconButton, CardMedia, Grid } from '@mui/material'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    id: number;
    composition: string;
    composer: string;
}

export const FavoriteSongItem: FC<Props> = ({ id, composition, composer }) => {
    return (
        <Grid item>
            <Card sx={{ display: 'flex' }} className="card">
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Link to={`/detail/${id}`}>
                            <Typography component="div" variant="h5">
                                {composition}
                            </Typography>
                        </Link>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {composer}
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <IconButton aria-label="play" target="_blank"
                            href={`https://www.youtube.com/results?search_query=${composition}`}
                        >
                            <PlayArrow sx={{ height: 38, width: 38 }} />
                        </IconButton>
                    </Box>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="https://user-images.githubusercontent.com/16781175/150435285-6cad42f4-c0ee-412b-b0ad-ec17c4dc83b3.jpg"
                    alt="Live from space album cover"
                />
            </Card>
        </Grid>
    )
}
