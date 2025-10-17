import api from './api';
import { toastService } from './toastService';

export const categoryService = {
  // Lấy tất cả danh mục
  getAllCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (err) {
      toastService.error("Không thể tải danh sách danh mục")
      throw err;
    }
  },

  // Lấy danh mục theo ID
  getCategoryById: async (id) => {
    try {
      const response = await api.get(`/categories/${id}`);
      return response.data;
    } catch (err) {
      toastService.error("Không thể tải chi tiết danh mục")
      throw err;
    }
  },

  // Tạo danh mục mới (admin)
  createCategory: async(categoryData) =>{  
    try {
      const reposne = await api.post('/categories', categoryData);
      toastService.success("Tạo danh mục thành cong!");
      return reposne.data;
    } catch (error) {
      toastService.error("Không thể tạo danh mục");
      throw error;
    }
  },

  // Cập nhật danh mục (admin)
  updateCategory: async (id, categoryData) => {
    try {
      const response = await api.put(`/categories/${id}`, categoryData);
      toastService.success("Cập nhật danh mục thành công!");
      return response.data;
    } catch (err) {
      toastService.error("Không thể cập nhật danh mục");
      throw err;
    }
  },

  // Xóa danh mục (admin)
  deleteCategory: async (id) => {
    try {
      const response = await api.delete(`/categories/${id}`);
      toastService.success("Xóa danh mục thành công!");
      return response.data;
    } catch (err) {
      toastService.error("Không thể xóa danh mục");
      throw err;
    }
  },

};