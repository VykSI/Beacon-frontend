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
                                <a   @click="create" href="#" class="btn d-inline-flex btn-sm btn-neutral border-base mx-1">
                                    <span class=" pe-2">
                                        <i class="bi bi-plus"></i>
                                        
                                    </span>
                                    <span>Create</span>
                                </a>
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
                                        <button type="button" class="btn btn-sm btn-square btn-neutral text-danger-hover" @click="deletfnc(event.title)">
                                            <i class="bi bi-trash"></i>
                                        </button>
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
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
export default{

    data(){
        return {
            username:'',
            eventData:[{}]
        };
    },  
    mounted(){
        const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            this.username = decodedToken.username;
            this.check();
            this.fetchEventData();
    }   , 
    methods: {
        deletfnc(title){
            const userChoice = window.confirm('Do you want to continue?');
if (userChoice) {
    // If the user clicks "Yes", continue with the action
    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `${token}`,
        'Content-Type': 'application/json' // Assuming JSON data is being sent
    };
axios.post('https://beacon-server.vercel.app/events/deleteevent',
{
    title:title
},{headers,timeout: 10000}).then(response=>{
    if(response.status==200){
       
        window.location.reload();
    }
    else {
        alert('error deleting');
    }
}).catch(err => console.log(err));
    // Put your code to continue here
} else {
    // If the user clicks "No" or cancels, show a message
    alert('You clicked No or Cancel. Aborting...');
    // Put your code to handle the cancellation here, if needed
}
        },
    openevent(title){
        this.$router.push('/register/'+title)
    },
        check(){
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const role = decodedToken.role;
            if(role!='admin'){
                localStorage.removeItem("token");
            this.$router.push('/admin-login');
            }
        },
        logout(){
            localStorage.removeItem("token");
            this.$router.push('/admin-login');
        },
        fetchEventData(){
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const username = decodedToken.username;
            axios.get(`https://beacon-server.vercel.app/events/user?organizer=${username}`).then(response=>{
                this.eventData=response.data;

                
            }).catch(error=>{
                console.log(error);
            })
        },
        create() {
            
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            this.username = decodedToken.username;
            const url=`/create/${this.username}`;
            this.$router.push(url);
        }
    }
}
</script>

<style scoped>
/* Webpixels CSS */
/* Utility and component-centric Design System based on Bootstrap for fast, responsive UI development */
/* URL: https://github.com/webpixels/css */

@import url(https://unpkg.com/@webpixels/css@1.1.5/dist/index.css);

/* Bootstrap Icons */
@import url("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.4.0/font/bootstrap-icons.min.css");

</style>
