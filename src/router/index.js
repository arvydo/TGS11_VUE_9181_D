import Vue from 'vue'
import Router from 'vue-router'

const DashboardLayout = () => import(/*webpackChunkName:"dashboard"*/'../components/dashboardLayout.vue')
const LandingPageLayout = () => import('../components/landingPageLayout.vue')

function loadView(view){
    return()=>import(/*webpackChunkName:"view-[request]"*/`../components/dashboardContents/${view}.vue`)
}

function loadLandingPage(view){
    return () => import(`../components/landingPageContents/${view}.vue`)
}

const routes = [
    { 
        path: '/',
        component: LandingPageLayout,
        children: [
            {
                name: 'LandingPage',
                path: '',
                component: loadLandingPage('landingPage')
            }
        ]
    },
    {
        path:'/',
        component: DashboardLayout,
        children: [
            {
                name: 'UserController',
                path: '',
                component: loadView('userController')
            },
            {
                name: 'ServiceController',
                path: '/service',
                component: loadView('serviceController')
            }
        ]
    },
]
Vue.use(Router)

const router = new Router({mode: 'history', routes: routes})

export default router