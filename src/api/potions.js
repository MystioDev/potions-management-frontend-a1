const API_URL = "/api/potions";

const getPotions = async () => {
  const response = await fetch(API_URL);
  return response.json();
};
const createPotion = async (potion) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(potion),
  });
  console.log(response);
  return response.json();
};
const deletePotion = async (id) => {
  const response = await fetch(API_URL + "/" + id, {
    method: "DELETE",
  });
  return response.json();
};
const updatePotion = async (id, name, effect, isDangeorus) => {
  const response = await fetch(API_URL + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, effect, isDangeorus }),
  });
  return response.json();
};

export { getPotions, createPotion, deletePotion, updatePotion };
