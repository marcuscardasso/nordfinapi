<template>
    <div>
        <Dashboard :title="'Withdraw Funds'">
            <template v-slot:base>
                <div class="transfer">
                    <div class="transfer__top">
                        <div class="transfer__top--left">
                            <span class="transfer__top--label">Select asset class to liquidate from</span>
                        </div>
                        <div class="transfer__top--right">
                            <div class="transfer__top--label">
                                <p>Asset Class</p>
                            </div>
                            <div class="transfer__top--input">
                                <label for="assetclass"></label>
                                <select name="assetclass" id="assetclass" @change="setassetclass">
                                    <option value="Futures">Futures</option>
                                    <option value="Commodities">Commodities</option>
                                    <option value="Crypto">Crypto</option>
                                    <option value="Stocks">Stocks</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="transfer__top">
                        <div class="transfer__top--left">
                            <span class="transfer__top--label">Select asset</span>
                        </div>
                        <div class="transfer__top--right">
                            <div class="transfer__top--label">
                                <p>Asset</p>
                            </div>
                            <div class="transfer__top--input" v-if="assetclass === 'Futures'">
                                <label for="futures"></label>
                                <select name="futures" id="futures" @change="setasset">
                                    <option value="Futures">Future Thingy</option>
                                    <option value="Commodities">Commodities</option>
                                    <option value="Crypto">Crypto</option>
                                    <option value="Stocks">Stocks</option>
                                </select>
                            </div>
                            <div class="transfer__top--input" v-if="assetclass === 'Commodities'">
                                <label for="commodities"></label>
                                <select name="commodities" id="commodities" @change="setasset">
                                    <option value="Futures">Commo Thingy</option>
                                    <option value="Commodities">Commodities</option>
                                    <option value="Crypto">Crypto</option>
                                    <option value="Stocks">Stocks</option>
                                </select>
                            </div>
                            <div class="transfer__top--input" v-if="assetclass === 'Crypto'">
                                <label for="crypto"></label>
                                <select name="crypto" id="crypto" @change="setasset">
                                    <option value="Futures">Crypto Thingy</option>
                                    <option value="Commodities">Commodities</option>
                                    <option value="Crypto">Crypto</option>
                                    <option value="Stocks">Stocks</option>
                                </select>
                            </div>
                            <div class="transfer__top--input" v-if="assetclass === 'Stocks'">
                                <label for="stocks"></label>
                                <select name="stocks" id="stocks" @change="setasset">
                                    <option value="Futures">Stocks Thingy</option>
                                    <option value="Commodities">Commodities</option>
                                    <option value="Crypto">Crypto</option>
                                    <option value="Stocks">Stocks</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="transfer__details transfer__top">
                        <div class="transfer__details--left transfer__top--left">
                            <span class="transfer__top--label">Withdrawal details</span>
                        </div>
                        <div class="transfer__details--right">
                            <div class="transfer__top--label transfer__top--right">
                                <span class="transfer__details--header">
                                    <p>Bank Details</p>
                                </span>
                                <div class="transfer__details--form">
                                    <div class="transfer__details--formarea">
                                        <div class="transfer__details--formlabel">
                                            <span>Bank Name</span>
                                        </div>
                                        <div class="transfer__top--input">
                                            <input placeholder="Enter bank name"/>
                                        </div>
                                    </div>
                                    <div class="transfer__details--formarea">
                                        <div class="transfer__details--formlabel">
                                            <span>Account Number</span>
                                        </div>
                                        <div class="transfer__top--input">
                                            <input placeholder="Enter account number"/>
                                        </div>
                                    </div>
                                    <div class="transfer__details--formarea">
                                        <div class="transfer__details--formlabel">
                                            <span>Amount</span>
                                        </div>
                                        <div class="transfer__top--input">
                                            <input placeholder="Enter Amount to withdraw"/>
                                        </div>
                                    </div>
                                    <div class="transfer__details--formarea">
                                        <button>Withdraw</button>
                                    </div>
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
import Dashboard from '../components/Dashboard';

    export default {
        data() {
            return {
                assetclass: 'Futures',
                asset: '',
            }
        },
        methods: {
            setassetclass(e) {
                const value = e.target.value;
                this.assetclass = value;
                this.asset = '';
            },
            setasset(e) {
                const value = e.target.value;
                this.asset = value;
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

    .transfer {

        &__top {
            display: flex;
            margin-bottom: #{scaleValue(40)};

            &--right {

                & select {
                    outline: none;
                    height: 100%;
                    width: 100%;
                    cursor: pointer;
                    border: none;
                    background: transparent;
                }

                & option {

                }
            }

            &--left {
                margin-right: #{scaleValue(90)};
                width: #{scaleValue(250)};
            }

            &--label {
                color: rgba(255, 255, 255, .7);
                font-size: #{scaleValue(14)};
            }

            &--input {
                height: #{scaleValue(49)};
                width: #{scaleValue(430)};
                padding: 0 #{scaleValue(10)};
                border: 1px solid rgba(255, 255, 255, .2);
                background: transparent;
                border-radius: 4px;
                margin-top: #{scaleValue(10)};

                & select {
                    color: #fff;
                    font-size: #{scaleValue(15)};
                }

                & input {
                    outline: none;
                    height: 100%;
                    width: 100%;
                    background: transparent;
                    color: #fff;
                    border: none;
                    font-size: #{scaleValue(14)};
                }
            }
        }

        &__details {

            &--header {
                display: block;
                width: 100%;
                padding-bottom: #{scaleValue(10)};
                margin-bottom: #{scaleValue(35)};
                font-size: #{scaleValue(19)};
                color: #007994
            }

            &--formarea {
                margin-bottom: #{scaleValue(30)};

                & button {
                    font-size: #{scaleValue(17)};
                    background: #007994;
                    border-radius: 5px;
                    color: #fff;
                    cursor: pointer;
                    border: none;
                    width: 100%;
                    height: #{scaleValue(50)}; 
                }
            }
        }
    }
</style>