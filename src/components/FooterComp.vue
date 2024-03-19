<template>
    <footer class="footer container_main container_main_mobile">
        <div class="footer__content" v-if="isContainerVisible">
            <div class="footer__left">
                <div class="logo__footer">    
                    <router-link to="/" @click="scrollToTop"><img :src="logo" alt="logo"></router-link>
                </div>
                <a class="footer__tel" to="tel:+74955456702">+7 (495) 545 67 02</a>
                <a class="footer__email" to="mailto:scuba-divers@mail.ru">scuba-divers@mail.ru</a>

            </div>
            <div class="footer__right">
                <nav class="menu menu__footer">
                    <ul class="menu__list">
                        <li v-for="link in links" :key="link.alias">
                            <a :href="getLinkUrl(link)" @click="scrollToBlock(link.url, $event)" class="menu__link"> {{link.text}} </a>
                        </li>
                    </ul>
                </nav>
                
                <div class="social__pages social__pages_footer">
                    <div class="social__link" v-for="(item, index) in socialPages" :key="index">
                        <a to="#"><img :src="item.img" alt="social page"></a >
                    </div>
                    
                </div>
                
                <div class="footer__descr">
                    Все права защищены © 2010-2023
                    Обучение дайвингу в Москве
                </div>
            </div>
        </div>
        <div class="footer__content_mobile" v-else>
            <div class="logo__footer">    
                <router-link to="/" @click="scrollToTop"><img :src="logo" alt="logo"></router-link>
            </div>
            <a class="footer__tel" to="tel:+74955456702">+7 (495) 545 67 02</a>
            <a class="footer__email" to="mailto:scuba-divers@mail.ru">scuba-divers@mail.ru</a>
            <div class="footer__descr">
                Все права защищены © 2010-2023
                Обучение дайвингу в Москве
            </div>
            <button class="footer__btn" @click="goToUp">Вернуться наверх</button>
        </div>
    </footer>
</template> 

<script>
    export default {
        data() {
            return {
                logo: require("@/assets/images/logo/logo_footer.svg"),
                socialPages: [
                    {
                        id: 1,
                        img: require("@/assets/images/icons/social_vk.svg")
                    },
                    {
                        id: 2,
                        img: require("@/assets/images/icons/social_instagram.svg")
                    },
                    {
                        id: 3,
                        img: require("@/assets/images/icons/social_facebook.svg")
                    },
                ],
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
                isContainerVisible: true
            }
        },
        mounted() {
            if (window.innerWidth < 768) {
                this.isContainerVisible = false;
            }
        },
        methods: {
            scrollToBlock(url, event) {
 
                event.preventDefault();
                if (url.hash) {
                    setTimeout(() => {
                        const block = document.querySelector(url.hash);
                        if (block) {
                            block.scrollIntoView({ behavior: 'smooth' });
                        } else {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    }, 500);
                } else {
                    document.documentElement.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    document.body.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }

                this.$router.push(url);
            },


            getLinkUrl(link) {
                if (typeof link.url === 'string') {
                    return link.url;
                } else if (typeof link.url === 'object') {
                    return link.url;
                }
            },
            scrollToTop(event) {
                event.preventDefault();
                
                document.documentElement.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                document.body.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                this.$router.push('/');
            },
            goToUp() {
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