import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import addBook from '../images/addBook.png';
import library from '../images/library.jpg';
import listBook from '../images/listBook.png';

function Home() {
  return (
    <Box sx={{ flexGrow: 1, padding: '2rem' }}>
      <Grid container spacing={2}>
        {/* Top row */}
        <Grid item xs={12}>
          <Card>
            <CardMedia
              component="img"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                maxHeight: '40vh',
              }}
              image={library}
              alt="Cover Image"
            />
          </Card>
        </Grid>

        {/* Bottom row */}
        <Grid item xs={6}>
          <Card>
            <CardMedia
              component="img"
              sx={{ height: '30vh', objectFit: 'contain' }}
              image={addBook}
              alt="Image 1"
            />
            <CardContent>
              <h3>Buch anlegen</h3>
              <Typography
                sx={{ width: '60%', margin: 'auto', marginBottom: '1rem' }}
              >
                Hier können Sie ein neues Buch anlegen, und dabei Titel, ISBN,
                Preis, Rabatt, und vieles mehr definieren.
              </Typography>
              <Button href="/create" variant="contained" color="primary">
                Anlegen
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardMedia
              component="img"
              sx={{ height: '30vh', objectFit: 'contain' }}
              image={listBook}
              alt="Image 2"
            />
            <CardContent>
              <h3>Bücher durchsuchen</h3>
              <Typography
                sx={{ width: '60%', margin: 'auto', marginBottom: '1rem' }}
              >
                Hier können Sie alle existierenden Bücher durchsuchen, und dabei
                nach diversen Kriterien filtern.
              </Typography>
              <Button href="/search" variant="contained" color="primary">
                Suchen
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
