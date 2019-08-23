import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'
import New from '../Components/New'
import HistoryList from '../Components/HistoryList'

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: "Rechercher"
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions: {
            title: "Détails"
        }
    }
})

const FavoritesStackNavigator = createStackNavigator({
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            title: "Favoris"
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions: {
            title: "Détails"
        }
    }
})

const NewStackNavigator = createStackNavigator({
    New: {
        screen: New,
        navigationOptions: {
            title: "Nouveautés"
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions: {
            title: "Détails"
        }
    }
})

const HistoryStackNavigator = createStackNavigator({
    History: {
        screen: HistoryList,
        navigationOptions: {
            title: "Mes Films Vus"
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions: {
            title: "Détails"
        }
    }
})

const MoviesTabNavigator = createBottomTabNavigator({
    Search: {
        screen: SearchStackNavigator,
        navigationOptions:{
            tabBarIcon: () => {
                return <Image style={styles.icon} source={require('../Images/ic_search.png')} />
            }
        }
    },
    Favorites: {
        screen: FavoritesStackNavigator,
        navigationOptions:{
            tabBarIcon: () => {
                return <Image style={styles.icon} source={require('../Images/ic_favorite.png')} />
            }
        }
    },
    New: {
        screen: NewStackNavigator,
        navigationOptions:{
            tabBarIcon: () => {
                return <Image style={styles.icon} source={require('../Images/ic_fiber_new.png')} />
            }
        }
    },
    History: {
        screen: HistoryStackNavigator,
        navigationOptions:{
            tabBarIcon: () => {
                return <Image style={styles.icon} source={require('../Images/ic_history.png')} />
            }
        }
    }
},{
    tabBarOptions:{
        activeBackgroundColor: '#DDDDDD',
        inactiveBackgroundColor: '#FFFFFF',
        showLabel:false,
        showIcon: true,
    }
})

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default createAppContainer(MoviesTabNavigator)