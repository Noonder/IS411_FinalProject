<script>
  import { goto } from '$app/navigation';

  // 📦 mock data (ข้อมูลจำลอง)
  let data = {
    farm: {
      location: 'https://www.google.com/maps?q=14.973211,102.08432'
    }
  };

  // 🏷️ labels
  const labels = {
    farm: {
      location: 'ที่ตั้งแปลง (Google Maps URL)'
    }
  };

  // 🧾 ข้อมูลที่แก้ไขได้
  let formData = structuredClone(data.farm);

  // ✅ บันทึก
  function saveData() {
    data.farm = { ...formData };
    alert('✅ บันทึกข้อมูลแปลงเพาะปลูกเรียบร้อย');
    goto('/profile');
  }

  // ❌ ยกเลิก
  function cancelEdit() {
    formData = structuredClone(data.farm);
    goto('/profile');
  }
</script>

<h1>ข้อมูลแปลงเพาะปลูก</h1>

<form class="profile" on:submit|preventDefault={saveData}>
  <fieldset class="card">
    <legend>
      ข้อมูลแปลงเพาะปลูก
      <div class="buttons">
        <button type="submit" class="save">บันทึก</button>
        <button type="button" class="cancel" on:click={cancelEdit}>ยกเลิก</button>
      </div>
    </legend>

    {#each Object.entries(formData) as [key, value]}
      <div class="field">
        <label>{labels.farm[key]}</label>
        <input type="text" bind:value={formData[key]} placeholder="กรอกลิงก์แผนที่ Google Maps" />
      </div>

      {#if formData.location}
        <div class="map-preview">
          <a href={formData.location} target="_blank" class="map-link">🌍 เปิดดูใน Google Maps</a>
        </div>
      {/if}
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

  .buttons {
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

  .map-preview {
    margin-top: 10px;
    margin-left: 220px;
  }

  .map-link {
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
