import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _207da0d9 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _28801444 = () => interopDefault(import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _0bd4ba28 = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _b5823446 = () => interopDefault(import('../pages/overview.vue' /* webpackChunkName: "pages/overview" */))
const _20e051ff = () => interopDefault(import('../pages/password.vue' /* webpackChunkName: "pages/password" */))
const _023d1bf5 = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _698a4e86 = () => interopDefault(import('../pages/signin.vue' /* webpackChunkName: "pages/signin" */))
const _7e20a4fc = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _2d7d1e24 = () => interopDefault(import('../pages/tos.vue' /* webpackChunkName: "pages/tos" */))
const _7f50274f = () => interopDefault(import('../pages/transfer.vue' /* webpackChunkName: "pages/transfer" */))
const _2fa72f5d = () => interopDefault(import('../pages/wallet.vue' /* webpackChunkName: "pages/wallet" */))
const _4cf62ca0 = () => interopDefault(import('../pages/admin/dashboard.vue' /* webpackChunkName: "pages/admin/dashboard" */))
const _0177aeef = () => interopDefault(import('../pages/admin/user.vue' /* webpackChunkName: "pages/admin/user" */))
const _40357b9e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _207da0d9,
    name: "about"
  }, {
    path: "/admin",
    component: _28801444,
    name: "admin"
  }, {
    path: "/contact",
    component: _0bd4ba28,
    name: "contact"
  }, {
    path: "/overview",
    component: _b5823446,
    name: "overview"
  }, {
    path: "/password",
    component: _20e051ff,
    name: "password"
  }, {
    path: "/profile",
    component: _023d1bf5,
    name: "profile"
  }, {
    path: "/signin",
    component: _698a4e86,
    name: "signin"
  }, {
    path: "/signup",
    component: _7e20a4fc,
    name: "signup"
  }, {
    path: "/tos",
    component: _2d7d1e24,
    name: "tos"
  }, {
    path: "/transfer",
    component: _7f50274f,
    name: "transfer"
  }, {
    path: "/wallet",
    component: _2fa72f5d,
    name: "wallet"
  }, {
    path: "/admin/dashboard",
    component: _4cf62ca0,
    name: "admin-dashboard"
  }, {
    path: "/admin/user",
    component: _0177aeef,
    name: "admin-user"
  }, {
    path: "/",
    component: _40357b9e,
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
