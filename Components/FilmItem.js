import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getImageFromApi } from '../API/TMDBApi'
import FadeIn from '../Animations/FadeIn'

const styles = StyleSheet.create({
    item_container:{
        margin: 5,
        padding: 5,
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#f0f0f0"
    },
    image: {
        flex: 1,
        height: 190,
        backgroundColor: "gray"
    },
    content: {
        flex: 2,
        margin: 5
    },
    header: {
        flex: 3,
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        flex: 4,
        fontSize:16,
        fontWeight: "bold",
        flexWrap: "wrap"
    },
    rating: {
        flex:1,
        fontSize: 25
    },
    description: {
        flex:7,
        fontStyle: "italic",
        color: "grey"
    },
    date_container: {
        flex:1
    },
    date: {
        flex:1,
        textAlign: "right",
        fontSize: 14
    },
    favorite: {
        width: 30,
        height: 30
    }
})

class FilmItem extends React.Component {

    _displayFavoriteImage() {
        if (this.props.isFilmFavorite) {
            const sourceImage = require('../Images/ic_favorite.png')
            return <Image style={styles.favorite} source={sourceImage} />
        }
    }

    render() {
        const { film, displayDetailForFilm } = this.props
        return (
            <FadeIn>
                <TouchableOpacity 
                    style={styles.item_container}
                    onPress={() => displayDetailForFilm(film.id)}>
                    <Image style= {styles.image} source={{ uri: getImageFromApi(film.poster_path) }}></Image>
                    <View style = {styles.content}>
                        <View style={styles.header}>
                            {this._displayFavoriteImage()}
                            <Text style={styles.title}>{film.title}</Text>
                            <Text style={styles.rating}>{film.vote_average}</Text>
                        </View>
                        <Text style={styles.description} numberOfLines={6}>{film.overview}</Text>
                        <View style={styles.date_container}>
                            <Text style={styles.date}>Sorti le {film.release_date}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </FadeIn>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default FilmItem