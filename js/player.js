var Player = function(writingSurface, docStats) {
  this.writingSurface = writingSurface;
  this.name = "Alex";
  this.money = 26.34;
  this.fame = 1;
  this.writing = false;
  this.workingOn = null;

  this.greet = function() {
    console.log(this.name, " ($", this.money, ", ", this.fame, " fame) says hello");
  };

  this.startWriting = function(workType) {
    if (!this.writing) {
      console.log(this.name, "would start writing into a div somewhere...");
      console.log("working on: ", workType);
      this.writing = true;
      this.workingOn = workType;
      this.writingSurface.startWork(workType);
    } else {
      console.log("WARNING: ", this.name, " was told to write something, but was already working on something. You should probably focus your energy and work on one thing at a time.");
      console.log(this.name, "is already working on", this.workingOn);
    }
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
      this.writingSurface.writeWord();
      if (this.coinflip()) {
        this.writingSurface.newline();
      }
      //console.log(this.name, "wrote to doc!!!!!!!!!");
    }
  };

  this.coinflip = function() {
    return Math.floor(Math.random() * 10) > 5;
  };

  this.randomWord = function(character) {
    len = Math.floor(Math.random() * 12) + 1;
    return new Array(len + 1).join( character );
  };
};

window.Player = Player;
