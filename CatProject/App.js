import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AddCatModal from './AddCatModal';
import RemoveCatModal from './RemoveCatModal';
import IconSelectionModal from './IconSelectionModal';
import CatItem from './CatItem';
import { loadCats, saveCats } from './storage';
import EditCatModal from './EditCatModal';
import CatProfileModal from './CatProfileModal';  // Import your CatProfileModal
import * as Animatable from 'react-native-animatable';

const CATS_STORAGE_KEY = '@cats';

export default function App() {
  const [cats, setCats] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [iconSelectionVisible, setIconSelectionVisible] = useState(false);
  const [catName, setCatName] = useState('');
  const [catFood, setCatFood] = useState('');
  const [feedingTimes, setFeedingTimes] = useState([]);
  const [catToRemove, setCatToRemove] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);  // To hold the cat being edited
  const [profileModalVisible, setProfileModalVisible] = useState(false); // Modal visibility for profile

  const icons = [
    require('./assets/black-cat.png'),
    require('./assets/white-cat.png'),
    require('./assets/orange-cat.png'),
    require('./assets/gray-cat.png'),
    require('./assets/black-and-white-cat.png'),

  ];

  useEffect(() => {
    (async () => {
      const loadedCats = await loadCats(CATS_STORAGE_KEY);
      console.log('loaded cats from storage:', loadedCats);
      setCats(loadedCats || []);
    })();
  }, []);

  useEffect(() => {
    saveCats(CATS_STORAGE_KEY, cats);
  }, [cats]);

  const editCat = (updatedCat) => {
    const updatedCats = cats.map((cat) =>
        cat.id === updatedCat.id ? updatedCat : cat
    );
    setCats(updatedCats); // Update the list of cats
    setSelectedCat(updatedCat); // Update the selected cat for the profile modal
    setEditModalVisible(false); // Close the edit modal
  };


  const [catBirthday, setCatBirthday] = useState(''); // State for birthday


  const addCat = () => {
    if (catName && catFood && feedingTimes.length > 0 && selectedIcon) {
      const newCat = {
        id: Math.random().toString(),
        name: catName,
        food: catFood,
        times: feedingTimes,
        icon: selectedIcon,
        birthday: catBirthday, // Ensure the birthday is included
      };
      setCats([...cats, newCat]);
      setAddModalVisible(false);
      resetAddForm();
    } else {
      alert('Please fill in all fields and select an icon.');
    }
  };


  const removeCat = () => {
    const trimmedName = catToRemove.trim().toLowerCase(); // Normalize input
    const updatedCats = cats.filter((cat) => cat.name.trim().toLowerCase() !== trimmedName);

    if (updatedCats.length === cats.length) {
      // No match found
      alert(`No cat found with the name "${catToRemove}".`);
    } else {
      // Match found, update state
      setCats(updatedCats);
      setRemoveModalVisible(false);
      setCatToRemove('');
      setSelectedCat(null);
      alert(`Successfully removed the cat "${catToRemove}".`);
    }
  };



  const resetAddForm = () => {
    setCatName('');
    setCatFood('');
    setFeedingTimes([]);
    setSelectedIcon(null);
  };

  const openProfileModal = (cat) => {
    setSelectedCat(cat); // Set the selected cat to show its profile
    setProfileModalVisible(true); // Show the profile modal
  };

  const closeProfileModal = () => {
    setProfileModalVisible(false);
    setSelectedCat(null);
  };

  const openEditCatModal = (cat) => {
    setSelectedCat(cat);
    setEditModalVisible(true);
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Cat Feeder 🐾</Text>

        {/* List of cats */}
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {cats.map((item) => (
              <Animatable.View
                  key={item.id}
                  animation="fadeIn"   // Animation type
                  duration={1000}       // Animation duration
                  delay={200}           // Delay before the animation starts
              >
              <CatItem
                  key={item.id}
                  cat={item}
                  onPress={() => openProfileModal(item)}
                  onEdit={() => openEditCatModal(item)} // Open edit modal on edit
              />
              </Animatable.View>

          ))}
        </ScrollView>

        {/* Add and Remove buttons */}
        <TouchableOpacity style={styles.addButton} onPress={() => setAddModalVisible(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.removeButton} onPress={() => setRemoveModalVisible(true)}>
          <Text style={styles.removeButtonText}>-</Text>
        </TouchableOpacity>

        {/* Modals */}
        <AddCatModal
            visible={addModalVisible}
            onClose={() => setAddModalVisible(false)}
            onAddCat={addCat}
            catName={catName}
            catFood={catFood}
            feedingTimes={feedingTimes}
            setCatName={setCatName}
            setCatFood={setCatFood}
            setFeedingTimes={setFeedingTimes}
            selectedIcon={selectedIcon}
            onIconSelect={() => setIconSelectionVisible(true)}
        />

        <RemoveCatModal
            visible={removeModalVisible}
            onClose={() => setRemoveModalVisible(false)}
            onRemoveCat={removeCat}
            catToRemove={catToRemove}
            setCatToRemove={setCatToRemove}
        />

        <IconSelectionModal
            visible={iconSelectionVisible}
            onClose={() => setIconSelectionVisible(false)}
            onSelectIcon={setSelectedIcon}
            icons={icons}
        />


        <CatProfileModal
            visible={profileModalVisible}
            onClose={closeProfileModal}
            cat={selectedCat}
            onEditProfile={() => openEditCatModal(selectedCat)} // Open edit modal
        />


        <EditCatModal
            visible={editModalVisible}
            onClose={() => setEditModalVisible(false)}
            cat={selectedCat}
            onEditCat={editCat}
            icons={icons}
        />

      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1F3',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF6B81',
    marginBottom: 20,
    marginVertical: 50,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF6B81',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 32,
    lineHeight: 35,
  },
  removeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#FF6B81',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 32,
    lineHeight: 35,
  },
});
