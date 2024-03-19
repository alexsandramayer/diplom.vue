<template>
    <section class="feedback container_feedback_slider">
        <h3 class="section__subtitle section__subtitle_feedback">
            узнайте, что о нас думают
        </h3>
        <h2 class="section__title section__title_feedback">
            Отзывы о нашей работе
        </h2>

        <Carousel
            :itemsToShow="isSmallDevice ? 1 : 3"
            :wrapAround="true"
            :transition="1500"
            
            class="feedback__carousel "
        >
            <Slide v-for="(slide, index) in feedbackItems" :key="index">
                <div v-if="isSmallDevice" class="carousel__item">
                    <img class="carousel__item_img" :src="slide.img" alt="user photo" />
                    <h2 class="carousel__item_title">{{ slide.userName }}</h2>
                    <div class="carousel__item_descr">{{ slide.feedbackText }}</div>
                </div>
                <div v-if="!isSmallDevice" class="carousel__item">
                    <img class="carousel__item_img"
                        :src="slide.img"
                        alt="user photo"
                    />
                    <h2 class="carousel__item_title">{{ slide.userName }}</h2>
                    <div class="carousel__item_descr">{{ slide.feedbackText }}</div>
                </div>
            </Slide>
            <template #addons>
                <Pagination />
            </template>
        </Carousel> 

        <router-link to="#" class="feedback__btn">Просмотреть все отзывы</router-link>
    </section>
</template>

<script>

import { Carousel, Pagination, Slide } from "vue3-carousel";


export default{
    components: {
        Carousel,
        Slide,
        Pagination
    },
    
    data() {
        return {
            feedbackItems: [
                {
                    img: require("@/assets/images/feedback/feedback_user.jpeg"),
                    userName: "Валентин М.",
                    feedbackText:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper justo nec arcu mollis, sed congue odio mollis. Donec feugiat pellentesque accumsan.",
                },
                {
                    img: require("@/assets/images/feedback/feedback_user.jpeg"),
                    userName: "Валентин М.",
                    feedbackText:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper justo nec arcu mollis, sed congue odio mollis. Donec feugiat pellentesque accumsan.",
                },
                {
                    img: require("@/assets/images/feedback/feedback_user.jpeg"),
                    userName: "Валентин М.",
                    feedbackText:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper justo nec arcu mollis, sed congue odio mollis. Donec feugiat pellentesque accumsan.",
                },

                {
                    img: require("@/assets/images/feedback/feedback_user.jpeg"),
                    userName: "Валентин М.",
                    feedbackText:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper justo nec arcu mollis, sed congue odio mollis. Donec feugiat pellentesque accumsan.",
                },
                {
                    img: require("@/assets/images/feedback/feedback_user.jpeg"),
                    userName: "Валентин М.",
                    feedbackText:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper justo nec arcu mollis, sed congue odio mollis. Donec feugiat pellentesque accumsan.",
                },
                {
                    img: require("@/assets/images/feedback/feedback_user.jpeg"),
                    userName: "Валентин М.",
                    feedbackText:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper justo nec arcu mollis, sed congue odio mollis. Donec feugiat pellentesque accumsan.",
                },
            ],
        };
    },
    computed: {
        isSmallDevice() {
            return window.innerWidth <= 375; 
        }
    }
};
</script>

<style lang="scss" scoped></style>
