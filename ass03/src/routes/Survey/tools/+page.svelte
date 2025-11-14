<script>
// @ts-nocheck
  export let data;
  export let form; // รับ error หรือ success จาก server

  let q1 = form?.q1 || '';
  let q2 = form?.q2 || '';
  let q3 = form?.q3 || '';
  let q4 = form?.q4 || '';
  let q5 = form?.q5 || '';

  let formElement;
  let submittedData = null;
  let showConfirmModal = false;
  let isConfirming = false;

  function handleSubmit(e) {
    if (!isConfirming) {
      e.preventDefault();
      submittedData = { q1, q2, q3, q4, q5 };
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

  function resetForm() {
    q1 = q2 = q3 = q4 = q5 = '';
    submittedData = null;
    showConfirmModal = false;
  }
</script>

<h1>🚗 แบบประเมินยานพาหนะและอุปกรณ์</h1>

{#if form?.error}
  <p class="error">{form.error}</p>
{/if}



<form bind:this={formElement} method="POST" action="?/submit" on:submit={handleSubmit}>
  <div class="card">
    <p>1. วัสดุสัมผัสผลผลิตไม่ก่อปนเปื้อนใช่หรือไม่?</p>
    <label><input type="radio" name="q1" value="ใช่" bind:group={q1} required> ใช่</label>
    <label><input type="radio" name="q1" value="ไม่ใช่" bind:group={q1}> ไม่ใช่</label>
  </div>

  <div class="card">
    <p>2. ล้างอุปกรณ์ทุกครั้งและจัดการน้ำล้างถูกต้องหรือไม่?</p>
    <label><input type="radio" name="q2" value="ใช่" bind:group={q2} required> ใช่</label>
    <label><input type="radio" name="q2" value="ไม่ใช่" bind:group={q2}> ไม่ใช่</label>
  </div>

  <div class="card">
    <p>3. ภาชนะของเสีย/สารเคมี/ปุ๋ย แยกจากภาชนะเก็บเกี่ยวใช่หรือไม่?</p>
    <label><input type="radio" name="q3" value="ใช่" bind:group={q3} required> ใช่</label>
    <label><input type="radio" name="q3" value="ไม่ใช่" bind:group={q3}> ไม่ใช่</label>
  </div>

  <div class="card">
    <p>4. ตรวจสอบเครื่องมือที่ต้องการความแม่นยำอย่างน้อยปีละครั้งหรือไม่?</p>
    <label><input type="radio" name="q4" value="ใช่" bind:group={q4} required> ใช่</label>
    <label><input type="radio" name="q4" value="ไม่ใช่" bind:group={q4}> ไม่ใช่</label>
  </div>

  <div class="card">
    <p>5. สถานที่ปฏิบัติงานมีสุขลักษณะเพียงพอหรือไม่?</p>
    <label><input type="radio" name="q5" value="ใช่" bind:group={q5} required> ใช่</label>
    <label><input type="radio" name="q5" value="ไม่ใช่" bind:group={q5}> ไม่ใช่</label>
  </div>

  <div class="actions">
    <button type="submit">ส่งข้อมูล</button>
  </div>
</form>

<form method="POST" action="?/reset" style="margin-top:1rem;">
  <button type="submit" class="reset">รีเซ็ตคำตอบ</button>
</form>

<!-- 🧾 Modal ยืนยัน -->
{#if showConfirmModal && submittedData}
  <div class="modal-backdrop" on:click={closeModal}>
    <div class="modal" on:click|stopPropagation>
      <h3>🧾 ตรวจสอบข้อมูลก่อนส่ง</h3>
      <ul>
        <li><strong>Q1:</strong> {submittedData.q1}</li>
        <li><strong>Q2:</strong> {submittedData.q2}</li>
        <li><strong>Q3:</strong> {submittedData.q3}</li>
        <li><strong>Q4:</strong> {submittedData.q4}</li>
        <li><strong>Q5:</strong> {submittedData.q5}</li>
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
