/**
 * Members: Tracy Mai, Minnie Cao, Kamile Vaicekonis
 * Assignment: HTTP Library 
 * File: coreHTTP.js
 * Course: CSC 3221 - Netcentric Computing - Dr. Dennis Vickers 
 * 
 */

class coreHTTP {

  /**
  * Get
  * @param {*} url The url that we want to acesss.
  * @returns Either the text if the page access was sucessful,
  *          or an error message if it was not. 
  */

 async get(url) {
   const response = await fetch(url);
   
   if (response.ok) {
     console.log("GET completed.")
     return await response.text();
   } else {
     console.log("GET Error: " + response.status);
     return ("GET Error: " + response.status);
   }
 }

  /**
  * Post
  * @param {*} url The url we want to access.
  * @param {*} data The data we want to post. 
  * @returns The newly added data if the page was accessed sucessfully.
  *          Or an error message if it was not.
  */

 async post(url, data) {
   const response = await fetch(url, {
     method: "POST",
     headers: {"content-type": "application/json"},
     body: JSON.stringify(data)
   });

   if (response.ok) {
     let resp = await response.json();
     console.log("POST completed.")
     console.log(resp);
     return JSON.stringify(resp);
   } else {
    console.log("POST Error: " + response.status);
    return ("POST Error: " + response.status);
   }
 } 

  /**
  * Put
  * @param {*} url The url we want to access.
  * @param {*} data The data we want to change.
  * @returns The data changed if it was successful, and an error
  *          message otherwise.
  */

 async put(url, data) {
   
   const response = await fetch(url, {
     method: "PUT",
     headers: {"content-type": "application/json"},
     body: JSON.stringify(data)
   });

   if (response.ok) {
     let resp = await response.json();
     console.log("PUT completed.")
     console.log(resp);
     return JSON.stringify(resp);
   } else {
     console.log("PUT Error: " + response.status);
     return ("PUT Error: " + response.status);
   }
 }
 
 /**
  * Delete
  * @param {*} url The url we want to access
  * @returns "User Deleted" if the url was able to be accessed, so
  *           the user was deleted. Or an error message otherwise.
  */

 async delete(url) {

   const response = await fetch(url, {
     method: "DELETE"
   });
   
   if (response.ok) {
     console.log("DELETE completed.")
     return "User Deleted";
   } else {
     console.log("DELETE Error: " + response.status);
     return ("DELETE Error: " + response.status);
   }
 }

 /**
  * Patch
  * @param {*} url The url we want to access
  * @param {*} data The data we want to change.
  * @returns The data changed if it was successful, and an error
  *          message otherwise.
  */
 async patch(url, data) {
   const response = await fetch(url, {
     method: "PATCH",
     headers: {"content-type": "application/json"},
     body: JSON.stringify(data)
   });

   if (response.ok) {
     let resp = await response.json();
     console.log("PATCH completed.")
     console.log(resp);
     return JSON.stringify(resp);
   } else {
     console.log("PATCH Error: " + response.status);
     return ("PATCH Error: " + response.status);
   }
 } 
}