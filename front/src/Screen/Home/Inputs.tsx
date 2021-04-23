import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Cusors = styled.div`
    font-size: 13px;
    display: flex;
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

let cusor: string[] = ['>', '#']

interface TermProps {
    hostname: string;
}

const Inputs: React.FC<TermProps> = ({ hostname }) => {
    return (
        <div>
            <Cusors>
                <span>
                    { hostname }
                    { cusor[0] }
                </span>
                <In type="text" />
            </Cusors>
        </div>
    )
}


export default Inputs;