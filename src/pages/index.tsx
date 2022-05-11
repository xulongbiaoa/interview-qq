const routes = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    page: '@/pages/Home',
    requiresAuth: false,
    component: () => import(/* webpackChunkName:'homePage' */ './HomePage'),
  },
  {
    path: '/home',
    name: 'Home',
    exact: true,
    page: '@/pages/Home',
    component: () => import(/* webpackChunkName:'homePage' */ './HomePage'),
  },
];

export default routes;
