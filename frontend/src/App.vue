<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav class="bg-blue-600 p-4 text-white">
      <router-link to="/" class="text-white mr-4">Home</router-link>
      <router-link to="/login" class="text-white mr-4">Login</router-link>
      <router-link to="/signup" class="text-white mr-4">Sign Up</router-link>
      <router-link to="/dashboard" class="text-white">Dashboard</router-link>
    </nav>

    <!-- Main content (will be replaced by the matched route's component) -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Add your styles here */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f7f7f7;
}
</style>
