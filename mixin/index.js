export default {
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
          
          const onlineHandler = () => {
              this.$emit('online')
              this.OnlineOnly = true
              this.OfflineOnly = false
          }

          const offlineHandler = () => {
              this.$emit('offline')
              this.OfflineOnly = true
              this.OnlineOnly = false
          }

          window.addEventListener('online',  onlineHandler)
          window.addEventListener('offline',  offlineHandler)

          this.$once('hook:beforeDestroy', () => {
              window.removeEventListener('online', onlineHandler)
              window.removeEventListener('offline', offlineHandler)
          })
      }
  }
}
