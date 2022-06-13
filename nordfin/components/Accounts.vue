<template>
  <div class="accounts" id="accounts">
    <div class="accounts__headers">
        <h2 class="accounts__headers--h2">Accounts</h2>
        <h2 class="accounts__headers--sub">Pick an account and get started with and join the financial frontier</h2>
        <div class="accounts__section">
            <div class="accounts__sectioncard copper">
                <h4>Copper</h4>
                <p>A high-performance decentralized peer-to-peer multi-currency exchange built directly into the blockchain</p>
            </div>
            <div class="accounts__sectioncard silver">
                <h4>Silver</h4>
                <p>A high-performance decentralized peer-to-peer multi-currency exchange built directly into the blockchain</p>
            </div>
            <div class="accounts__sectioncard gold">
                <h4>Gold</h4>
                <p>A high-performance decentralized peer-to-peer multi-currency exchange built directly into the blockchain</p>
            </div>
        </div>
        <div class="accounts__section">
            <div class="accounts__sectioncard basic">
                <h4>Basic</h4>
                <p>A high-performance decentralized peer-to-peer multi-currency exchange built directly into the blockchain</p>
            </div>
            <div class="accounts__sectioncard diamond">
                <h4>Diamond</h4>
                <p>A high-performance decentralized peer-to-peer multi-currency exchange built directly into the blockchain</p>
            </div>
            <div class="accounts__sectioncard platinum">
                <h4>Platinum</h4>
                <p>A high-performance decentralized peer-to-peer multi-currency exchange built directly into the blockchain</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
@function scaleValue($value) {
    @return calc(
      #{$value} * (clamp(350px, 100vw, 3840px) / var(--ideal-viewport-width))
    );
}
    .accounts {
        background: #0d0d0d;
        padding: #{scaleValue(100)} #{scaleValue(180)};
        padding-bottom: #{scaleValue(30)};
        background: #000000;

        @media only screen and (max-width: 414px) { 
            padding: #{scaleValue(300)} #{scaleValue(180)};
            padding-bottom: 0;
        }

        &__headers {

            &--h2 {
                font-size: #{scaleValue(30)};
                font-weight: 500;
                margin-bottom: #{scaleValue(25)};

                @media only screen and (max-width: 414px) { 
                    font-size: #{scaleValue(150)};
                    margin-bottom: #{scaleValue(60)};
                }
            }

            &--sub {
                font-size: #{scaleValue(35)};
                line-height: #{scaleValue(55)};
                font-weight: 500;

                @media only screen and (max-width: 414px) { 
                    font-size: #{scaleValue(110)};
                    line-height: #{scaleValue(180)};
                    margin-bottom: #{scaleValue(120)};
                }
            }
        }

        &__section {
            display: flex;
            justify-content: space-between;

            @media only screen and (max-width: 414px) {
                flex-direction: column;
            }
        }

        &__sectioncard {
            margin-top: #{scaleValue(40)};
            flex-basis: #{scaleValue(290)};
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: #{scaleValue(24)};
            padding-top: #{scaleValue(50)};
            position: relative;
            cursor: pointer;
            //comment here

            @media only screen and (max-width: 414px) {
                margin-bottom: #{scaleValue(230)};
                padding: #{scaleValue(80)};
                padding-top: #{scaleValue(200)};
            }

            &:before {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: #{scaleValue(15)};
                background: green;
                z-index: 1;
            }

            &.basic {
                webkit-box-shadow: 0px 0px 27px 0px rgba(169, 50, 38, .4);
                -moz-box-shadow:    0px 0px 27px 0px rgba(169, 50, 38, .4);
                box-shadow:         0px 0px 27px 0px rgba(169, 50, 38, .4);

                &:before {
                    background: rgba(169, 50, 38, .7);
                }
            }

            &.silver {
                webkit-box-shadow: 0px 0px 27px 0px rgba(46, 204, 113, .4);
                -moz-box-shadow:    0px 0px 27px 0px rgba(46, 204, 113, .4);
                box-shadow:         0px 0px 27px 0px rgba(46, 204, 113, .4);
                
                &:before {
                    background: rgba(46, 204, 113, .7)
                }
            }

            &.gold {
                webkit-box-shadow: 0px 0px 27px 0px rgba(69, 179, 157, .4);
                -moz-box-shadow:    0px 0px 27px 0px rgba(69, 179, 157, .4);
                box-shadow:         0px 0px 27px 0px rgba(69, 179, 157, .4);
                
                &:before {
                    background: rgba(69, 179, 157, .7);
                }
            }

            &.copper {
                webkit-box-shadow: 0px 0px 27px 0px rgba(69, 179, 157, .4);
                -moz-box-shadow:    0px 0px 27px 0px rgba(69, 179, 157, .4);
                box-shadow:         0px 0px 27px 0px rgba(69, 179, 157, .4);

                &:before {
                    background: rgba(69, 179, 157, .7)
                }
            }

            &.diamond {
                webkit-box-shadow: 0px 0px 27px 0px rgba(250, 128, 114, .4);
                -moz-box-shadow:    0px 0px 27px 0px rgba(250, 128, 114, .4);
                box-shadow:         0px 0px 27px 0px rgba(250, 128, 114, .4);
                
                &:before {
                    background: rgba(250, 128, 114, .7)
                }
            }

            &.platinum {
                webkit-box-shadow: 0px 0px 27px 0px rgba(230, 126, 34, .4);
                -moz-box-shadow:    0px 0px 27px 0px rgba(230, 126, 34, .4);
                box-shadow:         0px 0px 27px 0px rgba(230, 126, 34, .4);
                
                &:before {
                    background: rgba(230, 126, 34, .7)
                }
            }

             & h4 {
                position: relative;
                opacity: .8;
                font-size: #{scaleValue(21)};
                font-weight: 700;
                margin-bottom: #{scaleValue(21)};
                z-index: 2;

                @media only screen and (max-width: 414px) { 
                 font-size: #{scaleValue(100)};
                 margin-bottom: #{scaleValue(60)};
                }               
             }

             & p {
                position: relative;
                opacity: .8;
                font-size: #{scaleValue(17)};
                line-height: #{scaleValue(25)};
                z-index: 2;

                @media only screen and (max-width: 414px) { 
                    font-size: #{scaleValue(80)};
                     line-height: #{scaleValue(120)};
                }
             }
        }
    }
</style>
