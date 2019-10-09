import React, { Component } from 'react'

export default class Warehouse extends Component {
    render() {
        return (
            <div>
                {this.props.warehouse.warehouse_id}
            </div>
        )
    }
}
