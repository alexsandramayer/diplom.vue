<template>
    <HeaderComp />

    <section class="diving-price container_page container_page_mobile">
        <div class="diving-price__content">
            <h2 class="diving-price__title">Дайвинг стоимость</h2>
            <div class="diving-price__items">
                <div class="diving-price__item" v-for="(item, index) in divingInfo" :key="index">
                    <h3 class="diving-price__item_title">{{ item.title }}</h3>
                    <div class="diving-price__item_block">
                        <div class="diving-price__item_left">
                            <div class="diving-price__item_subtitle">{{ item.subtitle }}</div>
                            <button class="diving-price__item_btn">{{ item.btnText }}</button>
                        </div>
                        <div class="diving-price__item_right">
                            <div class="diving-price__item_descr">{{ item.descr }}</div>
                            <div class="diving-price__item_info">
                                <span>{{ item.spanText }}</span> <br>
                                {{ item.text1 }} <br>
                                {{ item.text2 }}
                            </div>
                        </div>
                    </div> 
                </div>
            </div> 
        </div>
        <div class="diving-price__content_mobile" v-if="isSmallScreen">
            <h2 class="diving-price__title">Дайвинг стоимость</h2>
            <div class="diving-price__items">
                <div class="diving-price__item" v-for="(item, index) in divingInfo" :key="index">
                    <h3 class="diving-price__item_title">{{ item.title }}</h3>
                    <div class="diving-price__item_block">
                        <div class="diving-price__item_descr">{{ item.descr }}</div>
                            <div class="diving-price__item_info">
                                <span>{{ item.spanText }}</span> <br>
                                {{ item.text1 }} <br>
                                {{ item.text2 }}
                            </div>
                        <button class="diving-price__item_btn">{{ item.btnText }}</button>
                        
                        
                    </div>  
                </div>
            </div> 
        </div>
    </section>

    <SubscribeComp />
    <FooterComp />
</template>

<script>
import FooterComp from '@/components/FooterComp.vue';
import HeaderComp from '@/components/HeaderComp.vue';
import SubscribeComp from '@/components/SubscribeComp.vue';
import { ref, onMounted } from "vue";

export default {
    components: { HeaderComp, SubscribeComp, FooterComp },
    data() {
        return {
            divingInfo: [
                {
                    title: "Пробное погружение (Discover Scuba Diving)",
                    subtitle: "Включено в стоимость",
                    btnText: "Записаться",
                    descr: "Ознакомительное погружение 40 мин., лекция, аренда бассейна, аренда снаряжения",
                    spanText: "Цена:",
                    text1: "1-2 человека - 2600 руб.",
                    text2: "Индивидуально - 3600 руб."
                },
                {
                    title: "Пробное погружение (Discover Scuba Diving)",
                    subtitle: "Включено в стоимость",
                    btnText: "Записаться",
                    descr: "Ознакомительное погружение 40 мин., лекция, аренда бассейна, аренда снаряжения",
                    spanText: "Цена:",
                    text1: "1-2 человека - 2600 руб.",
                    text2: "Индивидуально - 3600 руб."
                },
                {
                    title: "Пробное погружение (Discover Scuba Diving)",
                    subtitle: "Включено в стоимость",
                    btnText: "Записаться",
                    descr: "Ознакомительное погружение 40 мин., лекция, аренда бассейна, аренда снаряжения",
                    spanText: "Цена:",
                    text1: "1-2 человека - 2600 руб.",
                    text2: "Индивидуально - 3600 руб."
                }
            ]
        }
    },
    setup() {
        const isSmallScreen = ref(false);

        onMounted(async () => {
            if (window.innerWidth <= 375) {
                isSmallScreen.value = true;
            }
        })

        return{
            isSmallScreen
        }
    }
}
</script>

<style lang="scss" scoped>

</style>