<template>
    <HeaderComp />

    <section class="tests container_page container_page_mobile">
        <div class="tests__content">
            <h2 class="tests__title">Тесты дайверов</h2>
            <div class="tests__items">
                <div class="tests__item" v-for="(item, index) in testItems" :key="index">
                    <div class="tests__item_block">
                        <div class="tests__item_block-top">
                            <h3 class="tests__item_title">{{ item.title }}</h3>
                            <h3 class="tests__item_subtitle">{{ item.subtitle }}</h3>
                        </div>
                        <button class="tests__item_btn">{{ item.btnText }}</button>
                    </div>
                    <div class="tests__item_descr">{{ item.descr }}</div>
                </div>
            </div>
            <div class="tests__items_mobile" v-if="isSmallScreen">
                <div class="tests__item" v-for="(item, index) in testItems" :key="index">
                    <div class="tests__item_block_mobile">
                        <h3 class="tests__item_title">{{ item.title }}</h3>
                        <h3 class="tests__item_subtitle">{{ item.subtitle }}</h3>
                        <div class="tests__item_descr">{{ item.descr }}</div>
                        <button class="tests__item_btn">{{ item.btnText }}</button>
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
            testItems: [
                {
                    title: 'Тест №1',
                    subtitle: 'Вопросов 15',
                    btnText: 'Записаться', 
                    descr: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus tempor augue eu porta. Duis fermentum non ex vitae imperdiet. Cras eros eros, euismod congue varius sed, fermentum sed eros. Aenean sit amet maximus elit. In eget ex volutpat, hendrerit sapien in, tempus mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus tempor augue eu porta. Duis fermentum non ex vitae imperdiet. Cras eros eros, euismod congue varius sed, fermentum sed eros. Aenean sit amet maximus elit. In eget ex volutpat, hendrerit sapien in, tempus mauris.'
                },
                {
                    title: 'Тест №1',
                    subtitle: 'Вопросов 15',
                    btnText: 'Записаться', 
                    descr: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus tempor augue eu porta. Duis fermentum non ex vitae imperdiet. Cras eros eros, euismod congue varius sed, fermentum sed eros. Aenean sit amet maximus elit. In eget ex volutpat, hendrerit sapien in, tempus mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus tempor augue eu porta. Duis fermentum non ex vitae imperdiet. Cras eros eros, euismod congue varius sed, fermentum sed eros. Aenean sit amet maximus elit. In eget ex volutpat, hendrerit sapien in, tempus mauris.'
                },
                {
                    title: 'Тест №1',
                    subtitle: 'Вопросов 15',
                    btnText: 'Записаться', 
                    descr: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus tempor augue eu porta. Duis fermentum non ex vitae imperdiet. Cras eros eros, euismod congue varius sed, fermentum sed eros. Aenean sit amet maximus elit. In eget ex volutpat, hendrerit sapien in, tempus mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus tempor augue eu porta. Duis fermentum non ex vitae imperdiet. Cras eros eros, euismod congue varius sed, fermentum sed eros. Aenean sit amet maximus elit. In eget ex volutpat, hendrerit sapien in, tempus mauris.'
                },
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