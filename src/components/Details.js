import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

class Details extends Component {
  constructor(props){
    super(props)
    
  }

  componentDidMount(){
    this.props.navigation
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle: { backgroundColor: '#000' },
    headerTintColor: '#fff',
    headerTitle: <Image style={styles.logo} source={require('../img/logo_netflix.png')}  />,
    headerRight: <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                  <TouchableOpacity underlayColor="#efefef" onPress={()=>navigation.navigate('Login')}>
                    <Text style={{marginRight: 20, color: "#000", fontWeight: '400'}}>ENTRAR</Text>
                  </TouchableOpacity >
                  <Text style={{marginRight: 10, color: "#fff", fontWeight: '400'}}> AJUDA</Text>
                </View>
  });

  render() {
	const params = this.props.navigation.state.params.item;  
	//console.log(params) 
	
  //invert date
  const invertDate = params.release_date.split('-').reverse().join('/')
  const base_url = 'https://image.tmdb.org/t/p/original'

	
    return (
      
		<View key={params.id} style={styles.containerDetach}>
			<ScrollView>
        <View style={styles.spaceTop}></View>
				<Image style={styles.imgDetach} source={{ uri: base_url + params.poster_path }} />
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<Text style={styles.titleDetach}>{params.title}</Text>
					<Text style={styles.dataDetach}>{invertDate}</Text>
				</View>
				<Text style={styles.descriptionDetach}>{params.overview}</Text>
			</ScrollView>
		</View>
        
    ); 
    
  }//close render 

}//clase class

const styles = StyleSheet.create({
  containerDetach: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'stretch', 
    backgroundColor: '#111' 
  },
  imgDetach: { 
    flex: 2, height: 300, 
    width: Dimensions.get('window').width, 
    height: (Dimensions.get('window').height) / 1.5,
    alignItems: 'stretch', 
    justifyContent: 'center', 
    padding: 5 
  },
  dataDetach: { 
    color: '#ccc', 
  fontSize: 12, 
  alignItems: 'flex-end', 
  padding: 20 
},
  titleDetach: { 
    color: '#fff', 
    fontSize: 18, 
    alignItems: 'flex-start', 
    fontWeight: '600', 
    padding: 20 
  },
  descriptionDetach: { 
    color: '#fff', 
    fontSize: 16, 
    padding: 20, 
    marginHorizontal: 5 
  },
  details: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  logo: { 
    width: 100, 
    height: 50, 
    justifyContent: 'flex-start' 
  },
  spaceTop: { height: 10 }
});

export default Details;