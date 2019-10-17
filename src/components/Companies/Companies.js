import React, { Component } from 'react'

// Stylesheets
import './Companies.css'

export default class Warehouse extends Component {
    render() {
        return (
            <div className='warehouse-main' onClick={() => this.props.companyIdToRedux(this.props.company.company_id, this.props.index)}>
                <section className='warehouse-title'>
                    <p>{this.props.company.name}</p>
                </section>
                <section className='warehouse-info'>
                    <p>{this.props.company.address}</p>
                    <p>{this.props.company.city}, {this.props.company.state}</p>
                    <p>{this.props.company.zip}</p>
                </section>
            </div>
        )
    }
}
