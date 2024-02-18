<template>
    <div class="container">  
        <form id="contact" @submit.prevent="SubmitEvent">
    <h3>Create an Event</h3>
    <h4>Contact us for custom quote</h4>
    <fieldset>
      <input placeholder="Title" type="text" tabindex="1" required autofocus v-model="title">
    </fieldset>

      
    <fieldset>
      <input placeholder="Your Phone Number" type="tel" tabindex="3" required v-model="pno">
    </fieldset>
    <fieldset>
      <input placeholder="date in YYYY-MM-DD" type="text" tabindex="4" required  v-model="date">
    </fieldset>
    <fieldset>
      <input placeholder="Time" type="text" tabindex="5" required v-model="time">
    </fieldset>
    <fieldset>
      <input placeholder="Location" type="text" tabindex="6" required v-model="location">
    </fieldset>
    <fieldset>
      <textarea placeholder="Description" tabindex="7" required v-model="description"></textarea>
    </fieldset>
    <fieldset>
      <button name="submit" type="submit" id="contact-submit" >Submit</button>
    </fieldset>
  </form>
</div>
</template>

<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
export default{
  mounted(){
    this.check();
  },
    methods: {
      check(){
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const role = decodedToken.role;
            if(role!='admin'){
                localStorage.removeItem("token");
            this.$router.push('/admin-login');
            }
        },
        SubmitEvent(){
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const username = decodedToken.username;
            const eventData = {
        title: this.title,
        organizer: username,
        pno: this.pno,
        date: this.date,
        time: this.time,
        location: this.location,
        description: this.description
    };
            console.log(eventData);
    // Set up the headers with the JWT token
    const headers = {
        'Authorization': `${token}`,
        'Content-Type': 'application/json' // Assuming JSON data is being sent
    };
            axios.post('http://localhost:3000/events', 
            eventData,{headers,timeout: 10000}).then(response=>{
                if(response.status==201){
                    alert('Created succesfully');
                    this.$router.push('/dashboard');
                }
                else{
                    alert('Failed');
                }
            }).catch(console.log("unauthorized access"));
        }
    }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:400,300,600,400italic);
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -o-font-smoothing: antialiased;
  font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

body {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-weight: 100;
  font-size: 12px;
  line-height: 30px;
  color: #777;
  background: #4CAF50;
}

.container {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  position: relative;
}

#contact input[type="text"],
#contact input[type="email"],
#contact input[type="tel"],
#contact input[type="url"],
#contact textarea,
#contact button[type="submit"] {
  font: 400 12px/16px "Roboto", Helvetica, Arial, sans-serif;
}

#contact {
  background: #F9F9F9;
  padding: 25px;
  margin: 150px 0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

#contact h3 {
  display: block;
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 10px;
}

#contact h4 {
  margin: 5px 0 15px;
  display: block;
  font-size: 13px;
  font-weight: 400;
}

fieldset {
  border: medium none !important;
  margin: 0 0 10px;
  min-width: 100%;
  padding: 0;
  width: 100%;
}

#contact input[type="text"],
#contact input[type="email"],
#contact input[type="tel"],
#contact input[type="url"],
#contact textarea {
  width: 100%;
  border: 1px solid #ccc;
  background: #FFF;
  margin: 0 0 5px;
  padding: 10px;
}

#contact input[type="text"]:hover,
#contact input[type="email"]:hover,
#contact input[type="tel"]:hover,
#contact input[type="url"]:hover,
#contact textarea:hover {
  -webkit-transition: border-color 0.3s ease-in-out;
  -moz-transition: border-color 0.3s ease-in-out;
  transition: border-color 0.3s ease-in-out;
  border: 1px solid #aaa;
}

#contact textarea {
  height: 100px;
  max-width: 100%;
  resize: none;
}

#contact button[type="submit"] {
  cursor: pointer;
  width: 100%;
  border: none;
  background: #4CAF50;
  color: #FFF;
  margin: 0 0 5px;
  padding: 10px;
  font-size: 15px;
}

#contact button[type="submit"]:hover {
  background: #43A047;
  -webkit-transition: background 0.3s ease-in-out;
  -moz-transition: background 0.3s ease-in-out;
  transition: background-color 0.3s ease-in-out;
}

#contact button[type="submit"]:active {
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
}

.copyright {
  text-align: center;
}

#contact input:focus,
#contact textarea:focus {
  outline: 0;
  border: 1px solid #aaa;
}

::-webkit-input-placeholder {
  color: #888;
}

:-moz-placeholder {
  color: #888;
}

::-moz-placeholder {
  color: #888;
}

:-ms-input-placeholder {
  color: #888;
}
</style>