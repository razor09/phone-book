import { NgModule } from '@angular/core';
import { pipes } from '../pipes';
import { components, root } from '../sections';
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