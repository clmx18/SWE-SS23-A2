import { Box, Button, Card, CardContent, Grid } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Typography from '@mui/material/Typography';

function About() {
  return (
    <Box sx={{ flexGrow: 1, padding: '2rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <AccountCircleOutlinedIcon
              sx={{ marginLeft: 1, display: { xs: 'none', md: 'flex' }, mr: 1 }}
            />
            <CardContent>
              <h3>Clemens Bülskämper</h3>
              <Typography
                sx={{ width: '60%', margin: 'auto', marginBottom: '1rem' }}
              >
                Clemens ist der CEO unseres Unternehmens und ein begeisterter
                Full-Stack Entwickler. Er übernimmt gerne die PO und
                SCRUM-Master Rollen gleichzeitig - toller Chef!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <AccountCircleOutlinedIcon
              sx={{ marginLeft: 1, display: { xs: 'none', md: 'flex' }, mr: 1 }}
            />
            <CardContent>
              <h3>Kevin Goll</h3>
              <Typography
                sx={{ width: '60%', margin: 'auto', marginBottom: '1rem' }}
              >
                Kevin ist auch unser Backend Entwickler, welcher sich mit
                Engagement über neuen Technologien informiert und in unserer
                unserer Arbeit einsetzt!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <AccountCircleOutlinedIcon
              sx={{ marginLeft: 1, display: { xs: 'none', md: 'flex' }, mr: 1 }}
            />
            <CardContent>
              <h3>Elena Badliuk</h3>
              <Typography
                sx={{ width: '60%', margin: 'auto', marginBottom: '1rem' }}
              >
                Elena ist die Web-Designerin und Frontend Entwicklerin - wie
                praktisch, wenn das Design sich selbst implementiert!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <AccountCircleOutlinedIcon
              sx={{ marginLeft: 1, display: { xs: 'none', md: 'flex' }, mr: 1 }}
            />
            <CardContent>
              <h3>Lukas Botterer</h3>
              <Typography
                sx={{ width: '60%', margin: 'auto', marginBottom: '1rem' }}
              >
                Lukas ist ein talentierter Backend Entwickler mit gutem Humor -
                die Arbeit wird zum Genuss in seiner Präsenz!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default About;
