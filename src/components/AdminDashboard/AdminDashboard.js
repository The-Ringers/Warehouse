import React, { Component } from 'react'

// React-Redux
import { connect } from 'react-redux'
import { addCompanyId, addCompanyIndex } from '../../redux/reducer'

// Routing
import { Link } from 'react-router-dom'

import Companies from '../Companies/Companies'

// Stylesheets
import './AdminDashboard.css'

class AdminDashboard extends Component {
    companyIdToRedux = (id, index) => {
        this.props.addCompanyId(id)
        this.props.addCompanyIndex(index)
    }

    render() {
        console.log(this.props)
        const mappedCompanies = this.props.companies.map((element, index) => {
            return (
                <Link key={index} to={`/company/dashboard`} className='dashboard-link'>
                    <Companies company={element} index={index} companyIdToRedux={this.companyIdToRedux}/>
                </Link>
            )
        })
        return (
            <div className='dashboard-container'>
                <div className='admin-margin'/>
                <div className='company-name'>
                    <p>Companies</p>
                </div>
                <div className='newcompany-btn-container'>
                    <Link to='/register-company'>
                        <button className='newcompany-btn'>New Company</button>
                    </Link>
                </div>
                <div className='dashboard-warehouses-container'>
                    <div className='dashboard-warehouses'>{mappedCompanies}</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
} 

export default connect(mapStateToProps, {addCompanyId, addCompanyIndex})(AdminDashboard)
