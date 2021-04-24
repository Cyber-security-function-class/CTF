import React, { Component } from 'react';
import Modal from '../../Components/modal/Modal';
import BaseStyle from '../../Components/modal/BaseStyle';
import CUI from './CUI';

class HomePage extends Component {
    state = {
        hostname: "",
        modal: false
    };

    handleOpenModal = (name: any) => {
        this.setState({
            modal: true,
            hostname: name
        });
    };

    handleCloseModal = () => {
        this.setState({
            modal: false
        });
    };

    render() {
        return (
        <div>
            <h1>안녕하세요 리액트!</h1>
            <button onClick={() => this.handleOpenModal("Login")}>모달 열기</button>
            {this.state.modal && (
            <Modal>
                <BaseStyle classs="Login" onClose={this.handleCloseModal} >
                    <CUI>
                        
                    </CUI>
                </BaseStyle>
            </Modal>
            )}
        </div>
        );
    }
}

export default HomePage;