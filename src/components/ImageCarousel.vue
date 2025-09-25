<script>
export default {
    props: ["images"],
    data(){
        return {
            selectedImages: [],
            imagesPerView: null,
            forwardImage: null,
            startImage: 0,
        }
    },
    mounted(){
        window.addEventListener('resize', this.carouselInitial);
        this.carouselInitial();
    },
    methods: {
        carouselInitial(){
            const containerWidth = window.innerWidth - 40;
            let imageWidth = null;

            switch (true) {
                case containerWidth < 350:
                    imageWidth = 280;
                    break;
                case containerWidth < 650:
                    imageWidth = 300;
                    break;
                case containerWidth < 768:
                    imageWidth = 200;
                    break;
                case containerWidth < 960:
                    imageWidth = 240;
                    break;
            
                default:
                    imageWidth = 300;
                    break;
            }
            
            this.imagesPerView = Math.floor(containerWidth / imageWidth) % 2 !== 0 ? Math.floor(containerWidth / imageWidth) : Math.floor(containerWidth / imageWidth) - 1;

            this.forwardImage = Math.floor(this.imagesPerView / 2);
        },
        selectImage(index){
            if(this.selectedImages.includes(this.imagesToShow[index])){
                this.selectedImages = this.selectedImages.filter(img => img !== this.imagesToShow[index]);
            }
            else{
                this.selectedImages.push(this.imagesToShow[index]);
            }
        },
        nextImage(){
            this.startImage = (this.startImage + 1) % this.images.length;
        },
        prevImage(){
            this.startImage = (this.startImage - 1 + this.images.length) % this.images.length;
        },
        getStyle(index) {
            const offset = index - this.forwardImage;
            const maxVisible = Math.floor(this.imagesPerView / 2);

            if (Math.abs(offset) > maxVisible) {
                return {
                    opacity: 0,
                    pointerEvents: "none",
                    transform: "translateX(0px) translateY(0px) scale(0.5)",
                };
            }

            const translateX = offset * 25;
            const translateY = Math.abs(offset) * 30;
            const translateZ = Math.abs(offset) * -30;
            const rotateY = offset * 4;
            const skewY = offset * 2;

            return {
                transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) skewY(${skewY}deg)`,
                transition: "all 0.6s ease",
            };
        },
    },
    computed: {
        imagesToShow(){
            const images = [];
            for (let i = 0; i < this.imagesPerView; i++) {
                const index = (this.startImage + i) % this.images.length;
                images.push(this.images[index]);
            }
            return images;
        }
    }
}
</script>

<template>
    <div class="carousel">
        <div class="carousel-images">
            <div class="carousel-image"
                v-for="(image, index) in imagesToShow"
                :key="image.id"
                @click="selectImage(index)"
                :class="{selected: selectedImages.includes(image)}"
                :style="getStyle(index)"
            >
                <img :src="image.download_url" :alt="`Image ${image.author}`">
            </div>
        </div>
        <div class="carousel-controls">
            <button class="carousel-control" @click="prevImage">Prev</button>
            <button class="carousel-control" @click="nextImage">Next</button>
        </div>
    </div>
    <transition name="transition-list">
        <div class="selected-images" v-if="selectedImages.length">
            <ol>
                <transition-group name="transition-list-item">
                    <li v-for="(image, index) in selectedImages" :key="index">
                        <a :href="image.download_url" target="_blank">{{ image.download_url }}</a>
                    </li>
                </transition-group>
            </ol>
        </div>
    </transition>
</template>

<style scoped>
    .carousel{
        width: 100%;
        margin: 0 auto;
    }

    .carousel-images{
        display: flex;
        align-items: center;
        justify-content: center;
        perspective: 300px;
        height: 300px;
    }

    .carousel-image{
        width: 300px;
        aspect-ratio: 16 / 9;
        line-height: 0;
        border-radius: 10px;
        overflow: hidden;
    }
    .carousel-image.selected{
        border: 2px solid white;
        position: relative;
    }
    .carousel-image.selected::before{
        content: "✓";
        position: absolute;
        top: 5px;
        right: 5px;
        color: rgb(50, 255, 50);
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        font-weight: 700;
    }

    .carousel-image img{
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }

    .carousel-controls{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    .carousel-control{
        width: 50%;
        height: 40px;
        max-width: 150px;
        font-size: 1rem;
        font-weight: 600;
        color: white;
        cursor: pointer;
        margin: 20px;
        text-align:center;
        border: none;
        background-size: 300% 100%;
        border-radius: 50px;
        transition: background-position 0.4s ease-in-out, transform 0.1s ease-in-out;
        background-image: linear-gradient(to right, #ed6ea0, #ec8c69, #f7186a , #FBB03B);
        box-shadow: 0 4px 15px 0 rgba(236, 116, 149, 0.75);
        user-select: none;
    }

    .carousel-control:hover{
        background-position: 100% 0;
    }

    .carousel-control:active{
       transform: scale(0.98);
    }

    .selected-images{
        padding: 20px 35px;
        margin-bottom: 30px;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 20px;
        overflow: hidden;
    }
    .selected-images ol{
        columns: 4;
        column-gap: 50px;
    }
    .selected-images a{
        text-decoration: none;
        color: black;
        font-size: 1.1rem;
    }
    .selected-images li{
        margin: 5px 0;
        break-inside: avoid;
    }

    .transition-list-enter-active,
    .transition-list-leave-active,
    .transition-list-item-enter-active,
    .transition-list-item-leave-active {
        transition: all 0.5s ease;
    }

    .transition-list-enter-from,
    .transition-list-leave-to {
        opacity: 0;
        transform: translateY(20px);
    }

    .transition-list-enter-to,
    .transition-list-leave-from {
        opacity: 1;
        transform: translateY(0);
    }

    .transition-list-item-enter-from,
    .transition-list-item-leave-to{
        opacity: 0;
        transform: translateX(-50%);
    }

    .transition-list-item-enter-to,
    .transition-list-item-leave-from{
        opacity: 1;
        transform: translateX(0);
    }

    @media all and (max-width: 960px) {
        .carousel-image{
            width: 240px;
        }
        .selected-images ol{
            columns: 3;
        }
    }
    @media all and (max-width: 768px) {
        .carousel-image{
            width: 200px;
        }
    }
    @media all and (max-width: 650px) {
        .carousel-image{
            width: 300px;
        }
        .selected-images ol{
            columns: 2;
        }
    }
    @media all and (max-width: 350px) {
        .carousel-image{
            width: 280px;
        }
        .selected-images ol{
            columns: 1;
        }
    }
</style>