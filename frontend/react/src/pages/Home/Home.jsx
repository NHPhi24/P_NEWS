import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsService } from '../../services/newsService';
import { categoryService } from '../../services/categoryService';
import NewsCard from '../../components/news/NewsCard/NewsCard';
import Loading from '../../components/ui/Loading/Loading';
import Pagination from '../../components/ui/Pagination/Pagination';
import SearchBox from '../../components/ui/SearchBox/SearchBox';
import { FaFire, FaFilter, FaNewspaper, FaChartBar, FaEye, FaSearch } from 'react-icons/fa';
import './Home.scss';

const Home = () => {
  const [news, setNews] = useState([]);
  const [hotNews, setHotNews] = useState([]);
  const [topViewedNews, setTopViewedNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // State phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [totalItems, setTotalItems] = useState(0);

  // State search
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadHomeData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [newsResponse, hotNewsResponse, categoriesResponse] = await Promise.all([
        newsService.getAllNews(),
        newsService.getHotNews(),
        categoryService.getAllCategories()
      ]);

      const allNews = newsResponse.data || [];
      setNews(allNews);
      setTotalItems(allNews.length);
      setHotNews(hotNewsResponse.data || []);
      setCategories(categoriesResponse.data || []);
      
      // Get top 5 most viewed news
      const topViewed = allNews
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5);
      setTopViewedNews(topViewed);
      
    } catch (err) {
      const errorMessage = 'Không thể tải dữ liệu tin tức';
      setError(errorMessage);
      console.error('Error loading home data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Hàm tìm kiếm
  const handleSearch = (term) => {
    setSearchTerm(term);
    setIsSearching(!!term.trim());
    
    if (term.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const filtered = news.filter(item => 
      item.title.toLowerCase().includes(term.toLowerCase()) ||
      item.content.toLowerCase().includes(term.toLowerCase()) ||
      (item.author_name && item.author_name.toLowerCase().includes(term.toLowerCase()))
    );
    
    setSearchResults(filtered);
  };

  // Lọc tin tức theo category và search
  const filteredNews = () => {
    if (isSearching && searchTerm) {
      return searchResults;
    }
    
    return selectedCategory === 'all' 
      ? news 
      : news.filter(item => item.category_id == selectedCategory);
  };

  // Tính toán tin tức cho trang hiện tại
  const getCurrentNews = () => {
    const allFilteredNews = filteredNews();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allFilteredNews.slice(startIndex, endIndex);
  };

  // Cập nhật tổng số items
  useEffect(() => {
    const allFilteredNews = filteredNews();
    setTotalItems(allFilteredNews.length);
    
    const totalPages = Math.ceil(allFilteredNews.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [selectedCategory, searchTerm, news]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setActiveFilter(categoryId);
    setSearchTerm('');
    setIsSearching(false);
  };

  const handleShowAll = () => {
    setSelectedCategory('all');
    setActiveFilter('all');
    setSearchTerm('');
    setIsSearching(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="home-loading">
        <Loading size="large" text="Đang tải tin tức..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-error">
        <div className="container">
          <div className="home-error__content">
            <h2>Đã có lỗi xảy ra</h2>
            <p>{error}</p>
            <button onClick={loadHomeData} className="btn btn--primary">
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentNews = getCurrentNews();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const allFilteredNews = filteredNews();

  return (
    <div className="home">
      <div className="container">
        {/* Hero Section */}
        <section className="home__hero">
          <div className="home__hero-content">
            <h1 className="home__title">
              Chào mừng đến với <span className="home__title-highlight">P_NEWS</span>
            </h1>
            <p className="home__subtitle">
              Khám phá những tin tức mới nhất và nóng hổi nhất trong ngày
            </p>
            
            {/* Search Box */}
            <div className="home__search">
              <SearchBox
                placeholder="Tìm kiếm tin tức, tác giả..."
                onSearch={handleSearch}
                delay={500}
              />
            </div>
          </div>
        </section>

        <div className="home__content">
          <div className="home__main">
            {/* Hot News Section */}
            {hotNews.length > 0 && !isSearching && (
              <section className="hot-news-section">
                <div className="section-header">
                  <h2 className="section-title">
                    <FaFire className="section-title__icon" />
                    Tin Nổi Bật
                  </h2>
                  <div className="section-divider"></div>
                </div>
                <div className="hot-news-grid">
                  {hotNews.map((newsItem) => (
                    <NewsCard key={newsItem.id} news={newsItem} />
                  ))}
                </div>
              </section>
            )}

            {/* Categories Filter & All News */}
            <section className="all-news-section">
              <div className="section-header">
                <h2 className="section-title">
                  <FaNewspaper className="section-title__icon" />
                  {isSearching ? 'Kết Quả Tìm Kiếm' : 'Tất Cả Tin Tức'}
                </h2>
                <div className="section-divider"></div>
              </div>

              {/* Categories Filter - Ẩn khi đang tìm kiếm */}
              {!isSearching && (
                <div className="categories-filter">
                  <div className="categories-filter__header">
                    <FaFilter className="categories-filter__icon" />
                    <span>Lọc theo danh mục:</span>
                  </div>
                  <div className="categories-filter__list">
                    <button
                      className={`filter-btn ${activeFilter === 'all' ? 'filter-btn--active' : ''}`}
                      onClick={handleShowAll}
                    >
                      Tất cả
                      <span className="filter-count">({news.length})</span>
                    </button>
                    
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        className={`filter-btn ${activeFilter == category.id ? 'filter-btn--active' : ''}`}
                        onClick={() => handleCategoryChange(category.id)}
                      >
                        {category.name}
                        <span className="filter-count">
                          ({news.filter(item => item.category_id == category.id).length})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Info */}
              {isSearching && (
                <div className="search-info">
                  <div className="search-info__content">
                    <FaSearch className="search-info__icon" />
                    <span>
                      Tìm thấy <strong>{allFilteredNews.length}</strong> kết quả cho từ khóa: 
                      <strong> "{searchTerm}"</strong>
                    </span>
                    <button 
                      onClick={handleShowAll}
                      className="btn btn--outline btn--small"
                    >
                      Hiển thị tất cả
                    </button>
                  </div>
                </div>
              )}

              {/* News Grid với phân trang */}
              <div className="news-section">
                <div className="news-section__header">
                  <h3 className="news-section__title">
                    {isSearching 
                      ? `Kết quả tìm kiếm` 
                      : selectedCategory === 'all' 
                        ? 'Tất cả tin tức' 
                        : `Tin tức ${categories.find(cat => cat.id == selectedCategory)?.name}`
                    }
                    <span className="news-count">
                      ({totalItems} tin{totalPages > 1 && ` - Trang ${currentPage}/${totalPages}`})
                    </span>
                  </h3>
                </div>
                
                {currentNews.length === 0 ? (
                  <div className="no-news">
                    <div className="no-news__content">
                      <FaNewspaper className="no-news__icon" />
                      <h4>
                        {isSearching ? 'Không tìm thấy kết quả' : 'Không có tin tức'}
                      </h4>
                      <p>
                        {isSearching 
                          ? `Không tìm thấy tin tức nào phù hợp với từ khóa "${searchTerm}"`
                          : 'Không tìm thấy tin tức nào trong danh mục này.'
                        }
                      </p>
                      {isSearching ? (
                        <button 
                          onClick={handleShowAll}
                          className="btn btn--primary"
                        >
                          Xem tất cả tin tức
                        </button>
                      ) : selectedCategory !== 'all' && (
                        <button 
                          onClick={handleShowAll}
                          className="btn btn--primary"
                        >
                          Xem tất cả tin tức
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="news-grid">
                      {currentNews.map((newsItem) => (
                        <NewsCard key={newsItem.id} news={newsItem} />
                      ))}
                    </div>

                    {/* Phân trang */}
                    {totalPages > 1 && (
                      <div className="news-pagination">
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                          showPageNumbers={true}
                          showNavigation={true}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar với Top Viewed News */}
          <aside className="home__sidebar">
            <div className="sidebar-widget">
              <div className="sidebar-widget__header">
                <h3 className="sidebar-widget__title">
                  <FaChartBar />
                  Tin Xem Nhiều Nhất
                </h3>
              </div>
              <div className="sidebar-widget__content">
                {topViewedNews.length === 0 ? (
                  <div className="empty-sidebar">
                    <p>Chưa có dữ liệu</p>
                  </div>
                ) : (
                  <div className="top-viewed-list">
                    {topViewedNews.map((newsItem, index) => (
                      <article key={newsItem.id} className="top-viewed-item">
                        <div className="top-viewed-item__rank">{index + 1}</div>
                        <div className="top-viewed-item__content">
                          <h4 className="top-viewed-item__title">
                            <Link to={`/news/${newsItem.id}`}>
                              {truncateText(newsItem.title, 60)}
                            </Link>
                          </h4>
                          <div className="top-viewed-item__meta">
                            <span className="top-viewed-item__views">
                              <FaEye />
                              {newsItem.views || 0} lượt xem
                            </span>
                            <span className="top-viewed-item__date">
                              {formatDate(newsItem.created_at)}
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* About Widget */}
            <div className="sidebar-widget">
              <div className="sidebar-widget__header">
                <h3 className="sidebar-widget__title">
                  <FaNewspaper />
                  Về P_NEWS
                </h3>
              </div>
              <div className="sidebar-widget__content">
                <div className="about-widget">
                  <p>P_NEWS là trang tin tức hàng đầu, cung cấp những thông tin mới nhất và đáng tin cậy nhất.</p>
                  <div className="about-stats">
                    <div className="about-stat">
                      <strong>{news.length}</strong>
                      <span>Tin tức</span>
                    </div>
                    <div className="about-stat">
                      <strong>{categories.length}</strong>
                      <span>Danh mục</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Home;