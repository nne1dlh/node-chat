const expect = require('expect');

const{Users} = require('./users');

describe('Users-Piss', () => {
    var users;

    beforeEach(() => {
        usersP = new Users();
        usersP.users =[{
            id: '1',
            fname: 'Dawn',
            room: 'Node Course'
        },{
            id:'2',
            fname: 'Malcolm',
            room: 'React Course'
        },{
            id:'3',
            fname: 'Dan',
            room: 'Node Course'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '456',
            fname: 'Darren',
            room: 'Krav Maga Maine'
        };
        var resUser = users.addUser(user.id, user.fname, user.room);
        
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var userId = '1';
        var user = usersP.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(usersP.users.length).toBe(2);
    });

    it('should not remove user', () => {
        var userId = '19';
        var user = usersP.removeUser(userId);

        expect(user).toBeFalsy();
        expect(usersP.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = '2';
        var user = usersP.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('shoudl not find user', () => {
        var userId = '99';
        var user = usersP.getUser(userId);

        expect(user).toBeFalsy();
    });

    it('should return names for node course', () => {
        var userList = usersP.getUserList('Node Course');

        expect(userList).toEqual(['Dawn', 'Dan']);
    });

    it('should return names for react course', () => {
        var userList = usersP.getUserList('React Course');

        expect(userList).toEqual(['Malcolm']);
    })
});