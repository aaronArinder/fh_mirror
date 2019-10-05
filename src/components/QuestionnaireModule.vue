<template>
  <v-container class="questionnaire-module">
    <div class="questionnaire-module__content">
      <h1 v-html="mockQuestions.title" class="questionnaire-module__title font-weight-light"></h1>
      <v-form class="questionnaire-module__form">
        <div v-for="(question, index) in mockQuestions.questions" :key="`question${index}`">
          <v-text-field
            required
            :label="question.question"
            v-if="question.type !== 'select'"
            :type="question.type"
            :name="question.question"
            :id="question.question_id"
            :disabled="sending"
          >
          </v-text-field>
          <v-select
            v-if="question.type == 'select'"
            :items="question.options"
            :label="question.question"
            :disabled="sending"
            :id="question.question_id"
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
import { validationMixin } from 'vuelidate'
import mockQuestions from '../mock-data/new-user'
import {
  required,
  email,
  minLength,
  maxLength,
} from 'vuelidate/lib/validators'

export default {
  name: 'QuestionnaireModule',
  mixins: [validationMixin],
  data: () => ({
    form: {
      firstName: null,
      lastName: null,
      gender: null,
      age: null,
      email: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null,
    mockQuestions: mockQuestions
  }),
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3),
      },
      lastName: {
        required,
        minLength: minLength(3),
      },
      age: {
        required,
        maxLength: maxLength(3),
      },
      gender: {
        required,
      },
      email: {
        required,
        email,
      }
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName];
      if (field) return { 'md-invalid':  field.$invalid && field.$dirty };
    },

    clearForm () {
      this.$v.$reset()
      this.form.firstName = null
      this.form.lastName = null
      this.form.age = null
      this.form.gender = null
      this.form.email = null
    },

    saveUser () {
      this.sending = true
      // dummy example: call api/store/whatever
      window.setTimeout(() => {
        this.lastUser = `${this.form.firstName} ${this.form.lastName}`
        this.userSaved = true
        this.sending = false
        this.clearForm()
      }, 1500)
    },

    validateUser () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveUser()
      }
    }
  },
}
</script>
