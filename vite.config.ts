import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    //   关闭文件计算
    reportCompressedSize: false,
    //   关闭生成map文件 可以达到缩小打包体积
    sourcemap: false, // 这个生产环境一定要关闭，不然打包的产物会很大
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js', // 产生的 chunk 自定义命名
        entryFileNames: 'assets/js/[name]-[hash].js', // 指定 chunks 的入口文件匹配模式
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]', // 自定义构建结果中的静态资源名称, 资源文件像 字体, 图片等
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dirs: ['public'],
      resolvers: [ElementPlusResolver()]
    }),
    viteCompression({
      verbose: true,
      disable: false,
      algorithm: 'brotliCompress',
      ext: '.gz'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8001',
        changeOrigin: true
      }
    }
  }
})
