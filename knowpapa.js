var wc = '256,256,256';
var blackc = '-8,-8,-8';
var rc = '0,-8,-8';
var bc = '-8,-8,0';
yc = '0,0,-8';
var oc = '0,1,-8';
var gc = '-8,0,-8';
var pc = '0,-4,0';
var rv = bv = yv = 0;
var rangl = new Array(0, 0, 0);

function rendercolor() {
    document.getElementById('rd').innerHTML = rangl[0] / 32;
    document.getElementById('bl').innerHTML = rangl[2] / 32;
    document.getElementById('ye').innerHTML = rangl[1] / 32;
    var paint = new compute(wc);
    var plus = rv + bv + yv;
    if (plus > 0) {
        var rl = new compute(rc);
        rl.guna(rv * rv / plus);
        paint.jod(rl);
        var bl = new compute(bc);
        bl.guna(bv * bv / plus);
        paint.jod(bl);
        var yl = new compute(yc);
        yl.guna(yv * yv / plus);
        paint.jod(yl);
        var ol = new compute(oc);
        ol.guna((rv * yv) / 32);
        paint.jod(ol);
        var gl = new compute(gc);
        gl.guna((bv * yv) / 32);
        paint.jod(gl);
        var pl = new compute(pc);
        pl.guna((bv * rv) / 32);
        paint.jod(pl);
        var blackl = new compute(blackc);
        blackl.guna((bv * rv * yv) / 1024);
        paint.jod(blackl);
    }
    paint.max(255);
    paint.min(0);
    paint.roundoff();
    document
        .getElementById('mixing-palette')
        .style.backgroundColor = 'rgb(' + paint.value[0] + ',' + paint.value[1] + ',' + paint.value[2] + ')';
    document.getElementById('hexa').innerHTML = (componentToHex(paint.value[0]) +
        componentToHex(paint.value[1]) +
        componentToHex(paint.value[2]));
}

function change(r, y, b) {
    rangl[0] += r;
    rangl[1] += y;
    rangl[2] += b;
    var i = Math.max(rangl[0], rangl[1], rangl[2]);
    if (i > 32) i = 32 / i;
    else i = 1;
    rv = Math.round(rangl[0] * i);
    yv = Math.round(rangl[1] * i);
    bv = Math.round(rangl[2] * i);
    rendercolor();
}

function clearpalette() {
    rangl[0] = rangl[1] = rangl[2] = rv = yv = bv = 0;
    rendercolor();
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function compute(cvs) {
    var y = cvs.split(',');
    this.value = [];
    for (var x = 0; x < y.length; x++) {
        if (Number(y[x]) == y[x]) this.value.push(Number(y[x]));
    }
}

compute.prototype.roundoff = function() {
    for (var x = this.value.length - 1; x >= 0; x--) {
        this.value[x] = Math.round(this.value[x]);
    }
};
compute.prototype.min = function(i) {
    for (var x = this.value.length - 1; x >= 0; x--) {
        if (this.value[x] < i) this.value[x] = i;
    }
};
compute.prototype.max = function(i) {
    for (var x = this.value.length - 1; x >= 0; x--) {
        if (this.value[x] > i) this.value[x] = i;
    }
};
compute.prototype.jod = function(i) {
    for (var x = 0; x < Math.min(this.value.length, i.value.length); x++) {
        this.value[x] += i.value[x];
    }
};
compute.prototype.guna = function(i) {
    for (var x = this.value.length - 1; x >= 0; x--) {
        this.value[x] *= i;
    }
};