import React, { Component } from 'react'

// Components
import Warehouse from '../Warehouse/Warehouse'

// Routing
import { Link } from 'react-router-dom'

// Stylesheets
import './Dashboard.css'
import axios from 'axios';

class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            warehouses: []
        }
    }

    componentDidMount(){
        this.getWarehouses()
    }

    getWarehouses = () => {
        axios.get('/api/warehouse').then(res => {
            this.setState({
                warehouses: res.data
            })
        }).catch(err => {
            console.log(err)
        })
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

export default Dashboard