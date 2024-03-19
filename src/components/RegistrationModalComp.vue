<template>

    <div class="registrmodal_overlay" :class="{ active: isOpen }"></div>
    <div class="registrmodal_content" :class="{ active: isOpen }">
        <div class="leftblockmodal_left"> 
            <div class="logo_main">
                <router-link  to="/"><img :src="logo" alt="logo"/></router-link >
            </div>
            <h3 class="leftblockmodal_subtitle">Добро пожаловать!</h3>
            <p class="leftblockmodal_descr">Уже есть аккаунт?</p>
            <button class="leftblockmodal_btn" @click="openLoginModal">Войти</button>
        </div>
        <div class="registrmodal_right">
            <span class="registrmodal_close" @click="closeModal"><img :src="closeIcon" alt="close modal"></span>
            <h2 class="registrmodal_title">Регистрация</h2> 
            <form class="registrmodal_form">
                <div>
                    <input class="registrmodal_input" type="email" name="email" autocomplete="off" required  placeholder="E-mail" v-model="email" @input="validateEmail" :class="{ invalid: !isValidEmail && email.length > 0 }">
                    <div class="error-message" v-if="!isValidEmail && email.length > 0">Неверный формат E-mail</div>
                </div>
                
                <div>
                    <input class="registrmodal_input" type="text" name="name" autocomplete="off" required  placeholder="Логин" v-model="username" @input="validateUsername" :class="{ invalid: !isValidUsername && username.length > 0 }">
                    <div class="error-message" v-if="!isValidUsername && username.length > 0">Введите не менее 6 символов</div>
                </div>
                

                <div>
                    <div class="registrmodal_password"> 
                        <input class="registrmodal_input" :type="passwordFieldType" placeholder="Пароль" required  name="password" autocomplete="off" v-model="password" @input="validatePassword" :class="{ invalid: !isValidPassword && password.length > 0 }">
                        <img :src="passwordIconSrc" @click="togglePasswordVisibility" class="registrmodal_password_icon" alt="eye pass">
                    </div>
                    
                    <div class="error-message" v-if="!isValidPassword && password.length > 0">Введите не менее 6 символов</div>
                </div>
                
                <button class="registrmodal_btn" @click.prevent="register">Зарегистрироваться</button>
            </form>
            
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
    emits: ['close-modal', 'open-login-modal'],
    data() {
        return {
            logo: require("@/assets/images/logo/logo_main.svg"),
            closeIcon: require('@/assets/images/icons/close_modal.svg'),
            visible:  require('@/assets/images/icons/visible.svg'),
            notVisible:  require('@/assets/images/icons/not_visible.svg'),
            email: '',
            username: '',
            password: '',
            passwordFieldType: 'password',
            isPasswordVisible: false,
            isValidEmail: false,
            isValidUsername: false,
            isValidPassword: false
        };
    },
    computed: {
        passwordIconSrc() {
            return this.isPasswordVisible ? this.notVisible : this.visible;
        }
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        openLoginModal() {
            this.$emit('open-login-modal')
            this.$emit('close-modal')
        },
        validateEmail() {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.isValidEmail = pattern.test(this.email);
        },
        validateUsername() {
            this.isValidUsername = this.username.trim() !== '';
            const length = this.username.length;
            this.isValidUsername = length >= 6 && length <= 15;
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
        async register() {
            if (this.isValidEmail && this.isValidUsername && this.isValidPassword) {
                const userData = {
                    email: this.email,
                    username: this.username,
                    password: this.password,
                };

                try{
                    const res = await fetch('https://c503424f1816e112.mokky.dev/register', {
                        method: 'POST',
                        headers: {
                            Accept: "application/json",
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(userData),
                    })
                    
                    
                    if (res.ok) {
                        console.log('Регистрация успешна');
                        const data = await res.json();

                        const existingUserData = localStorage.getItem('userData');
                        let userDataArray = existingUserData ? JSON.parse(existingUserData) : [];

                        if (!Array.isArray(userDataArray)) {
                            userDataArray = [];
                        }

                        userDataArray.push(data);

                        localStorage.setItem('userData', JSON.stringify(userDataArray));
                        localStorage.setItem('token', data.token);                        
                    } 
                    this.$emit('open-login-modal');
                } catch(error)  {
                    console.error('Ошибка при регистрации:', error);
                    
                };
            }
        }

    },
    
}
</script>

<style lang="scss" scoped>    
</style>
