<script>
  import { onDestroy } from 'svelte';

  let formData = $state({
    q1: '',
    q1Other: '',
    q2: '',
    q3File: null,
    q3Url: '',
    q4File: null,
    q4Url: '',
    q5: '',
  });

  let errors = $state({});
  let submittedData = $state(null);
  let showConfirmModal = $state(false); 
  let showSuccess = $state(false);      

  function handleFileChange(e, target) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (target === "q3") {
      if (formData.q3Url) URL.revokeObjectURL(formData.q3Url);
      formData.q3File = file;
      formData.q3Url = URL.createObjectURL(file);
    } else if (target === "q4") {
      if (formData.q4Url) URL.revokeObjectURL(formData.q4Url);
      formData.q4File = file;
      formData.q4Url = URL.createObjectURL(file);
    }
  }

  onDestroy(() => {
    if (formData.q3Url) URL.revokeObjectURL(formData.q3Url);
    if (formData.q4Url) URL.revokeObjectURL(formData.q4Url);
  });

  function validate() {
    errors = {};
    if (!formData.q1) errors.q1 = "โปรดเลือกแหล่งน้ำ";
    if (formData.q1 === "อื่นๆ" && !formData.q1Other.trim())
      errors.q1Other = "โปรดระบุแหล่งน้ำ (อื่นๆ)";
    if (!formData.q2) errors.q2 = "โปรดเลือกว่าผ่านการบำบัดหรือไม่";
    if (!formData.q5.trim()) errors.q5 = "โปรดกรอกข้อมูลแหล่งน้ำหลังเก็บเกี่ยว";
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
    // ต่อยอดส่ง API ได้ตรงนี้
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
    <p>Q1: แหล่งน้ำที่ใช้ในการปลูกมาจากไหน?</p>
    <select bind:value={formData.q1}>
      <option value="">-- เลือก --</option>
      <option value="น้ำบาดาล">น้ำบาดาล</option>
      <option value="คลองสาธารณะ">คลองสาธารณะ</option>
      <option value="น้ำฝน">น้ำฝน</option>
      <option value="น้ำประปา">น้ำประปา</option>
      <option value="อื่นๆ">อื่นๆ</option>
    </select>
    {#if formData.q1 === 'อื่นๆ'}
      <input type="text" placeholder="โปรดระบุ" bind:value={formData.q1Other} />
      {#if errors.q1Other}<div class="error">{errors.q1Other}</div>{/if}
    {/if}
    {#if errors.q1}<div class="error">{errors.q1}</div>{/if}
  </div>

  <div class="card">
    <p>Q2: แหล่งน้ำผ่านการบำบัดก่อนใช้หรือไม่?</p>
    <label><input type="radio" bind:group={formData.q2} value="เคยผ่านการบำบัด" /> เคยผ่านการบำบัด</label>
    <label><input type="radio" bind:group={formData.q2} value="ไม่เคยผ่านการบำบัด" /> ไม่เคยผ่านการบำบัด</label>
    {#if errors.q2}<div class="error">{errors.q2}</div>{/if}
  </div>

  <div class="card">
    <p>Q3: อัปโหลดรูปภาพแหล่งน้ำ</p>
    <input type="file" accept="image/*" on:change={(e) => handleFileChange(e, "q3")} />
    {#if formData.q3Url}<img src={formData.q3Url} alt="preview" width="200" />{/if}
  </div>

  <div class="card">
    <p>Q4: แหล่งน้ำหลังเก็บเกี่ยวมาจากไหน?</p>
    <input type="text" bind:value={formData.q5} />
    {#if errors.q5}<div class="error">{errors.q5}</div>{/if}
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
        <li><strong>Q1:</strong> {submittedData.q1} {submittedData.q1 === 'อื่นๆ' ? `(${submittedData.q1Other})` : ''}</li>
        <li><strong>Q2:</strong> {submittedData.q2}</li>
        <li><strong>Q3:</strong> {submittedData.q3File ? submittedData.q3File.name : 'ไม่มีไฟล์'}</li>
        <li><strong>Q4:</strong> {submittedData.q5}</li>
      </ul>
      {#if submittedData.q3Url}
        <p><strong>ภาพแหล่งน้ำ:</strong></p>
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
