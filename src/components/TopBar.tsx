import { ArrowBack, AccountCircle } from '@mui/icons-material';
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, { FC, useContext } from 'react';
import { useLocation, useNavigate, } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export const TopBar: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setEmail } = useContext(AppContext);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function goBack() {
        navigate(-1);
    }

    function logout() {
        setEmail(null);
    }

    return (
        <AppBar position="static">
            <Toolbar>
                {location.pathname.includes("detail") &&
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ marginRight: 2 }}
                        onClick={goBack}
                    >
                        <ArrowBack />
                    </IconButton>
                }
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Music Guru
                </Typography>
                <IconButton aria-label="menu" size="large" onClick={handleOpen}>
                    <AccountCircle />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}
