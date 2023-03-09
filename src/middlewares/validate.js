import { BadRequest } from "../utils/error.js";

export const validateProperties = (schema) => {
  for (const property in schema) {
    if (!schema?.[property]?.type) {
      throw new Error("No se especifico el tipo de la propiedad");
    }
  }

  return (req, _, next) => {
    try {
      console.log(req.body);
      for (const property in req.body) {
        console.log(property);
        if (!schema.hasOwnProperty(property)) {
          if (
            typeof schema[property]?.required === "boolean" &&
            schema[property].required
          )
            continue;
          throw new BadRequest(
            `La siguiente propiedad: ${property} no existe.`
          );
        }
        if (typeof req.body[property] !== schema[property].type) {
          throw new BadRequest(
            `La siguiente propiedad: ${property} no cumple el tipo especificado: ${schema[property].type}`
          );
        }
      }
      next();
    } catch (error) {
      return next(error);
    }
  };
};

export const validateUserProperties = () => {
  return validateProperties({
    name: { type: "string", required: true },
    lastname: { type: "string", required: true },
    password: { type: "string", required: true },
    email: { type: "string", required: true },
    nickname: { type: "string", required: true },
    phone_number: { type: "string" },
    profile_image: { type: "string" },
    address: { type: "string", required: true },
  });
};

export const validateUserCreateProperties = () => {
  return validateProperties({
    name: { type: "string", required: true },
    lastname: { type: "string", required: true },
    password: { type: "string", required: true },
    email: { type: "string", required: true },
    role: { type: "string" },
    nickname: { type: "string", required: true },
    phone_number: { type: "string" },
    profile_image: { type: "string" },
    address: { type: "string", required: true },
  });
};
