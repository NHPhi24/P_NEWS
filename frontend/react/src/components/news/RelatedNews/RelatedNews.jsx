import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaEye, FaFolder } from 'react-icons/fa';
import './RelatedNews.scss';

const RelatedNews = ({ news, currentNewsId, categoryName }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const relatedNews = news.filter(item => item.id !== currentNewsId).slice(0, 5);

  if (relatedNews.length === 0) {
    return null;
  }

  return (
    <div className="related-news">
      <div className="related-news__header">
        <h3 className="related-news__title">Tin Liên Quan</h3>
        {categoryName && (
          <div className="related-news__category">
            <FaFolder />
            <span>{categoryName}</span>
          </div>
        )}
      </div>
      
      <div className="related-news__list">
        {relatedNews.map((newsItem, index) => (
          <React.Fragment key={newsItem.id}>
            <article className="related-news__item">
              {newsItem.image_url && (
                <div className="related-news__image">
                  <img
                    src={newsItem.image_url}
                    alt={newsItem.title}
                    className="related-news__image-img"
                    loading="lazy"
                  />
                </div>
              )}
              
              <div className="related-news__content">
                <h4 className="related-news__item-title">
                  <Link to={`/news/${newsItem.id}`}>
                    {newsItem.title}
                  </Link>
                </h4>

                <p className="related-news__excerpt">
                  {truncateText(newsItem.content, 80)}
                </p>
                
                <div className="related-news__meta">
                  <span className="related-news__date">
                    <FaClock />
                    {formatDate(newsItem.created_at)}
                  </span>
                  <span className="related-news__views">
                    <FaEye />
                    {newsItem.views || 0}
                  </span>
                </div>
              </div>
            </article>
            
            {index < relatedNews.length - 1 && (
              <div className="related-news__divider"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RelatedNews;