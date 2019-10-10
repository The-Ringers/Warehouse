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
        props.history.push(`/${props.company.name}/invoice/${props.warehouse_id}`)
    }

    const routeToOrder = () => {
        props.history.push(`/${props.company.name}/order/${props.warehouse_id}`)
    }

    const routeToQuote = () => {
        props.history.push(`/${props.company.name}/quote/${props.warehouse_id}`)
    }

    const routeToInventory = () => {
        props.history.push(`/${props.company.name}/inventory/${props.warehouse_id}`)
    }

    const routeToSearch = () => {
        props.history.push(`/${props.company.name}/search/${props.warehouse_id}`)
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
                <button className={props.location.pathname === `/${props.company.name}/invoice/${props.warehouse_id}` ? 'selected-btn' : 'sidebar-btn'} onClick={routeToInvoice}>Invoice</button>
                <button className={props.location.pathname === `/${props.company.name}/order/${props.warehouse_id}` ? 'selected-btn' : 'sidebar-btn'} onClick={routeToOrder}>Order</button>
                <button className={props.location.pathname === `/${props.company.name}/quote/${props.warehouse_id}` ? 'selected-btn' : 'sidebar-btn'} onClick={routeToQuote}>Quote</button>
                <button className={props.location.pathname === `/${props.company.name}/inventory/${props.warehouse_id}` ? 'selected-btn' : 'sidebar-btn'} onClick={routeToInventory}>Inventory</button>
                <button className={props.location.pathname === `/${props.company.name}/search/${props.warehouse_id}` ? 'selected-btn' : 'sidebar-btn'} onClick={routeToSearch}>Search</button>
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