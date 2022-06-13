<template>
  <div>
    <div class="sectionthree" id="benefits">
        <div class="sectionthree__headers">
            <p class="sectionthree__headers--p">Discover Benefits</p>
            <h2 class="sectionthree__headers--h2">We are at the forefront of financial technology research</h2>
        </div>
        <div class="sectionthree__area">
            <div class="sectionthree__areacard">
                <figure>
                    <img src='@/assets/images/public.svg'/>
                </figure>
                <p class="sectionthree__areacard--p1">Public and Decentralized Structure</p>
                <p class="sectionthree__areacard--p2">Open source, open to anyone to build on, maintained by the community</p>
            </div>
            <div class="sectionthree__areacard">
                <figure>
                    <img src='@/assets/images/reliability.svg'/>
                </figure>
                <p class="sectionthree__areacard--p1">Streamlined Development</p>
                <p class="sectionthree__areacard--p2">Open source, open to anyone to build on, maintained by the community</p>
            </div>
            <div class="sectionthree__areacard">
                <figure>
                    <img src='@/assets/images/streamlined.svg'/>
                </figure>
                <p class="sectionthree__areacard--p1">High Performance</p>
                <p class="sectionthree__areacard--p2">Open source, open to anyone to build on, maintained by the community</p>
            </div>
        </div>
        <div class="sectionthree__area">
            <div class="sectionthree__areacard">
                <figure>
                    <img src='@/assets/images/low-cost.svg'/>
                </figure>
                <p class="sectionthree__areacard--p1">Public and Decentralized Structure</p>
                <p class="sectionthree__areacard--p2">Open source, open to anyone to build on, maintained by the community</p>
            </div>
            <div class="sectionthree__areacard">
                <figure>
                    <img src='@/assets/images/community.svg'/>
                </figure>
                <p class="sectionthree__areacard--p1">Streamlined Development</p>
                <p class="sectionthree__areacard--p2">Open source, open to anyone to build on, maintained by the community</p>
            </div>
            <div class="sectionthree__areacard">
                <figure>
                    <img src='@/assets/images/performance.svg'/>
                </figure>
                <p class="sectionthree__areacard--p1">High Performance</p>
                <p class="sectionthree__areacard--p2">Open source, open to anyone to build on, maintained by the community</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
@function scaleValue($value) {
    @return calc(
      #{$value} * (clamp(350px, 100vw, 3840px) / var(--ideal-viewport-width))
    );
}

  .sectionthree {
        background: #0d0d0d;
        padding: #{scaleValue(100)} #{scaleValue(180)};
        background: #232325;

        @media only screen and (max-width: 414px) { 
            padding: #{scaleValue(250)} #{scaleValue(180)};
            padding-bottom: #{scaleValue(100)};
        }

      &__headers {

          @media only screen and (max-width: 414px) { 
                margin-bottom: #{scaleValue(250)};
          }

          &--p {
              font-size: #{scaleValue(30)};

              @media only screen and (max-width: 414px) { 
                 font-size: #{scaleValue(150)};
                 margin-bottom: #{scaleValue(60)};
              }
          }

            &--h2 {
                font-size: #{scaleValue(40)};
                line-height: #{scaleValue(100)};
                font-weight: 500;

                @media only screen and (max-width: 414px) { 
                    font-size: #{scaleValue(90)};
                    line-height: #{scaleValue(100)};
                    margin-bottom: #{scaleValue(120)};
                }
            }
      }

      &__area {
          display: flex;
          justify-content: space-between;

          @media only screen and (max-width: 414px) { 
            flex-direction: column;
          }
      }

      &__areacard {
            flex-basis: #{scaleValue(290)};
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: #{scaleValue(24)} 0;

            @media only screen and (max-width: 414px) { 
                margin-bottom: #{scaleValue(230)};
            }

            & figure {
                margin-bottom: #{scaleValue(21)};

                @media only screen and (max-width: 414px) { 
                    margin-bottom: #{scaleValue(60)};
                }
            }

            &--p1 {
                opacity: .8;
                font-size: #{scaleValue(21)};
                font-weight: 700;
                margin-bottom: #{scaleValue(21)};

                @media only screen and (max-width: 414px) { 
                 font-size: #{scaleValue(100)};
                 margin-bottom: #{scaleValue(60)};
                }
            }

            &--p2 {
                opacity: .8;
                font-size: #{scaleValue(17)};
                line-height: #{scaleValue(25)};

                @media only screen and (max-width: 414px) { 
                    font-size: #{scaleValue(80)};
                     line-height: #{scaleValue(120)};
                }
            }
      }
  }
</style>
