import React, { useState } from 'react'
import axios from 'axios'
import { TextField, Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import './CompanyRegister.css'

const useStyles = makeStyles( theme => ({
    paper: {
        marginLeft: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
}))


export default function CompanyRegister() {

    const [form, setForm] = useState('owner')
    const [state, setState] = useState({
        compName: '',
        compAddress: '',
        compCity: '',
        compState: '',
        compZip: '',
        first_name: '',
        last_name: '',
        email: '',
        wareName: '',
        wareAddress: '',
        wareCity: '',
        wareState: '',
        wareZip: ''
    })

    function handleChange(event) {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    function register() {
        const body = {
            owner: {
                first_name: state.first_name,
                last_name: state.last_name,
                email: state.email
            },
            company: {
                name: state.compName,
                address: state.compAddress,
                city: state.compCity,
                state: state.compState,
                zip: state.compZip
            },
            warehouse: {
                branch_name: state.wareName,
                address: state.wareAddress,
                city: state.wareCity,
                state: state.wareState,
                zip: state.wareZip
            }
        }

        axios.post('/api/company', body)
            .then( response => {
                console.log(response)
            })
            .catch( error => {
                console.log(error)
            })
    }

    const classes = useStyles()

    return (
        <Paper className={ classes.paper }>
            {
                form === 'company' ?
                <div className={ classes.form }>
                    <TextField label="Company Name" name="compName" value={ state.compName } onChange={ handleChange } />
                    <TextField label="Address" name="compAddress" value={ state.compAddress} onChange={ handleChange } />
                    <TextField label="City" name="compCity" value={ state.compCity } onChange={ handleChange } />
                    <TextField label="State" name="compState" value={ state.compState } onChange={ handleChange } />
                    <TextField label="Zip" name="compZip" value={ state.compZip } onChange={ handleChange } />
                    <div>
                        <Button onClick={ () => setForm('owner') }>Previous</Button>
                        <Button onClick={ () => setForm('warehouse') }>Next</Button>
                    </div>
                </div>
                :
                null
            }
            {
                form === 'owner' ?
                <div className={ classes.form }>
                    <TextField label="First Name" name="first_name" value={ state.first_name } onChange={ handleChange } />
                    <TextField label="Last Name" name="last_name" value={ state.last_name } onChange={ handleChange } />
                    <TextField label="Email" name="email" value={ state.email } onChange={ handleChange } />
                    <div>
                        <Button>Cancel</Button>
                        <Button onClick={ () => setForm('company') }>Next</Button>
                    </div>
                </div>
                :
                null
            }
            {
                form === 'warehouse' ?
                <div className={ classes.form }>
                    <TextField label="Branch Name" name="wareName" value={ state.wareName } onChange={ handleChange } />
                    <TextField label="Address" name="wareAddress" value={ state.wareAddress } onChange={ handleChange } />
                    <TextField label="City" name="wareCity" value={ state.wareCity } onChange={ handleChange } />
                    <TextField label="State" name="wareState" value={ state.wareState } onChange={ handleChange } />
                    <TextField label="Zip" name="wareZip" value={ state.wareZip } onChange={ handleChange } />
                    <div>
                        <Button onClick={ () => setForm('company') }>Previous</Button>
                        <Button onClick={ register }>Complete</Button>
                    </div>
                </div>
                :
                null
            }
            
        </Paper>
    )
}
