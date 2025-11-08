<script>
  import { onDestroy } from 'svelte';

  let formData = $state({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6File: null,
    q6Url: '',
  });

  let errors = $state({});
  let submittedData = $state(null);
  let showConfirmModal = $state(false);
  let showSuccess = $state(false);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (formData.q6Url) URL.revokeObjectURL(formData.q6Url);
    formData.q6File = file;
    formData.q6Url = URL.createObjectURL(file);
  }

  onDestroy(() => {
    if (formData.q6Url) URL.revokeObjectURL(formData.q6Url);
  });

  function validate() {
    errors = {};
    if (!formData.q1) errors.q1 = "โปรดเลือกคำตอบในข้อที่ 1";
    if (!formData.q2) errors.q2 = "โปรดเลือกคำตอบในข้อที่ 2";
    if (!formData.q3) errors.q3 = "โปรดเลือกคำตอบในข้อที่ 3";
    if (!formData.q4) errors.q4 = "โปรดเลือกคำตอบในข้อที่ 4";
    if (!formData.q5) errors.q5 = "โปรดเลือกคำตอบในข้อที่ 5";
    if (!formData.q6File) errors.q6 = "โปรดแนบไฟล์ในข้อที่ 6";
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
    for (const key in formData) {
      if (key.endsWith("Url") && formData[key]) URL.revokeObjectURL(formData[key]);
      formData[key] = key.includes("File") ? null : "";
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
    <p>Q1: พื้นที่เพาะปลูกของคุณไม่เสี่ยงต่อการปนเปื้อนใช่หรือไม่?</p>
    {#each ["เสี่ยง", "ไม่เสี่ยง", "ไม่ทราบ"] as v}
      <label><input type="radio" bind:group={formData.q1} value={v} /> {v}</label>
    {/each}
    {#if errors.q1}<div class="error">{errors.q1}</div>{/if}
  </div>

  <div class="card">
    <p>Q2: พื้นที่มีการบำบัดดินให้อยู่ในระดับปลอดภัยหรือไม่?</p>
    {#each ["มี", "ไม่มี"] as v}
      <label><input type="radio" bind:group={formData.q2} value={v} /> {v}</label>
    {/each}
    {#if errors.q2}<div class="error">{errors.q2}</div>{/if}
  </div>

  <div class="card">
    <p>Q3: พื้นที่ปลูกเป็นไปตามกฎหมายที่เกี่ยวข้องหรือไม่?</p>
    {#each ["มี", "ไม่มี"] as v}
      <label><input type="radio" bind:group={formData.q3} value={v} /> {v}</label>
    {/each}
    {#if errors.q3}<div class="error">{errors.q3}</div>{/if}
  </div>

  <div class="card">
    <p>Q4: มีการเก็บตัวอย่างดินเพื่อตรวจวิเคราะห์หรือไม่?</p>
    {#each ["มี", "ไม่มี"] as v}
      <label><input type="radio" bind:group={formData.q4} value={v} /> {v}</label>
    {/each}
    {#if errors.q4}<div class="error">{errors.q4}</div>{/if}
  </div>

  <div class="card">
    <p>Q5: พื้นที่ปลูกใหม่มีมาตรการป้องกันผลกระทบต่อสิ่งแวดล้อมใช่หรือไม่?</p>
    {#each ["มี", "ไม่มี"] as v}
      <label><input type="radio" bind:group={formData.q5} value={v} /> {v}</label>
    {/each}
    {#if errors.q5}<div class="error">{errors.q5}</div>{/if}
  </div>

  <div class="card">
    <p>Q6: แนบรูปผังแปลง พร้อมคำอธิบายว่าคำนึงถึงสิ่งแวดล้อมอย่างไร</p>
    <input type="file" accept="image/*" on:change={handleFileChange} />
    {#if formData.q6Url}<img src={formData.q6Url} alt="preview" width="200" />{/if}
    {#if errors.q6}<div class="error">{errors.q6}</div>{/if}
  </div>

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
        <li><strong>Q1:</strong> {submittedData.q1}</li>
        <li><strong>Q2:</strong> {submittedData.q2}</li>
        <li><strong>Q3:</strong> {submittedData.q3}</li>
        <li><strong>Q4:</strong> {submittedData.q4}</li>
        <li><strong>Q5:</strong> {submittedData.q5}</li>
        <li><strong>Q6:</strong> {submittedData.q6File ? submittedData.q6File.name : 'ไม่มีไฟล์'}</li>
      </ul>

      {#if submittedData.q6Url}
        <p><strong>ภาพผังแปลง:</strong></p>
        <img src={submittedData.q6Url} width="200" alt="preview" />
      {/if}

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
  .card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 12px;
  }
  .actions { display: flex; gap: 10px; }
  .error { color: #b91c1c; font-size: 0.9rem; margin-top: 4px; }

  .modal-backdrop {
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.4);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000;
  }
  .modal {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 4px 10px rgba(0,0,0,0.25);
    animation: fadeIn 0.25s ease-in-out;
  }
  .modal h3 { margin-top: 0; margin-bottom: 10px; }
  .modal ul { margin: 10px 0; padding-left: 20px; }
  .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
  .modal-actions button.confirm {
    background: #16a34a; color: white; border: none;
    padding: 6px 12px; border-radius: 6px;
  }
  .modal-actions button.confirm:hover { background: #15803d; }
  .success-message {
    text-align: center; color: #16a34a; font-weight: bold;
    margin-top: 20px; background: #ecfdf5; padding: 10px; border-radius: 8px;
  }
  @keyframes fadeIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
</style>
