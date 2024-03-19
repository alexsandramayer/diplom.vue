<template>
    <header class="header_main container_main container_main_mobile">
        <div class="header_main_top">
            <div class="logo_main">
                <router-link  to="/"><img :src="logo" alt="logo"/></router-link >
            </div>
            <div class="header_main_left">
                <button class="callback" @click="openModal()">Обратный звонок</button>
                <div class="user__block">
                    <router-link  to="/cart" class="cart">
                        <img :src="cartIcon" alt="cart icon">
                    </router-link >
                </div>
            </div> 
        </div>
        <div class="header_main_top_mobile" v-if="isSmallScreen">
            <div class="logo_main">
                <router-link  to="/"><img :src="logo" alt="logo"/></router-link >
            </div>
            <div class="header_main_left">
                <div class="user__block">
                    <router-link  to="/cart" class="cart">
                        <img :src="cartIcon" alt="cart icon">
                    </router-link >
                </div>
            </div> 
        </div>
        <CallbackModalComp :isOpen="callbackModalOpen" @close-modal="closeModal" />
    </header>
    <div class="nav_main container_main container_main_mobile">
        <div class="menu_main">
            <ul class="menu__list">
                <li v-for="link in links" :key="link.alias">
                    <router-link :to="getLinkUrl(link)" @click="scrollToBlock(link.url)" class="menu_main_link"> {{link.text}} </router-link>
                </li>
            </ul>
            
            <div class=" social__pages social__pages_main">
                <div class="social__link social__link_main" v-for="(item, index) in socialPages" :key="index">
                    <router-link  to="#">
                        <img :src="item.img" alt="item image">
                    </router-link >
                </div>
            </div>
        </div>

        <button @click="toggleMenu" class="burger__menu_btn">
            <span class="burger__menu_span"></span>
            <span class="burger__menu_span"></span>
            <span class="burger__menu_span"></span>
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
                            <router-link to="#">
                                <img :src="item.img" alt="item image">
                            </router-link>
                        </div>
                    </div>
                </div>
                
                
                
                <ul class="burger__menu_list">
                    <li v-for="link in links" :key="link.alias">
                        <router-link :to="getLinkUrl(link)" @click="scrollToBlock(link.url)" class="burger__menu_link"> {{link.text}} </router-link>
                    </li>
                </ul>
                
            </nav>
        </div>
         <div @click="closeBurgerMenu" class="overlay" :class="{ 'active': isMenuOpen }"></div>
        <button
            class="callback callback_dark"
            @click="openModal('callbackmodal')"
        >
            Обратный звонок
        </button>
    </div>
    
   

    <section class="accountpage container_page container_page_mobile">
        <div class="accountpage__content">
            <div class="accountpage__content_top">
                <h2 class="accountpage__title">Личный кабинет</h2>
                <button class="accountpage__logout" @click="logout" v-if="isSmallScreen"><img :src="logoutIcon" alt="logout icon" class="accountpage__logout_img"></button>
                <button class="accountpage__logout" @click="logout" v-else>Выйти <img :src="logoutIcon" alt="logout icon" class="accountpage__logout_img"></button>
                 
            </div>
            
            <div class="accountpage__infoblock">
                <div class="accountpage__userinfo" v-if="userData">
                    <h3 class="accountpage__userinfo-title">Профиль</h3>
                    <div class="accountpage__block"  >
                        <div class="accountpage__block-data">
                            <div class="accountpage__block-left">
                                <div class="accountpage__block-subtitle">Логин</div>
                                <div class="accountpage__block-subtitle">E-mail</div>
                            </div>
                            <div class="accountpage__block-right">
                                <div class="accountpage__block-descr">{{ userData.data.username }}</div>
                                <div class="accountpage__block-descr">{{ userData.data.email }}</div>
                            </div>
                        </div>
                        <button class="accountpage__block-btn">Редактировать</button>
                    </div>
                    
                </div>
                <div class="accountpage__useractions">
                    <div class="accountpage__userorders">
                        <h3 class="accountpage__userorders-title">Заказы</h3>
                        <div class="accountpage__userorders-descr">
                            Состояние и история заказов
                        </div>
                        <div class="accountpage__userorders-btn">Перейти</div>
                    </div>
                    <div class="accountpage__usercourses">
                        <h3 class="accountpage__usercourses-title">Курсы</h3>
                        <div class="accountpage__usercourses-descr">
                            Информация о курсах и тестах
                        </div>
                        <div class="accountpage__usercourses-btn">Перейти</div>
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
import SubscribeComp from '@/components/SubscribeComp.vue';
import CallbackModalComp from "@/components/CallbackModalComp.vue"; 
import { ref, onMounted } from "vue";

export default {
    name: 'account',
    components: { FooterComp, SubscribeComp, CallbackModalComp },
    
    data() {
        return{
            callbackModalOpen: false,
            logoutIcon: require("@/assets/images/icons/logout.svg"),
            logo: require("@/assets/images/logo/logo_main.svg"),
            cartIcon: require("@/assets/images/icons/cart_icon.svg"),
            logo: require("@/assets/images/logo/logo_main.svg"),
            closeIcon: require('@/assets/images/icons/close_modal.svg'),
            userData: null,
            socialPages: [
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
            links: [
                {id: 0, text: 'Главная', alias:'home', url: '/'},
                {id: 1, text: 'О клубе', alias: 'aboutClub', url: {path: '/', hash: '#aboutClub'}},
                {id: 2, text: 'Обучение', alias: 'training', url: '/training'},
                {id: 3, text: 'Снаряжение', alias: 'shopcatalog', url: '/shopcatalog'},
                {id: 4, text: 'Туры', alias: 'tours', url: '/tours'},
                {id: 5, text: 'Акции', alias: 'hotOffers', url: {path: '/', hash:'#hotOffers'}},
                {id: 6, text: 'Отзывы', alias: 'feedbacks', url: {path: '/', hash: '#feedbacks'}},
                {id: 7, text: 'Контакты', alias: 'contacts', url: '/contacts'},
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
            isMenuOpen: false,
        }
    },
    created() {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            this.userData = JSON.parse(userDataString);
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('isAuthenticated');

            this.$router.push('/');
        },
        openModal() {
            this.callbackModalOpen = true;
        },
        closeModal() {
           this.callbackModalOpen = false;
        },
        scrollToBlock(url) {
            this.$router.push(url);
            setTimeout(() => {
                const block = document.querySelector(url.hash);
                if (block) {
                    block.scrollIntoView( {behavior: 'smooth'} );
            }}, 500);
        },
        getLinkUrl(link) {
            if (typeof link.url === 'string') {
                return link.url;
            } else if (typeof link.url === 'object') {
                return link.url;
            }
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        closeBurgerMenu() {
            this.isMenuOpen = false;
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
}
</script>

<style lang="scss" scoped>

</style>