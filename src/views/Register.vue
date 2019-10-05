<template>
  <v-container fluid ma-0 pa-0 fill-height>
    <RegistrationModule />
  </v-container>
</template>

<script>
// @ is an alias to /src
import RegistrationModule from '@/components/RegistrationModule.vue'

export default {
  name: 'register',
  components: {
   RegistrationModule
  }
}
</script>
