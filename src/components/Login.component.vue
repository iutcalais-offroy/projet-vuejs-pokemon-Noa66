<template>
    <div class="login-page">
      <n-card title="Connexion / Inscription">
        <n-tabs type="line" v-model:value="activeTab">
          <n-tab-pane name="login" tab="Connexion">
            <n-form @submit.prevent="login">
              <n-input v-model="loginForm.email" placeholder="Email" type="email" required />
              <n-input v-model="loginForm.password" placeholder="Mot de passe" type="password" required />
              <n-button type="primary" block @click="login">Se connecter</n-button>
            </n-form>
          </n-tab-pane>
  
          <n-tab-pane name="register" tab="Inscription">
            <n-form @submit.prevent="register">
              <n-input v-model="registerForm.email" placeholder="Email" type="email" required />
              <n-input v-model="registerForm.password" placeholder="Mot de passe" type="password" required />
              <n-input v-model="registerForm.confirmPassword" placeholder="Confirmer le mot de passe" type="password" required />
              <n-button type="primary" block @click="register">S'inscrire</n-button>
            </n-form>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const activeTab = ref('login');
  
  const loginForm = ref({
    email: '',
    password: ''
  });
  
  const registerForm = ref({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const login = async () => {
    console.log('Connexion avec', loginForm.value);
    const fakeToken = '123456abcdef';
    const fakeUserId = 'user_001';
    localStorage.setItem('token', fakeToken);
    localStorage.setItem('userId', fakeUserId);
    router.push('/deck-builder');
  };
  
  const register = () => {
    if (registerForm.value.password !== registerForm.value.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    console.log('Inscription avec', registerForm.value);
    activeTab.value = 'login';
  };
  </script>
  
  <style scoped>
  .login-page {
    max-width: 400px;
    margin: auto;
    padding: 20px;
  }
  </style>
  