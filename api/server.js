const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const { json } = require('body-parser');

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(json());

let products = [
  {
    "id": 1,
    "categoryName": "ayakkabi",
    "name": "Nike Air VaporMax 2021 FK",
    "amount": 2000,
    "image": "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/6b7918cc-f111-42ae-862a-e37b8d3ead6b/air-vapormax-2021-fk-ayakkab%C4%B1s%C4%B1-DgPVmr.png"
  },
  {
    "id": 2,
    "categoryName": "parfum",
    "name": "Chanel Bleu De Chanel",
    "amount": 155,
    "image": "https://images.hepsiburada.net/assets/Kozmetik/ProductDesc/sgchnbluedee.jpg"
  },

  {
    "id": 3,
    "categoryName": "ayakkabi",
    "name": "Y-3 RUNNER 4D IOW",
    "amount": 4000,
    "image": "https://assets.adidas.com/images/w_600,f_auto,q_auto/8132519c40aa4a298697ac67011de21a_9366/Y-3_Runner_4D_IOW_Siyah_FZ4502_01_standard.jpg"
  },
  {
    "id": 4,
    "categoryName": "elbise",
    "name": "Vakko Elbise",
    "amount": 12000,
    "image": "https://vakko.akinoncdn.com/products/2021/09/26/1220555/51f65ce4-2c4c-4e6e-8921-40943ab2ba54_size470x940_quality100.jpg"
  },
  {
    "id": 5,
    "categoryName": "ayakkabi",
    "name": "kırmızı inci bot",
    "amount": 320,
    "image": "https://www.miogusto.com.tr/Uploads/UrunResimleri/clara-kirmizi-rugan-topuklu-ayakkabi-kis-63cc.jpg"
  },
  {
    "id": 6,
    "categoryName": "elbise",
    "name": "RETRO MARTINGALE DRESS",
    "amount": 1000,
    "image": "https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-retro-martingale-dress-ready-to-wear--FMDR51HZM587_PM2_Front%20view.png?wid=1080&hei=1080"
  },
  {
    "id": 7,
    "categoryName": "elbise",
    "name": "Siyah Elbise",
    "amount": 500,
    "image": "https://stn-nocturne.mncdn.com/Content/media/ProductImg/original/n21k-2303-0002-askili-deri-elbise-637369881023710420.jpg"
  },
  {
    "id": 8,
    "categoryName": "parfum",
    "name": "Nicolai",
    "amount": 7000,
    "image": "https://cdn.beymen.com/mnresize/1540/2146/productimages/1ll05oxy.vjr_IMG_01_3581000015906.jpg"
  }
]
const categories = [
  {
    "categoryId": 1,
    "name": "ayakkabi"
  },
  {
    "categoryId": 2,
    "name": "elbise"
  },
  {
    "categoryId": 3,
    "name": "parfum"
  }];

const users = [
  {
    "email": 'a@a.com',
    "password": '123456',
    "token": "jwt-tokeim",
    "name": "salih",
    
  }
]

app.get('/products', (req, res) => res.send(products));

app.get('/categories', (req, res) => res.send(categories));

app.post('/users/login', (req, res) => {
  const user = { email: req.body.email, password: req.body.password, token: req.body.token };
  users.push(user);
  return res.send(user);
});

//username password alan  post methodunda  bir servis yaratılır.
//

const PORT = 7001;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));