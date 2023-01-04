import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _bab576bc = () => interopDefault(import('../pages/[slug].js' /* webpackChunkName: "pages/[slug]" */))
const _61bae168 = () => interopDefault(import('../pages/about.js' /* webpackChunkName: "pages/about" */))
const _07ea1a03 = () => interopDefault(import('../pages/index.js' /* webpackChunkName: "pages/index" */))
const _66242f77 = () => interopDefault(import('../pages/_app.js' /* webpackChunkName: "pages/_app" */))
const _6ea2c05b = () => interopDefault(import('../pages/_document.js' /* webpackChunkName: "pages/_document" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/[slug]",
    component: _bab576bc,
    name: "[slug]"
  }, {
    path: "/about",
    component: _61bae168,
    name: "about"
  }, {
    path: "/",
    component: _07ea1a03,
    name: "index"
  }, {
    path: "/:app",
    component: _66242f77,
    name: "app"
  }, {
    path: "/:document",
    component: _6ea2c05b,
    name: "document"
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
