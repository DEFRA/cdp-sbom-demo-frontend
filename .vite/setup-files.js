import { vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'
import '@testing-library/jest-dom/vitest'
import { toMatchFileWithOptions } from '../test-helpers/to-match-file.js'

const fetchMock = createFetchMock(vi)

// Stub scroll functions not available in JSDOM
Element.prototype.scrollIntoView = vi.fn()
Element.prototype.scroll = vi.fn()

fetchMock.enableMocks()
global.fetch = fetchMock

expect.extend({ toMatchFile: toMatchFileWithOptions })

vi.mock('ioredis')
