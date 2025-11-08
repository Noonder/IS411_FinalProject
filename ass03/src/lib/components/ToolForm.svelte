<script>
  import { onDestroy } from 'svelte';

  let questions = [
    { id: 1, text: "วัสดุสัมผัสผลผลิตไม่ก่อปนเปื้อนใช่หรือไม่?", values: ["ใช่", "ไม่ใช่"] },
    { id: 2, text: "ล้างอุปกรณ์ทุกครั้งและจัดการน้ำล้างถูกต้องหรือไม่?", values: ["ใช่", "ไม่ใช่"] },
    { id: 3, text: "ภาชนะของเสีย/สารเคมี/ปุ๋ย แยกจากภาชนะเก็บเกี่ยวใช่หรือไม่?", values: ["ใช่", "ไม่ใช่"] },
    { id: 4, text: "ตรวจสอบเครื่องมือที่ต้องการความแม่นยำอย่างน้อยปีละครั้งหรือไม่?", values: ["ใช่", "ไม่ใช่"] },
    { id: 5, text: "สถานที่ปฏิบัติงานมีสุขลักษณะเพียงพอหรือไม่?", values: ["ใช่", "ไม่ใช่"] }
  ];

  // สร้าง object formData dynamic ตาม id
  let formData = $state({});
  questions.forEach(q => formData[`q${q.id}`] = '');

  let errors = $state({});
  let submittedData = $state(null);
  let showConfirmModal = $state(false);
  let showSuccess = $state(false);

  function validate() {
    errors = {};
    questions.forEach(q => {
      if (!formData[`q${q.id}`]) errors[`q${q.id}`] = 'โปรดเลือกคำตอบ';
    });
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
    questions.forEach(q => formData[`q${q.id}`] = '');
    errors = {};
    submittedData = null;
  }

  function closeModal() {
    showConfirmModal = false;
  }
</script>

<form on:submit={handleSubmit}>
  {#each questions as q}
    <div class="card">
      <p>{q.id}. {q.text}</p>
      {#each q.values as v}
        <label>
          <input type="radio" bind:group={formData[`q${q.id}`]} value={v} /> {v}
        </label>
      {/each}
      {#if errors[`q${q.id}`]}<div class="error">{errors[`q${q.id}`]}</div>{/if}
    </div>
  {/each}

  <div class="actions">
    <button type="button" on:click={resetForm}>รีเซ็ต</button>
    <button type="submit">ส่งข้อมูล</button>
  </div>
</form>

{#if showConfirmModal && submittedData}
  <div class="modal-backdrop" on:click={closeModal}>
    <div class="modal" on:click|stopPropagation>
      <h3>🧾 ตรวจสอบข้อมูลก่อนส่ง</h3>
      <ul>
        {#each questions as q}
          <li><strong>Q{q.id}:</strong> {submittedData[`q${q.id}`]}</li>
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
