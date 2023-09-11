export default class User {
  constructor(public firstName: string, public lastName: string, public id: number, public createdAt: Date) {}

  asJSON() : {
    first_name: string,
    last_name: string,
    id: number,
    created_at: Date
  } {
    return {
      first_name: this.firstName,
      last_name: this.lastName,
      id: this.id,
      created_at: this.createdAt
    };
  }
}