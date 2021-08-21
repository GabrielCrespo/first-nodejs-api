import { Router } from "express";
import knex from "../database/connection";

const locationsRouter = Router();

locationsRouter.post('/', async (request, response) => {

 const { 
  name,
  email,
  whatsapp,
  latitude,
  longitude,
  city,
  uf,
  items
 } = request.body;


 const location = { 
  image: "fake-image.jpg",
  name,
  email,
  whatsapp,
  latitude,
  longitude,
  city,
  uf,
 }

 const newId =  await knex('locations').insert(location);
 const location_id = newId[0]

 const locationItems = items.map((item_id: number) => {
  return {
   item_id,
   location_id,
  }
 })

 await knex('location_items').insert(locationItems);

 return response.json({ 
  id: location_id,
  ... location,
 });
})

export default locationsRouter;