<script setup lang="ts">
const { signIn } = useAuth();
const { $toast } = useNuxtApp();

definePageMeta({
  layout: false,
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/admin/menu",
  },
});
const username = ref();
const password = ref();
async function handleAuthSubmit() {
  const { error, url } = await signIn("credentials", {
    username: username.value,
    password: password.value,
    redirect: false,
  });
  if (error) {
    $toast.error("Wrong credentials!");
  } else {
    console.log(url);
    return navigateTo(url, { external: true });
  }
}
</script>

<template>
  <div
    class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0"
  >
    <NuxtLink to="/" class="mb-6 flex items-center">
      <img class="h-12" src="/icons/icon-name.svg" alt="" />
    </NuxtLink>
    <div class="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
      <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl"
        >
          Sign in to your account
        </h1>
        <form class="space-y-4 md:space-y-6" @submit.prevent="handleAuthSubmit">
          <div>
            <label
              class="mb-2 block text-sm font-medium text-black dark:text-white"
              >Username</label
            >
            <input
              type="text"
              v-model="username"
              class="block w-full rounded-lg border border-black/30 bg-black/5 p-2.5 text-black sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              class="mb-2 block text-sm font-medium text-black dark:text-white"
              >Password</label
            >
            <input
              type="password"
              v-model="password"
              class="block w-full rounded-lg border border-black/30 bg-black/5 p-2.5 text-black sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full rounded-lg bg-teal-dark/75 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-dark"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
