import { test as teardown } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const authFile = path.join(process.cwd(), 'playwright/.auth/authState.json');

teardown('Global Cleanup: Delete Auth State and Test Data', async ({ request }) => {
    console.log('🧹 Teardown start ho raha hai...');
    try {
        const response = await request.post(`${process.env.BASE_URL}/api/auth/sign-out`);
        if (response.ok()) {
            console.log('✅ Server session invalidated (Signed out).');
        } else {
            console.log('⚠️ Could not sign out from server. Maybe session already expired.');
        }
    } catch (error) {
        console.log('⚠️ Error hitting sign-out API:', error);
    }

    if (fs.existsSync(authFile)) {
        fs.unlinkSync(authFile);
        console.log(`🗑️ Local auth state file deleted: ${authFile}`);
    } else {
        console.log('ℹ️ Auth state file not found, skipping local cleanup.');
    }

    console.log('🏁 Teardown complete.');
});