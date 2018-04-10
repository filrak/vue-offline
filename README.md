[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Offline/online states for Vue applications

This plugins notifies your application when online/offline status changes and allows to conditionally display components depending on the network status. Supports SSR.

# Installation

````
npm install vue-offline --save
````

````js
import Vue from 'vue'
import VueOffline from 'vue-offline'

Vue.use(VueOffline)
````

# Features 

* `OnlineOnly` data property available for each component - shows component only when online
* `OfflineOnly` data property available for each component - shows component only when offline
* `online` event - available in every component, emitted when user changes from offline to online
* `offline` event - available in every component, emitted when user changes from online to offline

# Example

````html
<template>
  <div id="app">
    <div v-show="OnlineOnly">This part is visible only when user is online</div>
    <div v-offline="OfflineOnly">This part is visible only if user is offline</div>
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