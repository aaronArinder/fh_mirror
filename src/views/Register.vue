<template>
  <v-container fluid ma-0 pa-0 fill-height>
    <RegistrationModule v-if="newUserForm.length" :formdata="newUserForm"/>
  </v-container>
</template>

<script>
import RegistrationModule from '@/components/RegistrationModule.vue'

export default {
  name: 'register',
  components: {
   RegistrationModule
  },
  created () {
    this.$store.dispatch({ type: 'getForm', payload: { formName: 'new_user_form' } });
  },
  computed: {
    newUserForm () {
      return this.$store.state.forms.new_user_form;
    },
  },
}
</script>
