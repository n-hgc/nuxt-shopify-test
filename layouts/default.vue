<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
import { createClient } from '~/plugins/shopify.js'

const { getConfigForKeys } = require('~/lib/config.js')
const config = getConfigForKeys([
  'SHOPIFY_DOMAIN',
  'SHOPIFY_ACCESS_TOKEN'
])

const client = createClient(config)

export default {
  created () {
  },
  mounted () {
    new Promise((resolve, reject) => {
      console.log(this.$store.state)
      setTimeout(() => {
        if (!this.$store.state.checkoutId || !this.$store.getters.getCheckoutUrl) {
          client.checkout.create().then((checkout) => {
            this.$store.commit('updateCheckoutId', checkout.id)
            this.$store.commit('updateCheckoutUrl', checkout.webUrl)
            console.log('P1')
            resolve(this.$store.getters.getCheckoutId)
          })
        } else {
          console.log('P2' + this.$store.state.checkoutId)
          resolve(this.$store.getters.getCheckoutId)
        }
        console.log('P3' + this.$store.state.checkoutId)
      }, 500)
    }).then((checkoutId) => {
      client.checkout.fetch(checkoutId).then((checkout) => {
        console.log(checkout.lineItems)
      })
    })
  },
  computed: {}
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
