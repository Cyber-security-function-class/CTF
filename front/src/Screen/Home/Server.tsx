import React from 'react'
import styled from 'styled-components'
import Draggable from 'react-draggable';
import Modal from '../../Components/modal'
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Terminal from './Terminal'

const Base = styled.div`
    font-family: 'Courier New';
    background-color: rgb(247, 247, 247);
    width: 500px;
    height: 500px;
    border: 0.1px solid rgb(206, 206, 206);
`

const Top = styled.div`
    background-color: rgb(220, 220, 220);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 25px;
    display: flex;
    justify-content: space-between;
    padding-top: 5px;
`

const Box = styled.div``

const Boxs = styled.div`
    width: 25.328px;
`

const Buttons = styled.button`
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
    &:hover {
        background: transparent;
        box-shadow: 0px 0px 0px transparent;
        border: 0px solid transparent;
        text-shadow: 0px 0px 0px transparent;
    }
    &:active {
        outline: none;
        border: none;
    }
    &:focus {
        outline: 0;
    }

    padding: 0;
    margin: 1px 6px;
`

const Main = styled.div`
    height: 415px;
    margin-top: 25px;
    padding: 30px;
`

const Server: React.FC = () => {
    const Exit = () => {
        alert("test");
    }

    return (
        <Modal>
            <Draggable>
                <Base>
                    <Top>
                        <Box>
                            <Buttons onClick={Exit}>
                                <FontAwesomeIcon icon={faTimesCircle} color='red'/>
                            </Buttons>
                        </Box>
                        <Box>
                            Login
                        </Box>
                        <Boxs />
                    </Top>
                    <Main>
                        <Terminal hostname="Login" />
                    </Main>
                </Base>
            </Draggable>
        </Modal>
    )
}

export default Server;