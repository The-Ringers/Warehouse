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
import './CompanyDashboard.css'

class Dashboard extends Component {
    warehouseIdToRedux = (id) => {
        this.props.addWarehouseId(id)
        axios.get(`/api/categories/${id}`).then(res => {
            this.props.addCategories(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const mappedWarehouses = this.props.warehouses.map((element, index) => {
            if(element.company_id === this.props.company_id){
                return (
                    <Link key={index} to={`/${this.props.companies[this.props.company_index].name}/invoice/${element.warehouse_id}`} className='dashboard-link'>
                        <Warehouse warehouse={element} company={this.props.companies[this.props.company_index]} warehouseIdToRedux={this.warehouseIdToRedux}/>
                    </Link>
                )
            }
        })
        return (
            <div className='dashboard-container'>
                <div className='dashboard-margin'></div>
                <div className='company-name'>
                    <p>{this.props.companies[this.props.company_index].name}</p>
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