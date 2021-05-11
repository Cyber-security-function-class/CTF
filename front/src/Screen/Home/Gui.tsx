import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

type Props = {
    classs: string,
    children: JSX.Element;
};

const GUI: React.FC<Props> = ({ classs, children }) => {
    return (
        <div>
            <MBase>
                <MTitle>{classs}</MTitle>
                <label>
                    <MMain>
                        {children}
                    </MMain>
                </label>
            </MBase>
        </div>
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

export default GUI;