var MessageLog = function() {
  this.messages = [
    "(System messages will appear here.)",
    "Remember: they can't hear you dreaming! -Admin",
  ];

  this.adminStory = [
    "Did you find the frozen sea you were looking for? -Admin",
    "I know you're intent on finding home. -Admin",
    "The isolation is wonderful here. -Admin",
    "Have you found it yet? -Admin",
    "Try something different. -Admin",
    "Are you even looking anymore? -Admin",
  ];

  this.note = function(msg) {
    this.messages.push(msg);
  };

  this.adminStoryIndex = 0;
  this.tick = function() {
    var stillTellingStory = this.adminStoryIndex < (this.adminStory.length - 1);
    if (stillTellingStory && Math.floor(Math.random() * 100) > 98) {
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
