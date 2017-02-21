var AbstractDoc = function() {
  this.surface = document.getElementById("active-document");
  this.stats = document.getElementById("active-document-stats");
  this.cursorRow = 0;
  this.cursorColumn = 0;
  this.documentScanComplete = false;
  this.workType = null;
  this.template = null;

  this.startWork = function(workType) {
    this.clear();
    this.workType = workType;
    console.log("WORK TYPE", workType);
    if (workType == 'resume') {
      this.template = (new AbstractTemplate()).simpleArticle();
    } else if (workType == 'poem') {
      this.template = (new AbstractTemplate()).freeversePoem();
    } else {
      console.log("WARNING: I don't know the template for ", workType);
    }
  };

  this.clear = function() {
    this.template = null;
    this.cursorRow = 0;
    this.cursorCol = 0;
    this.documentScanComplete = false;
    this.workType = null;
  };

  this.advanceCursor = function() {
    if (this.template != null) {
      if (typeof(this.template.content[this.cursorRow]) === 'undefined') { this.documentScanComplete = true; return; }
      var curRowLen = this.template.content[this.cursorRow].length;
      if (this.cursorRow < (this.template.content.length)) {
        if (this.cursorCol >= curRowLen) {
          this.cursorRow += 1;
          this.cursorCol = 0;
        } else {
          this.cursorCol += 1;
        }
      } else {
        console.log("WE ARE DONE ADVANCING CURSOR THROUGH TEMPLATE...");
        this.documentScanComplete = true;
      }
    } else {
      console.log("WARNING: Told to advance cursor but template was null");
    }
  };

  this.renderLine = function(line, lineNumber) {
    renderedLine = "";
    line.split('').forEach(function(character, charCol) {
      var pastCursor = (lineNumber > this.cursorRow || (lineNumber == this.cursorRow && charCol > this.cursorCol));
      var characterClass = 'space';
      if (character != ' ') {
        characterClass = 'block';
        if (pastCursor) {
          characterClass = 'block-faded';
        }
      }
      renderedLine += "<div class='" + characterClass + "'></div>";
    }, this);
    wrappedLine = "<div class='phrase'>" + renderedLine + "</div>";
    return wrappedLine;
  };

  this.repaint = function() {
    repaintedContent = "";
    if (this.template != null) {
      repaintedContent = this.template.content.map(this.renderLine, this).join('');
    }
    this.surface.innerHTML = repaintedContent;
    this.stats.innerHTML = this.statsFragment();
  };

  this.statsFragment = function() {
    if (this.workType != null) {
      baseStats = "FILE " + this.workType + ".txt &nbsp; " +
             "WORDS: " + this.wordCount() + " &nbsp; " +
             "EST. VALUE: $" + this.estimateValue() + " &nbsp; " +
             "RAD: " + this.radicalism() + "%";
      if (this.documentScanComplete) {
        baseStats += " &nbsp; [complete]";
      }
      return baseStats;
    } else {
      return "";
    }
  };

  this.wordCount = function() {
    var wc = 0;
    var lines = 0;
    for (line of this.template.content) {
      if (lines == this.cursorRow) {
        wc += line.slice(0,this.cursorCol).split(' ').length;
      } else if (lines > this.cursorRow) {
        break;
      } else {
        wc += line.split(' ').length;
      }
      lines += 1;
    }
    return wc;
  };

  this.estimateValue = function() {
    return (1.5 + this.wordCount() * this.workTypeMultiplier(this.workType)).toFixed(2);
  };

  this.radicalism = function() {
    return (0.01 + this.wordCount() * this.radPotential(this.workType)).toFixed(0);
  };

  this.workTypeMultiplier = function(workType) {
    if (this.workType == 'resume') {
      return 0.08;
    } else if (this.workType == 'poem') {
      return 0.02;
    }
  };

  this.radPotential = function(workType) {
    if (this.workType == 'resume') {
      return 0.001;
    } else if (this.workType == 'poem') {
      return 0.2;
    }
  }
};

window.AbstractDoc = AbstractDoc;
