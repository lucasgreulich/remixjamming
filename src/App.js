import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';


const CLIENT_ID = "1a54c331903245c9b7cf5a2b720733b3";
const CLIENT_SECRET = "e27b7073375943428c032b21d55bf941";


function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
      //API access token
      var authParameters = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
      }

      fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

//Search
async function search() {
  console.log("Search for " + searchInput);

// Get request using search to get Artist ID
var searchParameters = {
  method: 'GET', 
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + accessToken
  }
}
var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
.then(response => response.json())
.then(data => { return data.artists.items[0].id })

console.log('Artist ID = ' + artistID)
//Get request with artist ID grab albums 

var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
.then(response => response.json())
.then(data => {
console.log(data);
setAlbums(data.items);
});

// Display albums

}
console.log(albums)
  return (
    <div className='App'>
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Search For Artist"
            type="input"
            onKeyPress={event => {
              if (event.key == "Enter") {
              search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
            />
            <Button onClick={search}>
              Search
            </Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className="mx-2 row row-cols-4">
        {albums.map( (album, i) => {
          console.log(albums);
          return (
          <Card>
            <Card.Img src={album.images[0].url} />
            <Card.Body>
              <Card.Title>{album.name}</Card.Title>
            </Card.Body>
          </Card>)
        })}
        </Row>
      </Container>
    </div>
  );
}

export default App;
