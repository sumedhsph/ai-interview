import { describe, it, expect } from 'vitest'

describe('Sanity Check', () => {
  it('should pass - app is alive', () => {
    expect(true).toBe(true)
  })

  it('math should work', () => {
    expect(2 + 2).toBe(4)
  })
})