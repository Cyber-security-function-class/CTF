import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Base = styled.div`
    background-color: white;
    width: 100%;
    height: 100%;
    border: 3px solid black;
`
const BaseIN = styled.div`
    padding: 10px;
`

const InLines = styled.div`
    width: 100%;
`
const In = styled.input`
    width: 100%;
    border: none;
    border-right: 0px;
    border-top: 0px;
    border-left: 0px;
    border-bottom: 0px;

    padding-top: 0px;
    
    font-family: 'Courier New', monospace;
    font-size: 13px;

    &:focus {
        outline: none;
    }
`

const Cusors = styled.div`
    font-size: 13px;
    display: flex;
`

const Terminal: React.FC = () => {
    const cursor = 'Login>';

    return (
        <label>
            <Base>
                <BaseIN>
                    <Cusors>
                        {cursor}
                        <In type="text"></In>
                    </Cusors>
                </BaseIN>
            </Base>
        </label>
    )
}

export default Terminal;