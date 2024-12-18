import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function CatItem({ cat, onPress }) {
    return (
        <View style={styles.catContainer}>
            <Image source={cat.icon} style={styles.catIcon} />
            <View style={styles.catDetails}>
                <Text style={styles.catName}>{cat.name}</Text>
                <Text style={styles.catFood}>Food: {cat.food}</Text>
                <Text style={styles.feedingTimes}>Feeding Times: {cat.times.join(', ')}</Text>
            </View>
            <TouchableOpacity style={styles.profileButton} onPress={() => onPress(cat)}>
                <Text style={styles.profileButtonText}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    catContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 15,
        paddingVertical: 15,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        maxHeight: 120,
        width: '100%',
    },
    catIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    catDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    catName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF6B81',
        marginBottom: 5,
    },
    catFood: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    feedingTimes: {
        fontSize: 12,
        color: '#666',
    },
    profileButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileButtonText: {
        color: '#FFF',
        fontSize: 14,
    },
});
