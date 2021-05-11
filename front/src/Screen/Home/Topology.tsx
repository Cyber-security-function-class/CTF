import React, { Component, useState } from 'react';
import Modal from '../../Components/modal/Modal';
import BaseStyle from '../../Components/modal/BaseStyle';
import CUI from './CUI';

const Topology = () => {
    const [gui, setGui] = useState<boolean>(false);
    const [cui, setCui] = useState<boolean>(false);
    const [hosts, setHosts] = useState<string>("");

    type ModalProps = {
        hosts: string,
        gui: boolean,
        cui: boolean
    }

    const onModalOpen = ({hosts, gui, cui}: ModalProps) => {
        setGui(gui);
        setCui(cui);
        setHosts(hosts);
    }

    const onModalClose = () => {
        setGui(false);
        setCui(false);
        setHosts("");
    }

    return(
        <div>
            <button onClick={() => onModalOpen({hosts: 'Router', gui: false, cui: true})}>모달 열기</button>
            <button onClick={() => onModalOpen({hosts: 'Server', gui: true, cui: false})}>모달 열기</button>
            <button onClick={() => onModalOpen({hosts: 'PC', gui: true, cui: false})}>모달 열기</button>

            {cui && (
                <CUI classs={hosts} onClose={onModalClose} />
            )}

            {gui && (
                <Modal>
                    <BaseStyle classs={hosts} onClose={onModalClose} >
                        <div></div>
                    </BaseStyle>
                </Modal>
            )}
        </div>
    )
}

export default Topology;