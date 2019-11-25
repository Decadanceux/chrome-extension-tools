import { RollupOptions } from 'rollup'

import {
  manifestInput,
  ManifestInputPlugin,
  ManifestInputPluginCache,
} from '..'
import { context as minContext } from '../../../__fixtures__/minimal-plugin-context'
import {
  manifestJson,
  contentCss,
} from '../../../__fixtures__/basic-paths'
import { context } from '../../../__fixtures__/plugin-context'

const options: RollupOptions = {
  input: manifestJson,
}

let cache: ManifestInputPluginCache
let plugin: ManifestInputPlugin
beforeEach(async () => {
  cache = {
    assets: [],
    permsHash: '',
    srcDir: null,
    input: [],
    readFile: new Map(),
  }
  plugin = manifestInput({ cache })

  const opts = plugin.options.call(minContext, options)
  await plugin.buildStart.call(context, opts!)

  jest.clearAllMocks()
})

test('dumps manifest if id is manifest', () => {
  expect(cache.manifest).toBeDefined()
  
  plugin.watchChange(manifestJson)

  expect(cache.manifest).toBeUndefined()
})

test('dumps asset cache in readFile if asset changes', () => {
  expect(cache.readFile.has(contentCss)).toBe(true)

  plugin.watchChange(contentCss)

  expect(cache.readFile.has(contentCss)).toBe(false)
})
