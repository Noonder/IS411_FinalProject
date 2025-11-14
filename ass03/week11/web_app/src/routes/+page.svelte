<script>
    import { count } from '$lib/shared.js'
    import Incrementer from '$lib/Incrementer.svelte'
    import Decrementer from '$lib/Decrementer.svelte'
    import Resetter from '$lib/Resetter.svelte'
    let name = $state('world')
    let a = $state(1)
    let b = $state(2)
    let yes = $state(false)
 
    let questions = $state([
        {id: 1, text: "Where did you go to school?"},
        {id: 2, text: "What is your mother's name?"},
        {id: 3, text: "What is another personal fact?"},
    ])
 
    let selected = $state()
    let answer = $state(" ")
    function handleSubmit (e) {
        e.preventDefault()
        alert(`answered question ${selected.id} (${selected.text}) with
"${answer}"`)
    }
 
    let scoops = $state(1)
    // @ts-ignore
    let flavours = $state([])
    const formatter = new Intl.ListFormat(
        'en', {style: "long" , type: "conjunction"},
    )
</script>
 
<h1>The count is {$count}</h1>
<Incrementer />
<Decrementer />
<Resetter />
<h2>Size</h2>
{#each [1, 2, 3] as number}
    <label>
        <input
            type="radio"
            name="scoops"
            value={number}
            bind:group={scoops}
        />
        {number} {number === 1 ? "scoop": "scoops"}
    </label>
{/each}
 
<h2>Flavour</h2>
{#each ["cookies and cream", "mint choc chip", "strawberry banana"] as flavour}
    <label>
        <input
            type="checkbox"
            name="flavours"
            value={flavour}
            bind:group={flavours}
        />
        {flavour}
    </label>
{/each}
 
{#if flavours.length === 0}
    <p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
    <p>Can't order more flavours than scoops!</p>
{:else}
    <p>
        You ordered {scoops} {scoops === 1 ? 'scoop' : 'scoops'}
        of {formatter.format(flavours)}
    </p>
{/if}
 
<h2>Insecurity questions</h2>
<form onsubmit={handleSubmit}>
    <select bind:value={selected} onchange={() => (answer = '')}>
        {#each questions as question}
            <option value={question}>
                {question.text}
            </option>
        {/each}
    </select>
    <input bind:value={answer} />
    <button disabled={!answer} type="submit">
        Submit
    </button>
</form>
 
<p>selected question {selected
    ? selected.id
    : '[waiting...]'}
</p>
 
<input bind:value={name} />
<h1>Hello {name}</h1>
 
<hr />
<label>
    <input type="number" bind:value={a} min="0" max="10" />
    <input type="range" bind:value={a} min="0" max="10" />
</label>
<label>
    <input type="number" bind:value={b} min="0" max="10" />
    <input type="range" bind:value={b} min="0" max="10" />
</label>
 
<p>{a} + {b} = {a+b}</p>
<hr />
 
<label>
    <input type="checkbox" bind:checked={yes}>
    Yes! send me regular email spam
</label>
 
{#if yes}
    <p>Thank you. We bombard your inbox</p>
{:else}
    <p>You must op-in to continue</p>
{/if}
<button disabled={!yes}>Subscribe</button>
<hr />