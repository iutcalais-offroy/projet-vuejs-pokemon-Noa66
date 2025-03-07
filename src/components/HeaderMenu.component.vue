<template>
  <div>
    <n-menu :options="menuOptions" mode="horizontal" />
    <n-modal v-model:show="showLoginModal" preset="card" title="Connexion / Inscription">
      <LoginPage @close="showLoginModal = false" />
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import LoginPage from './Login.component.vue';

const router = useRouter();
const showLoginModal = ref(false);

const menuOptions = computed(() => [
  {
    label: 'DeckBuilder',
    key: 'deck-builder',
    onClick: () => {
      router.push('/deck-builder');
    }
  },
  {
    label: 'Mes Decks',
    key: 'deck-collection',
    onClick: () => {
      router.push('/deck-collection');
    }
  },
  {
    label: 'Login',
    key: 'login',
    onClick: () => {
      showLoginModal.value = true;
    }
  }
]);
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}
</style>