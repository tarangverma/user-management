import { defineStore } from 'pinia';
import { loginUser, fetchUsers, updateUser, deleteUser, createUser } from '@/services/userService';

export const useUserStore = defineStore('user', {
    state: () => ({
      users: [],
      token: localStorage.getItem('token') || '',
    }),
    getters: {
      isAuthenticated: (state) => !!state.token,
    },
  actions: {
    async login(email, password) {
      const response = await loginUser(email, password);
      this.token = response.token;
      localStorage.setItem('token', response.token);
    },
    async loadUsers() {
      try {
        const response = await fetchUsers(this.token);
        this.users = [...response];
        return response;
      } catch (error) {
        console.error('Load users error:', error);
        throw error;
      }
    },
    logout() {
      this.token = '';
      localStorage.removeItem('token');
    },
    async updateUser(userData) {
      const updatedUser = await updateUser(userData.id, userData, this.token);
      const index = this.users.findIndex(user => user.id === userData.id);
      if (index !== -1) {
        this.users[index] = updatedUser;
      }
      return updatedUser;
    },
    async deleteUser(userId) {
      await deleteUser(userId, this.token);
      this.users = this.users.filter(user => user.id !== userId);
    },
    async createUser(userData) {
      const newUser = await createUser(userData, this.token);
      this.users.push(newUser);
      return newUser;
    },
    async initialize() {
      if (this.token) {
        await this.loadUsers();
      }
    },
  },
});
