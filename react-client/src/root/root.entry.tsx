import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../assets';
import { LayoutContainer } from '../components/layout-container/layout-container.component';
import { store } from '../store/global.reducer';

export const Entry = (): JSX.Element => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route
						path="/"
						component={LayoutContainer}
					></Route>
				</Switch>
			</BrowserRouter>
		</Provider>
	);
}