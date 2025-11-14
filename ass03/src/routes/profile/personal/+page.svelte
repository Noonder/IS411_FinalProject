<!-- src/routes/profile/personal/+page.svelte -->
<script>
  export let data;

  // เก็บค่าชั่วคราวระหว่างแก้ไข
  let formData = { ...data.personal };

  // ข้อความ error จาก server (action)
  let error = data?.error || '';

  // ฟังก์ชันยกเลิก: รีเซ็ตค่า form เป็นค่าเดิมจาก server
  function cancelEdit() {
    formData = { ...data.personal };
    error = '';
  }

  const labels = {
    user_type: 'ประเภทผู้ใช้',
    prefix: 'คำนำหน้า',
    email: 'อีเมล',
    firstname: 'ชื่อ',
    lastname: 'นามสกุล',
    id_number: 'หมายเลขบัตรประชาชน',
    idcard_file: 'อัปโหลดรูปภาพบัตรประชาชน',
    birthday: 'วันเกิด',
    address: 'ที่อยู่',
    phone_number: 'เบอร์โทรศัพท์'
  };
</script>

<h1>บัญชีผู้ใช้</h1>

{#if error}
  <p style="color:red">{error}</p>
{/if}

<form method="POST" class="profile">
  <fieldset class="card">
    <legend>
      ข้อมูลส่วนตัว
      <div class="buttons">
        <!-- ปุ่มบันทึก ส่ง form ไป action submit -->
        <button type="submit" class="save" formaction="?/submit">บันทึก</button>
        <!-- ปุ่มยกเลิก ไม่ส่ง form -->
        <button type="button" class="cancel" on:click={cancelEdit}>ยกเลิก</button>
      </div>
    </legend>

    {#each Object.entries(labels) as [key, label]}
      <div class="field">
        <label>{label}</label>

        {#if key === 'idcard_file'}
          <input type="file" name={key} on:change={e => formData[key] = e.target.files[0]?.name || ''} />
        {:else if key === 'birthday'}
          <input type="date" name={key} bind:value={formData[key]} />
        {:else if key === 'email'}
          <input type="email" name={key} bind:value={formData[key]} />
        {:else if key === 'phone_number'}
          <input type="tel" name={key} bind:value={formData[key]} />
        {:else}
          <input type="text" name={key} bind:value={formData[key]} />
        {/if}
      </div>
    {/each}
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
    margin-bottom: 10px;
  }

  .field {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
  }

  label {
    width: 220px;
    font-weight: 600;
    color: #374151;
  }

  input {
    flex: 1;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 6px;
  }

  .buttons {
    display: flex;
    gap: 8px;
    margin-top: 12px;
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
