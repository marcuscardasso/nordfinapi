<template>
    <div>
        <div class="signup">
            <header class="signup__header" @click="moveToRoute('/')">
                <p>SwissNordic Financials</p>
            </header>
            <div class="signup__container">
                <div class="signup__container--top">
                    <h1>Create your account</h1>
                </div>
                <div class="signup__containerform">
                    <div class="signup__containernamearea">
                        <div class="signup__containernameareaname signup__containerformarea">
                            <span>
                                <input :class="{
                                    error: firstname_error
                                }" type="text" placeholder=" " v-model="firstname"/>
                                <span>
                                    <p>First Name</p>
                                </span>
                                <label v-if="firstname_error" class="error">{{firstname_error ? `*${firstname_error}` : ''}}</label>
                            </span>
                        </div>
                        <div class="signup__containernameareaname signup__containerformarea">
                            <span>
                                <input :class="{
                                    error: lastname_error
                                }" type="text" placeholder=" " v-model="lastname"/>
                                <span>
                                    <p>Last Name</p>
                                </span>
                                <label v-if="lastname_error" class="error">{{lastname_error ? `*${lastname_error}` : ''}}</label>
                            </span>
                        </div>
                    </div>
                    <div class="signup__containerformarea">
                        <span>
                            <input :class="{
                                    error: email_error
                                }" type="email" placeholder=" " v-model="email"/>
                            <span>
                                <p>Email</p>
                            </span>
                            <label v-if="email_error" class="error">{{email_error ? `*${email_error}` : ''}}</label>
                        </span>
                    </div>
                     <div class="signup__containerformarea">
                        <span>
                            <input :class="{
                                    error: iban_error
                                }" type="text" placeholder=" " v-model="iban"/>
                            <span>
                                <p>Iban</p>
                            </span>
                            <label v-if="iban_error" class="error">{{iban_error? `*${iban_error}` : ''}}</label>
                        </span>
                    </div>
                    <div class="signup__containerformarea">
                        <span>
                            <input :class="{
                                    error: phonenum_error
                                }"
                                type="phonenumber" placeholder=" " v-model="phonenumber"/>
                            <span>
                                <p>Phone Number</p>
                            </span>
                            <label v-if="phonenum_error" class="error">{{phonenum_error ? `*${phonenum_error}` : ''}}</label>
                        </span>
                    </div>
                    <div class="signup__containerformarea">
                        <span>
                            <input :class="{
                                    error: password_error
                                }" type="password" placeholder=" " v-model="password"/>
                            <span>
                                <p>Password</p>
                            </span>
                            <label v-if="password_error" class="error">{{password_error ? `*${password_error}` : ''}}</label>
                        </span>
                    </div>
                    <div class="signup__containerformarea">
                        <span>
                            <input :class="{
                                    error: confirmpassword_error
                                }" type="password" placeholder=" " v-model="confirmpassword"/>
                            <span>
                                <p>Confirm Password</p>
                            </span>
                            <label v-if="confirmpassword_error" class="error">{{confirmpassword_error ? `*${confirmpassword_error}` : ''}}</label>
                        </span>
                    </div>
                    <div class="signup__containerform--checkbox">
                        <span><input type="checkbox" v-model="termsagreed"/></span>
                        <span>I agree to the SwissNordic Financials <router-link to="/tos">Terms of Service</router-link></span>
                        <label v-if="termsagreed_error" class="error terms">{{termsagreed_error ? `*${termsagreed_error}` : ''}}</label>
                    </div>
                    <div class="signup__containerform--button">
                        <button v-if="!loading" @click="signup">Create Account</button>
                        <button v-if="loading" class="loading"></button>
                    </div>
                </div>
            </div>
            <div class="signup__already">
                <span>
                    <p>Already have an account?</p>
                    <router-link to="/signin">Sign in</router-link>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import * as EmailValidator from 'email-validator';
    import urlMixin from '@/mixins/url.js';

    export default {
        data() {
            return {
                firstname: '',
                lastname: '',
                email: '',
                iban: '',
                phonenumber: '',
                password: '',
                confirmpassword: '',
                termsagreed: false,
                firstname_error: false,
                lastname_error: false,
                email_error: false,
                iban_error: false,
                phonenum_error: false,
                password_error: false,
                confirmpassword_error: false,
                termsagreed_error: false,
                loading: false
            }
        },
        mixins: [urlMixin],
        methods: {
            setUser(user, token) {
                localStorage.setItem('nordtokenxtxtxt', token);
                this.$store.dispatch('storeUser', user);
            },           
            authenticate(credentials, route) {
                this.loading = true;
                fetch(`${this.baseUrl}/${route}`, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(response => {
                    return response.json();
                }) 
                .then(json => {
                    if (json.error) {
                        this.loading = false;
                        if (json.error.name === 'MongoError') {
                            if (json.error.keyPattern.email) {
                                this.email_error = `email is already in use`
                            }

                            if (json.error.keyPattern.phonenumber) {
                                this.phonenum_error = `phone number is already in use`
                            }
                        }

                        throw 'there is an error here';
                    } else {
                        this.loading = false;
                        const user = json.user;
                        const token = json.token;
                        this.setUser(user, token);
                    }
                })
                .then(() => {
                    this.$router.push('/wallet');
                })
                .catch(err => console.log(err, 'there is an errro'));
            },            
            moveToRoute(route) {
                this.$router.push(route)
            },
            signup() {
                const {
                    firstname, 
                    lastname, 
                    email, 
                    iban,
                    phonenumber,
                    password,
                    confirmpassword,
                    termsagreed
                } = this;

                const credentials = {
                    firstname,
                    lastname,
                    email,
                    iban,
                    phonenumber,
                    password,
                    confirmpassword,
                    accountPlan: 'Basic'
                }

                if (!firstname.length) {
                    this.firstname_error = 'first name required';
                } else {
                    this.firstname_error = false;
                }

                if (!lastname.length) {
                    this.lastname_error = 'last name required'
                } else {
                    this.lastname_error = false
                }

                if (!email.length) {
                    this.email_error = 'email required'
                } else {
                    this.email_error = false
                }

                if (!iban.length) {
                    this.iban_error = 'iban required'
                } else {
                    this.iban_error = false
                }

                if (!phonenumber.length) {
                    this.phonenum_error = 'phonenumber required'
                } else {
                    this.phonenum_error = false
                }

                if (!password.length) {
                    this.password_error = 'password should be 6 characters or more'
                } else {
                    this.password_error = false
                }

                if (!confirmpassword.length) {
                    this.confirmpassword_error = 'confirm password should be 6 characters or more'
                } else {
                    this.confirmpassword_error = false
                }

                if (confirmpassword !== password && confirmpassword.length >= 6 && password.length >=6) {
                    this.confirmpassword_error = 'confirm password should equal password';
                    this.password_error = 'confirm password should equal password'
                }

                if (!termsagreed) {
                    this.termsagreed_error = 'terms of service should be adhered to';
                }

                const {
                    termsagreed_error,
                    firstname_error,
                    lastname_error,
                    email_error,
                    iban_error,
                    phonenum_error,
                    password_error,
                    confirmpassword_error,
                } = this;

                if (!termsagreed_error && 
                    !firstname_error && 
                    !lastname_error && 
                    !email_error && 
                    !iban_error && 
                    !phonenum_error && 
                    !password_error && 
                    !confirmpassword_error) {
                        this.authenticate(credentials, 'api/signup');
                    }
            },  
        },
        watch: {
            firstname() {
                this.firstname_error = false;
            },
            lastname() {
                this.lastname_error = false;
            },
            email(newValue, oldValue) {
                EmailValidator.validate(newValue) ? this.email_error = false : this.email_error = 'email is invalid';
            },
            iban() {
                this.iban_error = false;
            },
            phonenumber() {
                this.phonenum_error = false;
            },
            password(newValue, oldValue) {
                if (newValue.length < 6) {
                    this.password_error = 'password should be 6 characters or more';
                } else if (newValue !== this.confirmpassword) {
                    this.password_error = 'password should equal confirm  password'
                } else if (newValue === this.confirmpassword) {
                    this.password_error = false;
                    this.confirmpassword_error = false;
                } else {
                    this.password_error = false;
                }
            },
            confirmpassword(newValue, oldValue) {
                if (newValue.length < 6) {
                    this.confirmpassword_error = 'password should be 6 characters or more';
                } else if (newValue !== this.password) {
                    this.confirmpassword_error = 'confirm password should equal password';
                } else if (newValue === this.password) {
                    this.password_error = false;
                    this.confirmpassword_error = false;
                } else {
                    this.confirmpassword_error = false;
                }
            },
            termsagreed(newValue) {
                if (newValue === false) {
                    this.termsagreed_error = 'terms of service should be adhered to';
                } else {
                    this.termsagreed_error = false;
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

.signup {
    background: #0A0E17;
    color: #fff;
    height: 100vh;

    &__header {
        padding: #{scaleValue(20)} #{scaleValue(90)};
        border-bottom: 1px solid rgba(255, 255, 255, .2);
        color: #fff;
        font-size: #{scaleValue(20)};
        display: flex;
        align-items: center;

        @media only screen and (max-width: 414px) { 
            font-size: #{scaleValue(90)};
            padding: #{scaleValue(70)} #{scaleValue(90)};
        }
    }

    &__container {
        background: rgb(29, 31, 43);
        border-radius: 10px;
        margin: 0 auto;
        width:  #{scaleValue(600)};
        margin-top: #{scaleValue(60)};
        color: rgb(255, 255, 255);
        transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0));
        padding: #{scaleValue(40)} #{scaleValue(50)};
        display: flex;
        flex-direction: column;
        
        @media only screen and (max-width: 414px) { 
            width:  #{scaleValue(1500)};
            height:  #{scaleValue(2100)};
            padding: #{scaleValue(100)} #{scaleValue(50)};
            margin-top: #{scaleValue(200)};
        } 

        &--top {

            & h1 {
                position: relative;
                color: rgb(255, 255, 255);
                font-weight: 500;
                font-size: #{scaleValue(22)};
                letter-spacing: #{scaleValue(1)};
                width: fit-content;
                text-align: center;
                margin-bottom: #{scaleValue(16)};

                @media only screen and (max-width: 414px) { 
                    font-size: #{scaleValue(80)};
                    font-weight: 500;
                    margin-bottom: #{scaleValue(80)}; 
                } 
            }
        }
    }

    &__containerform {

        &--checkbox {
            position: relative;
            font-size: #{scaleValue(13)};
            margin-bottom: #{scaleValue(20)}; 
            margin-top: #{scaleValue(40)}; 
            display: flex;
            align-items: center;

            @media only screen and (max-width: 414px) { 
                font-size: #{scaleValue(65)};
                margin-bottom: #{scaleValue(100)}; 
                margin-top: #{scaleValue(70)}; 
            }

            & span {
                display: inline-block;

                &:nth-child(1) {
                    margin-right: #{scaleValue(10)}; 

                    @media only screen and (max-width: 414px) { 
                        margin-right: #{scaleValue(50)}; 
                    }
                }
            }

            & a {
                text-decoration: none;
                color: #007994;
                cursor: pointer;

                @media only screen and (max-width: 414px) { 
                    display: block;
                }
            }
        }

        &--button {

            & button {
                background: #007994;
                font-size: #{scaleValue(17)};
                border-radius: 5px;
                color: #fff;
                cursor: pointer;
                border: none;
                width: 100%;
                height: #{scaleValue(50)}; 

                @media only screen and (max-width: 414px) { 
                    height: #{scaleValue(210)}; 
                    font-size: #{scaleValue(65)};
                }
            }
        }
    }

    &__containerformarea {
        position: relative;
        margin-bottom: #{scaleValue(25)}; 

        @media only screen and (max-width: 414px) { 
            margin-bottom: #{scaleValue(70)}; 
        } 

        & span {

            &:nth-child(1) {
                position: relative;
                
                & input {
                    position: relative;
                    background: rgba(255, 255, 255, 0.09);
                    display: inline-block;
                    border: none;
                    outline: none;
                    height: #{scaleValue(53)};
                    width: 100%;
                    border-radius: 5px;
                    padding: #{scaleValue(18)} #{scaleValue(10)}; 
                    color: #fff;
                    z-index: 2;
                    font-size: #{scaleValue(14)}; 

                    &.error {
                        border: solid .1px red;
                    }

                    @media only screen and (max-width: 414px) { 
                        height:  #{scaleValue(200)};
                        padding: #{scaleValue(18)} #{scaleValue(70)}; 
                        font-size: #{scaleValue(79)}; 
                    } 

                    &:placeholder-shown {

                        & ~ span {
                            opacity: .5;
                            position: absolute;
                            top: 0;
                            z-index: 1;
                            height: 100%;
                            width: 100%;
                            display: flex;
                            align-items: center;
                            color: #fff;
                            opacity: .5;
                            padding: #{scaleValue(10)}; 
                            transition: all .2s ease;

                            & p {
                                font-weight: 300;
                                display: inline-block;
                                transition: all .2s ease;
                                font-size: #{scaleValue(14)}; 
                                color: #fff;

                                @media only screen and (max-width: 414px) { 
                                    font-size: #{scaleValue(55)}; 
                                    padding: #{scaleValue(40)}; 
                                } 
                            }
                        }
                    }

                    &:focus {
                        border: 1px solid #007994;

                        & ~ span {
                            opacity: 1;
                            top: #{scaleValue(-16)};

                            & p {
                                font-size: #{scaleValue(9)};
                                color: #007994;
                            }
                        }
                    }
                }

             span {
                position: absolute;
                top: 0;
                z-index: 1;
                height: 100%;
                width: 100%;
                display: flex;
                align-items: center;
                color: #fff;
                opacity: .5;
                padding: #{scaleValue(10)}; 
                transition: all .2s ease;
                opacity: 1;
                top: #{scaleValue(-16)};

                & p {
                    font-weight: 300;
                    display: inline-block;
                    transition: all .2s ease;
                    font-size: #{scaleValue(9)};
                    color: #007994;

                    @media only screen and (max-width: 414px) { 
                        font-size: #{scaleValue(79)}; 
                    } 
                }
            }
          }
        }
    }

    &__containernamearea {
        display: flex;
        justify-content: space-between;
    }

    &__containernameareaname {
        position: relative;
        flex-basis: #{scaleValue(240)};

        @media only screen and (max-width: 414px) { 
            flex-basis: #{scaleValue(680)}; 
        } 
    }

    &__already {

        & span {
            display: flex;
            justify-content: center;
            margin-top: #{scaleValue(28)}; 

            @media only screen and (max-width: 414px) { 
                 margin-top: #{scaleValue(340)}; 
            } 

            & p {
                margin-right: #{scaleValue(10)}; 
            }

            & a {
                text-decoration: none;
                color: #007994;
                cursor: pointer;
            }
        }
    }
}

label.error {
    position: absolute;
    display: block;
    left: 0;
    bottom: #{scaleValue(-36)};
    padding-left: #{scaleValue(10)};
    color: red;
    text-transform: capitalize;
    font-size: #{scaleValue(13)};

    @media only screen and (max-width: 414px) { 
       display: none;
    } 

    &.terms {
        bottom: #{scaleValue(-18)};
    }
}

.loading {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    background: rgba(#007994, .3) !important;

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
</style>