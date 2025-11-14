<script>
  import { goto } from '$app/navigation';

  // 📦 mock data (ข้อมูลจำลอง)
  let data = {
    durian: {
      durian_type: "หมอนทอง",
      durian_age: '5',
      tree_count: '20',
      flowering_startdate: "2025-03-15",
      harvest_month: "มิถุนายน",
      weight_expected: "1500.5"
    }
  };

  // 🏷️ labels แปลไทย
  const labels = {
    durian: {
      durian_type: "พันธุ์ทุเรียน",
      durian_age: 'อายุทุเรียน (ปี)',
      tree_count: 'จำนวนต้น',
      flowering_startdate: "วันที่เริ่มออกดอก",
      harvest_month: "คาดว่าจะเก็บเกี่ยวเดือน",
      weight_expected: "ผลผลิตที่คาดว่าจะได้รับ (กก.)"
    }
  };

  // 🧾 ค่าชั่วคราวสำหรับแก้ไข
  let formData = structuredClone(data.durian);

  // ✅ ฟังก์ชันบันทึก
  function saveData() {
    data.durian = { ...formData };
    alert('✅ บันทึกข้อมูลทุเรียนเรียบร้อย');
    goto('/profile');
  }

  // ❌ ฟังก์ชันยกเลิก
  function cancelEdit() {
    formData = structuredClone(data.durian);
    goto('/profile');
  }
</script>

<h1>ข้อมูลทุเรียน</h1>

<form class="profile" on:submit|preventDefault={saveData}>
  <fieldset class="card">
    <legend>
      ข้อมูลทุเรียน
      <div class="action">
        <button type="submit" class="save">บันทึก</button>
        <button type="button" class="cancel" on:click={cancelEdit}>ยกเลิก</button>
      </div>
    </legend>

    {#each Object.entries(formData) as [key, value]}
      <div class="field">
        <label>{labels.durian[key]}</label>

        {#if key === 'flowering_startdate'}
          <input type="date" bind:value={formData[key]} />
        {:else if key === 'durian_age' || key === 'tree_count' || key === 'weight_expected'}
          <input type="number" min="0" step="any" bind:value={formData[key]} />
        {:else}
          <input type="text" bind:value={formData[key]} />
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
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .action {
    display: flex;
    gap: 8px;
    margin-left: 20px;
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
