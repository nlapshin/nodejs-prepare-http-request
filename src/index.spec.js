import supertest from "supertest";
import { faker } from '@faker-js/faker';
import Ajv from "ajv";
import ajvFormats from "ajv-formats";
import { matchers } from 'jest-json-schema';
expect.extend(matchers);

// Оптимизировать.
// Юзер и пароль в контроллер. Вынести слой тестовых данных в отдельную абстракцию
// Выделить baseUrl и общие вызовы. 
// В rest assured были бы единые specification, например, Header на Accept у нас одинаковый
// В rest assured были бы единые specification, например, Header на Accept у нас одинаковый
// Рандомизации входных данных.
// Не хватает проверки выходных данных.

// Входные данные рандомизировать. Выходные проверять максимально полно.

// Хардкод -> рандомным данным -> создали порождающую функцию(билдер)

// Функция которая создает объект
function buildUser() {
  return {
    userName: faker.internet.userName(),
    password: faker.internet.password(20, false, /[a-zA-Z0-9_$%#!@]/)
  }
}

class User {
  static make() {
    return {
      userName: faker.internet.userName(),
      password: faker.internet.password(20, false, /[a-zA-Z0-9_$%#!@]/, '_')
    }
  }

  static makeWithIncorrectPassword() {
    return {
      userName: faker.internet.userName(),
      password: faker.internet.password()
    }
  }
}

const userRequest = {
  async create(user = buildUser()) {
    return await supertest('https://bookstore.demoqa.com')
        .post('/account/v1/user')
        .set('Accept', 'application/json')
        .send(user);
  }
}

// переменные + функции.
// class - он позволяет объеденить перменные и функции по смыслу.

// JSON schema. Что это и какая целевая необходимость.

// JSON schema - для задания атрибутов и мета информации нашим объектам.

const ajv = new Ajv();
// ajvFormats(ajv);

// const user = {
//   username: 'Nik12345',
//   email: 'nik@email.com',
//   age: 33 // вместо числа строку. 
// };

// const userSchema = {
//   "type": "object",
//   "required": [
//     "username",
//     "email",
//     "age"
//   ],
//   "additionalProperties": false,
//   "properties": {
//     "username": {
//       "type": "string",
//       "minLength": 5,
//       "maxLength": 100
//     },
//     "email": {
//       "type": "string",
//       "format": "email" // Свою регулярное выражение, типа /[a-zA-Z0-9_$%#!@]/
//     },
//     "age": {
//       "type": "integer",
//       "minimum": 0,
//       "maximum": 1000
//     }
//   }
// }

// const validate = ajv.compile(userSchema);

// const result = validate(user);

// console.log(result, validate.errors);

// false [
//   {
//     instancePath: '/username',
//     schemaPath: '#/properties/username/minLength',
//     keyword: 'minLength',
//     params: { limit: 5 },
//     message: 'must NOT have fewer than 5 characters'
//   }
// ]


// 1. Все поля объязательные.
// 2. Username - должен быть строкой + иметь длинну больше 5 символов и меньше 100
// 3. Email - это email. Это специализированная строка.
// 4. Age - это число целочисленное. Больше 0 и меньше 1000.

describe("Bookstore", () => {
  describe('POST /account/v1/user', () => {
    it("Should create new user", async () => {
      const response = await userRequest.create();

      const createUserResponseSchema = {
        "type": "object",
        "required": [
          "userID",
          "username",
          "books"
        ],
        "additionalProperties": false,
        "properties": {
          "userID": {
            "type": "string"
          },
          "username": {
            "type": "string"
          },
          "books": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      }

      // const validate = ajv.compile(createUserResponseSchema);

      // if (!validate(response.body)) {
      //   console.log(validate.errors);
      // }

      expect(response.status).toEqual(201);
      expect(response.body).toMatchSchema(createUserResponseSchema);

      expect(response.body).toMatchSnapshot({
        userID: expect.any(String),
        username: expect.any(String),
      });
    });
  });

  describe('POST /account/v1/GenerateToken', () => {
    it("Should generate token for user by username and password", async () => {
      const user = User.make();

      const response = await supertest('https://bookstore.demoqa.com')
        .post('/account/v1/GenerateToken')
        .set('Accept', 'application/json')
        .send(user);

      expect(response.status).toEqual(200);
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
