module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                //系统默认配置好了'src': '@',可以直接拿来用
                'assets': '@/assets',
                'common': '@/common',
                'network': '@/network',
                'views': '@/views',
                'components': '@/components'

            }
        }
    }
}