<template>
  <div>
    <Dashboard :title="user ? `${user.firstname} ${user.lastname}` : ''">
         <template v-slot:base>
            <div class="userprofile">
                <Profile />
            </div>
         </template>
    </Dashboard>
  </div>
</template>

<script>
import userMixin from '@/mixins/user.js'
export default {
    mixins: [userMixin],
}
</script>

<style lang="scss" scoped>
@function scaleValue($value) {
    @return calc(
      #{$value} * (clamp(350px, 100vw, 3840px) / var(--ideal-viewport-width))
    );
}

    .userprofile {
        width: #{scaleValue(1200)};
        margin-top: #{scaleValue(40)};
    }
</style>
