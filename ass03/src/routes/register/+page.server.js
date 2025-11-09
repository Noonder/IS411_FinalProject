import { register } from '$lib/server/db.js';
import bcrypt from 'bcrypt';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  register: async ({ request }) => {
    const data = Object.fromEntries(await request.formData());

    // Validate basic fields
    const errors = {};
    if (!data.userType) errors.userType = 'โปรดเลือกประเภทผู้ใช้งาน';
    if (!data.email) errors.email = 'โปรดกรอกอีเมล';
    if (!data.password) errors.password = 'โปรดกรอกรหัสผ่าน';
    if (data.password !== data.confirmPassword) errors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
    if (!data.firstname) errors.firstname = 'โปรดกรอกชื่อ';
    // @ts-ignore
    if (!data.idcard || !/^\d{13}$/.test(data.idcard)) errors.idcard = 'กรุณากรอกเลขบัตร 13 หลัก';
    // @ts-ignore
    if (!data.phone || !/^\d{10}$/.test(data.phone)) errors.phone = 'กรุณากรอกเบอร์โทร';

    if (Object.keys(errors).length > 0) {
      return fail(400, { errors, data });
    }


    // @ts-ignore
    const userId = register({
      userType: data.userType,
      email: data.email,
      password: data.password,
      prefix: data.prefix,
      firstname: data.firstname,
      lastname: data.lastname,
      idcard: data.idcard,
      phone: data.phone,
      durianType: data.durianType || '',
      durianOther: data.durianOther || ''
    });

    if (!userId) {
      return fail(500, { errors: { email: 'มีอีเมลนี้ในระบบแล้ว' }, data });
    }

    return { success: true, userId };
  },

  login: async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
    // @ts-ignore
    const user = login(data.email, data.password);

    if (!user) {
      return fail(400, { error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }

    // สามารถสร้าง session หรือ cookie ที่นี่
    throw redirect(303, '/dashboard'); // เปลี่ยน path เป็นหน้า dashboard ของคุณ
  }
};