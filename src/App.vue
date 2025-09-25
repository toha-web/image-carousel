<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import ImageCarousel from './components/ImageCarousel.vue';
import AppLoader from './components/AppLoader.vue';
import getImages from './utils/getImages';

    export default {
        data(){
            return {
                images: [],
                loading: true,
            }
        },
        components: { AppHeader, AppFooter, ImageCarousel, AppLoader },
        created(){
            getImages().then(images => {
                this.images = images;
                this.loading = false;
            });
        },
    }
</script>

<template>
    <div class="wrapper">
        <AppHeader />
        <main class="main">
            <AppLoader v-if="loading" />
            <ImageCarousel v-else :images />
        </main>
        <AppFooter />
    </div>
</template>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.wrapper{
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-image: url(./assets/background.png);
    background-repeat: no-repeat;
    background-size: cover;
}

.main{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
}
</style>
