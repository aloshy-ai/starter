import { GET, OPTIONS } from './route'

describe('GET /api/user', () => {
  it('should return a 200 status and the correct response body', async () => {
    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({ name: 'John Doe' })
  })

  it('should return correct OPTIONS response', async () => {
    const response = await OPTIONS()

    expect(response.status).toBe(204)
    expect(response.headers.get('Allow')).toBe('GET')
  })
})
