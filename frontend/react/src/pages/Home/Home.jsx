import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { newsService } from '../../services/newsService';
import { categoryService } from '../../services/categoryService';
import NewsCard from '../../components/news/NewsCard/NewsCard';
import Loading from '../../components/ui/Loading/Loading';
import SearchBox from '../../components/ui/SearchBox/SearchBox';
import { FaFire, FaFilter, FaNewspaper, FaChartBar, FaEye, FaSearch } from 'react-icons/fa';
import './Home.scss';

const Home = () => {
  const [allNews, setAllNews] = useState([]); // toàn bộ tin tức
  const [filteredNews, setFilteredNews] = useState([]); // tin đã lọc
  const [displayedNews, setDisplayedNews] = useState([]); // tin đang hiển thị
  const [hotNews, setHotNews] = useState([]);
  const [topViewedNews, setTopViewedNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // search
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // infinite scroll
  const [loadingMore, setLoadingMore] = useState(false);
  const isLoadingRef = useRef(false);

  const itemsPerPage = 12;

  // Load dữ liệu ban đầu
  useEffect(() => {
    loadHomeData();
  }, []);

  // Mỗi khi allNews / category / searchTerm thay đổi → cập nhật danh sách hiển thị
  useEffect(() => {
    updateDisplayedNews();
  }, [allNews, selectedCategory, searchTerm, isSearching]);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [newsResponse, hotNewsResponse, categoriesResponse] = await Promise.all([
        newsService.getAllNews(),
        newsService.getHotNews(),
        categoryService.getAllCategories()
      ]);

      const allNewsData = newsResponse.data || [];
      setAllNews(allNewsData);
      setHotNews(hotNewsResponse.data || []);
      setCategories(categoriesResponse.data || []);
      
      const topViewed = allNewsData
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5);
      setTopViewedNews(topViewed);
    } catch (err) {
      setError('Không thể tải dữ liệu tin tức');
      console.error('Error loading home data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật danh sách tin đã lọc và hiển thị
  const updateDisplayedNews = () => {
    let filtered = allNews;

    // Lọc theo từ khóa
    if (isSearching && searchTerm) {
      filtered = filtered.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo danh mục
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category_id == selectedCategory);
    }

    setFilteredNews(filtered);
    setDisplayedNews(filtered.slice(0, itemsPerPage));
  };

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isLoadingRef.current || isSearching || loadingMore || loading) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 100) {
        loadMoreNews();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredNews, displayedNews, isSearching, loadingMore, loading]);

  const loadMoreNews = () => {
    if (isLoadingRef.current || isSearching) return;
    if (displayedNews.length >= filteredNews.length) return;

    isLoadingRef.current = true;
    setLoadingMore(true);

    setTimeout(() => {
      const nextNews = filteredNews.slice(
        displayedNews.length,
        displayedNews.length + itemsPerPage
      );
      setDisplayedNews(prev => [...prev, ...nextNews]);
      setLoadingMore(false);
      isLoadingRef.current = false;
    }, 800);
  };

  // Xử lý tìm kiếm
  const handleSearch = (term) => {
    setSearchTerm(term);
    const searching = !!term.trim(); // !!: chuyển sang kiểu boolean, loại bỏ khoản trắng
    setIsSearching(searching);
  };

  // Chuyển danh mục
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setActiveFilter(categoryId);
    setSearchTerm('');
    setIsSearching(false);
  };

  // Hiển thị tất cả
  const handleShowAll = () => {
    setSelectedCategory('all');
    setActiveFilter('all');
    setSearchTerm('');
    setIsSearching(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length <= maxLength ? text : text.substr(0, maxLength) + '...';
  };

  const hasMore = displayedNews.length < filteredNews.length && !isSearching;

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
            {/* Tin nổi bật */}
            {hotNews.length > 0 && !isSearching && (
              <section className="hot-news-section">
                <div className="section-header">
                  <h2 className="section-title">
                    <FaFire className="section-title__icon" /> Tin Nổi Bật
                  </h2>
                  <div className="section-divider"></div>
                </div>
                <div className="hot-news-grid">
                  {hotNews.map((item) => (
                    <NewsCard key={item.id} news={item} />
                  ))}
                </div>
              </section>
            )}

            {/* Tất cả tin */}
            <section className="all-news-section">
              <div className="section-header">
                <h2 className="section-title">
                  <FaNewspaper className="section-title__icon" />
                  {isSearching ? 'Kết Quả Tìm Kiếm' : 'Tất Cả Tin Tức'}
                </h2>
                <div className="section-divider"></div>
              </div>

              {/* Lọc danh mục */}
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
                      <span className="filter-count">({allNews.length})</span>
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        className={`filter-btn ${activeFilter == category.id ? 'filter-btn--active' : ''}`}
                        onClick={() => handleCategoryChange(category.id)}
                      >
                        {category.name}
                        <span className="filter-count">
                          ({allNews.filter(item => item.category_id == category.id).length})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Kết quả tìm kiếm */}
              {isSearching && (
                <div className="search-info">
                  <div className="search-info__content">
                    <FaSearch className="search-info__icon" />
                    <span>
                      Tìm thấy <strong>{filteredNews.length}</strong> kết quả cho từ khóa: 
                      <strong> "{searchTerm}"</strong>
                    </span>
                    <button onClick={handleShowAll} className="btn btn--outline btn--small">
                      Hiển thị tất cả
                    </button>
                  </div>
                </div>
              )}

              {/* News grid */}
              <div className="news-section">
                <div className="news-section__header">
                  <h3 className="news-section__title">
                    {isSearching
                      ? 'Kết quả tìm kiếm'
                      : selectedCategory === 'all'
                        ? 'Tất cả tin tức'
                        : `Tin tức ${categories.find(cat => cat.id == selectedCategory)?.name}`}
                    <span className="news-count">
                      ({filteredNews.length} tin{hasMore && ' - Cuộn để xem thêm'})
                    </span>
                  </h3>
                </div>

                {displayedNews.length === 0 ? (
                  <div className="no-news">
                    <div className="no-news__content">
                      <FaNewspaper className="no-news__icon" />
                      <h4>{isSearching ? 'Không tìm thấy kết quả' : 'Không có tin tức'}</h4>
                      <p>
                        {isSearching
                          ? `Không tìm thấy tin tức nào phù hợp với từ khóa "${searchTerm}"`
                          : 'Không có tin tức nào trong danh mục này.'}
                      </p>
                      {(isSearching || selectedCategory !== 'all') && (
                        <button onClick={handleShowAll} className="btn btn--primary">
                          Xem tất cả tin tức
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="news-grid">
                      {displayedNews.map((newsItem) => (
                        <NewsCard key={newsItem.id} news={newsItem} />
                      ))}
                    </div>

                    {loadingMore && (
                      <div className="loading-more">
                        <Loading size="medium" text="Đang tải thêm tin tức..." />
                      </div>
                    )}

                    {!hasMore && displayedNews.length > 0 && (
                      <div className="no-more-news">
                        <p>Đã hiển thị tất cả tin tức</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="home__sidebar">
            <div className="sidebar-widget">
              <div className="sidebar-widget__header">
                <h3 className="sidebar-widget__title">
                  <FaChartBar /> Tin Xem Nhiều Nhất
                </h3>
              </div>
              <div className="sidebar-widget__content">
                {topViewedNews.length === 0 ? (
                  <p>Chưa có dữ liệu</p>
                ) : (
                  topViewedNews.map((newsItem, index) => (
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
                            <FaEye /> {newsItem.views || 0} lượt xem
                          </span>
                          <span className="top-viewed-item__date">
                            {formatDate(newsItem.created_at)}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>

            {/* About */}
            <div className="sidebar-widget">
              <div className="sidebar-widget__header">
                <h3 className="sidebar-widget__title">
                  <FaNewspaper /> Về P_NEWS
                </h3>
              </div>
              <div className="sidebar-widget__content">
                <p>
                  P_NEWS là trang tin tức hàng đầu, cung cấp những thông tin mới nhất và đáng tin cậy nhất.
                </p>
                <div className="about-stats">
                  <div className="about-stat">
                    <strong>{allNews.length}</strong>
                    <span>Tin tức</span>
                  </div>
                  <div className="about-stat">
                    <strong>{categories.length}</strong>
                    <span>Danh mục</span>
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
