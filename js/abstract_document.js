var AbstractDoc = function() {
  this.surface = document.getElementById("active-document");
  this.stats = document.getElementById("active-document-stats");
  this.content = [""];
  this.maxWordLength = 15;
  this.workType = null;

  this.startWork = function(workType) {
    this.clear();
    this.workType = workType;
  };

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
    this.content = [""];
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

    this.stats.innerHTML = this.statsFragment(); //"WORD COUNT: 0 / etc";
  };

  this.statsFragment = function() {
    if (this.workType != null) {
      return "FILE " + this.workType + ".txt &nbsp; " +
             "WORDS: " + this.wordCount() + " &nbsp; " +
             "VALUE: $" + this.estimateValue() + " &nbsp; " +
             "RAD: " + this.radicalism() + "%";
    } else {
      return "";
    }
  };

  this.wordCount = function() {
    var wc = 0;
    for (line of this.content) {
      console.log("line", line);
      wc += line.split(' ').length;
    }
    return wc;
  };

  this.estimateValue = function() {
    return (1.5 + this.wordCount() * this.workValue(this.workType)).toFixed(2);
  };

  this.radicalism = function() {
    return (0.01 + this.wordCount() * 0.009).toFixed(0);
  };

  this.workValue = function(workType) {
    if (this.workType == 'resume') {
      return 0.08;
    } else if (this.workType == 'poem') {
      return 0.02;
    }
  };
};

window.AbstractDoc = AbstractDoc;
