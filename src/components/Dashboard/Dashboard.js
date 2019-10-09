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
    constructor(props){
        super(props)
        this.state = {
            warehouses: props.warehouses            
        }
    }

    render() {
        console.log(this.props)
        const mappedWarehouses = this.state.warehouses.map((element, index) => {
            return (
                <Link key={index} to={`/${this.props.company.name}/invoice`} className='dashboard-link'>
                    <Warehouse warehouse={element} company={this.props.company}/>
                </Link>
            )
        })
        return (
            <div>
                <div className='dashboard-margin'></div>
                <div className='company-name'>
                    <p>{this.props.company.name}</p>
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

export default connect(mapStateToProps)(Dashboard)