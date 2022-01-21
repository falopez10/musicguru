import { Box, Button, Grid, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export const Login = () => {
    const navigate = useNavigate();

    const { setEmail, setSnackbarMsg } = useContext(AppContext)

    const [user, setUser] = useState<string>("");
    const [errorU, setErrorU] = useState<boolean>(false);

    const [password, setPassword] = useState<string>("");
    const [errorP, setErrorP] = useState<boolean>(false);

    useEffect(() => setErrorU(user === ""), [user]);
    useEffect(() => setErrorP(password === ""), [password]);

    function handleSignInClick() {
        if (user === "" || password === "") {
            setSnackbarMsg({
                message: "remember to enter user and password",
                variant: "error",
                open: true,
            });
            return;
        }
        setEmail(user);
        navigate("/home");
    }

    return (
        <Grid container spacing={3} style={{ padding: 0, margin: 0 }}>
            <Grid item xs={12} sm={5} style={{ height: "100%", padding: 0, margin: 0 }}>
                <Box sx={styles.formContainer}>
                    <Box sx={styles.form}>
                        <div>
                            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                                <h1 style={{ margin: 0, fontWeight: "bold" }}>
                                    MusicGuru
                                </h1>
                            </div>
                            <h2>Your best buddy in music stats</h2>
                        </div>
                        <div>Please enter your credentials</div>
                        <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
                            <TextField
                                required
                                error={errorU}
                                id="user-tf"
                                label="User"
                                value={user}
                                onChange={(event: any) => setUser(event.target.value)}
                                sx={styles.textField}
                                margin="normal"
                                variant="filled"
                                onKeyPress={(ev) =>
                                    ev.key === 'Enter' && handleSignInClick()
                                }
                            />
                            <TextField
                                required
                                error={errorP}
                                id="password-tf"
                                label="Password"
                                value={password}
                                onChange={(event: any) => setPassword(event.target.value)}
                                sx={styles.textField}
                                margin="normal"
                                type="password"
                                variant="filled"
                                onKeyPress={(ev) =>
                                    ev.key === 'Enter' && handleSignInClick()
                                }
                            />
                        </div>
                        <Button
                            sx={styles.formButton}
                            variant="contained" onClick={handleSignInClick}>
                            Let me in
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={7} style={{ padding: 0, margin: 0 }}>
                <Box sx={styles.infoContainer}>
                    <h1>Lorem</h1>
                    <h2>Lorem ipsum sic mundus creatus est</h2>
                    <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam exercitationem quod hic? In magni possimus nam velit illo. Unde nostrum consequuntur consequatur, laboriosam incidunt ut voluptatibus fuga aliquid tenetur! Officiis?</h3>

                </Box>
            </Grid>
        </Grid>
    )
}

const styles: any = {
    container: {
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        "& div,body": {
            fontSize: 13,
        }
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        height: "100%",
    },
    textField: {
        marginRight: 1,
        marginTop: 0,
        marginBottom: 0,
    },
    formContainer: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 4,
        "& *": {
            fontWeight: "100",
        },
        maxHeight: 550,
    },
    formButton: {
        marginY: 1,
        marginX: 0,
    },
    infoContainer: {
        height: "100%",
        // padding: theme.spacing(4, 8),
        padding: 4,
        overflowY: "auto",
        "& h1,h2,h3": {
            // margin: theme.spacing(2, 0, 2, 0),
            marginY: 1,
            marginX: 0,
            fontWeight: "100",

        },
        "& div,body": {
            fontWeight: "100",
            margin: 1,
        },
    },
};