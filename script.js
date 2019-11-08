var content = document.getElementById("data");
var btnsearch = document.getElementById("btnsearch");
var txtinput = document.getElementById("txtinput");
var count = document.getElementById("txtcount");
btnsearch.addEventListener("click", begin_search);
txtinput.addEventListener("keyup", begin_search);

function begin_search() {
    request.onload();
}

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


var request = new XMLHttpRequest();
request.open('GET', 'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json', true);
request.responseType = "json";
request.send();

request.onload = function () {
    txt = ""
    var bicycles = request.response;
    var station_info = bicycles["data"]["stations"];
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
    count.innerHTML = "Bicycle racks can hold " + txtinput.value + " bicycles"
    content.innerHTML = txt;
}

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
