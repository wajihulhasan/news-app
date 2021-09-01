
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        pageSize: 9,
        category: 'general',
    }

    static propTypes = {
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            pageSize: 9,
            totalArticles:0,

        }
    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4cd4b0d4cc14c8782a447619e235054&page=${this.state.page}&pageSize=${this.state.pageSize}`;
        
        let data = await fetch(url);
        let parseData = await data.json();
        
        this.setState({
            totalArticles: parseData.totalResults,
            articles: this.state.articles.concat(parseData.articles),
        });
        
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f4cd4b0d4cc14c8782a447619e235054&pageSize=${this.state.pageSize}`;
        this.props.setProgress(10);
        let data = await fetch(url);
        let parseData = await data.json();
        this.props.setProgress(50);
        this.setState({
            articles: parseData.articles,
            totalArticles: parseData.totalResults,
            loading: false,
        });
        this.props.setProgress(100);

    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1,
        }, () => { this.updateNews() });
    }



    render() {
        return (
            <>
                    <h1 className="text-center">Top Headlines on {this.props.category}</h1>
                    {this.state.loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalArticles} 
                        loader={<Spinner />}>
                        <div className="container">
                            <div className="row" >
                                {this.state.articles.map((article) => {
                                    return <div className="col-md-4 my-2" key={article.url}>
                                        <NewsItem title={(article.title) ? article.title.slice(0, 20) : ""} description={(article.description) ? article.description.slice(0, 40) : ""} imageUrl={(!article.urlToImage) ? "https://i1.wp.com/9to5mac.com/wp-content/uploads/sites/6/2021/06/Windows-11-on-Mac.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1" : article.urlToImage} url={article.url} source={!article.source.name ? "Unknown" : article.source.name} author={!article.author ? "Unknown" : article.author} date={article.publishedAt} />
                                    </div>
                                })}
                            </div>
                        </div>

                    </InfiniteScroll>

            </>
        )
    }
}

export default News
