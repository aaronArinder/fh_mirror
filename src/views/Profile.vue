<template>
  <v-container fluid ma-0 pa-0 fill-height>
    <QuestionnaireModule v-if="intakeForm.length" :title="'Intake Form'" :formdata="intakeForm"/>
  </v-container>
</template>

<script>
import QuestionnaireModule from '@/components/QuestionnaireModule.vue'

export default {
  name: 'profile',
  components: {
    QuestionnaireModule,
  },
  created () {
    this.$store.dispatch({ type: 'getForm', payload: { formName: 'intake_form' } });
  },
  computed: {
    intakeForm () {
      return this.$store.state.forms.intake_form;
    },
  },
}
</script>

