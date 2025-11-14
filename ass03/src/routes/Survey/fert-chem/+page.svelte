<script>
  export let data;
  export let form;

  let q1 = '';
  let q2 = '';
  let q3 = null;
  let q3Url = '';
  let q4 = '';
  let q5 = '';
  let q6 = '';
  let errors = {};

  let formEl;
  let submittedData = null;
  let showConfirm = false;
  let isSubmitting = false;

  const fertilizerRecords = data.fertilizerRecords;

  // จัดการไฟล์รูป Q3
  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (q3Url) URL.revokeObjectURL(q3Url);
    q3 = file;
    q3Url = URL.createObjectURL(file);
  }


  // ตรวจสอบก่อนส่งจริง
  function handleSubmit(e) {
    if (!isSubmitting) {
      e.preventDefault();
      submittedData = { q1, q2, q3, q4, q5, q6 };
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

<h1>🧪 แบบประเมินการจัดการปุ๋ยและยา</h1>

<form
  bind:this={formEl}
  method="POST"
  action="?/submit"
  enctype="multipart/form-data"
  on:submit={handleSubmit}
>
  <!-- Q1 -->
  <div class="card">
    <p>Q1: ใช้สิ่งขับถ่ายของคนเป็นปุ๋ยหรือไม่?</p>
    {#each ["ใช้", "ไม่ใช้เลย", "ไม่ทราบ"] as v}
      <label>
        <input type="radio" name="q1" bind:group={q1} value={v} required />
        {v}
      </label>
    {/each}
  </div>

  <!-- Q2 -->
  <div class="card">
    <p>Q2: ใช้สารเคมีตามคำแนะนำและหยุดใช้ก่อนเก็บเกี่ยวหรือไม่?</p>
    {#each ["ใช่", "ไม่ใช่"] as v}
      <label>
        <input type="radio" name="q2" bind:group={q2} value={v} required />
        {v}
      </label>
    {/each}
  </div>

  <!-- Q3 -->
  <div class="card">
    <p>Q3: โปรดแนบรูปภาพปุ๋ยหรือสารเคมีที่ใช้ล่าสุด</p>
    <input type="file" name="q3" accept="image/*" on:change={handleFileChange} required />
    {#if q3Url}<img src={q3Url} alt="preview" width="200" />{/if}
  </div>

  <!-- Q4 -->
  <div class="card">
    <p>Q4: ตรวจวัดสารตกค้างในผลผลิต (ถ้ามี)</p>
    <input type="text" name="q4" bind:value={q4} />
  </div>

  <!-- Q5 -->
  <div class="card">
    <p>Q5: ใช้วัตถุอันตรายทางการเกษตรที่ห้ามตามกฎหมายหรือไม่?</p>
    {#each ["ใช้", "ไม่ใช้"] as v}
      <label>
        <input type="radio" name="q5" bind:group={q5} value={v} required />
        {v}
      </label>
    {/each}
  </div>

  <!-- Q6 -->
  <div class="card">
    <p>Q6: ส่งออกปฏิบัติตามข้อกำหนดของประเทศคู่ค้าหรือไม่?</p>
    {#each ["ปฏิบัติ", "ไม่ได้ปฏิบัติ"] as v}
      <label>
        <input type="radio" name="q6" bind:group={q6} value={v} required />
        {v}
      </label>
    {/each}
  </div>

  <div class="actions">
    <button type="submit">ส่งข้อมูล</button>
  </div>
</form>

<form method="POST" action="?/reset" style="margin-top:1rem;">
  <button type="submit" class="reset">รีเซ็ตคำตอบ</button>
</form>

<!-- ✅ Modal ยืนยัน -->
{#if showConfirm && submittedData}
  <div class="modal-backdrop" on:click={closeModal}>
    <div class="modal" on:click|stopPropagation>
      <h3>🧾 ตรวจสอบข้อมูลก่อนส่ง</h3>
      <ul>
        <li><strong>Q1:</strong> {submittedData.q1}</li>
        <li><strong>Q2:</strong> {submittedData.q2}</li>
        <li><strong>Q3:</strong> {submittedData.q3?.name}</li>
        <li><strong>Q4:</strong> {submittedData.q4}</li>
        <li><strong>Q5:</strong> {submittedData.q5}</li>
        <li><strong>Q6:</strong> {submittedData.q6}</li>
      </ul>

      {#if q3Url}
        <p><strong>ภาพแนบ Q3:</strong></p>
        <img src={q3Url} alt="preview" width="200" />
      {/if}

      <div class="modal-actions">
        <button on:click={closeModal}>แก้ไข</button>
        <button class="confirm" on:click={confirmSubmit}>ยืนยัน</button>
      </div>
    </div>
  </div>
{/if}



<style>
  .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px; margin-bottom: 12px; }
  .card label { display: block; margin-top: 6px; }
  .actions { margin-top: 12px; display: flex; gap: 10px; }
  .error { color: #b91c1c; font-size: 0.9rem; margin-top: 4px; }
  .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
  .modal { background: #fff; padding: 20px; border-radius: 12px; max-width: 400px; width: 90%; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
  .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }
  .confirm { background: #16a34a; color: #fff; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; }
  .confirm:hover { opacity: 0.9; }
  .actions button { background: #16a34a; color: #fff; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: bold; transition: background 0.2s; }
  .actions button:hover { opacity: 0.9; }
  form .reset { background: #ef4444; color: #fff; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: bold; transition: background 0.2s; }
  form .reset:hover { background: #b91c1c; }
</style>
