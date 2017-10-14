"use strict";

var inputParams = {
    a: [2, -1000, 1000, 4],
    b: [-4, -1000, 1000, 4],
    c: [-2, -1000, 1000, 4],
    "Generation count": [100, 1, 10000, 0],
    "Population count": [100, 1, 2000, 0],
    "Minimum value": [-100, -1000000, 1000000, 4],
    "Maximum value": [100, -1000000, 1000000, 4],
    "Maximum mutation": [1, 0.0001, 1000, 4]
};

var saveInputParams = function() {
    try { localStorage.inputParams = JSON.stringify(inputParams); }
    catch(e) {}
}

var loadInputParams = function() {
    try { inputParams = JSON.parse(localStorage.inputParams); }
    catch(e) {}
}

var doEvol = function() {
    saveInputParams();
}

var onInput = function(evt) {
    var ed = evt.target;
    var rng = ed.rng;
    var val = parseFloat(ed.value);
    var fixed = val.toFixed(rng[3]);
    if(isNaN(val) || val < rng[1] || val > rng[2] || 0 != val - fixed) {
        ed.style.backgroundColor = "red";
        return;
    }
    rng[0] = fixed;
    ed.style.backgroundColor = null;
}

var initInputRaw = function(name, row) {
        var rng = inputParams[name];

        var cell = row.insertCell();
        cell.innerText = name;

        cell = row.insertCell();
        var ed = document.createElement("input");
        ed.rng = rng;
        ed.oninput = onInput;
        ed.value = rng[0];
        cell.appendChild(ed);

        cell = row.insertCell();
        cell.innerText = rng[1] + " to " + rng[2] + " step: " + 1 / Math.pow(10, rng[3]);

}

var initInputTable = function() {
    loadInputParams();
    var h3 = document.createElement("h3");
    h3.innerText = "Quadratic equation client side solver based on evolutional algorythm with static mutation"

    var hr = document.createElement("hr");
    var start = document.createElement("a");
    start.innerText = "Start Calculation";
    start.href="javascript:doEvol()";
    start.id="start";

    var tbl = document.createElement("table");

    for(var i in inputParams)
        initInputRaw(i, tbl.insertRow());

    document.body.appendChild(h3);
    document.body.appendChild(tbl);
    document.body.appendChild(hr);
    document.body.appendChild(start);
}

window.onload = function() {
    initInputTable();
}


