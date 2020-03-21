// eslint-disable-next-line nuxt/no-cjs-in-config
const axios = require('axios')
// eslint-disable-next-line nuxt/no-cjs-in-config
const { getConfigForKeys } = require('./lib/config.js')
const config = getConfigForKeys([
  'SHOPIFY_DOMAIN',
  'SHOPIFY_ACCESS_TOKEN'
])

export default {
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/localStorage.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  env: {
    SHOPIFY_DOMAIN: config.SHOPIFY_DOMAIN,
    SHOPIFY_ACCESS_TOKEN: config.SHOPIFY_ACCESS_TOKEN
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: `https://${config.SHOPIFY_DOMAIN}api/2020-01/graphql`,
    headers: {
      'X-Shopify-Storefront-Access-Token': config.SHOPIFY_ACCESS_TOKEN,
      Accept: 'application/json'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  generate: {
    routes () {
      return axios({
        url: `https://${config.SHOPIFY_DOMAIN}/api/2020-01/graphql`,
        method: 'POST',
        headers: {
          'X-Shopify-Storefront-Access-Token': config.SHOPIFY_ACCESS_TOKEN,
          Accept: 'application/json'
        },
        data: {
          query: `query{
            products(first: 250) {
              edges {
                node {
                  handle
                }
              }
            }
          }`
        }
      }).then((response) => {
        const res = []
        const productsRoutes = response.data.data.products.edges
        productsRoutes.forEach((product) => {
          res.push('/' + product.node.handle)
        })
        return res
      })
    }
  }
}
