<template>
  <div class="photo">
    <figure class="photo__fig">
        <img src="@/assets/images/low-cost.jpeg"/>
    </figure>
    <div class="photo__content">
       <div class="photo__content--wrapper">
            <p>Founded by some of the finance industry’s foremost builders</p>
            <button class="photo__content--btn" @click="moveToRoute('/about')">Learn more about the SwissNordic team</button>
       </div>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        moveToRoute(route) {
            this.$router.push(route)
        }
    }
}
</script>

<style lang="scss" scoped>
@function scaleValue($value) {
    @return calc(
      #{$value} * (clamp(350px, 100vw, 3840px) / var(--ideal-viewport-width))
    );
}

    .photo {
        background-size: cover;
        position: relative;

        &__fig {
            position: relative;
            height: #{scaleValue(500)};

            @media only screen and (max-width: 414px) { 
                height: #{scaleValue(1200)};
            }
            
            & img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }

        &__content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .6);
            z-index: 4;
            display: flex;
            align-items: center;
            padding: 0 #{scaleValue(200)};

            @media only screen and (max-width: 414px) { 
                padding:  0 #{scaleValue(100)};
            }

            &--wrapper {
                font-size: #{scaleValue(55)};
                font-weight: 700;
                line-height: #{scaleValue(65)};
                padding-right: #{scaleValue(100)};

                @media only screen and (max-width: 414px) { 
                    font-size: #{scaleValue(120)};
                    line-height: #{scaleValue(170)};
                    padding-right: 0;
                }
            }

            &--btn {
                border: solid 1px #474DFF;
                border-radius: 3rem;
                padding:  #{scaleValue(25)} #{scaleValue(30)};
                font-size: #{scaleValue(18)};
                font-weight: 700;
                position: relative;
                outline: none;
                text-decoration: none;
                margin-top: #{scaleValue(40)};
                cursor: pointer;
                transition: all .2s ease;
                overflow: hidden;

                @media only screen and (max-width: 414px) { 
                    font-size: #{scaleValue(60)};
                    padding:  #{scaleValue(90)} #{scaleValue(60)};
                }

                &:before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 100%;
                    width: 0;
                    border-radius: 3rem;
                    background: #474DFF;
                    z-index: -1;
                    transition: all .2s ease;
                }

                &:hover {

                    &:before {
                        width: 100%;
                    }
                }
            }
        }   
    }
</style>
