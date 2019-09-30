<template>
  <v-container fluid ma-0 pa-0 fill-height>
    <LoginModule />
  </v-container>
</template>

<script>
// @ is an alias to /src
import LoginModule from '@/components/LoginModule.vue'

export default {
  name: 'login',
  components: {
   LoginModule
  }
}
</script>
