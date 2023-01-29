// OPERATING ON THE REQUEST BOXES:

let parametersbox = document.getElementById("parametersbox");
//  Initially hiding the parametersbox while starting
parametersbox.style.display = "none";
let requestjsonbox = document.getElementById("requestjsonbox");
//  Initially hiding the requestjsonbox while starting
requestjsonbox.style.display = "none";
let jsonradio = document.getElementById("jsonradio");
let paramsradio = document.getElementById("paramsradio");
// if the user clicks parametersbox then hide jsonradio
paramsradio.addEventListener("click", () => {
  parametersbox.style.display = "block";
  requestjsonbox.style.display = "none";
});
// if the user clicks jsonradio then hide parametersbox
jsonradio.addEventListener("click", () => {
  parametersbox.style.display = "none";
  requestjsonbox.style.display = "block";
});

// OPERATING ON THE PARAMETERSBOX
// adding parametersbox : if the user clicks on the '+' button then parameters box gets added up
//  to convert a string into an element
function getelementfromstring(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  // console.log(div)
  // console.log( div.firstElementChild)
  return div.firstElementChild;
}
let paramcount = 1;
let addparameters = document.getElementById("addparameters");
addparameters.addEventListener("click", () => {
  let string = ` <div class="row my-3">
        <label for="urlfield" class="col-sm-2 col-form-label">Parameter ${
          paramcount + 1
        }: </label>
        <div class="col-md-4">
          <input type="text" class="form-control" id="parameterkey${
            paramcount + 1
          }"  placeholder="enter parameter ${paramcount + 1} key">
          </div>
                          <div class="col-md-4">
                            <input type="text" class="form-control" id="parametervalue1" placeholder="enter parameter ${
                              paramcount + 1
                            } value">
                            </div>
                            <button class="btn btn-dark col-1" id="removeparameters" onclick="removeparameters(this)">-</button>
                            </div>`;
  let addedparameters = document.getElementById("addedparameters");
  console.log(addedparameters);
  let getelement = getelementfromstring(string);
  console.log(getelement);
  addedparameters.appendChild(getelement);
  paramcount++;
});
//  removing the parameterboxes
// let removeparameters = document.getElementById('removeparameters')
function removeparameters(e) {
  alert(`Do you really want to delete the " Parameter " ?`);
  e.parentElement.remove();
}

// if user clicks on the submit button:
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  // Show 'please wait' in the response area box to request patience from the user as the post URL takes time to revert back at times:
  let responsetjsontext = document.getElementById("responsetjsontext");
  responsetjsontext.value = "Please wait...Fetching response";
  // fetching all the values user has entered:
  let url = document.getElementById("url").value;
  let typerequest = document.querySelector(
    "input[name='typerequest']:checked"
  ).value;
  let typecontent = document.querySelector(
    "input[name='typecontent']:checked"
  ).value;

  // if user clicks custom parameters
  let data = {};
  if (typecontent == "params") {
    for (i = 0; i < paramcount; i++) {
      if (document.getElementById("parameterkey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterkey" + (i + 1)).value;
        let value = document.getElementById("parametervalue" + (i + 1)).value;
        data[key] = value;
      }
    }
    JSON.stringify(data);
  } else {
    // this gives the data as string
    data = document.getElementById("requestjsontext").value;
  }

  console.log("content type is : ", typecontent);
  console.log("request type is : ", typerequest);
  console.log("url is : ", url);
  console.log("Data is : ", data);
  typeof data;

  // if the request type is get then invoke the fetch api to create a get request
  if (typerequest == "get") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        responsetjsontext.value = text;
      });
  }

  // if the request type is post then invoke the fetch api to create a post request
  else {
    fetch(url, {
      method: "POST",
      // Not working
      // body: data,
      // body: JSON.stringify(data),
      // working for a particular post request
      body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        responsetjsontext.value = text;
      });
  }
});
