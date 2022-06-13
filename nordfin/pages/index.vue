<template>
  <div>
    <div class="main">
      <Header />
      <Jumbotron />
      <div class="main__sections">
        <Photo />
        <SectionTwo />
        <SectionThree />
        <Accounts />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<style lang="scss" scoped>
@function scaleValue($value) {
    @return calc(
      #{$value} * (clamp(350px, 100vw, 3840px) / var(--ideal-viewport-width))
    );
}

  .main {
    
  }
</style>
