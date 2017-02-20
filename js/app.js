// core App definition
(function (window) {
  var Player = window.Player;
  var App = {
    launch: function() {
      console.log("----> launched simwriter");
      this.abstractDocument = new AbstractDoc();
      this.player = new Player(this.abstractDocument);
    },

    write: function(workType) {
      this.player.startWriting(workType);
    },

    publish: function(mediaType) {
      console.log("Told to publish document in ", mediaType);
    },

    step: function() {
      this.player.work();
      this.abstractDocument.repaint();
    }
  };
  window.App = App;
  window.setInterval(function(){ window.App.step(); }, 100);
})(window);
