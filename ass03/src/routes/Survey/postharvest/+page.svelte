<script>
  // @ts-nocheck
  export let data;
  export let form;

  let q1 = form?.q1 || '';
  let formElement;
  let submittedData = null;
  let showConfirmModal = false;
  let isConfirming = false;

  const storageRecords = data.storageRecords;

  function handleSubmit(e) {
    if (!isConfirming) {
      e.preventDefault();
      submittedData = { q1 };
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

<h1>🏠 แบบประเมินการพักผลผลิต</h1>

<form bind:this={formElement} method="POST" action="?/submit" on:submit={handleSubmit}>
  <div class="card">
    <p>Q1: ผลผลิตที่คัดเลือก/บรรจุ/พัก ไม่สัมผัสพื้นดินโดยตรง</p>
    <input type="text" name="q1" bind:value={q1} required />
  </div>

  <div class="actions">
    <button type="submit">ส่งข้อมูล</button>
  </div>
</form>

<form method="POST" action="?/reset" style="margin-top:1rem;">
  <button type="submit" class="reset">รีเซ็ตคำตอบ</button>
</form>

<!-- ✅ Modal ยืนยัน -->
{#if showConfirmModal && submittedData}
  <div class="modal-backdrop" on:click={closeModal}>
    <div class="modal" on:click|stopPropagation>
      <h3>🧾 ตรวจสอบข้อมูลก่อนส่ง</h3>
      <ul>
        <li><strong>Q1:</strong> {submittedData.q1}</li>
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