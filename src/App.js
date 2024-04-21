import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='App'>
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Search For Artist"
            type="input"
            onKeyPress={event => {
              if (event.key == "Enter") {
                console.log("Pressed Enter");
              }
            }}
            />
        </InputGroup>
      </Container>
    </div>
  );
}

export default App;
