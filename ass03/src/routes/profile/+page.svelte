<script>
// @ts-nocheck

  // mock data จำลองข้อมูลผู้ใช้
  let data = {
    personal: {
      user_type: 'เกษตรกร',
      email: 'user@example.com',
      prefix: 'นาย',
      firstname: 'สมชาย',
      lastname: 'ใจดี',
      id_number: '1234567890123',
      idcard_file: '',
      birthday: '1990-01-01',
      address: '123 หมู่บ้านตัวอย่าง',
      phone_number: '099-999-9915'
    },
    durian: {
      durian_type: "หมอนทอง",
      durian_age: '5',
      tree_count: '20',
      flowering_startdate: "2025-03-15",
      harvest_month: "มิถุนายน",
      weight_expected: "1500.5"
    },
    farm: {
      location: 'https://www.google.com/maps?q=14.973211,102.08432'
    },
    titledeed: {
      titledeed_num: 'TD-1001',
      titledeed_file: ''
    }
  };

  // 🏷️ labels ภาษาไทยของแต่ละฟิลด์
  const labels = {
    personal: {
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
    },
    durian: {
      durian_type: "พันธุ์ทุเรียน",
      durian_age: 'อายุทุเรียน(ปี)',
      tree_count: 'จำนวนต้น',
      flowering_startdate: "วันที่เริ่มออกดอก",
      harvest_month: "คาดว่าจะเก็บเกี่ยวเดือน",
      weight_expected: "ผลผลิตที่คาดว่าจะได้รับ (กก.)"
    },
    farm: {
      location: 'ที่ตั้งแปลง'
    },
    titledeed: {
      titledeed_num: 'เลขที่โฉนดที่ดิน',
      titledeed_file: 'ไฟล์แนบ'
    }
  };

  // @ts-ignore
  let editingSection = null;
  let tempData = {};

  // @ts-ignore
  function startEdit(section) {
    editingSection = section;
    tempData = JSON.parse(JSON.stringify(data[section])); // clone
  }


  // ตัวเลือกคำนำหน้า
  const prefixes = ['นาย', 'นาง', 'นางสาว'];
</script>

  <h1>บัญชีผู้ใช้</h1>

  <!-- ข้อมูลส่วนตัว -->
  <form class="profile">
    <fieldset class="card">
      <legend>
        ข้อมูลส่วนตัว
        {#if editingSection === 'personal'}
          <button type="button" on:click>💾</button>
          <button type="button" on:click>❌</button>
        {:else}
          <button type="button" on:click={() => startEdit('personal')}>✏️</button>
        {/if}
      </legend>

      {#each Object.entries(data.personal) as [key, value]}
        <div class="field">
          <label>{labels.personal[key]}</label>

          {#if editingSection === 'personal'}
            {#if key === 'prefix'}
              <select bind:value={tempData[key]}>
                {#each prefixes as p}
                  <option value={p}>{p}</option>
                {/each}
              </select>

            {:else if key === 'birthday'}
              <input type="date" bind:value={tempData[key]} />

            {:else if key === 'idcard_file'}
              <input type="file" on:change={(e) => tempData[key] = e.target.files[0]?.name} />

            {:else}
              <input bind:value={tempData[key]} />
            {/if}
          {:else}
            {#if key === 'idcard_file'}
              {#if value}
                <a href={value} target="_blank">ดูไฟล์</a>
              {:else}
                <span>-</span>
              {/if}
            {:else}
              <input type="text" value={value} readonly />
            {/if}
          {/if}
        </div>
      {/each}
    </fieldset>
  </form>

  <!-- ข้อมูลพันธุ์ทุเรียน -->
  <form class="profile">
    <fieldset class="card">
      <legend>
        ข้อมูลทุเรียน
        {#if editingSection === 'durian'}
          <button type="button" on:click>💾</button>
          <button type="button" on:click>❌</button>
        {:else}
          <button type="button" on:click={() => startEdit('durian')}>✏️</button>
        {/if}
      </legend>

      {#each Object.entries(data.durian) as [key, value]}
        <div class="field">
          <label>{labels.durian[key]}</label>
          {#if editingSection === 'durian'}
            {#if key === 'flowering_startdate'}
              <input type="date" bind:value={tempData[key]} />
            {:else}
              <input bind:value={tempData[key]} />
            {/if}
          {:else}
            <input type="text" value={value} readonly />
          {/if}
        </div>
      {/each}
    </fieldset>
  </form>

    <!-- ข้อมูลแปลงเพาะปลูก -->
    <form class="profile">
      <fieldset class="card">
        <legend>
          ข้อมูลแปลงเพาะปลูก
          {#if editingSection === 'farm'}
            <button type="button" on:click>💾</button>
            <button type="button" on:click>❌</button>
          {:else}
            <button type="button" on:click={() => startEdit('farm')}>✏️</button>
          {/if}
        </legend>

        {#each Object.entries(data.farm) as [key, value]}
          <div class="field">
            <label>{labels.farm[key]}</label>

            {#if editingSection === 'farm'}
              <input bind:value={tempData[key]} placeholder="ใส่ลิงก์ Google Maps" />
            {:else}
              <a href={value} target="_blank" class="map-link">เปิดแผนที่</a>
            {/if}
          </div>
        {/each}
      </fieldset>
    </form>


  <!-- หลักฐานการใช้ที่ดิน -->
  <form class="profile">
    <fieldset class="card">
      <legend>
        หลักฐานการใช้ที่ดิน
        {#if editingSection === 'landDoc'}
          <button type="button" on:click>💾</button>
          <button type="button" on:click>❌</button>
        {:else}
          <button type="button" on:click={() => startEdit('titledeed')}>✏️</button>
        {/if}
      </legend>

      {#each Object.entries(data.titledeed) as [key, value]}
        <div class="field">
          <label>{labels.titledeed[key]}</label>

          {#if editingSection === 'titledeed'}
            {#if key === 'titledeed_file'}
              <input type="file" on:change={(e) => tempData[key] = e.target.files[0]?.name} />
            {:else}
              <input bind:value={tempData[key]} />
            {/if}
          {:else}
            {#if key === 'titledeed_file'}
              {#if value}
                <a href={value} target="_blank">ดูไฟล์</a>
              {:else}
                <span>-</span>
              {/if}
            {:else}
              <input type="text" value={value} readonly />
            {/if}
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
    display: flex;
    align-items: center;
    gap: 8px;
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

  input[readonly] {
    background-color: #f3f4f6;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 6px;
    flex: 1;
  }

  input, select {
    flex: 1;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 6px;
  }

  button {
    padding: 6px 10px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
  }

  .map-link {
    color: #2563eb;
    text-decoration: underline;
  }
</style>
