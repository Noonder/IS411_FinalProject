// +page.server.js
import crypto from 'crypto';
import {
  getHarvestRecords,
  createHarvestRecord,
  resetHarvestRecords
} from '$lib/server/database.js';
import { fail } from '@sveltejs/kit';

export function load({ cookies }) {
  let userid = cookies.get('userid');
  if (!userid) {
    userid = crypto.randomUUID();
    cookies.set('userid', userid, { path: '/' });
  }

  const harvestRecords = getHarvestRecords(userid);
  return { harvestRecords, userid };
}

export const actions = {
  submit: async ({ cookies, request }) => {
    const userid = cookies.get('userid');
    const formData = await request.formData();

    const record = {
      q1: formData.get('q1')?.trim() || '',
      q2: formData.get('q2')?.trim() || '',
      q3: formData.get('q3')?.trim() || '',
      q4: formData.get('q4')?.trim() || '',
    };


    try {
      createHarvestRecord(userid, record);
    } catch (error) {
      return fail(500, { error: error.message });
    }
  },

  reset: async ({ cookies }) => {
    const userid = cookies.get('userid');
    resetHarvestRecords(userid);
  }
};
