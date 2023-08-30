const request = require('supertest');
const db = require('../../../client/cypress/db');

const baseUrl = 'http://localhost:3001';

describe('/api/register', () => {
    // beforeAll(async () => {
    //     await db.mongoose.connect("mongodb://127.0.0.1:27017/crm");
    // });

    beforeEach(async () => {
        await db.seed();
    });

    afterAll(async () => {
        db.pool.end();
    });

    it('should respond with 400 if password is missing', async () => {
        const response = await request(baseUrl)
            .post('/api/register')
            .send({ email: 'haroon@gmail.com' });

        expect(response.status).toBe(400);
    });
});