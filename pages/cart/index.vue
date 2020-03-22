<template>
  <div>
    <p>this is cart page</p>
    <div v-for="product in getProductCartList" :key="product.variantId">
      <h2>{{ product.name + ' - ' + product.variant }}</h2>
      <button :value="product.variantId" @click="reduceCart($event.target.value)"> - </button>
      <p>{{ product.quantity }}</p>
      <button :value="product.variantId" @click="addCart($event.target.value)"> + </button>
      <div class="image-box">
        <img class="image-box-cont" :src="product.imageSrc">
      </div>
      <p>SubTotal: {{ product.price * product.quantity }}</p>
    </div>
    <a :href="getCheckooutUrl" target="_blank">Go to checkout</a>
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
  data () {
    return {
      pickedProduct: null
    }
  },
  computed: {
    getCheckooutUrl () {
      return this.$store.getters.getCheckoutUrl
    },
    getProductCartList () {
      return this.$store.getters.getProductCartList
    }
  },
  methods: {
    addCart (value) {
      const lineItemToAdd = {
        variantId: value,
        quantity: 1
      }
      const checkoutId = this.$store.getters.getCheckoutId
      client.checkout.addLineItems(checkoutId, lineItemToAdd)
        .then((checkout) => {
          const index = checkout.lineItems.findIndex((obj) => {
            return obj.variant.id === lineItemToAdd.variantId
          })
          this.$store.commit('addCart', checkout.lineItems[index])
        })
        .catch(error => console.log(error))
    },
    reduceCart (value) {
      const lineItemToAdd = {
        variantId: value,
        quantity: -1
      }
      try {
        const checkoutId = this.$store.getters.getCheckoutId
        if (checkoutId === null) {
          throw new ReferenceError('emprty checkoutId')
        }
        client.checkout.addLineItems(checkoutId, lineItemToAdd)
          .then((checkout) => {
            const index = checkout.lineItems.findIndex((obj) => {
              return obj.variant.id === lineItemToAdd.variantId
            })
            this.$store.commit('updateCart', checkout.lineItems[index])
          })
          .catch(error => console.log(error))
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.image-box {
  width: 60%;
}
.image-box-cont {
  width: 100%;
}

</style>
