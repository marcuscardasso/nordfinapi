<template>
  <div>
    <div class="popup">
        <div class="popup__body" v-if="popuptype === 'loading'">
            <div class="popup__body--loading"></div>
             <p>Processing</p>
        </div>
        <div class="popup__body" v-if="popuptype === 'message'">
            <span>
                <svg>
                    <use xlink:href="@/assets/imgs/sprite.svg#icon-bubble2" />
                </svg>
            </span>
            <p>You need a regulation code in order for us to process this request</p>
            <span class="button" @click="closePopup">Close</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: [
        'label', 
        'instruction', 
        'popuptype',
        'closePopup'
        ]
}
</script>

<style lang="scss" scoped>
@function scaleValue($value) {
    @return calc(
      #{$value} * (clamp(350px, 100vw, 3840px) / var(--ideal-viewport-width))
    );
}

@keyframes spinFive {
  0% {
    transform: rotate(0deg);
  }
  
  50% {
    opacity: 0;
  }
  
  100% {
    transform: rotate(360deg);  
  }
}

.popup {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, .5);
    z-index: 10;

    &__body {
        background: #fff;
        margin: 0 auto;
        height: #{scaleValue(400)};
        width: #{scaleValue(600)};
        margin-top: #{scaleValue(100)};
        color: #000000;
        display: flex;
        flex-direction: column;
        padding: #{scaleValue(15)} #{scaleValue(40)};
        align-items: center;
        padding-top: #{scaleValue(100)};

        &--loading {
            height: #{scaleValue(80)};
            width: #{scaleValue(80)};
            background: none;
            border-radius: 100%;
            border: 5px solid #fff;
            border-color: #fff #fff #fff #474DFF;

            transition: all .3s ease-in;
            animation: spinFive 1s linear 1s infinite;
        }

        & svg {
            fill: #474DFF;
            height: #{scaleValue(40)};
            width: #{scaleValue(40)}
        }

        & p {
             font-size: #{scaleValue(25)};
             text-align: center;
             margin-top: #{scaleValue(20)};
             font-weight: 400;
             opacity: .6;
        }

        & span.button {
            background: #474DFF;
            padding: #{scaleValue(15)} #{scaleValue(50)};
            border-radius: .1rem;
            cursor: pointer;
            font-size: #{scaleValue(20)};
            font-weight: 700;
            margin-top: #{scaleValue(30)};
            box-shadow: -2px 10px 91px -13px rgba(#474DFF,0.75);
            -webkit-box-shadow: -2px 10px 91px -13px rgba(#474DFF,0.75);
            -moz-box-shadow: -2px 10px 91px -13px rgba(#474DFF,0.75);
            color: #fff;
        }
    }
}
</style>
