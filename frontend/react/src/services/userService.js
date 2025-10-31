import api from "./api";
import { toastService } from "./toastService";

export const userService = {
    getAllUsers: async () => {
        try {
            const response = await api.get(`/users`)
            return response.data
        } catch (err) {
            toastService.error('Không thể tải danh sách người dụng');
            throw err;
        }
    },
    getUserById: async (id) => {
        try {
            const response = await api.get(`/users/${id}`)
            return response.data
        } catch (err) {
            toastService.error('Không thể tải người dụng');
            throw err;
        }
    },
    updateUserInfo: async(userId, userInfo) => { 
        try {
            const response = await api.put(`/users/${userId}`, userInfo)
            return response.data
        } catch (err) {
            toastService.error('Không thể cập nhật người dụng');
            throw err;
        }
    }
};