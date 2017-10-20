/** Created by alex on 20.10.2017 **/
'use strict';
var expect = require('expect');
var {Users} = require('./users');

describe('Users', () => {
  var users;
  
  beforeEach(() => {
    users = new Users();
    users.users = [
      { id: 1,
        name: 'Mike',
        room: 'Node Course'
      },
      { id: 2,
        name: 'Jen',
        room: 'React Course'
      },
      { id: 3,
        name: 'Julie',
        room: 'Node Course'
      }]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: 123,
      name: 'Alex',
      room: 'The Office Fans'
    };

    users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    let userIdToRemove = 2;
    let removedUser = users.removeUser(userIdToRemove);
    expect(removedUser.id).toBe(userIdToRemove);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    let userIdToRemove = 99;
    let removedUser = users.removeUser(userIdToRemove);
    expect(removedUser).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    let userId = 3;
    let user = users.getUser(userId);
    expect(userId).toBe(user.id);
  });

  it('should not find a user', () => {
    let userId = 99;
    let user = users.getUser(userId);
    expect(user).toNotExist();
  });

  it('should return names for Node Course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Julie']);
  });

  it('should return names for React Course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  })
});