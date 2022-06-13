<template>
  <div class="inputduplicator">
    <div v-if="name === 'add transactions'">
        <h4 class="inputduplicator--h4">{{name}}</h4>
        <div class="inputduplicator__transactionlistitem inputduplicator__transactionlisthd">
            <div class="inputduplicator__transactionlistitem--section">
                <p>Amount</p>
            </div>
            <div class="inputduplicator__transactionlistitem--section">
                <p>Date/Time</p>
            </div>
            <div class="inputduplicator__transactionlistitem--section">
                <p>Type</p>
            </div>
            <div class="inputduplicator__transactionlistitem--section">
                <p>Transsaction ID</p>
            </div>
            <div class="inputduplicator__transactionlistitem--section">
                <p>fee</p>
            </div>
        </div>  
        <div class="inputduplicator__transactionlist">      
            <div class="inputduplicator__transactionlistitem" 
                v-for="transact in transactions"
                @key="transact.transactionId"
                >
                <div class="inputduplicator__transactionlistitem--section">
                    <p class="deposit" v-if="transact.transactionType === 'deposit'">+$ {{ transact.amount }}</p>
                    <p class="transfer" v-if="transact.transactionType === 'transfer'">-$ {{ transact.amount }}</p>
                    <p class="withdrawal" v-if="transact.transactionType === 'withdrawal'">-$ {{ transact.amount }}</p>
                </div>
                <div class="inputduplicator__transactionlistitem--section">
                    <p>{{ transact.dateTime }}</p>
                </div>
                <div class="inputduplicator__transactionlistitem--section">
                    <p>{{ transact.transactionType }}</p>
                </div>
                <div class="inputduplicator__transactionlistitem--section">
                    <p>Trans ID: {{ transact.transactionId }}</p>
                </div>
                <div class="inputduplicator__transactionlistitem--section">
                    <p>${{ transact.fee }}</p>
                </div>
                <span class="inputduplicator__transactionlistitem--remove" @click="removeTransaction(transact.transactionId)">X</span>
            </div>
        </div>
        <div class="inputduplicator__inputfields">
            <div class="inputduplicator__inputfield">
                <div class="inputduplicator__inputarea">
                    <label>Amount</label>
                    <input placeholder="amount" v-model="amount"/>
                </div>
                <div class="inputduplicator__inputarea">
                    <label>Transaction type eg: withdrawal, transfer or deposit</label>
                    <input placeholder="Transaction type" v-model="transactionType"/>
                </div>
            </div>
            <div class="inputduplicator__inputfield">
                <div class="inputduplicator__inputarea">
                    <label>Date Time eg: 14 August 2021 07:53</label>
                    <input placeholder="Date time" v-model="dateTime"/>
                </div>
                <div class="inputduplicator__inputarea">
                    <label>Fee</label>
                    <input placeholder="Fee" v-model="fee"/>
                </div>
            </div>
        </div>
        <div class="inputduplicator__section--button">
            <span></span>
            <span class="btn" @click="addTransaction">Add item</span>
        </div>
    </div>

    <div v-if="name === 'add notifications'">
        <h4 class="inputduplicator--h4">{{name}}</h4>
        <div class="inputduplicator__transactionlist">      
            <div class="inputduplicator__transactionlistitem column" 
                v-for="notif in notifications"
                @key="notif.notifId"
                >
                <div class="inputduplicator__transactionlistitem--section column">
                    <span class="label">Date:</span><p>{{ notif.notifdate }}</p>
                </div>
                <div class="inputduplicator__transactionlistitem--section column">
                    <span class="label">Content: </span><p>{{ notif.notifcontent }}</p>
                </div>
                <span class="inputduplicator__transactionlistitem--remove" @click="removeNotification(notif.notifId)">X</span>
            </div>
        </div>
        <div class="inputduplicator__inputfields">
            <div class="inputduplicator__inputfield inputduplicator__inputfieldnotif">
                <div class="inputduplicator__inputarea column">
                    <label>Date eg: 14 August 2021 07:53</label>
                    <input placeholder="Date time" v-model="notifdate"/>
                </div>
                <div class="inputduplicator__inputarea">
                    <label>Content</label>
                    <textarea placeholder="Fee" v-model="notifcontent"></textarea>
                </div>
            </div>
        </div>
        <div class="inputduplicator__section--button">
            <span></span>
            <span class="btn" @click="addNotification">Add item</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['name'],
    data() {
        return {
            amount: null,
            transactionType: null,
            transactionId: null,
            fee: null,
            dateTime: null,
            notifdate: null,
            notifcontent: null,
            notifId: null,
            transactions: [],
            notifications: []
        }
    },
    computed: {
        transaction() {
            const {
                amount,
                transactionType,
                fee,
                dateTime
            } = this;

            return {
                amount,
                transactionType,
                transactionId: Math.random().toString().substr(2, 6),
                fee,
                dateTime
            }
        },
        notification() {
            const {
                notifdate,
                notifcontent
            } = this;

            return {
                notifdate,
                notifcontent,
                notifId: Math.random().toString().substr(2, 6),
                viewed: false
            }
        }
    },
    methods: {
        addTransaction() {
            const transactions = this.transactions;
            transactions.push(this.transaction);
            this.transactions = transactions;

            this.$store.dispatch('userEdit/storeTransactions', this.transactions);

            this.amount = null;
            this.transactionType = null;
            this.transactionId = null;
            this.fee = null;
            this.dateTime = null;
        },
        removeTransaction(id) {
            const transactions = this.transactions;
            const filteredTransacs = transactions.filter(item => {
                return item.transactionId !== id;
            });
            this.transactions = filteredTransacs;

            this.$store.dispatch('userEdit/storeTransactions', this.transactions);
        },
        addNotification() {
            const notifications = this.notifications;
            notifications.push(this.notification);
            this.notifications = notifications;

            this.$store.dispatch('userEdit/storeNotifications', this.notifications);

            this.notifdate = null;
            this.notifcontent = null;
        },
        removeNotification(id) {
            const notifications = this.notifications;
            const filteredNotifs = notifications.filter(item => {
                return item.notifId !== id;
            });
            this.notifications = filteredNotifs;
            this.$store.dispatch('userEdit/storeNotifications', this.notifications);
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

.inputduplicator {
    width: 100%;

    &--h4 {
        font-size: #{scaleValue(20)};
        text-transform: capitalize;
        font-weight: 500;
        margin-bottom: #{scaleValue(25)};
    }

    &__section {

        
        &--button {
            display: flex;
            justify-content: space-between;

            & span {
                display: inline-block;
            }
            
            & span.btn {
                background: #474DFF;
                padding: #{scaleValue(15)} #{scaleValue(20)};
                cursor: pointer;
                font-size: #{scaleValue(15)};
                border-radius: .2rem;
            }
        }
    }

    &__inputfield {
        display: flex;
        justify-content: space-between;
        margin-bottom: #{scaleValue(30)};
    }

    &__inputfieldnotif {
        flex-direction: column;
    }

    &__inputarea {
        display: flex;
        flex-direction: column;
        flex-basis: 48%;

        &.column {
            margin-bottom: #{scaleValue(30)};
        }

        & label {
            margin-bottom: #{scaleValue(10)};
            font-size: #{scaleValue(16)};
        }

        & input, & textarea {
            display: inline-block;
            border: none;
            width: 100%;
            height: #{scaleValue(45)};
            padding: #{scaleValue(10)} #{scaleValue(14)};
            border-radius: .3rem;
            outline: none;
            font-size: #{scaleValue(17)};
            letter-spacing: #{scaleValue(2)};
            background: rgba(255, 255, 255, 0.09);
            color: #fff;

            &::placeholder {
                opacity: 0;
            }
        }

        & textarea {
            min-height: #{scaleValue(200)};
        }
    }

    &__transactionlist {
        min-height:  #{scaleValue(17)};
        width: 100%;
        margin-bottom: #{scaleValue(30)};
    }

    &__transactionlistitem {
        position: relative;
        background: #fff;
        display: flex;
        color: #000000;
        border-radius: .2rem;
        padding: #{scaleValue(17)};
        cursor: pointer;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, .4);
        font-size: #{scaleValue(16)};

        &--remove {
            position: absolute;
            top: #{scaleValue(-5)};
            right: #{scaleValue(-5)};
            cursor: pointer;
            border-radius: 100%;
            border: 1px solid rgba(0, 0, 0, .4);
            height: #{scaleValue(17)};
            width: #{scaleValue(17)};
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: #{scaleValue(10)};
            background: #fff;
        }

        &--section {

            & p {
                &.deposit {
                    color: rgba(71, 77, 255, 0.9);
                }

                &.transfer {
                    color: rgba(19, 141, 117, 0.9);
                }

                &.withdrawal {
                    color: rgba(192, 57, 43, 0.9)
                }
            }

            &:nth-child(1) {
                flex-basis: #{scaleValue(100)};
            }

            &:nth-child(2) {
                flex-basis: #{scaleValue(170)};
            }

            &:nth-child(3) {
                flex-basis: #{scaleValue(100)};
            }

            &:nth-child(4) {
                flex-basis: #{scaleValue(150)};
                //comment section
            }

            &:nth-child(5) {
                flex-basis: #{scaleValue(70)};
            }

            &.column {
                flex-basis: auto;

                &:nth-child(1) {
                    margin-bottom: #{scaleValue(20)};
                }
            }
        }

        &.column {
            flex-direction: column;
            align-items: flex-start;

            & span.label {
                display: inline-block;
                color: #474DFF;
                font-weight: 700;
                margin-bottom: #{scaleValue(5)};
            }
        }
    }

    &__transactionlisthd{
        color: #474DFF;
        font-weight: 700;
        margin-bottom: #{scaleValue(17)};
    }
}
</style>
