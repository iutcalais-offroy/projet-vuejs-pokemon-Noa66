<template>
  <div>
    <n-menu :options="menuOptions" mode="horizontal" />
    
    <n-modal v-model:show="showLoginModal" preset="card" title="Connexion / Inscription">
      <LoginPage />
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import LoginPage from './Login.component.vue';

const router = useRouter();
const userStore = useUserStore();
const showLoginModal = ref(false);

const menuOptions = computed(() => {
  const options = [
    {
      label: 'DeckBuilder',
      key: 'deck-builder',
      onClick: () => {
        router.push('/deck-builder');
      },
    },
    {
      label: 'Mes Decks',
      key: 'deck-collection',
      onClick: () => {
        router.push('/deck-collection');
      },
    },
  ];

  if (userStore.isAuthenticated) {
    options.push({
      label: 'Déconnexion',
      key: 'logout',
      onClick: () => {
        userStore.logout();
        router.push('/');
      },
    });
  } else {
    options.push({
      label: 'Login',
      key: 'login',
      onClick: () => {
        showLoginModal.value = true; 
      },
    });
  }

  return options;
});
</script>