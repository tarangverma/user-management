<template>
    <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-2xl mb-4">Sign Up</h1>
      <form @submit.prevent="handleSignUp" class="flex flex-col gap-4 w-80">
        <input
          type="text"
          v-model="name"
          placeholder="Name"
          class="input"
          required
        />
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          class="input"
          required
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="input"
          required
        />
        <button type="submit" class="btn">Sign Up</button>
      </form>
      <p class="mt-4">
        Already have an account? <router-link to="/login" class="text-blue-500">Login</router-link>
      </p>
    </div>
  </template>
  
  <script>
  import { signUpUser } from "@/services/userService";
  import { useToast } from 'vue-toastification';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const toast = useToast();
      const router = useRouter();
      
      return { toast, router };
    },
    data() {
      return {
        name: "",
        email: "",
        password: "",
      };
    },
    methods: {
      async handleSignUp() {
        try {
          await signUpUser(this.name, this.email, this.password);
          this.toast.success('Account created successfully! Please login.');
          this.router.push("/login");
        } catch (error) {
          this.toast.error(error.response?.data?.message || 'Failed to create account');
        }
      },
    },
  };
  </script>
  
 
  