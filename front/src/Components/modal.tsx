import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components';
import ReactDOM, { createPortal } from 'react-dom'

const Modal = ({ children }: any) => {
    const element = document.createElement('div');
    const modalElement = useMemo(() => document.getElementById('modal'), [])!;

    useEffect(() => {
        modalElement.appendChild( element );
    })

    return createPortal(children, modalElement)
}

export default Modal;