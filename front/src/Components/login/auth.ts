import axios from 'axios';

type AuthState = {
    Email: string,
    Password: string
}

export const onLogin = async ({Email, Password}: AuthState) => {
  try {
    const body = {
      email : Email,
      password : Password
    }

    console.log(body);

    const response = await axios.post('/api/user/signIn', body)
    if(response && response.data) {
      const {token} = response.data;
      axios.defaults.headers.common['Authorization'] = token;
      console.log(token);
      console.log("T");
      return token;
    }
  } catch (error) {
    console.log(error) 
  }
}