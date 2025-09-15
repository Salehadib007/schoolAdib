// lib/authorize.js
export function withRole(allowedRoles, handler) {
  return async (req, context) => {
    // TEMP MOCK (simulate an admin user)
    context.user = { role: "ADMIN", id: "mock-user-id" };

    if (!allowedRoles.includes(context.user.role)) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
      });
    }

    return handler(req, context);
  };
}
