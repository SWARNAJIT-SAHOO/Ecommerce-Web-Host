import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { Link ,useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreement, setAgreement] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreement) {
      alert('You must agree to the terms and conditions');
      return;
    }
    const newUser = { name, username, email, password };
    axios.post('http://localhost:5000/register', newUser).then((response) => {
      console.log(response.data);
      setName('');
      setUsername('');
      setEmail('');
      setPassword('');
      setAgreement(false);
      toast.success('User registered successfully!',{position:'top-right',theme:'colored',autoClose: 3000});
      navigate('/signin');
    }).catch(error => {
      console.error('There was an error registering the user!', error);
      toast.error('Failed to register user.',{position:'top-right',theme:'colored',autoClose: 3000});
    });
  };

  return (
    <Container className="mt-5" style={{width:"80%",backgroundColor:"#ECECEC",paddingTop:"1rem"}}>
      <Row className="justify-content-md-center">
        <Col md={7}>
          <Image  src="https://m.media-amazon.com/images/I/719F4SqM2+L.jpg" fluid className="mb-4" />
        </Col>
        <Col md={5}>
          <h2>Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="agreement" className="mb-3">
              <Form.Check
                type="checkbox"
                label="I agree with Privacy Policy and Terms of Use"
                checked={agreement}
                onChange={() => setAgreement(!agreement)}
                required
              />
            </Form.Group>
            <div className="d-grid gap-2">
            <Button variant='dark' type="submit">Sign Up</Button>
</div>
          </Form>
          <p className="mt-3">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
