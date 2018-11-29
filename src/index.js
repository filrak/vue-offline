/* ----------------------- Mixin ------------------------ */

/** This mixin adds:
 * - `isOnline`, `isOffline` data properties
 * - `online`, `offline` in-component events 
 * */
export const VueOfflineMixin = {
  data () {
    return {
      isOnline: false,
      isOffline: false
    }
  },
  mounted () {
    if (typeof window !== undefined) {
      navigator.onLine ? this.isOnline = true : this.isOffline = true
          
        const onlineHandler = () => {
          this.$emit('online')
          this.isOnline = true
          this.isOffline = false
        }

        const offlineHandler = () => {
          this.$emit('offline')
          this.isOffline = true
          this.isOnline = false
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

/* ----------------------- Storage ------------------------ */

function _addKey (newKey) {
  let keys = JSON.parse(localStorage.getItem('VueOfflineStorageKeys')) || []
  if (!keys.includes(newKey)) keys.push(newKey)
  localStorage.setItem('VueOfflineStorageKeys', JSON.stringify(keys))
}

/** Offline storage based on localStorage. You can import it and use standalone or register a plugin */
export const VueOfflineStorage = {
  keys: typeof window !== undefined ? localStorage.getItem('VueOfflineStorageKeys') : null,
  set (key, value) {
    if ( typeof window !== undefined ) {
    localStorage.setItem(key, JSON.stringify(value))
    _addKey(key)
    }
  },
  get (key) {
    return typeof window !== undefined ? JSON.parse(localStorage.getItem(key)) : null
  }
}

/* ----------------------- Plugin ------------------------ */

/** Registers VueOfflineMixin in whole application giving you access to:
 * - isOnline, isOffline data properties
 * - online, offline in-component events
 */
export const VueOfflinePlugin = {
  install (Vue, options = { mixin: true, storage: true }) {
    const pluginOptions = {
      mixin: options.mixin,
      storage: options.storage
    }
    if (pluginOptions.storage) Vue.prototype.$offlineStorage = VueOfflineStorage
    if (pluginOptions.mixin) Vue.mixin(VueOfflineMixin)
  }
}

export default VueOfflinePlugin