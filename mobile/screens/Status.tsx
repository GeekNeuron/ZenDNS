import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function Stats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/analytics/queries-per-hour')
      .then(res => res.json())
      .then(setData)
      .catch(() => setData([]));
  }, []);

  const chartData = {
    labels: data.map(d => d.hour),
    datasets: [{ data: data.map(d => d.queries) }]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DNS Queries Per Hour</Text>
      <BarChart
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={220}
        yAxisLabel=""
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
    </View>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(14, 165, 233, ${opacity})`,
  strokeWidth: 2,
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});
