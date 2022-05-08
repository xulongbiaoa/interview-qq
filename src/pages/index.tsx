const routes = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    page: '@/pages/HomePage',
    requiresAuth: false,
    component: () => import(/* webpackChunkName:'homePage' */ './HomePage'),
  },
  {
    path: '/home',
    name: 'Home',
    exact: true,
    page: '@/pages/HomePage',
    component: () => import(/* webpackChunkName:'homePage' */ './HomePage'),
  },
];

export default routes;
