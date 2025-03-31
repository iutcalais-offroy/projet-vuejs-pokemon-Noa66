<template>
  <div>
    <n-menu :options="menuOptions" mode="horizontal" />
    
    <n-modal v-model:show="showLoginModal" preset="card" title="Connexion / Inscription">
      <LoginPage @closeModal="showLoginModal = false" />
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

const openLoginModal = () => {
  console.log("Ouverture du pop-up");
  showLoginModal.value = true;
  console.log("Valeur de showLoginModal:", showLoginModal.value);
};

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
      onClick: openLoginModal,
    });
  }

  return options;
});
</script>

<style scoped>
.n-modal {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}
</style>
