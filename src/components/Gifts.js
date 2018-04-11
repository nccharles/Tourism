import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { Ionicons, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import styles from './styles/GiftStyles'
import { Colors } from '../Themes'
export default class Gifts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const { page, seed } = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        this.setState({ loading: true });
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res.results : [...this.state.data, ...res.results],
                    error: res.error || null,
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
    ViewBarber(street,city,email,phone,cell,large,medium){
        this.props.history.push('details',{
            street: street,
            city: city,
            email: email,
            phone: phone,
            cell: cell,
            large: large,
            medium: medium
        })
      }
    render() {
        return (
            <View style={styles.container}>
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
                                            <Text style={{ fontWeight: '900' }}>{`${item.location.city} ${item.location.street}`}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image source={{ uri: item.picture.large }} style={{ height: 200, borderRadius: 0, width: null, flex: 1 }} />
                                </CardItem>
                                <CardItem style={styles.VoucherBody}>
                                    <TouchableOpacity activeOpacity={.5} onPress={this.ViewBarber.bind(this, 
                                        item.location.street,
                                        item.location.city,
                                        item.email,
                                        item.phone,
                                        item.cell,
                                        item.picture.large,
                                        item.picture.medium)}>
                                        <View style={styles.button}>
                                            <Text style={styles.buttonText}>Book now</Text>
                                        </View>
                                    </TouchableOpacity>
                                </CardItem>
                            </Card>
                        )}
                        keyExtractor={item => item.email}
                        ListFooterComponent={this.renderFooter}
                    />
                </List>
            </View>
        );
    }
}
