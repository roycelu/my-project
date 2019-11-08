// Declare global variables
var content = document.getElementById("data");
var btnsearch = document.getElementById("btnsearch");
var txtinput = document.getElementById("txtinput");
var count = document.getElementById("txtcount");
var lastupdate = document.getElementById("lastupdate");
btnsearch.addEventListener("click", begin_search);
txtinput.addEventListener("keyup", begin_search);

// Set cursor in the input field
txtinput.autofocus();


// Receive data from Oslo Bysykkel
var request = new XMLHttpRequest();
request.open('GET', 'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json', true);
request.responseType = "json";
request.send();

// Update the website with current data
request.onload = function () {
    txt = ""
    var bicycles = request.response;
    var station_info = bicycles["data"]["stations"];
    
    lastupdate.innerHTML = "Last updated: <strong>" + convert_time(bicycles["last_updated"]) + "</strong>";
    
    if (txtinput.value == "") {
        txt = ""
    }
    else {
        overview_name = searchJSON(station_info, txtinput.value);
        overview_name.sort();
        for (var i=0; i<overview_name.length; i++) {
            txt += overview_name[i] + "<br>";
        }
    }
    column_number(txtinput.value);
    count.innerHTML = "Bicycle racks that can hold " + txtinput.value + " bicycles"
    content.innerHTML = txt;
}

// Search through the JSON and return the bicycle racks with enough capacity
function searchJSON(txt, capacity) {
    overview = []
    max_capacity = 0;
    for (var i=0; i<txt.length; i++) {
        if (txt[i]["capacity"] >= max_capacity) {
            max_capacity = txt[i]["capacity"];
        }
    }
    for (var i=0; i<txt.length; i++) {
        if ((txt[i]["capacity"] >= capacity) && (capacity <= max_capacity)) {
            overview.push(txt[i]["name"]);
        }
    }
    return overview;
}


// Search for bicycle racks when writing/button clicked
function begin_search() {
    request.onload();
}

// Convert to correct time display format
function convert_time(timestamp) {
    var time = new Date(timestamp*1000);
    var hours = "0" + time.getHours();
    var min = "0" + time.getMinutes();
    var sec = "0" + time.getSeconds();
    return hours.substr(-2) + ":" + min.substr(-2) + ":" + sec.substr(-2);
}

// Determine how many colums the text split into, based on number of bicycle racks
function column_number(number) {
    if (number < 40) {
        content.style.columnCount = 3;
    }
    else if (number < 45) {
        content.style.columnCount = 2;
    }
    else {
        content.style.columnCount = 1;
    }
}
