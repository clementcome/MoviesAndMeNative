import React from 'react';
import {StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native';
import FilmItem from "./FilmItem"
import films from "../Helpers/filmsData"
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi"
import { connect } from 'react-redux'
import FilmList from './FilmList'

const styles = StyleSheet.create({
    main_container: {
        flex:1,
    },
    textinput:{
        margin: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: "absolute",
        left: 0,
        right:0,
        top: 100,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    }
})

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.searchedText = ""
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            isLoading: false,
            error: false
        }
        this._loadfilms = this._loadfilms.bind(this)
    }

    _loadfilms() {
        this.setState({ isLoading: true, error: false })
        if (this.searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1)
                .then(data => {
                    this.page = data.page
                    this.totalPages = data.total_pages
                    this.setState({
                        films: [...this.state.films, ...data.results ],
                        isLoading: false
                    })
                })
                .catch((err) => {
                    console.error(err)
                    this.setState({
                        isLoading: false,
                        error: true
                    })
                })
        }
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        }, () => this._loadfilms())
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container} >
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _displayError() {
        if (this.state.error) {
            return (
                <View>
                    <Text>Research resulted in an error</Text>
                </View>
            )
        }
    }

    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    }

    render() {
        return (
            <View style= {styles.main_container}>
                <TextInput 
                    style={styles.textinput}
                    placeholder="Titre du film"
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing = {() => this._searchFilms()}
                />
                <Button style={{ height: 50 }} title="Rechercher" onPress={() => {this._searchFilms()}}/>
                <FilmList
                    films={this.state.films}
                    navigation={this.props.navigation}
                    loadFilms={this._loadfilms}
                    page={this.page}
                    totalPages={this.totalPages}
                    favoriteList={false}
                />
                {this._displayLoading()}
                {this._displayError()}
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}

export default connect(mapStateToProps)(Search)