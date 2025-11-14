<script>
  import { goto } from '$app/navigation';

  // 📦 mock data
  let data = {
    titledeed: {
      titledeed_num: 'TD-1001',
      titledeed_file: ''
    }
  };

  // 🏷️ labels
  const labels = {
    titledeed: {
      titledeed_num: 'เลขที่โฉนดที่ดิน',
      titledeed_file: 'ไฟล์แนบ (PDF / รูปภาพ)'
    }
  };

  // 🧾 ข้อมูลที่แก้ไขได้
  let formData = structuredClone(data.titledeed);
  let uploadedFileName = '';

  // ✅ ฟังก์ชันบันทึก
  function saveData() {
    data.titledeed = { ...formData };
    alert('✅ บันทึกข้อมูลหลักฐานที่ดินเรียบร้อย');
    goto('/profile');
  }

  // ❌ ฟังก์ชันยกเลิก
  function cancelEdit() {
    formData = structuredClone(data.titledeed);
    goto('/profile');
  }

  // 📂 เมื่อมีการเลือกไฟล์
  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      uploadedFileName = file.name;
      // (ในระบบจริง อาจจะอัปโหลดไป storage แล้วบันทึก URL)
      formData.titledeed_file = URL.createObjectURL(file);
    }
  }
</script>

<h1>ข้อมูลหลักฐานที่ดิน</h1>

<form class="profile" on:submit|preventDefault={saveData}>
  <fieldset class="card">
    <legend>
      ข้อมูลหลักฐานที่ดิน
      <div class="buttons">
        <button type="submit" class="save">บันทึก</button>
        <button type="button" class="cancel" on:click={cancelEdit}>ยกเลิก</button>
      </div>
    </legend>

    <!-- เลขที่โฉนด -->
    <div class="field">
      <label>{labels.titledeed.titledeed_num}</label>
      <input type="text" bind:value={formData.titledeed_num} />
    </div>

    <!-- อัปโหลดไฟล์ -->
    <div class="field">
      <label>{labels.titledeed.titledeed_file}</label>
      <input type="file" accept=".pdf,.jpg,.jpeg,.png" on:change={handleFileUpload} />
    </div>

    {#if formData.titledeed_file}
      <div class="file-preview">
        <a href={formData.titledeed_file} target="_blank" class="file-link">
          📎 {uploadedFileName || 'ดูไฟล์แนบ'}
        </a>
      </div>
    {/if}
  </fieldset>
</form>

<style>
  .profile {
    font-family: 'Prompt', sans-serif;
    margin: 0 auto;
  }

  h1 {
    color: #010b05;
    margin-bottom: 16px;
  }

  fieldset.card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 3px 8px rgba(0,0,0,0.1);
    padding: 20px;
    margin-bottom: 20px;
    border: none;
  }

  legend {
    font-weight: 700;
    font-size: 1.2rem;
    color: #14532d;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .buttons {
    display: flex;
    gap: 8px;
    margin-left: 20px;
  }

  .field {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 10px;
  }

  label {
    width: 220px;
    font-weight: 600;
    color: #374151;
  }

  input[type="text"],
  input[type="file"] {
    flex: 1;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 6px;
    background-color: #fff;
  }

  .file-preview {
    margin-top: 10px;
    margin-left: 220px;
  }

  .file-link {
    color: #2563eb;
    text-decoration: underline;
  }

  button {
    padding: 6px 12px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 600;
  }

  .save {
    background-color: #16a34a;
    color: white;
  }

  .cancel {
    background-color: #dc2626;
    color: white;
  }

  .save:hover {
    background-color: #15803d;
  }

  .cancel:hover {
    background-color: #b91c1c;
  }
</style>
