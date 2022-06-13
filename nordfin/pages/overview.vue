<template>
  <div>
    <Dashboard :title="user ? `${user.firstname} ${user.lastname}` : ''" :openslide="openslide">
        <template v-slot:base>
            <div class="dashboard">
                <div v-if="popuptype">
                    <Popup :label="plabel" :instruction="pinstruction" :popuptype="popuptype" :closePopup="closePopup"/>
                </div>
                <div class="dashboard__top">
                    <div class="dashboard__left dashboard__area">
                        <div class="dashboard__card">
                            <div class="dashboard__cardtop">
                                <figure class="dashboard__cardtop--logo">
                                    <img src='@/assets/images/pink-circle.png'/>
                                </figure>
                                <span class="dashboard__cardtop--accounttype">
                                    {{user ? user.accountPlan : ''}}
                                </span>
                            </div>
                            <div>
                                <div class="dashboard__cardbalance">
                                <p>Total Balance</p>
                                </div>
                                <div class="dashboard__cardmid">
                                    <p>${{user ? truncate(`${user.balance ? user.balance.toLocaleString('en-US') : 0}`) : ''}}</p>
                                    <p></p>
                                </div>
                            </div>
                            <div class="dashboard__cardbottom">
                                <p></p>
                                <p>{{user ? user.accountNumber : ''}}</p>
                            </div>
                        </div>
                    </div>

                    <div class="dashboard__bottomleft">
                        <h2 class="dashboard__bottomleft--h2">{{ transactionForm }}</h2>
                        <div class="dashboard__bottomleft--body">
                            <div class="dashboard__bottomleft--form">
                                <div class="dashboard__bottomleft--formarea">
                                    <input type="text" placeholder="Bank" v-model="bank"/>
                                    <span class="label">Bank</span>
                                </div>
                                <div class="dashboard__bottomleft--formarea">
                                    <input type="text" placeholder="Amount" v-model="amount"/>
                                    <span class="label">Amount</span>
                                </div>
                                <div class="dashboard__bottomleft--formarea">
                                    <input type="text" placeholder="Recepient account number" v-model="recepient"/>
                                    <span class="label">
                                        <p>Recepient account number</p>
                                    </span>
                                </div>
                                <div class="dashboard__bottomleft--networkfee">
                                    <span>
                                        <p>Network fee:</p>
                                    </span>
                                    <span>
                                        <p>${{`${networkfee}`}}</p>
                                    </span>
                                </div>
                                <div class="dashboard__bottomleft--formbottom">
                                    <div class="dashboard__bottomleft--formtotal">
                                        <span>Total amount</span>
                                        <span>${{total}}</span>
                                    </div>
                                    <div class="dashboard__bottomleft--formbtn">
                                        <span class="" @click="withdraw">Withdraw Money</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                </div>

                <div class="dashboard__right">
                    
                <div>

                <div>
                    <h2 class="dashboard__bottomleft--h2">User Activity</h2>
                    <div class="dashboard__bottomright--graph" id="chart">
                        <Component :is="apexchart" type="candlestick" height="280" :options="chartOptions" :series="series"></Component>
                    </div>
                </div>
    </div>

    <div class="dashboard__bottomright">
        <div class="dashboard__bottomright--exchange">
            <h2 class="dashboard__bottomleft--h2">Top Exchange Rates</h2>
        <!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <div class="tradingview-widget-container__widget"></div>
  <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/markets/currencies/forex-cross-rates/" rel="noopener" target="_blank"><span class="blue-text">Exchange Rates</span></a> by TradingView</div>
  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js" async>
  {
  "width": 770,
  "height": 400,
  "currencies": [
    "EUR",
    "USD",
    "JPY",
    "GBP",
    "CHF",
    "AUD",
    "CAD",
    "NZD",
    "CNY"
  ],
  "isTransparent": false,
  "colorTheme": "dark",
  "locale": "en"
}
  </script>
</div>
<!-- TradingView Widget END -->
        </div>
    </div>
                </div>
            </div>
        </template>
    </Dashboard>
  </div>
</template>

<script>
import userMixin from '@/mixins/user.js'

import { isBrowser } from "browser-or-node";

export default {
    data() {
        return {
            transactionForm: 'Withdraw',
            bank: null,
            amount: null,
            recepient: null,
            series: [{
            data: [{
                x: new Date(1538778600000),
                y: [6629.81, 6650.5, 6623.04, 6633.33]
              },
              {
                x: new Date(1538780400000),
                y: [6632.01, 6643.59, 6620, 6630.11]
              },
              {
                x: new Date(1538782200000),
                y: [6630.71, 6648.95, 6623.34, 6635.65]
              },
              {
                x: new Date(1538784000000),
                y: [6635.65, 6651, 6629.67, 6638.24]
              },
              {
                x: new Date(1538785800000),
                y: [6638.24, 6640, 6620, 6624.47]
              },
              {
                x: new Date(1538787600000),
                y: [6624.53, 6636.03, 6621.68, 6624.31]
              },
              {
                x: new Date(1538789400000),
                y: [6624.61, 6632.2, 6617, 6626.02]
              },
              {
                x: new Date(1538791200000),
                y: [6627, 6627.62, 6584.22, 6603.02]
              },
              {
                x: new Date(1538793000000),
                y: [6605, 6608.03, 6598.95, 6604.01]
              },
              {
                x: new Date(1538794800000),
                y: [6604.5, 6614.4, 6602.26, 6608.02]
              },
              {
                x: new Date(1538796600000),
                y: [6608.02, 6610.68, 6601.99, 6608.91]
              },
              {
                x: new Date(1538798400000),
                y: [6608.91, 6618.99, 6608.01, 6612]
              },
              {
                x: new Date(1538800200000),
                y: [6612, 6615.13, 6605.09, 6612]
              },
              {
                x: new Date(1538802000000),
                y: [6612, 6624.12, 6608.43, 6622.95]
              },
              {
                x: new Date(1538803800000),
                y: [6623.91, 6623.91, 6615, 6615.67]
              },
              {
                x: new Date(1538805600000),
                y: [6618.69, 6618.74, 6610, 6610.4]
              },
              {
                x: new Date(1538807400000),
                y: [6611, 6622.78, 6610.4, 6614.9]
              },
              {
                x: new Date(1538809200000),
                y: [6614.9, 6626.2, 6613.33, 6623.45]
              },
              {
                x: new Date(1538811000000),
                y: [6623.48, 6627, 6618.38, 6620.35]
              },
              {
                x: new Date(1538812800000),
                y: [6619.43, 6620.35, 6610.05, 6615.53]
              },
              {
                x: new Date(1538814600000),
                y: [6615.53, 6617.93, 6610, 6615.19]
              },
              {
                x: new Date(1538816400000),
                y: [6615.19, 6621.6, 6608.2, 6620]
              },
              {
                x: new Date(1538818200000),
                y: [6619.54, 6625.17, 6614.15, 6620]
              },
              {
                x: new Date(1538820000000),
                y: [6620.33, 6634.15, 6617.24, 6624.61]
              },
              {
                x: new Date(1538821800000),
                y: [6625.95, 6626, 6611.66, 6617.58]
              },
              {
                x: new Date(1538823600000),
                y: [6619, 6625.97, 6595.27, 6598.86]
              },
              {
                x: new Date(1538825400000),
                y: [6598.86, 6598.88, 6570, 6587.16]
              },
              {
                x: new Date(1538827200000),
                y: [6588.86, 6600, 6580, 6593.4]
              },
              {
                x: new Date(1538829000000),
                y: [6593.99, 6598.89, 6585, 6587.81]
              },
              {
                x: new Date(1538830800000),
                y: [6587.81, 6592.73, 6567.14, 6578]
              },
              {
                x: new Date(1538832600000),
                y: [6578.35, 6581.72, 6567.39, 6579]
              },
              {
                x: new Date(1538834400000),
                y: [6579.38, 6580.92, 6566.77, 6575.96]
              },
              {
                x: new Date(1538836200000),
                y: [6575.96, 6589, 6571.77, 6588.92]
              },
              {
                x: new Date(1538838000000),
                y: [6588.92, 6594, 6577.55, 6589.22]
              },
              {
                x: new Date(1538839800000),
                y: [6589.3, 6598.89, 6589.1, 6596.08]
              },
              {
                x: new Date(1538841600000),
                y: [6597.5, 6600, 6588.39, 6596.25]
              },
              {
                x: new Date(1538843400000),
                y: [6598.03, 6600, 6588.73, 6595.97]
              },
              {
                x: new Date(1538845200000),
                y: [6595.97, 6602.01, 6588.17, 6602]
              },
              {
                x: new Date(1538847000000),
                y: [6602, 6607, 6596.51, 6599.95]
              },
              {
                x: new Date(1538848800000),
                y: [6600.63, 6601.21, 6590.39, 6591.02]
              },
              {
                x: new Date(1538850600000),
                y: [6591.02, 6603.08, 6591, 6591]
              },
              {
                x: new Date(1538852400000),
                y: [6591, 6601.32, 6585, 6592]
              },
              {
                x: new Date(1538854200000),
                y: [6593.13, 6596.01, 6590, 6593.34]
              },
              {
                x: new Date(1538856000000),
                y: [6593.34, 6604.76, 6582.63, 6593.86]
              },
              {
                x: new Date(1538857800000),
                y: [6593.86, 6604.28, 6586.57, 6600.01]
              },
              {
                x: new Date(1538859600000),
                y: [6601.81, 6603.21, 6592.78, 6596.25]
              },
              {
                x: new Date(1538861400000),
                y: [6596.25, 6604.2, 6590, 6602.99]
              },
              {
                x: new Date(1538863200000),
                y: [6602.99, 6606, 6584.99, 6587.81]
              },
              {
                x: new Date(1538865000000),
                y: [6587.81, 6595, 6583.27, 6591.96]
              },
              {
                x: new Date(1538866800000),
                y: [6591.97, 6596.07, 6585, 6588.39]
              },
              {
                x: new Date(1538868600000),
                y: [6587.6, 6598.21, 6587.6, 6594.27]
              },
              {
                x: new Date(1538870400000),
                y: [6596.44, 6601, 6590, 6596.55]
              },
              {
                x: new Date(1538872200000),
                y: [6598.91, 6605, 6596.61, 6600.02]
              },
              {
                x: new Date(1538874000000),
                y: [6600.55, 6605, 6589.14, 6593.01]
              },
              {
                x: new Date(1538875800000),
                y: [6593.15, 6605, 6592, 6603.06]
              },
              {
                x: new Date(1538877600000),
                y: [6603.07, 6604.5, 6599.09, 6603.89]
              },
              {
                x: new Date(1538879400000),
                y: [6604.44, 6604.44, 6600, 6603.5]
              },
              {
                x: new Date(1538881200000),
                y: [6603.5, 6603.99, 6597.5, 6603.86]
              },
              {
                x: new Date(1538883000000),
                y: [6603.85, 6605, 6600, 6604.07]
              },
              {
                x: new Date(1538884800000),
                y: [6604.98, 6606, 6604.07, 6606]
              },
            ]
          }],
          chartOptions: {
            chart: {
              type: 'candlestick',
              height: 300
            },
            title: {},
            xaxis: {
              type: 'datetime'
            },
            yaxis: {
              tooltip: {
                enabled: true
              }
            }
          }
            }
    },
    methods: {
        withdraw () {
            const { bank, amount, recepient } = this;

            if (bank !== null && amount !== null && recepient !== null) {
                this.requestSomething({
                    bank,
                    amount,
                    recepient
                });

                this.bank = null;
                this.amount = null;
                this.recepient = null;
            }
         },
         truncate(input) {
            if (input.length > 10) {
                return input.substring(0, 10) + '...';
            }
            return input;
        },
    },
    mixins: [userMixin],
    computed: {
        networkfee() {
            return 10;
        },
        total() {
            return this.amount === null ? 0 : parseFloat(this.amount) + this.networkfee; 
        },
        apexchart() {
            if (isBrowser) {
                return () =>
                import('vue-apexcharts');
            } else {
                return 'hjhjhj'
            }
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

    .dashboard {
        display: flex;
        justify-content: space-between;
        width: #{scaleValue(5000)};
        height: #{scaleValue(800)};

        &__top {
            display: flex;
            flex-direction: column;
            flex-basis: #{scaleValue(390)};
        }

        &__area {
            flex-shrink: 0;
        }

        &__left {
            margin-right: #{scaleValue(70)};
            margin-bottom: #{scaleValue(50)};
        }

        &__right {
            flex-basis: #{scaleValue(800)};
            margin-left: #{scaleValue(40)}
        }


        &__card {
            position: relative;
            display: flex;
            flex-direction: column;
            padding: #{scaleValue(25)} #{scaleValue(30)};
            border-radius: .9rem;
            height: #{scaleValue(230)};
            justify-content: space-between;
            color: #fff;

            &:nth-child(1) {
                background: #1d1d1d url('@/assets/images/newsblue.png');
            }

            &:before {
                content: '';
                position: absolute;
                top: #{scaleValue(23)};
                left: #{scaleValue(30)};
                background: linear-gradient(to right bottom,rgba(63,0,255,.4),rgba(255,77,0, 1));
                height: 80%;
                width: 100%;
                border-radius: .9rem;
                z-index: -1;
            }

            &:after {
                content: '';
                position: absolute;
                top: #{scaleValue(13)};
                left: #{scaleValue(16)};
                background: linear-gradient(to right bottom,rgba(203,255,0,1),rgba(204,0,255, .5));
                height: 90%;
                width: 100%;
                border-radius: .9rem;
                z-index: -1;
            }
        }

        &__cardtop {
            display: flex;
            justify-content: space-between;
            align-items: center;

            & figure {
                width: #{scaleValue(50)};
                height: #{scaleValue(50)};

                & img {
                    height: 100%;
                    width: 100%;
                }
            }

            & span {
                display: inline-block;
                border-radius: .3rem;
                padding: #{scaleValue(10)};
                border: 1px solid rgba(255, 255, 255, .7);
                font-size: #{scaleValue(15)};
            }
        }

        &__cardbalance {
            display: flex;
            justify-content: space-between;

            & p {
                font-size: #{scaleValue(13)};
                font-weight: 500;
                opacity: .6;
            }
        }

        &__cardmid {
            display: flex;
            justify-content: space-between;

            & p {
                font-size: #{scaleValue(35)};
                font-weight: 700;

                &:nth-child(1) {
                    
                }
            }
        }

        &__cardbottom {
            display: flex;
            justify-content: space-between;

            & p {
                font-size: #{scaleValue(14)};
                font-weight: 500;
                opacity: .7;
            }
        }

        &__bottom {
            display: flex;
        }

        &__bottomleft {
            flex-shrink: 0;
            flex-basis: #{scaleValue(390)};

            &--h2 {
                text-transform: capitalize;
                font-weight: 500;
                font-size: #{scaleValue(26)};

                margin-bottom: #{scaleValue(20)};
            }

            &--body {
                padding: #{scaleValue(20)};
                border-radius: .5rem;
                color: #000000;
                background: #fff;
            }

            &--form {
                display: flex;
                flex-direction: column;
            }

            &--formarea {
                display: flex;
                flex-direction: column;
                margin-bottom: #{scaleValue(20)};
                position: relative;
                height: #{scaleValue(49)};
                width: #{scaleValue(430)};
                padding: 0 #{scaleValue(10)};
                border: 1px solid rgba(#474DFF, .8);
                background: transparent;
                border-radius: 4px;
                margin-top: #{scaleValue(10)};

                &.networkfee {
                    border: none;
                    padding: 0;
                }

                & input {
                    position: relative;
                    z-index: 2;
                    outline: none;
                    height: 100%;
                    width: 100%;
                    background: transparent;
                    color: #000000;
                    border: none;
                    font-size: #{scaleValue(15)};
                    transition: all .3s ease-in;

                    padding-top: #{scaleValue(14)};

                    &::placeholder {
                        opacity: 0;
                    }

                    &:placeholder-shown {
                        padding-top: 0;

                        & ~ span.label {
                            position: absolute;
                            padding: 0 #{scaleValue(10)};
                            left: 0;
                            z-index: 1;
                            height: 100%;
                            width: 100%;
                            display: flex;
                            align-items: center;
                            color: rgba(0, 0, 0, .4);
                            transition: all .3s ease-in;
                            font-size: #{scaleValue(14)};
                            transform: translateY(#{scaleValue(0)});
                        }
                    }


                    &:focus {
                        padding-top: #{scaleValue(14)};

                        & ~ span.label {
                            font-size: #{scaleValue(12)};
                            transform: translateY(#{scaleValue(-10)});
                            color: rgba(#474DFF, .8);
                        }
                    }

                    & ~ span.label {
                            font-size: #{scaleValue(12)};
                            transform: translateY(#{scaleValue(-10)});
                            color: rgba(#474DFF, .8);
                    }
                }

                & span {

                    &.label {
                        position: absolute;
                        padding: 0 #{scaleValue(10)};
                        left: 0;
                        z-index: 1;
                        height: 100%;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        color: rgba(0, 0, 0, .4);
                        transition: all .3s ease-in;
                        font-size: #{scaleValue(14)};
                        transform: translateY(#{scaleValue(-10)});
                    }
                }
            }

            &--networkfee {
                display: flex;
                align-items: center;
                font-size:  #{scaleValue(15)};
                padding-bottom: #{scaleValue(20)};

                & span {

                    &:nth-child(1) {
                        margin-right:  #{scaleValue(10)};
                    }
                }
            }

            &--formbottom {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            &--formtotal {
                display: flex;
                flex-direction: column;

                & span {

                    &:nth-child(1) {
                        color: rgba(0,0,0, .3);
                        font-size: #{scaleValue(15)};
                        padding-bottom: #{scaleValue(5)};
                    }

                    &:nth-child(2) {
                        font-weight: 700;
                        color: rgba(#474DFF, .9);
                        font-size: #{scaleValue(20)};
                    }
                }
            }

            &--formbtn {
                
                & span {
                    background: #474DFF;
                    padding: #{scaleValue(15)} #{scaleValue(20)};
                    border-radius: .5rem;
                    cursor: pointer;
                    font-size: #{scaleValue(15)};
                    color: #fff;
                }
            }
        }

        &__bottomright {
            position: relative;
            display: flex;
            background: #000000;
            overflow: hidden;
            flex-basis: #{scaleValue(800)};
            padding: #{scaleValue(25)} 0;
            border-radius: .9rem;

            &--graph {
                width: #{scaleValue(740)};
                height: #{scaleValue(280)};
                color: #000000 !important;
            }

            &--exchange {
                display: flex;
                flex-direction: column;
                flex-basis: #{scaleValue(800)};
            }

            &:after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                height: 12%;
                width: 100%;
                border-radius: .9rem;
                background: #000000;
            }
        }

        &__notifications {
            background: #fff;
            webkit-box-shadow: 0px 0px 27px 0px rgba(#474DFF, .3);
            -moz-box-shadow:    0px 0px 27px 0px rgba(#474DFF, .3);
            box-shadow:         0px 0px 27px 0px rgba(#474DFF, .3); 
            margin-left: #{scaleValue(25)};
            border-radius: .4rem;     
        }

        &__notification {
            border-bottom: solid 1px rgba(0, 0, 0, .4);
            padding: #{scaleValue(25)};

            & p {

                &:nth-child(1) {
                    font-size: #{scaleValue(17)};
                    font-weight: 500;
                    margin-bottom: #{scaleValue(10)};
                }

                &:nth-child(2) {
                    font-size: #{scaleValue(13)};
                    color: rgba(0, 0, 0, .3);
                    font-weight: 500;
                }
            }
        }
    }
    
</style>
