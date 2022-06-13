import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1c3b98a0 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _b03e8736 = () => interopDefault(import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _0396761a = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _250404b6 = () => interopDefault(import('../pages/overview.vue' /* webpackChunkName: "pages/overview" */))
const _beb51e50 = () => interopDefault(import('../pages/password.vue' /* webpackChunkName: "pages/password" */))
const _065c3dfc = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _34e960c2 = () => interopDefault(import('../pages/signin.vue' /* webpackChunkName: "pages/signin" */))
const _0bbcb3d6 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _1bd748aa = () => interopDefault(import('../pages/tos.vue' /* webpackChunkName: "pages/tos" */))
const _01d573b0 = () => interopDefault(import('../pages/transfer.vue' /* webpackChunkName: "pages/transfer" */))
const _a8af9f14 = () => interopDefault(import('../pages/wallet.vue' /* webpackChunkName: "pages/wallet" */))
const _329b50b2 = () => interopDefault(import('../pages/admin/dashboard.vue' /* webpackChunkName: "pages/admin/dashboard" */))
const _b71f08f0 = () => interopDefault(import('../pages/admin/user.vue' /* webpackChunkName: "pages/admin/user" */))
const _3bf37365 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _1c3b98a0,
    name: "about"
  }, {
    path: "/admin",
    component: _b03e8736,
    name: "admin"
  }, {
    path: "/contact",
    component: _0396761a,
    name: "contact"
  }, {
    path: "/overview",
    component: _250404b6,
    name: "overview"
  }, {
    path: "/password",
    component: _beb51e50,
    name: "password"
  }, {
    path: "/profile",
    component: _065c3dfc,
    name: "profile"
  }, {
    path: "/signin",
    component: _34e960c2,
    name: "signin"
  }, {
    path: "/signup",
    component: _0bbcb3d6,
    name: "signup"
  }, {
    path: "/tos",
    component: _1bd748aa,
    name: "tos"
  }, {
    path: "/transfer",
    component: _01d573b0,
    name: "transfer"
  }, {
    path: "/wallet",
    component: _a8af9f14,
    name: "wallet"
  }, {
    path: "/admin/dashboard",
    component: _329b50b2,
    name: "admin-dashboard"
  }, {
    path: "/admin/user",
    component: _b71f08f0,
    name: "admin-user"
  }, {
    path: "/",
    component: _3bf37365,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
