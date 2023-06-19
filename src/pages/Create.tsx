import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Typography,
} from '@mui/material';
import { BuchInput, TitelInput } from '../api/interfaces';
import { useContext, useState } from 'react';
import LoginContext from '../context/LoginProvider';
import { createBuch } from '../api/graphql';
import { parse as parseIsbn } from 'isbn-utils';

function Create() {
  const [validationErrors, setValidationErrors] = useState({
    titel: { isValid: undefined, message: '' },
    isbn: { isValid: undefined, message: '' },
    rating: { isValid: undefined, message: '' },
    art: { isValid: undefined, message: '' },
    preis: { isValid: undefined, message: '' },
    rabatt: { isValid: undefined, message: '' },
    homepage: { isValid: undefined, message: '' },
    schlagwoerter: { isValid: undefined, message: '' },
    bookCreated: { isValid: undefined, message: '' },
  });

  const [titelInput, setTitelInput] = useState<TitelInput>({
    titel: '',
  });

  const [schlagwoerter, setSchlagwoerter] = useState<string>('');

  const [formValues, setFormValues] = useState<BuchInput>({
    titel: {
      titel: '',
    },
    isbn: '',
    rating: 0,
    art: 'DRUCKAUSGABE',
    preis: 9.95,
    rabatt: 0,
    lieferbar: false,
    datum: undefined,
    homepage: undefined,
    schlagwoerter: [],
  });

  const { isLoggedIn } = useContext(LoginContext);

  const setValidation = (name: string, isValid: boolean, message = '') => {
    setValidationErrors((prevState) => ({
      ...prevState,
      [name]: { isValid, message },
    }));
  };

  const splitSchlagwoerter = () => {
    const splittedSchlagwoerter = schlagwoerter.split(',');
    return splittedSchlagwoerter.map((wort) => wort.trim());
  };

  function checkIfEmpty() {
    if (titelInput.titel === '') {
      setValidation('titel', false, 'Titel darf nicht leer sein');
    }
    if (formValues.isbn === '') {
      setValidation('isbn', false, 'ISBN darf nicht leer sein');
    }
  }

  const validateInput = (name: any, value: any) => {
    switch (name) {
      case 'titel':
        if (/^\w.*$/u.test(value)) {
          setValidation(name, true);
        } else {
          setValidation(name, false, 'Ungültiger Titel');
        }
        break;
      case 'isbn':
        // eslint-disable-next-line no-case-declarations
        const isbn = parseIsbn(value);
        if (isbn && isbn.isIsbn13()) {
          setValidation(name, true);
        } else {
          setValidation(name, false, 'Ungültige ISBN');
        }
        break;
      case 'preis':
        if (/^[1-9]\d*(?:\.\d{1,2})?$/u.test(value)) {
          setValidation(name, true);
        } else {
          setValidation(name, false, 'Ungültiger Preis');
        }
        break;
      case 'rabatt':
        if (
          /^(0(?:.000|.\d{3})?|1(?:.000)?|0.0[0-9]{2}|0.[0-9]{1,2})$/u.test(
            value,
          )
        ) {
          setValidation(name, true);
        } else {
          setValidation(name, false, 'Ungültiger Rabatt');
        }
        break;
      case 'homepage':
        if (
          // eslint-disable-next-line max-len
          /^((?:http)s?:\/\/)?([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}$/u.test(
            value,
          )
        ) {
          setValidation(name, true);
        } else {
          setValidation(name, false, 'Ungültige Url');
        }
        break;
      case 'schlagwoerter':
        if (/^(\w*)?(,\s?(\w*))*$/u.test(value)) {
          setValidation(name, true);
        } else {
          setValidation(
            name,
            false,
            'Schlagwörter zusammenschreiben und durch Komma trennen',
          );
        }
        break;

      default:
        break;
    }
  };

  const handleTitelChange = (e: any) => {
    const { name, value } = e.target;
    validateInput(name, value);
    setTitelInput({ ...titelInput, [name]: value });
  };

  const handleSchlagwoerterChange = (e: any) => {
    const { name, value } = e.target;
    validateInput(name, value);
    setSchlagwoerter(value);
  };

  const handleRatingChange = (e: any) => {
    const { name, value } = e.target;
    const newValue = parseInt(value, 10);
    validateInput(name, newValue);
    setFormValues({ ...formValues, [name]: newValue });
  };

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    let newValue;

    if (type === 'checkbox') {
      newValue = checked;
    } else if (type === 'number') {
      newValue = parseFloat(value);
    } else {
      newValue = value;
    }

    validateInput(name, newValue);
    setFormValues({ ...formValues, [name]: newValue });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      checkIfEmpty();
      formValues.titel = titelInput;
      formValues.schlagwoerter = splitSchlagwoerter();
      const response = await createBuch(formValues);
      const { errors } = response.data;
      const statusCode = errors
        ? response.data.errors[0]?.extensions?.originalError?.statusCode
        : undefined;
      if (response.status === 200) {
        if (response.data.errors && statusCode === 403) {
          const errMsg = isLoggedIn
            ? 'Ungenügende Berechtigungen'
            : 'Nicht eingeloggt';
          setValidation('bookCreated', false, errMsg);
        } else if (response.data.errors && statusCode === 400) {
          setValidation(
            'bookCreated',
            false,
            'Buch konnte nicht erstellt werden',
          );
        } else if (
          response.data.errors &&
          response.data.errors[0].message ===
            `Die ISBN ${formValues.isbn} existiert bereits`
        ) {
          setValidation('isbn', false, 'Die ISBN existiert bereits');
          setValidation('bookCreated', false);
        } else {
          setValidation('bookCreated', true, 'Buch wurde erfolgreich erstellt');
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <Box display="flex" justifyContent="center">
      <form onSubmit={handleSubmit} style={{ width: '50%' }}>
        <Box textAlign="center" marginBottom="1rem">
          <Typography variant="h5">Buch neu anlegen</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box width="45%">
            <FormControl
              fullWidth
              margin="normal"
              sx={{ marginLeft: '1rem', marginTop: '1rem' }}
            >
              <Box display="flex" alignItems="center">
                <FormLabel sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
                  Titel
                </FormLabel>
                <Input
                  required
                  type="text"
                  name="titel"
                  value={titelInput.titel}
                  onChange={handleTitelChange}
                  sx={{ marginBottom: '1rem', marginLeft: '55px' }}
                />
              </Box>
              {validationErrors.titel.isValid === false && (
                <Typography variant="body2" sx={{ color: 'red' }}>
                  {validationErrors.titel.message}
                </Typography>
              )}
            </FormControl>
            <FormControl fullWidth margin="normal" sx={{ marginLeft: '1rem' }}>
              <Box display="flex" alignItems="center">
                <FormLabel sx={{ marginLeft: '1rem', marginRight: '2rem' }}>
                  ISBN
                </FormLabel>
                <Input
                  required
                  type="text"
                  name="isbn"
                  value={formValues.isbn}
                  onChange={handleInputChange}
                  sx={{ marginBottom: '1rem', marginLeft: '2rem' }}
                />
              </Box>
              {validationErrors.isbn.isValid === false && (
                <Typography variant="body2" sx={{ color: 'red' }}>
                  {validationErrors.isbn.message}
                </Typography>
              )}
            </FormControl>
            <FormControl fullWidth margin="normal" sx={{ marginLeft: '1rem' }}>
              <Box display="flex" alignItems="center">
                <FormLabel sx={{ marginLeft: '1rem', marginRight: '2rem' }}>
                  Preis
                </FormLabel>
                <Input
                  type="number"
                  name="preis"
                  value={formValues.preis}
                  onChange={handleInputChange}
                  sx={{ marginBottom: '1rem', marginLeft: '2rem' }}
                />
              </Box>
              {validationErrors.preis.isValid === false && (
                <Typography variant="body2" sx={{ color: 'red' }}>
                  {validationErrors.preis.message}
                </Typography>
              )}
            </FormControl>
            <FormControl fullWidth margin="normal" sx={{ marginLeft: '1rem' }}>
              <Box display="flex" alignItems="center">
                <FormLabel sx={{ marginLeft: '1rem', marginRight: '20px' }}>
                  Rabatt
                </FormLabel>
                <Input
                  type="number"
                  name="rabatt"
                  value={formValues.rabatt}
                  onChange={handleInputChange}
                  sx={{ marginBottom: '1rem', marginLeft: '2rem' }}
                />
              </Box>
              {validationErrors.rabatt.isValid === false && (
                <Typography variant="body2" sx={{ color: 'red' }}>
                  {validationErrors.rabatt.message}
                </Typography>
              )}
            </FormControl>
            <FormControl fullWidth margin="normal" sx={{ marginLeft: '1rem' }}>
              <Box display="flex" alignItems="center">
                <FormLabel sx={{ marginLeft: '1rem', marginRight: '20px' }}>
                  Homepage
                </FormLabel>
                <Input
                  type="text"
                  name="homepage"
                  value={formValues.homepage}
                  onChange={handleInputChange}
                  sx={{ marginBottom: '1rem' }}
                />
              </Box>
              {validationErrors.homepage.isValid === false && (
                <Typography variant="body2" sx={{ color: 'red' }}>
                  {validationErrors.homepage.message}
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box width="45%">
            <FormControl fullWidth margin="normal" sx={{ marginLeft: '1rem' }}>
              <Box display="flex" alignItems="center">
                <FormLabel sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
                  Schlagwoerter
                </FormLabel>
                <Input
                  type="text"
                  name="schlagwoerter"
                  value={schlagwoerter}
                  onChange={handleSchlagwoerterChange}
                  sx={{ marginBottom: '1rem' }}
                />
              </Box>
              {validationErrors.schlagwoerter.isValid === false && (
                <Typography variant="body2" sx={{ color: 'red' }}>
                  {validationErrors.schlagwoerter.message}
                </Typography>
              )}
            </FormControl>
            <FormControl
              fullWidth
              margin="normal"
              sx={{ marginBottom: '1rem', marginLeft: '1rem' }}
            >
              <Box display="flex" alignItems="center">
                <FormLabel sx={{ marginLeft: '1rem', marginRight: '2rem' }}>
                  Datum
                </FormLabel>
                <Input
                  type="date"
                  name="datum"
                  value={formValues.datum}
                  onChange={handleInputChange}
                  sx={{ marginBottom: '1rem', marginLeft: '3rem' }}
                />
              </Box>
            </FormControl>
            <FormControl
              fullWidth
              margin="normal"
              sx={{ marginTop: '2rem', marginLeft: '1rem' }}
            >
              <Box display="flex" alignItems="center">
                <FormLabel sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
                  Rating
                </FormLabel>
                <Rating
                  name="rating"
                  value={formValues.rating}
                  onChange={handleRatingChange}
                  sx={{ marginLeft: '4rem' }}
                />
              </Box>
            </FormControl>
            <FormControl
              fullWidth
              margin="normal"
              sx={{ marginTop: '3rem', marginLeft: '1rem' }}
            >
              <Box display="flex" alignItems="center">
                <FormLabel sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
                  Lieferbar
                </FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="lieferbar"
                      checked={formValues.lieferbar}
                      onChange={handleInputChange}
                      sx={{ marginLeft: '6rem' }}
                    />
                  }
                  label={null}
                />
              </Box>
            </FormControl>
            <FormControl
              fullWidth
              sx={{ marginTop: '2rem', marginLeft: '2rem' }}
            >
              <InputLabel id="art-select-label">Art</InputLabel>
              <Select
                labelId="art-select-label"
                id="art-select"
                label="Art"
                name="art"
                value={formValues.art}
                onChange={handleInputChange}
                style={{ marginBottom: '1rem' }}
              >
                <MenuItem value={'DRUCKAUSGABE'}>DRUCKAUSGABE</MenuItem>
                <MenuItem value={'KINDLE'}>KINDLE</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box textAlign="center" marginTop="1rem" marginRight="1rem">
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              style={{ backgroundColor: '#DC143C' }}
            >
              Buch erstellen
            </Button>
          </Box>
          {validationErrors.bookCreated.isValid !== undefined && (
            <Box display="flex" alignItems="center" justifyContent="center">
              <Typography
                variant="body2"
                sx={{
                  color:
                    validationErrors.bookCreated.isValid === false
                      ? 'red'
                      : 'green',
                  margin: '1rem 0 0 0',
                }}
              >
                {validationErrors.bookCreated.message}
              </Typography>
            </Box>
          )}
        </Box>
      </form>
    </Box>
  );
}

export default Create;
