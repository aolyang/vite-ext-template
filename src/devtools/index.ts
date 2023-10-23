import { createApp } from 'vue'
import App from './DevTools.vue'

browser.devtools.panels.create('VueCrx', '', '../../devtools.html').then(function () {
  console.log('devtools panel create')
})

createApp(App).mount('#app')
