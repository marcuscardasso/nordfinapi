<template>
  <div>
    <div class="profile">
                <div class="profile__feedback" v-if="saved">
                    <p><span class="profile__header--name">{{ 
                        `${user.firstname} ${user.lastname}'s`
                     }}</span> details updated</p>
                </div>
                <div class="profile__header">
                    <h2 class="profile__header--h2">Profile</h2>
                    <p class="profile__header--p" v-if="user">Update <span class="profile__header--name">{{ 
                        `${user.firstname} ${user.lastname}'s`
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
                                    <p>User Balance</p>
                                </span>
                                <span class="profile__contentarea--input">
                                    <input type="text" v-model="balance"/>
                                </span>
                            </div>
                        </div>                    
                        <!--<div class="profile__section">
                            <div class="profile__contentarea profile__contentarea--stretch">
                                <span class="profile__contentarea--label">
                                    <p>User Balance</p>
                                </span>
                                <span class="profile__contentarea--input">
                                    <input type="text"/>
                                </span>
                            </div>
                        </div>-->
                        <div class="profile__section">
                            <div class="profile__contentarea profile__contentarea--stretch">
                                <span class="profile__contentarea--label">
                                    <p>Requirement</p>
                                </span>
                                <span class="profile__contentarea--input">
                                    <textarea v-model="requirement"></textarea>
                                </span>
                            </div>
                        </div>

                        <div  class="profile__section">
                            <InputDuplicator :name="'add transactions'"/>
                        </div>
                        <div  class="profile__section">
                            <InputDuplicator :name="'add notifications'"/>
                        </div>
                    </div>                    
                    <div class="profile__bottom">
                        <span @click="submitChanges" class="profile__bottom--btn">
                            Submit
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
            saved: false
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
                requirement,
                transactions,
                notifications
            } = this;

            const changes = {
                accountPlan, 
                balance,
                requirement,
                transactions,
                notifications
            };

            this.submit(changes);
        },
        submit(changes) {
            const user_token = JSON.parse(localStorage.getItem('nordtokenxtxtxt'));
            const user_id = this.$route.query.id;
            
            console.log(changes)
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
                console.log(json);
                this.saved = true;

                setTimeout(() => {
                    this.saved = false
                }, 8000);
            }).catch(err => {
                console.log(err)
            })
        }
    },
    beforeMount() {
        this.getUsers();
    },
    mounted() {
        console.log(this.$route.query.id);
        console.log(this.user, 'user here');
        
        if (this.user !== null) {
            this.accountPlan = this.user.accountPlan; 
            this.balance = this.user.balance;
        }
    },
    computed: {
        transactions() {
            return this.$store.getters['userEdit/transactions']
        },
        notifications() {
            return this.$store.getters['userEdit/notifications']
        },
        user() {
            return this.$store.getters.users ? this.$store.getters.users.filter(user => `${user._id}` == this.$route.query.id)[0] : null;
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
</style>
