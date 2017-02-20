var Word = function(len) {
  this.length = len;
};

var Line = function(words) {
  this.words = words;
};

var Graf = function(lines) {
  this.lines = lines;
};

var Section = function(titleLine, grafs) {
  this.titleLine = titleLine;
  this.grafs = grafs;
}

var AbstractDoc = function() {
  this.surface = document.getElementById("active-document");

  this.content = [""];

  this.writeWord = function() {
    word = ' ' + this.randomWord('X');
    //console.log("graph before writing", this.content[this.content.length-1]);
    //console.log("content before writing", this.content);
    //console.log("WRITING WORD: ", word);
    this.content[this.content.length-1] = this.content[this.content.length-1] || "";
    this.content[this.content.length-1] += word;
    //console.log("contents after writing", this.content[this.content.length-1]);
    //console.log("content after writing", this.content);
    //this.repaint();
  };

  this.newline = function() {
    this.content.push("");
    this.currentParagraphIndex += 1;
  };

  this.clear = function() {
    this.content = [];
  };

  this.randomWord = function(character) {
    len = Math.floor(Math.random() * 15);
    return new Array(len + 1).join( character );
  };

  this.repaint = function() {
    //console.log("[abstract doc] repainting!", this.content);
    repaintedContent = "";
    for (line of this.content) {
      repaintedContent += "<div class='phrase'>";
      for (character of line) {
        if (character == 'X') {
          //console.log("char was x");
          repaintedContent += "<div class='block'> </div>";
        } else {
          //console.log("char was not x");
          repaintedContent += "<div class='space'> </div>";
        }
      }
      repaintedContent += "</div>";
    }
    this.surface.innerHTML = repaintedContent;
    this.surface.scrollTop = this.surface.scrollHeight;
  }
};

window.AbstractDoc = AbstractDoc;
