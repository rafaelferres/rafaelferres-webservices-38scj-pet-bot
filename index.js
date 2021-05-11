const axios = require('axios')
const express = require('express')

const loopInsertBpm = async () => {
    const user = {
        "email": "teste@teste.com.br",
        "password": "abc123"
    }

    const loginResponse = await axios({
        method: 'post',
        url: 'https://webservices-pets-api.herokuapp.com/api/v1/user/login',
        data: user
      });

    const token = loginResponse.data.token

    const getPetsResponse = await axios({
        method: 'get',
        url: 'https://webservices-pets-api.herokuapp.com/api/v1/pets',
        headers: { Authorization: `Bearer ${token}` }
      }); 

    const pet = getPetsResponse.data[0].id
    const addBpm = await axios({
        method: 'post',
        url: 'https://webservices-pets-api.herokuapp.com/api/v1/bpm',
        headers: { Authorization: `Bearer ${token}` },
        data: {
            "pet": pet,
            "bpm": Math.random()
        }
      }); 

      const getBpm = await axios({
        method: 'get',
        url: 'https://webservices-pets-api.herokuapp.com/api/v1/bpm',
        headers: { Authorization: `Bearer ${token}` },
        data: {
            "pet": pet
        }
      }); 

      console.log(getBpm.data)
}

const loopInsertBpmApi = async (req, res) => {
  const user = {
      "email": "teste@teste.com.br",
      "password": "abc123"
  }

  const loginResponse = await axios({
      method: 'post',
      url: 'https://webservices-pets-api.herokuapp.com/api/v1/user/login',
      data: user
    });

  const token = loginResponse.data.token

  const getPetsResponse = await axios({
      method: 'get',
      url: 'https://webservices-pets-api.herokuapp.com/api/v1/pets',
      headers: { Authorization: `Bearer ${token}` }
    }); 

  const pet = getPetsResponse.data[0].id
  const addBpm = await axios({
      method: 'post',
      url: 'https://webservices-pets-api.herokuapp.com/api/v1/bpm',
      headers: { Authorization: `Bearer ${token}` },
      data: {
          "pet": pet,
          "bpm": req.body.bpm
      }
    }); 

    const getBpm = await axios({
      method: 'get',
      url: 'https://webservices-pets-api.herokuapp.com/api/v1/bpm',
      headers: { Authorization: `Bearer ${token}` },
      data: {
          "pet": pet
      }
    }); 

    res.json(getBpm.data)
}

const app = express()
app.use(express.json())

app.post('/addBpm', (req, res) => loopInsertBpmApi(req, res))

app.listen(process.env.PORT || 8080)

setInterval(() => { loopInsertBpm() },1000)
