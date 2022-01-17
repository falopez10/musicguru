import { CheckCircle, Warning, Error as ErrorIcon, Info, Close } from '@mui/icons-material';

export const variantIcon = {
    success: CheckCircle,
    warning: Warning,
    error: ErrorIcon,
    info: Info,
};

/**
 * variant must be one from the defined in Toast
 */
export interface SnackbarMsg {
    message: string;
    variant: keyof typeof variantIcon;
    open: boolean;
}