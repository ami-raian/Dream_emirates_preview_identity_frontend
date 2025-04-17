const customFetch = async (
  url: string,
  method = "GET",
  nodeUrl?: boolean,
  body: any = null,
  isMultipart = false
) => {
  const headers: Record<string, string> = {
    ...(isMultipart ? {} : { "Content-Type": "application/json" }),
  };

  const options: RequestInit = {
    method,
    headers,
    ...(body && { body: isMultipart ? body : JSON.stringify(body) }),
  };

  const baseUrl = nodeUrl
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL2;

  try {
    const response = await fetch(`${baseUrl}/${url}`, options);

    if (!response.ok) {
      const contentType = response.headers.get("Content-Type") || "";
      let errorMessage = "An error occurred";

      if (contentType.includes("application/json")) {
        const errorData: any = await response.json();
        errorMessage = errorData.message || errorMessage;
      } else {
        errorMessage = await response.text();
      }

      throw new Error(errorMessage);
    }

    const contentType = response.headers.get("Content-Type") || "";

    if (contentType.includes("application/json")) {
      const data = await response.json();
      return data?.data !== null
        ? Array.isArray(data.data)
          ? data.data
          : data
        : data;
    } else {
      return { message: await response.text() };
    }
  } catch (error: any) {
    const errorMessage =
      error.message || "An unknown error occurred. Please try again.";
    throw new Error(errorMessage);
  }
};

export const fetchGet = async (url: string, nodeUrl?: boolean) =>
  customFetch(url, "GET", nodeUrl);

export const fetchPost = async (
  url: string,
  body: unknown,
  isMultipart?: boolean,
  nodeUrl?: boolean
) => customFetch(url, "POST", nodeUrl, body, isMultipart);

export const fetchPut = async (url: string, body: unknown, nodeUrl?: boolean) =>
  customFetch(url, "PUT", nodeUrl, body);

export const fetchPatch = async (
  url: string,
  body: unknown,
  isMultipart?: boolean,
  nodeUrl?: boolean
) => customFetch(url, "PATCH", nodeUrl, body, isMultipart);

export const fetchDelete = async (url: string, nodeUrl?: boolean) =>
  customFetch(url, "DELETE", nodeUrl);
