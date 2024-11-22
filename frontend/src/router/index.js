import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/signup',
    component: () => import('@/pages/UserSignup.vue')
  },
  {
    path: '/dashboard',
    component: () => import('@/pages/UserDashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: () => import('@/pages/UserLogin.vue')
  },
  // ... other routes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Fix the navigation guard
router.beforeEach(async (to) => {
  const userStore = useUserStore();
  
  // If route requires auth
  if (to.meta.requiresAuth) {
    if (!userStore.isAuthenticated) {
      // Return the path to redirect to
      return { path: '/login' };
    }
    
    try {
      // Try to initialize if we haven't already
      if (userStore.users.length === 0) {
        await userStore.initialize();
      }
      // Allow navigation to proceed
      return true;
    } catch (error) {
      // Return the path to redirect to
      return { path: '/login' };
    }
  }
  
  // Allow navigation to proceed
  return true;
});

export default router;
