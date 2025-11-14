<script>
    import Thitaporn from '$lib/Thitaporn.svelte'
    import MyState from '$lib/MyState.svelte'
    import Counter from '$lib/Counter.svelte'
    import MyDeepState from '$lib/MyDeepState.svelte'


    let name ='Thitaporn Chuchan'
    let content = 'This string contains some <strong>HTML!!!</strong>'
    let listContent = '<ul> \ <li>Apple</li> \
                      <li>Banana</li> \
                      <li>Orange</li> \
                      <li>Grape</li> \
                      </ul>'
</script>


<h1> Welcome to {name}</h1>
<Thitaporn />
<MyState />


<Counter />
<Counter />
<Counter />




<p>Hello</p>
<p>{@html content}</p>
<p>{@html listContent}</p>


<MyDeepState />


<style>
    p {
        color:rgb(0, 0, 0);
    }
    h1{
        color:rgb(23, 98, 184);
    }
</style>

