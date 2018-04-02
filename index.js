export default {
    install (Vue) {
        const onlineOnlyDirective = {
            inserted: function (el) {
                if (window) {
                    let prevDisplay = el.style.display;
                    window.addEventListener('offline',  () => {
                        prevDisplay = el.style.display
                        el.style.display = 'none'
                      })
                    window.addEventListener('online',  () => {
                        el.style.display = prevDisplay
                    })
                }

            }
        }

        const offlineOnlyDirective = {
            inserted: function (el) {
                if (window) {
                    let prevDisplay = el.style.display;
                    if (navigator.onLine) {
                        el.style.display = 'none'
                    }
                    window.addEventListener('online',  () => {
                        prevDisplay = el.style.display
                        el.style.display = 'none'
                    })
                    window.addEventListener('offline',  () => {
                        el.style.display = prevDisplay
                    })
                }
            }
        }

        const offlineHooksMixin = {
            created () {
                if (window) {
                    window.addEventListener('online',  () => {
                        this.$emit('online')
                    })
                    window.addEventListener('offline',  () => {
                        this.$emit('offline')
                    })
                }
            }
        }
        
        Vue.directive('online', onlineOnlyDirective)
        Vue.directive('offline', offlineOnlyDirective)
        Vue.mixin(offlineHooksMixin)
    }
}
