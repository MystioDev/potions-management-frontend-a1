<script setup>
import { createPotion, getPotions } from "../api/potions";
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
        </tr>
      </thead>
      <tbody class="">
        <tr class="" v-for="potion in potions" :key="potion.id">
          <td class="">{{ potion.id }}</td>
          <td class="">{{ potion.name }}</td>
          <td class="">{{ potion.effect }}</td>
          <td class="">{{ potion.isDangeorus }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
