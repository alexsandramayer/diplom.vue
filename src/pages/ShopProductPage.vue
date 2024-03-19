<template>
    <HeaderComp />
    <section class="product" v-if="product"> 
        <div class="container container_mobile">
            <button class="comeback comeback_mobile" @click="goBack">Вернуться назад</button>
            <h2 class="section__title section__title_mobile">{{ product.titleModel }}</h2>

            <div class="product__block">
                <div class="product__block_top">
                    <div class="product__gallery" >
                        <img class="product__bigimg" :src=" bigImg" v-if="bigImg"/>
                        <div class="product__images">
                            <img class="product__img"  :src="imageUrl" :class="{ active: activeImageUrl === imageUrl }" v-for="(imageUrl, index) in imageUrls" :key="index"  @click="changeImg(imageUrl)" alt="product image">
                        </div>
                    </div>
                    <div class="product__info_top">
                        <h3 class="product__info_title">
                            {{ product.title }}
                        </h3>
                        <div class="product__info_text">
                            {{ product.textInfo }}
                        </div>
                        <table class="product__info_data">
                            <tbody class="product__info_right">
                                <tr class="table_color">
                                    <td class="table_subtitle">Раздел</td>
                                    <td class="table_descr">{{ product.category }}</td>
                                </tr>
                                <tr>
                                    <td class="table_subtitle">Производитель</td>
                                    <td class="table_descr">{{ product.manufacturer }}</td>
                                </tr>
                                <tr class="table_color">
                                    <td class="table_subtitle">Состояние</td>
                                    <td class="table_descr">{{ product.available }}</td>
                                </tr>
                                
                                
                            </tbody>
                        </table>
                        <div class="product__info_bottom">
                            <div class="product__info_bottom-block">
                                <div class="product__info_price">
                                {{ product.price }}₽
                                </div>
                                <span class="product__span">x</span>
                                <div class="product__info_count">
                                    <input class="product__input" type="number" v-model="count" @input="updateCount" min="1" />
                                </div>
                            </div>
                            
                            <button class="product__info_btn" @click="addToCart(product)" :disabled="productAddedToCart">
                                {{ buttonText }}
                            </button>
                        </div>
                    </div>
                </div>

                <div class="product__block_bottom">
                    <div class="product__info_subtitle">
                        Описание товара
                    </div>
                    <div class="product__info_descr">
                        {{ product.descrFull }}
                    </div>
                    
                </div>
            </div>
        </div>
    </section>

    <FooterComp />
</template>

<script>
import FooterComp from "@/components/FooterComp.vue";
import HeaderComp from "@/components/HeaderComp.vue";
import CartService from '@/components/CartService';


export default {
    components: { HeaderComp, FooterComp },
    props: ["id"],
    data() {
        return {
            product: null,
            imageUrls: [],
            bigImg: null,
            activeImageUrl: '',
            count: 1,
            cartItems: [],
            buttonText: 'Приобрести', 
            productAddedToCart: false,
            
        };
    },
    created() {
        this.getProduct();
    },
    
    methods: {
        async getProduct() {
            try {
                const response = await fetch(
                    `https://c503424f1816e112.mokky.dev/products/${this.id}`
                );
                const data = await response.json();
                this.product = data;

                const imageUrls = [];
                let index = 1;
                let imageUrl = this.product[`imageUrl${index}`];
                while (imageUrl) {
                    imageUrls.push(imageUrl);
                    index++;
                    imageUrl = this.product[`imageUrl${index}`];
                }

                
                this.imageUrls = imageUrls;
                this.bigImg = this.imageUrls[0];
                this.activeImageUrl = this.imageUrls[0]; 
            } catch (error) {
                console.error(
                    "Ошибка при получении информации о продукте:",
                    error
                );
            }
        },
        goBack() {
            window.history.go(-1);
        },
        changeImg(imageUrl) {
            this.bigImg = imageUrl;
            this.activeImageUrl = imageUrl;
        },
        updateCount(event) {
            this.count = Number(event.target.value);
        },
        
        addToCart(product) {
            this.buttonText = 'Товар в корзине';
            
           
            this.productAddedToCart = true;
            const existingProduct = CartService.getCartItem(product);

            if (existingProduct) {
               
                existingProduct.quantity += this.count;
                CartService.updateCartItem(existingProduct);
            } else {
               
                CartService.addToCart(product, this.count);
            }
        },
        

    },
    

    
};
</script>
