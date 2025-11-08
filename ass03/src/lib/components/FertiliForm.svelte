<script>
  import { onDestroy } from 'svelte';

  let formData = $state({
    q1: '',
    q2: '',
    q3File: null,
    q3Url: '',
    q4: '',
    q5: '',
    q6: '',
  });

  let errors = $state({});
  let submittedData = $state(null);
  let showConfirmModal = $state(false);
  let showSuccess = $state(false);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (formData.q3Url) URL.revokeObjectURL(formData.q3Url);
    formData.q3File = file;
    formData.q3Url = URL.createObjectURL(file);
  }

  onDestroy(() => {
    if (formData.q3Url) URL.revokeObjectURL(formData.q3Url);
  });

  function validate() {
    errors = {};
    if (!formData.q1) errors.q1 = "โปรดเลือกคำตอบข้อที่ 1";
    if (!formData.q2) errors.q2 = "โปรดเลือกคำตอบข้อที่ 2";
    if (!formData.q3File) errors.q3 = "โปรดแนบไฟล์ข้อที่ 3";
    if (!formData.q4.trim()) errors.q4 = "โปรดกรอกข้อความข้อที่ 4";
    if (!formData.q5) errors.q5 = "โปรดเลือกคำตอบข้อที่ 5";
    if (!formData.q6) errors.q6 = "โปรดเลือกคำตอบข้อที่ 6";
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
  <!-- Q1 -->
  <div class="card">
    <p>Q1: คุณใช้สิ่งขับถ่ายของคนเป็นปุ๋ยหรือไม่?</p>
    {#each ["ใช้", "ไม่ใช้เลย", "ไม่ทราบ"] as v}
      <label><input type="radio" bind:group={formData.q1} value={v} /> {v}</label>
    {/each}
    {#if errors.q1}<div class="error">{errors.q1}</div>{/if}
  </div>

  <!-- Q2 -->
  <div class="card">
    <p>Q2: ใช้สารเคมีตามคำแนะนำและหยุดใช้ก่อนเก็บเกี่ยวใช่หรือไม่?</p>
    {#each ["ใช่", "ไม่ใช่"] as v}
      <label><input type="radio" bind:group={formData.q2} value={v} /> {v}</label>
    {/each}
    {#if errors.q2}<div class="error">{errors.q2}</div>{/if}
  </div>

  <!-- Q3 -->
  <div class="card">
    <p>Q3: โปรดอัปโหลดรูปภาพปุ๋ยและสารเคมีที่ใช้ล่าสุด</p>
    <input type="file" accept="image/*" on:change={handleFileChange} />
    {#if formData.q3Url}<img src={formData.q3Url} alt="preview" width="200" />{/if}
    {#if errors.q3}<div class="error">{errors.q3}</div>{/if}
  </div>

  <!-- Q4 -->
  <div class="card">
    <p>Q4: ตรวจวัดสารตกค้างในผลผลิต (ถ้ามี)</p>
    <input type="text" bind:value={formData.q4} />
    {#if errors.q4}<div class="error">{errors.q4}</div>{/if}
  </div>

  <!-- Q5 -->
  <div class="card">
    <p>Q5: ใช้วัตถุอันตรายทางการเกษตรที่ห้ามตามกฎหมายหรือไม่?</p>
    {#each ["ใช้", "ไม่ใช้"] as v}
      <label><input type="radio" bind:group={formData.q5} value={v} /> {v}</label>
    {/each}
    {#if errors.q5}<div class="error">{errors.q5}</div>{/if}
  </div>

  <!-- Q6 -->
  <div class="card">
    <p>Q6: ส่งออกปฏิบัติตามข้อกำหนดประเทศคู่ค้าหรือไม่?</p>
    {#each ["ปฏิบัติ", "ไม่ได้ปฏิบัติ"] as v}
      <label><input type="radio" bind:group={formData.q6} value={v} /> {v}</label>
    {/each}
    {#if errors.q6}<div class="error">{errors.q6}</div>{/if}
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
        <li><strong>Q1:</strong> {submittedData.q1}</li>
        <li><strong>Q2:</strong> {submittedData.q2}</li>
        <li><strong>Q3:</strong> {submittedData.q3File ? submittedData.q3File.name : 'ไม่มีไฟล์'}</li>
        <li><strong>Q4:</strong> {submittedData.q4}</li>
        <li><strong>Q5:</strong> {submittedData.q5}</li>
        <li><strong>Q6:</strong> {submittedData.q6}</li>
      </ul>

      {#if submittedData.q3Url}
        <p><strong>ภาพแนบ Q3:</strong></p>
        <img src={submittedData.q3Url} width="200" alt="preview" />
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

.card label {
  display: block;
  margin-top: 6px;
}

.actions {
  display: flex;
  gap: 10px;
}

.error {
  color: #b91c1c;
  font-size: 0.9rem;
  margin-top: 4px;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  top:0; left:0;
  width:100%; height:100%;
  background: rgba(0,0,0,0.4);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:1000;
}

.modal {
  background:#fff;
  border-radius:12px;
  padding:20px;
  max-width:500px;
  width:90%;
  box-shadow:0 4px 10px rgba(0,0,0,0.25);
}

.modal h3 {
  margin-top:0;
  margin-bottom:10px;
}

.modal ul {
  margin:10px 0;
  padding-left:20px;
}

.modal-actions {
  display:flex;
  justify-content:flex-end;
  gap:10px;
  margin-top:20px;
}

.modal-actions button.confirm {
  background:#16a34a;
  color:white;
  border:none;
  padding:6px 12px;
  border-radius:6px;
}

.modal-actions button.confirm:hover {
  background:#15803d;
}

.success-message {
  text-align:center;
  color:#16a34a;
  font-weight:bold;
  margin-top:20px;
  background:#ecfdf5;
  padding:10px;
  border-radius:8px;
}
</style>
