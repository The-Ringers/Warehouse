import React, {useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import swal from 'sweetalert';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './Contact.css'


const theme = createMuiTheme ({
    overrides: {
        MuiFormLabel: {
            color: 'red',
            root: {
                fontSize: '20pt',
                '&$focused': {
                    color: 'gray',
            }
        }
    } 
    }
})

const useStyles = makeStyles(theme => ({
    container: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#947c7c',
    },
    formContainer: {
        width: '50%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    p: {
        fontSize: '72pt',
        color: 'black',
        marginBottom: '30px'
    },
    h1: {
        color: 'black',
        fontSize: '24pt',
        alignSelf: 'flex-start',
        marginLeft: '30px'
    },
    TextField: {
        width: '90%',
        height: '15%',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '10px',
        borderStyle: 'none',
        padding: '15px',
        boxSizing: 'border-box',
        background: 'white',
        margin: '15px',
        '& .MuiInput-underline:after': {
            borderBottomColor: '#640D0D',
            },
    },
    TextareaAutosize: {
        width: '90%',
        height: '50%',
        borderRadius: '10px',
        border: 'none',
        padding: '10px',
        boxSizing: 'border-box',
        margin: '5px',
        fontSize: '12pt',
        fontFamily: 'Open Sans, sans-serif',
        overflow: 'scroll',
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
        borderRadius: '10px',
        fontSize: '24pt',
        border: 0,
        color: 'white',
        marginTop: '20px',
        height: '10%',
        width: '30%',
        '&:hover': {
        backgroundColor: fade('#640D0D', 0.75),
        }
    },
}));

export default function Contact() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/send', {name, email, message}).then((response)=>{
            if (response.data.msg === 'success'){
                swal({
                    icon: "success",
                    title: "Message Sent", 
                    text: "Thank you for your interest! We will be in touch with you soon."
                  })
                resetForm()
            }else if(response.data.msg === 'fail'){
                swal({
                    icon: "error",
                    title: "Message Error", 
                    text: "Please make sure that you are entering correct information."
                  })
            }
        })
    };

   const resetForm = () => {
        setName('')
        setEmail('')
        setMessage('')
    };
    
    return (
        <ThemeProvider theme={theme}>
        <form className={classes.container} method='POST' noValidate autoComplete='on'>
            <div className={classes.formContainer}>
                <p className={classes.p}>Contact Us</p>
                <TextField
                    className={classes.TextField}
                    value={name}
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                    margin='normal'
                />
                <TextField
                    className={classes.TextField}
                    value={email}
                    label="Email"
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextareaAutosize
                    label='Message'
                    placeholder='Write your message here...'
                    rows={10}
                    className={classes.TextareaAutosize}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    margin='normal'
                />
                <Button
                    id='font'
                    onClick={handleSubmit}
                    className={classes.buttonStyle}
                >
                    Submit
                </Button>
            </div>
        </form>
        </ThemeProvider>
    );
};
