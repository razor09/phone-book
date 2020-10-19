import Vue from 'vue';
import Component from 'vue-class-component';
import { files } from '../../libs';

@Component({
  template: files.insert('layout-preloader'),
})
export class LayoutPreloader extends Vue {

  public get inProgress(): boolean {
    return this.$store.state.inProgress;
  }
}
