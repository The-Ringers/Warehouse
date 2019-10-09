import React, { Component } from 'react'

// Components
import Warehouse from '../Warehouse/Warehouse'

// Routing
import { Link } from 'react-router-dom'

// React-Redux
import { connect } from 'react-redux';

// Stylesheets
import './Dashboard.css'

class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            warehouses: this.props.warehouses
        }
    }

    render() {
        const mappedWarehouses = this.state.warehouses.map((element, index) => {
            return (
                <Link key={index} to={`/warehouse/${element.warehouse_id}`}>
                    <Warehouse warehouse={element}/>
                </Link>
            )
        })
        return (
            <div>
                <div className='dashboard-margin'></div>
                {mappedWarehouses}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(Dashboard)