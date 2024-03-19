<template>
    <div class="loginmodal_overlay" :class="{ active: isOpen }"></div>
    <div class="loginmodal_content" :class="{ active: isOpen }"> 
        <div class="leftblockmodal_left">
            <div class="logo_main">
                <router-link  to="/"><img :src="logo" alt="logo"/></router-link >
            </div>
            <h3 class="leftblockmodal_subtitle">Регистрация</h3>
            <p class="leftblockmodal_descr">Еще нет аккаунта?</p>
            <button class="leftblockmodal_btn" @click="openRegistrModal">Зарегистрироваться</button>
        </div> 
        <div class="loginmodal_right">
            <span class="loginmodal_close" @click="closeModal"><img :src="closeIcon" alt="close modal"></span>
            <h2 class="loginmodal_title">Войти в личный кабинет</h2>
            <form class="loginmodal_form"> 
                <div>
                    <input class="loginmodal_input" type="text" name="name" autocomplete="off" placeholder="Логин" v-model="username" @input="validateUsername" :class="{ invalid: !isValidUsername && username.length > 0 }">
                    <div class="error-message" v-if="!isValidUsername && username.length > 0">Введите не менее 6 символов</div>
                </div>
                
                <div>
                    <div class="loginmodal_password">
                        <input class="loginmodal_input" :type="passwordFieldType" placeholder="Пароль" name="password" autocomplete="off" v-model="password" @input="validatePassword" :class="{ invalid: !isValidPassword && password.length > 0 }">
                        <img :src="passwordIconSrc" @click="togglePasswordVisibility" class="loginmodal_password_icon" alt="eye pass">
                        
                    </div>
                    
                    <div class="error-message" v-if="!isValidPassword && password.length > 0">Введите не менее 6 символов</div>
                </div>
               
                <router-link class="loginmodal_btn" :to="{ name: 'account' }" @click="login" :disabled="!isLoginFormValid">Войти</router-link>
            </form>            
            <button class="loginmodal_btnforget" @click="openForgetPassModal">Забыли пароль?</button>
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
    emits: ['close-modal', 'open-registration-modal', 'open-forgetpass-modal'],    
    data() {
        return {
            logo: require("@/assets/images/logo/logo_main.svg"),
            closeIcon: require('@/assets/images/icons/close_modal.svg'),
            visible:  require('@/assets/images/icons/visible.svg'),
            notVisible:  require('@/assets/images/icons/not_visible.svg'),
            username: '',
            password: '',
            passwordFieldType: 'password',
            isPasswordVisible: false,
            isValidUsername: false,
            isValidPassword: false,
            
        }
    },
    computed: {
        isLoginFormValid() {
            return this.isValidUsername && this.isValidPassword && this.username.length > 0 && this.password.length > 0;
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
        openForgetPassModal() {
            this.$emit('open-forgetpass-modal'),
            this.$emit('close-modal')
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
        async login() {
            const enteredUsername = this.username;
            const enteredPassword = this.password;
            try{
                const response = await fetch("https://c503424f1816e112.mokky.dev/auth", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",

                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        username: enteredUsername,
                        password: enteredPassword
                    })
                })
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    localStorage.setItem('userData', JSON.stringify(data));
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('isAuthenticated', 'true');

                    

                    this.$router.push('/account');
                    console.log('Авторизация успешна');                    
                } 
            } catch(error)  {
                console.error('Ошибка при авторизации:', error);
                   
            }    
        }

    },
    
}
</script>

<style lang="scss" scoped>

</style>