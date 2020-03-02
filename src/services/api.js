import axios from 'axios'
const api = axios.create({
    //só funciona no emulador
    baseURL: 'http://localhost:3333'
    //em caso de usar app no cel pegar do endereço do expo pode-se manter a porta
})

export default api