import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

import { useSelector, useDispatch } from 'react-redux';
import { getUsersLoginAsync, insigninOparation, startLogin, errorMessages, removeError } from '../../redux/user/userSlice'


const theme = createTheme();


const SignIn = () => {
    const error = useSelector(errorMessages);
    const insigninOparations = useSelector(insigninOparation);
    console.log("error: ", error);
    console.log("insigninOparations:", insigninOparations);

    //const startLogins = useSelector(startLogin);
    //console.log("insigninOparation", insigninOparation);

    const dispatch = useDispatch();

    let [loginData, setLoginData] = useState({
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
        pressLoginButton: false, //butona ilk defamı basıldı
    })

    function changeInput(e) {
        if (error && error.length > 0) {
            console.log("error: ", error);
            dispatch(removeError());
        }

        loginData = { ...loginData, [e.target.name]: e.target.value };
        validationInputs(); //1 
    }

    function validateEmail(email) { //3 email regex js
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (error && error.length > 0) {
            console.log("error: ", error);
            dispatch(removeError());
        }

        loginData = { ...loginData, pressLoginButton: true }; //ilk defa butona(submit) basıldığında true yapıyoruz. 



        if (validationInputs()) { //sonra validationInputs() çalıştır gelen true ise verileri gönder.
            const data = new FormData(event.currentTarget);
            // eslint-disable-next-line no-console
            console.log({
                email: data.get('email'),
                password: data.get('password'),
            });
            alert("3 sn sonra anasayfa'ya gider. bilgiler doğruysa");

            dispatch(getUsersLoginAsync({ email: data.get('email'), password: data.get('password') }));
            dispatch(startLogin());

        }
    };

    function validationInputs() { //2 

        if (!loginData.pressLoginButton) { //butona henüz basılmamışsa true dön
            setLoginData(loginData);
            return true;
        }

        //debugger;
        let isValid = true;

        if (loginData.password.length < 6) {
            isValid = false;
            loginData = ({ ...loginData, passwordError: "En az 6 karakter olmalı.." });
        } else {
            loginData = { ...loginData, passwordError: "" };
        }
        if (!validateEmail(loginData.email)) { //3
            isValid = false;
            loginData = { ...loginData, emailError: "Lütfen emailinizi kontrol ediniz" };
        } else {
            loginData = { ...loginData, emailError: "" };
        }

        setLoginData(loginData); //4 validate olduktan sonra yeni veriyi set ettik.
        return isValid; /* 67.satır if (validationInputs())'da işe yarıyor.  */

    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>


                        <TextField
                            value={loginData.email}
                            onChange={changeInput}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={loginData.emailError.length > 10} //Failed prop type: Invalid prop `error` of type `string` expected `boolean`
                            helperText={(loginData.emailError.length > 0) ? loginData.emailError : ""}
                        />


                        <TextField
                            value={loginData.password}
                            onChange={changeInput}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={loginData.passwordError.length > 0}
                            helperText={(loginData.passwordError.length > 0) ? loginData.passwordError : ""}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        {error && <div className="text-danger"> {error}</div>}

                        {insigninOparations ? <div className="text-center"><CircularProgress /></div> :
                            <Button type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }} >
                                Giriş Yap
                            </Button>
                        }

                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}

export default SignIn;