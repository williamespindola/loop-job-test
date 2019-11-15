import React from 'react';
import './App.css';
import {
  Container,
  Jumbotron,
  Form,
  Modal
} from 'react-bootstrap';
import MaskedFormControl from 'react-bootstrap-maskedinput';
import {
  getClients,
  postClients
} from './service';

const App = () => {
  const [clientList, setClientList] = React.useState([]);
  const [inputs, setInputs] = React.useState({
    name: '',
    phone: '',
    birth_data: '',
    address: ''
  });
  const [modal, setModal] = React.useState(false);

  React.useEffect(() => {
    getClients().then(response => setClientList(response.data));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    postClients(inputs).then(response => {
      alert('Cliente cadastrado com sucesso');
      setModal(false);
      setInputs({
        name: '',
        phone: '',
        birth_data: '',
        address: ''
      });
    });
  };

  const handleChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  const showModal = status => setModal(status);

  const closeModal = () => setModal(false);

  const formatPhoneNumber = (str) => {
    let cleaned = ('' + str).replace(/\D/g, '');
    let match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };
    return null
  };

  return (
    <Container>
      <Jumbotron className="m-2">
        <h1>Loop Client</h1>
        <br />
        <button className="btn btn-primary"
          onClick={() => showModal(!modal)}>
          Novo cliente
        </button>
      </Jumbotron>

      <table className="table-consume table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Telefone</th>
            <th scope="col">Data de nascimento</th>
            <th scope="col">Endereço</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientList.map(client => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{formatPhoneNumber(client.phone)}</td>
              <td>{client.birth_date}</td>
              <td>{client.address}</td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        show={modal}
        onHide={closeModal}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="userForm.Name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                name="name"
                type="text"
                value={inputs.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="userForm.Phone">
              <Form.Label>Telefone</Form.Label>
              <MaskedFormControl
                name="phone"
                type="text"
                value={inputs.phone}
                onChange={handleChange}
                required
                mask='(11) 11111-1111'
              />
            </Form.Group>
            <Form.Group controlId="userForm.BirthDate">
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control
                name="birth_date"
                type="date"
                value={inputs.birth_date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="userForm.Address">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                name="address"
                type="text"
                value={inputs.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <button type="submit" className="btn btn-primary my-1">
              Salvar
            </button>
          </Form>
        </Modal.Body>
      </Modal>

    </Container>
  );
}

export default App;
