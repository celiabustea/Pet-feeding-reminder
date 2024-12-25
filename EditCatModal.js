import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';

const EditCatModal = ({ visible, onClose, onEditCat, cat, icons = [] }) => {
    const [catName, setCatName] = useState('');
    const [catFood, setCatFood] = useState('');
    const [feedingTimes, setFeedingTimes] = useState([]);
    const [events, setEvents] = useState([]);
    const [newEventDate, setNewEventDate] = useState('');
    const [newEventDescription, setNewEventDescription] = useState('');
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [showIconPicker, setShowIconPicker] = useState(false);
    const [newEvent, setNewEvent] = useState({ date: '', description: '' });


    useEffect(() => {
        if (cat) {
            setCatName(cat.name || '');
            setCatFood(cat.food || '');
            setFeedingTimes(cat.times || []);
            setEvents(cat.events || []);
            setSelectedIcon(cat.icon || null);
        }
    }, [cat]);

    const handleSave = () => {
        if (!catName || !catFood || feedingTimes.length === 0 || !selectedIcon) {
            alert('Please fill in all fields and select an icon.');
            return;
        }
        const updatedCat = {
            ...cat,
            name: catName,
            food: catFood,
            times: feedingTimes,
            events,
            icon: selectedIcon,
        };
        onEditCat(updatedCat);
        onClose();
    };

    const handleAddEvent = () => {
        // Check if both date and description are set
        if (!newEventDate || !newEventDescription) {
            alert('Please provide both a description and select a date for the event.');
            return;
        }

        // Add the event if both fields are filled
        setEvents([...events, { date: newEventDate, description: newEventDescription }]);

        // Reset the input fields
        setNewEventDate('');
        setNewEventDescription('');
    };





    const handleDeleteEvent = (index) => {
        setEvents(events.filter((_, i) => i !== index));
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                        <Text style={styles.modalTitle}>Edit Cat Profile</Text>

                        <View style={styles.iconSelectionContainer}>
                            <Text style={styles.label}>Select Cat Icon</Text>
                            <TouchableOpacity onPress={() => setShowIconPicker(true)}>
                                {selectedIcon ? (
                                    <Image source={selectedIcon} style={styles.profileImage} />
                                ) : (
                                    <Text style={styles.noImageText}>No Image Selected</Text>
                                )}
                            </TouchableOpacity>
                        </View>

                        {showIconPicker && (
                            <View style={styles.iconPickerContainer}>
                                <Text style={styles.iconPickerTitle}>Choose an Icon</Text>
                                <ScrollView horizontal contentContainerStyle={styles.iconScroll}>
                                    {icons.map((icon, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => {
                                                setSelectedIcon(icon);
                                                setShowIconPicker(false);
                                            }}
                                        >
                                            <Image source={icon} style={styles.icon} />
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setShowIconPicker(false)}
                                >
                                    <Text style={styles.closeButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Enter Cat Name"
                            value={catName}
                            onChangeText={setCatName}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Enter Cat Food"
                            value={catFood}
                            onChangeText={setCatFood}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Enter Feeding Times (comma separated)"
                            value={feedingTimes.join(', ')}
                            onChangeText={(text) =>
                                setFeedingTimes(text.split(',').map((time) => time.trim()))
                            }
                        />

                        <View style={styles.calendarContainer}>
                            <Text style={styles.label}>Schedule Event</Text>
                            <Calendar
                                onDayPress={(day) => setNewEventDate(day.dateString)} // Ensures newEventDate is set when a day is pressed
                                markedDates={{
                                    [newEventDate]: { selected: true, selectedColor: '#FF6B81' },
                                }}
                                theme={{
                                    selectedDayBackgroundColor: '#FF6B81',
                                    todayTextColor: '#FF6B81',
                                    arrowColor: '#FF6B81',
                                }}
                            />

                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Enter Event Description"
                            value={newEventDescription}
                            onChangeText={(text) => setNewEventDescription(text)} // Updates the state correctly
                        />





                        <TouchableOpacity style={styles.addEventButton} onPress={handleAddEvent}>
                            <Text style={styles.addEventButtonText}>Add Event</Text>
                        </TouchableOpacity>

                        <View style={styles.eventsContainer}>
                            {events.map((event, index) => (
                                <View key={index} style={styles.eventRow}>
                                    <Text style={styles.eventText}>
                                        {`${event.date}: ${event.description}`} {/* Ensure both date and description are rendered as strings */}
                                    </Text>
                                    <TouchableOpacity onPress={() => handleDeleteEvent(index)}>
                                        <Text style={styles.deleteEventText}>-</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>



                    </ScrollView>

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>

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
        alignItems: 'center',
    },
    scrollViewContainer: {
        flexGrow: 1,
        paddingBottom: 20,
        width: '100%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    iconSelectionContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
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
    },
    calendarContainer: {
        marginTop: 20,
        width: '100%',
    },
    addEventButton: {
        backgroundColor: '#FF6B81',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 15,
    },
    addEventButtonText: {
        color: 'white',
        fontSize: 16,
    },
    eventsContainer: {
        marginTop: 20,
        width: '100%',
    },
    eventRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    eventText: {
        fontSize: 16,
        color: '#333',
    },
    deleteEventText: {
        fontSize: 16,
        color: '#FF6B81',
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#FF6B81',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
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
        alignItems: 'center',
        marginTop: 10,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    iconPickerContainer: {
        marginTop: 20,
        alignItems: 'center',
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
});

export default EditCatModal;
