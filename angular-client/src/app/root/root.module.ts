import { NgModule } from '@angular/core';
import { components, root } from '../components';
import { pipes } from '../pipes';
import { core } from './root.core';

@NgModule({
	imports: [
		...core,
	],
	declarations: [
		...components,
		...pipes,
	],
	bootstrap: [root],
})
export class RootModule {}