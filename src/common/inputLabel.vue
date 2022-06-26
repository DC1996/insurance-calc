<template>
    <p class="font-weight-medium text-body-2 text-sm-body-1 text-xl-h5 mb-1 mb-xl-3">
        {{ this.text}}<span v-if="this.mandatory" class="text-h5 text-xl-h4 mandatory-sign">*</span>
        <span v-if="!this.mandatory" class="text-h5 text-xl-h4 mandatory-sign"> </span>
    </p>
</template>

<style scoped>
.mandatory-sign {
    color: #E88D67;
}
</style>

<script>
export default {
    props: {
        'text': String,
        'mandatory': Boolean
    }
}
</script>