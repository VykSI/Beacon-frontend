// Import necessary modules from vue-router
import { createRouter, createWebHistory } from 'vue-router';
import eventPage from './components/eventPage/eventPage.vue'
import registerPage from './components/registerPage/registerPage.vue';
import adminloginPage from'./components/adminlogin/adminloginPage.vue';
import dashboardPage from './components/dashboard/dashboardPage.vue';
import createPage from './components/createevent/createeventPage.vue';
// Import your Vue components for routing
import LoginForm from './components/loginPage/LoginForm.vue';

// Create a new router instance with routes
const router = createRouter({
  history: createWebHistory(),
  routes: [
   
    {
      path: '/login',
      component: LoginForm // Use imported LoginForm component
    },
    // You can define more routes here if needed
    {
      path: '/events',
      component: eventPage // Use imported LoginForm component
    },
    {
      path: '/register/:id',
      component: registerPage // Use imported LoginForm component
    },
    {
      path: '/admin-login',
      component: adminloginPage // Use imported LoginForm component
    },
    {
      path: '/dashboard',
      component: dashboardPage // Use imported LoginForm component
    },
    {
      path: '/create/:id',
      component: createPage // Use imported LoginForm component
    },
  ]
});

// Export the router instance to be used in the main Vue application
export default router;
