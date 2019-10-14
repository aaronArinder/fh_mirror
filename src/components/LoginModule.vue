<template>
  <v-layout
    class="login-module"
    align-center
    justify-center
  >
    <v-flex
      xs12
      sm8
      md4>
      <v-card class="login-module__card elevation-12" tile>
        <v-toolbar
          dark
          flat
          class="login-module__toolbar"
        >
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Login"
              name="login"
              v-model="username"
              prepend-icon="person"
              type="text"
            ></v-text-field>

            <v-text-field
              id="password"
              label="Password"
              v-model="password"
              name="password"
              prepend-icon="lock"
              :type="visible ? 'text' : 'password'"
              :append-icon="visible ? 'visibility_off' : 'visibility'"
              @click:append="() => (visible = !visible)"
            ></v-text-field>
          </v-form>
          <v-card-actions>
            <v-btn
              large
              block
              tile
              class="cta-button cta-button--primary"
              type="submit"
              @click="login"
            >Login</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn
              small
              text
              class="cta-button cta-button--tertiary"
            >Forgot Password?</v-btn>
            <v-btn
              tile
              class="cta-button cta-button--secondary"
              to="/register"
            >Sign Up</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    username: null,
    password: null,
    visible: false
  }),
  methods: {
    login () {
      const payload = {
        username: this.username,
        password: this.password,
      };

      const dispatchParams = {
        type: 'login',
        url: '/login',
        payload,
      };

      this.$store.dispatch(dispatchParams);
    },
  }
}
</script>
