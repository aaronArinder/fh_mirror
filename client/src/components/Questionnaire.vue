<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Questionnaire</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('firstName')">
                <label for="first-name">How often was your child exposed to conflict between you and the other parent?</label>

                <md-select v-model="movies" name="movies" id="movies" md-dense multiple>
                  <md-option value="fight-club">Fight Club</md-option>
                  <md-option value="godfather">Godfather</md-option>
                  <md-option value="godfather-ii">Godfather II</md-option>
                  <md-option value="godfather-iii">Godfather III</md-option>
                  <md-option value="godfellas">Godfellas</md-option>
                  <md-option value="pulp-fiction">Pulp Fiction</md-option>
                  <md-option value="scarface">Scarface</md-option>
                </md-select>

                <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
              </md-field>
            </div>
          </div>


        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Submit</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  minLength,
  maxLength,
} from 'vuelidate/lib/validators'

export default {
  name: 'questionnaire',
  mixins: [validationMixin],
  data: () => ({
    questionnaire: {
      q1: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null,
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
  //props: {
  //  msg: String,
  //},
  methods: {
    //sendStuff() {
    //  this.$store.dispatch('updateHowdy', 'purple');
    //}
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
  //computed: {
  //  howdy() {
  //    return this.$store.state.howdy;
  //  }
  //},

  //data() {
  //  return {
  //    firstName: '',
  //    lastName: '',
  //  }
  //}
}
</script>

<style scoped lang="scss">

  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

questions {
  text-align: center;
  display: inline;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

