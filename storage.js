import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadCats = async (key) => {
    try {
        const storedCats = await AsyncStorage.getItem(key);
        return storedCats ? JSON.parse(storedCats) : [];
    } catch (error) {
        console.error('Failed to load cats:', error);
    }
};

export const saveCats = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save cats:', error);
    }
};
