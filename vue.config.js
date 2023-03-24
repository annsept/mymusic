
const path = require('path');
module.exports = {
  publicPath: "./",
  lintOnSave:false,
  transpileDependencies: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/reset.less')
      ]
    }
  } ,
    css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'search-content-background-color':'#ffffff',
            'nav-bar-background-color':'#fbf7ff',
            'nav-bar-icon-color':'#735eac',
            'nav-bar-text-color':'#735eac',
            'nav-bar-arrow-size':'20px',
            'text-color':'#362b54',
            // 'gray-4':'#ede7f7',
            'gray-5':'#ede7f7',//5 提示词占位符在颜色
            'gray-6':'#b1a8c6',//6 描述文字
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            // hack: `true; @import "your-less-file-path.less";`,
          },
        },
      },
    },
  },
};