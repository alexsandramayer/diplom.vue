<template>
    <div class="forgetpassmodal_overlay" :class="{ active: isOpen }"></div>
    <div class="forgetpassmodal_content" :class="{ active: isOpen }">
        <div class="leftblockmodal_left">
            <div class="logo_main">
                <router-link  to="/"><img :src="logo" alt="logo"/></router-link >
            </div>
            <h3 class="leftblockmodal_subtitle">Регистрация</h3>
            <p class="leftblockmodal_descr">Еще нет аккаунта?</p>
            <button class="leftblockmodal_btn" @click="openRegistrModal">Зарегистрироваться</button>
        </div>
        <div class="forgetpassmodal_right">
            <span class="forgetpassmodal_close" @click="closeModal"><img :src="closeIcon" alt="close modal"></span>
            <h2 class="forgetpassmodal_title">Забыли пароль?</h2>
            <div class="forgetpassmodal_descr">Введите вашу почту, на которую мы пришлем проверочный код для восстановления пароля</div> 
            <form class="forgetpassmodal_form">
                <input class="forgetpassmodal_input" type="email" name="email" autocomplete="off" placeholder="E-mail" v-model="email" @input="validateEmail" :class="{ invalid: !isValidEmail && email.length > 0 }">
                <div class="error-message" v-if="!isValidEmail && email.length > 0">Неверный формат E-mail</div>
                <button class="forgetpassmodal_btn" @click.prevent="openNewPassModal">Получить код</button>
            </form>
            
            <button class="forgetpassmodal_btnreturnlogin" @click="openLoginModal">Вернуться на страницу входа</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            isOpen: {
                type: Boolean,
                required: true,
            }
        },
        emits: ['close-modal', 'open-registration-modal', 'open-login-modal', 'open-newpass-modal' ],    
        data() {
            return {
                logo: require("@/assets/images/logo/logo_main.svg"),
                closeIcon: require('@/assets/images/icons/close_modal.svg'),
                email: '',
                isValidEmail: false,
            }
        },
        methods: {
            closeModal() {
                this.$emit('close-modal');
            },
            openRegistrModal() {
                this.$emit('open-registration-modal')
                this.$emit('close-modal')
            },
            openLoginModal() {
                this.$emit('open-login-modal')
                this.$emit('close-modal')
            },
            openNewPassModal() {
                this.$emit('open-newpass-modal')
                this.$emit('close-modal')
            },
            validateEmail() {
                const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                this.isValidEmail = pattern.test(this.email);
            },
        }
    }
</script>

<style lang="scss" scoped> 

</style>