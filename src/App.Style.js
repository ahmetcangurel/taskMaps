import { Position } from 'monaco-editor'
import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mapView: {
        flex: 1
    },
    button: {
        height: 30,
        backgroundColor: '#33ccff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomSheetContainer: {
        padding: 20,
    },
    adressSubTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    adressDescription: {
        fontSize: 14,
        fontWeight: '600',
        marginVertical: 8,
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: 'gray',
        marginVertical: 10,
    },
})