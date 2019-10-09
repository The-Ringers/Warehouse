import React, { useState } from 'react';
import axios from 'axios';

// Routing
import { withRouter } from 'react-router';

// React-Redux
import { connect } from 'react-redux';
import { wipeRedux } from '../../redux/reducer'

// Action Builders
import { addUser } from '../../redux/reducer';

// Material-UI
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
    zIndex: 9999,
    height: '75px',
    width: '100%',
    backgroundColor: 'black'
  },
  mainNav: {
    height: '100%',
    position: 'static',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'space-between',
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
  },
  home: {
    width: '160px',
    '&:hover': {
      cursor: 'pointer',
    }
  }
}));

function Nav(props) {
  console.log(props)
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const loginUser = () => {
    const body = {email, password}
    axios.post('/api/login', body).then(res => {
      const { user_id, first_name, last_name, role, email, warehouses } = res.data
      props.addUser(user_id, first_name, last_name, role, email, warehouses)
      console.log(props)
      setEmail('')
      setPassword('')
      props.history.push('/dashboard')
    }).catch(err => {
      console.log(err)
      setEmail('')
      setPassword('')
    })
  }

  const logoutUser = () => {
    axios.delete('/api/logout').then(() => {
        props.wipeRedux()
        props.history.push('/')
    }).catch(err => {
        console.log(err)
    })
  }

  const routeToHome = () => {
    props.history.push('/')
  }

  return (
    <>
    {
      props.user_id
      ?
      <div className={classes.root}>
        <AppBar className={classes.mainNav}>
          <Toolbar>
            <Typography id='font' className={classes.title} variant="h4" noWrap>
              <p className={classes.home} onClick={routeToHome}>Inventario</p>
            </Typography>
            <div className={classes.buttonMargin}>
              <Button
                id='font'
                className={classes.buttonStyle}
                onClick={logoutUser}
              >
                  Logout            
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      :
      <div className={classes.root}>
        <AppBar className={classes.mainNav}>
          <Toolbar>
            <Typography id='font' className={classes.title} variant="h4" noWrap>
              <p className={classes.home} onClick={routeToHome}>Inventario</p>
            </Typography>
            <div className={classes.input}>
              <InputBase
                id='font'
                placeholder="Email"
                value={email}
                type='text'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className={classes.input}>
              <InputBase
                id='font'
                placeholder="Password"
                value={password}
                type='password'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className={classes.buttonMargin}>
              <Button
                id='font'
                className={classes.buttonStyle}
                onClick={loginUser}
              >
                  Login            
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    }
    </>
  );
}

const mapStateToProps = (state) => {
  return{
    state
  }
}

export default withRouter(connect(mapStateToProps, {addUser, wipeRedux})(Nav))