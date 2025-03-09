import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize the OpenAI client with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// FAQ questions and answers for the chatbot
export const faqQuestions = [
  {
    question: "How can I volunteer?",
    answer:
      "You can volunteer by visiting our 'Volunteer' page and filling out the registration form. We have various opportunities available for different skill levels and time commitments.",
  },
  {
    question: "What programs do you offer for children?",
    answer:
      "We offer several nature-based programs for children including outdoor education workshops, weekend nature camps, and after-school environmental clubs. Check our 'Programs' section for more details.",
  },
  {
    question: "How can I donate to support your cause?",
    answer:
      "You can make a donation through our 'Donate' page. We accept one-time and recurring donations. All contributions help us connect more children with nature and support our environmental initiatives.",
  },
  {
    question: "What age groups do your programs serve?",
    answer:
      "Our programs cater to children from ages 5-17, with different activities designed for specific age groups. We also have family programs where parents can participate alongside their children.",
  },
  {
    question: "Do you offer virtual programs?",
    answer:
      "Yes, we have developed several virtual nature education programs that can be accessed remotely. These include online workshops, virtual field trips, and digital learning resources.",
  },
  {
    question: "How can I stay updated about your events?",
    answer:
      "You can subscribe to our newsletter on the homepage, follow us on social media, or create an account on our website to receive notifications about upcoming events and programs.",
  },
  {
    question: "Are there opportunities for corporate partnerships?",
    answer:
      "Absolutely! We welcome corporate partnerships and can create customized volunteer days, sponsorship opportunities, and collaborative environmental initiatives. Please contact us through the 'Partnerships' page.",
  },
  {
    question:
      "What safety measures do you have in place for children's programs?",
    answer:
      "All our staff and volunteers undergo background checks, and we maintain appropriate adult-to-child ratios. We follow strict safety protocols for all activities and have trained first aid personnel present at all events.",
  },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful chatbot assistant that can answer questions
             about the The Green Team organization and its programs. Refuse to answer questions
              that are not related to the organization or its programs.
              The organization is a non-profit organization.
              The organization is a nature-based organization.
              The organization is a environmental organization.

              Reject any request to do anything that is not related to the organization or its programs. 

              You need to ans questions based on these faq:
              ${JSON.stringify(
                faqQuestions
              )} feel free to expand on the answers if needed. but dont make up any information. 
              `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message:
        "OpenAI API endpoint is working. Please use POST method to interact with the API.",
    },
    { status: 200 }
  );
}
