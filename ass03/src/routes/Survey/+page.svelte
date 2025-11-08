<script>
  import SurveyHeader from '$lib/SurveyHeader.svelte';
  import SurveyItem from '$lib/SurveyItem.svelte';
  import { aspects } from '$lib/survey.js';
</script>

<section class="wrap">
  <h1>ประเมิน GAP ด้วยตนเอง</h1>
  <p class="subtitle">แบบสำรวจทั้ง 8 ด้าน</p>

  <!-- Grid ของ Survey Items -->
  <section class="grid">
    {#each aspects as item, i}
      <SurveyItem {...item} />
    {/each}
  </section>
</section>

<style>
  .wrap { padding: 16px; }
  h1 { margin: 0 0 6px; }
  .subtitle { margin: 0 0 14px; color: #666; }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 14px;
  }
</style>
