import {request} from './request'

export function getHomeMultidata() {  //轮播图和推荐的数据请求
    return request({
        url: '/home/multidata'
    })
}

export function getHomeGoods(type,page) { //流行/新款/精选的数据请求
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}