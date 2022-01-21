import { Favorite as FavoriteIcon, Home as HomeIcon } from '@mui/icons-material';

interface Route {
    path: string;
    label: string;
    Icon: any;
}

export const mainRoutes: Route[] = [
    {
        path: "/home",
        label: "Home",
        Icon: HomeIcon,
    },
    {
        path: "/favorites",
        label: "Favorites",
        Icon: FavoriteIcon,
    },
];