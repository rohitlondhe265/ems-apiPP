import { sendMail } from "../mail/mailer.js";

// const req = {
//   "to": "recipient@example.com",
//   "subject": "Node.js Email Example",
//   "text": "This is the text content of the email.",
//   "html": "<p>This is the HTML content of the email.</p>",
// };
async function main(res, body) {
  const { to, subject, text, html } = body;
  try {
    await sendMail(res, to, subject, text, html);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
export async function POST(req, res) {
  const body = await req.body;
  await main(res, body);
}

export async function GET(req, res) {
  const body = await req.body;
  const slug = req.params.slug;
  const data = { body, slug };
  res.status(200).json(data);
}
