import api from './api';

export const dashboardService = {
  // Admin Dashboard - Stats
  getAdminStats: async () => {
    const response = await api.get('/dashboard/admin/stats');
    return response.data;
  },

  getAdminNews: async (page = 1, limit = 10) => {
    const response = await api.get(`/dashboard/admin/news?page=${page}&limit=${limit}`);
    return response.data;
  },

  getAdminUsers: async (page = 1, limit = 10) => {
    const response = await api.get(`/dashboard/admin/users?page=${page}&limit=${limit}`);
    return response.data;
  },

  getAdminAuthors: async (page = 1, limit = 10) => {
    const response = await api.get(`/dashboard/admin/authors?page=${page}&limit=${limit}`);
    return response.data;
  },

  getAdminCategories: async (page = 1, limit = 10) => {
    const response = await api.get(`/dashboard/admin/categories?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Author Dashboard
  getAuthorStats: async () => {
    const response = await api.get('/dashboard/author/stats');
    return response.data;
  },

  getAuthorNews: async (page = 1, limit = 10) => {
    const response = await api.get(`/dashboard/author/news?page=${page}&limit=${limit}`);
    return response.data;
  },

  // ========== CRUD OPERATIONS ==========

  // NEWS CRUD
  createNews: async (newsData) => {
    const response = await api.post('/api/news', newsData);
    return response.data;
  },

  getNewsById: async (id) => {
    const response = await api.get(`/api/news/${id}`);
    return response.data;
  },

  updateNews: async (id, newsData) => {
    const response = await api.put(`/api/news/${id}`, newsData);
    return response.data;
  },

  deleteNews: async (id) => {
    const response = await api.delete(`/api/news/${id}`);
    return response.data;
  },

  // USER CRUD
  createUser: async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/api/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/api/users/${id}`);
    return response.data;
  },

  // AUTHOR CRUD
  createAuthor: async (authorData) => {
    const response = await api.post('/api/authors', authorData);
    return response.data;
  },

  getAuthorById: async (id) => {
    const response = await api.get(`/api/authors/${id}`);
    return response.data;
  },

  updateAuthor: async (id, authorData) => {
    const response = await api.put(`/api/authors/${id}`, authorData);
    return response.data;
  },

  deleteAuthor: async (id) => {
    const response = await api.delete(`/api/authors/${id}`);
    return response.data;
  },

  // CATEGORY CRUD
  createCategory: async (categoryData) => {
    const response = await api.post('/api/categories', categoryData);
    return response.data;
  },

  getCategoryById: async (id) => {
    const response = await api.get(`/api/categories/${id}`);
    return response.data;
  },

  updateCategory: async (id, categoryData) => {
    const response = await api.put(`/api/categories/${id}`, categoryData);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await api.delete(`/api/categories/${id}`);
    return response.data;
  },

  // PROFILE CRUD (for authors)
  getAuthorProfile: async () => {
    const response = await api.get('/api/authors/profile');
    return response.data;
  },

  updateAuthorProfile: async (profileData) => {
    const response = await api.put('/api/authors/profile', profileData);
    return response.data;
  },

  // ADDITIONAL UTILITIES
  uploadImage: async (formData) => {
    const response = await api.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // BULK OPERATIONS
  bulkDeleteNews: async (ids) => {
    const response = await api.post('/api/news/bulk-delete', { ids });
    return response.data;
  },

  bulkUpdateNewsStatus: async (ids, status) => {
    const response = await api.post('/api/news/bulk-update-status', { ids, status });
    return response.data;
  }
};