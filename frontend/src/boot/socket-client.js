import Vue from 'vue';
import { io } from 'socket.io-client';
import config from '../../config';

const SCHEME    = 'http';
const HOST      = config.SERVER.HOST;
const PORT      = config.SERVER.PORT;
const socket    = io.connect(`${SCHEME}://${HOST}:${PORT}`, {transports: ['websocket', 'polling', 'flashsocket']});

export default socket;