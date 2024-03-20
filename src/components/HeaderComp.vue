 <template>
    <header class="header_main container_main container_main_mobile">
        <div class="header_main_top" >
            <div class="logo_main">
                <router-link  to="/"><img :src="logo" alt="logo"/></router-link >
            </div>
            <div class="header_main_left">
                <button class="callback" @click="openModal('callbackmodal')">Обратный звонок</button>
                <div class="user__block">
                    <button class="account"  @click="openModal('registrmodal')"><img :src="userIcon" alt="user icon"></button>
                
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
                    <button class="account"  @click="openModal('registrmodal')"><img :src="userIcon" alt="user icon"></button>
                
                    <router-link  to="/cart" class="cart">
                        <img :src="cartIcon" alt="cart icon">
                    </router-link >
                </div>
            </div>
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
    </header> 
    <div class="nav_main container_main container_main_mobile">
        <div class="menu_main" >
            <ul class="menu__list">
                <li v-for="link in links" :key="link.alias">
                    <router-link :to="getLinkUrl(link)" @click="scrollToBlock(link.url)" class="menu_main_link"> {{link.text}} </router-link>
                </li>
            </ul>
            
            <div class=" social__pages social__pages_main">
                <div class="social__link social__link_main" v-for="(item, index) in socialPages" :key="index">
                    <router-link  to="#">
                        <img :src="item.img" alt="social icon">
                    </router-link >
                </div>
            </div>
        </div>
        <div class="menu_main_mobile" v-if="isSmallScreen"> 
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
                                <router-link to="#"
                                    ><img :src="item.img" />
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
                class="callback_dark"
                @click="openModal('callbackmodal')"
            >
                Обратный звонок
            </button>
        </div>
       
        <CallbackModalComp :isOpen="callbackModalOpen" @close-modal="closeModal('callbackmodal')" />

    </div>
</template>

<script>
import CallbackModalComp from "@/components/CallbackModalComp.vue";
import RegistrationModalComp from "@/components/RegistrationModalComp.vue";
import LoginModalComp from '@/components/LoginModalComp.vue';
import ForgetPasswordModalComp from '@/components/ForgetPasswordModalComp.vue';
import NewPasswordModalComp from '@/components/NewPasswordModalComp.vue';
import AccountPage from '@/pages/AccountPage.vue';
import { ref, onMounted } from "vue";

export default {
    components: { CallbackModalComp, RegistrationModalComp, LoginModalComp, ForgetPasswordModalComp, NewPasswordModalComp, AccountPage },
    data() {
        return {
            logo: require("@/assets/images/logo/logo_main.svg"),
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
            userIcon: require("@/assets/images/icons/user_icon.svg"),
            cartIcon: require("@/assets/images/icons/cart_icon.svg"),
            closeIcon: require('@/assets/images/icons/close_modal.svg'),
            callbackModalOpen: false,
            registrModalOpen: false,
            loginModalOpen: false,
            forgetpassModalOpen: false,
            newpassModalOpen: false,
            isAuthenticated: false,
            isMenuOpen: false,
        }
    },
    methods: {
        openModal(modal) {
            const isAuthenticated = localStorage.getItem('isAuthenticated');
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
};
</script>

<style lang="scss" scoped></style>
 