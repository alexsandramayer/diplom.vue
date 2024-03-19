<template>
    <div class="newpassmodal_overlay" :class="{ active: isOpen }"></div>
    <div class="newpassmodal_content" :class="{ active: isOpen }">
        <div class="leftblockmodal_left">
            <div class="logo_main">
                <router-link  to="/"><img :src="logo" alt="logo"/></router-link >
            </div>
            <h3 class="leftblockmodal_subtitle">Регистрация</h3>
            <p class="leftblockmodal_descr">Еще нет аккаунта?</p>
            <button class="leftblockmodal_btn" @click="openRegistrModal">Зарегистрироваться</button>
        </div>
        <div class="newpassmodal_right">
            <span class="newpassmodal_close" @click="closeModal"><img :src="closeIcon" alt="close modal"></span> 
            <h2 class="newpassmodal_title">Забыли пароль?</h2>
            <div class="newpassmodal_descr">Мы выслали вам на почту проверочный код. Введите его ниже и придумайте новый пароль</div>
            <form class="newpassmodal_form">
                <div>
                    <input class="newpassmodal_input" type="text" name="text" autocomplete="off" placeholder="Введите код" v-model="code" @input="validateCode" :class="{ invalid: !isValidCode && code.length > 0 }">
                    <div class="error-message" v-if="!isValidCode && code.length > 0" >{{ errorMessage }}</div>
                </div>
                
                <div>
                    <div class="newpassmodal_password">
                        <input class="newpassmodal_input" :type="passwordFieldType" placeholder="Пароль" name="password" autocomplete="off" v-model="password" @input="validatePassword" :class="{ invalid: !isValidPassword && password.length > 0 }">
                        <img :src="passwordIconSrc" @click="togglePasswordVisibility" class="newpassmodal_password_icon" alt="eye pass">
                    </div>
                    
                    <div class="error-message" v-if="!isValidPassword && password.length > 0">Введите не менее 6 символов</div> 
                </div>
                <button class="newpassmodal_btn" @click="openLoginModal">Обновить пароль</button>
            </form>
            
            <button class="newpassmodal_btnsendcode">Отправить код повторно</button>
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
        emits: ['close-modal', 'open-registration-modal', 'open-login-modal' ],    
        data() {
            return {
                logo: require("@/assets/images/logo/logo_main.svg"),
                closeIcon: require('@/assets/images/icons/close_modal.svg'), 
                visible:  require('@/assets/images/icons/visible.svg'),
                notVisible:  require('@/assets/images/icons/not_visible.svg'),
                code: '',
                password: '',
                passwordFieldType: 'password',
                isPasswordVisible: false,
                isValidPassword: false,
                isValidCode: false,
            }
        },
        computed: {
            errorMessage() {
                if (!/^\d+$/.test(this.code)) {
                    return 'Код должен состоять только из цифр';
                } else if (this.code.length !== 6) {
                    return 'Введите 6 цифр';
                }
            },
            passwordIconSrc() {
                return this.isPasswordVisible ? this.notVisible : this.visible;
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
            validateCode() {
                const pattern = /^[0-9]+$/;
                this.isValidCode = pattern.test(this.code);
                const length = this.code.length;
                this.isValidCode = length === 6;
            },
            validatePassword() {
                this.isValidPassword = this.password.trim() !== '';
                const length = this.password.length;
                this.isValidPassword = length >= 6 && length <= 11;
            },
            togglePasswordVisibility() {
                this.isPasswordVisible = !this.isPasswordVisible;
                this.passwordFieldType = this.isPasswordVisible ? 'text' : 'password';
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>