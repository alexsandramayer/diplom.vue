<template>
    <div class="callbackmodal_overlay" :class="{ active: isOpen }"></div>
    <div class="callbackmodal_content" :class="{ active: isOpen }">
        <span class="callbackmodal_close" @click="closeModal"><img :src="closeIcon" alt="close modal"></span>
        <h2 class="callbackmodal_title">Что вас интересует?</h2>
        <div class="callbackmodal_items" >
            <div class="callbackmodal_item" v-for="item in modalItems" :key="item.id" :class="{ 'selected': item.selected }" >
                <label class="checkbox-custom">
                    <span>{{ item.text }}</span>
                    <input type="checkbox" name="checkbox" v-model="item.selected" 
                    class="checkbox_input" >
                    <img v-if="item.selected" :src="checkmark" class="checkbox_checkmark">
                </label>
            </div> 
        </div>
        <form class="callbackmodal_form">
            <div>
                <input class="callbackmodal_input" type="text" name="name" placeholder="Введите ваше имя" autocomplete="off" v-model="name" @input="validateName" :class="{ invalid: !isValidName && name.length > 0 }">
                <div class="error-message" v-if="!isValidName && name.length > 0">Некорректное имя</div>
            </div>
            <div>
                <input class="callbackmodal_input" type="email" name="email" autocomplete="off" placeholder="E-mail" v-model="email" @input="validateEmail" :class="{ invalid: !isValidEmail && email.length > 0 }">
                <div class="error-message" v-if="!isValidEmail && email.length > 0">Некорректный E-mail</div>
                
            </div>
            <div>
                <input class="callbackmodal_input" type="tel" name="tel" autocomplete="off" placeholder="Введите ваш телефон" v-model="phone" @input="validatePhone" :class="{ invalid: !isValidPhone && phone.length > 0 }">
                <div class="error-message" v-if="!isValidPhone && phone.length > 0">Некорректный номер телефона</div>
            </div>
            
        </form>
        <button class="callbackmodal_btn" type="submit">Отправить</button>
        <div class="callbackmodal_descr">Спасибо! Мы свяжемся с вами в ближайшее время.</div>
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
        emits: ['close-modal'],
        data() {
            return {
                closeIcon: require('@/assets/images/icons/close_modal.svg'),
                modalItems: [
                    { id: 1, text: "Обучение дайвингу", selected: false},
                    { id: 2, text: "Подарочный сертификат", selected: false},
                    { id: 3, text: "Консультация", selected: false},
                ],
                name: '',
                email: '',
                phone: '',
                isValidName: false,
                isValidEmail: false,
                isValidPhone: false,
                checkmark: require('@/assets/images/icons/checkmark.svg')
            }
        },
        methods: {
            closeModal() {
                this.$emit('close-modal');
            },
            validateName() {
                const length = this.name.length;
                const pattern = /^[а-яА-Яa-zA-Z\s]+$/;  
                this.isValidName = pattern.test(this.name) && length >= 4 && length <= 15;
            },
            validateEmail() {
                const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                this.isValidEmail = pattern.test(this.email);
            },
            validatePhone() {         
                const pattern = /^\+?[0-9]{10,12}$/;
                this.isValidPhone = pattern.test(this.phone);
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>