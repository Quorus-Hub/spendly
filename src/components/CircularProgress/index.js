import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Colors, Typography } from '../../styles';

const propStyle = (percent, base_degrees) => {
  const rotateBy = base_degrees + (percent * 3.6);
  return {
    transform: [{ rotateZ: `${rotateBy}deg` }]
  };
}

const renderThirdLayer = (percent, theme) => {
  if (percent > 50) {
    return <View style={[styles(theme).secondProgressLayer, propStyle((percent - 50), 45)]}></View>
  } else {
    return <View style={styles(theme).offsetLayer}></View>
  }
}

const CircularProgress = ({ percent, theme }) => {
  let firstProgressLayerStyle;
  if (percent > 50) {
    firstProgressLayerStyle = propStyle(50, -135);
  } else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }

  return (
    <View style={styles(theme).container}>
      <View style={[styles(theme).firstProgressLayer, firstProgressLayerStyle]}></View>
      {renderThirdLayer(percent, theme)}
    </View>
  );
}

const styles = (theme) => StyleSheet.create({
  container: {
    width: 140,
    height: 140,
    borderWidth: 15,
    borderRadius: 70,
    borderColor: theme.darkmode ? Colors.GRAY_BLUE : Colors.BLUE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  firstProgressLayer: {
    width: 140,
    height: 140,
    borderWidth: 15,
    borderRadius: 70,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: theme.darkmode ? Colors.GRAY_LIGHT : Colors.GRAY_DARK,
    borderTopColor: theme.darkmode ? Colors.GRAY_LIGHT : Colors.GRAY_DARK,
    transform: [{ rotateZ: '-135deg' }]
  },
  secondProgressLayer: {
    width: 140,
    height: 140,
    position: 'absolute',
    borderWidth: 15,
    borderRadius: 70,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: theme.darkmode ? Colors.GRAY_LIGHT : Colors.GRAY_DARK,
    borderTopColor: theme.darkmode ? Colors.GRAY_LIGHT : Colors.GRAY_DARK,
    transform: [{ rotateZ: '45deg' }]
  },
  offsetLayer: {
    width: 140,
    height: 140,
    position: 'absolute',
    borderWidth: 15,
    borderRadius: 70,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: theme.darkmode ? Colors.GRAY_BLUE : Colors.BLUE,
    borderTopColor: theme.darkmode ? Colors.GRAY_BLUE : Colors.BLUE,
    transform: [{ rotateZ: '-135deg' }]
  }
});

export default CircularProgress;