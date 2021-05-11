import React, { Component, useState } from 'react';
import axios from 'axios';

export const Help = () => {
    axios.post('/api/user/signIn')
        .then(onLoginSuccess)
        .catch(error => {});
}

const onLoginSuccess = (response: any) => {
    const { token } = response.data;

    localStorage.setItem("token", token);
    axios.defaults.headers.common['Authorization'] = token;

    console.log(token);
}