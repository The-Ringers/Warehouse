import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Stylesheets
import './Nav.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    width: '100%'
  },
  mainNav: {
    position: 'static',
    backgroundColor: '#e5e5e5'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#393E41',
    fontWeight: 'bold',
    transform: 'scale(1, .9)',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  input: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.75),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 2),
    transition: theme.transitions.create('width'),
    color: '#393E41',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 225
    },
  },
  buttonMargin: {
      margin: theme.spacing(1),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '35px',
  },
  buttonStyle: {
      background: '#640D0D',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: '100%',
      '&:hover': {
        backgroundColor: fade('#640D0D', 0.75),
      }
  }
}));

export default function Nav() {
  const classes = useStyles();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className={classes.root}>
      <AppBar className={classes.mainNav}>
        <Toolbar>
          <Typography id='font' className={classes.title} variant="h4" noWrap>
            Inventario
          </Typography>
          <div className={classes.input}>
            <InputBase
              id='font'
              placeholder="Username"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setUsername({username: e.target.value})}
            />
          </div>
          <div className={classes.input}>
            <InputBase
              id='font'
              placeholder="Password"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setPassword({password: e.target.value})}
            />
          </div>
          <div className={classes.buttonMargin}>
            <Button
              id='font'
              className={classes.buttonStyle}
            >
                Login            
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
