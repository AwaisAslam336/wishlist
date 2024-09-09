import { json } from "@remix-run/node";

export const loader = async ({ request }) => {
  return json({ message: "Hello from the API" });
};

export const action = async ({ request }) => {
  switch (request.method) {
    case "POST":
      return json({ message: "success", method: request.method });
    case "PUT":
      return json({ message: "success", method: request.method });
    default:
      return new Response("Not Found", { status: 404 });
  }
};
