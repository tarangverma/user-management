<template>
    <div>
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl text-blue-500">Dashboard</h1>
        <div class="flex gap-2">
          <button 
            @click="showCreateModal = true"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Invite User
          </button>
          <button 
            @click="handleLogout" 
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <!-- Add search and filter controls -->
      <div class="mb-4 flex gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or email..."
          class="px-4 py-2 border rounded flex-1"
        />
        <select
          v-model="roleFilter"
          class="px-4 py-2 border rounded"
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <table class="table-auto w-full">
        <thead>
          <tr class="border border-black border-2">
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td class="text-center border border-black border-1">{{ user.name }}</td>
            <td class="text-center border border-black border-1">{{ user.email }}</td>
            <td class="text-center border border-black border-1">{{ user.role }}</td>
            <td class="text-center border border-black border-1">
              <button @click="editUser(user)" class="btn-sm mr-[10px] p-[5px] cursor-pointer hover:bg-[red]">Edit</button>
              <button @click="deleteUser(user.id)" class="btn-sm p-[5px] cursor-pointer hover:bg-[red]">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- form for Editing User -->
      <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg w-96">
          <h2 class="text-xl mb-4">Edit User</h2>
          <form @submit.prevent="handleUpdateUser">
            <div class="mb-4">
              <label class="block mb-2">Name</label>
              <input v-model="editingUser.name" type="text" class="w-full border p-2 rounded">
            </div>
            <div class="mb-4">
              <label class="block mb-2">Email</label>
              <input v-model="editingUser.email" type="email" class="w-full border p-2 rounded">
            </div>
            <div class="mb-4">
              <label class="block mb-2">Role</label>
              <select v-model="editingUser.role" class="w-full border p-2 rounded">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div class="flex justify-end gap-2">
              <button type="button" @click="showEditModal = false" 
                class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
              <button type="submit" 
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Create User Modal -->
      <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg w-96">
          <h2 class="text-xl mb-4">Create User</h2>
          <form @submit.prevent="handleCreateUser">
            <div class="mb-4">
              <label class="block mb-2">Name</label>
              <input v-model="newUser.name" type="text" class="w-full border p-2 rounded" required>
            </div>
            <div class="mb-4">
              <label class="block mb-2">Email</label>
              <input v-model="newUser.email" type="email" class="w-full border p-2 rounded" required>
            </div>
            <div class="mb-4">
              <label class="block mb-2">Password</label>
              <input v-model="newUser.password" type="password" class="w-full border p-2 rounded" required>
            </div>
            <div class="mb-4">
              <label class="block mb-2">Role</label>
              <select v-model="newUser.role" class="w-full border p-2 rounded" required>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div class="flex justify-end gap-2">
              <button type="button" @click="showCreateModal = false" 
                class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
              <button type="submit" 
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/user';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  import { onMounted, computed } from 'vue';
  
  export default {
    setup() {
      const userStore = useUserStore();
      const toast = useToast();
      const router = useRouter();
      
      const users = computed(() => userStore.users);
      
      onMounted(async () => {
        try {
          await userStore.initialize();
        } catch (error) {
          console.error('Failed to load users:', error);
          toast.error('Failed to load users');
          router.push('/login');
        }
      });
      
      return { 
        users,
        toast,
        userStore,
        router,
      };
    },

    data() {
      return {
        searchQuery: '',
        roleFilter: '',
        showEditModal: false,
        editingUser: {
          id: null,
          name: '',
          email: '',
          role: '',
        },
        showCreateModal: false,
        newUser: {
          name: '',
          email: '',
          password: '',
          role: 'user',
        },
      };
    },

    computed: {
      filteredUsers() {
        return this.users.filter(user => {
          const matchesSearch = this.searchQuery.toLowerCase() === '' ||
            user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(this.searchQuery.toLowerCase());
          
          const matchesRole = this.roleFilter === '' || user.role === this.roleFilter;
          
          return matchesSearch && matchesRole;
        });
      },
    },

    methods: {
      editUser(user) {
        this.editingUser = { ...user };
        this.showEditModal = true;
      },

      async handleUpdateUser() {
        try {
          await this.userStore.updateUser(this.editingUser);
          await this.userStore.loadUsers();
          this.toast.success('User updated successfully');
          this.showEditModal = false;
        } catch (error) {
          console.log(error);
          this.toast.error('Failed to update user');
        }
      },

      async deleteUser(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
          try {
            await this.userStore.deleteUser(userId);
            await this.userStore.loadUsers();
            this.toast.success('User deleted successfully');
          } catch (error) {
            this.toast.error('Failed to delete user');
          }
        }
      },

      async handleLogout() {
        try {
          await this.userStore.logout();
          this.toast.success('Logged out successfully');
          this.router.push('/login');
        } catch (error) {
          this.toast.error('Failed to logout');
        }
      },

      async handleCreateUser() {
        try {
          await this.userStore.createUser(this.newUser);
          await this.userStore.loadUsers();
          this.toast.success('User created successfully');
          this.showCreateModal = false;
          // Reset form
          this.newUser = {
            name: '',
            email: '',
            password: '',
            role: 'user',
          };
        } catch (error) {
          console.error(error);
          this.toast.error('Failed to create user');
        }
      },
    },
  };
  </script>
  