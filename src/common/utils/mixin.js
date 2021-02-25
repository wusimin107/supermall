import {debounce} from 'common/utils/utils.js'
export const itemListenerMixin = {
    data() {
        return {
            itemImageListener:null
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh)
        this.itemImgListener = () => {
          refresh()
         }
        this.$bus.$on('itemImageLoad', this.itemImgListener)
        console.log('混入')
  /**
   *  这里面的代码，在home这里会使用，在detail里面也会使用，以后需要用到goodsitem的时候也需要使用，所以重复性很高，
           可以对它进行抽离，两个组件之间想复用代码的话，通过混入mixins来复用的，
           【mixins就是用来更高效的实现组件内容的复用，在使用mixin的组件中引入后，mixin中的方法和属性也就并入到该组件中，
           可以直接使用。钩子函数会两个都被调用，mixin中的钩子首先执行；即你创建的mixins.js是作用在mounted，到时后导入在一个组件里，
           这个组件本身mounted也有东西执行，结果是两个都会被执行
           。】


      不是这些，像有些组件和方法重复使用也可以
      components： {

      }
      methods： {
          
      }
   */
    }
 
}