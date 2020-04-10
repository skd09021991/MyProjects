
import Home from './components/Home';
import About from './components/About';
import Career from './components/Career';
import Contact from './components/Contact';
import Privacy from './components/Privacy'
import Blog from './components/Blog';

export const routes = [
  {
      path: '/',
      component: Home
  },
  {
      path: '/about',
      component: About
  },
  {
      path: '/career',
      component: Career
  },
  {
      path: '/contact',
      component: Contact
  } ,
  {
    path: '/privacy',
    component: Privacy
},
,
  {
    path: '/blog',
    component: Blog
}
];