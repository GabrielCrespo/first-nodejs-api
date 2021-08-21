import { Router } from "express";
import knex from "../database/connection";

const itemsRouter = Router();

itemsRouter.get("/", async (request, response) => {
  const items = await knex("items").select("*");

  const serializedItem = items.map((item) => {
    {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://localhost:3334/uploads/${item.image}`,
      };
    }
  });

  return response.json(serializedItem);
});

export default itemsRouter;
