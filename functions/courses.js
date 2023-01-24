// const { table } = require("./helpers/airtable");
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

const createAirtableRecord = () => {
  return fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      AIRTABLE_TABLE_NAME
    )}`,
    {
      method: "GET",
      // body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-type": `application/json`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => console.log(data.records[6]));
};

const submitHandler = async (request) => {
  if (request.method !== "GET") {
    return new Response("Method Not Allowed", {
      status: 405,
    });
  }

  await createAirtableRecord();
  return new Response("ok", {
    status: 200,
  });
};

async function handleRequest(request) {
  const url = new URL(request.url);

  if (url.pathname === "/submit") {
    console.log(AIRTABLE_API_KEY);
    return submitHandler(request);
  }

  return new Response("Method Not Allowed", {
    status: 405,
  });
}
