/** Created by alex on 20.10.2017 **/
'use strict';
class Users {
  constructor() {
    this.users = []
  }

  addUser(id, name, room) {
    let user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    let user = this.getUser(id);
    
    // recreate new array without specified user obj inside
    if(user){
      this.users = this.users.filter(user => user.id !== id);
    }
    
    return user;
  }

  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }

  getUserList(room) {
    let users = this.users.filter(user => user.room === room);
    let namesArray = users.map(user => user.name);
    return namesArray;
  }
}

module.exports = {Users};