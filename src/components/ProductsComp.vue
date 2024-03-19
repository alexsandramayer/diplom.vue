<template>
    <div class="products__item">
        <img class="products__item_img" :src="product.imageUrl1" alt="product image">
        <div class="products__item_content">
            <h3 class="products__item_title">{{ product.title }}</h3>
            <div class="products__item_descr">{{ product.descrMini }}</div>
            <div class="products__item_info">
                <div class="products__item_price">{{ product.price }} ₽</div>
                <button class="products__item_btn" @click="selectProduct(product)">Подробнее</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: true,
        },
        
    },
    methods: {
        selectProduct(product) {
            this.$emit("productSelected", product);
        },
    },   
    
}
</script>

<style lang="scss" scoped>

</style>