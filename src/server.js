if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  const express = require('express')
  const GNRequest = require('./api/gerencianet')
  const app = express()

  app.set('view engine', 'ejs')
  app.set('views', 'src/views')

  const reqGNAlready = GNRequest()

  app.get('/', async (req, res) => {
    const reqGN = await reqGNAlready
     const dataCob = {
       calendario: {
         expiracao: 3600
       },
       valor: {
         original: '10.00'
       },
       chave: '5281d8850ae8dd100a64d5e7f45c07ff',
       solicitacaoPagador: 'Cobrança dos serviços prestados.'
     }
  
    const cobResponse = await reqGN.post('/v2/cob', dataCob)
    const qrcodeResponse = await reqGN.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`)
    //res.send(qrcodeResponse.data)
    res.render('qrcode', { qrcodeImage: qrcodeResponse.data.imagemQrcode})
  })

  app.listen(8000, () => {
    console.log('run')
  })

  /*
  axios({
    method: 'POST',
    url: `${process.env.GN_ENDPOINT}/oauth/token`,
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-type': 'application/json'
    },
    httpsAgent: agent,
    data: {
      grant_type: 'client_credentials'
    }
  }).then((response) => console.log(response.data))
  
*/

  
 
  