import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { spawn, ChildProcess } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

describe('PHP API Integration Tests', () => {
  let phpServer: ChildProcess;
  const PORT = 8081;
  const BASE_URL = `http://127.0.0.1:${PORT}`;
  const configPath = path.resolve(process.cwd(), 'public/config.php');
  let configCreated = false;

  beforeAll(async () => {
    // Diamond Tier: Handle missing config.php in CI
    if (!fs.existsSync(configPath)) {
      const dummyConfig = `<?php
        $smtp_host = 'localhost';
        $smtp_port = 1025;
        $smtp_user = 'test@example.com';
        $smtp_pass = 'test';
      ?>`;
      fs.writeFileSync(configPath, dummyConfig);
      configCreated = true;
    }

    // Start temporary PHP server bound to 127.0.0.1
    const publicPath = path.resolve(process.cwd(), 'public');
    phpServer = spawn('php', ['-S', `127.0.0.1:${PORT}`, '-t', publicPath], {
      env: { ...process.env, SMTP_DRY_RUN: 'true' },
      shell: true,
    });

    // Wait for server to be ready
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });

  afterAll(() => {
    if (phpServer) phpServer.kill();
    // Cleanup dummy config if we created it
    if (configCreated && fs.existsSync(configPath)) {
      fs.unlinkSync(configPath);
    }
  });

  it('mail.php should reject GET requests with 405', async () => {
    const response = await fetch(`${BASE_URL}/mail.php`);
    expect(response.status).toBe(405);
    const data = await response.json();
    expect(data.status).toBe('error');
  });

  it('mail.php should handle OPTIONS requests with 200', async () => {
    const response = await fetch(`${BASE_URL}/mail.php`, {
      method: 'OPTIONS',
    });
    expect(response.status).toBe(200);
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

  it('mail.php should process a valid FormData POST request and return success', async () => {
    const formData = new FormData();
    formData.append('name', 'Tester');
    formData.append('email', 'test@example.com');
    formData.append('message', 'Hello World');

    const response = await fetch(`${BASE_URL}/mail.php`, {
      method: 'POST',
      body: formData,
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.status).toBe('success');
  });

  it('mail.php should process a valid JSON POST request and return success', async () => {
    const payload = {
      name: 'Felipe de Jesus Miramontes Romero',
      company: 'MIRF870903MK5',
      email: 'felipemiramontesr@gmail.com',
      phone: '4481117977',
      message: 'Info',
      consent: true,
    };

    const response = await fetch(`${BASE_URL}/mail.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.status).toBe('success');
  });

  it('mail.php should reject missing required fields in JSON with 400', async () => {
    const payload = {
      name: 'Tester',
      // missing email & message
    };

    const response = await fetch(`${BASE_URL}/mail.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.status).toBe('error');
    expect(data.message).toBe('Missing required fields');
  });

  it('mail.php should reject invalid email in JSON with 400', async () => {
    const payload = {
      name: 'Tester',
      email: 'not-an-email',
      message: 'Hello',
    };

    const response = await fetch(`${BASE_URL}/mail.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.status).toBe('error');
    expect(data.message).toBe('Invalid email address');
  });
});
