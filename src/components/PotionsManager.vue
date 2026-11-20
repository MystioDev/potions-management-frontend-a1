<script setup>
import { createPotion, deletePotion, getPotions, updatePotion } from "../api/potions";
</script>

<script>
export default {
  name: "PotionsManager",
  data() {
    return {
      potions: [],
      newpotion: {
        name: "",
        effect: "",
        isDangeorus: false,

      },

      selectedPotion: {
        id:-1,
        name: "",
        effect: "",
        isDangeorus: false,
      }
    };


  },
  methods: {
    async loadPotions() {
      this.potions = await getPotions();
    },
    async postPotion(potion) {
        await createPotion(potion);
        await this.loadPotions();

    },
    async submitPotion() {
      await this.postPotion(this.newpotion);
    },
    async removePotion(id) {
        await deletePotion(id);
        await this.loadPotions();
    },

    selectPotion(id, name, effect, isDangeorus){
        this.selectedPotion = {
            id: id,
            name: name,
            effect: effect,
            isDangeorus: isDangeorus,
        }
    },

    async editPotion(){
        await updatePotion(this.selectedPotion.id, this.selectedPotion.name, this.selectedPotion.effect, this.selectedPotion.isDangeorus)
        this.loadPotions();
    }
  },
  mounted() {
    this.loadPotions();
  },
};
</script>

<template>
  <main class="">
    <form class="flex flex-col" @submit.prevent="submitPotion">
      <label for="nev" class="">név</label>
      <input
        v-model="newpotion.name"
        type="text"
        class="border-2 border-stone-300 bg-stone-200 text-stone-900"
        name="nev"
      />

      <label for="effect" class="">effect</label>
      <input
        v-model="newpotion.effect"
        type="text"
        class="border-2 border-stone-300 bg-stone-200 text-stone-900"
        name="effect"
      />

      <label for="dangerous" class="">veszélyes?</label>
      <input
        v-model="newpotion.isDangeorus"
        type="checkbox"
        name="dangerous"
        class="border-2 border-stone-300 bg-stone-200"
        id=""
      />

      <button type="submit" class=" cursor-pointer"">létrehozás</button>
    </form>
    <table class="">
      <thead class="">
        <tr class="">
          <th class="">id</th>
          <th class="">nev</th>
          <th class="">effect</th>
          <th class="">isDangeorus</th>
          <th class="">műveletek</th>
        </tr>
      </thead>
      <tbody class="">
        <tr class="" v-for="potion in potions" :key="potion.id">
          <td class="">{{ potion.id }}</td>
          <td class="">{{ potion.name }}</td>
          <td class="">{{ potion.effect }}</td>
          <td class="">{{ potion.isDangeorus }}</td>
          <td class=""><button type="button" @click="removePotion(potion.id)">Törlés</button><br>
            <button type="button" @click="selectPotion(potion.id, potion.name, potion.effect, potion.isDangeorus)">kiválasztás</button></td>
        </tr>
      </tbody>
    </table>
    <form class="flex flex-col" @submit.prevent="editPotion()">
      <label for="nev" class="">név</label>
      <input
        v-model="selectedPotion.name"
        type="text"
        class="border-2 border-stone-300 bg-stone-200 text-stone-900"
        name="nev"
      />

      <label for="effect" class="">effect</label>
      <input
        v-model="selectedPotion.effect"
        type="text"
        class="border-2 border-stone-300 bg-stone-200 text-stone-900"
        name="effect"
      />

      <label for="dangerous" class="">veszélyes?</label>
      <input
        v-model="selectedPotion.isDangeorus"
        type="checkbox"
        name="dangerous"
        class="border-2 border-stone-300 bg-stone-200"
        id=""
      />

      <button type="submit" class=" cursor-pointer"">módosítás</button>
    </form>
  </main>
</template>
