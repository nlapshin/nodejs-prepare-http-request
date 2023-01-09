import { faker } from '@faker-js/faker';

export function generateUser(opts) {
  return {
    userName: faker.internet.userName(),
    password: opts?.password ?? faker.internet.password(32, false, /[a-zA-Z0-9!@#$%^&*]/),
  }
}


// utils - полезные функции
// fixtures - наборы данных
