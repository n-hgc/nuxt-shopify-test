/* eslint-disable no-console */
<template>
  <div class="container">
    <div v-if="productList.lenght != 0">
      <div v-for="product in productList" :key="product.id" class="box">
        <h1>{{ product.title }}</h1>
        <div v-for="image in product.images" :key="image.id">
          <img :src="image.src" class="image">
        </div>
        <div v-html="product.descriptionHtml" />
        <nuxt-link :to="{name: 'slug', params: {slug: product.handle}}">Product-page</nuxt-link>
      </div>
    </div>
    <div>
      <nuxt-link :to="{ name: 'cart'}">Go Cart</nuxt-link>
    </div>
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
  components: {
  },
  data () {
    return {
      productList: []
    }
  },
  created () {
  },
  mounted () {
    client.product.fetchAll()
      .then((products) => {
        console.log(products)
        for (const key in products) {
          if (key !== 'type') {
            console.log(products[key])
            this.productList.push(products[key])
          }
        }
      })
  },
  computed: {}
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.box {
  width: 80%;
  &+.box {
    margin-top: 40px;
  }
  .image {
    width: 80%;
  }
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
