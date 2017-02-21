var MessageLog = function() {
  this.messages = [
    "System messages will appear here. Try composing something! -Admin",
  ];

  this.adminStory = [
    "Remember: they can't hear you dreaming! -Admin",
    "Did you find the frozen sea you were looking for? -Admin",
    "I know you're intent on finding home. -Admin",
    "The isolation is wonderful here. -Admin",
    "Have you found it yet? -Admin",
    "Try something different. -Admin",
    "Are you even looking anymore? -Admin",
  ];

  this.note = function(msg) {
    this.messages.push(msg);
    this.repaint();
    var log = document.getElementById("system-messages");
    log.scrollTop = log.scrollHeight;
  };

  this.adminStoryIndex = 0;
  this.tick = function() {
    var stillTellingStory = this.adminStoryIndex < (this.adminStory.length - 1);
    if (stillTellingStory && Math.floor(Math.random() * 1000) > 998) {
      this.adminStoryIndex += 1;
      this.note(this.adminStory[this.adminStoryIndex]);
    }
  };

  this.repaint = function() {
    var log = document.getElementById("system-messages");
    var logContent = "";
    for (message of this.messages) {
      logContent +=
        "<li>" +
        "<p>" + message + "</p>" +
        "</li>";
    }
    log.innerHTML = logContent;
  };
};

window.MessageLog = MessageLog;
