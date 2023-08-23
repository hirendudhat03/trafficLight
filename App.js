import React, {useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const TrafficLight = () => {
  const initialLightsState = [
    {red: false, yellow: false, green: true},
    {red: true, yellow: false, green: false},
    {red: true, yellow: false, green: false},
    {red: true, yellow: false, green: false},
  ];
  const [isStart, setIsStart] = useState(false);
  const [lights, setLights] = useState(initialLightsState);
  const intervalRef = useRef(null);

  const sequence = [
    {lightIndex: 0, color: 'green', duration: 5000},
    {lightIndex: 0, color: 'yellow', duration: 1000},
    {lightIndex: 0, color: 'red', duration: 1000},
    {lightIndex: 1, color: 'green', duration: 5000},
    {lightIndex: 1, color: 'yellow', duration: 1000},
    {lightIndex: 1, color: 'red', duration: 1000},
    {lightIndex: 2, color: 'green', duration: 5000},
    {lightIndex: 2, color: 'yellow', duration: 1000},
    {lightIndex: 2, color: 'red', duration: 1000},
    {lightIndex: 3, color: 'green', duration: 5000},
    {lightIndex: 3, color: 'yellow', duration: 1000},
    {lightIndex: 3, color: 'red', duration: 1000},
  ];

  const startTrafficLight = () => {
    let currentIndex = 0;
    let currentDuration = 0;
    setIsStart(true);
    const tick = () => {
      currentDuration += 1000;
      if (currentDuration === sequence[currentIndex].duration) {
        currentDuration = 0;
        currentIndex = (currentIndex + 1) % sequence.length;
      }

      setLights(prevLights => {
        const newLights = prevLights.map((light, i) => {
          if (i === sequence[currentIndex].lightIndex) {
            return {
              red: sequence[currentIndex].color === 'red',
              yellow: sequence[currentIndex].color === 'yellow',
              green: sequence[currentIndex].color === 'green',
            };
          }
          return light;
        });

        return newLights;
      });
    };

    intervalRef.current = setInterval(tick, 1000);
  };

  const stopTrafficLight = () => {
    clearInterval(intervalRef.current);
    setLights(initialLightsState);
    setIsStart(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        {lights.map((light, index) => (
          <View key={index} style={styles.trafficLight}>
            <View
              style={[
                styles.light,
                {backgroundColor: light.red ? 'red' : 'gray'},
              ]}
            />
            <View
              style={[
                styles.light,
                {backgroundColor: light.yellow ? 'yellow' : 'gray'},
              ]}
            />
            <View
              style={[
                styles.light,
                {backgroundColor: light.green ? 'green' : 'gray'},
              ]}
            />
          </View>
        ))}
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.button}
          onPress={isStart ? stopTrafficLight : startTrafficLight}>
          <Text style={styles.buttonText}>{isStart ? 'STOP' : 'START'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trafficLight: {
    marginHorizontal: 20,
    width: 60,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 5,
  },
  light: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  buttonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'green',
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TrafficLight;
