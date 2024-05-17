import { Injectable } from '@nestjs/common';


  export const usersList  = 
  [ {
    id : 1,
    name: "person1",
    email:"person1@gmail.com",
   age:20
   },
   {
      id : 11,
      name: "person2",
      email:"person2@gmail.com",
      age:30
    },
    {
        id : 111,
        name: "person3",
        email:"person3@gmail.com",
        age:40
    },
    {
          id : 1111,
          name: "person4",
          email:"person4@gmail.com",
          age:50
    },
    {
           id : 11111,
          name: "person5",
          email:"person5@gmail.com",
          age:60
    },
    {
            id : 111111,
            name: "person6",
            email:"person6@gmail.com",
            age:70
    },
    {
      id : 1111111,
      name: "person7",
      email:"person7@gmail.com",
      age:80
    },
    {
      id : 11111111,
      name: "person8",
      email:"person8@gmail.com",
      age:90
    },
    {
      id : 111111111,
      name: "person9",
      email:"person9@gmail.com",
      age:100
    },
    {
      id : 1111111111,
      name: "person10",
      email:"person10@gmail.com",
      age:101
    }
  ];

  @Injectable()
  export class UserService {
    [x: string]: any;



  getUser(): any{
    return usersList;
  }

  addUser(newUser: any): string{
    usersList.push(newUser)
    return "added user sucessfully ";
  }

  updateUser(updatedUser: any): string{
    const userIdx = usersList.findIndex(user => user.id === updatedUser.id);
    if (userIdx !== -1){
      usersList[userIdx] = { ...usersList[userIdx], ...updatedUser };
      return "User updated successfully!";
    } else {
      return "User not found!";
    }

  }

  deleteUser(userId: number): string {
    const userIndex = usersList.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      usersList.splice(userIndex, 1);
      return "User deleted successfully!";
    } else {
      return "User not found!";
    }
  }
}
