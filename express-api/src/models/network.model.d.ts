export const enum Message {
	Add ='[message]:add-contact',
	Save = '[message]:save-contact',
	Remove = '[message]:remove-contact',
}

export const enum Status {
	Unauthorized = 401,
	Conflict = 409,
	BadRequest = 400,
	InternalServerError = 500,
}