export default {
  buildUser() {
    return { username: 'test', password: 'test' }
  },

  buildWrong() {
    
  }
}





















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
