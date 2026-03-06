import { type NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db";

const RATE_LIMIT_WINDOW = 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown-ip";

    // Get MongoDB collection
    const collection = await getCollection();

    // Check if this IP has submitted recently
    const now = Date.now();
    const result = await collection.findOne({ ip });

    if (result) {
      const lastSubmission = result.timestamp;
      const timeElapsed = now - lastSubmission;

      if (timeElapsed < RATE_LIMIT_WINDOW) {
        const minutesRemaining = Math.ceil(
          (RATE_LIMIT_WINDOW - timeElapsed) / (60 * 1000),
        );
        return NextResponse.json(
          {
            error: "Rate limit exceeded",
            message: `Please wait ${minutesRemaining} minute${minutesRemaining > 1 ? "s" : ""} before submitting another message.`,
          },
          { status: 429 },
        );
      }
    }

    const body = await request.json();
    const { name, email, subject, message, isOpenSourceForm } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("Discord webhook URL not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    // Format the message for Discord
    const discordMessage = {
      embeds: [
        {
          title: "New Contact Form Submission",
          color: 0x6366f1,
          fields: [
            {
              name: "Name",
              value: name,
            },
            {
              name: "Email",
              value: email,
            },
            {
              name: "Subject",
              value: subject || "No subject provided",
            },
            {
              name: "Message",
              value: message,
            },
            {
              name: "Timestamp",
              value: new Date().toISOString(),
            },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "mdesk.tech Contact Form",
          },
        },
      ],
    };

    // Send to Discord webhook first
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordMessage),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook error: ${response.statusText}`);
    }

    // Only update rate limit after successful webhook delivery
    await collection.updateOne(
      { ip },
      { $set: { timestamp: now } },
      { upsert: true },
    );

    if (isOpenSourceForm) {
      const caseId = body;
      return NextResponse.json({
        success: true,
        message: "Form submitted successfully",
        ...(isOpenSourceForm && { caseId }),
      });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending message to Discord:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
