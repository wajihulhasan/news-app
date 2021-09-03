
import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
require('dotenv').config()


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(9)
    const [totalArticles, settotalArticles] = useState(0);

    const updateNews = async () => {
        props.updateProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${pageSize}`; 
        setLoading(true)
        let data = await fetch(url);
        props.updateProgress(30);
        let parsedData = await data.json()
        props.updateProgress(70);
        setArticles(parsedData.articles)
        settotalArticles(parsedData.totalResults)
        setPageSize(9);
        setLoading(false)
        props.updateProgress(100);

    }

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps        
    },[]);


    const fetchMoreData = async () => {
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        settotalArticles(parsedData.totalResults)
    }

    return (
        <>
            <h1 className="text-center">Top Headlines on {props.category}</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalArticles}
                loader={<Spinner />}>
                <div className="container">
                    <div className="row" >
                        {articles.map((article,index) => {
                            return <div className="col-md-4 my-2" key={index}>
                                <NewsItem title={(article.title) ? article.title.slice(0, 20) : ""} description={(article.description) ? article.description.slice(0, 40) : ""} imageUrl={(!article.urlToImage) ? "https://i1.wp.com/9to5mac.com/wp-content/uploads/sites/6/2021/06/Windows-11-on-Mac.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1" : article.urlToImage} url={article.url} source={!article.source.name ? "Unknown" : article.source.name} author={!article.author ? "Unknown" : article.author} date={article.publishedAt}/>
                            </div>
                        })}
                    </div>
                </div>

            </InfiniteScroll>

        </>
    )
}

News.propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

News.defaultProps = {
    pageSize: 9,
    category: 'general',
}

export default News
