"use strict";

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

HTMLTableElement.prototype.load = function() {
    if(!localStorage)
        return;
    var map = JSON.parse(localStorage.values);
    for(var i in this.rows) {
        var row = this.rows[i];
        try {
            if(row.cells[1].children[0].tagName != "INPUT")
                continue;
            var key = row.cells[0].innerText;
            row.cells[1].children[0].value = map[key];
        }
        catch(e) {}
    }
}

HTMLTableElement.prototype.save = function() {
    if(!localStorage)
        return;
    var map = {};
    for(var i in this.rows) {
        var row = this.rows[i];
        try {
            if(row.cells[1].children[0].tagName != "INPUT")
                continue;
            var key = row.cells[0].innerText;
            var val = row.cells[1].children[0].value;
            map[key] = val;
        }
        catch(e) {}
    }
    localStorage.values = JSON.stringify(map);
}

HTMLTableElement.prototype.validate = function() {
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

function cmd_evol() {
    inTbl.save();
}


window.onload = function() {
    inTbl.load();
}

