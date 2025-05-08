import { lazy } from 'react'
import { Navigate, type RouteProps } from 'react-router-dom'

// Dashboard Routes
const Analytics = lazy(() => import('@/app/(admin)/dashboard/analytics/page'))
const CRM = lazy(() => import('@/app/(admin)/dashboard/crm/page'))
const Sales = lazy(() => import('@/app/(admin)/dashboard/sales/page'))

// Apps Routes
const EcommerceProducts = lazy(() => import('@/app/(admin)/apps/ecommerce/products/page'))
const EcommerceCart = lazy(() => import('@/app/(admin)/apps/ecommerce/shopping-cart/page'))
const EcommerceProductsGrid = lazy(() => import('@/app/(admin)/apps/ecommerce/products-grid/page'))
const EcommerceProductDetails = lazy(() => import('@/app/(admin)/apps/ecommerce/product-detail/page'))
const EcommerceProductCreate = lazy(() => import('@/app/(admin)/apps/ecommerce/product-create/page'))
const EcommerceCustomers = lazy(() => import('@/app/(admin)/apps/ecommerce/customers/page'))
const EcommerceSellers = lazy(() => import('@/app/(admin)/apps/ecommerce/sellers/page'))
const EcommerceOrders = lazy(() => import('@/app/(admin)/apps/ecommerce/orders/page'))
const EcommerceOrderDetails = lazy(() => import('@/app/(admin)/apps/ecommerce/order-detail/page'))
const EcommerceCheckout = lazy(() => import('@/app/(admin)/apps/ecommerce/checkout/page'))
const Chat = lazy(() => import('@/app/(admin)/apps/chat/page'))
const EmailInbox = lazy(() => import('@/app/(admin)/apps/email/inbox/page'))
const EmailRead = lazy(() => import('@/app/(admin)/apps/email/details/page'))
const Companies = lazy(() => import('@/app/(admin)/apps/companies/page'))
const Calendar = lazy(() => import('@/app/(admin)/apps/calendar/page'))
const TaskList = lazy(() => import('@/app/(admin)/apps/tasks/list/page'))
const TaskDetails = lazy(() => import('@/app/(admin)/apps/tasks/details/page'))
const KanbanBoard = lazy(() => import('@/app/(admin)/apps/tasks/kanban/page'))
const Tickets = lazy(() => import('@/app/(admin)/apps/tickets/page'))
const MemberList = lazy(() => import('@/app/(admin)/apps/contacts/list/page'))
const Profile = lazy(() => import('@/app/(admin)/apps/contacts/profile/page'))
const FileManager = lazy(() => import('@/app/(admin)/apps/file-manager/page'))


// Pages Routes
const Welcome = lazy(() => import('@/app/(admin)/pages/starter/page'))
const FAQs = lazy(() => import('@/app/(admin)/pages/faq/page'))
const Sitemap = lazy(() => import('@/app/(admin)/pages/sitemap/page'))
const Invoice = lazy(() => import('@/app/(admin)/pages/invoice/page'))
const SearchResult = lazy(() => import('@/app/(admin)/pages/search-results/page'))
const ComingSoon = lazy(() => import('@/app/(error)/coming-soon/page'))
const TimelinePage = lazy(() => import('@/app/(admin)/pages/timeline/page'))
const Pricing = lazy(() => import('@/app/(admin)/pages/pricing/page'))
const Maintenance = lazy(() => import('@/app/(error)/maintenance/page'))
const Gallery = lazy(() => import('@/app/(admin)/pages/gallery/page'))
const Widgets = lazy(() => import('@/app/(admin)/widgets/page'))

// Base UI Routes
const TabsAccordion = lazy(() => import('@/app/(admin)/ui/tabs-accordions/page'))
const Notifications = lazy(() => import('@/app/(admin)/ui/notifications/page'))
const Avatars = lazy(() => import('@/app/(admin)/ui/avatars/page'))
const Ribbons = lazy(() => import('@/app/(admin)/ui/ribbons/page'))
const Buttons = lazy(() => import('@/app/(admin)/ui/buttons/page'))
const Cards = lazy(() => import('@/app/(admin)/ui/cards/page'))
const Carousel = lazy(() => import('@/app/(admin)/ui/carousel/page'))
const GeneralUI = lazy(() => import('@/app/(admin)/ui/general/page'))
const EmbedVideo = lazy(() => import('@/app/(admin)/ui/embedvideo/page'))
const Grid = lazy(() => import('@/app/(admin)/ui/grid/page'))
const Images = lazy(() => import('@/app/(admin)/ui/images/page'))
const Dropdowns = lazy(() => import('@/app/(admin)/ui/dropdowns/page'))
const ListGroup = lazy(() => import('@/app/(admin)/ui/listgroup/page'))
const Modals = lazy(() => import('@/app/(admin)/ui/modals/page'))
const Portlets = lazy(() => import('@/app/(admin)/ui/portlets/page'))
const Offcanvas = lazy(() => import('@/app/(admin)/ui/offcanvas/page'))
const Placeholders = lazy(() => import('@/app/(admin)/ui/placeholders/page'))
const TooltipAndPopovers = lazy(() => import('@/app/(admin)/ui/tooltips-popovers/page'))
const Progress = lazy(() => import('@/app/(admin)/ui/progress/page'))
const Spinners = lazy(() => import('@/app/(admin)/ui/spinners/page'))
const Typography = lazy(() => import('@/app/(admin)/ui/typography/page'))

// Advanced UI Routes
const SweetAlerts = lazy(() => import('@/app/(admin)/extended-ui/sweet-alert/page'))
const NestableList = lazy(() => import('@/app/(admin)/extended-ui/nestable/page'))

// Charts and Maps Routes
const ApexCharts = lazy(() => import('@/app/(admin)/charts/apex/page'))
const ChartjsCharts = lazy(() => import('@/app/(admin)/charts/chartjs/page'))
const VectorMaps = lazy(() => import('@/app/(admin)/maps/vectormaps/page'))


// Forms Routes
const Basic = lazy(() => import('@/app/(admin)/forms/basic/page'))
const Advanced = lazy(() => import('@/app/(admin)/forms/advanced/page'))
const Validation = lazy(() => import('@/app/(admin)/forms/validation/page'))
const FileUploads = lazy(() => import('@/app/(admin)/forms/upload/page'))
const Editors = lazy(() => import('@/app/(admin)/forms/editors/page'))

// Table Routes
const BasicTable = lazy(() => import('@/app/(admin)/tables/basic/page'))
const AdvancedTable = lazy(() => import('@/app/(admin)/tables/advanced/page'))

// Icon Routes
const BoxIcons = lazy(() => import('@/app/(admin)/icons/boxicons/page'))
const FeatherIcons = lazy(() => import('@/app/(admin)/icons/feather/page'))
const RemixIcons = lazy(() => import('@/app/(admin)/icons/remix/page'))
const MaterialDesignIcons = lazy(() => import('@/app/(admin)/icons/mdi/page'))
const FontAwesomeIcons = lazy(() => import('@/app/(admin)/icons/font-awesome/page'))
const WeatherIcons = lazy(() => import('@/app/(admin)/icons/weather/page'))

// Not Found Routes
const NotFoundAdmin = lazy(() => import('@/app/not-found'))
const Error404Alt = lazy(() => import('@/app/(admin)/pages/404-alt/page'))
const Error500 = lazy(() => import('@/app/(error)/error-500/page'))

// Auth Routes
const AuthSignIn = lazy(() => import('@/app/(auth)/auth/login/page'))
const AuthSignIn2 = lazy(() => import('@/app/(auth)/auth2/login/page'))
const AuthSignUp = lazy(() => import('@/app/(auth)/auth/register/page'))
const AuthSignUp2 = lazy(() => import('@/app/(auth)/auth2/register/page'))
const ResetPassword = lazy(() => import('@/app/(auth)/auth/forget-password/page'))
const ResetPassword2 = lazy(() => import('@/app/(auth)/auth2/forget-password/page'))
const LockScreen = lazy(() => import('@/app/(auth)/auth/lock-screen/page'))
const LockScreen2 = lazy(() => import('@/app/(auth)/auth2/lock-screen/page'))
const Logout = lazy(() => import('@/app/(auth)/auth/logout/page'))
const Logout2 = lazy(() => import('@/app/(auth)/auth2/logout/page'))
const Confirm = lazy(() => import('@/app/(auth)/auth/confirm/page'))
const Confirm2 = lazy(() => import('@/app/(auth)/auth2/confirm/page'))
const SigninSignUp = lazy(() => import('@/app/(auth)/auth/signin-signup/page'))
const SigninSignUp2 = lazy(() => import('@/app/(auth)/auth2/signin-signup/page'))


// layouts
const DarkLayout = lazy(() => import('@/app/(admin)/layouts/dark/page'))
const DetachedLayout = lazy(() => import('@/app/(admin)/layouts/detached/page'))
const HorizontalLayout = lazy(() => import('@/app/(admin)/layouts/horizontal/page'))
const TwoColumnLayout = lazy(() => import('@/app/(admin)/layouts/two-column/page'))
const VerticalLayout = lazy(() => import('@/app/(admin)/layouts/vertical/page'))

export type RoutesProps = {
    path: RouteProps['path']
    name: string
    element: RouteProps['element']
    exact?: boolean
}

const initialRoutes: RoutesProps[] = [
    {
        path: '/',
        name: 'root',
        element: <Navigate to="/dashboard/analytics" />,
    },
    {
        path: '*',
        name: 'not-found',
        element: <NotFoundAdmin />,
    },
]

const generalRoutes: RoutesProps[] = [
    {
        path: '/dashboard/analytics',
        name: 'Analytics',
        element: <Analytics />,
    },
    {
        path: '/dashboard/crm',
        name: 'CRM',
        element: <CRM />,
    },
    {
        path: '/dashboard/sales',
        name: 'Sales',
        element: <Sales />,
    },
]

const appsRoutes: RoutesProps[] = [
    {
        name: 'Products',
        path: '/apps/ecommerce/products',
        element: <EcommerceProducts />,
    },
    {
        name: 'Products Grid',
        path: '/apps/ecommerce/products-grid',
        element: <EcommerceProductsGrid />,
    },
    {
        name: 'Product Details',
        path: '/apps/ecommerce/product-detail',
        element: <EcommerceProductDetails />,
    },
    {
        name: 'Create Product',
        path: '/apps/ecommerce/product-create',
        element: <EcommerceProductCreate />,
    },
    {
        name: 'Customers',
        path: '/apps/ecommerce/customers',
        element: <EcommerceCustomers />,
    },
    {
        name: 'Sellers',
        path: '/apps/ecommerce/sellers',
        element: <EcommerceSellers />,
    },
    {
        name: 'Orders',
        path: '/apps/ecommerce/orders',
        element: <EcommerceOrders />,
    },
    {
        name: 'Order Details',
        path: '/apps/ecommerce/order-detail',
        element: <EcommerceOrderDetails />,
    },
    {
        name: 'Shopping Cart',
        path: '/apps/ecommerce/shopping-cart',
        element: <EcommerceCart />,
    },
    {
        name: 'Checkout',
        path: '/apps/ecommerce/checkout',
        element: <EcommerceCheckout />,
    },
    {
        name: 'Chat',
        path: '/apps/chat',
        element: <Chat />,
    },
    {
        name: 'Email Inbox',
        path: '/apps/email/inbox',
        element: <EmailInbox />,
    },
    {
        name: 'Email Details',
        path: '/apps/email/details',
        element: <EmailRead />,
    },
    {
        name: 'Companies',
        path: '/apps/companies',
        element: <Companies />,
    },
    {
        name: 'Task List',
        path: '/apps/tasks/list',
        element: <TaskList />,
    },
    {
        name: 'Task Details',
        path: '/apps/tasks/details',
        element: <TaskDetails />,
    },
    {
        name: 'Task Kanban',
        path: '/apps/tasks/kanban',
        element: <KanbanBoard />,
    },
    {
        name: 'Calender',
        path: '/apps/calendar',
        element: <Calendar />,
    },
    {
        name: 'Tickets',
        path: '/apps/tickets',
        element: <Tickets />,
    },
    {
        name: 'Members List',
        path: '/apps/contacts/list',
        element: <MemberList />,
    },
    {
        name: 'Profile',
        path: '/apps/contacts/profile',
        element: <Profile />,
    },
    {
        name: 'File Manager',
        path: '/apps/file-manager',
        element: <FileManager />,
    },

]

const customRoutes: RoutesProps[] = [
    {
        name: 'Starter',
        path: '/pages/starter',
        element: <Welcome />,
    },
    {
        name: 'FAQs',
        path: '/pages/faq',
        element: <FAQs />,
    },
    {
        name: 'Profile',
        path: '/pages/profile',
        element: <Profile />,
    },
    {
        name: 'Sitemap',
        path: '/pages/sitemap',
        element: <Sitemap />,
    },
    {
        name: 'Invoice',
        path: '/pages/invoice',
        element: <Invoice />,
    },
    {
        name: 'Search Result',
        path: '/pages/search-results',
        element: <SearchResult />,
    },
    {
        name: 'Timeline',
        path: '/pages/timeline',
        element: <TimelinePage />,
    },
    {
        name: 'Pricing',
        path: '/pages/pricing',
        element: <Pricing />,
    },
    {
        name: 'Gallery',
        path: '/pages/gallery',
        element: <Gallery />,
    },
    {
        name: 'Error 404',
        path: '/404',
        element: <NotFoundAdmin />,
    },
    {
        name: 'Widgets',
        path: '/widgets',
        element: <Widgets />,
    },
    {
        name: '404 Error 2',
        path: '/pages/404-alt',
        element: <Error404Alt />,
    },
]

const baseUIRoutes: RoutesProps[] = [
    {
        name: 'Tabs And Accordions',
        path: '/ui/tabs-accordions',
        element: <TabsAccordion />,
    },
    {
        name: 'Avatars',
        path: '/ui/avatars',
        element: <Avatars />,
    },
    {
        name: 'Buttons',
        path: '/ui/buttons',
        element: <Buttons />,
    },
    {
        name: 'Cards',
        path: '/ui/cards',
        element: <Cards />,
    },
    {
        name: 'Carousel',
        path: '/ui/carousel',
        element: <Carousel />,
    },
    {
        name: 'Embed Video',
        path: '/ui/embedvideo',
        element: <EmbedVideo />,
    },
    {
        name: 'General UI',
        path: '/ui/general',
        element: <GeneralUI />,
    },
    {
        name: 'Grid',
        path: '/ui/grid',
        element: <Grid />,
    },
    {
        name: 'Images',
        path: '/ui/images',
        element: <Images />,
    },
    {
        name: 'Dropdowns',
        path: '/ui/dropdowns',
        element: <Dropdowns />,
    },
    {
        name: 'List Group',
        path: '/ui/listgroup',
        element: <ListGroup />,
    },
    {
        name: 'Modals',
        path: '/ui/modals',
        element: <Modals />,
    },
    {
        name: 'Notifications',
        path: '/ui/notifications',
        element: <Notifications />,
    },
    {
        name: 'Offcanvas',
        path: '/ui/offcanvas',
        element: <Offcanvas />,
    },
    {
        name: 'Placeholders',
        path: '/ui/placeholders',
        element: <Placeholders />,
    },
    {
        name: 'Portlets',
        path: '/ui/portlets',
        element: <Portlets />,
    },
    {
        name: 'Tooltips Popovers',
        path: '/ui/tooltips-popovers',
        element: <TooltipAndPopovers />,
    },
    {
        name: 'Ribbons',
        path: '/ui/ribbons',
        element: <Ribbons />,
    },
    {
        name: 'Progress',
        path: '/ui/progress',
        element: <Progress />,
    },
    {
        name: 'Spinners',
        path: '/ui/spinners',
        element: <Spinners />,
    },
    {
        name: 'Typography',
        path: '/ui/typography',
        element: <Typography />,
    },
    
]

const advancedUIRoutes: RoutesProps[] = [
 
    {
        name: 'Sweet Alert',
        path: '/extended-ui/sweet-alert',
        element: <SweetAlerts />,
    },
    {
        name: 'Nestable',
        path: '/extended-ui/nestable',
        element: <NestableList />,
    },

]

const chartsNMapsRoutes: RoutesProps[] = [
    {
        name: 'Apex Charts',
        path: '/charts/apex',
        element: <ApexCharts />,
    },
    {
        name: 'Chartjs',
        path: '/charts/chartjs',
        element: <ChartjsCharts />,
    },
    {
        name: 'Vector',
        path: '/maps/vectormaps',
        element: <VectorMaps />,
    },
]

const formsRoutes: RoutesProps[] = [
    {
        name: 'General Elements',
        path: '/forms/basic',
        element: <Basic />,
    },
    {
        name: 'Form Advanced',
        path: '/forms/advanced',
        element: <Advanced />,
    },
    {
        name: 'Validation',
        path: '/forms/validation',
        element: <Validation />,
    },
    {
        name: 'File Uploads',
        path: '/forms/upload',
        element: <FileUploads />,
    },
    {
        name: 'Editors',
        path: '/forms/editors',
        element: <Editors />,
    },
]

const tableRoutes: RoutesProps[] = [
    {
        name: 'Basic Tables',
        path: '/tables/basic',
        element: <BasicTable />,
    },
    {
        name: 'Advanced Tables',
        path: '/tables/advanced',
        element: <AdvancedTable />,
    },
]

const iconRoutes: RoutesProps[] = [
    {
        name: 'Boxicons',
        path: '/icons/boxicons',
        element: <BoxIcons />,
    },
    {
        name: 'Feather',
        path: '/icons/feather',
        element: <FeatherIcons />,
    },
    {
        name: 'Remix',
        path: '/icons/remix',
        element: <RemixIcons />,
    },
    {
        name: 'Material Design Icons',
        path: '/icons/mdi',
        element: <MaterialDesignIcons />,
    },
    {
        name: 'Font Awesome 5',
        path: '/icons/font-awesome',
        element: <FontAwesomeIcons />,
    },
    {
        name: 'Weather',
        path: '/icons/weather',
        element: <WeatherIcons />,
    },
]

const layoutRoutes: RoutesProps[] = [
    {
        name: 'Dark Layout',
        path: '/layouts/dark',
        element: <DarkLayout />,
    },
    {
        name: 'Vertical Layout',
        path: '/layouts/vertical',
        element: <VerticalLayout />,
    },
    {
        name: 'Horizontal Layout',
        path: '/layouts/horizontal',
        element: <HorizontalLayout />,
    },
    {
        name: 'Datached Layout',
        path: '/layouts/detached',
        element: <DetachedLayout />,
    },
    {
        name: 'Two Column Layout',
        path: '/layouts/two-column',
        element: <TwoColumnLayout />,
    },
   
]

export const authRoutes: RoutesProps[] = [
    {
        path: '/auth/login',
        name: 'Login',
        element: <AuthSignIn />,
    },
    {
        name: 'Login 2',
        path: '/auth2/login',
        element: <AuthSignIn2 />,
    },
    {
        name: 'Sign Up',
        path: '/auth/register',
        element: <AuthSignUp />,
    },
    {
        name: 'Sign Up 2',
        path: '/auth2/register',
        element: <AuthSignUp2 />,
    },
    {
        name: 'Reset Password',
        path: '/auth/forget-password',
        element: <ResetPassword />,
    },
    {
        name: 'Reset Password 2',
        path: '/auth2/forget-password',
        element: <ResetPassword2 />,
    },
    {
        name: 'Lock Screen',
        path: '/auth/lock-screen',
        element: <LockScreen />,
    },
    {
        name: 'Lock Screen 2',
        path: '/auth2/lock-screen',
        element: <LockScreen2 />,
    },
    {
        name: 'Confirm',
        path: '/auth/confirm',
        element: <Confirm />,
    },
    {
        name: 'Confirm 2',
        path: '/auth2/confirm',
        element: <Confirm2 />,
    },
    {
        name: 'Signin Signup',
        path: '/auth/signin-signup',
        element: <SigninSignUp />,
    },
    {
        name: 'Signin Signup 2',
        path: '/auth2/signin-signup',
        element: <SigninSignUp2 />,
    },
    {
        name: 'Logout',
        path: '/auth/logout',
        element: <Logout />,
    },
    {
        name: 'Logout 2',
        path: '/auth2/logout',
        element: <Logout2 />,
    },
    {
        name: '404 Error',
        path: '/404',
        element: <NotFoundAdmin />,
    },
    {
        name: 'Maintenance',
        path: '/maintenance',
        element: <Maintenance />,
    },

    {
        name: 'Error 500',
        path: '/error-500',
        element: <Error500 />,
    },
    {
        name: 'Coming Soon',
        path: '/coming-soon',
        element: <ComingSoon />,
    },
]

export const appRoutes = [
    ...initialRoutes,
    ...generalRoutes,
    ...layoutRoutes,
    ...appsRoutes,
    ...customRoutes,
    ...baseUIRoutes,
    ...advancedUIRoutes,
    ...chartsNMapsRoutes,
    ...formsRoutes,
    ...tableRoutes,
    ...iconRoutes,
    ...authRoutes,
]
