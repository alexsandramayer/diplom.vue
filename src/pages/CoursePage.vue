<template>
   <HeaderComp />

    <section class="course container_page container_page_mobile">
        <div class="course__content">
            <h2 class="course__title">Расписание курса Open Water Diver</h2>
            <div class="course__info">
                <span>В вашем распоряжении:</span> <br><br>
                <ul class="course__info_list">
                    <li v-for="(list, index) in infoList" :key="index">
                    {{ list.text }}
                    </li>
                </ul>
            </div>
            <div class="course__rates">
                <div class="course__rates_text">Если вы желаете отучиться по индивидуальному графику, в удобное время или пройти VIP обучение с инструктором предлагаем Вам рассмотреть  следующие тарифы:</div>
                <div class="course__rates_buttons">
                    <router-link class="course__rates_btn" :to="btn.url" v-for="(btn, index) in ratesBtn" :key="index" @click="goToPage">{{ btn.text }}</router-link>
                </div> 
            </div>
            <table class="course__table">
                <caption>Акция - доступный дайвинг!</caption>
                <thead>
                    <tr>
                        <th scope="col" v-for="item in tableHeads" :key="item.id">{{ item.text }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in tableData" :key="item.id">
                        <td scope="row">{{ item.courseName }}</td>
                        <td scope="row">{{ item.courseDate }}</td>
                        <td scope="row">{{ item.courseExam }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="course__enabled">
                <span>В стоимость включено:</span><br><br>
                <ul class="course__enabled_list">
                    <li v-for="(item, index) in enabledList" :key="index">{{ item.text }}</li>
                </ul>
            </div>
            <div class="course__additional">
                <span> Дополнительно оплачивается:</span><br><br>
                <ul class="course__additional_list">
                    <li v-for="(item, index) in additionalList" :key="index">{{ item.text }}</li>
                </ul>
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

export default {
    components: { HeaderComp, SubscribeComp, FooterComp },
    data() {
        return {
            infoList: [
                {
                    text: 'Обучение в индивидуальных мини группах по доступной стоимости!'
                },
                {
                    text: 'Современный бассейн для дайвинга глубиной 6 метров!'
                },
                {
                    text: 'Удобный график занятий в вечернее время и в выходные.'
                },
                {
                    text: 'Полноценное время каждого из занятий - 3-4 часа.'
                },
                {
                    text: 'Аренда бассейна и снаряжения включены в стоимость обучения!'
                },
            ],
            ratesBtn: [
                {
                    url: '#',
                    text: '“Индивидуальный график”'
                },
                {
                    url: '/divingprice',
                    text: 'Полный прайс на курсы'
                }
            ],
            tableHeads: [
                {
                    id: 1, text: "Курс обучения"
                },
                {
                    id: 2, text: "Начало занятий"
                },
                {
                    id: 3, text: "Сдача экзамена"
                }
            ],
            tableData: [
                {
                    id: 1, courseName: "Open Water Driver", courseDate: "27 января 2019", courseExam: "Включена в стоимость"
                },
                {
                    id: 2, courseName: "Open Water Driver", courseDate: "27 января 2019", courseExam: "Включена в стоимость"
                },
                {
                    id: 3, courseName: "Open Water Driver", courseDate: "27 января 2019", courseExam: "Включена в стоимость"
                }
            ],
            enabledList: [
                {
                    text: "Аренда бассейна"
                },
                {
                    text: "Аренда снаряжения"
                },
                {
                    text: "Практические и теоретические занятия в группе не более 3 человек"
                },
                {
                    text: "Заключительный теоретический экзамен по курсу Open Water Diver referral"
                },
                {
                    text: "Экзамен на открытой воде в поездке с клубом за Рубеж"
                },
            ],
            additionalList: [
                {
                    text: "Учебные материалы (2700 руб)"
                },
                {
                    text: "Экзамен на открытой воде в Подмосковье - 10 000 руб. (включена сертификация и все взносы в PADI)"
                }
            ]
        }
    },
    methods: {
        goToPage() {
            document.documentElement.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            document.body.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>