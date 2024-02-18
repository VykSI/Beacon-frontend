<template>
  <!-- Banner -->


<!-- Dashboard -->
<div class="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
  <!-- Vertical Navbar -->
  
  <!-- Main content -->
  <div class="h-screen flex-grow-1 overflow-y-lg-auto">
      <!-- Header -->
      <header class="bg-surface-primary border-bottom pt-6">
          <div class="container-fluid">
              <div class="mb-npx">
                  <div class="row align-items-center">
                      <div class="col-sm-6 col-12 mb-4 mb-sm-0">
                          <!-- Title -->
                          <h1 class="h2 mb-0 ls-tight">{{username}}</h1>
                      </div>
                      <!-- Actions -->
                      <div class="col-sm-6 col-12 text-sm-end">
                          <div class="mx-n1">
                              
                              <a @click="logout" href="#" class="btn d-inline-flex btn-sm btn-primary mx-1">
                                  <span class=" pe-2">
                                      <i class="bi bi-pencil"></i>
                                  </span>
                                 <span >Logout</span>
                              </a>
                          </div>
                      </div>
                  </div>
                  <!-- Nav -->
                  <ul class="nav nav-tabs mt-4 overflow-x border-0">
                      <li class="nav-item ">
                          <a href="#" class="nav-link active">All Events</a>
                      </li>
                      
                  </ul>
              </div>
          </div>
      </header>
      <!-- Main -->
      <main class="py-6 bg-surface-secondary">
          <div class="container-fluid">
              <!-- Card stats -->
              
              <div class="card shadow border-0 mb-7">
                  <div class="card-header">
                      <h5 class="mb-0">Applications</h5>
                  </div>
                  
                  <div class="table-responsive">
                      <table class="table table-hover table-nowrap">
                          <thead class="thead-light">
                              <tr>
                                  <th scope="col">Name</th>
                                  <th scope="col">Date</th>
                                  <th scope="col">Organizer</th>
                                  <th scope="col"></th>
                                  <th scope="col">Location</th>
                                  <th></th>
                              </tr>
                          </thead>
                          <tbody v-for="(event, index) in eventData" :key="index">
                              
                              <tr>
                                  <td>
                                      
                                          {{event.title}}
                                      
                                  </td>
                                  <td>
                                      {{event.date}}
                                  </td>
                                  <td>
                                      {{ event.organizer }}
                                  </td>
                                  <td>
                                     
                                  </td>
                                  <td>
                                      {{ event.location }}
                                  </td>
                                  <td class="text-end">
                                      <a href="#" class="btn btn-sm btn-neutral" @click="openevent(event.title)">View</a>
                                      
                                  </td>
                              </tr>
                              
                          </tbody>
                      </table>
                  </div>
                  
              </div>
          </div>
      </main>
  </div>
</div>
</template>
<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
export default {
  data() {
    return {
      username:'',
      eventData: [{
      }]
    };
  },
  mounted() {
    this.fetchEventData(); // Call the method to fetch event data when the component is mounted
  },
  methods: {
    openevent(title){
        this.$router.push('/register/'+title)
    },
    logout(){
            localStorage.removeItem("token");
            this.$router.push('/login');
        },
    change1(event){
      this.$router.push('/register/'+event);
    },
    fetchEventData() {
      const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            this.username = decodedToken.username;
      axios.get('http://localhost:3000/events')
        .then(response => {
          if (response.data) {
            this.eventData = response.data; // Update the eventData object with fetched data
          }
        })
        .catch(error => {
          console.error('Error fetching events:', error);
        });
    }
  }
}
</script>

<style scoped>

@import url(https://unpkg.com/@webpixels/css@1.1.5/dist/index.css);

/* Bootstrap Icons */
@import url("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.4.0/font/bootstrap-icons.min.css");

</style>
