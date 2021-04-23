import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Registr = () => {
  const [regInput, setRegInput] = useState({ name: '', email: '', password: '' })
  const classes = useStyles();

  const history = useHistory()
  const handlerinput = (e) => {
    setRegInput({ ...regInput, [e.target.name]: e.target.value })
  }

  const submitHandler = ({ name, email, password }) => {
    fetch('http://localhost:3000/api/v1/todos', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
        .then(res => {
          if (res.status === 200) {
            history.push('/')
          }
        })
    })
  }
  return (
    <form onSubmit={() => submitHandler(regInput)} className={classes.root} noValidate autoComplete="off">
      <TextField onChange={handlerinput} id="outlined-basic" name='name' label="User name" variant="outlined" />
      <TextField onChange={handlerinput} id="outlined-basic" name='email' label="Email" variant="outlined" />
      <TextField onChange={handlerinput} id="outlined-basic" name='password' label="Password" variant="outlined" type="password" />
      <br></br>
      <Button variant="outlined" color="primary">
        Registration
      </Button>
    </form>

  );
}

export default Registr;
