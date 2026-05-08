import { NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Telegram configuration is missing");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    const { message, sessionId, name, contact, type } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    let text = "";

    if (type === "lead") {
      text = `🆕 *NEW LEAD CAPTURED*\n\n` +
             `🆔 *Session ID:* \`${sessionId}\`\n` +
             `👤 *Name:* ${name}\n` +
             `📞 *Contact:* ${contact}\n\n` +
             `_User is now waiting to chat._`;
    } else {
      if (!message) {
        return NextResponse.json(
          { error: "Message is required" },
          { status: 400 }
        );
      }
      // Simple prefixing for session tracking and privacy
      text = `[ID: ${sessionId}] ${name || "User"}: ${message}`;
    }

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: type === "lead" ? "Markdown" : undefined,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Telegram API error:", data);
      return NextResponse.json(
        { error: "Failed to send message to Telegram" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error in telegram API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");

  if (!TELEGRAM_BOT_TOKEN) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates?limit=100&allowed_updates=["message"]`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch messages from Telegram" },
        { status: response.status }
      );
    }

    let filteredMessages = data.result || [];

    // Privacy Filtering: Only return messages that belong to this session
    // In "Simple Prefixing", we check if the bot's reply contains the sessionId
    if (sessionId) {
      filteredMessages = filteredMessages.filter((update: any) => {
        const text = update.message?.text || "";
        // We assume the agent replies with the [ID: sessionId] prefix
        // or the message is from the user itself (which we already have in local state, but for sync)
        return text.includes(`[ID: ${sessionId}]`);
      });
    } else {
      // If no sessionId is provided, return nothing for safety (privacy)
      filteredMessages = [];
    }

    return NextResponse.json({ success: true, messages: filteredMessages });
  } catch (error) {
    console.error("Error fetching telegram updates:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
