import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import axios from 'axios';

export default class App extends Component {

 state = {
      movieInfo: {},
      results: [],
      page: 1,
  };

  componentDidMount(){
    this.loadMovies();
  }

  loadMovies = async (page = 1) => {
        
    const api_key  = 'a5b048e479232b12580ede0285f73f64';
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=terror&api_key=` + api_key + `&language=pt-BR&page=${page}`);
    
    const { results, ...movieInfo } = response.data;

    //load end page more movie
    this.setState({ 
      results: [...this.state.results, ...results], 
      movieInfo,
      page 
    }); 

  };

  handleLoadMore = () => {
    const { page, movieInfo } = this.state;

    if(page === movieInfo.total_pages) return;

    const pageNumber = page + 1;

    this.loadMovies(pageNumber);
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

  
  renderItem = ({ item }) => {
	const items = this.state.results;
    return (
      <View>
        { items &&
          items.map((item, idx) => { 
      //invert a data
      const invertDate = item.release_date.split('-').reverse().join('/')
      const baseUrl = 'https://image.tmdb.org/t/p/original';

      if( item.id == 1992){
        return (
          <View key={idx} style={styles.containerDestaque}>
			<TouchableOpacity 
				onPress={()=>this.props.navigation.navigate('Details', { item: item })}
				>
				<Image style={styles.imgDestaque} source={{ uri: baseUrl + item.poster_path }} />
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<Text style={styles.titDestaque}>{item.title}</Text>
						<Text style={styles.dataDestaque}>{invertDate}</Text>
					</View>
				<Text style={styles.desc}>{item.overview}</Text>
			</TouchableOpacity>
          </View>
        )
      } else if( item.id != 1992 ){ 
        return (
				<View key={idx} style={styles.container}>

					<TouchableOpacity 
						onPress={()=>this.props.navigation.navigate('Details', { item: item })}
						>
						<View style={styles.content}>
							<Image style={styles.img} source={{ uri: baseUrl + item.poster_path }} />
							<View>
								<Text style={styles.tit}>{item.title}</Text>
								<Text style={styles.data}>{invertDate}</Text>
							</View>
						</View>
					</TouchableOpacity>

				</View>
                )
              }

          })
        }
      </View>
    )
  }//close renderItem

  render() {
    return (
        <FlatList
          data={ this.state.results }
          renderItem={ this.renderItem }
          keyExtractor={ idx => idx.id }
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={ 0.1 }
        />
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#333', flexDirection: 'row', padding: 5 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', padding: 5, borderBottomColor: '#444' },
  logo: { width: 100, height: 50, justifyContent: 'flex-start' },
  img: { width: 100, height: 100, justifyContent: 'flex-start', padding: 10 },
  tit: { color: '#fff', fontSize: 18, fontWeight: '600', padding: 10 },
  data: { color: '#ccc', fontSize: 12, padding: 10 },  

  containerDestaque: { flex: 1, justifyContent: 'center', alignItems: 'stretch', backgroundColor: '#111' },
  imgDestaque: { flex: 2, height: 300, width: 500, alignItems: 'stretch', justifyContent: 'center', padding: 5 },
  dataDestaque: { color: '#ccc', fontSize: 12, alignItems: 'center', padding: 20 },
  titDestaque: { color: '#fff', fontSize: 18, alignItems: 'center', padding: 20 },
  desc: { color: '#fff', fontSize: 12, padding: 20 }
});