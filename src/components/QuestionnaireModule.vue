<template>
  <v-container class="questionnaire-module">
    <div class="questionnaire-module__content">
      <h1 v-html="title" class="questionnaire-module__title font-weight-light"></h1>
      <v-form class="questionnaire-module__form">
        <div v-for="(question, index) in formdata" :key="`question${index}`">
          <v-text-field
            required
            :label="question.body"
            v-if="question.type !== 'select'"
            :type="question.type"
            :name="question.name"
            :id="question.id"
            :disabled="sending"
          >
          </v-text-field>
          <v-select
            v-if="question.type == 'select'"
            :items="question.options"
            :label="question.body"
            :disabled="sending"
            :id="question.id"
          ></v-select>
        </div>
        <div class="questionnaire-module__btn-container">
          <v-btn
            large
            block
            tile
            class="cta-button cta-button--primary"
            type="submit"
            :disabled="sending"
          >Submit</v-btn>
        </div>
      </v-form>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'QuestionnaireModule',
  mounted(){ console.log('this', this)},
  props: {
    title: String,
    formdata: {
      type: Array,
      required: true,
    },
  },
}
</script>
