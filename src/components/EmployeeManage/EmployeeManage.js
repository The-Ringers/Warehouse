import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Table, TableHead, TableRow, TableBody, TableCell, Container, TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'

import './EmployeeManage.css'

function EmployeeManage(props) {

    const [ employees, setEmployees ] = useState([])
    const [ state, setState ] = useState({
        first_name: '',
        last_name: '',
        email: '',
        role: ''
    })

    useEffect( () => {
        axios.get(`/api/admin/employee/${props.warehouse_id}`)
            .then( response => {
                setEmployees(response.data)
            })
            .catch( error => {
                console.log(error)
            })
    }, [])

    function handleChange(event) {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const mappedEmployees = employees.map( (element, index, array) => {
        return (
            <TableRow key={ element.user_id }>
                <TableCell>{ element.first_name } { element.last_name }</TableCell>
                <TableCell>{ element.email }</TableCell>
                <TableCell>{ element.role }</TableCell>
                <TableCell>Edit/Delete</TableCell>
            </TableRow>
        )
    })

    const useStyles = makeStyles( theme => ({
        table: {
            width: 'calc(100% - 300px)',
        },
        addBar: {
            width: '85%',
            height: '60px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: '100px',
            padding: '0 10px',
            backgroundColor: '#e5e5e5'
        },
        button: {
            backgroundColor: '#640D0D',
            borderRadius: '5px',
            color: 'white',
            height: '30px',
            '&:hover': {
                backgroundColor: fade('#640D0D', 0.75),
            },
            padding: '0 5px',
            alignSelf: 'center'
        },
        barChild: {
            marginLeft: '10px'
        },
        input: {
            '& label.Mui-focused': {
                color: '#640D0D',
                },
                '& .MuiInput-underline:after': {
                borderBottomColor: '#640D0D',
                },
                '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: '#640D0D',
                },
                '&:hover fieldset': {
                    borderColor: 'yellow',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'green',
                },
            },
        }
    }))

    const classes = useStyles()

    return (
        <Container className="manager" >
            <Container className={ classes.addBar }>
                <TextField className={ `${classes.barChild} ${classes.input}` } label="First Name" name="first_name" value={ state.first_name } onChange={ handleChange } />
                <TextField className={ `${classes.barChild} ${classes.input}` } label="Last Name" name="last_name" value={ state.last_name } onChange={ handleChange } />
                <TextField className={ `${classes.barChild} ${classes.input}` } label="Email" name="email" value={ state.email } onChange={ handleChange } />
                <FormControl className={ classes.barChild }>
                    <InputLabel>Role</InputLabel>
                    <Select name="role" value={ state.role } onChange={ handleChange } className={ classes.input }>
                        <MenuItem value={ 'employee' }>Employee</MenuItem>
                        <MenuItem value={ 'manager' }>Manager</MenuItem>
                    </Select>
                </FormControl>
                <Button className={ `${classes.button} ${classes.barChild}` }>Add Employee</Button>
            </Container>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { mappedEmployees }
                </TableBody>
            </Table>
        </Container>
    )
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(EmployeeManage)