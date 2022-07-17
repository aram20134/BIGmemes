import React, { useState } from 'react'
import { Button, Form, Modal, Image, Alert } from 'react-bootstrap';
import { FloatingLabel } from 'react-bootstrap';
import { useEffect, useContext } from 'react';
import { create } from './../../http/memesAPI';
import { Context } from './../../index';
import '../../styles/Memes.scss'

export default function AddMemeModal({show, handleClick}) {

  const reader = new FileReader()
  const [img, setImg] = useState(null)
  const [preImg, setPreImg] = useState(null)
  const [name, setName] = useState('')
  const [load, setLoad] = useState(false)
  const {user} = useContext(Context)

  useEffect(() => {
    setImg(null)
    setPreImg(null)
  }, [show])
  
  function loadMeme() {
    if (!img) {
      return
    }
    const meme = new FormData()
    meme.append('title', name.length ? name : img.name)
    meme.append('img', img)
    meme.append('typeId', 1)
    meme.append('userId', user.user.id) 
    create(meme).then(res => {
      setLoad(true)
      setTimeout(() => {
        handleClick()
      }, 1000);
    })
  }

  function checkImg(e) {
    setImg(e.target.files[0])
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreImg(e.target.result.split('/')[0] === "data:image" ? <Image className='Memes__cont__img' src={e.target.result} /> : <video className='Memes__cont__vd' controls src={e.target.result}  />)
    }
    reader.readAsDataURL(e.target.files[0])
  }

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
          <div style={{margin:'20px'}}>
            {preImg }
          </div>
        </Form>
        {load ? <Alert variant='success'>Meme downloaded!</Alert> : ''}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={loadMeme}>Load</Button>
        <Button variant='danger' onClick={handleClick}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}