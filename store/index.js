export const state = () => ({
  productCartList: [],
  checkoutId: null,
  checkoutUrl: null
})

export const mutations = {
  addCart (state, lineItem) {
    const productIndex = state.productCartList.findIndex((obj) => {
      return obj.variantId === lineItem.variant.id
    })
    const product = {
      variantId: null,
      name: null,
      variant: null,
      imageSrc: null,
      price: null,
      quantity: null
    }
    if (productIndex === -1) {
      // TODO write push newproduct
      product.variantId = lineItem.variant.id
      product.name = lineItem.title
      product.variant = lineItem.variant.title
      product.imageSrc = lineItem.variant.image.src
      product.price = lineItem.variant.price
      product.quantity = 1
      state.productCartList.push(product)
    } else {
      state.productCartList[productIndex].quantity += 1
    }
  },
  updateCart (state, lineItem) {
    const productIndex = state.productCartList.findIndex((obj) => {
      return obj.variantId === lineItem.variant.id
    })
    if (productIndex !== -1) {
      state.productCartList[productIndex].quantity = lineItem.quantity
    }
  },
  resetCartList (state) {
    state.productCartList.length = 0
  },
  updateCheckoutId (state, id) {
    state.checkoutId = id
  },
  updateCheckoutUrl (state, url) {
    state.checkoutUrl = url
  }
}

export const getters = {
  getCheckoutId (state) {
    return state.checkoutId
  },
  getProductCartList (state) {
    return state.productCartList
  },
  getCheckoutUrl (state) {
    return state.checkoutUrl
  }
}
