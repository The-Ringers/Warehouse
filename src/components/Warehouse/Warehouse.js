import React, { Component } from 'react'

// Stylesheets
import './Warehouse.css'

export default class Warehouse extends Component {
    render() {
        console.log(this.props.warhouse_id)
        return (
            <div className='warehouse-main' onClick={() => this.props.warehouseIdToRedux(this.props.warehouse.warehouse_id)}>
                <section className='warehouse-title'>
                    <p>{this.props.warehouse.branch_name}</p>
                </section>
                <section className='warehouse-info'>
                    <p>{this.props.warehouse.address}</p>
                    <p>{this.props.warehouse.city}, {this.props.warehouse.state}</p>
                    <p>{this.props.warehouse.zip}</p>
                </section>
            </div>
        )
    }
}
