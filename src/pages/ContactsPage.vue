<template>
    <HeaderComp />

    <section class="contacts container_page container_page_mobile">
        <div class="contacts__content">
            <h2 class="contacts__title">Контакты</h2>
            <div class="contacts__adress"><span>Центральный офис Акватика:</span> 115569 Москва ул. Шипиловская д. 1 (м. Домодедовская, Орехово)</div>
            <div class="contacts__numbers">
                <span>Телефон:</span> <a href="tel:+74955456702">+7 (495) 545 67 02</a>  или <a href="tel:+79031993910">+7 (903) 199-39-10</a> 
            </div>

            <div class="contacts__links">
                <router-link to="/" class="contacts__link" v-for="(link, index) in contactsLinks" :key="index">
                    <img :src="link.img" alt="contacts icon">
                    {{ link.linkText }}
                </router-link>
            </div>

            <h2 class="contacts__subtitle">Обучение рядом с домом</h2>
            <div class="contacts__text">
                Выберите  удобное для вас месторасположение бассейна и свяжитесь с нашими менеджерами. <br><br>

                <span>м. Нагатинская, Тульская –</span> Бассейн Труд (Южный округ) <br>
                <span>м. Авиамоторная –</span>Бассейн Пятый Элемент (Восточный округ) <br>
                <span>м. Черкизовская –</span> Бассейн  РГУФК (Восточный округ) <br>
                <span>м. Петровско-Разумовская –</span> Бассейн  Останкино (Северный округ)
            </div>

            <h2 class="contacts__subtitle-cart">Карта</h2>
            <div id="map"></div>
        </div>
        
    </section>

    <SubscribeComp />

    <FooterComp />
</template>

<script>
import FooterComp from '@/components/FooterComp.vue';
import HeaderComp from '@/components/HeaderComp.vue';
import SubscribeComp from '@/components/SubscribeComp.vue';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { useGeographic } from 'ol/proj';

export default {
    components: { HeaderComp, SubscribeComp, FooterComp },
    data() {
        return {
            contactsLinks: [
                {
                    img: require("@/assets/images/icons/contacts_skype.svg"),
                    linkText: 'm2008v'
                },
                {
                    img: require("@/assets/images/icons/contacts_mail.svg"),
                    linkText: 'dive@scuba-divers.ru'
                }
            ],
            
        }
    },
    mounted() {
        this.clearMap();
        useGeographic();
        new Map({ 
            target: 'map',
            controls: [],
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    })
                })
            ],
            view: new View({
                center: [37.697361, 55.618054 ],
                zoom: 16
            })
        });
        
    },
    methods: {
        clearMap() {
            const mapElement = document.getElementById('map');
            mapElement.innerHTML = ''; // Очищаем содержимое элемента карты
        }
    }
    
}
</script>

<style lang="scss" scoped>
    #map {
        margin-top: 20px;
        height: 224px; 
        width: 100%; 
        cursor: pointer;
    }
    @media (max-width: 375px){
        #map {
            margin-top: 13px;
            height: 282px;
        }
    }
</style> 