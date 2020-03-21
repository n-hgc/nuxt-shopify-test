<template>
  <div>
    <p>this is cart page</p>
    <div v-for="product in getProductCartList" :key="product.variantId">
      {{ product }}
    </div>
    <a :href="getCheckooutUrl" target="_blank">Go to checkout</a>
  </div>
</template>

<script>
export default {
  computed: {
    getCheckooutUrl () {
      return this.$store.getters.getCheckoutUrl
    },
    getProductCartList () {
      return this.$store.getters.getProductCartList
    }
  }
}
</script>

<style>

</style>
