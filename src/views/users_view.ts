/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import User from '../models/usersModel'

export default {
  render(users: User) {
    return {
      id: users.id,
      name: users.name,
      email: users.email,
      password: users.password,
    }
  },
  renderMany(users: User[]) {
    return users.map((user) => this.render(user))
  },
}
