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
  postClients,
  putClients,
  deleteClients,
  searchAddress
} from './service';

const App = () => {
  const [clientList, setClientList] = React.useState([]);
  const [editing, setEditing] = React.useState(false);
  const [inputs, setInputs] = React.useState({
    name: '',
    phone: '',
    birth_date: '',
    address: '',
    neighborhood: '',
    city: '',
    state: '',
    zip: '',
    complement: ''
  });
  const [modal, toggleModal] = React.useState(false);

  React.useEffect(() => {
    getClients().then(response => setClientList(response.data));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    if (formValidation(inputs) !== true) {
      alert(`Os campos: ${inputs.map(input => input.key()).join(', ')}são obrigatórios`);
    }

    if (editing) {
      putClients(inputs.uuid, inputs).then(response => {
        alert('Cliente editado com sucesso');
        toggleModal(false);
        setEditing(false);
        setInputs({
          name: '',
          phone: '',
          birth_date: '',
          address: '',
          neighborhood: '',
          city: '',
          state: '',
          zip: '',
          complement: ''
        });
        getClients().then(response => setClientList(response.data));
      });

      return;
    }

    postClients(inputs).then(response => {
      alert('Cliente cadastrado com sucesso');
      toggleModal(false);
      setInputs({
        name: '',
        phone: '',
        birth_date: '',
        address: '',
        neighborhood: '',
        city: '',
        state: '',
        zip: '',
        complement: ''
      });
      getClients().then(response => setClientList(response.data));
    });
  };

  const formValidation = fields => {
    const required = [
      'name',
      'phone',
      'birth_date',
      'address',
      'neighborhood',
      'city',
      'state',
      'zip'
    ];

    const validation = required.filter(
      field => fields[field] === null || fields[field] === ''
    );

    if (validation.length > 0) {
      return validation;
    }

    return true;
  };

  const handleChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  const formatPhoneNumber = (str) => {
    let cleaned = ('' + str).replace(/\D/g, '');
    let match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };
    return null
  };

  const editClient = client => {
    client.birth_date = client.birth_date.split('/').reverse().join('-');
    if (client.complement === null) {
      client.complement = '';
    }
    setInputs(client);
    setEditing(true);
    toggleModal(true)
  };

  const deleteClient = (uuid, name) => {
    if (window.confirm(`Deseja realmente excluir o usuário ${name}?`)) {
      deleteClients(uuid).then(response => {
        alert('Cliente excluído com sucesso');
        getClients().then(response => setClientList(response.data));
      });
    }
  };

  const handleSearchAddress = event => {
    event.persist();
    if (event.target.value.replace(/\D/g,'').length < 8) {
      return null
    }

    searchAddress(event.target.value).then(response => {
      setInputs(inputs => ({
        ...inputs,
        address: response.data.address,
        neighborhood: response.data.neighborhood,
        city: response.data.city,
        state: response.data.state,
        zip: response.data.zip
      }));
    });
  };

  return (
    <Container>
      <Jumbotron className="my-2 py-4">
        <h1>Loop Client</h1>
        <br />
        <button className="btn btn-primary"
          onClick={() => toggleModal(!modal)}>
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
            <tr key={client.uuid}>
              <td>{client.name}</td>
              <td>{formatPhoneNumber(client.phone)}</td>
              <td>{client.birth_date}</td>
              <td>{`${client.address} - ${client.neighborhood}, ${client.city} - ${client.state}, ${client.zip}`}</td>
              <td>
                <button className="btn btn-primary btn-sm mx-2"
                  onClick={() => editClient(client)}>
                  Editar cliente
                </button>
                <button className="btn btn-danger btn-sm mx-2"
                  onClick={() => deleteClient(client.uuid, client.name)}>
                  Excluir cliente
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        show={modal}
        onHide={() => toggleModal(false)}
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
            <Form.Group controlId="userForm.Cep">
              <Form.Label>Cep</Form.Label>
              <MaskedFormControl
                name="zip"
                type="text"
                onChange={handleSearchAddress}
                value={inputs.zip}
                required
                mask='11111-111'
              />
              <Form.Text className="text-muted">
                Preencha o CEP e vamos procurar seu endereço.
              </Form.Text>
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
            <Form.Group controlId="userForm.Complement">
              <Form.Label>Complemento</Form.Label>
              <Form.Control
                name="complement"
                type="text"
                value={inputs.complement}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="userForm.Neighborhood">
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                name="neighborhood"
                type="text"
                value={inputs.neighborhood}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="userForm.City">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                name="city"
                type="text"
                value={inputs.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="userForm.State">
              <Form.Label>UF (Estado)</Form.Label>
              <Form.Control
                name="state"
                type="text"
                value={inputs.state}
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
