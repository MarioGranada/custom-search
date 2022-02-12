import SearchScreen from './screens/search-screen/SearchScreen';

function App() {
  return (
    <>
      {/* header text content  to config file */}
      <SearchScreen header={<div>this is my custom header</div>} />
    </>
  );
}

export default App;
