import { request } from '@playwright/test';

export async function getApiClient() {
    return await request.newContext({
        baseURL: process.env.API_BASE_URL,
        extraHTTPHeaders: {
            Authorization: `Bearer ${process.env.API_TOKEN}`
        }
    });
}