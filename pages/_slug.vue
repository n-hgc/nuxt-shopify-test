<template>
  <div>
    <div v-if="product !== null">
      <h1>{{ product.title }}</h1>
      <div v-for="variant in product.variants" :key="variant.id">
        <p>{{ variant.id }}</p>
        <p>{{ variant.price }}</p>
        <div v-for="option in variant.selectedOptions" :key="option.name">
          <span>{{ option.value }}</span>
        </div>
        <input :id="variant.id" v-model="pickedProduct" type="radio" :value="variant.id">
      </div>
      <button @click="addCart">
        Add Cart
      </button>
      <p>{{ checkoutState }}</p>
      <p>{{ pickedProduct }}</p>
    </div>
    <div v-else>
      <p>お探しの製品は存在しません</p>
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

// initialize of shopify
// eslint-disable-next-line no-unused-vars
const client = createClient(config)

export default {
  data () {
    return {
      product: {},
      pickedProduct: null,
      checkoutState: 'stay'
    }
  },
  mounted () {
    const handle = this.$nuxt.$route.params.slug
    client.product.fetchByHandle(handle)
      .then((productData) => {
        /*
         * 存在しないプロダクトをfetchした場合は，nullが返却される
        */
        this.product = productData
      })
      .catch(error => console.error(error))
  },
  methods: {
    addCart () {
      const lineItemToAdd = {
        variantId: this.pickedProduct,
        quantity: 1
      }
      const checkoutId = this.$store.getters.getCheckoutId
      if (lineItemToAdd.variantId !== null) {
        this.checkoutState = 'done'
        client.checkout.addLineItems(checkoutId, lineItemToAdd)
          .then((checkout) => {
            const index = checkout.lineItems.findIndex((obj) => {
              return obj.variant.id === lineItemToAdd.variantId
            })
            this.$store.commit('addCart', checkout.lineItems[index])
            setTimeout(() => {
              this.checkoutState = 'stay'
            }, 1000)
          })
          .catch(error => console.log(error))
      }
    }
  }
}
</script>

<style lang="scss">

</style>
