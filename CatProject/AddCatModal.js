import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function AddCatModal({
                                        visible,
                                        onClose,
                                        onAddCat,
                                        setCatName,
                                        setCatFood,
                                        setFeedingTimes,
                                        feedingTimes,
                                        catName,
                                        catFood,
                                        selectedIcon,
                                        onIconSelect,
                                    }) {
    const [catBirthday, setCatBirthday] = useState(''); // New state for birthday

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <Animatable.Text animation="fadeIn" duration={500} style={styles.modalTitle}>
                    Add a Cat 🐱
                </Animatable.Text>

                <Animatable.View animation="fadeInUp" duration={600} delay={200} style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Cat Name"
                        value={catName}
                        onChangeText={setCatName}
                    />
                </Animatable.View>

                <Animatable.View animation="fadeInUp" duration={600} delay={400} style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type of Food"
                        value={catFood}
                        onChangeText={setCatFood}
                    />
                </Animatable.View>

                <Animatable.View animation="fadeInUp" duration={600} delay={600} style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Feeding Times (comma separated)"
                        value={feedingTimes.join(', ')}
                        onChangeText={(text) => setFeedingTimes(text.split(',').map((time) => time.trim()))}
                    />
                </Animatable.View>

                <Animatable.View animation="fadeInUp" duration={600} delay={800} style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Cat's Birthday (MM/DD/YYYY)"
                        value={catBirthday}
                        onChangeText={setCatBirthday}
                    />
                </Animatable.View>

                <Animatable.View animation="fadeInUp" duration={600} delay={1000} style={styles.inputContainer}>
                    <TouchableOpacity style={styles.iconButton} onPress={onIconSelect}>
                        <Text style={styles.iconButtonText}>
                            {selectedIcon ? 'Change Icon' : 'Select Icon'}
                        </Text>
                    </TouchableOpacity>
                    {selectedIcon && <Image source={selectedIcon} style={styles.selectedIcon} />}
                </Animatable.View>

                <Animatable.View animation="fadeInUp" duration={600} delay={1200} style={styles.buttonContainer}>
                    <Button title="Add Cat" onPress={() => onAddCat(catName, catFood, feedingTimes, selectedIcon, catBirthday)} />
                    <Button title="Cancel" onPress={onClose} color="red" />
                </Animatable.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    inputContainer: {
        width: '90%',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
    },
    iconButton: {
        backgroundColor: '#FFDEE9',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
        alignItems: 'center',
    },
    iconButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedIcon: {
        width: 50,
        height: 50,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});
