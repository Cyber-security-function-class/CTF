import React, { Component, useState } from 'react';
import styled from 'styled-components'
import axios from 'axios';

const Contents = styled.pre`
    width: 100%;
    margin: 0;
    white-space: pre-wrap;
`

const In = styled.input`
    font-family: 'Courier New';
    font-size: 14px;
    font-weight: 500;

    width: 100%;
    padding: 0;

    border: none;
    border-right: 0px;
    border-top: 0px;
    border-left: 0px;
    border-bottom: 0px;

    &:focus {
        outline: none;
    }
`

const Base = styled.div`
    padding: 2px;
    display: flex;
    width: 99%;
`

const Box = styled.div`
    flex-grow: 1;
`

const GetCommand = () => {
    const [content, setContent] = useState<string>("");
    const [inputs, setInputs] = useState<string>("");
    const [Hosts, setHosts] = useState<string>("");

    const onCommand = (command: any) => {
        switch (command) {
            case "notice":
                setHosts("Login");
                break;

            case "team":
                setHosts("Team");
                break;

            case "clear":
                setContent("");
                break;
            
            case "help" && "?":
                break;

            case "":
                break;

            default:
                setContent(content.concat('\nCommand Not Founds\n\n'));
                break;
        }
    }

    const onInputChange = (event: any) => {
        setInputs(event.target.value);
    }

    const onKeyEnter = (event: any) => {
        if(event.key == 'Enter') {
            setContent(content.concat(inputs, '\n'));
            onCommand(inputs);
            setInputs("");
        }
    }
    
    return (
        <label>
            <Contents>
                {content}
            </Contents>
            <Base>
                <div>
                    {Hosts}
                </div>
                <Box>
                    <In onChange={onInputChange} value={inputs} onKeyPress={onKeyEnter} ></In>
                </Box>
            </Base>
        </label>
    )
}

export default GetCommand;