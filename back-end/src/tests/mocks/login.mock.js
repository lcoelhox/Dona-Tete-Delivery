const invalidsBody = [
  {
    body: { password: "123456" },
    message: "\"email\" is required"
  },
  {
    body: { email: "adm@deliveryapp.com" },
    message: "\"password\" is required"
  },
]

const validBody = {
  email: "adm@deliveryapp.com",
  password: "--adm2@21!!--",
}

const wrongEmailBody = {
  email: "wrogn@email.com",
  password: "--adm2@21!!--",
}

const wrongPasswordBody = {
  email: "adm@deliveryapp.com",
  password: "wrongPassword",
}

const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGVsaXZlcnkgQXBwIEFkbWluIiwiZW1haWwiOiJhZG1AZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE2Nzc2MDA2Nzh9.w1Ylzat6MahldJmXXpjwsrHNS3SJU6y_LL5jrBf-pJI"

const loginOutput = {
  email: "adm@deliveryapp.com",
  name: "Delivery App Admin",
  role: "administrator",
  token: validToken,
}

const hashPassword = 'a4c86edecc5aee06eff8fdeda69e0d04';

module.exports = { 
  invalidsBody,
  validBody,
  wrongEmailBody,
  wrongPasswordBody,
  loginOutput,
  hashPassword,
  validToken,
};