import { sendEmailProductsPurchased } from "../config/nodemailer.js";

class MailService {
  async purchaseItem(user, order) {
    try {
      await sendEmailProductsPurchased(user, order);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new MailService();
