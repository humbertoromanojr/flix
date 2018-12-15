import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      dataSource: []
    }
  }

  state = {
      results: [],
  };

  componentDidMount(){
    this.loadMovies();
  }

  loadMovies = async () => {
    const api_key  = 'a5b048e479232b12580ede0285f73f64';
    const response = await axios.get('https://api.themoviedb.org/3/search/movie?query=terror&api_key=' + api_key);
    if (response)
      this.setState({ results: response.data.results }); 
  };

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Image style={styles.logo} source={require('../img/logo_netflix.png')}  />,
    headerRight: <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                  <TouchableOpacity underlayColor="#efefef" onPress={()=>navigation.navigate('Login')}>
                    <Text style={{marginRight: 20, color: "#000", fontWeight: '400'}}>ENTRAR</Text>
                  </TouchableOpacity >
                  <Text style={{marginRight: 10, color: "#000", fontWeight: '400'}}> AJUDA</Text>
                </View>
  });

  render() {
    const movies = this.state.results;
    return (
      <View style={styles.home}>

        <Text style={styles.txt}>Lista de Filmes:</Text>
        { movies &&
          movies.map((movie, idx) => { 
            return (
              <Text key={idx} style={styles.txt}>{movie.title} - ano: {movie.release_date}</Text>
            )
          })
        }

      </View>
    );
  }

}//close class

const styles = StyleSheet.create({
  home: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#333' },
  logo: { width: 100, height: 50, justifyContent: 'flex-start' },
  txt: { color: '#fff' }
});