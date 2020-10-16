import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Utils } from '../libs';
import { Color, Text } from '../models';

@Injectable({
  providedIn: 'root',
})
export class Store {

  public inProgress = false;
  public isAuth = false;
  public isError = false;
  public text: Text = 'Login';
  public color: Color = null;

  constructor(
    private title: Title,
    private utils: Utils,
  ) {}

  public authorized(): void {
    this.isAuth = true;
    this.text = 'Dashboard';
    this.title.setTitle('Dashboard');
  }

  public unauthorized(): void {
    this.isAuth = false;
    this.text = 'Login';
    this.title.setTitle('Login');
  }

  public broken(): void {
    this.inProgress = false;
    this.isAuth = false;
    this.isError = true;
    this.text = 'Error';
    this.title.setTitle('Error');
  }

  public setProgress(progress: boolean): void {
    this.inProgress = progress;
  }

  public notify(text: Text, color: Color): void {
    this.text = text;
    this.color = color;
    this.utils.delay(() => {
      this.text = this.isAuth ? 'Dashboard' : 'Login';
      this.color = null;
    });
  }
}
