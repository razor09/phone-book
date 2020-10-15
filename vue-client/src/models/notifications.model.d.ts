export type Title = 'Login' | 'Dashboard' | 'Error';

export type Text = 'Login Failed' | 'Welcome' | 'Bye' | 'Empty Fields' | 'Created' | 'Updated' | 'Removed';

export type Color = 'firebrick' | 'peru' | 'darkslategray';

export interface Notification {
	id: symbol;
	text: Text;
	color: Color;
}