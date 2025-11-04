import api from './api';
import { toastService } from './toastService';

export const dashboardService = {
  // ========== ADMIN DASHBOARD ==========
  
  // Admin Dashboard - Stats
  getAdminStats: async () => {
    const response = await api.get('/dashboard/admin/stats');
    return response.data;
  },

  getAdminNews: async (page = 1, limit = 100) => {
    const response = await api.get(`/dashboard/admin/news?page=${page}&limit=${limit}`);
    return response.data;
  },

  getAdminUsers: async (page = 1, limit = 100) => {
    const response = await api.get(`/dashboard/admin/users?page=${page}&limit=${limit}`);
    return response.data;
  },

  getAdminAuthors: async (page = 1, limit = 100) => {
    const response = await api.get(`/dashboard/admin/authors?page=${page}&limit=${limit}`);
    return response.data;
  },

  getAdminCategories: async () => {
    const response = await api.get('/dashboard/admin/categories');
    return response.data;
  },

  // ========== AUTHOR DASHBOARD ==========
  
  getAuthorStats: async () => {
    const response = await api.get('/dashboard/author/stats');
    return response.data;
  },

  getAuthorNews: async (page = 1, limit = 10) => {
    const response = await api.get(`/dashboard/author/news?page=${page}&limit=${limit}`);
    return response.data;
  },

  // ========== ADMIN CRUD OPERATIONS ==========

  // NEWS CRUD - Admin
  createNews: async (newsData) => {
    try {
      const response = await api.post('/dashboard/admin/news', newsData);
      toastService.success('Tạo tin tức mới thành công!');
      return response.data;
    } catch (err) {
      toastService.error('Không thể tạo tin tức');
      console.log("Error craeteNews function in dashboard", err)
      throw err;
    }
    
  },

  updateNews: async (id, newsData) => {
    try {
      const response = await api.put(`/dashboard/admin/news/${id}`, newsData);
      toastService.success('Cập nhật tin tức thông công!');
      return response.data;
    } catch (err) {
      toastService.error('Không thể cập nhật tin tức');
      console.log("Error updateNews function in dashboard", err)
      throw err;
    }
  },

  deleteNews: async (id) => {
    try {
      const response = await api.delete(`/dashboard/admin/news/${id}`);
      toastService.success('Xóa tin tức thành công!');
      return response.data;
    } catch (err) {
      toastService.error('Không thể xóa tin tức');
      console.log("Error deleteNews function in dashboard",err)
      throw err;
    }
    
  },

  // USER CRUD - Admin
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/dashboard/admin/users/${id}`, userData);
      toastService.success('Cập nhật người dùng thành công!');
      return response.data;
    } catch (err) {
      console.log("Error updateUser function in dashboard", err)
      toastService.error('Không thể cập nhật người dụng');
      throw err;
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/dashboard/admin/users/${id}`);
      toastService.success('Xóa người dùng thành công!');
      return response.data; 
    } catch (err) {
      toastService.error('Không thể xóa người dùng');
      console.log("Error deleteUser function in dashboard",err)
      throw err;
    }
  },

  // AUTHOR CRUD - Admin
  createAuthor: async (authorData) => {
    try {
      const response = await api.post('/dashboard/admin/authors', authorData);
      toastService.success('Tạo tác giả mới thành công!');
      return response.data;
    } catch (err) {
      toastService.error('Không thể tạo tác giả');
      console.log("Error createAuthor function in dashboard", err)
      throw err;
    }
  },

  updateAuthor: async (id, authorData) => {
    try {
      const response = await api.put(`/dashboard/admin/authors/${id}`, authorData);
      toastService.success('Cập nhật tác giả thành công!');
      return response.data;
    } catch (err) {
      toastService.error('Không thể cập nhật tác giả');
      console.log("Error updateAuthor function in dashboard", err)
      throw err;
    }
    
  },

  deleteAuthor: async (id) => {
    try {
      const response = await api.delete(`/dashboard/admin/authors/${id}`);
      toastService.success('Xóa tác giả thành công!');
      return response.data;
    } catch (err) {
      toastService.error('Không thể xóa tác giả');
      console.log("Error deleteAuthor function in dashboard", err)
      throw err;
    }
  },

  // CATEGORY CRUD - Admin
  createCategory: async (categoryData) => {
    try {
      const response = await api.post('/dashboard/admin/categories', categoryData);
      toastService.success('Tạo danh mục mới thành công!');
      return response.data;
    } catch (err) {
      toastService.error('Không thể tạo danh mục');
      console.log("Error createCategory function in dashboard", err)
      throw err;
    }
  },

  updateCategory: async (id, categoryData) => {
    try {
      const response = await api.put(`/dashboard/admin/categories/${id}`, categoryData);
      toastService.success('Cập nhật danh mục thành công!');
      return response.data;
    } catch (err) {
      toastService.error('Không thể cập nhật danh mục');
      console.log("Error updateCategory function in dashboard", err)
      throw err;
    }
  },

  deleteCategory: async (id) => {
    try {
      const response = await api.delete(`/dashboard/admin/categories/${id}`);
      toastService.success('Xóa danh mục thông công!');
      return response.data;
      
    } catch (err) {
      toastService.error('Không thể xóa danh mục');
      console.log("Error deleteCategory function in dashboard", err)
      throw err;
    }
  },

  // ========== AUTHOR DASHBOARD CRUD ==========
  
  // Author news management (chỉ cho author)
  createAuthorNews: async (newsData) => {
    try {
      const response = await api.post('/dashboard/author/news', newsData);
      toastService.success('Tạo tin tức mới thành công!');
      return response.data;
      
    } catch (err) {
      toastService.error('Không thể tạo tin tức');
      console.log("Error createAuthorNews function in dashboard", err)
      throw err;
    }
  },

  updateAuthorNews: async (id, newsData) => {
    try {
      const response = await api.put(`/dashboard/author/news/${id}`, newsData);
      toastService.success('Cập nhật tin tức thành công!');
      return response.data;
      
    } catch (err) {
      toastService.error('Không thể cập nhật tin tức');
      console.log("Error updateAuthorNews function in dashboard", err)
      throw err;
      
    }
  },

  deleteAuthorNews: async (id) => {
    try {
      const response = await api.delete(`/dashboard/author/news/${id}`);
      toastService.success('Xóa tin tức thành công!');
      return response.data;
      
    } catch (err) {
      toastService.error('Không thể xóa tin tức');
      console.log("Error deleteAuthorNews function in dashboard", err)
      throw err;
    }
  },
};

export default dashboardService;