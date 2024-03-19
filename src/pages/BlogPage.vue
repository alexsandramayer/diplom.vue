<template>
    <HeaderComp />
    <div class="blog__items container_page" v-auto-animate >
        <div class="blog__item" v-for="item in itemsPerPage" :key="item.id">
            <img class="blog__item_img" :src="item.image" alt="blog item image">
            <div class="blog__item_block">
                <h2 class="blog__item_title">{{ item.title }}</h2>
                <router-link to="/" class="blog__item_btn">{{ item.btnText }}</router-link>
            </div>
            <div class="blog__item_descr">{{ item.descr }}</div>
        </div>
    </div>
    
    <div class="blog__items_mobile container_page container_page_mobile" v-auto-animate v-if="isSmallScreen">
        <div class="blog__item" v-for="item in itemsPerPage" :key="item.id">
            <img class="blog__item_img" :src="item.image" alt="blog item image">
            <div class="blog__item_mobile">
                <h2 class="blog__item_title">{{ item.title }}</h2>
                <div class="blog__item_descr">{{ item.descr }}</div>
                <router-link to="/" class="blog__item_btn">{{ item.btnText }}</router-link>
            </div>
            
        </div>
    </div>
 
    <div class="pagination container_page" >
        <button class="prev" :disabled="currentPage === 1" @click="prevPage"><img :src="arrowLeft"></button>
        <div class="numbers">
            <button class="number" @click="goToPage(1)" v-if="visiblePages[0] > 2 && currentPage !== 1">1</button>
            <span class="number" v-if="visiblePages[0] > 2">...</span>
            <button class="number" :class="{ active: currentPage === page }" v-for="page in visiblePages" :key="page" @click="goToPage(page)">{{ page }}</button>
            <span class="number" v-if="visiblePages[visiblePages.length - 1] < totalPages - 1">...</span>
            <button class="number" @click="goToPage(totalPages)" v-if="visiblePages[visiblePages.length - 1] < totalPages">{{ totalPages }}</button> 
        </div>
        <button class="next"  :disabled="currentPage === totalPages" @click="nextPage"><img :src="arrowRight"></button>
    </div>

   

    <SubscribeComp />

    <FooterComp />
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue';
import SubscribeComp from '@/components/SubscribeComp.vue';
import FooterComp from '@/components/FooterComp.vue';
import { ref, onMounted, computed  } from "vue";

export default {
    components: { HeaderComp, SubscribeComp, FooterComp },
    data() {
        return {
            
            
            arrowLeft: require("@/assets/images/icons/arrow-left.svg"),
            arrowRight: require("@/assets/images/icons/arrow-right.svg"),
        }
    },
    computed: {
        visiblePages() {
            let startPage = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
            let endPage = Math.min(this.totalPages, startPage + this.maxVisiblePages - 1);

            if (endPage === this.totalPages) {
                startPage = Math.max(1, this.totalPages - this.maxVisiblePages + 1);
            }

            return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
        },
        
    },
   
    
    setup() {       
        const currentPage = ref(1); 
        const items = ref([]); 
        const itemsPerPage = ref([]); 
        const maxVisiblePages = 5;
        const isSmallScreen = ref(false); 
        const totalPages = computed(() => {
            if (window.innerWidth <= 375) {
                return 1; 
            } else {
                return Math.ceil(items.value.length / maxVisiblePages); 
            }
        })
        
        

        const goToPage = (page) => {
            currentPage.value = page;
            updateItemsPerPage();
            document.documentElement.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            document.body.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
                updateItemsPerPage();
            };
            document.documentElement.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            document.body.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
                updateItemsPerPage();
            };
            document.documentElement.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            document.body.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };


        const updateItemsPerPage = () => {
            if (window.innerWidth <= 375) {
                itemsPerPage.value = items.value;
            } else {
                const startIndex = (currentPage.value - 1) * maxVisiblePages;
                const endIndex = Math.min(startIndex + maxVisiblePages, items.value.length);
                itemsPerPage.value = items.value.slice(startIndex, endIndex);
            }
        };

       
        onMounted(async () =>  {
            try {
                const response = await fetch('https://c503424f1816e112.mokky.dev/blog_items');
                const data = await response.json();
                items.value = data;
                updateItemsPerPage();
            } catch (error) {
                console.error('Error fetching items:', error);
            };
            if (window.innerWidth <= 375) {
                isSmallScreen.value = true;
            };
        });
        
        return {
            currentPage,
            items,
            itemsPerPage,
            maxVisiblePages,
            totalPages,
            goToPage,
            prevPage,
            nextPage,
            isSmallScreen,
            
        };
    }
}
</script>

<style lang="scss" scoped>
    
</style>
