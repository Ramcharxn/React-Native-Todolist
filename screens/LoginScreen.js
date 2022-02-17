import {
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Text,
    TextInput,
    View,
    Platform,
    Button,
    Linking,
    Image
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
    console.log('app running')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace('Home')
            }
        })

        return unsubscribe
    }, [])

    const handleSinUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(usersCredentials => {
                const user = usersCredentials.user;
            })
            .catch((err) => alert(err.message))
    }

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(usersCredentials => {
                const user = usersCredentials.user;
            })
            .catch((err) => alert(err.message))
    }

    return (
        <SafeAreaView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.top}>
                <View style={styles.heading}>
                <Image resizeMode='contain' style={styles.logo} source={require('../assets/r.png')}/>
                <Text style={styles.todo}>Todo</Text>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText} >Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSinUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText} >Register</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.bottom}>
                <Button 
                    style={styles.but}
                    title="get in touch"
                    onPress={() => Linking.openURL("https://ramcharan.netlify.app/")}
                />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    top: {
        position: 'absolute',
        top: 0,
        height: 50,
        width: '100%',
        paddingLeft: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    heading:{
        width: 60,
        justifyContent:'center',
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginLeft: 10,
    },
    logo: {
        width: 25,
        height: 25,
        marginRight: 2
    },
    todo:{
        fontSize: 18,
        color: '#0066FF',
    },
    bottom: {
        height: 50,
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    but:{
        justifyContent:'center',
        alignItems:'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#0782f9',
        width: '100%',
        padding: 15,
        borderRadius: 10
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782f9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782f9',
        fontWeight: '700',
        fontSize: 16,

    },
})