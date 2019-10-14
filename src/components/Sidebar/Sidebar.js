import React from 'react'
import axios from 'axios'

// Routing
import { withRouter } from 'react-router'

// Redux
import { connect } from 'react-redux';
import { wipeRedux } from '../../redux/reducer'

// Stylesheets
import './Sidebar.css';

function Sidebar(props) {
    const routeToInvoice = () => {
        props.history.push(`/${props.company.name}/invoice`)
    }

    const routeToOrder = () => {
        props.history.push(`/${props.company.name}/order`)
    }

    const routeToQuote = () => {
        props.history.push(`/${props.company.name}/quote`)
    }

    const routeToInventory = () => {
        props.history.push(`/${props.company.name}/inventory`)
    }

    const routeToSearch = () => {
        props.history.push(`/${props.company.name}/search`)
    }

    const routeToCompanyRegister = () => {
        props.history.push('/register-company')
    }

    const logoutUser = () => {
        axios.delete('/api/logout').then(() => {
            props.wipeRedux()
            props.history.push('/')
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='sidebar-main'>
            <section>
                <p className='sidebar-title'>Inventario</p>
                <button className={props.location.pathname === `/${props.company.name}/invoice` ? 'selected-btn' : 'sidebar-btn'} onClick={routeToInvoice}>Invoice</button>
                <button className={props.location.pathname === `/${props.company.name}/order` ? 'selected-btn' : 'sidebar-btn'} onClick={routeToOrder}>Order</button>
                <button className={props.location.pathname === `/${props.company.name}/quote` ? 'selected-btn' : 'sidebar-btn'} onClick={routeToQuote}>Quote</button>
                <button className={props.location.pathname === `/${props.company.name}/inventory` ? 'selected-btn' : 'sidebar-btn'} onClick={routeToInventory}>Inventory</button>
                <button className={props.location.pathname === `/${props.company.name}/search` ? 'selected-btn' : 'sidebar-btn'} onClick={routeToSearch}>Search</button>
                {
                    props.role === 'admin' ?
                    <button className={props.location.pathname === '/register-company' ? 'selected-btn' : 'sidebar-btn'} onClick={routeToCompanyRegister}>Company Register</button>
                    :
                    null
                }
            </section>
            <section>
                <button className='sidebar-logout' onClick={logoutUser}>Logout</button>
            </section>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state
}

export default withRouter(connect(mapStateToProps, {wipeRedux})(Sidebar))