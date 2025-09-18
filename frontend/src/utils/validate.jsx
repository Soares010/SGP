export function validate(fields, type, message) {
  if (type === "projects") {
    if (
      !fields.title?.trim() ||
      !fields.description?.trim() ||
      !fields.status?.trim() ||
      !fields.begin?.trim() ||
      !fields.end?.trim() ||
      !fields.budget?.trim() ||
      !fields.cost?.trim() ||
      !fields.priority?.trim()
    ) {
      return message;
    }
  }
  return null
}
