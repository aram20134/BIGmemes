import React from 'react'
import { Modal, Form, Image, Button, Alert, ProgressBar, Spinner } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from './../../index';
import { setAvatar } from '../../http/userAPI';
import { check } from './../../http/userAPI';

const AvatarModal = observer(({show, handleClick}) => {
    const [preImg, setPreImg] = useState(null)
    const [img, setImg] = useState(null)
    const [loading, setLoading] = useState(false)
    const [load, setLoad] = useState(false)
    const [error, setError] = useState(false)
    const [progressBar, setProgressBar] = useState(0)
    
    const {user} = useContext(Context)

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
        setLoad(false)
        setError(false)
    }, [show])
    

    function changeImg() {
        if (!img) {
            setError('Image not founded')
            return
        }

        if (img.type == 'image/png' || img.type == 'image/jpeg') {
            console.log('ye')
        } else {
            setError('This is not image')
            return
        }
        
        const form = new FormData()
        form.append('avatar', img)
        form.append('id', user.user.id) 
        setLoading(true)
        setError(false)
        setProgressBar(0)

        setAvatar(form, progressBar, (p) => setProgressBar(p))
        .then(res => {
            setLoad(true)
            setLoading(false)
            console.log(res)
            setTimeout(() => {
                check().then((res) => user.setUser(res))
                handleClick()
            }, 1000);
        })
        .catch((e) => {return setError(e.message), setLoading(false)})
    }

  return (
    <Modal show={show} onHide={handleClick} centered>
        <Modal.Header>Change avatar</Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control onChange={(e) => checkImg(e)} type='file' />
                <Form.Text muted>only img formats</Form.Text>
            </Form>
            <div style={{margin:'20px'}}>{preImg}</div>
            {!error && loading ? <ProgressBar animated now={progressBar} label={`${progressBar} %`} /> : ''}
            {!error && load ? <Alert variant='success'>Avatar updated!</Alert> : ''}
            {error ? <Alert variant='danger'>{error}</Alert> : ''}
        </Modal.Body>
        <Modal.Footer>
            {!loading ? <Button variant='primary' onClick={changeImg}>Change</Button> : <Button variant='primary' disabled>Loading <Spinner size='sm' animation='border' /></Button>}
            <Button variant='danger' onClick={handleClick}>Close</Button>
        </Modal.Footer>
    </Modal>
  )
})

export default AvatarModal