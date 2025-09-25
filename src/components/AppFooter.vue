<script>
export default {
    
}
</script>

<template>
    <footer class="footer">
        <div class="copyright">
            &copy; {{new Date().getFullYear()}} Development and design by <a href="http://biletskyi.dev" target="_blank">Anton Biletskyi</a>
        </div>
    </footer>
</template>

<style scoped>
    .footer{
        width: 100%;
        background-color: rgba(255, 255, 255, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .copyright{
        font-size: 1.2rem;
        padding: 20px;
        text-align: center;
    }
    a{
        color: black;
        text-decoration: none;
        font-weight: 700;
    }
</style>