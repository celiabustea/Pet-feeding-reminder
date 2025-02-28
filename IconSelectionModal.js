import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Modal, Button } from 'react-native';

export default function IconSelectionModal({ visible, onClose, icons, onSelectIcon }) {
    const [tempSelectedIcon, setTempSelectedIcon] = useState(null);

    const handleSave = () => {
        if (tempSelectedIcon) {
            onSelectIcon(tempSelectedIcon);
            onClose();
        } else {
            alert('Please select an icon before saving.');
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Select a Cat Icon</Text>
                <FlatList
                    data={icons}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => setTempSelectedIcon(item)}>
                            <Image
                                source={item}
                                style={[
                                    styles.iconPreview,
                                    tempSelectedIcon === item && styles.selectedIconStyle,
                                ]}
                            />
                        </TouchableOpacity>
                    )}
                    numColumns={3}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Cancel" onPress={onClose} color="red" />
                    <Button title="Save" onPress={handleSave} color="#4CAF50" />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    iconPreview: {
        width: 60,
        height: 60,
        margin: 10,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedIconStyle: {
        borderColor: '#4CAF50',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
});
