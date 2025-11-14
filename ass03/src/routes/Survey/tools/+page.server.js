// +page.server.js
import crypto from 'crypto';
import { getToolsRecords, createToolsRecord, resetToolsRecords } from '$lib/server/database.js';
import { fail } from '@sveltejs/kit';

export function load({ cookies }) {
  let userid = cookies.get('userid');
  if (!userid) {
    userid = crypto.randomUUID();
    cookies.set('userid', userid, { path: '/' });
  }

  const toolsRecords = getToolsRecords(userid); 
  return { toolsRecords, userid };
}

export const actions = {
  submit: async ({ cookies, request }) => {
    const userid = cookies.get('userid');
    const formData = await request.formData();

    const q1 = formData.get('q1')?.trim() || '';
    const q2 = formData.get('q2')?.trim() || '';
    const q3 = formData.get('q3')?.trim() || '';
    const q4 = formData.get('q4')?.trim() || '';
    const q5 = formData.get('q5')?.trim() || '';

    try {
      await createToolsRecord(userid, { q1, q2, q3, q4, q5 });
    } catch (error) {
      return fail(500, {
        error: error.message
      });
    }
  },

  reset: async ({ cookies }) => {
    const userid = cookies.get('userid');
    resetToolsRecords(userid);
  }
};
