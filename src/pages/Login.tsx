import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { login } from '../api/graphql';

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

function Login() {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <CenteredBox>
      <LoginForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <InputField
          variant="outlined"
          required
          fullWidth
          id="username"
          label="Benutzername"
          name="username"
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
          type="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={() => login('admin', 'p')}
          style={{ backgroundColor: '#DC143C' }}
        >
          Anmelden
        </Button>
      </LoginForm>
    </CenteredBox>
  );
}

export default Login;
