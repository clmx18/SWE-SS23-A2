import { Alert, Box, Button, Snackbar, TextField } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { login } from '../api/graphql';
import { styled } from '@mui/material/styles';

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

// eslint-disable-next-line max-lines-per-function
export default function Login() {
  const credentialsDefaultState = {
    username: '',
    password: '',
  };

  // useStates
  const [credentials, setCredentials] = React.useState(credentialsDefaultState);
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [error, setError] = React.useState(undefined);

  // useEffects
  React.useEffect(() => {
      setShowSnackbar(error !== undefined);
  }, [error]);

  const resetCredentials = () => {
    setCredentials(() => credentialsDefaultState);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setError(undefined)
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Handle form submission logic here
    const { username, password } = credentials;
    login(username, password)
      .then((result) => {
        const { errors, data } = result.data;
        const { login } = data;
        if (login) {
          const { token, expiresIn, roles } = login;
          console.log(token);
        }
        if (errors) {
          const errMessage = errors
            .flatMap((err: any) => err.message)
            .toString();
          setError(errMessage);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
    resetCredentials();
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
    </CenteredBox>
  );
}
