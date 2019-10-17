import React, { Component } from 'react'

// Stylesheets
import './Landing.css'

export default class Landing extends Component {

    routeToContact = () => {
        this.props.history.push('/contact')
    }

    render() {
        return (
            <div>
                <div className='landing-margin'></div>
                <div className='landing-main'>
                    <p>The #1 Inventory</p>
                    <p>Management Software</p>
                    <button className='contact' onClick={this.routeToContact}>Contact Us</button>
                </div>
            </div>
        )
    }
}
