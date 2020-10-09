export const enum Config {
	ApiBaseUrl = 'http://localhost:3000',
	SocketBaseUrl = 'http://localhost:3200',
	Exception = 400,
}

export const enum Message {
	Add ='[message]:add-contact',
	Save = '[message]:save-contact',
	Remove = '[message]:remove-contact',
}