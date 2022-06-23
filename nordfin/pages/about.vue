<template>
    <div>
        <div class="about">
            <div class="about__logo" @click="moveToRoute('/')">
                <figure class="about__logo--left">
                    <img src='@/assets/images/pink-circle.png'/>
                </figure>
                <div class="about__logo--right">
                    <p>SwissNordic Financials</p>
                </div>
            </div>
            <div class="about__top about__area">
                <h1>Our Mission</h1>
                <div class="about__top--paras">
                    <p>Wealth and value preservation</p>
                    <p>through <span class="highlight">sustained</span>, <span class="highlight">verifiable</span>,</p>
                    <p><span class="highlight">algorithmic</span> investment strategies</p>
                </div>
                <div class="about__area--summary">
                    <p>SwissNordic is a secure and decentralized banking system built on the world's most secure tradfi and defi networks. With markets experiencing volatility, Swissnordic's role is keeping your money valuable in an often unstable market. Such stability is achieved by algorithmically moving your money across a selection of assets specifically chosen by our team of experts all aided by some of the world's most advanced finance AI.</p>
                    <p>We envision a world where money does not lose value just because some assets are no longer needed by the market. Saving money or investing in an asset can be profitable and without uncertainty</p>
                </div>
            </div>
            <div class="about__midtext about__area">
                <div class="about__midtext--top">
                    <h2 class="about__midtext--h2">Economic growth and value preservasion</h2>
                    <p class="about__midtext--toppara">Our responsibility to our partners and users</p>
                </div>
                <div class="about__midtext--bottom about__area--summary">
                   <div class="about__midtext--left">
                        <p>Traditional finance is not to be totally done away with as we adopt blockchain and decentralized finance. Our goal is to combine the best of both technologies to bring our partners and users a resillient financial and investment interface.</p>
                        <p>Through our advanced AI and Blockchain infrastructure, and together with our partners, we have managed to serve and provide value for over 8,000,000 users and investors. Our global financial solutions are underpinned with the utilizing the power of blockchain and traditional technology.</p>
                        <router-link to="/signup"><button class="about__midtext--btn">Join the financial frontier</button></router-link>
                   </div>
                   <div class="about__midtext--right">
                        <figure>
                            <img src="@/assets/images/peoplehappy.webp"/>
                        </figure>
                   </div>
                </div>
            </div>
            <div class="about__area about__partners" id="partners">
                    <div class="about__section--header">
                        <h1 class="about__section--h1">0ur Partners</h1>
                        <span></span>
                    </div>
                    <div class="about__area--summary">
                        SwissNordic is proud to have partnered and collaborated with many leading tradfi and defi firms, including but not limited to:
                    </div>
                    <div class="about__partners">
                        <div class="about__partnerboxes">
                            <div class="about__partnerbox">
                                <figure class="about__partnerbox--fig">
                                    <img src="@/assets/imgs/circle.webp"/>
                                </figure>
                                <div class="about__partnerbox--label">
                                    <p>Circle</p>
                                </div>
                            </div>
                             <div class="about__partnerbox">
                                <figure class="about__partnerbox--fig">
                                    <img src="@/assets/imgs/fenw.webp"/>
                                </figure>
                                <div class="about__partnerbox--label">
                                    <p>Fenwick and West</p>
                                </div>
                            </div>
                             <div class="about__partnerbox">
                                <figure class="about__partnerbox--fig">
                                    <img src="@/assets/imgs/lightspeed.png"/>
                                </figure>
                                <div class="about__partnerbox--label">
                                    <p>Light Speed Venture Partners</p>
                                </div>
                            </div>
                             <div class="about__partnerbox">
                                <figure class="about__partnerbox--fig">
                                    <img src="@/assets/imgs/multicoin.webp"/>
                                </figure>
                                <div class="about__partnerbox--label">
                                    <p>Multicoin Capital</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="about__partners">
                        <div class="about__partnerboxes">
                            <div class="about__partnerbox">
                                <figure class="about__partnerbox--fig">
                                    <img src="@/assets/imgs/ribbit.png"/>
                                </figure>
                                <div class="about__partnerbox--label">
                                    <p>Ribbit Capital</p>
                                </div>
                            </div>
                             <div class="about__partnerbox">
                                <figure class="about__partnerbox--fig">
                                    <img src="@/assets/imgs/paradigm.png"/>
                                </figure>
                                <div class="about__partnerbox--label">
                                    <p>Paradigm Capital</p>
                                </div>
                            </div>
                             <div class="about__partnerbox">
                                <figure class="about__partnerbox--fig">
                                    <img src="@/assets/imgs/pc.png"/>
                                </figure>
                                <div class="about__partnerbox--label">
                                    <p>Proof of Capital</p>
                                </div>
                            </div>
                             <div class="about__partnerbox">
                                <figure class="about__partnerbox--fig">
                                    <img src="@/assets/imgs/paxos.webp"/>
                                </figure>
                                <div class="about__partnerbox--label">
                                    <p>Paxos PAX</p>
                                </div>
                            </div>
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

    .about {
        background: #1c1c17;

        &__logo {
            position: absolute;
            top: 0;
            left: 0;
            cursor: pointer;
            display: flex;
            align-items: center;
            padding: #{scaleValue(40)} #{scaleValue(270)};

            @media only screen and (max-width: 414px) {
                padding: #{scaleValue(140)} #{scaleValue(120)};
            }
                
            & figure {
                height: #{scaleValue(40)};
                width: #{scaleValue(40)};
                overflow: hidden;
                border-radius: .3rem;

                @media only screen and (max-width: 414px) {
                     height: #{scaleValue(200)};
                     width: #{scaleValue(200)};
                }

                & img {
                    object-fit: cover;
                    height: 100%;
                    width: 100%;
                }
            }

            &--right {
                font-size: #{scaleValue(18)};
                margin-left: #{scaleValue(10)};

                @media only screen and (max-width: 414px) {
                     font-size: #{scaleValue(80)};
                     margin-left: #{scaleValue(20)};
                }
            }
        }

        &__area {
            padding: #{scaleValue(140)} #{scaleValue(270)};

            @media only screen and (max-width: 414px) {
                padding: #{scaleValue(140)} #{scaleValue(120)};
            }

            & h1 {
                font-weight: 400;
                font-size: #{scaleValue(25)};
                letter-spacing: #{scaleValue(3.5)};
                margin-bottom: #{scaleValue(20)};

                @media only screen and (max-width: 414px) {
                    font-size: #{scaleValue(100)};
                }
            }

            &--summary {
                padding-left: #{scaleValue(500)};
                margin-top: #{scaleValue(150)};
                font-size: #{scaleValue(20)};
                line-height: #{scaleValue(40)};
                font-weight: 200;

                @media only screen and (max-width: 414px) {
                    font-size: #{scaleValue(70)};
                    line-height: #{scaleValue(100)};
                    padding-left: 0;
                }

                & p:nth-child(1) {
                    margin-bottom: #{scaleValue(20)};

                    @media only screen and (max-width: 414px) {
                        margin-bottom: #{scaleValue(100)};
                    }
                }
            }
        }

        &__top {
            background: #1c1c17;
            padding-top: #{scaleValue(270)};

            @media only screen and (max-width: 414px) {
                padding-top: #{scaleValue(600)};

                & h1 {
                    padding-bottom: #{scaleValue(80)}
                }
            }

            &--paras {
                font-size: #{scaleValue(65)};
                line-height: #{scaleValue(90)};
                font-weight: 200;

                @media only screen and (max-width: 414px) {
                    font-size: #{scaleValue(100)};
                    line-height: #{scaleValue(140)};
                    padding-left: 0;
                }

                & span {

                    &.highlight {
                        color: #f5853d;
                    }
                }
            }
        }

        &__midtext {
            background: #ede8df;
            color: #000000;

            &--h2 {
                font-weight: 400;
                font-size: #{scaleValue(25)};
                letter-spacing: #{scaleValue(3.5)};
                margin-bottom: #{scaleValue(20)};

                @media only screen and (max-width: 414px) {
                    font-size: #{scaleValue(100)};
                }
            }

            &--toppara {
                font-size: #{scaleValue(40)};
                font-weight: 500;

                @media only screen and (max-width: 414px) {
                    margin: #{scaleValue(90)} 0;
                    font-size: #{scaleValue(140)};
                }
            }

            &--bottom {
                padding-left: 0;
                margin-top: #{scaleValue(40)};
                display: flex;
                justify-content: space-between;

                @media only screen and (max-width: 414px) {
                    flex-direction: column;
                }

                & p:nth-child(1) {
                    margin-bottom: #{scaleValue(30)};
                }

                & p:nth-child(2) {
                    margin-bottom: #{scaleValue(60)};

                    @media only screen and (max-width: 414px) {
                        margin-bottom: #{scaleValue(150)};
                    }
                }
            }

            &--left {
                width: #{scaleValue(600)};

                @media only screen and (max-width: 414px) {
                    width: 100%;
                    margin-bottom: #{scaleValue(150)};
                }
            }

            &--right {
                display: flex;

                @media only screen and (max-width: 414px) {
                    width: 100%;
                    padding-bottom: #{scaleValue(150)};
                }

                & figure {
                    height: #{scaleValue(400)};
                    width: #{scaleValue(400)};
                    overflow: hidden;
                    border-radius: .3rem;

                    @media only screen and (max-width: 414px) {
                        height: #{scaleValue(1000)};
                        width: 100%;
                    }

                    & img {
                        object-fit: cover;
                        height: 100%;
                        width: 100%;
                    }
                }
            }

            &--btn {
                padding: #{scaleValue(20)} #{scaleValue(25)};
                color: #fff;
                background: #474dff;
                border-radius: 3rem;
                font-size: #{scaleValue(18)};

                @media only screen and (max-width: 414px) {
                  font-size: #{scaleValue(70)};
                  padding: #{scaleValue(70)} #{scaleValue(80)};
                }
            }
        }

        &__partners {
            background: #fff;
            color: #000000;
        }

        &__partnerboxes {
            display: flex;
            justify-content: space-between;
            margin-top: #{scaleValue(60)};

            @media only screen and (max-width: 414px) { 
                flex-direction: column;
            } 
        }

        &__partnerbox {
            position: relative;
            cursor: pointer;

            &:hover > .about__partnerbox--label {
                opacity: .7
            }
            
            & figure {
                height: #{scaleValue(200)};
                width: #{scaleValue(230)};

                @media only screen and (max-width: 414px) { 
                    height: #{scaleValue(900)};
                    width: 100%;
                } 

                & img {
                    object-fit: cover;
                    height: 100%;
                    width: 100%;
                }
            }

            &--label {
                position: absolute;
                transition: all .1s ease-in;
                top: 0;
                left: 0;
                text-align: center;
                height: 100%;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #337ab7;
                color: #fff;
                opacity: 0;
            }
        }
    }
</style>