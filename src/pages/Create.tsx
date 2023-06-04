/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-lines-per-function */
/* eslint-disable func-style */
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';

import { useState } from 'react';

function Create() {
  const [formValues, setFormValues] = useState({
    isbn: '',
    rating: null,
    art: '',
    preis: '',
    rabatt: '',
    lieferbar: false,
    datum: '',
    homepage: '',
    schlagwoerter: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormValues({ ...formValues, [name]: newValue });
  };

  const handleRatingChange = (event, newValue) => {
    setFormValues({ ...formValues, rating: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Buchdaten speichern oder verarbeiten
    console.log(formValues);
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
                <FormLabel sx={{ marginLeft: '2rem', marginRight: '2rem' }}>
                  ISBN
                </FormLabel>
                <Input
                  type="text"
                  name="isbn"
                  value={formValues.isbn}
                  onChange={handleInputChange}
                  sx={{ marginBottom: '1rem', marginLeft: '2rem' }}
                />
              </Box>
              <FormControl
                fullWidth
                margin="normal"
                sx={{ marginLeft: '1rem' }}
              >
                <Box display="flex" alignItems="center">
                  <FormLabel sx={{ marginLeft: '1rem', marginRight: '2rem' }}>
                    Preis
                  </FormLabel>
                  <Input
                    type="text"
                    name="preis"
                    value={formValues.preis}
                    onChange={handleInputChange}
                    sx={{ marginBottom: '1rem', marginLeft: '2rem' }}
                  />
                </Box>
              </FormControl>
              <FormControl
                fullWidth
                margin="normal"
                sx={{ marginLeft: '1rem' }}
              >
                <Box display="flex" alignItems="center">
                  <FormLabel sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
                    Rabatt
                  </FormLabel>
                  <Input
                    type="text"
                    name="rabatt"
                    value={formValues.rabatt}
                    onChange={handleInputChange}
                    sx={{ marginBottom: '1rem', marginLeft: '2rem' }}
                  />
                </Box>
              </FormControl>
              <FormControl
                fullWidth
                margin="normal"
                sx={{ marginLeft: '1rem' }}
              >
                <Box display="flex" alignItems="center">
                  <FormLabel sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
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
              </FormControl>
            </FormControl>
          </Box>
          <Box width="45%">
            <FormControl fullWidth margin="normal" sx={{ marginLeft: '1rem' }}>
              <Box display="flex" alignItems="center">
                <FormLabel sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
                  Schlagwörter
                </FormLabel>
                <Input
                  type="text"
                  name="schlagwörter"
                  value={formValues.schlagwoerter}
                  onChange={handleInputChange}
                  sx={{ marginBottom: '1rem' }}
                />
              </Box>
            </FormControl>
            <FormControl fullWidth margin="normal" sx={{ marginLeft: '1rem' }}>
              <Box display="flex" alignItems="center">
                <FormLabel sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
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
            <FormControl fullWidth margin="normal" sx={{ marginLeft: '1rem' }}>
              <Box display="flex" alignItems="center">
                <FormLabel sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
                  Rating
                </FormLabel>
                <Rating
                  value={formValues.rating}
                  onChange={handleRatingChange}
                  sx={{ marginLeft: '4rem' }}
                />
              </Box>
            </FormControl>
            <FormControl fullWidth margin="normal" sx={{ marginLeft: '1rem' }}>
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
              margin="normal"
              sx={{ marginLeft: '1rem', marginTop: '1rem' }}
            >
              <Box display="flex" alignItems="center">
                <FormLabel sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
                  Art
                </FormLabel>
                <Select
                  labelId="art-select-label"
                  id="art-select"
                  name="art"
                  value={formValues.art}
                  onChange={handleInputChange}
                  style={{ marginLeft: '2rem' }}
                >
                  <MenuItem value={'DRUCKAUSGABE'}>DRUCKAUSGABE</MenuItem>
                  <MenuItem value={'KINDLE'}>KINDLE</MenuItem>
                </Select>
              </Box>
            </FormControl>
          </Box>
        </Box>
        <Box textAlign="center" marginTop="1rem">
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            style={{ backgroundColor: '#DC143C' }}
          >
            Buch erstellen
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Create;
