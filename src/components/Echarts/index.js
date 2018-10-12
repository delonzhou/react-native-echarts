// import React, { Component } from 'react';
// import { WebView, View, StyleSheet } from 'react-native';
// import renderChart from './renderChart';
// import echarts from './echarts.min';

// export default class App extends Component {
//   componentWillReceiveProps(nextProps) {
//     if(nextProps.option !== this.props.option) {
//       this.refs.chart.reload();
//     }
//   }

//   render() {
//     return (
//       <View style={{flex: 1, height: this.props.height || 400,}}>
//         <WebView
//           ref="chart"
//           scrollEnabled = {false}
//           injectedJavaScript = {renderChart(this.props)}
//           style={{
//             height: this.props.height || 400,
//             backgroundColor: this.props.backgroundColor || 'transparent'
//           }}
//           scalesPageToFit={false}          
//           source={require('./tpl.html')}
//           onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
//         />
//       </View>
//     );
//   }
// }

import React, { Component } from 'react';
import { WebView, View, StyleSheet,Platform } from 'react-native';
import renderChart from './renderChart';
import renderChartNoFirst from './renderChart'
import echarts from './echarts.min';

export default class App extends Component {
// 预防过渡渲染

  // shouldComponentUpdate(nextProps, nextState) {
  //   const thisProps = this.props || {}
  //   nextProps = nextProps || {}
  //   if (Object.keys(thisProps).length !== Object.keys(nextProps).length) {
  //     return true
  //   }
  //   for (const key in nextProps) {
  //     if (JSON.stringify(thisProps[key]) != JSON.stringify(nextProps[key])) {
  //       // console.log('props', key, thisProps[key], nextProps[key])
  //       return true
  //     }
  //   }
  //   return false
  // }

  componentWillReceiveProps(nextProps) {
    // if(nextProps.option !== this.props.option) {
    // 解决数据改变时页面闪烁的问题
    //this.refs.chart.reload()
    this.refs.chart.injectJavaScript(renderChart(nextProps,false))
    //}
  }

  render() {
    if (Platform.OS == 'android'){
      const tplfile = Expo.Asset.fromModule(require('./tpl.html')).uri;
      return (
      <View style={{flex: 1, height: this.props.height || 400,}}>
        <WebView
          ref="chart"
          scrollEnabled = {false}
          injectedJavaScript = {renderChart(this.props,true)}
          style={{
            height: this.props.height || 400,
            backgroundColor: this.props.backgroundColor || 'transparent'
          }}
          // source={{uri: `tplfile`}}
          source={{uri: Expo.Asset.fromModule(require('./tpl.html')).uri}}
          //source={{uri: 'file:///android_asset/tpl.html'}}
        />
      </View>
    );
    }else{
      return (
      <View style={{flex: 1, height: this.props.height || 400,}}>
        <WebView
          ref="chart"
          scrollEnabled = {false}
          scalesPageToFit={false}
          injectedJavaScript = {renderChart(this.props,true)}
          style={{
            height: this.props.height || 400,
            backgroundColor: this.props.backgroundColor || 'transparent'
          }}
          source={require('./tpl.html')}
        />
      </View>
    );
    }
    
  }
}