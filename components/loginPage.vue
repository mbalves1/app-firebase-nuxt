<template>
  <v-snackbar
    :timeout="time"
    :color="snackbar.color"
    v-model="snackbar.visible"
    location="top"
  >
    {{ snackbar.label }}
  </v-snackbar>
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
        <v-form>
          <v-card class="w-full sm:w-500px bg-light">
            <v-card-title class="py-4">
              <div class="flex justify-center">
                <div>
                  Login
                </div>
              </div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <div class="px-5">
                <div class="text-sm py-2">Email</div>
                <v-text-field
                  density="compact"
                  variant="outlined"
                  type="email"
                  v-model="user.email"
                >
                </v-text-field>
              </div>
              <div class="px-5">
                <div class="text-sm py-2">Senha</div>
                <v-text-field
                  density="compact"
                  variant="outlined"
                  :type="!show ? 'password' : 'text'"
                  append-inner-icon="mdi-eye"
                  @click:append-inner="show = !show"
                  v-model="user.password"
                >
                </v-text-field>
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-ations>
              <div class="flex w-full py-5 gap-2 justify-center">
                <v-btn
                  class="w-43% text-capitalize"
                  variant="flat"
                  color="#999"
                >Cadastrar</v-btn>
                <v-btn
                  class="w-43% text-capitalize"
                  color="#ccc"
                  variant="flat"
                  @click="login"
                >Logar</v-btn>
              </div>
            </v-card-ations>
          </v-card>
        </v-form>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'

definePageMeta({
  layout: 'home',
})

const emit = defineEmits([
  'sendError'
])

const router = useRouter()

const { getUser } = useUserStore()
const userVariable = ref(null)
const loading = ref(false)
const show = ref(false)

const snackbar = ref({
  visible: false,
  label: '',
  color: '',
  time: 4000
})

const user = ref({
  email: 'mbalves1@outlook.com',
  password: 'mnbvcxz1234'
})

onMounted(() => {
  loading.value = true
  useIntervalFn(() => {
    loading.value = false
  }, 2000)
  userVariable.value = getUser()
})

const login = async () => {
  const { email, password } = user.value
  const auth = getAuth()
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)
    const token = response.user.accessToken
    localStorage.setItem('token', token)
    if (token) {
      router.push('/home')
    }
    console.log(response)
  }
  catch(error) {
    console.error(error)
    snackbar.value = {
      visible: true,
      label: 'Erro ao fazer login, tente novamente!',
      color: 'red',
      time: 4000
    }
  }
}
</script>