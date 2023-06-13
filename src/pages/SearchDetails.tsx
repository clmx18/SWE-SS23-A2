import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { queryBuch } from "../api/graphql";
import { Button, Card, CardActions, CardContent, Grid, Rating, Skeleton, Typography } from "@mui/material";
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

function SearchDetails() {

// ====================================================== NEW ==========

useEffect(() => {
  fetchBuch();
}, []);

const params = useParams();
const [isLoading, setIsLoading] = useState(true);
const [isError, setIsError] = useState(undefined);
const [buch, setBuch] = useState({
  id: '',
  version: '',
  isbn: '',
  rating: 0,
  art: '',
  preis: 0,
  rabatt: 0,
  lieferbar: false,
  datum: '',
  homepage: '',
  schlagwoerter: '',
  titel: {
    titel: '',
    untertitel:''
  }
});

const fetchBuch = () => {
  setIsLoading(true);
  setIsError(undefined);

  if(params.id) {
    queryBuch(params.id).then((result) => {
      setIsLoading(false);

      if (result.data.data.buch) {
        setBuch(result.data.data.buch);
      }
      if (result.data.errors) {
        const errorString = result.data.errors
          .flatMap((error: any) => error.message)
          .toString();
        setIsError(errorString);
      }
    })
    .catch((err) => {
      setIsLoading(false);
      setIsError(err.message);
    });
  }
};

// ============================================== OLD ============
    // useEffect(() => {
    //   if(params.id) {
    //     queryBuch(params.id).then((buch)=>{
    //       if(buch.data.data){
    //         setBuch(buch.data.data.buch);
    //       }
    //     }).catch((err)=>{
    //       console.log(err.message);
    //     });
    //   }
    // }, []);



  function decimalToPercentage(decimal: number): string {
    const percentage = (decimal * 100).toFixed(2);
    return percentage + " %";
  }

  function convertToPrice(amount: number): string {
    const formatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
    const formattedPrice = formatter.format(amount);
    return formattedPrice;
  }

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
            <b>RABATT:</b> {''}
            {decimalToPercentage(buch.rabatt)}
          </Typography>

          <Typography
            gutterBottom
            variant="body1"
            component="div"
            style={{ marginLeft: '0.5rem' }}
          >
            <b>LIEFERBAR:</b>{' '}
            {buch.lieferbar === true ? 'Ja' : 'Nein'}
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

  <Grid item md={9}>
          <div style={{ padding: '3rem' }}>
          {isLoading === true ? (
            <div>
          <CardActions style={{ justifyContent: 'start' }}>
              <Skeleton variant="rounded" width={120} height={30} />
              </CardActions>
              <Card
                style={{
                  textAlign: 'left',
                  marginBottom: '2rem',
                  paddingLeft: '1rem',
                }}
              >
                <CardContent>
                  <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                  <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </CardContent>
              </Card>
              </div>
            ) : (
              false
            )}
            {isError !== undefined ? (
              <Card
                style={{
                  textAlign: 'center',
                  marginBottom: '2rem',
                  paddingLeft: '1rem',
                }}
              >
                <CardContent>
                  <WarningAmberOutlinedIcon fontSize="large" />
                  <Typography gutterBottom variant="h5" component="div">
                    Keine Suchergebnisse gefunden
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="div"
                    style={{ color: 'red', marginTop: '1rem' }}
                  >
                    {isError}
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              false
            )}
          </div>
        </Grid>
    </>
  );
}

export default SearchDetails;
