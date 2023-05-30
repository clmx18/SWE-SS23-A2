import TextField from '@mui/material/TextField';
import { queryBuecher } from '../api/graphql';

function Home() {
  return (
    <div className="card">
      <button onClick={() => queryBuecher()}>search</button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR (TODO)
      </p>
      <p>
        <TextField
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
        />
      </p>
    </div>
  );
}

export default Home;
