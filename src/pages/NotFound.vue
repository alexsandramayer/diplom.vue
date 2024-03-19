<template>
    <HeaderComp />
    <div class="notfound__block container_page container_page_mobile">

        <img class="notfound__img" src="../assets/images/not_found/error.svg" alt="not found image">
        <div class="notfound__info">
            <div class="notfound__descr">Страница не найдена</div>
        
            <a class="notfound__btn" href="/">Вернуться на главную</a>
        </div>
        
    </div>


    <FooterComp />
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue';
import FooterComp from '@/components/FooterComp.vue';

    export default {
        components: { HeaderComp, FooterComp },
        
    }
</script>

<style lang="scss" scoped>

</style>