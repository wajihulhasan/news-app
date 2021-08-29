import React, { Component } from 'react'
import '../App.css'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, url, date, source, author } = this.props;
        return (
            <div>
                <div className="card">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left: '90%',zIndex:'1'}}>{source}</span>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p class="card-text"><small class="text-muted">By {author} {new Date(date).toGMTString()}</small></p>
                        <a href={url} className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
