import React, { useMemo } from 'react'
import styled from 'styled-components';
import ReactDOM, { createPortal } from 'react-dom'

const Modal = ({ children }: any) => {
    const modalElement = useMemo(() => document.getElementById('modal'), [])!;

    return createPortal(children, modalElement)
}

export default Modal;