export const enum Message {
  Create = '[message]:create-contact',
  Update = '[message]:update-contact',
  Remove = '[message]:remove-contact',
}

export const enum Status {
  Unauthorized = 401,
  Conflict = 409,
  BadRequest = 400,
  InternalServerError = 500,
}
