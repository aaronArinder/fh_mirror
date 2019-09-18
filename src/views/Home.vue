<template>
  <v-container fluid ma-0 pa-0 fill-height>
    <QuestionnaireModule />
  </v-container>
</template>

<script>
// @ is an alias to /src
import QuestionnaireModule from '@/components/QuestionnaireModule.vue'

export default {
  name: 'home',
  components: {
    QuestionnaireModule
  }
}
</script>
