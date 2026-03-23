const request = require('supertest');
const app = require('../index');

describe('Electricity API Comprehensive Test Suite', () => {

  // API 1: Total electricity usages for each year
  it('API 1 (valid): should return total usage by year', async () => {
    const res = await request(app).get('/api/usage/total-by-year');

    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe('object');
  });

  it('API 1 (invalid): should return 404 for wrong endpoint', async () => {
    const res = await request(app).get('/api/usage/totalyear');

    expect(res.statusCode).toBe(404);
  });


  // API 2: Total electricity users for each year
  it('API 2 (valid): should return total users by year', async () => {
    const res = await request(app).get('/api/users/total-by-year');

    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe('object');
  });

  it('API 2 (invalid): should return 404 for wrong endpoint', async () => {
    const res = await request(app).get('/api/users/totalyear');

    expect(res.statusCode).toBe(404);
  });


  // API 3: Usage of specific province by specific year
  it('API 3 (valid): should return usage data or not found', async () => {
    const res = await request(app).get('/api/usage/Bangkok/2020');

    expect(res.statusCode).toBe(200);
  });

  it('API 3 (invalid): should return Data not found', async () => {
    const res = await request(app).get('/api/usage/InvalidProvince/9999');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });


  // API 4: Users of specific province by specific year
  it('API 4 (valid): should return users data or not found', async () => {
    const res = await request(app).get('/api/users/Bangkok/2020');

    expect(res.statusCode).toBe(200);
  });

  it('API 4 (invalid): should return Data not found', async () => {
    const res = await request(app).get('/api/users/InvalidProvince/9999');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });


  // API 5: Usage history by specific province
  it('API 5 (valid): should return usage history array', async () => {
    const res = await request(app).get('/api/usage-history/history/Bangkok');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('API 5 (invalid): should return empty array for unknown province', async () => {
    const res = await request(app).get('/api/usage-history/history/InvalidProvince');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });


  // API 6: User history by specific province
  it('API 6 (valid): should return users history array', async () => {
    const res = await request(app).get('/api/users-history/history/Bangkok');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('API 6 (invalid): should return empty array for unknown province', async () => {
    const res = await request(app).get('/api/users-history/history/InvalidProvince');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });


  // Error Handling Test (global)
  it('Error: should return 404 for unknown route', async () => {
    const res = await request(app).get('/api/unknown-route');

    expect(res.statusCode).toBe(404);
  });

});