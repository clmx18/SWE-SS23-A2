import { Alert, Box, Button, Card, Snackbar, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { login, logout } from '../api/graphql';
import { styled } from '@mui/material/styles';
import LoginContext from '../context/LoginProvider';

const CenteredBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const LoginForm = styled('form')({
  width: '300px',
  padding: '16px',
  backgroundColor: '#fff',
  borderRadius: '4px',
});

const InputField = styled(TextField)({
  marginBottom: '16px',
});

function LoggedOut() {
  const credentialsDefaultState = {
    username: '',
    password: '',
  };

  const { setError, updateIsLoggedIn } = useContext(LoginContext);

  // useStates
  const [credentials, setCredentials] = useState(credentialsDefaultState);

  const resetCredentials = () => {
    setCredentials(credentialsDefaultState);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Handle form submission logic here
    const { username, password } = credentials;
    login(username, password).then((result) => {
      const { errors, loggedIn } = result;
      if (loggedIn) {
        updateIsLoggedIn();
      }
      if (errors.length > 0) {
        let errMessage = '';
        errors.forEach((error) => {
          errMessage = `${error}\n${errMessage}`;
        });
        setError(errMessage);
      }
    });
    resetCredentials();
  };

  return (
    <>
      <LoginForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <InputField
          variant="outlined"
          required
          fullWidth
          id="username"
          label="Benutzername"
          name="username"
          onChange={handleChange}
          value={credentials.username}
          type="text"
          autoComplete="username"
          autoFocus
        />
        <InputField
          variant="outlined"
          required
          fullWidth
          id="password"
          label="Passwort"
          name="password"
          onChange={handleChange}
          value={credentials.password}
          type="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{ backgroundColor: '#DC143C' }}
        >
          Anmelden
        </Button>
      </LoginForm>
    </>
  );
}

function LoggedIn() {
  const { username, updateIsLoggedIn } = useContext(LoginContext);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    logout();
    updateIsLoggedIn();
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <h2>Angemeldet</h2>
      <h4>als User '{username}'</h4>
      <Button
          fullWidth
          type="submit"
          variant="contained"
          style={{ backgroundColor: '#DC143C' }}
      >
        Abmelden
      </Button>
    </LoginForm>
  );
}

function Login() {
  const { error, setError, isLoggedIn, updateIsLoggedIn } = useContext(LoginContext);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // useEffects
  useEffect(() => {
    setShowSnackbar(error !== undefined);
  }, [error]);

  useEffect(() => {
    updateIsLoggedIn()
  }, []);

  const handleClose = () => {
    setError(undefined);
  };

  return (
      <CenteredBox>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
        <Card style={{
                  textAlign: 'center',
                  marginBottom: '2rem',
                  padding: '1rem',
                }}>
          { isLoggedIn && <LoggedIn /> }
          { !isLoggedIn && <LoggedOut /> }
        </Card>
      </CenteredBox>
  );
}

export default Login;