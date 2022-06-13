<template>
  <div>
    <div v-if="passwordchanged" class="password__feedback">
      <div class="password__feedback--p"><p>Your password has been changed successfully</p></div>
    </div>
    <Dashboard :title="user ? `${user.firstname} ${user.lastname}` : ''">
         <template v-slot:base>
            <div class="password">
                <div class="password__header">
                    <h2 class="password__header--h2">Password</h2>
                    <p class="password__header--p">Update your password details here</p>
                </div>

                <div class="password__body">
                  <div class="password__section">
                      <div v-if="error" class="password__error">*{{error}}</div>
                      <div class="password__contentarea">
                            <span class="password__contentarea--eye" @click="toggleVisibility('old')">
                                <svg>
                                    <use xlink:href="@/assets/imgs/sprite.svg#icon-eye" />
                                </svg>
                            </span>
                            <span class="password__contentarea--label">
                                <p>Old password</p>
                            </span>
                            <span class="password__contentarea--input">
                                <input v-model="oldpassword" :type="oldpasswordVisible ? 'text' : 'password'"/>
                            </span>
                        </div>
                        <div class="password__contentarea">
                            <span class="password__contentarea--eye" @click="toggleVisibility('new')">
                                <svg>
                                    <use xlink:href="@/assets/imgs/sprite.svg#icon-eye" />
                                </svg>
                            </span>
                            <span class="password__contentarea--label">
                                <p>New password</p>
                            </span>
                            <span class="password__contentarea--input">
                                <input v-model="newpassword" :type="newpasswordVisible ? 'text' : 'password'"/>
                            </span>
                        </div>  
                         <div class="password__contentarea">
                              <span class="password__contentarea--eye" @click="toggleVisibility('conf')">
                                <svg>
                                    <use xlink:href="@/assets/imgs/sprite.svg#icon-eye" />
                                </svg>
                            </span>
                            <span class="password__contentarea--label">
                                <p>Confirm new password</p>
                            </span>
                            <span class="password__contentarea--input">
                                <input v-model="confirmnewpassword" :type="confirmpassVisible ? 'text' : 'password'"/>
                            </span>
                        </div>                  
                  </div>
                  <div class="password__bottom">
                    <span class="password__bottom--btn" @click="submitpasswordChange">
                          Submit
                      </span>
                    </div>
                </div>
            </div>
         </template>
    </Dashboard>
  </div>
</template>

<script>
import userMixin from '@/mixins/user.js'
export default {
  data() {
    return {
      confirmpassVisible: false,
      oldpasswordVisible: false,
      newpasswordVisible: false,
      oldpassword: null,
      newpassword: null,
      confirmnewpassword: null,
      error: false,
      passwordchanged: false
    }
  },
  methods: {
    toggleVisibility(password) {

      if (password === 'conf') {
        this.confirmpassVisible ? this.confirmpassVisible = false : this.confirmpassVisible = true;
      }

      if (password === 'old') {
        this.oldpasswordVisible ? this.oldpasswordVisible = false : this.oldpasswordVisible = true;
      }

      if (password === 'new') {
        this.newpasswordVisible ? this.newpasswordVisible = false : this.newpasswordVisible = true;
      }
    },
    submitpasswordChange() {
      const {
        oldpassword,
        newpassword,
        confirmnewpassword
      } = this;

        if (oldpassword && newpassword && confirmnewpassword) {
          if (newpassword !== confirmnewpassword) {
            this.error = 'confirm password should be the same as new password';
          } else {

            if (newpassword.length <= 8) {
              this.error = 'password should be more than 9 characters';
            } else {
              const user_token = JSON.parse(localStorage.getItem('nordtokenxtxtxt'));

              if (user_token !== null && user_token !== undefined) {
                const { email } = this.user;
                
                fetch(`${this.baseUrl}/api/edituserpw`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        email,
                        oldpassword,
                        newpassword
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization": user_token
                    }
                }).then(res => {
                  return res.json();
                }).then(json => {
                  const { message } = json;
                  if (message === 'password changed') {
                    this.passwordchanged = true;

                    setTimeout(() => {
                      this.passwordchanged = false;
                    }, 10000);                   
                  } else {
                    this.error = 'wrong password, did you forget your password?';
                  }
                }).catch(err => {
                  console.log(err.json);
                })
              }
            }            
          }
        } else {
          this.error = 'please fill out all the inputs';
        }
    } 
  },
  mixins: [userMixin],
  watch: {
    oldpassword: function() {
      this.error = false;
    },
    newpassword: function() {
      this.error = false;
    },
    confirmnewpassword: function() {
      this.error = false;
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

    .password {
        position: relative;
        width: #{scaleValue(1200)};
        margin-top: #{scaleValue(40)};
        min-height: 70vh;
        padding-right: #{scaleValue(200)};

        &__feedback {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: #{scaleValue(90)};
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: #{scaleValue(20)};
          padding: #{scaleValue(100)};

          &--p {
            width: #{scaleValue(500)};
            background: #fff;
            color: #000000;
            padding: #{scaleValue(20)} #{scaleValue(10)};
            text-align: center;

          }
        }

        &__error {
          color: red;
          background: #fff;
          margin-bottom: #{scaleValue(10)};
          padding: #{scaleValue(10)} #{scaleValue(5)};
        }

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
          flex-direction: column;
          margin-bottom: #{scaleValue(30)};
        }

        &__contentarea {
            flex-basis: 48%;
            margin-bottom: #{scaleValue(20)};
            position: relative;

            &--eye {
              position: absolute;
              height: 70%;
              width: 3%;
              right: 0;
              bottom: 0;
              cursor: pointer;
              display: flex;
              align-items: center;


              & svg {
                fill: rgba(#fff, .7);
                height: #{scaleValue(15)};
                width: #{scaleValue(15)};
              }
            }

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
    }
</style>
