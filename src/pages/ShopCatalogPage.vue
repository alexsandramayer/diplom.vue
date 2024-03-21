<template>
    <HeaderComp />
    <section class="catalog container">
        <h3 class="section__subtitle">Снаряжение для дайвинга</h3>
        <h2 class="section__title">Каталог <span>товаров</span></h2>
        <ul class="catalog__items" v-auto-animate>
            
            <CategoryComp
                v-for="category in categories" 
                :key="category.id"
                :id="category.id"
                :title="category.title"
                :imageUrl="category.imageUrl"
                :category="category"
                @click="goToProducts(category)"
            />  
        </ul>
    </section>
    <FooterComp />
</template>

<script>
import { ref, onMounted} from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import CategoryComp from "@/components/CategoryComp.vue";
import FooterComp from "@/components/FooterComp.vue";
import HeaderComp from "@/components/HeaderComp.vue";
export default {
    name: "Categories",
    components: { FooterComp, HeaderComp, CategoryComp },
    
    setup() {
        const categories = ref([])
        const router = useRouter()
        onMounted(async () => {
            try {
                const response = await axios.get('https://c503424f1816e112.mokky.dev/categories')
                categories.value = response.data
            } catch (err) {
                console.log(err)
            }
        })
        const goToProducts = (category) => {
            router.push({
                name: 'shopproducts',
                params: {
                    categoryId: category.id,
                    categoryName: category.title,
                },
            });
            document.documentElement.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            document.body.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
        return {
            categories,
            goToProducts

        };
    },
    
};
</script>
