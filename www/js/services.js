angular.module('starter.services', [])

.factory('Mocked', function() {
  //Use a resource here that returns a JSON array. This will eventually be loaded from a server.

  var contactList = [
    {id: 0, name: 'Ned Stark', email: 'ned@winterfell.com', phone: '123-321-7890', url: 'img/profilepic2.png', address: 'abc street'},
    {id: 1, name: 'Theon Greyjoy', email: 'tgreyjoy@winterfell.com', phone: '321-456-7890', url: 'img/profilepic2.png', address: '007 street'},
    {id: 2, name: 'Samwell Tarly', email: 'starly@castleblack.com', phone: '456-456-7890', url: 'img/profilepic2.png', address: 'Baking Apple pie street'},
    {id: 3, name: 'Jon Snow', email: 'jsnow@castleblack.com', phone: '654-456-7890', url: 'img/profilepic2.png', address: 'Walford court'},
    {id: 4, name: 'Arya Stark', email: 'waterdancer@winterfell.com', phone: '789-456-7890', url: 'img/profilepic2.png', address: 'White house, Washingtom DC'},
    {id: 5, name: 'Jora Mormont', email: 'khaleesifan100@gmail.com', phone: '987-456-7890', url: 'img/profilepic2.png', address: 'CN tower'},
    {id: 6, name: 'Tyrion Lannister', email: 'tyrion@lannister.com', phone: '647-456-7890', url: 'img/profilepic2.png', address: 'Buckingham Palace'},
    {id: 7, name: 'Stannis Baratheon', email: 'onetrueking@dragonstone.com', phone: '764-456-7890', url: 'img/profilepic2.png', address: 'Sherlock Homes street'},
    {id: 8, name: 'Hodor', email: 'hodor@hodor.com', phone: '416-456-7890', url: 'img/profilepic2.png', address: 'Hobbit Shaire'},
    {id: 9, name: 'Margaery Tyrell', email: 'mtyrell@highgarden.com', phone: '614-456-7890', url: 'img/profilepic2.png', address: 'Kingdom of dwarfs'},
    {id: 10, name: 'Brienne of Tarth', email: 'oathkeeper@gmail.com', phone: '519-456-7890', url: 'img/profilepic2.png', address: 'Castle 223 runways'},
    {id: 11, name: 'Petyr Baelish', email: 'petyr@baelishindustries.com', phone: '223-456-7890', url: 'img/profilepic2.png', address: '6670 Young Street'},
  ];

  return {
    //Returns the entire contactList.
    all: function() {
      return contactList;
    },
 
    //Returns a specific contact.
    get: function(contactId) {
      for (var i = 0; i < contactList.length; i++) {
        if (contactList[i].id === parseInt(contactId)) {
          return contactList[i];
        }
      }
      return null;
    }
  }
})

.service('positions', function(Mocked){
//api call to get positions data for a users
  this.test = function(id){
    return Mocked.get(id);
   //return id;
  }

})

.service('accounts', function(){
//api call to get account information. 

});
