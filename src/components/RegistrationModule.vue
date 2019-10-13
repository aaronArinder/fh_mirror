<template>
  <v-container class="registration-module">
    <v-layout
      align-center
      justify-center>

      <v-flex
        xs12
        sm8
        md7>
        <v-card class="elevation-12" tile>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Sign Up</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <!-- return false; to prevent query params being added. Surely there's a better
              way to do this, but this is a nice stopgap for keeping passwords, etc., _out_
              of the url

              Talked to Frank about this; apparently we can use a callback with @click to
              avoid it?
            -->
            <v-form class="registration-module__form" onsubmit="return false;">
              <div v-for="(question, index) in this.newUserRegistration" :key="`question${index}`">
                <v-text-field
                  required
                  autocomplete="question.auto-complete"
                  v-model="question.model"
                  v-if="question.type !== 'select'"
                  :label="question.body"
                  :type="question.type"
                  :name="question.name"
                  :id="question.id"
                  :disabled="sending"
                >
                </v-text-field>
                <v-select
                  required
                  v-if="question.type == 'select'"
                  :items="question.options"
                  :label="question.body"
                  :disabled="sending"
                  :id="question.id"
                ></v-select>
              </div>

              <v-card-actions>
                <v-btn
                  large
                  block
                  tile
                  @click="postNewUserRegistration"
                  class="cta-button cta-button--primary"
                  type="submit"
                >Register</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import mockQuestions from '../mock-data/registration'
import {
  required,
  email,
  minLength,
  maxLength,
} from 'vuelidate/lib/validators'

export default {
  name: 'RegistrationModule',
  mixins: [validationMixin],
  created () {
    this.$store.dispatch({type: 'getNewRegForm'});
  },
  computed: {
    newUserRegistration () {
      return this.$store.state.forms.newUserRegistration;
    },
  },
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

    postNewUserRegistration () {
      const dispatchParams = {
        type: 'axiosPOST',
        url: '/register',
        payload: this.newUserRegistration
      };

      this.$store.dispatch(dispatchParams);
    }

    // TODO: bring back validation

    //getValidationClass (fieldName) {
    //  const field = this.$v.form[fieldName];
    //  if (field) return { 'md-invalid':  field.$invalid && field.$dirty };
    //},

    //validateUser () {
    //  this.$v.$touch()
    //  if (!this.$v.$invalid) {
    //    this.saveUser()
    //  }
    //}

  },
}
</script>
