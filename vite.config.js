import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
import { createRequire } from 'node:module';
const require = createRequire( import.meta.url );
export default defineConfig( {
  base: /family-tree/,
  plugins: [
    vue(),
    ckeditor5( { theme: require.resolve( '@ckeditor/ckeditor5-theme-lark' ) } )
  ]
} )