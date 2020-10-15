export const enum Config {
	ApiBaseUrl = 'http://localhost:3000',
	SocketBaseUrl = 'http://localhost:3200',
	Exception = 400,
}

export const enum Message {
	Create = '[message]:create-contact',
	Update = '[message]:update-contact',
	Remove = '[message]:remove-contact',
}