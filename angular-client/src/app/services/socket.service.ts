import { Injectable } from '@angular/core';
import * as socket from 'socket.io-client';
import { Config } from '../models';

@Injectable({
	providedIn: 'root',
})
export class SocketService {

	public client = socket(Config.SocketBaseUrl);
}