"use strict";

//
//var inputParams = {
//    a: [2, -1000, 1000, 4],
//    b: [-4, -1000, 1000, 4],
//    c: [-2, -1000, 1000, 4],
//    "Generation count": [100, 1, 10000, 0],
//    "Population count": [100, 1, 2000, 0],
//    "Minimum value": [-100, -1000000, 1000000, 4],
//    "Maximum value": [100, -1000000, 1000000, 4],
//    "Maximum mutation": [1, 0.0001, 1000, 4]
//};
//
//var evol = {
//    limits : {
//        "a": {"l": -1000, "h": 1000, "f": 4},
//        "b": {"l": -1000, "h": 1000, "f": 4},
//        "c": {"l": -1000, "h": 1000, "f": 4},
//        "Generation count": {"l": 1, "h": 10000, "f": 0},
//        "Population count": {"l": 1, "h": 2000, "f": 0},
//        "Minimum value": {"l": -1000000, "h": 1000000, "f": 4},
//        "Maximum value": {"l": -1000000, "h": 1000000, "f": 4},
//        "Maxumum mutation": {"l": 0.0001, "h": 1000, "f": 4}
//    },
//    values : {
//        "a": 2,
//        "b": -4,
//        "c": -2,
//        "Generation count": 100,
//        "Population count": 100,
//        "Minimum value": -100,
//        "Maximum value": 100,
//        "Maxumum mutation": 1
//    },
//    load: function() {
//        try { this.values = JSON.parse(localStorage.values); }
//        catch(e) {}
//    },
//    save: function() {
//        try { localStorage.values = JSON.stringify(this.values); }
//        catch(e) {}
//    },
//    tb: function(key) {
//        var ed = document.createElement("input");
//        ed.value = this.values[key];
//        return ed;
//    },
//    controls: {
//        ed_a: this.tb("a"),
////        ed_b: textBox("b"),
////        ed_c: textBox("c"),
////        ed_gc: textBox("Generation count"),
////        ed_pc: textBox("Population count"),
////        ed_min: textBox("Minimum value"),
////        ed_max: textBox("Maximum value"),
////        ed_mut: textBox("Maximum mutation")
//    }
//};
//
//var doEvol = function() {
//    evol.save();
//}
//
//var onInput = function(evt) {
//    var ed = evt.target;
//    var rng = ed.rng;
//    var val = parseFloat(ed.value);
//    var fixed = val.toFixed(rng[3]);
//    if(isNaN(val) || val < rng[1] || val > rng[2] || 0 != val - fixed) {
//        ed.style.backgroundColor = "red";
//        return;
//    }
//    rng[0] = fixed;
//    ed.style.backgroundColor = null;
//}
//
//var initInputRaw = function(name, row) {
//    var rng = inputParams[name];
//
//    var cell = row.insertCell();
//    cell.innerText = name;
//
//    cell = row.insertCell();
//    var ed = document.createElement("input");
//    ed.rng = rng;
//    ed.oninput = onInput;
//    ed.value = rng[0];
//    cell.appendChild(ed);
//
//    cell = row.insertCell();
//    cell.innerText = rng[1] + " to " + rng[2] + " step: " + 1 / Math.pow(10, rng[3]);
//
//}
//
//var initInputTable = function() {
//    evol.load();
//    var h3 = document.createElement("h3");
//    h3.innerText = "Quadratic equation client side solver based on evolutional algorythm with static mutation"
//
//    var hr = document.createElement("hr");
//    var start = document.createElement("a");
//    start.innerText = "Start Calculation";
//    start.href="javascript:doEvol()";
//    start.id="start";
//
//    var tbl = document.createElement("table");
//
//    for(var i in inputParams)
//        initInputRaw(i, tbl.insertRow());
//
//    document.body.appendChild(h3);
//    document.body.appendChild(tbl);
//    document.body.appendChild(hr);
//    document.body.appendChild(start);
//}

HTMLInputElement.prototype.l = 0;
HTMLInputElement.prototype.h = 100;
HTMLInputElement.prototype.f = 0;
HTMLInputElement.prototype.check = function() {
    if(isNaN(this.value)) {
        this.style.backgroundColor = "red";
        return;
    }
    var val = parseFloat(this.value);
    if(val < this.l || val > this.h || val - val.toFixed(this.f) != 0) {
        this.style.backgroundColor = "red";
        return;
    }
    this.style.backgroundColor = "";
}

HTMLInputElement.prototype.norm = function() {
    if(isNaN(this.value)) {
        this.value = this.l;
    }
    var val = parseFloat(this.value);
    val = Math.max(val, this.l);
    val = Math.min(val, this.h);
    val = val.toFixed(this.f);
    this.value = val;
    this.style.backgroundColor = "yellow";
}

function extendInTbl() {
    inTbl.load = function() {
        var map = JSON.parse(localStorage.values);
            for(var i in this.rows) {
                var row = this.rows[i];
                try {
                    if(row.cells[1].children[0].type != "text")
                        continue;
                    var key = row.cells[0].innerText;
                    row.cells[1].children[0].value = map[key];
                }
                catch(e) {}
            }
    }

    inTbl.save = function() {
        var map = {};
            for(var i in this.rows) {
                var row = this.rows[i];
                try {
                    if(row.cells[1].children[0].type != "text")
                        continue;
                    var key = row.cells[0].innerText;
                    var val = row.cells[1].children[0].value;
                    map[key] = val;
                }
                catch(e) {}
            }
            localStorage.values = JSON.stringify(map);
    }

    inTbl.validate = function() {
        for(var i in this.rows) {
            var row = this.rows[i];
            try {
                if(row.cells[1].children[0].type != "text")
                    continue;
                var val = row.cells[1].children[0].value;
                var min = row.cells[2].innerText;
                var max = row.cells[3].innerText;
                var step = row.cells[4].innerText;
                if(isNaN(val)) {
                    row.cells[1].children[0].value = min;
                    continue;
                }
                val = parseFloat(val);
            }
            catch(e) {}
        }
    }
}

function cmd_evol() {
    inTbl.save();
}

window.onload = function() {
    extendInTbl();
    inTbl.load();
//    ed = document.createElement("input");
//    ed.check();
//    ed.oninput = ed.check;
//    document.body.appendChild(ed);
}


