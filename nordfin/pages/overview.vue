<template>
  <div>
    <Dashboard :title="user ? `${user.firstname} ${user.lastname}` : ''">
        <template v-slot:base>
            <div class="overview">
                <div class="overview__header">
                  <h2 class="overview__header--h2">Overview</h2>
                  <p>Your wallet and user activities can be found here</p>
                </div>
                <div class="overview__container">
                  <div class="overview__left"></div>
                  <div class="overview__right"></div>
                </div>
            </div>
        </template>
    </Dashboard>
  </div>
</template>

<script>
import userMixin from '@/mixins/user.js'

import { isBrowser } from "browser-or-node";

export default {
    methods: {
        truncate(input) {
            if (input.length > 10) {
                return input.substring(0, 10) + '...';
            }
            return input;
        },
    },
    mixins: [userMixin],
    computed: {}
}
</script>

<style lang="scss" scoped>
@function scaleValue($value) {
    @return calc(
      #{$value} * (clamp(350px, 100vw, 3840px) / var(--ideal-viewport-width))
    );
}

    .overview {
      
    }
    
</style>
