import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';


class Details extends React.Component {
  constructor(props){
    super(props)
    
  }


  componentDidMount(){
    console.log(this.props.navigation)
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
    const params = this.props.navigation.state.params;   
    //invert a data
    const invertDate = params.item.release_date.split('-').reverse().join('/')
    const baseUrl = 'https://image.tmdb.org/t/p/original';
    return (
      
        <View key={params.item.id} style={styles.containerDestaque}>
        <ScrollView>
              <Image style={styles.imgDestaque} source={{ uri: baseUrl + params.item.poster_path }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.titDestaque}>{params.item.title}</Text>
                <Text style={styles.dataDestaque}>{invertDate}</Text>
              </View>
              <Text style={styles.desc}>{params.item.overview}</Text>
          </ScrollView>
        </View>
        
    ); 
    
  }//close render 

}//clase class

const styles = StyleSheet.create({
  containerDestaque: { flex: 1, justifyContent: 'center', alignItems: 'stretch', backgroundColor: '#111' },
  imgDestaque: { flex: 2, height: 300, width: 500, alignItems: 'stretch', justifyContent: 'center', padding: 5 },
  dataDestaque: { color: '#ccc', fontSize: 12, alignItems: 'flex-end', padding: 10 },
  titDestaque: { color: '#fff', fontSize: 18, fontWeight: '600', paddingLeft: 20 },
  desc: { color: '#fff', fontSize: 16, padding: 20 },
  details: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 100, height: 50, justifyContent: 'flex-start' }
});

export default Details;