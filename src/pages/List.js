import React, {useState, useEffect} from 'react'
import socketio from 'socket.io-client'
import { SafeAreaView, StyleSheet, Image, AsyncStorage, ScrollView, Alert } from 'react-native'
import SpotList from '../components/SpotList'
import logo from '../assets/logo.png'

export default function List() {
    const [techs, setTechs] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://localhost:3333', {
                query: {user_id}
            })
            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA' }`)
            })
        })
    }, [])

    useEffect(()=> {
        AsyncStorage.getItem('techs').then(storageTechs => {
            //split(',') corta em todo lugar que contenha ,
            //map(tech => tech.trim()) pega cada uma das pos e tira os espaços antes e depois
            const techsArray = storageTechs.split(',').map(tech => tech.trim())

            setTechs(techsArray)
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <ScrollView>
              {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    
    logo:{
        height: 32,
        // redimencionamento de imagem para nao cortar
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 10
    },
})