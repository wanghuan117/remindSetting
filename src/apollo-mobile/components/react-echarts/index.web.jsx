import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/grid';

export default class ReactEcharts extends React.PureComponent {

  static propTypes = {
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    theme: React.PropTypes.string,
    onReady: React.PropTypes.func,
    showLoading: React.PropTypes.bool,
    events: React.PropTypes.object,
    option: React.PropTypes.object.isRequired,
    actions:React.PropTypes.object,
  };

/*  componentWillReceiveProps (nextProps) {
    console.log('nextProps.option',JSON.stringify(nextProps.option));
    this.chart.setOption(nextProps.option,true);
  }*/

  componentDidUpdate() {
    this.chart.setOption(this.props.option,true);

    const events = this.props.events || {};
    const actions = this.props.actions || {};
    for (const event in events) {
      if (events.hasOwnProperty(event)) {
        this.chart.on(event, (params) => {
          this.chart.dispatchAction(actions);
          events[event](params,  this.chart);
        });
      }
    }
  }



  componentDidMount() {
    const chart = this.renderEcharts();
    this.chart = chart;
    const events = this.props.events || {};
    const actions = this.props.actions || {};
    for (const event in events) {
      if (events.hasOwnProperty(event)) {
        chart.on(event, (params) => {
          chart.dispatchAction(actions);
          events[event](params, chart);
        });
      }
    }
    if (this.props.onReady && typeof this.props.onReady === 'function') {
      this.props.onReady(chart);
    }
  }

  renderEcharts = () => {
    const chart = echarts.init(this.refs.reactChart, this.props.theme);
    chart.setOption(this.props.option,true);
    if (this.props.showLoading) {
      chart.showLoading();
    } else {
      chart.hideLoading();
    }
    return chart;
  }


  render() {
    const style = this.props.style || {height: 400, width: '100%'};
    return (
      <div
        ref="reactChart"
        style={ style }
        className={this.props.className}
      >
      </div>
    );
  }
}
