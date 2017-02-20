// core App definition
(function (window) {
  //var Player = window.Player;
  var App = {
    launch: function() {
      console.log("----> launched simwriter");
      this.abstractDocument = new AbstractDoc();
      this.messageLog = new MessageLog();
      this.player = new Player(this.abstractDocument);
    },

    write: function(workType) {
      this.player.startWriting(workType);
      this.messageLog.note("Work begins on a new " + workType + "!");
    },

    publish: function(mediaType) {
      if (this.player.writing) {
        console.log("Told to publish document in ", mediaType);
        console.log("work value", this.abstractDocument.estimateValue());
        var docValue = (this.abstractDocument.estimateValue() * this.mediaMultiplier(mediaType)).toFixed(2);
        console.log("DOC IS WORTH: $", docValue);
        this.messageLog.note("A new " + this.abstractDocument.workType + " was sold for $" + docValue + ".");
        this.player.sellDocument(docValue);
      } else {
        console.log("No current document to publish!!");
      }
    },

    step: function() {
      this.player.work();
      this.messageLog.tick();

      this.abstractDocument.repaint();
      this.messageLog.repaint();
      this.paintStats();
    },

    paintStats: function() {
      money = document.getElementById("money-stat");
      money.innerHTML = "$" + this.player.money;
    },

    mediaMultiplier: function(mediaType) {
      if (mediaType == 'blog') {
        return 1.0;
      } else if (mediaType == 'job board') {
        return 4.5;
      }
    }
  };
  window.App = App;
  window.setInterval(function(){ window.App.step(); }, 100);
})(window);
