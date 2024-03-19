<template>
    <HeaderComp />

    <div class="tours container_page container_page_mobile">
        <div class="tours__content">
            <h2 class="tours__title">Дайвинг-туры</h2>
            <div class="tours__text-first" v-for="(text, index) in toursText.slice(0,1)" :key="index">
                {{ text.text }}
            </div>

            <h2 class="tours__subtitle">Предстоящие туры в этом году</h2>
            <div class="tours__items">
                <div class="tours__item" v-for="(tour, index) in tours" :key="index">
                    <img class="tours__item_img" :src="tour.img" alt="tour image">
                    <div class="tours__item_block">
                        <div class="tours__item_left">
                            <h2 class="tours__item_title">{{ tour.title }}</h2>
                            <button class="tours__item_btn">{{ tour.btnText }}</button>
                        </div>
                        <div class="tours__item_right">
                            <div class="tours__item_data"> 
                                <img class="tours__item_data-calendar" :src="tour.imgCalendar">
                                {{ tour.textData }}
                            </div>
                            <div class="tours__item_price">
                                <img class="tours__item_data-price" :src="tour.imgPrice">
                                {{ tour.textPrice }}
                            </div>
                        </div>
                    </div> 
                </div>
            </div>

            <div class="tours__text-second" v-for="(text, index) in toursText.slice(1,2)" :key="index">
                {{ text.text }}>
            </div>
        </div>

        <div class="tours__content_mobile" v-if="isSmallScreen"> 

            <h2 class="tours__subtitle">Предстоящие туры в этом году</h2>
            <div class="tours__items">
                <div class="tours__item" v-for="(tour, index) in tours" :key="index">
                    <img class="tours__item_img" :src="tour.img" alt="tour image">
                    <div class="tours__item_block_mobile">
                        <h2 class="tours__item_title">{{ tour.title }}</h2>
                        <div class="tours__item_right_mobile">
                            <div class="tours__item_data"> 
                                <img class="tours__item_data-calendar" :src="tour.imgCalendar">
                                {{ tour.textData }}
                            </div>
                            <div class="tours__item_price">
                                <img class="tours__item_data-price" :src="tour.imgPrice">
                                {{ tour.textPrice }}
                            </div>
                        </div>
                        <button class="tours__item_btn">{{ tour.btnText }}</button>
                        
                        
                    </div> 
                </div> 
            </div>

            
        </div>
    </div>

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
            tours: [
                {
                    img: require("@/assets/images/tours/tour__img.jpeg"),
                    title: 'Дайвинг-Шарм Эль Шейх Сдача открытой воды',
                    btnText: 'Подробнее',
                    imgCalendar: require("@/assets/images/icons/tour_calendar.svg"),
                    imgPrice: require("@/assets/images/icons/tour_price.svg"),
                    textData: '11-20 апреля',
                    textPrice: '75 000₽'
                },
                {
                    img: require("@/assets/images/tours/tour__img.jpeg"),
                    title: 'Дайвинг-Шарм Эль Шейх Сдача открытой воды',
                    btnText: 'Подробнее',
                    imgCalendar: require("@/assets/images/icons/tour_calendar.svg"),
                    imgPrice: require("@/assets/images/icons/tour_price.svg"),
                    textData: '11-20 апреля',
                    textPrice: '75 000₽'
                }
            ],
            toursText: [
                { 
                    text: 'Добро пожаловать в путешествие с Акватикой! В  клубной поездке ваше путешествие гарантированно обещает быть более комфортным, красочным и позитивным. Все дайвинг туры организованные клубом проходят в сопровождении русских инструкторов клуба и опытных, профессиональных гидов. В нашей поездке вам не придется скучать! Вы получаете уникальную возможность заниматься любимым хобби, в компании друзей и единомышленников, объединенных любимым делом, путешествуете с русской группой, узнаете много полезного нового и интересного, испытывая при этом массу позитивных эмоций.'
                },
                {
                    text: 'В независимости от того, какой формат поездки вы выберите, будь это дейли дайвинг, дайвинг сафари или выезды выходного дня, в процессе поездки вы всегда сможете продолжить обучение, закончить интересующие вас курсы и специализации. Предлагаем вам ознакомиться с обзором предстоящих поездок наиболее популярных направлений из категории дайвинг туризм.'
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