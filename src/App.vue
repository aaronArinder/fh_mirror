<template>
  <div id="app">
    <v-app>
      <div>
        <v-toolbar>
          <v-toolbar-title>Family Hope</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn to="/" text>Home</v-btn>
            <v-btn to="/about" text>About</v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </div>
      <v-content>
          <v-row
            align="center"
            justify="center"
            dense
            >
            <v-col>
              <router-view/>
            </v-col>
          </v-row>
      </v-content>
    </v-app>
  </div>
</template>

