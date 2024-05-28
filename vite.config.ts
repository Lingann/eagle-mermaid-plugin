import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  // 设置本地开发环境的访问host，注意，这里只是为127.0.0.1设置了host，测试环境，预发环境的host需要在本地的host文件中配置
  base: './',
  // 注入全局变量
  define: {
    __VERSION__: JSON.stringify({})
  },
  plugins: [
    // 配置html模板（这里也可以配置多页面应用，以此提高页面加载速度）
    createHtmlPlugin({
      // 配置入口文件，配置后会自动引入打包后的js文件，需要注意的是，要将index.html文件中的js文件引入注释掉
      entry: 'src/main.ts',
      inject: {
        data: {
          title: 'Blanc Nova Vue3 Template',
          description: 'Blanc Nova Vue3 Template', // 网页描述
          keywords: 'Blanc Nova Vue3 Template' // 网页关键字
        }
      }
    })
  ],
  server: {
    fs: {
      strict: false
    },
    open: false, // 自动打开浏览器
    port: 3000,
    cors: true, // 允许跨域
    https: false // 开启https
  },
  build: {
    target: 'es2015', // 兼容性
    assetsDir: 'assets', // 静态资源目录
    cssTarget: 'chrome82', // css兼容性
    sourcemap: false, // 打包后是否生成.map文件
    manifest: false, // 是否生成manifest.json文件
    chunkSizeWarningLimit: 2000, // 警告阈值
    minify: 'terser', // 压缩方式
    terserOptions: {
      compress: {
        drop_console: true, // 去除console
        drop_debugger: true // 去除debugger
      }
    },
    rollupOptions: {
      output: {}
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 定义全局的scss变量
        // 给导入的路径最后加上 ;
        // additionalData: '@import "@/styles/variables.scss";'
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      },
      {
        find: 'vite-plugin-mock',
        replacement: 'vite-plugin-mock/dist/client'
      },
      {
        find: /^~(.*)$/,
        replacement: '$1'
      }
    ]
  }
})
