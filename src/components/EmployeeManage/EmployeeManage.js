import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Table, TableHead, TableRow, TableBody, TableCell, Container, TextField, Select, MenuItem, InputLabel, FormControl, Button, Modal } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons';
import { makeStyles, fade } from '@material-ui/core/styles';

// Sweet Alerts 
import swal from 'sweetalert';

import './EmployeeManage.css'

function EmployeeManage(props) {

    const [ employees, setEmployees ] = useState([])
    const [ state, setState ] = useState({
        first_name: '',
        last_name: '',
        email: '',
        role: ''
    })
    const [ open, setOpen] = useState(false)
    const [ editUser, setEditUser ] = useState({
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

     function handleEditChange(event) {
        setEditUser({
            ...editUser,
            [event.target.name]: event.target.value
        })
    }

    const addEmployee = () => {

        const { first_name, last_name, email, role } = state
        const { warehouse_id } = props
        const body = {
            first_name,
            last_name,
            email,
            role,
            warehouse_id
        }

        axios.post('/api/admin/employee', body)
            .then( response => {
                console.log(response)
                setEmployees([...employees, response.data])
                setState({
                    first_name: '',
                    last_name: '',
                    email: '',
                    role: ''
                })
            })
            .catch( error => {
                console.log(error)
            })
    }

    const deleteEmployee = (id, index) => {
        swal("Are you sure that you want to delete this user?", {
            buttons: {
              delete: {
                text: "Delete", 
                value: "Delete"
              },
              cancel: "Cancel"
            }
          })
          .then((value) => {
              switch(value) {
                case 'Delete':
                axios.delete(`/api/admin/employee/${id}`)
                    .then( response => {
                        let tempEmployees = employees
                        tempEmployees.splice(index, 1)
                        setEmployees([...tempEmployees])
                        swal({
                            icon: "success",
                            title: "User Deleted"
                            })
                    })
                    .catch( error => {
                        console.log(error)
                    });
                break; 

                default: 
                console.log('canceled')
              }
          })
    }

    const editEmployee = (id, first_name, last_name, email, role, index) => {

        setEditUser({
            id,
            first_name,
            last_name,
            email,
            role,
            index
        })

        handleOpen()
    }

    const edit = () => {

        const { id, first_name, last_name, email, role, index } = editUser
        const body = {
            first_name,
            last_name,
            email,
            role
        }
        axios.put(`/api/admin/employee/${id}`, body)
            .then( response => {
                employees[index] = {
                    id,
                    first_name,
                    last_name,
                    email,
                    role
                }
                handleClose()
            })
            .catch( error => {
                console.log(error)
            })
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }


    const useStyles = makeStyles( theme => ({
        root: {
            width: 'calc(100% - 300px)',
            marginLeft: '300px'
        },
        table: {
            // width: 'calc(100% - 300px)',
        },
        addBar: {
            width: '1050px',
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
            },
        },
        icon: {
            '&:hover': {
                cursor: 'pointer'
            },
            marginLeft: '10px'
        },
        modal: {
            width: '1200px',
            height: '60px',
        },
        editBar: {
            top: '500px',
            left: '320px',
            position: 'fixed',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '100px',
            padding: '20px 10px',
            height: '100px',
            width: '1050px',
            backgroundColor: '#e5e5e5'
        },
        editButton: {
            marginTop: '18px'
        }
    }))

    const classes = useStyles()

    console.log(state)
    console.log(employees)

    const mappedEmployees = employees.map( (element, index, array) => {

        const{ user_id, first_name, last_name, email, role } = element

        return (
            <TableRow key={ user_id }>
                <TableCell>{ first_name } { last_name }</TableCell>
                <TableCell>{ email }</TableCell>
                <TableCell>{ role }</TableCell>
                <TableCell>
                    <Edit className={ classes.icon } onClick={ () => editEmployee(user_id, first_name, last_name, email, role, index)} />
                    <Delete className={ classes.icon } onClick={ () => deleteEmployee(user_id, index)} />
                </TableCell>
            </TableRow>
        )
    })

    return (
        <Container className={ `manager ${classes.root}` } >
            <Container className={ classes.addBar }>
                <TextField className={ `${classes.barChild} ${classes.input}` } label="First Name" name="first_name" value={ state.first_name } onChange={ handleChange } />
                <TextField className={ `${classes.barChild} ${classes.input}` } label="Last Name" name="last_name" value={ state.last_name } onChange={ handleChange } />
                <TextField className={ `${classes.barChild} ${classes.input}` } label="Email" name="email" value={ state.email } onChange={ handleChange } />
                <FormControl className={ `${classes.barChild} ${classes.input}` }>
                    <InputLabel>Role</InputLabel>
                    <Select name="role" value={ state.role } onChange={ handleChange } >
                        <MenuItem value={ 'employee' }>Employee</MenuItem>
                        <MenuItem value={ 'manager' }>Manager</MenuItem>
                    </Select>
                </FormControl>
                <Button className={ `${classes.button} ${classes.barChild}` } onClick={ addEmployee } >Add Employee</Button>
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
            <Modal open={ open } onClose={ handleClose } className={ classes.modal } >
                <Container className={ classes.editBar }>
                    <TextField className={ `${classes.barChild} ${classes.input}` } label="First Name" name="first_name" value={ editUser.first_name } onChange={ handleEditChange } />
                    <TextField className={ `${classes.barChild} ${classes.input}` } label="Last Name" name="last_name" value={ editUser.last_name } onChange={ handleEditChange } />
                    <TextField className={ `${classes.barChild} ${classes.input}` } label="Email" name="email" value={ editUser.email } onChange={ handleEditChange } />
                    <FormControl className={ `${classes.barChild} ${classes.input}` }>
                        <InputLabel>Role</InputLabel>
                        <Select name="role" value={ editUser.role } onChange={ handleEditChange } >
                            <MenuItem value={ 'employee' }>Employee</MenuItem>
                            <MenuItem value={ 'manager' }>Manager</MenuItem>
                        </Select>
                    </FormControl>
                    <Button className={ `${classes.button} ${classes.barChild} ${classes.editButton}` } onClick={ edit } >Edit Employee</Button>
                </Container>
            </Modal>
        </Container>
    )
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(EmployeeManage)