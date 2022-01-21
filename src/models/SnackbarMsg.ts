import { AlertColor } from '@mui/material';

/**
 * variant must be one from the defined in Toast
 */
export interface SnackbarMsg {
    message: string;
    variant: AlertColor;
    open: boolean;
}