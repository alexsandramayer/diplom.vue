import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage'
import ShopCatalogPage from '@/pages/ShopCatalogPage'
import ShopProductsPage from '@/pages/ShopProductsPage'
import ShopProductPage from '@/pages/ShopProductPage'
import TrainingPage from '@/pages/TrainingPage'
import ToursPage from '@/pages/ToursPage'
import ContactsPage from '@/pages/ContactsPage'
import CertificatePage from '@/pages/CertificatePage'
import CoursePage from '@/pages/CoursePage'
import BlogPage from '@/pages/BlogPage'
import TestsPage from '@/pages/TestsPage'
import DivingPricePage from '@/pages/DivingPricePage'
import AccountPage from '@/pages/AccountPage'
import CartPage from '@/pages/CartPage'
import NotFound from '@/pages/NotFound'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/shopcatalog',
        name: 'shopcatalog',
        component: ShopCatalogPage,
    },
    {
        path: '/shopproducts/:categoryId/:categoryName',
        name: 'shopproducts',
        component: ShopProductsPage,
        props: true
    },
    {
        path: '/product/:id',
        name: 'product',
        component: ShopProductPage,
        props: true
    },
    {
        path: '/training',
        name: 'training',
        component: TrainingPage,
    }, 
    {
        path: '/tours',
        name: '/tours',
        component: ToursPage,
    },
    {
        path: '/contacts',
        name: 'contacts',
        component: ContactsPage,
    },
    {
        path: '/certificate',
        name: 'certificate',
        component: CertificatePage,
    },
    {
        path: '/course',
        name: 'course',
        component: CoursePage,
    },
    {
        path: '/blog',
        name: 'blog',
        component: BlogPage,
    },
    {
        path: '/tests',
        name: 'tests',
        component: TestsPage,
    },
    {
        path: '/divingprice',
        name: 'divingprice',
        component: DivingPricePage,
    },
    {
        path: '/account',
        name: 'account',
        component: AccountPage,
        props: true
    },
    
    {
        path: '/cart',
        name: 'cart',
        component: CartPage,
    },
    {
        path: '/:CatchAll(.*)',
        name: '404',
        component: NotFound,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
