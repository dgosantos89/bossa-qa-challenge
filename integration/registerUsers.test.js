const request = require('supertest')('https://drj335kkci.execute-api.sa-east-1.amazonaws.com/dev/v1')
const faker = require('faker-br')

describe('Register Users', () => {
  it('with valid values succeeds', async () => {
    var email = faker.internet.email()
    const response = await request
      .post('/users')
      .send({
        fullName: 'Teste da Silva',
        password: '87654321',
        email: email,
        loginType: 'email'
    })

    expect(response.statusCode).toBe(200)
    expect(response.body.user.fullName).toBe('Teste da Silva')
    expect(response.body.user.email).toBe(email.toLowerCase())
    expect(response.body.token).not.toBeNull()
  })
  
  it('without fullname get 400 error', async () => {
    var email = faker.internet.email()
    const response = await request
      .post('/users')
      .send({
        password: '87654321',
        email: email,
        loginType: 'email'
    })

    expect(response.statusCode).toBe(400)
    expect(response.body.error.code).toBe('FULLNAME_REQUIRED')
    expect(response.body.error.message).toBe('"fullName" é obrigatório')
    expect(response.body.error.type).toBe('ApiError')
  })
  
  it('with duplicated email get 400 error', async () => {
    const response = await request
      .post('/users')
      .send({
        fullName: 'Teste da Silva',
        password: '87654321',
        email: 'teste@teste.com',
        loginType: 'email'
    })

    expect(response.statusCode).toBe(400)
    expect(response.body.error.code).toBe('EMAIL_REGISTERED')
    expect(response.body.error.message).toBe('E-mail já cadastrado')
    expect(response.body.error.type).toBe('ApiError')
  })

  it('with invalid email get 400 error', async () => {
    const response = await request
      .post('/users')
      .send({
        fullName: 'Teste da Silva',
        password: '87654321',
        email: 'email@invalido',
        loginType: 'email'
    })

    expect(response.statusCode).toBe(400)
    expect(response.body.error.code).toBe('INVALID_EMAIL')
    expect(response.body.error.message).toBe('O e-mail é inválido')
    expect(response.body.error.type).toBe('ApiError')
  })
  
  it('with just first name get 400 error - Possible BUG', async () => {
    var email = faker.internet.email()
    const response = await request
      .post('/users')
      .send({
        fullName: 'Teste',
        password: '87654321',
        email: email,
        loginType: 'email'
    })

    expect(response.statusCode).toBe(400)
    //Despite not being in the doc, I believe the fullName must be filled with the full name
  })
  
  it('with empty fullname get 400 error - Possible BUG', async () => {
    var email = faker.internet.email()
    const response = await request
      .post('/users')
      .send({
        fullName: ' ',
        password: '87654321',
        email: email,
        loginType: 'email'
    })

    expect(response.statusCode).toBe(400)
     //FullName is required, but the api doesn`t seem to be ready for this error
  })

  it('with empty password get 400 error - Possible BUG', async () => {
    var email = faker.internet.email()
    const response = await request
      .post('/users')
      .send({
        fullName: 'Teste da Silva',
        password: ' ',
        email: email,
        loginType: 'email'
    })

    expect(response.statusCode).toBe(400)
    //Password is required, but the api doesn`t seem to be ready for this error
  })

  it('without password get 400 error - Possible BUG', async () => {
    var email = faker.internet.email()
    const response = await request
      .post('/users')
      .send({
        fullName: 'Teste da Silva',
        email: email,
        loginType: 'email'
    })

    expect(response.statusCode).toBe(400)
    //Password is required, but the api doesn`t seem to be ready for this error
  })
  
  it('with a invalid loginType get 400 error - Possible BUG', async () => {
    var email = faker.internet.email()
    const response = await request
      .post('/users')
      .send({
        fullName: 'Teste da Silva',
        password: '87654321',
        email: email,
        loginType: 'INVALID'
    })

    expect(response.statusCode).toBe(400)
    //Invalid loginType could return an user error
  })

  it('without loginType get 400 error - Possible BUG', async () => {
    var email = faker.internet.email()
    const response = await request
      .post('/users')
      .send({
        fullName: 'Teste da Silva',
        password: '87654321',
        email: email,
    })

    expect(response.statusCode).toBe(400)
    //LoginType would be required
  })
})

