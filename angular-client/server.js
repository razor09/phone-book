const { createServer } = require('http');
const { Server } = require('node-static');

const server = createServer((request, response) => {
	const staticFiles = new Server('dist');
	const message = request.addListener('end', () => {
		staticFiles.serve(request, response, (error) => {
			if (!!error) {
				staticFiles.serveFile('index.html', error.status, request.headers, request, response);
			}
		});
	});
	message.resume();
});

server.listen(4000);