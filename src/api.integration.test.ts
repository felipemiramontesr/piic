import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { spawn, ChildProcess } from 'node:child_process';
import path from 'node:path';

describe('PHP API Integration Tests', () => {
    let phpServer: ChildProcess;
    const PORT = 8081;
    const BASE_URL = `http://localhost:${PORT}`;

    beforeAll(async () => {
        // Start temporary PHP server
        const publicPath = path.resolve(process.cwd(), 'public');
        phpServer = spawn('php', ['-S', `localhost:${PORT}`, '-t', publicPath], {
            env: { ...process.env, SMTP_DRY_RUN: 'true' },
            shell: true
        });

        // Wait for server to be ready
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    afterAll(() => {
        if (phpServer) phpServer.kill();
    });

    it('mail.php should reject GET requests with 405', async () => {
        const response = await fetch(`${BASE_URL}/mail.php`);
        expect(response.status).toBe(405);
        const data = await response.json();
        expect(data.status).toBe('error');
    });

    it('oil_mail.php should reject GET requests with 405', async () => {
        const response = await fetch(`${BASE_URL}/oil_mail.php`);
        expect(response.status).toBe(405);
    });

    it('oil_mail.php should process a valid POST request and return success', async () => {
        const formData = new FormData();
        formData.append('company_name', 'Test Corp');
        formData.append('contact_name', 'Integration Test');
        formData.append('email', 'test@example.com');
        formData.append('oil_amount', '100');
        formData.append('container_type[]', 'Tanque');

        const response = await fetch(`${BASE_URL}/oil_mail.php`, {
            method: 'POST',
            body: formData,
        });

        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data.status).toBe('success');
    });
});
