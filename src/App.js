import React from 'react';
import './App.css';
import { Container, Jumbotron } from 'react-bootstrap';
import { getClients } from './service';

const App = () => {
  const [foo, setFoo] = React.useState();

  React.useEffect(() => {
    getClients().then(response => setFoo(response.data.foo));
  }, []);

  return (
    <Container>
      <Jumbotron className="m-2">
        <h1>Loop Client</h1>
      </Jumbotron>
    </Container>
  );
}

export default App;
