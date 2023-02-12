import config from '~/config'
import Account from '~/pages/Account'
import Blogs from '~/pages/Blogs'
import Customers from '~/pages/Customers'
import Customer from '~/pages/Customer'
import Dashboard from '~/pages/Dashboard'
import Login from '~/pages/Login'
import Order from '~/pages/Order'
import Orders from '~/pages/Orders'
import Products from '~/pages/Products'
import Security from '~/pages/Security'
import CreateCustomer from '~/pages/CreateCustomer'
import Product from '~/pages/Product'
import AddProduct from '~/pages/AddProduct'
import CreateOrder from '~/pages/CreateOrder'
import Images from '~/pages/Images'
import MarketingEmails from '~/pages/MarketingEmails'
import AddBlogPost from '~/pages/AddBlogPost'
import BlogPost from '~/pages/BlogPost'

const publicRoutes = [
    { path: config.routes.login, component: Login },
]

const privateRoutes = [
    { path: '*', component: Dashboard },
    { path: config.routes.dashboard, component: Dashboard },
    { path: config.routes.customers, component: Customers },
    { path: config.routes.customer, component: Customer },
    { path: config.routes.createCustomer, component: CreateCustomer },
    { path: config.routes.orders, component: Orders },
    { path: config.routes.order, component: Order },
    { path: config.routes.createOrder, component: CreateOrder },
    { path: config.routes.products, component: Products },
    { path: config.routes.product, component: Product },
    { path: config.routes.addProduct, component: AddProduct },
    { path: config.routes.website, component: Blogs },
    { path: config.routes.blogPosts, component: Blogs },
    { path: config.routes.blogPost, component: BlogPost },
    { path: config.routes.addBlogPost, component: AddBlogPost },
    { path: config.routes.images, component: Images },
    { path: config.routes.marketingEmails, component: MarketingEmails },
    { path: config.routes.account, component: Account },
    { path: config.routes.security, component: Security },
]

export { publicRoutes, privateRoutes }