/**
 * Members: Tracy Mai, Minnie Cao, Kamile Vaicekonis
 * Assignment: HTTP Library 
 * File: script.js
 * Course: CSC 3221 - Netcentric Computing - Dr. Dennis Vickers 
 */

// Instantiate the object
const http = new coreHTTP();

/**
 * Show Response
 * Takes in the response data after it has been retrieved and formats
 * it nicely for the users to see it in the HTML.
 * @param {*} responseData 
 */

function ShowResponse(responseData) {
  let html = "<ul style='list-style:none'>";

  if (typeof responseData === "string") {
    html += `<li>${responseData}</li>`;
  } else if (Array.isArray(responseData)) {
    responseData.forEach(user => {
      html += `<li>User ${user.id} - ${user.name}</li>`;
    })
  } else {
    html += `<li>User ${responseData.id} - ${responseData.name}</li>`;
  }
  document.querySelector("#response").innerHTML = html;
}

/**
 * Show Error
 * Takes in the error message and formats it nicely for the users in HTML.
 * @param {*} err 
 */

function ShowError(err) {
  html = `<p>${err}</p>`;
  document.querySelector("#response").innerHTML = html;
}

/**
 * Process Get
 * Tries to parse the response string as a JSON, and sends it to Show Response
 * to be formattedd. 
 * Calls Show Error to input the error message into HTML if it catches an error.
 * @param {*} respStr 
 */

function ProcessGet(respStr) {
  try{
    const respObj = JSON.parse(respStr);
    ShowResponse(respObj);
  }
  catch(Error){
    ShowError(Error);
  }
}

/**
 * Process Post 
 * Tries to parse the response string as a JSON, and sends it to Show Response
 * to be formatted and add was requested. 
 * Calls Show Error to input the error message into HTML if it catches an error.
 * @param {} respStr 
 */

function ProcessPost(respStr) {
  try{
    const respObj = JSON.parse(respStr);
    ShowResponse(respObj);
  }
  catch(Error){
    ShowError(Error);
  }
}


/**
 * Process Put
 * Tries to parse the response string as a JSON, and sends it to Show Response
 * to be formatted and change or add what was requested. 
 * Calls Show Error to input the error message into HTML if it catches an error.
 * @param {*} respStr 
 */

function ProcessPut(respStr) {
  try{
    const respObj = JSON.parse(respStr);
    ShowResponse(respObj);
  }
  catch(Error){
    ShowError(Error);
  }
}

/**
 * Process Delete
 * Tries to delete the response string by sending it to Show Reponse to delete
 * it from the HTML. 
 * Calls Show Error to input the error message into HTML if it catches an error.
 * @param {} respStr 
 */

function ProcessDelete(respStr) {
  try{
    ShowResponse(respStr);
  }
  catch(Error){
    ShowError(Error);
  }
}

/**
 * Send Request
 * Takes in the request type, target url, and data, and sends the 
 * request accordingly with the switch function. 
 * @param {*} reqType 
 * @param {*} targetURL 
 * @param {*} data 
 */
async function sendRequest(reqType, targetURL, data) {
  let response;
  switch (reqType){
    case "get":
      ProcessGet(await http.get(targetURL));
      break;
    case "post":
      response = await http.post(targetURL,data);
      ProcessPost(response);
      break;
    case "put":
      response = await http.put(targetURL,data);
      ProcessPut(response);
      break;
    case "delete":
      response = await http.delete(targetURL);
      ProcessDelete(response);
      break;
  }
}

/**
 * Valid ID
 * Clarifies that the ID given by the user is within the bounds of the
 * existing user and that it is a number. 
 * If the ID given does not meet the requirements above, the ID box
 * borders become red and shows "err".
 * @param {} id 
 * @param {*} required 
 * @returns 
 */

function ValidId(id, required = false) {
  let isValid;

  if (id.length > 0) {
    isValid = (Number.isInteger(Number(id)))
    if (isValid) {
      isValid = ((Number(id) > 0 && Number(id) < 11));
    }
  } else if (required) {
    isValid = false;
  } else {
    isValid = true;
  }

  if (!isValid) {
    document.querySelector("#uIdArea>input").style.border = "2px solid red";
    document.querySelector("#uIdArea>input").value = "err";
  }
  
  return isValid;
}

/**
 * Valid Name
 * Checks that a name was entered and that the input is not an empty string.
 * Makes the name box's border red and shows "Name Required!" if the
 * requirements listed above were not met.
 * @param {*} fullName 
 * @returns 
 */

function ValidName(fullName) {
  let isValid = true;
  if (!fullName.length > 0) {
    isValid = false;
    document.querySelector("#uNameArea>input").style.border = "2px solid red";
    document.querySelector("#uNameArea>input").placeholder = "Name required!";
  }

  return isValid;
}

/**
 * Setup Request
 * Function that sets up the HTML where information may be changed, 
 * based on the request type from the user. 
 */

function SetupRequest() {
  let route = document.querySelector("#route").value;
  let data = "";

  const radioButtons = document.querySelectorAll("input[name='HTTPtype'");
  let reqType;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      reqType = radioButton.value;
      break;
    }
  }

  // Form the URL and request
  let okToSend;

  // The setup to change the HTML when the request type is GET.
  if (reqType === "get") {
    document.querySelector("#uNameArea>input").value = "";
    okToSend = (ValidId(document.querySelector("#uIdArea>input").value));
  }

  // The setup to change the HTML when the request type is POST.
  if (reqType === "post") {
    document.querySelector("#uIdArea>input").value = "";
    let uFullName = document.querySelector("#uNameArea>input").value;
    if (ValidName(uFullName)) {
      let uName = uFullName.split(" ")[0].trim();
      let uMail = uName.concat("@spu.edu");
      data = {
        name:`${uFullName}`,
        username:`${uName}`,
        email:`${uMail}`};
      okToSend = true;
    };
  }

  // The setup to change the HTML when the request type is PUT.
  if (reqType === "put") {
    okToSend = false;
    if (ValidId(document.querySelector("#uIdArea>input").value,true)) {
      let uFullName = document.querySelector("#uNameArea>input").value;
      if (ValidName(uFullName)) {
        let uName = uFullName.split(" ")[0].trim();
        let uMail = uName.concat("@spu.edu");
        data = {
          name:`${uFullName}`,
          username:`${uName}`,
          email:`${uMail}`};
        okToSend = true;
      };
    }
  }

  // The setup to change the HTML when the request type is DELETE.
  if (reqType === "delete") {
    document.querySelector("#uNameArea>input").value = "";
    okToSend = (ValidId(document.querySelector("#uIdArea>input").value,true));
  };
  // The setup to change the HTML when there is an input error. 
  if (okToSend) {
    route = route.concat(document.querySelector("#uIdArea>input").value);
    document.querySelector("#uIdArea>input").style.border = "1px solid lightgrey";
    document.querySelector("#uNameArea>input").style.border = "1px solid lightgrey";
    sendRequest(reqType,route, data);
    document.querySelector("#uIdArea>input").value = "";
    document.querySelector("#uNameArea>input").value = "";
  } else {
    console.log("Input Error");
  }
}

/**
 * Setup Input
 * Creates the correct boxes to show up depending on the request type
 * or radio buttons chosen, adds listeners to it.
 * @param {*} reqType 
 */

function SetupInput(reqType) {
  switch (reqType) {
    case "get":
      document.querySelector("#uIdArea").style.display = "flex";
      document.querySelector("#uNameArea").style.display = "none";
      break;
    case "post":
      document.querySelector("#uIdArea").style.display = "none";
      document.querySelector("#uNameArea").style.display = "flex";
      break;
    case "put":
      document.querySelector("#uIdArea").style.display = "flex";
      document.querySelector("#uNameArea").style.display = "flex";
      break;
    case "delete":
      document.querySelector("#uIdArea").style.display = "flex";
      document.querySelector("#uNameArea").style.display = "none";
      break;
  }
}

/**
 * Start Up 
 * Sets up the initial inputs to true. Then adds listeners for all 
 * the radio buttons and to the SEND button.
 */

function StartUp() {
  // Setup the initial inputs
  document.querySelector("#rbGet").checked = true;
  SetupInput("get");
  
  // Add listeners for the radio buttonsa
  document.querySelector("#rbGet").addEventListener("change", () => SetupInput("get"));
  document.querySelector("#rbPost").addEventListener("change", () => SetupInput("post"));
  document.querySelector("#rbPut").addEventListener("change", () => SetupInput("put"));
  document.querySelector("#rbDelete").addEventListener("change", () => SetupInput("delete"));

  // Add the listener to the SEND button
  document.querySelector("#SendReq").addEventListener("click", (e) => {
    SetupRequest();
    e.preventDefault();
  });
};

window.onload = function() {
  StartUp();
}