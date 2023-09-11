import { describe, expect, test } from '@jest/globals';
import supertest from "supertest";
import app from "../src/main"
import FetchAllUsers from '../src/domains/users/operations/fetchAllUsers';

const request = supertest(app)

describe('creating a new user', () => {
  test('it creates and returns serialized user', async() => {
    const res = await request.post('/users')
      .send({
        first_name: "John",
        last_name: "Snow"
      })

    expect(res.status).toBe(200);
    expect(Object.keys(res.body)).toEqual(['first_name', 'last_name', 'id', 'created_at'])
    expect(res.body.first_name).toBe("John")
    expect(res.body.last_name).toBe("Snow")
    expect(res.body.id).not.toBe(null)
    expect(new Date(res.body.created_at)).toBeInstanceOf(Date)
  });
});


describe('reading users from db', () => {
  test('it fetches and serializes users from db', async() => {
    const res = await request.get('/users?created=asc')

    const fetchAllUsers = new FetchAllUsers();
    const serializedUsers = await fetchAllUsers.fetch().then(
      users => {
        // @ts-ignore
        return users.map(inst => inst.asJSON())
      }
    )

    expect(res.status).toBe(200);
    expect(res.body).toEqual(serializedUsers)
  });
});
