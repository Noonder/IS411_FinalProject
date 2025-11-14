import { createPersonal, getPersonal } from '$lib/server/database.js';

export const actions = {
  submit: async ({ request, cookies }) => {
    const userid = cookies.get('userid');
    const data = await request.formData();

    const record = {
      user_type: data.get('user_type'),
      email: data.get('email'),
      prefix: data.get('prefix'),
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      id_number: data.get('id_number'),
      idcard_file: data.get('idcard_file'),
      birthday: data.get('birthday'),
      address: data.get('address'),
      phone_number: data.get('phone_number')
    };


    return { personal: record };
  }
};
