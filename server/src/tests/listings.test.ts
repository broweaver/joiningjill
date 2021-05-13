import app from '../app'
import supertest from 'supertest'
import cache from './../cache/redis'

const api = supertest(app)

describe('listings tests', () => {
  test('listings are returned', async () => {
    await api
      .get('/listings')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('listings contain expected fields', async () => {
    const response = await api
      .get('/listings')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    for (let i = 0; i < response.length; i++) {
      const listing = response[i]
      expect(listing).toHaveProperty('listing_id')
      expect(listing).toHaveProperty('state')
      expect(listing).toHaveProperty('title')
      expect(listing).toHaveProperty('description')
      expect(listing).toHaveProperty('price')
      expect(listing).toHaveProperty('currency_code')
      expect(listing).toHaveProperty('quantity')
      expect(listing).toHaveProperty('tags')
      expect(listing).toHaveProperty('materials')
      expect(listing).toHaveProperty('url')
      expect(listing).toHaveProperty('item_weight')
      expect(listing).toHaveProperty('item_weight_unit')
      expect(listing).toHaveProperty('item_length')
      expect(listing).toHaveProperty('item_width')
      expect(listing).toHaveProperty('item_height')
      expect(listing).toHaveProperty('item_dimensions_unit')
    }
  })

  test('listings contain images', async () => {
    const response = await api
      .get('/listings')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    for (let i = 0; i < response.length; i++) {
      const listing = response[i]
      expect(listing).toHaveProperty('Images')
      const images = response[i].Images
      for (let f = 0; f < images.length; f++) {
        const image = images[f]
        expect(image).toHaveProperty('url_570xN')
        expect(image).toHaveProperty('url_fullxfull')
      }
    }
  })
})

// After all tests are completed make sure we close the connection to redis
afterAll(done => {
  cache.disconnect()
  done()
})
