<template>
    <section class="subscribe container container_mobile"> 
        <h3 class="section__subtitle">ссылки на наши социальные сети</h3>
        <h2 class="section__title">Присоединяйся <span>к нам</span></h2> 
        <div class="subscribe__items">
            <div class="subscribe_item" v-for="(item, index) in subscribeItems" :key="index">
                <img class="subscribe_item_img" :src="item.img" alt="subscribe icon">
                <div class="subscribe_item_descr">{{ item.descr }}</div>
                <router-link to="#" class="subscribe_item_btn">{{ item.btnText }}</router-link>
            </div>
            
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                subscribeItems: [
                    {
                        img: require("@/assets/images/icons/subscribe_vk.svg"),
                        descr: 'уже более 5000 тысяч людей в курсе новостей', btnText: 'Присоединиться'
                    },
                    {
                        img: require("@/assets/images/icons/subscribe_facebook.svg"),
                        descr: 'уже более 5000 тысяч людей в курсе новостей', btnText: 'Присоединиться'
                    },
                    {
                        img: require("@/assets/images/icons/subscribe_forum.svg"),
                        descr: 'уже более 5000 тысяч людей в курсе новостей', btnText: 'Присоединиться'
                    },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>