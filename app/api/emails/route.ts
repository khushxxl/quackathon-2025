import EmailTemplate from "@/components/emails/EmailTemplate";
import { Resend } from "resend";

const resend_api = "re_gZw1iabF_JexLaJWf64WcDRU4ekC1GRTN";

const resend = new Resend(resend_api);
export async function POST(req: Request) {
  const { email, buttonText, title, subtitle, paragraphs, buttonUrl, subject } =
    await req.json();
  try {
    const { data, error } = await resend.emails.send({
      from: "The Green Team <khushaal@khushcodezz.net>",
      to: [email],
      subject: subject,
      react: EmailTemplate({
        buttonText: buttonText,
        content: {
          title: title,
          subtitle: subtitle,
          paragraphs: paragraphs,
          buttonUrl: buttonUrl,
        },
      }),
    });

    return Response.json({ data }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
