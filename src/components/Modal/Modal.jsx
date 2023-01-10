import React, { Component } from 'react';
 import { Overlay, ModalContainer } from './Modal.styled';
 import { createPortal } from 'react-dom';

 const modalRoot = document.querySelector('#modal_root');

 class Modal extends Component {
   componentDidMount() {
     window.addEventListener('keydown', this.hendleKeyDown);
   }
   componentWillUnmount() {
     window.removeEventListener('keydown', this.hendleKeyDown);
   }
   hendleKeyDown = e => {
     if (e.code === 'Escape') {
       this.props.onClose();
     }
   };
   handleOverlay = e => {
     if (e.currentTarget === e.target) {
       this.props.onClose();
     }
   };
   render() {
     return createPortal(
       <Overlay onClick={this.handleOverlay}>
         <ModalContainer>{this.props.children}</ModalContainer>
       </Overlay>,
       modalRoot
     );
   }
 }
 export default Modal;