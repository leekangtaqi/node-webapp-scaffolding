export default class UserService {
  context: any = {}

  constructor(context: any){
    this.context = context;
  }

  async findUsers(){
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {id: 1, name: 'henry', password: 123},
          {id: 2, name: 'lily', password: 123},
          {id: 3, name: 'rick', password: 123},
        ])
      }, 100)
    })
  }
}