<template>
  <div class="flex justify-center items-center h-100vh">
    <v-progress-circular
      indeterminate
      :rotate="360"
      :size="70"
      :width="5"
      color="orange"
      v-if="loading"
    ></v-progress-circular>
  
    <div v-else>
      <div class="flex justify-center items-center h-100vh">
        <v-card class="sm:w-500px sm:h-500px">
          <div>
            Ola asd 
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: 'home',
})

const { getUser } = useUserStore()
const userVariable = ref(null)
const loading = ref(false)

onMounted(() => {

  loading.value = true
  useIntervalFn(() => {
    loading.value = false
  }, 2000)
  userVariable.value = getUser()
})
</script>