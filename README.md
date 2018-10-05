[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Offline/online states for Vue applications

This plugins notifies your application when online/offline status changes and allows to conditionally display components depending on the network status. Supports SSR.

# Installation

 ````
npm install vue-offline --save
````

There are two ways to use this plugin:

<b>Global</b> - if you register the plugin globally all features will be immediately avvailable in all of your components

````js
import Vue from 'vue'
import VueOffline from 'vue-offline'

Vue.use(VueOffline)
````
 <b>Local for specific components </b>- if you need online/offline features only in specific components you can inject them as a mixins. This approach could save a little bit of performance.

Add vue-offline mixin inside components that you want to have features listed below:
````js
import VueOfflineMixin from 'vue-offline/mixin'

export default {
  mixins: [VueOfflineMixin]
}

````


# Features 

* `OnlineOnly` data property available for each component - `true` only when online
* `OfflineOnly` data property available for each component - `true` only when offline
* `online` event - available in every component, emitted when user changes from offline to online
* `offline` event - available in every component, emitted when user changes from online to offline

# Example

````html
<template>
  <div id="app">
    <div v-show="OnlineOnly">This part is visible only when user is online</div>
    <div v-show="OfflineOnly">This part is visible only if user is offline</div>
    <div> {{ onlineState }} </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      onlineState: navigator.onLine
    }
  },
  created () {
    this.$on('online', function () {
      this.onlineState = "I'm online now!" 
    })
    this.$on('offline', function () {
      this.onlineState = "I'm offline now!"
    })
  }
}
</script>
````

Note: I'm using plain ES6 modules and arrow functions. If you want to use this library for older browsers (which are probably not supporting Service Workers so it might be useless) please transpile it.

# Roadmap
- offline storage with service worker generation
