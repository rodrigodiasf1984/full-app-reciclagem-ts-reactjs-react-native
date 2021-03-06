import expresss from 'express';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import multer from 'multer';
import multerConfig from './config/multer';
import {celebrate, Joi} from 'celebrate';
const routes = expresss.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.get('/points/:id', 
celebrate({
  params: Joi.object().keys({
    id:Joi.number().integer().required()
  })
},{
  abortEarly:false
}),
pointsController.show);

routes.get('/points', pointsController.index);

routes.post(
  '/points',
   upload.single('image'),
   celebrate({
    body: Joi.object().keys({
      name:Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp:Joi.number().required(),
      latitude:Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf:Joi.string().max(2),
      items:Joi.string().required(),

    })
   },{
     abortEarly: false
   }),
  pointsController.create);
export default routes;