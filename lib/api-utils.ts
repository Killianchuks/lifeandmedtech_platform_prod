/**
 * Utility functions for API requests with proper error handling
 */

/**
 * Fetches data from an API endpoint with error handling
 * @param url The URL to fetch from
 * @param options Fetch options
 * @returns The parsed response data
 */
export async function fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      // Handle different error status codes
      if (response.status === 401) {
        throw new Error("Unauthorized. Please log in again.")
      } else if (response.status === 403) {
        throw new Error("You do not have permission to access this resource.")
      } else if (response.status === 404) {
        throw new Error("The requested resource was not found.")
      } else if (response.status === 429) {
        throw new Error("Too many requests. Please try again later.")
      } else if (response.status >= 500) {
        throw new Error("Server error. Please try again later.")
      } else {
        throw new Error(`API error: ${response.statusText}`)
      }
    }

    return await response.json()
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

/**
 * Posts data to an API endpoint with error handling
 * @param url The URL to post to
 * @param data The data to post
 * @param options Additional fetch options
 * @returns The parsed response data
 */
export async function postWithErrorHandling<T, R>(url: string, data: T, options?: RequestInit): Promise<R> {
  return fetchWithErrorHandling<R>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    ...options,
  })
}

/**
 * Updates data at an API endpoint with error handling
 * @param url The URL to update
 * @param data The data to update
 * @param options Additional fetch options
 * @returns The parsed response data
 */
export async function putWithErrorHandling<T, R>(url: string, data: T, options?: RequestInit): Promise<R> {
  return fetchWithErrorHandling<R>(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    ...options,
  })
}

/**
 * Deletes a resource at an API endpoint with error handling
 * @param url The URL to delete
 * @param options Additional fetch options
 * @returns The parsed response data
 */
export async function deleteWithErrorHandling<R>(url: string, options?: RequestInit): Promise<R> {
  return fetchWithErrorHandling<R>(url, {
    method: "DELETE",
    ...options,
  })
}

