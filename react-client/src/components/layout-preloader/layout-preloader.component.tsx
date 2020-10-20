import * as React from 'react';
import { DispatchProp } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { utils } from '../../libs';
import { adapter } from '../../store/global.reducer';
import './layout-preloader.style';

interface StateProps {
  inProgress: boolean;
}

type Props = StateProps & DispatchProp;

class InferableComponent extends React.Component<Props> {

  public render(): JSX.Element {
    const { inProgress } = this.props;
    return (
      <CSSTransition
        unmountOnExit
        in={inProgress}
        timeout={800}
      >
        <section id="layout-preloader"></section>
      </CSSTransition>
    );
  }
}

export const LayoutPreloader = utils.compose(InferableComponent)
  .pipe(adapter<StateProps>((state) => {
    return {
      inProgress: state.networkReducer.inProgress,
    };
  }))
  .result();
