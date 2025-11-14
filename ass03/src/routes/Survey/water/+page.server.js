import crypto from 'crypto';
import { getWaterRecords, createWaterRecord, resetWaterRecords } from '$lib/server/database.js';
import { fail } from '@sveltejs/kit';

export function load({ cookies }) {
  let userid = cookies.get('userid');
  if (!userid) {
    userid = crypto.randomUUID();
    cookies.set('userid', userid, { path: '/' });
  }

  const waterRecords = getWaterRecords(userid);
  return { waterRecords, userid };
}

export const actions = {
  submit: async ({ cookies, request }) => {
    const userid = cookies.get('userid'); 
    const formData = await request.formData();

    const q1 = formData.get('q1')?.trim() || '';
    
    const q1Other = formData.get('q1Other')?.trim() || '';
    const q2 = formData.get('q2')?.trim() || '';
    const q3 = formData.get('q3'); // file
    const q4 = formData.get('q4')?.trim() || '';

    try {
      await createWaterRecord(userid, { q1, q1Other, q2, q3Name: q3.name, q4 });
    } catch (error) {
      return fail(500, {
        error: error.message
      });
    }
  },

  reset: async ({ cookies }) => {
    const userid = cookies.get('userid');
    resetWaterRecords(userid);
    
  }
};
