<template>
    <HeaderComp />
    <section classs="cartpage ">
        <div class="container_page container_page_mobile">
            <div class="cartpage__content">
                <h2 class="cartpage__title">Корзина</h2>
                <div v-if="!totalPrice" class="cartpage__emptycart" >
                    <img class="cartpage__emptycart_img" :src="emptyCart" alt="empty box">
                    <h2 class="cartpage__emptycart_title">Корзина пустая</h2>
                </div>
                <div v-else class="cartpage__block">
                    <div class="cartpage__block_left">
                        <ul class="cartpage__items">
                            <li class="cartpage__item" v-for="product in cartItems" :key="product.id">
                                <div class="cartpage__item_left">
                                    <img
                                        class="cartpage__img"
                                        :src="product.imageUrl1"
                                        alt="product image"
                                    >
                                    <div class="cartpage__info">
                                        <h3 class="cartpage__info_title">
                                            {{ product.title }}
                                        </h3>
                                        <p class="cartpage__info_descr">{{ product.descrMini }}</p>
                                        <p class="cartpage__info_manuf">
                                            Производитель: 
                                            <span>{{ product.manufacturer }}</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="cartpage__item_right">
                                    <div class="cartpage__counter">
                                        <button class="cartpage__counter_btn" @click="incr(product)"><img :src="cartPlus" class="plus"></button>
                                        <p class="cartpage__counter_count">{{ product.count }}</p>
                                        <button class="cartpage__counter_btn" @click="decr(product)"><img :src="cartMinus" class="minus"></button>
                                    </div>
                                    <div class="cartpage__price">
                                        {{ product.price * product.count }} ₽
                                    </div>
                                    <button
                                        class="cartpage__delete"
                                        @click="removeFromCart(product)"
                                    >
                                        <img :src="iconDelete" alt="delete icon">
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="cartpage__block_right">
                        <h3 class="cartpage__subtitle">Детали заказа</h3>
                        <div class="cartpage__details">
                            <div class="cartpage__details_top">
                                <p class="cartpage__totalquantity">Товары ({{ totalQuantity }}):</p>
                                <p class="cartpage__totalprice_top">{{ totalPrice }} ₽</p>
                            </div>
                            <div class="cartpage__details_bottom">
                                <p class="cartpage__totalprice_bottom">Итог:</p>
                                <p class="cartpage__totalprice_bottom">{{ totalPrice }} ₽</p>
                            </div>
                        </div>
                        <button class="cartpage__createorder">Оформить заказ</button>
                        <button class="cartpage__continueshopping" @click="goToPage">Продолжить покупки</button>
                    </div>
                </div>
                
                
            </div>
        </div>
    </section>
    <SubscribeComp />
    <FooterComp />
</template>

<script>
import FooterComp from "@/components/FooterComp.vue";
import HeaderComp from "@/components/HeaderComp.vue";
import SubscribeComp from "@/components/SubscribeComp.vue";
import CartService from "@/components/CartService";

export default {
    components: { HeaderComp, FooterComp, SubscribeComp },
    data() {
        return {
            cartItems: CartService.cartItems,
            iconDelete: require("@/assets/images/icons/cart_delete.svg"),
            cartPlus: require("@/assets/images/icons/cart_plus.svg"),
            cartMinus: require("@/assets/images/icons/cart_minus.svg"),
            emptyCart: require("@/assets/images/cart/empty_box.svg"),
        };
    },
    methods: {
        incr(product) {
            product.count++;
        },
        decr(product) {
            if (product.count > 1) {
                product.count--;
            }
        },
        removeFromCart(product) {
            const index = this.cartItems.findIndex(
                (item) => item.id === product.id
            );
            if (index !== -1) {
                this.cartItems.splice(index, 1);
                this.saveCartItems();
            };
            document.documentElement.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            document.body.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        saveCartItems() {
            localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
        },
        goToPage() {
            this.$router.push({ name: 'shopcatalog' });
            document.documentElement.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            document.body.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    },
    computed: {
        totalPrice() {
            let total = 0;
            for (let i = 0; i < this.cartItems.length; i++) {
                total += this.cartItems[i].price * this.cartItems[i].count;
            }
            return total;
        },
        totalQuantity() {
            const uniqueProducts = new Set();
            for (let i = 0; i < this.cartItems.length; i++) {
                uniqueProducts.add(this.cartItems[i].title);
            }
            return uniqueProducts.size;
        }
    },
    
};
</script>

<style lang="scss" scoped></style>
