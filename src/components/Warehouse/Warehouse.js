import React, { Component } from 'react'

// Stylesheets
import './Warehouse.css'

export default class Warehouse extends Component {
    render() {
        return (
            <div className='warehouse-main'>
                <p>{this.props.warehouse.branch_name}</p>
                <p>{this.props.warehouse.address}</p>
                <p>{this.props.warehouse.city}</p>
                <p>{this.props.warehouse.state}</p>
                <p>{this.props.warehouse.zip}</p>
            </div>
        )
    }
}
