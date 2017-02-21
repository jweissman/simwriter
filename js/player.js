var Player = function(writingSurface, docStats) {
  this.writingSurface = writingSurface;
  this.money = 26.34;
  this.fame = 1;
  this.writing = false;
  this.workingOn = null;
  this.science = 1;
  this.art = 1;
  this.philosophy = 1;

  this.startWriting = function(workType) {
    console.log("starting work on: ", workType);
    this.writing = true;
    this.workingOn = workType;
    console.log("STARTING WORK");
    this.writingSurface.startWork(workType);
  };

  this.sellDocument = function(paymentAmount) {
    console.log("Sold document for ", paymentAmount);
    console.log("Current money ", this.money);
    this.money = (parseFloat(this.money) + parseFloat(paymentAmount)).toFixed(2);
    this.writing = false;
    this.workingOn = null;
    this.writingSurface.clear();
  };

  this.work = function() {
    if (this.workingOn == null) {
      this.writingSurface.clear();
    } else {
      this.writingSurface.advanceCursor();
      //this.writingSurface.imbueWord(this.art, this.science, this.philosophy);
    }
  };
};

window.Player = Player;
