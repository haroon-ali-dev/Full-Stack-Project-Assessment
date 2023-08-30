const request = require('supertest');
const db = require('../../../client/cypress/db');
const util = require('../util');

const baseUrl = 'http://localhost:3001';
let token;
let userId = 1;

describe('/api/videos', () => {
    beforeAll(async () => {
        token = await util.getToken();
    });

    beforeEach(async () => {
        await db.seed();
    });

    afterAll(async () => {
        db.pool.end();
    });

    it('should get videos', async () => {
        const response = await request(baseUrl)
            .get(`/api/videos/user/${userId}`)
            .set('x-auth-token', token);

        expect(response.body.videos[0]).toHaveProperty('video_id', 'NQ-2eJvakBo');
    });

    it('should create a video', async () => {
        const response = await request(baseUrl)
            .post(`/api/videos`)
            .set('x-auth-token', token)
            .send({ userId, url: 'https://www.youtube.com/watch?v=UEDupMZQ_ao' });

        expect(response.body).toHaveProperty('author', 'VanossGaming');
    });
});