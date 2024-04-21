import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import SearchBar from '../components/Searchbar';
import 'bootstrap/dist/css/bootstrap.min.css';

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
