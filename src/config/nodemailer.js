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

const promiseSendMail = (subject, message) =>
  new Promise((res, rej) => {
    transport.sendMail(
      {
        from: process.env.EMAIL,
        to: process.env.EMAIL_ADMIN,
        subject: subject,
        html: message,
      },
      (error, info) => {
        if (error) return rej(error);
        res(info);
      }
    );
  });

export const sendEmailProductsPurchased = async (user, { items, id }) => {
  const productsMessage = `
  <p>Buenas!, has comprado los siguientes productos</p>
  ${items
    .map(
      (product) => `
  <p>${product.name}</p>
  <p>${product.quantity}</p>
  <p>${product.price}</p>
  <p>${product.finalPrice}</p>
  `
    )
    .join("\n\n")}`;

  return await promiseSendMail("Han creado la orden " + id, productsMessage);
};
