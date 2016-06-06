heg.factory('hegStorage', function ($http) {

  return {

  games: [
  { id: 1,
    name: "Flashing Squares",
    players: [1,2,3],
    description: "Watch random patterns flash up on the screen and as time goes on your window of opportunity becomes less.  Becarful if you press the wrong button too many times your game will be over.  Try and beat your top score.  You can also play this game with a friend.",
    rulesSingle: "Single Player: Use one device as your screen and one as your controller.  Match the grid clicked on the controller based on the flash on the screen. A correct click is equal to 1 point and an incorrect click is -0.5.  If your score goes negative you loose.",
    rulesMultiplayer: "Multiplayer: Same concept as above except its the best score in 1 minute.",
    imgUrl: "images/branding/heg-logo.png"
  },
  { id: 2,
    name: "Roating Cubes",
    players: [1,2],
    description: "11111Watch random patterns flash up on the screen and as time goes on your window of opportunity becomes less.  Becarful if you press the wrong button too many times your game will be over.  Try and beat your top score.  You can also play this game with a friend.",
    rulesSingle: "Single Player: 1111Use one device as your screen and one as your controller.  Match the grid clicked on the controller based on the flash on the screen. A correct click is equal to 1 point and an incorrect click is -0.5.  If your score goes negative you loose.",
    rulesMultiplayer: " Multiplayer: 11111Same concept as above except its the best score in 1 minute.",
    imgUrl: "images/branding/heg-logo.png"
  },
  { id: 3,
    name: "VR Cubes",
    players: [1],
    description: "11111Watch random patterns flash up on the screen and as time goes on your window of opportunity becomes less.  Becarful if you press the wrong button too many times your game will be over.  Try and beat your top score.  You can also play this game with a friend.",
    rulesSingle: "Single Player: 1111Use one device as your screen and one as your controller.  Match the grid clicked on the controller based on the flash on the screen. A correct click is equal to 1 point and an incorrect click is -0.5.  If your score goes negative you loose.",
    rulesMultiplayer: "Multiplayer: 11111Same concept as above except its the best score in 1 minute.",
    imgUrl: "images/branding/heg-logo.png"
  }
  ],
    get: function () {
      // return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
     return $http.get('/todos')
     },
        

    put: function (id) {
      // localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
        $http.put('/register', id);
    },

    post: function(id){
      console.log(id);
       return $http.post('/register',"hi");
       

    },

    delete: function(todo){
      $http.delete('/todos/'+todo._id)    }
  };

  
});

