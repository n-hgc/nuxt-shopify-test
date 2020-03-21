const ShopifyBuy = require('shopify-buy')

const config = {
  domain: process.env.SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN
}
export function createClient (params = config) {
  return ShopifyBuy.buildClient({
    domain: params.SHOPIFY_DOMAIN,
    storefrontAccessToken: params.SHOPIFY_ACCESS_TOKEN
  })
}
