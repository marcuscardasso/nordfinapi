<template>
    <div class="wallet">
    <div class="wallet__slide" v-if="slide === 'cards'" @click.stop="closeslide">
       <div></div>
       <div class="wallet__slide--body" @click.stop="openslide('cards')">
            <h2 class="wallet__slide--h2">Your Cards</h2>
            <div>You don't have any cards currently</div>
            <div>
                <button>Apply for a card</button>
            </div>
       </div>
    </div>

    <div class="wallet__slide" v-if="slide === 'notifications'" @click.stop="closeslide">
        <div></div>
       <div class="wallet__slide--body" @click.stop="openslide('notifications')">
            <h2 class="wallet__slide--h2">Your Notifications</h2>
            <div class="wallet__notifications">
               <!-- <div class="wallet__notification">
                    <p>You just deposited $25000 in your wallet</p>
                    <p>July 23rd 2022</p>
                </div>
                <div class="wallet__notification">
                    <p>Your cards have been created</p>
                    <p>July 23rd 2022</p>
                </div>
                <div class="wallet__notification">
                    <p>Your withdrawal request has been reviewed</p>
                    <p>July 23rd 2022</p>
                </div>-->
            </div>
       </div>
    </div>

    <div class="wallet__slide" v-if="slide === 'messages'" @click.stop="closeslide">
        <div></div>
       <div class="wallet__slide--body" @click.stop="openslide('messages')">
            <h2 class="wallet__slide--h2">Your Messages</h2>
            <div class="wallet__notifications">
                <!--<div class="wallet__notification">
                    <p>You just </p>
                    <p>July 23rd 2022</p>
                </div>
                <div class="wallet__notification">
                    <p>Your cards</p>
                    <p>July 23rd 2022</p>
                </div>-->
            </div>
       </div>
    </div>

    <div class="wallet__slide" v-if="slide === 'transactions'" @click.stop="closeslide">
        <div></div>
       <div class="wallet__slide--body wallet__slide--transaction" @click.stop="openslide('transactions')">
            <h2 class="wallet__slide--h2">Your Transactions</h2>
            <div class="wallet__right">
                <div class="wallet__middle">
        <div class="wallet__middletop">
        <div class="wallet__middletop--left">
        <div class="wallet__middletop--item" :class="{
            current: transPage === 'all'
        }" @click="toggleTransPage('all')">
            <p>All transactions</p>
        </div>
        <div class="wallet__middletop--item" :class="{
            current: transPage === 'deposit'
        }" @click="toggleTransPage('deposit')">
            <p>Deposits</p>
        </div>
        <div class="wallet__middletop--item" :class="{
            current: transPage === 'withdrawal'
        }" @click="toggleTransPage('withdrawal')">
            <p>Withdrawals</p>
        </div>
        <div class="wallet__middletop--item" :class="{
            current: transPage === 'transfer'
        }" @click="toggleTransPage('transfer')">
            <p>Transfers</p>
        </div>
        </div>

        <div class="wallet__middletop--right">
            <button class="wallet__middletop--btn"></button>
        </div>
    </div>

    <div class="wallet__middlecontent" v-if="user">
        <div v-if="!user.transactions.length" class="wallet__middlecontent--notransactions">
            <p>Currently you have made no transactions</p>
        </div>
        <div class="wallet__middleconitem" v-for="transaction in user.transactions" :class="{
            visible: transPage === transaction.transactionType || transPage === 'all'
        }">
            <div class="wallet__middleconitem--amount wallet__middleconitem--area" v-if="transaction.transactionType === 'deposit'">
                <span class="wallet__middleconitem--label deposit">
                   <p>D</p>
                </span>
                <span class="wallet__middleconitem--total deposit">
                    <p>+$ {{truncate(parseFloat(transaction.amount).toLocaleString('en-US'))}}</p>
                </span>
            </div>
            <div class="wallet__middleconitem--amount wallet__middleconitem--area" v-if="transaction.transactionType === 'withdrawal'">
                <span class="wallet__middleconitem--label withdrawal">
                   <p>W</p>
                </span>
                <span class="wallet__middleconitem--total withdrawal">
                    <p>-$ {{truncate(parseFloat(transaction.amount).toLocaleString('en-US'))}}</p>
                </span>
            </div>
            <div class="wallet__middleconitem--amount wallet__middleconitem--area" v-if="transaction.transactionType === 'transfer'">
                <span class="wallet__middleconitem--label transfer">
                   <p>T</p>
                </span>
                <span class="wallet__middleconitem--total transfer">
                    <p>-$ {{truncate(parseFloat(transaction.amount).toLocaleString('en-US'))}}</p>
                </span>
            </div>
            <div class="wallet__middleconitem--area capitalize">
                <p>{{transaction.dateTime}}</p>
            </div>
            <div class="wallet__middleconitem--area capitalize">
                <p>{{transaction.transactionType}}</p>
            </div>
            <div class="wallet__middleconitem--area">
                Trans ID: {{transaction.transactionId}}
            </div>
            <div class="wallet__middleconitem--area fee">
                <p>${{truncate(parseFloat(transaction.fee).toLocaleString('en-US'))}}</p>
            </div>
        </div>
    </div>
    </div>
            </div>
       </div>
    </div>

            <header class="wallet__header">
                <div class="wallet__headerleft">
                    <figure>
                        <img src='@/assets/images/pink-circle.png'/>
                    </figure>
                </div>
                <div class="wallet__headerright">
                    <div class="wallet__headersec" @click="openslide('transactions')">
                        <div class="wallet__headersec--dropdown">
                            <span>Transactions</span>
                        </div>
                    </div>
                    <div class="wallet__headersec" @click="openslide('notifications')">
                        <div class="wallet__headersec--dropdown">
                            <!--<span class="notification">10</span>-->
                            <span class="svg">
                                <svg>
                                    <use xlink:href="@/assets/imgs/sprite.svg#icon-bell" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="wallet__headersec" @click="openslide('messages')">
                        <div class="wallet__headersec--dropdown">
                            <!--<span class="notification">10</span>-->
                            <span class="svg">
                                <svg>
                                    <use xlink:href="@/assets/imgs/sprite.svg#icon-message-square" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="wallet__headersec" @click="$router.push('/wallet')">
                        <div class="wallet__headersec--dropdown">
                            <span class="svg">
                                <svg>
                                    <use xlink:href="@/assets/imgs/sprite.svg#icon-wallet1" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <div class="wallet__body">
                <div class="wallet__sidenav">
                    <div class="wallet__sidenav--item" :class="{
                        'current': currentroute === 'wallet'
                    }">
                        <router-link to="/wallet">
                            <span>
                                <svg>
                                    <use xlink:href="@/assets/imgs/sprite.svg#icon-wallet1" />
                                </svg>
                            </span>
                            <span>Wallet</span>
                        </router-link>
                    </div>
                    <div class="wallet__sidenav--item" :class="{
                        'current': currentroute === 'overview'
                    }">
                        <router-link to="/overview">
                            <span>
                                <svg>
                                    <use xlink:href="@/assets/imgs/sprite.svg#icon-bar-chart" />
                                </svg>
                            </span>
                            <span>Stats</span>
                        </router-link>
                    </div>
                    <div class="wallet__sidenav--item" :class="{
                        'current': currentroute === 'transfer'
                    }">
                    </div>
                    <div class="wallet__sidenav--item">
                        <router-link to="/profile">
                            <span>
                                <svg>
                                    <use xlink:href="@/assets/imgs/sprite.svg#icon-profile" />
                                </svg>
                            </span>
                            <span>Profile</span>
                        </router-link>
                    </div>
                    <div class="wallet__sidenav--item">
                        <router-link to="/password">
                            <span>
                                <svg>
                                    <use xlink:href="@/assets/imgs/sprite.svg#icon-profile" />
                                </svg>
                            </span>
                            <span>Password</span>
                        </router-link>
                    </div>
                    <div class="wallet__sidenav--item logout" @click="logout">
                        <div>
                            <span>
                                <svg>
                                    <use xlink:href="@/assets/imgs/sprite.svg#icon-info" />
                                </svg>
                            </span>
                            <span>Logout</span>
                        </div>
                    </div>
                </div>  

                <div class="wallet__container">
                    <div class="wallet__top">
                        <div class="wallet__top--left">
                            <h1 class="wallet__top--h1">{{title}}</h1>
                        </div>
                        <div class="wallet__top--right">
                            <!--<div class="wallet__top--rightbtns">
                                <span class="wallet__top--rightbtn">
                                    <button @click="btnselect('transfer')" :class="{ current: current === 'transfer' }">Transfer</button>
                                </span>
                                <span class="wallet__top--rightbtn">
                                    <button @click="btnselect('withdraw')" :class="{ current: current === 'withdraw' }">Withdraw</button>
                                </span>
                            </div>-->
                        </div>
                    </div>
                    <div class="wallet__base">
                        <slot name="base"></slot>
                    </div>
                </div>              
            </div>
    </div>
</template>

<script>
import userMixin from '@/mixins/user.js'
    export default {
        data() {
            return {
                current: 'overview',
                transPage: 'all',
                slide: null,
            }
        },
        props: ['title'],
        mixins: [userMixin],
        methods: {
            truncate(input) {
                if (input.length > 10) {
                return input.substring(0, 10) + '...';
                }
                return input;
            },
            toggleTransPage(page) {
                this.transPage = page;
            },
            btnselect(val) {
                this.current = val;
            },
            logout() {
                localStorage.removeItem('norduserxtxtxt');
                localStorage.removeItem('nordtokenxtxtxt');
                this.$router.push('/');
            },
            closeslide() {
                this.slide = null
            },
            openslide(val) {
                this.slide = val
            }
        },
        computed: {
            currentroute() {
                return this.$route.name;
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

    .wallet {
        color: #fff;

        &__slide {
            position: absolute;
            top: 0;
            right: 0;
            background: rgba(0, 0, 0, .2);
            height: 100vh;
            width: 100vw;
            z-index: 16;
            box-shadow: -11px 3px 85px 13px rgba(0,0,0,0.62);
            -webkit-box-shadow: -11px 3px 85px 13px rgba(0,0,0,0.62);
            -moz-box-shadow: -11px 3px 85px 13px rgba(0,0,0,0.62);
            color: #000000;
            display: flex;
            justify-content: space-between;

            &--h2 {
                font-weight: 500;
                font-size: #{scaleValue(20)};
                padding: #{scaleValue(24)};
            }

            &--body {
                background: #fff;
                height: 100%;
                width: #{scaleValue(400)};
            }

            &--transaction {
                width: #{scaleValue(850)};
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

        &__middletop {
            display: flex;
            justify-content: space-between;
            border-bottom: .4px solid rgba(0, 0, 0, .4);
            
            &--left {
                display: flex;
            }

            &--right {
                display: flex;
                align-items: center;
            }

            &--btn {
                outline: none;
                background: none;
                color: rgba(#474DFF, .9);
                cursor: pointer;
                border: none;
                font-weight: 500;
                font-size: #{scaleValue(13)};
            }

            &--item {
                margin-right: #{scaleValue(25)};
                font-size: #{scaleValue(15)};
                padding: #{scaleValue(12)} 0;
                cursor: pointer;
                color: rgba(0, 0, 0, .4);
                position: relative;
                transition: all .1s ease-in;

                & p {
                    font-weight: 500;
                }

                &:before {
                    content: '';
                    position: absolute;
                    bottom: #{scaleValue(15)};
                    left: 0;
                    background: rgba(0, 0, 0, 0);
                    height: 2px;
                    width: 100%;
                    border-radius: 3rem;
                    transition: all .1s ease-in;
                }

                &.current {
                    color: rgba(0, 0, 0, 1);

                    &:before {
                        background: rgba(0, 0, 0, 1);
                        bottom: 0;
                    }
                }
            }
        }

        &__middle {
            position: relative;
            background: #fff;
            webkit-box-shadow: 0px 0px 27px 0px rgba(#474DFF, .3);
            -moz-box-shadow:    0px 0px 27px 0px rgba(#474DFF, .3);
            box-shadow:         0px 0px 27px 0px rgba(#474DFF, .3);
            flex-basis: #{scaleValue(800)};
            padding: #{scaleValue(25)} #{scaleValue(30)};
            border-radius: .9rem;
            color: #000000;
            
            transition: all .3s ease-in;
        }

        &__middlecontent {

            &--notransactions {
                font-size: #{scaleValue(20)};
                text-align: center;
                padding: #{scaleValue(30)};
                font-weight: 500;
            }
        }

        &__middleconitem {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: #{scaleValue(20)} 0;
            font-size: #{scaleValue(14)};
            color: rgba(0, 0, 0, .6);
            border-bottom: .4px solid rgba(0, 0, 0, .4);
            display: none;

            &.visible {
                display: flex;
            }

            &:last-child {
                border: none;
            }

            &--area {
                text-align: left;
                flex-shrink: 0;

                &.capitalize {
                
                    & p {
                        text-transform: capitalize;
                    }
                }

                &:nth-child(1) {
                    flex-basis: #{scaleValue(150)};
                }

                &:nth-child(2) {
                    flex-basis: #{scaleValue(150)};
                }

                &:nth-child(3) {
                    flex-basis: #{scaleValue(80)};
                }

                &:nth-child(4) {
                    flex-basis: #{scaleValue(180)};
                }

                &:nth-child(5) {
                    flex-basis: #{scaleValue(70)};
                }
            }

            &--amount {
                display: flex;
                align-items: center;
            }

            &--total {

                &.transfer {
                    color: rgba(#138D75, .9)
                }

                &.deposit {
                    color: rgba(#474DFF, .9)
                }

                &.withdrawal {
                    color: rgba(#C0392B, .9)
                }
            }

            &--label {
                border-radius: 100%;
                height: #{scaleValue(24)};
                width: #{scaleValue(24)};
                display: flex;
                align-items: center;
                justify-content: center;
                background: red;
                margin-right: #{scaleValue(10)};
                font-size: #{scaleValue(10)};
                color: #fff;

                &.transfer {
                    background: rgba(#138D75, .9)
                }

                &.deposit {
                    background: rgba(#474DFF, .9)
                }

                &.withdrawal {
                    background: rgba(#C0392B, .9)
                }
            }
        }

        &__header {
            padding: #{scaleValue(20)} #{scaleValue(90)};
            border-bottom: 1px solid rgba(255, 255, 255, .2);
            color: rgb(254, 176, 25);
            font-size: #{scaleValue(25)};
            display: flex;
            align-items: center;
            justify-content: space-between;

            @media only screen and (max-width: 414px) { 
                font-size: #{scaleValue(90)};
                padding: #{scaleValue(70)} #{scaleValue(90)};
            }
        }

        &__headerleft {
            position: relative;
            display: flex;
            align-items: center;
            cursor: pointer;

            & figure {
                position: absolute;
                top: 0;
                left: 0;
                height: #{scaleValue(40)};
                width: #{scaleValue(40)};
                display: flex;
                justify-content: center;
                align-items: center;
                transform: translateY(#{scaleValue(-20)});

                & img {
                    object-fit: cover;
                    height: 100%;
                    width: 100%;
                }
            }

            & p {
                margin-left: #{scaleValue(40)};
            }
        }

        &__headerright {
            color: #fff;
            font-size: #{scaleValue(18)};
            font-weight: 400;
            display: flex;
            align-items: center;
        }

        &__headersec {
            position: relative;
            margin-left: #{scaleValue(55)};
            cursor: pointer;

            &--dropdown {
                color: #fff;

                &:hover {

                    & ~ .wallet__headersec--dropdowns {
                        display: flex;
                    }
                }

                & figure {
                    height: #{scaleValue(20)};
                    width: #{scaleValue(20)};
                    transform: translateY(#{scaleValue(-3)});

                    & img {
                        display: inline-block;
                        border-radius: 50%;
                        object-fit: cover;
                        height: 100%;
                        width: 100%;
                    }
                }

                & span {

                    &.svg {

                        & svg {
                            fill: #fff;
                            height: #{scaleValue(20)};
                            width: #{scaleValue(20)};
                        }
                    }

                    &.notification {
                        background: red;
                        border-radius: 3rem;
                        position: absolute;
                        top: #{scaleValue(-11)};
                        right: #{scaleValue(-9)};
                        height: #{scaleValue(20)};
                        width: #{scaleValue(20)};
                        font-size: #{scaleValue(10)};
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }               
            }

            &--dropdowns {
                position: absolute;
                top: #{scaleValue(16)};
                right: 0;
                background: rgb(30, 35, 41);
                color: #fff;
                width: #{scaleValue(180)}; 
                display: none;
                flex-direction: column;
                -webkit-box-shadow: 0 0 7px 0 rgba(0, 0, 0, .09);
                -moz-box-shadow: 0 0 7px 0 rgba(0, 0, 0, .09);
                -ms-box-shadow: 0 0 7px 0 rgba(0, 0, 0, .09);
                box-shadow: 0 0 7px 0 rgba(0, 0, 0, .09);
                border-radius: 2px;

                &:hover {
                    display: flex;
                }

                & span {
                    display: inline-block;
                    padding: #{scaleValue(20)} #{scaleValue(15)};

                    &:hover {
                        background: #000000;
                    }
                }
            }
        }

        &__body {
            display: flex;
        }

        &__sidenav {
            height: 100vh;
            position: absolute;
            width: #{scaleValue(180)};
            top: #{scaleValue(62)};
            left: 0;
            color: #fff;
            border-right: 1px solid rgba(255, 255, 255, .2);
            padding-top: #{scaleValue(50)};

            &--item {
                margin-bottom: #{scaleValue(30)};
                cursor: pointer;
                font-size: #{scaleValue(18)};

                &.logout {
                    position: absolute;
                    bottom: #{scaleValue(100)};
                    width: #{scaleValue(180)};
                    right: 0;
                }

                a, &.logout {
                    display: block;
                    text-decoration: none;
                    outline: none;
                    cursor: pointer;
                    color: #fff;
                    padding: #{scaleValue(20)} #{scaleValue(30)};
                }

                & span {
                    display: inline-block;

                    &:nth-child(1) {
                        margin-right: #{scaleValue(10)};

                        & svg {
                            fill: #fff;
                            height: #{scaleValue(15)};
                            width: #{scaleValue(15)};
                        }
                    }
                }

                &:hover {
                    background: rgb(30, 35, 41)
                }

                &.current {
                    background: rgb(30, 35, 41)
                }
            }
        }

        &__container {
            display: flex;
            flex-direction: column;
            width: #{scaleValue(1350)};
        }

        &__top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #000;
            padding: #{scaleValue(30)} #{scaleValue(30)};

            &--h1 {
                font-size: #{scaleValue(30)};
                font-weight: 700;
                text-transform: capitalize;
                margin-left: #{scaleValue(220)};
            }

            &--rightbtn {

                & button {
                    border: none;
                    background: rgb(71, 77, 87);
                    padding: #{scaleValue(13)} #{scaleValue(20)};
                    color: #fff;
                    font-weight: 500;
                    border-radius: 2px;
                    font-size: #{scaleValue(13)};
                    margin-left: #{scaleValue(25)};
                    cursor: pointer;

                    &.current {
                        background: #474DFF;
                        color: #fff;

                        &:hover {
                            background: rgba(#474DFF, .8);
                        }
                    }

                    &:hover {
                        background: rgba(71, 77, 87, .8);
                    }
                }
            }
        }

        &__base {
            //padding: #{scaleValue(30)} #{scaleValue(30)};
            display: flex;
            justify-content: space-between;
            padding-left: #{scaleValue(250)};
        }
    }
</style>