import React, { useState, useEffect }from 'react'
//adicionar a propriedade 'navigation' em qualquer componente q n seja pagina
import { withNavigation} from 'react-navigation'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import api from '../services/api'

//export default function SpotList({tech}){ export vai para o fim
function SpotList({tech, navigation}){
    const [spots, setSpots] = useState([])
    useEffect(() => {
       async function loadSpots() {
           const response = await api.get('/spots',{
               params: {tech}
           })
           setSpots(response.data)
       }

       loadSpots()
    }, [])  

    function handleNavigate(id){
        navigation.navigate('Book', { id })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
            <FlatList 
                style= {styles.list}
                //array de informações dentro do spots
                data={spots}
                //uma função que recebe outra e recebe os itens dos spots 
                //e devolve a informação unica
                keyExtractor={spot => spot._id}
                horizontal
                //não mostrar barra de rolagem
                showsHorizontalScrollIndicator={false}
                //como deve se comportar para mostrar os itens
                renderItem={({ item })=> (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={ {uri: item.thumbnail_url} }/>
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : "GRATUITO" }</Text>
                        <TouchableOpacity onPress={() => handleNavigate(item.id)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
            )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },

    bold: {
        fontWeight: 'bold'
    },
    
    list: {
        paddingHorizontal: 20
    }, 

    listItem: {
        marginRight: 15
    },

    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius:8
    },

    company: {
        fontSize: 24,
        fontWeight:'bold',
        color: '#333',
        marginTop: 10
    },

    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },

    button: {
        height:32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2 ,     
        marginTop: 15
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
})

export default withNavigation(SpotList);