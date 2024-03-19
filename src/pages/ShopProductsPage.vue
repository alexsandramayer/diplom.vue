<template> 
    <HeaderComp />
    <section class="category">
        <div class="container container_mobile">
            <button class="comeback comeback_mobile" @click="goBack">Вернуться назад</button>
            <h2 class="section__title section__title_mobile">{{ categoryName }}</h2>

            <div class="products__filter ">
                <div v-if="hasManufacturerId(products) && isSmallScreen" class="products__filter_block products__filter_block_mobile">
                    <button class="products__filter_btn" @click="toggleManufacturersVisibility">
                        Выбрать производителя
                    </button>
                    <ul v-show="showManufacturers" class="products__filter_list" >
                        <li 
                            class="products__filter_all"
                           :class="{
                            active: selectedManufacturer === null,
                            inactive: selectedManufacturer !== null}" 
                            @click="selectManufacturer(null)">
                            Все
                        </li>
                        <li 
                            v-for="manufacturer in filteredManufacturers" :key="manufacturer.id"
                            @click="selectManufacturer(manufacturer)" 
                            class="products__filter_maker"
                            :class="{ 
                                active: selectedManufacturer === manufacturer,
                                inactive: selectedManufacturer !== manufacturer}">
                            {{ manufacturer.name }}
                        </li>
                    </ul>
                </div>

                <div v-if="hasManufacturerId(products)"  class="products__filter_block">
                    <span class="products__filter_title">Производитель:</span>
                    <span :class="{
                            active: selectedManufacturer === null,
                            inactive: selectedManufacturer !== null}" 
                            @click="selectManufacturer(null)">Все</span>
                    <ul v-for="manufacturer in filteredManufacturers" :key="manufacturer.id">
                        <li
                            class="products__filter_maker"
                            @click="selectManufacturer(manufacturer)"
                            :class="{ 
                                active: selectedManufacturer === manufacturer,
                                inactive: selectedManufacturer !== manufacturer}">
                            {{ manufacturer.name }}
                        </li>
                    </ul>
                </div>

                <div v-if="hasTypeId(products) && isSmallScreen" class="products__filter_block products__filter_block_mobile">
                    <button class="products__filter_btn" @click="toggleTypesVisibility">
                        Выбрать тип продукта
                    </button>
                    <ul v-show="showTypes" class="products__filter_list" > 
                        <li 
                            class="products__filter_all"
                           :class="{
                            active: selectedType === null,
                            inactive: selectedType !== null}" 
                            @click="selectType(null)">
                            Все
                        </li>
                    
                        <li v-for="type in filteredTypes" :key="type.id"
                            class="products__filter_type"
                            @click="selectType(type)"
                            :class="{
                                active: selectedType === type,
                                inactive: selectedType !== type}">
                            {{ type.name }}
                        </li>
                    </ul>
                </div>

                <div v-if="hasTypeId(products)" class="products__filter_block">
                    <span class="products__filter_title">Тип продукта:</span>
                    <span
                        :class="{
                            active: selectedType === null,
                            inactive: selectedType !== null}"
                        @click="selectType(null)">Все</span>
                    <ul v-for="type in filteredTypes" :key="type.id"> 
                        <li
                            class="products__filter_type"
                            @click="selectType(type)"
                            :class="{
                                active: selectedType === type,
                                inactive: selectedType !== type}">
                            {{ type.name }}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="products__items" v-auto-animate>
                <ProductsComp
                    v-for="product in sortedProducts"
                    :key="product.id"
                    :categoryId="categoryId"
                    :categoryName="categoryName"
                    :product="product"
                    @productSelected="onProductSelected"
                />
            </div>
        </div>
    </section>

    <FooterComp />
    
</template>

<script>
import { ref, onMounted, computed} from "vue";
import axios from "axios";
import ProductsComp from "@/components/ProductsComp.vue";
import HeaderComp from "@/components/HeaderComp.vue";
import FooterComp from "@/components/FooterComp.vue";
import { useRouter } from 'vue-router'

export default {
    name: "Products",
    components: { HeaderComp, FooterComp, ProductsComp },

    props: {
        categoryId: {
            type: String,
            required: true,
        },
        categoryName: {
            type: String,
            required: true,
        },       
    },

    setup(props) {
        const products = ref([]);
        const types = ref([]);
        const manufacturers = ref([]);
        const selectedManufacturer = ref(null);
        const selectedType = ref(null);

        const showManufacturers = ref(false);
        const showTypes = ref(false);
        const isSmallScreen = ref(false);

        const router = useRouter();


        const hasManufacturerId = computed(() => {
             return (products) => {
                 return products.some((product) => product.manufacturer_id);
            };
        });

        const hasTypeId = computed(() => {
            return (products) => {
                return products.some((product) => product.type_id);
            };
        });

        const filteredManufacturers = computed(() => {
            return manufacturers.value.filter((manufacturer) => {
                return products.value.some((product) => {
                    return product.manufacturer_id === manufacturer.id;
                });
            });
        });

        const filteredTypes = computed(() => {
            return types.value.filter((type) => {
                return products.value.some((product) => {
                    return product.type_id === type.id;
                });
            });
        });

        const sortedProducts = computed(() => {
            if (!selectedManufacturer.value && !selectedType.value) {
                return products.value;
            }

            if (selectedManufacturer.value && !selectedType.value) {
                return products.value.filter((product) => {
                    return (
                        product.manufacturer_id ===
                        selectedManufacturer.value.id
                    );
                });
            }

            if (!selectedManufacturer.value && selectedType.value) {
                return products.value.filter((product) => {
                    return product.type_id === selectedType.value.id;
                });
            }

            return products.value.filter((product) => {
                return (
                    product.manufacturer_id === selectedManufacturer.value.id &&
                    product.type_id === selectedType.value.id
                );
            });
        });

        const selectManufacturer = (manufacturer) => {
            selectedManufacturer.value = manufacturer;
            if (isSmallScreen.value && showManufacturers.value) {
                showManufacturers.value = false;
            }
        };

        const selectType = (type) => {
            selectedType.value = type;
            if (isSmallScreen.value && showTypes.value) {
                showTypes.value = false;
            }
        };

        onMounted(async () => {
            try {
                const response = await axios.get(
                    "https://c503424f1816e112.mokky.dev/products",
                    {
                        params: {
                            category_id: props.categoryId,
                        },
                    }
                );
                products.value = response.data;
            } catch (error) {
                console.error(error);
            }
            try {
                const response = await axios.get(
                    "https://c503424f1816e112.mokky.dev/types"
                );
                types.value = response.data;
            } catch (error) {
                console.error(error);
            }
            try {
                const response = await axios.get(
                    "https://c503424f1816e112.mokky.dev/manufacturers"
                );
                manufacturers.value = response.data;
            } catch (error) { 
                console.error(error);
            }
            if (window.innerWidth <= 375) {
                isSmallScreen.value = true;
            }
        });

        const toggleManufacturersVisibility = () => {
            showManufacturers.value = !showManufacturers.value;
        };
        const toggleTypesVisibility = () => {
            showTypes.value = !showTypes.value;
        };

        const onProductSelected = (product) => {
            router.push({ name: "product", params: { id: product.id } });
            document.documentElement.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            document.body.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        const goBack = () => {
            router.push({ name: 'shopcatalog' });
        }
        return {
            products,
            types,
            manufacturers,
            selectedManufacturer,
            selectedType,
            filteredManufacturers,
            filteredTypes,
            sortedProducts,
            selectManufacturer,
            selectType,
            hasTypeId,
            hasManufacturerId,
            onProductSelected,
            goBack,
            showManufacturers, 
            showTypes, 
            isSmallScreen, 
            toggleManufacturersVisibility,
            toggleTypesVisibility
        };
    },
};
</script>
<style lang="scss" scoped>
.inactive {
    display: block;
    padding: 4px 10px;
    opacity: 0.6;
    cursor: pointer;
}
.active {
    display: block;
    border-radius: 5px;
    padding: 4px 10px;
    background: #1e549f;
    color: white;
    cursor: pointer;
    opacity: 1;
}
</style>
