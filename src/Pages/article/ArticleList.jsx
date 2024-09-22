import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // Import icons
import './ArticleList.scss';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3333/api/articles');
        console.log("RESPONSE: ", response.data);
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);



  return (
    <div className="article-page-container">
      <div className="article-list-container">
        <h1>Popular Articles</h1>
        <div className="article-list">
          {articles.length > 0 && (
            <>
              <div className="featured-article">
                {articles[0].image ? (
                  <img
                    src={`http://localhost:3333/uploads/${articles[0].image}`}
                    alt={articles[0].title}
                    className="featured-image"
                  />
                ) : (
                  <div className="no-image">No Image Available</div>
                )}
                <h2>{articles[0].title}</h2>
                <p>{articles[0].content}</p>
                <span>{new Date(articles[0].date_pub).toLocaleDateString()}</span>
              </div>
              <div className="article-sidebar-list">
                {articles.slice(1).map(article => (
                  <div key={article.id_article} className="sidebar-article">
                    {article.image ? (
                      <img
                        src={`http://localhost:3333/uploads/${article.image}`}
                        alt={article.title}
                        className="sidebar-image"
                      />
                    ) : (
                      <div className="no-image">No Image Available</div>
                    )}
                    <span>{new Date(article.date_pub).toLocaleDateString()}</span>
                    <Link to={`/articles/${article.id_article}`} className="article-title">
                      {article.title}
                    </Link>
                    
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
