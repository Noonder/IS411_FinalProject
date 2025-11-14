<script>
// @ts-nocheck

  export let data;
  export let form;

  let q1 = form?.q1 || '';
  let q1Other = form?.q1Other || '';
  let q2 = form?.q2 || '';
  let q3File = null;
  let q3FileName = '';
  let q3Preview = ''; 
  let q4 = form?.q4 || '';

  let submittedData = null;
  let showConfirmModal = null;
  let isConfirming = false;
  let formElement;


  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    q3File = file;
    q3FileName = file.name;
    q3Preview = URL.createObjectURL(file);
  }

  function handleSubmit(e) {
  if (!isConfirming) {
    e.preventDefault();
    submittedData = {
      q1: q1 + (q1==='อื่นๆ' ? ` (${q1Other})` : ''),
      q2,
      q3: q3FileName,  
      q3Preview,
      q4
    };
    showConfirmModal = true;
    return;
  }

}

  function confirmSubmit() {
    showConfirmModal = false;
    isConfirming = true;
    formElement.requestSubmit();

  }



  function closeModal() {
    showConfirmModal = false;
  }
 
</script>

<h1>💧 แบบประเมินการจัดการน้ำ</h1>

<form bind:this={formElement} method="POST" action="?/submit" enctype="multipart/form-data" on:submit={handleSubmit}>

  <div class="card">
    <p>1. แหล่งน้ำที่ใช้ในการปลูกมาจากไหน?</p>
    <select name="q1" bind:value={q1} required>
      <option value="">-- เลือก --</option>
      <option value="น้ำบาดาล">น้ำบาดาล</option>
      <option value="คลองสาธารณะ">คลองสาธารณะ</option>
      <option value="น้ำฝน">น้ำฝน</option>
      <option value="น้ำประปา">น้ำประปา</option>
      <option value="อื่นๆ">อื่นๆ</option>
    </select>
  </div>

  {#if q1==='อื่นๆ'}
    <div class="card">
      <p>โปรดระบุแหล่งน้ำอื่นๆ</p>
      <input type="text" name="q1Other" bind:value={q1Other} required />
    </div>
  {/if}

  <div class="card">
    <p>2. แหล่งน้ำผ่านการบำบัดก่อนใช้หรือไม่?</p>
    <label><input type="radio" name="q2" value="เคยผ่านการบำบัด" bind:group={q2} required /> เคยผ่านการบำบัด</label>
    <label><input type="radio" name="q2" value="ไม่เคยผ่านการบำบัด" bind:group={q2} /> ไม่เคยผ่านการบำบัด</label>
  </div>

  <div class="card">
    <p>3. อัปโหลดรูปภาพแหล่งน้ำ</p>
    <input type="file" name="q3" accept="image/*" on:change={handleFileChange} required />
    {#if q3Preview}
      <img src={q3Preview} alt="preview" width="200" style="margin-top:8px; border-radius:6px;" />
    {/if}
  </div>

  <div class="card">
    <p>4. แหล่งน้ำหลังเก็บเกี่ยวมาจากไหน?</p>
    <input type="text" name="q4" bind:value={q4} required />
  </div>

  <div class="actions">
    <button type="submit">ส่งข้อมูล</button>
  </div>
</form>

<form method="POST" action="?/reset" enctype="multipart/form-data" style="margin-top:1rem;">
  <button type="submit" class="reset">รีเซ็ตคำตอบ</button>
</form>

{#if showConfirmModal && submittedData}
  <div class="modal-backdrop" on:click={closeModal}>
    <div class="modal" on:click|stopPropagation>
      <h3>🧾 ตรวจสอบข้อมูลก่อนส่ง</h3>
      <ul>
        <li><strong>Q1:</strong> {submittedData.q1}</li>
        <li><strong>Q2:</strong> {submittedData.q2}</li>
        <li><strong>Q3:</strong> {submittedData.q3}</li>
          {#if submittedData.q3Preview}
            <img src={submittedData.q3Preview} alt="preview" width="200" style="border-radius:6px; margin-top:8px;" />
          {/if}
        <li><strong>Q4:</strong> {submittedData.q4}</li>
      </ul>

      <div class="modal-actions">
        <button on:click={closeModal}>แก้ไขข้อมูล</button>
        <button class="confirm" on:click={confirmSubmit}>ยืนยันส่งข้อมูล</button>
      </div>
    </div>
  </div>
{/if}


<style>
  .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px; margin-bottom: 12px; }
  .actions { margin-top: 12px; }
  .modal-backdrop {
    position: fixed;
    inset: 0; /* top:0; right:0; bottom:0; left:0; */
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;      /* จัดแนวตั้งกลาง */
    justify-content: center;  /* จัดแนวนอนกลาง */
    z-index: 1000;
  }

  .modal {
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 1001;
  }

  .modal h3 {
    margin-top: 0;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 16px;
  }

  .confirm {
    background: #16a34a;
    color: #fff;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
  }

  .confirm:hover {
    opacity: 0.9;
  }

  .actions button {
  background: #16a34a;   /* สีน้ำเงินสดใส */
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

.actions button:hover {
   opacity: 0.9;
}

form .reset {
  background: #ef4444;  /* สีแดงสำหรับรีเซ็ต */
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

form .reset:hover {
  background: #b91c1c;  /* แดงเข้มเมื่อ hover */
}

</style>
