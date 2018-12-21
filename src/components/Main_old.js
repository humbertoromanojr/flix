import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator, Dimensions} from 'react-native';
import axios from 'axios';

const api_key  = 'a5b048e479232b12580ede0285f73f64';
const page = 1;

export default class App extends Component {

static navigationOptions = ({ navigation }) => ({
	headerTitle: <Image style={styles.logo} source={require('../img/logo_netflix.png')}  />,
	headerRight: <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
					<TouchableOpacity underlayColor="#efefef" onPress={()=>navigation.navigate('Login')}>
					<Text style={{marginRight: 20, color: "#000", fontWeight: '400'}}>ENTRAR</Text>
					</TouchableOpacity >
					<Text style={{marginRight: 10, color: "#000", fontWeight: '400'}}> AJUDA</Text>
				</View>
});

state = {
	data: [],
	page: 1,
	loading: false
}

componentDidMount() {
	this.loadMovies();
}

loadMovies = async () => {
	if (this.state.loading) return;

	const { page } = this.state;
	this.setState({ loading: true });

	const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=rock&api_key=${api_key}&page=${page}&language=pt-BR`);
	const movies = await response.json();
	this.setState({
		//spread - espalha os arrays 
		data: [...this.state.data, ...movies.results],
		page: page + 1,
		loading: false
	})

}

getDetach = ({ item }) => {
	const movie = this.state.data.item;
	console.log(item)
}

_renderItem = ({ item }) => {

	const movie = this.state.data.item;
	
	const invertDate = item.release_date.split('-').reverse().join('/')
	const base_url = 'https://image.tmdb.org/t/p/original';
	const thumb = 'https://image.tmdb.org/t/p/w500';

	if( item.id == '457854' ){
		
		return (
			<View key={item.id} style={styles.containerDetach}>
				<TouchableOpacity 
					onPress={()=>this._onItemPress(item)}
					>
					<Image style={styles.imgDetach} source={{ uri: base_url + item.poster_path }} />
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<Text style={styles.titleDetach}>{item.title}</Text>
						<Text style={styles.dataDetach}>{invertDate}</Text>
					</View>
					<Text style={styles.descDetach}>{item.overview}</Text>
				</TouchableOpacity>
			</View>
		)

	} else {

		return  (
			<View key={item.id} style={styles.container}>
				<TouchableOpacity 
					onPress={()=>this._onItemPress(item)}
					>
					<View key={item.id} style={styles.content}>
						<Image style={styles.img} source={{ uri: thumb + item.poster_path }} />
						<View>
							<Text style={styles.titles}>{item.title}</Text>
							<Text style={styles.data}>{invertDate}</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		)

	}

}//close _renderItem

_onItemPress = (item) => {
	this.props.navigation.navigate('Details', { item: item })
} 

renderFooter = () => {
	if (!this.state.loading) return null;
	return (
		<View style={styles.loading}>
			<ActivityIndicator size='large' />
		</View>
	);
};

render() {
	const movie = this.state.data.item;
	return (
		<FlatList
			data={this.state.data}
			renderItem={ this._renderItem }
			keyExtractor={ item => item.id }
			onEndReached={ this.loadMovies }
  			onEndReachedThreshold={0.1}
			ListFooterComponent={this.renderFooter}
		/>
	);
}

}//close class

const styles = StyleSheet.create({
container: { 
	flex: 1, 
	alignItems: 'center', 
	justifyContent: 'flex-start', 
	backgroundColor: '#333', 
	flexDirection: 'row', 
	padding: 5, 
	borderBottomColor: '#555', 
	borderWidth: 1 
},
content: { 
	flex: 1, 
	alignItems: 'center', 
	justifyContent: 'flex-start', 
	flexDirection: 'row', 
	padding: 5, 
	borderBottomColor: '#444' 
},
logo: { 
	width: 100, 
	height: 50, 
	justifyContent: 'flex-start' 
},
img: { 
	width: 100, 
	height: 100, 
	justifyContent: 'flex-start', 
	padding: 10 
},
titles: { 
	color: '#fff', 
	fontSize: 18, 
	fontWeight: '600', 
	padding: 10 
},
data: { 
	color: '#ccc', 
	fontSize: 12, 
	padding: 10 
},
loading: {
	alignItems: 'center',
	backgroundColor: '#333',
},  

containerDetach: { flex: 1, justifyContent: 'center', alignItems: 'stretch', backgroundColor: '#111' },
imgDetach: { 
	flex: 2, 
	width: Dimensions.get('window').width, 
    height: (Dimensions.get('window').height) / 1.5, 
	alignItems: 'stretch', 
	justifyContent: 'center', 
	padding: 5 
},
dataDetach: { color: '#ccc', fontSize: 12, alignItems: 'center', padding: 20 },
titleDetach: { color: '#fff', fontSize: 18, alignItems: 'center', padding: 20 },
descDetach: { color: '#fff', fontSize: 12, padding: 20 }

});