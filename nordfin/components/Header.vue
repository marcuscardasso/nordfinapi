<!-- Please remove this file from your project -->
<template>
  <div>
    <div class="header" :class="{ sidenav }" @click="toggleslde">
        <div class="header__mobile">
            <figure class="header__mobile--logo">
                <img src='@/assets/images/pink-circle.png'/>
            </figure>
            <div class="header__mobile--toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="header__left">
            <div class="header__leftlogo" @click="moveToRoute('/')">
                <figure class="header__leftlogo--icon">
                    <img src='@/assets/images/pink-circle.png'/>
                </figure>
                <div class="header__leftlogo--label">
                    <p>SwissNordic Financials</p>
                </div>
            </div>
        </div>
        <div class="header__right">
            <a class="header__right--link" href="#mission">Solutions</a>
            <a class="header__right--link" href="#benefits">Benefits</a>
            <a class="header__right--link" href="#accounts">Accounts</a>
            <span class="header__right--link" @click="moveToRoute('/contact')">Contact</span>
            <span class="header__right--link" @click="moveToRoute('/about')">About</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            sidenav: false
        }
    },
    methods: {
        toggleslde() {
            this.sidenav === false ? this.sidenav = true : this.sidenav = false;
        },
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

.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 10;
    background: #1d1d1d;
    padding: #{scaleValue(20)} #{scaleValue(180)};
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all .1s ease-in;

    @media only screen and (max-width: 414px) { 
        height: 100vh;
        width: #{scaleValue(1300)};
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 0 #{scaleValue(100)};
        padding-top: #{scaleValue(200)};
        position: fixed;

        transform: translateX(-123%);

        &:before {
            content: '';
            position: absolute;
            top: 0;
            height: 100%;
            width: #{scaleValue(300)};
            right: #{scaleValue(-300)};
            background: #1d1d1d;
            opacity: .3;
        }
    }

    &__mobile {
        display: none;

        @media only screen and (max-width: 414px) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            width: 100vw;
            z-index: 40;
            top: 0;
            left: 0;
            transform: translateX(100%);
            padding: #{scaleValue(100)} #{scaleValue(180)};
        }

        &--logo {
            cursor: pointer;

            @media only screen and (max-width: 414px) { 
                width: #{scaleValue(200)};
                height: #{scaleValue(200)};
                margin-right: 0;
                margin-bottom: #{scaleValue(50)};
            }

            & img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }

        &--toggle {

            @media only screen and (max-width: 414px) { 
                display: flex;
                flex-direction: column;
                align-items: flex-end;

                & span {
                    display: inline-block;
                    background: #fff;
                    border-radius: 3rem;
                    margin-bottom: #{scaleValue(30)};
                    height: #{scaleValue(20)};
                    width: #{scaleValue(160)};

                    &:nth-child(2) {
                        width: #{scaleValue(140)};
                    }

                    &:nth-child(3) {
                        width: #{scaleValue(120)};
                    }
                }
            }
        }
    }

    &.sidenav {

        @media only screen and (max-width: 414px) {
            transform: translateX(0);
        }
    }

    &__left {
        display: flex;
        align-items: center;

        @media only screen and (max-width: 414px) { 
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: #{scaleValue(100)};
        }
    }

    &__leftlogo {
        display: flex;
        align-items: center;
        cursor: pointer;

         @media only screen and (max-width: 414px) { 
            flex-direction: column;
            align-items: flex-start;
        }

        &--icon {
            width: #{scaleValue(40)};
            height: #{scaleValue(40)};
            margin-right: #{scaleValue(10)};

            @media only screen and (max-width: 414px) { 
                width: #{scaleValue(200)};
                height: #{scaleValue(200)};
                margin-right: 0;
                margin-bottom: #{scaleValue(50)};
            }

            & img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }

        &--label {
            font-size: #{scaleValue(20)};

            @media only screen and (max-width: 414px) { 
                font-size: #{scaleValue(100)};
            }
        }
    }

    &__right {
        display: flex;
        align-items: center;

        @media only screen and (max-width: 414px) { 
            flex-direction: column;
            align-items: flex-start;
        }

        &--link {
            color: #C0A161;
            cursor: pointer;
            text-decoration: none;
            margin-left: #{scaleValue(30)};

            @media only screen and (max-width: 414px) { 
                flex-direction: column;
                align-items: flex-start;
                font-size: #{scaleValue(100)};
                margin-left: 0;
                margin-bottom: #{scaleValue(100)};
            }
        }
    }
}
</style>
