module.exports = {
    install (Vue) {
        
        // Legacy, doesn't work as intended
        const onlineOnlyDirective = {
            bind: function (el) {
                let prevDisplay = el.style.display;

                if (window) {
                    if (!navigator.onLine) {
                        el.style.display = 'none'
                    }
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

        // Legacy, doesn't work as intended
        const offlineOnlyDirective = {
            bind: function (el) {
                console.log('binded')
                prevDisplay = el.style.display

                if (window) {
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
            data () {
                return {
                    OfflineOnly: false,
                    OnlineOnly: false
                }
            },
            mounted () {
                if (window) {
                    if (navigator.onLine) {
                        this.OnlineOnly = true
                    } else {
                        this.OfflineOnly = true
                    }
                    window.addEventListener('online',  () => {
                        this.$emit('online')
                        this.OnlineOnly = true
                        this.OfflineOnly = false
                    })
                    window.addEventListener('offline',  () => {
                        this.$emit('offline')
                        this.OfflineOnly = true
                        this.OnlineOnly = false
                    })
                }
            }
        }
        
        Vue.directive('online', onlineOnlyDirective)
        Vue.directive('offline', offlineOnlyDirective)
        Vue.mixin(offlineHooksMixin)
    }
}
