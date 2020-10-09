import * as express from 'express';
import { cors, parser, session } from './adapters';
import { router } from './router';

express().use(cors, parser, session, router).listen(3000);