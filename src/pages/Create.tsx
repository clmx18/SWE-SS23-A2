import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  MenuItem,
  Rating,
  Select,
  Typography,
} from '@mui/material';

import { useState } from 'react';
import { createBuch } from '../api/graphql';
import { BuchInput } from '../api/interfaces';

function Create() {
  const [isBookCreated, setIsBookCreated] = useState<boolean | null>(null);
  const [formValues, setFormValues] = useState<BuchInput>({
    isbn: '',
    titel: {titel: ''},
    rating: 0,
    art: '',
    preis: 0,
    rabatt: 0,
    lieferbar: false,
    datum: '',
    homepage: '',
    schlagwoerter: [],
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormValues({ ...formValues, [name]: newValue });
  };

  const handleRatingChange = (event, newValue) => {
    setFormValues({ ...formValues, rating: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createBuch(formValues);
  
      if (response.status === 200) {
        console.log('Buch erfolgreich erstellt:', response.data);
        setIsBookCreated(true);
      } else {
        console.log('Fehler beim Erstellen des Buchs:', response.data);
        setIsBookCreated(false);
        
      }
    } catch (error: any) {
      console.log('Fehler beim Erstellen des Buchs:', error);
      setIsBookCreated(false);
      const errorMessage = error.message;
        alert(`Fehler beim Erstellen des Buchs: ${errorMessage}`);
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
                  type="text"
                  name="titel"
                  value={formValues.titel}
                  onChange={handleInputChange}
                  sx={{ marginBottom: '1rem', marginLeft: '3.5rem', marginRight: '0,5rem' }}
                />
              </Box>
              </FormControl>
              <FormControl
                fullWidth
                margin="normal"
                sx={{ marginLeft: '1rem' }}
              >
                <Box display="flex" alignItems="center">
                  <FormLabel sx={{ marginLeft: '1rem', marginRight: '2rem' }}>
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
              </FormControl>
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
                    type="number"
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
                    type="number"
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
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              style={{ backgroundColor: '#DC143C', marginRight: '1rem' }}
            >
              Buch erstellen
            </Button>
            {isBookCreated === true && (
              <Typography variant="body1" sx={{ color: 'green' }}>
                Buch erfolgreich erstellt
              </Typography>
            )}
            {isBookCreated === false && (
              <Typography variant="body1" sx={{ color: 'red' }}>
                Fehler beim Erstellen des Buchs
              </Typography>
            )}
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default Create;
