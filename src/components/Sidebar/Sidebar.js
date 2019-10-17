import React from 'react'
import axios from 'axios'

// Routing
import { withRouter } from 'react-router'

// Redux
import { connect } from 'react-redux';
import { wipeRedux } from '../../redux/reducer'

// Stylesheets
import './Sidebar.css';

export function Sidebar(props) {
    const routeToInvoice = () => {
        props.history.push(`/${props.companies[0].name}/invoice/${props.warehouse_id}`)
    }

    const routeToOrder = () => {
        props.history.push(`/${props.companies[0].name}/order/${props.warehouse_id}`)
    }

    const routeToQuote = () => {
        props.history.push(`/${props.companies[0].name}/quote/${props.warehouse_id}`)
    }

    const routeToInventory = () => {
        props.history.push(`/${props.companies[0].name}/inventory/${props.warehouse_id}`)
    }

    const routeToSearch = () => {
        props.history.push(`/${props.companies[0].name}/search/${props.warehouse_id}`)
    }

    const routeToEmployeeManager = () => {
        props.history.push(`/${props.companies[0].name}/employee/${props.warehouse_id}`)
    }

    const routeToDashboard = () => {
        props.history.push(`/${props.companies[0].name}/dashboard`)
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
                <p className='sidebar-title' onClick={routeToDashboard}>Inventario</p>
                <button className={props.location.pathname === `/${props.companies[0].name}/invoice/${props.warehouse_id}` ? 'selected-btn' : 'sidebar-btn'} onClick={routeToInvoice}>Invoice</button>
                <button className={props.location.pathname === `/${props.companies[0].name}/order/${props.warehouse_id}` ? 'selected-btn' : 'sidebar-btn'} onClick={routeToOrder}>Order</button>
                <button className={props.location.pathname === `/${props.companies[0].name}/quote/${props.warehouse_id}` ? 'selected-btn' : 'sidebar-btn'} onClick={routeToQuote}>Quote</button>
                <button className={props.location.pathname === `/${props.companies[0].name}/inventory/${props.warehouse_id}` ? 'selected-btn' : 'sidebar-btn'} onClick={routeToInventory}>Inventory</button>
                <button className={props.location.pathname === `/${props.companies[0].name}/search/${props.warehouse_id}` ? 'selected-btn' : 'sidebar-btn'} onClick={routeToSearch}>Search</button>
                {
                    props.role === 'manager' || props.role === 'owner' || props.role === 'admin' ?
                    <button className={props.location.pathname === `/${props.companies[0].name}/employee/${props.warehouse_id}` ? 'selected-btn' : 'sidebar-btn'} onClick={routeToEmployeeManager}>Employee Manager</button>
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