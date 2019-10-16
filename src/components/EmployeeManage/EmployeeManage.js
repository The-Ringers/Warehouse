import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Table, TableHead, TableRow, TableBody, TableCell, Container, TextField, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
        console.log(event.target.value)
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
            width: '100%',
            height: '60px',
        }
    }))
    
    const classes = useStyles()

    return (
        <Container className="manager" >
            <Container className={ classes.addBar }>
                <TextField label="First Name" name="first_name" value={ state.first_name } onChange={ handleChange } />
                <TextField label="Last Name" name="last_name" value={ state.last_name } onChange={ handleChange } />
                <TextField label="Email" name="email" value={ state.email } onChange={ handleChange } />
                <Select />
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