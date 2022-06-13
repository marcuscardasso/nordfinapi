<template>
    <div>
        <div class="donutchart" id="donut">
            <Component :is="apexchart" width="380" type="donut" :options="options" :series="series"></Component>
        </div>
    </div>
</template>

<script>
import { isBrowser } from "browser-or-node";
    export default {
        data() {
            return {}
        },
        computed: {
            apexchart() {
                if (isBrowser) {
                    return () =>
                    import('vue-apexcharts');
                } else {
                    return 'hjhjhj'
                }                
            },
            options() {
                return {
                    chart: {
                        id: 'donut',
                    },
                    legend: {
                        show: true
                    },
                    labels:['1991', 1992]
                }
            },
            series() {
                return [44, 55]
            }
        }
    }
</script>

<style lang="scss">
  @function scaleValue($value) {
    @return calc(
      #{$value} * (clamp(350px, 100vw, 3840px) / var(--ideal-viewport-width))
    );
  }
    .donutchart {
        
    }

    .apexcharts-legend-text {
        color: #fff !important;
        display: inline-block !important;
        margin-left: #{scaleValue(5)} !important;
        font-weight: 500 !important;
        font-size: #{scaleValue(15)} !important;
    }
</style>