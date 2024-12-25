import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const EditCatModal = ({ visible, onClose, onEditCat, cat, icons = [] }) => {
    const [catName, setCatName] = useState(cat?.name || '');
    const [catFood, setCatFood] = useState(cat?.food || '');
    const [feedingTimes, setFeedingTimes] = useState(cat?.times || []);
    const [events, setEvents] = useState(cat?.events || []);
    const [newEvent, setNewEvent] = useState('');
    const [selectedIcon, setSelectedIcon] = useState(cat?.icon || null);

    const [showIconPicker, setShowIconPicker] = useState(false); // To toggle the icon picker visibility

    useEffect(() => {
        if (cat) {
            setCatName(cat.name);
            setCatFood(cat.food);
            setFeedingTimes(cat.times);
            setEvents(cat.events || []); // Ensure events is always an array
            setSelectedIcon(cat.icon);
        }
    }, [cat]);

    const handleSave = () => {
        if (catName && catFood && feedingTimes.length > 0 && selectedIcon) {
            const updatedCat = {
                ...cat,
                name: catName,
                food: catFood,
                times: feedingTimes,
                events: events,
                icon: selectedIcon,
            };
            onEditCat(updatedCat); // Pass the updated cat to the parent
            onClose(); // Close the modal after saving
        } else {
            alert('Please fill in all fields and select an icon.');
        }
    };
    const handleDeleteEvent = (index) => {
        const updatedEvents = events.filter((_, i) => i !== index);
        setEvents(updatedEvents);
    };

    const handleAddEvent = () => {
        if (newEvent.trim()) {
            setEvents([...events, newEvent]);
            setNewEvent(''); // Clear the input field after adding
        }
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                        <Text style={styles.modalTitle}>Edit Cat Profile</Text>

                        {/* Cat Icon Selection */}
                        <View style={styles.iconSelectionContainer}>
                            <Text style={styles.iconLabel}>Select Cat Icon</Text>
                            <TouchableOpacity onPress={() => setShowIconPicker(true)}>
                                {selectedIcon ? (
                                    <Image source={selectedIcon} style={styles.profileImage} />
                                ) : (
                                    <Text style={styles.noImageText}>No Image Selected</Text>
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Icon Picker Modal */}
                        {showIconPicker && (
                            <View style={styles.iconPickerContainer}>
                                <Text style={styles.iconPickerTitle}>Choose an Icon</Text>
                                <ScrollView horizontal contentContainerStyle={styles.iconScroll}>
                                    {icons.map((icon, index) => (
                                        <TouchableOpacity key={index} onPress={() => {
                                            setSelectedIcon(icon);
                                            setShowIconPicker(false); // Close picker after selecting
                                        }}>
                                            <Image source={icon} style={styles.icon} />
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                <TouchableOpacity
                                    style={styles.closeIconPickerButton}
                                    onPress={() => setShowIconPicker(false)}
                                >
                                    <Text style={styles.closeButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* Cat Name */}
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Cat Name"
                            value={catName}
                            onChangeText={setCatName}
                            multiline={false}
                        />

                        {/* Cat Food */}
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Cat Food"
                            value={catFood}
                            onChangeText={setCatFood}
                        />

                        {/* Feeding Times */}
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Feeding Times (comma separated)"
                            value={feedingTimes.join(', ')}
                            onChangeText={(text) => setFeedingTimes(text.split(',').map((time) => time.trim()))}
                        />

                        {/* Add Event */}
                        <TextInput
                            style={styles.input}
                            placeholder="Add Event (e.g., vet visit)"
                            value={newEvent}
                            onChangeText={setNewEvent}
                        />
                        <TouchableOpacity style={styles.addEventButton} onPress={handleAddEvent}>
                            <Text style={styles.addEventButtonText}>Add Event</Text>
                        </TouchableOpacity>

                        {/* Display Added Events */}
                        <View style={styles.eventsContainer}>
                            {events.map((event, index) => (
                                <View key={index} style={styles.eventRow}>
                                    <Text style={styles.eventText}>{event}</Text>
                                    <TouchableOpacity onPress={() => handleDeleteEvent(index)}>
                                        <Text style={styles.deleteEventText}>-</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </ScrollView>

                    {/* Save Button */}
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>

                    {/* Close Button */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        maxHeight: '90%',
        maxWidth: 400,
        alignItems: 'center',
        elevation: 5,
        overflow: 'hidden',
    },
    scrollViewContainer: {
        flexGrow: 1,
        paddingBottom: 30,
        width: '100%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',

    },
    iconSelectionContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
    },
    iconLabel: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
    },
    iconScroll: {
        flexDirection: 'row',
        marginTop: 10,
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
        borderWidth: 2,
        borderColor: '#FF6B81',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    noImageText: {
        fontSize: 14,
        color: '#999',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#FF6B81',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
        fontSize: 16,
        textAlign: 'center',
        overflow: 'hidden',
    },
    addEventButton: {
        backgroundColor: '#FF6B81',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 15,
        width: '50%',
        alignItems: 'center',

    },
    addEventButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',

    },
    eventsContainer: {
        marginTop: 20,
        width: '80%',
        paddingVertical: 10,
    },
    eventText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
        width: "100%",
        flexWrap: 'wrap',
        overflow: 'hidden',
    },
    saveButton: {
        backgroundColor: '#FF6B81',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: 'gray',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 10,
        width: '80%',
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconPickerContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    iconPickerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeIconPickerButton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    eventRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    deleteEventText: {
        fontSize: 18,
        color: '#FF6B81',
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
});

export default EditCatModal;
