<template>
  <div>
    <div class="profile">
                <div class="profile__header">
                    <h2 class="profile__header--h2">Profile</h2>
                    <p class="profile__header--p">Update your photo and personal details here</p>
                </div>
                <div class="profile__content" v-if="edit">
                    <div class="profile__section">
                        <div class="profile__contentarea">
                            <span class="profile__contentarea--label">
                                <p>First name</p>
                            </span>
                            <span class="profile__contentarea--input">
                                <input type="text" v-model="firstname"/>
                            </span>
                        </div>
                        <div class="profile__contentarea">
                            <span class="profile__contentarea--label">
                                <p>Last name</p>
                            </span>
                            <span class="profile__contentarea--input">
                                <input type="text" v-model="lastname"/>
                            </span>
                        </div>
                    </div>
                    <div class="profile__section">
                        <div class="profile__contentarea">
                            <span class="profile__contentarea--label">
                                <p>Email</p>
                            </span>
                            <span class="profile__contentarea--input">
                                <input type="email" v-model="email"/>
                            </span>
                        </div>
                        <div class="profile__contentarea">
                            <span class="profile__contentarea--label">
                                <p>Phone number</p>
                            </span>
                            <span class="profile__contentarea--input">
                                <input type="text" v-model="phonenumber"/>
                            </span>
                        </div>
                    </div>                  
                    <div class="profile__bottom">
                        <span class="profile__bottom--btn" @click="submit">
                            Submit
                        </span>
                    </div>
                </div>

                <div class="profile__content" v-if="!edit">
                    <div class="profile__section">
                        <div class="profile__contentarea">
                            <span class="profile__contentarea--label">
                                <p>First name</p>
                            </span>
                            <span class="profile__contentarea--input">
                                <p class="detail">{{this.user ? this.user.firstname : ''}}</p>
                            </span>
                        </div>
                        <div class="profile__contentarea">
                            <span class="profile__contentarea--label">
                                <p>Last name</p>
                            </span>
                            <span class="profile__contentarea--input">
                                 <p class="detail">{{this.user ? this.user.lastname : ''}}</p>
                            </span>
                        </div>
                    </div>
                    <div class="profile__section">
                        <div class="profile__contentarea">
                            <span class="profile__contentarea--label">
                                <p>Email</p>
                            </span>
                            <span class="profile__contentarea--input">
                                 <p class="detail">{{this.user ? this.user.email : ''}}</p>
                            </span>
                        </div>
                        <div class="profile__contentarea">
                            <span class="profile__contentarea--label">
                                <p>Phone number</p>
                            </span>
                            <span class="profile__contentarea--input">
                                 <p class="detail">{{this.user ? this.user.phonenumber : ''}}</p>
                            </span>
                        </div>
                    </div>                  
                    <div class="profile__bottom">
                        <span class="profile__bottom--btn" @click="toggleForm">
                            Click to edit profile
                        </span>
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
            edit: false,
            firstname: '',
            lastname: '',
            email: '',
            phonenumber: ''
        }
    },
    methods: {
        toggleForm() {
            this.firstname = this.user.firstname;
            this.lastname = this.user.lastname;
            this.email = this.user.email;
            this.phonenumber = this.user.phonenumber;
            this.edit ? this.edit = false : this.edit = true;
        },
        submit() {
            const user_token = JSON.parse(localStorage.getItem('nordtokenxtxtxt'));

            const {
                firstname,
                lastname,
                email,
                phonenumber
            } = this;

            fetch(`${this.baseUrl}/api/edituser`, {
                method: "PATCH",
                body: JSON.stringify({
                    firstname,
                    lastname,
                    email,
                    phonenumber
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": user_token
                }
            })
            .then(response => response.json()) 
            .then(json => {
                this.firstname = '';
                this.lastname = '';
                this.email = '';
                this.phonenumber = '';
                this.getUser();
            }).then(json => {
               this.edit = false
            })
            .catch(err => console.log(err));
        }        
    },
    mixins: [userMixin],
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
    padding-right: #{scaleValue(390)};

    &__header {
        line-height: #{scaleValue(35)};
        margin-bottom: #{scaleValue(40)};

        &--h2 {
            font-weight: 400;
            font-size: #{scaleValue(30)};
        }

        &--p {
            font-size: #{scaleValue(15)};
        }
    }

    &__section {
        display: flex;
        justify-content: space-between;
        margin-bottom: #{scaleValue(30)};
    }

    &__content {
        margin-bottom: #{scaleValue(60)};
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

            & p.detail {
                font-size: #{scaleValue(20)};
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
}
</style>
