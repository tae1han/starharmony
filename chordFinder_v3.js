autowatch = 1;
inlets = 1;
outlets = 6;

// need to get the following inputs:
// intervals (as list), lowest midi note (as value)

// definitions of chord types as sets of intervals. Calculation of inversion sets automated using Python

var poly3 = [  // triads / 3-note chords
    ["maj", [4,3], [3,5], [5,4] ],
    ["min", [3,4], [4,5], [5,3] ],
    ["dim", [3,3], [3,6], [6,3] ],
    ["aug", [4,4], [4,4], [4,4] ],
    ["sus", [5,2], [2,5], [5,5] ]
]; // NOTE: possibly add 7th chords with an omitted note (5th)

var poly4 = [ //seventh/ 4-note chords
  ['maj7', [4, 3, 4], [3, 4, 1], [4, 1, 4], [1, 4, 3]], 
  ['+maj7', [4, 4, 3], [4, 3, 1], [3, 1, 4], [1, 4, 4]], 
  ['maj7(b5)', [4, 2, 5], [2, 5, 1], [5, 1, 4], [1, 4, 2]], 
  ['7', [4, 3, 3], [3, 3, 2], [3, 2, 4], [2, 4, 3]], 
  ['+7', [4, 4, 2], [4, 2, 2], [2, 2, 4], [2, 4, 4]], 
  ['7(b5)', [4, 2, 4], [2, 4, 2], [4, 2, 4], [2, 4, 2]], 
  ['min7', [3, 4, 3], [4, 3, 2], [3, 2, 3], [2, 3, 4]], 
  ['min7b5', [3, 3, 4], [3, 4, 2], [4, 2, 3], [2, 3, 3]], 
  ['min(maj7)', [3, 4, 4], [4, 4, 1], [4, 1, 3], [1, 3, 4]], 
  ['o7', [3, 3, 3], [3, 3, 3], [3, 3, 3], [3, 3, 3]], 
  ['o(maj7)', [3, 3, 5], [3, 5, 1], [5, 1, 3], [1, 3, 3]], 
  ['sus7', [5, 2, 3], [2, 3, 2], [3, 2, 5], [2, 5, 2]]
  ];

var poly5 = [ // ninth/extended/5-note chords
  ['maj9', [2, 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 2], [1, 2, 2, 3]], 
  ['maj6/9', [2, 2, 3, 2], [2, 3, 2, 3], [3, 2, 3, 2], [2, 3, 2, 2], [3, 2, 2, 3]], 
  ['min9', [2, 1, 4, 3], [1, 4, 3, 2], [4, 3, 2, 2], [3, 2, 2, 1], [2, 2, 1, 4]], 
  ['min9(maj7)', [2, 1, 4, 4], [1, 4, 4, 1], [4, 4, 1, 2], [4, 1, 2, 1], [1, 2, 1, 4]], 
  ['min7b5(nat9)', [2, 1, 3, 4], [1, 3, 4, 2], [3, 4, 2, 2], [4, 2, 2, 1], [2, 2, 1, 3]], 
  ['7b9b13', [1, 3, 4, 2], [3, 4, 2, 2], [4, 2, 2, 1], [2, 2, 1, 3], [2, 1, 3, 4]], 
  ['min6/9', [2, 1, 4, 2], [1, 4, 2, 3], [4, 2, 3, 2], [2, 3, 2, 1], [3, 2, 1, 4]], 
  ['9', [2, 2, 3, 3], [2, 3, 3, 2], [3, 3, 2, 2], [3, 2, 2, 2], [2, 2, 2, 3]], 
  ['7(b9)', [1, 3, 3, 3], [3, 3, 3, 2], [3, 3, 2, 1], [3, 2, 1, 3], [2, 1, 3, 3]], 
  ['7(#9)', [3, 1, 3, 3], [1, 3, 3, 2], [3, 3, 2, 3], [3, 2, 3, 1], [2, 3, 1, 3]], 
  ['7alt', [3, 1, 4, 2], [1, 4, 2, 2], [4, 2, 2, 3], [2, 2, 3, 1], [2, 3, 1, 4]], 
  ['sus9', [2, 3, 2, 3], [3, 2, 3, 2], [2, 3, 2, 2], [3, 2, 2, 3], [2, 2, 3, 2]]
  ];

var poly6 = [ // extended/6-note chords
  ['maj9#11', [2, 2, 2, 1, 4], [2, 2, 1, 4, 1], [2, 1, 4, 1, 2], [1, 4, 1, 2, 2], [4, 1, 2, 2, 2], [1, 2, 2, 2, 1]], 
  ['maj6/9', [2, 2, 3, 2, 2], [2, 3, 2, 2, 1], [3, 2, 2, 1, 2], [2, 2, 1, 2, 2], [2, 1, 2, 2, 3], [1, 2, 2, 3, 2]], 
  ['maj7#9#11', [3, 1, 2, 1, 4], [1, 2, 1, 4, 1], [2, 1, 4, 1, 3], [1, 4, 1, 3, 1], [4, 1, 3, 1, 2], [1, 3, 1, 2, 1]], 
  ['maj13b9', [1, 3, 3, 2, 2], [3, 3, 2, 2, 1], [3, 2, 2, 1, 1], [2, 2, 1, 1, 3], [2, 1, 1, 3, 3], [1, 1, 3, 3, 2]], 
  ['maj13#11', [1, 3, 3, 2, 2], [3, 3, 2, 2, 1], [3, 2, 2, 1, 1], [2, 2, 1, 1, 3], [2, 1, 1, 3, 3], [1, 1, 3, 3, 2]], 
  ['9#11', [2, 2, 2, 1, 3], [2, 2, 1, 3, 2], [2, 1, 3, 2, 2], [1, 3, 2, 2, 2], [3, 2, 2, 2, 2], [2, 2, 2, 2, 1]], 
  ['min11', [2, 1, 2, 2, 3], [1, 2, 2, 3, 2], [2, 2, 3, 2, 2], [2, 3, 2, 2, 1], [3, 2, 2, 1, 2], [2, 2, 1, 2, 2]], 
  ['min13', [2, 1, 4, 2, 1], [1, 4, 2, 1, 2], [4, 2, 1, 2, 2], [2, 1, 2, 2, 1], [1, 2, 2, 1, 4], [2, 2, 1, 4, 2]], 
  ['min9#11', [2, 1, 3, 1, 3], [1, 3, 1, 3, 2], [3, 1, 3, 2, 2], [1, 3, 2, 2, 1], [3, 2, 2, 1, 3], [2, 2, 1, 3, 1]], 
  ['min7b5(nat9)', [2, 1, 2, 1, 4], [1, 2, 1, 4, 2], [2, 1, 4, 2, 2], [1, 4, 2, 2, 1], [4, 2, 2, 1, 2], [2, 2, 1, 2, 1]], 
  ['min9(maj7)#11', [2, 1, 3, 1, 4], [1, 3, 1, 4, 1], [3, 1, 4, 1, 2], [1, 4, 1, 2, 1], [4, 1, 2, 1, 3], [1, 2, 1, 3, 1]], 
  ['13', [2, 2, 3, 2, 1], [2, 3, 2, 1, 2], [3, 2, 1, 2, 2], [2, 1, 2, 2, 2], [1, 2, 2, 2, 3], [2, 2, 2, 3, 2]], 
  ['7b9#11', [1, 3, 2, 1, 3], [3, 2, 1, 3, 2], [2, 1, 3, 2, 1], [1, 3, 2, 1, 3], [3, 2, 1, 3, 2], [2, 1, 3, 2, 1]], 
  ['13b9#11', [1, 5, 1, 2, 1], [5, 1, 2, 1, 2], [1, 2, 1, 2, 1], [2, 1, 2, 1, 5], [1, 2, 1, 5, 1], [2, 1, 5, 1, 2]], 
  ['7#9#11', [3, 1, 2, 1, 3], [1, 2, 1, 3, 2], [2, 1, 3, 2, 3], [1, 3, 2, 3, 1], [3, 2, 3, 1, 2], [2, 3, 1, 2, 1]], 
  ['7alt', [1, 2, 1, 4, 2], [2, 1, 4, 2, 2], [1, 4, 2, 2, 1], [4, 2, 2, 1, 2], [2, 2, 1, 2, 1], [2, 1, 2, 1, 4]], 
  ['7alt', [3, 1, 3, 1, 2], [1, 3, 1, 2, 2], [3, 1, 2, 2, 3], [1, 2, 2, 3, 1], [2, 2, 3, 1, 3], [2, 3, 1, 3, 1]], 
  ['+9#11', [2, 2, 2, 2, 2], [2, 2, 2, 2, 2], [2, 2, 2, 2, 2], [2, 2, 2, 2, 2], [2, 2, 2, 2, 2], [2, 2, 2, 2, 2]], 
  ['7b9b13', [1, 3, 3, 1, 2], [3, 3, 1, 2, 2], [3, 1, 2, 2, 1], [1, 2, 2, 1, 3], [2, 2, 1, 3, 3], [2, 1, 3, 3, 1]], 
  ['b9nat13', [1, 3, 3, 2, 1], [3, 3, 2, 1, 2], [3, 2, 1, 2, 1], [2, 1, 2, 1, 3], [1, 2, 1, 3, 3], [2, 1, 3, 3, 2]], 
  ['sus13', [2, 3, 2, 2, 1], [3, 2, 2, 1, 2], [2, 2, 1, 2, 2], [2, 1, 2, 2, 3], [1, 2, 2, 3, 2], [2, 2, 3, 2, 2]], 
  ['sus13b9', [1, 4, 2, 2, 1], [4, 2, 2, 1, 2], [2, 2, 1, 2, 1], [2, 1, 2, 1, 4], [1, 2, 1, 4, 2], [2, 1, 4, 2, 2]]
];

var poly7 = [
  ['min11add6', [2, 1, 2, 2, 2, 1], [1, 2, 2, 2, 1, 2], [2, 2, 2, 1, 2, 2], [2, 2, 1, 2, 2, 1], [2, 1, 2, 2, 1, 2], [1, 2, 2, 1, 2, 2], [2, 2, 1, 2, 2, 2]], 
  ['min6/9(maj7)#11', [2, 1, 3, 1, 2, 2], [1, 3, 1, 2, 2, 1], [3, 1, 2, 2, 1, 2], [1, 2, 2, 1, 2, 1], [2, 2, 1, 2, 1, 3], [2, 1, 2, 1, 3, 1], [1, 2, 1, 3, 1, 2]], 
  ['maj7#11add6', [2, 2, 2, 1, 2, 2], [2, 2, 1, 2, 2, 1], [2, 1, 2, 2, 1, 2], [1, 2, 2, 1, 2, 2], [2, 2, 1, 2, 2, 2], [2, 1, 2, 2, 2, 1], [1, 2, 2, 2, 1, 2]], 
  ['+maj7#11add6', [2, 2, 2, 2, 1, 2], [2, 2, 2, 1, 2, 1], [2, 2, 1, 2, 1, 2], [2, 1, 2, 1, 2, 2], [1, 2, 1, 2, 2, 2], [2, 1, 2, 2, 2, 2], [1, 2, 2, 2, 2, 1]], 
  ['13#11', [2, 2, 2, 1, 2, 1], [2, 2, 1, 2, 1, 2], [2, 1, 2, 1, 2, 2], [1, 2, 1, 2, 2, 2], [2, 1, 2, 2, 2, 2], [1, 2, 2, 2, 2, 1], [2, 2, 2, 2, 1, 2]], 
  ['7b9nat13', [2, 2, 2, 1, 2, 1], [2, 2, 1, 2, 1, 2], [2, 1, 2, 1, 2, 2], [1, 2, 1, 2, 2, 2], [2, 1, 2, 2, 2, 2], [1, 2, 2, 2, 2, 1], [2, 2, 2, 2, 1, 2]], 
  ['7b9#11', [2, 2, 2, 1, 2, 1], [2, 2, 1, 2, 1, 2], [2, 1, 2, 1, 2, 2], [1, 2, 1, 2, 2, 2], [2, 1, 2, 2, 2, 2], [1, 2, 2, 2, 2, 1], [2, 2, 2, 2, 1, 2]], 
  ['13b9#11', [2, 2, 2, 1, 2, 1], [2, 2, 1, 2, 1, 2], [2, 1, 2, 1, 2, 2], [1, 2, 1, 2, 2, 2], [2, 1, 2, 2, 2, 2], [1, 2, 2, 2, 2, 1], [2, 2, 2, 2, 1, 2]], 
  ['7alt', [1, 2, 1, 3, 1, 2], [2, 1, 3, 1, 2, 2], [1, 3, 1, 2, 2, 1], [3, 1, 2, 2, 1, 2], [1, 2, 2, 1, 2, 1], [2, 2, 1, 2, 1, 3], [2, 1, 2, 1, 3, 1]], 
  ['7alt', [1, 2, 1, 2, 2, 2], [2, 1, 2, 2, 2, 2], [1, 2, 2, 2, 2, 1], [2, 2, 2, 2, 1, 2], [2, 2, 2, 1, 2, 1], [2, 2, 1, 2, 1, 2], [2, 1, 2, 1, 2, 2]]
];

// create up to poly7


function pickLib(ints) { // determines which chord library to use, based on the length of the interval set
	if (ints.length == 2) {
  	return poly3;
  }
	else if (ints.length == 3) {
    return poly4;
  }
	else if (ints.length == 4) {
    return poly5;
  }
  else if (ints.length == 5) {
    return poly6;
  }
  else if (ints.length == 6) {
    return poly7;
  }
  else {
  	return undefined;
  }
}

function findChord(arr,target){ // finds all candidate chords (returning name and inversion) from the appropriate chord library, by searching for the given interval set
	var nameOpts = [];
  var a = arr;
	for (var i = 0; i < a.length; i++) {
  	var row = a[i];
    for (var j = 0; j< row.length; j++) {
    	if (row[j].toString() === target.toString()) {
      	    nameOpts.push([row[0], j] );
	      //return [row[0] , j];
      }
    }
  }
  return nameOpts;
}

function narrowList(nameOpts) { // given a list of candidate chords, chooses the one with the lowest inversion value, since this is more likely the performer's interpretation
	var lowest = 10;  
  for (var i = 0; i < nameOpts.length; i++) {
		if (nameOpts[i][1] < lowest) {
    	lowest = nameOpts[i][1];
    }
  }
  for (var k = 0; k < nameOpts.length; k++) {
		if (nameOpts[k][1] == lowest) {
    	nameOpts[k][1] -= 1;
      return nameOpts[k];
    }
  }
  
}

function getRoot3(ints,inv,bass) {
  var rootMIDI = 0;
  var addend = 0;
  if (inv == 0) {
    var rootMIDI = bass;
  }
  else if (inv == 1) {
    var addend = ints[0] + ints[1];
    var rootMIDI = bass + addend;
  }
  else if (inv == 2) {
    var rootMIDI = bass + ints[0];
  }
  else {
    return undefined;
  }
  var rootNum = rootMIDI % 12;
  var notes = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
  var root = notes[rootNum];
  return root;
}

function getRoot4(ints,inv,bass) {
  var rootMIDI = 0;
  var addend = 0;
  if (inv == 0) {
    var rootMIDI = bass;
  }
  else if (inv == 1) {
    var addend = ints[0] + ints[1] + ints[2];
    var rootMIDI = bass + addend;
  }
  else if (inv == 2) {
    var subset = ints.slice(0,2);
    var addend = ints[0] + ints[1];
    var rootMIDI = bass + addend;
  }
  else if (inv == 3) {
    var addend = ints[0];
    var rootMIDI = bass + addend;
  }
  else {
    return undefined;
  }

  var rootNum = rootMIDI % 12;
  var notes = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
  var root = notes[rootNum];
  return root;
}

function getRoot5(ints,inv,bass) {
  var rootMIDI = 0;
  var addend = 0;
  if (inv == 0) {
    var rootMIDI = bass;
  }
  else if (inv == 1) {
    var addend = ints[0] + ints[1] + ints[2] + ints[3];
    var rootMIDI = bass + addend;
  }
  else if (inv == 2) {
    //var subset = ints.slice(0,3);
    var addend = ints[0] + ints[1] + ints[2];
    var rootMIDI = bass + addend;
  }
  else if (inv == 3) {
    //var subset = ints.slice(0,2);
    var addend = ints[0] + ints[1];
    var rootMIDI = bass + addend;
  }
  else if (inv == 4) {
    var addend = ints[0];
    var rootMIDI = bass + addend;
  }
  else {
    return undefined;
  }
  
  var rootNum = rootMIDI % 12;
  var notes = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
  var root = notes[rootNum];
  return root;
}

function getRoot6(ints,inv,bass) {
  var rootMIDI = 0;
  var addend = 0;
  if (inv == 0) {
    var rootMIDI = bass;
  }
  else if (inv == 1) {
    var addend = ints[0] + ints[1] + ints[2] + ints[3] + ints[4];
    var rootMIDI = bass + addend;
  }
  else if (inv == 2) {
    //var subset = ints.slice(0,3);
    var addend = ints[0] + ints[1] + ints[2] + ints[3];
    var rootMIDI = bass + addend;
  }
  else if (inv == 3) {
    //var subset = ints.slice(0,2);
    var addend = ints[0] + ints[1] + ints[2];
    var rootMIDI = bass + addend;
  }
  else if (inv == 4) {
    var addend = ints[0] + ints[1];
    var rootMIDI = bass + addend;
  }
  else if (inv == 5) {
    var addend = ints[0];
    var rootMIDI = bass + addend;
  }
  else {
    return undefined;
  }
  
  var rootNum = rootMIDI % 12;
  var notes = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
  var root = notes[rootNum];
  return root;
}

function getRoot7(ints,inv,bass) {
  var rootMIDI = 0;
  var addend = 0;
  if (inv == 0) {
    var rootMIDI = bass;
  }
  else if (inv == 1) {
    var addend = ints[0] + ints[1] + ints[2] + ints[3] + ints[4] + ints[5];
    var rootMIDI = bass + addend;
  }
  else if (inv == 2) {
    //var subset = ints.slice(0,3);
    var addend = ints[0] + ints[1] + ints[2] + ints[3] + ints[4];
    var rootMIDI = bass + addend;
  }
  else if (inv == 3) {
    //var subset = ints.slice(0,2);
    var addend = ints[0] + ints[1] + ints[2] + ints[3];
    var rootMIDI = bass + addend;
  }
  else if (inv == 4) {
    var addend = ints[0] + ints[1] + ints[2];
    var rootMIDI = bass + addend;
  }
  else if (inv == 5) {
    var addend = ints[0] + ints[1];
    var rootMIDI = bass + addend;
  }
  else if (inv == 6) {
    var addend = ints[0];
    var rootMIDI = bass + addend;
  }
  else {
    return undefined;
  }
  
  var rootNum = rootMIDI % 12;
  var notes = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
  var root = notes[rootNum];
  return root;
}

function inputs() {
  var inputs = arrayfromargs(arguments);
  var intsStr = inputs[0];
  var ints = intsStr.split(' ').map(Number);
  var bass = inputs[1];

  var lib = pickLib(ints);
  var ans = narrowList(findChord(lib,ints));
  var inv = ans[1];
  
  var root = 0;

  if (ints.length == 2) {
    root = getRoot3(ints,inv,bass);
  }
  else if (ints.length == 3) {
    root = getRoot4(ints,inv,bass);
  }
  else if (ints.length == 4) {
    root = getRoot5(ints,inv,bass);
  }
  else if (ints.length == 5) {
    root = getRoot6(ints,inv,bass);
  }
  else if (ints.length == 6) {
    root = getRoot7(ints,inv,bass);
  }

  var fullName = root+ans[0];

  outlet(0,ints);
  outlet(1,bass);
  outlet(2,ans[0]);
  outlet(3,inv);
  outlet(4,root);
  outlet(5,fullName);

}

