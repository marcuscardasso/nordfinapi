<!-- Please remove this file from your project -->
<template>
  <div id="mission">
    <div class="sectiontwo">
        <div class="sectiontwo__top">
            <h2 class="sectiontwo__top--h2">Why People choose us</h2>
            <div class="sectiontwo__topcards">
                <div class="sectiontwo__topcard">
                    <span>Feature One</span>
                    <span>DISH First Major Carrier to Deploy Helium 5G</span>
                </div>
                <div class="sectiontwo__topcard">
                    <span>Feature Two</span>
                    <span>DISH First Major Carrier to Deploy Helium 5G</span>
                </div>
                <div class="sectiontwo__topcard">
                    <span>Feature Three</span>
                    <span>DISH First Major Carrier to Deploy Helium 5G</span>
                </div>
                <div class="sectiontwo__topcard">
                    <span>Feature Four</span>
                    <span>DISH First Major Carrier to Deploy Helium 5G</span>
                </div>
            </div>
            <div class="sectiontwo__topsponsors">
                <figure class="sectiontwo__topsponsor">
                    <img src="@/assets/images/sponsors/coindesk.png"/>
                </figure>
                <figure class="sectiontwo__topsponsor">
                    <img src="@/assets/images/sponsors/decrypt.png"/>
                </figure>
                <figure class="sectiontwo__topsponsor">
                    <img src="@/assets/images/sponsors/fastco.png"/>
                </figure>
                <figure class="sectiontwo__topsponsor">
                    <img src="@/assets/images/sponsors/fortune.png"/>
                </figure>
                <figure class="sectiontwo__topsponsor">
                    <img src="@/assets/images/sponsors/forbes.png"/>
                </figure>
                <figure class="sectiontwo__topsponsor">
                    <img src="@/assets/images/sponsors/time.png"/>
                </figure>
            </div>
        </div>
        <div class="sectiontwo__bottom">
            <div class="sectiontwo__bottomleft">
                <h2 class="sectiontwo__bottomleft--h2">Investing Account is Live</h2>
                <p class="sectiontwo__bottomleft--p">
                    The People’s Network is the world’s fastest growing investing network ever.
                </p>
                <button class="sectiontwo__bottomleft--btn" @click="moveToRoute('/signup')">
                    Get an Investing Account
                </button>
            </div>
            <div class="sectiontwo__bottomright">
                <div class="sectiontwo__bottomright--section">
                    <p>Total users joined</p>
                    <p>8,420,189</p>
                </div>
                <div class="sectiontwo__bottomright--section">
                    <p>Total profits retained by investors</p>
                    <p>$57,000,000</p>
                </div>
            </div>
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

    .sectiontwo {
        background: #0d0d0d;
        padding: #{scaleValue(100)} #{scaleValue(180)};
        padding-bottom: #{scaleValue(30)};

        @media only screen and (max-width: 414px) { 
            padding: #{scaleValue(300)} #{scaleValue(180)};
            padding-bottom: 0;
        }

        &__top {

            &--h2 {
                font-size: #{scaleValue(40)};
                line-height: #{scaleValue(100)};
                font-weight: 500;

                @media only screen and (max-width: 414px) { 
                    font-size: #{scaleValue(110)};
                    line-height: #{scaleValue(180)};
                    margin-bottom: #{scaleValue(120)};
                }
            }
        }

        &__topcards {
            display: flex;
            justify-content: space-between;

            @media only screen and (max-width: 414px) { 
               flex-direction: column;
            }
        }

        &__topcard {
            flex-basis: #{scaleValue(290)};
            font-size: #{scaleValue(21)};
            display: flex;
            flex-direction: column;
            padding: #{scaleValue(24)};
            border-radius: 1rem;
            padding-top: #{scaleValue(70)};
            background-size: cover;

            @media only screen and (max-width: 414px) { 
               font-size: #{scaleValue(80)};
               padding: #{scaleValue(80)};
               padding-top: #{scaleValue(200)};
               margin-bottom: #{scaleValue(160)};
            }

            &:nth-child(1) {
                background: #1d1d1d url('@/assets/images/newsblue.png');
            }

            &:nth-child(2) {
                background: #1d1d1d url('@/assets/images/newsorange.png');
            }

            &:nth-child(3) {
                background: #1d1d1d url('@/assets/images/newspurple.png');
            }

            &:nth-child(4) {
                background: #1d1d1d url('@/assets/images/newsteal.png');
            }

            & span {
                display: inline-block;

                &:nth-child(1) {
                    font-size: #{scaleValue(20)};
                    margin-bottom: #{scaleValue(15)};
                    color: #000000;

                    @media only screen and (max-width: 414px) { 
                        font-size: #{scaleValue(90)};
                        line-height: #{scaleValue(100)};
                        margin-bottom: #{scaleValue(30)};
                    }
                }

                &:nth-child(2) {
                    line-height: #{scaleValue(30)};
                    font-weight: 700;

                    @media only screen and (max-width: 414px) { 
                        line-height: #{scaleValue(100)};
                    }
                }
            }
        }

        &__topsponsors {
            position: relative;
            display: flex;
            justify-content: space-between;
            padding: #{scaleValue(100)} 0;

            @media only screen and (max-width: 414px) { 
               flex-wrap: wrap;
            }

            &:before {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 1px;
                background: #fff;
                opacity: .5;
            }
        }

        &__topsponsor {
            flex-basis: #{scaleValue(290)};
            display: flex;
            align-items: center;

            @media only screen and (max-width: 414px) { 
               flex-basis: #{scaleValue(330)};
               height: #{scaleValue(400)};
               flex-shrink: 0;
            }

            & img {
                width: 70%;
                height: 70%;
                object-fit: fill;

                @media only screen and (max-width: 414px) { 
                    width: 100%;
                    height: 30%;
                }
            }
        }

        &__bottom {
            display: flex;
            justify-content: space-between;
            padding: #{scaleValue(100)} 0;

            @media only screen and (max-width: 414px) { 
                flex-direction: column;
            }
        }

        &__bottomleft {

            @media only screen and (max-width: 414px) {
                padding: #{scaleValue(230)} 0;
            }

            &--h2 {
                font-size: #{scaleValue(40)};
                font-weight: 500;
                margin-bottom: #{scaleValue(29)};

                @media only screen and (max-width: 414px) { 
                    font-size: #{scaleValue(100)};
                    margin-bottom: #{scaleValue(130)};
                }
            }

            &--p {
                font-size: #{scaleValue(22)};
                opacity: .8;
                width: #{scaleValue(500)};

                @media only screen and (max-width: 414px) { 
                    font-size: #{scaleValue(100)};
                    width: #{scaleValue(1080)};
                    margin-bottom: #{scaleValue(130)};
                }
            }

            &--btn {
                margin-top: #{scaleValue(40)};
                background: #474DFF;
                color: #fff;
                border: none;
                outline: none;
                border-radius: .2rem;
                padding: #{scaleValue(18)} #{scaleValue(20)};
                font-size: #{scaleValue(20)};
                font-weight: 500;

                @media only screen and (max-width: 414px) { 
                    font-size: #{scaleValue(80)};
                    padding: #{scaleValue(70)} #{scaleValue(60)};
                    margin-right: #{scaleValue(100)};
                }
            }
        }

        &__bottomright {

            &--section {
                margin-bottom: #{scaleValue(40)};

                @media only screen and (max-width: 414px) { 
                    margin-bottom: #{scaleValue(200)};
                }
                
                & p {

                    &:nth-child(1) {
                        opacity: .8;
                        font-size: #{scaleValue(17)};
                        text-transform: uppercase;
                        margin-bottom: #{scaleValue(10)};

                        @media only screen and (max-width: 414px) { 
                            font-size: #{scaleValue(70)};
                            margin-bottom: #{scaleValue(50)};
                        }
                    }

                    &:nth-child(2) {
                        font-size: #{scaleValue(50)};
                        font-weight: 700;

                        @media only screen and (max-width: 414px) { 
                            font-size: #{scaleValue(200)}
                        }
                    }
                }
            }
        }
    }
</style>
