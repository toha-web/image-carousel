<template>
    <span class="loader"></span>
</template>

<style scoped>
    .loader{
        transform: rotateZ(45deg);
        perspective: 1000px;
        border-radius: 50%;
        width: 200px;
        height: 200px;
        color: #fff;
        display: inline-block;
        position: relative;
    }
    .loader:before,
    .loader:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: inherit;
        height: inherit;
        border-radius: 50%;
        transform: rotateX(70deg);
        animation: 1.5s spin linear infinite;
    }
    .loader:after {
        color: #FF3D00;
        transform: rotateY(70deg);
        animation-delay: 0.8s;
    }

    @keyframes spin {
        0%,
        100% {
            box-shadow: .2em 0px 0 0px currentcolor;
        }
        12% {
            box-shadow: .2em .2em 0 0 currentcolor;
        }
        25% {
            box-shadow: 0 .2em 0 0px currentcolor;
        }
        37% {
            box-shadow: -.2em .2em 0 0 currentcolor;
        }
        50% {
            box-shadow: -.2em 0 0 0 currentcolor;
        }
        62% {
            box-shadow: -.2em -.2em 0 0 currentcolor;
        }
        75% {
            box-shadow: 0px -.2em 0 0 currentcolor;
        }
        87% {
            box-shadow: .2em -.2em 0 0 currentcolor;
        }
    }
</style>