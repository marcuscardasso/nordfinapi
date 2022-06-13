<template>
    <div>
        <div class="contact">
            <div class="contact__container">
                <div class="contact__top">
                <h1>Contact us</h1>
                <p>Someone from SwissNordic will reach back to you as soon as possible</p>
                </div>
            <div class="contact__base">
                <form class="contact__form">
                    <div class="contact__formarea">
                        <div class="contact__formarea--label">
                            <span>Name</span>
                            <span>*</span>
                        </div>
                        <div class="contact__formarea--input">
                            <input type="email" v-model="name"/>
                        </div>
                    </div>
                    <div class="contact__formarea">
                        <div class="contact__formarea--label">
                            <span>Email</span>
                            <span>*</span>
                        </div>
                        <div class="contact__formarea--input">
                            <input type="email" v-model="email"/>
                        </div>
                    </div>
                    <div class="contact__formarea">
                        <div class="contact__formarea--label">
                            <span>Message</span>
                            <span>*</span>
                        </div>
                        <div class="contact__formarea--input">
                            <textarea type="email" v-model="message"/>
                        </div>
                    </div>
                    <div class="contact__submit">
                        <button>Submit</button>
                    </div>
                    <p class="contact__warn">Never submit passwords through this form</p>
                </form>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                email: '',
                message: ''
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

  .contact {
      display: flex;
      justify-content: center;
      position: relative;
      padding-bottom: #{scaleValue(40)}; 
      background: #fff;

      &:before {
          content: "";
          position: absolute;
          background: #0A0E17;
          height: #{scaleValue(270)}; 
          width: 100%;
          left: 0;
          top: 0;
      }

      &__container {
          position: relative;
          margin-top: #{scaleValue(200)};
          background: #fff;
          padding: #{scaleValue(40)}; 
          border-radius: 1rem;
          -webkit-box-shadow: 0 0 7px 0 rgba(0, 0, 0, .09);
          -moz-box-shadow: 0 0 7px 0 rgba(0, 0, 0, .09);
          -ms-box-shadow: 0 0 7px 0 rgba(0, 0, 0, .09);
          box-shadow: 0 0 7px 0 rgba(0, 0, 0, .09);

          @media only screen and (max-width: 414px) { 
             padding: #{scaleValue(200)} #{scaleValue(40)}; 
          }
      }

      &__top {
          margin-bottom: #{scaleValue(44)}; 

        @media only screen and (max-width: 414px) {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
          }

            & h1 {
                position: relative;
                color: #4d4d4d;
                font-weight: 500;
                text-transform: capitalize;
                font-size: #{scaleValue(26)};
                letter-spacing: #{scaleValue(2)};
                width: fit-content;
                text-align: center;
                margin-bottom: #{scaleValue(5)};

                @media only screen and (max-width: 414px) { 
                    font-size: #{scaleValue(90)};
                    font-weight: 500;
                    margin-bottom: #{scaleValue(40)}; 
                } 
            }

            & p {
                line-height: #{scaleValue(30)};
                font-size: #{scaleValue(17)};
                font-weight: 500;
                color: #4d4d4d;

                @media only screen and (max-width: 414px) { 
                    text-align: center;
                    font-size: #{scaleValue(67)};
                    line-height: #{scaleValue(90)};
                    font-weight: 300;
                }
            }
      }

      &__form {

          @media only screen and (max-width: 414px) {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
          }
      }

      &__formarea {
          width: #{scaleValue(600)};
          margin-bottom: #{scaleValue(40)};

          @media only screen and (max-width: 414px) { 
            width: #{scaleValue(1400)};
            margin-bottom: #{scaleValue(130)};
          }

          &--input {

              & input {
                  width: 100%;
                  height: #{scaleValue(40)};
                  border: 2px solid rgba(0,0,0,0.1);
                  border-radius: 5px;
                  padding: #{scaleValue(15)};
                  font-size: #{scaleValue(17)};

                  @media only screen and (max-width: 414px) { 
                    padding: #{scaleValue(60)};
                    min-height: #{scaleValue(200)};
                    font-size: #{scaleValue(80)};
                  }
              }

              & textarea {
                  width: 100%;
                  min-height: #{scaleValue(150)};
                  border: 2px solid rgba(0,0,0,0.1);
                  border-radius: 5px;
                  padding: #{scaleValue(15)};
                  font-size: #{scaleValue(17)};

                  @media only screen and (max-width: 414px) { 
                    padding: #{scaleValue(60)};
                    min-height: #{scaleValue(900)};
                    font-size: #{scaleValue(80)};
                  }
              }
          }

          &--label {
              margin-bottom: #{scaleValue(15)};
              color: #4d4d4d;

              @media only screen and (max-width: 414px) { 
                    margin-bottom: #{scaleValue(60)};
                    display: flex;
                    align-items: center;
                }

              & span {
                  display: inline-block;

                  &:nth-child(2) {
                      color: red;
                      font-size: #{scaleValue(17)};

                      @media only screen and (max-width: 414px) { 
                            font-size: #{scaleValue(100)};
                            margin-left: #{scaleValue(17)};
                      }
                  }
              }
          }
      }

      &__submit {

         @media only screen and (max-width: 414px) {
             align-self: baseline;
             padding-left: #{scaleValue(70)};
         }

          & button {
              border-radius: 6px;
              background: #2d7ff9;
              color: #fff;
              padding: #{scaleValue(10)} #{scaleValue(30)};
              outline: none;
              border: none;
              font-size: #{scaleValue(17)};
              cursor: pointer;

             @media only screen and (max-width: 414px) {
                font-size: #{scaleValue(80)};
                padding: #{scaleValue(40)} #{scaleValue(80)};
             }
          }
      }

      &__warn {
                line-height: #{scaleValue(30)};
                font-size: #{scaleValue(10)};
                font-weight: 500;
                opacity: .5;

                @media only screen and (max-width: 414px) { 
                    line-height: #{scaleValue(90)};
                    font-weight: 300;
                    align-self: baseline;
                    padding-left: #{scaleValue(70)};
                    font-size: #{scaleValue(40)};
                }
            }
  }
</style>