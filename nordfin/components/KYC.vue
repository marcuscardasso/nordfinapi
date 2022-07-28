<template>
  <div class="kyc">
    <p class="kyc__text">Due to EU and North American monetery regulation our users are now required to upload full KYC details in order to fully engage decentralized trades and features</p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@function scaleValue($value) {
    @return calc(
      #{$value} * (clamp(350px, 100vw, 3840px) / var(--ideal-viewport-width));
    );
}

.kyc {
    background: #ed0e0e;
    color: #fff;
    //position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: #{scaleValue(70)};
    padding-top: #{scaleValue(20)};
    z-index: 10;
    text-align: center;
}
</style>
