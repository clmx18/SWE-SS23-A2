import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { queryBuecher } from '../api/graphql';
import { Buch, BuchQueryField, FilterParam } from '../api/interfaces';

function Search() {
  //Only run useEffect once
  useEffect(() => {
    fetchBuecher();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(undefined);
  const [filter, setFilter] = useState({
    titel: '',
    art: '',
    lieferbar: false,
    rating: 0,
  });
  const [buecher, setBuecher] = useState([]);

  const resetFilter = () => {
    setFilter({
      titel: '',
      art: '',
      lieferbar: false,
      rating: 0,
    });
  };

  const handleFilterChange = (e: any) => {
    const name = e.target.name;
    let value;
    switch (name) {
      case 'lieferbar':
        value = e.target.checked;
        break;
      case 'rating':
        value = parseInt(e.target.value);
        break;
      default:
        value = e.target.value;
    }
    setFilter({ ...filter, [name]: value });
  };
  const handleFilterSubmit = (e: any) => {
    e.preventDefault();
    fetchBuecher();
  };

  const fetchBuecher = () => {
    setIsLoading(true);
    setIsError(undefined);

    const queryFilter: FilterParam[] = [];

    if (filter.titel.length > 0)
      queryFilter.push({ key: 'titel', value: filter.titel });
    if (filter.art.length > 0)
      queryFilter.push({ key: 'art', value: filter.art });
    if (filter.lieferbar)
      queryFilter.push({ key: 'lieferbar', value: filter.lieferbar });
    if (filter.rating > 0)
      queryFilter.push({ key: 'rating', value: filter.rating });

    queryBuecher(
      [
        BuchQueryField.id,
        BuchQueryField.titel,
        BuchQueryField.isbn,
        BuchQueryField.art,
        BuchQueryField.lieferbar,
        BuchQueryField.rating,
      ],
      queryFilter,
    )
      .then((result) => {
        setIsLoading(false);

        if (result.data.data.buecher) {
          setBuecher(result.data.data.buecher);
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
  };

  return (
    <>
      <h2>Suche</h2>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item md={3}>
          <h3>Suchfilter festlegen</h3>
          <p>Sie können mehrere Suchfilter gleichzeitig festlegen</p>
          <div style={{ textAlign: 'right', paddingBottom: '0.3rem' }}>
            <Button onClick={resetFilter}>Zurücksetzen</Button>
          </div>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Titel"
              name="titel"
              variant="outlined"
              value={filter.titel}
              onChange={handleFilterChange}
              style={{ marginBottom: '1rem' }}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="art-select-label">Art</InputLabel>
            <Select
              labelId="art-select-label"
              id="art-select"
              label="Art"
              name="art"
              value={filter.art}
              onChange={handleFilterChange}
              style={{ marginBottom: '1rem' }}
            >
              <MenuItem value={'DRUCKAUSGABE'}>DRUCKAUSGABE</MenuItem>
              <MenuItem value={'KINDLE'}>KINDLE</MenuItem>
            </Select>
          </FormControl>
          <hr />
          <FormControlLabel
            control={
              <Checkbox
                name="lieferbar"
                checked={filter.lieferbar}
                onChange={handleFilterChange}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              />
            }
            label="Buch ist lieferbar"
          />
          <hr />
          <Typography component="legend" style={{ marginBottom: '0.2rem' }}>
            Rating
          </Typography>
          <Rating
            name="rating"
            value={filter.rating}
            onChange={handleFilterChange}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
          />
          <hr />
          <div style={{ marginTop: '1rem' }}>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              onClick={handleFilterSubmit}
              style={{ backgroundColor: '#DC143C' }}
            >
              Anwenden
            </Button>
          </div>
        </Grid>
        <Grid item md={9}>
          <div style={{ padding: '3rem' }}>
            {isLoading === true ? (
              <Card
                style={{
                  textAlign: 'left',
                  marginBottom: '2rem',
                  paddingLeft: '1rem',
                }}
              >
                <CardContent>
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </CardContent>
                <CardActions style={{ justifyContent: 'end' }}>
                  <Skeleton variant="rounded" width={120} height={30} />
                </CardActions>
              </Card>
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
            {!isLoading && !isError && buecher.length > 0
              ? buecher.map((buch: Buch) => {
                  return (
                    <Card
                      style={{
                        textAlign: 'left',
                        marginBottom: '2rem',
                        paddingLeft: '1rem',
                      }}
                      key={buch.id}
                    >
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {buch.titel!.titel}
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
                          <b>LIEFERBAR:</b>{' '}
                          {buch.lieferbar === true ? 'Ja' : 'Nein'}
                        </Typography>
                        <Rating
                          value={buch.rating}
                          readOnly={true}
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }}
                          style={{ marginLeft: '0.5rem' }}
                        />
                      </CardContent>
                      <CardActions style={{ justifyContent: 'end' }}>
                        <Button component={Link} to={`/search/${buch.id}`}>
                          Details anzeigen
                        </Button>
                      </CardActions>
                    </Card>
                  );
                })
              : false}
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Search;
