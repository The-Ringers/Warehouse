import React from 'react'
import axios from 'axios'

// Routing
import { withRouter } from 'react-router'

// Redux
import { wipeRedux } from '../../redux/reducer'

// Stylesheets
import './Sidebar.css';

function Sidebar(props) {
    const routeToInvoice = () => {
        props.history.push('/invoice')
    }

    const routeToOrder = () => {
        props.history.push('/order')
    }

    const routeToQuote = () => {
        props.history.push('/quote')
    }

    const routeToInventory = () => {
        props.history.push('/inventory')
    }

    const routeToSearch = () => {
        props.history.push('/search')
    }

    const logoutUser = () => {
        axios.delete('/api/logout').then(() => {
            props.history.push('/')
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='sidebar-main'>
            <section>
                <p className='sidebar-title'>Inventario</p>
                <button className={props.location.pathname === '/invoice' ? 'selected-btn' : 'sidebar-btn'} onClick={routeToInvoice}>Invoice</button>
                <button className={props.location.pathname === '/order' ? 'selected-btn' : 'sidebar-btn'} onClick={routeToOrder}>Order</button>
                <button className={props.location.pathname === '/quote' ? 'selected-btn' : 'sidebar-btn'} onClick={routeToQuote}>Quote</button>
                <button className={props.location.pathname === '/inventory' ? 'selected-btn' : 'sidebar-btn'} onClick={routeToInventory}>Inventory</button>
                <button className={props.location.pathname === '/search' ? 'selected-btn' : 'sidebar-btn'} onClick={routeToSearch}>Search</button>
            </section>
            <section>
                <button className='sidebar-logout' onClick={logoutUser}>Logout</button>
            </section>
        </div>
    )
}

export default withRouter(Sidebar)