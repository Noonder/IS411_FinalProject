<script>
// @ts-nocheck

  let { children } = $props()
</script>

<nav class="nav">
  <a href="/">home</a>
  <a href="/survey">ประเมิน GAP ด้วยตัวเอง</a>
  <a href="/status">สถานะการยื่นคำขอ</a>
  <a href="/farmer">Admin</a>
  <a href="/profile">ข้อมูลส่วนตัว</a>
  

</nav>

{@render children()}

<style>
  .nav {
    display: flex;
    gap: 12px;
    padding: 12px 16px;
    border-bottom: 1px solid rgb(16, 88, 0);
  }
  .nav a {
    text-decoration: none;
    color: #333;
  }
  .nav a:hover {
    text-decoration: underline;
  }
</style>