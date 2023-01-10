import { StyleSheet, View, Text, Modal, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';

const ConverterFrom = (props) => {

    const renderItem = ({ item }) => (
        <TouchableOpacity on onPress={() => props.handleTouchPress("from", item.currency)} style={styles.flatListItem}>
            <Text style={styles.itemText}>{item.currency}</Text>
            <Image style={styles.imageRight} source={item.icon}/>
        </TouchableOpacity>
    );

    return(
        <View style={[styles.inputItem, styles.shadow]}>
            <TextInput keyboardType='numeric' onChangeText={props.handleAmount} style={styles.textInput} placeholder='100'/>
            <TouchableOpacity style={styles.modal} onPress={() => props.handleVisibility('from')}>
                <Text style={styles.touchableText}>{props.currentValue}</Text>
                <Image style={styles.image} source={require("../assets/dropdown-icon.png")}/>
            </TouchableOpacity>

            <Modal animationType="fade" transparent={false} visible={props.visibility}>
                <View style={styles.openModal}>
                    <FlatList style={styles.flatList} data={props.currencies} renderItem={renderItem} key={props.currencies.currency}/>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    inputItem: {
        margin: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 25,
        borderRadius: 20,
        marginVertical: 10,
        backgroundColor: 'white'
    },
    shadow : {
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    modal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingLeft: 12,
        borderLeftWidth: 1,
        borderLeftColor: '#d9e0f1',
    },
    image: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#f3a232',
        backgroundColor: '#f3a232',
        tintColor: 'white'
    },
    imageRight: {
        width: 15,
        height: 15,
        borderRadius: 100,
    },
    touchableText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 15,
        color: '#3c3372',
    },
    textInput: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 12,
        color: '#3c3372',
        width: '55%',
    },
    openModal: {
        alignItems: 'center',
        height: '100%',
    },
    flatList: {
        width: '70%'
    },
    flatListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        paddingTop: 10,
    },
    itemText: {
        color: '#3c3372',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 20
    }
})

export default ConverterFrom;