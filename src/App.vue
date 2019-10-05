<template>
  <div id="app">
    <v-app>
      <div>
        <v-toolbar color="#35c3c1">
          <v-toolbar-title class="white--text">Family Hope</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn class="white--text" to="/" text>Home</v-btn>
            <v-btn class="white--text" to="/about" text>About</v-btn>
            <v-btn class="white--text" to="/login" text>Login</v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </div>
      <v-content>
          <v-row
            align="center"
            justify="center"
            dense
            class="fill-height"
            >
            <v-col>
              <router-view/>
            </v-col>
          </v-row>
      </v-content>
    </v-app>
  </div>
</template>

