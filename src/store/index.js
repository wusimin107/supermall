//1.导入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
//2.安装插件
Vue.use(Vuex)
//3.创建store对象
const store = new Vuex.Store({
    state: {
      cartList: []  //保存购物车的东西，数组里面是一个个的对象
    },
    mutations,
        //mutations的唯一目的就是修改state中的状态，且每个方法尽可能完成的事件比较单一一点，即不要里面有多种操作
    // 这里多种操作了，可以放在actions  
    // addCart(state,payload) {
    //       //1.查找数组中是否有该商品
    //     let oldProduct = state.cartList.find( item => item.iid === payload.iid)  //数组的find函数=-1，表示有找到这个值，即此时加入购物车的商品在购物车里是有的，只需要数量count增加1
    //       //2.判断oldproduct的值
    //     if(oldProduct) {
    //         oldProduct.count += 1
    //     }else { 
    //         payload.count = 1
    //         state.cartList.push(payload)
           
    //     }

    //   }
   
    
    actions,
    getters,
})
//4.挂载到vue实例上
export default store
