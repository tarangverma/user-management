<template>
    <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-2xl mb-4">Login</h1>
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <input type="email" v-model="email" placeholder="Email" class="input" required />
        <input type="password" v-model="password" placeholder="Password" class="input" required />
        <button type="submit" class="btn">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/user';
  import { useToast } from 'vue-toastification';
  import { useRouter } from 'vue-router';
  
  export default {
    data() {
      return { email: '', password: '' };
    },
    setup() {
      const userStore = useUserStore();
      const toast = useToast();
      const router = useRouter();
      
      return { userStore, toast, router };
    },
    methods: {
      async handleLogin() {
        try {
          await this.userStore.login(this.email, this.password);
          this.toast.success('Welcome back!');
          this.router.push('/dashboard');
        } catch (err) {
          this.toast.error('Login failed: ' + err.message);
        }
      },
    },
  };
  </script>
  