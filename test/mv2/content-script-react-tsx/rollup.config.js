import { chromeExtension } from '$src'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import path from 'path'

const outDir = path.join(__dirname, 'dist')
export default {
  input: [path.join(__dirname, 'src', 'manifest.json')],
  output: {
    dir: outDir,
    format: 'esm',
    chunkFileNames: 'chunks/[name]-[hash].js',
  },
  plugins: [
    chromeExtension(),
    resolve(),
    commonjs(),
    typescript({ outDir, sourceMap: false }),
  ],
}
