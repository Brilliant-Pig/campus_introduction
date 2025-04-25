import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src', 
    },
  },
  //绕过跨域规则
  server: {
    host: '0.0.0.0',  // 允许外部访问（如局域网设备）
    port: 8080,       // 自定义端口
    strictPort: true ,
    proxy: {
      '/oss': {
        target: 'https://introduction-video.oss-cn-shenzhen.aliyuncs.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/oss/, '')
      },
      '/api': {
        target: 'http://10.5.21.234:33001', // Express后端地址
        changeOrigin: true
      }
    }
  }
})
