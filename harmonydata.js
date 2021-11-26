autowatch = 1;
inlets = 1;
outlets = 4;

var poly3data =  [
  ['maj', [0, 4, 7], 'major', 1, 0, 0],
  ['min', [0, 3, 7], 'minor', 1, 0, 0],
  ['dim', [0, 3, 6], 'diminished', 2, 1, 0],
  ['aug', [0, 4, 8], 'augmented', 0, 0.5, 0],
  ['sus', [0, 5, 7], 'suspended', 3, 0.5, 0]]

var poly4data =  [
  ['maj7', [0, 4, 7, 11], 'major', 1, 0, 0],
  ['+maj7', [0, 4, 8, 11], 'augmented', 1, 0.5, 0],
  ['maj7(b5)', [0, 4, 6, 11], 'major', 3, 0, 2],
  ['7', [0, 4, 7, 10], 'dominant', 2, 1, 0],
  ['+7', [0, 4, 8, 10], 'augmented', 2, 0.5, 0],
  ['7(b5)', [0, 4, 6, 10], 'dominant', 2, 1, 2],
  ['min7', [0, 3, 7, 10], 'minor', 2, 0, 0],
  ['min7b5', [0, 3, 6, 10], 'minor', 2, 0, 1],
  ['min(maj7)', [0, 3, 7, 11], 'minor', 1, 0, 1],
  ['o7', [0, 3, 6, 9], 'diminished', 3, 1, 0],
  ['o(maj7)', [0, 3, 6, 11], 'diminished', 3, 1, 1],
  ['sus7', [0, 5, 7, 10], 'suspended', 4, 0.5, 0]]

var poly5data =  [
  ['maj9', [0, 2, 4, 7, 11], 'major', 5, 0, 0],
  ['maj6/9', [0, 2, 4, 7, 9], 'major', 7, 0, 0],
  ['min9', [0, 2, 3, 7, 10], 'minor', 4, 0, 0],
  ['min9(maj7)', [0, 2, 3, 7, 11], 'minor', 3, 0, 1],
  ['min7b5(nat9)', [0, 2, 3, 6, 10], 'minor', 4, 0, 2],
  ['7b9b13', [0, 1, 4, 8, 10], 'dominant', 4, 1, 2],
  ['min6/9', [0, 2, 3, 7, 9], 'minor', 5, 0, 0],
  ['9', [0, 2, 4, 7, 10], 'dominant', 6, 1, 0],
  ['7(b9)', [0, 1, 4, 7, 10], 'dominant', 4, 1, 2],
  ['7(#9)', [0, 3, 4, 7, 10], 'dominant', 4, 1, 2],
  ['7alt', [0, 3, 4, 8, 10], 'dominant', 4, 1, 0],
  ['sus9', [0, 2, 5, 7, 10], 'suspended', 6, 0.5, 0]]

var poly6data =  [
  ['maj9#11', [0, 2, 4, 6, 7, 11], 'major', 7, 0, 1],
  ['maj6/9', [0, 2, 4, 7, 9, 11], 'major', 9, 0, 0],
  ['maj7#9#11', [0, 3, 4, 6, 7, 11], 'major', 5, 0, 2],
  ['maj13b9', [0, 1, 4, 7, 9, 11], 'major', 7, 0, 1],
  ['maj13#11', [0, 1, 4, 7, 9, 11], 'major', 7, 0, 1],
  ['9#11', [0, 2, 4, 6, 7, 10], 'dominant', 8, 1, 1],
  ['min11', [0, 2, 3, 5, 7, 10], 'minor', 8, 0, 0],
  ['min13', [0, 2, 3, 7, 9, 10], 'minor', 6, 0, 0],
  ['min9#11', [0, 2, 3, 6, 7, 10], 'minor', 6, 0, 1],
  ['min7b5(nat9)', [0, 2, 3, 5, 6, 10], 'minor', 6, 0, 2],
  ['min9(maj7)#11', [0, 2, 3, 6, 7, 11], 'minor', 5, 0, 2],
  ['13', [0, 2, 4, 7, 9, 10], 'dominant', 8, 1, 0],
  ['7b9#11', [0, 1, 4, 6, 7, 10], 'dominant', 6, 1, 2],
  ['13b9#11', [0, 1, 6, 7, 9, 10], 'dominant', 6, 1, 2],
  ['7#9#11', [0, 3, 4, 6, 7, 10], 'dominant', 6, 1, 2],
  ['7alt', [0, 1, 3, 4, 8, 10], 'dominant', 6, 1, 0],
  ['7alt', [0, 3, 4, 7, 8, 10], 'dominant', 6, 1, 0],
  ['+9#11', [0, 2, 4, 6, 8, 10], 'augmented', 10, 0.5, 1],
  ['7b9b13', [0, 1, 4, 7, 8, 10], 'dominant', 6, 1, 2],
  ['13b9', [0, 1, 4, 7, 9, 10], 'dominant', 6, 1, 1],
  ['sus13', [0, 2, 5, 7, 9, 10], 'suspended', 8, 0.5, 0],
  ['sus13b9', [0, 1, 5, 7, 9, 10], 'suspended', 6, 0.5, 1]]

var poly7data =  [
  ['min11add6', [0, 2, 3, 5, 7, 9, 10], 'minor', 10, 0, 0],
  ['min6/9(maj7)#11', [0, 2, 3, 6, 7, 9, 11], 'minor', 9, 0, 2],
  ['maj7#11add6', [0, 2, 4, 6, 7, 9, 11], 'major', 11, 0, 1],
  ['+maj7#11add6', [0, 2, 4, 6, 8, 9, 11], 'augmented', 11, 0.5, 1],
  ['13#11', [0, 2, 4, 6, 7, 9, 10], 'dominant', 10, 1, 1],
  ['7b9nat13', [0, 2, 4, 6, 7, 9, 10], 'dominant', 10, 1, 1],
  ['7b9#11', [0, 2, 4, 6, 7, 9, 10], 'dominant', 10, 1, 2],
  ['13b9#11', [0, 2, 4, 6, 7, 9, 10], 'dominant', 10, 1, 2],
  ['7alt', [0, 1, 3, 4, 7, 8, 10], 'dominant', 8, 1, 0],
  ['7alt', [0, 1, 3, 4, 6, 8, 10], 'dominant', 10, 1, 0]]

var harmonydata = poly3data.concat(poly4data,poly5data,poly6data,poly7data);

function getdata() {
  var name = arrayfromargs(arguments);
  for (var i = 0; i < harmonydata.length; i++) {
    var row = harmonydata[i];
    if (row[0] == name) {
      var triad = row[2];
      var complexity = row[3];
      var tense = row[4];
      var alters = row[5];
    }

  outlet(0,triad);
  outlet(1,complexity);
  outlet(2,tense);
  outlet(3,alters);
}
}
