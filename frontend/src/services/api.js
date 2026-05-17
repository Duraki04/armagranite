const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const sendContactMessage = async (formData) => {
  const response = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send message.");
  }

  return data;
};

export const loginAdmin = async (credentials) => {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed.");
  }

  return data;
};

export const getAdminMessages = async (token) => {
  const response = await fetch(`${API_URL}/admin/messages`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch messages.");
  }

  return data;
};

export const markMessageAsRead = async (messageId, token) => {
  const response = await fetch(`${API_URL}/admin/messages/${messageId}/read`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to mark message as read.");
  }

  return data;
};

export const deleteMessage = async (messageId, token) => {
  const response = await fetch(`${API_URL}/admin/messages/${messageId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete message.");
  }

  return data;
};

export const getAdminGranitePosts = async (token) => {
  const response = await fetch(`${API_URL}/granite-posts/admin`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch granite posts.");
  }

  return data;
};

export const getPublicGranitePosts = async () => {
  const response = await fetch(`${API_URL}/granite-posts`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch granite posts.");
  }

  return data;
};

export const createGranitePost = async (formData, token) => {
  const response = await fetch(`${API_URL}/granite-posts/admin`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create granite post.");
  }

  return data;
};

export const updateGranitePost = async (postId, formData, token) => {
  const response = await fetch(`${API_URL}/granite-posts/admin/${postId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update granite post.");
  }

  return data;
};

export const deleteGranitePost = async (postId, token) => {
  const response = await fetch(`${API_URL}/granite-posts/admin/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete granite post.");
  }

  return data;
};