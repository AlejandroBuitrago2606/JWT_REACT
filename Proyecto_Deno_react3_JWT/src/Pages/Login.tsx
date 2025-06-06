import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {

    const navigate = useNavigate();

    const handleSubmit = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {


        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const email = data.get('email');
        const clave = data.get('password');

        if (!email || !clave) {
            return alert("Campos Vacios");
        }

        //alert(`email: ${email}, clave: ${clave}`);


        fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, clave: clave })
        })
            .then(respuesta => {
                if (!respuesta.ok) {
                    console.log('Credenciales incorrectas.');
                    return alert('Credenciales incorrectas.');
                }
                return respuesta.json();
            })
            .then(datos => {

                const NombreUsuario = datos.data;
                const Token = datos.accessToken;

                sessionStorage.setItem('TokenUsuario', JSON.stringify(Token)); //Guardar Token del usuario en el sessionStorage
                sessionStorage.setItem('NombreUsuario', JSON.stringify(NombreUsuario)); //Guardar Nombre del usuario en el sessionStorage

                alert('Iniciaste sesion como' + ' ' + NombreUsuario);

                setTimeout(() => {
                    navigate('/inicio');
                }, 700);


            })
            .catch(error => {

                console.log(`Error interno del servidor: ${error}`);
            })

    };

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    borderRadius: 3,
                    px: 5,
                    py: 7,
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
                        borderRadius: '12px 12px 0 0',
                    }
                }}
            >
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        fontWeight: 600,
                        color: '#1a1a1a',
                        mb: 1,
                        letterSpacing: '-0.02em'
                    }}
                >
                    Iniciar Sesión
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: '#666',
                        mb: 3,
                        textAlign: 'center'
                    }}
                >
                    Ingresa tus credenciales para continuar
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo electrónico"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                backgroundColor: '#fafafa',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                },
                                '&.Mui-focused': {
                                    backgroundColor: '#ffffff',
                                    boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)',
                                }
                            },
                            '& .MuiInputLabel-root': {
                                color: '#666',
                                fontWeight: 500,
                            }
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                backgroundColor: '#fafafa',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                },
                                '&.Mui-focused': {
                                    backgroundColor: '#ffffff',
                                    boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)',
                                }
                            },
                            '& .MuiInputLabel-root': {
                                color: '#666',
                                fontWeight: 500,
                            }
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value="remember"
                                color="primary"
                                sx={{
                                    '&.Mui-checked': {
                                        color: '#1976d2',
                                    }
                                }}
                            />
                        }
                        label={
                            <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                                Recordarme
                            </Typography>
                        }
                        sx={{ mt: 1 }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 4,
                            mb: 2,
                            py: 1.5,
                            borderRadius: 2,
                            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                            boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)',
                            fontWeight: 600,
                            fontSize: '1rem',
                            textTransform: 'none',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
                                boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                                transform: 'translateY(-1px)',
                            },
                            '&:active': {
                                transform: 'translateY(0)',
                            }
                        }}
                    >
                        Iniciar Sesión
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}