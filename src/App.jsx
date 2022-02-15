import SearchScreen from './screens/search-screen/SearchScreen';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <>
      <CssBaseline />
      {/* header text content  to config file */}
      <SearchScreen header={<div>Custom Search</div>} />
    </>
  );
}

export default App;
