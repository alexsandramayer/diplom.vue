<template>
    <div class="catalog__item" @click="handleClick">
        <img
        class="catalog__item_img"
        :src="imageUrl"
        alt="category image">
        <a class="catalog__item_btn">{{ title }}</a>
    </div>
    
</template>

<script>
    export default {
        props: {
            id: Number,
            title: String,
            imageUrl: String
        },
        methods: {
            handleClick() {
                this.$emit('click', this.category)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>