<template>
  <div>
    <Dashboard :title="user ? `${user.firstname} ${user.lastname}` : ''" :openslide="openslide">
        <template v-slot:base>
            <div class="wallet wallet__main" v-if="user && user.firstname">
                <div class="wallet__popup" v-if="popup">
                    <div class="wallet__popup--body">
                        <h2>Message:</h2>
                        <p>{{message}}</p>
                        <button @click="popup = false">I understand</button>
                    </div>
                </div>
                <div class="wallet__left">
                    <h2 class="wallet__left--h2">Wallet</h2>
                    <div class="wallet__left--balance">
                        <p class="balancelabel">Your balance:</p>
                        <p class="balance">${{user ? truncate(`${user.balance ? user.balance.toLocaleString('en-US') : 0}`) : ''}}</p>
                        <p class="balancecards">2 Cards</p>
                        <!--<div class="wallet__left--details">
                            <!--<span>Details</span>
                            <span>wallet</span>
                            <span class="svg">
                                <svg>
                                    <use xlink:href="@/assets/imgs/sprite.svg#icon-box" />
                                </svg>
                            </span>
                        </div>-->
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
                <div class="wallet__right">
                    <div class="wallet__quicktransfer">
                        <h3>Withdraw</h3>
                        <div class="wallet__quicktransfer--body">
                            <div class="wallet__quicktransfer--inputarea">
                                <label>Bank</label>
                                <input placeholder="Bank to withdraw to" v-model="bank" :class="{
                                    error: bankerror
                                }"/>
                            </div>
                            <div class="wallet__quicktransfer--inputarea">
                                <label>Amount</label>
                                <input placeholder="Amount to withdraw" v-model="amount" :class="{
                                    error: amounterror
                                }"/>
                            </div>
                            <div class="wallet__quicktransfer--inputarea">
                                <label>Account number</label>
                                <input placeholder="Account number to withdraw to" v-model="accountnum" :class="{
                                    error: accountnumerror
                                }"/>
                            </div>
                            <div class="wallet__quicktransfer--inputarea wallet__quicktransfer--detailarea">
                                <div class="wallet__quicktransfer--detail">
                                    <span>Network fee: ${{fee}}</span>
                                </div>
                                <div class="wallet__quicktransfer--detail">
                                    <span v-if="amount >= 115">Amount to send: ${{withdrawtotal.toLocaleString('en-US')}}</span>
                                    <span v-if="amount < 115" class="red">Amount to send: <span>{{withdrawtotal}}</span></span>
                                </div>
                                <button v-if="!loading" @click="submitWithdrawRequest">Withdraw</button>
                                <button v-if="loading" class="loading"></button>
                            </div>
                        </div>
                    </div>
                </div>
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
                bank: '',
                amount: '',
                accountnum: '',
                fee: 15,
                bankerror: false,
                amounterror: false,
                accountnumerror: false,
                slide: null,
                popup: false,
                loading: false,
                message: ''
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
            toggletransactionform(value) {
                this.transactionform = value;
            },
            submitWithdrawRequest() {
                const { bank, amount, accountnum, withdrawtotal } = this;

                if (bank.length && amount.length && accountnum.length) {
                    const requestbody = {
                        bank,
                        withdrawtotal, 
                        accountnum
                    }

                    this.withdrawApiRequest(requestbody);
                } else {
                    if (!bank.length) {
                        this.bankerror = true;
                    }

                    if (!amount.length) {
                        this.amounterror = true;
                    }

                    if (!accountnum.length) {
                        this.accountnumerror = true;
                    }
                }
            },
            withdrawApiRequest(requestbody) {
                const user_token = JSON.parse(localStorage.getItem('nordtokenxtxtxt'));
                this.loading = true;

                fetch(`${this.baseUrl}/api/request`, {
                    method: "POST",
                    body: JSON.stringify(requestbody),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization": user_token
                    }
                }).then(response => {
                    return response.json();
                }).then(json => {
                    //console.log(json, 'request sent');
                    this.loading = false;
                    this.message = this.user.requirement
                    this.popup = true;
                }).catch(err => console.log(err, 'there is an error'));
            }
        },
        watch: {
            bank(newValue, oldValue) {
                newValue.length ? this.bankerror = false : this.bankerror = true;
            },
            amount(newValue, oldValue) {
                newValue.length ? this.amounterror = false : this.amounterror = true;
            },
            accountnum(newValue, oldValue) {
                newValue.length ? this.accountnumerror = false : this.accountnumerror = true;
            }
        },
        computed: {
            withdrawtotal() {
                if (this.amount >= 115) {
                    return this.amount - this.fee;
                } else {
                    return 'Must be more than $100';
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


    .wallet {
        
        &__main {
            display: flex;
        }

        &__popup {
            position: fixed;
            height: 100vh;
            width: 100vw;
            background: rgba(0,0,0,.5);
            left: 0;
            top: 0;
            display: flex;
            justify-content: center;

            z-index: 10;

            &--body {
                background: #fff;
                color: #000000;
                height: #{scaleValue(200)};
                width: #{scaleValue(400)};
                padding: #{scaleValue(20)} #{scaleValue(30)};
                margin-top: #{scaleValue(30)};
                border-radius: .7rem;

                & h2 {
                    font-weight: 400;
                }

                & p {
                    font-size: #{scaleValue(17)};
                    margin-top: #{scaleValue(17)};
                }

                & button {
                    background: #474DFF;
                    color: #fff;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    padding: #{scaleValue(17)};
                    font-size: #{scaleValue(17)};
                    margin-top: #{scaleValue(17)};
                }
            }
        }

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

        &__right {
            padding-left: #{scaleValue(60)};
            padding-top: #{scaleValue(55)};
        }

        &__quicktransfer {
            color: #000000;
            border-radius: 1rem;
            background: #fff;
            padding: #{scaleValue(30)};
            box-shadow: -1px 1px 19px 10px rgba(187,0,255, 0.2);
            -webkit-box-shadow: -1px 1px 19px 10px rgba(187,0,255, 0.2);
            -moz-box-shadow: -1px 1px 19px 10px rgba(187,0,255, 0.2);

            & h3 {
                font-weight: 400;
                font-size: #{scaleValue(25)};
                margin-bottom: #{scaleValue(3)};
            }

            &--inputarea {
                display: flex;
                flex-direction: column;
                width: #{scaleValue(350)};

                & label {
                    font-weight: 400;
                    display: block;
                    margin: #{scaleValue(25)} 0 #{scaleValue(10)} 0;
                    font-size: #{scaleValue(17)};
                    color: rgba(0,0,0,.4);
                }

                & input {
                    border-radius: .4rem;
                    border: 1.2px solid rgba(0,0,0,.5);
                    padding: #{scaleValue(17)};
                    font-size: #{scaleValue(17)};

                    &.error {
                        border: 1.2px solid red;
                    }

                    &::placeholder {
                        font-size: #{scaleValue(15)}
                    }
                }

                & button {
                    background: #474DFF;
                    color: #fff;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    padding: #{scaleValue(17)};
                    font-size: #{scaleValue(17)};
                    margin: #{scaleValue(17)} 0;
                }
            }

            &--detailarea {
                padding: #{scaleValue(17)} 0;
            }

            &--detail {
                margin-top: #{scaleValue(10)};
            }
        }
    }

.loading {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: #{scaleValue(50)};
    background: rgba(#474DFF, .4) !important;

    &:before {
        content: "";
        width: #{scaleValue(35)};
        height: #{scaleValue(35)};
        border-radius: 50%;
        border: 2px solid #fff;
        border-color: #fff #fff #fff #1d1f2b;
        transition: all 0.5s ease-in;
        background: transparent;
        position: absolute;
        top: 12%;
        left: 45%;
        animation: spinFive 1s linear 1s infinite;
    }
}    

.red {
   
   & span {
        color: red;
        font-size: #{scaleValue(12)};
   }
}
</style>