export default async function handler(req, res) {
  const baseUrl =
    process.env.BACKEND_API_BASE_URL || process.env.VITE_API_BASE_URL;

  if (!baseUrl) {
    res.status(500).json({
      error: "BACKEND_API_BASE_URL is not configured",
    });
    return;
  }

  const pathParts = Array.isArray(req.query.path)
    ? req.query.path
    : [req.query.path].filter(Boolean);
  const upstreamUrl = new URL(
    `${baseUrl.replace(/\/$/, "")}/${pathParts.map(encodeURIComponent).join("/")}`,
  );

  for (const [key, value] of Object.entries(req.query)) {
    if (key === "path") {
      continue;
    }
    const values = Array.isArray(value) ? value : [value];
    for (const item of values) {
      if (item !== undefined) {
        upstreamUrl.searchParams.append(key, String(item));
      }
    }
  }

  const headers = {
    Accept: req.headers.accept || "application/json",
  };

  if (req.headers.authorization) {
    headers.Authorization = req.headers.authorization;
  }
  if (req.headers["content-type"]) {
    headers["Content-Type"] = req.headers["content-type"];
  }

  const requestInit = {
    method: req.method,
    headers,
  };

  if (!["GET", "HEAD"].includes(req.method)) {
    const rawBody =
      typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? {});
    requestInit.body = rawBody;
  }

  try {
    const upstreamResponse = await fetch(upstreamUrl, requestInit);
    const contentType =
      upstreamResponse.headers.get("content-type") || "application/json";
    const text = await upstreamResponse.text();

    res.status(upstreamResponse.status);
    res.setHeader("Content-Type", contentType);
    res.send(text);
  } catch (error) {
    res.status(502).json({
      error: "Upstream request failed",
      detail: error.message,
    });
  }
}
