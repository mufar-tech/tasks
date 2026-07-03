export async function fetchAPI(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }))
    throw new Error(error.message || `HTTP ${res.status}`)
  }
  return res.json()
}

export async function getProjects() {
  return fetchAPI("/api/projects")
}

export async function getProject(id: string) {
  return fetchAPI(`/api/projects/${id}`)
}

export async function createProject(data: any) {
  return fetchAPI("/api/projects", { method: "POST", body: JSON.stringify(data) })
}

export async function updateProject(id: string, data: any) {
  return fetchAPI(`/api/projects/${id}`, { method: "PUT", body: JSON.stringify(data) })
}

export async function deleteProject(id: string) {
  return fetchAPI(`/api/projects/${id}`, { method: "DELETE" })
}

export async function archiveProject(id: string) {
  return fetchAPI(`/api/projects/${id}`, { method: "PATCH", body: JSON.stringify({ action: "archive" }) })
}

export async function duplicateProject(id: string) {
  return fetchAPI(`/api/projects/${id}`, { method: "PATCH", body: JSON.stringify({ action: "duplicate" }) })
}

export async function getTasks(params?: Record<string, string>) {
  const query = params ? "?" + new URLSearchParams(params).toString() : ""
  return fetchAPI(`/api/tasks${query}`)
}

export async function createTask(data: any) {
  return fetchAPI("/api/tasks", { method: "POST", body: JSON.stringify(data) })
}

export async function updateTask(id: string, data: any) {
  return fetchAPI(`/api/tasks/${id}`, { method: "PUT", body: JSON.stringify(data) })
}

export async function deleteTask(id: string) {
  return fetchAPI(`/api/tasks/${id}`, { method: "DELETE" })
}

export async function batchUpdateTasks(updates: { id: string; status: string }[]) {
  return fetchAPI("/api/tasks/batch", { method: "PATCH", body: JSON.stringify({ updates }) })
}

export async function getTeams() {
  return fetchAPI("/api/teams")
}

export async function createTeam(data: any) {
  return fetchAPI("/api/teams", { method: "POST", body: JSON.stringify(data) })
}

export async function getActivities(params?: Record<string, string>) {
  const query = params ? "?" + new URLSearchParams(params).toString() : ""
  return fetchAPI(`/api/activities${query}`)
}

export async function getNotifications() {
  return fetchAPI("/api/notifications")
}

export async function markNotificationsRead(ids?: string[]) {
  return fetchAPI("/api/notifications", {
    method: "POST",
    body: JSON.stringify(ids ? { ids } : { all: true }),
  })
}

export async function getDashboardStats() {
  return fetchAPI("/api/dashboard/stats")
}
