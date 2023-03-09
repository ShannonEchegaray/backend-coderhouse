import { createTransport } from "nodemailer";
import { emailConfig } from "./config.js";

const transport = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: emailConfig.email,
    pass: emailConfig.password,
  },
});

export const sendEmailProductsPurchased = async (user, { items, id }) => {
  const productsMessage = `
  <p>Buenas!, se han comprado los siguientes productos</p>
  ${items
    .map(
      (product) => `
  <p>Nombre: ${product.name}</p>
  <p>Cantidad: ${product.quantity}</p>
  <p>Precio: ${product.price}</p>
  <p>Precio Final: ${product.finalPrice}</p>
  `
    )
    .join("\n\n")}
    <p>El precio final es de ${items.reduce(
      (summary, producto) => summary + producto.finalPrice,
      0
    )}</p>`;

  const data = await transport.sendMail({
    from: "Pepe la almeja",
    to: process.env.EMAIL_ADMIN,
    subject: user.email + " ha creado la orden " + id,
    html: productsMessage,
  });

  console.log(data);
};
