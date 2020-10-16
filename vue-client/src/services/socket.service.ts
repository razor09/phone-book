import * as io from 'socket.io-client';
import { Config } from '../models';

class SockerService {

  public client = io(Config.SocketBaseUrl);
}

export const $socket = new SockerService();
