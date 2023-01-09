import supertest from "supertest";

// Что вам нравится и что вам не нравится здесь в этих тестах.
// Максимальное количество ошибок и недочетов.
// 1. Нет проверки на текст ошибки
// 2. не нравится describe) кажется что не информативно
// 3. Нет контроллеров.
// 4. Логин и пароль прям в тесте
// 5. Все в конфиг можно вынести(url, login, password)
// 6. Слабые expect-ы(ничего толком не проверяют)
// 7. Будет ошибка при многократном запуске. Flaky test.
// 8. 

// 1. Вынести в конфиг URL сервера. Я бы задал его как переменную окружения.
// 2. Входные данные захардкодили.

// import 
import { faker } from '@faker-js/faker';
import { matchers } from 'jest-json-schema';
expect.extend(matchers);
import config from'./config'
import { generateUser } from './utils/generate-user'

// 6.6.6 

// 1. Длинна пароля
// 2. Допустимые значения
// 3.

// console.log('password', faker.internet.password())

// generateUser используется везде
// 1. Передать неверный пароль в функцию, как аргумент или часть объекта
// 2. Сделать наш объект расширяемым

// const user = {
//   ...generateUser(), // object.assign через spread-оператор(это ...)
//   password: faker.internet.password(6, false, /[a-zA-Z0-9!@#$%^&*]/)
// }

// Object.assign - это метод, который позволяет объеденить два объекта
// const user = Object.assign(
//   generateUser(),
//   {
//     password: faker.internet.password(6, false, /[a-zA-Z0-9!@#$%^&*]/)
//   }
// )

// const testObject = Object.assign(
//   { a: '1', b: '2' },
//   { c: '3' }
// )

// console.log(testObject) // { a: '1', b: '2', c: '3' }

// const testObject2 = Object.assign(
//   { a: '1', b: '2' },
//   { b: '3' }
// )

// console.log(testObject) // { a: '1', b: '3' }

// console.log('user', user)

// // generateUser({
//   password: faker.internet.password(5, false, /[a-zA-Z0-9!@#$%^&*]/)
// }

// Паттерны проектирования
// Порождающие паттерны
// - Фабрика
// - Строитель


// Наша функция создает объект юзер
// function createUser() {
//   const user = {
//     data: {
//       userName: faker.internet.userName(),
//       password: faker.internet.password(32, false, /[a-zA-Z0-9!@#$%^&*]/),
//     },
//     getData: function () {
//       return user.data
//     }, // значение ключа getData присвоена функция
//     generateShortPassword() {
//       this.data.password = faker.internet.password(5, false, /[a-zA-Z0-9!@#$%^&*]/)
  
//       return this;
//     },
//     generateWrongPassword() {
//       user.data.password = faker.internet.password(32, false, /[a-zA-Z0-9]/)
  
//       return user;
//     }
//   }

//   return user;
// }

// Методы - это функции в составе объектов


// const user = createUser()

// console.log('user before', user.getData())

// user.generateShortPassword()

// console.log('user after', user.getData())


// Как создавать входные данные?
// 1. Хардкоду - нет
// 2. Рандомайзерам - да. Использовать @faker/faker-js
// 3. Создать отдельные директории куда складывать генераторы данных.
// 4. Если хотите применить паттерн, то используйте builder(строитель)

async function deleteUser(user, userId) {
  const resGenerateToken = await supertest(config.baseURL)
    .post('/account/v1/GenerateToken')
    .set('Accept', 'application/json')
    .send(user);


  await supertest(config.baseURL)
    .delete(`/account/v1/user/${userId}`)
    .set('Authorization', `Bearer ${resGenerateToken.body.token}`);
}

describe("Bookstore", () => {
  describe('POST /account/v1/user', () => {
    // it("Should create new user", async () => {
    //   const user = generateUser()

    //   const response = await supertest(config.baseURL)
    //     .post('/account/v1/user')
    //     .set('Accept', 'application/json')
    //     .send(user);

    //   // Что не так 
    //   // 1. Парсить полностью ответ от сервера.
    //   // 2. Сделать GET запрос что пользователь есть.
    //   expect(response.status).toEqual(201);
      
    //   // Как проверить данные от сервера
    //   // 1. Снапш

    //   await deleteUser(user, response.body.userID)

    //   // сlean data
    // });

    // it("Should not create new user", async () => {
    //   const response = await supertest(config.baseURL)
    //     .post('/account/v1/user')
    //     .set('Accept', 'application/json')
    //     .send({
    //       ...generateUser(),
    //       password: faker.internet.password(6, false, /[a-zA-Z0-9!@#$%^&*]/)
    //     }); // сделать пароль неверным

    //   expect(response.status).toEqual(201);
    // });
  });

  /* json schema
    {
      "title": "Product",
      "description": "A product from Acme's catalog",
      "type": "object",
      "properties": {
        "productId": {
          "description": "The unique identifier for a product",
          "type": "integer"
        },
        "productName": {
          "description": "Name of the product",
          "type": "string"
        }
      },
      "required": [ "productId", "productName" ]
    } ->

    {
      "productId": 1,
      "productName": "name"
    } // это валидный объект по схеме

    {
      "productId": 1
    } // это не валидный валидный объект по схеме

    {
      "productId": "1",
      "productName": "name"
    } // это не валидный валидный объект по схеме
  */

  describe('POST /account/v1/GenerateToken', () => {
    it("Should generate token for user by username and password", async () => {
      const user = generateUser()

      await supertest(config.baseURL)
        .post('/account/v1/user')
        .set('Accept', 'application/json')
        .send(user);

      const response = await supertest(config.baseURL)
        .post('/account/v1/GenerateToken')
        .set('Accept', 'application/json')
        .send(user);

      const schema = {
        type: "object",
        required: ["token", "expires", "status", "result"],
        additionalProperties: false,
        properties: {
          token: {type: "string"},
          expires: {type: "string", format: 'date-time'},
          status: {type: "string"},
          result: {type: "string"}
        }
      }

      // Проверяем статус
      expect(response.status).toEqual(200);

      // Проверяем валидность схемы
      expect(response.body).toMatchSchema(schema)

      // Если надо проверяем сами данные
      expect(response.body).toMatchSnapshot({
        expires: expect.any(String), // expires - это один из ключей в ответе от сервера 
        token: expect.any(String),
      })

      // Проверить себя через GET запрос

      // "2023-01-16T18:22:42.204Z" - это дата в виде строки. ISO Date with time

      // expect.any(String) - это любая строка
    });
  });
});



























































// import supertest from "supertest";
// import Ajv from 'ajv'
// import addFormats from "ajv-formats"
// import { matchers } from 'jest-json-schema';
// expect.extend(matchers);

// const ajv = new Ajv()
// addFormats(ajv)

// describe("Bookstore", () => {
//   // describe('POST /account/v1/user', () => {
//   //   it("Should create new user", async () => {
//   //     const response = await supertest('https://bookstore.demoqa.com')
//   //       .post('/account/v1/user')
//   //       .set('Accept', 'application/json')
//   //       .send({
//   //         userName: "nik12345",
//   //         password: "Q*ZGTMt6Us+j@N9j!",
//   //       });

//   //     expect(response.status).toEqual(201);
//   //   });
//   // });

//   describe('POST /account/v1/GenerateToken', () => {
//     it("Should generate token for user by username and password", async () => {
//       const response = await supertest('https://bookstore.demoqa.com')
//         .post('/account/v1/GenerateToken')
//         .set('Accept', 'application/json')
//         .send({
//           userName: "nik12345",
//           password: "Q*ZGTMt6Us+j@N9j!",
//         });

//         const schema = {
//           type: "object",
//           properties: {
//             token: {type: "string"},
//             expires: {type: "string", format: 'date-time'},
//             status: {type: "string"},
//             result: {type: "string"}
//           },
//           required: ["token", "expires", "status", "result"],
//           additionalProperties: false
//         }
        
//         const valid = ajv.validate(schema, response.body)
//         if (!valid) console.log(ajv.errors)

//         // {
//         //   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im5pazEyMzQ1IiwicGFzc3dvcmQiOiJRKlpHVE10NlVzK2pATjlqISIsImlhdCI6MTY3MzI3Nzc2Nn0.XXN_YZWIeg6kxZk2DRFMKDBY-gokE6V-iWRX_7b8d_4',
//         //   expires: '2023-01-16T15:22:46.390Z',
//         //   status: 'Success',
//         //   result: 'User authorized successfully.'
//         // }
    

//       console.log(response.body)

//       expect(response.status).toEqual(200);
//       expect(response.body).toMatchSchema(schema)

//       // expect(response.body).toMatchSnapshot({
//       //   token: expect.any(String),
//       //   expires: expect.any(String),
//       // });
//     });
//   });
// });









































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
