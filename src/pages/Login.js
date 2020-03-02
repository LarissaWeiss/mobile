import React, { useState, useEffect } from 'react'
import { View, Image, AsyncStorage, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import logo from '../assets/logo.png'
import api from '../services/api'

export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [techs, setTechs] = useState('')

    // recebe dois parametros, 1° uma função do que se quer executar
    // 2° array de dependencias de quando se executa a função
    // se array vazio executa só uma vez no inicio
    useEffect(()=> {
        AsyncStorage.getItem('user').then(user =>{
            if(user){
                navigation.navigate('List')
            }
        })
    }, [])
    async function handleSubmit(){
        const response = await api.post('/sessions', {
            email,
        })

        const { _id } = response.data
        
        await AsyncStorage.setItem('user', _id)
        await AsyncStorage.setItem('techs', techs)

        navigation.navigate('List')
    }    
    
    return(
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior='padding' style={styles.container}>
            <Image source={logo} />

            <View style={styles.form}>
                 <Text style={styles.label}>SEU E-MAIL *</Text>  
                 <TextInput
                    style={styles.input}
                    //text padrão antes de digitar
                    placeholder= 'Seu e-mail'
                    placeholderTextColor="#999"
                    //incluir @ no teclado para entrada de dados
                    keyboardType="email-address"
                    //sempre minusculo 
                    autoCapitalize="none"
                    //corretor
                    autoCorrect={false}
                    value={email}
                    //onChangeText ={ text => setEmail(text)}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>TECNOLOGIAS*</Text>  
                <TextInput
                    style={styles.input}
                    placeholder="Tecnologias do seu interesse"
                    placeholderTextColor="#999"
                    //primeira letra de cada palavra maiuscula
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />
                
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}> Encontrar Spots</Text>
                </TouchableOpacity>
            </View>
                
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    form:{
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop:20
    },

    input:{
        borderWidth:1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom:20,
        borderRadius:2
        
    },

    button: {
        height:42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2       
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})