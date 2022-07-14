import React from 'react'
import { Modal } from 'react-bootstrap';

export default function ProfileModal({show, handleClick}) {
  return (
    <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClick}>
        asd
    </Modal>
  )
}
