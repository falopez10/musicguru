import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { FC, useContext, useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { AppContext } from '../context/AppContext';
import { mainRoutes } from '../models/routes';

export const Main: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = useContext(AppContext);

    useEffect(() => {
        if (!email) navigate("/login");
        else if (location.pathname === "/") navigate("/home");
    }, [email, location.pathname, navigate]);

    const bottomNavigationIndex = useMemo(
        () => mainRoutes.findIndex(({ path }) => path === location.pathname),
        [location.pathname]
    );


    return <Box sx={styles.container}>
        <TopBar />
        <Box sx={styles.outletContainer}>
            <Outlet />
        </Box>
        <BottomNavigation
            showLabels
            value={bottomNavigationIndex}
        >
            {
                mainRoutes.map(({ label, Icon, path }) =>
                    <BottomNavigationAction
                        key={path}
                        label={label}
                        icon={<Icon />}
                        onClick={() => navigate(path)}
                    />
                )
            }
        </BottomNavigation>
    </Box >;
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
    },
    outletContainer: {
        maxHeight: "80%",
        marginX: 1,
        overflow: "auto",
    },
};
