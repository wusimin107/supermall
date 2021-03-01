import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-types'

export default {
    addCart(context,payload) {
       return new Promise((resolve,reject) => {
            //  1.查找数组中是否有该商品
         let oldProduct = context.state.cartList.find( item => item.iid === payload.iid)  //数组的find函数=-1，表示有找到这个值，即此时加入购物车的商品在购物车里是有的，只需要数量count增加1
         //2.判断oldproduct的值
          if(oldProduct) {
              context.commit( ADD_COUNTER, oldProduct)
             resolve('改商品数量+1')
          }else { 
              payload.count = 1
             context.commit(ADD_TO_CART, payload)
             resolve('新商品加入到购物车')  
          }
 
       })
      }
}