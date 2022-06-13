<template>
  <div>
    <div class="jumbotron">
        <div class="jumbotron__left jumbotron__side">
            <figure class="jumbotron__left--pink"></figure>
            <h1 class="jumbotron__left--h1">Profit Powered Banking.</h1>
            <h2 class="jumbotron__left--h2 jumbotron__left--area">Join an Investment Banking Revolution</h2>
            <p class="jumbotron__left--p jumbotron__left--area">Powered by the best security and banking infrastructure. Experience the best in online banking that works for you</p>
            <div class="jumbotron__btns jumbotron__left--area">
                <button class="start" @click="moveToRoute('/signup')">Start Banking</button>
                <button class="login" @click="moveToRoute('/signin')">Login In</button>
            </div>
        </div>
        <div class="jumbotron__right jumbotron__side">
            <div class="jumbotron__right--background">
                <figure>
                    <img src="@/assets/images/base.png"/>
                </figure>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
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

.jumbotron {
    height: 100vh;
    background: #1d1d1d url('@/assets/images/isoheaderbg.svg');
    background-size: cover;
    position: relative;
    height: #{scaleValue(1000)};
    margin-top: #{scaleValue(60)};
    display: flex;

    @media only screen and (max-width: 414px) { 
        flex-direction: column;
        justify-content: space-between;
        height: #{scaleValue(4000)};
        margin-top: 0;
    }

    &__side {
        flex-basis: 50%
    }

    &__left {
        position: relative;
        z-index: 2;
        padding-left: #{scaleValue(170)};
        padding-top: 15vh;

        &--pink {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: green;
            width: #{scaleValue(400)};
            opacity: .3;
            z-index: -1;
            background: #1d1d1d url('@/assets/images/home-purple.svg');
            background-size: cover;

            @media only screen and (max-width: 414px) { 
                width: #{scaleValue(1140)};
            }
        }

        &--area {
            margin-top: #{scaleValue(20)};

            @media only screen and (max-width: 414px) { 
                margin-top: #{scaleValue(100)};
            }
        }

        &--h1 {
            font-size: #{scaleValue(110)};
            line-height: #{scaleValue(100)};
            font-weight: 500;

            @media only screen and (max-width: 414px) { 
                font-size: #{scaleValue(300)};
                line-height: #{scaleValue(300)};
            }
        }

        &--h2 {
            color: #474dff;
            font-weight: 300;
            font-size: #{scaleValue(30)};

            @media only screen and (max-width: 414px) { 
                font-size: #{scaleValue(160)};
                line-height: #{scaleValue(165)};
                width: 80vw;
            }
        }

        &--p {
            opacity: .8;
            font-size: #{scaleValue(20)};
            line-height: #{scaleValue(30)};
            width: #{scaleValue(400)};

            @media only screen and (max-width: 414px) { 
                font-size: #{scaleValue(80)};
                line-height: #{scaleValue(120)};
                width: #{scaleValue(80vw)};
            }
        }
    }

    &__right {
        position: relative;

        &--background {
            width: 100%;
            height: 100%;
            position: absolute;
            right: #{scaleValue(-100)};

            & figure {
                height: 100vh;
                min-height: #{scaleValue(900)};

                background-size: cover;
                height: #{scaleValue(1200)};
                position: absolute;
                top: #{scaleValue(-151)};
                width: 130%;
                right: #{scaleValue(-30)};

                & img {
                    height: 100%;
                    width: 100%;
                    object-fit: fill;
                }
            }
        }
    }

    &__btns {
        margin-top: #{scaleValue(40)};

        @media only screen and (max-width: 414px) { 
            margin-top: #{scaleValue(160)};
        }

        & button {
            padding: #{scaleValue(18)} #{scaleValue(20)};
            border-radius: .2rem;
            font-size: #{scaleValue(20)};
            margin-right: #{scaleValue(20)};
            font-weight: 500;

            @media only screen and (max-width: 414px) { 
                font-size: #{scaleValue(80)};
                padding: #{scaleValue(70)} #{scaleValue(60)};
                margin-right: #{scaleValue(100)};
            }

            &.start {
                background: #474DFF;
            }

            &.login {
                background: #0ACF83;
            }
        }
    }
}
</style>
