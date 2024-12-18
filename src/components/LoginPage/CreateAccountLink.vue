<script lang="ts" setup>
interface Emits {
  (event: 'created', login: boolean): void;
}

const emit = defineEmits<Emits>()

function created () {
    emit('created', true)
}
</script>
<template>
    <section class="create-account">
        <div>
            <span class="not-registered"> Not registered Yet?</span>
            <a @click="created" href="#"> Create an account</a>
        </div>
    </section>
</template>
<style scoped>
.create-account {
    font-size: 18px;
}
.not-registered {
    color: #525252;
}
a {
    color: #7F265B;
    text-decoration: none;
}
</style>