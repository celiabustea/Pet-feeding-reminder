import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';

const CatProfileModal = ({ visible, onClose, cat, onEditProfile }) => {
    if (!cat) return null; // Ensure there's data to display

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <Animatable.View animation="zoomIn" duration={500} style={styles.modalContainer}>
                    <Animatable.Text animation="fadeInUp" duration={500} style={styles.modalTitle}>
                        {cat.name ? `${cat.name}'s Profile` : 'Cat Profile'}
                    </Animatable.Text>

                    {cat.icon ? (
                        <Animatable.Image
                            animation="fadeInUp"
                            duration={600}
                            delay={200}
                            source={cat.icon}
                            style={styles.profileImage}
                        />
                    ) : (
                        <Animatable.Text animation="fadeInUp" duration={600} delay={200} style={styles.noImageText}>
                            No Image Available
                        </Animatable.Text>
                    )}

                    <Animatable.Text animation="fadeInUp" duration={500} delay={300} style={styles.profileDetail}>
                        Food: {cat.food || 'Not specified'}
                    </Animatable.Text>
                    <Animatable.Text animation="fadeInUp" duration={500} delay={400} style={styles.profileDetail}>
                        Feeding Times: {cat.times?.join(', ') || 'Not specified'}
                    </Animatable.Text>
                    <Animatable.Text animation="fadeInUp" duration={500} delay={500} style={styles.profileDetail}>
                        Birthday: {cat.birthday || 'Not specified'}
                    </Animatable.Text>

                    <Animatable.View animation="fadeInUp" duration={500} delay={600} style={styles.eventsSection}>
                        <Text style={styles.eventsTitle}>Events</Text>
                        {cat.events && cat.events.length > 0 ? (
                            <ScrollView style={styles.eventsList}>
                                {cat.events.map((event, index) => (
                                    <Text key={index} style={styles.eventItem}>
                                        {event}
                                    </Text>
                                ))}
                            </ScrollView>
                        ) : (
                            <Text style={styles.noEventsText}>No events available</Text>
                        )}
                    </Animatable.View>

                    <Animatable.View animation="fadeInUp" duration={500} delay={700} style={styles.editButton}>
                        <TouchableOpacity onPress={onEditProfile}>
                            <Text style={styles.editButtonText}>Edit Profile</Text>
                        </TouchableOpacity>
                    </Animatable.View>

                    <Animatable.View animation="fadeInUp" duration={500} delay={800} style={styles.closeButton}>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                </Animatable.View>
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
        width: '80%',
        alignItems: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    noImageText: {
        fontSize: 14,
        color: '#999',
        marginBottom: 20,
    },
    profileDetail: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
        textAlign: 'center',
    },
    eventsSection: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    eventsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    eventsList: {
        maxHeight: 100,
        width: '100%',
    },
    eventItem: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
        textAlign: 'center',
    },
    noEventsText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
    editButton: {
        backgroundColor: '#FF6B81',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 15,
        width: '80%',
        alignItems: 'center',
    },
    editButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: 'gray',
        paddingVertical: 10,
        paddingHorizontal: 20,
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
});

export default CatProfileModal;
