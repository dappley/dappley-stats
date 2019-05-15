<template>
    <div class="transaction-pool">
        Transaction Pool Size: {{size}}
        <br>
        Last Response Time: {{timeStamp}}
    </div>
</template>

<script>
    export default {
        name: "TransactionPool",
        props: {
            size: Number,
            timeStamp: String
        }
    }
</script>
