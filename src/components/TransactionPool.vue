<template>
    <div class="transaction-pool">
        <div class="row m-3">
            <b-card class="col m-3" title="Transaction Pool Size">
                <b-card-text style="font-size: 2.5em;">{{size}}</b-card-text>
            </b-card>
            <b-card class="col m-3" title="Last Response Time">
                <b-card-text>{{timeStamp}}</b-card-text>
            </b-card>
        </div>
    </div>
</template>

<script>
    import {BCard, BCardText} from 'bootstrap-vue/es/components'
    export default {
        name: "TransactionPool",
        props: {
            size: Number,
            timeStamp: String
        },
        components: {
            'b-card': BCard,
            'b-card-text': BCardText
        }
    }
</script>
