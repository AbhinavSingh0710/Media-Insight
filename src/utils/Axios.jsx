import axios from "axios";

const instance =  axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmVkMjI5ZmZlNGM1MDlhNzhjOGExYzYwYWE5NDVhMiIsIm5iZiI6MTcyMDc2OTQzNS41Nzg4NjEsInN1YiI6IjY2OTBkNzkzMTY2YjdkMDkzNDJjZGEwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dGQi2haEJlMO_AgvzDzLGKL-Vp_QUN5MtDPZCbVBxWU'
      }
})

export default instance;