import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { queryBuch } from '../api/graphql';

function SearchDetails() {
  const params = useParams();
  const [buch, setBuch] = useState({
    id: '',
    version: '',
    isbn: '',
    rating: '',
    art: '',
    preis: '',
    rabatt: '',
    lieferbar: '',
    datum: '',
    homepage: '',
    schlagwoerter: '',
    titel: {
      titel: '',
      untertitel: '',
    },
  });

  useEffect(() => {
    if (params.id) {
      queryBuch(params.id)
        .then((buch) => {
          if (buch.data.data) {
            setBuch(buch.data.data.buch);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  return (
    <>
      <h2 style={{ padding: '0rem' }}>Detailansicht</h2>

      <Grid item md={9}>
        <div style={{ padding: '1rem' }}>
          <CardActions style={{ justifyContent: 'start' }}>
            <Button
              variant="contained"
              type="submit"
              style={{ backgroundColor: '#DC143C', color: '#FFF' }}
              component={Link}
              to={`/search`}
            >
              Zurück
            </Button>
          </CardActions>

          <Card
            style={{
              textAlign: 'left',
              marginBottom: '2rem',
              paddingLeft: '1rem',
            }}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{ marginLeft: '0.5rem' }}
              >
                {buch.titel.titel}
              </Typography>

              <Rating
                value={buch.rating}
                readOnly={true}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }}
                style={{ marginLeft: '0.5rem', marginBottom: '1rem' }}
              />

              <Typography
                gutterBottom
                variant="body1"
                component="div"
                style={{ marginLeft: '0.5rem' }}
              >
                <b>ID:</b> {buch.id}
              </Typography>

              <Typography
                gutterBottom
                variant="body1"
                component="div"
                style={{ marginLeft: '0.5rem' }}
              >
                <b>VERSION:</b> {buch.version}
              </Typography>

              <Typography
                gutterBottom
                variant="body1"
                component="div"
                style={{ marginLeft: '0.5rem' }}
              >
                <b>ISBN:</b> {buch.isbn}
              </Typography>

              <Typography
                gutterBottom
                variant="body1"
                component="div"
                style={{ marginLeft: '0.5rem' }}
              >
                <b>ART:</b> {buch.art}
              </Typography>

              <Typography
                gutterBottom
                variant="body1"
                component="div"
                style={{ marginLeft: '0.5rem' }}
              >
                <b>PREIS:</b> {''}
                {convertToPrice(buch.preis)}
              </Typography>

              <Typography
                gutterBottom
                variant="body1"
                component="div"
                style={{ marginLeft: '0.5rem' }}
              >
                <b>RABATT:</b> {''}
                {decimalToPercentage(buch.rabatt)}
              </Typography>

              <Typography
                gutterBottom
                variant="body1"
                component="div"
                style={{ marginLeft: '0.5rem' }}
              >
                <b>LIEFERBAR:</b> {buch.lieferbar === true ? 'Ja' : 'Nein'}
              </Typography>

              <Typography
                gutterBottom
                variant="body1"
                component="div"
                style={{ marginLeft: '0.5rem' }}
              >
                <b>DATUM:</b> {buch.datum}
              </Typography>

              <Typography
                gutterBottom
                variant="body1"
                component="div"
                style={{ marginLeft: '0.5rem' }}
              >
                <b>HOMEPAGE:</b> {''}
                <Link to="">{buch.homepage}</Link>
              </Typography>

              <Typography
                gutterBottom
                variant="body1"
                component="div"
                style={{ marginLeft: '0.5rem' }}
              >
                <b>SCHLAGWOERTER:</b> {buch.schlagwoerter.toString()}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </>
  );
}

function decimalToPercentage(decimal: number): string {
  const percentage = (decimal * 100).toFixed(2);
  return percentage + ' %';
}

function convertToPrice(amount: number): string {
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });
  const formattedPrice = formatter.format(amount);
  return formattedPrice;
}

export default SearchDetails;
