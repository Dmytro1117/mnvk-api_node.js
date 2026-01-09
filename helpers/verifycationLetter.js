const { BASE_URL } = process.env;

const verifycationLetter = ({ email, verificationToken }) => ({
  to: email,
  subject: "Підтвердження пошти",
  html: `
<!DOCTYPE html>
<html>
  <head>
    <style>
      .btn:hover { background-color:rgb(8, 19, 29) !important; }
    </style>
  </head>
  <body style="margin:0; padding:0; background-color: #f4f4f4; background-image: url('https://res.cloudinary.com/dpvqbbgkd/image/upload/v1767947733/MMNVK/favicon_gdmzsk.png'); background-repeat: space; background-position: center; background-size: 250px; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center" style="padding: 40px 10px;">

          <!-- Основна картка -->
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 6px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); overflow: hidden;">

            <!-- Шапка -->
            <tr>
              <td align="center" bgcolor="#3a97e8" style="padding: 20px;">
                <h1 style="color: #ffffff; font-size: 22px; margin: 0; letter-spacing: 1px;">MMNVK</h1>
              </td>
            </tr>

            <tr>
              <td style="padding: 40px; text-align: center;">
                <h2 style="font-size: 20px; color: #333; margin-bottom: 15px;">Підтвердження пошти</h2>
                <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 30px;">
                  Дякуємо за реєстрацію! Щоб почати користуватися навчальними матеріалами, підтвердіть, будь ласка, свій email.
                </p>

                <!-- Кнопка з ховером -->
                <table border="0" cellspacing="0" cellpadding="0" align="center">
                  <tr>
                    <td align="center" bgcolor="#3a97e8" style="border-radius: 6px;">
                      <a href="${BASE_URL}/verify-email/${verificationToken}"
                         target="_blank"
                         class="btn"
                         style="
                          font-size: 17px;
                          font-weight: bold;
                          color: #ffffff;
                          text-decoration: none;
                          display: inline-block;
                          padding: 18px 45px;
                          border-radius: 6px;
                          border: 1px solid #3a97e8;
                          transition: all 0.3s ease;
                          ">
                         Підтвердити пошту
                      </a>
                    </td>
                  </tr>

                <p style="margin-top: 30px; font-size: 12px; color: #999;">
                  Якщо ви не реєструвалися у нас, просто видаліть цей лист.
                </p>
              </td>
            </tr>

            <!-- Футер -->
            <tr>
              <td align="center" style="padding: 15px; background-color: #f9f9f9; border-top: 1px solid #eeeeee;">
                <p style="font-size: 11px; color: #bbb; margin: 0;">
                  © 2026 MMNVK App. Всі права захищені.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `,
});

module.exports = { verifycationLetter };
