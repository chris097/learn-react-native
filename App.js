import { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Button
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  const startAddGoalHandler = () => {
    setModalIsVisible(true)
  }

  const endAddGoalHandler = () => {
    setModalIsVisible(false)
  }
  
  const addGoalHandler = (enteredGoalText) => {
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() }
    ]);
    endAddGoalHandler()
  };

  const handleDeleteItem = (id) => {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    })
  }

  return (
    <>
    <StatusBar style='light' />
    <View style={styles.appContainer}>
      <Button
        title='Add Item'
        color='#5e0acc'
        onPress={startAddGoalHandler}e
      />
      <GoalInput
        visible={modalIsVisible}
        onAddGoal={addGoalHandler}
        onCancel={endAddGoalHandler}
      />
      <View style={styles.goalContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => {
            return <GoalItem
              text={itemData.item.text}
              id={itemData.item.id}
              onDeleteItem={handleDeleteItem}
            />;
          }}
          keyExtractor={(item, index) => {
            return item.id
          }}
          alwaysBounceVertical={false}
        />
      </View>
      </View>
      </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a'
  },
  goalContainer: {
    flex: 5,
  },
});
