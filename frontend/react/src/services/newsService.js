import { FaAws } from 'react-icons/fa';
import api from './api';
import { toastService } from './toastService';

export const newsService = {
  // Lấy tất cả tin tức
  getAllNews: async () => {
    try {
      const response = await api.get('/news');
      return response.data;
    } catch (err) {
      toastService.error('Không thể tải danh sách tin tức');
      throw err;
    }
  },

  // Lấy tin tức theo ID
  getNewsById: async (id) => {
    try {
      const response = await api.get(`/news/${id}`);
      return response.data;
    } catch (err) {
      toastService.error('Không thể tải chi tiết tin tức');
      throw err;
    }
  },

  // Lấy tin tức theo danh mục
  getNewsByCategory: async (categoryId) => {
    try {
      const response = await api.get(`/news/category/${categoryId}`);
      return response.data;
    } catch (err) {
      console.error('Error getting news by category:', err);
      toastService.error('Không thể tải tin tức theo danh mục');
      throw err;
    }
  },

  // Lấy tin tức nổi bật
  getHotNews: async () => {
    try {
      const response = await api.get('/news/hot');
      return response.data;
    } catch (err) {
      toastService.error('Không thể tải tin nổi bật');
      throw err;
    }
  },

  getRelatedNews: async (categoryId, currentNewsId, limit = 3) => {
    try {
      const response = await api.get(`/news/category/${categoryId}`);
      const relatedNews = response.data.data || response.data;
      // Filter out current news and limit results
      return relatedNews
        .filter(news => news.id != currentNewsId)
        .slice(0, limit);
    } catch (err) {
      console.error('Error getting related news:', err);
      return [];
    }
  },

  // Tạo tin tức mới (admin)
  createNews: async (newsData) => {
    try {
      const response = await api.post('/news', newsData);
      toastService.success('Tạo tin tức thành công!');
      return response.data;
    } catch (err) {
      toastService.error('Không thể tạo tin tức');
      throw err;
    }
  },

  // Cập nhật tin tức
  updateNews: async (id, newsData) => {
    try {
      const response = await api.put(`/news/${id}`, newsData);
      toastService.success('Cập nhật tin tức thành công!');
      return response.data;
    } catch (err) {
      toastService.error('Không thể cập nhật tin tức');
      throw err;
    }
  },

  // Xóa tin tức
  deleteNews: async (id) => {
    try {
      const response = await api.delete(`/news/${id}`);
      toastService.success('Xóa tin tức thành công!');
      return response.data;
    } catch (err) {
      toastService.error('Không thể xóa tin tức');
      throw err;
    }
  }

};
