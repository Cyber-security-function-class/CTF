import React, { useState, useEffect, useMemo } from 'react'
import ReactDOM, { createPortal } from 'react-dom'

const Modal = ({ children }: any) => {
    const modalElement = useMemo(() => document.getElementById('modal'), [])!;
    return createPortal(children, modalElement)
}

export default Modal;