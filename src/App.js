import logo from './logo.svg';
import './App.css';
import SearchBar from '../components/Searchbar';

function App() {



  return (
    <>
    <Container style={{textAlign:'center'}}>
      <SearchBar/>
      <PlayList/>
      <Button>Save to Spotify</Button>
      </Container>
    </>
  );
}

export default App;
