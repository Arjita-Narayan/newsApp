import React, { useEffect, useState, useCallback } from "react";
import NewsItem from "./NewsItem";
import Spin from "./Spin";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country = "us", category = "general", apiKey, pageSize = 8 }) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = useCallback(async (pageNumber) => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${pageNumber}&pageSize=${pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    
    // Avoid duplicates by checking for existing articles
    setArticles((prevArticles) => {
      const newArticles = parsedData.articles || [];
      const uniqueArticles = newArticles.filter(
        (newArticle) => !prevArticles.some((article) => article.url === newArticle.url)
      );
      return [...prevArticles, ...uniqueArticles];
    });
    setTotalResults(parsedData.totalResults || 0);
    setLoading(false);
  }, [country, category, apiKey, pageSize]); 

  useEffect(() => {
    updateNews(page); 
  }, [category, page, updateNews]); 

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    await updateNews(nextPage); 
    setPage(nextPage); 
  };

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
        NewsMonkey - Top {capitalizeFirstLetter(category)} Headlines
      </h1>

      {loading && <Spin />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults && !loading} // Prevent duplicate fetching
        loader={<Spin />}
      >
        <div className="row">
          {articles.map((element) => (
            <div className="col-md-4" key={element.url}>

              <NewsItem
                title={element.title || ""}
                description={element.description || ""}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
              />

            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
};

export default News;
