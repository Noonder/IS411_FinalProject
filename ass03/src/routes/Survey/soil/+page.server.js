import crypto from 'crypto';
import { getSoilRecords, createSoilRecord, resetSoilRecords } from '$lib/server/database.js';
import { fail } from '@sveltejs/kit';

export function load({ cookies }) {
  let userid = cookies.get('userid');
  if (!userid) {
    userid = crypto.randomUUID();
    cookies.set('userid', userid, { path: '/' });
  }

  const soilRecords = getSoilRecords(userid);
  return { soilRecords, userid };
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
    const q6File = formData.get('q6'); // file


    try {
      await createSoilRecord(userid, {
        q1,
        q2,
        q3,
        q4,
        q5,
        q6FileName: q6File.name,
        q6FileType: q6File.type,
      });
    } catch (error) {
      return fail(500, { error: err.message });
    }
  },

  reset: async ({ cookies }) => {
    const userid = cookies.get('userid');
    resetSoilRecords(userid);
  }
};
