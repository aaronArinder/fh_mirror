<template>
  <div class="home">
    <Questionnaire />
  </div>
</template>

<script>
// @ is an alias to /src
import Questionnaire from '@/components/Questionnaire.vue'

export default {
  name: 'home',
  components: {
    Questionnaire
  }
}
</script>
