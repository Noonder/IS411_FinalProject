// +page.server.js
import crypto from 'crypto';
import {
  getPostRecords,
  createPostRecord,
  resetPostRecords
} from '$lib/server/database.js';
import { fail } from '@sveltejs/kit';

export function load({ cookies }) {
  let userid = cookies.get('userid');
  if (!userid) {
    userid = crypto.randomUUID();
    cookies.set('userid', userid, { path: '/' });
  }

  const storageRecords = getPostRecords(userid);
  return { storageRecords, userid };
}

export const actions = {
  submit: async ({ cookies, request }) => {
    const userid = cookies.get('userid');
    const formData = await request.formData();
    const q1 = formData.get('q1')?.trim() || '';

    try {
      createPostRecord(userid, { q1 });
    } catch (error) {
      return fail(500, { error: error.message });
    }
  },

  reset: async ({ cookies }) => {
    const userid = cookies.get('userid');
    resetPostRecords(userid);
  }
};
