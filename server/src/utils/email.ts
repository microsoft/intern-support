import { Resend } from "resend";
import config from "../config/config";

const resend = new Resend(config.resendApiKey);

/**
 * Send a one-time verification code to the given email address.
 */
export const sendVerificationEmail = async (
  to: string,
  code: string,
): Promise<void> => {
  const { error } = await resend.emails.send({
    from: "Shadow Me Interns <noreply@shadowmeinterns.me>",
    to: [to],
    subject: "Your Shadow Me verification code",
    html: `
      <div style="font-family:Segoe UI,sans-serif;max-width:480px;margin:0 auto;padding:24px">
        <h2 style="color:#0078d4">Shadow Me Interns</h2>
        <p>Your verification code is:</p>
        <p style="font-size:32px;font-weight:700;letter-spacing:6px;color:#0078d4">${code}</p>
        <p style="color:#666;font-size:13px">This code expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Resend email failed: ${error.message}`);
  }
};
