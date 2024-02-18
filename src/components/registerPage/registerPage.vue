<template>

 

<div class="container">
      <div class="card">
        <div class="circle"></div>
        <div class="title">
      <h1>{{eventData[0].title}}</h1>
      <h2>{{ eventData[0].time }}</h2>
    </div>
    <div class="content">
<div class="social">
          <p>{{ eventData[0].date }}</p>
          </div>
      
<div class="social">
    <p>{{eventData[0].description}}</p>
      </div>
      
<div class="social">
    <p>{{ eventData[0].location }}</p>
      </div>
    </div>
    <fieldset style="margin-top: 20px;" >
    <input type="email" v-model="email" placeholder="   Enter Email" style="border-color: black; background-color: bisque; width:100%; border-radius: 50px;">
  </fieldset>
    <br>
    <button @click="sendemail">Register for this Event!</button>
  
</div>
</div>



</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
        id:null,
      eventData: [{
      }]
    };
  },
  mounted() {
    this.id=this.$route.params.id;
    this.fetchEventData(); // Call the method to fetch event data when the component is mounted
  },
  methods: {
    sendemail(){
        axios.post('https://beacon-server.vercel.app/register-event',
        {
            email:this.email,
            eventName:this.id
        }).then(response=>{
            if(response.status==200){
                alert('Registration Complete!! Email Sent');
            }
            else{
                alert("Error");
            }
        })
        .catch(error => console.log(error));
    },
    fetchEventData() {
     
      // Construct the URL with the title parameter
      const url = `https://beacon-server.vercel.app/events/filter?title=${this.id}`;

      // Fetch event data based on URL parameters
      axios.get(url)
        .then(response => {
          if (response.data.length>0) {
            this.eventData = response.data; // Update the eventData object with fetched data
          }
          else{
            console.log("h");
            this.$router.push('/events');
          }
        })
        .catch(error => {
            console.log("e");
            console.log(`There was an error! ${error}`);
         this.$router.push('/events');
        });
    }
  }
}
</script>
<style scoped >
fieldset {
  border: medium none !important;
  margin: 0 0 10px;
  min-width: 100%;
  padding: 0;
  width: 100%;
}
body {
  font-family: 'Roboto', sans-serif;
  background: #f0f5f9;
}
.card {
  position: relative;
  margin: 150px auto;
  width: 380px;
  padding: 20px;
  box-shadow: 3px 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  border: 0;
  .circle {
    border-radius: 3px;
    width: 120px;
    height: 120px;
    background: black;
    position: absolute;
    right: 0px;
    top: 0;
    background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
    border-bottom-left-radius: 170px;
  }
  .content {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
  }
  h1 {
    font-size: 34px;
    font-weight: bold;
    margin-bottom: 0;
  }
  h2 {
    font-size: 18px;
    letter-spacing: 0.5px;
    font-weight: 300;
  }
  .social {
    margin-bottom: 5px;
      a {
   text-decoration: none !important;
   color: black;
    margin-left: 8px;
    font-weight: 300;
    i {
      font-weight: 400;
    }
  }
  }
  .location {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    i {
      color: red;
    }
    p {
      font-weight: 300;
    }
  }
  }


</style>
