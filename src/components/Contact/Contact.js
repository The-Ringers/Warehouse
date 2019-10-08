import React, {useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import axios from 'axios';

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
        background: '#947c7c',
    },
    p: {
        fontSize: '72pt',
        color: 'white',
        marginBottom: '30px'
    },
    h1: {
        color: 'white',
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
        background: 'white',
        borderStyle: 'none',
        padding: '15px',
        boxSizing: 'border-box',
        margin: '15px',
    },
    TextareaAutosize: {
        width: '90%',
        height: '50%',
        borderRadius: '10px',
        border: 'none',
        padding: '10px',
        boxSizing: 'border-box',
        margin: '5px',
        fontSize: '12pt'
        
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
        border: 0,
        color: 'white',
        marginTop: '20px',
        height: '20%',
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
        console.log('handleSubmit')
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        axios.post('/api/send', {name, email, message}).then((response)=>{
            if (response.data.msg === 'success'){
                alert("Message Sent."); 
                resetForm()
            }else if(response.data.msg === 'fail'){
                alert("Message failed to send.")
            }
        })
    }
   const resetForm = () => {
        document.getElementById('contact-form').reset();
    }
    
    
    return (
        <form className={classes.container} method='POST' noValidate autoComplete='on'>
            <div className={classes.formContainer}>
                <p className={classes.p}>Contact Us</p>
                <h1 className={classes.h1}>Name</h1>
                <TextField
                    className={classes.TextField}
                    value={name.name}
                    onChange={(e) => setName(e.target.value)}
                    margin='normal'
                />
                <h1 className={classes.h1}>Email</h1>
                <TextField
                    className={classes.TextField}
                    value={email.email}
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    margin='normal'
                />
                <h1 className={classes.h1}>Message</h1>
                <TextareaAutosize
                    label='Message'
                    placeholder='Write your message here...'
                    rows={10}
                    className={classes.TextareaAutosize}
                    value={message.message}
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
    );
    };
