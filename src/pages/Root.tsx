import { Box } from '@mui/material';
import React, { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { EMAIL_KEY } from '../services/AuthService';
import { getLocalStorageItem } from '../services/LocalStorageService';

export const Root: FC = () => {
    const navigate = useNavigate();
    const email = getLocalStorageItem(EMAIL_KEY);
    useEffect(() => {
        if (!email) navigate("/login");
    }, [])


    return <Box>
        <Outlet />
    </Box>;
}
