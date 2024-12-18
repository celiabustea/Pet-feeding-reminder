import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function RemoveCatModal({ visible, onClose, onRemoveCat, catToRemove, setCatToRemove }) {
    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <Animatable.Text animation="fadeIn" duration={500} style={styles.modalTitle}>
                    Remove a Cat
                </Animatable.Text>

                <Animatable.View animation="fadeInUp" duration={600} delay={200} style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Cat Name"
                        value={catToRemove}
                        onChangeText={setCatToRemove}
                    />
                </Animatable.View>

                <Animatable.View animation="fadeInUp" duration={600} delay={400} style={styles.buttonContainer}>
                    <Button title="Remove Cat" onPress={onRemoveCat} />
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});
