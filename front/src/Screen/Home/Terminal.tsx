import React from 'react'
import styled from 'styled-components'
import Input from './Inputs'; 

const Base = styled.div`
    background-color: white;
    width: 100%;
    height: 100%;
    border: 3px solid black;
`
const BaseIN = styled.div`
    padding: 10px;
`

interface TermProps {
    hostname: string;
}

const Terminal: React.FC<TermProps> = ({ hostname }) => {
    return (
        <label>
            <Base>
                <BaseIN>
                    <Input hostname={hostname} />
                </BaseIN>
            </Base>
        </label>
    )
}


export default Terminal;