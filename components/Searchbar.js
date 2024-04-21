import { useState, useEffect } from "react";
import App from "../src/App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, Container, Row, Card, FormControl } from 'react-bootstrap';

const CLIENT_ID = "0324ee72c0e14508b46dcc01f7841c64";
const CLIENT_SECRET="63bdb5009c97420b9f624217aa78c731";

function SearchBar (){

    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState([]);
    
    
    useEffect(() =>{
    var authPerameters = {
    method: 'POST',
    headers: {
        'Content-type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authPerameters)
        .then(result => result.json())
        .then(data => setAccessToken(data.access_token))
    }, []);
    
    
    async function search() {
    console.log("Search for " + searchInput);
    
    
    //get request using artist id
    
    var searchParameters = {
    method:'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
        }
    }
    var artistId = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist' , searchParameters)
        .then(response => response.json())
        .then(data => {return data.artists.items[0].id })
    
        console.log('Artist ID is' + artistId);
    
        //GET request with artist ID
    var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistId + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setAlbums(data.items);
        })
    }
    console.log(albums);
    
    const cardClickHandler = () => {
    
    }
    
    return (
    <>
    <Container>
        <InputGroup className='mb-3' size='lg'>
            <FormControl 
            placeholder='Search'
            type='input'
            onChange={event => setSearchInput(event.target.value)}
            />
        </InputGroup>
        <Button onClick={search}>Search</Button>
    </Container>
    <Container>
            <Row className='mx-2 row row-cols-4'>
                    {albums.map( (albums, i ) =>{
                            return(
                                <Card onClick={() => alert('Clicked')} style={{cursor:'pointer'}}>
                                <Card.Img src={albums.images[0].url}></Card.Img>
                                <Card.Body>
                                    <Card.Title>{albums.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        )    
                        })}
            </Row>
        </Container>
    
    </>
    );
    };
    
    export default SearchBar;