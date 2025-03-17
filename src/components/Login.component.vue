<template>
  <div class="login-page">
    <n-card title="Connexion / Inscription">
      <n-tabs type="line" v-model="activeTab">
        <n-tab-pane name="login" tab="Connexion">
          <n-form>
            <n-input v-model="loginForm.email" placeholder="Email" type="email" required />
            <n-input v-model="loginForm.password" placeholder="Mot de passe" type="password" required />
            <n-alert v-if="loginError" type="error">{{ loginError }}</n-alert>
            <n-button type="primary" block @click="login">Se connecter</n-button>
          </n-form>
        </n-tab-pane>

        <n-tab-pane name="register" tab="Inscription">
          <n-form>
            <n-input v-model="registerForm.email" placeholder="Email" type="email" required />
            <n-input v-model="registerForm.password" placeholder="Mot de passe" type="password" required />
            <n-input v-model="registerForm.confirmPassword" placeholder="Confirmer le mot de passe" type="password" required />
            <n-alert v-if="registerError" type="error">{{ registerError }}</n-alert>
            <n-button type="primary" block @click="register">S'inscrire</n-button>
          </n-form>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const emit = defineEmits(["closeModal"]);

const router = useRouter();

const activeTab = ref("login");

const loginForm = ref({
  email: "",
  password: "",
});

const registerForm = ref({
  email: "",
  password: "",
  confirmPassword: "",
});

const loginError = ref("");
const registerError = ref("");

const register = async () => {
  console.log("Tentative d'inscription avec les données:", registerForm.value);  // Ajout d'un log
  registerError.value = "";
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    registerError.value = "Les mots de passe ne correspondent pas.";
    return;
  }

  try {
    const response = await axios.post("https://pokemon-api-seyrinian-production.up.railway.app/users", {
      email: registerForm.value.email,
      password: registerForm.value.password,
    });
    console.log("Inscription réussie", response.data);
    emit("closeModal"); 
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);  // Ajout de log pour le débogage
    registerError.value = "Erreur lors de l'inscription.";
  }
};

const login = async () => {
  console.log("Tentative de connexion avec les données:", loginForm.value);  // Ajout d'un log
  loginError.value = "";
  try {
    const response = await axios.post("https://pokemon-api-seyrinian-production.up.railway.app/users/login", {
      email: loginForm.value.email,
      password: loginForm.value.password,
    });

    console.log("Connexion réussie", response.data);
    localStorage.setItem("userid", response.data.user.id);
    localStorage.setItem("token", response.data.token);
    emit("closeModal");
    router.push('/deck-builder');  // Redirection avec Vue Router
  } catch (error) {
    console.error("Erreur de connexion:", error);  // Ajout de log pour le débogage
    loginError.value = "Erreur de connexion. Vérifiez vos identifiants.";
  }
};
</script>


<style scoped>
.login-page {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}
</style>
