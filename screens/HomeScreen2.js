import {
    Platform,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'

export default function App() {

    const email = auth.currentUser?.email
    var name = email.replace(/@.*$/, "");


    const navigation = useNavigation()

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                navigation.replace('Login')
            })
            .catch(err => alert(err.message))
    }

    const [task, setTask] = useState('')
    const [error, setError] = useState('')
    const [load, setLoading] = useState(true)
    const [todoList, setTodoList] = useState([])

    useEffect(() => {
        axios.post('', { name })
            .then(res => {
                setTodoList(res.data)
                setLoading(false)
            })
            .catch(err => alert(err.message))
    }, [])

    const addData = () => {
        if (task === '') {
            setError('* Please fill the above filled *')
        }

        else {
            axios.post('', { activity: task, name: name })
                .then((response) => {
                    setTodoList(response.data)
                })
                .catch((err) => {
                    alert(err.message)
                })

            setError('')
            setTask('')
        }

    }

    const deleteData = (id) => {
        axios.post('', { id, name })
            .then((response) => {
                setTodoList(response.data)
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    return (
        <SafeAreaView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >

            <View style={styles.top}>
                <Text style={styles.heading}>{name}'s Todo</Text>
                <TouchableOpacity
                    onPress={handleSignOut}
                >
                    <Image style={styles.img2} source={require('../assets/signout.png')} />
                </TouchableOpacity>
            </View>

            <View style={styles.mid}>
                <ScrollView>

                    {/* <Text>Hello</Text> */}
                    {
                        load ? <View style={styles.loading}>
                            <Text style={styles.load}>Loading....</Text>
                        </View> :
                        todoList.length === 0 ? <View style={styles.loading}>
                        <Text style={styles.load}>No Todos currently</Text>
                    </View> : 
                            todoList.map((todo) => {
                                return (
                                    <View key={todo._id} style={styles.taskArea}>
                                        <Text>{todo.activity}</Text>
                                        <View onStartShouldSetResponder={() => deleteData(todo._id)}>
                                            <Image style={styles.img} source={require('../assets/bin.png')} />
                                        </View>
                                    </View>
                                )
                            })
                    }
                </ScrollView>
            </View>

            <KeyboardAvoidingView behavior='height' style={styles.bottom}>
                <View style={styles.textArea}>
                    <TextInput style={styles.textInput} placeholder='task' value={task} onChangeText={text => setTask(text)}></TextInput>
                    <View onStartShouldSetResponder={addData}>
                        <Image style={styles.img} source={require('../assets/create.png')} />
                    </View>
                </View>
                <Text style={styles.error}>{error}</Text>
            </KeyboardAvoidingView>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'dodgerblue'
    },
    loading: {
        alignItems: 'center',
    },
    load: {
        fontSize: 18,
        color: 'dodgerblue'
    },
    top: {
        backgroundColor: '#fff',
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    mid: {
        flex: 9,
        width: '90%',
        paddingVertical: 20,
    },
    bottom: {
        flex: 1,
        width: '100%',
    },
    error: {
        color: 'dodgerblue',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    img: {
        width: 20,
        height: 20
    },
    img2: {
        width: 30,
        height: 30
    },
    textArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        backgroundColor: '#fff',
        height: 50,
        alignItems: 'center',
        borderRadius: 5
    },
    textInput: {
        width: '90%',
    },
    taskArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        backgroundColor: "#fff",
        padding: 15,
    },
});
