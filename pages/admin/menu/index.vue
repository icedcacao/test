<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const isDisplayed = ref("0");
const foods = useFoodStore();
const appConfig = useAppConfig();
await callOnce(() => {
  foods.fetchAdmin(`filter=${isDisplayed.value}`);
});
</script>

<template>
  <div
    class="relative flex items-end justify-between space-x-2 overflow-x-auto overflow-y-hidden"
  >
    <h1 class="text-4xl font-semibold">MENU</h1>
    <div class="flex items-end space-x-2">
      <div>
        <h3>Filter</h3>
        <select
          v-model="isDisplayed"
          class="text-md rounded border-2 px-2 py-1"
        >
          <option
            v-for="(item, key) in appConfig.foodAdminFilter"
            :item="item"
            :value="key"
            :key="key"
          >
            {{ item }}
          </option>
        </select>
      </div>

      <AdminMiscNuxtLinkButtonIcon
        icon-name="material-symbols:create-new-folder-outline"
        navigate-to="/admin/menu/create"
        dynamic-class="hover:bg-[#4291f3]/75 bg-[#4291f3]"
      />
      <AdminMiscButtonIcon
        icon-name="material-symbols:restart-alt-rounded"
        @action="foods.fetchAdmin(`filter=${isDisplayed}`)"
        dynamic-class="hover:bg-black/10"
      />
    </div>
  </div>

  <AdminMenuTable />
</template>
