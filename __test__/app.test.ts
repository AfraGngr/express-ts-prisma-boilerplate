import request from 'supertest';
import { app } from '../src/app';

const req = request(app);

describe('TEST', () => {
    it('should return message successfully', async () => {
        const res = await req.get('/');
        expect(res.body.message).toBe('Haloooo !');
    });
});
