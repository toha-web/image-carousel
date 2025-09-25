<script>
export default {
    
}
</script>

<template>
    <header class="header">
        <h1>Sexy Image Carousel</h1>
    </header>
</template>

<style scoped>
    .header{
        height: 100px;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
    }
    h1{
        text-align: center;
        font-size: 3rem;
    }

    @media all and (max-width: 500px) {
        h1{
            font-size: 2.5rem;
        }
    }
</style>