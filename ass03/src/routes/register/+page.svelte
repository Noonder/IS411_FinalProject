<script>
// @ts-nocheck
import { enhance } from '$app/forms';

let registerForm = {
  userType: '',
  email: '',
  password: '',
  confirmPassword: '',
  prefix: '',
  firstname: '',
  lastname: '',
  idcard: '',
  phone: '',
  durianOther: ''
};

let durianType = '';
let errors = {};
const prefixes = ['นาย', 'นาง', 'นางสาว'];

// Validation Step1
function validateStep1() {
  errors = {};
  if (!registerForm.userType) errors.userType = "*โปรดเลือกประเภทผู้ใช้งาน";
  if (!registerForm.email) errors.email = "*โปรดกรอกอีเมล";
  if (!registerForm.password) errors.password = "*โปรดกรอกรหัสผ่าน";
  if (registerForm.password !== registerForm.confirmPassword) errors.confirmPassword = "*รหัสผ่านไม่ตรงกัน";
  if (!registerForm.firstname) errors.firstname = "*โปรดกรอกชื่อ";
  if (!registerForm.idcard || !/^\d{13}$/.test(registerForm.idcard)) errors.idcard = "*กรุณากรอกเลขบัตร 13 หลัก";
  if (!registerForm.phone || !/^\d{10}$/.test(registerForm.phone)) errors.phone = "*กรุณากรอกเบอร์โทร";
  return Object.keys(errors).length === 0;
}

// Validation Step2
function validateStep2() {
  errors = {};
  if (!durianType) errors.durianType = "*โปรดเลือกพันธุ์ทุเรียน";
  if (durianType === 'อื่นๆ' && !registerForm.durianOther.trim()) errors.durianOther = "โปรดระบุพันธุ์อื่นๆ";
  return Object.keys(errors).length === 0;
}

// Handle Step1 Submit
function handleStep1({ result }) {
  if (result.type === 'success') {
    alert('Step 1 สำเร็จ! ไปขั้นตอนต่อไป');
  } else {
    alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล Step1');
  }
}

// Handle Step2 Submit
function handleStep2({ result }) {
  if (result.type === 'success') {
    alert('สมัครสมาชิกสำเร็จ!');
    window.location.href = '/login';
  } else {
    alert('เกิดข้อผิดพลาดในการสมัครสมาชิก Step2');
  }
}
</script>

<!-- Step 1 Form -->
<form method="POST" use:enhance={{ result: handleStep1 }} class="register">
  <h1>ลงทะเบียนบัญชีผู้ใช้</h1>
  <div class="card">
    <h2>ข้อมูลส่วนตัว</h2>

    <div class="field">
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <label>ประเภทผู้ใช้</label>
      {#if errors.userType}<div class="error">{errors.userType}</div>{/if}
      <div class="user-type">
        <button type="button" class="option {registerForm.userType==='เกษตรกร'?'active':''}" on:click={() => registerForm.userType='เกษตรกร'}>เกษตรกร</button>
        <button type="button" class="option {registerForm.userType==='นิติบุคคล'?'active':''}" on:click={() => registerForm.userType='นิติบุคคล'}>นิติบุคคล</button>
      </div>
    </div>

    <div class="field">
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <label>อีเมล</label>
      {#if errors.email}<div class="error">{errors.email}</div>{/if}
      <input type="email" name="email" bind:value={registerForm.email} />
    </div>

    <div class="field">
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <label>รหัสผ่าน</label>
      {#if errors.password}<div class="error">{errors.password}</div>{/if}
      <input type="password" name="password" bind:value={registerForm.password} />
    </div>

    <div class="field">
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <label>ยืนยันรหัสผ่าน</label>
      {#if errors.confirmPassword}<div class="error">{errors.confirmPassword}</div>{/if}
      <input type="password" name="confirmPassword" bind:value={registerForm.confirmPassword} />
    </div>

    <!-- svelte-ignore a11y_label_has_associated_control -->
    <div class="field">
      <label>คำนำหน้า</label>
      <select name="prefix" bind:value={registerForm.prefix}>
        <option value="">-- เลือก --</option>
        {#each prefixes as p}
          <option value={p}>{p}</option>
        {/each}
      </select>
    </div>

    <div class="field">
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <label>ชื่อ</label>
      {#if errors.firstname}<div class="error">{errors.firstname}</div>{/if}
      <input type="text" name="firstname" bind:value={registerForm.firstname} />
    </div>

    <div class="field">
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <label>นามสกุล</label>
      <input type="text" name="lastname" bind:value={registerForm.lastname} />
    </div>

    <div class="field">
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <label>หมายเลขบัตรประชาชน</label>
      {#if errors.idcard}<div class="error">{errors.idcard}</div>{/if}
      <input type="text" name="idcard" maxlength="13" bind:value={registerForm.idcard} />
    </div>

    <div class="field">
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <label>เบอร์โทรศัพท์</label>
      {#if errors.phone}<div class="error">{errors.phone}</div>{/if}
      <input type="text" name="phone" bind:value={registerForm.phone} />
    </div>

    <div class="btn-group">
      <button type="submit" on:click={(e) => { if(!validateStep1()) e.preventDefault(); }}>ถัดไป</button>
    </div>
  </div>
</form>

<!-- Step 2 Form -->
<form method="POST" use:enhance={{ result: handleStep2 }} class="register">
  <h2>ข้อมูลพันธุ์ทุเรียน</h2>
  <div class="card">
    {#each ['หมอนทอง','ก้านยาว','ชะนี','หลงลับแล','กระดุมทอง','พวงมณี','อื่นๆ'] as type}
      <label class="radio">
        <input type="radio" bind:group={durianType} value={type} />
        <span>{type}</span>
      </label>
    {/each}

    {#if errors.durianType}<div class="error">{errors.durianType}</div>{/if}

    {#if durianType==='อื่นๆ'}
      <div class="field">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label>ระบุพันธุ์อื่นๆ</label>
        <input type="text" bind:value={registerForm.durianOther} />
        {#if errors.durianOther}<div class="error">{errors.durianOther}</div>{/if}
      </div>
    {/if}

    <div class="btn-group">
      <button type="submit" on:click={(e) => { if(!validateStep2()) e.preventDefault(); }}>ยืนยัน</button>
    </div>
  </div>
</form>

<style>
.register {
  font-family: 'Prompt', sans-serif;
  max-width: 600px;
  margin: 20px auto;
}

h1 {
  color: #010b05;
  margin-bottom: 16px;
  text-align: center;
  font-size: 1.8rem;
}

h2 {
  font-weight: 700;
  font-size: 1.4rem;
  color: #14532d;
  margin-bottom: 16px;
}

.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.field {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

label {
  width: 180px;
  font-weight: 600;
  color: #374151;
}

input, select {
  flex: 1;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 1rem;
}

button {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background-color: #f1f6f3;
  color: #140e0e;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

button:hover {
  background-color: #e0ebdf;
}

.btn-group {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
}

.error {
  color: #b91c1c;
  font-size: 0.9rem;
  margin-top: 4px;
}

.user-type {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.option {
  padding: 10px;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  flex: 1;
  text-align: center;
  transition: all 0.2s;
}

.option.active {
  border-color: #18763b;
  background-color: #8cb6a1;
}

.radio {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
</style>