const axios = require('axios')

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

setInterval(() => { loopInsertBpm() },1000)
