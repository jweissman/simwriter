var AbstractDoc = function() {
  this.surface = document.getElementById("active-document");
  this.content = [""];
  this.maxWordLength = 15;

  this.writeWord = function() {
    word = ' ' + this.randomWord('X');
    this.content[this.content.length-1] = this.content[this.content.length-1] || "";
    this.content[this.content.length-1] += word;
  };

  this.newline = function() {
    this.content.push("");
    this.currentParagraphIndex += 1;
  };

  this.clear = function() {
    this.content = [];
  };

  this.randomWord = function(character) {
    len = Math.floor(Math.random() * this.maxWordLength);
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
