  /** GOALS OF THIS FILE:
   * Change callbacks to async and await
   * change xhr to fetch function
   * change object/object literals and prototypes to classes and methods
   * pretty much rewriting and changing everything
   *  **/

  /**
   * NOTES FROM TRACY:
   * - the code in green was his orginal code, so you can compare if u wanna
   * - underneath is the code i wrote with the goals from above
   * - ps ik that there are many ways to do it, but this is how i did it from 
   *    the book and yall can change it u wanna ofc
   * - ps to search i used async/await instead of then chaainging bc he specifaically
   *   wanted async/await
   * - the thing im most unsure about is if it actually pprints correctly like his did in the video
   * - retrieving information should be good
   * - i used p much all of my code from 4.6 in zybooks, its in the light blue highlighted chunks
   * - ps make sure to check it live like he did it in class
   * - 
   *
   */


/**
// Constructor to create an XHR object
function coreHTTP() {
  this.http = new XMLHttpRequest();
}
 
 */

class coreHTTP {


//   /* <<< HTTP GET request >>> */
// coreHTTP.prototype.get = function(url, callback) {
//   // Open the connection
//   this.http.open("GET", url);

//   // Process the request when it is returned.
//   this.http.onload = () => {
//     if (this.http.status >= 200 && this.http.status <= 299) {
//       callback(null, this.http.responseText);
//     } else {
//       callback(`GET Error: ${this.http.status}`);
//     }
//   }

//   // Send the request
//   this.http.send();
// }

  async get(url) {

    const response = await fetch(url);

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
    } else {
      console.log("GET Error: " + response.status);
    }
  }



//   /* <<< HTTP POST request >>> */
// coreHTTP.prototype.post = function(url, data, callback) {
//   this.http.open("POST", url);
//   this.http.setRequestHeader("content-type","application/json");

//   this.http.onload = () => {
//     if (this.http.status >= 200 && this.http.status <= 299) {
//       callback(null, this.http.responseText);
//     } else {
//       callback(`POST Error: ${this.http.status}`);
//     }
//   }

//   this.http.send(JSON.stringify(data));
// }
 
  async post(url, data) {
 
    const response = await fetch(url, {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(data)
    });
 
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
    } else {
     console.log("POST Error: " + response.status);
    }
  } 


 
// /* <<< HTTP PUT request >>> */
// coreHTTP.prototype.put = function(url, data, callback) {
//   this.http.open("PUT", url);
//   this.http.setRequestHeader("content-type","application/json");

//   this.http.onload = () => {
//     if (this.http.status >= 200 && this.http.status <= 299) {
//       callback(null, this.http.responseText);
//     } else {
//       callback(`PUT Error: ${this.http.status}`);
//     }
//   }

//   this.http.send(JSON.stringify(data));
// }

  async put(url, data) {
    
    const response = await fetch(url, {
      method: "PUT",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(data)
    });
 
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
    } else {
      console.log("PUT Error: " + response.status);
    }
  }

  

// /* <<< HTTP DELETE request >>> */
// coreHTTP.prototype.delete = function(url, callback) {
//   this.http.open("DELETE", url);
  
//   this.http.onload = () => {
//     if (this.http.status >= 200 && this.http.status <= 299) {
//       callback(null, "User Deleted");
//     } else {
//       callback(`DELETE Error: ${this.http.status}`);
//     }
//   }

//  this.http.send();  
//}
 
  async delete(url) {
 
    const response = await fetch(url {
      method: "DELETE"
    });
    
    if (response.ok) {
      console.log("User Deleted");
    } else {
      console.log("Delete Error: " + response.status);
    }
  }
 
 }
