<template>
  <div class="pokemon-deck">
    <h2>Deck ({{ deck.length }} cartes)</h2>
    <div class="deck-container">
      <n-input v-model="deckName" placeholder="Nom du deck..." class="deck-name-input" />
      <n-button type="success" @click="saveDeck">Sauvegarder</n-button>
    </div>
    <div class="cards-container">
      <div v-for="card in deck" :key="card.id" class="card" @click="removeFromDeck(card)">
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
    
    <h2>Liste des Cartes Pokémon</h2>
    <input v-model="searchQuery" type="text" placeholder="Rechercher une carte..." class="search-input" />
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="cards-container">
      <div v-for="card in filteredPokemonCards" :key="card.id" class="card" @click="addToDeck(card)">
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
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { NButton, NInput } from "naive-ui";

interface PokemonCard {
  id: number;
  name: string;
  pokedexId: number;
  type: string;
  imageUrl: string;
  lifePoints: number;
  height: number;
  weight: number;
}

const pokemonCards = ref<PokemonCard[]>([]);
const deck = ref<PokemonCard[]>([]);
const deckName = ref("");
const loading = ref(true);
const error = ref("");
const searchQuery = ref("");

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

const filteredPokemonCards = computed(() => {
  return pokemonCards.value.filter(card =>
    card.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const addToDeck = (card: PokemonCard) => {
  if (!deck.value.includes(card)) {
    deck.value.push(card);
  }
};

const removeFromDeck = (card: PokemonCard) => {
  deck.value = deck.value.filter(c => c.id !== card.id);
};

const saveDeck = async () => {
  if (!deckName.value.trim() || deck.value.length === 0) {
    alert("Veuillez entrer un nom de deck et ajouter des cartes.");
    return;
  }
  try {
    await axios.post("https://pokemon-api-seyrinian-production.up.railway.app/save-deck", {
      name: deckName.value,
      cards: deck.value.map(c => c.id)
    });
    alert("Deck sauvegardé avec succès !");
  } catch (err) {
    alert("Erreur lors de la sauvegarde du deck.");
  }
};

onMounted(fetchPokemonCards);
</script>

<style scoped>
.pokemon-deck {
  text-align: center;
  padding: 20px;
}

.deck-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.deck-name-input {
  width: 200px;
}

.search-input {
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 50%;
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
  cursor: pointer;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
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