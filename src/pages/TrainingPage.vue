<template>
    <HeaderComp /> 

    <section class="training container_page container_page_mobile">
        <div class="training__buttons" >
            <router-link class="training__btn" to="/certificate" v-for="button in buttons.slice(0, 1)" :key="button.id">
                <img :src="button.img" alt="gift icon"> 
                {{ button.text }}
            </router-link>
            <button class="training__btn" @click="openModal()" type="submit" v-for="button in buttons.slice(1, 2)" :key="button.id">
                <img :src="button.img" alt="online recording icon">
                {{ button.text }}
            </button>
        </div>
        <CallbackModalComp :isOpen="callbackModalOpen" @close-modal="closeModal" />
        <div class="training__block">
            <h3 class="training__block_subtitle">ПУТЕШЕСТВИЕ В ТЫСЯЧУ МИЛЬ НАЧИНАЕТСЯ С ПЕРВОГО КЛИКА</h3>
            <h2 class="training__block_title">Обучение дайвингу в Москве</h2>
            <div class="training__block_descr">
                «Не секрет, что всякое качество сокращается количеством». Придерживаясь именно этого мнения, мы не приравниваем сертификацию к торговле "овощами", не участвуем в "Групонах" и не приемлем конвейерное дайвинг обучение в группах по 10-15 человек. Четко осознавая всю степень ответственности, мы ценим свою работу, ваше время и силы. Мы предлагаем Вам именно обучение дайвингу, работу на результат, а не банальную отработку стандартов. Все занятия проходят в максимально индивидуальном режиме, в комфортной, безопасной атмосфере, под руководством профессионалов крупнейшей ассоциации PADI. Помните, что выбирая обучение дайвингу, основной этап не в получении заветной карточки - сертификата, а в том, насколько уверенно будет усвоен материал - фундамент и основа безопасности на протяжении всех ваших дальнейших погружений. У нас вы можете пройти курсы дайвинга по всей линейке ассоциации PADI, от пробного погружения до профессионального уровня. День, время занятий вы выбираете удобное для вас и занимаетесь в лучшем бассейне Москвы. Школа дайвинга Акватика проводит  занятия в группах не более 2-3 человек, при желании вы можете заниматься индивидуально с инструктором по доступной стоимости. <br><br>

                Желаем приятного обучения!
            </div>
        </div>

        <div class="training__courses">
            <h3 class="training__courses_title">Выберите курс обучения</h3>
            <div class="training__courses_items">
                <div class="training__courses_item" v-for="course in courses" :key="course.id">
                    <h4 class="training__courses_subtitle">{{ course.title }}</h4>
                    <div class="training__courses_links" >
                        <div class="training__courses_link" v-for="link in course.links" :key="link.alias">
                            <router-link :to="getLinkUrl(link)" @click="goToPage">
                                <img :src="link.img" alt="course image">
                            </router-link>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>

    <FeedbackSliderComp />

    <section class="training__information container_page container_page_mobile">
        <div class="training__content">
            <div class="training__info">
                <h3 class="training__info_title">Курсы дайвинга в Москве</h3>
                <p class="training__info_descr">Совершив однажды пробное погружение на Красном море, Вы понимаете, что подводное плавание – это отдых, именно для Вас! Подводное плавание постепенно отталкивает прежние увлечения на задний план. В какой-то момент, вы приходите к мысли, что нужны знания, практика и понимание самого процесса. Но как выбрать именно те курсы дайвинга, которые дадут наиболее полное и качественное усвоение? Ходит много разговоров о том, какую систему обучения выбрать. Существует множество обучающих ассоциаций дайвинга - PADI, SSI, NDL и.т.д. Здесь важно понимать, что учит Вас не система, а инструктор, и именно от его профессионализма, подхода, методики, внимания зависит качество а следовательно - Ваша безопасность. Поэтому сама школа дайвинга в Москве или на курорте второстепенна, выбирайте инструктора, профессионала, а не систему или "раскрученный" клуб. Обучение дайвингу в Москве, сделает процесс более комфортным, так как будет проходить рядом с домом и на родном языке и по доступный ценам.</p>
            </div>
            <div class="training__articles" ref="trainingArticles" @touchstart="startScroll($event, containerTrainingArticles, itemWidthTrainingArticles)" @touchend="stopScroll(containerTrainingArticles)" @touchmove="scroll($event, containerTrainingArticles, itemWidthTrainingArticles)">
                <article class="training__article" v-for="article in trainingArticles" :key="article.id">
                    <img class="training__article_img" :src="article.img" alt="article image">
                    <h4 class="training__article_title">{{ article.title }}</h4>
                    <router-link class="training__article_link" :to="getlinkUrlArticles(article)" @click="goToPage">{{ article.btnText }}</router-link>
                </article>
            </div>
             

            <div class="training__gallery">
                <h3 class="training__gallery_title">Фотографии по обучению</h3>
                <div class="training__gallery_photos" ref="trainingGallery" @touchstart="startScroll($event, containerTrainingGallery, itemWidthTrainingArticles)" @touchend="stopScroll(containerTrainingGallery)" @touchmove="scroll($event, containerTrainingGallery, itemWidthTrainingGallery)">
                    <div class="training__gallery_photo" v-for="(image, index) in imgGallery" :key="index">
                        <img :src="image.img" alt="gallery photo image">
                    </div>
                </div>
            </div>

            <div class="training__padi">
                <h3 class="training__padi_title">Курсы дайвинга - дайвинг обучение - структура курсов PADI</h3>
                <p class="training__padi_text">На примере начального <span>дайвинг обучения Padi Open Water Diver</span> попробуем разобраться в самой структуре <br><br>
                Из чего состоит курс: <br><br>
                * Tеоретические занятия<br>
                * Сдача экзаменов и тестов<br>
                * Отработка практических навыков в бассейне<br>
                * Демонстрация навыков на открытом водоеме<br><br>
                <span>Бассейн:</span> Вам предстоят пять практических занятий в закрытом бассейне, каждое из которых займет 40-60 минут. Под руководством опытных инструкторов постепенно осваиваются все самые важные и необходимые для Ваших дальнейших погружений навыки, переходящие от простых к более сложным.<br><br>
                <span>Открытая вода:</span> Структура базируется на повторении и отработке упражнений, ранее изученных в бассейне. Вам необходимо будет продемонстрировать своё уверенное владение навыками в реальных условиях открытой воды с применением полученных знаний на практике. Структура заключительного этапа  состоит из четырех погружений.<br><br>
                <span>Закончить дайвинг обучение на открытом водоеме предлагается одним из следующих способов:</span><br><br>
                * В летнее время - это совместные выезды клуба на Подмосковные водоемы.<br>
                * В зимнее время организуются выезды на Красное море.<br>
                * Если есть желание, завершить "открытую воду" не привязываясь к выездам клуба, предлагается вариант завершения в удобное время, например: во время вашего отпуска, в любой стране Мира, в дайв-центре PADI.</p>
            </div>

            <div class="training__referral">
                <h3 class="training__referral_title">Обучение дайвингу в Москве, что такое Referral</h3>
                <p class="training__referral_text">
                    После того, как Вы успешно пройдёте первую часть, основное обучение дайвингу в Москве (теория + закрытая вода), вам будет выдан открепительный сертификат Referral – это промежуточный документ, подтверждающий освоение основной части курсов и являющийся направлением на завершение курсов на открытом водоеме, это вы можете сделать на основании вашей Referral формы, в течение года, в любом из дайв-центров PADI, в любой точке мира. Выбирая школу дайвинга в Москве, либо на курорте важно обращать внимание на тот факт, что стоимость  во многих местах указывается именно на Referal обучение (закрытая вода + теория + экзамены) Завершение занятий - "Открытая вода" оплачивается дополнительно.
                </p>
            </div>
            <div class="training__article_block">
                <article>
                    Друзья, обратите внимание на то, что самое бестолковое занятие, потерянное время и сбережения, это курсы дайвинга в группах по 8-10 человек, по ускоренному и плотному графику, с акцентом не немедленную выдачу сертификата. Задача такого метода, предложить более дешевый вариант и заработать на количестве желающих сэкономить. О качестве здесь не может быть и речи. В дальнейшем, для более плотного усвоения материала, вам придется расплачиваться дополнительными занятиями. Новомодные примеры таких курсов - всевозможные акции или "групоны". Поэтому, видя «бесплатный сыр», задумайтесь о качестве, вспомните все необходимые составляющие курса, уточните изначально, что войдет в стоимость курса, длительность занятий и количество человек в вашей группе. Помните, что Вы учитесь для себя, цените свое время и силы!
                </article>
            </div>
            
        </div>
        
    </section>

    <SubscribeComp />

    <FooterComp />
</template>

<script>
import FeedbackSliderComp from '@/components/FeedbackSliderComp.vue';
import FooterComp from '@/components/FooterComp.vue';
import HeaderComp from '@/components/HeaderComp.vue';
import SubscribeComp from '@/components/SubscribeComp.vue';
import CallbackModalComp from "@/components/CallbackModalComp.vue"; 



export default {
    components: { HeaderComp, FooterComp, FeedbackSliderComp, SubscribeComp, CallbackModalComp },
    data() {
        return {
            buttons: [
                {
                    id: 1,
                    img: require('@/assets/images/icons/gift.svg'),
                    text: 'Дайвинг в подарок'
                },
                {
                    id: 2,
                    img: require('@/assets/images/icons/online_recording.svg'),
                    text: 'Онлайн-запись'
                },
            ],
            courses: [
                {
                    id: 1,
                    title: 'Знакомство с дайвингом, восстановление навыков',
                    links: [
                        {
                            url: '/course',
                            alias: 'course11', 
                            img: require("@/assets/images/course/course11.jpeg"),
                        },
                        {
                            url: '/course',
                            alias: 'course12', 
                            img: require("@/assets/images/course/course12.jpeg")
                        },
                        {
                            url: '/course',
                            alias: 'course13', 
                            img: require("@/assets/images/course/course13.jpeg")
                        },
                    ]
                },
                {
                    id: 2,
                    title: 'Обучение дайвингу',
                    links: [
                        {
                            url: '/course',
                            alias: 'course21', 
                            img: require("@/assets/images/course/course21.jpeg"),
                        },
                        {
                            url: '/course',
                            alias: 'course22', 
                            img: require("@/assets/images/course/course22.jpeg")
                        },
                        {
                            url: '/course',
                            alias: 'course23', 
                            img: require("@/assets/images/course/course23.jpeg")
                        },
                    ]
                },
                {
                    id: 3,
                    title: 'Специализации',
                    links: [
                        {
                            url: '/course',
                            alias: 'course31', 
                            img: require("@/assets/images/course/course31.jpeg"),
                        },
                        {
                            url: '/course',
                            alias: 'course32', 
                            img: require("@/assets/images/course/course32.jpeg")
                        },
                        {
                            url: '/course',
                            alias: 'course33', 
                            img: require("@/assets/images/course/course33.jpeg")
                        },
                        {
                            url: '/course',
                            alias: 'course34', 
                            img: require("@/assets/images/course/course34.jpeg")
                        },
                        {
                            url: '/course',
                            alias: 'course35', 
                            img: require("@/assets/images/course/course35.jpeg")
                        },
                        {
                            url: '/course',
                            alias: 'course36', 
                            img: require("@/assets/images/course/course36.jpeg")
                        },
                        {
                            url: '/course',
                            alias: 'course37', 
                            img: require("@/assets/images/course/course37.jpeg")
                        },
                    ]
                },
                {
                    id: 4,
                    title: 'Профессиональный уровень',
                    links: [
                        {
                            url: '/course',
                            alias: 'course41', 
                            img: require("@/assets/images/course/course41.jpeg"),
                        },
                        {
                            url: '/course',
                            alias: 'course42', 
                            img: require("@/assets/images/course/course42.jpeg")
                        },
                    ]
                },
            ],
            trainingArticles: [
                {
                    id: 1,
                    img: require("@/assets/images/icons/training_test.svg"),
                    title: 'Тесты дайвера',
                    btnText: 'Перейти',
                    url: '/tests'
                },
                {
                    id: 2,
                    img: require("@/assets/images/icons/training_water.svg"),
                    title: 'Сдача открытой воды (За рубежом)',
                    btnText: 'Перейти',
                    url: '#'
                },
                {
                    id: 3,
                    img: require("@/assets/images/icons/training_price.svg"),
                    title: 'Прайс-лист',
                    btnText: 'Перейти',
                    url: '#'
                },
                {
                    id: 4,
                    img: require("@/assets/images/icons/training_water.svg"),
                    title: 'Сдача открытой воды (Подмосковье)',
                    btnText: 'Перейти',
                    url: '#'
                },
                {
                    id: 5,
                    img: require("@/assets/images/icons/training_pool.svg"),
                    title: 'Бассейны для обучения',
                    btnText: 'Перейти',
                    url: '#'
                },
            ],
            imgGallery: [
                {
                    img: require("@/assets/images/gallery_training/training__photo1.jpeg")
                },
                {
                    img: require("@/assets/images/gallery_training/training__photo2.jpeg")
                },
                {
                    img: require("@/assets/images/gallery_training/training__photo3.jpeg")
                },
                {
                    img: require("@/assets/images/gallery_training/training__photo4.jpeg")
                },
                {
                    img: require("@/assets/images/gallery_training/training__photo5.jpeg")
                },
                {
                    img: require("@/assets/images/gallery_training/training__photo6.jpeg")
                }
            ],
            callbackModalOpen: false,
            isTouching: false,
            startX: null,
            scrollLeft: null,
            activeIndex: 0,
            container: null,
            contentWidth: null,
        }
    },
    mounted() {
        if (this.$refs.trainingArticles && this.$refs.trainingArticles.children.length > 0) {
            this.containerTrainingArticles = this.$refs.trainingArticles;
            this.itemWidthTrainingArticles = this.$refs.trainingArticles.children[0].offsetWidth;
        }

        if (this.$refs.trainingGallery && this.$refs.trainingGallery.children.length > 0) {
            this.containerTrainingGallery = this.$refs.trainingGallery;
            this.itemWidthTrainingGallery = this.$refs.trainingGallery.children[0].offsetWidth;
        }
    },
    methods: {
        getLinkUrl(link) {
            if (typeof link.url === 'string') {
                return link.url;
            } else if (typeof link.url === 'object') {
                return link.url;
            }
        },
        getlinkUrlArticles(article) {
            if (typeof article.url === 'string') {
                return article.url;
            }
            
        },
        goToPage() {
            document.documentElement.scrollTo({
                        top: 0,
                        behavior: 'smooth'
            });
            document.body.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        openModal() {
            this.callbackModalOpen = true;
        },
        closeModal() {
           this.callbackModalOpen = false;
        },

        startScroll(e, container, itemWidth) {
            this.isTouching = true;
            this.startX = e.touches[0].pageX - container.offsetLeft;
            this.startScrollLeft = container.scrollLeft; // сохраняем начальное смещение
        },
        stopScroll(container) {
            this.isTouching = false;
            const currentIndex = Math.round(container.scrollLeft / container.offsetWidth);
            const nextScrollLeft = currentIndex * container.offsetWidth;
            
            container.scroll({
                left: nextScrollLeft,
                behavior: 'smooth'
            });
        },


        scroll(e, container, itemWidth) {
            if (!this.isTouching) return;
            e.preventDefault();
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (x - this.startX) * 4;
            container.scrollLeft = this.startScrollLeft - walk;
            const visibleIndex = Math.round(container.scrollLeft / itemWidth);
            this.activeIndex = visibleIndex;   
        }


    }
}
</script>

<style lang="scss" scoped>

</style>

