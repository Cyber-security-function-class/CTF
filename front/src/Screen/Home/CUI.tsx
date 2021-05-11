import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Modal from '../../Components/modal/Modal';
import BaseStyle from '../../Components/modal/BaseStyle';
import GetCommand from '../../Components/cui/GetCommand';

type Props = {
    onClose: any,
    classs: string,
};

const CUI = ({ onClose, classs }: Props) => {
    return (
        <Modal>
            <BaseStyle classs={classs} onClose={onClose} >
                <div>
                    <MBase>
                        <MTitle>{classs}</MTitle>
                        <label>
                            <MMain>
                                <GetCommand />
                            </MMain>
                        </label>
                    </MBase>
                </div>
            </BaseStyle>
        </Modal>
    )
}

const MBase = styled.div`
    height: 100%;
    background-color: rgb(255, 255, 255);
`

const MTitle = styled.div`
    padding-top: 10px;
    text-align: center;
    font-family: 'Lato', sans-serif;
`

const MMain = styled.div`
    height: 420px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 11px;
    margin-right: 11px;
    border: 2px solid rgb(0, 0, 0);
    overflow: scroll;
    word-break: break-all;
`

export default CUI;