<template>
  <div>
    <p>this is cart page</p>
    <p>{{ getProductCartList }}</p>
    <a :href="getCheckooutUrl" target="_blank">Go to checkout</a>
  </div>
</template>

<script>
export default {
  data () {},
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
