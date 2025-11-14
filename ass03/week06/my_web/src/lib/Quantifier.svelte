<script>
    let quantity = 0

    function increment() {
        quantity += 1
    }

    function decrement(){
        if (quantity === 0) {
            return
        }

        quantity -= 1
    }

</script>

<span>Curent quantity: {quantity}</span>

<div>
    <button class="button" onclick={decrement}>-</button>
    <button class="button" onclick={increment}>+</button>
</div>