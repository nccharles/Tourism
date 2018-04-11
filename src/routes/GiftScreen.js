import React, { Component } from 'react';
import { View, Text,Image,ScrollView ,FlatList, ActivityIndicator, TouchableOpacity,AsyncStorage} from 'react-native';
import { Ionicons, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { List, ListItem, SearchBar } from "react-native-elements";
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import GiftTitle from '../components/GiftTitle' 
import styles from './Styles/GiftScreenStyle'
import { Colors } from '../Themes'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TOKEN_KEY, USER_ID,USER_EMAIL,USER_NAME } from '../constants';

class GiftScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loading: false,
        data: [],
        page: 1,
        seed: 1,
        error: null,
        refreshing: false,
        Username: ''
    };
}

componentDidMount = async () =>  {
    this.setState({
    Username: await AsyncStorage.getItem(USER_NAME)
    })
    this.makeRemoteRequest();
}

makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `http://abienarts.com/api/barberapi.php`;
        this.setState({ loading: true });
        fetch(url)
          .then(res => res.json())
          .then(responseJson => {
            this.setState({
              data: responseJson,
              error: responseJson.error || null,
              loading: false,
              refreshing: false
            });
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
      };
  
renderSeparator = () => {
    return (
        <View
            style={{
                height: 1,
                width: "86%",
                backgroundColor: Colors.fire,
                marginLeft: "14%"
            }}
        />
    )
}
renderHeader = () => {
    return <SearchBar placeholder="Type here..." showLoadingIcon lightTheme round />;
}
renderFooter = () => {
    if (!this.state.loading) return null;
    return (
        <View
            style={{
                paddingVertical: 20,
                borderTopWidth: 1,
                backgroundColor: Colors.fire,
            }}
        >
            <ActivityIndicator animating size="large" />
        </View>
    )
}
ViewBarber(bname,bcity,bemail,bphone,bcell,bprice,bbackground,bimage){
  this.props.navigation.navigate('details',{
        name: bname,
        city: bcity,
        email: bemail,
        phone: bphone,
        cell: bcell,
        price: bprice,
        background: bbackground,
        image: bimage
    })
  }
  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
       <View style={styles.headerWrap}>
            <View style={styles.iconHeaderWrap}>
            <TouchableOpacity >
            <Ionicons style={styles.inputHeaderIcon}
                  name="md-bookmarks" size={32} color='grey'/>
            </TouchableOpacity>
            </View>
            <View style={styles.iconHeaderWrap}>
            <Text>Help</Text>
            </View>
          </View> 
          <View style={styles.BodyGift}>
                 <Text style={styles.giftTitle}>Welcome, {this.state.Username}</Text>
                 <Text>You received 5 gift cards from your friend </Text>
                 <Text style={{color: '#a29bfe'}}>Patrick Coela!</Text>
             </View>
          <List
                    containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
                >
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <Card>
                                <CardItem>
                                    <Left>
                                        <Body>
                                            <Text style={{ fontWeight: '900' }}>{`${item.bname} -${item.bcity}`}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image source={{ uri: item.bimage }} style={{ height: 200, borderRadius: 0, width: null, flex: 1 }} />
                                </CardItem>
                                <CardItem style={styles.VoucherBody}>
                                    <TouchableOpacity activeOpacity={.5} onPress={this.ViewBarber.bind(this, 
                                        item.bname,
                                        item.bcity,
                                        item.bemail,
                                        item.bphone,
                                        item.bcell,
                                        item.bprice,
                                        item.bbackground,
                                        item.bimage)}>
                                        <View style={styles.button}>
                                            <Text style={styles.buttonText}>Book now</Text>
                                        </View>
                                    </TouchableOpacity>
                                </CardItem>
                            </Card>
                        )}
                        keyExtractor={item => item.bid}
                        ListFooterComponent={this.renderFooter}
                    />
                </List>
      </View>
      </ScrollView>
    );
  }
}


// const findCurrentUser = gql`
//     query($id: String){
//         User(id: "cjfmgcqk6l5of0158juegzsrw"){
//             name
//         }
//     }
// `

export default GiftScreen;
