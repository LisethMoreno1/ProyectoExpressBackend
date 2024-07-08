import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const url = `http://localhost:3000/api/auth/verify-email/${token}`;
  await transporter.sendMail({
    from: `"No Reply" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Verifica tu correo electrónico',
    text: `Por favor, verifica tu correo electrónico haciendo clic en el siguiente enlace: ${url}`,
    html: `<p>Por favor, verifica tu correo electrónico haciendo clic en el siguiente enlace:</p><p><a href="${url}">${url}</a></p>`
  });
};
