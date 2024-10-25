<template>
    <v-footer
        class="border text-center d-flex flex-column"
      >
        <div class="mb-4 mt-2">
          <v-btn
            icon="mdi-facebook"
            class="bg-blue-darken-3 mx-4"
            variant="text"
          ></v-btn>
          <v-btn
            icon="mdi-twitter"
            class="bg-blue mx-4"
            variant="text"
          ></v-btn>
          <v-btn
            icon="mdi-linkedin"
            class="bg-blue-darken-1 mx-4"
            variant="text"
          ></v-btn>
          <v-btn
            icon="mdi-instagram"
            class="bg-purple-lighten-1 mx-4"
            variant="text"
          ></v-btn>
        </div>

        <div class="pt-2">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit
        </div>

        <v-divider class="my-4"></v-divider>

        <div>
          {{ new Date().getFullYear() }} — <strong>Meu App</strong>
        </div>
      </v-footer>
</template>