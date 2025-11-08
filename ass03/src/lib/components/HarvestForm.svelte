<script>
  import { onDestroy } from 'svelte';

  let formData = $state({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
  });

  let errors = $state({});
  let submittedData = $state(null);
  let showConfirmModal = $state(false);
  let showSuccess = $state(false);

  function validate() {
    errors = {};
    for (let i = 1; i <= 4; i++) {
      if (!formData[`q${i}`].trim()) {
        errors[`q${i}`] = `โปรดกรอกคำตอบข้อที่ ${i}`;
      }
    }
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    submittedData = { ...formData };
    showConfirmModal = true;
  }

  function confirmSubmit() {
    showConfirmModal = false;
    showSuccess = true;
    resetForm();
  }

  function resetForm() {
    for (let i = 1; i <= 4; i++) {
      formData[`q${i}`] = '';
    }
    errors = {};
    submittedData = null;
  }

  function closeModal() {
    showConfirmModal = false;
  }
</script>

<form on:submit={handleSubmit}>
  <div class="card">
    <p>Q1: เก็บเกี่ยวเมื่ออายุเหมาะสม/ตามข้อกำหนด</p>
    <input type="text" bind:value={formData.q1} />
    {#if errors.q1}<div class="error">{errors.q1}</div>{/if}
  </div>

  <div class="card">
    <p>Q2: คัดแยกผลผลิตไม่ได้คุณภาพออกก่อนส่ง</p>
    <input type="text" bind:value={formData.q2} />
    {#if errors.q2}<div class="error">{errors.q2}</div>{/if}
  </div>

  <div class="card">
    <p>Q3: มีวิธีป้องกันการเสื่อมคุณภาพก่อนขนส่ง</p>
    <input type="text" bind:value={formData.q3} />
    {#if errors.q3}<div class="error">{errors.q3}</div>{/if}
  </div>

  <div class="card">
    <p>Q4: มีการดูแลผลผลิตก่อนขนส่ง</p>
    <input type="text" bind:value={formData.q4} />
    {#if errors.q4}<div class="error">{errors.q4}</div>{/if}
  </div>

  <div class="actions">
    <button type="button" on:click={resetForm}>รีเซ็ต</button>
    <button type="submit">ส่งข้อมูล</button>
  </div>
</form>

<!-- Modal ตรวจสอบข้อมูล -->
{#if showConfirmModal && submittedData}
  <div class="modal-backdrop" on:click={closeModal}>
    <div class="modal" on:click|stopPropagation>
      <h3>🧾 ตรวจสอบข้อมูลก่อนส่ง</h3>
      <ul>
        {#each Array(4) as _, i}
          <li><strong>Q{i + 1}:</strong> {submittedData[`q${i+1}`]}</li>
        {/each}
      </ul>

      <div class="modal-actions">
        <button on:click={closeModal}>แก้ไขข้อมูล</button>
        <button class="confirm" on:click={confirmSubmit}>ยืนยันส่งข้อมูล</button>
      </div>
    </div>
  </div>
{/if}

{#if showSuccess}
  <div class="success-message">
    ✅ ส่งข้อมูลเรียบร้อยแล้ว ขอบคุณค่ะ!
  </div>
{/if}

<style>
  .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px; margin-bottom: 12px; }
  .actions { display: flex; gap: 10px; }
  .error { color: #b91c1c; font-size: 0.9rem; margin-top: 4px; }
  .modal-backdrop { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center; z-index:1000; }
  .modal { background:#fff; border-radius:12px; padding:20px; max-width:500px; width:90%; box-shadow:0 4px 10px rgba(0,0,0,0.25); }
  .modal-actions { display:flex; justify-content:flex-end; gap:10px; margin-top:20px; }
  .modal-actions button.confirm { background:#16a34a; color:white; border:none; padding:6px 12px; border-radius:6px; }
  .modal-actions button.confirm:hover { background:#15803d; }
  .success-message { text-align:center; color:#16a34a; font-weight:bold; margin-top:20px; background:#ecfdf5; padding:10px; border-radius:8px; }
</style>
