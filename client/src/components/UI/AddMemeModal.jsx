import React, { useState } from 'react'
import { Button, Form, Modal, Image, Alert, Spinner, ProgressBar } from 'react-bootstrap';
import { FloatingLabel } from 'react-bootstrap';
import { useEffect, useContext } from 'react';
import { create, getAllUser } from './../../http/memesAPI';
import { Context } from './../../index';
import '../../styles/Memes.scss'
import { observer } from 'mobx-react-lite';

const AddMemeModal = observer(({show, handleClick}) => {

  const [img, setImg] = useState(null)
  const [preImg, setPreImg] = useState(null)
  const [name, setName] = useState('')
  const [load, setLoad] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progressBar, setProgressBar] = useState(0)
  const [error, setError] = useState(false)

  const {user} = useContext(Context)

  useEffect(() => {
    setImg(null)
    setPreImg(null)
    setLoad(false)
    setError(false)
  }, [show])
  
  function loadMeme() {
    if (!img) {
      setError('Meme not founded')
      return
    }
    const meme = new FormData()
    meme.append('title', name.length ? name : img.name)
    meme.append('img', img)
    meme.append('typeId', 2)
    meme.append('userId', user.user.id) 
    setLoading(true)
    setError(false)
    setProgressBar(0)
    
    create(meme, progressBar, (p) => setProgressBar(p))
    .then(res => {
      setLoad(true)
      setLoading(false)
      setTimeout(() => {
        handleClick()
        getAllUser(user.user.id).then(m => user.setUserMemes(m)).finally(() => console.log(user.userMemes))
      }, 1000);
    })
    .catch((e) => {return setError(e.message), setLoading(false)})
  }

  function checkImg(e) {
    setImg(e.target.files[0])
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreImg(e.target.result.split('/')[0] === "data:image" ? <Image className='Memes__cont__img' src={e.target.result} /> : <video className='Memes__cont__vd' controls src={e.target.result}></video>)
    }
    reader.readAsDataURL(e.target.files[0])
  }

  useEffect(() => {
    setImg(null)
    setPreImg(null)
    setName('')
    setLoad(false)
  }, [show])
  

  return (
    <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClick}>
      <Modal.Header>Add your meme</Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel label="name your meme" controlId="floatingInput">
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder=' ' />
            <Form.Text muted>If the name is empty, we will take the name of the picture</Form.Text>
          </FloatingLabel>
          <Form.Control onChange={(e) => checkImg(e)} type='file' />
          <Form.Text>Only png, jpg, mp4, webm formats</Form.Text>
          <div style={{margin:'20px'}}>
            {preImg }
          </div>
        </Form>
        {!error && loading ? <ProgressBar animated now={progressBar} label={`${progressBar} %`} /> : ''}
        {!error && load ? <Alert variant='success'>Meme downloaded!</Alert> : ''}
        {error ? <Alert variant='danger'>{error}</Alert> : ''}
      </Modal.Body>
      <Modal.Footer>
        {!loading ? <Button variant='primary' onClick={loadMeme}>Load</Button> : <Button variant='primary' onClick={loadMeme} disabled>Loading <Spinner size='sm' animation='border' /></Button>}
        <Button variant='danger' onClick={handleClick}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
})

export default AddMemeModal