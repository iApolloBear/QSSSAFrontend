export const baseUrl = process.env.REACT_APP_API_URL;

export const fetchWithoutToken = async (
  endpoint,
  data,
  method = "GET",
  formData = false
) => {
  const url = `${baseUrl}/${endpoint}`;

  if (method === "GET") {
    const resp = await fetch(url);
    const body = await resp.json();
    return {
      ...body,
      ok: resp.ok,
      status: resp.status,
    };
  } else {
    const resp = await fetch(url, {
      method,
      headers: formData
        ? {}
        : {
            "Content-type": "application/json",
          },
      body: formData ? data : JSON.stringify(data),
    });
    const body = await resp.json();
    return {
      ...body,
      ok: resp.ok,
      status: resp.status,
    };
  }
};

export const fetchWithToken = async (
  endpoint,
  data,
  method = "GET",
  formData = false
) => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem("token") || "";

  if (method === "GET") {
    const resp = await fetch(url, {
      headers: {
        "x-token": token,
      },
    });
    const body = await resp.json();
    return { ...body, ok: resp.ok, status: resp.status };
  } else {
    const resp = await fetch(url, {
      method,
      headers: formData
        ? { "x-token": token }
        : {
            "Content-type": "application/json",
            "x-token": token,
          },
      body: formData ? data : JSON.stringify(data),
    });
    const body = await resp.json();
    return {
      ...body,
      ok: resp.ok,
      status: resp.status,
    };
  }
};
