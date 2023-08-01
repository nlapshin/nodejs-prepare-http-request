// setup.js
// Прогрев тестов.

// beforeAll, beforeEach
// afterAll, afterEach

// let token = null;

// // Записывать в файл.

// async function getUserToken() {
//   if (token) {
//     return token;
//   }

//   token = await fetch("endpoint", {});

//   return token;
// }

// getUserToken() // 1 запуск - как порядочный сходит и получит данные
// getUserToken() // следующие запуски - будет получать из кэша

// let countBeforeEachGlobal = 0
// let countBeforeAllGlobal = 0
// let countAfterEachGlobal = 0
// let countAfterAllGlobal = 0

// let token = '';

// // Веб-магазин с авторизацией, в кредит, без кредита.

// // // Если мы хотим перем всеми тестами в файле что-то сделать один раз.
// // beforeAll(async () => {
// //   await db.connect();
// //   await db.insertData();

// //   token = await getToken();
// //   console.log('before all', ++countBeforeAllGlobal); // Сколько раз
// // });

// // // Если мы хотим перем КАЖДЫМ тестов в файле что-то сделать.
// // beforeEach(() => {
// //   console.log('before each', ++countBeforeEachGlobal); // Сколько раз
// // });

// // // Если мы хотим после КАЖДЫМ теста в файле что-то сделать.
// // afterEach(() => {
// //   console.log('after each', ++countAfterEachGlobal); // Сколько раз
// // });

// // // Если мы хотим после КАЖДЫМ теста в файле что-то сделать.
// // afterAll(async () => {
// //   await db.disconnect();
// //   console.log('after all', ++countAfterAllGlobal); // Сколько раз
// // });

// describe("Something 1", () => {
//   // Если мы хотим перем КАЖДЫМ тестов в файле что-то сделать.
//   beforeEach(() => {
//     console.log('before each', ++countBeforeEachGlobal); // Сколько раз
//   });

//   it("test 1", () => {
//     // arrange
//     // Подготовка

//     // act
//     // Действие

//     // assert
//     // Проверка
//     console.log('test 1');
//   });

//   it("test 2", () => {
//     console.log('test 2');
//   });

//   it("test 3", () => {
//     console.log('test 3');
//   });

//   afterAll(async () => {
//     console.log('after all', ++countAfterAllGlobal); // Сколько раз
//   });
// });

// describe("Something 2", () => {
//   it("test 4", () => {

//   });

//   it("test 5", () => {

//   });

//   it("test 6", () => {

//   });
// });



// Создавать функцию для каждого эндпоинта или типа запроса.

// function getJSON() {
  
// }


// function postJSON() {
  
// }

// const userCtrl = {
//   create() {
//     return this.request(url, 'POST');
//   }

//   update() {
//     return this.request(url, 'PUT');
//   }

//   // Передавать объект
//   methodWithDynArguments(...params) {
//     // params - это будет массив аргументов
//   }

//   // request(url = string, method) {
//   //   return await fetch(url, {
//   //     method
//   //   });
//   // }
// // }

// function methodWithDyn(...params) {
//   console.log(params);
// }

// methodWithDyn(1);
// methodWithDyn(100, 200, 300);


// 1. Создавали конфиг.
// 2. Создавали контроллер
// 3.

// {
//   userName: "nik12345",
//   password: "Q*ZGTMt6Us+j@N9j!",
// } // Один и тот же набор данных.

// faker


// import supertest from "supertest";
// import { faker } from "@faker-js/faker";

// const newUser = {
//   userName: `${faker.name.firstName()}`,
//   password: `${faker.internet.password(10, false, /[A-Z]/, '#1x')}`
// };

// Наши данные не хардкод, а рандом.

// console.log(newUser);

// Кто какие паттерны программирования знает?

// function buildUser() {
//   return {
//     userName: `${faker.name.firstName()}`,
//     password: `${faker.internet.password(10, false, /[A-Z]/, '#1x')}`
//   }
// }

// describe("Bookstore", () => {
//   describe('POST /account/v1/user', () => {
//     it("Should create new user", async () => {
//       const user1 = buildUser()

//       const response = await supertest('https://bookstore.demoqa.com')
//         .post('/account/v1/user')
//         .set('Accept', 'application/json')
//         .send(user1);

//       expect(response.status).toEqual(201);
//     });
//   });

//   describe('POST /account/v1/GenerateToken', () => {
//     it("Should generate token for user by username and password", async () => {
//       const user2 = buildUser()

//       const response = await supertest('https://bookstore.demoqa.com')
//         .post('/account/v1/GenerateToken')
//         .set('Accept', 'application/json')
//         .send(user2);

//       expect(response.status).toEqual(200);
//     });
//   });
// });

















































// Как вы проверяете что данные корректны?

// expect(data).toEqual({
//   success: true, 
//   id: '100', // рандомная строка
//   createdAt: new Date()
// });

// Тестирование снапшотами
// Мы запускаем тест и получаем какой-то идеальный ответ

  // expect(response.body).toMatchSnapshot({
  //   token: expect.any(String),
  //   expires: expect.any(String),
  // });

  // JSON Schema

const car = {
  model: 'BMW',
  color: 'black',
  year: 2000,
  price: 100500, // в долларах или центах
  currency: 'USD',
  settings: {
    gearBox: 'manual',
    climate: true
  }
};

// 1. Какие поля объязательные
// model, color, year, settings.gearBox, settings.climate - опциональное

// 2. Типы
// year: 2000, "2000"

// 3. Ограничения
// model - BMW, year - min, max, integer или float, minLength


// const JSONSchema = {
//   "title": "Product",
//   "description": "A product from Acme's catalog",
//   "type": "object",
//   "required": [ "model", "price" ],
//   "properties": {
//     "model": {
//       "description": "The unique identifier for a product",
//       "type": "string",
//       "enum": [ 'BMW', 'Audi' ]
//     },
//     "price": {
//       "description": "The price of the product",
//       "type": "number",
//       "exclusiveMinimum": 0
//     },
//     // "productName": {
//     //   "description": "Name of the product",
//     //   "type": "string"
//     // },
//     // "tags": {
//     //   "description": "Tags for the product",
//     //   "type": "array",
//     //   "items": {
//     //     "type": "string"
//     //   },
//     //   "minItems": 1,
//     //   "uniqueItems": true
//     // }
//   }
// }




import supertest from "supertest";
import Ajv from 'ajv'
import addFormats from "ajv-formats"
import { matchers } from 'jest-json-schema';
expect.extend(matchers);

const ajv = new Ajv()
addFormats(ajv)

describe("Bookstore", () => {
  // describe('POST /account/v1/user', () => {
  //   it("Should create new user", async () => {
  //     const response = await supertest('https://bookstore.demoqa.com')
  //       .post('/account/v1/user')
  //       .set('Accept', 'application/json')
  //       .send({
  //         userName: "nik12345",
  //         password: "Q*ZGTMt6Us+j@N9j!",
  //       });

  //     expect(response.status).toEqual(201);
  //   });
  // });

  describe('POST /account/v1/GenerateToken', () => {
    it("Should generate token for user by username and password", async () => {
      const schema = {
        type: "object",
        properties: {
          token: {type: "string"},
          expires: {type: "string", format: 'date-time'},
          status: {type: "string"},
          result: {type: "string"}
        },
        required: ["token", "expires", "status", "result"],
        additionalProperties: false
      };

      const response = await supertest('https://bookstore.demoqa.com')
        .post('/account/v1/GenerateToken')
        .set('Accept', 'application/json')
        .send({
          userName: "nik12345",
          password: "Q*ZGTMt6Us+j@N9j!",
        });
        
        // const valid = ajv.validate(schema, response.body)
        // if (!valid) console.log(ajv.errors)

      expect(response.status).toEqual(200);
      expect(response.body).toMatchSchema(schema)

      expect(response.body).toMatchSnapshot({
        token: expect.any(String),
        expires: expect.any(String),
      });
    });
  });
});

// Познакомились с фейкером
// Познакомились как правильно валидировать запросы.
// 1. Проверял статус
// 2. Проверяем схему данных.
// 3. Проверяеть данные, можно matchSnapshot



function buildUser() {
  return {
    userName: `${faker.name.firstName()}`,
    password: `${faker.internet.password(10, false, /[A-Z]/, '#1x')}`
  }
}

function buildAdmin() {
  return {
    ...buildUser(),
    role: 'admin'
  }
}

const user1 = buildUser();

user1.username = 'user';

const user2 = {
  ...buildUser(),
  username: 'user'
}

// Объединение объектов
// Объект A и 





































// import supertest from "supertest";

// describe("Bookstore", () => {
//   describe('POST /account/v1/user', () => {
//     it("Should create new user", async () => {
//       const response = await supertest('https://bookstore.demoqa.com')
//         .post('/account/v1/user')
//         .set('Accept', 'application/json')
//         .send({
//           userName: "nik12345",
//           password: "Q*ZGTMt6Us+j@N9j!",
//         });

//       console.log(response.body)

//       expect(response.status).toEqual(201);

//       const resGenerateToken = await supertest('https://bookstore.demoqa.com')
//         .post('/account/v1/GenerateToken')
//         .set('Accept', 'application/json')
//         .send({
//           userName: "nik12345",
//           password: "Q*ZGTMt6Us+j@N9j!",
//         });

//       console.log(resGenerateToken.body)

//       // const resLogin = await supertest('https://bookstore.demoqa.com')
//       //   .post('/account/v1/Login')
//       //   .set('Accept', 'application/json')
//       //   .send({
//       //     userName: "nik12345",
//       //     password: "Q*ZGTMt6Us+j@N9j!",
//       //   });

//       // console.log(resLogin.body)

//       // const resDelete = await supertest('https://bookstore.demoqa.com')
//       //   .delete(`/account/v1/user/${resLogin.body.userId}`)
//       //   .set('Authorization', `Bearer ${resLogin.body.token}`);

//       const resDelete = await supertest('https://bookstore.demoqa.com')
//         .delete(`/account/v1/user/${response.body.userID}`)
//         .set('Authorization', `Bearer ${resGenerateToken.body.token}`);

//       console.log(resDelete.body)
//     });
//   });

  // describe('POST /account/v1/user', () => {
  //   it("Should create new user", async () => {
  //     const response = await supertest('https://bookstore.demoqa.com')
  //       .post('/account/v1/user')
  //       .set('Accept', 'application/json')
  //       .send({
  //         userName: "myname",
  //         password: "Q*ZGTMt6Us+j@N9j!",
  //       });

  //     console.log(response)

  //     expect(response.status).toEqual(201);
  //   });
  // });
// });
