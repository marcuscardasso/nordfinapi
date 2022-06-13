<template>
    <div>
        <div class="about">
            <div class="about__nav--mobilebtn" @click="togglemenu">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <header class="about__nav" :class="menuopen ? 'open' : ''" @click="togglemenu">
                <a href="#mission" class="about__nav--link"><div class="about__nav--item">our mission</div></a>
                <a href="#team" class="about__nav--link"><div class="about__nav--item">the team</div></a>
                <a href="#partners" class="about__nav--link"><div class="about__nav--item">partners</div></a>
                <a href="#contact" class="about__nav--link"><div class="about__nav--item">get in touch</div></a>
                <div class="about__nav--item" @click="moveToRoute('/')">SwissNordic</div>
            </header>
            <div class="about__container">
                <div class="about__section" id="mission">
                    <div class="about__section--header">
                        <h1 class="about__section--h1">our mission</h1>
                        <span></span>
                    </div>
                    <div class="about__section--text">
                        SwissNordic is a decentralized exchange built by traders, for traders. SwissNordic 
                        offers solutions to improve your chances for success in trades and investments. Our expert team of traders and market
                        analysts are always on deck to help users trade and invest in the safest, most informative and profitable ways possible
                    </div>
                </div>
                <div class="about__section" id="team">
                    <div class="about__section--header">
                        <h1 class="about__section--h1">experienced team</h1>
                        <span></span>
                    </div>
                    <div class="about__section--text">
                        We come from leading Wall Street quant firms and tech companies - Jane Street, Optiver, Susquehanna, Facebook, and Google.
                    </div>
                    <div class="about__section--people">
                        <div class="about__peoplecards">
                            <div class="about__card">
                                <figure class="about__card--cardfig">
                                    <img src="@/assets/imgs/markfriedman.jpeg"/>
                                </figure>
                                <div class="about__card--cardheader">
                                    <h2>Mark Friedman</h2>
                                    <h3>CEO and Founder</h3>
                                </div>
                                <div class="about__card--cardtext">
                                    <p>Before founding SwissNordic, Mark was a trader on Jane Street Capital’s international ETF desk. He traded a variety of ETFs, futures, currencies, and equities, and was part of the team that designed their automated OTC trading system.</p>
                                </div>
                            </div>
                            <div class="about__card">
                                <figure class="about__card--cardfig">
                                    <img src="@/assets/imgs/Andrewfitzgerald.jpeg"/>
                                </figure>
                                <div class="about__card--cardheader">
                                    <h2>Andrew Fitzgerald</h2>
                                    <h3>CTO and Founder</h3>
                                </div>
                                <div class="about__card--cardtext">
                                    <p>Before founding SwissNordic, Mark was a trader on Jane Street Capital’s international ETF desk. He traded a variety of ETFs, futures, currencies, and equities, and was part of the team that designed their automated OTC trading system.</p>
                                </div>
                            </div>
                            <div class="about__card">
                                <figure class="about__card--cardfig">
                                    <img src="@/assets/imgs/Po-Shenwen.jpeg"/>
                                </figure>
                                <div class="about__card--cardheader">
                                    <h2>Po-Shen Wen</h2>
                                    <h3>Head of Engineering</h3>
                                </div>
                                <div class="about__card--cardtext">
                                    <p>Before founding SwissNordic, Mark was a trader on Jane Street Capital’s international ETF desk. He traded a variety of ETFs, futures, currencies, and equities, and was part of the team that designed their automated OTC trading system.</p>
                                </div>
                            </div>
                        </div>
                         <div class="about__peoplecards">
                            <div class="about__card">
                                <figure class="about__card--cardfig">
                                    <img src="@/assets/imgs/michealscottskin.jpeg"/>
                                </figure>
                                <div class="about__card--cardheader">
                                    <h2>Micheal Scottskin</h2>
                                    <h3>Regulatory Officer</h3>
                                </div>
                                <div class="about__card--cardtext">
                                    <p>Before founding SwissNordic, Mark was a trader on Jane Street Capital’s international ETF desk. He traded a variety of ETFs, futures, currencies, and equities, and was part of the team that designed their automated OTC trading system.</p>
                                </div>
                            </div>
                            <div class="about__card">
                                <figure class="about__card--cardfig">
                                    <img src="@/assets/imgs/daemon.jpeg"/>
                                </figure>
                                <div class="about__card--cardheader">
                                    <h2>Daemon</h2>
                                    <h3>Head of Trading</h3>
                                </div>
                                <div class="about__card--cardtext">
                                    <p>Before founding SwissNordic, Mark was a trader on Jane Street Capital’s international ETF desk. He traded a variety of ETFs, futures, currencies, and equities, and was part of the team that designed their automated OTC trading system.</p>
                                </div>
                            </div>
                            <div class="about__card">
                                <figure class="about__card--cardfig">
                                    <img src="@/assets/imgs/arielCronin.jpeg"/>
                                </figure>
                                <div class="about__card--cardheader">
                                    <h2>Ariel Cronin</h2>
                                    <h3>COO</h3>
                                </div>
                                <div class="about__card--cardtext">
                                    <p>Before founding SwissNordic, Mark was a trader on Jane Street Capital’s international ETF desk. He traded a variety of ETFs, futures, currencies, and equities, and was part of the team that designed their automated OTC trading system.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="about__section about__section--partners" id="partners">
                    <div class="about__section--header">
                        <h1 class="about__section--h1">our partners</h1>
                        <span></span>
                    </div>
                    <div class="about__section--text">
                        SwissNordic is proud to have partnered and collaborated with many leading cryptocurrency firms, including but not limited to:
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
                <div class="about__section about__section--partners" id="contact">
                    <div class="about__section--header">
                        <h1 class="about__section--h1">get in touch</h1>
                        <span></span>
                    </div>
                    <div class="about__section--text about__section--textcontact">
                        <p>Want to get in touch with us? Feel free to send us an email:</p>
                        <span>contact@swissNordic.com</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                menuopen: false
            }
        },
        methods: {
            openlink(link) {
                window.open(link, '_blank');
            },
            togglemenu() {
                this.menuopen ? this.menuopen = false : this.menuopen = true;
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

    .about {
        color: #949494;
        background: #e8ecf1;

        &__nav {
            display: flex;
            align-items: center;
            text-transform: uppercase;
            font-weight: 400;
            -webkit-box-shadow: 0 0 7px 0 rgba(0, 0, 0, .09);
            -moz-box-shadow: 0 0 7px 0 rgba(0, 0, 0, .09);
            -ms-box-shadow: 0 0 7px 0 rgba(0, 0, 0, .09);
            box-shadow: 0 0 7px 0 rgba(0, 0, 0, .09);
            height: #{scaleValue(75)};
            font-size: #{scaleValue(14)};
            background: #fff;

            padding-left: #{scaleValue(250)};

            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 99999;

            @media only screen and (max-width: 414px) {
                height: 100vh;
                width: 266px;
                flex-direction: column;
                align-items: flex-start;
                font-size: #{scaleValue(70)};
                font-weight: 300;
                line-height: #{scaleValue(170)};
                background: #333;
                color: #fff;
                text-transform: capitalize;
                padding: #{scaleValue(250)} #{scaleValue(250)};
                transition: all .1s ease;
                transform: translateX(#{scaleValue(-2000)});

                &:before {
                    content: '';
                    background: #333;
                    opacity: .3;
                    position: absolute;
                    top: 0;
                    right: #{scaleValue(-570)};
                    height: 100%;
                    width: #{scaleValue(570)}
                }

                &.open {
                    transform: translateX(0);
                }
            }

            &--item {
                color: rgb(204, 204, 204);
                padding-right: #{scaleValue(50)};
                cursor: pointer;

                &.current {
                    color: #000;
                }
            }

            &--link {
                text-decoration: none;
            }

            &--mobilebtn {
                display: none;

                @media only screen and (max-width: 414px) { 
                    position: fixed;
                    left: 20px;
                    top: 20px;
                    display: flex;
                    flex-direction: column;
                    background: rgb(204, 204, 204);
                    height: #{scaleValue(200)};
                    width: #{scaleValue(230)};
                    z-index: 8000;
                    border-radius: 3px;
                    justify-content: space-between;
                    align-items: center;
                    padding: #{scaleValue(40)} 0;

                    & span {
                        display: inline-block;
                        height: #{scaleValue(15)};
                        width: #{scaleValue(150)};
                        background: #fff;
                        border-radius: 3px;
                    }
                } 
            }
        }

        &__container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-top: #{scaleValue(160)};
        }

        &__section {
            text-align: center;
            margin-bottom: #{scaleValue(180)};
            display: flex;
            flex-direction: column;
            align-items: center;

            &--header {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: #{scaleValue(20)};

                @media only screen and (max-width: 414px) { 
                    margin-bottom: #{scaleValue(100)};   
                } 

                & span {
                    display: inline-block;
                    background: #949494;  
                    opacity: .3; 
                    height: 2px;
                    width: #{scaleValue(50)};     

                    @media only screen and (max-width: 414px) { 
                        height: 1.5px;
                        width: #{scaleValue(200)};     
                    }     
                }
            }

            &--h1 {
                position: relative;
                color: #4d4d4d;
                font-weight: 500;
                text-transform: uppercase;
                font-size: #{scaleValue(14)};
                letter-spacing: #{scaleValue(2)};
                width: fit-content;
                text-align: center;
                margin-bottom: #{scaleValue(16)};

                @media only screen and (max-width: 414px) { 
                    font-size: #{scaleValue(60)};
                    font-weight: 500;
                    margin-bottom: #{scaleValue(50)}; 
                } 
            }

            &--text {
                line-height: #{scaleValue(30)};
                font-size: #{scaleValue(17)};
                font-weight: 500;
                padding: 0 #{scaleValue(400)};

                @media only screen and (max-width: 414px) { 
                    font-size: #{scaleValue(60)};
                    line-height: #{scaleValue(90)};
                    font-weight: 300;
                    padding: 0 #{scaleValue(80)};
                }
            }

            &--partners {
                background: #fff;
                padding: #{scaleValue(60)} 0;
                margin-bottom: 0;
            }

            &--textcontact {

                & span {
                    color: rgb(254, 176, 25);
                    cursor: pointer;
                }
            }
        }

        &__peoplecards {
            display: flex;
            width: #{scaleValue(1200)}; 
            justify-content: space-between;
            margin-top: #{scaleValue(60)};

            @media only screen and (max-width: 414px) { 
                flex-direction: column;
            } 
        }

        &__card {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: #{scaleValue(620)};
            width: #{scaleValue(360)}; 
            padding: #{scaleValue(30)};
            border-radius: 5px;
            background: #fff;

            @media only screen and (max-width: 414px) { 
                height: #{scaleValue(1900)};
                margin-bottom: #{scaleValue(100)};
                width: 100%;
                padding: #{scaleValue(120)};
            } 

            &--cardheader {
                margin-top: #{scaleValue(30)};
                margin-bottom: #{scaleValue(30)};
                line-height: #{scaleValue(30)};

                @media only screen and (max-width: 414px) { 
                    line-height: #{scaleValue(80)};
                    margin-top: #{scaleValue(100)};
                    margin-bottom: #{scaleValue(100)};
                }

                & h2 {
                    color: #000000;
                    font-weight: 500;
                    font-size: #{scaleValue(22)};

                    @media only screen and (max-width: 414px) { 
                        font-size: #{scaleValue(75)};
                    } 
                }

                & h3 {
                    color: #999;
                    font-weight: 500;
                    font-size: #{scaleValue(16)};

                    @media only screen and (max-width: 414px) { 
                        font-size: #{scaleValue(50)};
                    } 
                }
            }

            &--cardfig {
                height: #{scaleValue(200)};
                width: #{scaleValue(200)};
                border-radius: 100%;

                @media only screen and (max-width: 414px) { 
                    height: #{scaleValue(600)};
                    width: #{scaleValue(600)};
                } 

                & img {
                    object-fit: cover;
                    height: 100%;
                    width: 100%;
                    border-radius: 100%;
                }
            }

            &--cardtext {
                font-size: #{scaleValue(18)};
                font-weight: 300;
                line-height: #{scaleValue(32)};

                @media only screen and (max-width: 414px) { 
                    font-size: #{scaleValue(55)};
                    line-height: #{scaleValue(90)};
                }
            }
        }

        &__partners {
            
        }

        &__partnerboxes {
            display: flex;
            width: #{scaleValue(1200)}; 
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