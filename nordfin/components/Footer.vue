<template>
  <div class="footer">
    <div class="footer__left">
      <h2 class="footer__left--h2">SwissNordic Financials</h2>
      <p class="footer__left--p">Tether supports and empowers growing ventures and innovation as a digital token built on multiple blockchains.</p>
    </div>
    <div class="footer__right">
      <div class="footer__rightarea">
        <h5>SwissNordic</h5>
        <p>Why SwissNordic</p>
        <p>Fees</p>
      </div>
      <div class="footer__rightarea">
        <h5>Solutions</h5>
        <p>For Individuals</p>
        <p>For Businesses</p>
        <p>For Merchants</p>
      </div>
      <div class="footer__rightarea">
        <h5>Contact</h5>
        <p>FAQs</p>
        <p>Whitepaper</p>
      </div>
     <!-- <div class="footer__rightarea">
        <h5>Products</h5>
        <p>Tokens</p>
        <p>Partners</p>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@function scaleValue($value) {
    @return calc(
      #{$value} * (clamp(350px, 100vw, 3840px) / var(--ideal-viewport-width))
    );
}

.footer {
  display: flex;
  background: #0d0d0d;
  padding: #{scaleValue(100)} #{scaleValue(180)};
  background: #232325;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 414px) { 
      padding: #{scaleValue(250)} #{scaleValue(180)};
      padding-bottom: #{scaleValue(100)};
      flex-direction: column;
      align-items: baseline;
  }

  &__left {
    flex-basis: #{scaleValue(550)} ;

    @media only screen and (max-width: 414px) { 
        margin-bottom: #{scaleValue(220)};
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

    &--p {
      font-size: #{scaleValue(20)};
      line-height: #{scaleValue(30)};

      @media only screen and (max-width: 414px) { 
        font-size: #{scaleValue(80)};
        line-height: #{scaleValue(120)};
      }
    }
  }

  &__right {
    display: flex;
    justify-content: space-between;
    flex-basis: #{scaleValue(600)};
    flex-wrap: wrap;

    @media only screen and (max-width: 414px) { 
      display: block;
  }
  }

  &__rightarea {
    flex-basis: #{scaleValue(160)};
    margin-bottom: #{scaleValue(50)};

    @media only screen and (max-width: 414px) { 
        margin-bottom: #{scaleValue(200)};
    }

    & h5 {
      font-size: #{scaleValue(20)};
      line-height: #{scaleValue(50)};
      font-weight: 500;
      margin-bottom: #{scaleValue(20)};
      color: #C0A161;

      @media only screen and (max-width: 414px) { 
        font-size: #{scaleValue(90)};
        line-height: #{scaleValue(100)};
        margin-bottom: #{scaleValue(120)};
      }    
    }

    & p {
       font-size: #{scaleValue(17)};
       margin-bottom: #{scaleValue(20)};
       cursor: pointer;

       @media only screen and (max-width: 414px) { 
        font-size: #{scaleValue(80)};
        line-height: #{scaleValue(100)};
        margin-bottom: #{scaleValue(50)};
      }
    }
  }
}
</style>
