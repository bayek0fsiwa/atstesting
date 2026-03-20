import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 4 : 2,
  reporter: [
    ['html', { outputFolder: 'reports' }]
  ],
  expect: { timeout: 10000, },
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    viewport: null,
    launchOptions: { args: ['--start-maximized', '--force-device-scale-factor=1.0'] },
    actionTimeout: 10000,
    navigationTimeout: 15000,
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
        viewport: null,
        deviceScaleFactor: undefined,
      },
      dependencies: ['setup'],
    },
    {
      name: 'e2e-firefox',
      testDir: './tests/e2e',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/authState.json',
        viewport: null,
        deviceScaleFactor: undefined,
      },
      dependencies: ['setup'],
    },
    {
      name: 'functional-chromium',
      testDir: './tests/functional',
      use: {
        ...devices['Desktop Chrome'],
        viewport: null,
        deviceScaleFactor: undefined,
      },
    },
  ],
});
