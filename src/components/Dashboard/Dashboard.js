import React, { Component } from 'react'
import axios from 'axios'

// Components
import Warehouse from '../Warehouse/Warehouse'

// Routing
import { Link } from 'react-router-dom'

// React-Redux
import { connect } from 'react-redux';
import { addWarehouseId, addCategories } from '../../redux/reducer';

// Stylesheets
import './Dashboard.css'

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            warehouses: props.warehouses          
        }
    }

    warehouseIdToRedux = (id) => {
        this.props.addWarehouseId(id)
        axios.get(`/api/categories/${id}`).then(res => {
            console.log(res.data)
            this.props.addCategories(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const mappedWarehouses = this.state.warehouses.map((element, index) => {
            return (
                <Link key={index} to={`/${this.props.companies[0].name}/invoice/${element.warehouse_id}`} className='dashboard-link'>
                    <Warehouse warehouse={element} company={this.props.companies[0]} warehouseIdToRedux={this.warehouseIdToRedux}/>
                </Link>
            )
        })
        return (
            <div className='dashboard-container'>
                <div className='dashboard-margin'></div>
                <div className='company-name'>
                    <p>{this.props.companies[0].name}</p>
                </div>
                <div className='dashboard-warehouses-container'>
                    <div className='dashboard-warehouses'>{mappedWarehouses}</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {addWarehouseId, addCategories})(Dashboard)