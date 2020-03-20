# Vue Offline

This library allows you to enhance offline capabilities of your Vue.js application. It's especially useful when you're building offline-first Progressive Web Apps or just want to inform your users that they lost internet connection. 

**TL;DR** Adds `isOnline` `isOffline` data properties, `online`, `offline` events via global mixin and enables offline storage via `Vue.$offlineStorage` based on Local Storage

- [Installation](#installation)
- [Capabilities](#capabilities)
    - [VueOfflineMixin](#vueofflinemixin)
    - [VueOfflineStorage](#vueofflinestorage)

Initially made for [Vue Storefront](https://github.com/DivanteLtd/vue-storefront)

## Installation
To install this package as a plugin just type:
````
npm install vue-offline --save
````

and add it into your application with
````js
import VueOffline from 'vue-offline'

Vue.use(VueOffline)
````

## Capabilities
This plugin contains two features:

### VueOfflineMixin
Global mixin that'll add following properties to every component in your application:

- `isOnline` & `isOffline` data properties
````html
<template>
    <p v-if="isOnline">This part will be visible only if user is online</p>
    <p v-if="isOffline">This part will be visible only if user is offline</p>
</template>
````
````js
export default {
    name: 'MyComponent',
    computed: {
        networkStatus () {
            return this.isOnline ? 'My network is fine' : 'I am offline'
        }
    }
}
````
- `online` and `offline` events in every component
````js
export default {
    name: 'MyComponent',
    mounted () {
        this.$on('offline', () => {
            alert('You are offline! The website will not work')
        })
    }
}
````

### Additional configuration

By default `VueOfflineMixin` is injected into every component which may be a cause of potential performance problems. You can disable this behavior by setting plugin option `mixin` to `false`. 
````js
Vue.use(VueOffline, {
    mixin: false
})
````

You can still make use of `VueOfflineMixin` by injecting it directly into your components:
````js 
import { VueOfflineMixin } from 'vue-offline'

export default {
    name: 'MyComponent',
    mixins: [VueOfflineMixin],
    computed: {
        networkStatus () {
            return this.isOnline ? 'My network is fine' : 'I am offline'
        }
    },
    mounted () {
        this.$on('offline', () => {
            alert('You are offline! The website will not work')
        })
    }
}
````
### VueOfflineStorage 
 Offline storage that uses [local storage](https://developer.mozilla.org/pl/docs/Web/API/Window/localStorage) to persist data for offline usage and caching. It's a perfect choice for offline-first PWA. You can use it as a fallback for failed network requests or a local cache. 

The storage object has following properties: 
- `set(key, value)` - puts (or updates if already exists) `value` into storage under key `key`.
- `get(key)` - returns value stored under key `key`
- `keys` - return array of keys existing in your offline storage

To use this storage inside your app you can either
-  use `this.$offlineStorage` from Vue instance property in your components:
````js
export default {
    methods: {
        getUserData () {
            if (this.isOnline) {
                // make network request that returns 'userData' object
                this.appData = userData
                this.$offlineStorage.set('user', userData)
            } else {
                this.appData = this.$offlineStorage.get('user')
            }
        }
    }
}
````
- import the `VueOfflineStorage` instance if you want to use it somewhere else (e.g. Vuex store)
````js
import { VueOfflineStorage } from 'vue-offline'

const cachedData = VueOfflineStorage.get('cached-data')

````
### Additional configuration

By default `VueofflineStorage` reference is included into every Vue component. You can disable this behavior by setting plugin option `storage` to `false`. 
````js
Vue.use(VueOffline, {
    storage: false
})
````

You can still make use of `VueOfflineStorage` by importing it directly into your components:
````js 
import { VueOfflineStorage } from 'vue-offline'

export default {
    name: 'MyComponent',
    methods: {
        getUserData () {
            if (this.isOnline) {
                // make network request that returns 'userData' object
                this.appData = userData
                VueOfflineStorage.set('user', userData)
            } else {
                this.appData = VueOfflineStorage.get('user')
            }
        }
    }
}
````
