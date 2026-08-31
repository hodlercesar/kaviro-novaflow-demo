// Metadata only. The mascot never needs an email, password or input value.
export function mascotPose({ type = "", name = "", id = "" } = {}) {
  if (/password/i.test(`${name} ${id}`) || type === "password") {
    return type === "password" ? "shield" : "peek";
  }
  if (type === "email" || /email|identifier|username/i.test(`${name} ${id}`))
    return "email";
  return "idle";
}
