<template>
  <v-layout class="login-module"
          align-center
          justify-center>
    <v-flex
      xs12
      sm8
      md4>
      <v-card class="login-module__card elevation-12" tile>
        <v-toolbar
          color="primary"
          dark
          flat
          class="login-module__toolbar"
        >
          <v-toolbar-title>Login</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
            </template>
            <span>Source</span>
          </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Login"
              name="login"
              prepend-icon="person"
              type="text"
            ></v-text-field>

            <v-text-field
              id="password"
              label="Password"
              name="password"
              prepend-icon="lock"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn class="cta-button cta-button--primary" large block tile>Login</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn class="cta-button cta-button--tertiary" text small >Forgot Password?</v-btn>
          <v-btn tile class="cta-button cta-button--secondary">Sign Up</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>