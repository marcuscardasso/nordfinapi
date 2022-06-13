export { default as Accounts } from '../../components/Accounts.vue'
export { default as Card } from '../../components/Card.vue'
export { default as Dashboard } from '../../components/Dashboard.vue'
export { default as DonutChart } from '../../components/DonutChart.vue'
export { default as Footer } from '../../components/Footer.vue'
export { default as Header } from '../../components/Header.vue'
export { default as InputDuplicator } from '../../components/InputDuplicator.vue'
export { default as Jumbotron } from '../../components/Jumbotron.vue'
export { default as Photo } from '../../components/Photo.vue'
export { default as Popup } from '../../components/Popup.vue'
export { default as Profile } from '../../components/Profile.vue'
export { default as SectionThree } from '../../components/SectionThree.vue'
export { default as SectionTwo } from '../../components/SectionTwo.vue'
export { default as Sidenav } from '../../components/Sidenav.vue'
export { default as Transactions } from '../../components/Transactions.vue'
export { default as Tutorial } from '../../components/Tutorial.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
