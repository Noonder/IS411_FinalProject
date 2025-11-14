<script>
  import { goto } from '$app/navigation';

  let step = 1;

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

  function validateStep2() {
    errors = {};
    if (!durianType) errors.durianType = "*โปรดเลือกพันธุ์ทุเรียน";
    if (durianType === 'อื่นๆ' && !registerForm.durianOther.trim()) errors.durianOther = "โปรดระบุพันธุ์อื่นๆ";
    return Object.keys(errors).length === 0;
  }

  function nextStep() {
    if (step === 1 && !validateStep1()) return;
    step++;
  }

  function prevStep() {
    step--;
  }

  function submitForm() {
    if (!validateStep2()) return;
    goto('/profile');
  }
</script>

<form class="register">
  <h1>ลงทะเบียนบัญชีผู้ใช้</h1>

  {#if step === 1}
  <div class="card">
    <h2>ข้อมูลส่วนตัว</h2>

   <div class="field">
  <label>ประเภทผู้ใช้</label>
  {#if errors.userType}<div class="error">{errors.userType}</div>{/if}
  <div class="user-type">
    <button 
      type="button" 
      class="option {registerForm.userType==='เกษตรกร'?'active':''}" 
      on:click={() => registerForm.userType='เกษตรกร'}>
      <span>เกษตรกร</span>
    </button>

    <button 
      type="button" 
      class="option {registerForm.userType==='นิติบุคคล'?'active':''}" 
      on:click={() => registerForm.userType='นิติบุคคล'}>
      <span>นิติบุคคล</span>
    </button>
  </div>
</div>


    <div class="field">
      <label>อีเมล</label>
      {#if errors.email}<div class="error">{errors.email}</div>{/if}
      <input type="email" bind:value={registerForm.email} />
    </div>

    <div class="field">
      <label>รหัสผ่าน</label>
      {#if errors.password}<div class="error">{errors.password}</div>{/if}
      <input type="password" bind:value={registerForm.password} />
    </div>

    <div class="field">
      <label>ยืนยันรหัสผ่าน</label>
      {#if errors.confirmPassword}<div class="error">{errors.confirmPassword}</div>{/if}
      <input type="password" bind:value={registerForm.confirmPassword} />
    </div>

    <div class="field">
      <label>คำนำหน้า</label>
      <select bind:value={registerForm.prefix}>
        <option value="">-- เลือก --</option>
        {#each prefixes as p}
          <option value={p}>{p}</option>
        {/each}
      </select>
    </div>

    <div class="field">
      <label>ชื่อ</label>
      {#if errors.firstname}<div class="error">{errors.firstname}</div>{/if}
      <input type="text" bind:value={registerForm.firstname} />
    </div>

    <div class="field">
      <label>นามสกุล</label>
      <input type="text" bind:value={registerForm.lastname} />
    </div>

    <div class="field">
      <label>หมายเลขบัตรประชาชน</label>
      {#if errors.idcard}<div class="error">{errors.idcard}</div>{/if}
      <input type="text" maxlength="13" bind:value={registerForm.idcard} />
    </div>

    <div class="field">
      <label>เบอร์โทรศัพท์</label>
      {#if errors.phone}<div class="error">{errors.phone}</div>{/if}
      <input type="text" bind:value={registerForm.phone} />
    </div>

    <div class="btn-group">
      <button type="button" class="btn next" on:click={nextStep}>ถัดไป</button>
    </div>
  </div>
  {/if}

  {#if step === 2}
  <div class="card">
    <h2>ข้อมูลพันธุ์ทุเรียน</h2>

    {#each ['หมอนทอง','ก้านยาว','ชะนี','หลงลับแล','กระดุมทอง','พวงมณี','อื่นๆ'] as type}
      <label class="radio">
        <input type="radio" bind:group={durianType} value={type} />
        <span>{type}</span>
      </label>
    {/each}
    {#if errors.durianType}<div class="error">{errors.durianType}</div>{/if}

    {#if durianType==='อื่นๆ'}
      <div class="field">
        <label>ระบุพันธุ์อื่นๆ</label>
        <input type="text" bind:value={registerForm.durianOther} />
        {#if errors.durianOther}<div class="error">{errors.durianOther}</div>{/if}
      </div>
    {/if}

    <div class="btn-group">
      <button type="button" class="btn back" on:click={prevStep}>ย้อนกลับ</button>
      <button type="button" class="btn next" on:click={submitForm}>ยืนยัน</button>
    </div>
  </div>
  {/if}
</form>

<style>
.register {
  font-family: 'Prompt', sans-serif;
  margin: 0 auto;
}

h1 {
  color: #010b05;
  margin-bottom: 16px;
}

.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
  padding: 20px;
  margin-bottom: 20px;
}

h2 {
  font-weight: 700;
  font-size: 1.2rem;
  color: #14532d;
  margin-bottom: 12px;
}

.field {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}

label {
  width: 220px;
  font-weight: 600;
  color: #374151;
}

input, select {
  flex: 1;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 6px;
}

button {
    padding: 10px 16px;
    border: none;
    border-radius: 8px;
    background-color: #f1f6f3;
    color: #140e0e;
    cursor: pointer;
    font-weight: 600;
}
button.next {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background-color: #166534;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
}

button.back {
  background-color: #9ca3af;
}

.btn-group {
  display: flex;
  justify-content: space-between;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  text-align: center;
}


.option.active {
  border-color: #18763b;
  background: #8cb6a1;
}


</style>
