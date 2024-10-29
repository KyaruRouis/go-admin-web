import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import path from 'path'


function resolve(dir) {
  return path.join(__dirname,'.', dir)
}

// https://vitejs.dev/config/



export default defineConfig({
    envDir: "./viteenv", // 使用相对路径
  plugins: [vue(),
  // 使用svg图标
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      })
  ],
    //设置别名
    resolve: {
      alias: {
          "@": path.resolve('./src'),
      }
    }
})
