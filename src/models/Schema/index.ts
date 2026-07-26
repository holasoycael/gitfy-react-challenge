// childrens
import asset from './asset'
import product from './product'
import form from './form'
import pagination from './pagination'
import cart from './cart'

export default new (class {
  asset = asset
  product = product
  form = form
  pagination = pagination
  cart = cart
})()
