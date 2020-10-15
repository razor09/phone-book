export type AuthStatus = 'initialize' | 'authorized' | 'unauthorized' | 'error' ;

export type AuthTitle = 'Login' | 'Dashboard' | 'Error';

export interface AuthState {
	status: AuthStatus;
	title: AuthTitle;
}