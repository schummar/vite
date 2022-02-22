import { resolveLibFilename } from '../build'
import { resolve } from 'path'
import type { LibraryOptions } from '..'

describe('resolveLibFilename', () => {
  test('custom filename function', () => {
    const filename = resolveLibFilename(
      {
        fileName: (format) => `custom-filename-function.${format}.js`,
        entry: 'mylib.js'
      },
      'es',
      'mylib',
      resolve(__dirname, 'packages/name')
    )

    expect(filename).toBe('custom-filename-function.es.js')
  })

  test('custom filename string', () => {
    const filename = resolveLibFilename(
      {
        fileName: 'custom-filename',
        entry: 'mylib.js'
      },
      'es',
      'mylib',
      resolve(__dirname, 'packages/name')
    )

    expect(filename).toBe('custom-filename.es.js')
  })

  test('package name as filename', () => {
    const filename = resolveLibFilename(
      {
        entry: 'mylib.js'
      },
      'es',
      'mylib',
      resolve(__dirname, 'packages/name')
    )

    expect(filename).toBe('mylib.es.js')
  })

  test('custom filename and no package name', () => {
    const filename = resolveLibFilename(
      {
        fileName: 'custom-filename',
        entry: 'mylib.js'
      },
      'es',
      'mylib',
      resolve(__dirname, 'packages/noname')
    )

    expect(filename).toBe('custom-filename.es.js')
  })

  test('missing filename', () => {
    expect(() => {
      resolveLibFilename(
        {
          entry: 'mylib.js'
        },
        'es',
        'mylib',
        resolve(__dirname, 'packages/noname')
      )
    }).toThrow()
  })

  test('multiple entries with aliases', () => {
    const libOptions: LibraryOptions = {
      entry: {
        entryA: 'entryA.js',
        entryB: 'entryB.js'
      }
    }

    const [fileName1, fileName2] = ['entryA', 'entryB'].map((entryAlias) =>
      resolveLibFilename(
        libOptions,
        'es',
        entryAlias,
        resolve(__dirname, 'packages/name')
      )
    )

    expect(fileName1).toBe('entryA.es.js')
    expect(fileName2).toBe('entryB.es.js')
  })

  test('multiple entries with aliases: custom filename function', () => {
    const libOptions: LibraryOptions = {
      entry: {
        entryA: 'entryA.js',
        entryB: 'entryB.js'
      },
      fileName: (format, entryAlias) =>
        `custom-filename-function.${entryAlias}.${format}.js`
    }

    const [fileName1, fileName2] = ['entryA', 'entryB'].map((entryAlias) =>
      resolveLibFilename(
        libOptions,
        'es',
        entryAlias,
        resolve(__dirname, 'packages/name')
      )
    )

    expect(fileName1).toBe('custom-filename-function.entryA.es.js')
    expect(fileName2).toBe('custom-filename-function.entryB.es.js')
  })

  test('multiple entries with aliases: custom filename string', () => {
    const libOptions: LibraryOptions = {
      entry: {
        entryA: 'entryA.js',
        entryB: 'entryB.js'
      },
      fileName: 'custom-filename'
    }

    const [fileName1, fileName2] = ['entryA', 'entryB'].map((entryAlias) =>
      resolveLibFilename(
        libOptions,
        'es',
        entryAlias,
        resolve(__dirname, 'packages/name')
      )
    )

    expect(fileName1).toBe('custom-filename.es.js')
    expect(fileName2).toBe('custom-filename.es.js')
  })

  test('multiple entries as array', () => {
    const libOptions: LibraryOptions = {
      entry: ['entryA.js', 'entryB.js']
    }

    const [fileName1, fileName2] = ['entryA', 'entryB'].map((entryAlias) =>
      resolveLibFilename(
        libOptions,
        'es',
        entryAlias,
        resolve(__dirname, 'packages/name')
      )
    )

    expect(fileName1).toBe('entryA.es.js')
    expect(fileName2).toBe('entryB.es.js')
  })

  test('multiple entries as array: custom filename function', () => {
    const libOptions: LibraryOptions = {
      entry: ['entryA.js', 'entryB.js'],
      fileName: (format, entryAlias) =>
        `custom-filename-function.${entryAlias}.${format}.js`
    }

    const [fileName1, fileName2] = ['entryA', 'entryB'].map((entryAlias) =>
      resolveLibFilename(
        libOptions,
        'es',
        entryAlias,
        resolve(__dirname, 'packages/name')
      )
    )

    expect(fileName1).toBe('custom-filename-function.entryA.es.js')
    expect(fileName2).toBe('custom-filename-function.entryB.es.js')
  })

  test('multiple entries as array: custom filename string', () => {
    const libOptions: LibraryOptions = {
      entry: ['entryA.js', 'entryB.js'],
      fileName: 'custom-filename'
    }

    const [fileName1, fileName2] = ['entryA', 'entryB'].map((entryAlias) =>
      resolveLibFilename(
        libOptions,
        'es',
        entryAlias,
        resolve(__dirname, 'packages/name')
      )
    )

    expect(fileName1).toBe('custom-filename.es.js')
    expect(fileName2).toBe('custom-filename.es.js')
  })
})
