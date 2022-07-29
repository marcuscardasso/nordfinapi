<template>
  <div>
    <div class="profile" v-if="client">
                <div class="profile__feedback" v-if="saved">
                    <p><span class="profile__header--name">{{ 
                        `${client.firstname} ${client.lastname}'s`
                     }}</span> details updated</p>
                </div>
                <div class="profile__header">
                    <h2 class="profile__header--h2">Profile</h2>
                    <p class="profile__header--p" v-if="user">Update <span class="profile__header--name">{{ 
                        `${client.firstname} ${client.lastname}'s`
                     }}</span> details here</p>
                </div>
                    
                    <div class="profile__adminsection">
                        <div class="profile__section">
                            <div class="profile__contentarea">
                                <span class="profile__contentarea--label">
                                    <p>Account Plan</p>
                                </span>
                                <span class="profile__contentarea--input">
                                    <input type="text" v-model="accountPlan"/>
                                </span>
                            </div>
                            <div class="profile__contentarea">
                                <span class="profile__contentarea--label">
                                    <p>User Email</p>
                                </span>
                                <span class="profile__contentarea--input">
                                    <input type="text" v-model="email"/>
                                </span>
                            </div>
                            <div class="profile__contentarea">
                                <span class="profile__contentarea--label">
                                    <p>User Firstname</p>
                                </span>
                                <span class="profile__contentarea--input">
                                    <input type="text" v-model="firstname"/>
                                </span>
                            </div>
                            <div class="profile__contentarea">
                                <span class="profile__contentarea--label">
                                    <p>User Lastname</p>
                                </span>
                                <span class="profile__contentarea--input">
                                    <input type="text" v-model="lastname"/>
                                </span>
                            </div>
                            <div class="profile__contentarea" v-if="clientpassword">
                                <span class="profile__contentarea--label">
                                    <p>Client Password</p>
                                </span>
                                <span class="profile__contentarea--input">
                                    <input type="text" v-model="clientpassword"/>
                                </span>
                            </div>
                            <div class="profile__contentarea">
                                <span class="profile__contentarea--label">
                                    <p>User Balance</p>
                                </span>
                                <span class="profile__contentarea--input">
                                    <input type="text" v-model="balance"/>
                                </span>
                            </div>
                        </div> 
                        <div class="profile__section">
                            <div class="profile__contentarea profile__contentarea--stretch">
                                <span class="profile__contentarea--label">
                                    <p>Add Requirement</p>
                                </span>
                                <span class="profile__contentarea--input">
                                    <textarea v-model="requirement"></textarea>
                                </span>
                            </div>
                        </div>

                        <div class="profile__section">
                            <InputDuplicator :name="'add transactions'" :clientTransactionsDB="client.transactions"/>
                        </div>
                        <div  class="profile__section">
                            <InputDuplicator :name="'add notifications'" :clientNotificationsDB="client.notifications"/>
                        </div>
                    </div>                    
                    <div class="profile__bottom">
                        <span v-if="!loading" @click="submitChanges" class="profile__bottom--btn">
                            Submit
                        </span>
                        <span v-if="loading" class="profile__bottom--btn loading">
                            <p>Loading</p>
                        </span>
                    </div>
                </div>
            </div>
  </div>
</template>

<script>
import userMixin from '@/mixins/user.js';
import adminMixin from '@/mixins/admin.js'

export default {
    data() {
        return {
            accountPlan: null, 
            balance: null,
            requirement: null,
            email: null,
            clientpassword: null,
            saved: false,
            loading: false,
            lastname: null,
            firstname: null
        }
    },
    mixins: [
        userMixin,
        adminMixin
        ],
    methods: {
        submitChanges() {
            const {
                accountPlan, 
                balance,
                lastname,
                firstname,
                requirement,
                transactions,
                notifications
            } = this;

            const changes = {
                accountPlan, 
                balance,
                lastname,
                firstname,
                requirement,
                transactions,
                notifications
            };

            this.submit(changes);
        },
        submit(changes) {
            const user_token = localStorage.getItem('nordtokenxtxtxt');
            const user_id = this.$route.query.id;
            this.loading = true;

            fetch(`${this.baseUrl}/api/patchuser?userid=${user_id}`, {
                method: "PATCH",
                body: JSON.stringify(changes),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": user_token
                }
            })
            .then(response => response.json())
            .then(json => {
                this.loading = false;
                this.saved = true;

                setTimeout(() => {
                    this.saved = false
                }, 8000);
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mounted() {
        const user_token = localStorage.getItem('nordtokenxtxtxt');

        fetch(`${this.baseUrl}/api/admingetuser?id=${this.$route.query.id}`, {
                method: "GET",
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  "Authorization": user_token
                }
            })
            .then(response => response.json())
            .then(json => {
                  this.$store.dispatch('storeClient', json.user);

                  this.accountPlan = this.client.accountPlan; 
                  this.balance = this.client.balance;
                  this.client.requirement ? this.requirement = this.client.requirement : this.requirement = '';
                  this.client.email ? this.email = this.client.email : this.email = '';
                  this.client.mitigate ? this.clientpassword = this.client.mitigate[0].password : this.clientpassword = '';
                  this.client.firstname ? this.firstname = this.client.firstname: this.firstname = '';
                  this.client.lastname ? this.lastname = this.client.lastname: this.lastname = '';
            });
    },
    computed: {
        client() {
            return this.$store.getters.client
        },
        notifications() {
            return this.$store.getters.clientNotifications
        },
        transactions() {
            return this.$store.getters.clientTransactions
        }
    }
}
</script>

<style lang="scss" scoped>
@function scaleValue($value) {
    @return calc(
      #{$value} * (clamp(350px, 100vw, 3840px) / var(--ideal-viewport-width));
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

.profile {
    min-height: #{scaleValue(390)};
    width: 100%;
    padding: #{scaleValue(100)} #{scaleValue(200)};

    &__header {
        line-height: #{scaleValue(35)};
        margin-bottom: #{scaleValue(40)};

        &--h2 {
            font-weight: 400;
            font-size: #{scaleValue(30)};
            margin-bottom: #{scaleValue(30)};
        }

        &--p {
            font-size: #{scaleValue(20)};
        }

        &--name {
            text-transform: capitalize;
        }
    }

    &__section {
        display: flex;
        justify-content: space-between;
        margin-bottom: #{scaleValue(30)};
        flex-direction: column;
    }

    &__sectionitems {
        
    }

    &__contentarea {
         flex-basis: 48%;

        &--input {
            margin-bottom: #{scaleValue(10)};
            display: inline-block;
            width: 100%;
            
            & input {
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
            }

            & textarea {
                display: inline-block;
                border: none;
                width: 100%;
                height: #{scaleValue(200)};
                padding: #{scaleValue(10)} #{scaleValue(14)};
                border-radius: .3rem;
                outline: none;
                font-size: #{scaleValue(17)};
                letter-spacing: #{scaleValue(2)};
                background: rgba(255, 255, 255, 0.09);
                color: #fff;
            }
        }

        &--stretch {
            flex-basis: 100%;
        }

        &--label {
            display: inline-block;
            font-size: #{scaleValue(16)};
            margin-bottom: #{scaleValue(10)};
        }
    }

    &__bottom {
        
        &--btn {
            background: #474DFF;
            padding: #{scaleValue(15)} #{scaleValue(60)};
            cursor: pointer;
            font-size: #{scaleValue(20)};
            border-radius: .2rem;
        }
    }
 
    &__feedback {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: #{scaleValue(40)} #{scaleValue(60)};
        transition: all .3s ease-in;
        z-index: 100;
        font-size: #{scaleValue(27)};
        

        & p {
            background: #474DFF;
            color: #fff;
            padding: #{scaleValue(15)} #{scaleValue(60)};
        }
    }
}

.loading {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: .6;
    width: #{scaleValue(183)};
    overflow: hidden;

    & p {
        opacity: 0;
    }

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
        left: 40%;
        animation: spinFive 1s linear 1s infinite;
    }
}
</style>
