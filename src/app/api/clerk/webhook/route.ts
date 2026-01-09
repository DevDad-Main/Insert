import { logger } from "devdad-express-utils";
import { db } from "~/server/db";

export const POST = async (req: Request) => {
  const { data } = await req.json();
  logger.info("webhook received from clerk: ", { data });
  console.log("webhook received from clerk: ", { data });
  const id = data.id;
  const emailAddress =
    data.email_addresses[0]?.email_address ?? "test@test.com";
  // TODO: Handle our validation like so for now.. Tidy up later with proper validation
  const firstName = data.first_name;
  const lastName = data.last_name ?? " ";
  const imageUrl = data.image_url;

  const user = await db.user.create({
    data: {
      id,
      emailAddress,
      firstName,
      lastName,
      imageUrl,
    },
  });

  logger.info("created user", { user });
  return new Response("Webhook received", { status: 200 });
};
