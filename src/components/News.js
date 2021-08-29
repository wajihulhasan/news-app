
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';


export class News extends Component {

   static defaultProps={
       pageSize:9,
       category:'general',
   }

    static propTypes={
        pageSize:PropTypes.number,
        category:PropTypes.string,
    }
    constructor() {
        super();
        this.state ={
            articles:[],
            loading:false,
            page:1,
            pageSize:9,
            totalArticles:10

        }
    }
    async componentDidMount()
    {
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=37e1970c7c774e53b52c386a3bf29ca4&pageSize=9`;
        this.setState({
            loading:true,
        });
        let data=await fetch(url);
        let parseData=await data.json();
        this.setState({
            articles: parseData.articles,
            totalArticles: parseData.totalResults,
            loading:false,
        });
    
    }
    nextPageStories=async()=>{
        if(!(this.state.page+1>Math.ceil((this.state.totalArticles/this.state.pageSize))))
        {
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=37e1970c7c774e53b52c386a3bf29ca4&page=${this.state.page+1}&pageSize=${this.state.pageSize}`;
            this.setState({
                loading:true,
            });
            let data=await fetch(url);
            let parseData=await data.json();
            this.setState({
                articles: parseData.articles,
                page: this.state.page+1,
                loading:false,
            });

        }        

    }

    prevPageStories=async()=>{

        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=37e1970c7c774e53b52c386a3bf29ca4&page=${this.state.page-1}&pageSize=${this.state.pageSize}`;
        this.setState({
            loading:true,
        });
        let data=await fetch(url);
        let parseData=await data.json();
        this.setState({
            page: this.state.page-1,
            articles: parseData.articles,
            loading:false,
        });

    }
    render() {
        return (
            <div>                
                <div className="container my-4">
                    <h1 className="text-center">Top Headlines</h1>
                    {this.state.loading && <Spinner/>}                    
                    <div className="row" >
                    {!this.state.loading && this.state.articles.map((article)=>{
                    return  <div className="col-md-4 my-2" key={article.url}>
                        <NewsItem title={(article.title)?article.title.slice(0,20):""} description={(article.description)?article.description.slice(0,40):""} imageUrl={(!article.urlToImage)?"https://i1.wp.com/9to5mac.com/wp-content/uploads/sites/6/2021/06/Windows-11-on-Mac.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1":article.urlToImage} url={article.url} source={!article.source.name?"Unknown":article.source.name} author={!article.author?"Unknown":article.author} date={article.publishedAt}/>
                    </div>
                })}
                   </div> 
                </div>
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.prevPageStories}>&larr;Previous</button>
                <button disabled={(this.state.page+1>Math.ceil((this.state.totalArticles/this.state.pageSize)))} type="button" className="btn btn-dark" onClick={this.nextPageStories}>Next&rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
