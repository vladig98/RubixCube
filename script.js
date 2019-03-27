var pieces = document.getElementsByClassName('pieces');

var edges = [];
var corners = [];

var finalAlg = "";

class Edge {
    constructor(side1, side2) {
        this.side1 = side1;
        this.side2 = side2;
    }
}

class Corner {
    constructor(side1, side2, side3) {
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }
}

window.onload = function () {
    var blue = document.getElementById('blueSide').children;
    var red = document.getElementById('redSide').children;
    var white = document.getElementById('whiteSide').children;
    var yellow = document.getElementById('yellowSide').children;
    var orange = document.getElementById('orangeSide').children;
    var green = document.getElementById('greenSide').children;
    for (var i = 0; i < pieces.length; i++) {
        pieces[i].addEventListener('click', function () {
            switch (this.style.backgroundColor) {
                case 'red':
                    this.style.backgroundColor = 'blue';
                    break;
                case 'blue':
                    this.style.backgroundColor = 'yellow';
                    break;
                case 'yellow':
                    this.style.backgroundColor = 'green';
                    break;
                case 'green':
                    this.style.backgroundColor = 'orange';
                    break;
                case 'orange':
                    this.style.backgroundColor = 'white';
                    break;
                case 'white':
                    this.style.backgroundColor = 'red';
                    break;
                default:
            }
        });
    }
    for (var i = 0; i < blue.length; i++) {
        blue[i].style.backgroundColor = "blue";
        white[i].style.backgroundColor = "white";
        yellow[i].style.backgroundColor = "yellow";
        orange[i].style.backgroundColor = "orange";
        green[i].style.backgroundColor = "green";
        red[i].style.backgroundColor = "red";
    }
    //for (var i = 0; i < blue.length; i++) {
    //    red[i].style.backgroundColor = 'rgb(' + (28 - i) * (i + 1) + ',' + (28 - i) * (i + 1) + ',' + (28 - i) * (i + 1) + ')';
    //}
    edges.push(new Edge(pieces[1], pieces[37]));
    edges.push(new Edge(pieces[3], pieces[10]));
    edges.push(new Edge(pieces[5], pieces[28]));
    edges.push(new Edge(pieces[7], pieces[19]));
    edges.push(new Edge(pieces[12], pieces[41]));
    edges.push(new Edge(pieces[14], pieces[21]));
    edges.push(new Edge(pieces[16], pieces[48]));
    edges.push(new Edge(pieces[23], pieces[30]));
    edges.push(new Edge(pieces[25], pieces[46]));
    edges.push(new Edge(pieces[32], pieces[39]));
    edges.push(new Edge(pieces[34], pieces[50]));
    edges.push(new Edge(pieces[43], pieces[52]));
                                              
    corners.push(new Corner(pieces[6], pieces[18], pieces[11]));
    corners.push(new Corner(pieces[20], pieces[8], pieces[27]));
    corners.push(new Corner(pieces[24], pieces[17], pieces[45]));
    corners.push(new Corner(pieces[26], pieces[33], pieces[47]));
    corners.push(new Corner(pieces[2], pieces[29], pieces[36]));
    corners.push(new Corner(pieces[35], pieces[42], pieces[53]));
    corners.push(new Corner(pieces[44], pieces[15], pieces[51]));
    corners.push(new Corner(pieces[9], pieces[38], pieces[0]));
    //console.log(edges);
}

function Execute(alg) {
    //var alg = document.getElementById('algInput').value;
    if (alg == "" || alg == undefined || alg == " ") {
        //console.log("empty");
        return "";
    }
    var tokens = alg.split(" ");
    for (var i = 0; i < tokens.length; i++) {
        switch (tokens[i]) {
            case "R":
                MoveR();
                break;
            case "R2":
                MoveR2();
                break;
            case "R\'":
                MoveRPrime();
                break;
            case "L":
                MoveL();
                break;
            case "L2":
                MoveL2();
                break;
            case "L\'":
                MoveLPrime();
                break;
            case "U":
                MoveU();
                break;
            case "U2":
                MoveU2();
                break;
            case "U\'":
                MoveUPrime();
                break;
            case "D":
                MoveD();
                break;
            case "D2":
                MoveD2();
                break;
            case "D\'":
                MoveDPrime();
                break;
            case "F":
                MoveF();
                break;
            case "F2":
                MoveF2();
                break;
            case "F\'":
                MoveFPrime();
                break;
            case "B":
                MoveB();
                break;
            case "B2":
                MoveB2();
                break;
            case "B\'":
                MoveBPrime();
                break;
            case "Y":
                MoveY();
                break;
            case "Y\'":
                MoveYPrime();
                break;
            default:
                //console.log("error parsing " + tokens[i]);
                break;
        }
    }
}

function PopEdge(ids) {
    var id1 = ids[0];
    var id2 = ids[1];
    if (id1 == 4 && id2 == 11) {
        Execute("U\'");
        return " U\'";
    } else if (id1 == 2 && id2 == 38) {
        Execute("U2");
        return " U2";
    } else if (id1 == 6 && id2 == 29) {
        Execute("U");
        return " U";
    } else if (id1 == 15 && id2 == 22) {
        Execute("F U\' F\' U");
        return " F U\' F\' U";
    } else if (id1 == 33 && id2 == 40) {
        Execute("R\' U\' R U2");
        return " R\' U\' R U2";
    } else if (id1 == 13 && id2 == 42) {
        Execute("L U L\' U2");
        return " L U L\' U2";
    }
}

function GetEdge(color1, color2) {
    return edges.filter(x => (x.side1.style.backgroundColor == color1 || x.side1.style.backgroundColor == color2) &&
        (x.side2.style.backgroundColor == color1 || x.side2.style.backgroundColor == color2))[0];
}

function GetEdgeIds(edge) {
    return [edge.side1.id.substring("piece".length), edge.side2.id.substring("piece".length)];
}

function GetCorner(color1, color2, color3) {
    return corners.filter(x => (x.side1.style.backgroundColor == color1 || x.side1.style.backgroundColor == color2 || x.side1.style.backgroundColor == color3) &&
        (x.side2.style.backgroundColor == color1 || x.side2.style.backgroundColor == color2 || x.side2.style.backgroundColor == color3) &&
        (x.side3.style.backgroundColor == color1 || x.side3.style.backgroundColor == color2 || x.side3.style.backgroundColor == color3))[0];
}

function GetCornerIds(corner) {
    return [corner.side1.id.substring("piece".length), corner.side2.id.substring("piece".length), corner.side3.id.substring("piece".length)];
}

function Solve() {
    var breakdown = '', tempAlg = '';
    var edge, alg, ids, corner, cids;
    finalAlg = '';


    //Cross Part 1
    {
        edge = GetEdge('blue', 'white');
        ids = GetEdgeIds(edge);
        alg = SolveCross(ids, "BW");
        Execute(alg);
        breakdown += 'Cross Part 1 ' + alg + '\r\n';
        finalAlg += alg;
    }



    //Cross Part 2
    {
        edge = GetEdge('orange', 'white');
        ids = GetEdgeIds(edge);
        alg = SolveCross(ids, "OW");
        Execute(alg);
        breakdown += 'Cross Part 2 ' + alg + '\r\n';
        finalAlg += ' ' + alg;
    }


    //Cross Part 3
    {
        edge = GetEdge('red', 'white');
        ids = GetEdgeIds(edge);
        alg = SolveCross(ids, "RW");
        Execute(alg);
        breakdown += 'Cross Part 3 ' + alg + '\r\n';
        finalAlg += ' ' + alg;
    }



    //Cross Part 4
    {
        edge = GetEdge('green', 'white');
        ids = GetEdgeIds(edge);
        alg = SolveCross(ids, "GW");
        Execute(alg);
        breakdown += 'Cross Part 4 ' + alg + '\r\n';
        finalAlg += ' ' + alg;
    }



    //F2L Pair 1
    {
        corner = GetCorner('blue', 'red', 'white');
        edge = GetEdge('blue', 'red');
        ids = GetEdgeIds(edge);
        cids = GetCornerIds(corner);
        tempAlg = PopEdge(ids);
        edge = GetEdge('blue', 'red');
        corner = GetCorner('blue', 'red', 'white');
        cids = GetCornerIds(corner);
        ids = GetEdgeIds(edge);
        finalAlg += tempAlg + ' ';
        
        alg = SolveF2L(ids, cids, "blue-red", "blue-red-white");
        Execute(alg);
        Execute("Y")
        tempAlg += ' ' + alg + ' Y';
        breakdown += 'F2L Pair 1 ' + tempAlg + '\r\n';
        tempAlg = '';
        finalAlg += ' ' + alg + ' Y ';
    }


    //F2L Pair 2
    {
        corner = GetCorner('red', 'green', 'white');
        edge = GetEdge('red', 'green');
        ids = GetEdgeIds(edge);
        cids = GetCornerIds(corner);
        tempAlg = PopEdge(ids);
        edge = GetEdge('red', 'green');
        corner = GetCorner('red', 'green', 'white');
        cids = GetCornerIds(corner);
        ids = GetEdgeIds(edge);
        finalAlg += tempAlg + ' ';

        alg = SolveF2L(ids, cids, "red-green", "red-green-white");
        Execute(alg);
        Execute("Y")
        tempAlg += ' ' + alg + ' Y';
        breakdown += 'F2L Pair 2 ' + tempAlg + '\r\n';
        tempAlg = '';
        finalAlg += ' ' + alg + ' Y ';
    }



    //F2L Pair 3
    {
        corner = GetCorner('green', 'orange', 'white');
        edge = GetEdge('green', 'orange');
        ids = GetEdgeIds(edge);
        cids = GetCornerIds(corner);
        tempAlg = PopEdge(ids);
        edge = GetEdge('green', 'orange');
        corner = GetCorner('green', 'orange', 'white');
        cids = GetCornerIds(corner);
        ids = GetEdgeIds(edge);
        finalAlg += tempAlg + ' ';

        alg = SolveF2L(ids, cids, "green-orange", "green-orange-white");
        Execute(alg);
        Execute("Y")
        tempAlg += ' ' + alg + ' Y';
        breakdown += 'F2L Pair 3 ' + tempAlg + '\r\n';
        tempAlg = '';
        finalAlg += ' ' + alg + ' Y ';
    }



    //F2L Pair 4
    {
        corner = GetCorner('orange', 'blue', 'white');
        edge = GetEdge('orange', 'blue');
        ids = GetEdgeIds(edge);
        cids = GetCornerIds(corner);
        tempAlg = PopEdge(ids);
        edge = GetEdge('orange', 'blue');
        corner = GetCorner('orange', 'blue', 'white');
        cids = GetCornerIds(corner);
        ids = GetEdgeIds(edge);
        finalAlg += tempAlg + ' ';

        alg = SolveF2L(ids, cids, "orange-blue", "orange-blue-white");
        Execute(alg);
        Execute("Y")
        tempAlg += ' ' + alg + ' Y';
        breakdown += 'F2L Pair 4 ' + tempAlg + '\r\n';
        tempAlg = '';
        finalAlg += ' ' + alg + ' Y ';
    }


    //OLL
    {
        var breakPoint = 0;
        tempAlg = '';
        while (!YellowSide()) {
            alg = SolveOLL();
            Execute(alg);
            tempAlg += ' ' + alg;
            finalAlg += ' ' + alg;
            breakPoint++;
            if (breakPoint > 3) {
                break;
            }
        }

        for (var i = 0; i < 2; i++) {
            tempAlg = replacement(tempAlg);
        }
        breakdown += 'OLL ' + tempAlg + '\r\n';
    }


    //PLL
    {
        breakPoint = 0;
        tempAlg = '';
        while (!Solved()) {
            alg = SolvePLL();
            Execute(alg);
            tempAlg += ' ' + alg;
            finalAlg += ' ' + alg;
            breakPoint++;
            if (breakPoint > 3) {
                break;
            }
        }
        for (var i = 0; i < 2; i++) {
            tempAlg = replacement(tempAlg);
        }
        breakdown += 'PLL ' + tempAlg + '\r\n';
    }



    //Last Layer Allignment
    {
        breakPoint = 0;
        breakdown += 'Final Alignment';
        while (!CheckEnd()) {
            Execute("U");
            breakdown += ' U';
            finalAlg += ' U';
            breakPoint++;
            if (breakPoint >= 3) {
                break;
            }
        }
        breakPoint = 0;
        while (breakPoint < 2) {
            finalAlg = replacement(finalAlg);
            breakPoint++;
        }
    }


    for (var i = 0; i < 2; i++) {
        breakdown = replacement(breakdown);
    }


    //Printing Solution
    console.log(breakdown);
    console.log(finalAlg);
}

function replacement(replacementAlg) {
    //replacementAlg = replacementAlg.replaceAll('U U\' ', '');
    //replacementAlg = replacementAlg.replaceAll('U U ', ' U2 ');
    //replacementAlg = replacementAlg.replaceAll('U U2 ', ' U\' ');
    //replacementAlg = replacementAlg.replaceAll('U\' U\' ', ' U2 ');
    //replacementAlg = replacementAlg.replaceAll('U\' U2 ', ' U ');
    //replacementAlg = replacementAlg.replaceAll('U\' U ', '');
    //replacementAlg = replacementAlg.replaceAll('U2 U\' ', ' U ');
    //replacementAlg = replacementAlg.replaceAll('U2 U ', ' U\' ');
    //replacementAlg = replacementAlg.replaceAll('U2 U2 ', '');
    //replacementAlg = replacementAlg.replaceAll('R R\' ', '');
    //replacementAlg = replacementAlg.replaceAll('R R ', ' R2 ');
    //replacementAlg = replacementAlg.replaceAll('R R2 ', ' R\' ');
    //replacementAlg = replacementAlg.replaceAll('R\' R\' ', ' R2 ');
    //replacementAlg = replacementAlg.replaceAll('R\' R2 ', ' R ');
    //replacementAlg = replacementAlg.replaceAll('R\' R ', '');
    //replacementAlg = replacementAlg.replaceAll('R2 R\' ', ' R ');
    //replacementAlg = replacementAlg.replaceAll('R2 R ', ' R\' ');
    //replacementAlg = replacementAlg.replaceAll('R2 R2 ', '');
    //replacementAlg = replacementAlg.replaceAll('B B\' ', '');
    //replacementAlg = replacementAlg.replaceAll('B B ', ' B2 ');
    //replacementAlg = replacementAlg.replaceAll('B B2 ', ' B\' ');
    //replacementAlg = replacementAlg.replaceAll('B\' B\' ', ' B2 ');
    //replacementAlg = replacementAlg.replaceAll('B\' B2 ', ' B ');
    //replacementAlg = replacementAlg.replaceAll('B\' B ', '');
    //replacementAlg = replacementAlg.replaceAll('B2 B\' ', ' B ');
    //replacementAlg = replacementAlg.replaceAll('B2 B ', ' B\' ');
    //replacementAlg = replacementAlg.replaceAll('B2 B2 ', '');
    //replacementAlg = replacementAlg.replaceAll('L L\' ', '');
    //replacementAlg = replacementAlg.replaceAll('L L ', ' L2 ');
    //replacementAlg = replacementAlg.replaceAll('L L2 ', ' L\' ');
    //replacementAlg = replacementAlg.replaceAll('L\' L\' ', ' L2 ');
    //replacementAlg = replacementAlg.replaceAll('L\' L2 ', ' L ');
    //replacementAlg = replacementAlg.replaceAll('L\' L ', '');
    //replacementAlg = replacementAlg.replaceAll('L2 L\' ', ' L ');
    //replacementAlg = replacementAlg.replaceAll('L2 L ', ' L\' ');
    //replacementAlg = replacementAlg.replaceAll('L2 L2 ', '');
    //replacementAlg = replacementAlg.replaceAll('F F\' ', '');
    //replacementAlg = replacementAlg.replaceAll('F F ', ' F2 ');
    //replacementAlg = replacementAlg.replaceAll('F F2 ', ' F\' ');
    //replacementAlg = replacementAlg.replaceAll('F\' F\' ', ' F2 ');
    //replacementAlg = replacementAlg.replaceAll('F\' F2 ', ' F ');
    //replacementAlg = replacementAlg.replaceAll('F\' F ', '');
    //replacementAlg = replacementAlg.replaceAll('F2 F\' ', ' F ');
    //replacementAlg = replacementAlg.replaceAll('F2 F ', ' F\' ');
    //replacementAlg = replacementAlg.replaceAll('F2 F2 ', '');
    //replacementAlg = replacementAlg.replaceAll('D D\' ', '');
    //replacementAlg = replacementAlg.replaceAll('D D ', ' D2 ');
    //replacementAlg = replacementAlg.replaceAll('D D2 ', ' D\' ');
    //replacementAlg = replacementAlg.replaceAll('D\' D\' ', ' D2 ');
    //replacementAlg = replacementAlg.replaceAll('D\' D2 ', ' D ');
    //replacementAlg = replacementAlg.replaceAll('D\' D ', '');
    //replacementAlg = replacementAlg.replaceAll('D2 D\' ', ' D ');
    //replacementAlg = replacementAlg.replaceAll('D2 D ', ' D\' ');
    //replacementAlg = replacementAlg.replaceAll('D2 D2 ', '');
    //replacementAlg = replacementAlg.replaceAll('  ', ' ');
    //replacementAlg = replacementAlg.replaceAll('undefined Y', '');
    //replacementAlg = replacementAlg.replaceAll('undefined', '');
    return replacementAlg;
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function CheckCross() {
    if (pieces[46].style.backgroundColor == 'white' &&
        pieces[48].style.backgroundColor == 'white' &&
        pieces[49].style.backgroundColor == 'white' &&
        pieces[50].style.backgroundColor == 'white' &&
        pieces[52].style.backgroundColor == 'white') {
        return true;
    }
    return false;
}

function CheckEnd() {
    var blue = document.getElementById('blueSide').children;
    var red = document.getElementById('redSide').children;
    var white = document.getElementById('whiteSide').children;
    var yellow = document.getElementById('yellowSide').children;
    var orange = document.getElementById('orangeSide').children;
    var green = document.getElementById('greenSide').children;
    for (var i = 0; i < blue.length; i++) {
        if (blue[i].style.backgroundColor != "blue") {
            return false;
        }
        if (white[i].style.backgroundColor != "white") {
            return false;
        }
        if (yellow[i].style.backgroundColor != "yellow") {
            return false;
        }
        if (orange[i].style.backgroundColor != "orange") {
            return false;
        }
        if (green[i].style.backgroundColor != "green") {
            return false;
        }
        if (red[i].style.backgroundColor != "red") {
            return false;
        }
    }
    return true;
}

function Solved() {
    if (!CheckCross()) {
        return false;
    }
    if (!CheckF2L()) {
        return false;
    }
    if (!YellowSide()) {
        return false;
    }
    if (pieces[10].style.backgroundColor == pieces[11].style.backgroundColor &&
        pieces[9].style.backgroundColor == pieces[10].style.backgroundColor &&
        pieces[18].style.backgroundColor == pieces[19].style.backgroundColor &&
        pieces[18].style.backgroundColor == pieces[20].style.backgroundColor &&
        pieces[27].style.backgroundColor == pieces[28].style.backgroundColor &&
        pieces[27].style.backgroundColor == pieces[29].style.backgroundColor &&
        pieces[36].style.backgroundColor == pieces[37].style.backgroundColor &&
        pieces[36].style.backgroundColor == pieces[38].style.backgroundColor) {
        return true;
    }
    return false;
}

function SolvePLL() {
     if (pieces[9].style.backgroundColor == pieces[29].style.backgroundColor &&
        pieces[9].style.backgroundColor == pieces[19].style.backgroundColor &&
        pieces[11].style.backgroundColor == pieces[27].style.backgroundColor &&
        pieces[11].style.backgroundColor == pieces[37].style.backgroundColor &&
        pieces[18].style.backgroundColor == pieces[38].style.backgroundColor &&
        pieces[18].style.backgroundColor == pieces[10].style.backgroundColor &&
        pieces[20].style.backgroundColor == pieces[36].style.backgroundColor &&
        pieces[20].style.backgroundColor == pieces[28].style.backgroundColor) {
        return "R B\' R\' F R B R\' F\' R B R\' F R B\' R\' F\'";
    } else if (pieces[11].style.backgroundColor == pieces[28].style.backgroundColor &&
        pieces[18].style.backgroundColor == pieces[19].style.backgroundColor &&
        pieces[18].style.backgroundColor == pieces[38].style.backgroundColor &&
        pieces[10].style.backgroundColor == pieces[29].style.backgroundColor &&
        pieces[36].style.backgroundColor == pieces[37].style.backgroundColor &&
        pieces[36].style.backgroundColor == pieces[20].style.backgroundColor) {
        return "R\' U L\' U2 R U\' L R\' U L\' U2 R U\' L U\'";
    } else if (pieces[9].style.backgroundColor == pieces[28].style.backgroundColor &&
        pieces[19].style.backgroundColor == pieces[20].style.backgroundColor &&
        pieces[19].style.backgroundColor == pieces[36].style.backgroundColor &&
        pieces[10].style.backgroundColor == pieces[27].style.backgroundColor &&
        pieces[37].style.backgroundColor == pieces[38].style.backgroundColor &&
        pieces[37].style.backgroundColor == pieces[18].style.backgroundColor) {
        return "L U\' R U2 L\' U R\' L U\' R U2 L\' U R\' U";
    } else if (pieces[9].style.backgroundColor == pieces[11].style.backgroundColor &&
        pieces[9].style.backgroundColor == pieces[19].style.backgroundColor &&
        pieces[10].style.backgroundColor == pieces[20].style.backgroundColor &&
        pieces[18].style.backgroundColor == pieces[29].style.backgroundColor &&
        pieces[18].style.backgroundColor == pieces[37].style.backgroundColor &&
        pieces[36].style.backgroundColor == pieces[20].style.backgroundColor &&
        pieces[38].style.backgroundColor == pieces[28].style.backgroundColor) {
        return "R U R\' F2 D\' L U\' L\' U L\' D F2";
    } else if (pieces[9].style.backgroundColor == pieces[11].style.backgroundColor &&
        pieces[9].style.backgroundColor == pieces[37].style.backgroundColor &&
        pieces[10].style.backgroundColor == pieces[36].style.backgroundColor &&
        pieces[18].style.backgroundColor == pieces[28].style.backgroundColor &&
        pieces[19].style.backgroundColor == pieces[27].style.backgroundColor &&
        pieces[19].style.backgroundColor == pieces[38].style.backgroundColor &&
        pieces[20].style.backgroundColor == pieces[36].style.backgroundColor) {
        return "R\' U\' R B2 D L\' U L U\' L D\' B2";
    } else if (pieces[9].style.backgroundColor == pieces[11].style.backgroundColor &&
        pieces[9].style.backgroundColor == pieces[28].style.backgroundColor &&
        pieces[10].style.backgroundColor == pieces[29].style.backgroundColor &&
        pieces[18].style.backgroundColor == pieces[29].style.backgroundColor &&
        pieces[19].style.backgroundColor == pieces[27].style.backgroundColor &&
        pieces[19].style.backgroundColor == pieces[38].style.backgroundColor &&
        pieces[20].style.backgroundColor == pieces[37].style.backgroundColor) {
        return "R2 D\' F U\' F U F\' D R2 B U\' B\'";
    } else if (pieces[9].style.backgroundColor == pieces[11].style.backgroundColor &&
        pieces[9].style.backgroundColor == pieces[28].style.backgroundColor &&
        pieces[10].style.backgroundColor == pieces[27].style.backgroundColor &&
        pieces[18].style.backgroundColor == pieces[29].style.backgroundColor &&
        pieces[18].style.backgroundColor == pieces[37].style.backgroundColor &&
        pieces[19].style.backgroundColor == pieces[36].style.backgroundColor &&
        pieces[27].style.backgroundColor == pieces[38].style.backgroundColor) {
        return "R2 D B\' U B\' U\' B D\' R2 F\' U F";
    } else if (pieces[27].style.backgroundColor == pieces[10].style.backgroundColor &&
        pieces[20].style.backgroundColor == pieces[37].style.backgroundColor && 
        pieces[29].style.backgroundColor == pieces[19].style.backgroundColor &&
        pieces[36].style.backgroundColor == pieces[28].style.backgroundColor &&
        pieces[38].style.backgroundColor == pieces[28].style.backgroundColor &&
        pieces[9].style.backgroundColor == pieces[37].style.backgroundColor) {
        return "R\' F R\' B2 R F\' R\' B2 R2";
    } else if (pieces[11].style.backgroundColor == pieces[19].style.backgroundColor &&
        pieces[18].style.backgroundColor == pieces[28].style.backgroundColor &&
        pieces[20].style.backgroundColor == pieces[28].style.backgroundColor &&
        pieces[27].style.backgroundColor == pieces[37].style.backgroundColor &&
        pieces[29].style.backgroundColor == pieces[10].style.backgroundColor &&
        pieces[36].style.backgroundColor == pieces[19].style.backgroundColor) {
        return "R B\' R F2 R\' B R F2 R2";
    } else if (pieces[10].style.backgroundColor == pieces[18].style.backgroundColor &&
        pieces[19].style.backgroundColor == pieces[27].style.backgroundColor &&
        pieces[28].style.backgroundColor == pieces[9].style.backgroundColor) {
        return "R U\' R U R U R U\' R\' U\' R2";
    } else if (pieces[10].style.backgroundColor == pieces[27].style.backgroundColor &&
        pieces[19].style.backgroundColor == pieces[11].style.backgroundColor &&
        pieces[28].style.backgroundColor == pieces[20].style.backgroundColor) {
        return "R2 U R U R\' U\' R\' U\' R\' U R\'";
    } else if (pieces[10].style.backgroundColor == pieces[27].style.backgroundColor &&
        pieces[19].style.backgroundColor == pieces[36].style.backgroundColor &&
        pieces[28].style.backgroundColor == pieces[11].style.backgroundColor &&
        pieces[37].style.backgroundColor == pieces[20].style.backgroundColor) {
        return "L2 R2 D L2 R2 U2 L2 R2 D L2 R2";
    } else if (pieces[10].style.backgroundColor == pieces[20].style.backgroundColor &&
        pieces[10].style.backgroundColor == pieces[36].style.backgroundColor &&
        pieces[27].style.backgroundColor == pieces[37].style.backgroundColor &&
        pieces[28].style.backgroundColor == pieces[11].style.backgroundColor &&
        pieces[29].style.backgroundColor == pieces[18].style.backgroundColor) {
        return "R U R\' U\' R\' F R2 U\' R\' U\' R U R\' F\'";
    } else if (pieces[19].style.backgroundColor == pieces[20].style.backgroundColor &&
        pieces[19].style.backgroundColor == pieces[36].style.backgroundColor &&
        pieces[27].style.backgroundColor == pieces[37].style.backgroundColor &&
        pieces[28].style.backgroundColor == pieces[18].style.backgroundColor &&
        pieces[29].style.backgroundColor == pieces[18].style.backgroundColor) {
        return "R U R\' F\' R U R\' U\' R\' F R2 U\' R\' U\'";
    } else if (pieces[9].style.backgroundColor == pieces[28].style.backgroundColor &&
        pieces[10].style.backgroundColor == pieces[36].style.backgroundColor &&
        pieces[20].style.backgroundColor == pieces[36].style.backgroundColor &&
        pieces[27].style.backgroundColor == pieces[11].style.backgroundColor &&
        pieces[37].style.backgroundColor == pieces[11].style.backgroundColor &&
        pieces[38].style.backgroundColor == pieces[19].style.backgroundColor) {
        return "F R U\' R\' U\' R U R\' F\' R U R\' U\' R\' F R F\'";
    } else if (pieces[9].style.backgroundColor == pieces[37].style.backgroundColor &&
        pieces[19].style.backgroundColor == pieces[27].style.backgroundColor &&
        pieces[28].style.backgroundColor == pieces[18].style.backgroundColor &&
        pieces[29].style.backgroundColor == pieces[37].style.backgroundColor &&
        pieces[36].style.backgroundColor == pieces[10].style.backgroundColor &&
        pieces[38].style.backgroundColor == pieces[27].style.backgroundColor) {
        return "R\' U2 R U2 R\' F R U R\' U\' R\' F\' R2 U\'";
    } else if (pieces[9].style.backgroundColor == pieces[29].style.backgroundColor &&
        pieces[20].style.backgroundColor == pieces[36].style.backgroundColor &&
        pieces[27].style.backgroundColor == pieces[10].style.backgroundColor &&
        pieces[28].style.backgroundColor == pieces[36].style.backgroundColor &&
        pieces[37].style.backgroundColor == pieces[29].style.backgroundColor &&
        pieces[38].style.backgroundColor == pieces[19].style.backgroundColor) {
        return "R' U R\' U\' B\' R\' B2 U\' B\' U B\' R B R";
    } else if (pieces[10].style.backgroundColor == pieces[29].style.backgroundColor &&
        pieces[11].style.backgroundColor == pieces[19].style.backgroundColor &&
        pieces[18].style.backgroundColor == pieces[29].style.backgroundColor &&
        pieces[20].style.backgroundColor == pieces[9].style.backgroundColor &&
        pieces[27].style.backgroundColor == pieces[19].style.backgroundColor &&
        pieces[28].style.backgroundColor == pieces[9].style.backgroundColor) {
        return "R\' U R\' B\' R\' B2 U\' B\' U B\' R B U\' R";
    } else if (pieces[10].style.backgroundColor == pieces[18].style.backgroundColor &&
        pieces[11].style.backgroundColor == pieces[19].style.backgroundColor &&
        pieces[28].style.backgroundColor == pieces[36].style.backgroundColor &&
        pieces[27].style.backgroundColor == pieces[37].style.backgroundColor) {
        return "L2 R2 D L2 R2 U L R\' F2 L2 R2 B2 L R\' U2";
    } else if (pieces[10].style.backgroundColor == pieces[9].style.backgroundColor &&
        pieces[10].style.backgroundColor == pieces[29].style.backgroundColor &&
        pieces[36].style.backgroundColor == pieces[37].style.backgroundColor &&
        pieces[36].style.backgroundColor == pieces[11].style.backgroundColor &&
        pieces[28].style.backgroundColor == pieces[38].style.backgroundColor) {
        return "R\' U L\' U2 R U\' R\' U2 R L U\'";
    } else {
        return "U";
    }
}

function YellowSide() {
    for (var i = 0; i < 9; i++) {
        if (pieces[i].style.backgroundColor != 'yellow') {
            return false;
        }
    }
    return true;
}

function SolveOLL() {
    if (pieces[2].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[8].style.backgroundColor == 'yellow' && pieces[3].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[9].style.backgroundColor == 'yellow'
        && pieces[11].style.backgroundColor == 'yellow' && pieces[19].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "F R U R\' U\' F\'"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[3].style.backgroundColor == 'yellow' && pieces[28].style.backgroundColor == 'yellow'
        && pieces[36].style.backgroundColor == 'yellow' && pieces[9].style.backgroundColor == 'yellow'
        && pieces[11].style.backgroundColor == 'yellow' && pieces[19].style.backgroundColor == 'yellow'
        && pieces[20].style.backgroundColor == 'yellow') {
        return "F R U R\' U\' R U R\' U\' F\'"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[3].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[7].style.backgroundColor == 'yellow' && pieces[18].style.backgroundColor == 'yellow'
        && pieces[20].style.backgroundColor == 'yellow' && pieces[36].style.backgroundColor == 'yellow'
        && pieces[38].style.backgroundColor == 'yellow') {
        return "F R U R\' U\' R U R\' U\' R U R\' U\' F\'"
    } else if (pieces[2].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[5].style.backgroundColor == 'yellow' && pieces[7].style.backgroundColor == 'yellow'
        && pieces[8].style.backgroundColor == 'yellow' && pieces[9].style.backgroundColor == 'yellow'
        && pieces[10].style.backgroundColor == 'yellow' && pieces[11].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "B U L U\' L\' B\'"
    } else if (pieces[3].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[5].style.backgroundColor == 'yellow' && pieces[9].style.backgroundColor == 'yellow'
        && pieces[11].style.backgroundColor == 'yellow' && pieces[19].style.backgroundColor == 'yellow'
        && pieces[20].style.backgroundColor == 'yellow' && pieces[36].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "B U L U\' L\' U L U\' L\' B\'"
    } else if (pieces[0].style.backgroundColor == 'yellow' && pieces[3].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[6].style.backgroundColor == 'yellow'
        && pieces[7].style.backgroundColor == 'yellow' && pieces[27].style.backgroundColor == 'yellow'
        && pieces[28].style.backgroundColor == 'yellow' && pieces[29].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "B\' U\' R\' U R B"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[5].style.backgroundColor == 'yellow' && pieces[10].style.backgroundColor == 'yellow'
        && pieces[18].style.backgroundColor == 'yellow' && pieces[19].style.backgroundColor == 'yellow'
        && pieces[27].style.backgroundColor == 'yellow' && pieces[29].style.backgroundColor == 'yellow'
        && pieces[38].style.backgroundColor == 'yellow') {
        return "F\' L\' U\' L U L\' U'\ L U F"
    } else if (pieces[2].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[7].style.backgroundColor == 'yellow'
        && pieces[9].style.backgroundColor == 'yellow' && pieces[10].style.backgroundColor == 'yellow'
        && pieces[18].style.backgroundColor == 'yellow' && pieces[27].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "F R U R\' U\' F\' U F R U R\' U\' F\'"
    } else if (pieces[0].style.backgroundColor == 'yellow' && pieces[3].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[7].style.backgroundColor == 'yellow'
        && pieces[11].style.backgroundColor == 'yellow' && pieces[20].style.backgroundColor == 'yellow'
        && pieces[28].style.backgroundColor == 'yellow' && pieces[29].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "F\' L\' U\' L U F Y F R U R\' U\' F' Y'"
    } else if (pieces[2].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[9].style.backgroundColor == 'yellow' && pieces[10].style.backgroundColor == 'yellow'
        && pieces[18].style.backgroundColor == 'yellow' && pieces[19].style.backgroundColor == 'yellow'
        && pieces[27].style.backgroundColor == 'yellow' && pieces[28].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "B U L U\' L\' B\' U F R U R\' U\' F\'"
    } else if (pieces[8].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[11].style.backgroundColor == 'yellow' && pieces[10].style.backgroundColor == 'yellow'
        && pieces[19].style.backgroundColor == 'yellow' && pieces[28].style.backgroundColor == 'yellow'
        && pieces[38].style.backgroundColor == 'yellow' && pieces[29].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "B U L U\' L\' B\' U\' F R U R\' U\' F\'"
    } else if (pieces[4].style.backgroundColor == 'yellow' && pieces[9].style.backgroundColor == 'yellow'
        && pieces[10].style.backgroundColor == 'yellow' && pieces[11].style.backgroundColor == 'yellow'
        && pieces[19].style.backgroundColor == 'yellow' && pieces[20].style.backgroundColor == 'yellow'
        && pieces[28].style.backgroundColor == 'yellow' && pieces[36].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "F R U R\' U\' F\' B U L U\' L\' B\'"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[3].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[7].style.backgroundColor == 'yellow' && pieces[9].style.backgroundColor == 'yellow'
        && pieces[11].style.backgroundColor == 'yellow' && pieces[20].style.backgroundColor == 'yellow'
        && pieces[36].style.backgroundColor == 'yellow') {
        return "R U2 R2 U\' R2 U\' R2 U2 R"
    } else if (pieces[2].style.backgroundColor == 'yellow' && pieces[3].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[9].style.backgroundColor == 'yellow' && pieces[18].style.backgroundColor == 'yellow'
        && pieces[19].style.backgroundColor == 'yellow' && pieces[27].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "L F L\' R U R\' U\' L F\' L\'"
    } else if (pieces[0].style.backgroundColor == 'yellow' && pieces[3].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[11].style.backgroundColor == 'yellow' && pieces[19].style.backgroundColor == 'yellow'
        && pieces[20].style.backgroundColor == 'yellow' && pieces[29].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "R\' F\' R L\' U\' L U R\' F R"
    } else if (pieces[0].style.backgroundColor == 'yellow' && pieces[3].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[8].style.backgroundColor == 'yellow' && pieces[19].style.backgroundColor == 'yellow'
        && pieces[11].style.backgroundColor == 'yellow' && pieces[36].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "R\' F R U R\' U\' F\' U R"
    } else if (pieces[0].style.backgroundColor == 'yellow' && pieces[2].style.backgroundColor == 'yellow'
        && pieces[3].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[5].style.backgroundColor == 'yellow' && pieces[6].style.backgroundColor == 'yellow'
        && pieces[8].style.backgroundColor == 'yellow' && pieces[19].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "R U R\' U\' L R\' F R F\' L\'"
    } else if (pieces[0].style.backgroundColor == 'yellow' && pieces[2].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[6].style.backgroundColor == 'yellow'
        && pieces[8].style.backgroundColor == 'yellow' && pieces[10].style.backgroundColor == 'yellow'
        && pieces[19].style.backgroundColor == 'yellow' && pieces[28].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "L\' R B R B R\' B\' L2 R2 F R F\' L\'"
    } else if (pieces[3].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[5].style.backgroundColor == 'yellow' && pieces[9].style.backgroundColor == 'yellow'
        && pieces[11].style.backgroundColor == 'yellow' && pieces[19].style.backgroundColor == 'yellow'
        && pieces[27].style.backgroundColor == 'yellow' && pieces[29].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "F R U R\' U\' R F\' L F R\' F\' L\'"
    } else if (pieces[2].style.backgroundColor == 'yellow' && pieces[3].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[8].style.backgroundColor == 'yellow' && pieces[18].style.backgroundColor == 'yellow'
        && pieces[19].style.backgroundColor == 'yellow' && pieces[38].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "R U R\' U'\ R\' F R F\'"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[2].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[8].style.backgroundColor == 'yellow' && pieces[3].style.backgroundColor == 'yellow'
        && pieces[7].style.backgroundColor == 'yellow' && pieces[18].style.backgroundColor == 'yellow'
        && pieces[38].style.backgroundColor == 'yellow') {
        return "L F R\' F\' L\' F R F\'"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[2].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[6].style.backgroundColor == 'yellow' && pieces[3].style.backgroundColor == 'yellow'
        && pieces[7].style.backgroundColor == 'yellow' && pieces[9].style.backgroundColor == 'yellow'
        && pieces[20].style.backgroundColor == 'yellow') {
        return "F\' L F R\' F\' L\' F R"
    } else if (pieces[0].style.backgroundColor == 'yellow' && pieces[1].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[10].style.backgroundColor == 'yellow'
        && pieces[6].style.backgroundColor == 'yellow' && pieces[27].style.backgroundColor == 'yellow'
        && pieces[7].style.backgroundColor == 'yellow' && pieces[28].style.backgroundColor == 'yellow'
        && pieces[29].style.backgroundColor == 'yellow') {
        return "R\' U\' R\' F R F\' U R"
    } else if (pieces[9].style.backgroundColor == 'yellow' && pieces[10].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[11].style.backgroundColor == 'yellow'
        && pieces[19].style.backgroundColor == 'yellow' && pieces[27].style.backgroundColor == 'yellow'
        && pieces[28].style.backgroundColor == 'yellow' && pieces[29].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "R U2 R2 F R F\' U2 R\' F R F\'"
    } else if (pieces[0].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[5].style.backgroundColor == 'yellow' && pieces[7].style.backgroundColor == 'yellow'
        && pieces[8].style.backgroundColor == 'yellow' && pieces[10].style.backgroundColor == 'yellow'
        && pieces[18].style.backgroundColor == 'yellow' && pieces[29].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "R U2 R2 F R F\' R U2 R\'"
    } else if (pieces[0].style.backgroundColor == 'yellow' && pieces[2].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[10].style.backgroundColor == 'yellow'
        && pieces[11].style.backgroundColor == 'yellow' && pieces[19].style.backgroundColor == 'yellow'
        && pieces[27].style.backgroundColor == 'yellow' && pieces[28].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "L\' R B R B R\' B\' L R2 F R F\'"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[5].style.backgroundColor == 'yellow' && pieces[9].style.backgroundColor == 'yellow'
        && pieces[10].style.backgroundColor == 'yellow' && pieces[11].style.backgroundColor == 'yellow'
        && pieces[19].style.backgroundColor == 'yellow' && pieces[20].style.backgroundColor == 'yellow'
        && pieces[36].style.backgroundColor == 'yellow') {
        return "R\' F R\' F\' R2 U2 B\' R B R\'"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[2].style.backgroundColor == 'yellow'
        && pieces[3].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[6].style.backgroundColor == 'yellow' && pieces[19].style.backgroundColor == 'yellow'
        && pieces[27].style.backgroundColor == 'yellow' && pieces[28].style.backgroundColor == 'yellow'
        && pieces[38].style.backgroundColor == 'yellow') {
        return "R U R\' U R U\' R\' U\' R\' F R F\'"
    } else if (pieces[0].style.backgroundColor == 'yellow' && pieces[1].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[8].style.backgroundColor == 'yellow' && pieces[10].style.backgroundColor == 'yellow'
        && pieces[11].style.backgroundColor == 'yellow' && pieces[19].style.backgroundColor == 'yellow'
        && pieces[36].style.backgroundColor == 'yellow') {
        return "L\' U\' L U\' L\' U L U L F\' L\' F"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[7].style.backgroundColor == 'yellow' && pieces[10].style.backgroundColor == 'yellow'
        && pieces[18].style.backgroundColor == 'yellow' && pieces[27].style.backgroundColor == 'yellow'
        && pieces[28].style.backgroundColor == 'yellow' && pieces[29].style.backgroundColor == 'yellow'
        && pieces[38].style.backgroundColor == 'yellow') {
        return "R U R\' U R U\' B U\' B\' R\'"
    } else if (pieces[0].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[8].style.backgroundColor == 'yellow' && pieces[11].style.backgroundColor == 'yellow'
        && pieces[10].style.backgroundColor == 'yellow' && pieces[19].style.backgroundColor == 'yellow'
        && pieces[28].style.backgroundColor == 'yellow' && pieces[36].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "R U R\' U R\' F R F\' U2 R\' F R F\'"
    } else if (pieces[4].style.backgroundColor == 'yellow' && pieces[6].style.backgroundColor == 'yellow'
        && pieces[8].style.backgroundColor == 'yellow' && pieces[10].style.backgroundColor == 'yellow'
        && pieces[19].style.backgroundColor == 'yellow' && pieces[28].style.backgroundColor == 'yellow'
        && pieces[38].style.backgroundColor == 'yellow' && pieces[36].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "F R U R' U F' U2 F' L F L\'"
    } else if (pieces[4].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[7].style.backgroundColor == 'yellow' && pieces[8].style.backgroundColor == 'yellow'
        && pieces[10].style.backgroundColor == 'yellow' && pieces[11].style.backgroundColor == 'yellow'
        && pieces[29].style.backgroundColor == 'yellow' && pieces[38].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "L\' B2 R B R\' B L"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[3].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[6].style.backgroundColor == 'yellow'
        && pieces[19].style.backgroundColor == 'yellow' && pieces[20].style.backgroundColor == 'yellow'
        && pieces[28].style.backgroundColor == 'yellow' && pieces[29].style.backgroundColor == 'yellow'
        && pieces[38].style.backgroundColor == 'yellow') {
        return "L F R\' F R F2 L\'"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[3].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[6].style.backgroundColor == 'yellow' && pieces[7].style.backgroundColor == 'yellow'
        && pieces[20].style.backgroundColor == 'yellow' && pieces[29].style.backgroundColor == 'yellow'
        && pieces[38].style.backgroundColor == 'yellow') {
        return "R U R\' U R U2 R\'"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[2].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[8].style.backgroundColor == 'yellow'
        && pieces[3].style.backgroundColor == 'yellow' && pieces[9].style.backgroundColor == 'yellow'
        && pieces[11].style.backgroundColor == 'yellow' && pieces[19].style.backgroundColor == 'yellow'
        && pieces[28].style.backgroundColor == 'yellow') {
        return "R\' F R F\' R\' F R F\' R U R\' U\' R U R\'"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[2].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[3].style.backgroundColor == 'yellow' && pieces[7].style.backgroundColor == 'yellow'
        && pieces[9].style.backgroundColor == 'yellow' && pieces[18].style.backgroundColor == 'yellow'
        && pieces[27].style.backgroundColor == 'yellow') {
        return "R U2 R\' U\' R U\' R\'"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[3].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[6].style.backgroundColor == 'yellow'
        && pieces[8].style.backgroundColor == 'yellow' && pieces[19].style.backgroundColor == 'yellow'
        && pieces[28].style.backgroundColor == 'yellow' && pieces[36].style.backgroundColor == 'yellow'
        && pieces[38].style.backgroundColor == 'yellow') {
        return "R U R\' U R U2 R\' F R U R\' U\' F\'"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[5].style.backgroundColor == 'yellow' && pieces[9].style.backgroundColor == 'yellow'
        && pieces[10].style.backgroundColor == 'yellow' && pieces[11].style.backgroundColor == 'yellow'
        && pieces[19].style.backgroundColor == 'yellow' && pieces[27].style.backgroundColor == 'yellow'
        && pieces[29].style.backgroundColor == 'yellow') {
        return "L F R\' F R F\' R\' F R F2 L\'"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[3].style.backgroundColor == 'yellow' && pieces[9].style.backgroundColor == 'yellow'
        && pieces[11].style.backgroundColor == 'yellow' && pieces[27].style.backgroundColor == 'yellow'
        && pieces[28].style.backgroundColor == 'yellow' && pieces[29].style.backgroundColor == 'yellow'
        && pieces[19].style.backgroundColor == 'yellow') {
        return "R\' F\' L F\' L\' F L F\' L\' F2 R"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[2].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[9].style.backgroundColor == 'yellow' && pieces[10].style.backgroundColor == 'yellow'
        && pieces[18].style.backgroundColor == 'yellow' && pieces[19].style.backgroundColor == 'yellow'
        && pieces[27].style.backgroundColor == 'yellow') {
        return "L F2 R\' F\' R F\' L\'"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[0].style.backgroundColor == 'yellow'
        && pieces[3].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[18].style.backgroundColor == 'yellow' && pieces[19].style.backgroundColor == 'yellow'
        && pieces[8].style.backgroundColor == 'yellow' && pieces[28].style.backgroundColor == 'yellow'
        && pieces[29].style.backgroundColor == 'yellow') {
        return "F R U\' R\' U\' R U R\' F\'"
    } else if (pieces[7].style.backgroundColor == 'yellow' && pieces[0].style.backgroundColor == 'yellow'
        && pieces[3].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[18].style.backgroundColor == 'yellow' && pieces[27].style.backgroundColor == 'yellow'
        && pieces[28].style.backgroundColor == 'yellow' && pieces[36].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "L\' B\' R B\' R\' B2 L"
    } else if (pieces[2].style.backgroundColor == 'yellow' && pieces[0].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[6].style.backgroundColor == 'yellow' && pieces[7].style.backgroundColor == 'yellow'
        && pieces[8].style.backgroundColor == 'yellow' && pieces[10].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "L R\' F L\' R U2 L R\' F L\' R"
    } else if (pieces[3].style.backgroundColor == 'yellow' && pieces[8].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[6].style.backgroundColor == 'yellow' && pieces[9].style.backgroundColor == 'yellow'
        && pieces[19].style.backgroundColor == 'yellow' && pieces[29].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "R U R2 U\' R\' F R U R U\' F\'"
    } else if (pieces[3].style.backgroundColor == 'yellow' && pieces[19].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[6].style.backgroundColor == 'yellow' && pieces[20].style.backgroundColor == 'yellow'
        && pieces[29].style.backgroundColor == 'yellow' && pieces[38].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "F U R U\' R2 F\' R U R U\' R\'"
    } else if (pieces[3].style.backgroundColor == 'yellow' && pieces[8].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[9].style.backgroundColor == 'yellow' && pieces[18].style.backgroundColor == 'yellow'
        && pieces[19].style.backgroundColor == 'yellow' && pieces[36].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "R\' F R U R\' F\' R F U\' F\'"
    } else if (pieces[3].style.backgroundColor == 'yellow' && pieces[2].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[1].style.backgroundColor == 'yellow' && pieces[0].style.backgroundColor == 'yellow'
        && pieces[7].style.backgroundColor == 'yellow' && pieces[18].style.backgroundColor == 'yellow'
        && pieces[20].style.backgroundColor == 'yellow') {
        return "R2 D R\' U2 R D\' R\' U2 R\'"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[7].style.backgroundColor == 'yellow' && pieces[9].style.backgroundColor == 'yellow'
        && pieces[10].style.backgroundColor == 'yellow' && pieces[11].style.backgroundColor == 'yellow'
        && pieces[27].style.backgroundColor == 'yellow' && pieces[28].style.backgroundColor == 'yellow'
        && pieces[29].style.backgroundColor == 'yellow') {
        return "R\' U2 R2 U R\' U R U2 B\' R\' B"
    } else if (pieces[2].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[5].style.backgroundColor == 'yellow' && pieces[7].style.backgroundColor == 'yellow'
        && pieces[8].style.backgroundColor == 'yellow' && pieces[10].style.backgroundColor == 'yellow'
        && pieces[18].style.backgroundColor == 'yellow' && pieces[37].style.backgroundColor == 'yellow'
        && pieces[38].style.backgroundColor == 'yellow') {
        return "R U B\' U\' R\' U R B R\'"
    } else if (pieces[2].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[5].style.backgroundColor == 'yellow' && pieces[1].style.backgroundColor == 'yellow'
        && pieces[8].style.backgroundColor == 'yellow' && pieces[10].style.backgroundColor == 'yellow'
        && pieces[18].style.backgroundColor == 'yellow' && pieces[19].style.backgroundColor == 'yellow'
        && pieces[38].style.backgroundColor == 'yellow') {
        return "R\' U\' F U R U\' R\' F\' R"
    } else if (pieces[2].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[5].style.backgroundColor == 'yellow' && pieces[3].style.backgroundColor == 'yellow'
        && pieces[6].style.backgroundColor == 'yellow' && pieces[9].style.backgroundColor == 'yellow'
        && pieces[19].style.backgroundColor == 'yellow' && pieces[20].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "R B\' R\' U\' R U B U\' R\'"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[3].style.backgroundColor == 'yellow' && pieces[18].style.backgroundColor == 'yellow'
        && pieces[19].style.backgroundColor == 'yellow' && pieces[27].style.backgroundColor == 'yellow'
        && pieces[28].style.backgroundColor == 'yellow' && pieces[29].style.backgroundColor == 'yellow'
        && pieces[38].style.backgroundColor == 'yellow') {
        return "R\' F R2 B\' R2 F\' R2 B R\'"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[4].style.backgroundColor == 'yellow'
        && pieces[3].style.backgroundColor == 'yellow' && pieces[2].style.backgroundColor == 'yellow'
        && pieces[8].style.backgroundColor == 'yellow' && pieces[18].style.backgroundColor == 'yellow'
        && pieces[19].style.backgroundColor == 'yellow' && pieces[28].style.backgroundColor == 'yellow'
        && pieces[38].style.backgroundColor == 'yellow') {
        return "R U R\' U\' R U\' R\' F\' U\' F R U R\'"
    } else if (pieces[0].style.backgroundColor == 'yellow' && pieces[2].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[5].style.backgroundColor == 'yellow'
        && pieces[7].style.backgroundColor == 'yellow' && pieces[10].style.backgroundColor == 'yellow'
        && pieces[11].style.backgroundColor == 'yellow' && pieces[27].style.backgroundColor == 'yellow'
        && pieces[37].style.backgroundColor == 'yellow') {
        return "R2 U R\' B\' R U\' R2 U R B R\'"
    } else if (pieces[1].style.backgroundColor == 'yellow' && pieces[3].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[8].style.backgroundColor == 'yellow'
        && pieces[9].style.backgroundColor == 'yellow' && pieces[18].style.backgroundColor == 'yellow'
        && pieces[19].style.backgroundColor == 'yellow' && pieces[28].style.backgroundColor == 'yellow'
        && pieces[36].style.backgroundColor == 'yellow') {
        return "R U R\' U\' R\' F R2 U R\' U\' F\'"
    } else if (pieces[2].style.backgroundColor == 'yellow' && pieces[3].style.backgroundColor == 'yellow'
        && pieces[4].style.backgroundColor == 'yellow' && pieces[7].style.backgroundColor == 'yellow'
        && pieces[11].style.backgroundColor == 'yellow' && pieces[20].style.backgroundColor == 'yellow'
        && pieces[28].style.backgroundColor == 'yellow' && pieces[37].style.backgroundColor == 'yellow'
        && pieces[38].style.backgroundColor == 'yellow') {
        return "R U R\' U R\' F R F\' R U2 R\'"
    } else {
        return "U";
    }
}

function Test() {
    var scramble = "";
    var solved = false;
    for (var i = 0; i < 5; i++) {
        scramble = GetScramble();
        Execute(scramble);
        Solve();
        solved = CheckEnd();
        if (!solved) {
            console.log("Failed " + scramble);
        } else {
            console.log("Success");
        }
    }
}

function CheckF2L() {
    let solved = false;
    for (var i = 13; i < 19; i++) {
        if (pieces[i - 1].style.backgroundColor == "orange") {
            solved = true;
        } else {
            solved = false;
            return solved;
        }
    }
    for (var i = 22; i < 28; i++) {
        if (pieces[i - 1].style.backgroundColor == "blue") {
            solved = true;
        } else {
            solved = false;
            return solved;
        }
    }
    for (var i = 31; i < 37; i++) {
        if (pieces[i - 1].style.backgroundColor == "red") {
            solved = true;
        } else {
            solved = false;
            return solved;
        }
    }
    for (var i = 40; i < 46; i++) {
        if (pieces[i - 1].style.backgroundColor == "green") {
            solved = true;
        } else {
            solved = false;
            return solved;
        }
    }
    for (var i = 46; i < 55; i++) {
        if (pieces[i - 1].style.backgroundColor == "white") {
            solved = true;
        } else {
            solved = false;
            return solved;
        }
    }
    return solved;
}

function GetScramble() {
    let scramble = [];
    let arr1 = ["R", "R\'", "R2", "L", "L\'", "L2"];
    let arr2 = ["B", "B\'", "B2", "F", "F\'", "F2"];
    let arr3 = ["U", "U\'", "U2", "D", "D\'", "D2"];
    let arr = ["R", "R\'", "R2", "L", "L\'", "L2", "B", "B\'", "B2", "F", "F\'", "F2", "U", "U\'", "U2", "D", "D\'", "D2"];
    for (var i = 0; i < 50; i++) {
        let index = Math.floor(Math.random() * arr.length);
        let randomItem = arr[index];
        if (i != 0) {
            if (arr1.includes(randomItem)) {
                if (arr1.includes(scramble[i - 1])) {
                    i--;
                } else {
                    scramble.push(randomItem);
                }
            } else if (arr2.includes(randomItem)) {
                if (arr2.includes(scramble[i - 1])) {
                    i--;
                } else {
                    scramble.push(randomItem);
                }
            } else if (arr3.includes(randomItem)) {
                if (arr3.includes(scramble[i - 1])) {
                    i--;
                } else {
                    scramble.push(randomItem);
                }
            }
        } else {
            scramble.push(randomItem);
        }
    }
    return scramble.join(" ");
}

function SolveF2L(ids, cids, edge, corner) {
    var temp, temp2, cid1 = cids[0], cid2 = cids[1], cid3 = cids[2], id1 = ids[0], id2 = ids[1];
    temp = cid1;
    temp2 = cid3;
    cid1 = Math.min(cid1, cid2, cid3);
    cid3 = Math.max(temp, cid2, cid3);
    cid2 = Math.max(temp, Math.min(cid2, temp2));
    let ec1 = edge.split("-")[0];
    let ec2 = edge.split("-")[1];
    let cc1 = corner.split("-")[0];
    let cc2 = corner.split("-")[1];
    let cc3 = corner.split("-")[2];
    if (cid1 == 27 && cid2 == 34 && cid3 == 48 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "R U\' R\' U F\' U2 F U2 F\' U F";
        }
    } if (cid1 == 27 && cid2 == 34 && cid3 == 48 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "R U\' R\' U\' R U R\' U2 R U\' R\'";
        }
    } if (cid1 == 27 && cid2 == 34 && cid3 == 48 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "R U\' R\' U\' R U\' R\' U F\' U\' F";
        }
    } if (cid1 == 27 && cid2 == 34 && cid3 == 48 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "R U\' R\' U R U2 R\' U R U\' R\'";
        }
    } if (cid1 == 27 && cid2 == 34 && cid3 == 48 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "R U\' R\' U2 F\' U\' F U\' F\' U F";
        }
    } if (cid1 == 9 && cid2 == 21 && cid3 == 28 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U F\' U F U2 F\' U F";
        }
    } if (cid1 == 9 && cid2 == 21 && cid3 == 28 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U F\' U\' F U\' R U R\'";
        }
    } if (cid1 == 9 && cid2 == 21 && cid3 == 28 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U\' R U\' R\' U2 R U\' R\'";
        }
    } if (cid1 == 9 && cid2 == 21 && cid3 == 28 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U\' R U R\' U F\' U\' F";
        }
    } if (cid1 == 9 && cid2 == 21 && cid3 == 28 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "R U R\' U\' R U R\' U\' R U R\'";
        }
    } if (cid1 == 9 && cid2 == 21 && cid3 == 28 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "F\' U F U\' R U\' R\'";
        }
    } if (cid1 == 7 && cid2 == 12 && cid3 == 19 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "F\' U F U2 F\' U F";
        }
    } if (cid1 == 7 && cid2 == 12 && cid3 == 19 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "F\' U\' F U\' R U R\'";
        }
    } if (cid1 == 7 && cid2 == 12 && cid3 == 19 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U2 R U\' R\' U2 R U\' R\'";
        }
    } if (cid1 == 7 && cid2 == 12 && cid3 == 19 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U2 R U R\' U F\' U\' F";
        }
    } if (cid1 == 7 && cid2 == 12 && cid3 == 19 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U\' R U R\' U\' R U R\' U\' R U R\'";
        }
    } if (cid1 == 7 && cid2 == 12 && cid3 == 19 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U\' F\' U F U\' R U\' R\'";
        }
    } if (cid1 == 18 && cid2 == 25 && cid3 == 46 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "L\' U\' L U F\' U F U2 F\' U F";
        }
    } if (cid1 == 18 && cid2 == 25 && cid3 == 46 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "L\' U\' L U F\' U\' F U\' R U R\'";
        }
    } if (cid1 == 18 && cid2 == 25 && cid3 == 46 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "F U F\' U\' F\' U F U2 F\' U F";
        }
    } if (cid1 == 18 && cid2 == 25 && cid3 == 46 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "F U F\' U\' F\' U\' F U\' R U R\'";
        }
    } if (cid1 == 18 && cid2 == 25 && cid3 == 46 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "L\' U\' L U\' R U\' R\' U2 R U\' R\'";
        }
    } if (cid1 == 18 && cid2 == 25 && cid3 == 46 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "L\' U\' L U\' R U R\' U F\' U\' F";
        }
    } if (cid1 == 3 && cid2 == 30 && cid3 == 37 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U2 F\' U F U2 F\' U F";
        }
    } if (cid1 == 3 && cid2 == 30 && cid3 == 37 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U2 F\' U\' F U\' R U R\'";
        }
    } if (cid1 == 3 && cid2 == 30 && cid3 == 37 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "R U\' R\' U2 R U\' R\'";
        }
    } if (cid1 == 3 && cid2 == 30 && cid3 == 37 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "R U R\' U F\' U\' F";
        }
    } if (cid1 == 3 && cid2 == 30 && cid3 == 37 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U R U R\' U\' R U R\' U\' R U R\'";
        }
    } if (cid1 == 3 && cid2 == 30 && cid3 == 37 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U F\' U F U\' R U\' R\'";
        }
    } if (cid1 == 1 && cid2 == 10 && cid3 == 39 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U\' F\' U F U2 F\' U F";
        }
    } if (cid1 == 1 && cid2 == 10 && cid3 == 39 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U\' F\' U\' F U\' R U R\'";
        }
    } if (cid1 == 1 && cid2 == 10 && cid3 == 39 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U R U\' R\' U2 R U\' R\'";
        }
    } if (cid1 == 1 && cid2 == 10 && cid3 == 39 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U R U R\' U F\' U\' F";
        }
    } if (cid1 == 1 && cid2 == 10 && cid3 == 39 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U2 R U R\' U\' R U R\' U\' R U R\'";
        }
    } if (cid1 == 1 && cid2 == 10 && cid3 == 39 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U2 F\' U F U\' R U\' R\'";
        }
    } if (cid1 == 16 && cid2 == 45 && cid3 == 52 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "B\' U\' B F\' U F U2 F\' U F";
        }
    } if (cid1 == 16 && cid2 == 45 && cid3 == 52 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "B\' U\' B F\' U\' F U\' R U R\'";
        }
    } if (cid1 == 16 && cid2 == 45 && cid3 == 52 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "B\' U\' B  U2 R U\' R\' U2 R U\' R\'";
        }
    } if (cid1 == 16 && cid2 == 45 && cid3 == 52 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "B\' U\' B  U2 R U R\' U F\' U\' F";
        }
    } if (cid1 == 16 && cid2 == 45 && cid3 == 52 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "B\' U\' B  U\' R U R\' U\' R U R\' U\' R U R\'";
        }
    } if (cid1 == 16 && cid2 == 45 && cid3 == 52 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "B\' U\' B  U\' F\' U F U\' R U\' R\'";
        }
    } if (cid1 == 36 && cid2 == 43 && cid3 == 54 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "B U B\' U F\' U F U2 F\' U F";
        }
    } if (cid1 == 36 && cid2 == 43 && cid3 == 54 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "B U B\' U F\' U\' F U\' R U R\'";
        }
    } if (cid1 == 36 && cid2 == 43 && cid3 == 54 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "B U B\' U\' R U\' R\' U2 R U\' R\'";
        }
    } if (cid1 == 36 && cid2 == 43 && cid3 == 54 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "B U B\' U\' R U R\' U F\' U\' F";
        }
    } if (cid1 == 36 && cid2 == 43 && cid3 == 54 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "B U B\' R U R\' U\' R U R\' U\' R U R\'";
        }
    } if (cid1 == 36 && cid2 == 43 && cid3 == 54 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 24 && id2 == 31 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "B U B\' F\' U F U\' R U\' R\'";
        }
    } if (cid1 == 27 && cid2 == 34 && cid3 == 48 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "F\' U2 F U2 R U R\'";
        }
    } if (cid1 == 27 && cid2 == 34 && cid3 == 48 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U\' R U2 R\' U2 F\' U\' F";
        }
    } if (cid1 == 27 && cid2 == 34 && cid3 == 48 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "F\' U\' F U\' R  U R\' U R U\' R\'";
        }
    } if (cid1 == 27 && cid2 == 34 && cid3 == 48 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "F\' U F U\' F\'  U F";
        }
    } if (cid1 == 27 && cid2 == 34 && cid3 == 48 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U\' R U\' R\' U R U\' R\'";
        }
    } if (cid1 == 27 && cid2 == 34 && cid3 == 48 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "F\' U\' F U F\' U\' F";
        }
    } if (cid1 == 9 && cid2 == 21 && cid3 == 28 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "R\' U2 R2 U R2 U R";
        }
    } if (cid1 == 9 && cid2 == 21 && cid3 == 28 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U\' F\' U F";
        }
    } if (cid1 == 9 && cid2 == 21 && cid3 == 28 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U F\' U F U2 R U2 R\' U2 R U\' R\'";
        }
    } if (cid1 == 9 && cid2 == 21 && cid3 == 28 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "R\' U R F\' U\' F U2 R\' U\' R U\' R\' U\' R";
        }
    } if (cid1 == 9 && cid2 == 21 && cid3 == 28 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U F\' U2 F R U2 R\' U R U\' R\'";
        }
    } if (cid1 == 9 && cid2 == 21 && cid3 == 28 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U F' U F U2 F' U2 F U' F' U F";
        }
    } if (cid1 == 7 && cid2 == 12 && cid3 == 19 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "R U\' R\'";
        }
    } if (cid1 == 7 && cid2 == 12 && cid3 == 19 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U2 R U2 R\' U F\' U\' F";
        }
    } if (cid1 == 7 && cid2 == 12 && cid3 == 19 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U2 R U\' R\' U2 R U2 R\' U R U\' R\'";
        }
    } if (cid1 == 7 && cid2 == 12 && cid3 == 19 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U2 R U\' R\' U\' F\' U\' F U\' F\' U F";
        }
    } if (cid1 == 7 && cid2 == 12 && cid3 == 19 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U2 R U\' R\' U R U R\'";
        }
    } if (cid1 == 7 && cid2 == 12 && cid3 == 19 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U2 R U\' R\' U2 F\' U2 F U2 F\' U F";
        }
    } if (cid1 == 18 && cid2 == 25 && cid3 == 46 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U\' L\' U\' L R U R\'";
        }
    } if (cid1 == 18 && cid2 == 25 && cid3 == 46 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U\' L\' U\' L U F\' U2 F U2 F\' U F";
        }
    } if (cid1 == 18 && cid2 == 25 && cid3 == 46 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U\' F U2 F\' U R U R\'";
        }
    } if (cid1 == 18 && cid2 == 25 && cid3 == 46 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U\' F U2 F\' U2 F\' U2 F U2 F\' U F";
        }
    } if (cid1 == 18 && cid2 == 25 && cid3 == 46 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "F U\' F\' R U\' R\'";
        }
    } if (cid1 == 18 && cid2 == 25 && cid3 == 46 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "F U F2 U\' F U\' F\' U F";
        }
    } if (cid1 == 1 && cid2 == 10 && cid3 == 39 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U2 R U R\'";
        }
    } if (cid1 == 1 && cid2 == 10 && cid3 == 39 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U\' F\' U2 F U2 F\' U F";
        }
    } if (cid1 == 1 && cid2 == 10 && cid3 == 39 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U R U R\' U2 R U\' R\'";
        }
    } if (cid1 == 1 && cid2 == 10 && cid3 == 39 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U R U\' R\' U F\' U\' F";
        }
    } if (cid1 == 1 && cid2 == 10 && cid3 == 39 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U\' R U2 R\' U R U\' R\'";
        }
    } if (cid1 == 1 && cid2 == 10 && cid3 == 39 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "F\' U\' F U\' F\' U F";
        }
    } if (cid1 == 3 && cid2 == 30 && cid3 == 37 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "R U R\' U R U R\'";
        }
    } if (cid1 == 3 && cid2 == 30 && cid3 == 37 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U2 F\' U\' F U2 F\' U F";
        }
    } if (cid1 == 3 && cid2 == 30 && cid3 == 37 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "R U2 R\' U2 R U\' R\'";
        }
    } if (cid1 == 3 && cid2 == 30 && cid3 == 37 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U F\' U\' F";
        }
    } if (cid1 == 3 && cid2 == 30 && cid3 == 37 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U\' R U R\' U R U\' R\'";
        }
    } if (cid1 == 3 && cid2 == 30 && cid3 == 37 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "F\' U2 F U\' F\' U F";
        }
    } if (cid1 == 36 && cid2 == 43 && cid3 == 54 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "R\' U R U R U R\'";
        }
    } if (cid1 == 36 && cid2 == 43 && cid3 == 54 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U\' R\' U R F\' U F";
        }
    } if (cid1 == 36 && cid2 == 43 && cid3 == 54 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U R\' U\' R U2  R U R\'";
        }
    } if (cid1 == 36 && cid2 == 43 && cid3 == 54 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U2 B U B\' U F\' U\' F U\' F\' U\' F";
        }
    } if (cid1 == 36 && cid2 == 43 && cid3 == 54 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U2 B U\' B\' U2  R U\' R\'";
        }
    } if (cid1 == 36 && cid2 == 43 && cid3 == 54 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "B U B\' U\' F\' U2 F U\' F\' U F";
        }
    } if (cid1 == 16 && cid2 == 45 && cid3 == 52 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "B\' U\' B U\' R U R\'";
        }
    } if (cid1 == 16 && cid2 == 45 && cid3 == 52 &&
        pieces[cid1 - 1].style.backgroundColor == cc2 &&
        pieces[cid2 - 1].style.backgroundColor == cc1 &&
        pieces[cid3 - 1].style.backgroundColor == cc3) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "B\' U\' B F\' U2 F U2 F\' U F";
        }
    } if (cid1 == 16 && cid2 == 45 && cid3 == 52 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "B\' U B U R U\' R\' U R U R\'";
        }
    } if (cid1 == 16 && cid2 == 45 && cid3 == 52 &&
        pieces[cid1 - 1].style.backgroundColor == cc3 &&
        pieces[cid2 - 1].style.backgroundColor == cc2 &&
        pieces[cid3 - 1].style.backgroundColor == cc1) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U2 B\' U B U F\' U F";
        }
    } if (cid1 == 16 && cid2 == 45 && cid3 == 52 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec1 &&
            pieces[id2 - 1].style.backgroundColor == ec2) {
            return "U L U\' L\' U\' R U\' R\'";
        }
    } if (cid1 == 16 && cid2 == 45 && cid3 == 52 &&
        pieces[cid1 - 1].style.backgroundColor == cc1 &&
        pieces[cid2 - 1].style.backgroundColor == cc3 &&
        pieces[cid3 - 1].style.backgroundColor == cc2) {
        if (id1 == 8 && id2 == 20 &&
            pieces[id1 - 1].style.backgroundColor == ec2 &&
            pieces[id2 - 1].style.backgroundColor == ec1) {
            return "U L U L\' U\' F\' U\' F U\' F\' U F";
        }
    } 
    //console.log(id1 + " " + id2 + " " + cid1 + " " + cid2 + " " + cid3 + " " + cc1 + " " + cc2 + " " + cc3 + " " + ec1 + " " + ec2);
}

function Scramble() {
    var alg = document.getElementById('algInput').value;
    Execute(alg);
}

function SolveCross(ids, p) {
    var id1 = ids[0], id2 = ids[1];
    switch (p) {
        case "BW":
            if (id1 == 26 && id2 == 47) {
                if (pieces[id1 - 1].style.backgroundColor == "white") {
                    return "F\' R\' D\'";
                } else {
                    //console.log("BW Solved.");
                }
            } else if (id1 == 2 && id2 == 38) {
                if (pieces[id1 - 1].style.backgroundColor == "blue") {
                    return "U R\' F";
                } else {
                    return "U2 F2";
                }
            } else if (id1 == 4 && id2 == 11) {
                if (pieces[id1 - 1].style.backgroundColor == "blue") {
                    return "L F\'";
                } else {
                    return "L2 D";
                }
            } else if (id1 == 6 && id2 == 29) {
                if (pieces[id1 - 1].style.backgroundColor == "blue") {
                    return "R\' F";
                } else {
                    return "R2 D\'";
                }
            } else if (id1 == 8 && id2 == 20) {
                if (pieces[id1 - 1].style.backgroundColor == "blue") {
                    return "F R\' D\'";
                } else {
                    return "F2";
                }
            } else if (id1 == 13 && id2 == 42) {
                if (pieces[id1 - 1].style.backgroundColor == "blue") {
                    return "L\' D";
                } else {
                    return "L2 F\'";
                }
            } else if (id1 == 15 && id2 == 22) {
                if (pieces[id1 - 1].style.backgroundColor == "blue") {
                    return "L D";
                } else {
                    return "F\'";
                }
            } else if (id1 == 17 && id2 == 49) {
                if (pieces[id1 - 1].style.backgroundColor == "blue") {
                    return "D";
                } else {
                    return "L\' F\'";
                }
            } else if (id1 == 24 && id2 == 31) {
                if (pieces[id1 - 1].style.backgroundColor == "blue") {
                    return "F";
                } else {
                    return "R\' D\'";
                }
            } else if (id1 == 33 && id2 == 40) {
                if (pieces[id1 - 1].style.backgroundColor == "blue") {
                    return "R D\'";
                } else {
                    return "B\' D2";
                }
            } else if (id1 == 35 && id2 == 51) {
                if (pieces[id1 - 1].style.backgroundColor == "blue") {
                    return "D\'";
                } else {
                    return "R F";
                }
            } else if (id1 == 44 && id2 == 53) {
                if (pieces[id1 - 1].style.backgroundColor == "blue") {
                    return "D2";
                } else {
                    return "B R D\'";
                }
            } else {
                return "";
            }
        case "OW":
            if (id1 == 2 && id2 == 38) {
                if (pieces[id1 - 1].style.backgroundColor == "orange") {
                    return "B L\'";
                } else {
                    return "U\' L2";
                }
            } else if (id1 == 4 && id2 == 11) {
                if (pieces[id1 - 1].style.backgroundColor == "orange") {
                    return "U B L\'";
                } else {
                    return "L2";
                }
            } else if (id1 == 6 && id2 == 29) {
                if (pieces[id1 - 1].style.backgroundColor == "orange") {
                    return "U\' B L\'";
                } else {
                    return "U2 L2";
                }
            } else if (id1 == 8 && id2 == 20) {
                if (pieces[id1 - 1].style.backgroundColor == "orange") {
                    return "U2 B L\'";
                } else {
                    return "U L2";
                }
            } else if (id1 == 13 && id2 == 42) {
                if (pieces[id1 - 1].style.backgroundColor == "orange") {
                    return "L\'";
                } else {
                    return "B\' U\' L2";
                }
            } else if (id1 == 15 && id2 == 22) {
                if (pieces[id1 - 1].style.backgroundColor == "orange") {
                    return "L";
                } else {
                    return "L2 B\' U\' L2";
                }
            } else if (id1 == 17 && id2 == 49) {
                if (pieces[id1 - 1].style.backgroundColor == "orange") {
                    return "";
                } else {
                    return "D\' B\' D L\'";
                }
            } else if (id1 == 24 && id2 == 31) {
                if (pieces[id1 - 1].style.backgroundColor == "orange") {
                    return "R2 B U\' L2";
                } else {
                    return "R U2 L2";
                }
            } else if (id1 == 33 && id2 == 40) {
                if (pieces[id1 - 1].style.backgroundColor == "orange") {
                    return "R\' U2 L2";
                } else {
                    return "B U\' L2";
                }
            } else if (id1 == 35 && id2 == 51) {
                if (pieces[id1 - 1].style.backgroundColor == "orange") {
                    return "R2 U2 L2";
                } else {
                    return "R\' B U\' L2";
                }
            } else if (id1 == 44 && id2 == 53) {
                if (pieces[id1 - 1].style.backgroundColor == "orange") {
                    return "B2 U\' L2";
                } else {
                    return "B\' L\'";
                }
            } else {
                return "";
            }
        case "RW":
            if (id1 == 2 && id2 == 38) {
                if (pieces[id1 - 1].style.backgroundColor == "red") {
                    return "B\' R";
                } else {
                    return "U  R2";
                }
            } else if (id1 == 4 && id2 == 11) {
                if (pieces[id1 - 1].style.backgroundColor == "red") {
                    return "U B\' R";
                } else {
                    return "U2 R2";
                }
            } else if (id1 == 6 && id2 == 29) {
                if (pieces[id1 - 1].style.backgroundColor == "red") {
                    return "U\' B\' R";
                } else {
                    return "R2";
                }
            } else if (id1 == 8 && id2 == 20) {
                if (pieces[id1 - 1].style.backgroundColor == "red") {
                    return "U2 B\' R";
                } else {
                    return "U\' R2";
                }
            } else if (id1 == 13 && id2 == 42) {
                if (pieces[id1 - 1].style.backgroundColor == "red") {
                    return "B2 R";
                } else {
                    return "B\' U R2";
                }
            } else if (id1 == 15 && id2 == 22) {
                if (pieces[id1 - 1].style.backgroundColor == "red") {
                    return "L\' U\' L U\' R2";
                } else {
                    return "F U F\' U2 R2";
                }
            } else if (id1 == 24 && id2 == 31) {
                if (pieces[id1 - 1].style.backgroundColor == "red") {
                    return "R2 B U R2";
                } else {
                    return "R\'";
                }
            } else if (id1 == 33 && id2 == 40) {
                if (pieces[id1 - 1].style.backgroundColor == "red") {
                    return "R";
                } else {
                    return "B U R2";
                }
            } else if (id1 == 35 && id2 == 51) {
                if (pieces[id1 - 1].style.backgroundColor == "red") {
                    return "";
                } else {
                    return "R2 U\' B\' R";
                }
            } else if (id1 == 44 && id2 == 53) {
                if (pieces[id1 - 1].style.backgroundColor == "red") {
                    return "B2 U R2";
                } else {
                    return "B R";
                }
            } else {
                return "";
            }
        case "GW":
            if (id1 == 2 && id2 == 38) {
                if (pieces[id1 - 1].style.backgroundColor == "green") {
                    return "B\' D\' R D";
                } else {
                    return "B2";
                }
            } else if (id1 == 4 && id2 == 11) {
                if (pieces[id1 - 1].style.backgroundColor == "green") {
                    return "U B\' D\' R D";
                } else {
                    return "U B2";
                }
            } else if (id1 == 6 && id2 == 29) {
                if (pieces[id1 - 1].style.backgroundColor == "green") {
                    return "U\' B\' D\' R D";
                } else {
                    return "U\' B2";
                }
            } else if (id1 == 8 && id2 == 20) {
                if (pieces[id1 - 1].style.backgroundColor == "green") {
                    return "U2 B\' D\' R D";
                } else {
                    return "U2 B2";
                }
            } else if (id1 == 13 && id2 == 42) {
                if (pieces[id1 - 1].style.backgroundColor == "green") {
                    return "D L\' D\'";
                } else {
                    return "B";
                }
            } else if (id1 == 15 && id2 == 22) {
                if (pieces[id1 - 1].style.backgroundColor == "green") {
                    return "L\' U\' L U2 B2";
                } else {
                    return "F U F\' U B2";
                }
            } else if (id1 == 24 && id2 == 31) {
                if (pieces[id1 - 1].style.backgroundColor == "green") {
                    return "F\' U\' F U\' B2";
                } else {
                    return "R U R\' U2 B2";
                }
            } else if (id1 == 33 && id2 == 40) {
                if (pieces[id1 - 1].style.backgroundColor == "green") {
                    return "D\' R D";
                } else {
                    return "B\'";
                }
            } else if (id1 == 44 && id2 == 53) {
                if (pieces[id1 - 1].style.backgroundColor == "green") {
                    return "";
                } else {
                    return "B D\' R D";
                }
            } else {
                return "";
            }
        default:
            return "";
    }
}

function MoveYPrime() {
    var temp1 = pieces[18].style.backgroundColor;
    var temp2 = pieces[19].style.backgroundColor;
    var temp3 = pieces[20].style.backgroundColor;
    var temp4 = pieces[21].style.backgroundColor;
    var temp5 = pieces[22].style.backgroundColor;
    var temp6 = pieces[23].style.backgroundColor;
    var temp7 = pieces[24].style.backgroundColor;
    var temp8 = pieces[25].style.backgroundColor;
    var temp9 = pieces[26].style.backgroundColor;
    ChangeColor(pieces[9], pieces[18]);
    ChangeColor(pieces[10], pieces[19]);
    ChangeColor(pieces[11], pieces[20]);
    ChangeColor(pieces[12], pieces[21]);
    ChangeColor(pieces[13], pieces[22]);
    ChangeColor(pieces[14], pieces[23]);
    ChangeColor(pieces[15], pieces[24]);
    ChangeColor(pieces[16], pieces[25]);
    ChangeColor(pieces[17], pieces[26]);
    ChangeColor(pieces[36], pieces[9]);
    ChangeColor(pieces[37], pieces[10]);
    ChangeColor(pieces[38], pieces[11]);
    ChangeColor(pieces[39], pieces[12]);
    ChangeColor(pieces[40], pieces[13]);
    ChangeColor(pieces[41], pieces[14]);
    ChangeColor(pieces[42], pieces[15]);
    ChangeColor(pieces[43], pieces[16]);
    ChangeColor(pieces[44], pieces[17]);
    ChangeColor(pieces[27], pieces[36]);
    ChangeColor(pieces[28], pieces[37]);
    ChangeColor(pieces[29], pieces[38]);
    ChangeColor(pieces[30], pieces[39]);
    ChangeColor(pieces[31], pieces[40]);
    ChangeColor(pieces[32], pieces[41]);
    ChangeColor(pieces[33], pieces[42]);
    ChangeColor(pieces[34], pieces[43]);
    ChangeColor(pieces[35], pieces[44]);
    ChangeColorWithColor(temp1, pieces[27]);
    ChangeColorWithColor(temp2, pieces[28]);
    ChangeColorWithColor(temp3, pieces[29]);
    ChangeColorWithColor(temp4, pieces[30]);
    ChangeColorWithColor(temp5, pieces[31]);
    ChangeColorWithColor(temp6, pieces[32]);
    ChangeColorWithColor(temp7, pieces[33]);
    ChangeColorWithColor(temp8, pieces[34]);
    ChangeColorWithColor(temp9, pieces[35]);
    for (var i = 0; i < 3; i++) {
        temp1 = pieces[0].style.backgroundColor;
        temp2 = pieces[1].style.backgroundColor;
        ChangeColor(pieces[6], pieces[0]);
        ChangeColor(pieces[3], pieces[1]);
        ChangeColor(pieces[8], pieces[6]);
        ChangeColor(pieces[7], pieces[3]);
        ChangeColor(pieces[2], pieces[8]);
        ChangeColor(pieces[5], pieces[7]);
        ChangeColorWithColor(temp1, pieces[2]);
        ChangeColorWithColor(temp2, pieces[5]);
    }
    temp1 = pieces[45].style.backgroundColor;
    temp2 = pieces[46].style.backgroundColor;
    ChangeColor(pieces[51], pieces[45]);
    ChangeColor(pieces[48], pieces[46]);
    ChangeColor(pieces[53], pieces[51]);
    ChangeColor(pieces[52], pieces[48]);
    ChangeColor(pieces[47], pieces[53]);
    ChangeColor(pieces[50], pieces[52]);
    ChangeColorWithColor(temp1, pieces[47]);
    ChangeColorWithColor(temp2, pieces[50]);
}

function MoveY() {
    for (var i = 0; i < 3; i++) {
        MoveYPrime();
    }
}

function MoveR() {
    var temp1 = pieces[2].style.backgroundColor;
    var temp2 = pieces[5].style.backgroundColor;
    var temp3 = pieces[8].style.backgroundColor;
    ChangeColor(pieces[20], pieces[2]);
    ChangeColor(pieces[23], pieces[5]);
    ChangeColor(pieces[26], pieces[8]);
    ChangeColor(pieces[47], pieces[20]);
    ChangeColor(pieces[50], pieces[23]);
    ChangeColor(pieces[53], pieces[26]);
    ChangeColor(pieces[42], pieces[47]);
    ChangeColor(pieces[39], pieces[50]);
    ChangeColor(pieces[36], pieces[53]);
    ChangeColorWithColor(temp3, pieces[36]);
    ChangeColorWithColor(temp2, pieces[39]);
    ChangeColorWithColor(temp1, pieces[42]);
    temp1 = pieces[27].style.backgroundColor;
    temp2 = pieces[28].style.backgroundColor;
    ChangeColor(pieces[33], pieces[27]);
    ChangeColor(pieces[30], pieces[28]);
    ChangeColor(pieces[34], pieces[30]);
    ChangeColor(pieces[35], pieces[33]);
    ChangeColor(pieces[32], pieces[34]);
    ChangeColor(pieces[29], pieces[35]);
    ChangeColorWithColor(temp2, pieces[32]);
    ChangeColorWithColor(temp1, pieces[29]);
}

function MoveR2() {
    MoveR();
    MoveR();
}

function MoveRPrime() {
    MoveR2();
    MoveR();
}

function MoveL() {
    var temp1 = pieces[0].style.backgroundColor;
    var temp2 = pieces[3].style.backgroundColor;
    var temp3 = pieces[6].style.backgroundColor;
    ChangeColor(pieces[44], pieces[0]);
    ChangeColor(pieces[41], pieces[3]);
    ChangeColor(pieces[38], pieces[6]);
    ChangeColor(pieces[51], pieces[38]);
    ChangeColor(pieces[48], pieces[41]);
    ChangeColor(pieces[45], pieces[44]);
    ChangeColor(pieces[24], pieces[51]);
    ChangeColor(pieces[21], pieces[48]);
    ChangeColor(pieces[18], pieces[45]);
    ChangeColorWithColor(temp3, pieces[24]);
    ChangeColorWithColor(temp2, pieces[21]);
    ChangeColorWithColor(temp1, pieces[18]);
    temp1 = pieces[9].style.backgroundColor;
    temp2 = pieces[10].style.backgroundColor;
    ChangeColor(pieces[15], pieces[9]);
    ChangeColor(pieces[12], pieces[10]);
    ChangeColor(pieces[17], pieces[15]);
    ChangeColor(pieces[16], pieces[12]);
    ChangeColor(pieces[11], pieces[17]);
    ChangeColor(pieces[14], pieces[16]);
    ChangeColorWithColor(temp1, pieces[11]);
    ChangeColorWithColor(temp2, pieces[14]);
}

function MoveL2() {
    MoveL();
    MoveL();
}

function MoveLPrime() {
    MoveL2();
    MoveL();
}

function MoveU() {
    var temp1 = pieces[9].style.backgroundColor;
    var temp2 = pieces[10].style.backgroundColor;
    var temp3 = pieces[11].style.backgroundColor;
    ChangeColor(pieces[18], pieces[9]);
    ChangeColor(pieces[19], pieces[10]);
    ChangeColor(pieces[20], pieces[11]);
    ChangeColor(pieces[27], pieces[18]);
    ChangeColor(pieces[28], pieces[19]);
    ChangeColor(pieces[29], pieces[20]);
    ChangeColor(pieces[36], pieces[27]);
    ChangeColor(pieces[37], pieces[28]);
    ChangeColor(pieces[38], pieces[29]);
    ChangeColorWithColor(temp1, pieces[36]);
    ChangeColorWithColor(temp2, pieces[37]);
    ChangeColorWithColor(temp3, pieces[38]);
    temp1 = pieces[0].style.backgroundColor;
    temp2 = pieces[1].style.backgroundColor;
    ChangeColor(pieces[6], pieces[0]);
    ChangeColor(pieces[3], pieces[1]);
    ChangeColor(pieces[8], pieces[6]);
    ChangeColor(pieces[7], pieces[3]);
    ChangeColor(pieces[2], pieces[8]);
    ChangeColor(pieces[5], pieces[7]);
    ChangeColorWithColor(temp1, pieces[2]);
    ChangeColorWithColor(temp2, pieces[5]);
}

function MoveU2() {
    MoveU();
    MoveU();
}

function MoveUPrime() {
    MoveU2();
    MoveU();
}

function MoveD() {
    var temp1 = pieces[15].style.backgroundColor;
    var temp2 = pieces[16].style.backgroundColor;
    var temp3 = pieces[17].style.backgroundColor;
    ChangeColor(pieces[42], pieces[15]);
    ChangeColor(pieces[43], pieces[16]);
    ChangeColor(pieces[44], pieces[17]);
    ChangeColor(pieces[33], pieces[42]);
    ChangeColor(pieces[34], pieces[43]);
    ChangeColor(pieces[35], pieces[44]);
    ChangeColor(pieces[24], pieces[33]);
    ChangeColor(pieces[25], pieces[34]);
    ChangeColor(pieces[26], pieces[35]);
    ChangeColorWithColor(temp1, pieces[24]);
    ChangeColorWithColor(temp2, pieces[25]);
    ChangeColorWithColor(temp3, pieces[26]);
    temp1 = pieces[45].style.backgroundColor;
    temp2 = pieces[46].style.backgroundColor;
    ChangeColor(pieces[51], pieces[45]);
    ChangeColor(pieces[48], pieces[46]);
    ChangeColor(pieces[53], pieces[51]);
    ChangeColor(pieces[52], pieces[48]);
    ChangeColor(pieces[47], pieces[53]);
    ChangeColor(pieces[50], pieces[52]);
    ChangeColorWithColor(temp1, pieces[47]);
    ChangeColorWithColor(temp2, pieces[50]);
}

function MoveD2() {
    MoveD();
    MoveD();
}

function MoveDPrime() {
    MoveD2();
    MoveD();
}

function MoveF() {
    var temp1 = pieces[8].style.backgroundColor;
    var temp2 = pieces[7].style.backgroundColor;
    var temp3 = pieces[6].style.backgroundColor;
    ChangeColor(pieces[11], pieces[8]);
    ChangeColor(pieces[14], pieces[7]);
    ChangeColor(pieces[17], pieces[6]);
    ChangeColor(pieces[45], pieces[11]);
    ChangeColor(pieces[46], pieces[14]);
    ChangeColor(pieces[47], pieces[17]);
    ChangeColor(pieces[33], pieces[45]);
    ChangeColor(pieces[30], pieces[46]);
    ChangeColor(pieces[27], pieces[47]);
    ChangeColorWithColor(temp1, pieces[33]);
    ChangeColorWithColor(temp2, pieces[30]);
    ChangeColorWithColor(temp3, pieces[27]);
    temp1 = pieces[18].style.backgroundColor;
    temp2 = pieces[19].style.backgroundColor;
    ChangeColor(pieces[24], pieces[18]);
    ChangeColor(pieces[21], pieces[19]);
    ChangeColor(pieces[26], pieces[24]);
    ChangeColor(pieces[25], pieces[21]);
    ChangeColor(pieces[20], pieces[26]);
    ChangeColor(pieces[23], pieces[25]);
    ChangeColorWithColor(temp1, pieces[20]);
    ChangeColorWithColor(temp2, pieces[23]);
}

function MoveF2() {
    MoveF();
    MoveF();
}

function MoveFPrime() {
    MoveF2();
    MoveF();
}

function MoveB() {
    var temp1 = pieces[0].style.backgroundColor;
    var temp2 = pieces[1].style.backgroundColor;
    var temp3 = pieces[2].style.backgroundColor;
    ChangeColor(pieces[29], pieces[0]);
    ChangeColor(pieces[32], pieces[1]);
    ChangeColor(pieces[35], pieces[2]);
    ChangeColor(pieces[53], pieces[29]);
    ChangeColor(pieces[52], pieces[32]);
    ChangeColor(pieces[51], pieces[35]);
    ChangeColor(pieces[9], pieces[51]);
    ChangeColor(pieces[12], pieces[52]);
    ChangeColor(pieces[15], pieces[53]);
    ChangeColorWithColor(temp3, pieces[9]);
    ChangeColorWithColor(temp2, pieces[12]);
    ChangeColorWithColor(temp1, pieces[15]);
    temp1 = pieces[36].style.backgroundColor;
    temp2 = pieces[37].style.backgroundColor;
    ChangeColor(pieces[42], pieces[36]);
    ChangeColor(pieces[39], pieces[37]);
    ChangeColor(pieces[44], pieces[42]);
    ChangeColor(pieces[43], pieces[39]);
    ChangeColor(pieces[38], pieces[44]);
    ChangeColor(pieces[41], pieces[43]);
    ChangeColorWithColor(temp1, pieces[38]);
    ChangeColorWithColor(temp2, pieces[41]);
}

function MoveB2() {
    MoveB();
    MoveB();
}

function MoveBPrime() {
    MoveB2();
    MoveB();
}

function ChangeColorWithColor(color, target) {
    target.style.backgroundColor = color;
}

function ChangeColor(source, target) {
    target.style.backgroundColor = source.style.backgroundColor;
}