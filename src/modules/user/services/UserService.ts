import { IApplicationContext } from '../../../framework/app/context'
import { Service } from '../../../framework/app/Decorators'

export interface IUserService {
  find: Function,
  create: Function,
  update: Function
}

@Service()
export default class UserService implements IUserService{
  context: IApplicationContext = null

  constructor(context: IApplicationContext){
    this.context = context;
  }

  async create(userMeta: any){
    let User = this.context.models.UserModel
    let user = new User(userMeta)
    await user.save()
    return user
  }

  async update(userMeta: any){
    
  }

  async find(){
    let User = this.context.models.User
    return await User.find().exec()
  }
}