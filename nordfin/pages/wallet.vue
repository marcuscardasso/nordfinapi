<template>
  <div>
    <Dashboard :title="user ? `${user.firstname} ${user.lastname}` : ''" :openslide="openslide">
        <template v-slot:base>
            <div class="wallet">
                <div class="wallet__left">
                    <h2 class="wallet__left--h2">Wallet</h2>
                    <div class="wallet__left--balance">
                        <p class="balancelabel">Your balance:</p>
                        <p class="balance">${{user ? truncate(`${user.balance ? user.balance.toLocaleString('en-US') : 0}`) : ''}}</p>
                        <p class="balancecards">2 Cards</p>
                        <div class="wallet__left--details" @click="$router.push('/overview')">
                            <span>Details</span>
                            <span class="svg">
                                <svg>
                                    <use xlink:href="@/assets/imgs/sprite.svg#icon-box" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div class="wallet__cards">
                        <h2 class="wallet__left--h2">Cards</h2>
                        <div class="wallet__cardsarea">
                            <div class="wallet__card">
                                <div class="wallet__card--area wallet__cardtop">
                                    <span class="shopping">Credit card</span>
                                    <span class="chip">
                                        <img src="@/assets/images/cardchip.png"/>
                                    </span>
                                </div>
                                <div class="wallet__card--area wallet__cardmid">
                                    <span class="name">
                                        {{user ? user.firstname : ''}}
                                    </span>
                                    <span>
                                        **** **** 2060
                                    </span>
                                </div>
                                <div class="wallet__card--area wallet__cardbottom">
                                    <span>
                                        Exp 08/25
                                    </span>
                                    <span class="visa">
                                        <img src="@/assets/images/visa.png"/>
                                    </span>
                                </div>
                            </div>
                            <div class="wallet__card">
                                <div class="wallet__card--area wallet__cardtop">
                                    <span class="shopping">Debit card</span>
                                    <span class="chip">
                                        <img src="@/assets/images/cardchip.png"/>
                                    </span>
                                </div>
                                <div class="wallet__card--area wallet__cardmid">
                                    <span class="name">
                                        {{user ? user.firstname : ''}}
                                    </span>
                                    <span>
                                        **** **** 7045
                                    </span>
                                </div>
                                <div class="wallet__card--area wallet__cardbottom">
                                    <span>
                                        Exp 08/25
                                    </span>
                                    <span class="visa">
                                        <img src="@/assets/images/visa.png"/>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="wallet__figures">
                        <div class="wallet__figure">
                            <div class="wallet__figure--icon earning">
                                <span class="svg">
                                    <svg>
                                        <use xlink:href="@/assets/imgs/sprite.svg#icon-pig" />
                                    </svg>
                                </span>
                            </div>
                            <div class="wallet__figure--right">
                                <p class="label">
                                    Total earning
                                </p>
                                <p class="figure">
                                    $0
                                </p>
                            </div>
                        </div>
                        <div class="wallet__figure">
                            <div class="wallet__figure--icon spending">
                                <span class="svg">
                                    <svg>
                                        <use xlink:href="@/assets/imgs/sprite.svg#icon-coin-dollar" />
                                    </svg>
                                </span>
                            </div>
                            <div class="wallet__figure--right">
                                <p class="label">
                                    Total spending
                                </p>
                                <p class="figure">
                                    $0
                                </p>
                            </div>
                        </div>
                        <div class="wallet__figure">
                            <div class="wallet__figure--icon goal">
                                <span class="svg">
                                    <svg>
                                        <use xlink:href="@/assets/imgs/sprite.svg#icon-calculator" />
                                    </svg>
                                </span>
                            </div>
                            <div class="wallet__figure--right">
                                <p class="label">
                                    Spending goal
                                </p>
                                <p class="figure">
                                    $0
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="wallet__right"></div>
            </div>
        </template>
    </Dashboard>
  </div>
</template>

<script>
    import userMixin from '@/mixins/user.js';

    export default {
        data() {
            return {
                transPage: 'all',
                transactionForm: 'Withdraw',
                bank: null,
                amount: null,
                recepient: null,
                slide: null,
            }
        },
        mixins: [userMixin],
        methods: {
            toggleTransPage(page) {
                this.transPage = page;
            },
            closeslide() {
                this.slide = null
            },
            openslide(val) {
                this.slide = val
            },
            truncate(input) {
                if (input.length > 10) {
                    return input.substring(0, 10) + '...';
                }
                return input;
            },
        }
    }
</script>

<style lang="scss" scoped>
    @function scaleValue($value) {
        @return calc(
            #{$value} * (clamp(350px, 100vw, 3840px) / var(--ideal-viewport-width))
        );
    }

    .wallet {

        &__left {

            &--h2 {
                font-weight: 400;
            }

            &--balance {
                position: relative;
                border-radius: 1rem;
                width: #{scaleValue(800)};
                height: #{scaleValue(150)};
                background: #e6e8fa;
                padding: #{scaleValue(20)} #{scaleValue(20)};
                overflow: hidden;
                color: #000000;
                margin-top: #{scaleValue(30)};

                &::before {
                    content: "";
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 50%;
                    height: 100%;
                    background: #a3c1ad;
                }

                & p {

                    &.balancelabel {
                        margin-bottom: #{scaleValue(10)};
                        font-weight: 500;
                    }

                    &.balance {
                        font-weight: 700;
                        font-size: #{scaleValue(40)};
                        margin-bottom: #{scaleValue(10)};
                    }

                    &.balancecards {
                        font-weight: 500;
                    }
                }
            }

            &--details {
                position: absolute;
                right: #{scaleValue(15)};
                bottom: #{scaleValue(15)};
                background: #fff;
                padding: #{scaleValue(13)} #{scaleValue(20)};
                border-radius: 3rem;
                display: flex;
                align-items: center;
                width: #{scaleValue(120)};
                cursor: pointer;

                
                & span {
                    display: flex;
                    align-items: center;

                    &.svg {
                        margin-left: #{scaleValue(10)};
                        cursor: pointer;

                        & svg {
                            fill: #000000;
                            height: #{scaleValue(15)};
                            width: #{scaleValue(15)};
                        }
                    }
                }
            }
        }

        &__cards {
             margin-top: #{scaleValue(30)};
        }

        &__cardsarea {
            margin-top: #{scaleValue(30)};
            display: flex;
        }

        &__card {
            position: relative;
            background: rgba(92, 107, 192, .3);
            height: #{scaleValue(180)};
            width: #{scaleValue(290)};
            border-radius: 1rem;
            padding: #{scaleValue(20)};
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
            margin-right: #{scaleValue(30)};
            color: #fff;

            &::before {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                background-image: linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147));
                height: #{scaleValue(50)};
                z-index: 1;
            }

            &:nth-child(2) {
                background-image: linear-gradient(rgb(254, 102, 125), rgb(255, 163, 117));

                &::before {
                    background: rgba(255, 183, 77, .6)
                }
            }

            &--area {
                position: relative;
                display: flex;
                justify-content: space-between;
                align-items: center;
                z-index: 2;
            }

            & span {
                display: flex;
                align-items: center;

                &.name {
                    text-transform: capitalize;
                }

                &.chip {
                    display: flex;
                    height: #{scaleValue(20)};
                    width: #{scaleValue(20)};
                    align-items: center;
                    border-radius: .2rem;
                    overflow: hidden;

                    & img {
                        object-fit: cover;
                        height: 100%;
                        width: 100%;
                    }
                }

                &.visa {
                    display: flex;
                    height: #{scaleValue(15)};
                    width: #{scaleValue(70)};
                    align-items: center;

                    & img {
                        object-fit: scale-down;
                        height: 100%;
                        width: 100%;
                        transform: translateX(#{scaleValue(13)})
                    }
                }
            }
        }

        &__figures {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: #{scaleValue(50)} #{scaleValue(30)};
            border: 1px solid rgba(255,255,255, .2);
            margin: #{scaleValue(30)} 0;
            border-radius: 1rem;
        }

        &__figure {
            display: flex;
            align-items: center;

            &--icon {
                display: flex;
                align-items: center;
                justify-content: center;
                height: #{scaleValue(55)};
                width: #{scaleValue(55)};
                background: green;
                margin-right: #{scaleValue(15)};
                border-radius: 1.3rem;

                &.earning {
                    background: #6082b6;
                }

                &.spending {
                    background: #9966cc;
                }

                &.goal {
                    background: #9932cc;
                }

                & svg {
                    fill: #000000;
                    height: #{scaleValue(30)};
                    width: #{scaleValue(30)};
                }
            }

            &--right {
                line-height: #{scaleValue(30)};
                font-size: #{scaleValue(17)};

                & p {
                    &.label {
                        color: rgba(255,255,255, .6);
                    }
                }
            }
        }
    }
</style>