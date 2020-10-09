class Files {

	public root(): string {
		require('../assets');
		return require('../root/root.template');
	}

	public insert(section: string, component: string): string {
		const path = `sections/${section}/components/${component}/${component}`;
		try {
			require(`../${path}.style`);
		} finally {
			return require(`../${path}.template`);
		}
	}
}

export const files = new Files();