class Files {

  public root(): string {
    require('../assets');
    return require('../root/root.template');
  }

  public insert(component: string): string {
    const path = `components/${component}/${component}`;
    try {
      require(`../${path}.style`);
    } finally {
      return require(`../${path}.template`);
    }
  }
}

export const files = new Files();
