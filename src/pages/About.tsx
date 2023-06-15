import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const PersonListItem = styled(ListItem)({
  marginBottom: '16px',
});

const PersonAvatar = styled(Avatar)({
  marginRight: '16px',
});

function About() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          backgroundColor: '#f2f2f2',
          padding: '20px',
          borderRadius: '5px',
        }}
      >
        <h2>Über uns</h2>
        <List>
          <PersonListItem>
            <ListItemAvatar>
              <PersonAvatar>
                <img src="\src\images\user.png" alt="Profile" />
              </PersonAvatar>
            </ListItemAvatar>
            <div>
              <Typography variant="subtitle1">Clemens Bülskämper</Typography>
              <a href="mailto:bucl1017@h-ka.de">bucl1017@h-ka.de</a>
            </div>
          </PersonListItem>
          <PersonListItem>
            <ListItemAvatar>
              <PersonAvatar>
                <img src="\src\images\user.png" alt="Profile" />
              </PersonAvatar>
            </ListItemAvatar>
            <div>
              <Typography variant="subtitle1">Elena Badliuk</Typography>
              <a href="mailto:bael1018@h-ka.de">bael1018@h-ka.de</a>
            </div>
          </PersonListItem>
          <PersonListItem>
            <ListItemAvatar>
              <PersonAvatar>
                <img src="\src\images\user.png" alt="Profile" />
              </PersonAvatar>
            </ListItemAvatar>
            <div>
              <Typography variant="subtitle1">Lukas Botterer</Typography>
              <a href="mailto:bolu1021@h-ka.de">bolu1021@h-ka.de</a>
            </div>
          </PersonListItem>
          <PersonListItem>
            <ListItemAvatar>
              <PersonAvatar>
                <img src="\src\images\user.png" alt="Profile" />
              </PersonAvatar>
            </ListItemAvatar>
            <div>
              <Typography variant="subtitle1">Kevin Goll</Typography>
              <a href="mailto:goke1012@h-ka.de">goke1012@h-ka.de</a>
            </div>
          </PersonListItem>
        </List>
      </div>
    </div>
  );
}

export default About;
