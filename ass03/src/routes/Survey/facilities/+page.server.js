// +page.server.js
import crypto from 'crypto';
import { fail } from '@sveltejs/kit';
import { 
  getFacilitiesRecords, 
  createFacilitiesRecord, 
  resetFacilitiesRecords 
} from '$lib/server/database.js';

export function load({ cookies }) {
  let userid = cookies.get('userid');
  if (!userid) {
    userid = crypto.randomUUID();
    cookies.set('userid', userid, { path: '/' });
  }

  const facilitiesRecords = getFacilitiesRecords(userid);
  return { facilitiesRecords, userid };
}

export const actions = {
  submit: async ({ request, cookies }) => {
    const userid = cookies.get('userid');
    const data = await request.formData();

    const record = {
      q1: data.get('q1'),
      q2: data.get('q2'),
      q3: data.get('q3'),
      q4: data.get('q4'),
      q5: data.get('q5'),
      q6: data.get('q6'),
      q7: data.get('q7'),
      q8: data.get('q8'),
    };

    try {
      createFacilitiesRecord(userid, record);
    } catch (error) {
      return fail(500, { error: error.message });
    }
  },

  reset: async ({ cookies }) => {
    const userid = cookies.get('userid');
    resetFacilitiesRecords(userid);
      
    }
  
};
