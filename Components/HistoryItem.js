import React from 'react';
import moment from 'moment'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getImageFromApi } from '../API/TMDBApi'
import FadeIn from '../Animations/FadeIn'

class HistoryItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: true
        }
    }

    _displayInfo() {
        const { film } = this.props
        const text = (this.state.title ? film.title : "Sorti le " + moment(new Date(film.release_date)).format('DD/MM/YYYY'))
        return (
            <Text style={styles.info}>{text}</Text>
        )
    }

    _changeInfo() {
        this.setState({ title: !this.state.title })
    }

    render() {
        const { film, displayDetailForFilm } = this.props
        return (
            <FadeIn>
                <TouchableOpacity 
                    style={styles.item_container}
                    onPress={() => displayDetailForFilm(film.id)}
                    onLongPress={() => this._changeInfo()}>
                    <View style={styles.image_container}>
                        <Image style= {styles.image} source={{ uri: getImageFromApi(film.poster_path) }}></Image>
                    </View>
                    {this._displayInfo()}
                </TouchableOpacity>
            </FadeIn>
        )
    }
}

const styles = StyleSheet.create({
    item_container: {
        margin: 5,
        padding: 5,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0"
    },
    image_container: {
        flex: 1
    },
    image: {
        width: 100,
        height: 100,
        borderRadius:50
    },
    info: {
        color: "gray",
        fontSize: 20,
        flexWrap: "wrap",
        margin: 10,
        flex: 2
    }
})

export default HistoryItem