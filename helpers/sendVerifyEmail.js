const Brevo = require("@getbrevo/brevo");

const { API_KEY_BREVO } = process.env;

const apiInstance = new Brevo.TransactionalEmailsApi();

const apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = API_KEY_BREVO;

const sendVerifyEmail = async (data) => {
  const sendSmtpEmail = new Brevo.SendSmtpEmail();

  sendSmtpEmail.subject = data.subject;
  sendSmtpEmail.htmlContent = data.html;
  sendSmtpEmail.sender = {
    name: "MMNVK",
    email: "moiseenkodmitriy1177@gmail.com",
  };
  sendSmtpEmail.to = [{ email: data.to }];

  try {
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully via Brevo API");
    return result;
  } catch (error) {
    console.error("BREVO API ERROR:", error.response?.body || error.message);
    throw error;
  }
};

module.exports = { sendVerifyEmail };
