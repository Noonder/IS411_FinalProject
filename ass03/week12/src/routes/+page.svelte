<script>
// @ts-nocheck
    let { data,form} = $props();
</script>

<div class="centered">
    <h1>todos</h1>

    {#if form?.error}
        <p class="error">{form.error}</p>
    {/if}

    <form method="post" action="?/create">
        <label>
            add a todo:
            <input
                name="description"
                autocomplete="off"
                
            />
        </label>
    </form>
    <ul class="tools">
        {#each data.todos as todo (todo.id)}
            <li>
                <form action="?/delete" method="post">
                    <input type="hidden" name="id" value={todo.id} />
                    <span>{todo.description}</span>
                    <button>delete</button>
                </form>
            </li>
        {/each}
    </ul>
</div>
