<template>
    <main class="main">
        <div class="container_main container_main_mobile">
            <header class="header">
                <nav class="menu"> 
                    <ul class="menu__list">
                        <li v-for="link in links" :key="link.alias">
                            <router-link :to="getLinkUrl(link)" @click="scrollToBlock(link.url.hash)" class="menu__link"> {{link.text}} </router-link>
                        </li>
                    </ul> 
                </nav>
                <div class="menu__mobile" v-if="isSmallScreen">
                    <button @click="toggleMenu" class="burger__menu_btn burger__menu_btn_big">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    
                    <div class="burger__menu"  v-if="isMenuOpen" >
                    
                        <nav class="burger__menu_nav" :class="{ 'active': isMenuOpen }">
                            <div class="burger__menu_top">
                                <span class="burger__menu_close" @click="closeBurgerMenu"><img :src="closeIcon" alt="close burger menu"></span>
                            
                                <div class="burger__menu_socialpages">
                                    <div
                                        class="social__link"
                                        v-for="(item, index) in socialPagesMobile"
                                        :key="index"
                                    >
                                        <router-link to="#"
                                            ><img :src="item.img" alt="social icon">
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                            
                            
                            
                            <ul class="burger__menu_list">
                                <li v-for="link in links" :key="link.alias">
                                    <router-link
                                        :to="getLinkUrl(link)"
                                        @click="scrollToBlock(link.url.hash)"
                                        class="burger__menu_link"
                                    >
                                        {{link.text}}
                                    </router-link>
                                </li>
                            </ul>
                            
                        </nav>
                    </div>
                    <div @click="closeBurgerMenu" class="overlay" :class="{ 'active': isMenuOpen }"></div>
                    <button
                        class=" callback callback_mobile"
                        @click="openModal('callbackmodal')"
                    >
                        Обратный звонок
                    </button>
                </div>
                
                <div class="social__block">
                    <button class="callback" @click="openModal('callbackmodal')">Обратный звонок</button>
                    <div class="social__pages">
                        <div class="social__link" v-for="(item, index) in socialPages" :key="index">
                            <router-link  to="#"><img :src="item.img" alt="social icon">
                            </router-link >
                        </div>
                    </div>
                </div>
                <div class="user__block">
                    
                    <button class="account"  @click="openModal('registrmodal')"><img :src="userIcon" alt="user icon"></button>
                    
                    <router-link  to="/cart" class="cart">
                        <img :src="cartIcon" alt="cart icon">
                    </router-link >
                    
                </div>
            </header>
    
            <div class="logo__big">
                <router-link  to="/"><img :src="logo" alt="logo" /></router-link>
            </div>
            <div class="main__content">
                <div class="main__info">
                    <div class="main__info_descr">
                        Путешествие в тысячу миль
                        <span>Начинается с первого клика</span>
                    </div>
                    <button class="main__info_btn" @click="goToTrainingPage">Хочу нырять...</button>
                    <div class="main__items">
                        <div class="main__item">
                            <img :src="mainCalendar" alt="calendar icon">
                            Работаем с 2009 года
                        </div>
                        <div class="main__item"> 
                             <img :src="mainStudent" alt="student icon">
                            Более 2500 учеников
                        </div>
                    </div>
                </div>
                <div class="main__articles" ref="mainArticles" @touchstart="startScroll($event, containerMainArticles, itemWidthMainArticles)" @touchend="stopScroll(containerMainArticles)" @touchmove="scroll($event, containerMainArticles, itemWidthMainArticles)">
                    
                    <div class="main__article"
                        v-for="article in mainArticles"
                        :key="article.id"> 
                        <div class="main__article_info">
                            <div class="main__article_icon">
                                <img :src="article.img" alt="article image">
                            </div>
                            <h3 class="main__article_subtitle">
                                {{ article.title }}
                            </h3>
                        </div>
                        <div class="main__article_descr">
                            {{ article.descr }}
                        </div>

                        <button class="main__article_btn" v-if="article.action === 'scroll-to-block'" @click="scrollToBlockFromHeaderArticles">Узнать больше</button>
                        <button class="main__article_btn" v-if="article.action === 'open-modal'" @click="openModal('callbackmodal')">Оставить вопрос</button>
                        <button class="main__article_btn" v-if="article.action === 'other-page'" @click="goToOtherPage">Приобрести</button>
                        
                    </div>
                    
                </div>
                <div class="main__dots">
                    <span class="main__dot" v-for="(article, index) in mainArticles" :key="index" :class="{ active: activeIndex === index }"></span>
                </div>
                <CallbackModalComp :isOpen="callbackModalOpen" @close-modal="closeModal('callbackmodal')" />

                <RegistrationModalComp :isOpen="registrModalOpen" @close-modal="closeModal('registrmodal')" @open-login-modal="openModal('loginmodal')" />

                <LoginModalComp :isOpen="loginModalOpen"
                @close-modal="closeModal('loginmodal')" @open-registration-modal="openModal('registrmodal')"
                @open-forgetpass-modal="openModal('forgetpassmodal')"/>

                <ForgetPasswordModalComp :isOpen="forgetpassModalOpen"
                @close-modal="closeModal('forgetpassmodal')" @open-registration-modal="openModal('registrmodal')"
                @open-login-modal="openModal('loginmodal')"
                @open-newpass-modal="openModal('newpassmodal')"/>

                <NewPasswordModalComp :isOpen="newpassModalOpen"
                @close-modal="closeModal('newpassmodal')" @open-registration-modal="openModal('registrmodal')"
                @open-login-modal="openModal('loginmodal')"/>

                <AccountPage v-if="isAuthenticated"/>
            </div>
        </div>
    </main>
    <div class="content">
        <section class="diving__info container container_mobile">
            <h3 class="section__subtitle">Обучение дайвингу в Москве</h3>
            <h2 class="section__title">Дайвинг <span>в Москве</span></h2>
            <div class="diving__info_descr">
                Добро пожаловать! На страницах нашего сайта вы найдете
                качественную, нужную информацию касаемо вашего увлечения. Более
                подробно о нас вам расскажут разделы нашего сайта, благодаря
                отзывам, отчетам, статьям вы познакомитесь с нами поближе,
                узнаете, что дайвинг в Москве это реальность. Много полезной
                информации вам предоставит социальный блог «Акватика» там же, вы
                можете размещать свои отчеты и отзывы о путешествиях, а так же
                находить новых друзей по увлечению. Для прямого общения он-лайн,
                приглашаем Вас на тематический форум и в соц сети, где "живут"
                участники клуба которые всегда рады новым знакомствам.
            </div>
        </section>

        <section class="hot__offers container container_mobile" id="hotOffers">
            <h3 class="section__subtitle">Успей приобрести путевку</h3>
            <h2 class="section__title">Горячие <span>предложения</span></h2>
            <div class="hot__offers_items" ref="hotOffers" @touchstart="startScroll($event, containerHotOffers, itemWidthHotOffers)" @touchend="stopScroll(containerHotOffers)" @touchmove="scroll($event, containerHotOffers, itemWidthHotOffers)" >
                <div class="hot__offers_item"
                    v-for="(item, index) in hotOffersItems" :key="index">
                    <img class="hot__offers_img" :src="item.img"
                        alt="hot__offers image"
                    />
                    <div class="hot__offers_content">
                        <h4 class="hot__offers_title">{{ item.title }}</h4>
                        <div class="hot__offers_descr">{{ item.descr }}</div>
                    </div>
                    <router-link  class="hot__offers_btn" to="#">{{
                        item.linkText
                    }}</router-link>
                </div>
            </div>
        </section>

        <FeedbackSliderComp id="feedbacks"/>

        <div class="article article-first container container_mobile" id="aboutClub"
            v-for="(article, index) in textArticles.slice(0, 1)"
            :key="index">
            {{ article.text }}
        </div>

        <section class="gallery ">
            <div class="container container_mobile">
                <h3 class="section__subtitle">живые эмоции</h3>
                <h2 class="section__title">Наша <span> фото-галерея</span></h2>
                <div class="gallery__items" ref="gallery" @touchstart="startScroll($event, containerGallery, itemWidthGallery)" @touchend="stopScroll(containerGallery)" @touchmove="scroll($event, containerGallery, itemWidthGallery)">
                    <div
                        class="gallery__item"
                        v-for="image in imgGallery"
                        :key="image.id"
                    >
                        <img
                            class="gallery__img"
                            :src="image.img"
                            alt="gallery photo"
                        />
                    </div>
                </div>
                <router-link to="#" class="gallery__btn">Смотреть все фото</router-link>
            </div>
                 
            
        </section>

        <div class="article article-first container container_mobile"
            v-for="(article, index) in textArticles.slice(1, 2)"
            :key="index">
            {{ article.text }}
        </div>
 
        <section class="blog__main">
            <div class="container container_mobile">
                <h3 class="section__subtitle">
                    будь в курсе последних новостей
                </h3>
                <h2 class="section__title">Наш <span>блог</span></h2>
                <div class="blog__main_items" ref="blog" @touchstart="startScroll($event, containerBlog, itemWidthBlog)" @touchend="stopScroll(containerBlog)" @touchmove="scroll($event, containerBlog, itemWidthBlog)">
                    <div class="blog__main_item" v-for="item in blogItems" :key="item.id">
                        <img class="blog__main_img" :src="item.img" alt="blog image"/>
                        <div class="blog__main_content">
                            <h4 class="blog__main_title">
                                {{ item.title }}
                            </h4>
                            <div class="blog__main_descr">
                                {{ item.descr }}
                            </div> 
                        </div>
                        <button class="blog__main_btn" @click="goToBlogPage">{{ item.btnText }}</button>
                    </div>
                </div>
            </div>
        </section>

        <div class="article article-first container container_mobile"
            v-for="(article, index) in textArticles.slice(2, 3)"
            :key="index">
            {{ article.text }}
        </div>

        <SubscribeComp />
    </div>
    <FooterComp /> 
</template>

<script>
import FeedbackSliderComp from "@/components/FeedbackSliderComp.vue";
import FooterComp from "@/components/FooterComp.vue";
import SubscribeComp from "@/components/SubscribeComp.vue";
import CallbackModalComp from "@/components/CallbackModalComp.vue";
import RegistrationModalComp from "@/components/RegistrationModalComp.vue";
import LoginModalComp from '@/components/LoginModalComp.vue';
import ForgetPasswordModalComp from '@/components/ForgetPasswordModalComp.vue';
import NewPasswordModalComp from '@/components/NewPasswordModalComp.vue';
import AccountPage from '@/pages/AccountPage.vue';
import { ref, onMounted } from "vue";


export default {
    components: { FeedbackSliderComp, SubscribeComp, FooterComp, CallbackModalComp, RegistrationModalComp, LoginModalComp, ForgetPasswordModalComp, NewPasswordModalComp, AccountPage },
    data() {
        return {
            logo: require("@/assets/images/logo/logo.svg"),
            links: [
                {id: 0, text: 'О клубе', alias: 'aboutClub', url: {path: '/', hash: '#aboutClub'}},
                {id: 1, text: 'Обучение', alias: 'training', url: '/training'},
                {id: 2, text: 'Снаряжение', alias: 'shopcatalog', url: '/shopcatalog'},
                {id: 3, text: 'Туры', alias: 'tours', url: '/tours'},
                {id: 4, text: 'Акции', alias: 'hotOffers', url: {path: '/', hash:'#hotOffers'}},
                {id: 5, text: 'Отзывы', alias: 'feedbacks', url: {path: '/', hash: '#feedbacks'}},
                {id: 6, text: 'Контакты', alias: 'contacts', url: '/contacts'},
            ],
            linkHome: {url: '/'},
            mainArticles: [
                {
                    id: 1,
                    img: require("@/assets/images/icons/main_diving.svg"),
                    title: "Доступный дайвинг",
                    descr: "Акции и горячие предложения на курсы обучения.",
                    btnText: "Узнать больше",
                    action: "scroll-to-block" 
                },
                {
                    id: 2,
                    img: require("@/assets/images/icons/main_sign.svg"),
                    title: "Онлайн запись",
                    descr: "Оставьте свой вопрос, мы перезвоним и проконсультируем вас.",
                    btnText: "Оставить вопрос",
                    action: "open-modal"
                },
                {
                    id: 3,
                    img: require("@/assets/images/icons/main_certificate.svg"),
                    title: "Сертификаты",
                    descr: "Дайвинг в подарок для ваших друзей и знакомых.",
                    btnText: "Приобрести",
                    action: "other-page"
                },
            ],
            hotOffersItems: [
                {
                    img: require("@/assets/images/hotoffers/hotoffers_img.jpeg"),
                    title: "Peak Perfomance Buoyancy",
                    descr: "Курс мастерской плавучести Peak Perfomance Buoyancy.",
                    linkText: "Перейти",
                },
                {
                    img: require("@/assets/images/hotoffers/hotoffers_img.jpeg"),
                    title: "Peak Perfomance Buoyancy",
                    descr: "Курс мастерской плавучести Peak Perfomance Buoyancy.",
                    linkText: "Перейти",
                },
                {
                    img: require("@/assets/images/hotoffers/hotoffers_img.jpeg"),
                    title: "Peak Perfomance Buoyancy",
                    descr: "Курс мастерской плавучести Peak Perfomance Buoyancy.",
                    linkText: "Перейти",
                },
                {
                    img: require("@/assets/images/hotoffers/hotoffers_img.jpeg"),
                    title: "Peak Perfomance Buoyancy",
                    descr: "Курс мастерской плавучести Peak Perfomance Buoyancy.",
                    linkText: "Перейти",
                },
            ],
            textArticles: [
                {
                    text: "Вы спросите, есть ли дайвинг в Москве? Ответ однозначный – да, есть! Акватика предлагает обучение, как в Москве, так и за рубежом. Приятнее учиться на море скажете вы! Наверное да, но обратите внимание на то, что многие клубы подводного плавания за рубежом могут не иметь Русскоговорящий персонал (инструкторов) квалификация тоже остается загадкой, к тому же вам придется тратить драгоценное время отпуска на изучение учебников, таблиц, отработку навыков, сдачу экзаменов. Не лучше ли пройти обучение рядом с домом в удобное время, и спокойной обстановке, с квалифицированными инструкторами, а во время долгожданного отпуска  наслаждаться всеми прелестями океана.",
                },
                {
                    text: "Подводное плавание – это истинное исцеление для каждого человека, меняющее приоритеты отдыха. Это возможность найти новые эмоции, завести знакомства с интересными людьми. Да,каждый человек к данному увлечению относится по своему, для многих этот мир выражает стремление к новому и прекрасному. Многие люди, увлечённые дайвингом с уверенностью скажут, что подводное плаванье – смело можно отнести к одному из лучших  увлечений! Оно позволяет почувствовать невесомость, насладиться самыми чудесными пейзажами, скрытыми от обычного поля зрения. Здесь каждый чувствует себя свободным, будто бы парящим над землёй. Сегодня, это доступно каждому, кто стремится познать новое, к общению и позитивным эмоциям. Это незабываемое ощущение надолго остается внутри и зовет обратно под воду.",
                },
                {
                    text: "Вы когда-нибудь задумывались над тем, что океан является самой древней субстанцией, которая существует на планете? Разумеется,это не мыслящий Океан Станислава Лема под названием Солярис, но всё же, не вызывает сомнений,что зародилась жизнь именно в водных глубинах. Не важно, будь это дайвинг в Москве, Подмосковное озеро  или погружение на океанских просторах, каждый раз, когда человек готовится к погружению он испытывает волнение, которое вполне объяснимо. Водная гладь скрывает огромный потенциал, ведь она и является источником жизни. Океан манит, содержит огромное количество тайн и загадок. Достаточно только раз погрузиться под воду, и позитивные ощущения уже никогда не забудутся, они останутся навсегда, как часть самой жизни.",
                },
            ],
            imgGallery: [
                {
                    id: 1,
                    img: require("@/assets/images/gallery/gallery__img1.jpeg"),
                },
                {
                    id: 2,
                    img: require("@/assets/images/gallery/gallery__img1.jpeg"),
                },
                {
                    id: 3,
                    img: require("@/assets/images/gallery/gallery__img1.jpeg"),
                },
                {
                    id: 4,
                    img: require("@/assets/images/gallery/gallery__img1.jpeg"),
                },
            ],
            blogItems: [
                {
                    id: 1,
                    img: require("@/assets/images/hotoffers/hotoffers_img.jpeg"),
                    title: 'Peak Perfomance Buoyancy',
                    descr: 'Курс мастерской плавучести Peak Perfomance Buoyancy.',
                    btnText: 'Перейти',
                },
                {
                    id: 2,
                    img: require("@/assets/images/hotoffers/hotoffers_img.jpeg"),
                    title: 'Peak Perfomance Buoyancy',
                    descr: 'Курс мастерской плавучести Peak Perfomance Buoyancy.',
                    btnText: 'Перейти',
                },
                {
                    id: 3,
                    img: require("@/assets/images/hotoffers/hotoffers_img.jpeg"),
                    title: 'Peak Perfomance Buoyancy',
                    descr: 'Курс мастерской плавучести Peak Perfomance Buoyancy.',
                    btnText: 'Перейти',
                },
                {
                    id: 4,
                    img: require("@/assets/images/hotoffers/hotoffers_img.jpeg"),
                    title: 'Peak Perfomance Buoyancy',
                    descr: 'Курс мастерской плавучести Peak Perfomance Buoyancy.',
                    btnText: 'Перейти',
                },
            ],
            socialPages: [
                {
                    img: require('@/assets/images/icons/social_vk.svg')
                },
                {
                    img: require('@/assets/images/icons/social_instagram.svg')
                },
                {
                    img: require('@/assets/images/icons/social_facebook.svg')
                },
            ],
            socialPagesMobile: [
                {
                    id: 1,
                    img: require("@/assets/images/icons/dark_social_vk.svg")
                },
                {
                    id: 2,
                    img: require("@/assets/images/icons/dark_social_instagram.svg")
                },
                {
                    id: 3,
                    img: require("@/assets/images/icons/dark_social_facebook.svg")
                },
            ],
            userIcon: require("@/assets/images/icons/user_icon.svg"),
            cartIcon: require("@/assets/images/icons/cart_icon.svg"),
            closeIcon: require('@/assets/images/icons/close_modal.svg'),
            mainCalendar: require('@/assets/images/icons/main_calendar.svg'),
            mainStudent: require('@/assets/images/icons/main_student.svg'),
            callbackModalOpen: false,
            registrModalOpen: false,
            loginModalOpen: false,
            forgetpassModalOpen: false,
            newpassModalOpen: false,
            isAuthenticated: false,
            isMenuOpen: false,
            isTouching: false,
            startX: null,
            scrollLeft: null,
            activeIndex: 0,
            container: null,
            contentWidth: null,
            
        };
    },
    mounted() {
        
        if (this.$refs.mainArticles && this.$refs.mainArticles.children.length > 0) {
            this.containerMainArticles = this.$refs.mainArticles;
            this.itemWidthMainArticles = this.$refs.mainArticles.children[0].offsetWidth;
        }

        if (this.$refs.hotOffers && this.$refs.hotOffers.children.length > 0) {
            this.containerHotOffers = this.$refs.hotOffers;
            this.itemWidthHotOffers = this.$refs.hotOffers.children[0].offsetWidth;
        }

        if (this.$refs.gallery && this.$refs.gallery.children.length > 0) {
            this.containerGallery = this.$refs.gallery;
            this.itemWidthGallery = this.$refs.gallery.children[0].offsetWidth;
        }

        if (this.$refs.blog && this.$refs.blog.children.length > 0) {
            this.containerBlog = this.$refs.blog;
            this.itemWidthBlog = this.$refs.blog.children[0].offsetWidth;
        }
    },
    methods: {
        scrollToBlock(hash) {
            const block = document.querySelector(hash);
            if (block) {
                this.$router.push(hash);
                setTimeout(() => {
                    block.scrollIntoView( {behavior: 'smooth'} );
                }, 500);
                this.closeBurgerMenu();
        }},
        getLinkUrl(link) {
            if (typeof link.url === 'string') {
                return link.url;
            } else if (typeof link.url === 'object') {
                return link.url;
            }
        },
        goToOtherPage() {
            this.$router.push({ name: 'certificate' });
            document.documentElement.scrollTo({
                        top: 0,
                        behavior: 'smooth'
            });
            document.body.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        goToTrainingPage() {
            this.$router.push({ name: 'training' });
            document.documentElement.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            document.body.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        goToBlogPage() {
            this.$router.push({ name: 'blog' });
            document.documentElement.scrollTo({
                        top: 0,
                        behavior: 'smooth'
            });
            document.body.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        openModal(modal) {
            const isAuthenticated = localStorage.getItem ('isAuthenticated');
            if(modal === 'callbackmodal') {
                this.callbackModalOpen = true;
            } else if (isAuthenticated === 'true') {
                this.$router.push('/account')
            } else if(modal === 'registrmodal') {
                this.registrModalOpen = true;
            } else if(modal === 'loginmodal') {
                this.loginModalOpen = true;
            } else if(modal === 'forgetpassmodal') {
                this.forgetpassModalOpen = true;
            } else if(modal === 'newpassmodal') {
                this.newpassModalOpen = true;
            }
        },
        closeModal(modal) {
            if(modal === 'registrmodal') {
                this.registrModalOpen = false;
            } else if(modal === 'callbackmodal') {
                this.callbackModalOpen = false;
            } else if(modal === 'loginmodal') {
                this.loginModalOpen = false;
            } else if(modal === 'forgetpassmodal') {
                this.forgetpassModalOpen = false;
            } else if(modal === 'newpassmodal') {
                this.newpassModalOpen = false;
            }
        },
        
        scrollToBlockFromHeaderArticles() {
            const block = document.querySelector('#hotOffers')
            if (block) {
                this.$router.push('#hotoffers');
                setTimeout(() => {
                    block.scrollIntoView( {behavior: 'smooth'} );
                }, 500);
            }
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        closeBurgerMenu() {
            this.isMenuOpen = false;
        },
        startScroll(e, container, itemWidth) {
            this.isTouching = true;
            this.startX = e.touches[0].pageX - container.offsetLeft;
            this.scrollLeft = container.scrollLeft;
        },
        stopScroll(container) {
            this.isTouching = false;
            const currentIndex = Math.round(container.scrollLeft / container.offsetWidth);
            const nextIndex = container.scrollLeft > currentIndex * container.offsetWidth ? currentIndex + 1 : currentIndex;
            container.scroll({
                left: nextIndex * container.offsetWidth,
                behavior: 'smooth'
            });
        },
        scroll(e, container, itemWidth) {
            if (!this.isTouching) return;
            e.preventDefault();
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (x - this.startX) * 4;
            container.scrollLeft = this.scrollLeft - walk;
            
            

            const visibleIndex = Math.round(container.scrollLeft / itemWidth);
            this.activeIndex = visibleIndex;
            
        },
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
};
</script>

<style lang="scss" scoped></style>
