import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import HistoryItem from './HistoryItem'
import { connect } from 'react-redux'

class HistoryList extends React.Component {
    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    }

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.filmHistory}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <HistoryItem
                    film={item}
                    displayDetailForFilm={this._displayDetailForFilm} />}
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex:1
    }
})

const mapStateToProps = (state) => {
    return {
        filmHistory: state.toggleHistory.filmHistory
    }
}

export default connect(mapStateToProps)(HistoryList)