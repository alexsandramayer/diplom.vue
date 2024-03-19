<template>
    <HeaderComp />

    <section class="certificate container_page container_page">
        <div class="certificate__content">
            <h2 class="certificate__title">Подарочный сертификат дайвинг</h2>
            <div class="certificate__info">
                <h2 class="certificate__title_mobile" v-if="isSmallScreen">Подарочный сертификат дайвинг</h2>

                <img class="certificate__img" :src="img1" alt="certificate image">
                <div class="certificate__text">
                    Дайвинг прописан тем, кто обожает море и все, что с ним связано!  Подарите своим знакомым, близким, друзьям, настроение и качественные эмоции  а мы вам в этом поможем! Мы предлагаем подарочный сертификат дайвинг, в сочетании актуальными комплектами и материалами которые вы можете оформить в нашем клубе и вручить друзьям качестве оригинального подарка.<br><br>
                    Каждый  комплект, включает в себя подводную фото сессию, благодаря которой вы поделитесь своими впечатлениями с друзьями и коллегами. Для того чтобы оформить заказ, достаточно позвонить к нам клуб по телефону 7 (495) 545-67-02.<br><br>
                    Так же, вы можете сделать заказ  воспользовавшись электронной формой на сайте.<br><br>
                    Укажите в комментариях опцию - дайвинг в подарок, электронную почту и  телефон для связи. В ближайшее время наш менеджер обязательно свяжется с вами  для уточнения деталей.
                </div>
            </div>
            <div class="certificate__article_block">
                <article>
                    Важно, что приобретая подарок в нашем клубе, вы приобретаете его напрямую, тем самым ограждая себя от посредников, которые зачастую предлагая выбранный «экстрим подарок»  не могут толком объяснить все тонкости и особенности предлагаемого продукта. Обратившись к нам, вы узнаете все тонкости обучения, ваши занятия пройдут под контролем опытных инструкторов  Международной ассоциации PADI на основании тщательно разработанных стандартов. Мы гарантируем безопасность и качество. Занятия проводятся в бассейне  имеющим переменную глубину, что дает более полный комфорт для обучающегося. <br>
                    День и время проведения занятий  строится  согласно индивидуального графика для каждого обучающегося.
                </article>
            </div>
            <div class="certificate__order">
                <h2 class="certificate__order_title">Закажите подарочный сертификат</h2>
                <div class="certificate__order_items">
                    <div class="certificate__order_item" v-for="item in orderItems" :key="item.id">
                        <div class="certificate__order_block">
                            <img class="certificate__order_img" :src="item.img" alt="certificate order img">
                            <div class="certificate__order_info">
                                <div class="certificate__order_titles">
                                    <h3 class="certificate__order_titles-title">{{ item.title }}</h3>
                                    <h3 class="certificate__order_titles-subtitle">{{ item.subtitle }}</h3>
                                </div>
                                <div class="certificate__order_price">
                                    <img :src="item.icon" alt="icon price">
                                    {{ item.price }}
                                </div>
                            </div>
                        </div>
                        <button class="certificate__order_btn">{{ item.btnText }}</button>
                    </div>
                </div>
                <div class="certificate__order_items_mobile" v-if="isSmallScreen">
                    <div class="certificate__order_item" v-for="item in orderItems" :key="item.id">
                        <img class="certificate__order_img" :src="item.img" alt="certificate order img">
                        <div class="certificate__order_block_mobile">
                            <h3 class="certificate__order_titles-title">{{ item.title }}</h3>
                            <div class="certificate__order_price">
                                <img :src="item.icon" alt="icon price">
                                {{ item.price }}
                            </div>
                            <button class="certificate__order_btn">{{ item.btnText }}</button>
                        </div>
                         
                    </div>
                </div>
            </div>
            <div class="certificate__block">
                <div class="certificate__complect">
                    <h2 class="certificate__complect_title">Полный комплект - дайвинг в подарок!</h2>
                    <img class="certificate__complect_img" :src="img2" alt="image certificates">
                </div>
                <div class="certificate__complect_block">
                    <article>
                        <span>Подарочный комплект на пробное погружение с аквалангом + фото</span> <br>
                        Выберите подарок из двух вариантов -  занятия в группе 2 человека или индивидуально с инструктором и фотосессией.
                        <ul class="certificate__complect_list">
                            <li v-for="(item, index) in complectList" :key="index">{{ item.text }}</li>
                        </ul>
                        
                    </article>
                </div>
                <div class="certificate__blockarticles">
                    <div class="certificate__blockarticles_items">
                        <div class="certificate__blockarticles_item" v-for="(item, index) in blockarticlesItems" :key="index">
                            <h2 class="certificate__blockarticles_item-title">
                                {{ item.title }}
                            </h2>
                            <div class="certificate__blockarticles_item-descr">
                                {{ item.descr }}
                            </div>
                        </div>
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
            img1: require('@/assets/images/certificate/certificate__img.jpeg'),
            img2: require('@/assets/images/certificate/certificates__img.jpeg'),
            orderItems: [
                {
                    id: 1,
                    img: require('@/assets/images/blog/blog__img.jpeg'),
                    title: 'Пробное погружение',
                    subtitle: 'В группе 2 человека',
                    icon: require('@/assets/images/icons/tour_price.svg'),
                    price: '2 800₽',
                    btnText: 'Заказать сертификат'
                },
                {
                    id: 2,
                    img: require('@/assets/images/blog/blog__img.jpeg'),
                    title: 'Пробное погружение',
                    subtitle: 'В группе 2 человека',
                    icon: require('@/assets/images/icons/tour_price.svg'),
                    price: '2 800₽',
                    btnText: 'Заказать сертификат'
                },
                {
                    id: 3,
                    img: require('@/assets/images/blog/blog__img.jpeg'),
                    title: 'Пробное погружение',
                    subtitle: 'В группе 2 человека',
                    icon: require('@/assets/images/icons/tour_price.svg'),
                    price: '2 800₽',
                    btnText: 'Заказать сертификат'
                }
            ],
            complectList: [
                {
                    text: 'Длительность программы 3 часа.'
                },
                {
                    text: 'Место проведения: м. Тульская'
                },
                {
                    text: 'Подарочный комплект включает: Презентационный кейс «Акватика», именной сертификат, диплом участника программы  PADI Discover Scuba Diving, аренда бассейна, аренда дайв. снаряжения, обучающая лекция 40 мин, погружение с инструктором в бассейне 40 мин, подводная фото сессия.'
                }
            ],
            blockarticlesItems: [
                {
                    title: 'Подарочный сертификат дайвинг - срок действия!',
                    descr: 'Подарочный комплект "Дайвинг в подарок" вы можете использовать в течении года в удобное время и день. Все, что от вас нужно, это предварительно записаться позвонив к нам в клуб. Длительность каждого из занятий 3 часа. Перед началом занятий инструктор попросит  заполнить необходимые PADI формы, документы, и анкеты о состоянии здоровья.'
                },
                {
                    title: 'Дайвинг в подарок - гарантия качества!',
                    descr: 'Мы проводим занятия индивидуально или в минимальных группах не более трех человек, что позволяет добиться максимальной безопасности, внимания и качества обучения.'
                },
                {
                    title: 'Засчитываем ваш первый опыт!',
                    descr: 'Если вы приобрели подарок на ознакомительное погружение и в дальнейшем имеете желание продолжить обучение, то данное занятие будет зачтено в стоимость начального курса Open Water Diver.'
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