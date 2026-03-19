import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['html', { outputFolder: 'reports' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      teardown: 'teardown-project',
    },
    {
      name: 'teardown-project',
      testMatch: /.*teardown\.setup\.ts/,
    },
    {
      name: 'e2e-chromium',
      testDir: './tests/e2e',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/authState.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'e2e-firefox',
      testDir: './tests/e2e',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/authState.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'functional-chromium',
      testDir: './tests/functional',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
