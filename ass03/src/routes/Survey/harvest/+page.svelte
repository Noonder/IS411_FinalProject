<script>
  export let data;
  export let form;

  let q1 = '', q2 = '', q3 = '', q4 = '';
  let formEl;
  let submittedData = null;
  let showConfirm = false;
  let isSubmitting = false;

  const harvestRecords = data.harvestRecords;

  function handleSubmit(e) {
    if (!isSubmitting) {
      e.preventDefault();
      submittedData = { q1, q2, q3, q4 };
      showConfirm = true;
    }
  }

  function confirmSubmit() {
    showConfirm = false;
    isSubmitting = true;
    formEl.requestSubmit();
  }

  function closeModal() {
    showConfirm = false;
  }
</script>

<h1>🌾 แบบประเมินการเก็บเกี่ยว</h1>

<form bind:this={formEl} method="POST" action="?/submit" on:submit={handleSubmit}>
  <div class="card">
    <p>Q1: อธิบายเก็บเกี่ยวเมื่ออายุเหมาะสม/ตามข้อกำหนด</p>
    <input type="text" name="q1" bind:value={q1} required />
  </div>

  <div class="card">
    <p>Q2: วิธีคัดแยกผลผลิตไม่ได้คุณภาพออกก่อนส่ง</p>
    <input type="text" name="q2" bind:value={q2} required />
  </div>

  <div class="card">
    <p>Q3: วิธีป้องกันการเสื่อมคุณภาพก่อนขนส่ง</p>
    <input type="text" name="q3" bind:value={q3} required />
  </div>

  <div class="card">
    <p>Q4: วิธีการดูแลผลผลิตก่อนขนส่ง</p>
    <input type="text" name="q4" bind:value={q4} required />
  </div>

  <div class="actions">
    <button type="submit">ส่งข้อมูล</button>
  </div>
</form>

<form method="POST" action="?/reset" style="margin-top:1rem;">
  <button type="submit" class="reset">รีเซ็ตำตอบ</button>
</form>

<!-- ✅ Modal ยืนยัน -->
{#if showConfirm && submittedData}
  <div class="modal-backdrop" on:click={closeModal}>
    <div class="modal" on:click|stopPropagation>
      <h3>🧾 ตรวจสอบข้อมูลก่อนส่ง</h3>
      <ul>
        {#each Object.entries(submittedData) as [key, value]}
          <li><strong>{key.toUpperCase()}:</strong> {value}</li>
        {/each}
      </ul>
      <div class="modal-actions">
        <button on:click={closeModal}>แก้ไข</button>
        <button class="confirm" on:click={confirmSubmit}>ยืนยัน</button>
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
