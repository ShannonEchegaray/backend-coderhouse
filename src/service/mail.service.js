import { sendEmailProductsPurchased } from "../config/nodemailer.js";

class MailService {
  async purchaseItem(user, order) {
    try {
      const result = await sendEmailProductsPurchased(user, order);
      console.log(result);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new MailService();
