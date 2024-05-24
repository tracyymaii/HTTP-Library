// Instantiate the object
const http = new coreHTTP();

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

function ShowError(err) {
  html = `<p>${err}</p>`;
  document.querySelector("#response").innerHTML = html;
}

function ProcessGet(respStr) {
  try{
    const respObj = JSON.parse(respStr);
    ShowResponse(respObj);
  }
  catch(Error){
    ShowError(Error);
  }
}

function ProcessPost(respStr) {
  try{
    const respObj = JSON.parse(respStr);
    ShowResponse(respObj);
  }
  catch(Error){
    ShowError(Error);
  }
}

function ProcessPut(respStr) {
  try{
    const respObj = JSON.parse(respStr);
    ShowResponse(respObj);
  }
  catch(Error){
    ShowError(Error);
  }
}

function ProcessDelete(respStr) {
  try{
    ShowResponse(respStr);
  }
  catch(Error){
    ShowError(Error);
  }
}

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

function ValidId(id, required = false) {
  let isValid;

  if (id.length > 0) {
    isValid = (Number.isInteger(Number(id)))
    if (isValid) {
      isValid = ((Number(id) > 1 && Number(id) < 11));
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

function ValidName(fullName) {
  let isValid = true;
  if (!fullName.length > 0) {
    isValid = false;
    document.querySelector("#uNameArea>input").style.border = "2px solid red";
    document.querySelector("#uNameArea>input").placeholder = "Name required!";
  }

  return isValid;
}

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
  if (reqType === "get") {
    document.querySelector("#uNameArea>input").value = "";
    okToSend = (ValidId(document.querySelector("#uIdArea>input").value));
  }

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

  if (reqType === "delete") {
    document.querySelector("#uNameArea>input").value = "";
    okToSend = (ValidId(document.querySelector("#uIdArea>input").value,true));
  };
  
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

// Listners for radio buttions
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