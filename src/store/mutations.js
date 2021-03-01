import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-types'


export default {
    [ADD_COUNTER](state,payload) {
        payload.count++
    },
    [ADD_TO_CART](state,payload) {
        payload.checked = true  //添加了一个属性，由这个属性来决定那个勾勾
        state.cartList.push(payload)
    }
}