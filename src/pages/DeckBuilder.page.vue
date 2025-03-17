<template>
  <div class="pokemon-cards">
    <h2>Liste des Cartes Pokémon</h2>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="cards-container">
      <div v-for="card in pokemonCards" :key="card.id" class="card">
        <img :src="card.imageUrl" :alt="card.name" class="card-image" />
        <div class="card-details">
          <h3>{{ card.name }}</h3>
          <p><strong>Pokedex ID:</strong> {{ card.pokedexId }}</p>
          <p><strong>Type:</strong> {{ card.type }}</p>
          <p><strong>PV:</strong> {{ card.lifePoints }}</p>
          <p><strong>Taille:</strong> {{ card.height }}m</p>
          <p><strong>Poids:</strong> {{ card.weight }}kg</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";

interface PokemonCard {
  id: number;
  name: string;
  pokedexId: number;
  type: string;
  imageUrl: string;
  lifePoints: number;
  attackId: number;
  height: number;
  weight: number;
}

const pokemonCards = ref<PokemonCard[]>([]);
const loading = ref(true);
const error = ref("");

const fetchPokemonCards = async () => {
  try {
    const response = await axios.get("https://pokemon-api-seyrinian-production.up.railway.app/pokemon-cards");
    pokemonCards.value = response.data;
  } catch (err) {
    error.value = "Erreur lors du chargement des cartes Pokémon.";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPokemonCards);
</script>

<style scoped>
.pokemon-cards {
  text-align: center;
  padding: 20px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
  border-radius: 10px;
}

.card-details {
  text-align: left;
}

.error {
  color: red;
}
</style>