<template>
<input 
class="input" 
type="text"
:value="modelValue"
@input="updateInput"
>
</template>

<script>
export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number],
        // myvalue: [String]
    },
    methods: {
        // emits: ['update:modelValue', ],
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
            // this.$emit('update:myvalue', event.target.value)
        }
    }
}
</script>

<style scoped>
.input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
    
}
</style>