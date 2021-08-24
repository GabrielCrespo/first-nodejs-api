import { json, request, response, Router } from "express";
import knex from "../database/connection";
import multer from "multer";
import { celebrate, Joi } from "celebrate";
import multerConfig from "../config/multer";

const locationsRouter = Router();

const upload = multer(multerConfig);

locationsRouter.get("/:id", async (request, response) => {
  const { id } = request.params;

  const location = await knex("locations").where("id", id).first();

  if (!location) {
    return response.status(400).json({
      message: "location not found!",
    });
  }

  const items = await knex("items")
    .join("location_items", "items.id", "=", "location_items.item_id")
    .where("location_items.location_id", id)
    .select("items.title");

  return response.json({ location, items });
});

locationsRouter.get("/", async (request, response) => {
  const { city, uf, items } = request.query;

  let locations = <any>[];

  if (city && uf && items) {
    const parsedItems: Number[] = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    locations = await knex("locations")
      .join("location_items", "locations.id", "=", "location_items.location_id")
      .whereIn("location_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("locations.*");
  } else {
    locations = await knex("locations").select("*");
  }

  return response.json(locations);
});

locationsRouter.post(
  "/",
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  async (request, response) => {
    const { name, email, whatsapp, latitude, longitude, city, uf, items } =
      request.body;

    const location = {
      image: "fake-image.jpg",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const transaction = await knex.transaction();

    const newId = await transaction("locations").insert(location);
    const location_id = newId[0];

    const locationItems = items.map(async (item_id: number) => {
      const selectedItem = await transaction("items")
        .where("id", item_id)
        .first();
      if (!selectedItem) {
        return response.status(400).json({
          message: `Item ${item_id} not found`,
        });
      }

      return {
        item_id,
        location_id,
      };
    });

    await transaction("location_items").insert(locationItems);

    transaction.commit();

    return response.json({
      location_id,
      ...location,
    });
  }
);

locationsRouter.put(
  "/:id",
  upload.single("image"),
  async (request, response) => {
    const { id } = request.params;

    const image = request.file?.filename;

    const location = await knex("locations").where("id", id).first();

    if (!location) {
      response.status(400).json({
        message: "Location not found!",
      });
    }

    const locationUpdated = {
      ...location,
      image,
    };

    await knex("locations").update(locationUpdated).where("id", id);

    return response.json(locationUpdated);
  }
);

export default locationsRouter;
