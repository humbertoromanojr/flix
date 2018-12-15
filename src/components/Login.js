import React, { Component } from 'react';
import { View, Image, StyleSheet, TextInput, Text, TouchableHighlight } from 'react-native'; 
import { Button } from 'native-base';
import { connect } from 'react-redux';

import { modificaEmail, modificaSenha } from '../actions/AuthActions';

class Login extends Component {

  constructor(props){
    super(props)
    
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle: { backgroundColor: '#000' },
    headerTintColor: '#fff',
    headerTitle: <Image style={styles.logo} source={require('../img/logo_netflix.png')}  />,
    headerRight: <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                  <Text style={{marginRight: 10, color: "#fff", fontWeight: '400'}}> AJUDA</Text>
                </View>
  });

  render() {
    return (
      
    <View style={styles.container}>
        <View style={styles.spaceTop}><Text></Text></View>
        <View style={styles.content}>
            <TextInput value={this.props.email} onChangeText={texto => this.props.modificaEmail(texto)} style={styles.inputs} placeholder="Email" placeholderTextColor='#fff' underlineColorAndroid="transparent" />
            <TextInput value={this.props.senha} onChangeText={texto => this.props.modificaSenha(texto)} style={styles.inputs} placeholder="Senha" placeholderTextColor='#fff' underlineColorAndroid="transparent" secureTextEntry />

            <View style={styles.content}>
              <Button style={styles.btn} block bordered success>
                <Text style={styles.txtBtn}>Entrar</Text>
              </Button>
            </View>

            <View style={styles.center}>
              <TouchableHighlight onPress={()=>false} underlayColor="#333">
                <Text style={styles.txt}>Precisa de ajuda?</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={()=>this.props.navigation.navigate('Register')}>
                <Text style={styles.txt}>Novo por aqui? Inscreva-se agora.</Text>
              </TouchableHighlight>
            </View>
        </View>
        
    </View>
    );
  }
}
//redux
const mapStateToProps = state => (
  {
    email: state.AuthReducer.email,
    senha: state.AuthReducer.senha
  }
)
//decorator
export default connect(mapStateToProps, { modificaEmail, modificaSenha })(Login)

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#222', justifyContent: 'flex-start', alignItems: 'stretch' },
  logo: { width: 100, height: 50, justifyContent: 'flex-start' },
  content: { justifyContent: 'center', alignItems: 'stretch' },
  center: { justifyContent: 'center', alignItems: 'center' },
  inputs: { backgroundColor: '#333', fontSize: 20, height: 65, padding: 20, borderRadius: 10, marginBottom: 20 },
  txt: { justifyContent: 'center', alignItems: 'center', fontSize: 14, color: '#fff', padding: 20, marginTop: 20, fontWeight: '700' },
  btn: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#222', height: 60, padding: 10, borderRadius: 10, borderColor: '#444', marginTop: 20 },
  txtBtn: { color: '#efefef', fontSize: 18 },
  spaceTop: { justifyContent: 'flex-start', height: 40 }
});