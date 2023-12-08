import { useState, FormEvent } from 'react';
import { Button, TextField } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigate } from 'react-router-dom';
import style from '../styles/Login.module.scss';
import { validUser } from '../helper/constants';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const saveUser = (event: FormEvent) => {
    event.preventDefault();
    const user = { name, password };
    if (name === validUser.name && password === validUser.password) {
      localStorage.setItem('work', JSON.stringify(validUser));
      navigate('/scan');
    } else {
      localStorage.setItem('users', JSON.stringify(user));
      navigate('/registration');
    }
  };

  return (
    <div>
      <h3 className={style.h3}>Login</h3>
      <form className={style.login_main} onSubmit={saveUser}>
        <TextField
          id="outlined-basic"
          label="Username"
          name="name"
          variant="outlined"
          type="text"
          onChange={(e) => setName(e.target.value)}
          InputProps={{
            style: {
              color: 'white',
            },
            classes: {
              notchedOutline: `${style.text}`,
            },
          }}
          InputLabelProps={{
            style: {
              color: 'white',
            },
          }}
          required
        />
        <TextField
          id="outlined-basic"
          label="Password"
          name="password"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            style: {
              color: 'white',
            },
            classes: {
              notchedOutline: `${style.text}`,
            },
          }}
          InputLabelProps={{
            style: {
              color: 'white',
            },
          }}
          required
        />
        <Button
          sx={{ minWidth: '210px', backgroundColor: 'white', color: 'black' }}
          type="submit"
          variant="contained"
        >
          Log in
        </Button>
      </form>
    </div>
  );
}

export default Login;
