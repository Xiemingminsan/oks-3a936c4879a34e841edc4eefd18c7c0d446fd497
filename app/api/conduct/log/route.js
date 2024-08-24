// pages/api/conducts/route.js
import authenticate from "../../../../auth";
import ConductLog from "../../../../models/conductlog";
import dbConnect from "../../../../dbConnect";

export async function GET(req) {
  await dbConnect();

  const authData = await authenticate(req);

  if (!authData) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const letters = await ConductLog.find({});
    return new Response(JSON.stringify(letters), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
