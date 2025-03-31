<template>
  <div class="login-page">
    <n-card title="Connexion / Inscription">
      <n-tabs type="line" v-model="activeTab">
        <n-tab-pane name="login" tab="Connexion">
          <n-form>
            <n-input v-model="emailLogin" placeholder="Email" type="email" required />
            <n-input v-model="passwordLogin" placeholder="Mot de passe" type="password" required />
            <n-alert v-if="loginError" type="error">{{ loginError }}</n-alert>
            <n-button type="primary" block @click="login">Se connecter</n-button>
          </n-form>
        </n-tab-pane>

        <n-tab-pane name="register" tab="Inscription">
          <n-form>
            <n-input v-model="emailRegister" placeholder="Email" type="email" required />
            <n-input v-model="passwordRegister" placeholder="Mot de passe" type="password" required />
            <n-input v-model="confirmPasswordRegister" placeholder="Confirmer le mot de passe" type="password" required />
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

const emailRegister = ref("");
const passwordRegister = ref("");
const confirmPasswordRegister = ref("");
const emailLogin = ref("");
const passwordLogin = ref("");

const loginError = ref("");
const registerError = ref("");

const register = async () => {
  console.log("Tentative d'inscription avec les données:", {
    email: emailRegister.value,
    password: passwordRegister.value,
  });
  registerError.value = "";

  if (passwordRegister.value !== confirmPasswordRegister.value) {
    registerError.value = "Les mots de passe ne correspondent pas.";
    return;
  }

  try {
    const response = await axios.post("https://pokemon-api-seyrinian-production.up.railway.app/users", {
      email: emailRegister.value,
      password: passwordRegister.value,
    });
    console.log("Inscription réussie", response.data);
    emit("closeModal");
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    registerError.value = "Erreur lors de l'inscription.";
  }
};

const login = async () => {
  console.log("Tentative de connexion avec les données:", {
    email: emailLogin.value,
    password: passwordLogin.value,
  });
  loginError.value = "";
  
  try {
    const response = await axios.post("https://pokemon-api-seyrinian-production.up.railway.app/users/login", {
      email: emailLogin.value,
      password: passwordLogin.value,
    });

    console.log("Connexion réussie", response.data);
    localStorage.setItem("userid", response.data.user.id);
    localStorage.setItem("token", response.data.token);
    emit("closeModal");
    router.push("/deck-builder");
  } catch (error) {
    console.error("Erreur de connexion:", error);
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