// +page.server.js
import crypto from 'crypto';
import {
  getFertilizerRecords,
  createFertilizerRecord,
  resetFertilizerRecords
} from '$lib/server/database.js';
import { fail } from '@sveltejs/kit';

export function load({ cookies }) {
  let userid = cookies.get('userid');
  if (!userid) {
    userid = crypto.randomUUID();
    cookies.set('userid', userid, { path: '/' });
  }

  const fertilizerRecords = getFertilizerRecords(userid);
  return { fertilizerRecords, userid };
}

export const actions = {
  submit: async ({ cookies, request }) => {
    const userid = cookies.get('userid');
    const formData = await request.formData();

    const record = {
      q1: formData.get('q1') || '',
      q2: formData.get('q2') || '',
      q3Name: formData.get('q3') ? formData.get('q3').name : '',
      q4: formData.get('q4')?.trim() || '',
      q5: formData.get('q5') || '',
      q6: formData.get('q6') || '',
    };


    try {
      createFertilizerRecord(userid, record);
    } catch (error) {
      return fail(500, { error: error.message });
    }
  },

  reset: async ({ cookies }) => {
    const userid = cookies.get('userid');
    resetFertilizerRecords(userid);
  }
};
