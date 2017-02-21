var Template = function() {
  this.content = [""];
};

Template.prototype.letter = function() {
  //console.log("LETTER");
  this.content[this.content.length-1] += 'X';
  return this;
};

Template.prototype.space = function() {
  //console.log("SPACE");
  this.content[this.content.length-1] += ' ';
  return this;
};

Template.prototype.newline = function() {
  this.content.push("");
  return this;
};

Template.prototype.pickOne = function(a, b, probability) {
  var roll = Math.floor(Math.random() * 100);
  if (roll < (100 * probability)) {
    a.call(this);
  } else {
    b.call(this);
  };
  return this;
};

Template.prototype.repeatIndefinitely = function(operation, probability) {
  operation.call(this); // need to make sure we keep the context in view..
  var roll = Math.floor(Math.random() * 100);
  var shouldRepeat = roll < (100 * probability);
  while (shouldRepeat) {
    operation.call(this);
    roll = Math.floor(Math.random() * 100);
    shouldRepeat = roll < (100 * probability);
  }
  return this;
};

Template.prototype.word = function() {
  //console.log("WORD");
  this.repeatIndefinitely(this.letter, 0.8);
  this.space();
  return this;
};

Template.prototype.phrase = function() {
  this.repeatIndefinitely(this.word, 0.7);
  return this;
};

Template.prototype.line = function() {
  //console.log("LINE");
  this.repeatIndefinitely(this.phrase, 0.2);
  this.newline();
  return this;
};

Template.prototype.freewrite = function() {
  this.repeatIndefinitely(this.line, 0.5);
  this.newline();
  return this;
};

Template.prototype.freeversePoem = function() {
  console.log("FREEVERSE POEM!");
  this.pickOne(this.word, this.phrase);
  this.newline();
  this.newline();
  this.newline();
  this.repeatIndefinitely(this.freewrite, 0.9);
  return this;
};

Template.prototype.fullLine = function() {
  this.letter();
  for (i = 0; i < 60; i++) {
    this.pickOne(this.letter, this.space, 0.7);
  }
  this.letter();
  this.newline();
  return this;
};

Template.prototype.graf = function() {
  this.fullLine();
  this.fullLine();
  this.fullLine();
  this.pickOne(this.fullLine, this.line, 0.3);
  this.newline();
  return this;
};

Template.prototype.simpleArticle = function() {
  this.phrase();
  this.newline();
  this.newline();
  this.graf();
  this.graf();
  this.graf();
  this.graf();
  return this;
};

window.AbstractTemplate = Template;
