<script>
  export let data;
  export let form;

  let q1 = '';
  let q2 = '';
  let q3 = '';
  let q4 = '';
  let q5 = '';
  let q6 = '';
  let q7 = '';
  let q8 = '';

  let formEl;
  let submittedData = null;
  let showConfirm = false;
  let isSubmitting = false;

  const facilitiesRecords = data.facilitiesRecords;

  function handleSubmit(e) {
    if (!isSubmitting) {
      e.preventDefault();
      submittedData = { q1, q2, q3, q4, q5, q6, q7, q8 };
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

<h1>🏠 แบบประเมินสถานที่จัดการผลผลิต</h1>

<form bind:this={formEl} method="POST" action="?/submit" on:submit={handleSubmit}>
  <div class="card">
    <p>Q1: อธิบายลักษณะที่เก็บสารเคมีเฉพาะ แยกชนิด ป้องกันปนเปื้อน</p>
    <input type="text" name="q1" bind:value={q1} required />
  </div>

  <div class="card">
    <p>Q2: สารเคมีเหลือใช้ปิดฝาสนิท/ติดข้อมูลครบ</p>
    <label><input type="radio" name="q2" value="ใช่" bind:group={q2} required> ใช่</label>
    <label><input type="radio" name="q2" value="ไม่ใช่" bind:group={q2}> ไม่ใช่</label>
  </div>

  <div class="card">
    <p>Q3: อธิบายวิธีกำจัดภาชนะสารเคมี</p>
    <input type="text" name="q3" bind:value={q3} required />
  </div>

  <div class="card">
    <p>Q4: ภาชนะหมดอายุ/เสื่อมสภาพถูกแยกเก็บ/ทำลายถูกต้อง</p>
    <label><input type="radio" name="q4" value="ใช่" bind:group={q4} required> ใช่</label>
    <label><input type="radio" name="q4" value="ไม่ใช่" bind:group={q4}> ไม่ใช่</label>
  </div>

  <div class="card">
    <p>Q5: ที่เก็บภาชนะ/อุปกรณ์ แยกจากสารเคมี/ปุ๋ย และกันสัตว์พาหะ</p>
    <label><input type="radio" name="q5" value="ใช่" bind:group={q5} required> ใช่</label>
    <label><input type="radio" name="q5" value="ไม่ใช่" bind:group={q5}> ไม่ใช่</label>
  </div>

  <div class="card">
    <p>Q6: อธิบายมาตรการกันสัตว์เลี้ยงในพื้นที่ปฏิบัติงาน</p>
    <input type="text" name="q6" bind:value={q6} required />
  </div>

  <div class="card">
    <p>Q7: อธิบายสัดส่วนการพื้นที่จัดการปุ๋ย/ปรับปรุงดิน/หมักอินทรีย์</p>
    <input type="text" name="q7" bind:value={q7} required />
  </div>

  <div class="card">
    <p>Q8: สถานที่พัก/ขนย้าย/เก็บรักษา มีสุขลักษณะ</p>
    <label><input type="radio" name="q8" value="ใช่" bind:group={q8} required> ใช่</label>
    <label><input type="radio" name="q8" value="ไม่ใช่" bind:group={q8}> ไม่ใช่</label>
  </div>

  <div class="actions">
    <button type="submit">ส่งข้อมูล</button>
  </div>
</form>

<form method="POST" action="?/reset" style="margin-top:1rem;">
  <button type="submit" class="reset">รีเซ็ตคำตอบ</button>
</form>

<!-- ✅ Modal ยืนยันก่อนส่ง -->
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
  .card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 12px;
  }

  .actions {
    margin-top: 12px;
  }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal {
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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
    background: #16a34a;
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
    background: #ef4444;
    color: #fff;
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
  }

</style>
