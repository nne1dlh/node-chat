[{
    id: '12344',
    name: 'Darren',
    room: 'Krav Maga'
}]

//addUser(id,name,room)
//removeUser(id)
//getUser(id)
//getUserList(room)

class Users {
    constructor () {
        this.users = [];
    }
    addUser(id, fname, room) {
        var user = {id, fname, room};
        this.users.push(user);
        
        return user;
    }
    removeUser(id) {
        var user = this.getUser(id);

        if(user){
            this.users = this.users.filter((x) => x.id !== id);
        }
        return user;
    }
    getUser(id) {
        return this.users.filter((x) => x.id === id)[0];
    }
    getUserList(room) {
        var userFind = this.users.filter((x) =>  x.room === room);
        var nameArray = userFind.map((x) => x.fname);

        return nameArray;
        }
    }


module.exports = {Users};



// class Person {
//     constructor(fname,age) {
//         this.fname = fname;
//         this.age = age;
//     }
//     getUserDescription() {
//         return `${this.fname} is ${this.age} years old.`;
//     }
// }

// var me = new Person('Darren', 55);
// console.log('this.name', me.fname);
// console.log('this.age', me.age);
// var descript = me.getUserDescription();
// console.log(descript);
