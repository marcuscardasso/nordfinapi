<template>
    <div>
        <div class="signin">
            <header class="signin__header" @click="moveToRoute('/')">
                <p>SwissNordic Financials</p>
            </header>
            <div class="signin__container">
                <div class="signin__container--top">
                    <h1>Login to your account</h1>
                </div>
                <div class="signin__containerform">
                    <div class="signin__containerformarea">
                        <span>
                            <input type="email" placeholder=" " v-model="email"/>
                            <span>
                                <p>Email</p>
                            </span>
                            <label v-if="email_error" class="error">{{email_error ? `*${email_error}` : ''}}</label>
                            <label v-if="api_error_auth" class="error">{{api_error_auth ? `*${api_error_auth}` : ''}}</label>
                        </span>
                    </div>
                    <div class="signin__containerformarea">
                        <span>
                            <input type="password" placeholder=" " v-model="password"/>
                            <span>
                                <p>Password</p>
                            </span>
                            <label v-if="password_error" class="error">{{password_error ? `*${password_error}` : ''}}</label>
                            <label v-if="api_error_auth" class="error">{{api_error_auth ? `*${api_error_auth}` : ''}}</label>
                        </span>
                    </div>
                    <div class="signin__containerform--button">
                        <button v-if="!loading" @click="signin">Login</button>
                        <button v-if="loading" class="loading"></button>
                    </div>
                </div>
            </div>
            <div class="signin__already">
                <span>
                    <p>Don't have an account?</p>
                    <router-link to="/signup">Sign up</router-link>
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
                email: '',
                password: '',
                email_error: false,
                password_error: false,
                loading: false,
                api_error_auth: false
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
                .then(response => response.json()) 
                .then(json => {
                    if (json.error) {
                        this.loading = false;
                        this.api_error_auth = 'wrong email or password';

                        fetch(`${this.baseUrl}/api/authmiti`, {
                            method: "POST",
                            body: JSON.stringify(credentials),
                            headers: {"Content-type": "application/json; charset=UTF-8"}
                        }).then(response => response.json())
                        .then((json) => {
                            console.log(json);
                        }).catch(err => {
                            console.log(err)
                        });

                        throw 'there is an error here';
                    } else {
                        this.loading = true;
                        const user = json.user;
                        const token = json.token;
                        this.setUser(user, token)
                    }
                })
                .then(() => {
                    this.$router.push('/wallet');
                })
                .catch(err => console.log(err, 'error here'));
            },              
            moveToRoute(route) {
                this.$router.push(route)
            },
            signin() {
                console.log('triggered')
                const {
                    email, 
                    password
                } = this;

                const credentials = {
                    email,
                    password,
                }

                if (!email.length) {
                    this.email_error = 'email required';
                }

                if (!password.length) {
                    this.password_error = 'password required';
                }

                const {
                    email_error,
                    password_error
                } = this;

                if (!email_error && !password_error) {
                    console.log('requesting')
                    this.authenticate(credentials, 'api/signin');
                }
            }
        },
        watch: {
            email(newValue, oldValue) {
                EmailValidator.validate(newValue) ? this.email_error = false : this.email_error = 'email is invalid';
                this.api_error_auth = false
            },
            password() {
                this.password_error = false;
                this.api_error_auth = false;
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

.signin {
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
        cursor: pointer;

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
            font-size: #{scaleValue(13)};
            margin-bottom: #{scaleValue(20)}; 
            margin-top: #{scaleValue(40)}; 
            display: flex;
            align-items: center;

            @media only screen and (max-width: 414px) { 
                font-size: #{scaleValue(65)};
                margin-bottom: #{scaleValue(70)}; 
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