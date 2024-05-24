class coreHTTP {
  
  async get(url) {
    const response = await fetch(url);
    
    if (response.ok) {
      return await response.text();
    } else {
      console.log("GET Error: " + response.status);
      return ("GET Error: " + response.status);
    }
  }
 
  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(data)
    });
 
    if (response.ok) {
      return await response.text();
    } else {
     console.log("POST Error: " + response.status);
     return ("POST Error: " + response.status);
    }
  } 

  async put(url, data) {
    
    const response = await fetch(url, {
      method: "PUT",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(data)
    });
 
    if (response.ok) {
      return await response.text();
    } else {
      console.log("PUT Error: " + response.status);
    }
  }
  
  async delete(url) {
 
    const response = await fetch(url, {
      method: "DELETE"
    });
    
    if (response.ok) {
      return "User Deleted";
    } else {
      console.log("Delete Error: " + response.status);
    }
  }
}