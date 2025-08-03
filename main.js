let dotAnim = null;
let accessTimeout = null;
const info = document.getElementById("info");
const intro = document.getElementById("intro");
const connection= document.getElementById("connection");
const input = document.getElementById("input")
const identity = document.getElementById("identity");
const profile = document.getElementById("profile");
const archives = document.getElementById("archives");
const projects = document.getElementById("projects");
const extra = document.getElementById("extra");
const request= document.getElementById("request");
const commands=document.getElementById("commands");
const main = document.querySelectorAll(".main");
const contact = document.getElementById("contact");
const backBtn = document.querySelectorAll(".back-btn");


//Hiding Contents
hideMain =()=>{
main.forEach(e => {
  e.style.display = "none";
});
}
connection.style.display ="none";
identity.style.display ="none";
info.style.display ="none";
intro.style.display ="none";
hideMain()
request.style.display ="none";
backBtn.forEach(e => {
  e.style.display = "none";
});
/*
document.querySelectorAll(".page").forEach(el => {
  el.style.display = "none";
});
*/

commands.style.display = "none"
//Timers

//Connection Text
setTimeout(()=>{
  connection.style.display ="block"
let time = setInterval(()=>{
  if (connection.textContent.includes("...")){
    connection.textContent= "Initializing connection"
  }else{
    connection.textContent+="."
  }
  let timer = setTimeout(()=>{
    clearInterval(time)
    connection.textContent="Connection Established"
    connection.style.color= "#888"
    connection.style.fontStyle= "italic"
    
  },5000)
},100)
},1500)

//document.getElementById().style.display = "none"// Block

//Verification Text
setTimeout(()=>{
  identity.style.display ="block"
let time = setInterval(()=>{
  if (identity.textContent.includes("...")){
    identity.textContent= "Verifying identity"
  }else{
    identity.textContent+="."
  }
  setTimeout(()=>{
    clearInterval(time)
    identity.textContent= "Verifying identity [SUCCESS]"
    identity.style.color= "#888"
    identity.style.fontStyle= "italic"
    setTimeout(()=>{
      info.style.display ="block"
      setTimeout(() => {
  intro.style.display = "block"
  setTimeout(() => {
  commands.style.display = "block"
}, 5000);
}, 500);
    },100);
  },5000)
},100)
},6500)

//Input Text 
setInterval(()=>{
  if (input.textContent.includes("_")) {
  input.textContent = "Input your request to proceed:"
} else {
  input.textContent += "_"
}
},500);

const loadrequest = (section) => {
  // Clear old ones if they exist
  clearInterval(dotAnim);
  clearTimeout(accessTimeout);
  
  setTimeout(() => {
    request.style.display = "block";
    request.textContent = "Preparing Request, Please wait";
    request.style.color = "#00ffff";
    request.style.fontStyle = "normal";
    
    // Animate the dots every 0.3s
    dotAnim = setInterval(() => {
      if (request.textContent.endsWith("...")) {
        request.textContent = "Preparing Request, Please wait";
      } else {
        request.textContent += ".";
      }
    }, 300);
    
    // After 3 seconds, stop animation and show access granted
    accessTimeout = setTimeout(() => {
      clearInterval(dotAnim);
      request.textContent = "[ACCESS GRANTED]";
      request.style.color = "#888";
      request.style.fontStyle = "italic";
      section.style.display = "block";
      
      setTimeout(() => {
        backBtn.forEach(e => {
          e.style.display = "block";
        });
      }, 3000);
    }, 3000);
  }, 500);
};

//Links

//Profile
document.getElementById("profileCmd").addEventListener("click", (event)=>{event.preventDefault();
info.style.display ="none";
intro.style.display ="none";
loadrequest(profile);
  });
  
  //Archives
  document.getElementById("archivesCmd").addEventListener("click", (event)=>{event.preventDefault();
info.style.display ="none";
intro.style.display ="none";
loadrequest(archives);
  });

document.querySelectorAll(".docs").forEach(e =>{
    e.addEventListener("click", (event)=>{event.preventDefault();
    alert("❌Decryption failed: \n Please stay in touch for more info Or come back later when Server is Secure")
  })
  });

  //Projects
  /* document.getElementById("projectsCmd").addEventListener("click", (event)=>{event.preventDefault();
info.style.display ="none";
intro.style.display ="none";
loadrequest(projects);
  });
  */

  //Contacts
  document.querySelectorAll(".contactCmd").forEach(e =>{
    e.addEventListener("click", (event)=>{event.preventDefault();
    hideMain();
info.style.display ="none";
intro.style.display ="none";
loadrequest(contact);
  })
  });

document.getElementById("submitBtn").addEventListener("click", (event)=>{
event.preventDefault();
  alert ("Error; ArcLight servers are temporarily unavailable. Please Use the links Below to Get in touch")
  });
  //Events
  document.getElementById("extraCmd").addEventListener("click", (event)=>{
event.preventDefault();
alert("⚠️Event Coming Soon")
  })
  
  backBtn.forEach(btn => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    hideMain();
    request.style.display ="none";
    info.style.display = "block";
    intro.style.display = "block";
    request.textContent= "Preparing Request, Please wait"
    request.style.color ="#00ffff "
  });
});


