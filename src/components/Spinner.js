import React, { Component } from 'react'
import loading from '../logo.gif'
export default class logo extends Component {
    render() {
        return (
            <div className="text-center">
                <img src={loading} alt="loading" />
            </div>
        )
    }
}
