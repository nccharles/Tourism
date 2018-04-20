import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 15,
  },
  whiteFont: {
    color: '#FFF'
  }
});

export default class TextField extends React.PureComponent {
  onChangeText = (text) => {
    const { onChangeText, name } = this.props;
    onChangeText(name, text);
  };

  render() {
    const { value, secureTextEntry,autoCapitalize, name } = this.props;

    return (
      <TextInput
      underlineColorAndroid='transparent'
        onChangeText={this.onChangeText}
        value={value}
        style={[styles.input, styles.whiteFont]}
        placeholder={name}
        autoCapitalize={!!autoCapitalize}
        secureTextEntry={!!secureTextEntry}
      />
    );
  }
}
