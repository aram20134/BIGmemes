import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, FloatingLabel, Alert, Spinner } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { log, reg } from "../../http/userAPI";

const AuthModal = observer(({ show, handleClick }) => {
  const [auth, setAuth] = useState(false);
  const { user } = useContext(Context);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [axiosError, setAxiosError] = useState('')
  const [axiosSuccess, setAxiosSuccess] = useState(false)
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setValidated(false)
    setAxiosError(false)
    setAxiosSuccess(false)
  }, [username, password, email, auth])

  useEffect(() => {
    return () => {
      setValidated(false)
      setAxiosError(false)
      setAxiosSuccess(false)
    }
  }, [show])
  
  const checkSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    setValidated(true)

    if (form.checkValidity() === true  && (!auth || feedbackError('Username', username) == null) && feedbackError('Password', password) == null) {
        try {
          let data;
          if (auth) {
            data = await reg(email, password, username)
          } else {
            data = await log(email, password)
            setTimeout(() => {
              handleClick()
            }, 600);
          }
          user.setUser(data)
          user.setIsAuth(true)
          setAxiosSuccess(true)
        } catch (e) {
          setAxiosError(e.response.data.message)
        }
    }
  };

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const feedbackError = (type, input) => {
    switch (type) {
      case 'Username':
        if (input.length < 4) {
          return <Form.Control.Feedback type="invalid">Username cannot be less than 4 letters</Form.Control.Feedback>
        } else if (input.length > 15) {
          return <Form.Control.Feedback type="invalid">Username cannot be more than 15 letters</Form.Control.Feedback>
        } 
        break;
        case 'Password':
          if (input.length < 6) {
            return <Form.Control.Feedback type="invalid">Password cannot be less than 6 letters</Form.Control.Feedback>
          } else if (input.length > 15) {
            return <Form.Control.Feedback type="invalid">Passsword cannot be more than 15 letters</Form.Control.Feedback>
          } 
      default:
        break;
    }
  }

  return (
    <Modal onHide={handleClick} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Form noValidate onSubmit={checkSubmit}>
      <Modal.Header>
        <Modal.Title>{auth ? "Registation" : "Sign In"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {auth ? (
          <Form.Group>
            <FloatingLabel controlId="floatingName" label="Username" className="mb-3">
                <Form.Control isValid={validated && username.length >= 4 && username.length < 15 ? true : false} isInvalid={(validated && username.length < 4) || (validated && username.length > 15) ? true : false} required value={username} onChange={(e)=> setUsername(e.target.value) } type="text" placeholder="myUserName" />
                {feedbackError('Username', username)}
            </FloatingLabel> 

            <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
              <Form.Control  isValid={validated && validateEmail(email) ? true : false} isInvalid={validated && !validateEmail(email) ? true : false} required value={email} onChange={(e)=> setEmail(e.target.value) } type="email" placeholder="name@mail.ru" />
              <Form.Control.Feedback type="invalid">Please write your email.</Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control isValid={validated && password.length >= 6 && password.length < 15 ? true : false} isInvalid={(validated && password.length < 6) || (validated && password.length > 15) ? true : false} required value={password} onChange={(e)=> setPassword(e.target.value) } type="password" placeholder="password" />
              {feedbackError('Password', password)}
            </FloatingLabel>

            Have an account?{" "}
            <Button onClick={() => setAuth(!auth)}>Sign in</Button>
            </Form.Group>
        ) : (
          <Form.Group>
            <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
              <Form.Control isValid={validated && validateEmail(email) ? true : false} isInvalid={validated && !validateEmail(email) ? true : false} required value={email} onChange={(e)=> setEmail(e.target.value) } type="email" placeholder="name@mail.ru" />
              <Form.Control.Feedback type="invalid">Please write your email.</Form.Control.Feedback>
            </FloatingLabel>
            
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control isValid={validated && password.length >= 6 && password.length < 15 ? true : false} isInvalid={(validated && password.length < 6) || (validated && password.length > 15) ? true : false} required value={password} onChange={(e)=> setPassword(e.target.value) } type="password" placeholder="password" />
              {feedbackError('Password', password)}
            </FloatingLabel>

            Don't have an account?{" "}
            <Button onClick={() => setAuth(!auth)}>Register</Button>
            </Form.Group>
        )}
        {axiosSuccess && auth ? <Alert style={{marginTop:'20px'}} variant="success">Вы успешно зарегистрированы!</Alert> : ''}
        {axiosSuccess && auth == false ? <Alert style={{marginTop:'20px'}} variant="success">Вы успешно вошли!</Alert> : ''}
        {axiosError ? <Alert style={{marginTop:'20px'}} variant="danger">{axiosError}</Alert> : ''}
      </Modal.Body>
      <Modal.Footer>
        {auth ? (
          validated && !axiosSuccess ? <Button type="submit" disabled>Loading <Spinner size="sm" animation="border" /></Button> : <Button type="submit" >Create Account</Button>
        ) : (
          validated && !axiosSuccess ? <Button type="submit" disabled>Loading <Spinner size="sm" animation="border" /></Button> : <Button type="submit" >Sign In</Button>
        )}
        <Button variant="secondary" onClick={handleClick}>Закрыть</Button>
      </Modal.Footer>
      </Form>
    </Modal>
  );
});

export default AuthModal;
