import React from 'react'
import styled from 'styled-components'
import Draggable from 'react-draggable';
import icon from "../../public/images/app.png";
import closeb from "../../public/images/closeb.png";
import closew from "../../public/images/closew.png";

type Props = {
    classs: string,
    onClose: any,
    children: JSX.Element;
};

const BaseStyle = ({ classs, onClose, children }: Props) => {
    return (
        <Draggable>
            <Base>
                <Top>
                    <Box>
                        <Icon src={icon} />
                        <Hostname>
                            {classs}
                        </Hostname>
                    </Box>
                    <Box>
                        <Buttons onClick={onClose}>
                            &#x2715;
                        </Buttons>
                    </Box>
                </Top>
                <Main>
                    {children}
                </Main>
            </Base>
        </Draggable>
    )
}

// Base

const Base = styled.div`
    font-family: 'Courier New';
    font-size: 14px;
    font-weight: 500;
    background-color: rgb(255, 255, 255);
    width: 500px;
    height: 550px;
    border: 0.1px solid rgb(112, 112, 112);
`

//Top

const Top = styled.div`
    background-color: rgb(255, 255, 255);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Box = styled.div`
    padding: 0px;
    display: flex;
    justify-content: space-around;
    font-family: 'Lato', sans-serif;
`

const Icon = styled.img`
    padding-left: 10px;
    width: 16px;
    height: 16px;
`

const Hostname = styled.span`
    padding-left: 5px;
`

const Buttons = styled.button`
    width: 50px;
    height: 30px;
    border: 0;
    background-color: white;

    &:hover {
        background-color: rgb(232, 17, 35);
        color: white;
    }
`

//Main

const Main = styled.div`
    background-color: rgb(240, 240, 240);
    height: 484px;
    margin-top: 11px;
    padding: 11px;
    padding-top: 35px;
    padding-bottom: 20px;
`

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

export default BaseStyle;